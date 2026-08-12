import { applyBanwords } from "./banwords.js";

const MAIN_FIELDS = [
  { id: "headline", label: "主標", limit: 8 },
  { id: "subheadline", label: "副標", limit: 7 },
  { id: "protectionText", label: "保護文字", limit: 17 }
];

const STORE_FIELDS = [
  { id: "line1", label: "第一行", limit: 5 },
  { id: "line2", label: "第二行", limit: 6 }
];

const PAYMENT_FIELDS = [
  { id: "line1", label: "第一行", limit: 3 },
  { id: "line2", label: "第二行", limit: 3 }
];

const PICKUP_FIELDS = [
  { id: "leftTitle", label: "左標題", limit: 10 },
  { id: "leftCopy", label: "左文案", limit: 10 },
  { id: "rightTitle", label: "右標題", limit: 10 },
  { id: "rightCopy", label: "右文案", limit: 10 }
];

export function getEditorFields(bnId) {
  const number = Number.parseInt(bnId, 10);

  if (number >= 1 && number <= 12) return MAIN_FIELDS;
  if (number === 13 || number === 14) return STORE_FIELDS;
  if (number === 15) return PAYMENT_FIELDS;
  if (number === 16) return PICKUP_FIELDS;
  return [];
}

export function countTextUnits(value) {
  let units = 0;
  for (const character of String(value || "")) {
    units += character.codePointAt(0) <= 0x7f ? 0.5 : 1;
  }
  return units;
}

function formatUnits(units) {
  return Number.isInteger(units) ? String(units) : units.toFixed(1);
}

export function renderEditor(container, bnId, values, onValidChange) {
  const fields = getEditorFields(bnId);
  container.replaceChildren();

  if (!fields.length) {
    const message = document.createElement("p");
    message.className = "editor-empty";
    message.textContent = "手動編輯 UI 尚未定案／尚未接入";
    container.append(message);
    return;
  }

  fields.forEach((field) => {
    const wrapper = document.createElement("div");
    wrapper.className = "field-group";

    const label = document.createElement("label");
    label.htmlFor = `field-${field.id}`;
    label.textContent = field.label;

    const input = document.createElement("input");
    input.id = `field-${field.id}`;
    input.type = "text";
    input.autocomplete = "off";
    input.value = values[field.id] || "";
    input.dataset.fieldId = field.id;

    const meta = document.createElement("div");
    meta.className = "field-meta";

    const counter = document.createElement("span");
    counter.className = "field-counter";

    const warning = document.createElement("span");
    warning.className = "field-warning";
    warning.setAttribute("role", "alert");
    warning.hidden = true;

    const banwordMessage = document.createElement("span");
    banwordMessage.className = "banword-message";
    banwordMessage.setAttribute("role", "status");
    banwordMessage.setAttribute("aria-live", "polite");
    banwordMessage.hidden = true;

    const messages = document.createElement("div");
    messages.className = "field-messages";
    messages.append(warning, banwordMessage);

    meta.append(messages, counter);
    wrapper.append(label, input, meta);
    container.append(wrapper);

    let isComposing = false;
    let lastValidValue = input.value;
    let skipTrailingInputValue = null;

    const updateCounter = () => {
      counter.textContent = `${formatUnits(countTextUnits(input.value))}／${field.limit}`;
    };

    const commit = ({ preserveBanwordMessage = false } = {}) => {
      const result = applyBanwords(input.value);
      if (result.messages.length) {
        banwordMessage.textContent = `⚠ ${result.messages.join("；")}`;
        banwordMessage.hidden = false;
      } else if (!preserveBanwordMessage) {
        banwordMessage.textContent = "";
        banwordMessage.hidden = true;
      }

      const units = countTextUnits(result.text);
      if (units > field.limit) {
        input.value = lastValidValue;
        input.setAttribute("aria-invalid", "true");
        warning.textContent = `超過 ${field.limit} 字上限，已回復上一個合法內容。`;
        warning.hidden = false;
        updateCounter();
        return;
      }

      input.value = result.text;
      lastValidValue = result.text;
      input.removeAttribute("aria-invalid");
      warning.hidden = true;
      warning.textContent = "";
      updateCounter();
      onValidChange(field.id, result.text);
    };

    input.addEventListener("compositionstart", () => {
      isComposing = true;
      skipTrailingInputValue = null;
    });

    input.addEventListener("compositionend", () => {
      isComposing = false;
      commit();
      skipTrailingInputValue = input.value;
    });

    input.addEventListener("input", (event) => {
      if (isComposing || event.isComposing) return;
      if (skipTrailingInputValue !== null && input.value === skipTrailingInputValue) {
        skipTrailingInputValue = null;
        return;
      }
      skipTrailingInputValue = null;
      commit();
    });

    input.addEventListener("blur", () => {
      if (!isComposing) commit({ preserveBanwordMessage: true });
    });

    updateCounter();
  });
}
