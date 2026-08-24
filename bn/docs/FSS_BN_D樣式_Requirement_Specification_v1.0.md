# FSS BN — 樣式 D Requirement Specification v1.0

**文件性質**：樣式 D 跨 `01`～`17` 版位的**持續累積** Requirement，單一總文件
**文件策略**：樣式 D 不建立逐版位 Requirement 文件；所有 D 版位的 Requirement 集中於本文件（見第 2 節）
**目前狀態**：D－01、D－02 已確認並完成，皆經 Phase 6 Jamie 人工對位驗證 PASS；D－03～17 尚待逐一確認
**D－01 Code Commit**：`1139a7c3eca005b15c24bef7751ebb0ada740fe1`（`feat(bn): add D01 DDcard template`）
**D－02 Code Commit**：`9c9272704517743ae7d8ccdd73c5a5a7bae8c534`（`feat(bn): add D02 MALL HBN template`）
**正式平台支援**：仍為 **A 與 B**；樣式 D 尚未 enable，維持 fail-closed（見第 6 節）
**Branch**：`main`
**最後更新**：2026-08-24

---

## 1. Document Purpose／Scope（文件目的與範圍）

本文件是**樣式 D 的唯一正式 Requirement 文件**，定義樣式 D 各 BN 版位的產品需求與驗收標準。

本文件是**持續累積**的文件，**不是**現在一次把 D－01～17 的規格全部寫完。已確認並完成的版位以完整章節保留；尚未確認的版位只出現在狀態索引與「尚待確認」語境。

本文件描述「產品必須做到什麼」與「如何驗收」，不指定實作方式；實作規劃見 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md`。

本文件明確區分四類內容：① **D 樣式全域已確認產品規則**（第 3 節）；② **各版位已確認 Requirement**（第 4 節索引、第 5 節起逐版位章節）；③ **尚待 Jamie 確認／尚未開發的版位**（第 4 節、第 6.2 節）；④ **正式 platform integration 尚未完成的項目**（第 6.1 節）。

本文件不自行補完任何尚未確認的 D 規格。樣式 C 不在範圍；樣式 A 與 B 已封箱，本文件不重新設計、不修改其行為。

---

## 2. 文件治理規則（Documentation Governance）

本規則為 Jamie 正式裁決的**樣式 D 文件策略**，自本文件建立起生效：

1. 樣式 D **不採**「每一個版位一份 Requirement ＋ 一份 Proposal」。樣式 D 只維護**一份總 Requirement**（本文件）與**一份總 Proposal**（`bn/docs/FSS_BN_D樣式_Proposal_v1.0.md`）。
2. 後續 D－02～17 **不另建**逐版位 Requirement／Proposal 文件。當某版位進到對應 Phase 時，只在這兩份總文件內**追加或更新該版位章節**。
3. 已完成版位的內容作為**歷史紀錄保留**，不因後續版位開發而重寫既有裁決；其內部編號與交叉引用一併保留，以維持既有引用有效。
4. 若 Jamie 後續變更已完成版位的規格，必須以**明確的 change record**（見第 7 節）更新，不得靜默改寫既有條文。
5. 未確認的版位只能出現在第 4 節狀態索引或第 6 節「尚待確認」語境，**不得**寫入未經 Jamie 確認的 geometry、Logo placement、renderer design、mapping 或驗收標準。
6. 本治理規則**只適用樣式 D**，不套用回樣式 A、B 或 C；A／B 既有文件結構與 C 的未來文件策略均不受本規則影響。

---

## 3. D Style Global Confirmed Requirements（D 樣式全域已確認產品規則）

本節只記錄 **Jamie 已確認的 D 整體事實**。未確認事項一律不寫入本節。

### 3.1 資料來源

- 樣式 D 有其**自己的 Excel worksheet `D`**。
- D 的**工單配置與 A／B 相同**。
- 依既有 A／B 工單配置，01～12 使用 shared text model `B15 = headline`、`B16 = subheadline`、`B17 = protectionText`；此配置已在 D－01 正式確認並實作（見第 5 節內部第 4 節）。其餘版位的實際欄位仍以各版位進入對應 Phase 時 Jamie 提供的規格為準。

### 3.2 已確認的 Type 差異（沿用 `FSS_BN_17版位_Type差異_Phase0整理.md` 第三節之精確記載）

- **D：D 專用底圖 ＋ 無額外文字帶入 ＋ 有額外 Logo 圖帶入。** 此為已正式確認的差異，不是待確認項。
- 與 A／B 相對照：A、B 均為「無額外文字帶入、無額外 Logo 帶入」；C 為「有額外文字帶入、無額外 Logo 帶入」。C 不在本文件範圍。

### 3.3 逐版位已確認的 D 整體資訊

- **01、02、03、06、07、08、09、10、12**：已確認與 A／B 存在**文字位置差異**及**額外 Logo 位置差異**。差異的實際數值仍須逐版位由 Jamie 提供規格確認。
- **01～14**：使用樣式 D 自己的底圖。
- **D－12**：與 A－12／B－12 一樣**需要掛標**。
- **15～17**：與 A／B **相同**。

### 3.4 素材

- D 素材位於 `bn/assets/D/`（底圖於 `bn/assets/D/底圖/`、對位圖於 `bn/assets/D/對位/`）。
- **固定 Logo 為 `bn/assets/D/Logo.png`**，為樣式 D 共用的固定 renderer asset。
- **Logo 的實際 placement 與 geometry 必須逐版位以 Jamie 提供的規格為準**；D－01 的 Logo box 與 contain 幾何（見第 5 節）**只適用 D－01**，**不得**據此推論或預設其他任何 D 版位的 Logo 位置或尺寸。

### 3.5 全域邊界

- 固定 Logo 在樣式 D 一律為 renderer asset：**不由 Excel 帶入、不由使用者上傳、不進入 Editor、不進入 Workspace state、不進入暫存 JSON schema、不進入 Import mapping**。此規則已於 D－01 確認並實作。
- 樣式 D 目前**尚未**進入正式平台支援範圍（見第 6 節）。

---

## 4. Per-BN Requirement Status／Index（逐版位 Requirement 狀態索引）

| 版位 | Requirement 狀態 | 開發狀態 | 本文件對應章節 |
|---|---|---|---|
| `01_DDcard BN` | **已確認**（Jamie 正式裁決） | **已完成**；Phase 6 Jamie 人工對位驗證 PASS；Code Commit `1139a7c3eca005b15c24bef7751ebb0ada740fe1` | 第 5 節 |
| `02_MALL HBN` | **已確認**（Jamie 正式裁決） | **已完成**；Phase 6 Jamie 人工對位驗證 PASS；Code Commit `9c9272704517743ae7d8ccdd73c5a5a7bae8c534` | 第 8 節 |
| `03_Coin page BN` | 尚待 Jamie 確認 | 尚未開發 | — |
| `04_Loyalty BN` | 尚待 Jamie 確認 | 尚未開發 | — |
| `05_MSBN` | 尚待 Jamie 確認 | 尚未開發 | — |
| `06_IG` | 尚待 Jamie 確認 | 尚未開發 | — |
| `07_FB POST` | 尚待 Jamie 確認 | 尚未開發 | — |
| `08_SPX TVBN_1` | 尚待 Jamie 確認 | 尚未開發 | — |
| `09_SPX TVBN_2` | 尚待 Jamie 確認 | 尚未開發 | — |
| `10_POP UP` | 尚待 Jamie 確認 | 尚未開發 | — |
| `11_Line OA` | 尚待 Jamie 確認 | 尚未開發 | — |
| `12_LPBN` | 尚待 Jamie 確認（已知需掛標） | 尚未開發 | — |
| `13_Skinny BN_APP` | 尚待 Jamie 確認 | 尚未開發 | — |
| `14_Skinny BN_PC` | 尚待 Jamie 確認 | 尚未開發 | — |
| `15_AR` | 已確認與 A／B 相同 | 尚未開發 | — |
| `16_副區` | 已確認與 A／B 相同 | 尚未開發 | — |
| `17_門檻表` | 已確認與 A／B 相同 | 尚未開發 | — |

「尚待 Jamie 確認」表示該版位的 placement、Logo geometry、文字框與其他細節**尚未取得正式規格**，本文件不得預填。第 3.3 節所列「已確認存在差異」只表示**差異存在**，不表示差異數值已確認。

---

## 5. D－01（`01_DDcard BN`）Requirement

> 本節完整承接 D－01 於 Phase 1 建立、並經 GPT Review PASS 的 Requirement 全文，作為歷史紀錄保留，未刪減任何條文。
>
> **內部編號說明**：本節以下的「第 N 節」「第 N.M 節」係指**本 D－01 Requirement 章節內部**的原始編號（承接 consolidation 前的原始編號，以維持既有交叉引用有效），不是本總文件的第 N 節。
>
> **語境說明**：本節內文中的「本文件」「本輪」係 Phase 1 當時的語境，指 D－01 Requirement 本身及其所屬階段，予以原樣保留；consolidation 後的文件治理規則見本總文件第 2 節。
>
> 本節內所有屬 Phase 1 當時 Investigation evidence 的敘述（例如 A／B－01 既有實作實證、Repository 現況實證）**只作為 D－01 的裁決依據**，**不得**擴張解讀為所有 D 版位的共通規則。
>
> **原始文件基準資訊**（保留自 consolidation 前的 front matter）：階段 Phase 1 Requirement；主題為「樣式 D 的 `01_DDcard BN`（D－01）正式版位需求：沿用 A／B－01 既有文字內容模型與視覺樣式，改用 D 專屬底圖、D－01 專屬 placement，並新增一個固定 Logo asset」；Base HEAD `88bd112729a061d012c23d780c4d6718766c8823`（B Docs Commit）；Base parent `4f9fb723930a907b8c3956fd084e757b41302137`（B Code Commit）；Branch `main`；前置為 D－01 Repository／Technical Investigation 完成，Jamie 已就 Logo sizing、Renderer 架構邊界、對位驗證方式正式裁決。

### 1. Purpose／Scope（文件目的與本輪範圍）

本文件定義 **樣式 D 的 `01_DDcard BN`（以下稱 D－01）單一版位**的正式產品需求與驗收標準。

本文件描述「產品必須做到什麼」與「如何驗收」，**不指定實作方式**。具體的模組切分、函式與 helper 設計、registry 形狀、參數傳遞介面、asset 載入時序、資料結構等，一律屬後續 Phase 2 Investigation 確認範圍與 Phase 3 Proposal 決定範圍，本文件不寫死、不預先決定。

本文件**只規範 D－01**。D－02～17 未納入本文件任何條文；樣式 C 完全不納入；樣式 A 與 B 已完整封箱，本文件不重新設計、不修改其行為。

本文件不修改、不取代、不同步任何既有文件。`FSS_BN_Architecture.md`、`FSS_BN_Template_Requirement_Specification_v1.0.md`、`FSS_BN_A樣式平台整合_Requirement_Specification_v1.0.md`、`FSS_BN_B樣式平台整合_Requirement_Specification_v1.0.md`、`FSS_BN_17版位_Type差異_Phase0整理.md`、`FSS_BN_正式版位建立_SOP.md` 的任何更新屬後續 Documentation Update，不屬本輪。

本文件建立時未撰寫任何實作碼、未修改任何程式碼／HTML／CSS／JS／JSON／素材。文件內所有描述現況的敘述均為 Investigation 實證；所有描述 D－01 的敘述均為**尚未實作的需求**。兩者在文中明確區分，不得互相誤讀。

---

### 2. Baseline & Locked Existing Behavior（基準與既有 LOCKED 行為）

#### 2.1 基準

- Base HEAD：`88bd112729a061d012c23d780c4d6718766c8823`（B Docs Commit）
- Base parent：`4f9fb723930a907b8c3956fd084e757b41302137`（B Code Commit）
- 樣式 A（A－01～17）與樣式 B（B－01～17）均已完成正式整合並封箱。

#### 2.2 Investigation 實證：A／B－01 既有實作現況

以下為 Repository 實證結果，描述**目前已存在**的行為，全部列為 LOCKED，D－01 不得改變：

- **唯一 renderer 檔案**：`bn/templates/A/01-ddcard-bn.js`。A－01 與 B－01 共用**同一個檔案**；`bn/templates/` 目錄下**只有 `A/`**，不存在 `templates/B/`。
- **Registry**：`bn/js/render-a.js` 的 `A_TABLE["01"]`，以 `bnId` 為唯一 key，**不含 type 維度**；renderer 本身不接收樣式 type 參數。
- **正式 canvas**：531 × 792，由 renderer 自行設定於傳入的 canvas 上。
- **底圖驗證**：renderer 對底圖的 `naturalWidth`／`naturalHeight` 做 exact-dimension assert，不符即明確 throw，不做縮放、不做 fallback。
- **A／B 底圖解析機制**：`render-a.js` 的 `ASSET_BASE_BY_TYPE`，目前只有 `A` 與 `B` 兩個 key。A 與 B 的底圖檔名完全相同（皆為 `01_DDcard BN.jpg`），差異僅在資料夾，B 因此得以原封不動重用 A 的 renderer 與 layout。此常數在原始碼註解中已自我限定為「既有單一 base 常數的最小 Type 對照」，**不是 Type framework 或 config layer**。
- **字型宣告**：`@font-face`（ShopeeNotoSans Regular／Medium／Bold）位於 `bn/css/styles.css`，並在 `bn/launch/viewer.html` 內另有一份 inline 複本。weight 由 family 名稱承載（各 weight 一個獨立 woff2），canvas font string 使用 `pt` 單位。
- **字數限制**：`bn/js/editor.js` 對 01～12 shared 欄位的上限為 headline 8、subheadline 7、protectionText 17；計數採 `countTextUnits`（半形字計 0.5）。
- **A－01／B－01 既有 layout（LOCKED，D－01 不得改動）**：headline `{left:90, top:141, width:351, height:37}`、subheadline `{left:43, top:192, width:445, height:57}`、protectionText `{left:43, top:267, width:445, height:22}`。

#### 2.3 LOCKED／Regression Boundary

D－01 的落地**不得**造成下列任何一項發生變化：

- `bn/templates/A/*.js`（17 檔）的內容與輸出行為。
- A－01～17 與 B－01～17 的任何 Preview 或 Export 產出（像素層面必須維持 byte-identical）。
- `bn/assets/A/*`、`bn/assets/B/*`、`bn/assets/LPBN掛標/*` 素材。
- `bn/js/import.js`、`bn/js/workspace.js`、`bn/js/export.js`、`bn/js/app.js`、`bn/js/editor.js`、`bn/js/banwords*.js`、`bn/js/lpbn-badges.js` 的既有行為。
- `bn/index.html`、`bn/css/styles.css`、`bn/js/vendor/*`。
- `bn/launch/A/*.command`（17 檔）與 `bn/launch/viewer.html` 的既有 A 分支行為。
- 正式工單 Excel。

---

### 3. D－01 Assets（素材）

#### 3.1 素材清單與實證結果

下列三個素材已存在於 Repository（目前為 untracked），尺寸與格式為 Investigation 以檔頭解析實證所得（未解碼像素、未修改、未轉檔、未重新壓縮）：

| 用途 | 路徑 | 實證格式 | 實證尺寸 | 實證檔案大小 |
|---|---|---|---|---|
| 正式底圖 | `bn/assets/D/底圖/01_DDcard BN.jpg` | JPEG | **531 × 792** | 109,930 bytes |
| 對位圖 | `bn/assets/D/對位/01_DDcard BN.png` | PNG（8-bit, RGBA） | **531 × 792** | 19,936 bytes |
| 固定 Logo | `bn/assets/D/Logo.png` | PNG（8-bit, RGBA） | **784 × 112** | 48,618 bytes |

#### 3.2 素材需求

- D－01 必須使用 `bn/assets/D/底圖/01_DDcard BN.jpg` 作為正式底圖。其實證尺寸 531 × 792 與正式 canvas 531 × 792 **完全一致**，並可通過既有的 exact-dimension assert 慣例。
- D－01 的固定 Logo 必須取自 `bn/assets/D/Logo.png`，且**只能**取自此路徑。
- `bn/assets/D/對位/01_DDcard BN.png` 只用於人工對位驗證，**不得**進入正式 Preview 或 Export 產出。
- 本輪不得修改、移動、轉檔、重新壓縮或重新產生上述任何素材。
- 本 Requirement 只涉及 D－01 的三個素材。`bn/assets/D/` 底下其他 D－02～17 素材雖已存在於 Working Tree，但**不在本文件範圍內**，不得因本文件被納管、使用或處理。

---

### 4. D－01 Data Source（資料來源）

- 樣式 D 的正式工單 Excel 有其**自己的 worksheet `D`**，工單配置與 A／B 相同。
- D－01 沿用既有 **01～12 shared text model**，來源儲存格為：`B15 = headline`、`B16 = subheadline`、`B17 = protectionText`。
- D－01 不新增任何工單儲存格、不新增任何 optional 欄位、不新增任何 D－01 專屬資料值。
- **固定 Logo 不是資料**。Logo 不由 Excel 帶入、不由使用者上傳、不進入 Editor、不進入 Workspace state、不進入暫存 JSON schema、不進入 Import mapping。Logo 的位階與底圖相同：由 renderer 解析的固定素材。
- 本條文只描述 D－01 的資料來源語意。**Phase 1 不啟用**樣式 D 的正式 Import（見第 12 節）；本節定義的是 D 整體完成後應成立的資料語意，不是本輪要落地的功能。

---

### 5. Typography & Formatting（字型與特殊 formatting）

D－01 的 headline／subheadline／protectionText 的**文字內容模型、字數規則、字型 family、font size、color、特殊 formatting 全部沿用正式 A／B－01**，不得重新定義、不得微調。

依 Investigation 實證，A／B－01 既有樣式為：

| 內容 | Font | Color |
|---|---|---|
| headline | `30pt "ShopeeNotoSans Medium"` | `#ffffff` |
| subheadline | `45pt "ShopeeNotoSans Bold"` | `#fff285` |
| subheadline 之 `$`／`%` | `37pt "ShopeeNotoSans Bold"` | `#fff285` |
| protectionText | `18pt "ShopeeNotoSans Medium"` | `#a6f4e6` |

#### 5.1 副標 `$`／`%` 特殊 formatting（LOCKED）

Investigation 實證的既有行為：副標文字逐字掃描，每個 `$` 與 `%` 切成獨立 run 以 `37pt "ShopeeNotoSans Bold"` 繪製，其餘文字為 `45pt "ShopeeNotoSans Bold"`；每個 symbol run 的基線再依相鄰 ordinary run 的邊界字 **ink bottom 對齊**（`$` 對齊其後方 run、`%` 對齊其前方 run；找不到相鄰 ordinary run 則不調整）；最後以全部 run 的 **ink bounding-box 聯集**在 box 內置中。

D－01 必須完整保留此行為。此處理發生在 box 位移之前，因此僅改變 box 座標在數學上不會影響 symbol 對齊；但 D－01 仍必須就此明確驗收（見第 16 節）。

#### 5.2 文字定位方式（LOCKED）

D－01 三段文字的置中必須沿用 A－01 既有的 **ink bounding-box positioning**：以 `textAlign="left"`、`textBaseline="alphabetic"` 為基準，取文字量測的 ink 邊界（ascent／descent／left／right）自行反算繪製座標。

**不得**改成 `textAlign="center"`、`textBaseline="middle"`，也不得另立一套置中算法。

#### 5.3 字數規則

沿用既有 01～12 shared 欄位上限：headline 8、subheadline 7、protectionText 17，計數方式沿用既有半形計 0.5 的規則。D－01 不新增、不放寬、不收緊字數規則。

---

### 6. D－01 Geometry（幾何與 placement）

#### 6.1 正式 canvas

D－01 正式 canvas 為 **531 × 792**，與 A／B－01 相同。

#### 6.2 D－01 placement（已正式確認）

| 元素 | left | top | width | height |
|---|---|---|---|---|
| Logo | 90 | 103 | 351 | 50 |
| headline | 90 | 170 | 351 | 37 |
| subheadline | 43 | 221 | 445 | 57 |
| protectionText | 43 | 296 | 445 | 22 |

Logo 與三段文字內容都必須在**各自 box 的 `width × height` 範圍內水平＋垂直置中**。

#### 6.3 幾何實證

- 四個 box 全部落在 531 × 792 canvas 範圍內：右緣最大 488 < 531，下緣最大 318 < 792。
- 四個 box 互不重疊，垂直間隙依序為 17px（Logo→headline）、14px（headline→subheadline）、18px（subheadline→protectionText）。
- D－01 三個文字 box 相對 A／B－01 為**整體下移正好 +29px**（141→170、192→221、267→296），`left`／`width`／`height` 完全相同。Logo box 佔用的正是上方讓出的空間。
- 由於 subheadline box 的 width（445）與 height（57）與 A／B－01 完全相同，其 ink 適配行為不因 D－01 而改變。

#### 6.4 溢出行為

Investigation 實證：A－01／B－01 的 renderer **沒有 overflow 警告機制**（不同於 A－17 會回傳 fit 判定），文字超出 box 時靜默溢出，字數由上游 Editor 與 Import 把關。D－01 沿用此既有行為，**不新增** overflow 警告或自動縮字機制。

---

### 7. Logo Rendering Requirement（固定 Logo 繪製需求）

#### 7.1 Jamie 已正式裁決的 sizing 規則

- Logo 必須**保持原始 aspect ratio**。
- 以 **contain** 方式等比例縮放，使其**完整落在 `351 × 50` box 內**。
- 縮放後在該 box 內做**水平＋垂直置中**。
- **禁止拉伸變形**（不得為追求恰好填滿 351 × 50 而非等比例縮放）。
- **禁止 cover／crop**（不得裁切 Logo 任何部分）。

#### 7.2 依現行素材的算術結果

以目前實證素材 784 × 112（aspect 7.000）對 box 351 × 50（aspect 7.020）計算：

- contain 縮放比 = `min(351/784, 50/112)` = `min(0.44770, 0.44643)` = **0.44643**，即**受 50px 高度限制**。
- render size 約 **350 × 50**，置中後左右各自然留下約 **0.5px** 的餘量。

此左右約 0.5px 餘量是等比例 contain 的**正確結果**，不是缺陷。實作時不得為消除該餘量而改用非等比例拉伸。

#### 7.3 「維持原尺寸」不可行（實證）

Logo 原始寬度 784px 已大於 canvas 寬度 531px，直接以原尺寸繪製會溢出畫布本身，因此原尺寸繪製不是可行選項。

#### 7.4 降採樣品質

Logo 需縮放至約 0.446 倍，屬降採樣。應沿用 Repository 既有的 canvas 高品質降採樣慣例（Investigation 實證：既有降採樣路徑使用 `imageSmoothingEnabled = true` 與 `imageSmoothingQuality = "high"`）。

具體實作寫法屬 Phase 3 決定範圍，本 Requirement 階段**不寫實作碼**。

#### 7.5 既有 helper 現況（實證）

Investigation 實證：Repository 內**不存在**任何「圖片在指定 box 內等比例 contain 並置中」的既有 helper。全 Repo 的圖片繪製只有四類既有用途：底圖 1:1 鋪滿 canvas、2× offscreen 合成降採樣、掛標 overlay 1:1 疊合、以及 A－17 的 `titleImage`／`vipImage` — 後者先 assert 素材尺寸恰等於 box 再 1:1 繪製，因此從不需要 fit 計算。

亦即：D－01 的 Logo contain 置中在現有程式庫中**沒有可直接沿用的既有 helper**。Jamie 已裁決採 contain 等比例置中，其落地形狀（放在 D－01 template 內、或以何種介面取得 Logo image）屬 Phase 2／3 範圍。本文件**不要求**建立通用圖片置中 framework 或 generic helper。

---

### 8. Medium local 2× Requirement

D－01 的 Medium family 文字必須沿用 A－01 **既有的 template-local 2× rendering 機制**：

- 建立 offscreen 2× surface（2 倍於正式 canvas 尺寸）。
- 在該 surface 上以**同一組 1× layout coordinates** 繪製 Medium 文字。
- 以 `imageSmoothingEnabled = true`、`imageSmoothingQuality = "high"` 降採樣合成回正式 **531 × 792** canvas。

Investigation 實證的既有行為細節，D－01 必須一致：

- 2× 路徑**只涵蓋 Medium family 的兩段文字**（headline 與 protectionText）；Bold 副標**不進 2× pass**，直接在 1× 繪製。
- 2× 縮放常數為 **template-local 常數**，不是共用模組。此模式在 16 個 A template 中各自持有一份，屬既有慣例。
- 因此 D－01 的新 `top` 值必須放在「2× pass 與 1× 副標 pass 共用的同一組 layout 座標」中，與 A－01 的結構一致。

**不得**因 D－01 建立共用 scale framework、共用 scale helper、共用 offscreen surface 模組或任何跨 template 的抽象層。

#### 8.1 字型就緒要求

沿用 A－01 既有的字型就緒慣例（實證：以固定測試字串預載並檢查全部所需 font string，且在實際繪製前再次同步確認，未就緒即明確 throw 而不以 fallback 字型繪製）。D－01 不得以未就緒字型產出畫面。

---

### 9. Renderer Architecture Boundary（Renderer 架構邊界）

#### 9.1 已確認裁決

D－01 因 placement 與 A／B－01 不同，且增加固定 Logo，**不得在已封箱的 `bn/templates/A/01-ddcard-bn.js` 內加入 D type branch**。

未來 D－01 應使用 **D-specific template definition**，預定位置 `bn/templates/D/01-ddcard-bn.js`，以隔離 A／B 已驗證的 renderer。

#### 9.2 裁決依據（實證）

- `bn/templates/A/*.js`（17 檔）被 B 樣式整合 Requirement 明列於「零修改」清單內；在其中加入 D branch 會直接動到 B 封箱基準所依賴的檔案。
- 現行 renderer 刻意**不接收樣式 type 參數**；加入 type branch 需把 type 灌入 renderer，並在 A 檔案內放入第二組 layout 與 Logo 素材依賴。
- `bn/templates/D/` 已是 `FSS_BN_正式版位建立_SOP.md` 宣告的規劃目錄之一。

#### 9.3 裁決適用範圍限制

**此裁決只適用目前的 D－01。**

- 不得據此預建 D－02～17 的 template（含空檔案、佔位檔、骨架檔）。
- 不得建立 generic Type framework、template framework、plugin 機制、registry 抽象層或任何跨版位／跨樣式的通用抽象。
- D－01 落地時 registry 層的 type 分支形狀屬 Phase 2 Investigation／Phase 3 Proposal 決定範圍，本文件不指定。
- Investigation 已標記的既有結構壓力點（現行 registry 以 `bnId` 為唯一 key、無 type 維度；現行 render 介面為固定三參數而 Logo 是第三個素材輸入）屬 Phase 2 待確認事項，本文件僅記錄事實，不預先決定解法。

#### 9.4 可接受的代價（已知並揭露）

D-specific template definition 會複製 A－01 既有的文字量測與置中邏輯。此複製**符合 Repository 既有慣例**（16 個 A template 各自持有一份同構實作），屬延續慣例而非新增模式。本文件記錄此代價已被認知並接受，不因此改為抽取共用模組。

---

### 10. Preview／Export Consistency（Preview 與 Export 一致性）

#### 10.1 實證現況

Preview 與 Export **已經**共用同一個正式 renderer 入口（`renderBnToCanvas`）：Preview 由 `bn/js/app.js` 呼叫，Export 由 `bn/js/export.js` 呼叫，兩者都傳入全新的 detached canvas。Preview 只在顯示層加上 CSS 縮放（只寫 inline style，不改 canvas backing dimensions，因此不影響 Export）；Export 只在 render 之後做 byte 層 dpi metadata patch 與容量處理。兩邊像素輸出因此相同。

#### 10.2 D－01 需求

- D－01 的正式 Preview 與 Export **必須走同一正式 renderer path**，不得另寫第二套視覺 renderer。
- **Logo 不得**以 DOM overlay、CSS background、`<img>` 疊圖或任何 Preview-only 技巧呈現。Logo 必須繪製在正式 canvas 上，因此必然同時出現在 Preview 與 Export。
- D－01 的 placement 同理：不得只在 Preview 或只在 Export 生效。
- 對位 overlay 是獨立的人工校稿元素，不屬於 canvas，**不得**進入 Export（見第 11 節）。

---

### 11. Launch／Alignment Verification Requirement（啟動檔與對位驗證需求）

#### 11.1 已確認裁決

D－01 的對位驗證沿用**樣式 A 既有的逐版位人工校稿方式**。

- 未來 D－01 必須有**獨立啟動檔**，預定 `bn/launch/D/01_DDcard BN.command`。
- 必須使用**既有的** `bn/launch/viewer.html` overlay 對位機制，顯示 `bn/assets/D/對位/01_DDcard BN.png`。
- 啟動檔與 viewer **僅是人工對位工具**，不是第二套正式 renderer、不是正式 Generator Preview、不是正式資料輸入流程。其測試輸入、overlay 開關等控制項不得搬入正式控制台。

#### 11.2 實證現況

- 既有結構為單一共用薄校稿頁 `bn/launch/viewer.html` ＋ 每版位一個 `bn/launch/A/<版位>.command`（共 17 檔）。
- viewer 依 query 參數（樣式 type 與版位名稱）分支，動態載入對應 template，並將 canvas 與對位 overlay 設為同尺寸，且對 overlay 的原生尺寸做相符檢查。D－01 對位圖實證為 531 × 792，可通過此檢查。
- 啟動檔既有 pattern 為：zsh 腳本、絕對路徑釘死外部工具、由 repo root 啟本機靜態 server、以 viewer marker 判定就緒、開啟帶樣式與版位參數的 viewer URL、離開時收掉 server、已在執行則重用、port 被占用則明確報錯。
- **不存在** `bn/launch/B/`，亦**不存在** `bn/assets/B/對位/` — B 樣式整合已明確裁決不建立。因此 D－01 將是自 A 以來首次重新啟用此對位驗證流程。

#### 11.3 範圍限制

- 只建立 D－01 一個啟動檔。**不得**預建 D－02～17 的啟動檔或空 launcher。
- 只在既有 viewer 中新增 D－01 所需的最小分支。**不得**把 viewer 重構成通用 framework、不得新增第二個校稿頁。
- Investigation 已標記的介面摩擦點（既有 viewer 的 render 呼叫為固定三參數，而 D－01 需要 Logo 素材）屬 Phase 2／3 決定範圍，本文件不指定解法。

---

### 12. Import／Restore Support Boundary（正式支援邊界）

#### 12.1 實證現況

- `bn/js/import.js` 的正式支援樣式 allow-list 目前為 **`["A", "B"]`**。
- 該 allow-list 在兩處強制：工單 Excel 匯入時（檢查發生在**任何 worksheet lookup 之前**，非支援樣式一律明確失敗，不因工單內實際存在 D worksheet 而被接受）；以及暫存 JSON 還原時（`type` 不在 allow-list 即 reject）。
- 另有兩道彼此獨立的閘門目前同樣排除 D：`render-a.js` 的底圖 base 對照表（不支援樣式明確 throw，且不 fallback 到 A 或 B 底圖）、以及門檻表編輯器的樣式可見性判斷。
- `bn/index.html` 的樣式 D 選擇卡片**已經是 live 的**，點擊後會進入控制台，但目前在 renderer 層明確且安全地失敗（fail-closed）。

#### 12.2 D－01 Phase 1 邊界

- **D－01 Phase 1 不把正式 Import／Restore 的支援樣式從 A／B 擴充為 D。**
- D 整體尚未完成期間，正式平台對樣式 D **維持 fail-closed**。
- 不得因 D－01 Requirement 提前修改 `bn/js/import.js`、`bn/js/workspace.js`、`bn/js/export.js`、`bn/js/app.js` 或任何正式支援 allow-list。

#### 12.3 為何 D－01 不需要提前啟用（實證依據）

D－01 的對位驗證全程走 `bn/launch/` 的人工校稿路徑，使用啟動檔／viewer 內的測試輸入，**完全不經過** Import、Workspace 或 Export。因此 D－01 的對位開發可在 allow-list 零修改的前提下完成。

#### 12.4 提前啟用的已知風險（僅記錄，不執行）

若在只有 D－01 完成的狀態下讓正式平台接受樣式 D，將出現：01 可預覽而 02～17 全部顯示 Preview 錯誤；「下載完整專案」在 17 項迴圈中途失敗且不產出任何成品；Export／Restore 的 JSON 帶著樣式 D 流出。等於把半成品樣式對外呈現為已支援。本文件記錄此風險，**不啟用**。

---

### 13. Export Locked Behavior（Export 既有 LOCKED 行為）

D－01 的 Export 沿用版位 `01` **既有的 LOCKED 行為，不重新設計**：

- 輸出格式：**JPG**
- 解析度 metadata：**72 dpi**
- 沿用既有 JPEG quality／compression 邏輯（實證：先以最高品質嘗試；超出容量上限時在既有 quality 下限與上限之間以固定次數二分搜尋，取符合上限的最高品質；下限仍超標則整次 Export 明確失敗）
- 最終檔案大小：**≤ 245,000 bytes**

補充實證：Export 的版位清單以**版位 id** 為 key、與樣式 type 無關，因此版位 `01` 的格式、dpi 與容量上限規則會自然適用於 D－01，無需為 D 另立規則。dpi 寫入為 byte-level metadata patch，不重新編碼像素。

**不得**因樣式 D 重新設計容量策略、改變格式、改變 dpi、調整容量上限或新增 D 專屬編碼路徑。

容量餘裕備註（實證，非結論）：D 底圖實證 109,930 bytes，小於 A 底圖的 161,668 bytes；但最終檔案大小只能在實際 render 後量測，無法由素材大小推定。此為 Phase 4 驗收時的實測項目。

---

### 14. Error／Fail-Closed Expectations（異常與 fail-closed 期望）

D－01 必須沿用既有的「明確失敗、不靜默降級」原則：

1. **底圖尺寸不符**：D 底圖非 531 × 792 時必須明確失敗，不得縮放、不得裁切、不得以其他樣式底圖 fallback。
2. **Logo 素材缺失或無法解碼**：必須明確失敗，不得以空白、預設圖或略過 Logo 的方式繼續產出。Logo 是 D－01 的必要組成，不是 optional。
3. **字型未就緒**：沿用既有慣例明確失敗，不得以 fallback 字型繪製。
4. **對位圖尺寸不符**：在人工校稿路徑中必須明確失敗，不得靜默顯示錯位 overlay。
5. **未支援樣式**：正式平台對樣式 D 維持既有 fail-closed 行為（見第 12 節），且不得 fallback 到 A 或 B 的素材。
6. **只完成 D－01 期間的 Export**：既有 Export 無條件迭代全部 17 個版位，因此在只有 D－01 完成時，樣式 D 的「下載完整專案」會在 D－02 失敗且不產出成品。此為既有機制的自然結果，本輪**不修改** Export 迴圈、**不**為此加入部分輸出或跳過機制。逐版位人工對位驗證不受影響。

上述均為期望行為的陳述，不指定錯誤訊息文字與實作方式。

---

### 15. Explicit Non-Goals／Scope Boundary（明確非目標與範圍邊界）

本文件**只規範 D－01**。以下項目明確不在範圍內：

1. **D－02～17 未納入**。不撰寫其需求、不預建其 template、不預建其 launcher、不納管其素材、不為其預留抽象。
2. **樣式 C 不納入**，完全不討論。
3. **A／B 不重新設計**。A－01～17 與 B－01～17 的行為、素材與輸出一律不變。
4. **不修改 A－01 template**。不在 `bn/templates/A/01-ddcard-bn.js` 加入 D type branch 或任何 D 相關程式。
5. **不預建其他 D template／launcher**。只有 D－01 一個 template definition 與一個啟動檔在未來範圍內。
6. **不建立 generic abstraction／plugin／framework**。不建立 Type framework、template framework、共用 scale helper、通用圖片置中 helper、registry 抽象層或 plugin 機制。
7. **Logo 不進 state／JSON／editor／import mapping**。Logo 是固定 renderer asset，不建立任何 Logo 狀態。
8. **不提前正式啟用 Type D**。不修改正式支援 allow-list，不修改 `import.js`／`workspace.js`／`export.js`／`app.js`。
9. **不做 Documentation Update**。不修改、不同步任何既有文件。
10. **不重設計 Export 容量策略**、不改格式、不改 dpi、不改容量上限。
11. **不新增 overflow 警告或自動縮字機制**。
12. **不在本輪 Coding**。本文件為 Phase 1 Requirement，不含實作碼、不含函式簽章、不含資料結構定義。
13. **不新增工單儲存格或資料欄位**。
14. **不改變既有字數規則與計數方式**。

---

### 16. Acceptance Criteria（驗收標準）

以下為 D－01 落地後必須逐項可驗證的標準。本文件建立時**尚未實作**，故全部為未來驗收項目。

#### 16.1 Canvas 與素材

1. D－01 正式輸出 canvas 為 **531 × 792**。
2. D－01 使用 `bn/assets/D/底圖/01_DDcard BN.jpg` 作為底圖，且底圖以 1:1 正確鋪滿 canvas、未縮放、未裁切。
3. D－01 的 Logo 固定取自 `bn/assets/D/Logo.png`，非 Excel 帶入、非使用者上傳、非 Editor 欄位。

#### 16.2 Logo

4. Logo 維持原始 aspect ratio，以 **contain 等比例**縮放，**未變形**、**未 crop**。
5. Logo 完整落在 `{left:90, top:103, width:351, height:50}` box 內，並在該 box 內**水平＋垂直置中**；以現行 784 × 112 素材計，render size 約 350 × 50，左右各約 0.5px 餘量屬正確結果。

#### 16.3 幾何與文字樣式

6. 三個文字 box 座標正確：headline `{90,170,351,37}`、subheadline `{43,221,445,57}`、protectionText `{43,296,445,22}`。
7. 三段文字在各自 box 內水平＋垂直置中，且採 **ink bounding-box positioning**，未改用 `textAlign=center`／`textBaseline=middle` 或其他算法。
8. 三段文字的視覺樣式與 A／B－01 **相同**：headline `30pt "ShopeeNotoSans Medium"` `#ffffff`；subheadline `45pt "ShopeeNotoSans Bold"` `#fff285`；protectionText `18pt "ShopeeNotoSans Medium"` `#a6f4e6`。
9. 副標 `$`／`%` 的既有特殊 formatting **未改變**：`37pt "ShopeeNotoSans Bold"` 且維持 ink-bottom 對齊行為。

#### 16.4 Rendering 機制

10. Medium 文字採 **template-local 2×** rendering：offscreen 2× surface、同一組 1× layout coordinates、高品質降採樣回 531 × 792；且未建立共用 scale framework／helper。
11. Preview 與 Export 走**同一正式 renderer path**，Logo 與 placement 在兩邊一致；Logo 未使用 DOM overlay 或任何 Preview-only 技巧。

#### 16.5 對位驗證

12. `bn/assets/D/對位/01_DDcard BN.png` 可透過既有 viewer overlay 機制顯示，供 Jamie 進行 D－01 人工對位驗證；對位 overlay 未進入正式 Export。

#### 16.6 回歸與邊界

13. **A／B renderer 不變**：`bn/templates/A/*.js` 未被修改；A－01～17 與 B－01～17 的 Preview 與 Export 輸出未改變。
14. **D－02～17 無新增實作**：無新增 template、無新增 launcher、無新增 registry entry、無為其預留的抽象。
15. **正式 `SUPPORTED_TYPES` 仍為 A／B**：`bn/js/import.js` 的 allow-list 未擴充；樣式 D 在正式平台維持 fail-closed。
16. **Workspace／暫存 JSON schema 未新增 Logo 欄位**：無 Logo state、無 Logo 欄位、無 schema 版本變更、Editor 未出現 Logo 欄位。
17. **版位 01 Export 行為未變**：D－01 輸出為 **JPG**、**72 dpi**、最終檔案 **≤ 245,000 bytes**，且沿用既有 quality／compression 邏輯。
18. 未建立 generic Type／template framework、plugin 機制或通用圖片置中 helper。

---

### 17. Phase Boundary（階段邊界）

- **本輪為 Phase 1 Requirement**，僅建立本文件。
- 本輪**未** Coding、**未**修改任何程式碼／HTML／CSS／JS／JSON／素材。
- 本輪**未**進入 Phase 2 Investigation、Phase 3 Proposal、Phase 4 Implementation／Validation。
- 本輪**未** Stage、Commit、Push、Tag、Release。
- 本輪**未**做 Documentation Update（未修改任何既有文件）。
- 本輪**未**處理 D－02～17、樣式 C 或其他未要求問題。
- 後續 Phase 2 起始前，本文件需經 Jamie／GPT Review PASS。
- 本文件所引用的 Repository 現況均為 D－01 Investigation 的**實證描述**；所有 D－01 專屬行為均為**尚未實作的需求**，不得解讀為已完成。

### 18. D－01 Implementation Outcome（完成狀態補記）

> （後續同步）本文件全部 Requirement 條文與裁決均未改寫，僅補記完成狀態。D－01 已依本文件與 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 的「D－01 Proposal」章節 完成 Phase 2 Investigation、Phase 3 Proposal、Phase 4 Coding，並經 Phase 6 Jamie 親自開啟 `bn/launch/D/01_DDcard BN.command` 完成人工對位驗證且明確 PASS。Code Commit 為 `1139a7c3eca005b15c24bef7751ebb0ada740fe1`（`feat(bn): add D01 DDcard template`，parent `88bd112729a061d012c23d780c4d6718766c8823`），精確包含 `bn/templates/D/01-ddcard-bn.js`、`bn/launch/D/01_DDcard BN.command`（Git mode `100755`）、`bn/launch/viewer.html`（只服務 D－01 的校稿 branch 最小修改）與第 3.1 節三個 D－01 素材；`git diff --check HEAD^ HEAD` PASS。第 6.2 節 placement、第 7 節 Logo contain（destination 350 × 50、`x = 90.5`、`y = 103`，保留 fractional、未 rounding、未 stretch／cover／crop）、第 8 節 Medium local 2×、第 5.1 節 `$`／`%` formatting 與第 16 節第 1～10、12～16、18 條 Acceptance Criteria 均已達成。第 16 節第 11 條之「正式 Preview ↔ Export 像素一致性實測」與第 17 條之「JPG／72 dpi／≤245,000 bytes 實測」維持第 12 節與第 17 節所述邊界，**deferred until D platform integration**；本次完成的是 D－01 renderer 與人工對位驗證，**不是 D 樣式正式平台整合**。目前正式支援的樣式仍為 A 與 B，`SUPPORTED_TYPES` 仍為 `["A", "B"]`，`ASSET_BASE_BY_TYPE` 仍只有 A 與 B，樣式 D 在正式平台維持 fail-closed；D－02～17 尚未完成，樣式 C 不在本文件範圍。落地狀態另見 `FSS_BN_Architecture.md` 第 39 節與 `FSS_BN_Template_Requirement_Specification_v1.0.md` 第 5.2 節。

---

## 6. Deferred／Unconfirmed D Requirements（尚待確認、尚未完成項目）

### 6.1 正式 platform integration 尚未完成

- **目前正式支援的樣式仍為 A 與 B。** `bn/js/import.js` 的 `SUPPORTED_TYPES` 仍為 `["A", "B"]`；`bn/js/render-a.js` 的 `ASSET_BASE_BY_TYPE` 仍只有 A 與 B；`A_TABLE` 未加入 type 維度、未加入任何 D entry。
- 樣式 D 在正式平台**維持 fail-closed**：Import 在 worksheet lookup 前明確 reject、Preview 明確失敗且不 fallback 至 A 或 B 背景、Export 因 render 階段即失敗而不產出任何成品、`type` 為 D 的暫存 JSON 一律 reject。UI 可選擇 D 樣式卡片**不代表** D 已支援。
- D 的正式 **Excel worksheet Import、Restore、控制台 Preview 與 Export 均尚未 enable**。
- D－01 的**正式 Preview ↔ Export 一致性實測**，以及版位 01 的 **JPG／72 dpi／≤245,000 bytes 實測**，**deferred until D platform integration**。
- 「D 有自己的 worksheet `D`、工單配置與 A／B 相同」屬**已確認產品需求**，是未來 D platform integration 應遵循的依據，**不代表目前平台已可 Import D**。
- D－01 已完成的是「D－01 renderer ＋ 人工對位驗證」，**不是「D 樣式正式平台整合完成」**。

### 6.2 尚待 Jamie 確認的版位 Requirement

- D－02～17 的 Requirement 尚未確認（狀態見第 4 節）。本文件**不得**預填其 placement、Logo geometry、文字框、renderer design、Excel mapping 或驗收標準。
- 第 3.3 節「01、02、03、06、07、08、09、10、12 已確認存在文字位置與額外 Logo 位置差異」只確認**差異存在**；實際數值必須逐版位由 Jamie 提供。
- 15～17 雖已確認與 A／B 相同，但**尚未進入開發**，其實作方式仍待對應 Phase 處理。
- D－01 的 D-specific template 架構裁決（見第 5 節內部第 9 節）**只代表 D－01**，不得據此推論其餘 D 版位都必須建立 D-specific template。

### 6.3 明確不在本文件範圍

樣式 C 完全不在本文件範圍。樣式 A 與 B 已封箱，本文件不重新設計、不修改其行為。本文件不建立 generic framework、plugin system、跨 Type 抽象層或未來 C／D 共用架構。

---

## 7. Phase／Change History（階段與變更紀錄）

| 日期 | 變更 | 說明 |
|---|---|---|
| 2026-08-24 | 建立樣式 D 總 Requirement | 依 Jamie 裁決之樣式 D 文件策略，將 D－01 於 Phase 1 建立並經 GPT Review PASS 的原始 Requirement 全文整併為本文件第 5 節，未刪減任何條文；同時新增第 2 節文件治理規則、第 3 節 D 全域已確認規則、第 4 節逐版位狀態索引、第 6 節 deferred 項目與本節。D－01 原本的 standalone Requirement 檔案於整併後移除（該檔從未進入任何 Commit，故不屬 Git tracked deletion）。 |
| 2026-08-24 | 補記 D－01 完成狀態 | D－01 Phase 4 Coding 完成、Phase 6 Jamie 人工對位驗證 PASS、Code Commit `1139a7c3eca005b15c24bef7751ebb0ada740fe1`（`feat(bn): add D01 DDcard template`）。詳見第 5 節內部第 18 節。 |
| 2026-08-24 | 新增 D－02 Requirement | D－02（`02_MALL HBN`）Requirement 經 Jamie 確認、Phase 4 Coding 完成、Phase 6 Jamie 人工對位驗證 PASS、Code Commit `9c9272704517743ae7d8ccdd73c5a5a7bae8c534`（`feat(bn): add D02 MALL HBN template`）。新增第 8 節並更新第 4 節索引與文件標頭狀態；第 1～7 節既有條文（含 D－01 第 5 節）未改寫。為避免變動既有章節編號與交叉引用，D－02 章節以附加方式置於第 7 節之後。 |

後續變更一律以新增列的方式追加，不改寫既有列。

---

## 8. D－02（`02_MALL HBN`）Requirement

> 本節為 D－02 正式 Requirement。D－02 與樣式 A／B 的 `02_MALL HBN` **共用同一組已確認的文字內容模型與視覺樣式**，真正的差異只有「新增固定 Logo」一項；因此本節只記錄 D－02 真正不同與需追蹤的內容，其餘一律引用第 3 節 D 樣式全域已確認規則與既有 A／B－02 正式規格，不重複複製背景說明。

### 8.1 版位與 canvas

- 版位 ID `02`，名稱 `02_MALL HBN`。
- 正式 canvas **1200 × 360**，與 A／B－02 相同。

### 8.2 素材

| 用途 | 路徑 | 實證 |
|---|---|---|
| 正式底圖 | `bn/assets/D/底圖/02_MALL HBN.jpg` | JPEG 1200 × 360 |
| 人工對位圖 | `bn/assets/D/對位/02_MALL HBN.png` | PNG 1200 × 360；只供人工 overlay 校稿，**不得**進入正式 Preview 或 Export 產出 |
| 固定共用 Logo | `bn/assets/D/Logo.png` | PNG 原始 **784 × 112**；**已由 D－01 Code Commit 納管，D－02 只引用，不新增第二份、不修改** |

### 8.3 資料來源

沿用第 3.1 節：D 有自己的 worksheet `D`，工單配置與 A／B 相同；D－02 屬 01～12 區間，來源為 `B15 = headline`、`B16 = subheadline`、`B17 = protectionText`。此為**已確認產品需求**，是未來 D platform integration 應遵循的依據；**目前平台尚未 enable D，不代表 D Excel Import 已可使用**（見第 8.10 節）。

固定 Logo 不是資料：不由 Excel 帶入、不由使用者上傳、不進入 Editor、不進入 Workspace state、不進入暫存 JSON schema、不進入 Import mapping（沿用第 3.5 節全域規則）。

### 8.4 Typography、字數與特殊 formatting（完全沿用 A／B－02）

| 內容 | Font | Color | 字數上限 |
|---|---|---|---|
| headline | `30pt "ShopeeNotoSans Medium"` | `#ffffff` | 8 |
| subheadline | `45pt "ShopeeNotoSans Bold"` | `#fff285` | 7 |
| subheadline 之 `$`／`%` | `37pt "ShopeeNotoSans Bold"` | `#fff285` | （同上） |
| protectionText | `18pt "ShopeeNotoSans Medium"` | `#a6f4e6` | 17 |

字數規則沿用 01～12 shared（半形計 0.5）。`$`／`%` 沿用既有特殊 formatting（獨立 37pt run ＋ 相鄰 ordinary run 邊界字 ink-bottom 對齊），不重新定義。

### 8.5 Geometry

三個文字 box **與 A／B－02 完全相同，一字未改**：

| 元素 | left | top | width | height |
|---|---|---|---|---|
| headline | 98 | 153 | 351 | 37 |
| subheadline | 98 | 200 | 445 | 57 |
| protectionText | 98 | 273 | 445 | 22 |

D－02 新增固定 Logo box：**`{left: 98, top: 96, width: 351, height: 50}`**。

文字定位沿用既有 **ink bounding-box 靠左＋靠上** 行為（A／B－02 本即如此），不改為置中、不加 padding／inset、不另立算法。

### 8.6 Logo Rendering Requirement

- Logo 必須**保持原始 aspect ratio**、**完整顯示**；**禁止 stretch、禁止 cover、禁止 crop／source clipping**。
- contain 算術（source 784 × 112 對 box 351 × 50）：`scale = min(351/784, 50/112) = 25/56`；**destination 350 × 50 @ x = 98、y = 96**。
- **水平靠左**：destination x 以 box `left` 為基準（98），右側自然留 1px 餘量，此為靠左＋contain 的正確結果。垂直餘量恰為 0（destination height 50 == box height 50），故靠上與置中結果相同，取 box `top` = 96。四個 destination 值皆為整數，不需亦不得額外取整。
- Logo 繪製使用 renderer-local 高品質 image smoothing（自成一組 save → `imageSmoothingEnabled = true` → `imageSmoothingQuality = "high"` → drawImage → restore），不依賴 Medium 2× 的 smoothing state、不放入 Medium 2× surface、不建立共用 Logo helper。
- Logo PNG alpha 由既有 `source-over` 與 `globalAlpha = 1` 自然合成，不新增 blending／compositing。

**D－02 的 Logo box 只適用 D－02**，不得據此推論其他 D 版位的 Logo 位置或尺寸（沿用第 3.4 節）。

### 8.7 Medium local 2×

沿用 A／B－02 既有機制：**template-local** 2× 常數、offscreen **2400 × 720**、以同一組 1× layout 座標繪製，**只處理 headline ＋ protectionText**；**Bold subheadline 不進 2×**、**Logo 亦不進 2×**；最後以高品質 smoothing 降回 1200 × 360。不建立共用 scale helper／framework。

### 8.8 完整 draw order

**background → Logo → Medium local 2×（headline ＋ protectionText）→ Bold subheadline。** 四個 box 互不重疊。

### 8.9 Renderer 與人工對位驗證

- D－02 使用 D-specific template `bn/templates/D/02-mall-hbn.js`，exports 為 `waitForMallHbnFonts` 與 `renderMallHbn`；固定素材以 `{ backgroundImage, logoImage }` images object 傳入。**不修改已封箱的 A－02 template、不加 D branch。**
- 人工對位啟動檔 `bn/launch/D/02_MALL HBN.command`，query `?type=D&bn=02_MALL%20HBN`；`bn/launch/viewer.html` 已做最小 additive D－02 branch。啟動檔與 viewer 僅為人工校稿工具，不是第二套正式 renderer、不是正式 Generator Preview。
- 對位圖只作 DOM overlay 供人工比對，Logo 由 D－02 renderer 真正畫進 canvas。

### 8.10 尚未完成的邊界（deferred）

- **本次完成的是「D－02 renderer ＋ 人工對位驗證」，不是「D 樣式正式平台整合完成」。**
- 目前正式支援的樣式仍為 **A 與 B**；`SUPPORTED_TYPES` 仍為 `["A", "B"]`，`ASSET_BASE_BY_TYPE` 仍只有 A 與 B，正式 renderer registry 尚未 enable D，樣式 D 在正式平台**維持 fail-closed**（詳見第 6.1 節）。
- D 的正式 Excel worksheet Import、Restore、控制台 Preview 與 Export **尚未 enable**。
- 版位 02 既有鎖定的 Export 規則為 **JPG、72 dpi、最終檔 ≤ 145,000 bytes**（由既有 `EXPORT_ITEMS` 以版位 id 提供，與樣式 type 無關）。此為**既有鎖定規則**；D－02 本次逐版位工作**未執行正式 D Export 實測**，該實測 **deferred until D platform integration**，不得記為已驗證。
- D－02 正式 Preview ↔ Export 一致性實測同樣 deferred。
- D－03～17 尚未完成；本節裁決只代表 D－02，不得預先補完其他版位的 geometry、Logo 位置、文字差異或 renderer 路徑。樣式 C 不在本節範圍。

### 8.11 D－02 Implementation Outcome（完成狀態）

D－02 已完成 Phase 4 Coding，並經 **Phase 6 Jamie 親自開啟 `bn/launch/D/02_MALL HBN.command` 完成人工對位驗證且明確 PASS**。

Code Commit 為 **`9c9272704517743ae7d8ccdd73c5a5a7bae8c534`**（`feat(bn): add D02 MALL HBN template`，parent `e77fe6b96ebc32aba2159ddb9a010e88f3bbec4d`），`git diff --check HEAD^ HEAD` PASS，**精確包含 5 個路徑**：

- `bn/templates/D/02-mall-hbn.js`（新增）
- `bn/launch/D/02_MALL HBN.command`（新增，Git mode `100755`）
- `bn/launch/viewer.html`（最小 additive D－02 branch）
- `bn/assets/D/底圖/02_MALL HBN.jpg`（新增納管）
- `bn/assets/D/對位/02_MALL HBN.png`（新增納管）

`bn/assets/D/Logo.png` **不在本次 commit 內**（已由 D－01 納管，D－02 僅引用）。A／B templates、A／B launchers、A／B assets、D－01 template／launcher、正式平台六個核心 JS 與所有文件於本次 Code Commit 全部零修改。
