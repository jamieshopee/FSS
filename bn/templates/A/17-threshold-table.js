export const THRESHOLD_TABLE_CANVAS_WIDTH = 1200;

const BODY_LEFT = 10;
const BODY_TOP = 10;
const BODY_BOTTOM = 12;
const BODY_WIDTH = 1180;

const TITLE_AREA_HEIGHT = 83;
const VIP_AREA_HEIGHT = 185;

const MIDDLE_BACKGROUND = "#1a9c8b";
const MIDDLE_PADDING = 12;
const CELL_GAP = 12;
const CELL_RADIUS = 10;

const LEFT_COLUMN_WIDTH = 177;
const LOGISTICS_AREA_WIDTH = 967;
const THRESHOLD_TEXT_SAFE_PADDING = 12;
const THRESHOLD_TEXT_WIDTH = LEFT_COLUMN_WIDTH - THRESHOLD_TEXT_SAFE_PADDING * 2;

const MAX_LOGISTICS = 5;
const MAX_THRESHOLD_PAIRS = 9;

const LOGISTICS_ROW_SINGLE_HEIGHT = 45;
const LOGISTICS_ROW_DOUBLE_HEIGHT = 80;
const THRESHOLD_ROW_BASE_HEIGHT = 70;
const THRESHOLD_ROW_LINE_INCREMENT = 30;
const LINE_BASELINE_PITCH = 30;

const GREEN_CELL_FILL = "#006351";
const LOGISTICS_CELL_FILL = "#ffee9f";
const AMOUNT_CELL_FILL = "#fffced";

const BOLD_FAMILY = "ShopeeNotoSans Bold";
const REGULAR_FAMILY = "ShopeeNotoSans Regular";

// A－17 Visual Tuning 正式裁決：Photoshop 字級數值採「數值同值 px」呈現
//（50pt→50px…），禁止 Canvas `pt`／96÷72 換算／1.333 multiplier。
const MAIN_TITLE_FONT = `50px "${BOLD_FAMILY}"`;
const MAIN_TITLE_COLOR = "#ffed54";

const LEFT_CELL_FONT = `28px "${BOLD_FAMILY}"`;
const LEFT_CELL_COLOR = "#ffee9f";

const LOGISTICS_LINE_FONT = `28px "${BOLD_FAMILY}"`;
const LOGISTICS_LINE_COLOR = "#006351";
const LOGISTICS_SMALL_FONT = `17px "${BOLD_FAMILY}"`;
const LOGISTICS_SMALL_COLOR = "#4e4e4e";
const LOGISTICS_SMALL_HAN_LIMIT = 5;

const AMOUNT_FONT = `32px "${BOLD_FAMILY}"`;

const VIP_TITLE_FONT = `36px "${BOLD_FAMILY}"`;
const VIP_TITLE_COLOR = "#d0011b";
const VIP_COPY_FONT = `34px "${BOLD_FAMILY}"`;
const VIP_COPY_COLOR = "#ffffff";
const CTA_FONT = `30px "${REGULAR_FAMILY}"`;
const CTA_COLOR = "#ffffff";

// A－17 VIP Local Frame Verification（PASS）：local = Photoshop absolute − (3328, 1190)。
// 以下為相對 17_VIP.png（1180 × 185）左上角 (0,0) 的正式 runtime local frames。
export const VIP_LOCAL_FRAMES = Object.freeze({
  title: Object.freeze({ left: 217, top: 42, width: 935, height: 34 }),
  copy: Object.freeze({ left: 201, top: 128, width: 720, height: 34 }),
  cta: Object.freeze({ left: 1003, top: 128, width: 85, height: 34 }),
});

const COLOR_MAP = Object.freeze({
  綠: "#006351",
  紅: "#d0011b",
});

const MERGE_MARKER = "↑";

// A－17 第二輪 Visual Tuning（Jamie 批准）：僅左側深綠欄 28px Bold #ffee9f
// 黃字（「適用物流」label＋門檻名稱）採 local 2× temporary canvas 繪製後
// high-quality downsample 回正式 1× Canvas。沿用 A－01～14／A－16 已 PASS
// 的版位 local 2× 模式；不套用於右側物流名稱、17px 小字、金額、主標、
// VIP 各文字，不改任何 geometry／wrap／metrics 邏輯（measureText 不受
// transform 影響，wrap 與定位仍依正式 1× 28px metrics）。
const LEFT_LABEL_RENDER_SCALE = 2;

const FONT_CHECKS = Object.freeze([
  MAIN_TITLE_FONT,
  LEFT_CELL_FONT,
  LOGISTICS_LINE_FONT,
  LOGISTICS_SMALL_FONT,
  AMOUNT_FONT,
  VIP_TITLE_FONT,
  VIP_COPY_FONT,
  CTA_FONT,
]);

const FONT_TEST_TEXT = "不限店家無限免運蝦皮店到店$499↑訂閱去VIP49起";

const HAN_PATTERN = /\p{Script=Han}/u;

function countHan(text) {
  let count = 0;
  for (const character of String(text || "")) {
    if (HAN_PATTERN.test(character)) count += 1;
  }
  return count;
}

function trimControlValue(value) {
  return String(value ?? "").replace(/^[\s　]+|[\s　]+$/gu, "");
}

function hasFontFaceSetCapabilities() {
  return (
    document.fonts &&
    typeof document.fonts.load === "function" &&
    typeof document.fonts.check === "function"
  );
}

function assertFontsReady() {
  if (
    !hasFontFaceSetCapabilities() ||
    !FONT_CHECKS.every((font) => document.fonts.check(font, FONT_TEST_TEXT))
  ) {
    throw new Error("正式字型尚未載入，已停止 A－17 Template render。");
  }
}

export async function waitForThresholdTableFonts() {
  if (!hasFontFaceSetCapabilities()) {
    throw new Error("瀏覽器不支援正式字型載入檢查，已停止 A－17 Template render。");
  }

  await Promise.all(
    FONT_CHECKS.map((font) => document.fonts.load(font, FONT_TEST_TEXT)),
  );
  assertFontsReady();
}

function assertImage(image, label, width, height) {
  if (!(image instanceof HTMLImageElement)) {
    throw new TypeError(`A－17 Template 需要已載入的 ${label} HTMLImageElement。`);
  }
  if (!image.complete || image.naturalWidth === 0) {
    throw new Error(`A－17 ${label}尚未完成解碼。`);
  }
  if (image.naturalWidth !== width || image.naturalHeight !== height) {
    throw new Error(`A－17 ${label}必須為 ${width} × ${height}px。`);
  }
}

function measureRun(context, text, font) {
  context.font = font;
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  const metrics = context.measureText(text);
  const values = [
    metrics.width,
    metrics.actualBoundingBoxLeft,
    metrics.actualBoundingBoxRight,
    metrics.actualBoundingBoxAscent,
    metrics.actualBoundingBoxDescent,
  ];

  if (!values.every(Number.isFinite)) {
    throw new Error("A－17 正式字型 metrics 無效，已停止 Template render。");
  }

  return {
    advanceWidth: metrics.width,
    inkLeft: -metrics.actualBoundingBoxLeft,
    inkRight: metrics.actualBoundingBoxRight,
    inkTop: -metrics.actualBoundingBoxAscent,
    inkBottom: metrics.actualBoundingBoxDescent,
  };
}

function measureAdvance(context, text, font) {
  context.font = font;
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  const width = context.measureText(text).width;
  if (!Number.isFinite(width)) {
    throw new Error("A－17 正式字型 metrics 無效，已停止 Template render。");
  }
  return width;
}

function buildFit(inkWidth, inkHeight, boxWidth, boxHeight) {
  return Object.freeze({
    inkWidth,
    inkHeight,
    fitsWidth: inkWidth <= boxWidth,
    fitsHeight: inkHeight <= boxHeight,
  });
}

function drawCenteredText(context, text, font, color, box) {
  if (text === "") return buildFit(0, 0, box.width, box.height);

  const run = measureRun(context, text, font);
  const inkWidth = run.inkRight - run.inkLeft;
  const inkHeight = run.inkBottom - run.inkTop;
  const x = box.left + (box.width - inkWidth) / 2 - run.inkLeft;
  const y = box.top + box.height / 2 - (run.inkTop + run.inkBottom) / 2;

  context.font = font;
  context.fillStyle = color;
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  context.fillText(text, x, y);
  return buildFit(inkWidth, inkHeight, box.width, box.height);
}

function drawRightAlignedText(context, text, font, color, box) {
  if (text === "") return buildFit(0, 0, box.width, box.height);

  const run = measureRun(context, text, font);
  const inkWidth = run.inkRight - run.inkLeft;
  const inkHeight = run.inkBottom - run.inkTop;
  const x = box.left + box.width - run.inkRight;
  const y = box.top + box.height / 2 - (run.inkTop + run.inkBottom) / 2;

  context.font = font;
  context.fillStyle = color;
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  context.fillText(text, x, y);
  return buildFit(inkWidth, inkHeight, box.width, box.height);
}

// 多行 group：baseline pitch 30px（A－17 local 初版規則）。
// 垂直＝整組 ink bbox 置中；水平＝每一 visual line 各自 ink bbox 置中。
function drawLineGroup(context, lines, box, fitWidth) {
  const measured = lines.map((line) =>
    line.text === ""
      ? { line, empty: true, inkLeft: 0, inkRight: 0, inkTop: 0, inkBottom: 0 }
      : { line, empty: false, ...measureRun(context, line.text, line.font) },
  );

  let groupTop = Infinity;
  let groupBottom = -Infinity;
  let maxInkWidth = 0;
  measured.forEach((entry, index) => {
    const baseline = index * LINE_BASELINE_PITCH;
    if (entry.empty) return;
    groupTop = Math.min(groupTop, baseline + entry.inkTop);
    groupBottom = Math.max(groupBottom, baseline + entry.inkBottom);
    maxInkWidth = Math.max(maxInkWidth, entry.inkRight - entry.inkLeft);
  });

  if (!Number.isFinite(groupTop)) return buildFit(0, 0, fitWidth, box.height);

  const groupHeight = groupBottom - groupTop;
  const offsetY = box.top + box.height / 2 - (groupTop + groupBottom) / 2;

  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  measured.forEach((entry, index) => {
    if (entry.empty) return;
    const inkWidth = entry.inkRight - entry.inkLeft;
    const x = box.left + (box.width - inkWidth) / 2 - entry.inkLeft;
    const y = offsetY + index * LINE_BASELINE_PITCH;
    context.font = entry.line.font;
    context.fillStyle = entry.line.color;
    context.fillText(entry.line.text, x, y);
  });

  return buildFit(maxInkWidth, groupHeight, fitWidth, box.height);
}

function createLeftLabelSurface(width, height) {
  const surfaceCanvas = document.createElement("canvas");
  surfaceCanvas.width = width * LEFT_LABEL_RENDER_SCALE;
  surfaceCanvas.height = height * LEFT_LABEL_RENDER_SCALE;
  if (
    surfaceCanvas.width !== width * LEFT_LABEL_RENDER_SCALE ||
    surfaceCanvas.height !== height * LEFT_LABEL_RENDER_SCALE
  ) {
    throw new Error("A－17 左欄 2× 暫存 Canvas 尺寸無效，已停止 Template render。");
  }

  const surfaceContext = surfaceCanvas.getContext("2d");
  if (!surfaceContext) {
    throw new Error("無法建立 A－17 左欄 2× 暫存 Canvas 2D context。");
  }

  surfaceContext.clearRect(0, 0, surfaceCanvas.width, surfaceCanvas.height);
  surfaceContext.globalAlpha = 1;
  surfaceContext.globalCompositeOperation = "source-over";
  surfaceContext.scale(LEFT_LABEL_RENDER_SCALE, LEFT_LABEL_RENDER_SCALE);
  return { canvas: surfaceCanvas, context: surfaceContext };
}

function compositeLeftLabelSurface(context, surface, width, height) {
  context.save();
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(
    surface.canvas,
    0,
    0,
    surface.canvas.width,
    surface.canvas.height,
    0,
    0,
    width,
    height,
  );
  context.restore();
}

function drawRoundedCell(context, x, y, width, height, fill) {
  const radius = Math.min(CELL_RADIUS, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
  context.fillStyle = fill;
  context.fill();
}

// literal "\n" ＝ 使用者強制斷行；每段內依 153px 實際 measureText 寬度自動換行。
function wrapThresholdName(context, name) {
  const lines = [];
  for (const segment of String(name).split("\n")) {
    const characters = Array.from(segment);
    if (!characters.length) {
      lines.push("");
      continue;
    }

    let current = "";
    for (const character of characters) {
      const candidate = current + character;
      if (
        current !== "" &&
        measureAdvance(context, candidate, LEFT_CELL_FONT) > THRESHOLD_TEXT_WIDTH
      ) {
        lines.push(current);
        current = character;
      } else {
        current = candidate;
      }
    }
    lines.push(current);
  }
  return lines;
}

function normalizeModel(model) {
  const source = model && typeof model === "object" ? model : {};
  const logisticsSource = Array.isArray(source.logistics) ? source.logistics : [];
  const thresholdsSource = Array.isArray(source.thresholds) ? source.thresholds : [];

  if (logisticsSource.length > MAX_LOGISTICS) {
    throw new Error(`A－17 測試資料物流欄不得超過 ${MAX_LOGISTICS} 個。`);
  }
  if (thresholdsSource.length > MAX_THRESHOLD_PAIRS) {
    throw new Error(`A－17 測試資料門檻列不得超過 ${MAX_THRESHOLD_PAIRS} 組。`);
  }

  const logistics = [];
  for (let index = 0; index < MAX_LOGISTICS; index += 1) {
    const entry = logisticsSource[index] && typeof logisticsSource[index] === "object"
      ? logisticsSource[index]
      : {};
    logistics.push({
      line1: String(entry.line1 ?? ""),
      line2: String(entry.line2 ?? ""),
    });
  }

  const thresholds = [];
  for (let index = 0; index < MAX_THRESHOLD_PAIRS; index += 1) {
    const entry = thresholdsSource[index] && typeof thresholdsSource[index] === "object"
      ? thresholdsSource[index]
      : {};
    const cellsSource = Array.isArray(entry.cells) ? entry.cells : [];
    if (cellsSource.length > MAX_LOGISTICS) {
      throw new Error(`A－17 測試資料單一門檻列不得超過 ${MAX_LOGISTICS} 格。`);
    }
    const cells = [];
    for (let cellIndex = 0; cellIndex < MAX_LOGISTICS; cellIndex += 1) {
      const cell = cellsSource[cellIndex] && typeof cellsSource[cellIndex] === "object"
        ? cellsSource[cellIndex]
        : {};
      cells.push({
        color: trimControlValue(cell.color),
        amount: trimControlValue(cell.amount),
      });
    }
    thresholds.push({ name: String(entry.name ?? ""), cells });
  }

  const vip = source.vip && typeof source.vip === "object" ? source.vip : {};
  return {
    mainTitle: String(source.mainTitle ?? ""),
    logistics,
    thresholds,
    vip: {
      title: String(vip.title ?? ""),
      copy: String(vip.copy ?? ""),
      cta: String(vip.cta ?? ""),
    },
  };
}

function detectUsage(model, warnings) {
  const usedColumns = [];
  for (let column = 0; column < MAX_LOGISTICS; column += 1) {
    const slot = model.logistics[column];
    const hasName = trimControlValue(slot.line1) !== "" || trimControlValue(slot.line2) !== "";
    const hasCellData = model.thresholds.some(
      (pair) => pair.cells[column].color !== "" || pair.cells[column].amount !== "",
    );
    if (hasName || hasCellData) {
      usedColumns.push(column);
      if (!hasName && hasCellData) {
        warnings.push(`物流${column + 1} 名稱空白但欄內有資料，仍生成該欄（名稱格為空白）。`);
      }
    }
  }

  const usedPairs = [];
  model.thresholds.forEach((pair, index) => {
    const hasLabel = trimControlValue(pair.name) !== "";
    const hasData = pair.cells.some((cell) => cell.color !== "" || cell.amount !== "");
    if (hasLabel || hasData) {
      usedPairs.push(index);
      if (!hasLabel && hasData) {
        warnings.push(`門檻列 ${index + 1} 名稱空白但列內有資料，仍生成該列（左格為空白）。`);
      }
    }
  });

  return { usedColumns, usedPairs };
}

// ↑（U+2191）＝向上合併指令；合併高度依實際 row heights＋跨越的 12px gaps 計算。
function parseMerges(columnCells, rowLabels, columnLabel, warnings) {
  const cellsOut = [];
  let open = null;

  columnCells.forEach((cell, row) => {
    const isMarker = cell.amount === MERGE_MARKER;
    const isBlank = cell.amount === "";

    if (isMarker) {
      if (cell.color !== "") {
        warnings.push(`${columnLabel}×「${rowLabels[row]}」的 ↑ 不需顏色，已忽略顏色值。`);
      }
      if (open && open.endRow === row - 1) {
        open.endRow = row;
      } else {
        warnings.push(`${columnLabel}×「${rowLabels[row]}」的 ↑ 沒有上方有效金額可合併，已改為空白格。`);
        cellsOut.push({ kind: "blank", startRow: row, endRow: row });
        open = null;
      }
      return;
    }

    if (isBlank) {
      if (cell.color !== "") {
        warnings.push(`${columnLabel}×「${rowLabels[row]}」有顏色但金額空白，生成空白格。`);
      }
      cellsOut.push({ kind: "blank", startRow: row, endRow: row });
      open = null;
      return;
    }

    const segment = {
      kind: "amount",
      startRow: row,
      endRow: row,
      amount: cell.amount,
      color: null,
      drawText: true,
    };

    if (cell.color === "") {
      warnings.push(`${columnLabel}×「${rowLabels[row]}」金額「${cell.amount}」缺少顏色，生成白色格但不畫金額，請修正工單。`);
      segment.drawText = false;
    } else if (!Object.prototype.hasOwnProperty.call(COLOR_MAP, cell.color)) {
      warnings.push(`${columnLabel}×「${rowLabels[row]}」顏色「${cell.color}」非法，生成白色格但不畫金額，請修正工單。`);
      segment.drawText = false;
    } else {
      segment.color = COLOR_MAP[cell.color];
    }

    cellsOut.push(segment);
    open = segment;
  });

  return cellsOut;
}

export function renderThresholdTable(canvas, images, model) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new TypeError("A－17 Template 需要 HTMLCanvasElement。");
  }
  const { titleImage, vipImage } = images && typeof images === "object" ? images : {};
  assertImage(titleImage, "正式主標底圖", BODY_WIDTH, TITLE_AREA_HEIGHT);
  assertImage(vipImage, "正式 VIP 底圖", BODY_WIDTH, VIP_AREA_HEIGHT);
  assertFontsReady();

  const warnings = [];
  const normalized = normalizeModel(model);
  const { usedColumns, usedPairs } = detectUsage(normalized, warnings);

  if (!usedColumns.length || !usedPairs.length) {
    throw new Error("A－17 測試資料沒有任何有效物流欄或門檻列，無法生成。");
  }

  const columnCount = usedColumns.length;
  const columnWidth =
    (LOGISTICS_AREA_WIDTH - CELL_GAP * (columnCount - 1)) / columnCount;

  const logisticsRowHeight = usedColumns.some(
    (column) => trimControlValue(normalized.logistics[column].line2) !== "",
  )
    ? LOGISTICS_ROW_DOUBLE_HEIGHT
    : LOGISTICS_ROW_SINGLE_HEIGHT;

  // 需先有 measurement context 才能 wrap；使用正式 Canvas context。
  const context = canvas.getContext("2d");
  if (!context) throw new Error("無法建立 A－17 Canvas 2D context。");

  const thresholdRows = usedPairs.map((pairIndex) => {
    const pair = normalized.thresholds[pairIndex];
    const label = trimControlValue(pair.name);
    const lines = label === "" ? [] : wrapThresholdName(context, pair.name);
    const lineCount = Math.max(lines.length, 1);
    return {
      pairIndex,
      name: pair.name,
      label: label === "" ? `門檻列${pairIndex + 1}` : label.replace(/\n/gu, ""),
      lines,
      height:
        THRESHOLD_ROW_BASE_HEIGHT + (lineCount - 1) * THRESHOLD_ROW_LINE_INCREMENT,
    };
  });

  const middleHeight =
    MIDDLE_PADDING +
    logisticsRowHeight +
    thresholdRows.reduce((sum, row) => sum + CELL_GAP + row.height, 0) +
    MIDDLE_PADDING;

  const canvasHeight =
    BODY_TOP + TITLE_AREA_HEIGHT + middleHeight + VIP_AREA_HEIGHT + BODY_BOTTOM;

  canvas.width = THRESHOLD_TABLE_CANVAS_WIDTH;
  canvas.height = canvasHeight;
  if (canvas.width !== THRESHOLD_TABLE_CANVAS_WIDTH || canvas.height !== canvasHeight) {
    throw new Error("A－17 正式 Canvas 尺寸設定失敗，已停止 Template render。");
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 1;
  context.globalCompositeOperation = "source-over";

  const middleTop = BODY_TOP + TITLE_AREA_HEIGHT;

  // 中段背景（直角；外圓角由上下 assets 承擔）。
  context.fillStyle = MIDDLE_BACKGROUND;
  context.fillRect(BODY_LEFT, middleTop, BODY_WIDTH, middleHeight);

  // 主標／VIP 正式底圖 1:1。
  context.drawImage(titleImage, BODY_LEFT, BODY_TOP, BODY_WIDTH, TITLE_AREA_HEIGHT);
  const vipTop = middleTop + middleHeight;
  context.drawImage(vipImage, BODY_LEFT, vipTop, BODY_WIDTH, VIP_AREA_HEIGHT);

  const frames = {};

  // 主標題：50pt Bold #ffed54，於主標底圖水平＋垂直置中。
  frames.mainTitle = drawCenteredText(
    context,
    normalized.mainTitle,
    MAIN_TITLE_FONT,
    MAIN_TITLE_COLOR,
    { left: BODY_LEFT, top: BODY_TOP, width: BODY_WIDTH, height: TITLE_AREA_HEIGHT },
  );

  const leftColumnX = BODY_LEFT + MIDDLE_PADDING;
  const logisticsAreaX = leftColumnX + LEFT_COLUMN_WIDTH + CELL_GAP;
  const columnX = (index) => logisticsAreaX + index * (columnWidth + CELL_GAP);

  // Row geometry（由上而下）。
  const logisticsRowTop = middleTop + MIDDLE_PADDING;
  let cursorY = logisticsRowTop + logisticsRowHeight;
  const rowRects = thresholdRows.map((row) => {
    const top = cursorY + CELL_GAP;
    cursorY = top + row.height;
    return { top, height: row.height };
  });

  // 左欄黃字專用 local 2× surface（僅「適用物流」label＋門檻名稱）。
  const leftLabelSurface = createLeftLabelSurface(
    THRESHOLD_TABLE_CANVAS_WIDTH,
    canvasHeight,
  );

  // 左側「適用物流」cell。
  drawRoundedCell(
    context,
    leftColumnX,
    logisticsRowTop,
    LEFT_COLUMN_WIDTH,
    logisticsRowHeight,
    GREEN_CELL_FILL,
  );
  frames.logisticsHeader = drawCenteredText(
    leftLabelSurface.context,
    "適用物流",
    LEFT_CELL_FONT,
    LEFT_CELL_COLOR,
    { left: leftColumnX, top: logisticsRowTop, width: LEFT_COLUMN_WIDTH, height: logisticsRowHeight },
  );

  // 物流名稱 cells。
  frames.logistics = usedColumns.map((column, index) => {
    const slot = normalized.logistics[column];
    const cellLeft = columnX(index);
    drawRoundedCell(
      context,
      cellLeft,
      logisticsRowTop,
      columnWidth,
      logisticsRowHeight,
      LOGISTICS_CELL_FILL,
    );

    const lines = [];
    const line1 = trimControlValue(slot.line1) === "" ? "" : slot.line1;
    const line2 = trimControlValue(slot.line2) === "" ? "" : slot.line2;
    if (line1 !== "") {
      lines.push({ text: line1, font: LOGISTICS_LINE_FONT, color: LOGISTICS_LINE_COLOR });
    }
    if (line2 !== "") {
      const small = countHan(line2) > LOGISTICS_SMALL_HAN_LIMIT;
      lines.push({
        text: line2,
        font: small ? LOGISTICS_SMALL_FONT : LOGISTICS_LINE_FONT,
        color: small ? LOGISTICS_SMALL_COLOR : LOGISTICS_LINE_COLOR,
      });
    }

    return drawLineGroup(
      context,
      lines,
      { left: cellLeft, top: logisticsRowTop, width: columnWidth, height: logisticsRowHeight },
      columnWidth,
    );
  });

  // 門檻名稱 cells（自動換行＋強制斷行；30px baseline pitch；整組垂直置中）。
  frames.thresholds = thresholdRows.map((row, rowIndex) => {
    const rect = rowRects[rowIndex];
    drawRoundedCell(
      context,
      leftColumnX,
      rect.top,
      LEFT_COLUMN_WIDTH,
      rect.height,
      GREEN_CELL_FILL,
    );
    return drawLineGroup(
      leftLabelSurface.context,
      row.lines.map((text) => ({ text, font: LEFT_CELL_FONT, color: LEFT_CELL_COLOR })),
      { left: leftColumnX, top: rect.top, width: LEFT_COLUMN_WIDTH, height: rect.height },
      THRESHOLD_TEXT_WIDTH,
    );
  });

  // 左欄黃字 local 2× → 高品質縮回正式 1× Canvas（transparent surface，只含左欄文字）。
  compositeLeftLabelSurface(
    context,
    leftLabelSurface,
    THRESHOLD_TABLE_CANVAS_WIDTH,
    canvasHeight,
  );

  // 金額 cells：解析 ↑ merge 後繪製。
  const rowLabels = thresholdRows.map((row) => row.label);
  frames.amounts = usedColumns.map((column, index) => {
    const columnCellsData = thresholdRows.map(
      (row) => normalized.thresholds[row.pairIndex].cells[column],
    );
    const segments = parseMerges(columnCellsData, rowLabels, `物流${column + 1}`, warnings);
    const cellLeft = columnX(index);

    return segments.map((segment) => {
      const top = rowRects[segment.startRow].top;
      const bottom =
        rowRects[segment.endRow].top + rowRects[segment.endRow].height;
      const rect = { left: cellLeft, top, width: columnWidth, height: bottom - top };
      drawRoundedCell(context, rect.left, rect.top, rect.width, rect.height, AMOUNT_CELL_FILL);
      if (segment.kind === "amount" && segment.drawText) {
        return drawCenteredText(context, segment.amount, AMOUNT_FONT, segment.color, rect);
      }
      return buildFit(0, 0, rect.width, rect.height);
    });
  });

  // VIP 三組文字（local frame ＋ VIP asset runtime origin）。
  const vipFrame = (frame) => ({
    left: BODY_LEFT + frame.left,
    top: vipTop + frame.top,
    width: frame.width,
    height: frame.height,
  });
  frames.vipTitle = drawCenteredText(
    context,
    normalized.vip.title,
    VIP_TITLE_FONT,
    VIP_TITLE_COLOR,
    vipFrame(VIP_LOCAL_FRAMES.title),
  );
  frames.vipCopy = drawCenteredText(
    context,
    normalized.vip.copy,
    VIP_COPY_FONT,
    VIP_COPY_COLOR,
    vipFrame(VIP_LOCAL_FRAMES.copy),
  );
  frames.cta = drawRightAlignedText(
    context,
    normalized.vip.cta,
    CTA_FONT,
    CTA_COLOR,
    vipFrame(VIP_LOCAL_FRAMES.cta),
  );

  return Object.freeze({
    geometry: Object.freeze({
      canvasWidth: THRESHOLD_TABLE_CANVAS_WIDTH,
      canvasHeight,
      middleHeight,
      logisticsRowHeight,
      thresholdRowHeights: Object.freeze(thresholdRows.map((row) => row.height)),
      columnCount,
      columnWidth,
    }),
    frames,
    warnings: Object.freeze(warnings.slice()),
  });
}
