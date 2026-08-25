// 樣式 D－07（07_FB POST）正式 Template definition。
// 文字 renderer 行為基準為已驗證的 bn/templates/A/07-fb-post.js；固定 Logo 的水平靠左取自
// bn/templates/D/02-mall-hbn.js、垂直置中取自 bn/templates/D/01-ddcard-bn.js。本檔不修改、不 import 上述任何檔案。
// 與 A 版同版位的差異只有一處：新增固定 Logo（三文字 geometry／樣式／對齊完全相同）。
// 固定素材（底圖、Logo）一律由 caller 載入完成後以 images object 傳入，本檔不自行載圖、不做 cache。
const FB_POST_WIDTH = 1200;
const FB_POST_HEIGHT = 630;

const BACKGROUND_WIDTH = 1200;
const BACKGROUND_HEIGHT = 630;

const MEDIUM_FAMILY = "ShopeeNotoSans Medium";
const BOLD_FAMILY = "ShopeeNotoSans Bold";

const HEADLINE_FONT = `39pt "${MEDIUM_FAMILY}"`;
const SUBHEADLINE_FONT = `49pt "${BOLD_FAMILY}"`;
const SUBHEADLINE_SYMBOL_FONT = `41pt "${BOLD_FAMILY}"`;
const PROTECTION_FONT = `22.5pt "${MEDIUM_FAMILY}"`;

const FONT_CHECKS = Object.freeze([
  HEADLINE_FONT,
  SUBHEADLINE_FONT,
  SUBHEADLINE_SYMBOL_FONT,
  PROTECTION_FONT,
]);

const FONT_TEST_TEXT = "商城優選免運$490%";
const MEDIUM_RENDER_SCALE = 2;

// D－07 placement。三個文字 box 與 A 版同版位完全相同（left／top／width／height 一字未改）；
// logo box 為 D－07 新增，不含 font／color，因為它不是文字。
// 四個 box 共用 left = 54；assertLayoutFitsCanvas 會自然一併驗證 logo box。
const FB_POST_LAYOUT = Object.freeze({
  logo: Object.freeze({
    left: 54,
    top: 201,
    width: 365,
    height: 52,
  }),
  headline: Object.freeze({
    left: 54,
    top: 266,
    width: 405,
    height: 49,
    font: HEADLINE_FONT,
    color: "#ffffff",
  }),
  subheadline: Object.freeze({
    left: 54,
    top: 325,
    width: 475,
    height: 62,
    font: SUBHEADLINE_FONT,
    symbolFont: SUBHEADLINE_SYMBOL_FONT,
    color: "#fff285",
  }),
  protectionText: Object.freeze({
    left: 54,
    top: 401,
    width: 475,
    height: 28,
    font: PROTECTION_FONT,
    color: "#a6f4e6",
  }),
});

function assertLayoutFitsCanvas() {
  for (const [name, box] of Object.entries(FB_POST_LAYOUT)) {
    const values = [box.left, box.top, box.width, box.height];
    if (!values.every(Number.isFinite) || box.width <= 0 || box.height <= 0) {
      throw new Error(`D－07 ${name} 正式文字框無效，已停止 Template render。`);
    }
    if (
      box.left < 0 ||
      box.top < 0 ||
      box.left + box.width > FB_POST_WIDTH ||
      box.top + box.height > FB_POST_HEIGHT
    ) {
      throw new Error(`D－07 ${name} 正式文字框超出 Canvas，已停止 Template render。`);
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
    throw new Error("D－07 正式字型 metrics 無效，已停止 Template render。");
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
      throw new Error("D－07 副標 glyph metrics 無效，已停止 Template render。");
    }
    if (hasInk(metrics)) return metrics.actualBoundingBoxDescent;
  }

  return null;
}

function validateLeftCenteredInkFitsBox(box, inkWidth, inkHeight) {
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

function drawLeftCenteredText(context, text, box) {
  if (text === "") return validateLeftCenteredInkFitsBox(box, 0, 0);

  const run = measureRun(context, text, box.font);
  const inkWidth = run.inkRight - run.inkLeft;
  const inkHeight = run.inkBottom - run.inkTop;
  const validation = validateLeftCenteredInkFitsBox(box, inkWidth, inkHeight);
  const x = box.left - run.inkLeft;
  const y = box.top + box.height / 2 - (run.inkTop + run.inkBottom) / 2;

  context.font = box.font;
  context.fillStyle = box.color;
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  context.fillText(text, x, y);
  return validation;
}

// D－07 固定 Logo：以 contain 等比例縮放完整落入 logo box，水平**靠左**、垂直**置中**。
// 現行素材 784 × 112 與 box 365 × 52 下，scale = 13/28，destination 為 364 × 52 @ (54, 201)，
// 左餘 0px、右餘 1px、上餘 0px、下餘 0px，四值皆為整數；不套用任何取整，也不 stretch／cover／crop。
function drawFbPostLogo(context, logoImage, box) {
  const sourceWidth = logoImage.naturalWidth;
  const sourceHeight = logoImage.naturalHeight;
  const scale = Math.min(box.width / sourceWidth, box.height / sourceHeight);
  const destinationWidth = sourceWidth * scale;
  const destinationHeight = sourceHeight * scale;
  const destinationX = box.left;
  const destinationY = box.top + (box.height - destinationHeight) / 2;

  // Logo smoothing 自成一組 save／restore，不依賴 Medium 2× 的 smoothing state。
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

function drawFbPostMediumText(context, headline, protectionText) {
  const mediumCanvas = document.createElement("canvas");
  mediumCanvas.width = FB_POST_WIDTH * MEDIUM_RENDER_SCALE;
  mediumCanvas.height = FB_POST_HEIGHT * MEDIUM_RENDER_SCALE;
  const mediumContext = mediumCanvas.getContext("2d");
  if (!mediumContext) {
    throw new Error("無法建立 D－07 Medium 暫存 Canvas 2D context。");
  }

  mediumContext.scale(MEDIUM_RENDER_SCALE, MEDIUM_RENDER_SCALE);
  const headlineValidation = drawLeftCenteredText(
    mediumContext,
    headline,
    FB_POST_LAYOUT.headline,
  );
  const protectionTextValidation = drawLeftCenteredText(
    mediumContext,
    protectionText,
    FB_POST_LAYOUT.protectionText,
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
    FB_POST_WIDTH,
    FB_POST_HEIGHT,
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
  if (text === "") return validateLeftCenteredInkFitsBox(box, 0, 0);

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
  const inkWidth = inkRight - inkLeft;
  const inkHeight = inkBottom - inkTop;
  const validation = validateLeftCenteredInkFitsBox(box, inkWidth, inkHeight);
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

function assertFontsReady() {
  if (
    !document.fonts ||
    !FONT_CHECKS.every((font) => document.fonts.check(font, FONT_TEST_TEXT))
  ) {
    throw new Error("正式字型尚未載入，已停止 D－07 Template render。");
  }
}

export async function waitForFbPostFonts() {
  if (!document.fonts) {
    throw new Error("瀏覽器不支援正式字型載入檢查，已停止 D－07 Template render。");
  }

  await Promise.all(
    FONT_CHECKS.map((font) => document.fonts.load(font, FONT_TEST_TEXT)),
  );
  assertFontsReady();
}

export function renderFbPost(
  canvas,
  images,
  { headline = "", subheadline = "", protectionText = "" } = {},
) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new TypeError("D－07 Template 需要 HTMLCanvasElement。");
  }
  // 固定素材以 images object 傳入（與 D－01／D－02／D－03／D－06 一致），防禦式解構。
  const { backgroundImage, logoImage } =
    images && typeof images === "object" ? images : {};
  if (!(backgroundImage instanceof HTMLImageElement)) {
    throw new TypeError("D－07 Template 需要已載入的 HTMLImageElement 底圖。");
  }
  if (!backgroundImage.complete || backgroundImage.naturalWidth === 0) {
    throw new Error("D－07 正式底圖尚未完成解碼。");
  }
  if (
    backgroundImage.naturalWidth !== BACKGROUND_WIDTH ||
    backgroundImage.naturalHeight !== BACKGROUND_HEIGHT
  ) {
    throw new Error("D－07 正式底圖必須為 1200 × 630px。");
  }

  // 固定 Logo 為 D－07 的必要組成，不是 optional，缺失或未解碼一律明確失敗。
  if (!(logoImage instanceof HTMLImageElement)) {
    throw new TypeError("D－07 Template 需要已載入的 HTMLImageElement 固定 Logo。");
  }
  if (
    logoImage.complete !== true ||
    logoImage.naturalWidth <= 0 ||
    logoImage.naturalHeight <= 0
  ) {
    throw new Error("D－07 正式 Logo 尚未完成解碼。");
  }

  assertLayoutFitsCanvas();
  assertFontsReady();

  canvas.width = FB_POST_WIDTH;
  canvas.height = FB_POST_HEIGHT;
  if (canvas.width !== FB_POST_WIDTH || canvas.height !== FB_POST_HEIGHT) {
    throw new Error("D－07 正式 Canvas 尺寸設定失敗，已停止 Template render。");
  }
  const context = canvas.getContext("2d");
  if (!context) throw new Error("無法建立 D－07 Canvas 2D context。");

  context.globalAlpha = 1;
  context.globalCompositeOperation = "source-over";
  context.drawImage(backgroundImage, 0, 0, BACKGROUND_WIDTH, BACKGROUND_HEIGHT);

  // draw order：background → Logo → Medium local 2×（主標＋保護文字）→ Bold 副標。
  drawFbPostLogo(context, logoImage, FB_POST_LAYOUT.logo);

  const mediumTextValidation = drawFbPostMediumText(
    context,
    String(headline),
    String(protectionText),
  );
  const subheadlineValidation = drawLeftCenteredMixedSubheadline(
    context,
    String(subheadline),
    FB_POST_LAYOUT.subheadline,
  );

  return Object.freeze({
    headline: mediumTextValidation.headline,
    subheadline: subheadlineValidation,
    protectionText: mediumTextValidation.protectionText,
  });
}
