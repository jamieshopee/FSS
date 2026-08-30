import { isValidCCountdown } from "../../js/countdown.js";
import {
  SKINNY_BN_APP_HEIGHT,
  SKINNY_BN_APP_WIDTH,
  renderSkinnyBnApp as renderASkinnyBnApp,
  waitForSkinnyBnAppFonts as waitForASkinnyBnAppFonts
} from "../A/13-skinny-bn-app.js";

const COUNTDOWN_FONT = '31pt "ShopeeNotoSans Bold"';
const COUNTDOWN_COLOR = "#ff4c45";
const COUNTDOWN_FONT_TEST_TEXT = "0天";
const COUNTDOWN_ANGLE_DEGREES = -2.1;
const COUNTDOWN_ANGLE_RADIANS = (COUNTDOWN_ANGLE_DEGREES * Math.PI) / 180;
const COUNTDOWN_TARGET_X = 142;
const COUNTDOWN_TARGET_Y = 266.5;
const COUNTDOWN_VISUAL_SCALE = 1.0;

function assertCountdownFontReady() {
  if (
    !document.fonts ||
    !document.fonts.check(COUNTDOWN_FONT, COUNTDOWN_FONT_TEST_TEXT)
  ) {
    throw new Error("正式倒數字型尚未載入，已停止 C－13 Template render。");
  }
}

function drawCountdown(context, text) {
  context.font = COUNTDOWN_FONT;
  context.textAlign = "left";
  context.textBaseline = "alphabetic";

  const metrics = context.measureText(text);
  const metricValues = [
    metrics.actualBoundingBoxLeft,
    metrics.actualBoundingBoxRight,
    metrics.actualBoundingBoxAscent,
    metrics.actualBoundingBoxDescent
  ];
  if (!metricValues.every(Number.isFinite)) {
    throw new Error("瀏覽器無法取得 C－13 倒數文字的正式 glyph metrics。");
  }

  const inkLeft = -metrics.actualBoundingBoxLeft;
  const inkRight = metrics.actualBoundingBoxRight;
  const inkTop = -metrics.actualBoundingBoxAscent;
  const inkBottom = metrics.actualBoundingBoxDescent;
  if (inkRight <= inkLeft || inkBottom <= inkTop) {
    throw new Error("C－13 倒數文字沒有可用的正式 glyph ink bounds。");
  }

  const inkCenterX = (inkLeft + inkRight) / 2;
  const inkCenterY = (inkTop + inkBottom) / 2;

  context.save();
  try {
    context.font = COUNTDOWN_FONT;
    context.fillStyle = COUNTDOWN_COLOR;
    context.textAlign = "left";
    context.textBaseline = "alphabetic";
    context.translate(COUNTDOWN_TARGET_X, COUNTDOWN_TARGET_Y);
    context.rotate(COUNTDOWN_ANGLE_RADIANS);
    context.scale(COUNTDOWN_VISUAL_SCALE, COUNTDOWN_VISUAL_SCALE);
    context.fillText(text, -inkCenterX, -inkCenterY);
  } finally {
    context.restore();
  }
}

export async function waitForSkinnyBnAppFonts() {
  await waitForASkinnyBnAppFonts();
  if (!document.fonts) {
    throw new Error("瀏覽器不支援正式字型載入檢查，已停止 C－13 Template render。");
  }
  await document.fonts.load(COUNTDOWN_FONT, COUNTDOWN_FONT_TEST_TEXT);
  assertCountdownFontReady();
}

export function renderSkinnyBnApp(
  canvas,
  backgroundImage,
  { line1 = "", line2 = "", cCountdownText = null } = {}
) {
  if (!isValidCCountdown(cCountdownText)) {
    throw new TypeError("C－13 倒數天數只允許完整字串 0天～9天。");
  }

  assertCountdownFontReady();
  const validation = renderASkinnyBnApp(canvas, backgroundImage, {
    line1,
    line2
  });

  if (
    canvas.width !== SKINNY_BN_APP_WIDTH ||
    canvas.height !== SKINNY_BN_APP_HEIGHT
  ) {
    throw new Error("C－13 正式 Canvas 必須為 358 × 360px。");
  }
  const context = canvas.getContext("2d");
  if (!context) throw new Error("無法建立 C－13 Canvas 2D context。");

  drawCountdown(context, cCountdownText);
  return validation;
}

export { SKINNY_BN_APP_HEIGHT, SKINNY_BN_APP_WIDTH };
