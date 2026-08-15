export const LINE_OA_WIDTH = 1040;
export const LINE_OA_HEIGHT = 1040;

const BACKGROUND_LEFT = 12;
const BACKGROUND_TOP = 12;
const BACKGROUND_WIDTH = 1016;
const BACKGROUND_HEIGHT = 1007;

const MEDIUM_FAMILY = "ShopeeNotoSans Medium";
const BOLD_FAMILY = "ShopeeNotoSans Bold";
const REGULAR_FAMILY = "ShopeeNotoSans Regular";

const HEADLINE_FONT = `55pt "${MEDIUM_FAMILY}"`;
const SUBHEADLINE_FONT = `68pt "${BOLD_FAMILY}"`;
const SUBHEADLINE_SYMBOL_FONT = `60pt "${BOLD_FAMILY}"`;
const PROTECTION_FONT = `30pt "${REGULAR_FAMILY}"`;

const FONT_CHECKS = Object.freeze([
  HEADLINE_FONT,
  SUBHEADLINE_FONT,
  SUBHEADLINE_SYMBOL_FONT,
  PROTECTION_FONT,
]);

const FONT_TEST_TEXT = "商城優選免運$490%";
const MEDIUM_RENDER_SCALE = 2;

export const LINE_OA_BACKGROUND = Object.freeze({
  left: BACKGROUND_LEFT,
  top: BACKGROUND_TOP,
  width: BACKGROUND_WIDTH,
  height: BACKGROUND_HEIGHT,
});

export const LINE_OA_LAYOUT = Object.freeze({
  headline: Object.freeze({
    left: 230,
    top: 154,
    width: 580,
    height: 68,
    font: HEADLINE_FONT,
    color: "#ffffff",
  }),
  subheadline: Object.freeze({
    left: 180,
    top: 240,
    width: 680,
    height: 86,
    font: SUBHEADLINE_FONT,
    symbolFont: SUBHEADLINE_SYMBOL_FONT,
    color: "#fff285",
  }),
  protectionText: Object.freeze({
    left: 180,
    top: 345,
    width: 680,
    height: 37,
    font: PROTECTION_FONT,
    color: "#a6f4e6",
  }),
});

function assertSpecificationFitsCanvas() {
  if (LINE_OA_WIDTH !== 1040 || LINE_OA_HEIGHT !== 1040) {
    throw new Error("A－11 正式 Canvas 尺寸無效，已停止 Template render。");
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
    BACKGROUND_LEFT + BACKGROUND_WIDTH > LINE_OA_WIDTH ||
    BACKGROUND_TOP + BACKGROUND_HEIGHT > LINE_OA_HEIGHT
  ) {
    throw new Error("A－11 正式底圖 placement 無效，已停止 Template render。");
  }

  for (const [name, box] of Object.entries(LINE_OA_LAYOUT)) {
    const values = [box.left, box.top, box.width, box.height];
    if (!values.every(Number.isFinite) || box.width <= 0 || box.height <= 0) {
      throw new Error(`A－11 ${name} 正式文字框無效，已停止 Template render。`);
    }
    if (
      box.left < 0 ||
      box.top < 0 ||
      box.left + box.width > LINE_OA_WIDTH ||
      box.top + box.height > LINE_OA_HEIGHT
    ) {
      throw new Error(`A－11 ${name} 正式文字框超出 Canvas，已停止 Template render。`);
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
    throw new Error("A－11 正式字型 metrics 無效，已停止 Template render。");
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
    if (!Number.isFinite(metrics.actualBoundingBoxDescent)) {
      throw new Error("A－11 副標 glyph metrics 無效，已停止 Template render。");
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
    throw new Error(`A－11 ${label} 正式文字 ink metrics 無效，已停止 Template render。`);
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

function drawLineOaMediumHeadline(context, headline) {
  const mediumCanvas = document.createElement("canvas");
  mediumCanvas.width = LINE_OA_WIDTH * MEDIUM_RENDER_SCALE;
  mediumCanvas.height = LINE_OA_HEIGHT * MEDIUM_RENDER_SCALE;
  if (mediumCanvas.width !== 2080 || mediumCanvas.height !== 2080) {
    throw new Error("A－11 Medium 暫存 Canvas 尺寸無效，已停止 Template render。");
  }

  const mediumContext = mediumCanvas.getContext("2d");
  if (!mediumContext) {
    throw new Error("無法建立 A－11 Medium 暫存 Canvas 2D context。");
  }

  mediumContext.clearRect(0, 0, mediumCanvas.width, mediumCanvas.height);
  mediumContext.globalAlpha = 1;
  mediumContext.globalCompositeOperation = "source-over";
  mediumContext.scale(MEDIUM_RENDER_SCALE, MEDIUM_RENDER_SCALE);
  const validation = drawCenteredText(
    mediumContext,
    headline,
    LINE_OA_LAYOUT.headline,
    "主標",
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
    LINE_OA_WIDTH,
    LINE_OA_HEIGHT,
  );
  context.restore();
  return validation;
}

function tokenizeSubheadline(text) {
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

function drawCenteredMixedSubheadline(context, text, box) {
  if (text === "") return validateCenteredInkFitsBox("副標", box, 0, 0);

  const runs = tokenizeSubheadline(text).map((run) =>
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
  const validation = validateCenteredInkFitsBox("副標", box, inkWidth, inkHeight);
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

function assertFontsReady() {
  if (
    !document.fonts ||
    !FONT_CHECKS.every((font) => document.fonts.check(font, FONT_TEST_TEXT))
  ) {
    throw new Error("正式字型尚未載入，已停止 A－11 Template render。");
  }
}

export async function waitForLineOaFonts() {
  if (!document.fonts) {
    throw new Error("瀏覽器不支援正式字型載入檢查，已停止 A－11 Template render。");
  }

  await Promise.all(
    FONT_CHECKS.map((font) => document.fonts.load(font, FONT_TEST_TEXT)),
  );
  assertFontsReady();
}

export function renderLineOa(
  canvas,
  backgroundImage,
  { headline = "", subheadline = "", protectionText = "" } = {},
) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new TypeError("A－11 Template 需要 HTMLCanvasElement。");
  }
  if (!(backgroundImage instanceof HTMLImageElement)) {
    throw new TypeError("A－11 Template 需要已載入的 HTMLImageElement 底圖。");
  }
  if (!backgroundImage.complete || backgroundImage.naturalWidth === 0) {
    throw new Error("A－11 正式底圖尚未完成解碼。");
  }
  if (
    backgroundImage.naturalWidth !== BACKGROUND_WIDTH ||
    backgroundImage.naturalHeight !== BACKGROUND_HEIGHT
  ) {
    throw new Error("A－11 正式底圖必須為 1016 × 1007px。");
  }

  assertSpecificationFitsCanvas();
  assertFontsReady();

  canvas.width = LINE_OA_WIDTH;
  canvas.height = LINE_OA_HEIGHT;
  if (canvas.width !== 1040 || canvas.height !== 1040) {
    throw new Error("A－11 正式 Canvas 尺寸設定失敗，已停止 Template render。");
  }

  const context = canvas.getContext("2d");
  if (!context) throw new Error("無法建立 A－11 Canvas 2D context。");

  context.clearRect(0, 0, LINE_OA_WIDTH, LINE_OA_HEIGHT);
  context.globalAlpha = 1;
  context.globalCompositeOperation = "source-over";
  context.drawImage(
    backgroundImage,
    BACKGROUND_LEFT,
    BACKGROUND_TOP,
    BACKGROUND_WIDTH,
    BACKGROUND_HEIGHT,
  );

  const headlineValidation = drawLineOaMediumHeadline(context, String(headline));
  const protectionTextValidation = drawCenteredText(
    context,
    String(protectionText),
    LINE_OA_LAYOUT.protectionText,
    "保護文字",
  );
  const subheadlineValidation = drawCenteredMixedSubheadline(
    context,
    String(subheadline),
    LINE_OA_LAYOUT.subheadline,
  );

  return Object.freeze({
    headline: headlineValidation,
    subheadline: subheadlineValidation,
    protectionText: protectionTextValidation,
  });
}
