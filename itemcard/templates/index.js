import { drawLayoutA, measureLayoutA, parseLayoutA } from "./layout-a.js";
import { drawLayoutB, measureLayoutB, parseLayoutB } from "./layout-b.js";
import { drawLayoutC, measureLayoutC, parseLayoutC, validateLayoutCContent } from "./layout-c.js";
import { drawLayoutD, measureLayoutD, parseLayoutD, validateLayoutDContent } from "./layout-d.js";

const layouts = Object.freeze({
  A: { parse: parseLayoutA, measure: measureLayoutA, draw: drawLayoutA },
  B: { parse: parseLayoutB, measure: measureLayoutB, draw: drawLayoutB },
  C: { parse: parseLayoutC, measure: measureLayoutC, draw: drawLayoutC },
  D: { parse: parseLayoutD, measure: measureLayoutD, draw: drawLayoutD },
});

export function parseBadgeContent(layout, text) {
  const handler = layouts[layout];
  if (!handler) {
    throw new Error(`不支援的 Layout：${layout}`);
  }
  return handler.parse(text);
}

export function validateBadgeContent(layout, content) {
  if (layout === "A") {
    return parseLayoutA(content?.text);
  }
  if (layout === "B") {
    return parseLayoutB(content?.text);
  }
  if (layout === "C") {
    return validateLayoutCContent(content);
  }
  if (layout === "D") {
    return validateLayoutDContent(content);
  }
  throw new Error(`不支援的 Layout：${layout}`);
}

export function measureBadge(context, badge) {
  const handler = layouts[badge.layout];
  if (!handler) {
    throw new Error(`不支援的 Layout：${badge.layout}`);
  }
  return handler.measure(context, badge.content);
}

export function drawBadge(context, badge, x, y, width) {
  const handler = layouts[badge.layout];
  if (!handler) {
    throw new Error(`不支援的 Layout：${badge.layout}`);
  }
  handler.draw(context, badge, x, y, width);
}
