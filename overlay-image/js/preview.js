import {
  BADGE_HEIGHT,
  MAX_BADGES_TOTAL_WIDTH,
  OVERLAY_IMAGE_SIZE,
} from "../templates/badge-common.js";
import { drawBadge, measureBadge } from "../templates/index.js";

const measureCanvas = document.createElement("canvas");
const measureContext = measureCanvas.getContext("2d");

if (!measureContext) {
  throw new Error("瀏覽器無法建立 Canvas 量測環境。");
}

export function getItemMeasurements(item) {
  const widths = item.badges.map((badge) => measureBadge(measureContext, badge));
  const totalWidth = widths.reduce((total, width) => total + width, 0);
  return {
    widths,
    totalWidth,
    isOverWidth: totalWidth > MAX_BADGES_TOTAL_WIDTH,
  };
}

export function assertItemFits(item) {
  const measurements = getItemMeasurements(item);
  if (measurements.isOverWidth) {
    throw new Error(
      `全部 Badge 總寬為 ${measurements.totalWidth}px，超過 ${MAX_BADGES_TOTAL_WIDTH}px，請修改內容。`,
    );
  }
  return measurements;
}

export function renderItemToCanvas(item, canvas) {
  canvas.width = OVERLAY_IMAGE_SIZE;
  canvas.height = OVERLAY_IMAGE_SIZE;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("瀏覽器無法建立 Canvas 繪製環境。");
  }

  context.clearRect(0, 0, OVERLAY_IMAGE_SIZE, OVERLAY_IMAGE_SIZE);
  const { widths } = getItemMeasurements(item);
  let x = 0;
  const y = OVERLAY_IMAGE_SIZE - BADGE_HEIGHT;
  item.badges.forEach((badge, index) => {
    drawBadge(context, badge, x, y, widths[index]);
    x += widths[index];
  });
  return canvas;
}

export function createItemCanvas(item) {
  return renderItemToCanvas(item, document.createElement("canvas"));
}

export function renderPreviewGrid(container, workspace, onSelect) {
  container.replaceChildren();

  if (workspace.items.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    const text = document.createElement("p");
    text.textContent = "匯入 Excel 工單或 JSON 暫存檔後，這裡會顯示全部 Overlay Image。";
    emptyState.append(text);
    container.append(emptyState);
    return;
  }

  for (const item of workspace.items) {
    const measurements = getItemMeasurements(item);
    const card = document.createElement("button");
    card.type = "button";
    card.className = "preview-card";
    card.dataset.identifier = item.identifier;
    card.setAttribute("aria-label", `選取 Overlay Image ${item.identifier}`);
    if (workspace.selectedId === item.identifier) {
      card.classList.add("is-selected");
    }
    if (measurements.isOverWidth) {
      card.classList.add("is-over-width");
    }

    const number = document.createElement("span");
    number.className = "preview-number";
    number.textContent = item.identifier;
    const canvas = createItemCanvas(item);
    card.append(number, canvas);
    if (measurements.isOverWidth) {
      const warning = document.createElement("span");
      warning.className = "preview-width-warning";
      warning.textContent = `Badge 總寬 ${measurements.totalWidth}px，超過 ${MAX_BADGES_TOTAL_WIDTH}px，請修改。`;
      card.append(warning);
    }
    card.addEventListener("click", () => {
      card.classList.add("is-clicked");
      window.setTimeout(() => card.classList.remove("is-clicked"), 160);
      onSelect(item.identifier);
    });
    container.append(card);
  }
}
