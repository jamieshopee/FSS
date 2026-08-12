import { createWorkspace } from "./workspace.js";
import { getEditorFields, renderEditor } from "./editor.js";

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

const typeView = document.querySelector("#type-view");
const consoleView = document.querySelector("#console-view");
const currentType = document.querySelector("#current-type");
const bnList = document.querySelector("#bn-list");
const preview = document.querySelector("#preview");
const editorTitle = document.querySelector("#editor-title");
const editor = document.querySelector("#editor");
const resetButton = document.querySelector("#reset-button");
const workspace = createWorkspace();

let renderedEditorBnId = null;

function getBnItem(bnId) {
  return BN_ITEMS.find((item) => item.id === bnId);
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

function renderPreview(state, selectedItem) {
  const fields = getEditorFields(state.selectedBnId);
  const values = state.textByBn[state.selectedBnId] || {};

  const card = document.createElement("article");
  card.className = "preview-placeholder";

  const status = document.createElement("p");
  status.className = "template-status";
  status.textContent = "正式 Template 尚未接入";

  const type = document.createElement("p");
  type.className = "preview-type";
  type.textContent = `樣式 ${state.currentType}`;

  const title = document.createElement("h3");
  title.textContent = selectedItem.name;

  const fieldList = document.createElement("dl");
  fieldList.className = "preview-fields";

  fields.forEach((field) => {
    const term = document.createElement("dt");
    term.textContent = field.label;
    const description = document.createElement("dd");
    description.textContent = values[field.id] || "尚未輸入";
    fieldList.append(term, description);
  });

  card.append(status, type, title);
  if (fields.length) {
    card.append(fieldList);
  } else {
    const noEditor = document.createElement("p");
    noEditor.className = "preview-empty";
    noEditor.textContent = "手動編輯 UI 尚未定案／尚未接入";
    card.append(noEditor);
  }
  preview.replaceChildren(card);
}

function render(state, reason) {
  const hasWorkspace = Boolean(state.currentType);
  typeView.hidden = hasWorkspace;
  consoleView.hidden = !hasWorkspace;

  if (!hasWorkspace) {
    renderedEditorBnId = null;
    return;
  }

  const selectedItem = getBnItem(state.selectedBnId);
  currentType.textContent = `目前樣式：${state.currentType}`;

  bnList.querySelectorAll(".bn-item").forEach((button) => {
    const isSelected = button.dataset.bnId === state.selectedBnId;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-current", isSelected ? "true" : "false");
  });

  editorTitle.textContent = selectedItem.name;
  if (renderedEditorBnId !== state.selectedBnId) {
    renderedEditorBnId = state.selectedBnId;
    renderEditor(
      editor,
      state.selectedBnId,
      state.textByBn[state.selectedBnId] || {},
      (fieldId, value) => workspace.updateText(state.selectedBnId, fieldId, value)
    );
  }

  renderPreview(state, selectedItem);

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

buildBnList();
workspace.subscribe(render);
render(workspace.getState(), "initial");
