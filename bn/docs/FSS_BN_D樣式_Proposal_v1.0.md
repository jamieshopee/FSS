# FSS BN — 樣式 D Implementation Proposal v1.0

**文件性質**：樣式 D 跨 `01`～`17` 版位的**持續累積** Proposal，單一總文件
**文件策略**：樣式 D 不建立逐版位 Proposal 文件；所有 D 版位的 Proposal 集中於本文件（見第 2 節）
**Requirement 基準**：`bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md`
**目前狀態**：D－01 Proposal 已完成並經 GPT Review PASS，Phase 4 Coding 已完成、Phase 6 Jamie 人工對位驗證 PASS；D－02～17 尚未進入 Phase 3
**D－01 Code Commit**：`1139a7c3eca005b15c24bef7751ebb0ada740fe1`（`feat(bn): add D01 DDcard template`）
**正式平台支援**：仍為 **A 與 B**；樣式 D 尚未 enable，維持 fail-closed（見第 5 節）
**Branch**：`main`
**最後更新**：2026-08-24

---

## 1. Document Purpose／Scope（文件目的與範圍）

本文件是**樣式 D 的唯一正式 Proposal 文件**，記錄樣式 D 各 BN 版位經 Phase 3 決定的實作規劃與技術裁決。

本文件是**持續累積**的文件。**只有當某版位完成 Phase 2 Investigation 並進入 Phase 3 之後**，才在本文件新增該版位的 Proposal 章節。**不得**提前替尚未進入 Phase 3 的版位設計 implementation。

本文件不重複 Requirement 內容；產品需求與驗收標準以 `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md` 為準。

樣式 C 不在範圍；樣式 A 與 B 已封箱，本文件不重新設計、不修改其行為。

---

## 2. 文件治理規則（Documentation Governance）

本規則為 Jamie 正式裁決的**樣式 D 文件策略**，自本文件建立起生效：

1. 樣式 D **不採**「每一個版位一份 Requirement ＋ 一份 Proposal」。樣式 D 只維護**一份總 Requirement**（`bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md`）與**一份總 Proposal**（本文件）。
2. 後續 D－02～17 **不另建**逐版位 Requirement／Proposal 文件。當某版位進到 Phase 3 時，只在本文件內**追加該版位 Proposal 章節**。
3. 已完成版位的 Proposal 內容作為**歷史紀錄保留**，不因後續版位開發而重寫既有技術裁決；其內部編號與交叉引用一併保留，以維持既有引用有效。
4. 若 Jamie 後續變更已完成版位的裁決，必須以**明確的 change record**（見第 6 節）更新，不得靜默改寫既有條文。
5. 尚未進入 Phase 3 的版位只能出現在第 3 節狀態索引或第 5 節「尚未進入 Phase 3」語境，**不得**產生任何實作設計、geometry、renderer design 或假的 Proposal。
6. 本治理規則**只適用樣式 D**，不套用回樣式 A、B 或 C。

---

## 3. Proposal Status／Index（逐版位 Proposal 狀態索引）

| 版位 | Phase 進度 | Proposal 狀態 | 本文件對應章節 |
|---|---|---|---|
| `01_DDcard BN` | Phase 4 Coding 完成、Phase 6 Jamie 驗證 PASS | **已完成**（GPT Review PASS） | 第 4 節 |
| `02_MALL HBN` | 尚未進入 Phase 2／3 | 未建立 | — |
| `03_Coin page BN` | 尚未進入 Phase 2／3 | 未建立 | — |
| `04_Loyalty BN` | 尚未進入 Phase 2／3 | 未建立 | — |
| `05_MSBN` | 尚未進入 Phase 2／3 | 未建立 | — |
| `06_IG` | 尚未進入 Phase 2／3 | 未建立 | — |
| `07_FB POST` | 尚未進入 Phase 2／3 | 未建立 | — |
| `08_SPX TVBN_1` | 尚未進入 Phase 2／3 | 未建立 | — |
| `09_SPX TVBN_2` | 尚未進入 Phase 2／3 | 未建立 | — |
| `10_POP UP` | 尚未進入 Phase 2／3 | 未建立 | — |
| `11_Line OA` | 尚未進入 Phase 2／3 | 未建立 | — |
| `12_LPBN` | 尚未進入 Phase 2／3 | 未建立 | — |
| `13_Skinny BN_APP` | 尚未進入 Phase 2／3 | 未建立 | — |
| `14_Skinny BN_PC` | 尚未進入 Phase 2／3 | 未建立 | — |
| `15_AR` | 尚未進入 Phase 2／3 | 未建立 | — |
| `16_副區` | 尚未進入 Phase 2／3 | 未建立 | — |
| `17_門檻表` | 尚未進入 Phase 2／3 | 未建立 | — |

除 D－01 外，本文件目前**沒有任何其他版位的 Proposal 內容**，且不得預先建立。

---

## 4. D－01（`01_DDcard BN`）Proposal

> 本節完整承接 D－01 於 Phase 3 建立、並經 GPT Review PASS 的 Proposal 全文，作為歷史紀錄保留，未刪減任何技術裁決。
>
> **內部編號說明**：本節以下的 A～O 節與其子節（例如「B.7 節」「F.5」「L.2 節」「O 節」）係指**本 D－01 Proposal 章節內部**的原始編號（承接 consolidation 前的原始編號，以維持既有交叉引用有效），不是本總文件的章節編號。
>
> **語境說明**：本節內文中的「本 Proposal」「本輪」「Phase 4 不得…」係 Phase 3 當時的規劃語境，**予以原樣保留**作為 Proposal 歷史紀錄，未改寫成現在式；Phase 4 的實際執行結果另見本節第 P 節。
>
> **原始文件基準資訊**（保留自 consolidation 前的 front matter）：階段 Phase 3 Proposal；主題為 D－01 D-specific renderer template ＋ launch 對位驗證的最小實作規劃；前置為 Phase 0 完成、Phase 1 Requirement GPT Review PASS、Phase 2 Repository／Technical Investigation GPT Review PASS；Requirement 基準為 `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md` 的「D－01 Requirement」章節（consolidation 前之 standalone 版本為 411 行，sha256 `f2f5d273a9c43c392f02137b3d878ecac19a3a4247663cbbaf510e21f478a245`）；Base HEAD `88bd112729a061d012c23d780c4d6718766c8823`（B Docs Commit）；Base parent `4f9fb723930a907b8c3956fd084e757b41302137`（B Code Commit）；Branch `main`。

### A. Purpose／Scope／Phase Boundary

#### A.1 本 Proposal 的目的

本文件規劃 D－01 的**最小實作範圍**，供 Phase 4 Coding 依循。內容為「要改哪些檔案、每個檔案負責什麼、函式責任如何切分、幾何與參數如何確定」，**不含實作碼**。

#### A.2 Scope：只有兩件事

1. **D－01 renderer correctness** —— 新增 D-specific template definition，產出符合 Requirement 的 531×792 canvas（D 底圖 ＋ 固定 Logo ＋ 三段文字）。
2. **D－01 launch alignment verification** —— 新增獨立啟動檔並在既有 viewer 新增一個 D－01 分支，讓 Jamie 能以既有對位 overlay 機制人工校稿。

#### A.3 明確不是本 Proposal 的範圍

**本 Proposal 不是 D platform integration。** 以下一律不在本輪與 Phase 4 範圍：

- 不 enable 正式樣式 D。`bn/js/render-a.js`、`bn/js/import.js`、`bn/js/workspace.js`、`bn/js/export.js`、`bn/js/app.js`、`bn/js/editor.js` **零修改**；`SUPPORTED_TYPES` 維持 `["A","B"]`；樣式 D 在正式平台**維持 fail-closed**。
- 不處理 D－02～17（不預建、不預留、不抽象化）。
- 不處理樣式 C。
- 不修改 A／B 任何行為、template、launcher 或素材。
- 不提出 generic abstraction、plugin system、D type registry redesign、C／D framework、共用 asset framework、共用 scale helper。
- 不修改 Requirement 文件。

#### A.4 Phase Boundary

本輪只建立本 Proposal 一份文件。未 Coding、未進 Phase 4、未 Stage／Commit／Push／Tag／Release、未 Documentation Update。Phase 4 開始前本文件需經 Jamie／GPT Review PASS。

---

### B. Locked Inputs

以下全部為 Phase 1 Requirement 已確認、或 Phase 2 實證、或 GPT Review 已裁決之項目。**Phase 3／4 不得重開。**

#### B.1 Canvas 與素材

| 項目 | LOCKED 值 |
|---|---|
| 正式 canvas | **531 × 792** |
| D 底圖 | `bn/assets/D/底圖/01_DDcard BN.jpg`（實證 JPEG 531×792、109,930 bytes） |
| D 對位圖 | `bn/assets/D/對位/01_DDcard BN.png`（實證 PNG RGBA 531×792、19,936 bytes）— **只作校稿 overlay** |
| 固定 Logo | `bn/assets/D/Logo.png`（實證 PNG RGBA **784 × 112**、48,618 bytes）— renderer asset，不進 Excel／Editor／Workspace／JSON |

#### B.2 四個 placement box

| 元素 | left | top | width | height | 右緣 | 下緣 |
|---|---|---|---|---|---|---|
| Logo | 90 | 103 | 351 | 50 | 441 | 153 |
| headline | 90 | 170 | 351 | 37 | 441 | 207 |
| subheadline | 43 | 221 | 445 | 57 | 488 | 278 |
| protectionText | 43 | 296 | 445 | 22 | 488 | 318 |

四個 box 全落在 531×792 內、**互不重疊**（垂直間隙 17／14／18px）。三個文字 box 為 A／B－01 對應 box 整體下移 **+29px**，`left`／`width`／`height` 完全相同。

#### B.3 Typography／colors／limits（全部沿用 A／B－01，不得重新定義）

| 內容 | Font | Color | 字數上限（半形 0.5） |
|---|---|---|---|
| headline | `30pt "ShopeeNotoSans Medium"` | `#ffffff` | 8 |
| subheadline | `45pt "ShopeeNotoSans Bold"` | `#fff285` | 7 |
| subheadline 之 `$`／`%` | `37pt "ShopeeNotoSans Bold"` | `#fff285` | （同上） |
| protectionText | `18pt "ShopeeNotoSans Medium"` | `#a6f4e6` | 17 |

文字定位一律 **ink bounding-box positioning**（`textAlign="left"`、`textBaseline="alphabetic"` ＋ 自算 baseline）；禁止 `textAlign="center"`／`textBaseline="middle"`。

#### B.4 Medium local 2×

offscreen 2× surface（1062 × 1584）→ `scale(2,2)` → 以**同一組 1× layout 座標**繪製 headline ＋ protectionText → `imageSmoothingEnabled=true`／`imageSmoothingQuality="high"` 降採樣合成回 531×792。Bold 副標**不進** 2× pass。2× 常數為 **template-local**，不建共用 helper／framework。

#### B.5 `$`／`%` 特殊 formatting

`$` 與 `%` 各自成獨立 run 以 37pt 繪製；symbol run 的 baseline 依相鄰 ordinary run 的邊界字 **ink bottom** 對齊（`$` 取後方 run、`%` 取前方 run；無相鄰 ordinary run 則不調整）；最後以**全 run ink bbox 聯集**在 box 內置中。行為必須等價保留。

#### B.6 Export deferred 邊界

版位 01 的 Export 行為（JPG／72 dpi／既有 JPEG quality 邏輯／≤245,000 bytes）由既有 `bn/js/export.js` 的 `EXPORT_ITEMS` 以**版位 id** 為 key 提供，與樣式 type 無關，**零修改即適用**。但因本輪不 enable Type D，樣式 D 無法走正式 Export，故**實測 deferred**（見 L／M 節）。

#### B.7 GPT Review 已裁決之技術決策（本輪 LOCKED）

| # | 裁決 |
|---|---|
| 1 | Logo contain 結果採 `destWidth=350`、`destHeight=50`、`destX=90.5`、`destY=103`；**保留 fractional 90.5**，禁止 round 到 90 或 91 |
| 2 | Logo asset 傳遞採 Phase 2 **方案 C**：固定圖片由 caller 載入，以 **images object 作為 renderer 第二參數**；維持三參數 `render…(canvas, images, values)`；不新增第四參數、不讓 D renderer 自行 async 載圖、不建新 cache／framework；images object 只服務 D－01 實際需要的 background ＋ Logo |
| 3 | Logo draw order LOCKED：`background → Logo → Medium local 2×（headline＋protectionText）→ Bold subheadline`；Logo 用既有 `source-over`／`globalAlpha=1`，PNG alpha 交由普通 `drawImage` 自然合成，不新增 blending／compositing |
| 4 | Logo assert LOCKED：驗證為有效且已成功載入／decode 的 `HTMLImageElement`（`complete` 成立、`naturalWidth`／`naturalHeight` 非 0）；**禁止**要求 Logo 原始尺寸等於 destination box |
| 5 | Logo smoothing LOCKED：Logo draw 前自成一組 `context.save()` → 顯式 `imageSmoothingEnabled=true`／`imageSmoothingQuality="high"` → contain `drawImage` → `context.restore()`；不得依賴 Medium 2× pass 內部的 smoothing state，不得把 Logo 放進 Medium 2× surface |
| 6 | viewer 驗證資料 LOCKED：D－01 分支使用既有 `fieldConfig` 機制提供 D－01 專用測試字串，副標須同時涵蓋 `$` 與 `%` 且 ≤7 單位；不得修改 A－01～12 共用預設測試字串、不得修改正式 Editor／Import |
| 7 | AC 分階段：本輪只驗證 renderer correctness／viewer alignment／Logo 真正畫進 canvas／A/B zero regression；正式 D Preview↔Export 一致性、D Excel Import、D JPG 72dpi／≤245,000 bytes 實測全部 Deferred；禁止為驗證 AC11／AC17 而提前 enable Type D |
| 8 | 本輪不 enable Type D；六個正式 js 檔零修改；`SUPPORTED_TYPES` 維持 A／B；D 仍 fail-closed |
| 9 | A／B 已封箱：不得修改 `bn/templates/A/*.js`、`bn/launch/A/*.command`、A／B assets 或正式平台既有行為 |
| 10 | 只做 D－01；D－02～17 不預建、不預留、不抽象化；C 完全不處理 |

---

### C. Exact File Change Plan

Phase 4 允許動的檔案**恰為 3 個**（2 新增 ＋ 1 修改）＋ 納管 **3 個既有素材**。

#### C.1 新增：`bn/templates/D/01-ddcard-bn.js`

**負責**：D－01 template definition。531×792 canvas 設定、D layout 常數（含 Logo box）、background／Logo validation、font readiness、Logo contain 繪製、Medium local 2× pass、Bold 副標 pass（含 `$`／`%` formatting）、完整 draw order。

**禁止**：不 import 任何其他 template；不 import `render-a.js` 或任何 `bn/js/*`；不建共用 helper／framework；不含字數限制邏輯（由上游負責）；不含 overflow 警告或自動縮字（與 A－01 一致，非 A－17）；不含 Excel／Workspace／Editor 相關邏輯；不含 async 素材載入；不為 D－02～17 預留任何參數、分支或抽象。

#### C.2 新增：`bn/launch/D/01_DDcard BN.command`

**負責**：D－01 人工對位校稿的啟動入口。以 `bn/launch/A/01_DDcard BN.command` 為基準，只調整 D 專屬 URL 與識別名稱。

**禁止**：不重構 shell；不改 port／host／repo root 推導／viewer path／server reuse／readiness marker／curl 用法／trap 行為／pause 行為；不新增功能（不加參數、不加樣式選單、不加 log）。

#### C.3 修改：`bn/launch/viewer.html`

**負責**：新增**一個** `type=D & bn=01_DDcard BN` 分支；新增 branch-local Logo asset 載入與傳遞；unsupported 錯誤訊息最小更新。

**禁止**：不重構 viewer；不新增第二個 viewer 頁；不建立通用 type framework 或 type 表格化；不改動 A－01～17 任一分支的內容；不改 line 155／160／165 的共用預設測試字串；不改 `loadImage`／`bindField`／`countTextUnits`／`overlayToggle`／`applyPreviewFit` 等既有 helper 的行為；不改 A－17 的 `initThresholdTableViewer`。

#### C.4 納管素材（Phase 4，逐一指定路徑）

`bn/assets/D/Logo.png`、`bn/assets/D/底圖/01_DDcard BN.jpg`、`bn/assets/D/對位/01_DDcard BN.png`。

**禁止**：`git add bn/assets/D/`、`git add -A`、`git add .`；禁止移動／改名／壓縮／轉檔／重存任何素材。

---

### D. `bn/templates/D/01-ddcard-bn.js` 函式級設計

以 A－01（`bn/templates/A/01-ddcard-bn.js`，291 行）**已驗證的 renderer behavior** 為基準。以下為責任描述與 pseudocode，**不是實作碼**。

#### D.1 預定最小 exports

Phase 2 實證：A－01 的 `DDCARD_BN_WIDTH`／`HEIGHT`／`LAYOUT` 三個 export **無任何外部消費者**；`render-a.js` 只 import `render*` ＋ `waitFor*Fonts`，viewer 亦僅使用這兩個。

**因此 D template 的最小必要 public API 為 2 個**：

- `renderDdcardBn(canvas, images, values)`
- `waitForDdcardBnFonts()`

**命名建議**：沿用與 A－01 相同的 export 名稱。理由是 export 契約是「per-placement」而非「per-type」，module path（`templates/D/`）已完成命名空間隔離，viewer 以動態 import 的 namespace 屬性存取（`template.renderDdcardBn`），不存在衝突。若未來平台整合需同時 import A 與 D 兩個模組，ESM 的 `as` 別名即可解決 —— 該情境屬 deferred，本輪不設計。

尺寸與 layout 常數是否 export 屬 D template 內部風格，對相容性無影響；建議**不 export**，以維持最小 API 表面。

#### D.2 Renderer signature 與 images object shape

```
renderDdcardBn(canvas, images, values)
```

- **`canvas`**：`HTMLCanvasElement`，由 caller 建立，尺寸由 renderer 自行設定。
- **`images`**：固定素材 object，**由 caller 載入完成後傳入**（LOCKED 裁決 2）。預定 shape：

  ```
  { backgroundImage: HTMLImageElement,   // D 底圖，須為 531×792
    logoImage:       HTMLImageElement }  // 固定 Logo，原始 784×112
  ```

  此形狀沿用 A－17 既有 precedent（`renderThresholdTable(canvas, images, model)`，內部 `const { titleImage, vipImage } = images && typeof images === "object" ? images : {}`；caller 端 `render-a.js` line 117 與 `viewer.html` line 894 均已如此傳入）。**images object 只含 D－01 實際需要的兩張圖，不設計 generic asset API、不為 D－02～17 預留欄位。**

- **`values`**：文字內容 object，shape 與 A－01 完全相同：

  ```
  { headline = "", subheadline = "", protectionText = "" }
  ```

  三個值一律以 `String(...)` 正規化後使用；destructuring 預設為 `""`；整個 `values` 參數本身預設為 `{}`。

**Renderer 為同步函式**（與 A－01～16 一致）。素材載入與 font wait 一律由 caller 在呼叫前 `await` 完成。

#### D.3 必須等價保留的 helper 行為（以 A－01 為基準）

以下 9 個 helper 的**行為**必須與 A－01 等價；允許改名或調整檔內順序，但演算法、符號慣例、邊界處理不得有任何差異。

| Helper | 責任 | 等價保留的關鍵點 |
|---|---|---|
| `hasInk(metrics)` | 判定一個字是否有墨 | 四個 `actualBoundingBox*` **任一非 0** 即為真 |
| `measureRun(context, text, font, symbol)` | 量測單一 run 並回傳 ink 幾何 | 量測前重設 `font`／`textAlign="left"`／`textBaseline="alphabetic"`；`advanceWidth = metrics.width`；`inkLeft = -actualBoundingBoxLeft`、`inkRight = actualBoundingBoxRight`、`inkTop = -actualBoundingBoxAscent`、`inkBottom = actualBoundingBoxDescent`；`x`／`y` 初始 0。**符號正負慣例是行為核心** |
| `boundaryGlyphInkBottom(context, run, fromStart)` | 取 run 邊界第一個有墨字的 ink bottom | `Array.from(run.text)` 做 code-point 切分（**不可用 `split("")`**）；`fromStart=false` 時 `reverse()`；逐字找第一個 `hasInk` 為真者回傳其 `actualBoundingBoxDescent`；全空回傳 `null` |
| `drawCenteredText(context, text, box)` | 單一 run 在 box 內 ink 置中並繪製 | `x = box.left + (box.width - inkWidth)/2 - inkLeft`（`inkWidth = inkRight - inkLeft`）；`y = box.top + box.height/2 - (inkTop + inkBottom)/2`；繪製前重設 `font`／`fillStyle`／`textAlign`／`textBaseline`；`text === ""` 直接 return |
| `tokenizeSubheadline(text)` | 把副標切成 ordinary／symbol runs | code-point 迭代；**只有 `$` 與 `%`** 成為 symbol run；symbol 前後各 flush 一次；空字串不 push |
| `adjacentOrdinaryRun(runs, index, preferNext)` | 找 symbol run 的對齊參考 run | 先取 preferred 方向（`$`→next、`%`→prev），以 `?.symbol === false` **嚴格比對**；不符時 fallback 到反方向；仍不符回傳 `null` |
| `drawMixedSubheadline(context, text, box)` | 副標多 run 繪製（含 `$`／`%`） | **六步順序不可改**：①逐 run `measureRun` ②cursor 以 `advanceWidth` 累加設 `run.x` ③symbol run 設 `run.y = adjacentInkBottom - run.inkBottom`（`null` 時不調整）④取全 run `x+ink*`／`y+ink*` 的 min／max 聯集 ⑤`offsetX = box.left + box.width/2 - (inkLeft+inkRight)/2`、`offsetY` 同理 ⑥逐 run `fillText(text, offsetX+run.x, offsetY+run.y)`；`text === ""` 直接 return |
| `drawMediumText(context, headline, protectionText)` | Medium local 2× pass | 見 D.6 |
| `assertFontsReady()` | 同步字型檢查 | `!document.fonts` 或任一 font string `document.fonts.check(font, FONT_TEST_TEXT)` 為 false → throw |

`waitFor…Fonts()`：無 `document.fonts` → throw；`Promise.all(FONT_CHECKS.map(load))` 後再呼叫 `assertFontsReady()`。

#### D.4 D layout constants 如何替換

**只換三個數字**（Phase 2 實證：D－01 三 box = A－01 三 box 整體 +29px）：

| Layout 欄位 | A－01 值 | D－01 值 |
|---|---|---|
| `headline.top` | 141 | **170** |
| `subheadline.top` | 192 | **221** |
| `protectionText.top` | 267 | **296** |

**其餘全部不變**：三個 box 的 `left`／`width`／`height`；四個 font string（30pt Medium／45pt Bold／37pt Bold／18pt Medium）；三個 color（`#ffffff`／`#fff285`／`#a6f4e6`）；canvas 尺寸 531／792；2× 縮放常數 2；`FONT_CHECKS` 組成；`FONT_TEST_TEXT`。

#### D.5 新增 Logo box

layout 物件新增一個條目：

```
logo: { left: 90, top: 103, width: 351, height: 50 }
```

**結構與三個文字 box 不同**：Logo box **無** `font`、`symbolFont`、`color` 欄位（它不是文字）。Logo 的 source 路徑**不**放在 layout 物件內（Logo image 由 caller 傳入，見 D.2）。

#### D.6 Medium local 2× pass（責任描述）

```
drawMediumText(context, headline, protectionText):
    if headline === "" AND protectionText === "":  return          # 兩者皆空才完全跳過
    mediumCanvas = new offscreen canvas(531 * 2, 792 * 2)
    mediumContext = mediumCanvas.getContext("2d")
    if not mediumContext:  throw（明確錯誤，D－01 措辭）
    mediumContext.scale(2, 2)
    drawCenteredText(mediumContext, headline,       LAYOUT.headline)        # 同一組 1× 座標
    drawCenteredText(mediumContext, protectionText, LAYOUT.protectionText)  # 同一組 1× 座標
    context.save()
    context.imageSmoothingEnabled = true
    context.imageSmoothingQuality = "high"
    context.drawImage(mediumCanvas, 0,0,mediumCanvas.width,mediumCanvas.height, 0,0,531,792)
    context.restore()
```

要點：offscreen 為**全幅透明面**，合成時透明像素在 `source-over` 下不影響底層（因此先畫的 Logo 不會被抹除）。Bold 副標**不進**此 pass。**Logo 亦不得放進此 surface**（LOCKED 裁決 5）。

#### D.7 Validation

| 對象 | 檢查 | 失敗行為 |
|---|---|---|
| `canvas` | `instanceof HTMLCanvasElement` | throw `TypeError` |
| `images` | 為 object（否則視為空物件後續 assert 失敗），沿用 A－17 的 `images && typeof images === "object" ? images : {}` 防禦寫法 | 由下游 assert 失敗 |
| `backgroundImage` | `instanceof HTMLImageElement`；`complete` 成立；`naturalWidth`／`naturalHeight` 非 0；**且 `naturalWidth === 531 && naturalHeight === 792`** | throw（尺寸不符須明確指出必須為 531 × 792px） |
| `logoImage` | `instanceof HTMLImageElement`；`complete` 成立；`naturalWidth`／`naturalHeight` **非 0** | throw |
| 字型 | `assertFontsReady()` | throw |
| 2D context | `canvas.getContext("2d")` 非 null | throw |

🔒 **Logo assert 明確禁止事項（LOCKED 裁決 4）**：**不得**要求 `logoImage.naturalWidth === 351 && naturalHeight === 50`，也**不得**沿用 A－17 「素材尺寸須等於 destination box」的語意。正式 Logo 原始尺寸是 **784 × 112**，destination box 是 **351 × 50**、實際繪製尺寸是 **350 × 50** —— 三者是不同概念，混淆會導致 assert 永遠失敗。

本 Proposal 採**最小有效圖片 assert**（`instanceof` ＋ `complete` ＋ 非 0 尺寸），**不** assert 原始尺寸 784×112。理由：Requirement §3.1 只把 784×112 記錄為「實證尺寸」，§3.2 只要求「必須取自 `bn/assets/D/Logo.png`」，**未**要求鎖定原始像素尺寸；且 contain 演算法對任何 aspect 的來源圖都能正確運作，硬鎖 784×112 會在素材日後合法更新時造成不必要的 hard failure。

#### D.8 Canvas dimension 設定

renderer 內設定 `canvas.width = 531`、`canvas.height = 792`（與 A－01 line 271–272 相同位置與時機：在 validation 之後、取得 context 之前）。

#### D.9 Font wait

`FONT_CHECKS` 為凍結陣列，含四個 font string（30pt Medium、45pt Bold、37pt Bold、18pt Medium）。`FONT_TEST_TEXT` 沿用 A－01 既有值（含 `$` 與 `%`，確保符號字型也被檢查）。`waitFor…Fonts()` 供 caller `await`；`render…()` 內另同步呼叫 `assertFontsReady()` 作雙重保險。

#### D.10 Empty-string behavior

三處守衛完全比照 A－01：

1. `drawCenteredText`：`text === ""` → return（不繪製、不影響其他元素）。
2. Medium 2× pass：`headline === "" && protectionText === ""` → return（**兩者皆空才完全跳過** offscreen surface 建立）。
3. `drawMixedSubheadline`：`text === ""` → return。

**Logo 不受任何文字空值影響**：Logo 為固定素材，三段文字全為空時 Logo 仍必須正常繪製。

#### D.11 Context state

- 背景繪製前顯式設定 `globalAlpha = 1`、`globalCompositeOperation = "source-over"`（比照 A－01 line 276–277），**全程不再改動這兩者**。
- 文字相關的 `font`／`fillStyle`／`textAlign`／`textBaseline` 一律「每次使用前重設」，不依賴 `restore()`。
- **`save()`／`restore()` 恰有兩組**，彼此不嵌套、不重疊：
  1. **Logo 繪製**（新增）：`save()` → `imageSmoothingEnabled=true`／`imageSmoothingQuality="high"` → `drawImage(...)` → `restore()`。
  2. **Medium 2× 合成**（沿用 A－01）：`save()` → 同兩個 smoothing 設定 → 全幅 `drawImage` → `restore()`。

⚠️ 兩組必須各自獨立。Logo **不得**依賴 Medium 2× 區塊內的 smoothing state（LOCKED 裁決 5）—— context 的 `imageSmoothingQuality` 預設為 `"low"`，且退化為 `"low"` 不會產生任何錯誤訊息，屬靜默風險（見 N 節 R3）。

#### D.12 完整 draw order（LOCKED 裁決 3）

```
renderDdcardBn(canvas, images, values):
    1. validate canvas / images.backgroundImage / images.logoImage
    2. assertFontsReady()
    3. canvas.width = 531 ; canvas.height = 792
    4. context = canvas.getContext("2d")            # null → throw
    5. context.globalAlpha = 1
       context.globalCompositeOperation = "source-over"
    6. drawImage(backgroundImage, 0, 0, 531, 792)                    # ① background
    7. save() → smoothing high → drawImage(logoImage, 0,0,784,112,
                                           90.5, 103, 350, 50) → restore()   # ② Logo
    8. drawMediumText(context, String(headline), String(protectionText))      # ③ Medium 2×
    9. drawMixedSubheadline(context, String(subheadline), LAYOUT.subheadline) # ④ Bold 副標
```

四個 box 不重疊，故此順序與「Logo 畫在文字之後」在像素上等價；採此順序的理由是與既有慣例一致（固定素材先、動態文字後）。**不新增任何 blending／compositing**：`globalCompositeOperation` 維持 `"source-over"`、`globalAlpha` 維持 `1`、不引入 blend mode、不引入 clip、不引入 `putImageData`。

Logo PNG 的 alpha（實證為 PNG color type 6／RGBA）由普通 `drawImage` ＋ `source-over` **自然正確合成**，不需任何特殊處理（既有先例：`bn/js/lpbn-badges.js` 已是透明 PNG overlay 以普通 `drawImage` 疊圖的正式路徑）。

---

### E. Logo Geometry

#### E.1 精確幾何（有理數精算，非浮點近似）

source `784 × 112`（aspect 7.000）；destination box `{left:90, top:103, width:351, height:50}`（aspect 7.02）。

```
scale 候選： width-bound  = 351 / 784 = 0.447704081632653
             height-bound =  50 / 112 = 25/56 = 0.446428571428571
contain scale = min(...)  = 25/56 = 0.446428571428571     ← 受 HEIGHT 限制

destWidth  = 784 × 25/56 = 350        ← 整數（784 = 14 × 56）
destHeight = 112 × 25/56 =  50        ← 整數（112 =  2 × 56）
destX      = 90  + (351 − 350) / 2 = 90 + 0.5 = 90.5      ← 唯一的小數座標
destY      = 103 + ( 50 −  50) / 2 = 103                  ← 整數

實際佔用：x ∈ [90.5, 440.5]（box 90–441，左右各餘 0.5px）
          y ∈ [103, 153]  （box 103–153，垂直貼齊，餘 0）
```

**LOCKED 值（裁決 1）**：`destWidth = 350`、`destHeight = 50`、`destX = 90.5`、`destY = 103`。

**保留 fractional `90.5`，禁止 round 到 90 或 91。** 理由：Requirement 要求在 351×50 box 內精確水平＋垂直置中，而 Canvas 2D 規範支援 fractional destination coordinate（destination rectangle 經 current transform 映射後依 smoothing 設定重採樣，無 clamp、無隱式取整）。Logo 已是 0.446 倍降採樣、本來就必然重採樣，額外的 0.5px 位移只是讓取樣核心整體平移半格，不改變演算法路徑，與高品質 smoothing **相容**。

#### E.2 禁止事項

- **禁止 rounding**：不得對 `destX` 取 `Math.round`／`Math.floor`／`Math.ceil`／`| 0`。
- **禁止 stretch**：不得使用 `destWidth = 351`（會造成 0.29% 水平失真）；`destWidth`／`destHeight` 必須由**單一** contain scale 導出。
- **禁止 cover**：不得使用 width-bound 的 `351/784`（會使高度變成 50.14 而溢出 box）。
- **禁止 crop**：`drawImage` 的 source rectangle 必須是完整的 `0, 0, 784, 112`，不得裁切。

#### E.3 Logo smoothing 邊界（LOCKED 裁決 5）

```
context.save()
context.imageSmoothingEnabled = true
context.imageSmoothingQuality = "high"
context.drawImage(logoImage, 0, 0, 784, 112,        # source: 完整，不裁切
                             90.5, 103, 350, 50)     # destination: contain 結果
context.restore()
```

- 這組 `save()`／`restore()` **只包 Logo 繪製**，與 Medium 2× 的那組完全獨立、不嵌套。
- **不得**把 Logo 畫進 Medium 2× surface（即使那樣 `90.5 × 2 = 181` 會落在整數 device pixel 上）：Requirement §8 明定 2× 路徑「只涵蓋 Medium family 的兩段文字」，且另建 Logo 專屬 2× surface 屬新增機制，兩者皆被 LOCKED 裁決 5 排除。
- source rectangle 的 `784, 112` 建議直接由 `logoImage.naturalWidth`／`naturalHeight` 取得（而非硬寫），與 D.7「不 assert 原始尺寸」的決定一致，並使 contain 計算對素材尺寸變更保持正確。

---

### F. Viewer Integration Plan

修改對象：`bn/launch/viewer.html`（唯一修改檔）。以下為最小改動規劃。

#### F.1 新增 branch-local 變數（宣告區，現行 line 211–220 附近）

現行宣告區有 `viewerTitle`／`viewerLabel`／`width`／`height`／`backgroundSource`／`overlaySource`／`renderTemplate`／`waitForFonts`／`fieldConfig = null`／`thresholdTable = null`。

**新增兩個，且都預設為 `null`**：

```
let logoSource = null;   // 只有 D－01 分支會賦值
let logoImage  = null;   // 只有 D－01 分支會被填入
```

`fieldConfig = null` 與 `thresholdTable = null` 已是「預設 null、僅特定分支賦值」的既有模式，本設計與之同構，**不引入新機制**。

#### F.2 新增 D－01 分支（接在現行 A－17 分支之後、`else` 之前）

條件：`parameters.get("type") === "D" && parameters.get("bn") === "01_DDcard BN"`

分支內設定：

| 變數 | 值 |
|---|---|
| 動態 import | `await import("../templates/D/01-ddcard-bn.js")` |
| `viewerTitle` | `樣式 D－01_DDcard BN` |
| `viewerLabel` | `D－01` |
| `width` / `height` | `531` / `792` |
| `backgroundSource` | `../assets/D/底圖/01_DDcard BN.jpg` |
| `overlaySource` | `../assets/D/對位/01_DDcard BN.png` |
| `logoSource` | `../assets/D/Logo.png` ← **只有此分支設定** |
| `renderTemplate` | `template.renderDdcardBn` |
| `waitForFonts` | `template.waitForDdcardBnFonts` |
| `fieldConfig` | 三筆 D－01 專用測試資料（見 G 節） |

分支形狀完全比照既有 A 分支（相同的變數指派風格、相同的相對路徑寫法）。**不新增 type 表格、不新增 mapping 物件、不把 if/else 鏈重構成 lookup。**

#### F.3 unsupported 錯誤訊息最小更新（現行 line 461–465）

現行 `else` 分支 throw 的訊息列舉「樣式 A／01_DDcard BN、…、17_門檻表」。**只需在該列舉中補上 D－01**，使訊息與實際支援範圍一致。不改訊息結構、不改 throw 行為。

#### F.4 素材載入（現行 line 961–991 的 try 區塊內）

**設計原則：既有的 `Promise.all` 完全不動。**

```
try {
    backgroundUrl = new URL(backgroundSource, import.meta.url)
    [backgroundImage] = await Promise.all([          # ← 三個元素，原封不動
        loadImage(backgroundUrl.href, `${viewerLabel} 正式底圖`),
        waitForFonts(),
        overlay.decode().then(() => { …尺寸檢查… }),
    ])

    if (logoSource) {                                 # ← 新增：A 分支恆為 false
        logoImage = await loadImage(
            new URL(logoSource, import.meta.url).href,
            `${viewerLabel} 正式 Logo`)
    }

    render()
    fields.forEach(bindField + enable)
    overlayToggle.disabled = false
} catch (error) {
    loadError…                                        # ← 既有處理，不動
    throw error
}
```

**A 分支不受影響的證明**：`logoSource` 初始化為 `null`，且 17 個 A 分支中**沒有任何一個**對它賦值 → `if (logoSource)` 對 A 恆為 `false` → 新增區塊不執行 → A 的 `Promise.all` 元素個數、順序、destructuring 索引、`await` 時序、錯誤處理全部與現況完全相同。

**為何採「Promise.all 之後獨立 await」而非塞進 Promise.all**：前者讓 A 路徑執行的程式碼**完全不變**（只多一個為 false 的 `if`），是最容易在 review 中證明零影響的形狀。代價是 D 的 Logo 載入與底圖載入不併發 —— 對本機 localhost 的 48,618 bytes 單張圖、且對象是人工校稿工具而言，此代價可忽略。

Logo 載入失敗時，reject 的 `Error("… 正式 Logo載入失敗。")` 由**既有** try/catch 捕捉 → 寫入既有 `#load-error` → re-throw。**不新增錯誤處理路徑。**

#### F.5 render invocation（現行 line 579–581）

現行：

```
function render() {
    renderTemplate(canvas, backgroundImage, state);
}
```

**最小條件化**：

```
function render() {
    renderTemplate(
        canvas,
        logoSource ? { backgroundImage, logoImage } : backgroundImage,
        state);
}
```

**A 分支第二參數與現在完全相同之證明**：

1. `logoSource` 宣告時初始化為 `null`。
2. 17 個 A 分支（line 222–460）**均未**對 `logoSource` 賦值 —— 這一點在 Phase 4 review 時可用 `grep -c "logoSource" ` 在 A 分支區間內確認為 0 來機械驗證。
3. 因此對任一 A 分支，`logoSource` 為 falsy → 三元運算取 else 分支 → 第二參數**恆為 `backgroundImage` 本身**（同一個物件參考，非包裝、非複製）。
4. 故 A－01～16 收到的 `(canvas, backgroundImage, state)` 與修改前逐一相同。
5. A－17 **完全不經過**此 `render()`（它走 `initThresholdTableViewer()` 內 line 894 的獨立呼叫），因此不受任何影響。

`state` 參數不變（仍為 `Object.fromEntries(fields.map(...))` 產生的 `{headline, subheadline, protectionText}`）。

#### F.6 沿用而不修改的既有機制

| 機制 | 現行位置 | D－01 用法 |
|---|---|---|
| canvas／overlay 尺寸設定 | line 486–500 | 由 `width`／`height` = 531／792 驅動，沿用 |
| overlay `src` 指派 | line 495 | 由 `overlaySource` 驅動，沿用 |
| overlay decode ＋ 尺寸檢查 | line 969–978 | D 對位圖實證 531×792，可通過，沿用 |
| `overlayToggle` 顯示切換 | line 624–626 | 沿用 |
| `loadImage` helper | line 566–577 | **直接重用來載 Logo**，不新增 helper |
| `countTextUnits` | line 558–564 | 沿用（半形 0.5／全形 1） |
| `bindField`（IME-safe ＋ 上限回復） | line 583–622 | 沿用，limit 由 `fieldConfig` 提供 |
| `fieldConfig` 機制 | line 528–539 | **直接重用**（13／14／15／16 已在用），提供 D－01 測試字串 |
| `document.title`／heading／aria-label | line 474–481 | 由 `viewerTitle`／`viewerLabel` 驅動，沿用 |
| `renderTemplate`／`waitForFonts` 型別檢查 | line 467–472 | 沿用 |
| `#load-error` 錯誤呈現 | line 987–991 | 沿用 |

#### F.7 明確不做

不重構 viewer；不新增第二個 viewer 頁；不建立通用 type framework／type registry／branch 表格化；不改任何 A 分支；不改共用預設測試字串（line 155／160／165）；不改任何既有 helper 行為；不改 CSS；不新增 DOM 元素；不為 D－02～17 預留分支或參數。

---

### G. Viewer Test Data

D－01 分支透過既有 `fieldConfig` 機制提供三筆專用測試字串（LOCKED 裁決 6）。**不修改** line 155／160／165 的共用預設值，因此 A－01～12 的校稿預設完全不受影響。

計數規則（既有 `countTextUnits`）：ASCII（code point ≤ 0x7F）= **0.5**，其餘 = **1**。

#### G.1 建議測試字串（primary set）

| 欄位 | 建議字串 | units | 上限 | 狀態 |
|---|---|---|---|---|
| headline | `宅配免運無限加碼` | **8.0** | 8 | **恰在上限** |
| subheadline | `宅配滿$490再9%` | **7.0** | 7 | **恰在上限** |
| protectionText | `免運優惠須依店家適用之物流方案為主` | **17.0** | 17 | **恰在上限** |

`fieldConfig` 三筆的 `label` 沿用既有中文標籤「主標」／「副標」／「保護文字」，`limit` 分別為 `8`／`7`／`17`（與正式 Editor 規則一致）。

#### G.2 units 精確計算

**headline** `宅配免運無限加碼`：8 個全形字 × 1.0 = **8.0** ≤ 8 ✅

**subheadline** `宅配滿$490再9%`（10 個 code point）：

| 字 | 宅 | 配 | 滿 | `$` | `4` | `9` | `0` | 再 | `9` | `%` | 合計 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| units | 1.0 | 1.0 | 1.0 | 0.5 | 0.5 | 0.5 | 0.5 | 1.0 | 0.5 | 0.5 | **7.0** |

**7.0 ≤ 7 ✅（恰在上限）**

**protectionText** `免運優惠須依店家適用之物流方案為主`：17 個全形字 × 1.0 = **17.0** ≤ 17 ✅

#### G.3 為何此副標能覆蓋兩條 formatting 路徑

`tokenizeSubheadline("宅配滿$490再9%")` 的 run 序列為：

```
index 0 : ordinary  "宅配滿"
index 1 : symbol    "$"
index 2 : ordinary  "490再9"
index 3 : symbol    "%"
```

- **`$` 路徑（→ next ordinary run）**：`adjacentOrdinaryRun(runs, 1, preferNext=true)` → preferred = `runs[2]`，為 ordinary ✅ → `boundaryGlyphInkBottom(runs[2], fromStart=true)` → 取 `"490再9"` 從頭第一個有墨字 **`4`** 的 ink bottom 對齊。**走 preferred 命中路徑，不觸發 fallback。**
- **`%` 路徑（→ previous ordinary run）**：`adjacentOrdinaryRun(runs, 3, preferNext=false)` → preferred = `runs[2]`，為 ordinary ✅ → `boundaryGlyphInkBottom(runs[2], fromStart=false)` → 取 `"490再9"` 從尾第一個有墨字 **`9`** 的 ink bottom 對齊。**走 preferred 命中路徑，方向與 `$` 相反。**

兩個符號對齊到**同一個 ordinary run 的相反兩端**，因此同時覆蓋 `boundaryGlyphInkBottom` 的 `fromStart=true` 與 `fromStart=false` 兩條分支，正是 LOCKED 裁決 6 要求的兩條路徑。

**目視判斷方式**：`$` 的墨水底部應與其右側 `4` 的底部齊平；`%` 的墨水底部應與其左側 `9` 的底部齊平。兩個符號為 37pt、周圍字為 45pt，若 formatting 失效會呈現為符號「浮高」或「下墜」，肉眼可辨。

#### G.4 為何三個字串都取在上限

三段文字皆在字數上限 ⇒ ink 寬度最大 ⇒ 最能暴露置中計算的偏差，同時順帶確認上限情境下不溢出 box。此為驗證目的的選擇。

**這只是 viewer 校稿工具的測試資料，不是產品預設內容**，不影響正式 Editor／Import／Export 的任何預設值或字數規則。

#### G.5 備選字串（若 Jamie 偏好較短內容）

`滿$490折9%起` = 6.0 units（run 序列 `["滿"][$]["490折9"][%]["起"]`，兩條路徑同樣命中 preferred）。僅列為備選，primary set 仍為 G.1。

---

### H. Launcher Plan

新增 `bn/launch/D/01_DDcard BN.command`，以 `bn/launch/A/01_DDcard BN.command` 為基準。

#### H.1 只需調整之處（Phase 2 實證：A-specific 僅 7 行）

| 現行（A－01） | D 版 |
|---|---|
| `readonly FSS_A01_URL="${FSS_VIEWER_URL}?type=A&bn=01_DDcard%20BN"` | query 改為 **`?type=D&bn=01_DDcard%20BN`**；變數名改為 D 對應識別名（例如 `FSS_D01_URL`） |
| `open_a01_viewer() { … }` | 函式名改為 D 對應識別名（例如 `open_d01_viewer`） |
| 其餘 5 處引用（`FSS_A01_URL` / `open_a01_viewer`，在原檔 line 39／41／49／94／100） | 隨上述識別名連動 |

識別名稱的更動屬命名一致性，非功能必需；query 的 `type=D` 是**唯一功能必需**的改動。

#### H.2 原樣沿用、不得改動

- **repo root 推導**：`FSS_LAUNCH_DIR="${0:A:h}"` ＋ `FSS_ROOT="${FSS_LAUNCH_DIR:h:h:h}"`。`bn/launch/D/` 與 `bn/launch/A/` 深度相同（`D`→`launch`→`bn`→`FSS`），`:h:h:h` 仍正確得到 repo root。**無須調整。**
- **viewer path**：`FSS_VIEWER_PATH="/bn/launch/viewer.html"`（server root 絕對路徑，與樣式無關）。
- **host／port**：`FSS_HOST="127.0.0.1"`、`FSS_PORT="4173"`。
- **readiness marker**：`FSS_VIEWER_MARKER='data-fss-bn-viewer="true"'` ＋ `viewer_is_ready()` 的 curl（`--silent --fail --max-time 1`）＋ `grep --fixed-strings --quiet`。
- **server reuse**：已就緒則直接 `open` 並 exit 的既有邏輯。
- **port 占用處理**、**50 次 × 0.1s 就緒輪詢**、**python3 可執行檢查**、**`cd` 失敗處理**。
- **trap**：`trap stop_fss_server EXIT INT TERM HUP` ＋ `stop_fss_server()` 的 `kill -0` 檢查與 `wait`。
- **`open` 行為**與失敗時的 fallback 提示。
- **絕對路徑釘死的工具**：`/usr/bin/python3`、`/usr/bin/curl`、`/usr/bin/grep`、`/usr/bin/open`。
- **`set -u`**、`pause_before_exit()`、所有 echo 文案（實證不含任何「樣式 A」字面，唯一會顯示樣式的是內插的 URL，隨 query 自動正確）。

#### H.3 明確不做

**不順手重構 shell**：不改 quoting 風格、不加參數解析、不加樣式選單、不加 log／verbose、不改 port 為可設定、不合併 A／D 啟動檔、不建立共用 shell library。

#### H.4 已知既有行為（記錄，不修改）

port 4173 固定且「已就緒則重用」：若先開 A－01 校稿再開 D－01 啟動檔，第二個腳本會偵測 server 已在跑 → 直接 `open` D 的 URL 並立即 exit，server 仍由第一個腳本持有。這是 A 的 17 個啟動檔之間本來就有的既有設計，**不因 D 而改動**。

---

### I. Asset Scope

#### I.1 Phase 4 只納管 3 個素材

- `bn/assets/D/Logo.png`
- `bn/assets/D/底圖/01_DDcard BN.jpg`
- `bn/assets/D/對位/01_DDcard BN.png`

#### I.2 其餘 30 個 D 素材必須維持 untracked

`bn/assets/D/底圖/02～16`（15 個）與 `bn/assets/D/對位/02～16`（15 個）。

#### I.3 操作約束

- **必須逐一指定完整路徑**納管。
- **禁止** `git add bn/assets/D/`、`git add -A`、`git add .`、`git add bn/assets`。
- Phase 2 實證：`.gitignore` 僅有 `.DS_Store` 一行，`git check-ignore` 對 D 素材無命中 → 30 個非 D－01 素材**不會**被 ignore 規則自動擋住，必須靠精確路徑指定來避免誤納管。這是 Phase 4 的具體風險點（見 N 節 R7）。
- **禁止移動、改名、壓縮、轉檔、重存**任何素材（含 D－01 的三個）。素材維持既有 bytes。

#### I.4 D－17 素材

Phase 2 實證：`bn/assets/D/底圖/` 與 `bn/assets/D/對位/` **均只有 01～16，不存在任何 `17_*` 檔案**（對照 `bn/assets/A/底圖/` 有 `17_VIP.png` 與 `17_主標題.png`）。**僅記錄事實，不推定原因、不納入本輪範圍。**

---

### J. Explicit Zero-Modification List

Phase 4 期間下列全部**必須 `git diff` 為空**：

**正式平台 JS（LOCKED 裁決 8）**
`bn/js/render-a.js`（`A_TABLE`／`ASSET_BASE_BY_TYPE`／`getImage`／`loadImage`／`imageCache`／`renderBnToCanvas` 全部不動）、`bn/js/import.js`（`SUPPORTED_TYPES` 維持 `["A","B"]`）、`bn/js/workspace.js`、`bn/js/export.js`、`bn/js/app.js`、`bn/js/editor.js`。

**其他 JS**
`bn/js/banwords.js`、`bn/js/banwords-data.js`、`bn/js/lpbn-badges.js`、`bn/js/vendor/*`（含 xlsx／jszip／pako／upng 與 LICENSE 檔）。

**A／B 封箱（LOCKED 裁決 9）**
`bn/templates/A/*.js`（17 檔）、`bn/launch/A/*.command`（17 檔）、`bn/assets/A/*`、`bn/assets/B/*`。

**UI／樣式**
`bn/index.html`、`bn/css/styles.css`。

**其他素材與資料**
`bn/assets/LPBN掛標/*`、`bn/assets/banwords.xlsx`、正式工單 Excel、`fonts/*`。

**文件**
`bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md` 的「D－01 Requirement」章節（**Requirement 不得修改**）、`bn/docs/FSS_BN_Architecture.md`、`bn/docs/FSS_BN_Requirement_Specification_v1.0.md`、`bn/docs/FSS_BN_Template_Requirement_Specification_v1.0.md`、`bn/docs/FSS_BN_A樣式平台整合_Requirement_Specification_v1.0.md`、`bn/docs/FSS_BN_B樣式平台整合_Requirement_Specification_v1.0.md`、`bn/docs/FSS_BN_A12_LPBN掛標_Requirement_Specification_v1.0.md`、`bn/docs/FSS_BN_17版位_Type差異_Phase0整理.md`、`bn/docs/FSS_BN_正式版位建立_SOP.md`。

**Repo root**
`index.html`、`js/app.js`、`css/styles.css`、`tools.json`、`啟動 FSS.command`、`assets/A.jpg`～`assets/D.jpg`、`docs/*`、`overlay-image/*`、`.gitignore`。

**D 素材**
`bn/assets/D/` 其餘 30 個素材維持 untracked。

---

### K. Error／Fail-Closed Plan

原則沿用既有「明確失敗、不靜默降級」。

#### K.1 D template 內的明確 throw

| 情境 | 行為 |
|---|---|
| `canvas` 非 `HTMLCanvasElement` | throw `TypeError`（D－01 措辭） |
| `images.backgroundImage` 非有效已載入 `HTMLImageElement` | throw |
| 底圖尺寸 ≠ 531 × 792 | throw，訊息明確指出必須為 531 × 792px。**不縮放、不裁切、不 fallback** |
| `images.logoImage` 非有效已載入 `HTMLImageElement`（`complete` 不成立或 `naturalWidth`／`naturalHeight` 為 0） | throw。**Logo 是必要組成，不得以空白／預設圖／略過 Logo 的方式繼續產出**（Requirement §14.2） |
| 字型未就緒（`assertFontsReady()` 失敗） | throw。**不得以 fallback 字型繪製** |
| `canvas.getContext("2d")` 為 null | throw |
| Medium 2× offscreen 的 `getContext("2d")` 為 null | throw |

所有錯誤訊息使用 D－01 專屬措辭（不沿用「A－01」字樣），以便校稿時能一眼分辨來源。

#### K.2 viewer 的失敗處理（全部沿用既有路徑）

- **底圖載入失敗** → 既有 `loadImage` reject → 既有 try/catch → `#load-error` 顯示 → re-throw。
- **Logo 載入失敗** → 同上，**共用既有 try/catch 與 `#load-error`，不新增錯誤處理路徑**。
- **對位圖 decode 失敗或尺寸不符** → 既有 `overlay.decode().then(尺寸檢查)` throw → 同一 catch。
- **字型 wait 失敗** → 既有 `Promise.all` 內的 `waitForFonts()` reject → 同一 catch。
- **template module 不完整**（`renderTemplate`／`waitForFonts` 非 function）→ 既有 line 467–472 的 throw。
- **未支援的 type／bn 組合** → 既有 `else` 分支 throw（訊息已於 F.3 補上 D－01）。

失敗時的既有語意是：`#load-error` 顯示訊息、輸入框**保持 disabled**、overlay toggle 保持 disabled、錯誤 re-throw 至 console。**不新增自動重試、不新增部分降級顯示。**

#### K.3 正式平台維持 fail-closed（LOCKED 裁決 8）

本輪不改任何正式 js，因此樣式 D 在正式平台的既有 fail-closed 行為完全不變：

- `bn/index.html` 的樣式 D 卡片仍可點擊並進入控制台（既有行為）。
- Preview 在 `render-a.js` 明確 throw「不支援的樣式：D。正式底圖只支援樣式 A 與 B。」，**不 fallback 到 A 或 B 底圖**。
- 工單 Excel 匯入在 worksheet lookup **之前**即被 `SUPPORTED_TYPES` reject。
- `type: "D"` 的暫存 JSON 一律 reject。
- Export 因 render 階段即失敗而不產出任何成品。

**禁止**為了讓 D－01 可被正式 Preview／Export 而修改上述任何一處。

---

### L. Verification Plan

Phase 4 Coding 完成後、Phase 5 執行。可用既有工具：`node v22.22.0`、`python3 3.10.12`、`git`、`python3 -m http.server`（啟動檔內建）、瀏覽器 devtools。Repo **無** `package.json`／lint／test harness（Phase 2 實證），故無自動化框架，以 launch harness ＋ devtools ＋ git 為主。

#### L.1 本階段可驗證項目

| # | 項目 | 方法 |
|---|---|---|
| V1 | Syntax／module check | 由 launch harness 在瀏覽器載入 D－01，確認 module 成功 import、console 無錯誤；或以 node 對 ESM 副本做 `--check`（**不得在唯讀輪執行會產檔的步驟**） |
| V2 | Asset dimensions | `python3` 讀 header（唯讀）：底圖 531×792 JPEG、對位 531×792 PNG、Logo 784×112 PNG |
| V3 | Canvas 531×792 | devtools 讀 `canvas.width`／`canvas.height`（backing dimensions，非 style） |
| V4 | **Logo 350×50 at x=90.5／y=103** | devtools 讀 canvas pixel data 定位 Logo 實際 bounding box；確認左緣落在 x≈90.5、上緣 y=103、下緣 y=153（貼齊 box 下緣）、寬 350、高 50 |
| V5 | contain／aspect 正確 | 確認繪製寬高比 = 350/50 = 7.000（＝ source 784/112），未拉伸；確認 source 未裁切（Logo 內容完整） |
| V6 | high smoothing 生效 | code review 確認 Logo 繪製處**顯式**設定 `imageSmoothingQuality="high"` 且包在自身 `save()`／`restore()` 內；視覺確認 Logo 邊緣無明顯鋸齒 |
| V7 | Draw order | code review 確認順序為 background → Logo → Medium 2× → Bold 副標；確認 `globalCompositeOperation` 全程為 `"source-over"`、`globalAlpha` 為 `1`、無 blend mode／clip |
| V8 | 三文字 box geometry | overlay 對位目視 ＋ devtools pixel 取樣：`{90,170,351,37}`／`{43,221,445,57}`／`{43,296,445,22}` 內水平＋垂直置中 |
| V9 | Medium local 2× | code review 確認 offscreen 為 1062×1584、`scale(2,2)`、同一組 1× 座標、high smoothing 降採樣；確認 Bold 副標未進 2× surface、Logo 未進 2× surface；視覺比對 headline／protectionText 邊緣銳利度與 A－01 同級 |
| V10 | `$`／`%` formatting | 以 G.1 副標 `宅配滿$490再9%` 驗證：符號為 37pt；`$` 墨水底部與右側 `4` 齊平（next 路徑）；`%` 墨水底部與左側 `9` 齊平（prev 路徑） |
| V11 | Font readiness | 確認 `FONT_CHECKS` 涵蓋四個 font string；於字型未就緒時觸發 render 應明確 throw 且不以 fallback 字型繪製 |
| V12 | **overlay toggle 後 Logo／文字仍留在 canvas** | 反覆勾選／取消「顯示對位圖」：只有 overlay 消失，**Logo 與三段文字必須全部留存**。若取消勾選後 Logo 消失 ⇒ Logo 被誤實作為 DOM overlay ⇒ **FAIL** |
| V13 | Logo 為固定 asset | 在三個輸入框改字，Logo 位置與尺寸必須完全不動 |
| V14 | 對位 overlay 未進入輸出 | 以 devtools 取 canvas 內容（右鍵另存或 `toDataURL`）確認結果**不含** overlay 框線 |
| V15 | A／B zero regression | `git diff --name-only HEAD` 確認 J 節清單全未列出；並以 `bn/launch/A/01_DDcard BN.command` 抽驗 A－01 校稿畫面正常、以正式控制台抽驗 B－01 Preview 正常 |
| V16 | viewer A 分支未受污染 | 在 A 分支區間內確認 `logoSource` 出現次數為 0（機械驗證 F.5 的證明）；抽驗至少一個 `fieldConfig` 分支（如 A－13）與一個預設分支（如 A－02）行為正常；確認 A－17 走 `initThresholdTableViewer()` 未受影響 |
| V17 | Git scope | `git status --short -uall` 確認新增恰為 2 新檔 ＋ 1 修改檔 ＋ 3 納管素材 |
| V18 | 其餘 D assets 仍 untracked | 確認 30 個 D－02～16 素材在 `git status` 中仍為 `??`、未被 stage |
| V19 | Workspace／JSON 未加 Logo | `git diff` 確認 `workspace.js`／`export.js`／`editor.js` 未動；`WORKSPACE_VERSION` 仍為 1 |
| V20 | `SUPPORTED_TYPES` 仍 A／B | `git diff bn/js/import.js` 為空；確認樣式 D 在正式平台仍 fail-closed（Preview 明確報錯、Excel 匯入被 reject） |
| V21 | 無 generic abstraction | 確認未新增共用 helper／framework／plugin／type registry；未出現 D－02～17 相關檔案或分支 |

#### L.2 明確 Deferred until D platform integration（LOCKED 裁決 7）

| 項目 | 為何 deferred |
|---|---|
| **正式 D Preview ↔ Export 像素一致性實測** | 需 `render-a.js` 的 `ASSET_BASE_BY_TYPE` 含 D 才能執行正式 Preview／Export；本輪 LOCKED 為零修改 |
| **D Excel worksheet `D`（`B15`／`B16`／`B17`）實際匯入與 Restore** | 需 `SUPPORTED_TYPES` 含 D；本輪 LOCKED 維持 A／B |
| **D－01 JPG／72 dpi／≤245,000 bytes 實測** | 需走正式 Export；同上 |
| **樣式 D「下載完整專案」完整 17 版位行為** | 需 D－02～17 全部完成；本輪只做 D－01 |

**禁止為了驗證這些項目而提前 enable Type D。** 結構上，`EXPORT_ITEMS` 以版位 id 為 key、與 type 無關，故 01 的格式／dpi／容量規則必然適用於 D－01；但實際 bytes 只能在平台整合後實測。

#### L.3 A／B byte-identical 的驗證方式

Requirement §2.3 要求 A／B 輸出維持 byte-identical，但 Repo 無自動化 byte 比對工具（Phase 2 實證）。採用的論證是：**J 節清單全部 `git diff` 為空 ⇒ A／B 的 renderer、素材、registry、Export 路徑均未改變 ⇒ 輸出不可能改變**，並輔以 V15／V16 的人工抽驗。此為既有專案條件，非 D－01 引入。

---

### M. Acceptance Mapping（Requirement AC1～AC18）

| AC | Requirement 要求 | Proposal 實作處 | 驗證 | 階段 |
|---|---|---|---|---|
| AC1 | canvas 531×792 | D.8（renderer 內設定） | V3 | 本階段 |
| AC2 | 底圖正確、1:1 未縮放未裁切 | D.12 step 6（`drawImage(bg,0,0,531,792)`）＋ D.7 尺寸 assert；F.2 `backgroundSource` | V2、V3、V8 | 本階段 |
| AC3 | Logo 固定取自 `bn/assets/D/Logo.png`，非 Excel／非上傳／非 Editor | F.2 `logoSource`（唯一來源）；D.2 images object；J 節確認 `editor.js`／`import.js`／`workspace.js` 零修改 | V2、V13、V19、V20 | 本階段 |
| AC4 | Logo 等比例 contain、未變形、未 crop | E.1 單一 scale `25/56`；E.2 禁止 stretch／cover／crop；E.3 source rect 完整 | V4、V5 | 本階段 |
| AC5 | Logo 完整落在 `{90,103,351,50}` 並水平＋垂直置中 | E.1 `dest 350×50 @ (90.5, 103)`（**精確值**，非「約」） | V4 | 本階段 |
| AC6 | 三文字 box 座標 | D.4（三個 `top` 換為 170／221／296，其餘不變） | V8 | 本階段 |
| AC7 | ink-bbox 置中，未改用 center／middle | D.3（`measureRun`／`drawCenteredText`／`drawMixedSubheadline` 等價保留） | V8、code review | 本階段 |
| AC8 | 三文字視覺樣式同 A／B－01 | B.3 ＋ D.4（font／color 常數完全不變） | V8、V9、code review | 本階段 |
| AC9 | `$`／`%` formatting 未變（37pt ＋ ink-bottom 對齊） | D.3（`tokenizeSubheadline`／`adjacentOrdinaryRun`／`boundaryGlyphInkBottom`／`drawMixedSubheadline` 等價保留）；G.3 測試資料覆蓋兩條路徑 | V10 | 本階段 |
| AC10 | Medium template-local 2×，未建共用 helper | D.6；C.1 禁止建共用 helper | V9、V21 | 本階段 |
| AC11 | Preview／Export 同一 renderer path；Logo 未用 DOM overlay | **部分本階段**：Logo 畫進 canvas 由 D.12 保證，可由 V12／V14 驗證。**部分 deferred**：正式 Preview↔Export 一致性實測需 enable Type D | V12、V14（本階段）；像素一致性 deferred | **混合** |
| AC12 | 對位 overlay 可供人工驗證，且未進入 Export | F.2 `overlaySource`；F.6 沿用既有 overlay 機制與 decode 尺寸檢查 | V12、V14 | 本階段 |
| AC13 | A／B renderer 與輸出不變 | J 節零修改清單 | V15、V16、L.3 論證 | 本階段 |
| AC14 | D－02～17 無新增實作 | A.3、C 節（只有 3 檔 ＋ 3 素材）、I.2 | V17、V18、V21 | 本階段 |
| AC15 | `SUPPORTED_TYPES` 仍 A／B | J 節（`import.js` 零修改） | V20 | 本階段 |
| AC16 | Workspace／JSON 未加 Logo | D.2（Logo 只在 images object，不進 values）；J 節（`workspace.js`／`export.js`／`editor.js` 零修改） | V19 | 本階段 |
| AC17 | 01 Export JPG／72dpi／≤245,000 bytes | 由既有 `export.js` `EXPORT_ITEMS`（以版位 id 為 key）零修改提供 | **DEFERRED** —— 需 enable Type D 才能執行 D 的 Export；LOCKED 裁決 7／8 禁止 | **Deferred** |
| AC18 | 未建 generic framework／plugin／通用置中 helper | A.3、C.1、C.3 禁止清單 | V21 | 本階段 |

**Deferred AC 的明確理由**：AC17 完全 deferred、AC11 的「Preview↔Export 像素一致性實測」部分 deferred，兩者都因為**執行前提是 enable Type D**，而 LOCKED 裁決 7／8 明確禁止本階段 enable。**本 Proposal 不假裝這兩項可在本階段驗證。** 其結構性保證（單一 `renderBnToCanvas` 入口、`EXPORT_ITEMS` 以版位 id 為 key）已由 Phase 2 實證，但實測必須留待平台整合。

---

### N. Risks／Guardrails

| # | 風險 | 後果 | 防護 |
|---|---|---|---|
| **R1** | 誤把 Logo 實作成 DOM overlay／CSS background／第二個 `<img>` | Logo 只出現在 Preview／校稿畫面，Export 缺 Logo；違反 Requirement §10.2 | D.12 明定 Logo 由 `drawImage` 畫進 canvas；F.7 明定不新增 DOM 元素；**V12 為決定性檢查**（取消 overlay 勾選後 Logo 必須留存，否則 FAIL） |
| **R2** | 誤將 `destX = 90.5` round 到 90 或 91 | 違反 LOCKED 裁決 1，Logo 偏移 0.5px、不再精確置中 | E.1 明定 LOCKED 值；E.2 明列禁止 `Math.round`／`floor`／`ceil`／`\| 0`；V4 以 pixel 量測確認左緣落在 x≈90.5 |
| **R3** | 漏掉 `imageSmoothingQuality="high"` | context 預設為 `"low"`，Logo 降採樣品質下降；**且不會產生任何錯誤訊息**（靜默退化，最易漏） | E.3／D.11 明定 Logo 自成一組 `save()`／`restore()` 並顯式設定；**V6 為專項 code review 檢查**；不得依賴 Medium 2× 區塊的 state |
| **R4** | 誤把 Logo 放進 Medium 2× surface | 違反 LOCKED 裁決 5 與 Requirement §8「2× 只涵蓋 Medium 兩段文字」；draw order 與 alpha 合成語意改變 | E.3 明文禁止（含「即使 90.5×2=181 會對齊整數 device pixel 也不採用」）；D.6 明定 2× pass 只畫 headline ＋ protectionText；V9 專項確認 |
| **R5** | 誤改 A template（例如「順手」把共用 helper 抽出、或在 A 檔內加 D 分支） | 破壞 B 封箱基準（`templates/A/*.js` 被 B Requirement 列為零修改）；A／B 輸出可能改變 | C.1 明定 D template 不 import 任何其他 template；J 節列入零修改清單；V15 以 `git diff` 機械驗證 |
| **R6** | 誤提前 enable Type D（改 `ASSET_BASE_BY_TYPE`／`SUPPORTED_TYPES`／`A_TABLE`），理由是「反正未來要改」 | 半成品樣式對外呈現為已支援：01 可預覽但 02～17 全錯、完整專案輸出中途失敗、JSON 帶 `type:"D"` 流出 | LOCKED 裁決 8；J 節列入零修改；**Phase 2 已證 launch 路徑完全不需 `render-a.js`**（viewer 對正式 js 的引用數為 0）；V20 驗證 |
| **R7** | 誤納管全部 D assets（`git add bn/assets/D/` 或 `git add -A`） | 30 個 D－02～16 素材被提前納管，違反 Requirement §3.2 與 AC14；`.gitignore` 僅有 `.DS_Store`，不會自動擋 | I.3 明列禁止指令、要求逐一指定路徑；V18 驗證 30 個素材仍為 `??` |
| **R8** | viewer 共用 `render()` 的條件化污染 A 分支（例如把第二參數對 A 也改成物件） | A－01～16 收到的參數形狀改變，A 校稿全數失效；甚至可能引發 A template 的 `instanceof HTMLImageElement` assert 失敗 | F.5 採 `logoSource ? {…} : backgroundImage` 三元式，並提供**五步證明**（`logoSource` 初始為 `null`、A 分支均未賦值、故第二參數恆為同一個 `backgroundImage` 物件參考）；**V16 以「A 分支區間內 `logoSource` 出現次數為 0」機械驗證**；A－17 走獨立呼叫不受影響 |
| **R9** | Logo assert 誤寫成「原始尺寸須等於 box」（照抄 A－17 的 `assertImage`） | assert 永遠失敗（784×112 ≠ 351×50），D－01 完全無法 render | D.7 明文禁止；LOCKED 裁決 4；採最小有效圖片 assert |
| **R10** | 誤改 viewer 共用預設測試字串（line 155／160／165）來加入 `%` | A－01～12 的校稿預設被改動，違反 LOCKED 裁決 6 | G 節明定使用既有 `fieldConfig` 機制提供 D－01 專屬字串；F.7 明列不改共用預設；V16 抽驗 A 分支 |
| **R11** | 順手重構 viewer 或 launcher（改成 lookup table、抽 shell library） | 擴大 diff 面、風險擴散到 A 的 17 個分支與 17 個啟動檔 | C.3／F.7／H.3 明文禁止；只允許新增一個 `else if` 與一個 `if (logoSource)` |
| **R12** | 為 D－02～17 預留參數／欄位／抽象（例如 images object 設計成通用 asset map） | 違反 LOCKED 裁決 2／10；引入未經需求驗證的架構 | D.2 明定 images object 只含 `backgroundImage` ＋ `logoImage`；A.3／C.1 禁止 generic API；V21 驗證 |
| **R13** | 把 deferred 項目當成本階段已驗證（例如宣稱 AC17 通過） | 驗收失真，平台整合時才發現問題 | M 節逐條標註階段；L.2 明列 deferred 清單與原因 |
| **R14** | D template 錯誤訊息沿用「A－01」字樣（複製 A 檔時未改） | 校稿時無法分辨錯誤來源，誤判為 A 的問題 | K.1 明定使用 D－01 專屬措辭 |

---

### O. Phase 4 Exact Coding Boundary

Phase 4 **唯一允許**的變更如下。任何超出此清單的變更即為越界。

#### O.1 新增檔案（恰 2 個）

1. `bn/templates/D/01-ddcard-bn.js`
2. `bn/launch/D/01_DDcard BN.command`

#### O.2 修改檔案（恰 1 個）

3. `bn/launch/viewer.html` —— 僅：①新增一個 D－01 `else if` 分支（含 `fieldConfig`）②宣告區新增 `logoSource = null`／`logoImage = null` ③載入區新增 `if (logoSource) { … }` ④`render()` 第二參數三元條件化 ⑤unsupported 訊息補上 D－01。

#### O.3 納管素材（恰 3 個，逐一指定路徑）

4. `bn/assets/D/Logo.png`
5. `bn/assets/D/底圖/01_DDcard BN.jpg`
6. `bn/assets/D/對位/01_DDcard BN.png`

#### O.4 再次明確：不得進入正式 D platform integration

Phase 4 **不得**修改 `bn/js/render-a.js`、`bn/js/import.js`、`bn/js/workspace.js`、`bn/js/export.js`、`bn/js/app.js`、`bn/js/editor.js`；**不得**擴充 `SUPPORTED_TYPES`；**不得**在 `ASSET_BASE_BY_TYPE` 加入 `D`；**不得**在 `A_TABLE` 加入 type 維度；樣式 D 在正式平台**維持 fail-closed**。

Phase 4 **不得**預建、預留或抽象化 D－02～17；**不得**處理樣式 C；**不得**建立 generic abstraction、plugin system、D type registry redesign、C／D framework、共用 asset framework、共用 scale helper；**不得**修改 A／B 任何檔案或素材；**不得**修改 Requirement 文件；**不得**進行 Documentation Update（既有文件的同步更新屬後續獨立階段）。

Phase 4 完成後須經 Jamie／GPT Review PASS 才進入 Phase 5 Verification。

### P. D－01 Implementation Outcome（完成狀態補記）

> （後續同步）本 Proposal 全部規劃與 LOCKED 裁決均未改寫，僅補記完成狀態。Phase 4 Coding 已依 O 節「Phase 4 Exact Coding Boundary」精確執行：新增 `bn/templates/D/01-ddcard-bn.js` 與 `bn/launch/D/01_DDcard BN.command`（Git mode `100755`）、修改 `bn/launch/viewer.html`（+51／−2，恰為 F 節規劃的五處最小改動）、納管 I.1 節三個 D－01 素材；J 節零修改清單全部維持零 diff。B.7 節十項 LOCKED 裁決全部落實：Logo destination 350 × 50、`x = 90.5`、`y = 103`（保留 fractional，無 rounding／stretch／cover／crop）；images object 為 `{ backgroundImage, logoImage }` 且維持三參數 signature；draw order 為 background → Logo → Medium local 2× → Bold 副標；Logo assert 採最小有效圖片 assertion；Logo smoothing 自成 `save()` → `imageSmoothingEnabled = true` → `imageSmoothingQuality = "high"` → `drawImage()` → `restore()`；viewer 以既有 `fieldConfig` 提供 G 節三組測試資料且 A－01～12 共用預設未改；A－01～16 的 `render()` 第二參數仍為原本同一個 `backgroundImage` 物件，A－17 獨立 threshold path 未改。D template 的七個共用文字 helper 與 A－01 逐位元組相同。Phase 6 Jamie 人工對位驗證 PASS。Code Commit 為 `1139a7c3eca005b15c24bef7751ebb0ada740fe1`（`feat(bn): add D01 DDcard template`）；`git diff --check HEAD^ HEAD` PASS。L.2 節列出的 deferred 項目（正式 D Preview ↔ Export 一致性、D Excel Import／Restore、JPG 72 dpi／≤245,000 bytes 實測、樣式 D 完整 17 版位輸出）維持 **deferred until D platform integration**，本輪未為驗證它們而 enable Type D。目前正式支援的樣式仍為 A 與 B；D－02～17 尚未完成，樣式 C 不在本 Proposal 範圍。

---

## 5. Deferred Future BN Proposals（尚未進入 Phase 3 的版位）

- **D－02～17 尚未進入 Phase 2 Investigation／Phase 3 Proposal**，本文件因此**沒有**其 implementation 設計，且不得提前建立。任何 D－02～17 的 renderer design、layout、Logo geometry、asset plan、viewer 整合或 launcher 規劃，都必須等該版位的 Requirement 由 Jamie 確認、Phase 2 Investigation 完成後才可撰寫。
- D－01 的技術裁決（D-specific template、images object invocation、Logo contain 幾何、draw order、Medium local 2× 等）**只代表 D－01**，不得作為其餘 D 版位的預設方案。
- **正式 platform integration 相關項目仍 deferred**：正式 D Preview ↔ Export 一致性實測、D Excel worksheet Import 與 Restore、版位 01 的 JPG／72 dpi／≤245,000 bytes 實測、樣式 D 完整 17 版位輸出行為，全部 **deferred until D platform integration**。目前正式支援的樣式仍為 **A 與 B**；`SUPPORTED_TYPES` 仍為 `["A", "B"]`，`ASSET_BASE_BY_TYPE` 仍只有 A 與 B，樣式 D 在正式平台維持 fail-closed。不得為了驗證這些 deferred 項目而提前 enable Type D。
- 本文件不建立 generic framework、plugin system、跨 Type 抽象層或未來 C／D 共用架構。樣式 C 不在範圍。

---

## 6. Change History（變更紀錄）

| 日期 | 變更 | 說明 |
|---|---|---|
| 2026-08-24 | 建立樣式 D 總 Proposal | 依 Jamie 裁決之樣式 D 文件策略，將 D－01 於 Phase 3 建立並經 GPT Review PASS 的原始 Proposal 全文整併為本文件第 4 節，未刪減任何技術裁決；同時新增第 2 節文件治理規則、第 3 節狀態索引、第 5 節 deferred 項目與本節。D－01 原本的 standalone Proposal 檔案於整併後移除（該檔從未進入任何 Commit，故不屬 Git tracked deletion）。 |
| 2026-08-24 | 補記 D－01 Implementation Outcome | D－01 Phase 4 Coding 完成、Phase 6 Jamie 人工對位驗證 PASS、Code Commit `1139a7c3eca005b15c24bef7751ebb0ada740fe1`（`feat(bn): add D01 DDcard template`）。詳見第 4 節內部第 P 節。Proposal 原有的「預定／Phase 4 plan」語境未改寫，維持其 Proposal 歷史紀錄性質。 |

後續變更一律以新增列的方式追加，不改寫既有列。
