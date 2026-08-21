import { countTextUnits, getEditorFields } from "./editor.js";

export const WORKSPACE_FORMAT = "FSS BN Workspace";
export const WORKSPACE_VERSION = 1;

export class ImportValidationError extends Error {
  constructor(errors) {
    super(errors.join("\n"));
    this.name = "ImportValidationError";
    this.errors = errors;
  }
}

const LOGISTIC_COLUMNS = Object.freeze(["I", "J", "K", "L", "M"]);
const THRESHOLD_PAIR_COUNT = 9;
const THRESHOLD_FIRST_ROW = 35;
const BN_TEXT_IDS = Object.freeze(["13", "14", "15", "16"]);
const ALL_BN_IDS = Object.freeze([
  "01", "02", "03", "04", "05", "06", "07", "08", "09",
  "10", "11", "12", "13", "14", "15", "16", "17"
]);

// 正式 A 工單固定 source cells（Phase 0 實測、Phase 1 Requirement 鎖定）。
const REQUIRED_LABELS = Object.freeze({
  A15: "主標 (限8字內)",
  A16: "副標 (限7字內)",
  A17: "保護文字 (限17字內)"
});

function cellText(worksheet, address) {
  const cell = worksheet[address];
  return cell && cell.v !== undefined && cell.v !== null ? String(cell.v) : "";
}

function parseThresholdModel(worksheet, errors) {
  const mainTitle = cellText(worksheet, "I29");

  const logistics = LOGISTIC_COLUMNS.map((column) => ({
    line1: cellText(worksheet, `${column}32`),
    line2: cellText(worksheet, `${column}33`)
  }));

  const thresholds = [];
  for (let index = 0; index < THRESHOLD_PAIR_COUNT; index += 1) {
    const nameRow = THRESHOLD_FIRST_ROW + index * 2;
    const amountRow = nameRow + 1;
    thresholds.push({
      name: cellText(worksheet, `H${nameRow}`),
      cells: LOGISTIC_COLUMNS.map((column) => ({
        color: cellText(worksheet, `${column}${nameRow}`),
        amount: cellText(worksheet, `${column}${amountRow}`)
      }))
    });
  }

  const vip = {
    title: cellText(worksheet, "I53"),
    copy: cellText(worksheet, "I54"),
    cta: cellText(worksheet, "I55")
  };

  const hasLogistics = logistics.some(
    (column) => column.line1.trim() !== "" || column.line2.trim() !== ""
  );
  const hasThreshold = thresholds.some(
    (pair) =>
      pair.name.trim() !== "" ||
      pair.cells.some((cell) => cell.color.trim() !== "" || cell.amount.trim() !== "")
  );
  if (!hasLogistics || !hasThreshold) {
    errors.push("A 工作表 17_門檻表 工單資料不完整：至少需要一個物流欄與一個門檻列。");
  }

  return { mainTitle, logistics, thresholds, vip };
}

export async function parseExcelFile(file, selectedBnId) {
  if (!globalThis.XLSX) {
    throw new Error("Excel 解析程式庫尚未載入。");
  }

  let workbook;
  try {
    workbook = globalThis.XLSX.read(await file.arrayBuffer(), {
      type: "array",
      cellDates: false
    });
  } catch (_error) {
    throw new ImportValidationError(["無法解析工單 Excel 檔案。"]);
  }

  const worksheet = workbook.Sheets ? workbook.Sheets.A : undefined;
  if (!worksheet) {
    throw new ImportValidationError(["工單 Excel 沒有 A 工作表。"]);
  }

  const errors = [];
  Object.entries(REQUIRED_LABELS).forEach(([address, expected]) => {
    if (cellText(worksheet, address) !== expected) {
      errors.push(`A 工作表 ${address} 必須為「${expected}」，無法確認為正式 A 工單。`);
    }
  });

  const shared = {
    headline: cellText(worksheet, "B15"),
    subheadline: cellText(worksheet, "B16"),
    protectionText: cellText(worksheet, "B17")
  };

  const bnText = {
    "13": { line1: cellText(worksheet, "L20"), line2: cellText(worksheet, "L21") },
    "14": { line1: cellText(worksheet, "L22"), line2: cellText(worksheet, "L23") },
    "15": { line1: cellText(worksheet, "L24"), line2: cellText(worksheet, "L25") },
    "16": {
      leftTitle: cellText(worksheet, "L26"),
      leftCopy: cellText(worksheet, "L27"),
      rightTitle: cellText(worksheet, "O26"),
      rightCopy: cellText(worksheet, "O27")
    }
  };

  const threshold = parseThresholdModel(worksheet, errors);

  if (errors.length > 0) {
    throw new ImportValidationError(errors);
  }

  return {
    currentType: "A",
    selectedBnId: ALL_BN_IDS.includes(selectedBnId) ? selectedBnId : "01",
    shared,
    bnText,
    threshold
  };
}

function validateTextFields(bnId, values, label, errors) {
  const fields = getEditorFields(bnId);
  const result = {};
  fields.forEach((field) => {
    const value = values ? values[field.id] : undefined;
    if (typeof value !== "string") {
      errors.push(`暫存 ${label} 缺少有效的「${field.label}」。`);
      result[field.id] = "";
      return;
    }
    if (countTextUnits(value) > field.limit) {
      errors.push(`暫存 ${label}「${field.label}」超過 ${field.limit} 字上限。`);
    }
    result[field.id] = value;
  });
  return result;
}

function validateThresholdModel(threshold, errors) {
  if (threshold === null || typeof threshold !== "object" || Array.isArray(threshold)) {
    errors.push("暫存缺少 17_門檻表 資料。");
    return null;
  }
  if (typeof threshold.mainTitle !== "string") {
    errors.push("暫存 17_門檻表 主標題無效。");
  }
  const logisticsSource = Array.isArray(threshold.logistics) ? threshold.logistics : null;
  if (!logisticsSource || logisticsSource.length > LOGISTIC_COLUMNS.length) {
    errors.push("暫存 17_門檻表 物流欄資料無效。");
  }
  const thresholdsSource = Array.isArray(threshold.thresholds) ? threshold.thresholds : null;
  if (!thresholdsSource || thresholdsSource.length > THRESHOLD_PAIR_COUNT) {
    errors.push("暫存 17_門檻表 門檻列資料無效。");
  }
  const vipSource =
    threshold.vip && typeof threshold.vip === "object" ? threshold.vip : null;
  if (
    !vipSource ||
    typeof vipSource.title !== "string" ||
    typeof vipSource.copy !== "string" ||
    typeof vipSource.cta !== "string"
  ) {
    errors.push("暫存 17_門檻表 VIP 資料無效。");
  }

  const logistics = (logisticsSource || []).map((entry, index) => {
    if (
      entry === null ||
      typeof entry !== "object" ||
      typeof entry.line1 !== "string" ||
      typeof entry.line2 !== "string"
    ) {
      errors.push(`暫存 17_門檻表 物流欄 ${index + 1} 無效。`);
      return { line1: "", line2: "" };
    }
    return { line1: entry.line1, line2: entry.line2 };
  });

  const thresholds = (thresholdsSource || []).map((pair, index) => {
    if (pair === null || typeof pair !== "object" || typeof pair.name !== "string") {
      errors.push(`暫存 17_門檻表 門檻列 ${index + 1} 無效。`);
      return { name: "", cells: [] };
    }
    const cellsSource = Array.isArray(pair.cells) ? pair.cells : null;
    if (!cellsSource || cellsSource.length > LOGISTIC_COLUMNS.length) {
      errors.push(`暫存 17_門檻表 門檻列 ${index + 1} 金額格數無效。`);
      return { name: pair.name, cells: [] };
    }
    const cells = cellsSource.map((cell, cellIndex) => {
      if (
        cell === null ||
        typeof cell !== "object" ||
        typeof cell.color !== "string" ||
        typeof cell.amount !== "string"
      ) {
        errors.push(
          `暫存 17_門檻表 門檻列 ${index + 1} 第 ${cellIndex + 1} 格無效。`
        );
        return { color: "", amount: "" };
      }
      return { color: cell.color, amount: cell.amount };
    });
    return { name: pair.name, cells };
  });

  return {
    mainTitle: typeof threshold.mainTitle === "string" ? threshold.mainTitle : "",
    logistics,
    thresholds,
    vip: vipSource
      ? { title: vipSource.title, copy: vipSource.copy, cta: vipSource.cta }
      : { title: "", copy: "", cta: "" }
  };
}

export function parseWorkspaceJson(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch (_error) {
    throw new ImportValidationError(["暫存檔 JSON 格式無效。"]);
  }

  const errors = [];
  if (!data || typeof data !== "object") {
    throw new ImportValidationError(["暫存檔內容無效。"]);
  }
  if (data.format !== WORKSPACE_FORMAT) {
    errors.push("此檔案不是 FSS BN 暫存檔。");
  }
  if (data.version !== WORKSPACE_VERSION) {
    errors.push("暫存檔版本不支援。");
  }
  if (data.type !== "A") {
    errors.push("此暫存檔不屬於樣式 A，本輪僅支援樣式 A 暫存。");
  }
  if (!ALL_BN_IDS.includes(data.selectedBnId)) {
    errors.push("暫存檔缺少有效的目前選取 BN。");
  }

  const shared = validateTextFields("01", data.shared, "01～12 共用文字", errors);
  const bnText = {};
  BN_TEXT_IDS.forEach((bnId) => {
    bnText[bnId] = validateTextFields(
      bnId,
      data.bnText ? data.bnText[bnId] : undefined,
      `${bnId} 文字`,
      errors
    );
  });
  const threshold = validateThresholdModel(data.threshold, errors);

  if (errors.length > 0) {
    throw new ImportValidationError(errors);
  }

  return {
    currentType: "A",
    selectedBnId: data.selectedBnId,
    shared,
    bnText,
    threshold
  };
}
