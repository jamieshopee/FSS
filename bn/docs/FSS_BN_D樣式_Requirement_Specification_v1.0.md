# FSS BN — 樣式 D Requirement Specification v1.0

**文件性質**：樣式 D 跨 `01`～`17` 版位的**持續累積** Requirement，單一總文件
**文件策略**：樣式 D 不建立逐版位 Requirement 文件；所有 D 版位的 Requirement 集中於本文件（見第 2 節）
**目前狀態**：D－01、D－02、D－03、D－06、D－07、D－08 已確認並完成，皆經 Phase 6 Jamie 人工對位驗證 PASS；D－04、D－05、D－09～17 尚待逐一確認
**D－01 Code Commit**：`1139a7c3eca005b15c24bef7751ebb0ada740fe1`（`feat(bn): add D01 DDcard template`）
**D－02 Code Commit**：`9c9272704517743ae7d8ccdd73c5a5a7bae8c534`（`feat(bn): add D02 MALL HBN template`）
**D－03 Code Commit**：`024c621e2c61bd40d3b736af7487b22e332d0273`（`feat(bn): add D03 Coin page BN template`）
**D－06 Code Commit**：`5def9469d21336787dc35553ff7a17ffde9eac48`（`feat(bn): add D06 IG template`）
**D－07 Code Commit**：`b35507340ad12cb976bdc08d96278df756e9b272`（`feat(bn): add D07 FB POST template`）
**D－08 Code Commit**：`d9359270fea1bd89e96a2eb27c4464b50e0ef6dc`（`feat(bn): add D08 SPX TVBN 1 template`，parent `1c9e12782279491395fa5e0f7c9a2da7629f1ac9`）
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
| `03_Coin page BN` | **已確認**（Jamie 正式裁決） | **已完成**；Phase 6 Jamie 人工對位驗證 PASS；Code Commit `024c621e2c61bd40d3b736af7487b22e332d0273` | 第 9 節 |
| `04_Loyalty BN` | 尚待 Jamie 確認 | 尚未開發 | — |
| `05_MSBN` | 尚待 Jamie 確認 | 尚未開發 | — |
| `06_IG` | **已確認**（Jamie／GPT 正式裁決） | **已完成**；Phase 6 Jamie 人工 1:1 overlay 對位驗證 PASS；Code Commit `5def9469d21336787dc35553ff7a17ffde9eac48` | 第 10 節 |
| `07_FB POST` | **已確認**（Jamie／GPT 正式裁決） | **已完成**；Phase 6 Jamie 人工 1:1 overlay 對位驗證 PASS；Code Commit `b35507340ad12cb976bdc08d96278df756e9b272` | 第 11 節 |
| `08_SPX TVBN_1` | **已確認**（Jamie／GPT 正式裁決） | **已完成**；Phase 6 Jamie 人工 1:1 overlay 對位驗證 PASS；Code Commit `d9359270fea1bd89e96a2eb27c4464b50e0ef6dc` | 第 12 節 |
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
| 2026-08-24 | 新增 D－03 Requirement（Phase 1） | D－03（`03_Coin page BN`）Requirement 經 Jamie 正式裁決確認，**僅完成 Phase 1，尚未 Coding、尚未人工驗證、尚無 Code Commit**。Logo box 正式採 `{left:92, top:107, width:351, height:50}`；原 Photoshop CSS `{687, 508, 351, 50}` 判定為誤植並已更正（該 `top` 在 1200 × 391 canvas 上垂直無效）。新增第 9 節並更新第 4 節索引與文件標頭狀態；第 1～8 節既有條文（含 D－01 第 5 節、D－02 第 8 節）未改寫。為避免變動既有章節編號與交叉引用，D－03 章節以附加方式置於第 8 節之後。 |
| 2026-08-24 | 補記 D－03 完成狀態 | D－03（`03_Coin page BN`）Phase 4 Coding 完成、Phase 6 Jamie 人工對位驗證 PASS、Code Commit `024c621e2c61bd40d3b736af7487b22e332d0273`（`feat(bn): add D03 Coin page BN template`，parent `de1d98a70aa6e29e95397a913a46e0a30e01b7af`）。新增第 9.15 節並更新文件標頭狀態、第 4 節索引，以及第 9 節導言、第 9.2、9.9、9.11 節中已因本次完成而過時的狀態文字；**第 9 節既有 LOCKED 規格（canvas、Logo box、三文字 geometry、typography、`$`／`%` formatting、Medium local 2×、draw order）與 Acceptance Criteria 均未改值、未重寫**，第 1～8 節（含 D－01 第 5 節、D－02 第 8 節）未改寫。正式平台仍維持 A／B fail-closed，D－04～17 未處理。 |
| 2026-08-24 | 新增 D－06 Requirement（Phase 1） | D－06（`06_IG`）Requirement 經 Jamie／GPT 正式裁決確認，**僅完成 Phase 1，尚未 Coding、尚未人工驗證、尚無 Code Commit**。canvas `900 × 1600`；正式四個 box 由對位圖 alpha 連通元件分析＋A－06 renderer `IG_LAYOUT` 交叉驗證後裁決為 Logo `{left:161, top:282, width:580, height:82}`、headline `{175,387,550,65}`、subheadline `{136,472,630,82}`、protectionText `{136,573,630,37}`；原 Photoshop／CSS 的 `left`（`2020`／`2034`／`1995`）判定為座標偏移資料（`Δleft = 1859`、`Δtop = 0`、width／height 一致），僅作更正依據保留、不得再作正式 geometry。Logo 於 box 內**水平＋垂直置中**（`scale = 41/56`、destination `574 × 82` @ `(164, 282)`、左右各 3px、上下 0px、四值皆整數），與 D－02／D－03 的靠左規則不同，只代表 D－06。新增第 10 節並更新第 4 節索引與文件標頭狀態；第 1～9 節既有條文（含 D－01 第 5 節、D－02 第 8 節、D－03 第 9 節）未改寫。為避免變動既有章節編號與交叉引用，D－06 章節以附加方式置於第 9 節之後。D－04、D－05、D－07～17 狀態未變動，仍為尚待確認。 |
| 2026-08-25 | 補記 D－06 完成狀態 | D－06（`06_IG`）Phase 4 Coding 完成、Phase 6 Jamie 人工 1:1 overlay 對位驗證 PASS、Code Commit `5def9469d21336787dc35553ff7a17ffde9eac48`（`feat(bn): add D06 IG template`，parent `5a2ba2ffa40254f2b3c45cab5e8fa4051b9505db`），精確包含 5 paths（1 M ＋ 4 A），launcher Git mode `100755`；`bn/assets/D/Logo.png` 僅引用、未再次納管。新增第 10.16 節並更新文件標頭狀態、第 4 節索引，以及第 10 節導言、第 10.2、10.11、10.12 節中已因本次完成而過時的狀態文字；**第 10 節既有 LOCKED 規格（canvas、Logo box、三文字 geometry、typography、`$`／`%` formatting、centered ink alignment、Medium local 2×、draw order、Logo contain 算術）與 Acceptance Criteria 均未改值、未重寫**，第 1～9 節（含 D－01 第 5 節、D－02 第 8 節、D－03 第 9 節）未改寫。正式平台仍維持 A／B fail-closed，D－04／05／07～17 與樣式 C 未處理。 |

| 2026-08-25 | 新增 D－07 Requirement（Phase 1） | D－07（`07_FB POST`）Requirement 經 Jamie／GPT 正式裁決確認，**僅完成 Phase 1，尚未 Coding、尚未人工驗證、尚無 Code Commit**。canvas `1200 × 630`；正式四個 box 由對位圖 alpha 連通元件分析＋A－07 renderer `FB_POST_LAYOUT` 交叉驗證後裁決為 Logo `{left:54, top:201, width:365, height:52}`、headline `{54,266,405,49}`、subheadline `{54,325,475,62}`、protectionText `{54,401,475,28}`；原 Photoshop／CSS Logo `left`（`2877`）判定為座標偏移資料（`Δleft = 2823`、`Δtop = 0`、top／width／height 原值正確），僅作更正依據保留、不得再作正式 geometry。Logo 於 box 內**水平靠左＋垂直置中**（`scale = 13/28`、destination `364 × 52` @ `(54, 201)`、左 0px／右 1px／上 0px／下 0px、四值皆整數）。三文字沿用 A／B－07 的 **LeftCentered**（水平靠左＋垂直 ink 置中）與 typography；Medium local 2× = `2400 × 1260`。新增第 11 節並更新第 4 節索引與文件標頭狀態；第 1～10 節既有條文（含 D－01 第 5 節、D－02 第 8 節、D－03 第 9 節、D－06 第 10 節）未改寫。為避免變動既有章節編號與交叉引用，D－07 章節以附加方式置於第 10 節之後。D－04、D－05、D－08～17 狀態未變動，仍為尚待確認。 |
| 2026-08-25 | 補記 D－07 完成狀態 | D－07（`07_FB POST`）Phase 4 Coding 完成、Phase 6 Jamie 人工 1:1 overlay 對位驗證 PASS、Code Commit `b35507340ad12cb976bdc08d96278df756e9b272`（`feat(bn): add D07 FB POST template`，parent `17249b983d4e0c9943a75f6f273865fda984d647`），精確包含 5 paths（1 M ＋ 4 A），launcher Git mode `100755`；`bn/assets/D/Logo.png` 僅引用既有 tracked asset、未再次納管。helper preservation 如實記錄為 **6/8 byte-identical ＋ 2/8 behavior-equivalent（`measureRun`、`boundaryGlyphInkBottom` 僅 runtime error message `A－07`→`D－07`），實質差異 0/8**，非 8/8。新增第 11.16 節並更新文件標頭狀態、第 4 節索引，以及第 11 節導言、第 11.2、11.11、11.12 節中已因本次完成而過時的狀態文字；**第 11 節既有 LOCKED 規格（canvas、四個 box、typography、LeftCentered、`$`／`%` formatting、Medium local 2×、draw order、Logo contain 算術）與 Acceptance Criteria 均未改值、未重寫**，第 1～10 節（含 D－01 第 5 節、D－02 第 8 節、D－03 第 9 節、D－06 第 10 節）未改寫。正式平台仍維持 A／B fail-closed，D－04／05／08～17 與樣式 C 未處理。 |

| 2026-08-25 | 新增 D－08 Requirement（Phase 1） | D－08（`08_SPX TVBN_1`）Requirement 經 Jamie／GPT 正式裁決確認，**僅完成 Phase 1，尚未 Coding、尚未人工驗證、尚無 Code Commit**。canvas `1080 × 1920`；四個正式 box 為 Logo `{left:147, top:364, width:785, height:112}`、headline `{167,507,745,87}`、subheadline `{94,619,890,114}`、protectionText `{94,759,890,51}`（三文字完整沿用 A／B－08 `SPX_TVBN_1_LAYOUT`）。原 Photoshop／CSS `{left:2006, top:2065, width:785, height:112}` 判定為座標偏移資料（D－08 自身 `Δleft = 1859`、`Δtop = 1701`，width／height 不變），僅作歷史更正證據、不得作正式 geometry；D－08 是首個 `Δtop ≠ 0` 的版位，且雖 `Δleft` 數值與 D－06 相同亦不得建立共用 offset 規則。D 對位圖 protectionText 標記 `{94,760,890,50}` 與 A／B 相差 1px，已裁決為**對位標記 1px 差異、不是新 geometry**，正式值採 `759`／`51`。Logo 在 box 內**水平＋垂直置中**：`scale = 1`（height-bound）、destination `784 × 112 @ (147.5, 364)`、左右各 0.5px、上下各 0px；**fractional `147.5` 原值保留**（比照 D－01 precedent），禁止任何取整。三文字沿用 A／B－08 **centered ink** 與 typography（`70pt Medium #ffffff`／`90pt Bold #fff285`／`$`／`%` `75pt Bold`／`40pt Medium #a6f4e6`）；Medium local 2× = `2160 × 3840`。新增第 12 節並更新第 4 節索引與文件標頭狀態；第 1～11 節既有條文（含 D－01 第 5 節、D－02 第 8 節、D－03 第 9 節、D－06 第 10 節、D－07 第 11 節）未改寫。為避免變動既有章節編號與交叉引用，D－08 章節以附加方式置於第 11 節之後。D－04、D－05、D－09～17 狀態未變動，仍為尚待確認。 |

| 2026-08-25 | 補記 D－08 Implementation Outcome | D－08（`08_SPX TVBN_1`）Phase 2 Repository Investigation（substantive conflict = 0）、Phase 3 Proposal、Phase 4 Coding 完成，並經 Phase 6 Jamie 親自開啟 `bn/launch/D/08_SPX TVBN_1.command` 完成人工 1:1 overlay 對位驗證且明確 PASS；Code Commit `d9359270fea1bd89e96a2eb27c4464b50e0ef6dc`（`feat(bn): add D08 SPX TVBN 1 template`，parent `1c9e12782279491395fa5e0f7c9a2da7629f1ac9`）。新增第 12.16 節並最小更新文件標頭狀態、標頭 Code Commit 清單、第 4 節索引、第 12 節導言、第 12.11 節標題與末條、第 12.15 節；**第 12.1～12.15 節的 LOCKED geometry／typography／Logo 算術／Acceptance Criteria 數值一律未改寫**，第 1～11 節（含 D－01 第 5 節、D－02 第 8 節、D－03 第 9 節、D－06 第 10 節、D－07 第 11 節）未改寫。protectionText 落地採 `{94,759,890,51}`，對位標記 `{94,760,890,50}` 維持「已裁決 1px 標記差異、不得採用」語境；`2006`／`2065` 維持歷史更正語境；`Δleft = 1859`／`Δtop = 1701` 僅記為 D－08 獨立實證。helper preservation 如實記錄為 6/11 byte-identical ＋ 5/11 message-only behavior-equivalent、實質差異 0/11，非 11/11。正式平台六個核心 JS 零修改，D 仍 fail-closed；正式 D Preview／Export、Excel Import／Restore 與版位 08 Export 實測維持 deferred。 |

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

---

## 9. D－03（`03_Coin page BN`）Requirement

> 本節為 D－03 正式 Requirement，**階段為 Phase 1**。D－03 與樣式 A／B 的 `03_Coin page BN` **共用同一組已確認的文字內容模型與視覺樣式**，真正的差異只有「新增固定 Logo」一項；因此本節只記錄 D－03 真正不同與需追蹤的內容，其餘一律引用第 3 節 D 樣式全域已確認規則與既有 A／B－03 正式規格，不重複複製背景說明。
>
> **本節條文與裁決均未改寫。** 本節原以「尚未實作的需求」寫成（Phase 1 當時 D－03 尚未 Coding）；D－03 現已完成 Phase 4 Coding 並經 Phase 6 Jamie 人工對位驗證 PASS，Code Commit `024c621e2c61bd40d3b736af7487b22e332d0273`（`feat(bn): add D03 Coin page BN template`）。完成狀態與實際落地內容補記於第 9.15 節；本節其餘敘述中的「未來／預定」語氣屬 Phase 1 歷史用語，其所定義的規格與驗收要求不變。**本次完成的是「D－03 renderer ＋ 人工對位驗證」，不是「D 樣式正式平台整合完成」。**

### 9.1 版位與 canvas

- 版位 ID `03`，名稱 `03_Coin page BN`。
- 正式 canvas **1200 × 391**，與 A／B－03 相同。

### 9.2 素材

| 用途 | 路徑 | 實證 |
|---|---|---|
| 正式底圖 | `bn/assets/D/底圖/03_Coin page BN.jpg` | JPEG **1200 × 391**（與 canvas 完全一致） |
| 人工對位圖 | `bn/assets/D/對位/03_Coin page BN.png` | PNG **1200 × 391**；只供人工 overlay 校稿，**不得**進入正式 Preview 或 Export 產出 |
| 固定共用 Logo | `bn/assets/D/Logo.png` | PNG 原始 **784 × 112**；**已由 D－01 Code Commit 納管，D－03 只引用，不新增第二份、不修改、不重存** |

底圖與對位圖在 Phase 1 當時為 untracked；兩者已於 D－03 Code Commit `024c621e2c61bd40d3b736af7487b22e332d0273` 正式納管（見第 9.15 節）。`bn/assets/D/Logo.png` 仍為 D－01 納管之共用素材，D－03 僅引用、未重新納管。

### 9.3 資料來源

沿用第 3.1 節：D 有自己的 worksheet `D`，工單配置與 A／B 相同；D－03 屬 01～12 區間，來源為 `B15 = headline`、`B16 = subheadline`、`B17 = protectionText`。此為**已確認產品需求**，是未來 D platform integration 應遵循的依據；**目前平台尚未 enable D，不代表 D Excel Import 已可使用**（見第 9.11 節）。D－03 **不新增任何專屬資料欄位**。

固定 Logo 不是資料：不由 Excel 帶入、不由使用者上傳、不進入 Editor、不進入 Workspace state、不進入暫存 JSON schema、不進入 Import mapping（沿用第 3.5 節全域規則）。

### 9.4 Typography、字數與特殊 formatting（完全沿用 A／B－03）

以 `bn/templates/A/03-coin-page-bn.js` 正式 renderer 為準，**不得重新設計**：

| 內容 | Font | Color | 字數上限 |
|---|---|---|---|
| headline | `37pt "ShopeeNotoSans Medium"` | `#ffffff` | 8 |
| subheadline | `50pt "ShopeeNotoSans Bold"` | `#fff285` | 7 |
| subheadline 之 `$`／`%` | `40pt "ShopeeNotoSans Bold"` | `#fff285` | （同上） |
| protectionText | `21pt "ShopeeNotoSans Medium"` | `#a6f4e6` | 17 |

⚠️ A／B－03 的字級與 A／B－01、A／B－02 **不同**（01／02 為 30／45／37／18pt）。D－03 必須採上表 **37／50／40／21pt**。

字數規則沿用 01～12 shared LOCKED 規則（半形計 0.5），不新增 D－03 專屬字數規則。`$`／`%` 完整沿用既有特殊 formatting：獨立 `40pt` Bold run ＋ 相鄰 ordinary run 的 **boundary glyph ink-bottom 對齊**（`$` 對齊後方、`%` 對齊前方，含反向 fallback），不重新定義。

### 9.5 Geometry

三個文字 box **與 A／B－03 完全相同，一字未改**：

| 元素 | left | top | width | height |
|---|---|---|---|---|
| headline | 92 | 168 | 395 | 46 |
| subheadline | 92 | 225 | 500 | 64 |
| protectionText | 92 | 302 | 500 | 25 |

D－03 新增固定 Logo box：**`{left: 92, top: 107, width: 351, height: 50}`**（Jamie 已正式裁決值）。

⚠️ 原 Photoshop CSS 的 `{left: 687, top: 508, width: 351, height: 50}` **為已更正的原始誤植，不得再作為 D－03 正式座標**（該 `top` 在 1200 × 391 canvas 上垂直完全無效）。

四個 box 全部落在 canvas 內（右緣最大 592 < 1200、下緣最大 327 < 391），且**互不重疊**（垂直間隙依序 11 / 11 / 13 px）。

文字定位沿用 A－03 既有 **ink bounding-box 靠左＋靠上** 行為：`textAlign = "left"`、`textBaseline = "alphabetic"`，`x = box.left − inkLeft`、`y = box.top − inkTop`（混合副標則以全 run ink bbox 聯集靠左靠上貼齊）。**禁止**改為 `center`／`middle`、**禁止**新增 padding／inset、**禁止**發明新的 alignment 算法。

### 9.6 Logo Rendering Requirement

- Logo 必須**保持原始 aspect ratio**、**完整顯示**；**禁止 stretch、禁止 cover、禁止 crop／source clipping**（`drawImage` source rect 須為完整原圖）。
- contain 算術（source 784 × 112 對 box 351 × 50）LOCKED：`scale = min(351/784, 50/112) = **25/56**`；**render size 350 × 50**；**destination x = 92、y = 107**。
- **水平靠左**（不是水平置中）：destination x 以 box `left` 為基準（92），Logo 右緣為 442，**剩餘 1px 留在右側**，此為靠左＋contain 的正確結果；**禁止**為填滿 351px 而拉伸。垂直餘量恰為 0（render height 50 == box height 50），故取 box `top` = 107。四個 destination 值皆為整數，**禁止**自行 round／floor／ceil／trunc。
- Logo 繪製須使用 renderer-local 高品質 image smoothing（自成一組 `save()` → `imageSmoothingEnabled = true` → `imageSmoothingQuality = "high"` → `drawImage()` → `restore()`），**不得**依賴 Medium 2× 的 smoothing state、**不得**放入 Medium 2× surface、**不得**建立共用 Logo helper。
- Logo PNG alpha 由既有 `source-over` 與 `globalAlpha = 1` 自然合成，**不新增** blending／compositing。

**D－03 的 Logo box 只適用 D－03**，不得據此推論其他 D 版位的 Logo 位置或尺寸（沿用第 3.4 節）；亦不得把 D－01 的水平置中或 D－02 的座標套用於 D－03。

### 9.7 Medium local 2×

沿用 A／B－03 既有機制：**template-local** 2× 常數、offscreen **2400 × 782**（1200×2 × 391×2）、以**同一組 1× layout 座標**繪製，**只處理 headline ＋ protectionText**；**Bold subheadline 不進 2× pass**、**Logo 亦不進 2× pass**；最後以 `imageSmoothingEnabled = true`／`imageSmoothingQuality = "high"` 降回 1200 × 391。**禁止**抽成共用 2× helper／framework。

沿用 A－03（非 A－01）行為：A－03 **沒有**「headline／protectionText 皆空即早退」guard，D－03 亦不得加入該 guard。

### 9.8 完整 draw order

**background → Logo → Medium local 2×（headline ＋ protectionText）→ Bold subheadline。**

### 9.9 Renderer 與人工對位驗證需求（已於 Phase 4 實作、Phase 6 人工驗證 PASS）

- D－03 **未來必須**使用 D-specific template（比照 D－01／D－02 慣例，預定 `bn/templates/D/03-coin-page-bn.js`）；**不得**修改已封箱的 `bn/templates/A/03-coin-page-bn.js`、不得在其中加 D branch、不得與 D－01／D－02 合併成 generic D renderer、不得建立 D template registry framework。
- 固定素材（底圖、Logo）須由 caller 載入完成後以 images object 傳入 renderer；renderer 不自行 async 載圖、不建 image cache。
- D－03 **未來必須**有自己的獨立啟動檔（比照 D－01／D－02，預定 `bn/launch/D/03_Coin page BN.command`），並在既有 `bn/launch/viewer.html` 以**最小 additive** 分支提供人工對位校稿；啟動檔與 viewer 僅為人工校稿工具，**不是**第二套正式 renderer、**不是**正式 Generator Preview、**不是**正式資料輸入流程。
- 對位圖只作 DOM overlay 供人工比對；**Logo 必須由 D－03 renderer 真正畫進 canvas**，不得以 DOM overlay／CSS background／`<img>` 疊圖等 Preview-only 技巧呈現。
- 對位圖與 canvas 同為 1200 × 391，可作 1:1 overlay 座標基準。

### 9.10 Preview／Export 同一 renderer 要求（未來要求）

D－03 未來的正式 Preview 與 Export **必須走同一正式 renderer path**，不得另寫第二套視覺 renderer；Logo 與 placement 不得只在 Preview 或只在 Export 生效。此要求於 D platform integration 階段生效與驗證。

版位 03 既有鎖定的 Export 規則為 **JPG、72 dpi**（由既有 `EXPORT_ITEMS` 以版位 id 提供，與樣式 type 無關；**版位 03 無 byte 容量上限**，與 01 的 ≤245,000 bytes、02 的 ≤145,000 bytes 不同）。此為既有鎖定規則，D－03 不得重新設計。

### 9.11 尚未完成的邊界（deferred）與正式平台 fail-closed

- **D－03 已完成 Phase 1 Requirement、Phase 3 Proposal、Phase 4 Coding 與 Phase 6 Jamie 人工對位驗證（PASS）**，並已建立 renderer／launcher／viewer 分支與 Code Commit `024c621e2c61bd40d3b736af7487b22e332d0273`（見第 9.15 節）。已完成範圍**僅限單版位 renderer 與人工對位驗證**，以下正式平台項目仍未完成。
- 目前正式支援的樣式仍為 **A 與 B**；`bn/js/import.js` 的 `SUPPORTED_TYPES` 仍為 `["A", "B"]`，`bn/js/render-a.js` 的 `ASSET_BASE_BY_TYPE` 仍只有 A 與 B，`A_TABLE` 未加入 type 維度或任何 D entry，樣式 D 在正式平台**維持 fail-closed**（詳見第 6.1 節）。**本階段不得修改 `SUPPORTED_TYPES`、不得在 `ASSET_BASE_BY_TYPE` 加入 D、不得修改正式 Import。**
- D 的正式 Excel worksheet Import、Restore、控制台 Preview 與 Export **尚未 enable**。
- D－03 的正式 Preview ↔ Export 一致性實測，以及版位 03 的 JPG／72 dpi 實測，**deferred until D platform integration**，不得記為已驗證。
- D－04～17 尚未確認；本節裁決**只代表 D－03**，不得預先補完其他版位的 geometry、Logo 位置、文字差異或 renderer 路徑。樣式 C 不在本節範圍。

### 9.12 Explicit Non-Goals（本節明確不做）

1. 不修改 A／B 任何 template、launcher、assets 或既有行為（含 `bn/templates/A/03-coin-page-bn.js`）。
2. 不修改 D－01、D－02 已完成的 template、launcher 或其 Requirement 條文。
3. 不建立 generic abstraction／framework／plugin／共用 2× helper／共用 Logo helper／D template registry。
4. 不預建、不預留、不抽象化 D－04～17；不處理樣式 C。
5. 不正式 enable Type D；不修改正式平台六個核心 JS。
6. Logo 不進 Excel mapping／Editor／Workspace state／JSON schema。
7. 不新增 D－03 專屬資料欄位、不改字數規則、不新增 overflow 警告或自動縮字。
8. 不重新設計 Export 容量／格式／dpi 策略。
9. 本階段不 Coding、不建立 Proposal、不做 Documentation Update、不 Stage／Commit。

### 9.13 Acceptance Criteria（可驗證，全部為未來驗收項目）

1. D－03 正式輸出 canvas 為 **1200 × 391**。
2. 使用 `bn/assets/D/底圖/03_Coin page BN.jpg` 作為底圖，1:1 鋪滿 canvas、未縮放、未裁切。
3. Logo 固定取自 `bn/assets/D/Logo.png`，非 Excel 帶入、非使用者上傳、非 Editor 欄位；未新增第二份 Logo 素材。
4. Logo 保持原始 aspect ratio，以 **contain** 等比例縮放，**未變形、未 cover、未 crop**（source rect 完整）。
5. Logo render size 為 **350 × 50**，destination **x = 92、y = 107**；右側保留 1px 餘量；未做任何 rounding；未使用 `{687, 508}`。
6. 三個文字 box 座標為 headline `{92,168,395,46}`、subheadline `{92,225,500,64}`、protectionText `{92,302,500,25}`。
7. 三段文字採 **ink bounding-box 靠左＋靠上**（`textAlign="left"`／`textBaseline="alphabetic"`），未改用 center／middle、未加 padding／inset。
8. 三段文字視覺樣式與 A／B－03 相同：`37pt Medium #ffffff`／`50pt Bold #fff285`／`21pt Medium #a6f4e6`。
9. `$`／`%` 為 `40pt Bold` 且 boundary glyph ink-bottom 對齊行為未改變。
10. Medium 採 **template-local 2×**、offscreen **2400 × 782**、只涵蓋 headline ＋ protectionText；Bold subheadline 與 Logo 均未進 2× surface；未建立共用 2× helper。
11. draw order 為 **background → Logo → Medium 2× → Bold subheadline**；`globalCompositeOperation` 維持 `source-over`、`globalAlpha` 維持 `1`，未新增 blending／compositing。
12. Logo smoothing 為 renderer-local 且自成一組 `save`／`restore`，未依賴 Medium 2× 的 smoothing state。
13. D－03 使用 D-specific template；`bn/templates/A/03-coin-page-bn.js` 未被修改。
14. D－03 有獨立 `.command` 啟動檔，且可經既有 viewer 以對位圖做 1:1 人工 overlay 校稿；關閉 overlay 後 Logo 與三段文字仍留在 canvas 上。
15. A／B－01～17 與 D－01、D－02 的行為與輸出未改變。
16. `SUPPORTED_TYPES` 仍為 `["A", "B"]`；`ASSET_BASE_BY_TYPE` 仍只有 A 與 B；樣式 D 在正式平台仍 fail-closed。
17. Workspace／暫存 JSON schema 未新增 Logo 欄位；Editor 未出現 Logo 欄位。
18. D－04～17 無新增實作；未建立 generic framework／plugin／共用 helper。
19. **Deferred（不在本階段驗收）**：D－03 正式 Preview ↔ Export 一致性實測、D Excel worksheet Import 與 Restore、版位 03 的 JPG／72 dpi 實測 —— 全部 deferred until D platform integration。

### 9.14 Phase Boundary

- 本節為 **Phase 1 Requirement**，只定義「必須做到什麼」與「如何驗收」，**不指定實作方式**；模組切分、函式設計、參數介面、asset 載入時序等屬 Phase 2 Investigation 確認範圍與 Phase 3 Proposal 決定範圍。
- 本階段**未** Coding、**未**建立 Proposal、**未**做 Documentation Update（Architecture、Template Requirement、17 版位差異、全域 Requirement 的同步屬 D－03 完成後的 Documentation Update 階段）、**未** Stage／Commit／Push／Tag／Release。
- D－03 進入 Phase 2 之前，本節需經 Jamie／GPT Review PASS。

（本節為 Phase 1 當時的階段邊界歷史紀錄，保留不改寫；D－03 後續各階段的實際完成狀態見第 9.15 節。）

### 9.15 D－03 Implementation Outcome（完成狀態）

本節全部 Requirement 條文與裁決均未改寫，僅補記完成狀態。

D－03 已依第 9 節 Requirement 與 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 的「D－03」章節完成 Phase 2 Investigation、Phase 3 Proposal、Phase 4 Coding，並經 **Phase 6 Jamie 親自開啟 `bn/launch/D/03_Coin page BN.command` 完成人工對位驗證且明確 PASS**。

Code Commit 為 **`024c621e2c61bd40d3b736af7487b22e332d0273`**（`feat(bn): add D03 Coin page BN template`，parent `de1d98a70aa6e29e95397a913a46e0a30e01b7af`），`git diff --check HEAD^ HEAD` PASS，**精確包含 5 個路徑**：

- `bn/templates/D/03-coin-page-bn.js`（新增）
- `bn/launch/D/03_Coin page BN.command`（新增，Git mode `100755`）
- `bn/launch/viewer.html`（最小 additive D－03 branch）
- `bn/assets/D/底圖/03_Coin page BN.jpg`（新增納管）
- `bn/assets/D/對位/03_Coin page BN.png`（新增納管）

`bn/assets/D/Logo.png` **不在本次 commit 內**（已由 D－01 納管，D－03 僅引用、未修改、未重存、未建立第二份）。A／B templates、A／B launchers、A／B assets、D－01／D－02 template 與 launcher、正式平台六個核心 JS 與所有文件於本次 Code Commit 全部零修改。

已達成之 Acceptance Criteria：第 9.13 節第 1～18 條。落地實測值與第 9 節裁決完全一致 —— canvas **1200 × 391**；Logo box `{left:92, top:107, width:351, height:50}`（未使用已更正之誤植 `{687, 508, 351, 50}`）；Logo source 784 × 112 以 contain 縮放，`scale = min(351/784, 50/112) = 25/56`，destination **350 × 50**、`x = 92`、`y = 107`，右側保留 1px 餘量，source rect 完整、未 rounding、未 stretch／cover／crop；三文字 box `{92,168,395,46}`／`{92,225,500,64}`／`{92,302,500,25}`，typography 沿用 A／B－03（`37pt Medium #ffffff`／`50pt Bold #fff285`／`$`／`%` `40pt Bold`／`21pt Medium #a6f4e6`），ink bounding-box 靠左＋靠上（`textAlign="left"`／`textBaseline="alphabetic"`）；Medium template-local 2× offscreen **2400 × 782**、只涵蓋 headline ＋ protectionText，Bold subheadline 與 Logo 均未進 2× surface；draw order **background → Logo → Medium local 2× → Bold subheadline**。D－03 使用獨立 `bn/templates/D/03-coin-page-bn.js`，已封箱的 `bn/templates/A/03-coin-page-bn.js` 未被修改或取代，兩者的 8 個共用文字 helper 逐位元組相同。

第 9.13 節第 19 條之 deferred 項目維持不變：D－03 正式 Preview ↔ Export 一致性實測、D Excel worksheet Import 與 Restore、版位 03 的 **JPG／72 dpi**（既有 LOCKED 規則，**版位 03 無 byte 容量上限**）實測 —— 全部 **deferred until D platform integration**，本次**未執行** D Export 實測，不得記為已驗證。

**本次完成的是「D－03 renderer ＋ 人工對位驗證」，不是「D 樣式正式平台整合完成」。** 目前正式支援的樣式仍為 A 與 B，`SUPPORTED_TYPES` 仍為 `["A", "B"]`，`ASSET_BASE_BY_TYPE` 仍只有 A 與 B，樣式 D 在正式平台維持 fail-closed；D 的正式 Excel Import／Restore／控制台 Preview／Export 尚未 enable。D－04～17 尚未處理，樣式 C 不在本節範圍。落地狀態另見 `FSS_BN_Architecture.md` 第 41 節與 `FSS_BN_Template_Requirement_Specification_v1.0.md` 第 5.2.3 節。

---

## 10. D－06（`06_IG`）Requirement

> 本節為 D－06 正式 Requirement，**階段為 Phase 1**。D－06 與樣式 A／B 的 `06_IG` **共用同一組已確認的文字內容模型與視覺樣式**，真正的差異只有「新增固定 Logo」一項；因此本節只記錄 D－06 真正不同與需追蹤的內容，其餘一律引用第 3 節 D 樣式全域已確認規則與既有 A／B－06 正式規格，不重複複製背景說明。
>
> **本節條文與裁決均未改寫。** 本節原以「尚未實作的需求」寫成（Phase 1 當時 D－06 尚未 Coding）；D－06 現已完成 Phase 4 Coding 並經 Phase 6 Jamie 人工 1:1 overlay 對位驗證 PASS，Code Commit `5def9469d21336787dc35553ff7a17ffde9eac48`（`feat(bn): add D06 IG template`）。完成狀態與實際落地內容補記於第 10.16 節；本節其餘敘述中的「未來／預定」語氣屬 Phase 1 歷史用語，其所定義的規格與驗收要求不變。**本次完成的是「D－06 renderer ＋ 人工對位驗證」，不是「D 樣式正式平台整合完成」。**
>
> 本節依第 2 節文件治理規則以附加方式置於第 9 節之後，未變動第 1～9 節既有章節編號與交叉引用。D－04、D－05、D－07～17 的狀態不受本節影響，仍為「尚待 Jamie 確認」。

### 10.1 版位與 canvas

- 版位 ID `06`，名稱 `06_IG`。
- 正式 canvas **900 × 1600**，與 A／B－06 相同（`bn/templates/A/06-ig.js` 的 `IG_WIDTH = 900`、`IG_HEIGHT = 1600`）。

### 10.2 素材

| 用途 | 路徑 | 實證 |
|---|---|---|
| 正式底圖 | `bn/assets/D/底圖/06_IG.jpg` | JPEG **900 × 1600**（與 canvas 完全一致） |
| 人工對位圖 | `bn/assets/D/對位/06_IG.png` | PNG **900 × 1600**；只供人工 overlay 校稿，**不得**進入正式 Preview 或 Export 產出 |
| 固定共用 Logo | `bn/assets/D/Logo.png` | PNG 原始 **784 × 112**；**已由 D－01 Code Commit 納管，D－06 只引用，不新增第二份、不修改、不重存** |

底圖與對位圖在 Phase 1 當時為 untracked；兩者已於 D－06 Code Commit `5def9469d21336787dc35553ff7a17ffde9eac48` 正式納管（見第 10.16 節）。`bn/assets/D/Logo.png` 仍為 D－01 納管之共用素材，D－06 僅引用、未重新納管。

### 10.3 資料來源

沿用第 3.1 節：D 有自己的 worksheet `D`，工單配置與 A／B 相同；D－06 屬 01～12 區間，來源為 `B15 = headline`、`B16 = subheadline`、`B17 = protectionText`，字數規則沿用現有 shared LOCKED 規則。此為**已確認產品需求**，是未來 D platform integration 應遵循的依據；**目前平台尚未 enable D，不代表 D Excel Import 已可使用**（見第 10.12 節）。D－06 **不新增任何專屬資料欄位**。

固定 Logo 不是資料：不由 Excel 帶入、不由使用者上傳、不進入 Editor、不進入 Workspace state、不進入暫存 JSON schema、不進入 Import mapping（沿用第 3.5 節全域規則）。本階段**不得修改正式 Import、不得 enable worksheet D**。

### 10.4 Typography、字數與特殊 formatting（完全沿用 A／B－06）

A－06 與 B－06 **共用同一個正式 renderer** `bn/templates/A/06-ig.js`（`bn/js/render-a.js` 的 `A_TABLE` 僅以版位 id 為 key、無 type 維度，A／B 差異只由 `ASSET_BASE_BY_TYPE` 在 rendering layer 切換底圖路徑）。D－06 的文字視覺樣式**完全沿用**該 renderer，不得重新設計：

| 欄位 | font | color |
|---|---|---|
| headline | `52.5pt "ShopeeNotoSans Medium"` | `#ffffff` |
| subheadline | `65pt "ShopeeNotoSans Bold"` | `#fff285` |
| subheadline 的 `$`／`%` | `55pt "ShopeeNotoSans Bold"` | `#fff285` |
| protectionText | `30pt "ShopeeNotoSans Medium"` | `#a6f4e6` |

`$`／`%` 特殊 formatting 完整沿用既有機制，不得改寫：`tokenizeSubheadline` 將 `$`／`%` 切為獨立 symbol run 並改用 `symbolFont`；`adjacentOrdinaryRun` 決定對齊參考的相鄰 ordinary run（`$` 取後方、`%` 取前方，含反向 fallback）；`boundaryGlyphInkBottom` 使 symbol 的 ink-bottom 對齊該相鄰字符的 ink-bottom。

字數規則沿用 01～12 shared LOCKED 規則，D－06 **不改字數規則、不新增 overflow 警告、不自動縮字**。

### 10.5 Geometry（正式 canvas 座標，已由 Jamie／GPT 裁決）

四個正式 box（單位 px，相對 900 × 1600 canvas 原點）：

| component | left | top | width | height |
|---|---|---|---|---|
| Logo | **161** | **282** | **580** | **82** |
| headline | **175** | **387** | **550** | **65** |
| subheadline | **136** | **472** | **630** | **82** |
| protectionText | **136** | **573** | **630** | **37** |

三個文字 box 與既有 A／B－06 renderer 的 `IG_LAYOUT` **逐值完全相同**，D－06 不得改動。四個 box 互不重疊（Logo bottom = 364 < headline top = 387）。

### 10.6 Photoshop／CSS 原始座標之更正事實（歷史證據，不得作為正式 geometry）

Jamie 提供的原始 Photoshop／CSS 四個 box 為 Logo `{2020, 282, 580, 82}`、headline `{2034, 387, 550, 65}`、subheadline `{1995, 472, 630, 82}`、protectionText `{1995, 573, 630, 37}`。四者的 `left` 均約 2000px，right 介於 2584～2625，**全部遠超 900px canvas 寬度，在正式 canvas 上水平無效**。

Phase 0 Investigation 以對位圖 alpha 連通元件分析（`bn/assets/D/對位/06_IG.png` 為 8-bit RGBA、RGB 全黑、alpha 恰 2 個 level，取最高 alpha 得 4 個 100% 實心矩形）並與 A－06 renderer 既有 `IG_LAYOUT` 交叉驗證，其中三個 component 與 A－06 三文字 box 逐值精確吻合，剩餘唯一 component 即 Logo box。對照結果為：

| component | Photoshop／CSS | 正式 canvas | Δleft | Δtop | width／height |
|---|---|---|---|---|---|
| Logo | `{2020,282,580,82}` | `{161,282,580,82}` | 1859 | 0 | 一致 |
| headline | `{2034,387,550,65}` | `{175,387,550,65}` | 1859 | 0 | 一致 |
| subheadline | `{1995,472,630,82}` | `{136,472,630,82}` | 1859 | 0 | 一致 |
| protectionText | `{1995,573,630,37}` | `{136,573,630,37}` | 1859 | 0 | 一致 |

**`Δleft = 1859`、`Δtop = 0`、width／height 四個 box 全部一致。** 本節僅作為座標更正依據與歷史證據保留；**原始 Photoshop／CSS 的 `left` 一律不得寫成正式 geometry、不得再使用**。

### 10.7 Logo Rendering Requirement

- Logo 必須在 box `{left:161, top:282, width:580, height:82}` 內**水平＋垂直置中**，保持原始 aspect ratio，以 **contain** 完整顯示；**禁止 stretch、禁止 cover、禁止 crop、禁止 source clipping**（source rect 必須為完整 `0, 0, 784, 112`）。
- 以 source `784 × 112` 與 box `580 × 82` 計算，以下為 LOCKED 值：

| 項目 | 值 |
|---|---|
| `scale` | `min(580/784, 82/112) = min(145/196, 41/56) = 41/56`（height-bound） |
| destination width | **574** |
| destination height | **82** |
| destinationX | **164** |
| destinationY | **282** |
| 左／右剩餘 | 各 **3px** |
| 上／下剩餘 | 各 **0px** |

- 四個值皆為整數，**不需要也禁止**額外的 `Math.round`／`Math.floor`／`Math.ceil`／`Math.trunc`／`toFixed`／`parseInt` 或 bitwise truncation 等 geometry 取整。
- Logo 為**水平＋垂直置中**，**不是靠左**（與 D－02／D－03 的靠左規則不同；D－06 的裁決只代表 D－06）。
- Logo 未來 rendering 必須使用 **renderer-local high-quality smoothing**，且自成獨立一組：`save()` → `imageSmoothingEnabled = true` → `imageSmoothingQuality = "high"` → `drawImage()` → `restore()`，不依賴其他繪製階段的 smoothing state。
- **Logo 不進 Medium 2× surface**；**不得建立共用 Logo helper**。
- Logo 必須由 D－06 renderer **真正畫進 canvas**，不得以 DOM overlay／CSS background／`<img>` 疊圖等 Preview-only 技巧呈現。

### 10.8 Alignment：centered ink bounding-box（完全沿用 A－06）

三段文字都必須在各自 box 內採 **ink bounding-box 水平＋垂直置中**，這與 A－06 現行正式算法**完全一致**，不得改寫：

- 保留 `textAlign = "left"`、`textBaseline = "alphabetic"`；實際位置由 `measureText` 的 `actualBoundingBox*` measurement 自算，**不得**改成 left／top 定位、**不得**新增 padding／inset、**不得**發明新的 alignment framework。
- 完整沿用 A－06 既有 centered helper 行為：`validateCenteredInkFitsBox`（依 box 與 ink 尺寸計算置中後的 ink 邊界並回傳 `fitsWidth`／`fitsHeight`）、`drawCenteredText`（單一 run 的置中繪製）、`drawCenteredMixedSubheadline`（含 `$`／`%` mixed runs 的整體 ink bbox 置中繪製）。
- **fit validation 必須保留**：renderer 回傳 headline／subheadline／protectionText 的 fit 結果，行為與 A－06 相同。
- 本節核心要求是「D－06 完全沿用 A／B－06 的 centered ink behavior ＋ fit validation」，**不得**重新設計、**不得**抽成共用 alignment helper。

### 10.9 Medium local 2×

- 完全沿用 A－06 的 template-local 2×：`MEDIUM_RENDER_SCALE = 2`，offscreen 暫存 canvas 為 **1800 × 3200**（`IG_WIDTH × 2` × `IG_HEIGHT × 2`），`scale(2, 2)` 後只處理 **headline ＋ protectionText**，再以 `imageSmoothingEnabled = true`／`imageSmoothingQuality = "high"` 高品質縮回正式尺寸合成。
- **Bold subheadline 與 Logo 都不得進入 2× surface。**
- A－06 **沒有**整個 Medium surface 層級的 A－01 式「headline 與 protectionText 皆空即早退」guard，**D－06 也不得新增**。（A－06 僅有每段文字層級的空字串處理，回傳零 ink 的 fit validation，非跳過整個 2× surface；此行為一併沿用。）
- **禁止**把 2× 抽成共用 helper／framework。

### 10.10 完整 draw order

**background → Logo → Medium local 2×（headline ＋ protectionText）→ Bold subheadline。**

`globalAlpha` 維持 `1`、`globalCompositeOperation` 維持 `source-over`，不得新增 blending／compositing。

### 10.11 Renderer 與人工對位驗證需求（已於 Phase 4 實作、Phase 6 人工驗證 PASS）

- D－06 **未來必須**使用 D-specific template（比照 D－01～03 慣例，預期命名為 `bn/templates/D/06-ig.js`）；**不得**修改已封箱的 `bn/templates/A/06-ig.js`、不得在其中加 D branch、不得與 D－01～03 合併成 generic D renderer、不得建立 D template registry。
- 固定素材（底圖、Logo）須由 caller 載入完成後以 images object 傳入 renderer；renderer 不自行 async 載圖、不建 image cache。
- D－06 **未來必須**有自己的獨立啟動檔（預期 `bn/launch/D/06_IG.command`），並在既有 `bn/launch/viewer.html` 以**最小 additive** 分支提供人工對位校稿；啟動檔與 viewer 僅為人工校稿工具，**不是**第二套正式 renderer、**不是**正式 Generator Preview、**不是**正式資料輸入流程。
- 對位圖只作 DOM overlay 供人工比對；對位圖與 canvas 同為 900 × 1600，可作 1:1 overlay 座標基準。關閉 overlay 後，Logo 與三段文字仍須留在 canvas 上。
- **本階段不建立上述任何檔案**；檔名僅為依現有命名慣例的預期值，實際實作方式屬 Phase 3 Proposal 決定範圍。

### 10.12 Export Locked Behavior 與正式平台 fail-closed

- 版位 06 既有鎖定的 Export 規則（依 `bn/js/export.js` 唯讀實證）：`EXPORT_ITEMS` 中 `{ id: "06", name: "06_IG", format: "jpg" }` —— **JPG 格式**、**無 `maxBytes`（版位 06 無 byte 容量上限）**；`EXPORT_DPI = 72`、`JPEG_QUALITY = 1.0`。`EXPORT_ITEMS` 以版位 id 提供，**與樣式 type 無關**。此為既有鎖定規則，D－06 **不得重新設計**，本階段**不得修改 `bn/js/export.js`**。
- **D－06 已完成 Phase 1 Requirement、Phase 2 Investigation、Phase 3 Proposal、Phase 4 Coding 與 Phase 6 Jamie 人工 1:1 overlay 對位驗證（PASS）**，並已建立 renderer／launcher／viewer 分支與 Code Commit `5def9469d21336787dc35553ff7a17ffde9eac48`（見第 10.16 節）。已完成範圍**僅限單版位 renderer 與人工對位驗證**，以下正式平台項目仍未完成。
- 目前正式支援的樣式仍為 **A 與 B**；`bn/js/import.js` 的 `SUPPORTED_TYPES` 仍為 `["A", "B"]`，`bn/js/render-a.js` 的 `ASSET_BASE_BY_TYPE` 仍只有 A 與 B，`A_TABLE` 未加入 type 維度或任何 D entry，樣式 D 在正式平台**維持 fail-closed**（詳見第 6.1 節）。**本階段不得修改 `SUPPORTED_TYPES`、不得在 `ASSET_BASE_BY_TYPE` 加入 D、不得修改正式 Import、不得修改六個核心 JS。**
- D 的正式 Excel worksheet Import、Restore、控制台 Preview 與 Export **尚未 enable**。
- D－06 的正式 Preview ↔ Export 一致性實測，以及版位 06 的 JPG／72 dpi 實測，**deferred until D platform integration**，不得記為已驗證，也不得為驗證而提前 enable Type D。
- D－04、D－05、D－07～17 尚未確認；本節裁決**只代表 D－06**，不得預先補完其他版位的 geometry、Logo 位置、文字差異或 renderer 路徑。樣式 C 不在本節範圍。

### 10.13 Explicit Non-Goals（本節明確不做）

1. 不修改 A／B 任何 template、launcher、assets 或既有行為（含 `bn/templates/A/06-ig.js`）。
2. 不修改 D－01、D－02、D－03 已完成的 template、launcher 或其 Requirement 條文。
3. 不建立 generic abstraction／framework／plugin／registry redesign／共用 2× helper／共用 Logo helper／共用 alignment helper／D template registry。
4. 不預建、不預留、不抽象化 D－04、D－05、D－07～17；不處理樣式 C。
5. 不正式 enable Type D；不修改正式平台六個核心 JS。
6. Logo 不進 Excel mapping／Editor／Workspace state／JSON schema。
7. 不新增 D－06 專屬資料欄位、不改字數規則、不新增 overflow 警告或自動縮字。
8. 不重新設計 Export 容量／格式／dpi 策略。
9. 本階段不 Coding、不建立 Proposal、不做 Documentation Update、不 Stage／Commit／Push／Tag／Release。

### 10.14 Acceptance Criteria（可驗證，全部為未來驗收項目）

1. D－06 正式輸出 canvas 為 **900 × 1600**。
2. 使用 `bn/assets/D/底圖/06_IG.jpg`（900 × 1600）作為底圖，1:1 鋪滿 canvas、未縮放、未裁切。
3. Logo 固定取自 `bn/assets/D/Logo.png`，非 Excel 帶入、非使用者上傳、非 Editor 欄位；未新增第二份 Logo 素材。
4. Logo 正式 box 為 `{left:161, top:282, width:580, height:82}`。
5. Logo 保持原始 aspect ratio，以 **contain** 等比例縮放，**未變形、未 cover、未 crop**（source rect 完整）。
6. Logo render size 為 **574 × 82**，destination **x = 164、y = 282**；左右各保留 **3px**、上下各 **0px**；未做任何 rounding。
7. **未使用**原始 Photoshop／CSS 的 `left`（`2020`／`2034`／`1995`）作為正式 geometry。
8. 三個文字 box 座標為 headline `{175,387,550,65}`、subheadline `{136,472,630,82}`、protectionText `{136,573,630,37}`，與 A／B－06 `IG_LAYOUT` 逐值相同。
9. 三段文字採 **ink bounding-box 水平＋垂直置中**（`textAlign="left"`／`textBaseline="alphabetic"`），沿用 A－06 既有 `validateCenteredInkFitsBox`／`drawCenteredText`／`drawCenteredMixedSubheadline` 行為，未改用 left／top、未加 padding／inset、未新增 alignment framework；fit validation 保留。
10. 三段文字視覺樣式與 A／B－06 相同：`52.5pt Medium #ffffff`／`65pt Bold #fff285`／`30pt Medium #a6f4e6`。
11. `$`／`%` 為 `55pt Bold #fff285`，且 `tokenizeSubheadline`／`adjacentOrdinaryRun`／`boundaryGlyphInkBottom` 的 boundary glyph ink-bottom 對齊行為未改變。
12. Medium 採 **template-local 2×**、offscreen **1800 × 3200**、只涵蓋 headline ＋ protectionText；**Bold subheadline 與 Logo 均未進 2× surface**；未建立共用 2× helper；未新增 A－01 式整個 Medium surface 的空字串早退。
13. draw order 為 **background → Logo → Medium local 2× → Bold subheadline**；`globalCompositeOperation` 維持 `source-over`、`globalAlpha` 維持 `1`，未新增 blending／compositing。
14. Logo smoothing 為 renderer-local 且自成一組 `save`／`restore`，未依賴 Medium 2× 的 smoothing state。
15. D－06 使用 D-specific template；`bn/templates/A/06-ig.js` 未被修改或取代。
16. D－06 有獨立 `.command` 啟動檔，且可經既有 viewer 以對位圖做 1:1 人工 overlay 校稿；**關閉 overlay 後 Logo 與三段文字仍留在 canvas 上**。
17. A／B－01～17 與 D－01、D－02、D－03 的行為與輸出未改變。
18. `SUPPORTED_TYPES` 仍為 `["A", "B"]`；`ASSET_BASE_BY_TYPE` 仍只有 A 與 B；樣式 D 在正式平台仍 fail-closed。
19. Workspace／暫存 JSON schema 未新增 Logo 欄位；Editor 未出現 Logo 欄位。
20. D－04、D－05、D－07～17 無新增實作；未建立 generic framework／plugin／共用 helper。
21. **Deferred（不在本階段驗收）**：D－06 正式 Preview ↔ Export 一致性實測、D Excel worksheet Import 與 Restore、版位 06 的 **JPG／72 dpi**（版位 06 無 byte 容量上限）實測 —— 全部 deferred until D platform integration。

### 10.15 Phase Boundary

- 本節為 **Phase 1 Requirement**，只定義「必須做到什麼」與「如何驗收」，**不指定實作方式**；模組切分、函式設計、參數介面、asset 載入時序等屬 Phase 2 Investigation 確認範圍與 Phase 3 Proposal 決定範圍。
- 本階段**未** Coding、**未**建立 Proposal（`bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 本輪未修改，D－06 Proposal 留待 Phase 3）、**未**做 Documentation Update（Architecture、Template Requirement、17 版位差異、全域 Requirement 的同步屬 D－06 完成後的 Documentation Update 階段）、**未** Stage／Commit／Push／Tag／Release。
- D－06 進入 Phase 2 之前，本節需經 Jamie／GPT Review PASS。

（本節為 Phase 1 當時的階段邊界歷史紀錄，保留不改寫；D－06 後續各階段的實際完成狀態見第 10.16 節。）

### 10.16 D－06 Implementation Outcome（完成狀態）

本節全部 Requirement 條文與裁決均未改寫，僅補記完成狀態。

D－06 已依第 10 節 Requirement 與 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 的「D－06」章節完成 Phase 2 Investigation、Phase 3 Proposal、Phase 4 Coding，並經 **Phase 6 Jamie 親自開啟 `bn/launch/D/06_IG.command` 完成人工 1:1 overlay 對位驗證且明確 PASS**。

Code Commit 為 **`5def9469d21336787dc35553ff7a17ffde9eac48`**（`feat(bn): add D06 IG template`，parent `5a2ba2ffa40254f2b3c45cab5e8fa4051b9505db`），`git diff --check HEAD^ HEAD` PASS，**精確包含 5 個路徑（1 個 M ＋ 4 個 A）**：

- `A` `bn/templates/D/06-ig.js`（新增）
- `A` `bn/launch/D/06_IG.command`（新增，Git mode `100755`）
- `M` `bn/launch/viewer.html`（最小 additive D－06 branch，+16／−1）
- `A` `bn/assets/D/底圖/06_IG.jpg`（新增納管，JPEG 900 × 1600）
- `A` `bn/assets/D/對位/06_IG.png`（新增納管，PNG 900 × 1600）

`bn/assets/D/Logo.png` **不在本次 commit 內**（已由 D－01 納管，D－06 僅引用既有 tracked asset、未修改、未重存、未再次納管、未建立第二份）。A／B templates、A／B launchers、A／B assets、D－01／D－02／D－03 template 與 launcher、正式平台六個核心 JS、CSS、`bn/index.html`、vendor、fonts、banwords、LPBN 掛標與所有文件於本次 Code Commit 全部零修改。

已達成之 Acceptance Criteria：第 10.14 節第 1～20 條。落地實測值與第 10 節裁決完全一致 —— canvas **900 × 1600**；Logo box `{left:161, top:282, width:580, height:82}`（未使用已更正之原 Photoshop／CSS `left` `2020`／`2034`／`1995`）；Logo source 784 × 112 以 contain 縮放，`scale = min(580/784, 82/112) = 41/56`，destination **574 × 82**、**水平＋垂直置中** `destinationX = box.left + (box.width − destinationWidth) / 2 = 164`、`destinationY = box.top + (box.height − destinationHeight) / 2 = 282`，左右各 3px、上下各 0px，四值皆整數，source rect 完整、未 rounding／truncation、未 stretch／cover／crop；三文字 box `{175,387,550,65}`／`{136,472,630,82}`／`{136,573,630,37}`，typography 沿用 A／B－06（`52.5pt Medium #ffffff`／`65pt Bold #fff285`／`$`／`%` `55pt Bold #fff285`／`30pt Medium #a6f4e6`），採 actualBoundingBox-based ink bounding-box **水平＋垂直置中**（`textAlign="left"`／`textBaseline="alphabetic"`），`$`／`%` 的 boundary glyph ink-bottom formatting 與 fit validation 保留；Medium template-local 2× offscreen **1800 × 3200**、只涵蓋 headline ＋ protectionText，Bold subheadline 與 Logo 均未進 2× surface，未新增 A－01 式整體 early-return；Logo smoothing 為 renderer-local 獨立 `save() → imageSmoothingEnabled = true → imageSmoothingQuality = "high" → drawImage() → restore()`；draw order **background → Logo → Medium local 2×（headline ＋ protectionText）→ Bold subheadline**，`globalAlpha` 維持 `1`、`globalCompositeOperation` 維持 `source-over`。

D－06 使用獨立 `bn/templates/D/06-ig.js`（exports 恰 2、零 import、signature 為 `renderIg(canvas, images, { headline, subheadline, protectionText } = {})`），已封箱的 `bn/templates/A/06-ig.js` 未被修改或取代。A－06 的 8 個共用文字 helper 落地比對為 **6/8 逐位元組相同**（`hasInk`、`validateCenteredInkFitsBox`、`drawCenteredText`、`tokenizeSubheadline`、`adjacentOrdinaryRun`、`drawCenteredMixedSubheadline`）＋ **2/8 behavior-equivalent**（`measureRun`、`boundaryGlyphInkBottom`）；該 2 個的唯一差異為各一行 runtime error message 的版位標示由 `A－06` 改為 `D－06`（沿用 D－01～03「D template 不殘留 A 版位標示」慣例），**演算法、控制流與回傳值零差異**。

第 10.14 節第 21 條之 deferred 項目維持不變：D－06 正式 Preview ↔ Export 一致性實測、D Excel worksheet Import 與 Restore、正式控制台 Preview／Export，以及版位 06 的 **JPG／72 dpi**（既有 LOCKED 規則，`JPEG_QUALITY = 1.0`、**版位 06 無 byte 容量上限**）實際 Export 驗證 —— 全部 **deferred until D platform integration**，本次**未執行** D Export 實測，不得記為已驗證。

**Jamie 的 PASS 是「人工 1:1 overlay 對位 PASS」，不是「正式平台 Preview／Export PASS」；後者尚未做。本次完成的是「D－06 renderer ＋ 人工對位驗證」，不是「D 樣式正式平台整合完成」。** 目前正式支援的樣式仍為 A 與 B，`SUPPORTED_TYPES` 仍為 `["A", "B"]`，`ASSET_BASE_BY_TYPE` 仍只有 A 與 B，`A_TABLE` 未加入 D entry 或 type 維度，樣式 D 在正式平台維持 fail-closed；D 的正式 Excel Import／Restore／控制台 Preview／Export 尚未 enable。本節裁決**只代表 D－06**；D－04、D－05、D－07～17 尚未處理，不得由 D－01／D－02／D－03／D－06 推論其 geometry、Logo 位置或文字差異，樣式 C 不在本節範圍。落地狀態另見 `FSS_BN_Architecture.md` 第 42 節與 `FSS_BN_Template_Requirement_Specification_v1.0.md` 第 5.2.4 節。

---

## 11. D－07（`07_FB POST`）Requirement

> 本節為 D－07 正式 Requirement，**階段為 Phase 1**。D－07 與樣式 A／B 的 `07_FB POST` **共用同一組已確認的文字內容模型與視覺樣式**，真正的差異只有「新增固定 Logo」一項；因此本節只記錄 D－07 真正不同與需追蹤的內容，其餘一律引用第 3 節 D 樣式全域已確認規則與既有 A／B－07 正式規格，不重複複製背景說明。
>
> **本節條文與裁決均未改寫。** 本節原以「尚未實作的需求」寫成（Phase 1 當時 D－07 尚未 Coding）；D－07 現已完成 Phase 4 Coding 並經 Phase 6 Jamie 人工 1:1 overlay 對位驗證 PASS，Code Commit `b35507340ad12cb976bdc08d96278df756e9b272`（`feat(bn): add D07 FB POST template`）。完成狀態與實際落地內容補記於第 11.16 節；本節其餘敘述中的「未來／預定」語氣屬 Phase 1 歷史用語，其所定義的規格與驗收要求不變。**本次完成的是「D－07 renderer ＋ 人工 1:1 overlay 對位驗證」，不是「D 樣式正式平台整合完成」，也不是正式平台 Preview／Export PASS。**
>
> 本節依第 2 節文件治理規則以附加方式置於第 10 節之後，未變動第 1～10 節既有章節編號與交叉引用。D－04、D－05、D－08～17 的狀態不受本節影響，仍為「尚待 Jamie 確認」。

### 11.1 版位與 canvas

- 版位 ID `07`，名稱 `07_FB POST`。
- 正式 canvas **1200 × 630**，與 A／B－07 相同（`bn/templates/A/07-fb-post.js` 的 `FB_POST_WIDTH = 1200`、`FB_POST_HEIGHT = 630`）。

### 11.2 素材

| 用途 | 路徑 | 實證 |
|---|---|---|
| 正式底圖 | `bn/assets/D/底圖/07_FB POST.jpg` | JPEG **1200 × 630**（與 canvas 完全一致） |
| 人工對位圖 | `bn/assets/D/對位/07_FB POST.png` | PNG RGBA **1200 × 630**；只供人工 overlay 校稿，**不得**進入正式 Preview 或 Export 產出 |
| 固定共用 Logo | `bn/assets/D/Logo.png` | PNG 原始 **784 × 112**；**既有 tracked 共用檔（由 D－01 Code Commit 納管），D－07 只引用，不新增第二份、不修改、不重存** |

底圖與對位圖在 Phase 1 當時為 untracked；兩者已於 D－07 Code Commit `b35507340ad12cb976bdc08d96278df756e9b272` 正式納管（見第 11.16 節）。`bn/assets/D/Logo.png` 仍為既有 tracked 共用素材（由 D－01 納管），D－07 僅引用、未再次納管。

### 11.3 資料來源

沿用第 3.1 節：D 有自己的 worksheet `D`，工單配置與 A／B 相同；D－07 屬 01～12 區間，來源為 `B15 = headline`、`B16 = subheadline`、`B17 = protectionText`，字數規則沿用現有 shared LOCKED 規則。此為**已確認產品需求**，是未來 D platform integration 應遵循的依據；**目前平台尚未 enable D，不代表 D Excel Import 已可使用**（見第 11.12 節）。D－07 **不新增任何專屬資料欄位**。

固定 Logo 不是資料：不由 Excel 帶入、不由使用者上傳、不進入 Editor、不進入 Workspace state、不進入暫存 JSON schema、不進入 Import mapping（沿用第 3.5 節全域規則）。本階段**不得修改正式 Import、不得 enable worksheet D**。

### 11.4 Typography、字數與特殊 formatting（完全沿用 A／B－07）

A－07 與 B－07 **共用同一個正式 renderer** `bn/templates/A/07-fb-post.js`（`bn/js/render-a.js` 的 `A_TABLE` 僅以版位 id 為 key、無 type 維度，A／B 差異只由 `ASSET_BASE_BY_TYPE` 在 rendering layer 切換底圖路徑）。D－07 的文字視覺樣式**完全沿用**該 renderer，不得重新設計：

| 欄位 | font | color |
|---|---|---|
| headline | `39pt "ShopeeNotoSans Medium"` | `#ffffff` |
| subheadline | `49pt "ShopeeNotoSans Bold"` | `#fff285` |
| subheadline 的 `$`／`%` | `41pt "ShopeeNotoSans Bold"` | `#fff285` |
| protectionText | `22.5pt "ShopeeNotoSans Medium"` | `#a6f4e6` |

`$`／`%` 特殊 formatting 完整沿用既有機制，不得改寫：`tokenizeSubheadline` 將 `$`／`%` 切為獨立 symbol run 並改用 `symbolFont`；`adjacentOrdinaryRun` 決定對齊參考的相鄰 ordinary run（**`$` 取後方、`%` 取前方**，含既有反向 fallback）；`boundaryGlyphInkBottom` 使 symbol 的 ink-bottom 對齊該相鄰字符的 ink-bottom（`actualBoundingBoxDescent`，以 `Array.from` 逐 code point 檢查、`hasInk` 跳過無墨跡字符）。

字數規則沿用 01～12 shared LOCKED 規則，D－07 **不改字數規則、不新增 overflow 警告、不自動縮字、不新增 padding／inset**。

### 11.5 Geometry（正式 canvas 座標，已由 Jamie／GPT 裁決）

四個正式 box（單位 px，相對 1200 × 630 canvas 原點）：

| component | left | top | width | height |
|---|---|---|---|---|
| Logo | **54** | **201** | **365** | **52** |
| headline | **54** | **266** | **405** | **49** |
| subheadline | **54** | **325** | **475** | **62** |
| protectionText | **54** | **401** | **475** | **28** |

三個文字 box 與既有 A／B－07 renderer 的 `FB_POST_LAYOUT` **逐值完全相同**，D－07 不得改動。四個 box 互不重疊（Logo bottom = 253 < headline top = 266）。四者的 `left` 均為 54，即四個 component 共用同一條左基準線。

### 11.6 Photoshop／CSS 原始座標之更正事實（歷史證據，不得作為正式 geometry）

Jamie 提供的原始 Photoshop／CSS Logo box 為 `{left: 2877, top: 201, width: 365, height: 52}`。其 `left = 2877` 已大於 canvas 寬度 1200，`right = 3242` 超出 canvas 達 2042px，**在正式 canvas 上水平無效**；`top = 201`、`bottom = 253` 則落在 630 內、垂直有效。

Phase 0 Investigation 以對位圖 alpha 連通元件分析（`bn/assets/D/對位/07_FB POST.png` 為 8-bit RGBA、RGB 全黑、alpha 恰 2 個 level：`26` 背景與 `95` 標記框，取最高 alpha 得 4 個 100% 實心矩形）並與 A－07 renderer 既有 `FB_POST_LAYOUT` 交叉驗證，其中三個 component 與 A－07 三文字 box 逐值精確吻合，剩餘唯一 component 即 Logo box。對照結果為：

| component | Photoshop／CSS | 正式 canvas | Δleft | Δtop | width／height |
|---|---|---|---|---|---|
| Logo | `{2877, 201, 365, 52}` | `{54, 201, 365, 52}` | **2823** | **0** | 一致 |

**`Δleft = 2823`、`Δtop = 0`，`top`／`width`／`height` 原值正確。** 本節僅作為座標更正依據與歷史證據保留；**原始 Photoshop／CSS 的 `left`（`2877`）一律不得寫成正式 geometry、不得再使用**。

本次 Jamie 只提供 Logo 一組 Photoshop／CSS 座標，未提供三文字的原始值，因此三文字不存在同類 offset 記錄，其正式值即 A／B－07 既有 `FB_POST_LAYOUT` 本身。D－07 的 `Δleft = 2823` 為本版位獨立值，與 D－02／D－03 的 595、D－06 的 1859 皆不同，**不得互相推論**。

### 11.7 Logo Rendering Requirement

- Logo 必須在 box `{left:54, top:201, width:365, height:52}` 內保持比例 **contain** 完整顯示，**水平靠左＋垂直置中**；**禁止 stretch、禁止 cover、禁止 crop、禁止 source clipping**（source rect 必須為完整 `0, 0, 784, 112`）。
- 以 source `784 × 112` 與 box `365 × 52` 計算，以下為 LOCKED 值：

| 項目 | 值 |
|---|---|
| `scale` | `min(365/784, 52/112) = min(365/784, 13/28) = 13/28`（**height-bound**） |
| destination width | **364** |
| destination height | **52** |
| `destinationX` | **`box.left` = 54**（水平靠左，**禁止水平置中**） |
| `destinationY` | **`box.top + (box.height − destinationHeight) / 2` = 201**（垂直置中） |
| 左／右剩餘 | 左 **0px**／右 **1px** |
| 上／下剩餘 | 上 **0px**／下 **0px** |
| aspect ratio | 保持 **7 : 1** |

- 上述 destination 四值皆為整數，**不需要也禁止**額外的 `Math.round`／`Math.floor`／`Math.ceil`／`Math.trunc`／`toFixed`／`parseInt` 或 bitwise truncation 等 geometry 取整。
- D－07 的 Logo 為**水平靠左＋垂直置中**：水平規則與 D－02／D－03 同族，垂直規則本次明確鎖為置中（因 destination height 恰等於 box height，垂直餘量為 0，靠上與置中在現行素材下數值相同，但規則以置中為準）。本節裁決**只代表 D－07**，不得與 D－01／D－02／D－03／D－06 互相推論。
- Logo rendering 必須 **template-local**，且以獨立一組 `save()` → `imageSmoothingEnabled = true` → `imageSmoothingQuality = "high"` → `drawImage(...)` → `restore()` 處理，不依賴其他繪製階段的 smoothing state。
- **Logo 不進 Medium 2× surface**；**不得建立共用 Logo helper／shared Logo abstraction**。
- Logo 必須由 D－07 renderer **真正畫進 canvas**，不得以 DOM overlay／CSS background／`<img>` 疊圖等 Preview-only 技巧呈現。

### 11.8 Alignment：LeftCentered ink bounding-box（完全沿用 A／B－07）

三段文字都必須在各自 box 內採 **水平靠左 ＋ 垂直 ink bounding-box 置中**（A／B－07 現行 `LeftCentered` 行為），**不是水平置中、不是 left／top**，不得改寫：

- 保留 `textAlign = "left"`、`textBaseline = "alphabetic"`；實際位置由 `measureText` 的 `actualBoundingBox*` measurement 自算；**無 inset、無 padding**。
- 完整沿用 A／B－07 既有 helper 行為：`validateLeftCenteredInkFitsBox`（`inkLeft = box.left`；`inkTop = box.top + (box.height − inkHeight) / 2`；回傳 `fitsWidth`／`fitsHeight`）、`drawLeftCenteredText`（單一 run：`x = box.left − run.inkLeft`；`y = box.top + box.height / 2 − (run.inkTop + run.inkBottom) / 2`）、`drawLeftCenteredMixedSubheadline`（含 `$`／`%` mixed runs：`offsetX = box.left − inkLeft`；`offsetY = box.top + box.height / 2 − (inkTop + inkBottom) / 2`）。
- **fit validation 必須保留**：renderer 回傳 headline／subheadline／protectionText 的 fit 結果，行為與 A／B－07 相同。
- **不得**重新設計、**不得**抽成 shared alignment helper。

### 11.9 Medium local 2×

- 完全沿用 A／B－07 的 template-local 2×：`MEDIUM_RENDER_SCALE = 2`，offscreen 暫存 canvas 為 **2400 × 1260**（`FB_POST_WIDTH × 2` × `FB_POST_HEIGHT × 2`），`scale(2, 2)` 後只處理 **headline ＋ protectionText**，再以 `imageSmoothingEnabled = true`／`imageSmoothingQuality = "high"` 高品質縮回正式尺寸合成。
- **Bold subheadline 與 Logo 都不得進入 2× surface。**
- **不得新增 A－01 式「兩段 Medium 都空就跳過整個 surface」的整體 early-return**；沿用 A／B－07 每段文字自身的空字串處理（回傳零 ink 的 fit validation，非跳過整個 2× surface）。
- **禁止**把 2× 抽成 shared helper／framework。

### 11.10 完整 draw order

**background → Logo → Medium local 2×（headline ＋ protectionText）→ Bold subheadline。**

`globalAlpha` 維持 `1`、`globalCompositeOperation` 維持 `source-over`，**不得新增 filter／blending／compositing**。

### 11.11 Renderer 與人工對位驗證需求（已於 Phase 4 實作、Phase 6 人工 1:1 overlay 驗證 PASS）

- D－07 **未來必須**使用 D-specific template（比照 D－01／02／03／06 慣例，預期命名為 `bn/templates/D/07-fb-post.js`）；**不得**修改已封箱的 `bn/templates/A/07-fb-post.js`、不得在其中加 D branch、不得與 D－01／02／03／06 合併成 generic D renderer、不得建立 D template registry。
- D－07 renderer signature **應遵循既有 D－01／02／03／06 的 images-object 模式**：以 images object 取得 `backgroundImage` 與 `logoImage`（防禦式解構），並保留 Logo image guard（`instanceof HTMLImageElement`、已載入且已完成解碼）。固定素材須由 caller 載入完成後傳入，renderer 不自行 async 載圖、不建 image cache。**不得因此建立 shared Logo abstraction。**
- D－07 **未來必須**有自己的獨立啟動檔（預期 `bn/launch/D/07_FB POST.command`），並在既有 `bn/launch/viewer.html` 以**最小 additive** 分支提供人工對位校稿；啟動檔與 viewer 僅為人工校稿工具，**不是**第二套正式 renderer、**不是**正式 Generator Preview、**不是**正式資料輸入流程。
- 對位圖只作 DOM overlay 供人工 1:1 比對；對位圖與 canvas 同為 1200 × 630，可作 1:1 overlay 座標基準。**關閉 overlay 後，Logo 與三段文字仍須留在 canvas 上。**
- **本階段不建立上述任何檔案**；檔名僅為依現有命名慣例的預期值，實際實作方式屬 Phase 3 Proposal 決定範圍。

### 11.12 Export Locked Behavior 與正式平台 fail-closed

- 版位 07 既有鎖定的 Export 規則（依 `bn/js/export.js` 唯讀實證）：`EXPORT_ITEMS` 中 `{ id: "07", name: "07_FB POST", format: "jpg" }` —— **JPG 格式**、**無 `maxBytes`（版位 07 無 byte 容量上限）**；`EXPORT_DPI = 72`、`JPEG_QUALITY = 1.0`。`EXPORT_ITEMS` 以版位 id 提供，**與樣式 type 無關**。此為既有鎖定規則，D－07 **不得重新設計**，本階段**不得修改 `bn/js/export.js`、不得執行 Export**。
- **D－07 已完成 Phase 1 Requirement、Phase 2 Repository Investigation、Phase 3 Proposal、Phase 4 Coding 與 Phase 6 Jamie 人工 1:1 overlay 對位驗證（PASS）**，並已建立 renderer／launcher／viewer 分支與 Code Commit `b35507340ad12cb976bdc08d96278df756e9b272`（見第 11.16 節）。已完成範圍**僅限單版位 renderer 與人工對位驗證**，以下正式平台項目仍未完成。
- 目前正式支援的樣式仍為 **A 與 B**；`bn/js/import.js` 的 `SUPPORTED_TYPES` 仍為 `["A", "B"]`，`bn/js/render-a.js` 的 `ASSET_BASE_BY_TYPE` 仍只有 A 與 B，`A_TABLE` 未加入 type 維度或任何 D entry，樣式 D 在正式平台**維持 fail-closed**（詳見第 6.1 節）。**本階段不得修改 `bn/js/import.js`、`bn/js/render-a.js`、`bn/js/export.js`、`bn/js/app.js`、`bn/js/workspace.js`、`bn/js/editor.js`。**
- D 的正式 Excel worksheet Import、Restore、控制台 Preview 與 Export **尚未 enable**。
- D－07 的正式 Preview ↔ Export 一致性實測，以及版位 07 的實際輸出格式與 **JPG／72 dpi** 驗證，**deferred until D platform integration**，不得記為已驗證，也不得為驗證而提前 enable Type D。
- D－04、D－05、D－08～17 尚未確認；本節裁決**只代表 D－07**，不得預先補完其他版位的 geometry、Logo 位置、文字差異或 renderer 路徑。樣式 C 不在本節範圍。

### 11.13 Explicit Non-Goals（本節明確不做）

1. 不修改 A／B 任何 template、launcher、assets 或既有行為（含 `bn/templates/A/07-fb-post.js`）。
2. 不修改 D－01、D－02、D－03、D－06 已完成的 template、launcher 或其 Requirement 條文。
3. 不建立 generic abstraction／framework／plugin／registry redesign／shared Logo helper／shared 2× helper／shared alignment helper／D template registry。
4. 不預建、不預留、不抽象化 D－04、D－05、D－08～17；不處理樣式 C。
5. 不正式 enable Type D；不修改正式平台六個核心 JS。
6. Logo 不進 Excel mapping／Editor／Workspace state／JSON schema；不重新納管 `Logo.png`。
7. 不新增 D－07 專屬資料欄位、不改字數規則、不新增 overflow UI／自動縮字／額外 padding／inset。
8. 不重新設計 Export 容量／格式／dpi 策略。
9. 不重新裁決已 LOCKED 的 geometry；原 Photoshop／CSS 的 `left`（`2877`）已裁決為座標偏移資料，不得重新討論或使用。
10. 本階段不 Coding、不建立 Proposal、不做 Documentation Update、不 Stage／Commit／Push／Tag／Release。

### 11.14 Acceptance Criteria（可驗證，全部為未來驗收項目）

1. D－07 正式輸出 canvas 為 **1200 × 630**。
2. 使用 `bn/assets/D/底圖/07_FB POST.jpg`（JPEG 1200 × 630）作為底圖，1:1 鋪滿 canvas、未縮放、未裁切；`bn/assets/D/對位/07_FB POST.png`（PNG RGBA 1200 × 630）只作人工 overlay，未進入正式輸出。
3. Logo 固定取自既有 tracked 的 `bn/assets/D/Logo.png`（784 × 112），非 Excel 帶入、非使用者上傳、非 Editor 欄位；**未新增第二份 Logo 素材、未修改、未重存**。
4. Logo 正式 box 為 `{left:54, top:201, width:365, height:52}`。
5. Logo 保持原始 aspect ratio **7 : 1**，以 **contain** 等比例縮放，**未變形、未 stretch、未 cover、未 crop**（source rect 完整 `0, 0, 784, 112`）。
6. Logo `scale = 13/28`（height-bound），render size **364 × 52**，destination **x = 54、y = 201**；左餘量 **0px**、右餘量 **1px**、上餘量 **0px**、下餘量 **0px**；**水平靠左＋垂直置中**，未水平置中；**未做任何 rounding／truncation**。
7. **正式 geometry 未使用**原始 Photoshop／CSS 的 `left`（`2877`）。
8. 三個文字 box 座標為 headline `{54,266,405,49}`、subheadline `{54,325,475,62}`、protectionText `{54,401,475,28}`，與 A／B－07 `FB_POST_LAYOUT` 逐值相同。
9. 三段文字採 **LeftCentered ink bounding-box**（水平靠左＋垂直 ink 置中，`textAlign="left"`／`textBaseline="alphabetic"`），沿用 A／B－07 既有 `validateLeftCenteredInkFitsBox`／`drawLeftCenteredText`／`drawLeftCenteredMixedSubheadline` 行為，未改用 centered 或 left／top、未加 padding／inset、未新增 alignment framework；fit validation 保留。
10. 三段文字視覺樣式與 A／B－07 相同：`39pt Medium #ffffff`／`49pt Bold #fff285`／`22.5pt Medium #a6f4e6`。
11. `$`／`%` 為 `41pt Bold #fff285`，且 `tokenizeSubheadline`／`adjacentOrdinaryRun`（`$` 取後方、`%` 取前方，含反向 fallback）／`boundaryGlyphInkBottom` 的 boundary glyph ink-bottom 對齊行為未改變。
12. Medium 採 **template-local 2×**、offscreen **2400 × 1260**、只涵蓋 headline ＋ protectionText；**Bold subheadline 與 Logo 均未進 2× surface**；未建立 shared 2× helper；**未新增整體 early-return**（保留每段文字自身回傳零 ink fit validation 的既有行為）。
13. draw order 為 **background → Logo → Medium local 2× → Bold subheadline**；`globalCompositeOperation` 維持 `source-over`、`globalAlpha` 維持 `1`，未新增 filter／blending／compositing。
14. Logo smoothing 為 template-local 且自成一組 `save()` → `imageSmoothingEnabled = true` → `imageSmoothingQuality = "high"` → `drawImage(...)` → `restore()`，未依賴 Medium 2× 的 smoothing state。
15. D－07 使用 D-specific template，且 renderer 以 images object 取得 `backgroundImage` 與 `logoImage` 並保留 Logo image guard；**`bn/templates/A/07-fb-post.js` zero-diff、未被修改或取代**。
16. D－07 有獨立 `.command` 啟動檔，且可經既有 viewer 以對位圖做 1:1 人工 overlay 校稿；**關閉 overlay 後 Logo 與三段文字仍留在 canvas 上**。
17. A／B－01～17 與已完成的 D－01、D－02、D－03、D－06 的行為與輸出未改變（regression boundary）。
18. `SUPPORTED_TYPES` 仍為 `["A", "B"]`；`ASSET_BASE_BY_TYPE` 仍只有 A 與 B；`A_TABLE` 未加入 D 或 type 維度；樣式 D 在正式平台仍 fail-closed。
19. Workspace／暫存 JSON schema 未新增 Logo 欄位；Editor 未出現 Logo 欄位。
20. D－04、D－05、D－08～17 無新增實作、無提前規格化；樣式 C 未展開；未建立 generic framework／plugin／shared helper。
21. **Deferred（不在本階段驗收）**：D－07 正式 Preview ↔ Export 一致性實測、D Excel worksheet Import 與 Restore、正式控制台 Preview／Export，以及版位 07 的實際輸出格式與 **JPG／72 dpi**（`JPEG_QUALITY = 1.0`、版位 07 無 byte 容量上限）驗證 —— 全部 deferred until D platform integration。

### 11.15 Phase Boundary

- 本節為 **Phase 1 Requirement**，只定義「必須做到什麼」與「如何驗收」，**不指定實作方式**；模組切分、函式設計、參數介面、asset 載入時序等屬 Phase 2 Investigation 確認範圍與 Phase 3 Proposal 決定範圍。
- 本階段**未** Coding、**未**建立 Proposal（`bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 本輪未修改，D－07 Proposal 留待 Phase 3）、**未**做 Documentation Update（Architecture、Template Requirement、17 版位差異、全域 Requirement 的同步屬 D－07 完成後的 Documentation Update 階段）、**未** Stage／Commit／Push／Tag／Release。
- D－07 進入 Phase 2 之前，本節需經 Jamie／GPT Review PASS。

（本節為 Phase 1 當時的階段邊界歷史紀錄，保留不改寫；D－07 後續各階段的實際完成狀態見第 11.16 節。）

### 11.16 D－07 Implementation Outcome（完成狀態）

本節全部 Requirement 條文與裁決均未改寫，僅補記完成狀態。

D－07 已依第 11 節 Requirement 與 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 的「D－07」章節完成 Phase 2 Repository Investigation、Phase 3 Proposal、Phase 4 Coding，並經 **Phase 6 Jamie 親自開啟 `bn/launch/D/07_FB POST.command` 完成人工 1:1 overlay 對位驗證且明確 PASS**。

Code Commit 為 **`b35507340ad12cb976bdc08d96278df756e9b272`**（`feat(bn): add D07 FB POST template`，parent `17249b983d4e0c9943a75f6f273865fda984d647`），`git diff --check HEAD^ HEAD` PASS，**精確包含 5 個路徑（1 個 M ＋ 4 個 A）**：

- `M` `bn/launch/viewer.html`（最小 additive D－07 branch，+16／−1）
- `A` `bn/templates/D/07-fb-post.js`（新增）
- `A` `bn/launch/D/07_FB POST.command`（新增，Git mode `100755`）
- `A` `bn/assets/D/底圖/07_FB POST.jpg`（新增納管，JPEG 1200 × 630）
- `A` `bn/assets/D/對位/07_FB POST.png`（新增納管，PNG 1200 × 630）

`bn/assets/D/Logo.png` **不在本次 commit 內**（既有 tracked 共用 asset，由 D－01 納管；D－07 僅引用、未修改、未重存、未再次納管、未建立第二份）。A／B templates、A／B launchers、A／B assets、D－01／D－02／D－03／D－06 template 與 launcher、正式平台六個核心 JS、CSS、`bn/index.html`、vendor、fonts、banwords、LPBN 掛標與所有文件於本次 Code Commit 全部零修改。

已達成之 Acceptance Criteria：第 11.14 節第 1～20 條。落地實測值與第 11 節裁決完全一致 —— canvas **1200 × 630**；四個正式 box `logo {left:54, top:201, width:365, height:52}`、`headline {54,266,405,49}`、`subheadline {54,325,475,62}`、`protectionText {54,401,475,28}`，四者共用 `left = 54`（未使用已更正之原 Photoshop／CSS `left` `2877`）；Logo source 784 × 112 以 contain 縮放，`scale = min(365/784, 52/112) = 13/28`（height-bound），destination **364 × 52**、**水平靠左＋垂直置中** `destinationX = box.left = 54`、`destinationY = box.top + (box.height − destinationHeight) / 2 = 201`，左 0px／右 1px／上 0px／下 0px，四值皆整數，aspect 保持 7 : 1，source rect 完整（`0, 0, 784, 112`）、未 rounding／truncation、未 stretch／cover／crop；Logo smoothing 為 renderer-local 獨立 `save() → imageSmoothingEnabled = true → imageSmoothingQuality = "high" → drawImage() → restore()`，Logo 未進 Medium 2×；三段文字 typography 沿用 A／B－07（`39pt Medium #ffffff`／`49pt Bold #fff285`／`$`／`%` `41pt Bold #fff285`／`22.5pt Medium #a6f4e6`），採 **LeftCentered**（水平靠左＋垂直 ink bounding-box 置中，`textAlign="left"`／`textBaseline="alphabetic"`），`$`／`%` 的 boundary glyph ink-bottom formatting 與 fit validation 保留；Medium template-local 2× offscreen **2400 × 1260**、只涵蓋 headline ＋ protectionText，Bold subheadline 與 Logo 均未進 2× surface，未新增 A－01 式整體 early-return；draw order **background → Logo → Medium local 2×（headline ＋ protectionText）→ Bold subheadline**，`globalAlpha` 維持 `1`、`globalCompositeOperation` 維持 `source-over`。

D－07 使用獨立 `bn/templates/D/07-fb-post.js`（exports 恰 2、零 import、signature 為 `renderFbPost(canvas, images, { headline, subheadline, protectionText } = {})`，以 images object 防禦式解構取得 `backgroundImage` 與 `logoImage`），已封箱的 `bn/templates/A/07-fb-post.js` 未被修改或取代。**A－07 的 8 個核心文字 helper 落地比對為 6/8 byte-identical ＋ 2/8 behavior-equivalent，實質差異 0/8**：byte-identical 者為 `hasInk`、`validateLeftCenteredInkFitsBox`、`drawLeftCenteredText`、`tokenizeSubheadline`、`adjacentOrdinaryRun`、`drawLeftCenteredMixedSubheadline`；behavior-equivalent 者為 **`measureRun`** 與 **`boundaryGlyphInkBottom`**，其唯一差異為各一行 runtime error message 的版位標示由 `A－07` 改為 `D－07`（沿用 D－01～06「D template 不殘留 A 版位標示」慣例），**演算法、控制流與回傳值零差異**。**不得記為 8/8 byte-identical。** 另 A－07 專屬的 `assertLayoutFitsCanvas`、`drawFbPostMediumText`、`assertFontsReady` 在 `A－07 → D－07` 版位標示正規化後亦為 behavior-equivalent，算法與控制流未改；其中 **`assertLayoutFitsCanvas` 完整保留、仍由 `renderFbPost` 呼叫、仍遍歷 `Object.entries(FB_POST_LAYOUT)`，因此自然一併驗證新增的 Logo box**，四個 box 實測 right／bottom 為 logo 419／253、headline 459／315、subheadline 529／387、protectionText 529／429，全部落於 1200 × 630 內。

第 11.14 節第 21 條之 deferred 項目維持不變：D－07 正式 Preview ↔ Export 一致性實測、D Excel worksheet Import 與 Restore、正式控制台 Preview／Export，以及版位 07 的 **JPG／72 dpi**（既有 LOCKED 規則，`EXPORT_DPI = 72`、`JPEG_QUALITY = 1.0`、**版位 07 無 `maxBytes`／無 byte 容量上限**）實際 Export 驗證 —— 全部 **deferred until D platform integration**，本次**未執行** D Export 實測，不得記為已驗證。

**Jamie 的 PASS 是「人工 1:1 overlay 對位 PASS」，不是「正式平台 Preview／Export PASS」；後者尚未做。本次完成的是「D－07 renderer ＋ 人工對位驗證」，不是「D 樣式正式平台整合完成」。** 目前正式支援的樣式仍為 A 與 B，`SUPPORTED_TYPES` 仍為 `["A", "B"]`，`ASSET_BASE_BY_TYPE` 仍只有 A 與 B，`A_TABLE` 未加入 D entry 或 type 維度，正式 renderer registry 未 enable D，樣式 D 在正式平台維持 fail-closed；D 的正式 Excel Import／Restore／控制台 Preview／Export 尚未 enable。本節裁決**只代表 D－07**；D－04、D－05、D－08～17 尚未處理，不得由已完成的任何 D 版位推論其 geometry、Logo 位置或文字差異，樣式 C 不在本節範圍。落地狀態另見 `FSS_BN_Architecture.md` 第 43 節與 `FSS_BN_Template_Requirement_Specification_v1.0.md` 第 5.2.5 節。

---

## 12. D－08（`08_SPX TVBN_1`）Requirement

> 本節為 D－08 正式 Requirement，**階段為 Phase 1**。D－08 與樣式 A／B 的 `08_SPX TVBN_1` **共用同一組已確認的文字內容模型與視覺樣式**，真正的差異只有「新增固定 Logo」一項；因此本節只記錄 D－08 真正不同與需追蹤的內容，其餘一律引用第 3 節 D 樣式全域已確認規則與既有 A／B－08 正式規格，不重複複製背景說明。
>
> **本節 Requirement 條文與裁決均未改寫；D－08 現已依本節落地完成。** D－08 已完成 Phase 4 Coding，並經 **Phase 6 Jamie 親自開啟 `bn/launch/D/08_SPX TVBN_1.command` 完成人工 1:1 overlay 對位驗證且明確 PASS**；Code Commit 為 `d9359270fea1bd89e96a2eb27c4464b50e0ef6dc`（`feat(bn): add D08 SPX TVBN 1 template`）。**實際落地紀錄見第 12.16 節。** 本節內文中「未來／尚未實作」語氣屬 Phase 1 歷史用語。**Jamie 的 PASS 只代表人工 1:1 overlay 對位 PASS，不是正式平台 Preview／Export PASS**，後者尚未做。
>
> 本節依第 2 節文件治理規則以附加方式置於第 11 節之後，未變動第 1～11 節既有章節編號與交叉引用。D－04、D－05、D－09～17 的狀態不受本節影響，仍為「尚待 Jamie 確認」。

### 12.1 版位與 canvas

- 版位 ID `08`，名稱 `08_SPX TVBN_1`。
- 正式 canvas **1080 × 1920**，與 A／B－08 相同（`bn/templates/A/08-spx-tvbn-1.js` 的 `SPX_TVBN_1_WIDTH = 1080`、`SPX_TVBN_1_HEIGHT = 1920`）。

### 12.2 素材

| 用途 | 路徑 | 實證 |
|---|---|---|
| 正式底圖 | `bn/assets/D/底圖/08_SPX TVBN_1.jpg` | JPEG **1080 × 1920**（與 canvas 完全一致） |
| 人工對位圖 | `bn/assets/D/對位/08_SPX TVBN_1.png` | PNG RGBA **1080 × 1920**；只供人工 overlay 校稿，**不得**進入正式 Preview 或 Export 產出 |
| 固定共用 Logo | `bn/assets/D/Logo.png` | PNG 原始 **784 × 112**；**唯一來源為既有 tracked 共用檔（由 D－01 納管），D－08 只引用，不得再次納管、不得複製第二份、不得修改** |

底圖與對位圖目前為 untracked；其納管屬未來 Phase 4／Code Commit 範圍，本階段不納管、不 stage。

### 12.3 資料來源

沿用第 3.1 節：D 有自己的 worksheet `D`，工單配置與 A／B 相同；D－08 屬 01～12 區間，來源為 `B15 = headline`、`B16 = subheadline`、`B17 = protectionText`，字數規則沿用現有 shared LOCKED 規則。此為**已確認產品需求**，是未來 D platform integration 應遵循的依據；**目前平台尚未 enable D，不代表 D Excel Import 已可使用**（見第 12.12 節）。D－08 **不新增任何專屬資料欄位**。

固定 Logo 不是資料：不由 Excel 帶入、不由使用者上傳、不進入 Editor、不進入 Workspace state、不進入暫存 JSON schema、不進入 Import mapping（沿用第 3.5 節全域規則）。本階段**不得修改正式 Import、不得 enable worksheet D**。

### 12.4 Typography、字數與特殊 formatting（完全沿用 A／B－08）

A－08 與 B－08 **共用同一個正式 renderer** `bn/templates/A/08-spx-tvbn-1.js`（`bn/js/render-a.js` 的 `A_TABLE` 僅以版位 id 為 key、無 type 維度；**B 不存在獨立 template**，A／B 差異只由 `ASSET_BASE_BY_TYPE` 在 rendering layer 切換底圖路徑）。D－08 的文字視覺樣式**完全沿用**該 renderer，不得重新設計：

| 欄位 | font | color |
|---|---|---|
| headline | `70pt "ShopeeNotoSans Medium"` | `#ffffff` |
| subheadline | `90pt "ShopeeNotoSans Bold"` | `#fff285` |
| subheadline 的 `$`／`%` | `75pt "ShopeeNotoSans Bold"` | 沿用 `#fff285`（無獨立 color） |
| protectionText | `40pt "ShopeeNotoSans Medium"` | `#a6f4e6` |

`$`／`%` 特殊 formatting 必須**完整沿用**既有機制，不得重新設計：`tokenizeSubheadline` 將 `$`／`%` 切為獨立 symbol run 並改用 `symbolFont`；`adjacentOrdinaryRun` 決定對齊參考的相鄰 ordinary run（**`$` 取後方、`%` 取前方**，並保留既有 reverse fallback）；`boundaryGlyphInkBottom` 使 symbol 的 ink-bottom 對齊該相鄰字符的 ink-bottom（**glyph ink-bottom alignment**）。

字數規則沿用 01～12 shared LOCKED 規則，D－08 **不改字數規則、不新增 overflow UI、不自動縮字、不新增額外 padding**。

### 12.5 Geometry（正式 canvas 座標，已由 Jamie／GPT 裁決）

四個正式 box（單位 px，相對 1080 × 1920 canvas 原點）：

| component | left | top | width | height |
|---|---|---|---|---|
| Logo | **147** | **364** | **785** | **112** |
| headline | **167** | **507** | **745** | **87** |
| subheadline | **94** | **619** | **890** | **114** |
| protectionText | **94** | **759** | **890** | **51** |

三個文字 box 與既有 A／B－08 renderer 的 `SPX_TVBN_1_LAYOUT` **逐值完全相同**，D－08 不得改動。四個 box 互不重疊（Logo bottom = 476 < headline top = 507）。

### 12.6 protectionText 對位標記 1px 差異之裁決（不得採對位圖值）

Phase 0 Investigation 對 `bn/assets/D/對位/08_SPX TVBN_1.png` 的 alpha 連通元件分析顯示，protectionText 的對位標記為 `{left:94, top:760, width:890, height:50}`（逐列剖面實證 `alpha = 95` 精確落在 `y = 760..809`，`y = 759` 為背景 `alpha = 26`），與 A／B－08 renderer 的 `{left:94, top:759, width:890, height:51}` 相差 1px（`top` 759 vs 760、`height` 51 vs 50；`left`／`width`／`bottom = 810` 完全相同）。

**Jamie／GPT 已正式裁決：此為對位標記的 1px 差異，不是 D－08 的新 geometry。** D－08 的 protectionText 正式 box **必須沿用 A／B－08 的 `{left:94, top:759, width:890, height:51}`**；**不得採用對位圖的 `760`／`50`**。此裁決已定案，**不需再調查、不准重新裁決**。

### 12.7 Photoshop／CSS 原始座標之更正事實（歷史證據，不得作為正式 geometry）

Jamie 提供的原始 Photoshop／CSS Logo 資料為 `.矩形_1878 { position:absolute; left:2006px; top:2065px; width:785px; height:112px; z-index:192; }`。其 `right = 2006 + 785 = 2791` 超出 canvas 寬度 1080 達 1711px（`left = 2006` 本身已大於 1080，水平無效）；`bottom = 2065 + 112 = 2177` 超出 canvas 高度 1920 達 257px，且 `top = 2065` 與對位圖實證的 `top = 364` 不符。**`left = 2006` 與 `top = 2065` 皆不可直接作 canvas geometry。**

Phase 0 以對位圖 alpha 連通元件分析（8-bit RGBA、RGB 全黑、`alpha = 95` 得 4 個 100% 實心矩形；另有 `alpha = 12` 僅出現於 `y = 0` 一整列 1080px，屬影像最上緣邊界、與任何標記框無關）並與 A－08 `SPX_TVBN_1_LAYOUT` 交叉驗證後得：

| component | Photoshop／CSS | 正式 canvas | Δleft | Δtop | width／height |
|---|---|---|---|---|---|
| Logo | `{2006, 2065, 785, 112}` | `{147, 364, 785, 112}` | **1859** | **1701** | 一致（不變） |

**D－08 自身 offset 為 `Δleft = 1859`、`Δtop = 1701`，`width`／`height` 不變。** 本節僅作為座標更正依據與歷史證據保留；**原始 Photoshop／CSS 的 `left`（`2006`）與 `top`（`2065`）一律不得寫成正式 geometry、不得再使用**。

**這是 D－08 的獨立實證。** 雖然 `Δleft = 1859` 數值上與 D－06 相同，且 D－08 是首個 `Δtop ≠ 0` 的版位（D－02／D－03／D－06／D－07 的 `Δtop` 皆為 0），但**不得因此建立共用 offset 規則、不得由其他 D 版位推論、亦不得將 D－08 的 offset 推論至其他版位**。

### 12.8 Logo Rendering Requirement

- Logo source intrinsic 為 **784 × 112**；Logo box 為 **785 × 112**。
- Logo 必須以 **contain** 保持完整 source rect 與 **7 : 1** aspect ratio 落入 box，並在 box 內**水平＋垂直置中**；**禁止 stretch、禁止 cover、禁止 crop、禁止 source clipping**。
- 以上述 source 與 box 計算，以下為 LOCKED 值：

| 項目 | 值 |
|---|---|
| `scale` | `min(785/784, 112/112) = 1`（**height-bound；1 : 1 不縮放**） |
| destination width | **784** |
| destination height | **112** |
| `destinationX` | `147 + (785 − 784) / 2 = ` **147.5** |
| `destinationY` | `364 + (112 − 112) / 2 = ` **364** |
| destination 總結 | **784 × 112 @ (147.5, 364)** |
| 左／右剩餘 | 各 **0.5px** |
| 上／下剩餘 | 各 **0px** |

- **`147.5` 必須原值保留**（因 box width 785 比 source width 784 多 1px，水平餘量 1px 平分為左右各 0.5px），比照既有 **D－01 fractional precedent**；**禁止** `Math.round`／`Math.floor`／`Math.ceil`／`Math.trunc`／`toFixed`／`parseInt`／bitwise truncation。
- Logo 必須由 D－08 renderer **真正 draw 入 canvas**，**不得**以 DOM overlay／CSS background／`<img>` 疊圖等 Preview-only 技巧呈現。
- 未來 renderer 必須使用 **template-local Logo drawing**，且自成獨立一組 `save()` → `imageSmoothingEnabled = true` → `imageSmoothingQuality = "high"` → `drawImage(` 完整 source rect `)` → `restore()`，不依賴其他繪製階段的 smoothing state；**不得抽 shared Logo helper**。
- **Logo 不進 Medium 2× surface**（見第 12.9 節）。

### 12.9 Alignment 與 Medium local 2×（完全沿用 A／B－08）

**Alignment：三段文字沿用 A／B－08 的 centered ink，即「水平＋垂直 ink bounding-box 置中」**，**不是 LeftCentered、不是 left／top**，不得改寫：

- 保留既有 `textAlign = "left"`、`textBaseline = "alphabetic"` 與 `actualBoundingBox*` measurement 行為；**無 inset、無 padding**。
- 完整沿用既有 helper 行為：`validateCenteredInkFitsBox`（`inkLeft = box.left + (box.width − inkWidth) / 2`；`inkTop = box.top + (box.height − inkHeight) / 2`；回傳含 `fitsWidth`／`fitsHeight`）、`drawCenteredText`（`x = box.left + (box.width − inkWidth) / 2 − run.inkLeft`；`y = box.top + box.height / 2 − (run.inkTop + run.inkBottom) / 2`）、`drawCenteredMixedSubheadline`（`offsetX = box.left + box.width / 2 − (inkLeft + inkRight) / 2`；`offsetY = box.top + box.height / 2 − (inkTop + inkBottom) / 2`）。
- **fit validation 必須保留**：renderer 回傳 headline／subheadline／protectionText 的 fit 結果，行為與 A／B－08 相同。
- **不得**抽 shared alignment helper。

**Medium local 2×：直接沿用 A／B－08 的 template-local 2×**：`MEDIUM_RENDER_SCALE = 2`，offscreen 暫存 canvas 為 `SPX_TVBN_1_WIDTH × 2` × `SPX_TVBN_1_HEIGHT × 2` = **2160 × 3840**，`scale(2, 2)` 後**只處理 headline ＋ protectionText**，再以 `imageSmoothingEnabled = true`／`imageSmoothingQuality = "high"` 高品質縮回正式尺寸合成。

- **Bold subheadline 不進 2×；Logo 也不進 2×。**
- 沿用每段文字自身的空字串零 ink fit validation（`if (text === "") return validateCenteredInkFitsBox(box, 0, 0);`）；**不得新增函式層「兩段 Medium 都空就跳過整個 surface」的整體 early-return**。
- **禁止抽 shared 2× helper。**

### 12.10 完整 draw order

**background → Logo → Medium local 2×（headline ＋ protectionText）→ Bold subheadline。**

`globalAlpha` 維持 `1`、`globalCompositeOperation` 維持 `source-over`；**不得新增 filter／blend／額外 compositing**。

### 12.11 Renderer 與人工對位驗證需求（已於 Phase 4 實作、Phase 6 人工 1:1 overlay 驗證 PASS）

- D－08 **未來必須**使用 D-specific template，預期最小路徑為 `bn/templates/D/08-spx-tvbn-1.js`，並以 `bn/templates/A/08-spx-tvbn-1.js` 為 baseline 做**最小 additive 差異**；**不得**修改已封箱的 A－08、不得在其中加 D branch、不得與 D－01／02／03／06／07 合併成 generic D renderer、不得建立 D template registry。
- renderer signature 依既有 D precedent 採 **images-object** 形式：`renderSpxTvbn1(canvas, images, { headline = "", subheadline = "", protectionText = "" } = {})`，並以防禦式解構取得 `backgroundImage` 與 `logoImage`；必須具備 **Logo readiness guard**、**background intrinsic-size guard**、**canvas-size guard**。固定素材須由 caller 載入完成後傳入，renderer 不自行 async 載圖、不建 image cache。
- **A－08 的 `assertFrameBounds` 必須保留並自然涵蓋新增的 Logo box**，不得弱化、不得刪除、不得繞過、不得另造 validation framework。
- D－08 **未來必須**有自己的獨立啟動檔，預期 `bn/launch/D/08_SPX TVBN_1.command`，query 必須為 **`?type=D&bn=08_SPX%20TVBN_1`**（空白維持 `%20` 編碼）；並在既有 `bn/launch/viewer.html` 以**最小 additive** D－08 分支提供人工對位校稿。08 屬 01～12 shared 區間，**不得新增 `fieldConfig`**。啟動檔與 viewer 僅為人工校稿工具，**不是**第二套正式 renderer、**不是**正式 Generator Preview、**不是**正式資料輸入流程。
- **未來人工驗證要求**：由 **Jamie 親自開啟 D－08 launcher，以 `bn/assets/D/對位/08_SPX TVBN_1.png` 做 1:1 overlay 人工對位驗證**；且**關閉 overlay 後，Logo ＋ 三段文字仍必須真正存在於 canvas 上**。此為**未來 Acceptance Criteria**，本階段尚未執行，不得寫成已 PASS。
- （落地補記）上述 implementation 需求已於 Phase 4 完成：實際檔案為 `bn/templates/D/08-spx-tvbn-1.js`、`bn/launch/D/08_SPX TVBN_1.command`（Git mode `100755`、query `?type=D&bn=08_SPX%20TVBN_1`）與 `bn/launch/viewer.html` 的最小 additive D－08 branch（未設 `fieldConfig`）；Phase 6 人工 1:1 overlay 對位驗證由 Jamie 親自執行並明確 PASS。詳見第 12.16 節。

### 12.12 Export Locked Behavior 與正式平台 fail-closed

- 版位 08 既有鎖定的 Export 規則（依 `bn/js/export.js` 唯讀實證）：`EXPORT_ITEMS` 中 `{ id: "08", name: "08_SPX TVBN_1", format: "jpg" }` —— **JPG 格式**、**無 `maxBytes`**；`EXPORT_DPI = 72`、`JPEG_QUALITY = 1.0`。`EXPORT_ITEMS` 以版位 id 提供，**與樣式 type 無關**。此為既有鎖定規則，D－08 **不得重新設計 Export**；本階段**不得修改 `bn/js/export.js`、不得執行 Export**。
- **D－08 目前只完成 Phase 0 Repository Investigation 與本節 Phase 1 Requirement**；尚未 Coding、尚未建立 renderer／launcher／viewer 分支、尚未人工對位驗證、尚無 Code Commit。
- 目前正式支援的樣式仍為 **A 與 B**；`bn/js/import.js` 的 `SUPPORTED_TYPES` 仍為 `["A", "B"]`，`bn/js/render-a.js` 的 `ASSET_BASE_BY_TYPE` 仍只有 A 與 B，`A_TABLE` **無 D entry、無 type 維度**，樣式 D 在正式平台**維持 fail-closed**（詳見第 6.1 節）。**本階段禁止修改 `bn/js/render-a.js`、`bn/js/import.js`、`bn/js/export.js`、`bn/js/app.js`、`bn/js/workspace.js`、`bn/js/editor.js`。**
- D 的正式 Excel worksheet Import、Restore、控制台 Preview 與 Export **尚未 enable**。
- D－08 的正式 Preview ↔ Export 一致性實測、D Excel Import／Restore、正式控制台 Preview／Export，以及版位 08 的 **JPG／72 dpi** 實際輸出驗證，全部 **deferred until D platform integration**，不得寫成已驗證，也不得為驗證而提前 enable Type D。
- D－04、D－05、D－09～17 尚未確認；本節裁決**只代表 D－08**，不得預先補完其他版位的 geometry、Logo 位置、文字差異或 renderer 路徑。樣式 C 不在本節範圍。

### 12.13 Explicit Non-Goals／Scope Boundary（本節明確不做）

1. 不修改 A／B 任何 template、launcher、assets 或既有行為；**`bn/templates/A/08-spx-tvbn-1.js` 必須 zero-diff**。
2. 不修改已完成的 D－01、D－02、D－03、D－06、D－07 的 template、launcher 或其 Requirement 條文。
3. 不處理 D－04、D－05、D－09～17；不預建其他 D 版位。
4. 不處理樣式 C。
5. 不預留 generic framework／plugin／registry redesign；不抽 shared Logo helper／shared 2× helper／shared alignment helper／D template registry；不建立任何跨版位抽象層。
6. Logo 不進 Excel mapping／Editor／Workspace state／JSON schema；**不新增 Logo 編輯欄位**；不重新納管 `Logo.png`。
7. 不修改字數規則；不做自動縮字／overflow UI／額外 padding／inset。
8. 不重新設計 Export 容量／格式／dpi 策略。
9. 不正式 enable Type D；不修改正式平台六個核心 JS。
10. 不重新裁決已 LOCKED 值：原 Photoshop／CSS 的 `2006`／`2065` 已裁決為座標偏移資料；protectionText 的對位標記 `760`／`50` 已裁決為 1px 標記差異；兩者皆不得重新討論或使用。
11. 本階段不 Coding、不建立 Proposal、不做 Documentation Update、不 Stage／Commit／Push／Tag／Release、不生成任何圖片／screenshot／export output／golden image。

### 12.14 Acceptance Criteria（可驗證，全部為未來驗收項目）

1. D－08 正式輸出 canvas 為 **1080 × 1920**。
2. `bn/assets/D/底圖/08_SPX TVBN_1.jpg` 與 `bn/assets/D/對位/08_SPX TVBN_1.png` **尺寸一致（皆 1080 × 1920）**，底圖 1:1 鋪滿 canvas、未縮放、未裁切；**對位圖只作人工 overlay，未進入正式 Preview 或 Export 產出**。
3. Logo 固定取自既有 tracked 的 `bn/assets/D/Logo.png`（784 × 112），為**唯一引用**，非 Excel 帶入、非使用者上傳、非 Editor 欄位；**未新增第二份 Logo 素材、未修改、未重存、未再次納管**。
4. Logo 正式 box 為 `{left:147, top:364, width:785, height:112}`。
5. **正式 geometry 未使用**原 Photoshop／CSS 的 `left = 2006` 與 `top = 2065`；`Δleft = 1859`、`Δtop = 1701` 僅作為 **D－08 自身的歷史更正證據**，未被推論至其他 D 版位、未建立共用 offset 規則。
6. Logo contain `scale = min(785/784, 112/112) = 1`（height-bound）。
7. Logo render size 為 **784 × 112**，destination **@ (147.5, 364)**。
8. Logo 左／右剩餘各 **0.5px**、上／下剩餘各 **0px**。
9. **fractional `147.5` 未被取整**（無 `Math.round`／`floor`／`ceil`／`trunc`／`toFixed`／`parseInt`／bitwise truncation）。
10. Logo 在 box 內為**水平＋垂直置中**。
11. Logo 保持**完整 source rect** 與 7 : 1 aspect，未 stretch／cover／crop／source clipping。
12. 三個文字 box **完整沿用 A／B－08**：headline `{167,507,745,87}`、subheadline `{94,619,890,114}`、protectionText **`{94,759,890,51}`**；**protectionText 未採對位圖的 `{94,760,890,50}`**。
13. 三段文字採 **centered ink alignment**（水平＋垂直 ink bounding-box 置中），保留 `textAlign="left"`／`textBaseline="alphabetic"` 與 `actualBoundingBox*` measurement，沿用 `validateCenteredInkFitsBox`／`drawCenteredText`／`drawCenteredMixedSubheadline` 行為；**fit validation 保留**。
14. 三段文字視覺樣式與 A／B－08 相同：`70pt Medium #ffffff`／`90pt Bold #fff285`／`40pt Medium #a6f4e6`。
15. `$`／`%` 為 `75pt Bold`（沿用 `#fff285`），且 `tokenizeSubheadline`／`adjacentOrdinaryRun`（`$` 取後方、`%` 取前方，含 reverse fallback）／`boundaryGlyphInkBottom` 的 glyph ink-bottom alignment 行為未改變。
16. Medium 採 **template-local 2×**、offscreen **2160 × 3840**、**只處理 headline ＋ protectionText**；未建立 shared 2× helper；**未新增整體 early-return**（保留每段文字自身零 ink fit validation）。
17. **Bold subheadline 與 Logo 均未進入 2× surface。**
18. draw order 為 **background → Logo → Medium local 2× → Bold subheadline**；`globalAlpha` 維持 `1`、`globalCompositeOperation` 維持 `source-over`，未新增 filter／blend／額外 compositing。
19. Logo smoothing 為 template-local 且自成一組 `save()` → `imageSmoothingEnabled = true` → `imageSmoothingQuality = "high"` → `drawImage()` → `restore()`；Logo 真正 draw 入 canvas，非 DOM overlay。
20. D－08 使用 D-specific renderer，signature 為 **images-object** 形式並防禦式解構 `backgroundImage`／`logoImage`，具備 **Logo readiness guard**、background intrinsic-size guard、canvas-size guard。
21. **`assertFrameBounds` 保留且自然涵蓋新增的 Logo box**，未弱化、未刪除、未繞過。
22. D－08 launcher query 精確為 **`?type=D&bn=08_SPX%20TVBN_1`**（空白維持 `%20`）。
23. `bn/launch/viewer.html` 僅新增**最小 additive D－08 branch**，且**未新增 `fieldConfig`**（08 屬 01～12 shared 區間，沿用 shared default 測試文字）。
24. **Jamie 親自開啟 D－08 launcher 完成 1:1 overlay 人工對位驗證**；且**關閉 overlay 後 Logo ＋ 三段文字仍真正存在於 canvas 上**。
25. A／B－01～17 與已完成的 D－01、D－02、D－03、D－06、D－07 行為與輸出未改變（**regression zero-diff**，`bn/templates/A/08-spx-tvbn-1.js` 尤須 zero-diff）。
26. `SUPPORTED_TYPES` 仍為 `["A", "B"]`；`ASSET_BASE_BY_TYPE` 仍只有 A 與 B；`A_TABLE` 無 D entry、無 type 維度；樣式 D 在正式平台仍 **fail-closed**。
27. Workspace／暫存 JSON schema **未新增 Logo 欄位**；Editor 未出現 Logo 欄位。
28. D－04、D－05、D－09～17 與樣式 C **零 scope drift**：無新增實作、無提前規格化、未建立 generic framework／plugin／shared helper。
29. **Deferred（不在本階段驗收）**：D－08 正式 Preview ↔ Export 一致性實測、D Excel worksheet Import 與 Restore、正式控制台 Preview／Export，以及版位 08 的 **JPG／72 dpi**（`JPEG_QUALITY = 1.0`、版位 08 無 `maxBytes`）實際輸出驗證 —— 全部 deferred until D platform integration。

### 12.15 Phase Boundary

- 本節為 **Phase 1 Requirement**，只定義「必須做到什麼」與「如何驗收」，**不指定實作方式**；模組切分、函式設計、參數介面、asset 載入時序等屬 Phase 2 Investigation 確認範圍與 Phase 3 Proposal 決定範圍。
- 本階段**未** Coding、**未**建立 Proposal（`bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 本輪未修改，D－08 Proposal 留待 Phase 3）、**未**做 Documentation Update（Architecture、Template Requirement、17 版位差異、全域 Requirement 的同步屬 D－08 完成後的 Documentation Update 階段）、**未** Stage／Commit／Push／Tag／Release。
- D－08 進入 Phase 2 之前，本節需經 Jamie／GPT Review PASS。
- （落地補記）本節已於 Phase 1 經 Jamie／GPT Review PASS，其後 Phase 2 Repository Investigation（substantive conflict = 0）、Phase 3 Proposal、Phase 4 Coding 與 Phase 6 Jamie 人工 1:1 overlay 對位驗證均已完成，Code Commit `d9359270fea1bd89e96a2eb27c4464b50e0ef6dc` 已建立；本輪 Documentation Update 只補記完成狀態，**未改寫本節任何 LOCKED geometry、typography 或 Acceptance Criteria 數值**。

### 12.16 D－08 Implementation Outcome（完成狀態）

本節全部 Requirement 條文與裁決均未改寫，僅補記完成狀態。

D－08 已依第 12 節 Requirement 與 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 的「D－08」章節完成 Phase 2 Repository Investigation（**substantive conflict = 0**）、Phase 3 Proposal、Phase 4 Coding，並經 **Phase 6 Jamie 親自開啟 `bn/launch/D/08_SPX TVBN_1.command` 完成人工 1:1 overlay 對位驗證且明確 PASS**。

Code Commit 為 **`d9359270fea1bd89e96a2eb27c4464b50e0ef6dc`**（`feat(bn): add D08 SPX TVBN 1 template`，parent `1c9e12782279491395fa5e0f7c9a2da7629f1ac9`），`git diff --check HEAD^ HEAD` PASS，**精確包含 5 個路徑（1 個 M ＋ 4 個 A）**：

- `M` `bn/launch/viewer.html`（最小 additive D－08 branch，+16／−1）
- `A` `bn/templates/D/08-spx-tvbn-1.js`（新增）
- `A` `bn/launch/D/08_SPX TVBN_1.command`（新增，Git mode `100755`）
- `A` `bn/assets/D/底圖/08_SPX TVBN_1.jpg`（新增納管，JPEG 1080 × 1920）
- `A` `bn/assets/D/對位/08_SPX TVBN_1.png`（新增納管，PNG 1080 × 1920）

`bn/assets/D/Logo.png` **不在本次 commit 內**（既有 tracked 共用 asset，由 D－01 納管；D－08 僅引用、未修改、未重存、未再次納管、未建立第二份）。A／B templates、A／B launchers、A／B assets、D－01／D－02／D－03／D－06／D－07 template 與 launcher、正式平台六個核心 JS、CSS、`bn/index.html`、vendor、fonts、banwords、LPBN 掛標與所有文件於本次 Code Commit 全部零修改；已封箱的 `bn/templates/A/08-spx-tvbn-1.js` 維持 zero-diff。

已達成之 Acceptance Criteria：第 12.14 節第 1～28 條。落地實測值與第 12 節裁決完全一致 —— canvas **1080 × 1920**；四個正式 box `logo {left:147, top:364, width:785, height:112}`、`headline {167,507,745,87}`、`subheadline {94,619,890,114}`、`protectionText {94,759,890,51}`。**protectionText 落地採 A／B－08 的 `{94,759,890,51}`；對位圖標記 `{94,760,890,50}` 依第 12.6 節裁決為對位標記的 1px 差異，未被採用、未重新裁決。** 原 Photoshop／CSS 的 Logo `left`（`2006`）與 `top`（`2065`）為已更正之歷史原始值，未出現於實作；`Δleft = 1859`、`Δtop = 1701` 僅為 D－08 自身的歷史更正實證，未建立共用 offset 規則、未推論至其他 D 版位。

Logo source `bn/assets/D/Logo.png` 原始 **784 × 112**，以 contain 縮放：`scale = min(785/784, 112/112) = 1`（**height-bound，1:1 不縮放**），destination **784 × 112**、**水平＋垂直置中** `destinationX = box.left + (box.width − destinationWidth) / 2 = ` **147.5**、`destinationY = box.top + (box.height − destinationHeight) / 2 = ` **364**，即 **`784 × 112 @ (147.5, 364)`**，左 **0.5px**／右 **0.5px**／上 **0px**／下 **0px**，aspect 保持 **7 : 1**，source rect 完整（`0, 0, 784, 112`）。**fractional `destinationX = 147.5` 原值保留**，實作實測不存在 `Math.round`／`Math.floor`／`Math.ceil`／`Math.trunc`／`toFixed`／`parseInt`／bitwise truncation，亦未 stretch／cover／crop／source clipping。Logo smoothing 為 template-local 獨立 `save() → imageSmoothingEnabled = true → imageSmoothingQuality = "high" → drawImage() → restore()`；Logo 由 renderer **真正畫入 canvas**（非 DOM overlay）、**未進 Medium 2×**、**未建立 shared Logo helper**（新增函式僅 template-local `drawSpxTvbn1Logo`）。

三段文字 typography 沿用 A／B－08（headline `70pt "ShopeeNotoSans Medium"` `#ffffff`／subheadline `90pt "ShopeeNotoSans Bold"` `#fff285`／`$`／`%` `75pt "ShopeeNotoSans Bold"` `#fff285`／protectionText `40pt "ShopeeNotoSans Medium"` `#a6f4e6`），採 **centered ink＝水平＋垂直 ink bounding-box 置中**（**不是 LeftCentered、不是 left／top**），保留 `textAlign="left"`／`textBaseline="alphabetic"`、`actualBoundingBoxLeft`／`Right`／`Ascent`／`Descent` measurement、`validateCenteredInkFitsBox`／`drawCenteredText`／`drawCenteredMixedSubheadline` 的既有公式與 fit validation；`$`／`%` 完整保留 `tokenizeSubheadline`、`adjacentOrdinaryRun`（**`$` 取後方 ordinary run、`%` 取前方 ordinary run**，含既有 reverse fallback）與 `boundaryGlyphInkBottom` 的 glyph ink-bottom alignment。Medium template-local 2× 為 `MEDIUM_RENDER_SCALE = 2`、offscreen **2160 × 3840**、只涵蓋 headline ＋ protectionText，**Bold subheadline 與 Logo 均未進 2× surface**，未新增函式層「兩段 Medium 都空就整體 early-return」，每段文字空字串各自回傳零 ink fit validation 之既有行為保留。draw order 為 **background → Logo → Medium local 2×（headline ＋ protectionText）→ Bold subheadline**，`globalAlpha` 維持 `1`、`globalCompositeOperation` 維持 `source-over`，未新增 filter／blend／compositing。

D－08 使用獨立 `bn/templates/D/08-spx-tvbn-1.js`（exports 恰 2 —— `waitForSpxTvbn1Fonts`、`renderSpxTvbn1`；零 import；`SPX_TVBN_1_WIDTH`／`SPX_TVBN_1_HEIGHT`／`SPX_TVBN_1_LAYOUT` 均為 template-local；signature 為 `renderSpxTvbn1(canvas, images, { headline, subheadline, protectionText } = {})`，以 images object 防禦式解構取得 `backgroundImage` 與 `logoImage`），已封箱的 `bn/templates/A/08-spx-tvbn-1.js` 未被修改或取代。**A－08 的 11 個 baseline functions 落地比對為 6/11 byte-identical ＋ 5/11 message-only behavior-equivalent，實質差異 0/11**：byte-identical 者為 `hasInk`、`validateCenteredInkFitsBox`、`drawCenteredText`、`tokenizeSubheadline`、`adjacentOrdinaryRun`、`drawCenteredMixedSubheadline`；behavior-equivalent 者為 **`assertFrameBounds`**、**`measureRun`**、**`boundaryGlyphInkBottom`**、**`drawSpxTvbn1MediumText`**、**`assertFontsReady`**，其唯一差異為各一行 runtime error message 的版位標示由 `A－08` 改為 `D－08`（沿用 D－01～07「D template 不殘留 A 版位標示」慣例），**演算法、控制流與回傳值零差異**。**不得記為 11/11 byte-identical。**

**`assertFrameBounds` 完整保留、仍由 `renderSpxTvbn1` 呼叫、仍遍歷 `Object.entries(SPX_TVBN_1_LAYOUT)`、四邊界檢查未弱化，因此自然一併驗證新增的 Logo box**，四個 box 實測 right／bottom 為 logo **932／476**、headline **912／594**、subheadline **984／733**、protectionText **984／810**，全部落於 **1080 × 1920** 內。另依 Proposal 第 11.6 節裁決，D－08 比照 D－01／D－06／D－07 precedent 加入最小 **canvas-size guard**（`canvas.width` 必須 `1080`、`canvas.height` 必須 `1920`，不符即 fail-fast）；此為 D template 層的一致性加強，**A－08 baseline 本身未被修改，亦未抽出 shared guard**。

第 12.14 節第 29 條之 deferred 項目維持不變：D－08 正式 Preview ↔ Export 一致性實測、D Excel worksheet Import 與 Restore、正式控制台 Preview／Export，以及版位 08 的 **JPG／72 dpi**（既有 LOCKED 規則，`EXPORT_ITEMS` 中 `{ id: "08", name: "08_SPX TVBN_1", format: "jpg" }`、`EXPORT_DPI = 72`、`JPEG_QUALITY = 1.0`、**版位 08 無 `maxBytes`／無 byte 容量上限**）實際 Export 驗證 —— 全部 **deferred until D platform integration**，本次**未執行** D Export 實測，不得記為已驗證。

**Jamie 的 PASS 是「人工 1:1 overlay 對位 PASS」，不是「正式平台 Preview／Export PASS」；後者尚未做。本次完成的是「D－08 renderer ＋ 人工對位驗證」，不是「D 樣式正式平台整合完成」。** 目前正式支援的樣式仍為 A 與 B，`SUPPORTED_TYPES` 仍為 `["A", "B"]`，`ASSET_BASE_BY_TYPE` 仍只有 A 與 B，`A_TABLE` 未加入 D entry 或 type 維度，正式 renderer registry 未 enable D，樣式 D 在正式平台維持 fail-closed；D 的正式 Excel Import／Restore／控制台 Preview／Export 尚未 enable。本節裁決**只代表 D－08**；D－04、D－05、D－09～17 尚未處理，不得由已完成的任何 D 版位推論其 geometry、Logo 位置或文字差異，樣式 C 不在本節範圍。落地狀態另見 `FSS_BN_Architecture.md` 第 44 節與 `FSS_BN_Template_Requirement_Specification_v1.0.md` 第 5.2.6 節。
