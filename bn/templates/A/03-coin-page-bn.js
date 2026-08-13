export const COIN_PAGE_BN_WIDTH = 1200;
export const COIN_PAGE_BN_HEIGHT = 391;

const MEDIUM_FAMILY = "ShopeeNotoSans Medium";
const BOLD_FAMILY = "ShopeeNotoSans Bold";

const HEADLINE_FONT = `37pt "${MEDIUM_FAMILY}"`;
const SUBHEADLINE_FONT = `50pt "${BOLD_FAMILY}"`;
const SUBHEADLINE_SYMBOL_FONT = `40pt "${BOLD_FAMILY}"`;
const PROTECTION_FONT = `21pt "${MEDIUM_FAMILY}"`;

const FONT_CHECKS = Object.freeze([
  HEADLINE_FONT,
  SUBHEADLINE_FONT,
  SUBHEADLINE_SYMBOL_FONT,
  PROTECTION_FONT,
]);

const FONT_TEST_TEXT = "商城優選免運$490%";
const MEDIUM_RENDER_SCALE = 2;

export const COIN_PAGE_BN_LAYOUT = Object.freeze({
  headline: Object.freeze({
    left: 92,
    top: 168,
    width: 395,
    height: 46,
    font: HEADLINE_FONT,
    color: "#ffffff",
  }),
  subheadline: Object.freeze({
    left: 92,
    top: 225,
    width: 500,
    height: 64,
    font: SUBHEADLINE_FONT,
    symbolFont: SUBHEADLINE_SYMBOL_FONT,
    color: "#fff285",
  }),
  protectionText: Object.freeze({
    left: 92,
    top: 302,
    width: 500,
    height: 25,
    font: PROTECTION_FONT,
    color: "#a6f4e6",
  }),
});

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
    if (hasInk(metrics)) return metrics.actualBoundingBoxDescent;
  }

  return null;
}

function validateInkFitsBox(box, inkWidth, inkHeight) {
  return Object.freeze({
    inkWidth,
    inkHeight,
    inkRight: box.left + inkWidth,
    inkBottom: box.top + inkHeight,
    fitsWidth: inkWidth <= box.width,
    fitsHeight: inkHeight <= box.height,
  });
}

function drawLeftTopText(context, text, box) {
  if (text === "") return validateInkFitsBox(box, 0, 0);

  const run = measureRun(context, text, box.font);
  const inkWidth = run.inkRight - run.inkLeft;
  const inkHeight = run.inkBottom - run.inkTop;
  const validation = validateInkFitsBox(box, inkWidth, inkHeight);

  const x = box.left - run.inkLeft;
  const y = box.top - run.inkTop;

  context.font = box.font;
  context.fillStyle = box.color;
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  context.fillText(text, x, y);
  return validation;
}

function drawCoinPageBnMediumText(context, headline, protectionText) {
  const mediumCanvas = document.createElement("canvas");
  mediumCanvas.width = COIN_PAGE_BN_WIDTH * MEDIUM_RENDER_SCALE;
  mediumCanvas.height = COIN_PAGE_BN_HEIGHT * MEDIUM_RENDER_SCALE;
  const mediumContext = mediumCanvas.getContext("2d");
  if (!mediumContext) {
    throw new Error("無法建立 A－03 Medium 暫存 Canvas 2D context。");
  }

  mediumContext.scale(MEDIUM_RENDER_SCALE, MEDIUM_RENDER_SCALE);
  const headlineValidation = drawLeftTopText(
    mediumContext,
    headline,
    COIN_PAGE_BN_LAYOUT.headline,
  );
  const protectionTextValidation = drawLeftTopText(
    mediumContext,
    protectionText,
    COIN_PAGE_BN_LAYOUT.protectionText,
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
    COIN_PAGE_BN_WIDTH,
    COIN_PAGE_BN_HEIGHT,
  );
  context.restore();

  return Object.freeze({
    headline: headlineValidation,
    protectionText: protectionTextValidation,
  });
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

function drawLeftTopMixedSubheadline(context, text, box) {
  if (text === "") return validateInkFitsBox(box, 0, 0);

  const runs = tokenizeSubheadline(text).map((run) =>
    measureRun(
      context,
      run.text,
      run.symbol ? box.symbolFont : box.font,
      run.symbol,
    ),
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
  const validation = validateInkFitsBox(
    box,
    inkRight - inkLeft,
    inkBottom - inkTop,
  );

  const offsetX = box.left - inkLeft;
  const offsetY = box.top - inkTop;

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
    throw new Error("正式字型尚未載入，已停止 A－03 Template render。");
  }
}

export async function waitForCoinPageBnFonts() {
  if (!document.fonts) {
    throw new Error("瀏覽器不支援正式字型載入檢查，已停止 A－03 Template render。");
  }

  await Promise.all(
    FONT_CHECKS.map((font) => document.fonts.load(font, FONT_TEST_TEXT)),
  );
  assertFontsReady();
}

export function renderCoinPageBn(
  canvas,
  backgroundImage,
  { headline = "", subheadline = "", protectionText = "" } = {},
) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new TypeError("A－03 Template 需要 HTMLCanvasElement。");
  }
  if (!(backgroundImage instanceof HTMLImageElement)) {
    throw new TypeError("A－03 Template 需要已載入的 HTMLImageElement 底圖。");
  }
  if (
    backgroundImage.naturalWidth !== COIN_PAGE_BN_WIDTH ||
    backgroundImage.naturalHeight !== COIN_PAGE_BN_HEIGHT
  ) {
    throw new Error("A－03 正式底圖必須為 1200 × 391px。");
  }

  assertFontsReady();

  canvas.width = COIN_PAGE_BN_WIDTH;
  canvas.height = COIN_PAGE_BN_HEIGHT;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("無法建立 A－03 Canvas 2D context。");

  context.globalAlpha = 1;
  context.globalCompositeOperation = "source-over";
  context.drawImage(
    backgroundImage,
    0,
    0,
    COIN_PAGE_BN_WIDTH,
    COIN_PAGE_BN_HEIGHT,
  );

  const mediumTextValidation = drawCoinPageBnMediumText(
    context,
    String(headline),
    String(protectionText),
  );
  const subheadlineValidation = drawLeftTopMixedSubheadline(
    context,
    String(subheadline),
    COIN_PAGE_BN_LAYOUT.subheadline,
  );

  return Object.freeze({
    headline: mediumTextValidation.headline,
    subheadline: subheadlineValidation,
    protectionText: mediumTextValidation.protectionText,
  });
}
