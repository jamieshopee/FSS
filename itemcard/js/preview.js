import { BADGE_HEIGHT, ITEM_CARD_SIZE } from "../templates/badge-common.js";
import { drawBadge, measureBadge } from "../templates/index.js";

const measureCanvas = document.createElement("canvas");
const measureContext = measureCanvas.getContext("2d");

if (!measureContext) {
  throw new Error("瀏覽器無法建立 Canvas 量測環境。");
}

export function getItemMeasurements(item) {
  const widths = item.badges.map((badge) => measureBadge(measureContext, badge));
  return {
    widths,
    totalWidth: widths.reduce((total, width) => total + width, 0),
  };
}

export function assertItemFits(item) {
  const measurements = getItemMeasurements(item);
  if (measurements.totalWidth > ITEM_CARD_SIZE) {
    throw new Error(`全部 Badge 總寬為 ${measurements.totalWidth}px，超過 1200px。`);
  }
  return measurements;
}

export function renderItemToCanvas(item, canvas) {
  canvas.width = ITEM_CARD_SIZE;
  canvas.height = ITEM_CARD_SIZE;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("瀏覽器無法建立 Canvas 繪製環境。");
  }

  context.clearRect(0, 0, ITEM_CARD_SIZE, ITEM_CARD_SIZE);
  const { widths } = assertItemFits(item);
  let x = 0;
  const y = ITEM_CARD_SIZE - BADGE_HEIGHT;
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
    text.textContent = "匯入 Excel 工單或 JSON 暫存檔後，這裡會顯示全部 Item Card。";
    emptyState.append(text);
    container.append(emptyState);
    return;
  }

  for (const item of workspace.items) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "preview-card";
    card.dataset.identifier = item.identifier;
    card.setAttribute("aria-label", `選取 Item Card ${item.identifier}`);
    if (workspace.selectedId === item.identifier) {
      card.classList.add("is-selected");
    }

    const number = document.createElement("span");
    number.className = "preview-number";
    number.textContent = item.identifier;
    const canvas = createItemCanvas(item);
    card.append(number, canvas);
    card.addEventListener("click", () => {
      card.classList.add("is-clicked");
      window.setTimeout(() => card.classList.remove("is-clicked"), 160);
      onSelect(item.identifier);
    });
    container.append(card);
  }
}
