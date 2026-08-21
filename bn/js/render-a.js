// A-only renderer 對應表與呼叫橋：只服務本輪 A－01～17 平台整合。
// 不是跨 Type registry，不修改任何正式 renderer exports。
import { renderDdcardBn, waitForDdcardBnFonts } from "../templates/A/01-ddcard-bn.js";
import { renderMallHbn, waitForMallHbnFonts } from "../templates/A/02-mall-hbn.js";
import { renderCoinPageBn, waitForCoinPageBnFonts } from "../templates/A/03-coin-page-bn.js";
import { renderLoyaltyBn, waitForLoyaltyBnFonts } from "../templates/A/04-loyalty-bn.js";
import { renderMsbn, waitForMsbnFonts } from "../templates/A/05-msbn.js";
import { renderIg, waitForIgFonts } from "../templates/A/06-ig.js";
import { renderFbPost, waitForFbPostFonts } from "../templates/A/07-fb-post.js";
import { renderSpxTvbn1, waitForSpxTvbn1Fonts } from "../templates/A/08-spx-tvbn-1.js";
import { renderSpxTvbn2, waitForSpxTvbn2Fonts } from "../templates/A/09-spx-tvbn-2.js";
import { renderPopUp, waitForPopUpFonts } from "../templates/A/10-pop-up.js";
import { renderLineOa, waitForLineOaFonts } from "../templates/A/11-line-oa.js";
import { renderLpbn, waitForLpbnFonts } from "../templates/A/12-lpbn.js";
import { renderSkinnyBnApp, waitForSkinnyBnAppFonts } from "../templates/A/13-skinny-bn-app.js";
import { renderSkinnyBnPc, waitForSkinnyBnPcFonts } from "../templates/A/14-skinny-bn-pc.js";
import { renderAr, waitForArFonts } from "../templates/A/15-ar.js";
import { renderSubArea, waitForSubAreaFonts } from "../templates/A/16-sub-area.js";
import {
  renderThresholdTable,
  waitForThresholdTableFonts
} from "../templates/A/17-threshold-table.js";

const ASSET_BASE = "../assets/A/底圖/";

const A_TABLE = Object.freeze({
  "01": { render: renderDdcardBn, waitFonts: waitForDdcardBnFonts, background: "01_DDcard BN.jpg" },
  "02": { render: renderMallHbn, waitFonts: waitForMallHbnFonts, background: "02_MALL HBN.jpg" },
  "03": { render: renderCoinPageBn, waitFonts: waitForCoinPageBnFonts, background: "03_Coin page BN.jpg" },
  "04": { render: renderLoyaltyBn, waitFonts: waitForLoyaltyBnFonts, background: "04_Loyalty BN.png" },
  "05": { render: renderMsbn, waitFonts: waitForMsbnFonts, background: "05_MSBN.png" },
  "06": { render: renderIg, waitFonts: waitForIgFonts, background: "06_IG.jpg" },
  "07": { render: renderFbPost, waitFonts: waitForFbPostFonts, background: "07_FB POST.jpg" },
  "08": { render: renderSpxTvbn1, waitFonts: waitForSpxTvbn1Fonts, background: "08_SPX TVBN_1.jpg" },
  "09": { render: renderSpxTvbn2, waitFonts: waitForSpxTvbn2Fonts, background: "09_SPX TVBN_2.jpg" },
  "10": { render: renderPopUp, waitFonts: waitForPopUpFonts, background: "10_POP UP.png" },
  "11": { render: renderLineOa, waitFonts: waitForLineOaFonts, background: "11_Line OA.png" },
  "12": { render: renderLpbn, waitFonts: waitForLpbnFonts, background: "12_LPBN.jpg" },
  "13": { render: renderSkinnyBnApp, waitFonts: waitForSkinnyBnAppFonts, background: "13_Skinny BN_APP.png" },
  "14": { render: renderSkinnyBnPc, waitFonts: waitForSkinnyBnPcFonts, background: "14_Skinny BN_PC.png" },
  "15": { render: renderAr, waitFonts: waitForArFonts, background: "15_AR.jpg" },
  "16": { render: renderSubArea, waitFonts: waitForSubAreaFonts, background: "16_副區.jpg" },
  "17": {
    render: renderThresholdTable,
    waitFonts: waitForThresholdTableFonts,
    titleImage: "17_主標題.png",
    vipImage: "17_VIP.png"
  }
});

export function getBnFieldValues(state, bnId) {
  const number = Number.parseInt(bnId, 10);
  if (number >= 1 && number <= 12) return { ...state.shared };
  if (number >= 13 && number <= 16) return { ...(state.bnText[bnId] || {}) };
  return {};
}

const imageCache = new Map();

function loadImage(url, label) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image), { once: true });
    image.addEventListener(
      "error",
      () => reject(new Error(`${label}載入失敗。`)),
      { once: true }
    );
    image.src = url;
  });
}

function getImage(fileName, label) {
  const url = new URL(ASSET_BASE + fileName, import.meta.url).href;
  if (!imageCache.has(url)) {
    const promise = loadImage(url, label).catch((error) => {
      imageCache.delete(url);
      throw error;
    });
    imageCache.set(url, promise);
  }
  return imageCache.get(url);
}

export async function renderBnToCanvas(canvas, state, bnId) {
  const entry = A_TABLE[bnId];
  if (!entry) {
    throw new Error(`不支援的 BN 版位：${bnId}`);
  }

  if (bnId === "17") {
    const model = state.threshold;
    if (!model) {
      throw new Error("17_門檻表 尚未匯入工單資料。");
    }
    const [titleImage, vipImage] = await Promise.all([
      getImage(entry.titleImage, "17_門檻表 正式主標底圖"),
      getImage(entry.vipImage, "17_門檻表 正式 VIP 底圖"),
      entry.waitFonts()
    ]);
    return entry.render(canvas, { titleImage, vipImage }, model);
  }

  const [backgroundImage] = await Promise.all([
    getImage(entry.background, `${bnId} 正式底圖`),
    entry.waitFonts()
  ]);
  return entry.render(canvas, backgroundImage, getBnFieldValues(state, bnId));
}
