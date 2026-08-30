import { createWorkspace } from "./workspace.js";
import { getEditorFields, renderEditor } from "./editor.js";
import { ImportValidationError, parseExcelFile, parseWorkspaceJson } from "./import.js";
import { getBnFieldValues, renderBnToCanvas } from "./render-a.js";
import { exportWorkspace } from "./export.js";
import { composeLpbnVariantCanvas, resolveLpbnBadges } from "./lpbn-badges.js";

// A－12 掛標 stack modifier：只在 12_LPBN 有可用掛標 variants 時加在 #preview 上。
const PREVIEW_STACK_CLASS = "is-lpbn-stack";

const BN_ITEMS = [
  { id: "01", name: "01_DDcard BN" },
  { id: "02", name: "02_MALL HBN" },
  { id: "03", name: "03_Coin page BN" },
  { id: "04", name: "04_Loyalty BN" },
  { id: "05", name: "05_MSBN" },
  { id: "06", name: "06_IG" },
  { id: "07", name: "07_FB POST" },
  { id: "08", name: "08_SPX TVBN_1" },
  { id: "09", name: "09_SPX TVBN_2" },
  { id: "10", name: "10_POP UP" },
  { id: "11", name: "11_Line OA" },
  { id: "12", name: "12_LPBN" },
  { id: "13", name: "13_Skinny BN_APP" },
  { id: "14", name: "14_Skinny BN_PC" },
  { id: "15", name: "15_AR" },
  { id: "16", name: "16_副區" },
  { id: "17", name: "17_門檻表" }
];
const C_ENABLED_BN_IDS = Object.freeze(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17"]);

const typeView = document.querySelector("#type-view");
const consoleView = document.querySelector("#console-view");
const currentType = document.querySelector("#current-type");
const bnList = document.querySelector("#bn-list");
const preview = document.querySelector("#preview");
const editorTitle = document.querySelector("#editor-title");
const editor = document.querySelector("#editor");
const resetButton = document.querySelector("#reset-button");
const importExcelButton = document.querySelector("#import-excel-button");
const importJsonButton = document.querySelector("#import-json-button");
const excelInput = document.querySelector("#excel-input");
const jsonInput = document.querySelector("#json-input");
const importStatus = document.querySelector("#import-status");
const exportButton = document.querySelector("#export-button");
const exportStatus = document.querySelector("#export-status");
// A－17 Modal（Round 2：僅 open／close 接線；全部 null-safe，缺元素不得中斷初始化）
const thresholdEditButton = document.querySelector("#threshold-edit-button");
const thresholdModal = document.querySelector("#threshold-modal");
const thresholdClose = document.querySelector("#threshold-close");
// A－17 Modal（Round 3：唯讀呈現用元素；同樣 null-safe）
const thresholdLogisticsCount = document.querySelector("#threshold-logistics-count");
const thresholdPairsCount = document.querySelector("#threshold-pairs-count");
const thresholdTable = document.querySelector("#threshold-table");
// A－17 Modal（Round 4：新增按鈕；null-safe）
const thresholdAddLogistics = document.querySelector("#threshold-add-logistics");
const thresholdAddPair = document.querySelector("#threshold-add-pair");
const workspace = createWorkspace();

let renderedEditorBnId = null;
let previewToken = 0;

function getBnItem(bnId) {
  return BN_ITEMS.find((item) => item.id === bnId);
}

function formatError(error) {
  if (error instanceof ImportValidationError) return error.message;
  return error instanceof Error ? error.message : String(error);
}

function setStatus(element, message, tone) {
  if (!message) {
    element.hidden = true;
    element.textContent = "";
    element.classList.remove("success", "error");
    return;
  }
  element.hidden = false;
  element.textContent = message;
  element.classList.toggle("success", tone === "success");
  element.classList.toggle("error", tone === "error");
}

function buildBnList() {
  const fragment = document.createDocumentFragment();

  BN_ITEMS.forEach((item) => {
    const button = document.createElement("button");
    button.className = "bn-item";
    button.type = "button";
    button.dataset.bnId = item.id;
    button.setAttribute("aria-label", item.name);
    item.name.split(/(_)/).forEach((part) => {
      if (part !== "_") {
        button.append(part);
        return;
      }

      const underscore = document.createElement("span");
      underscore.className = "bn-name-underscore";
      underscore.textContent = part;
      button.append(underscore);
    });
    button.addEventListener("click", () => {
      workspace.selectBn(item.id);
      button.blur();
    });
    fragment.append(button);
  });

  bnList.append(fragment);
}

function showPreviewMessage(message) {
  preview.classList.remove(PREVIEW_STACK_CLASS);
  const card = document.createElement("article");
  card.className = "preview-placeholder";
  const text = document.createElement("p");
  text.className = "preview-empty";
  text.textContent = message;
  card.append(text);
  preview.replaceChildren(card);
}

// Preview Fit（Round 3 批准方案）：只計算顯示尺寸，只寫 canvas inline style，
// 絕不修改 canvas.width/height（backing dimensions）、不影響 Export。
function applyPreviewFit(canvas, { widthOnly = false } = {}) {
  if (!canvas) return;
  const availableWidth = preview.clientWidth;
  // Round 4：#preview.clientHeight 可能已被內容撐高，不是真正可視高度；
  // 改以「viewport 底部 − #preview 可視起點 − 既有欄位底部 padding」計算。
  const previewRect = preview.getBoundingClientRect();
  const bottomPadding =
    Number.parseFloat(
      window.getComputedStyle(preview.parentElement).paddingBottom
    ) || 0;
  const availableHeight = Math.max(
    0,
    window.innerHeight - previewRect.top - bottomPadding
  );
  if (
    availableWidth <= 0 ||
    (!widthOnly && availableHeight <= 0) ||
    canvas.width <= 0 ||
    canvas.height <= 0
  ) {
    return;
  }
  // A－12 掛標 stack（widthOnly）：只受 Preview 欄可用寬度限制、維持 intrinsic 比例，
  // 不再把每一張都各自縮到單張 viewport 高度；總高度由既有 scroll container 捲動。
  const scale = widthOnly
    ? Math.min(availableWidth / canvas.width, 1)
    : Math.min(
        availableWidth / canvas.width,
        availableHeight / canvas.height,
        1
      );
  canvas.style.width = `${canvas.width * scale}px`;
  canvas.style.height = `${canvas.height * scale}px`;
}

async function renderPreview(state) {
  if (!state.currentType || !state.selectedBnId) return;
  const token = ++previewToken;
  const bnId = state.selectedBnId;

  if (bnId === "17" && !state.threshold) {
    showPreviewMessage("17_門檻表：匯入工單 Excel 後顯示正式 Preview。");
    return;
  }

  try {
    const canvas = document.createElement("canvas");
    canvas.className = "preview-canvas";
    const result = await renderBnToCanvas(canvas, state, bnId);
    if (token !== previewToken) return;

    // A－12：base canvas 永遠保留且不被 overlay 修改；每個實際可用 slot 另建獨立 canvas。
    // resolver 與 Export 共用，缺 slot 不建立空 canvas、不重新編號。
    let canvases = [canvas];
    if (bnId === "12") {
      const badges = await resolveLpbnBadges(state.lpbnBadgeMonth);
      if (token !== previewToken) return;
      canvases = [
        canvas,
        ...badges.variants.map((variant) => {
          const variantCanvas = composeLpbnVariantCanvas(canvas, variant.image);
          variantCanvas.className = "preview-canvas";
          return variantCanvas;
        })
      ];
    }

    const stacked = canvases.length > 1;
    preview.classList.toggle(PREVIEW_STACK_CLASS, stacked);
    canvases.forEach((item) => applyPreviewFit(item, { widthOnly: stacked }));
    preview.replaceChildren(...canvases);
    requestAnimationFrame(() => {
      if (token !== previewToken) return;
      canvases.forEach((item) => applyPreviewFit(item, { widthOnly: stacked }));
    });
    if (result && Array.isArray(result.warnings) && result.warnings.length > 0) {
      console.warn("A－17 renderer warnings:", result.warnings);
    }
  } catch (error) {
    if (token !== previewToken) return;
    showPreviewMessage(`Preview 無法顯示：${formatError(error)}`);
  }
}

function render(state, reason) {
  const hasWorkspace = Boolean(state.currentType);
  typeView.hidden = hasWorkspace;
  consoleView.hidden = !hasWorkspace;

  if (!hasWorkspace) {
    renderedEditorBnId = null;
    previewToken += 1;
    preview.classList.remove(PREVIEW_STACK_CLASS);
    preview.replaceChildren();
    setStatus(importStatus, "");
    setStatus(exportStatus, "");
    if (thresholdEditButton) thresholdEditButton.hidden = true;
    if (thresholdModal) thresholdModal.hidden = true;
    return;
  }

  const selectedItem = getBnItem(state.selectedBnId);
  currentType.textContent = `目前樣式：${state.currentType}`;

  bnList.querySelectorAll(".bn-item").forEach((button) => {
    const isSelected = button.dataset.bnId === state.selectedBnId;
    button.disabled =
      state.currentType === "C" && !C_ENABLED_BN_IDS.includes(button.dataset.bnId);
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-current", isSelected ? "true" : "false");
  });

  exportButton.disabled = !state.threshold;

  const showThresholdEditor =
    (state.currentType === "A" ||
      state.currentType === "B" ||
      state.currentType === "C" ||
      state.currentType === "D") &&
    state.selectedBnId === "17" &&
    Boolean(state.threshold);
  if (thresholdEditButton) thresholdEditButton.hidden = !showThresholdEditor;
  if (thresholdModal && !showThresholdEditor) thresholdModal.hidden = true;

  if (reason === "replace") {
    renderedEditorBnId = null;
  }

  // 右側版位名稱沿用左側 .bn-item 既有的 underscore 呈現規則，避免 `_` 與鄰字黏在一起。
  editorTitle.textContent = "";
  selectedItem.name.split(/(_)/).forEach((part) => {
    if (part !== "_") {
      editorTitle.append(part);
      return;
    }

    const underscore = document.createElement("span");
    underscore.className = "bn-name-underscore";
    underscore.textContent = part;
    editorTitle.append(underscore);
  });
  // Round 7：17 未匯入時以無欄位 bnId 呈現既有空狀態提示，不建立假 threshold。
  const editorBnId =
    state.selectedBnId === "17" && !state.threshold ? "00" : state.selectedBnId;
  if (renderedEditorBnId !== editorBnId) {
    renderedEditorBnId = editorBnId;
    renderEditor(
      editor,
      editorBnId,
      getEditorValues(state, state.selectedBnId),
      (fieldId, value) => {
        if (state.selectedBnId === "17") {
          updateThresholdTextField(fieldId, value);
        } else if (fieldId === "cCountdownText") {
          workspace.updateCCountdown(value);
        } else {
          workspace.updateText(state.selectedBnId, fieldId, value);
        }
      },
      state.currentType
    );
  }

  // Round 7.1：A－17 有資料時，把「同一顆」既有按鈕搬移到主標題（children[0]）
  // 與 VIP 標題之間；DOM node 搬移不會複製節點或 listener，重複 render 為冪等。
  if (
    thresholdEditButton &&
    showThresholdEditor &&
    editor.children.length > 1 &&
    editor.children[1] !== thresholdEditButton
  ) {
    editor.insertBefore(thresholdEditButton, editor.children[1]);
  }

  renderPreview(state);

  if (reason === "selection" || reason === "start") {
    bnList
      .querySelector(`[data-bn-id="${state.selectedBnId}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }
}

function shouldIgnoreArrowKey(event) {
  if (
    event.isComposing ||
    event.keyCode === 229 ||
    event.ctrlKey ||
    event.metaKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return true;
  }

  const target = event.target;
  return Boolean(
    target.closest("input, textarea, select, button, [contenteditable]") ||
    target.isContentEditable
  );
}

document.querySelectorAll("[data-type]").forEach((button) => {
  button.addEventListener("click", () => {
    workspace.start(button.dataset.type, BN_ITEMS[0].id);
    button.blur();
  });
});

resetButton.addEventListener("click", () => workspace.reset());

importExcelButton.addEventListener("click", () => excelInput.click());

excelInput.addEventListener("change", async () => {
  const [file] = excelInput.files;
  excelInput.value = "";
  if (!file) return;

  try {
    const state = workspace.getState();
    const candidate = await parseExcelFile(file, state.currentType, state.selectedBnId);
    workspace.replaceWorkspace(candidate);
    setStatus(importStatus, "已匯入工單 Excel。", "success");
  } catch (error) {
    setStatus(importStatus, `無法匯入工單 Excel：\n${formatError(error)}`, "error");
  }
});

importJsonButton.addEventListener("click", () => jsonInput.click());

jsonInput.addEventListener("change", async () => {
  const [file] = jsonInput.files;
  jsonInput.value = "";
  if (!file) return;

  const confirmed = window.confirm("匯入暫存將覆蓋目前工作區域，是否繼續？");
  if (!confirmed) return;

  try {
    const candidate = parseWorkspaceJson(await file.text());
    workspace.replaceWorkspace(candidate);
    setStatus(importStatus, "已還原暫存工作內容。", "success");
  } catch (error) {
    setStatus(importStatus, `無法匯入暫存檔：\n${formatError(error)}`, "error");
  }
});

exportButton.addEventListener("click", async () => {
  exportButton.disabled = true;
  setStatus(exportStatus, "正在建立完整專案…");
  try {
    const result = await exportWorkspace(workspace.getState());
    const warnings =
      result && Array.isArray(result.warnings) ? result.warnings : [];
    setStatus(
      exportStatus,
      warnings.length > 0
        ? `完整專案已建立。\n${warnings.join("\n")}`
        : "完整專案已建立。",
      "success"
    );
  } catch (error) {
    setStatus(exportStatus, `完整專案建立失敗：\n${formatError(error)}`, "error");
  } finally {
    exportButton.disabled = !workspace.getState().threshold;
  }
});

// --- A－17 Modal（Round 3～5）：由既有 state.threshold 呈現並「即時編輯寫回」 ---
// schema 固定 5×9 不變；有效判定沿用 renderer detectUsage 語意。
// 顯示範圍＝open 時的有效 slot index 清單＋session 內以「＋新增」逐一啟用的
// 既有空 slot（display index 清單為純 UI 狀態，close／reopen 即丟棄重推）。
// 內容編輯 handler 只寫資料、不重建表格 DOM（保護 focus／IME）；結構性操作
//（open／＋新增）才重建表格。所有寫回一律 immutable next → workspace.updateThreshold。

function isLogisticsSlotUsed(threshold, index) {
  const slot = threshold.logistics[index];
  return (
    slot.line1.trim() !== "" ||
    slot.line2.trim() !== "" ||
    threshold.thresholds.some(
      (pair) => pair.cells[index].color !== "" || pair.cells[index].amount !== ""
    )
  );
}

function isThresholdPairUsed(pair) {
  return (
    pair.name.trim() !== "" ||
    pair.cells.some((cell) => cell.color !== "" || cell.amount !== "")
  );
}

function getUsedThresholdIndexes(threshold) {
  const logistics = [];
  threshold.logistics.forEach((slot, index) => {
    if (isLogisticsSlotUsed(threshold, index)) logistics.push(index);
  });
  const pairs = [];
  threshold.thresholds.forEach((pair, index) => {
    if (isThresholdPairUsed(pair)) pairs.push(index);
  });
  return { logistics, pairs };
}

let modalDisplayLogistics = [];
let modalDisplayPairs = [];

function getThreshold() {
  return workspace.getState().threshold;
}

function commitThreshold(mutate) {
  const current = getThreshold();
  if (!current) return;
  const next = structuredClone(current);
  mutate(next);
  workspace.updateThreshold(next);
}

function cellStatus(cell) {
  if (cell.amount === "↑") return "↑";
  return cell.color === "紅" ? "紅" : "綠";
}

function makeThresholdTextInput(value, placeholder, onInput) {
  const input = document.createElement("input");
  input.type = "text";
  input.autocomplete = "off";
  input.placeholder = placeholder;
  input.value = value;
  input.addEventListener("input", () => onInput(input.value));
  return input;
}

// Round 6：刪除（一鍵即刪，無 confirm）。已使用 slot → 單次 commit 內 compact；
// 純 session 空項 → 只移除顯示、不碰 Workspace。compact 後依最新 threshold 重繪，
// N/M 與新增按鈕 disabled 由 renderThresholdModal 依新長度自動恢復。
function makeThresholdRemoveButton(label, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "threshold-remove";
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function deleteLogisticsColumn(index) {
  const threshold = getThreshold();
  if (!threshold) return;

  if (!isLogisticsSlotUsed(threshold, index)) {
    // 純 session 空欄：只移除顯示項，不寫入 Workspace。
    modalDisplayLogistics = modalDisplayLogistics.filter((column) => column !== index);
    renderThresholdModal();
    return;
  }

  commitThreshold((next) => {
    for (let i = index; i < 4; i += 1) next.logistics[i] = next.logistics[i + 1];
    next.logistics[4] = { line1: "", line2: "" };
    next.thresholds.forEach((pair) => {
      for (let i = index; i < 4; i += 1) pair.cells[i] = pair.cells[i + 1];
      pair.cells[4] = { color: "", amount: "" };
    });
  });
  // Round 6.1：以「刪除前的 session display 清單」做 index 左移，保留同 session
  // 尚未輸入的空欄（v < i 保留原 index、v > i 因 Workspace compact 減 1）。
  // 映射為單射（整數間無法存在 v < i < v+1），不可能發生 schema index 碰撞。
  modalDisplayLogistics = modalDisplayLogistics
    .filter((column) => column !== index)
    .map((column) => (column > index ? column - 1 : column));
  renderThresholdModal();
}

function deleteThresholdPair(index) {
  const threshold = getThreshold();
  if (!threshold) return;

  if (!isThresholdPairUsed(threshold.thresholds[index])) {
    modalDisplayPairs = modalDisplayPairs.filter((pairIndex) => pairIndex !== index);
    renderThresholdModal();
    return;
  }

  commitThreshold((next) => {
    for (let p = index; p < 8; p += 1) next.thresholds[p] = next.thresholds[p + 1];
    next.thresholds[8] = {
      name: "",
      cells: Array.from({ length: 5 }, () => ({ color: "", amount: "" }))
    };
  });
  // Round 6.2：與 Round 6.1 物流維度對稱——以「刪除前的 session display 清單」
  // 做 index 上移映射，保留同 session 尚未輸入的空門檻列（p' < p 保留、p' > p 減 1）。
  // 映射為單射（整數間無法存在 v < p < v+1），不可能發生 schema index 碰撞。
  modalDisplayPairs = modalDisplayPairs
    .filter((pairIndex) => pairIndex !== index)
    .map((pairIndex) => (pairIndex > index ? pairIndex - 1 : pairIndex));
  renderThresholdModal();
}

function buildLogisticsHeaderCell(threshold, index) {
  const cell = document.createElement("th");
  cell.append(
    makeThresholdTextInput(threshold.logistics[index].line1, "物流名稱", (value) =>
      commitThreshold((next) => {
        next.logistics[index].line1 = value;
      })
    ),
    makeThresholdTextInput(threshold.logistics[index].line2, "第二行（可留空）", (value) =>
      commitThreshold((next) => {
        next.logistics[index].line2 = value;
      })
    ),
    makeThresholdRemoveButton("刪除物流", () => deleteLogisticsColumn(index))
  );
  return cell;
}

function buildThresholdCell(pairIndex, columnIndex, cell) {
  const td = document.createElement("td");

  const amount = document.createElement("input");
  amount.type = "text";
  amount.autocomplete = "off";
  amount.placeholder = "金額";
  amount.value = cell.amount === "↑" ? "" : cell.amount;
  amount.disabled = cell.amount === "↑";

  const status = document.createElement("select");
  ["綠", "紅", "↑"].forEach((label) => {
    const option = document.createElement("option");
    option.value = label;
    option.textContent = label;
    status.append(option);
  });
  status.value = cellStatus(cell);

  amount.addEventListener("input", () => {
    commitThreshold((next) => {
      const target = next.thresholds[pairIndex].cells[columnIndex];
      target.amount = amount.value;
      // 空白 cell 首次輸入金額：以 UI 當下顯示狀態寫入 color（預設綠），
      // 避免畫面顯示綠但 state.color 仍空白的不一致。
      if (target.color === "" && amount.value !== "") {
        target.color = status.value === "紅" ? "紅" : "綠";
      }
    });
  });

  status.addEventListener("change", () => {
    commitThreshold((next) => {
      const target = next.thresholds[pairIndex].cells[columnIndex];
      if (status.value === "↑") {
        target.amount = "↑";
        target.color = "";
      } else {
        target.color = status.value;
        if (target.amount === "↑") target.amount = "";
      }
    });
    // 只更新本 cell 的 UI 狀態，不重建表格。
    if (status.value === "↑") {
      amount.value = "";
      amount.disabled = true;
    } else {
      amount.disabled = false;
    }
  });

  td.append(amount, status);
  return td;
}

function buildThresholdRow(threshold, pairIndex) {
  const row = document.createElement("tr");
  const head = document.createElement("th");
  head.append(
    makeThresholdTextInput(threshold.thresholds[pairIndex].name, "門檻名稱", (value) =>
      commitThreshold((next) => {
        next.thresholds[pairIndex].name = value;
      })
    ),
    makeThresholdRemoveButton("刪除門檻", () => deleteThresholdPair(pairIndex))
  );
  row.append(head);
  modalDisplayLogistics.forEach((column) => {
    row.append(
      buildThresholdCell(pairIndex, column, threshold.thresholds[pairIndex].cells[column])
    );
  });
  return row;
}

function renderThresholdModal() {
  if (!thresholdModal || !thresholdTable) return;
  const threshold = getThreshold();
  if (!threshold) return;

  if (thresholdLogisticsCount) {
    thresholdLogisticsCount.textContent = `適用物流 ${modalDisplayLogistics.length} / 5`;
  }
  if (thresholdPairsCount) {
    thresholdPairsCount.textContent = `門檻項目 ${modalDisplayPairs.length} / 9`;
  }
  if (thresholdAddLogistics) {
    thresholdAddLogistics.disabled = modalDisplayLogistics.length >= 5;
  }
  if (thresholdAddPair) {
    thresholdAddPair.disabled = modalDisplayPairs.length >= 9;
  }

  const table = document.createElement("table");
  const head = document.createElement("tr");
  const corner = document.createElement("th");
  corner.textContent = "門檻項目＼適用物流";
  head.append(corner);
  modalDisplayLogistics.forEach((column) => {
    head.append(buildLogisticsHeaderCell(threshold, column));
  });
  table.append(head);
  modalDisplayPairs.forEach((pairIndex) => {
    table.append(buildThresholdRow(threshold, pairIndex));
  });
  thresholdTable.replaceChildren(table);
}

// Round 7：右欄四欄（主標題／VIP 標題／VIP 文案／CTA）投影與寫回；
// 沿用既有 editor.js engine 與 Round 5 既有 commitThreshold 寫回路徑。
function getEditorValues(state, bnId) {
  if (bnId === "17") {
    const threshold = state.threshold;
    if (!threshold) return {};
    return {
      mainTitle: threshold.mainTitle,
      vipTitle: threshold.vip.title,
      vipCopy: threshold.vip.copy,
      vipCta: threshold.vip.cta
    };
  }
  return getBnFieldValues(state, bnId);
}

function updateThresholdTextField(fieldId, value) {
  commitThreshold((next) => {
    if (fieldId === "mainTitle") next.mainTitle = value;
    else if (fieldId === "vipTitle") next.vip.title = value;
    else if (fieldId === "vipCopy") next.vip.copy = value;
    else if (fieldId === "vipCta") next.vip.cta = value;
  });
}

function appendUnusedSlot(displayList, totalSlots) {
  for (let index = 0; index < totalSlots; index += 1) {
    if (!displayList.includes(index)) {
      displayList.push(index);
      return true;
    }
  }
  return false;
}

if (thresholdEditButton && thresholdModal) {
  thresholdEditButton.addEventListener("click", () => {
    const threshold = getThreshold();
    if (!threshold) return;
    const used = getUsedThresholdIndexes(threshold);
    modalDisplayLogistics = used.logistics.slice();
    modalDisplayPairs = used.pairs.slice();
    renderThresholdModal();
    thresholdModal.hidden = false;
  });
}

if (thresholdClose && thresholdModal) {
  thresholdClose.addEventListener("click", () => {
    thresholdModal.hidden = true;
    modalDisplayLogistics = [];
    modalDisplayPairs = [];
  });
}

if (thresholdAddLogistics && thresholdModal) {
  thresholdAddLogistics.addEventListener("click", () => {
    if (thresholdAddLogistics.disabled || modalDisplayLogistics.length >= 5) return;
    if (appendUnusedSlot(modalDisplayLogistics, 5)) renderThresholdModal();
  });
}

if (thresholdAddPair && thresholdModal) {
  thresholdAddPair.addEventListener("click", () => {
    if (thresholdAddPair.disabled || modalDisplayPairs.length >= 9) return;
    if (appendUnusedSlot(modalDisplayPairs, 9)) renderThresholdModal();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
  if (shouldIgnoreArrowKey(event)) return;

  const state = workspace.getState();
  if (!state.currentType || !state.selectedBnId) return;

  event.preventDefault();
  const currentIndex = BN_ITEMS.findIndex((item) => item.id === state.selectedBnId);
  const offset = event.key === "ArrowUp" ? -1 : 1;
  const nextIndex = Math.min(BN_ITEMS.length - 1, Math.max(0, currentIndex + offset));
  workspace.selectBn(BN_ITEMS[nextIndex].id);
});

// 單一 ResizeObserver：Preview 可用區變動時只重算現存 canvas 的顯示尺寸，
// 不重跑 renderer、不重新匯入；無 canvas 時 no-op。
function refitPreviewCanvas() {
  const widthOnly = preview.classList.contains(PREVIEW_STACK_CLASS);
  preview
    .querySelectorAll(".preview-canvas")
    .forEach((canvas) => applyPreviewFit(canvas, { widthOnly }));
}

const previewFitObserver = new ResizeObserver(refitPreviewCanvas);
previewFitObserver.observe(preview);
window.addEventListener("resize", refitPreviewCanvas);

buildBnList();
workspace.subscribe(render);
render(workspace.getState(), "initial");
