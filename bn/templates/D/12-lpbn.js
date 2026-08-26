const LPBN_WIDTH = 1200;
const LPBN_HEIGHT = 550;

const BACKGROUND_LEFT = 0;
const BACKGROUND_TOP = 0;
const BACKGROUND_WIDTH = 1200;
const BACKGROUND_HEIGHT = 550;

const MEDIUM_FAMILY = "ShopeeNotoSans Medium";
const BOLD_FAMILY = "ShopeeNotoSans Bold";

const HEADLINE_FONT = `39pt "${MEDIUM_FAMILY}"`;
const SUBHEADLINE_FONT = `49pt "${BOLD_FAMILY}"`;
const SUBHEADLINE_SYMBOL_FONT = `42pt "${BOLD_FAMILY}"`;
const PROTECTION_FONT = `22.5pt "${MEDIUM_FAMILY}"`;

const FONT_CHECKS = Object.freeze([
  HEADLINE_FONT,
  SUBHEADLINE_FONT,
  SUBHEADLINE_SYMBOL_FONT,
  PROTECTION_FONT,
]);

const FONT_TEST_TEXT = "商城優選免運$490%";
const MEDIUM_RENDER_SCALE = 2;

const LPBN_BACKGROUND = Object.freeze({
  left: BACKGROUND_LEFT,
  top: BACKGROUND_TOP,
  width: BACKGROUND_WIDTH,
  height: BACKGROUND_HEIGHT,
});

const LPBN_LAYOUT = Object.freeze({
  logo: Object.freeze({
    left: 58,
    top: 161,
    width: 365,
    height: 52,
  }),
  headline: Object.freeze({
    left: 58,
    top: 226,
    width: 405,
    height: 49,
    font: HEADLINE_FONT,
    color: "#ffffff",
  }),
  subheadline: Object.freeze({
    left: 58,
    top: 285,
    width: 475,
    height: 62,
    font: SUBHEADLINE_FONT,
    symbolFont: SUBHEADLINE_SYMBOL_FONT,
    color: "#fff285",
  }),
  protectionText: Object.freeze({
    left: 58,
    top: 360,
    width: 475,
    height: 28,
    font: PROTECTION_FONT,
    color: "#a6f4e6",
  }),
});

function assertSpecificationFitsCanvas() {
  if (LPBN_WIDTH !== 1200 || LPBN_HEIGHT !== 550) {
    throw new Error("D－12 正式 Canvas 尺寸無效，已停止 Template render。");
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
    BACKGROUND_LEFT + BACKGROUND_WIDTH > LPBN_WIDTH ||
    BACKGROUND_TOP + BACKGROUND_HEIGHT > LPBN_HEIGHT
  ) {
    throw new Error("D－12 正式底圖 placement 無效，已停止 Template render。");
  }

  for (const [name, box] of Object.entries(LPBN_LAYOUT)) {
    const values = [box.left, box.top, box.width, box.height];
    if (!values.every(Number.isFinite) || box.width <= 0 || box.height <= 0) {
      throw new Error(`D－12 ${name} 正式文字框無效，已停止 Template render。`);
    }
    if (
      box.left < 0 ||
      box.top < 0 ||
      box.left + box.width > LPBN_WIDTH ||
      box.top + box.height > LPBN_HEIGHT
    ) {
      throw new Error(`D－12 ${name} 正式文字框超出 Canvas，已停止 Template render。`);
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
    throw new Error("D－12 正式字型 metrics 無效，已停止 Template render。");
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
      throw new Error("D－12 副標 glyph metrics 無效，已停止 Template render。");
    }
    if (hasInk(metrics)) return metrics.actualBoundingBoxDescent;
  }

  return null;
}

function validateLeftCenteredInkFitsBox(label, box, inkWidth, inkHeight) {
  if (
    ![inkWidth, inkHeight].every(Number.isFinite) ||
    inkWidth < 0 ||
    inkHeight < 0
  ) {
    throw new Error(`D－12 ${label} 正式文字 ink metrics 無效，已停止 Template render。`);
  }

  const inkLeft = box.left;
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

function drawLeftCenteredText(context, text, box, label) {
  if (text === "") return validateLeftCenteredInkFitsBox(label, box, 0, 0);

  const run = measureRun(context, text, box.font);
  const inkWidth = run.inkRight - run.inkLeft;
  const inkHeight = run.inkBottom - run.inkTop;
  const validation = validateLeftCenteredInkFitsBox(
    label,
    box,
    inkWidth,
    inkHeight,
  );
  const x = box.left - run.inkLeft;
  const y = box.top + box.height / 2 - (run.inkTop + run.inkBottom) / 2;

  context.font = box.font;
  context.fillStyle = box.color;
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  context.fillText(text, x, y);
  return validation;
}

function drawLpbnLogo(context, logoImage, box) {
  const sourceWidth = logoImage.naturalWidth;
  const sourceHeight = logoImage.naturalHeight;
  const scale = Math.min(
    1,
    box.width / sourceWidth,
    box.height / sourceHeight,
  );
  const destinationWidth = sourceWidth * scale;
  const destinationHeight = sourceHeight * scale;
  const destinationX = box.left;
  const destinationY = box.top + (box.height - destinationHeight) / 2;

  context.save();
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(
    logoImage,
    0,
    0,
    sourceWidth,
    sourceHeight,
    destinationX,
    destinationY,
    destinationWidth,
    destinationHeight,
  );
  context.restore();
}

function drawLpbnMediumText(context, headline, protectionText) {
  const mediumCanvas = document.createElement("canvas");
  mediumCanvas.width = LPBN_WIDTH * MEDIUM_RENDER_SCALE;
  mediumCanvas.height = LPBN_HEIGHT * MEDIUM_RENDER_SCALE;
  if (mediumCanvas.width !== 2400 || mediumCanvas.height !== 1100) {
    throw new Error("D－12 Medium 暫存 Canvas 尺寸無效，已停止 Template render。");
  }

  const mediumContext = mediumCanvas.getContext("2d");
  if (!mediumContext) {
    throw new Error("無法建立 D－12 Medium 暫存 Canvas 2D context。");
  }

  mediumContext.clearRect(0, 0, mediumCanvas.width, mediumCanvas.height);
  mediumContext.globalAlpha = 1;
  mediumContext.globalCompositeOperation = "source-over";
  mediumContext.scale(MEDIUM_RENDER_SCALE, MEDIUM_RENDER_SCALE);
  const headlineValidation = drawLeftCenteredText(
    mediumContext,
    headline,
    LPBN_LAYOUT.headline,
    "主標",
  );
  const protectionTextValidation = drawLeftCenteredText(
    mediumContext,
    protectionText,
    LPBN_LAYOUT.protectionText,
    "保護文字",
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
    LPBN_WIDTH,
    LPBN_HEIGHT,
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

function drawLeftCenteredMixedSubheadline(context, text, box) {
  if (text === "") {
    return validateLeftCenteredInkFitsBox("副標", box, 0, 0);
  }

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
  const validation = validateLeftCenteredInkFitsBox(
    "副標",
    box,
    inkWidth,
    inkHeight,
  );
  const offsetX = box.left - inkLeft;
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
    throw new Error("正式字型尚未載入，已停止 D－12 Template render。");
  }
}

export async function waitForLpbnFonts() {
  if (!hasFontFaceSetCapabilities()) {
    throw new Error("瀏覽器不支援正式字型載入檢查，已停止 D－12 Template render。");
  }

  await Promise.all(
    FONT_CHECKS.map((font) => document.fonts.load(font, FONT_TEST_TEXT)),
  );
  assertFontsReady();
}

export function renderLpbn(
  canvas,
  images,
  { headline = "", subheadline = "", protectionText = "" } = {},
) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new TypeError("D－12 Template 需要 HTMLCanvasElement。");
  }
  const { backgroundImage, logoImage } =
    images && typeof images === "object" ? images : {};
  if (!(backgroundImage instanceof HTMLImageElement)) {
    throw new TypeError("D－12 Template 需要已載入的 HTMLImageElement 底圖。");
  }
  if (!backgroundImage.complete || backgroundImage.naturalWidth === 0) {
    throw new Error("D－12 正式底圖尚未完成解碼。");
  }
  if (
    backgroundImage.naturalWidth !== BACKGROUND_WIDTH ||
    backgroundImage.naturalHeight !== BACKGROUND_HEIGHT
  ) {
    throw new Error("D－12 正式底圖必須為 1200 × 550px。");
  }

  if (!(logoImage instanceof HTMLImageElement)) {
    throw new TypeError("D－12 Template 需要已載入的 HTMLImageElement 固定 Logo。");
  }
  if (
    logoImage.complete !== true ||
    logoImage.naturalWidth <= 0 ||
    logoImage.naturalHeight <= 0
  ) {
    throw new Error("D－12 正式 Logo 尚未完成解碼。");
  }

  assertSpecificationFitsCanvas();
  assertFontsReady();

  canvas.width = LPBN_WIDTH;
  canvas.height = LPBN_HEIGHT;
  if (canvas.width !== 1200 || canvas.height !== 550) {
    throw new Error("D－12 正式 Canvas 尺寸設定失敗，已停止 Template render。");
  }

  const context = canvas.getContext("2d");
  if (!context) throw new Error("無法建立 D－12 Canvas 2D context。");

  context.clearRect(0, 0, LPBN_WIDTH, LPBN_HEIGHT);
  context.globalAlpha = 1;
  context.globalCompositeOperation = "source-over";
  context.drawImage(
    backgroundImage,
    BACKGROUND_LEFT,
    BACKGROUND_TOP,
    BACKGROUND_WIDTH,
    BACKGROUND_HEIGHT,
  );

  drawLpbnLogo(context, logoImage, LPBN_LAYOUT.logo);

  const mediumTextValidation = drawLpbnMediumText(
    context,
    String(headline),
    String(protectionText),
  );
  const subheadlineValidation = drawLeftCenteredMixedSubheadline(
    context,
    String(subheadline),
    LPBN_LAYOUT.subheadline,
  );

  return Object.freeze({
    headline: mediumTextValidation.headline,
    subheadline: subheadlineValidation,
    protectionText: mediumTextValidation.protectionText,
  });
}
