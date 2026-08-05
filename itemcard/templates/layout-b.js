import {
  BADGE_HEIGHT,
  BADGE_PADDING_X,
  badgeWidthFromContent,
  fillBadgeBackground,
  getCommonTextColor,
  makeFont,
  measureRun,
} from "./badge-common.js";

const FONT = makeFont(65, "ShopeeNotoSans Medium");

export function parseLayoutB(text) {
  if (typeof text !== "string" || text === "" || /[\r\n]/u.test(text)) {
    throw new Error("Layout B 必須為不換行的單行文字。");
  }
  return { text };
}

export function measureLayoutB(context, content) {
  return badgeWidthFromContent(measureRun(context, content.text, FONT));
}

export function drawLayoutB(context, badge, x, y, width) {
  fillBadgeBackground(context, x, y, width, badge.color);
  context.font = FONT;
  context.fillStyle = getCommonTextColor(badge.color);
  context.textAlign = "left";
  context.textBaseline = "middle";
  context.fillText(badge.content.text, x + BADGE_PADDING_X, y + BADGE_HEIGHT / 2);
}
