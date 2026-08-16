export const SUB_AREA_WIDTH = 1200;
export const SUB_AREA_HEIGHT = 220;

const BACKGROUND_LEFT = 0;
const BACKGROUND_TOP = 0;
const BACKGROUND_WIDTH = 1200;
const BACKGROUND_HEIGHT = 220;

const MEDIUM_FAMILY = "ShopeeNotoSans Medium";
const BOLD_FAMILY = "ShopeeNotoSans Bold";

const TITLE_FONT = `34pt "${MEDIUM_FAMILY}"`;
const COPY_FONT = `34pt "${BOLD_FAMILY}"`;
const COPY_SYMBOL_FONT = `28pt "${BOLD_FAMILY}"`;

const FONT_CHECKS = Object.freeze([TITLE_FONT, COPY_FONT, COPY_SYMBOL_FONT]);

const FONT_TEST_TEXT = "全站大免運店取滿$199宅配%";
const MEDIUM_RENDER_SCALE = 2;

export const SUB_AREA_BACKGROUND = Object.freeze({
  left: BACKGROUND_LEFT,
  top: BACKGROUND_TOP,
  width: BACKGROUND_WIDTH,
  height: BACKGROUND_HEIGHT,
});

// Photoshop 工作區原始 frame：左標題 313,384,540,42、右標題 898,384,540,42、
// 左文案 313,461,540,43、右文案 898,461,540,43。
// 歷史座標轉換：xLocal = xPhotoshop - 276、yLocal = yPhotoshop - 340；僅作來源紀錄，
// renderer 直接使用下列正式 runtime frames。
export const SUB_AREA_LAYOUT = Object.freeze({
  leftTitle: Object.freeze({
    left: 37,
    top: 44,
    width: 540,
    height: 42,
    font: TITLE_FONT,
    color: "#ffffff",
  }),
  rightTitle: Object.freeze({
    left: 622,
    top: 44,
    width: 540,
    height: 42,
    font: TITLE_FONT,
    color: "#ffffff",
  }),
  leftCopy: Object.freeze({
    left: 37,
    top: 121,
    width: 540,
    height: 43,
    font: COPY_FONT,
    symbolFont: COPY_SYMBOL_FONT,
    color: "#ee4d2d",
  }),
  rightCopy: Object.freeze({
    left: 622,
    top: 121,
    width: 540,
    height: 43,
    font: COPY_FONT,
    symbolFont: COPY_SYMBOL_FONT,
    color: "#ee4d2d",
  }),
});

function assertSpecificationFitsCanvas() {
  if (SUB_AREA_WIDTH !== 1200 || SUB_AREA_HEIGHT !== 220) {
    throw new Error("A－16 正式 Canvas 尺寸無效，已停止 Template render。");
  }

  const backgroundValues = [
    BACKGROUND_LEFT,
    BACKGROUND_TOP,
    BACKGROUND_WIDTH,
    BACKGROUND_HEIGHT,
  ];
  if (
    !backgroundValues.every(Number.isFinite) ||
    BACKGROUND_WIDTH <= 0 ||
    BACKGROUND_HEIGHT <= 0 ||
    BACKGROUND_LEFT < 0 ||
    BACKGROUND_TOP < 0 ||
    BACKGROUND_LEFT + BACKGROUND_WIDTH > SUB_AREA_WIDTH ||
    BACKGROUND_TOP + BACKGROUND_HEIGHT > SUB_AREA_HEIGHT
  ) {
    throw new Error("A－16 正式底圖 placement 無效，已停止 Template render。");
  }

  for (const [name, box] of Object.entries(SUB_AREA_LAYOUT)) {
    const values = [box.left, box.top, box.width, box.height];
    if (!values.every(Number.isFinite) || box.width <= 0 || box.height <= 0) {
      throw new Error(`A－16 ${name} 正式文字框無效，已停止 Template render。`);
    }
    if (
      box.left < 0 ||
      box.top < 0 ||
      box.left + box.width > SUB_AREA_WIDTH ||
      box.top + box.height > SUB_AREA_HEIGHT
    ) {
      throw new Error(`A－16 ${name} 正式文字框超出 Canvas，已停止 Template render。`);
    }
  }
}

function hasInk(metrics) {
  return (
    metrics.actualBoundingBoxLeft !== 0 ||
    metrics.actualBoundingBoxRight !== 0 ||
    metrics.actualBoundingBoxAscent !== 0 ||
    metrics.actualBoundingBoxDescent !== 0
  );
}

function measureRun(context, text, font, symbol = false) {
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
    throw new Error("A－16 正式字型 metrics 無效，已停止 Template render。");
  }

  return {
    text,
    font,
    symbol,
    advanceWidth: metrics.width,
    inkLeft: -metrics.actualBoundingBoxLeft,
    inkRight: metrics.actualBoundingBoxRight,
    inkTop: -metrics.actualBoundingBoxAscent,
    inkBottom: metrics.actualBoundingBoxDescent,
    x: 0,
    y: 0,
  };
}

function boundaryGlyphInkBottom(context, run, fromStart) {
  const glyphs = Array.from(run.text);
  if (!fromStart) glyphs.reverse();

  context.font = run.font;
  context.textAlign = "left";
  context.textBaseline = "alphabetic";

  for (const glyph of glyphs) {
    const metrics = context.measureText(glyph);
    const values = [
      metrics.width,
      metrics.actualBoundingBoxLeft,
      metrics.actualBoundingBoxRight,
      metrics.actualBoundingBoxAscent,
      metrics.actualBoundingBoxDescent,
    ];
    if (!values.every(Number.isFinite)) {
      throw new Error("A－16 文案 glyph metrics 無效，已停止 Template render。");
    }
    if (hasInk(metrics)) return metrics.actualBoundingBoxDescent;
  }

  return null;
}

function validateCenteredInkFitsBox(label, box, inkWidth, inkHeight) {
  if (
    ![inkWidth, inkHeight].every(Number.isFinite) ||
    inkWidth < 0 ||
    inkHeight < 0
  ) {
    throw new Error(`A－16 ${label} 正式文字 ink metrics 無效，已停止 Template render。`);
  }

  const inkLeft = box.left + (box.width - inkWidth) / 2;
  const inkTop = box.top + (box.height - inkHeight) / 2;
  return Object.freeze({
    inkWidth,
    inkHeight,
    inkLeft,
    inkTop,
    inkRight: inkLeft + inkWidth,
    inkBottom: inkTop + inkHeight,
    fitsWidth: inkWidth <= box.width,
    fitsHeight: inkHeight <= box.height,
  });
}

function drawCenteredText(context, text, box, label) {
  if (text === "") return validateCenteredInkFitsBox(label, box, 0, 0);

  const run = measureRun(context, text, box.font);
  const inkWidth = run.inkRight - run.inkLeft;
  const inkHeight = run.inkBottom - run.inkTop;
  const validation = validateCenteredInkFitsBox(label, box, inkWidth, inkHeight);
  const x = box.left + (box.width - inkWidth) / 2 - run.inkLeft;
  const y = box.top + box.height / 2 - (run.inkTop + run.inkBottom) / 2;

  context.font = box.font;
  context.fillStyle = box.color;
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  context.fillText(text, x, y);
  return validation;
}

function drawSubAreaMediumTitles(context, leftTitle, rightTitle) {
  const mediumCanvas = document.createElement("canvas");
  mediumCanvas.width = SUB_AREA_WIDTH * MEDIUM_RENDER_SCALE;
  mediumCanvas.height = SUB_AREA_HEIGHT * MEDIUM_RENDER_SCALE;
  if (mediumCanvas.width !== 2400 || mediumCanvas.height !== 440) {
    throw new Error("A－16 Medium 暫存 Canvas 尺寸無效，已停止 Template render。");
  }

  const mediumContext = mediumCanvas.getContext("2d");
  if (!mediumContext) {
    throw new Error("無法建立 A－16 Medium 暫存 Canvas 2D context。");
  }

  mediumContext.clearRect(0, 0, mediumCanvas.width, mediumCanvas.height);
  mediumContext.globalAlpha = 1;
  mediumContext.globalCompositeOperation = "source-over";
  mediumContext.scale(MEDIUM_RENDER_SCALE, MEDIUM_RENDER_SCALE);
  const leftTitleValidation = drawCenteredText(
    mediumContext,
    leftTitle,
    SUB_AREA_LAYOUT.leftTitle,
    "左標題",
  );
  const rightTitleValidation = drawCenteredText(
    mediumContext,
    rightTitle,
    SUB_AREA_LAYOUT.rightTitle,
    "右標題",
  );

  context.save();
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(
    mediumCanvas,
    0,
    0,
    mediumCanvas.width,
    mediumCanvas.height,
    0,
    0,
    SUB_AREA_WIDTH,
    SUB_AREA_HEIGHT,
  );
  context.restore();

  return Object.freeze({
    leftTitle: leftTitleValidation,
    rightTitle: rightTitleValidation,
  });
}

function tokenizeCopy(text) {
  const runs = [];
  let ordinaryText = "";

  const flushOrdinaryText = () => {
    if (ordinaryText === "") return;
    runs.push({ text: ordinaryText, symbol: false });
    ordinaryText = "";
  };

  for (const character of text) {
    if (character === "$" || character === "%") {
      flushOrdinaryText();
      runs.push({ text: character, symbol: true });
    } else {
      ordinaryText += character;
    }
  }
  flushOrdinaryText();
  return runs;
}

function adjacentOrdinaryRun(runs, index, preferNext) {
  const preferred = preferNext ? runs[index + 1] : runs[index - 1];
  if (preferred?.symbol === false) return preferred;

  const fallback = preferNext ? runs[index - 1] : runs[index + 1];
  return fallback?.symbol === false ? fallback : null;
}

function drawCenteredMixedCopy(context, text, box, label) {
  if (text === "") return validateCenteredInkFitsBox(label, box, 0, 0);

  const runs = tokenizeCopy(text).map((run) =>
    measureRun(context, run.text, run.symbol ? box.symbolFont : box.font, run.symbol),
  );

  let cursor = 0;
  for (const run of runs) {
    run.x = cursor;
    cursor += run.advanceWidth;
  }

  runs.forEach((run, index) => {
    if (!run.symbol) return;

    const adjacentRun = adjacentOrdinaryRun(runs, index, run.text === "$");
    if (!adjacentRun) return;

    const adjacentInkBottom = boundaryGlyphInkBottom(
      context,
      adjacentRun,
      run.text === "$",
    );
    if (adjacentInkBottom !== null) {
      run.y = adjacentInkBottom - run.inkBottom;
    }
  });

  const inkLeft = Math.min(...runs.map((run) => run.x + run.inkLeft));
  const inkRight = Math.max(...runs.map((run) => run.x + run.inkRight));
  const inkTop = Math.min(...runs.map((run) => run.y + run.inkTop));
  const inkBottom = Math.max(...runs.map((run) => run.y + run.inkBottom));
  const inkWidth = inkRight - inkLeft;
  const inkHeight = inkBottom - inkTop;
  const validation = validateCenteredInkFitsBox(label, box, inkWidth, inkHeight);
  const offsetX = box.left + box.width / 2 - (inkLeft + inkRight) / 2;
  const offsetY = box.top + box.height / 2 - (inkTop + inkBottom) / 2;

  context.fillStyle = box.color;
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  for (const run of runs) {
    context.font = run.font;
    context.fillText(run.text, offsetX + run.x, offsetY + run.y);
  }
  return validation;
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
    throw new Error("正式字型尚未載入，已停止 A－16 Template render。");
  }
}

export async function waitForSubAreaFonts() {
  if (!hasFontFaceSetCapabilities()) {
    throw new Error("瀏覽器不支援正式字型載入檢查，已停止 A－16 Template render。");
  }

  await Promise.all(
    FONT_CHECKS.map((font) => document.fonts.load(font, FONT_TEST_TEXT)),
  );
  assertFontsReady();
}

export function renderSubArea(
  canvas,
  backgroundImage,
  { leftTitle = "", leftCopy = "", rightTitle = "", rightCopy = "" } = {},
) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new TypeError("A－16 Template 需要 HTMLCanvasElement。");
  }
  if (!(backgroundImage instanceof HTMLImageElement)) {
    throw new TypeError("A－16 Template 需要已載入的 HTMLImageElement 底圖。");
  }
  if (!backgroundImage.complete || backgroundImage.naturalWidth === 0) {
    throw new Error("A－16 正式底圖尚未完成解碼。");
  }
  if (
    backgroundImage.naturalWidth !== BACKGROUND_WIDTH ||
    backgroundImage.naturalHeight !== BACKGROUND_HEIGHT
  ) {
    throw new Error("A－16 正式底圖必須為 1200 × 220px。");
  }

  assertSpecificationFitsCanvas();
  assertFontsReady();

  canvas.width = SUB_AREA_WIDTH;
  canvas.height = SUB_AREA_HEIGHT;
  if (canvas.width !== 1200 || canvas.height !== 220) {
    throw new Error("A－16 正式 Canvas 尺寸設定失敗，已停止 Template render。");
  }

  const context = canvas.getContext("2d");
  if (!context) throw new Error("無法建立 A－16 Canvas 2D context。");

  context.clearRect(0, 0, SUB_AREA_WIDTH, SUB_AREA_HEIGHT);
  context.globalAlpha = 1;
  context.globalCompositeOperation = "source-over";
  context.drawImage(
    backgroundImage,
    BACKGROUND_LEFT,
    BACKGROUND_TOP,
    BACKGROUND_WIDTH,
    BACKGROUND_HEIGHT,
  );

  const titleValidations = drawSubAreaMediumTitles(
    context,
    String(leftTitle),
    String(rightTitle),
  );
  const leftCopyValidation = drawCenteredMixedCopy(
    context,
    String(leftCopy),
    SUB_AREA_LAYOUT.leftCopy,
    "左文案",
  );
  const rightCopyValidation = drawCenteredMixedCopy(
    context,
    String(rightCopy),
    SUB_AREA_LAYOUT.rightCopy,
    "右文案",
  );

  return Object.freeze({
    leftTitle: titleValidations.leftTitle,
    leftCopy: leftCopyValidation,
    rightTitle: titleValidations.rightTitle,
    rightCopy: rightCopyValidation,
  });
}
