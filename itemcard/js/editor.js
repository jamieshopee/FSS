import { COLOR_OPTIONS, LAYOUT_OPTIONS } from "../forms/excel-schema.js";
import { MAX_BADGES } from "../templates/badge-common.js";
import { parseBadgeContent, validateBadgeContent } from "../templates/index.js";
import { assertItemFits } from "./preview.js";

let addedBadgeSequence = 0;

function createField(labelText, value, onCommit, options = {}) {
  const label = document.createElement("label");
  const text = document.createElement("span");
  text.textContent = labelText;
  const input = options.multiline ? document.createElement("textarea") : document.createElement("input");
  if (!options.multiline) {
    input.type = "text";
  }
  input.value = value;
  if (options.maxLength) {
    input.maxLength = options.maxLength;
  }
  input.addEventListener("input", () => {
    try {
      onCommit(input.value);
    } catch (error) {
      options.onError(error.message);
    }
  });
  label.append(text, input);
  return label;
}

function contentFields(badge, commitContent, onError) {
  const stack = document.createElement("div");
  stack.className = "field-stack";

  if (badge.layout === "A" || badge.layout === "B") {
    stack.append(
      createField("文字內容", badge.content.text, (text) => commitContent({ text }), { onError }),
    );
  } else if (badge.layout === "C") {
    stack.append(
      createField("左側四字", badge.content.leftText, (leftText) => {
        commitContent({ leftText });
      }, { maxLength: 4, onError }),
      createField("數字＋特殊符號", badge.content.valueText, (valueText) => {
        commitContent({ valueText });
      }, { onError }),
    );
  } else if (badge.layout === "D") {
    stack.append(
      createField("第一行", badge.content.firstLine, (firstLine) => {
        commitContent({ firstLine });
      }, { onError }),
      createField("第二行", badge.content.secondLine, (secondLine) => {
        commitContent({ secondLine });
      }, { onError }),
    );
  }

  return stack;
}

function commitBadgeContent(item, badgeIndex, contentPatch, updateItem) {
  updateItem(
    item.identifier,
    (draft) => {
      const badge = draft.badges[badgeIndex];
      const nextContent = validateBadgeContent(badge.layout, {
        ...badge.content,
        ...contentPatch,
      });
      draft.badges[badgeIndex].content = nextContent;
      assertItemFits(draft);
    },
    { editor: false },
  );
}

function createBadgeCard(item, badge, badgeIndex, actions) {
  const card = document.createElement("article");
  card.className = "badge-card";
  card.draggable = true;
  card.dataset.badgeIndex = String(badgeIndex);

  const header = document.createElement("div");
  header.className = "badge-card-header";
  const info = document.createElement("span");
  info.className = "badge-info";
  info.textContent = `${badge.layout}／${badge.color}`;
  const handle = document.createElement("span");
  handle.className = "drag-handle";
  handle.textContent = "拖曳";
  header.append(info, handle);

  const fields = contentFields(
    badge,
    (content) => commitBadgeContent(item, badgeIndex, content, actions.updateItem),
    actions.onError,
  );
  const footer = document.createElement("div");
  footer.className = "badge-actions";
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-badge";
  deleteButton.textContent = "刪除 Badge";
  deleteButton.addEventListener("click", () => {
    actions.updateItem(item.identifier, (draft) => {
      draft.badges.splice(badgeIndex, 1);
    });
  });
  footer.append(deleteButton);
  card.append(header, fields, footer);

  card.addEventListener("dragstart", (event) => {
    card.classList.add("is-dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(badgeIndex));
  });
  card.addEventListener("dragend", () => card.classList.remove("is-dragging"));
  card.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  });
  card.addEventListener("drop", (event) => {
    event.preventDefault();
    const fromIndex = Number(event.dataTransfer.getData("text/plain"));
    if (!Number.isInteger(fromIndex) || fromIndex === badgeIndex) {
      return;
    }
    actions.updateItem(item.identifier, (draft) => {
      const [moved] = draft.badges.splice(fromIndex, 1);
      draft.badges.splice(badgeIndex, 0, moved);
    });
  });

  return card;
}

function makeSelect(labelText, options) {
  const label = document.createElement("label");
  const text = document.createElement("span");
  text.textContent = labelText;
  const select = document.createElement("select");
  for (const optionValue of options) {
    const option = document.createElement("option");
    option.value = optionValue;
    option.textContent = optionValue;
    select.append(option);
  }
  label.append(text, select);
  return { label, select };
}

function createAddFields(layout) {
  const container = document.createElement("div");
  container.className = "field-stack";
  const fields = {};

  const append = (name, labelText) => {
    const label = document.createElement("label");
    const text = document.createElement("span");
    text.textContent = labelText;
    const input = document.createElement("input");
    input.type = "text";
    if (layout === "C" && name === "leftText") {
      input.maxLength = 4;
    }
    fields[name] = input;
    label.append(text, input);
    container.append(label);
  };

  if (layout === "A" || layout === "B") {
    append("text", "文字內容");
  } else if (layout === "C") {
    append("leftText", "左側四字");
    append("valueText", "數字＋特殊符號");
  } else {
    append("firstLine", "第一行");
    append("secondLine", "第二行");
  }
  return { container, fields };
}

function contentFromAddFields(layout, fields) {
  if (layout === "A" || layout === "B") {
    return parseBadgeContent(layout, fields.text.value);
  }
  if (layout === "C") {
    return validateBadgeContent(layout, {
      leftText: fields.leftText.value,
      valueText: fields.valueText.value,
    });
  }
  return validateBadgeContent(layout, {
    firstLine: fields.firstLine.value,
    secondLine: fields.secondLine.value,
  });
}

function renderAddRegion(container, item, actions) {
  container.replaceChildren();
  if (!item || item.badges.length >= MAX_BADGES) {
    return;
  }

  const region = document.createElement("div");
  region.className = "add-region";
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "add-toggle";
  toggle.textContent = "新增 Badge";
  region.append(toggle);

  toggle.addEventListener("click", () => {
    toggle.hidden = true;
    const form = document.createElement("div");
    form.className = "add-form";
    const grid = document.createElement("div");
    grid.className = "add-form-grid";
    const layoutSelect = makeSelect("Layout", LAYOUT_OPTIONS);
    const colorSelect = makeSelect("顏色", COLOR_OPTIONS);
    grid.append(layoutSelect.label, colorSelect.label);

    let addFields = createAddFields(layoutSelect.select.value);
    const fieldsHost = document.createElement("div");
    fieldsHost.append(addFields.container);
    layoutSelect.select.addEventListener("change", () => {
      addFields = createAddFields(layoutSelect.select.value);
      fieldsHost.replaceChildren(addFields.container);
    });

    const error = document.createElement("p");
    error.className = "field-error";
    error.hidden = true;
    const buttons = document.createElement("div");
    buttons.className = "add-form-actions";
    const cancel = document.createElement("button");
    cancel.type = "button";
    cancel.className = "cancel-add";
    cancel.textContent = "取消";
    const confirm = document.createElement("button");
    confirm.type = "button";
    confirm.className = "confirm-add";
    confirm.textContent = "新增";
    buttons.append(cancel, confirm);
    form.append(grid, fieldsHost, error, buttons);
    region.append(form);

    cancel.addEventListener("click", () => {
      form.remove();
      toggle.hidden = false;
    });
    confirm.addEventListener("click", () => {
      try {
        const badge = {
          id: `added-${Date.now()}-${addedBadgeSequence += 1}`,
          origin: "added",
          layout: layoutSelect.select.value,
          color: colorSelect.select.value,
          content: contentFromAddFields(layoutSelect.select.value, addFields.fields),
        };
        const nextItem = structuredClone(item);
        nextItem.badges.push(badge);
        assertItemFits(nextItem);
        actions.updateItem(item.identifier, (draft) => draft.badges.push(badge));
      } catch (addError) {
        error.textContent = addError.message;
        error.hidden = false;
      }
    });
  });

  container.append(region);
}

export function renderEditor(elements, workspace, actions) {
  const item = workspace.items.find((candidate) => candidate.identifier === workspace.selectedId);
  elements.badgeEditor.replaceChildren();

  if (!item) {
    elements.title.textContent = "尚未選取 Item Card";
    elements.dragHint.hidden = true;
    const empty = document.createElement("p");
    empty.className = "editor-empty";
    empty.textContent = "請先匯入資料並選取 Item Card。";
    elements.badgeEditor.append(empty);
    elements.addRegion.replaceChildren();
    return;
  }

  elements.title.textContent = item.identifier;
  elements.dragHint.hidden = item.badges.length < 2;
  item.badges.forEach((badge, index) => {
    elements.badgeEditor.append(createBadgeCard(item, badge, index, actions));
  });
  renderAddRegion(elements.addRegion, item, actions);
}
