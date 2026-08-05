import {
  BADGE_HEIGHT,
  BADGE_PADDING_X,
  badgeWidthFromContent,
  fillBadgeBackground,
  getCommonTextColor,
  makeFont,
  measureRun,
} from "./badge-common.js";

const LEFT_FONT = makeFont(40, "ShopeeNotoSans Medium");
const VALUE_FONT = makeFont(78, "ShopeeNotoSans Bold");
const COLUMN_GAP = 18;
const FOUR_CHINESE = /^[\p{Script=Han}]{4}$/u;
const VALUE_PATTERN = /^(?:\$\d+(?:\.\d+)?|\d+(?:\.\d+)?%?)$/u;

export function parseLayoutC(text) {
  if (typeof text !== "string" || /[\r\n]/u.test(text)) {
    throw new Error("Layout C 必須在一個儲存格內輸入完整文字。");
  }

  const match = text.match(/^([\p{Script=Han}]{4})(.+)$/u);
  if (!match || !FOUR_CHINESE.test(match[1]) || !VALUE_PATTERN.test(match[2])) {
    throw new Error("Layout C 必須為四個中文字加上數字，$ 只能位於數字前，% 只能位於數字後。");
  }

  return { leftText: match[1], valueText: match[2] };
}

export function validateLayoutCContent(content) {
  if (
    content === null ||
    typeof content !== "object" ||
    !FOUR_CHINESE.test(content.leftText) ||
    !VALUE_PATTERN.test(content.valueText)
  ) {
    throw new Error("Layout C 的左側必須為四個中文字，右側必須為數字及正式特殊符號格式。");
  }
  return { leftText: content.leftText, valueText: content.valueText };
}

function leftWidth(context, content) {
  return Math.max(
    measureRun(context, content.leftText.slice(0, 2), LEFT_FONT),
    measureRun(context, content.leftText.slice(2), LEFT_FONT),
  );
}

export function measureLayoutC(context, content) {
  return badgeWidthFromContent(
    leftWidth(context, content) + COLUMN_GAP + measureRun(context, content.valueText, VALUE_FONT),
  );
}

export function drawLayoutC(context, badge, x, y, width) {
  fillBadgeBackground(context, x, y, width, badge.color);
  const color = getCommonTextColor(badge.color);
  const leftColumnWidth = leftWidth(context, badge.content);
  const leftCenter = x + BADGE_PADDING_X + leftColumnWidth / 2;
  const valueX = x + BADGE_PADDING_X + leftColumnWidth + COLUMN_GAP;

  context.fillStyle = color;
  context.font = LEFT_FONT;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(badge.content.leftText.slice(0, 2), leftCenter, y + BADGE_HEIGHT * 0.31);
  context.fillText(badge.content.leftText.slice(2), leftCenter, y + BADGE_HEIGHT * 0.69);

  context.font = VALUE_FONT;
  context.textAlign = "left";
  context.fillText(badge.content.valueText, valueX, y + BADGE_HEIGHT / 2);
}
