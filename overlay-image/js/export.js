import { createItemCanvas, assertItemFits } from "./preview.js";
import { WORKSPACE_FORMAT, WORKSPACE_VERSION } from "./import.js";

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("PNG 編碼失敗。"));
      }
    }, "image/png");
  });
}

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

async function setPngDpi(blob, dpi) {
  const source = new Uint8Array(await blob.arrayBuffer());
  const signature = source.subarray(0, 8);
  const chunks = [];
  let offset = 8;
  let inserted = false;

  while (offset < source.length) {
    const view = new DataView(source.buffer, source.byteOffset + offset, 8);
    const length = view.getUint32(0);
    const type = String.fromCharCode(...source.subarray(offset + 4, offset + 8));
    const end = offset + 12 + length;
    if (end > source.length) {
      throw new Error("PNG metadata 結構無效。");
    }
    if (type !== "pHYs") {
      chunks.push(source.subarray(offset, end));
    }
    if (type === "IHDR" && !inserted) {
      chunks.push(makePhysChunk(dpi));
      inserted = true;
    }
    offset = end;
  }

  if (!inserted) {
    throw new Error("PNG 缺少必要的 IHDR metadata。");
  }
  return new Blob([signature, ...chunks], { type: "image/png" });
}

function makeDateCode(date = new Date()) {
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

export async function exportWorkspace(workspace) {
  if (!globalThis.JSZip) {
    throw new Error("ZIP 程式庫尚未載入。");
  }
  if (workspace.items.length === 0) {
    throw new Error("目前沒有可下載的 Overlay Image。");
  }

  workspace.items.forEach(assertItemFits);
  const dateCode = makeDateCode();
  const zip = new globalThis.JSZip();
  const largeFolder = zip.folder("1200x1200");
  const smallFolder = zip.folder("320x320");

  for (const item of workspace.items) {
    const largeCanvas = createItemCanvas(item);
    const largePng = await setPngDpi(await canvasToBlob(largeCanvas), 72);
    largeFolder.file(`${item.identifier}.png`, largePng);

    const smallCanvas = document.createElement("canvas");
    smallCanvas.width = 320;
    smallCanvas.height = 320;
    const smallContext = smallCanvas.getContext("2d");
    if (!smallContext) {
      throw new Error("瀏覽器無法建立 320 × 320 Canvas。");
    }
    smallContext.drawImage(largeCanvas, 0, 0, 320, 320);
    const smallPng = await setPngDpi(await canvasToBlob(smallCanvas), 72);
    smallFolder.file(`${item.identifier}.png`, smallPng);
  }

  const json = JSON.stringify(
    {
      format: WORKSPACE_FORMAT,
      version: WORKSPACE_VERSION,
      selectedId: workspace.selectedId,
      items: workspace.items,
    },
    null,
    2,
  );
  zip.file(`OverlayImage_${dateCode}.json`, json);
  const result = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
  downloadBlob(result, `OverlayImage_${dateCode}.zip`);
}
