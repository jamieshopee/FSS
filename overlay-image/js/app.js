import { refreshEditorWidthWarning, renderEditor } from "./editor.js";
import { ImportValidationError, parseExcelFile, parseWorkspaceJson } from "./import.js";
import { exportWorkspace } from "./export.js";
import { getItemMeasurements, renderPreviewGrid } from "./preview.js";
import { MAX_BADGES_TOTAL_WIDTH } from "../templates/badge-common.js";
import {
  getWorkspace,
  replaceWorkspace,
  resetWorkspace,
  selectItem,
  subscribe,
  updateItem,
} from "./workspace.js";

const elements = {
  previewGrid: document.querySelector("#preview-grid"),
  itemCount: document.querySelector("#item-count"),
  excelInput: document.querySelector("#excel-input"),
  jsonInput: document.querySelector("#json-input"),
  status: document.querySelector("#status-message"),
  editorTitle: document.querySelector("#editor-title"),
  dragHint: document.querySelector("#drag-hint"),
  badgeEditor: document.querySelector("#badge-editor"),
  addRegion: document.querySelector("#add-badge-region"),
  downloadButton: document.querySelector("#download-button"),
  exportStatus: document.querySelector("#export-status-message"),
  resetButton: document.querySelector("#reset-button"),
};

function setStatus(message, type = "neutral") {
  elements.status.textContent = message;
  elements.status.classList.toggle("is-error", type === "error");
  elements.status.classList.toggle("is-success", type === "success");
}

function setExportStatus(message, type = "neutral") {
  elements.exportStatus.textContent = message;
  elements.exportStatus.hidden = !message;
  elements.exportStatus.classList.toggle("is-error", type === "error");
  elements.exportStatus.classList.toggle("is-success", type === "success");
}

function formatError(error) {
  if (error instanceof ImportValidationError) {
    return error.errors.join("\n");
  }
  return error instanceof Error ? error.message : "發生未預期錯誤。";
}

function refreshExportWidthStatus(workspace) {
  const warnings = workspace.items.flatMap((item) => {
    const measurements = getItemMeasurements(item);
    return measurements.isOverWidth
      ? [
          `編號 ${item.identifier}：Badge 總寬 ${measurements.totalWidth}px，超過 ${MAX_BADGES_TOTAL_WIDTH}px，請修改。`,
        ]
      : [];
  });
  if (warnings.length > 0) {
    setExportStatus(warnings.join("\n"), "error");
    return;
  }
  setExportStatus("");
}

function render(workspace, options = {}) {
  renderPreviewGrid(elements.previewGrid, workspace, selectItem);
  if (options.editor !== false) {
    renderEditor(
      {
        title: elements.editorTitle,
        dragHint: elements.dragHint,
        badgeEditor: elements.badgeEditor,
        addRegion: elements.addRegion,
      },
      workspace,
      {
        updateItem,
        onError: (message) => setStatus(message, "error"),
      },
    );
  }
  refreshEditorWidthWarning(elements.badgeEditor, workspace);
  refreshExportWidthStatus(workspace);
  elements.itemCount.textContent =
    workspace.items.length > 0 ? `共 ${workspace.items.length} 張 Overlay Image` : "尚未匯入資料";
  elements.downloadButton.disabled = workspace.items.length === 0;
  elements.resetButton.disabled = workspace.items.length === 0;
}

async function loadOfficialFonts() {
  const fonts = [
    '16px "ShopeeNotoSans Regular"',
    '16px "ShopeeNotoSans Medium"',
    '16px "ShopeeNotoSans Bold"',
  ];
  await Promise.all(fonts.map((font) => document.fonts.load(font)));
  if (!fonts.every((font) => document.fonts.check(font))) {
    throw new Error("正式字型載入失敗，已停止預覽與輸出。");
  }
}

async function handleExcelImport(file) {
  const nextWorkspace = await parseExcelFile(file);
  replaceWorkspace(nextWorkspace);
  setStatus(`已匯入 ${nextWorkspace.items.length} 張 Overlay Image。`, "success");
}

async function handleJsonImport(file) {
  const nextWorkspace = parseWorkspaceJson(await file.text());
  replaceWorkspace(nextWorkspace);
  setStatus(`已完整還原 ${nextWorkspace.items.length} 張 Overlay Image。`, "success");
}

elements.excelInput.addEventListener("change", async () => {
  const [file] = elements.excelInput.files;
  elements.excelInput.value = "";
  if (!file) {
    return;
  }
  try {
    await handleExcelImport(file);
  } catch (error) {
    setStatus(formatError(error), "error");
  }
});

elements.jsonInput.addEventListener("change", async () => {
  const [file] = elements.jsonInput.files;
  elements.jsonInput.value = "";
  if (!file) {
    return;
  }
  try {
    await handleJsonImport(file);
  } catch (error) {
    setStatus(formatError(error), "error");
  }
});

elements.downloadButton.addEventListener("click", async () => {
  elements.downloadButton.disabled = true;
  setExportStatus("正在建立完整專案…");
  try {
    await exportWorkspace(getWorkspace());
    setExportStatus("完整專案已建立。", "success");
  } catch (error) {
    setExportStatus(formatError(error), "error");
  } finally {
    elements.downloadButton.disabled = getWorkspace().items.length === 0;
  }
});

elements.resetButton.addEventListener("click", () => {
  const confirmed = window.confirm("確定要重設工作區域嗎？\n目前尚未下載的內容將會清除。");
  if (confirmed) {
    resetWorkspace();
    setStatus("工作區域已重設。", "success");
  }
});

subscribe(render);

loadOfficialFonts()
  .then(() => {
    elements.excelInput.disabled = false;
    elements.jsonInput.disabled = false;
    setStatus("正式字型已載入，可以匯入資料。", "success");
  })
  .catch((error) => {
    elements.excelInput.disabled = true;
    elements.jsonInput.disabled = true;
    elements.downloadButton.disabled = true;
    setStatus(formatError(error), "error");
  });
