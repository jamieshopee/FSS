// A－12／12_LPBN 掛標專用 module。只服務 A－12 掛標需求，
// 不是通用 Badge System、Variant Framework 或 Asset Manager。
// 責任只有四項：月份→固定 slot mapping、掛標 image loading／cache、
// resolveLpbnBadges()、composeLpbnVariantCanvas()。

const BADGE_ASSET_BASE = "../assets/LPBN掛標/";

// 正式 slot mapping（Jamie 已裁決之固定日期順位）：陣列 index 0／1／2 即正式 slot 1／2／3。
// 不做 runtime 檔名日期 parsing、不依賴 directory autoindex、不依賴檔案系統順序。
// 新增月份的維護動作＝新增素材＋在此增加一筆 mapping，不需修改任何 renderer logic。
const BADGE_GROUPS = Object.freeze({
  "9": Object.freeze(["9/99.png", "9/918.png", "9/925.png"]),
  "10": Object.freeze(["10/1010.png", "10/1018.png", "10/1025.png"]),
  "11": Object.freeze(["11/1111.png", "11/1118.png", "11/1125.png"]),
  "12": Object.freeze(["12/1212.png", "12/1218.png", "12/1225.png"])
});

export const LPBN_BADGE_STATUS = Object.freeze({
  NONE: "none",
  UNKNOWN_GROUP: "unknown-group",
  OK: "ok",
  PARTIAL: "partial"
});

const badgeImageCache = new Map();

function loadBadgeImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image), { once: true });
    image.addEventListener(
      "error",
      () => reject(new Error("A－12 掛標素材載入失敗。")),
      { once: true }
    );
    image.src = url;
  });
}

// 與既有 renderer asset loading 同型的 Promise-cache；不共用、不修改、不公開
// render-a.js 的 private helper，避免擴大既有 renderer 的 regression surface。
function getBadgeImage(fileName) {
  const url = new URL(BADGE_ASSET_BASE + fileName, import.meta.url).href;
  if (!badgeImageCache.has(url)) {
    const promise = loadBadgeImage(url).catch((error) => {
      // 失敗不永久 cache，後續 Preview／Export 仍可重試。
      badgeImageCache.delete(url);
      throw error;
    });
    badgeImageCache.set(url, promise);
  }
  return badgeImageCache.get(url);
}

function normalizeMonth(month) {
  return typeof month === "string" ? month.trim() : "";
}

// Preview 與 Export 唯一的 variant resolution source（Requirement 一致性要求）。
// optional 掛標的任何缺失都只做局部降級，不 throw：
// - 月份空白             → NONE，無 variants
// - registry 無此月份     → UNKNOWN_GROUP，無 variants
// - 有 mapping           → 三個 slot 各自獨立 resolve，任一失敗不影響其他 slot
// 每個成功的 variant 一律保留 registry 的正式 slot 1／2／3，缺 slot 不重新編號。
export async function resolveLpbnBadges(month) {
  const key = normalizeMonth(month);
  if (key === "") {
    return Object.freeze({
      status: LPBN_BADGE_STATUS.NONE,
      month: key,
      variants: Object.freeze([]),
      missingSlots: Object.freeze([])
    });
  }

  if (!Object.prototype.hasOwnProperty.call(BADGE_GROUPS, key)) {
    return Object.freeze({
      status: LPBN_BADGE_STATUS.UNKNOWN_GROUP,
      month: key,
      variants: Object.freeze([]),
      missingSlots: Object.freeze([])
    });
  }

  const fileNames = BADGE_GROUPS[key];
  const settled = await Promise.allSettled(
    fileNames.map((fileName) => getBadgeImage(fileName))
  );

  const variants = [];
  const missingSlots = [];
  settled.forEach((result, index) => {
    const slot = index + 1;
    if (result.status === "fulfilled") {
      variants.push(Object.freeze({ slot, image: result.value }));
    } else {
      missingSlots.push(slot);
    }
  });

  return Object.freeze({
    status:
      missingSlots.length === 0
        ? LPBN_BADGE_STATUS.OK
        : LPBN_BADGE_STATUS.PARTIAL,
    month: key,
    variants: Object.freeze(variants),
    missingSlots: Object.freeze(missingSlots)
  });
}

// 以既有 base canvas 的 pixels 複製出一張獨立 variant canvas，再疊上同尺寸 overlay。
// 來源與目標同為 1200 × 550 且無縮放，drawImage 為 1:1 pixel copy，不重取樣。
// 永遠不修改傳入的 baseCanvas，確保無掛標版本保持原樣。
export function composeLpbnVariantCanvas(baseCanvas, overlayImage) {
  const canvas = document.createElement("canvas");
  canvas.width = baseCanvas.width;
  canvas.height = baseCanvas.height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("無法建立 A－12 掛標 variant Canvas 2D context。");
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 1;
  context.globalCompositeOperation = "source-over";
  context.drawImage(baseCanvas, 0, 0);
  context.drawImage(overlayImage, 0, 0);
  return canvas;
}
