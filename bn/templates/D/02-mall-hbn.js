// 樣式 D－02（02_MALL HBN）正式 Template definition。
// 文字 renderer 行為基準為已驗證的 bn/templates/A/02-mall-hbn.js；固定 Logo 處理基準為
// bn/templates/D/01-ddcard-bn.js。本檔不修改、不 import 上述任何檔案。
// 與 A 版同版位的差異只有一處：新增固定 Logo（三文字 geometry／樣式／對齊完全相同）。
// 固定素材（底圖、Logo）一律由 caller 載入完成後以 images object 傳入，本檔不自行載圖、不做 cache。
const MALL_HBN_WIDTH = 1200;
const MALL_HBN_HEIGHT = 360;

const MEDIUM_FAMILY = "ShopeeNotoSans Medium";
const BOLD_FAMILY = "ShopeeNotoSans Bold";

const HEADLINE_FONT = `30pt "${MEDIUM_FAMILY}"`;
const SUBHEADLINE_FONT = `45pt "${BOLD_FAMILY}"`;
const SUBHEADLINE_SYMBOL_FONT = `37pt "${BOLD_FAMILY}"`;
const PROTECTION_FONT = `18pt "${MEDIUM_FAMILY}"`;

const FONT_CHECKS = Object.freeze([
  HEADLINE_FONT,
  SUBHEADLINE_FONT,
  SUBHEADLINE_SYMBOL_FONT,
  PROTECTION_FONT,
]);

const FONT_TEST_TEXT = "商城優選免運$490%";
const MEDIUM_RENDER_SCALE = 2;

// D－02 placement。三個文字 box 與 A 版同版位完全相同（left／top／width／height 一字未改）；
// logo box 為 D－02 新增，不含 font／color，因為它不是文字。
const MALL_HBN_LAYOUT = Object.freeze({
  logo: Object.freeze({
    left: 98,
    top: 96,
    width: 351,
    height: 50,
  }),
  headline: Object.freeze({
    left: 98,
    top: 153,
    width: 351,
    height: 37,
    font: HEADLINE_FONT,
    color: "#ffffff",
  }),
  subheadline: Object.freeze({
    left: 98,
    top: 200,
    width: 445,
    height: 57,
    font: SUBHEADLINE_FONT,
    symbolFont: SUBHEADLINE_SYMBOL_FONT,
    color: "#fff285",
  }),
  protectionText: Object.freeze({
    left: 98,
    top: 273,
    width: 445,
    height: 22,
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

// D－02 固定 Logo：以 contain 等比例縮放完整落入 logo box，再**靠左靠上**貼齊。
// scale 取兩軸比例的最小值；正式素材 784 × 112 對 351 × 50 box 時
// scale = min(351/784, 50/112) = 25/56，destination 恰為 350 × 50、x = 98、y = 96。
// 水平明確靠左：destinationX = box.left，不套用 D－01 的水平置中公式。
// 垂直餘量恰為 0（destHeight 50 == box height 50），故靠上與置中結果相同，取 box.top。
// 不得 round／floor／ceil／截斷 destination 座標；不得為填滿 box 而非等比例拉伸；
// source rectangle 一律為完整原圖，不 cover、不 crop、不 clip。
function drawMallHbnLogo(context, logoImage, box) {
  const sourceWidth = logoImage.naturalWidth;
  const sourceHeight = logoImage.naturalHeight;
  const scale = Math.min(box.width / sourceWidth, box.height / sourceHeight);
  const destinationWidth = sourceWidth * scale;
  const destinationHeight = sourceHeight * scale;
  const destinationX = box.left;
  const destinationY = box.top;

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

function drawMallHbnMediumText(context, headline, protectionText) {
  const mediumCanvas = document.createElement("canvas");
  mediumCanvas.width = MALL_HBN_WIDTH * MEDIUM_RENDER_SCALE;
  mediumCanvas.height = MALL_HBN_HEIGHT * MEDIUM_RENDER_SCALE;
  const mediumContext = mediumCanvas.getContext("2d");
  if (!mediumContext) {
    throw new Error("無法建立 D－02 Medium 暫存 Canvas 2D context。");
  }

  mediumContext.scale(MEDIUM_RENDER_SCALE, MEDIUM_RENDER_SCALE);
  const headlineValidation = drawLeftTopText(
    mediumContext,
    headline,
    MALL_HBN_LAYOUT.headline,
  );
  const protectionTextValidation = drawLeftTopText(
    mediumContext,
    protectionText,
    MALL_HBN_LAYOUT.protectionText,
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
    MALL_HBN_WIDTH,
    MALL_HBN_HEIGHT,
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
    throw new Error("正式字型尚未載入，已停止 D－02 Template render。");
  }
}

export async function waitForMallHbnFonts() {
  if (!document.fonts) {
    throw new Error("瀏覽器不支援正式字型載入檢查，已停止 D－02 Template render。");
  }

  await Promise.all(
    FONT_CHECKS.map((font) => document.fonts.load(font, FONT_TEST_TEXT)),
  );
  assertFontsReady();
}

export function renderMallHbn(
  canvas,
  images,
  { headline = "", subheadline = "", protectionText = "" } = {},
) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new TypeError("D－02 Template 需要 HTMLCanvasElement。");
  }

  // 固定素材以 images object 傳入（沿用 A－17／D－01 既有 images-object invocation 慣例）。
  const { backgroundImage, logoImage } =
    images && typeof images === "object" ? images : {};

  if (!(backgroundImage instanceof HTMLImageElement)) {
    throw new TypeError("D－02 Template 需要已載入的 HTMLImageElement 底圖。");
  }
  if (!backgroundImage.complete || backgroundImage.naturalWidth === 0) {
    throw new Error("D－02 正式底圖尚未完成解碼。");
  }
  if (
    backgroundImage.naturalWidth !== MALL_HBN_WIDTH ||
    backgroundImage.naturalHeight !== MALL_HBN_HEIGHT
  ) {
    throw new Error("D－02 正式底圖必須為 1200 × 360px。");
  }

  // 固定 Logo 為 D－02 的必要組成，不是 optional，缺失或未解碼一律明確失敗。
  // 這裡只驗證「有效且已載入的圖片」；不得驗證原始尺寸等於 destination box，
  // 因為正式 Logo 原始尺寸為 784 × 112，而 destination box 為 351 × 50。
  if (!(logoImage instanceof HTMLImageElement)) {
    throw new TypeError("D－02 Template 需要已載入的 HTMLImageElement 固定 Logo。");
  }
  if (
    logoImage.complete !== true ||
    logoImage.naturalWidth <= 0 ||
    logoImage.naturalHeight <= 0
  ) {
    throw new Error("D－02 正式 Logo 尚未完成解碼。");
  }

  assertFontsReady();

  canvas.width = MALL_HBN_WIDTH;
  canvas.height = MALL_HBN_HEIGHT;
  if (
    canvas.width !== MALL_HBN_WIDTH ||
    canvas.height !== MALL_HBN_HEIGHT
  ) {
    throw new Error("D－02 正式 Canvas 尺寸設定失敗，已停止 Template render。");
  }
  const context = canvas.getContext("2d");
  if (!context) throw new Error("無法建立 D－02 Canvas 2D context。");

  context.globalAlpha = 1;
  context.globalCompositeOperation = "source-over";

  // Draw order：background → Logo → Medium local 2×（headline＋protectionText）→ Bold subheadline。
  // 四個 box 互不重疊；Logo 的 PNG alpha 由 Canvas 預設 source-over 自然合成。
  context.drawImage(backgroundImage, 0, 0, MALL_HBN_WIDTH, MALL_HBN_HEIGHT);

  drawMallHbnLogo(context, logoImage, MALL_HBN_LAYOUT.logo);

  const mediumTextValidation = drawMallHbnMediumText(
    context,
    String(headline),
    String(protectionText),
  );
  const subheadlineValidation = drawLeftTopMixedSubheadline(
    context,
    String(subheadline),
    MALL_HBN_LAYOUT.subheadline,
  );

  return Object.freeze({
    headline: mediumTextValidation.headline,
    subheadline: subheadlineValidation,
    protectionText: mediumTextValidation.protectionText,
  });
}
