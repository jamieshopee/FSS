const listeners = new Set();

let workspace = {
  items: [],
  selectedId: null,
};

function notify(options = {}) {
  const snapshot = getWorkspace();
  for (const listener of listeners) {
    listener(snapshot, options);
  }
}

export function getWorkspace() {
  return structuredClone(workspace);
}

export function subscribe(listener) {
  listeners.add(listener);
  listener(getWorkspace(), { editor: true });
  return () => listeners.delete(listener);
}

export function replaceWorkspace(nextWorkspace) {
  workspace = structuredClone(nextWorkspace);
  notify();
}

export function resetWorkspace() {
  workspace = { items: [], selectedId: null };
  notify();
}

export function selectItem(identifier) {
  if (!workspace.items.some((item) => item.identifier === identifier)) {
    return;
  }
  workspace.selectedId = identifier;
  notify();
}

export function updateItem(identifier, updater, options = {}) {
  const itemIndex = workspace.items.findIndex((item) => item.identifier === identifier);
  if (itemIndex === -1) {
    throw new Error("找不到目前選取的 Overlay Image。");
  }

  const nextItem = structuredClone(workspace.items[itemIndex]);
  updater(nextItem);
  const nextItems = workspace.items.map((item, index) => (index === itemIndex ? nextItem : item));
  workspace = { ...workspace, items: nextItems };
  notify(options);
}
