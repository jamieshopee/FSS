export const BADGE_HEIGHT = 150;
export const BADGE_PADDING_X = 20;
export const OVERLAY_IMAGE_SIZE = 1200;
export const MAX_BADGES_TOTAL_WIDTH = 1120;
export const MAX_BADGES = 3;

export const BACKGROUND_COLORS = Object.freeze({
  紅: "#D0011B",
  綠: "#007661",
  黃: "#FFD200",
  藍: "#113366",
});

export function getCommonTextColor(colorName) {
  return colorName === "黃" ? "#D0011B" : "#FFFFFF";
}

export function makeFont(size, family) {
  return `${size}px "${family}"`;
}

export function measureRun(context, text, font) {
  context.font = font;
  return context.measureText(text).width;
}

export function fillBadgeBackground(context, x, y, width, colorName) {
  context.fillStyle = BACKGROUND_COLORS[colorName];
  context.fillRect(x, y, width, BADGE_HEIGHT);
}

export function badgeWidthFromContent(contentWidth) {
  return Math.ceil(contentWidth + BADGE_PADDING_X * 2);
}
