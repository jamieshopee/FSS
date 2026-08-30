export const C_COUNTDOWN_VALUES = Object.freeze([
  "0天",
  "1天",
  "2天",
  "3天",
  "4天",
  "5天",
  "6天",
  "7天",
  "8天",
  "9天"
]);

export function isValidCCountdown(value) {
  return typeof value === "string" && C_COUNTDOWN_VALUES.includes(value);
}
