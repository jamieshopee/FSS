import { WORKSPACE_FORMAT, WORKSPACE_VERSION } from "./import.js";
import { renderBnToCanvas } from "./render-a.js";

// 正式輸出格式（Jamie 最終裁決）：12_LPBN 為 JPG。
export const EXPORT_ITEMS = Object.freeze([
  { id: "01", name: "01_DDcard BN", format: "jpg", maxBytes: 245000 },
  { id: "02", name: "02_MALL HBN", format: "jpg", maxBytes: 145000 },
  { id: "03", name: "03_Coin page BN", format: "jpg" },
  { id: "04", name: "04_Loyalty BN", format: "png" },
  { id: "05", name: "05_MSBN", format: "png" },
  { id: "06", name: "06_IG", format: "jpg" },
  { id: "07", name: "07_FB POST", format: "jpg" },
  { id: "08", name: "08_SPX TVBN_1", format: "jpg" },
  { id: "09", name: "09_SPX TVBN_2", format: "jpg" },
  { id: "10", name: "10_POP UP", format: "png", maxBytes: 250000 },
  { id: "11", name: "11_Line OA", format: "png" },
  { id: "12", name: "12_LPBN", format: "jpg" },
  { id: "13", name: "13_Skinny BN_APP", format: "png" },
  { id: "14", name: "14_Skinny BN_PC", format: "png" },
  { id: "15", name: "15_AR", format: "jpg" },
  { id: "16", name: "16_副區", format: "jpg" },
  { id: "17", name: "17_門檻表", format: "png" }
]);

export const EXPORT_DPI = 72;
export const JPEG_QUALITY = 1.0;

// 01／02 容量控制（Jamie 裁決）：quality floor 0.5；固定 7 次 binary search，
// 精度 (1.0−0.5)/2^7 ≈ 0.004；容量一律以 72 dpi patch 後最終 bytes 判定。
export const JPEG_QUALITY_FLOOR = 0.5;
const JPEG_SEARCH_STEPS = 7;

export function serializeWorkspace(state) {
  return JSON.stringify(
    {
      format: WORKSPACE_FORMAT,
      version: WORKSPACE_VERSION,
      type: "A",
      selectedBnId: state.selectedBnId,
      shared: state.shared,
      bnText: state.bnText,
      threshold: state.threshold
    },
    null,
    2
  );
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error(`${type} 編碼失敗。`));
        }
      },
      type,
      quality
    );
  });
}

// --- PNG pHYs 72 dpi patch（byte-level，不重新 encode、不動 IDAT pixel data）---

function writeUint32(bytes, offset, value) {
  bytes[offset] = (value >>> 24) & 0xff;
  bytes[offset + 1] = (value >>> 16) & 0xff;
  bytes[offset + 2] = (value >>> 8) & 0xff;
  bytes[offset + 3] = value & 0xff;
}

const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }
  return value >>> 0;
});

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makePhysChunk(dpi) {
  const pixelsPerMeter = Math.round(dpi / 0.0254);
  const chunk = new Uint8Array(21);
  writeUint32(chunk, 0, 9);
  chunk.set([0x70, 0x48, 0x59, 0x73], 4);
  writeUint32(chunk, 8, pixelsPerMeter);
  writeUint32(chunk, 12, pixelsPerMeter);
  chunk[16] = 1;
  writeUint32(chunk, 17, crc32(chunk.subarray(4, 17)));
  return chunk;
}

const PNG_SIGNATURE = Object.freeze([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

export function patchPngDpiBytes(source, dpi) {
  if (
    source.length < 8 ||
    !PNG_SIGNATURE.every((byte, index) => source[index] === byte)
  ) {
    throw new Error("PNG 檔案結構無效。");
  }

  const parts = [source.subarray(0, 8)];
  let offset = 8;
  let inserted = false;

  while (offset < source.length) {
    if (offset + 8 > source.length) {
      throw new Error("PNG metadata 結構無效。");
    }
    const view = new DataView(source.buffer, source.byteOffset + offset, 8);
    const length = view.getUint32(0);
    const type = String.fromCharCode(...source.subarray(offset + 4, offset + 8));
    const end = offset + 12 + length;
    if (end > source.length) {
      throw new Error("PNG metadata 結構無效。");
    }
    if (type !== "pHYs") {
      parts.push(source.subarray(offset, end));
    }
    if (type === "IHDR" && !inserted) {
      parts.push(makePhysChunk(dpi));
      inserted = true;
    }
    offset = end;
  }

  if (!inserted) {
    throw new Error("PNG 缺少必要的 IHDR metadata。");
  }

  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const result = new Uint8Array(total);
  let position = 0;
  parts.forEach((part) => {
    result.set(part, position);
    position += part.length;
  });
  return result;
}

async function setPngDpi(blob, dpi) {
  const patched = patchPngDpiBytes(new Uint8Array(await blob.arrayBuffer()), dpi);
  return new Blob([patched], { type: "image/png" });
}

// --- JPEG JFIF 72 dpi patch（byte-level，不 Resize、不再次 lossy re-encode）---

const JFIF_IDENTIFIER = Object.freeze([0x4a, 0x46, 0x49, 0x46, 0x00]);

export function patchJpegDpiBytes(source, dpi) {
  if (source.length < 4 || source[0] !== 0xff || source[1] !== 0xd8) {
    throw new Error("JPEG 檔案結構無效。");
  }
  if (source[2] !== 0xff) {
    throw new Error("JPEG segment 結構無效。");
  }

  const hasJfifApp0 =
    source[3] === 0xe0 &&
    source.length >= 18 &&
    ((source[4] << 8) | source[5]) >= 16 &&
    JFIF_IDENTIFIER.every((byte, index) => source[6 + index] === byte);

  if (hasJfifApp0) {
    const patched = new Uint8Array(source);
    patched[13] = 1;
    patched[14] = (dpi >> 8) & 0xff;
    patched[15] = dpi & 0xff;
    patched[16] = (dpi >> 8) & 0xff;
    patched[17] = dpi & 0xff;
    return patched;
  }

  // 無 JFIF APP0：於 SOI 後插入最小合法 JFIF APP0（v1.02、units=dpi、無縮圖）。
  const segment = new Uint8Array([
    0xff, 0xe0, 0x00, 0x10,
    0x4a, 0x46, 0x49, 0x46, 0x00,
    0x01, 0x02,
    0x01,
    (dpi >> 8) & 0xff, dpi & 0xff,
    (dpi >> 8) & 0xff, dpi & 0xff,
    0x00, 0x00
  ]);
  const result = new Uint8Array(source.length + segment.length);
  result.set(source.subarray(0, 2), 0);
  result.set(segment, 2);
  result.set(source.subarray(2), 2 + segment.length);
  return result;
}

async function setJpegDpi(blob, dpi) {
  const patched = patchJpegDpiBytes(new Uint8Array(await blob.arrayBuffer()), dpi);
  return new Blob([patched], { type: "image/jpeg" });
}

// 只供帶 maxBytes 的 JPG 版位使用：在 0.5～1.0 內找「patch 後 bytes 符合上限的
// 最高 quality」。先測 1.0（達標即直接使用）；floor 0.5 仍超標 → 整次 Export fail。
// 回傳的 blob 即已驗證達標的 patch 後結果，不再 re-encode。
async function encodeJpegWithinLimit(canvas, maxBytes, itemName) {
  const fullQualityBlob = await setJpegDpi(
    await canvasToBlob(canvas, "image/jpeg", JPEG_QUALITY),
    EXPORT_DPI
  );
  if (fullQualityBlob.size <= maxBytes) return fullQualityBlob;

  const floorBlob = await setJpegDpi(
    await canvasToBlob(canvas, "image/jpeg", JPEG_QUALITY_FLOOR),
    EXPORT_DPI
  );
  if (floorBlob.size > maxBytes) {
    throw new Error(
      `${itemName} 在最低品質 ${JPEG_QUALITY_FLOOR} 下仍超過容量上限 ${maxBytes} bytes，無法輸出完整專案。`
    );
  }

  let fittingQuality = JPEG_QUALITY_FLOOR;
  let exceedingQuality = JPEG_QUALITY;
  let bestBlob = floorBlob;
  for (let step = 0; step < JPEG_SEARCH_STEPS; step += 1) {
    const quality = (fittingQuality + exceedingQuality) / 2;
    const candidate = await setJpegDpi(
      await canvasToBlob(canvas, "image/jpeg", quality),
      EXPORT_DPI
    );
    if (candidate.size <= maxBytes) {
      bestBlob = candidate;
      fittingQuality = quality;
    } else {
      exceedingQuality = quality;
    }
  }
  return bestBlob;
}

// 只供帶 maxBytes 的 PNG 版位（10_POP UP）使用（Jamie 裁決之正式 ladder：
// native lossless → UPNG 256 色 indexed PNG → 整次 Export fail，無其他階層）。
// 容量一律以 72 dpi patch 後最終 bytes 判定；native 達標即直接採用、不 quantize。
// fallback 一律從原始 Canvas raw RGBA encode（不以 patch 後 PNG 為中間來源），
// encode 完成後重新 patch 72 dpi，再以最終 bytes 判定；仍超標 → throw。
async function encodePngWithinLimit(canvas, maxBytes, itemName) {
  const nativeBlob = await setPngDpi(
    await canvasToBlob(canvas, "image/png"),
    EXPORT_DPI
  );
  if (nativeBlob.size <= maxBytes) return nativeBlob;

  if (!globalThis.pako || !globalThis.UPNG) {
    throw new Error("PNG 壓縮程式庫尚未載入。");
  }

  const imageData = canvas
    .getContext("2d")
    .getImageData(0, 0, canvas.width, canvas.height);
  const encodedBuffer = globalThis.UPNG.encode(
    [imageData.data.buffer],
    canvas.width,
    canvas.height,
    256
  );
  const quantizedBlob = await setPngDpi(
    new Blob([encodedBuffer], { type: "image/png" }),
    EXPORT_DPI
  );
  if (quantizedBlob.size > maxBytes) {
    throw new Error(
      `${itemName} 以 256 色 PNG 壓縮後仍為 ${quantizedBlob.size} bytes，超過容量上限 ${maxBytes} bytes，無法輸出完整專案。`
    );
  }
  return quantizedBlob;
}

// --- Export orchestration ---

function makeDateCode(date) {
  return `${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export async function exportWorkspace(state) {
  if (!globalThis.JSZip) {
    throw new Error("ZIP 程式庫尚未載入。");
  }
  if (!state.currentType) {
    throw new Error("目前沒有工作中的 Workspace。");
  }
  if (!state.threshold) {
    throw new Error("17_門檻表 尚未匯入工單資料，無法輸出完整專案。");
  }

  // 該次 Export 只取得一次日期，ZIP 與 JSON 共用同一 MMDD。
  const dateCode = makeDateCode(new Date());
  const zip = new globalThis.JSZip();

  for (const item of EXPORT_ITEMS) {
    const canvas = document.createElement("canvas");
    await renderBnToCanvas(canvas, state, item.id);

    let blob;
    if (item.format === "jpg") {
      if (item.maxBytes) {
        blob = await encodeJpegWithinLimit(canvas, item.maxBytes, item.name);
      } else {
        blob = await canvasToBlob(canvas, "image/jpeg", JPEG_QUALITY);
        blob = await setJpegDpi(blob, EXPORT_DPI);
      }
      zip.file(`${item.name}.jpg`, blob);
    } else {
      if (item.maxBytes) {
        blob = await encodePngWithinLimit(canvas, item.maxBytes, item.name);
      } else {
        blob = await canvasToBlob(canvas, "image/png");
        blob = await setPngDpi(blob, EXPORT_DPI);
      }
      zip.file(`${item.name}.png`, blob);
    }
  }

  zip.file(`FSS BN_${dateCode}.json`, serializeWorkspace(state));

  const zipBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
  downloadBlob(zipBlob, `FSS BN_${dateCode}.zip`);
}
