import {
  BADGE_HEIGHT,
  BADGE_PADDING_X,
  fillBadgeBackground,
  makeFont,
} from "./badge-common.js";

const TEXT_FONT = makeFont(55, "ShopeeNotoSans Medium");
const NUMBER_FONT = makeFont(60, "ShopeeNotoSans Bold");
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

function measureLayout(context, text) {
  context.textAlign = "left";
  context.textBaseline = "alphabetic";

  let advanceX = 0;
  const runs = tokenize(text).map((run) => {
    const style = runStyle(run.type);
    context.font = style.font;
    const metrics = context.measureText(run.text);
    const measuredRun = {
      ...run,
      ...style,
      advanceX,
      metrics,
      yOffset: 0,
    };
    advanceX += metrics.width;
    return measuredRun;
  });

  runs.forEach((run, index) => {
    if (run.type !== "symbol") {
      return;
    }
    const adjacentNumber =
      (runs[index - 1]?.type === "number" && runs[index - 1]) ||
      (runs[index + 1]?.type === "number" && runs[index + 1]);
    if (adjacentNumber) {
      run.yOffset =
        adjacentNumber.metrics.actualBoundingBoxDescent -
        run.metrics.actualBoundingBoxDescent;
    }
  });

  const inkLeft = Math.min(
    ...runs.map((run) => run.advanceX - run.metrics.actualBoundingBoxLeft),
  );
  const inkRight = Math.max(
    ...runs.map((run) => run.advanceX + run.metrics.actualBoundingBoxRight),
  );
  const inkTop = Math.min(
    ...runs.map((run) => run.yOffset - run.metrics.actualBoundingBoxAscent),
  );
  const inkBottom = Math.max(
    ...runs.map((run) => run.yOffset + run.metrics.actualBoundingBoxDescent),
  );
  const inkWidth = inkRight - inkLeft;

  return {
    runs,
    inkLeft,
    inkTop,
    inkBottom,
    width: Math.ceil(inkWidth + BADGE_PADDING_X * 2),
  };
}

export function parseLayoutA(text) {
  if (typeof text !== "string" || text === "" || /[\r\n]/u.test(text)) {
    throw new Error("Layout A 必須為不換行的單行文字。");
  }
  return { text };
}

export function measureLayoutA(context, content) {
  return measureLayout(context, content.text).width;
}

export function drawLayoutA(context, badge, x, y, width) {
  const layout = measureLayout(context, badge.content.text);
  fillBadgeBackground(context, x, y, width, badge.color);
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  const groupX = x + BADGE_PADDING_X - layout.inkLeft;
  const groupY =
    y + BADGE_HEIGHT / 2 - (layout.inkTop + layout.inkBottom) / 2;

  for (const run of layout.runs) {
    context.font = run.font;
    context.fillStyle = run.color;
    context.fillText(
      run.text,
      groupX + run.advanceX,
      groupY + run.yOffset,
    );
  }
}
