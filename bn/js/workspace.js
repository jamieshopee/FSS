const SHARED_FIELD_IDS = Object.freeze(["headline", "subheadline", "protectionText"]);

const emptyState = () => ({
  currentType: null,
  selectedBnId: null,
  shared: { headline: "", subheadline: "", protectionText: "" },
  bnText: {
    "13": { line1: "", line2: "" },
    "14": { line1: "", line2: "" },
    "15": { line1: "", line2: "" },
    "16": { leftTitle: "", leftCopy: "", rightTitle: "", rightCopy: "" }
  },
  threshold: null
});

export function isSharedBnId(bnId) {
  const number = Number.parseInt(bnId, 10);
  return number >= 1 && number <= 12;
}

export function createWorkspace() {
  let state = emptyState();
  const listeners = new Set();

  function notify(reason) {
    listeners.forEach((listener) => listener(state, reason));
  }

  return {
    getState() {
      return state;
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },

    start(type, firstBnId) {
      state = {
        ...emptyState(),
        currentType: type,
        selectedBnId: firstBnId
      };
      notify("start");
    },

    selectBn(bnId) {
      if (!state.currentType || state.selectedBnId === bnId) return;
      state = { ...state, selectedBnId: bnId };
      notify("selection");
    },

    updateText(bnId, fieldId, value) {
      if (!state.currentType) return;

      if (isSharedBnId(bnId)) {
        if (!SHARED_FIELD_IDS.includes(fieldId)) return;
        if (state.shared[fieldId] === value) return;
        state = {
          ...state,
          shared: { ...state.shared, [fieldId]: value }
        };
      } else if (Object.prototype.hasOwnProperty.call(state.bnText, bnId)) {
        const fields = state.bnText[bnId];
        if (!Object.prototype.hasOwnProperty.call(fields, fieldId)) return;
        if (fields[fieldId] === value) return;
        state = {
          ...state,
          bnText: {
            ...state.bnText,
            [bnId]: { ...fields, [fieldId]: value }
          }
        };
      } else {
        return;
      }
      notify("text");
    },

    // A－17 Manual Editor（Round 5）最小寫入口：整體替換 threshold 子樹；
    // schema 固定 5×9 不變，其餘 state 不動。
    updateThreshold(nextThreshold) {
      if (!state.currentType || !state.threshold) return;
      state = { ...state, threshold: structuredClone(nextThreshold) };
      notify("text");
    },

    replaceWorkspace(candidate) {
      state = structuredClone(candidate);
      notify("replace");
    },

    reset() {
      state = emptyState();
      notify("reset");
    }
  };
}
