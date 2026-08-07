import {
  BADGE_HEIGHT,
  BADGE_PADDING_X,
  fillBadgeBackground,
  getCommonTextColor,
  makeFont,
} from "./badge-common.js";

const FIRST_LINE_FONT = makeFont(65, "ShopeeNotoSans Regular");
const SECOND_LINE_FONT = makeFont(45, "ShopeeNotoSans Regular");
const SECOND_SYMBOL_FONT = makeFont(30, "ShopeeNotoSans Regular");
const VISIBLE_LINE_GAP = 10;

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

function measureRun(context, run, font) {
  context.font = font;
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  const metrics = context.measureText(run.text);

  return {
    ...run,
    font,
    advanceWidth: metrics.width,
    inkLeft: -metrics.actualBoundingBoxLeft,
    inkRight: metrics.actualBoundingBoxRight,
    inkTop: -metrics.actualBoundingBoxAscent,
    inkBottom: metrics.actualBoundingBoxDescent,
    x: 0,
    y: 0,
  };
}

function horizontalBounds(runs) {
  return {
    left: Math.min(...runs.map((run) => run.x + run.inkLeft)),
    right: Math.max(...runs.map((run) => run.x + run.inkRight)),
  };
}

function boundaryGlyphInkBottom(context, run, fromStart) {
  const glyphs = Array.from(run.text);
  if (!fromStart) {
    glyphs.reverse();
  }

  context.font = run.font;
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  for (const glyph of glyphs) {
    const metrics = context.measureText(glyph);
    if (
      metrics.actualBoundingBoxLeft !== 0 ||
      metrics.actualBoundingBoxRight !== 0 ||
      metrics.actualBoundingBoxAscent !== 0 ||
      metrics.actualBoundingBoxDescent !== 0
    ) {
      return metrics.actualBoundingBoxDescent;
    }
  }
  return null;
}

function measureLayout(context, content) {
  const firstLine = measureRun(
    context,
    { text: content.firstLine, symbol: false },
    FIRST_LINE_FONT,
  );
  const secondLine = tokenizeSecondLine(content.secondLine).map((run) =>
    measureRun(
      context,
      run,
      run.symbol ? SECOND_SYMBOL_FONT : SECOND_LINE_FONT,
    ),
  );

  let advanceX = 0;
  for (const run of secondLine) {
    run.x = advanceX;
    run.y = 0;
    advanceX += run.advanceWidth;
  }

  secondLine.forEach((run, index) => {
    if (!run.symbol) {
      return;
    }
    const isPrefixDollar = run.text === "$";
    const isSuffixPercent = run.text === "%";
    const adjacentRun = isPrefixDollar
      ? secondLine[index + 1]
      : isSuffixPercent
        ? secondLine[index - 1]
        : null;
    if (adjacentRun?.symbol === false) {
      const adjacentInkBottom = boundaryGlyphInkBottom(
        context,
        adjacentRun,
        isPrefixDollar,
      );
      if (adjacentInkBottom !== null) {
        run.y += adjacentInkBottom - run.inkBottom;
      }
    }
  });

  const secondInkTop = Math.min(
    ...secondLine.map((run) => run.y + run.inkTop),
  );
  const secondLineY = firstLine.inkBottom + VISIBLE_LINE_GAP - secondInkTop;
  secondLine.forEach((run) => {
    run.y += secondLineY;
  });

  const firstBounds = horizontalBounds([firstLine]);
  const secondBounds = horizontalBounds(secondLine);
  const firstWidth = firstBounds.right - firstBounds.left;
  const secondWidth = secondBounds.right - secondBounds.left;
  const contentWidth = Math.max(firstWidth, secondWidth);
  firstLine.x += (contentWidth - firstWidth) / 2 - firstBounds.left;
  const secondOffsetX = (contentWidth - secondWidth) / 2 - secondBounds.left;
  secondLine.forEach((run) => {
    run.x += secondOffsetX;
  });

  const runs = [firstLine, ...secondLine];
  const inkTop = Math.min(...runs.map((run) => run.y + run.inkTop));
  const inkBottom = Math.max(...runs.map((run) => run.y + run.inkBottom));
  const groupY = BADGE_HEIGHT / 2 - (inkTop + inkBottom) / 2;

  return {
    firstLine,
    secondLine,
    groupY,
    width: Math.ceil(contentWidth + BADGE_PADDING_X * 2),
  };
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

export function measureLayoutD(context, content) {
  return measureLayout(context, content).width;
}

export function drawLayoutD(context, badge, x, y, width) {
  const layout = measureLayout(context, badge.content);
  fillBadgeBackground(context, x, y, width, badge.color);
  context.fillStyle = getCommonTextColor(badge.color);
  context.textBaseline = "alphabetic";
  context.textAlign = "left";
  for (const run of [layout.firstLine, ...layout.secondLine]) {
    context.font = run.font;
    context.fillText(
      run.text,
      x + BADGE_PADDING_X + run.x,
      y + layout.groupY + run.y,
    );
  }
}
