export const SKINNY_BN_APP_WIDTH = 358;
export const SKINNY_BN_APP_HEIGHT = 360;

const BACKGROUND_LEFT = 11;
const BACKGROUND_TOP = 20;
const BACKGROUND_WIDTH = 336;
const BACKGROUND_HEIGHT = 318;

const MEDIUM_FAMILY = "ShopeeNotoSans Medium";
const BOLD_FAMILY = "ShopeeNotoSans Bold";

const LINE1_FONT = `30pt "${MEDIUM_FAMILY}"`;
const LINE2_FONT = `30pt "${BOLD_FAMILY}"`;
const LINE2_SYMBOL_FONT = `25pt "${BOLD_FAMILY}"`;

const FONT_CHECKS = Object.freeze([LINE1_FONT, LINE2_FONT, LINE2_SYMBOL_FONT]);

const FONT_TEST_TEXT = "週六免運日全站$499免運%";
const MEDIUM_RENDER_SCALE = 2;

export const SKINNY_BN_APP_BACKGROUND = Object.freeze({
  left: BACKGROUND_LEFT,
  top: BACKGROUND_TOP,
  width: BACKGROUND_WIDTH,
  height: BACKGROUND_HEIGHT,
});

// Photoshop 工作區原始 frame：第一行 536,312,210,38、第二行 511,359,260,38。
// 歷史座標轉換：xLocal = xPhotoshop - 462、yLocal = yPhotoshop - 270；僅作來源紀錄，
// renderer 直接使用下列正式 runtime frames。
export const SKINNY_BN_APP_LAYOUT = Object.freeze({
  line1: Object.freeze({
    left: 74,
    top: 42,
    width: 210,
    height: 38,
    font: LINE1_FONT,
    color: "#ffffff",
  }),
  line2: Object.freeze({
    left: 49,
    top: 89,
    width: 260,
    height: 38,
    font: LINE2_FONT,
    symbolFont: LINE2_SYMBOL_FONT,
    color: "#fff285",
  }),
});

function assertSpecificationFitsCanvas() {
  if (SKINNY_BN_APP_WIDTH !== 358 || SKINNY_BN_APP_HEIGHT !== 360) {
    throw new Error("A－13 正式 Canvas 尺寸無效，已停止 Template render。");
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
    BACKGROUND_LEFT + BACKGROUND_WIDTH > SKINNY_BN_APP_WIDTH ||
    BACKGROUND_TOP + BACKGROUND_HEIGHT > SKINNY_BN_APP_HEIGHT
  ) {
    throw new Error("A－13 正式底圖 placement 無效，已停止 Template render。");
  }

  for (const [name, box] of Object.entries(SKINNY_BN_APP_LAYOUT)) {
    const values = [box.left, box.top, box.width, box.height];
    if (!values.every(Number.isFinite) || box.width <= 0 || box.height <= 0) {
      throw new Error(`A－13 ${name} 正式文字框無效，已停止 Template render。`);
    }
    if (
      box.left < 0 ||
      box.top < 0 ||
      box.left + box.width > SKINNY_BN_APP_WIDTH ||
      box.top + box.height > SKINNY_BN_APP_HEIGHT
    ) {
      throw new Error(`A－13 ${name} 正式文字框超出 Canvas，已停止 Template render。`);
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
    throw new Error("A－13 正式字型 metrics 無效，已停止 Template render。");
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
      throw new Error("A－13 第二行 glyph metrics 無效，已停止 Template render。");
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
    throw new Error(`A－13 ${label} 正式文字 ink metrics 無效，已停止 Template render。`);
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

function drawSkinnyBnAppMediumLine1(context, line1) {
  const mediumCanvas = document.createElement("canvas");
  mediumCanvas.width = SKINNY_BN_APP_WIDTH * MEDIUM_RENDER_SCALE;
  mediumCanvas.height = SKINNY_BN_APP_HEIGHT * MEDIUM_RENDER_SCALE;
  if (mediumCanvas.width !== 716 || mediumCanvas.height !== 720) {
    throw new Error("A－13 Medium 暫存 Canvas 尺寸無效，已停止 Template render。");
  }

  const mediumContext = mediumCanvas.getContext("2d");
  if (!mediumContext) {
    throw new Error("無法建立 A－13 Medium 暫存 Canvas 2D context。");
  }

  mediumContext.clearRect(0, 0, mediumCanvas.width, mediumCanvas.height);
  mediumContext.globalAlpha = 1;
  mediumContext.globalCompositeOperation = "source-over";
  mediumContext.scale(MEDIUM_RENDER_SCALE, MEDIUM_RENDER_SCALE);
  const validation = drawCenteredText(
    mediumContext,
    line1,
    SKINNY_BN_APP_LAYOUT.line1,
    "第一行",
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
    SKINNY_BN_APP_WIDTH,
    SKINNY_BN_APP_HEIGHT,
  );
  context.restore();

  return validation;
}

function tokenizeLine2(text) {
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

function drawCenteredMixedLine2(context, text, box) {
  if (text === "") return validateCenteredInkFitsBox("第二行", box, 0, 0);

  const runs = tokenizeLine2(text).map((run) =>
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
  const validation = validateCenteredInkFitsBox("第二行", box, inkWidth, inkHeight);
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
    throw new Error("正式字型尚未載入，已停止 A－13 Template render。");
  }
}

export async function waitForSkinnyBnAppFonts() {
  if (!hasFontFaceSetCapabilities()) {
    throw new Error("瀏覽器不支援正式字型載入檢查，已停止 A－13 Template render。");
  }

  await Promise.all(
    FONT_CHECKS.map((font) => document.fonts.load(font, FONT_TEST_TEXT)),
  );
  assertFontsReady();
}

export function renderSkinnyBnApp(
  canvas,
  backgroundImage,
  { line1 = "", line2 = "" } = {},
) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new TypeError("A－13 Template 需要 HTMLCanvasElement。");
  }
  if (!(backgroundImage instanceof HTMLImageElement)) {
    throw new TypeError("A－13 Template 需要已載入的 HTMLImageElement 底圖。");
  }
  if (!backgroundImage.complete || backgroundImage.naturalWidth === 0) {
    throw new Error("A－13 正式底圖尚未完成解碼。");
  }
  if (
    backgroundImage.naturalWidth !== BACKGROUND_WIDTH ||
    backgroundImage.naturalHeight !== BACKGROUND_HEIGHT
  ) {
    throw new Error("A－13 正式底圖必須為 336 × 318px。");
  }

  assertSpecificationFitsCanvas();
  assertFontsReady();

  canvas.width = SKINNY_BN_APP_WIDTH;
  canvas.height = SKINNY_BN_APP_HEIGHT;
  if (canvas.width !== 358 || canvas.height !== 360) {
    throw new Error("A－13 正式 Canvas 尺寸設定失敗，已停止 Template render。");
  }

  const context = canvas.getContext("2d");
  if (!context) throw new Error("無法建立 A－13 Canvas 2D context。");

  context.clearRect(0, 0, SKINNY_BN_APP_WIDTH, SKINNY_BN_APP_HEIGHT);
  context.globalAlpha = 1;
  context.globalCompositeOperation = "source-over";
  context.drawImage(
    backgroundImage,
    BACKGROUND_LEFT,
    BACKGROUND_TOP,
    BACKGROUND_WIDTH,
    BACKGROUND_HEIGHT,
  );

  const line1Validation = drawSkinnyBnAppMediumLine1(context, String(line1));
  const line2Validation = drawCenteredMixedLine2(
    context,
    String(line2),
    SKINNY_BN_APP_LAYOUT.line2,
  );

  return Object.freeze({
    line1: line1Validation,
    line2: line2Validation,
  });
}
