const emptyState = () => ({
  currentType: null,
  selectedBnId: null,
  textByBn: {}
});

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
        currentType: type,
        selectedBnId: firstBnId,
        textByBn: {}
      };
      notify("start");
    },

    selectBn(bnId) {
      if (!state.currentType || state.selectedBnId === bnId) return;
      state = { ...state, selectedBnId: bnId };
      notify("selection");
    },

    updateText(bnId, fieldId, value) {
      const currentFields = state.textByBn[bnId] || {};
      if ((currentFields[fieldId] || "") === value) return;

      state = {
        ...state,
        textByBn: {
          ...state.textByBn,
          [bnId]: {
            ...currentFields,
            [fieldId]: value
          }
        }
      };
      notify("text");
    },

    reset() {
      state = emptyState();
      notify("reset");
    }
  };
}
