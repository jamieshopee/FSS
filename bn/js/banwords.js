import { BANWORD_RULES } from "./banwords-data.js";

function splitList(value) {
  return String(value || "")
    .split(/[\n,，、、/]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isRegexKeyword(keyword) {
  if (!keyword || keyword === "-" || keyword === "~" || keyword.length === 1) {
    return false;
  }

  return (
    /\\[dDsSwWbB]/.test(keyword) ||
    /^\^.*\$/.test(keyword) ||
    /[+*?]+/.test(keyword) ||
    /\[[^\]]+\]/.test(keyword) ||
    /\([^)]*\)/.test(keyword) ||
    /\|/.test(keyword) ||
    /\\./.test(keyword)
  );
}

function buildKeywordPattern(keyword) {
  const flags = /[A-Za-z]/.test(keyword) ? "gi" : "g";

  if (keyword === "-") return /\-/g;
  if (keyword === "~") return /\~/g;

  if (isRegexKeyword(keyword)) {
    try {
      return new RegExp(keyword, flags);
    } catch (_error) {
      return new RegExp(escapeRegExp(keyword), flags);
    }
  }

  return new RegExp(escapeRegExp(keyword), flags);
}

function protectExcludedSegments(text, excludeText) {
  let result = text;
  const protectedSegments = [];

  splitList(excludeText).forEach((excluded) => {
    result = result.replace(new RegExp(escapeRegExp(excluded), "g"), (match) => {
      const token = `__EXCLUDE_${protectedSegments.length}__`;
      protectedSegments.push({ token, value: match });
      return token;
    });
  });

  return { text: result, protectedSegments };
}

function restoreExcludedSegments(text, protectedSegments) {
  return protectedSegments.reduce(
    (result, segment) => result.replace(segment.token, segment.value),
    text
  );
}

export function applyBanwords(value) {
  const original = String(value || "");
  let text = original;
  let blocked = false;
  const messages = [];

  BANWORD_RULES.forEach((rule) => {
    const protectedResult = protectExcludedSegments(text, rule.exclude);
    const pattern = buildKeywordPattern(rule.keyword);
    pattern.lastIndex = 0;

    if (!pattern.test(protectedResult.text)) {
      text = restoreExcludedSegments(
        protectedResult.text,
        protectedResult.protectedSegments
      );
      return;
    }

    pattern.lastIndex = 0;
    const replacement = rule.replacement || "";
    const nextText = protectedResult.text.replace(pattern, replacement);

    if (nextText !== protectedResult.text) {
      if (!replacement) blocked = true;
      if (rule.message) messages.push(rule.message);
    }

    text = restoreExcludedSegments(nextText, protectedResult.protectedSegments);
  });

  const uniqueMessages = [...new Set(messages)];
  return {
    text,
    changed: text !== original,
    blocked,
    messages: uniqueMessages
  };
}
