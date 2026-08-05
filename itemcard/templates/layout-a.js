import {
  BADGE_HEIGHT,
  BADGE_PADDING_X,
  badgeWidthFromContent,
  fillBadgeBackground,
  makeFont,
  measureRun,
} from "./badge-common.js";

const TEXT_FONT = makeFont(58, "ShopeeNotoSans Medium");
const NUMBER_FONT = makeFont(62, "ShopeeNotoSans Bold");
const SYMBOL_FONT = makeFont(25, "ShopeeNotoSans Bold");

function tokenize(text) {
  const runs = [];
  let current = "";
  let currentType = null;

  for (const character of text) {
    const type = /\d/u.test(character) ? "number" : /[$%]/u.test(character) ? "symbol" : "text";
    if (currentType !== null && type !== currentType) {
      runs.push({ type: currentType, text: current });
      current = "";
    }
    currentType = type;
    current += character;
  }

  if (current !== "") {
    runs.push({ type: currentType, text: current });
  }

  return runs;
}

function runStyle(type) {
  if (type === "number") {
    return { font: NUMBER_FONT, color: "#FFD200" };
  }
  if (type === "symbol") {
    return { font: SYMBOL_FONT, color: "#FFD200" };
  }
  return { font: TEXT_FONT, color: "#FFFFFF" };
}

export function parseLayoutA(text) {
  if (typeof text !== "string" || text === "" || /[\r\n]/u.test(text)) {
    throw new Error("Layout A 必須為不換行的單行文字。");
  }
  return { text };
}

export function measureLayoutA(context, content) {
  return badgeWidthFromContent(
    tokenize(content.text).reduce((width, run) => {
      const style = runStyle(run.type);
      return width + measureRun(context, run.text, style.font);
    }, 0),
  );
}

export function drawLayoutA(context, badge, x, y, width) {
  fillBadgeBackground(context, x, y, width, badge.color);
  context.textAlign = "left";
  context.textBaseline = "middle";
  let cursor = x + BADGE_PADDING_X;

  for (const run of tokenize(badge.content.text)) {
    const style = runStyle(run.type);
    context.font = style.font;
    context.fillStyle = style.color;
    context.fillText(run.text, cursor, y + BADGE_HEIGHT / 2);
    cursor += context.measureText(run.text).width;
  }
}
