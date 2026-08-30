// A renderer 對應表＋稀疏 D override 呼叫橋；不修改任何正式 renderer exports。
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
import {
  renderDdcardBn as renderD01DdcardBn,
  waitForDdcardBnFonts as waitForD01DdcardBnFonts
} from "../templates/D/01-ddcard-bn.js";
import {
  renderMallHbn as renderD02MallHbn,
  waitForMallHbnFonts as waitForD02MallHbnFonts
} from "../templates/D/02-mall-hbn.js";
import {
  renderCoinPageBn as renderD03CoinPageBn,
  waitForCoinPageBnFonts as waitForD03CoinPageBnFonts
} from "../templates/D/03-coin-page-bn.js";
import { renderIg as renderD06Ig, waitForIgFonts as waitForD06IgFonts } from "../templates/D/06-ig.js";
import {
  renderFbPost as renderD07FbPost,
  waitForFbPostFonts as waitForD07FbPostFonts
} from "../templates/D/07-fb-post.js";
import {
  renderSpxTvbn1 as renderD08SpxTvbn1,
  waitForSpxTvbn1Fonts as waitForD08SpxTvbn1Fonts
} from "../templates/D/08-spx-tvbn-1.js";
import {
  renderSpxTvbn2 as renderD09SpxTvbn2,
  waitForSpxTvbn2Fonts as waitForD09SpxTvbn2Fonts
} from "../templates/D/09-spx-tvbn-2.js";
import {
  renderPopUp as renderD10PopUp,
  waitForPopUpFonts as waitForD10PopUpFonts
} from "../templates/D/10-pop-up.js";
import {
  renderLpbn as renderD12Lpbn,
  waitForLpbnFonts as waitForD12LpbnFonts
} from "../templates/D/12-lpbn.js";
import {
  renderDdcardBn as renderC01DdcardBn,
  waitForDdcardBnFonts as waitForC01DdcardBnFonts
} from "../templates/C/01-ddcard-bn.js";
import {
  renderMallHbn as renderC02MallHbn,
  waitForMallHbnFonts as waitForC02MallHbnFonts
} from "../templates/C/02-mall-hbn.js";
import {
  renderCoinPageBn as renderC03CoinPageBn,
  waitForCoinPageBnFonts as waitForC03CoinPageBnFonts
} from "../templates/C/03-coin-page-bn.js";
import {
  renderLoyaltyBn as renderC04LoyaltyBn,
  waitForLoyaltyBnFonts as waitForC04LoyaltyBnFonts
} from "../templates/C/04-loyalty-bn.js";
import {
  renderMsbn as renderC05Msbn,
  waitForMsbnFonts as waitForC05MsbnFonts
} from "../templates/C/05-msbn.js";
import {
  renderIg as renderC06Ig,
  waitForIgFonts as waitForC06IgFonts
} from "../templates/C/06-ig.js";
import {
  renderFbPost as renderC07FbPost,
  waitForFbPostFonts as waitForC07FbPostFonts
} from "../templates/C/07-fb-post.js";
import {
  renderSpxTvbn1 as renderC08SpxTvbn1,
  waitForSpxTvbn1Fonts as waitForC08SpxTvbn1Fonts
} from "../templates/C/08-spx-tvbn-1.js";
import {
  renderSpxTvbn2 as renderC09SpxTvbn2,
  waitForSpxTvbn2Fonts as waitForC09SpxTvbn2Fonts
} from "../templates/C/09-spx-tvbn-2.js";
import {
  renderPopUp as renderC10PopUp,
  waitForPopUpFonts as waitForC10PopUpFonts
} from "../templates/C/10-pop-up.js";
import {
  renderLineOa as renderC11LineOa,
  waitForLineOaFonts as waitForC11LineOaFonts
} from "../templates/C/11-line-oa.js";
import {
  renderLpbn as renderC12Lpbn,
  waitForLpbnFonts as waitForC12LpbnFonts
} from "../templates/C/12-lpbn.js";
import {
  renderSkinnyBnApp as renderC13SkinnyBnApp,
  waitForSkinnyBnAppFonts as waitForC13SkinnyBnAppFonts
} from "../templates/C/13-skinny-bn-app.js";
import {
  renderSkinnyBnPc as renderC14SkinnyBnPc,
  waitForSkinnyBnPcFonts as waitForC14SkinnyBnPcFonts
} from "../templates/C/14-skinny-bn-pc.js";
import { isValidCCountdown } from "./countdown.js";

// 正式底圖 base 依目前樣式 Type 解析。
// 這不是 Type framework 或 config layer，只是既有單一 base 常數的最小 Type 對照。
const ASSET_BASE_BY_TYPE = Object.freeze({
  A: "../assets/A/底圖/",
  B: "../assets/B/底圖/",
  C: "../assets/C/底圖/",
  D: "../assets/D/底圖/"
});

const D_LOGO_ASSET_BASE = "../assets/D/";
const D_LOGO_FILE = "Logo.png";
const D17_CANONICAL_ASSET_BASE = "../assets/A/底圖/";
const C_SHARED_CANONICAL_ASSET_BASE = "../assets/A/底圖/";

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

const C_TABLE = Object.freeze({
  "01": {
    render: renderC01DdcardBn,
    waitFonts: waitForC01DdcardBnFonts,
    background: "01_DDcard BN.jpg"
  },
  "02": {
    render: renderC02MallHbn,
    waitFonts: waitForC02MallHbnFonts,
    background: "02_MALL HBN.jpg"
  },
  "03": {
    render: renderC03CoinPageBn,
    waitFonts: waitForC03CoinPageBnFonts,
    background: "03_Coin page BN.jpg"
  },
  "04": {
    render: renderC04LoyaltyBn,
    waitFonts: waitForC04LoyaltyBnFonts,
    background: "04_Loyalty BN.png"
  },
  "05": {
    render: renderC05Msbn,
    waitFonts: waitForC05MsbnFonts,
    background: "05_MSBN.png"
  },
  "06": {
    render: renderC06Ig,
    waitFonts: waitForC06IgFonts,
    background: "06_IG.jpg"
  },
  "07": {
    render: renderC07FbPost,
    waitFonts: waitForC07FbPostFonts,
    background: "07_FB POST.jpg"
  },
  "08": {
    render: renderC08SpxTvbn1,
    waitFonts: waitForC08SpxTvbn1Fonts,
    background: "08_SPX TVBN_1.jpg"
  },
  "09": {
    render: renderC09SpxTvbn2,
    waitFonts: waitForC09SpxTvbn2Fonts,
    background: "09_SPX TVBN_2.jpg"
  },
  "10": {
    render: renderC10PopUp,
    waitFonts: waitForC10PopUpFonts,
    background: "10_POP UP.png"
  },
  "11": {
    render: renderC11LineOa,
    waitFonts: waitForC11LineOaFonts,
    background: "11_Line OA.png"
  },
  "12": {
    render: renderC12Lpbn,
    waitFonts: waitForC12LpbnFonts,
    background: "12_LPBN.jpg"
  },
  "13": {
    render: renderC13SkinnyBnApp,
    waitFonts: waitForC13SkinnyBnAppFonts,
    background: "13_Skinny BN_APP.png"
  },
  "14": {
    render: renderC14SkinnyBnPc,
    waitFonts: waitForC14SkinnyBnPcFonts,
    background: "14_Skinny BN_PC.png"
  }
});

const C_COUNTDOWN_BN_IDS = Object.freeze(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"]);
const C_REUSE_A_IDS = Object.freeze(["15", "16", "17"]);

const D_OVERRIDE_TABLE = Object.freeze({
  "01": { render: renderD01DdcardBn, waitFonts: waitForD01DdcardBnFonts, background: "01_DDcard BN.jpg" },
  "02": { render: renderD02MallHbn, waitFonts: waitForD02MallHbnFonts, background: "02_MALL HBN.jpg" },
  "03": { render: renderD03CoinPageBn, waitFonts: waitForD03CoinPageBnFonts, background: "03_Coin page BN.jpg" },
  "06": { render: renderD06Ig, waitFonts: waitForD06IgFonts, background: "06_IG.jpg" },
  "07": { render: renderD07FbPost, waitFonts: waitForD07FbPostFonts, background: "07_FB POST.jpg" },
  "08": { render: renderD08SpxTvbn1, waitFonts: waitForD08SpxTvbn1Fonts, background: "08_SPX TVBN_1.jpg" },
  "09": { render: renderD09SpxTvbn2, waitFonts: waitForD09SpxTvbn2Fonts, background: "09_SPX TVBN_2.jpg" },
  "10": { render: renderD10PopUp, waitFonts: waitForD10PopUpFonts, background: "10_POP UP.png" },
  "12": { render: renderD12Lpbn, waitFonts: waitForD12LpbnFonts, background: "12_LPBN.jpg" }
});

const D_REUSE_A_IDS = Object.freeze(["04", "05", "11", "13", "14", "15", "16", "17"]);

function hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function resolveRenderRoute(type, bnId) {
  if (!hasOwn(ASSET_BASE_BY_TYPE, type)) {
    throw new Error(`不支援的樣式：${type}。正式底圖只支援樣式 A、B、C 與 D。`);
  }

  if (type === "C") {
    if (hasOwn(C_TABLE, bnId)) {
      return { entry: C_TABLE[bnId], usesDOverride: false };
    }
    if (C_REUSE_A_IDS.includes(bnId) && hasOwn(A_TABLE, bnId)) {
      return {
        entry: A_TABLE[bnId],
        usesDOverride: false,
        assetBaseOverride: C_SHARED_CANONICAL_ASSET_BASE
      };
    }
    throw new Error(`樣式 C 尚未支援 BN ${bnId}；目前只支援 C－01～C－17。`);
  }

  const aEntry = hasOwn(A_TABLE, bnId) ? A_TABLE[bnId] : null;
  if (!aEntry) {
    throw new Error(`不支援的 BN 版位：${bnId}`);
  }

  if (type !== "D") {
    return { entry: aEntry, usesDOverride: false };
  }

  if (hasOwn(D_OVERRIDE_TABLE, bnId)) {
    return { entry: D_OVERRIDE_TABLE[bnId], usesDOverride: true };
  }

  if (D_REUSE_A_IDS.includes(bnId)) {
    return { entry: aEntry, usesDOverride: false };
  }

  throw new Error(`樣式 D 缺少 BN ${bnId} 的正式 renderer route。`);
}

export function getBnFieldValues(state, bnId) {
  const number = Number.parseInt(bnId, 10);
  if (number >= 1 && number <= 12) {
    if (state.currentType === "C" && C_COUNTDOWN_BN_IDS.includes(bnId)) {
      return { ...state.shared, cCountdownText: state.cCountdownText };
    }
    return { ...state.shared };
  }
  if (number >= 13 && number <= 16) {
    if (state.currentType === "C" && (bnId === "13" || bnId === "14")) {
      return {
        ...(state.bnText[bnId] || {}),
        cCountdownText: state.cCountdownText
      };
    }
    return { ...(state.bnText[bnId] || {}) };
  }
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

function getImage(assetBase, fileName, label) {
  const url = new URL(assetBase + fileName, import.meta.url).href;
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
  if (
    state.currentType === "C" &&
    C_COUNTDOWN_BN_IDS.includes(bnId) &&
    !isValidCCountdown(state.cCountdownText)
  ) {
    throw new Error(`C－${bnId} 倒數天數只允許完整字串 0天～9天。`);
  }

  const { entry, usesDOverride, assetBaseOverride } = resolveRenderRoute(
    state.currentType,
    bnId
  );
  const assetBase = assetBaseOverride || ASSET_BASE_BY_TYPE[state.currentType];

  if (bnId === "17") {
    const model = state.threshold;
    if (!model) {
      throw new Error("17_門檻表 尚未匯入工單資料。");
    }
    const thresholdAssetBase =
      state.currentType === "D" ? D17_CANONICAL_ASSET_BASE : assetBase;
    const [titleImage, vipImage] = await Promise.all([
      getImage(thresholdAssetBase, entry.titleImage, "17_門檻表 正式主標底圖"),
      getImage(thresholdAssetBase, entry.vipImage, "17_門檻表 正式 VIP 底圖"),
      entry.waitFonts()
    ]);
    return entry.render(canvas, { titleImage, vipImage }, model);
  }

  if (usesDOverride) {
    const [backgroundImage, logoImage] = await Promise.all([
      getImage(assetBase, entry.background, `${bnId} 正式底圖`),
      getImage(D_LOGO_ASSET_BASE, D_LOGO_FILE, "D 樣式共用 Logo"),
      entry.waitFonts()
    ]);
    return entry.render(
      canvas,
      { backgroundImage, logoImage },
      getBnFieldValues(state, bnId)
    );
  }

  const [backgroundImage] = await Promise.all([
    getImage(assetBase, entry.background, `${bnId} 正式底圖`),
    entry.waitFonts()
  ]);
  return entry.render(canvas, backgroundImage, getBnFieldValues(state, bnId));
}
