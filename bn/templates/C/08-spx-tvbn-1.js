import { isValidCCountdown } from "../../js/countdown.js";
import {
  SPX_TVBN_1_HEIGHT,
  SPX_TVBN_1_WIDTH,
  renderSpxTvbn1 as renderASpxTvbn1,
  waitForSpxTvbn1Fonts as waitForASpxTvbn1Fonts
} from "../A/08-spx-tvbn-1.js";

const COUNTDOWN_FONT = '130pt "ShopeeNotoSans Bold"';
const COUNTDOWN_COLOR = "#ff4c45";
const COUNTDOWN_FONT_TEST_TEXT = "0天";
const COUNTDOWN_ANGLE_DEGREES = -2.1;
const COUNTDOWN_ANGLE_RADIANS = (COUNTDOWN_ANGLE_DEGREES * Math.PI) / 180;
const COUNTDOWN_TARGET_X = 570;
const COUNTDOWN_TARGET_Y = 1450;
const COUNTDOWN_VISUAL_SCALE = 1.0;

function assertCountdownFontReady() {
  if (
    !document.fonts ||
    !document.fonts.check(COUNTDOWN_FONT, COUNTDOWN_FONT_TEST_TEXT)
  ) {
    throw new Error("正式倒數字型尚未載入，已停止 C－08 Template render。");
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
    throw new Error("瀏覽器無法取得 C－08 倒數文字的正式 glyph metrics。");
  }

  const inkLeft = -metrics.actualBoundingBoxLeft;
  const inkRight = metrics.actualBoundingBoxRight;
  const inkTop = -metrics.actualBoundingBoxAscent;
  const inkBottom = metrics.actualBoundingBoxDescent;
  if (inkRight <= inkLeft || inkBottom <= inkTop) {
    throw new Error("C－08 倒數文字沒有可用的正式 glyph ink bounds。");
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

export async function waitForSpxTvbn1Fonts() {
  await waitForASpxTvbn1Fonts();
  if (!document.fonts) {
    throw new Error("瀏覽器不支援正式字型載入檢查，已停止 C－08 Template render。");
  }
  await document.fonts.load(COUNTDOWN_FONT, COUNTDOWN_FONT_TEST_TEXT);
  assertCountdownFontReady();
}

export function renderSpxTvbn1(
  canvas,
  backgroundImage,
  {
    headline = "",
    subheadline = "",
    protectionText = "",
    cCountdownText = null
  } = {}
) {
  if (!isValidCCountdown(cCountdownText)) {
    throw new TypeError("C－08 倒數天數只允許完整字串 0天～9天。");
  }

  assertCountdownFontReady();
  renderASpxTvbn1(canvas, backgroundImage, {
    headline,
    subheadline,
    protectionText
  });

  if (
    canvas.width !== SPX_TVBN_1_WIDTH ||
    canvas.height !== SPX_TVBN_1_HEIGHT
  ) {
    throw new Error("C－08 正式 Canvas 必須為 1080 × 1920px。");
  }
  const context = canvas.getContext("2d");
  if (!context) throw new Error("無法建立 C－08 Canvas 2D context。");

  drawCountdown(context, cCountdownText);
}

export { SPX_TVBN_1_HEIGHT, SPX_TVBN_1_WIDTH };
