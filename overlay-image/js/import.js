import {
  BADGE_GROUPS,
  COLOR_OPTIONS,
  LAYOUT_OPTIONS,
  WORKSHEET_SCHEMA,
  isSafeIdentifier,
} from "../forms/excel-schema.js";
import { MAX_BADGES } from "../templates/badge-common.js";
import { parseBadgeContent, validateBadgeContent } from "../templates/index.js";
import { assertItemFits } from "./preview.js";

export const WORKSPACE_FORMAT = "FSS Item Card Workspace";
export const WORKSPACE_VERSION = 1;

export class ImportValidationError extends Error {
  constructor(errors) {
    super(errors.join("\n"));
    this.name = "ImportValidationError";
    this.errors = errors;
  }
}

function cellText(row, column) {
  const value = row?.[column];
  return value === undefined || value === null ? "" : String(value);
}

function columnLetter(column) {
  return String.fromCharCode(65 + column);
}

function validateHeader(rows) {
  const errors = [];
  const rowNumber = WORKSHEET_SCHEMA.headerRow + 1;
  for (const header of WORKSHEET_SCHEMA.headers) {
    if (cellText(rows[WORKSHEET_SCHEMA.headerRow], header.column) !== header.value) {
      errors.push(
        `Excel 第 ${rowNumber} 列 ${columnLetter(header.column)} 欄標題必須為「${header.value}」。`,
      );
    }
  }
  return errors;
}

function validateFixedLabels(blockRows, group, startRowNumber, errors) {
  WORKSHEET_SCHEMA.badgeLabels.forEach((expected, rowOffset) => {
    const actual = cellText(blockRows[rowOffset], group.labelColumn);
    if (actual !== expected) {
      errors.push(
        `Excel 第 ${startRowNumber + rowOffset} 列 ${columnLetter(group.labelColumn)} 欄固定標籤必須為「${expected}」。`,
      );
    }
  });
}

function parseBadge(blockRows, group, startRowNumber, badgeIndex, errors) {
  const layout = cellText(blockRows[0], group.valueColumn);
  const color = cellText(blockRows[1], group.valueColumn);
  const text = cellText(blockRows[2], group.valueColumn);
  const values = [layout, color, text];

  if (values.every((value) => value === "")) {
    return null;
  }
  const missingRow = values.findIndex((value) => value === "");
  if (missingRow !== -1) {
    errors.push(
      `Excel 第 ${startRowNumber + missingRow} 列 ${columnLetter(group.valueColumn)} 欄「${group.name}／${WORKSHEET_SCHEMA.badgeLabels[missingRow]}」不得為空白。`,
    );
    return null;
  }
  if (!LAYOUT_OPTIONS.includes(layout)) {
    errors.push(
      `Excel 第 ${startRowNumber} 列 ${columnLetter(group.valueColumn)} 欄「${group.name}／文字樣式」必須為 A、B、C、D。`,
    );
    return null;
  }
  if (!COLOR_OPTIONS.includes(color)) {
    errors.push(
      `Excel 第 ${startRowNumber + 1} 列 ${columnLetter(group.valueColumn)} 欄「${group.name}／顏色」必須為紅、綠、黃、藍。`,
    );
    return null;
  }

  try {
    return {
      id: `excel-${startRowNumber}-${badgeIndex + 1}`,
      origin: "excel",
      layout,
      color,
      content: parseBadgeContent(layout, text),
    };
  } catch (error) {
    errors.push(
      `Excel 第 ${startRowNumber + 2} 列 ${columnLetter(group.valueColumn)} 欄「${group.name}／文字內容」：${error.message}`,
    );
    return null;
  }
}

export async function parseExcelFile(file) {
  if (!globalThis.XLSX) {
    throw new Error("Excel 解析程式庫尚未載入。");
  }

  const workbook = globalThis.XLSX.read(await file.arrayBuffer(), {
    type: "array",
    cellDates: false,
  });
  const firstSheetName = workbook.SheetNames[0];
  if (!firstSheetName) {
    throw new ImportValidationError(["Excel 沒有可讀取的工作表。"]);
  }

  const rows = globalThis.XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], {
    header: 1,
    raw: false,
    defval: "",
    blankrows: true,
  });
  const errors = validateHeader(rows);
  const items = [];
  const identifiers = new Set();

  for (
    let startRow = WORKSHEET_SCHEMA.dataStartRow;
    startRow < rows.length;
    startRow += WORKSHEET_SCHEMA.blockSize
  ) {
    const blockRows = Array.from(
      { length: WORKSHEET_SCHEMA.blockSize },
      (_, rowOffset) => rows[startRow + rowOffset] ?? [],
    );
    const startRowNumber = startRow + 1;
    const identifier = cellText(blockRows[0], WORKSHEET_SCHEMA.identifierColumn);
    const badgeValues = BADGE_GROUPS.flatMap((group) =>
      blockRows.map((row) => cellText(row, group.valueColumn)),
    );

    if ([identifier, ...badgeValues].every((value) => value === "")) {
      continue;
    }

    if (identifier.trim() === "") {
      errors.push(`Excel 第 ${startRowNumber} 列 A 欄：編號不得為空白。`);
      continue;
    }
    if (!isSafeIdentifier(identifier)) {
      errors.push(
        `Excel 第 ${startRowNumber} 列 A 欄：編號「${identifier}」無法安全作為 PNG 檔名或 ZIP entry name。`,
      );
      continue;
    }
    if (identifiers.has(identifier)) {
      errors.push(`Excel 第 ${startRowNumber} 列 A 欄：編號「${identifier}」重複。`);
      continue;
    }
    identifiers.add(identifier);

    const blockErrorCount = errors.length;
    BADGE_GROUPS.forEach((group) =>
      validateFixedLabels(blockRows, group, startRowNumber, errors),
    );
    const badges = BADGE_GROUPS.map((group, badgeIndex) =>
      parseBadge(blockRows, group, startRowNumber, badgeIndex, errors),
    ).filter(Boolean);
    if (badges.length === 0 && errors.length === blockErrorCount) {
      errors.push(`Excel 第 ${startRowNumber}～${startRowNumber + 2} 列：至少必須填寫一個 Badge。`);
    }
    const item = { identifier, badges };
    if (errors.length === blockErrorCount) {
      items.push(item);
    }
  }

  if (items.length === 0 && errors.length === 0) {
    errors.push("Excel 沒有任何 Overlay Image 資料。");
  }
  if (errors.length > 0) {
    throw new ImportValidationError(errors);
  }

  return { items, selectedId: items[0].identifier };
}

function validateBadgeFromJson(badge, itemIndex, badgeIndex, errors) {
  const label = `JSON 第 ${itemIndex + 1} 張 Overlay Image 的第 ${badgeIndex + 1} 個 Badge`;
  if (badge === null || typeof badge !== "object") {
    errors.push(`${label}內容不完整。`);
    return null;
  }
  if (!LAYOUT_OPTIONS.includes(badge.layout)) {
    errors.push(`${label}使用不支援的 Layout。`);
    return null;
  }
  if (!COLOR_OPTIONS.includes(badge.color)) {
    errors.push(`${label}使用不支援的顏色。`);
    return null;
  }
  if (!['excel', 'added'].includes(badge.origin) || typeof badge.id !== "string" || badge.id === "") {
    errors.push(`${label}缺少有效的來源或識別資料。`);
    return null;
  }

  try {
    return {
      id: badge.id,
      origin: badge.origin,
      layout: badge.layout,
      color: badge.color,
      content: validateBadgeContent(badge.layout, badge.content),
    };
  } catch (error) {
    errors.push(`${label}：${error.message}`);
    return null;
  }
}

export function parseWorkspaceJson(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new ImportValidationError(["JSON 格式無效。"]);
  }

  const errors = [];
  if (data?.format !== WORKSPACE_FORMAT) {
    errors.push("JSON 不是 FSS Overlay Image 暫存檔。");
  }
  if (data?.version !== WORKSPACE_VERSION) {
    errors.push("JSON 版本不支援。");
  }
  if (!Array.isArray(data?.items) || data.items.length === 0) {
    errors.push("JSON 缺少完整 Overlay Image 資料。");
  }

  const identifiers = new Set();
  const items = Array.isArray(data?.items)
    ? data.items.map((item, itemIndex) => {
        if (item === null || typeof item !== "object" || !isSafeIdentifier(item.identifier)) {
          errors.push(`JSON 第 ${itemIndex + 1} 張 Overlay Image 的編號無效。`);
          return null;
        }
        if (identifiers.has(item.identifier)) {
          errors.push(`JSON 編號「${item.identifier}」重複。`);
          return null;
        }
        identifiers.add(item.identifier);
        if (!Array.isArray(item.badges) || item.badges.length > MAX_BADGES) {
          errors.push(`JSON 第 ${itemIndex + 1} 張 Overlay Image 的 Badge 數量無效。`);
          return null;
        }
        const badges = item.badges
          .map((badge, badgeIndex) => validateBadgeFromJson(badge, itemIndex, badgeIndex, errors))
          .filter(Boolean);
        const normalized = { identifier: item.identifier, badges };
        if (badges.length === item.badges.length) {
          try {
            assertItemFits(normalized);
          } catch (error) {
            errors.push(`JSON 第 ${itemIndex + 1} 張 Overlay Image：${error.message}`);
          }
        }
        return normalized;
      }).filter(Boolean)
    : [];

  const selectedId = data?.selectedId;
  if (typeof selectedId !== "string" || !identifiers.has(selectedId)) {
    errors.push("JSON 缺少有效的目前選取 Overlay Image。");
  }
  if (errors.length > 0) {
    throw new ImportValidationError(errors);
  }
  return { items, selectedId };
}
