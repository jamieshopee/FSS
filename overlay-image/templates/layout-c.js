import {
  BADGE_HEIGHT,
  BADGE_PADDING_X,
  fillBadgeBackground,
  makeFont,
} from "./badge-common.js";

const LEFT_FONT = makeFont(43.5, "ShopeeNotoSans Medium");
const NUMBER_FONT = makeFont(98, "ShopeeNotoSans Bold");
const SYMBOL_FONT = makeFont(45, "ShopeeNotoSans Bold");
const LEFT_COLOR = "#FFFFFF";
const VALUE_COLOR = "#FFD200";
const LINE_GAP = 45;
const COLUMN_GAP = 10;
const SYMBOL_GAP = 5;
const FOUR_CHINESE = /^[\p{Script=Han}]{4}$/u;
const VALUE_PATTERN = /^(?:\$\d+(?:\.\d+)?|\d+(?:\.\d+)?%?)$/u;

function measureRun(context, text, font) {
  context.font = font;
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  const metrics = context.measureText(text);
  const inkLeft = -metrics.actualBoundingBoxLeft;
  const inkRight = metrics.actualBoundingBoxRight;

  return {
    text,
    font,
    inkLeft,
    inkRight,
    inkTop: -metrics.actualBoundingBoxAscent,
    inkBottom: metrics.actualBoundingBoxDescent,
    inkWidth: inkRight - inkLeft,
  };
}

function valueParts(valueText) {
  const prefix = valueText.startsWith("$") ? "$" : "";
  const suffix = valueText.endsWith("%") ? "%" : "";
  return {
    prefix,
    number: valueText.slice(prefix.length, valueText.length - suffix.length),
    suffix,
  };
}

function measureLayout(context, content) {
  const topLine = measureRun(context, content.leftText.slice(0, 2), LEFT_FONT);
  const bottomLine = measureRun(context, content.leftText.slice(2), LEFT_FONT);
  const leftColumnWidth = Math.max(topLine.inkWidth, bottomLine.inkWidth);

  topLine.x = (leftColumnWidth - topLine.inkWidth) / 2 - topLine.inkLeft;
  topLine.y = 0;
  bottomLine.x =
    (leftColumnWidth - bottomLine.inkWidth) / 2 - bottomLine.inkLeft;
  bottomLine.y = LINE_GAP;

  const leftTop = Math.min(
    topLine.y + topLine.inkTop,
    bottomLine.y + bottomLine.inkTop,
  );
  const leftBottom = Math.max(
    topLine.y + topLine.inkBottom,
    bottomLine.y + bottomLine.inkBottom,
  );
  const leftCenter = (leftTop + leftBottom) / 2;

  const parts = valueParts(content.valueText);
  const numberRun = measureRun(context, parts.number, NUMBER_FONT);
  const symbolRun = parts.prefix || parts.suffix
    ? measureRun(context, parts.prefix || parts.suffix, SYMBOL_FONT)
    : null;
  const numberCenter = (numberRun.inkTop + numberRun.inkBottom) / 2;
  const valueBaseline = leftCenter - numberCenter;
  let cursor = leftColumnWidth + COLUMN_GAP;
  const valueRuns = [];

  if (parts.prefix) {
    symbolRun.x = cursor - symbolRun.inkLeft;
    symbolRun.y = valueBaseline;
    valueRuns.push(symbolRun);
    cursor += symbolRun.inkWidth + SYMBOL_GAP;
  }

  numberRun.x = cursor - numberRun.inkLeft;
  numberRun.y = valueBaseline;
  valueRuns.push(numberRun);
  cursor += numberRun.inkWidth;

  if (parts.suffix) {
    cursor += SYMBOL_GAP;
    symbolRun.x = cursor - symbolRun.inkLeft;
    symbolRun.y = valueBaseline;
    valueRuns.push(symbolRun);
    cursor += symbolRun.inkWidth;
  }

  const runs = [topLine, bottomLine, ...valueRuns];
  const inkTop = Math.min(...runs.map((run) => run.y + run.inkTop));
  const inkBottom = Math.max(...runs.map((run) => run.y + run.inkBottom));
  const groupY = BADGE_HEIGHT / 2 - (inkTop + inkBottom) / 2;

  return {
    runs,
    groupY,
    width: Math.ceil(cursor + BADGE_PADDING_X * 2),
  };
}

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

export function measureLayoutC(context, content) {
  return measureLayout(context, content).width;
}

export function drawLayoutC(context, badge, x, y, width) {
  const layout = measureLayout(context, badge.content);
  fillBadgeBackground(context, x, y, width, badge.color);
  context.textAlign = "left";
  context.textBaseline = "alphabetic";

  for (const [index, run] of layout.runs.entries()) {
    context.font = run.font;
    context.fillStyle = index < 2 ? LEFT_COLOR : VALUE_COLOR;
    context.fillText(
      run.text,
      x + BADGE_PADDING_X + run.x,
      y + layout.groupY + run.y,
    );
  }
}
