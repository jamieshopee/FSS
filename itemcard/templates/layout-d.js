import {
  BADGE_HEIGHT,
  BADGE_PADDING_X,
  badgeWidthFromContent,
  fillBadgeBackground,
  getCommonTextColor,
  makeFont,
  measureRun,
} from "./badge-common.js";

const FIRST_LINE_FONT = makeFont(65, "ShopeeNotoSans Regular");
const SECOND_LINE_FONT = makeFont(45, "ShopeeNotoSans Regular");
const SECOND_SYMBOL_FONT = makeFont(30, "ShopeeNotoSans Regular");

function tokenizeSecondLine(text) {
  const runs = [];
  let current = "";
  let symbol = null;

  for (const character of text) {
    const isSymbol = /[$%]/u.test(character);
    if (symbol !== null && isSymbol !== symbol) {
      runs.push({ symbol, text: current });
      current = "";
    }
    symbol = isSymbol;
    current += character;
  }
  if (current !== "") {
    runs.push({ symbol, text: current });
  }
  return runs;
}

export function parseLayoutD(text) {
  if (typeof text !== "string") {
    throw new Error("Layout D 必須為文字。");
  }
  const separators = text.match(/\r\n|\n|\r/gu) ?? [];
  if (separators.length !== 1) {
    throw new Error("Layout D 必須且只能有一個換行。");
  }
  const [firstLine, secondLine] = text.split(/\r\n|\n|\r/u);
  return validateLayoutDContent({ firstLine, secondLine });
}

export function validateLayoutDContent(content) {
  if (
    content === null ||
    typeof content !== "object" ||
    typeof content.firstLine !== "string" ||
    typeof content.secondLine !== "string" ||
    content.firstLine === "" ||
    content.secondLine === "" ||
    /[\r\n]/u.test(content.firstLine) ||
    /[\r\n]/u.test(content.secondLine)
  ) {
    throw new Error("Layout D 的第一行與第二行都必須有內容，欄位內不得再包含換行。");
  }
  return { firstLine: content.firstLine, secondLine: content.secondLine };
}

function measureSecondLine(context, text) {
  return tokenizeSecondLine(text).reduce(
    (width, run) => width + measureRun(context, run.text, run.symbol ? SECOND_SYMBOL_FONT : SECOND_LINE_FONT),
    0,
  );
}

export function measureLayoutD(context, content) {
  return badgeWidthFromContent(
    Math.max(
      measureRun(context, content.firstLine, FIRST_LINE_FONT),
      measureSecondLine(context, content.secondLine),
    ),
  );
}

export function drawLayoutD(context, badge, x, y, width) {
  fillBadgeBackground(context, x, y, width, badge.color);
  context.fillStyle = getCommonTextColor(badge.color);
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.font = FIRST_LINE_FONT;
  context.fillText(badge.content.firstLine, x + width / 2, y + BADGE_HEIGHT * 0.3);

  const runs = tokenizeSecondLine(badge.content.secondLine);
  const totalWidth = measureSecondLine(context, badge.content.secondLine);
  let cursor = x + (width - totalWidth) / 2;
  context.textAlign = "left";
  for (const run of runs) {
    context.font = run.symbol ? SECOND_SYMBOL_FONT : SECOND_LINE_FONT;
    context.fillText(run.text, cursor, y + BADGE_HEIGHT * 0.72);
    cursor += context.measureText(run.text).width;
  }
}
