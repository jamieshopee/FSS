export const WORKSHEET_SCHEMA = Object.freeze({
  headerRow: 12,
  dataStartRow: 13,
  blockSize: 3,
  identifierColumn: 0,
  headers: Object.freeze([
    Object.freeze({ column: 0, value: "編號" }),
    Object.freeze({ column: 1, value: "第一格" }),
    Object.freeze({ column: 3, value: "第二格" }),
    Object.freeze({ column: 5, value: "第三格" }),
  ]),
  badgeLabels: Object.freeze(["文字樣式", "顏色", "文字內容"]),
});

export const BADGE_GROUPS = Object.freeze([
  Object.freeze({ name: "第一格", labelColumn: 1, valueColumn: 2 }),
  Object.freeze({ name: "第二格", labelColumn: 3, valueColumn: 4 }),
  Object.freeze({ name: "第三格", labelColumn: 5, valueColumn: 6 }),
]);

export const LAYOUT_OPTIONS = Object.freeze(["A", "B", "C", "D"]);
export const COLOR_OPTIONS = Object.freeze(["紅", "綠", "黃", "藍"]);

export function isSafeIdentifier(value) {
  if (typeof value !== "string" || value.trim() === "") {
    return false;
  }

  return (
    !/[<>:"/\\|?*\u0000-\u001f]/u.test(value) &&
    value !== "." &&
    value !== ".." &&
    !/[. ]$/u.test(value)
  );
}
