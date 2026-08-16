export const AR_WIDTH = 100;
export const AR_HEIGHT = 100;

const BACKGROUND_LEFT = 0;
const BACKGROUND_TOP = 0;
const BACKGROUND_WIDTH = 100;
const BACKGROUND_HEIGHT = 100;

const BOLD_FAMILY = "ShopeeNotoSans Bold";

const HAN_FONT = `18pt "${BOLD_FAMILY}"`;
const OTHER_FONT = `18.5pt "${BOLD_FAMILY}"`;

const HAN_PATTERN = /\p{Script=Han}/u;

const FONT_CHECKS = Object.freeze([HAN_FONT, OTHER_FONT]);

const FONT_TEST_TEXT = "宅配滿$490";

export const AR_BACKGROUND = Object.freeze({
  left: BACKGROUND_LEFT,
  top: BACKGROUND_TOP,
  width: BACKGROUND_WIDTH,
  height: BACKGROUND_HEIGHT,
});

// Photoshop 工作區原始 frame：第一行 481,422,72,25、第二行 481,454,72,25。
// 歷史座標轉換：xLocal = xPhotoshop - 467、yLocal = yPhotoshop - 400；僅作來源紀錄，
// renderer 直接使用下列正式 runtime frames。
export const AR_LAYOUT = Object.freeze({
  line1: Object.freeze({
    left: 14,
    top: 22,
    width: 72,
    height: 25,
    hanFont: HAN_FONT,
    otherFont: OTHER_FONT,
    color: "#fff285",
  }),
  line2: Object.freeze({
    left: 14,
    top: 54,
    width: 72,
    height: 25,
    hanFont: HAN_FONT,
    otherFont: OTHER_FONT,
    color: "#fff285",
  }),
});

function assertSpecificationFitsCanvas() {
  if (AR_WIDTH !== 100 || AR_HEIGHT !== 100) {
    throw new Error("A－15 正式 Canvas 尺寸無效，已停止 Template render。");
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
    BACKGROUND_LEFT + BACKGROUND_WIDTH > AR_WIDTH ||
    BACKGROUND_TOP + BACKGROUND_HEIGHT > AR_HEIGHT
  ) {
    throw new Error("A－15 正式底圖 placement 無效，已停止 Template render。");
  }

  for (const [name, box] of Object.entries(AR_LAYOUT)) {
    const values = [box.left, box.top, box.width, box.height];
    if (!values.every(Number.isFinite) || box.width <= 0 || box.height <= 0) {
      throw new Error(`A－15 ${name} 正式文字框無效，已停止 Template render。`);
    }
    if (
      box.left < 0 ||
      box.top < 0 ||
      box.left + box.width > AR_WIDTH ||
      box.top + box.height > AR_HEIGHT
    ) {
      throw new Error(`A－15 ${name} 正式文字框超出 Canvas，已停止 Template render。`);
    }
  }
}

function measureRun(context, text, font, han) {
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
    throw new Error("A－15 正式字型 metrics 無效，已停止 Template render。");
  }

  return {
    text,
    font,
    han,
    advanceWidth: metrics.width,
    inkLeft: -metrics.actualBoundingBoxLeft,
    inkRight: metrics.actualBoundingBoxRight,
    inkTop: -metrics.actualBoundingBoxAscent,
    inkBottom: metrics.actualBoundingBoxDescent,
    x: 0,
  };
}

function tokenizeLine(text) {
  const runs = [];
  let currentText = "";
  let currentHan = null;

  const flushRun = () => {
    if (currentText === "") return;
    runs.push({ text: currentText, han: currentHan });
    currentText = "";
  };

  for (const character of text) {
    const han = HAN_PATTERN.test(character);
    if (han !== currentHan) {
      flushRun();
      currentHan = han;
    }
    currentText += character;
  }
  flushRun();
  return runs;
}

function validateCenteredInkFitsBox(label, box, inkWidth, inkHeight) {
  if (
    ![inkWidth, inkHeight].every(Number.isFinite) ||
    inkWidth < 0 ||
    inkHeight < 0
  ) {
    throw new Error(`A－15 ${label} 正式文字 ink metrics 無效，已停止 Template render。`);
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

function drawCenteredMixedLine(context, text, box, label) {
  if (text === "") return validateCenteredInkFitsBox(label, box, 0, 0);

  const runs = tokenizeLine(text).map((run) =>
    measureRun(context, run.text, run.han ? box.hanFont : box.otherFont, run.han),
  );

  let cursor = 0;
  for (const run of runs) {
    run.x = cursor;
    cursor += run.advanceWidth;
  }

  const inkLeft = Math.min(...runs.map((run) => run.x + run.inkLeft));
  const inkRight = Math.max(...runs.map((run) => run.x + run.inkRight));
  const inkTop = Math.min(...runs.map((run) => run.inkTop));
  const inkBottom = Math.max(...runs.map((run) => run.inkBottom));
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
    context.fillText(run.text, offsetX + run.x, offsetY);
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
    throw new Error("正式字型尚未載入，已停止 A－15 Template render。");
  }
}

export async function waitForArFonts() {
  if (!hasFontFaceSetCapabilities()) {
    throw new Error("瀏覽器不支援正式字型載入檢查，已停止 A－15 Template render。");
  }

  await Promise.all(
    FONT_CHECKS.map((font) => document.fonts.load(font, FONT_TEST_TEXT)),
  );
  assertFontsReady();
}

export function renderAr(
  canvas,
  backgroundImage,
  { line1 = "", line2 = "" } = {},
) {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new TypeError("A－15 Template 需要 HTMLCanvasElement。");
  }
  if (!(backgroundImage instanceof HTMLImageElement)) {
    throw new TypeError("A－15 Template 需要已載入的 HTMLImageElement 底圖。");
  }
  if (!backgroundImage.complete || backgroundImage.naturalWidth === 0) {
    throw new Error("A－15 正式底圖尚未完成解碼。");
  }
  if (
    backgroundImage.naturalWidth !== BACKGROUND_WIDTH ||
    backgroundImage.naturalHeight !== BACKGROUND_HEIGHT
  ) {
    throw new Error("A－15 正式底圖必須為 100 × 100px。");
  }

  assertSpecificationFitsCanvas();
  assertFontsReady();

  canvas.width = AR_WIDTH;
  canvas.height = AR_HEIGHT;
  if (canvas.width !== 100 || canvas.height !== 100) {
    throw new Error("A－15 正式 Canvas 尺寸設定失敗，已停止 Template render。");
  }

  const context = canvas.getContext("2d");
  if (!context) throw new Error("無法建立 A－15 Canvas 2D context。");

  context.clearRect(0, 0, AR_WIDTH, AR_HEIGHT);
  context.globalAlpha = 1;
  context.globalCompositeOperation = "source-over";
  context.drawImage(
    backgroundImage,
    BACKGROUND_LEFT,
    BACKGROUND_TOP,
    BACKGROUND_WIDTH,
    BACKGROUND_HEIGHT,
  );

  const line1Validation = drawCenteredMixedLine(
    context,
    String(line1),
    AR_LAYOUT.line1,
    "第一行",
  );
  const line2Validation = drawCenteredMixedLine(
    context,
    String(line2),
    AR_LAYOUT.line2,
    "第二行",
  );

  return Object.freeze({
    line1: line1Validation,
    line2: line2Validation,
  });
}
