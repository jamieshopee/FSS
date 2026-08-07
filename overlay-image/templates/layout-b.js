import {
  BADGE_HEIGHT,
  BADGE_PADDING_X,
  fillBadgeBackground,
  getCommonTextColor,
  makeFont,
} from "./badge-common.js";

const FONT = makeFont(65, "ShopeeNotoSans Medium");

function measureLayout(context, text) {
  context.font = FONT;
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  const metrics = context.measureText(text);
  const inkLeft = -metrics.actualBoundingBoxLeft;
  const inkRight = metrics.actualBoundingBoxRight;
  const inkTop = -metrics.actualBoundingBoxAscent;
  const inkBottom = metrics.actualBoundingBoxDescent;

  return {
    inkLeft,
    inkTop,
    inkBottom,
    width: Math.ceil(inkRight - inkLeft + BADGE_PADDING_X * 2),
  };
}

export function parseLayoutB(text) {
  if (typeof text !== "string" || text === "" || /[\r\n]/u.test(text)) {
    throw new Error("Layout B 必須為不換行的單行文字。");
  }
  return { text };
}

export function measureLayoutB(context, content) {
  return measureLayout(context, content.text).width;
}

export function drawLayoutB(context, badge, x, y, width) {
  const layout = measureLayout(context, badge.content.text);
  fillBadgeBackground(context, x, y, width, badge.color);
  context.font = FONT;
  context.fillStyle = getCommonTextColor(badge.color);
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  const textX = x + BADGE_PADDING_X - layout.inkLeft;
  const textY =
    y + BADGE_HEIGHT / 2 - (layout.inkTop + layout.inkBottom) / 2;
  context.fillText(badge.content.text, textX, textY);
}
