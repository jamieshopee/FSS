# FSS BN Generator－C 樣式共用 Proposal v1.0

> 文件治理：C 樣式採單一 Proposal 累加治理，不再建立逐版位 Proposal
>
> 目前支援：`C－01～14` 已完成正式接入
>
> 完成狀態：C－01～14 Phase 4 Coding 均已完成，均經 Jamie dedicated launcher 人工驗證 PASS，並已納入 Code Commit `0c9da10`；C－15～17 shared reuse decision 已 LOCKED，routing 尚未啟用
>
> 整併日期：2026-08-28
>
> 基準 HEAD：`0c9da10472ba3128ea90b64d2340ac8b178d4514`（`feat(bn): integrate C style 01-14`）
>
> Parent Docs Commit：`ad908331142f960fa8ee2176ad6b5297dd405581`（`docs(bn): document D style platform integration`）

---

## 1. Document Purpose／Governance

### 1.1 文件目的

本文件是 C 樣式唯一共用 Proposal。它將原本分別記錄於下列兩份逐版位文件的已核准內容整併為單一、可持續追加的治理來源：

- `FSS_BN_C01_DDcard_Proposal_v1.0.md`
- `FSS_BN_C02_MALL_HBN_Proposal_v1.0.md`

本次整併只改變 Proposal 文件治理，不重新設計 C、不重新選 renderer、不重開 state／routing／geometry 裁決，也不修改任何 implementation。

### 1.2 單一文件累加規則

1. C 樣式不再為每個版位建立 standalone Proposal。
2. C－01、C－02 的 scope、evidence、implementation decisions、verification boundary 與實際完成狀態集中保存在本文件。
3. C－03～14 的 Phase 3 evidence、裁決與完成紀錄均已追加於本文件；其目前正式狀態由第24節統一治理。
4. 已存在的 shared decision直接引用，不重複大段複製。
5. 新版位不得重寫、降級或返工已經 PASS 的版位；只有真正 regression 或 source-of-truth conflict 才能重新開啟。
6. 各版位維持自己的 scope、repository/reference evidence、renderer decision、geometry、exact implementation boundary與 verification result。
7. 共用架構記錄 C－01～14 實際成立的行為；C－15～17 只記錄已 LOCKED 的 shared reuse decision，不預建 geometry 或 C-specific renderer。
8. Requirement 與 Proposal 職責分離。本文件不改寫 Requirement，也不把 implementation decision反向升格為 USER LOCKED Requirement。

### 1.3 Scope

本文件涵蓋 C－01～14 的逐版位 Proposal evidence、正式 implementation decision、最終 geometry 與 Jamie launcher Manual PASS 紀錄，也涵蓋 C－15～17 已 LOCKED 的 shared reuse decision。歷史 Phase section 仍保存當時的 candidate／planned／pending 語意，但目前狀態一律由第24節及 C 樣式 Requirement 的較新同步內容治理。

本文件不授權重新量測或返工 C－01～14，不替 C－15～17 建立 countdown geometry、C-specific wrapper 或額外 state。C－15～17 routing 尚未啟用，不得將 requirement decision 誤寫為 runtime 已完成。

---

## 2. Proposal Status／Index

| 版位 | Proposal／Implementation 狀態 | Jamie 人工驗證 | 本文件位置 |
|---|---|---|---|
| `C－01｜01_DDcard BN` | Proposal裁決已落地；Phase 4 Coding完成 | dedicated launcher人工驗證 **PASS** | 第4節 |
| `C－02｜02_MALL HBN` | Proposal裁決已落地；Phase 4 Coding完成 | Jamie雙擊dedicated launcher並回覆「可以了」；**PASS** | 第5節 |
| `C－03｜03_Coin page BN` | Proposal裁決已落地；Phase 4 Coding完成；最終font調整為`60pt` | Jamie雙擊dedicated launcher人工確認；**PASS** | 第12節保留Phase 3歷史；最終lock見第13.19節 |
| `C－04｜04_Loyalty BN` | Proposal裁決已落地；Phase 4 Coding完成 | dedicated launcher人工驗證 **PASS** | 第13節保存歷史；第24節記錄current status |
| `C－05～14` | 各版Proposal裁決已落地；Phase 4 Coding完成 | 各版dedicated launcher人工驗證 **PASS** | 第14～23節保存逐版歷史；第24節記錄current status |
| `C－15～17` | shared reuse decision已LOCKED；不增加countdown；routing尚未啟用 | 尚無C runtime可驗證 | 第24節 |

C－15～17 尚未啟用 routing 不是 conflict，也不代表 C－01～14 的完成狀態有缺口。

---

## 3. C Style Shared Architecture（只記錄已成立決策）

### 3.1 Countdown domain contract

- C countdown合法值精確為 `0天`、`1天`、`2天`、`3天`、`4天`、`5天`、`6天`、`7天`、`8天`、`9天`。
- Excel來源為 worksheet `C` 的 `E16`。
- 工單、Workspace及JSON保存完整字串；系統不得把純數字拼接「天」。
- 不 trim、不coerce、不截斷、不補suffix、不fallback，也不接受regex近似值。
- `10天`、`00天`、`-1天`、純數字、空字串、英文、前後空白及額外文字均非法。
- `bn/js/countdown.js`是C－01～14共用的唯一allow-list與exact membership validation contract；不得為版位建立第二份清單。

### 3.2 Workspace／Import／Restore／JSON

- Workspace以共用 top-level `cCountdownText` 保存 C countdown single source of truth；不放入 `state.shared`，也不建立per-BN副本。
- C－01～14切換時共用同一countdown值，對應同一`C!E16`來源。
- C Excel Import共用 `C!B15`、`C!B16`、`C!B17`及`C!E16` mapping，並維持 atomic validation；非法 countdown使整次Import失敗。
- C Import／Restore的selected BN allow-list目前精確涵蓋01～14；C－15～17 routing尚未開放。
- Restore對 C workspace要求合法 `cCountdownText`；missing、`null`、空字串或非法值均拒絕。
- Workspace JSON維持 `format: "FSS BN Workspace"`、`version: 1`。
- type C serialization保存同一完整 `cCountdownText`；A/B/D JSON shape不因 C countdown改變。
- 現有 evidence不要求 JSON升版，本文件也不設計新schema。

### 3.3 Editor／Preview／Export

- C－01～14 Editor顯示同一countdown select，選項來自唯一shared allow-list；各版既有文字Editor行為維持原樣。
- 合法 countdown變更經既有 Workspace notify與 Preview lifecycle更新。
- 正式Preview走`renderBnToCanvas()`；C－01～14都由explicit C route進入各自production wrapper。
- Preview與Export共用同一 `renderBnToCanvas()` production renderer結果，不建立第二套正式drawing pipeline。
- 對位圖只供manual viewer人工校對，不進入正式 Preview或Export output。
- C－01～14已使用正式Preview／Export共用renderer path；C－15～17 routing尚未啟用，因此不得宣稱17版位完整C Export ready。

### 3.4 Renderer／asset／manual verification pattern

- C－01～14都採C-specific wrapper：先呼叫對應正式A renderer繪製既有文字，再在同一canvas疊加C countdown；geometry保持slot-local。
- C wrapper隔離 countdown validation、font readiness、geometry與drawing；A templates保持不修改。
- `render-a.js`使用C asset base與explicit C route table；目前01～14可解析，未知C BN不得fallback到A route。
- 每個已完成的 C－01～14 版位都有 dedicated `.command` launcher，並透過既有 viewer呼叫同一production wrapper供Jamie人工對位。
- Dedicated viewer／launcher是人工驗證入口，不是第二套正式renderer，也不代表完整C Export已完成。
- Wrapper是C－01～14已成立的共同策略，各版位geometry及wrapper細節保持獨立。C－15～17依shared reuse decision不建立countdown wrapper。

### 3.5 C－01～04 Countdown Rotation Effective Specification

Jamie在C－04 Phase 4後新增以下 **USER LOCKED** 決定：目前已實作的C－01、C－02、C－03、C－04 countdown Canvas rotation統一為精確`-2.1°`，視覺約為`2.1° CCW`。

- 此決定精確只適用C－01～04，並取代四個版位先前各自的rotation implementation／final／candidate值。
- 該次rotation決定本身未更動C－01～04的center、font、font size、color或uniform visual scale；C－01 font size後續再由第3.6節較晚的USER LOCKED決定更新。
- C－05～14仍待Jamie逐版提供需求；不得由本決定推論或預建相同rotation。
- C－15～17本輪不處理。
- 本文件後續保留的舊rotation measurement、Phase candidate與當時人工PASS紀錄均屬 **Historical / Superseded by Jamie's later -2.1° USER LOCKED decision**；它們只保存歷史真實性，不再代表目前effective rotation。

### 3.6 C－01 Countdown Font Size Effective Specification

Jamie後續新增 **USER LOCKED** 決定：C－01 countdown font size由`38.67pt`改為literal `40pt`，目前effective font string為`40pt "ShopeeNotoSans Bold"`。

- `40pt`保持literal pt，禁止轉換為px。
- 此決定取代C－01先前effective `38.67pt`；舊值只保留為 **Historical / Superseded by Jamie's later 40pt USER LOCKED decision**。
- C－01 color仍為`#ff4c45`、target center仍為`(274.5,563)`、Canvas rotation仍為`-2.1°`、uniform visual scale仍為`1.4`。
- C－02、C－03、C－04不受此font-size決定影響。

---

## 4. C－01｜`01_DDcard BN`

### 4.1 Scope與完成狀態

C－01 vertical slice包含：

- 沿用正式 A/B－01的headline、subheadline、protectionText rendering。
- 增加 countdown的Import、Workspace、Restore、Editor、Preview、JSON保存與production Export render path。
- 建立 C－01-specific wrapper及dedicated launcher/viewer branch。
- 維持 Preview／Export共用 `renderBnToCanvas()`。

上述 Phase 4 Coding已完成；Jamie已使用C－01 dedicated launcher人工驗證，結果 **PASS**。本節記錄最終已落地狀態，不再維持「待Coding／candidate／OPEN」語意。

### 4.2 Repository evidence baseline

- 正式 A/B－01 template：`bn/templates/A/01-ddcard-bn.js`。
- 正式 export function：`renderDdcardBn()`。
- Canvas：`531×792`。
- headline：layout `[90,141,351,37]`；`30pt "ShopeeNotoSans Medium"`；`#ffffff`。
- subheadline：layout `[43,192,445,57]`；`45pt "ShopeeNotoSans Bold"`；`#fff285`。
- subheadline `$`／`%`：`37pt "ShopeeNotoSans Bold"`，保留mixed-run ink-bottom alignment。
- protectionText：layout `[43,267,445,22]`；`18pt "ShopeeNotoSans Medium"`；`#a6f4e6`。
- 既有三欄以 `measureText()`與`actualBoundingBox*`將visual ink置中於layout box。
- A renderer會設定531×792 canvas、畫底圖與三欄，完成後caller仍可在同一canvas drawing。
- A－01 file-local helpers不需向外抽取；C wrapper重用正式 exported renderer與font waiter。
- Preview與Export既有正式橋接均走 `renderBnToCanvas()`。

### 4.3 Assets與data contract

- 底圖：`bn/assets/C/底圖/01_DDcard BN.jpg`，`531×792`。
- 對位圖：`bn/assets/C/對位/01_DDcard BN.png`，`531×792`，只供人工對位。
- 既有三欄來源沿用 `C!B15/B16/B17`。
- countdown來源固定為 `C!E16`，保存完整合法字串。
- Font asset為正式 `ShopeeNotoSans(content)-Bold`，Canvas family alias為`ShopeeNotoSans Bold`。

### 4.4 Renderer decision

採用 `bn/templates/C/01-ddcard-bn.js` C－01 wrapper：

1. 驗證合法 `cCountdownText`。
2. 等待 A－01 fonts及精確 countdown font ready。
3. 呼叫正式 A－01 `renderDdcardBn()`繪製底圖與三欄。
4. 在相同canvas以C－01-local transform疊加 countdown。

曾比較但未採用：

- 在 `render-a.js`／app／export orchestration直接疊圖：會讓bridge承擔template geometry並增加Preview／Export分歧風險。
- 修改共享A－01 renderer signature：會擴大A/B－01 regression surface並污染已封箱template。

因此 `bn/templates/A/01-ddcard-bn.js`不因C－01修改；D templates及其他A templates也不修改。

### 4.5 State／Import／Restore／Editor／JSON decisions

- C－01使用shared architecture的單一 `cCountdownText`，合法值為完整`0天～9天`字串。
- Import讀取 `C!B15/B16/B17`及`C!E16`；以唯一validation contract驗證並維持atomic replace。
- Restore要求type C JSON帶有合法countdown，再重建known fields。
- JSON維持version 1，type C serialization保存同一countdown；A/B/D shape不變。
- C－01 Editor在既有三欄後顯示native countdown select；不把countdown套入banwords、字數counter或IME text-input path。
- Editor合法變更沿用 `updateCCountdown()`與Workspace notification；非法值不進state或Preview。

### 4.6 Final PASS geometry

下列是目前實際C－01 geometry，且已經Jamie launcher人工確認 **PASS**：

```text
font string          = 40pt "ShopeeNotoSans Bold"
color                = #ff4c45
target visual center = (274.5, 563.0)
Canvas rotation      = -2.1°
visual rotation      ≈ 2.1° counterclockwise
uniform visual scale = 1.4
```

先前約`-2.017683°`的Jamie人工PASS rotation紀錄屬歷史狀態，已由第3.5節較晚的`-2.1°` USER LOCKED決定取代；其餘PASS geometry不變。

先前`38.67pt`的font-size紀錄屬歷史狀態，已由第3.6節較晚的literal `40pt` USER LOCKED決定取代。

- `scale=1.4`是最終PASS實作，不是早期candidate，不得降回1.0或省略。
- rotation以Canvas螢幕座標numeric convention記為負角度，視覺為逆時針。
- target是countdown visual ink center，不是alphabetic baseline或Photoshop layer box。
- renderer使用`measureText()`的`actualBoundingBoxLeft/Right/Ascent/Descent`求ink center，將該center移至local origin後執行translate／rotate／uniform scale／fillText。
- transform只包住countdown drawing，並以`save()`／`restore()`隔離。
- 禁止把`(274.5,563.0)`直接當作`fillText()` baseline座標。

Reference target的歷史evidence為`0天` approximate half-open visual ink bounds `[213,336) × [528,598)`，center `(274.5,563.0)`，edge約±1px。最終裁決以Jamie人工PASS為準。

### 4.7 Routing／Preview／Viewer／Launcher／Export

- `render-a.js`的C route 01指向C－01 wrapper與`01_DDcard BN.jpg`，並投影既有三欄及shared countdown。
- Preview call chain：Workspace → app token-protected Preview → `renderBnToCanvas()` → C route 01 → C－01 wrapper。
- Dedicated launcher：`bn/launch/C/01_DDcard BN.command`。
- Viewer query：`?type=C&bn=01_DDcard%20BN`。
- Viewer使用正式wrapper、C底圖與C對位圖，提供三欄controls、countdown select及overlay toggle；不複製production drawing algorithm。
- Export item 01既有JPG、filename、245,000-byte上限、72 DPI、quality及encoder流程保持不變；正式render仍由同一bridge取得C－01 wrapper結果。

### 4.8 Exact implementation boundary（實際落地責任）

C－01落地新增：

- `bn/js/countdown.js`
- `bn/templates/C/01-ddcard-bn.js`
- `bn/launch/C/01_DDcard BN.command`

C－01落地所需shared responsibility位於：

- `bn/js/render-a.js`－C asset／route／field projection。
- `bn/js/workspace.js`－countdown lifecycle與validated update。
- `bn/js/import.js`－C Excel Import、Restore及candidate preservation。
- `bn/js/editor.js`－type-aware countdown control。
- `bn/js/app.js`－Editor context／change routing及C selection gate。
- `bn/js/export.js`－type C JSON serialization；不改Export loop。
- `bn/css/styles.css`－countdown select及正式font mapping所需樣式。
- `bn/launch/viewer.html`－C－01 manual branch。

不修改 A－01 template、D templates、A/B/D assets、fonts、vendor、正式Export loop或C Requirement／Architecture。

### 4.9 Verification plan與完成結果

已採用的verification boundary包括：JS syntax/static checks、launcher shell syntax、route與unsupported gate、shared validator合法／非法集合、Editor exposure、Import atomicity、Restore／JSON round-trip、Preview production route、Viewer dimensions／overlay、A/B/D regression smoke及Git scope檢查。

最終人工驗證由Jamie雙擊C－01 launcher，確認C底圖、531×792 canvas、A/B－01三欄沿用、countdown合法值、正式font／color、位置／rotation／scale及overlay alignment。結果為 **PASS**。

---

## 5. C－02｜`02_MALL HBN`

### 5.1 Scope與完成狀態

C－02 vertical slice包含：

- 建立C－02 production wrapper，沿用正式A/B－02三欄後疊加shared countdown。
- 將既有C gates從只有01最小擴充為精確01＋02。
- 重用既有Workspace／countdown／JSON架構，不新增schema或第二份data contract。
- 建立C－02 dedicated launcher與viewer branch。

Phase 4 Coding已完成。Jamie已雙擊 `bn/launch/C/02_MALL HBN.command`並回覆「可以了」，所以目前實際C－02 geometry及人工視覺驗證結果均為 **PASS**；不再列為candidate或OPEN。

### 5.2 A/B－02 reuse evidence

- 正式template：`bn/templates/A/02-mall-hbn.js`。
- 正式export function：`renderMallHbn()`。
- Canvas：`1200×360`。
- headline：layout `[98,153,351,37]`；`30pt "ShopeeNotoSans Medium"`；`#ffffff`。
- subheadline：layout `[98,200,445,57]`；`45pt "ShopeeNotoSans Bold"`；`#fff285`。
- subheadline `$`／`%`：`37pt "ShopeeNotoSans Bold"`，保留mixed-run ink-bottom alignment。
- protectionText：layout `[98,273,445,22]`；`18pt "ShopeeNotoSans Medium"`；`#a6f4e6`。
- 三欄使用`measureText()`與`actualBoundingBox*`對位；headline與protectionText保留既有Medium 2× temporary canvas行為。
- A/B－02共用正式A renderer；C－02不得改變A/B route、assets或output。

### 5.3 Assets與countdown typography

- 底圖：`bn/assets/C/底圖/02_MALL HBN.jpg`，`1200×360`。
- 對位圖：`bn/assets/C/對位/02_MALL HBN.png`，`1200×360`，只供人工對位。
- Font asset：`ShopeeNotoSans(content)-Bold`。
- 正式Canvas font string：`53pt "ShopeeNotoSans Bold"`。
- Color：`#ff4c45`。
- `53pt`保持pt，不轉px，也不以其他font-size補償geometry。
- 只允許uniform visual scale；禁止non-uniform scale。

### 5.4 Renderer candidates與採用決策

採用 C－02-specific wrapper `bn/templates/C/02-mall-hbn.js`：

1. Import正式A－02 dimensions、renderer及font waiter。
2. Reuse `isValidCCountdown()`，不建立第二份allow-list。
3. 先等待A－02 fonts，再精確load/check `53pt "ShopeeNotoSans Bold"`。
4. 驗證合法countdown後呼叫正式A－02 renderer繪製三欄。
5. 驗證canvas為1200×360，再以C－02-local transform疊加countdown。
6. 以`measureText()`及`actualBoundingBox*`求visual ink center；transform以`save()`／`restore()`隔離。

未採用：

- 修改共享A－02 renderer：污染A/B共用contract並違反A template不修改邊界。
- 在render bridge／app層疊圖：混合routing／UI與template geometry責任，並使Viewer與production容易分歧。

C－02 wrapper不import或reuse C－01 geometry constants；每個版位geometry獨立。

### 5.5 Final current implemented geometry／Jamie PASS

```text
font string          = 53pt "ShopeeNotoSans Bold"
color                = #ff4c45
target visual center = (825, 251.5)
Canvas rotation      = -2.1°
visual rotation      = 2.1° counterclockwise
uniform visual scale = 1.0
```

上述是目前實際實作，且Jamie已透過C－02 dedicated launcher回覆「可以了」，因此記錄為人工驗證 **PASS**，不是尚待裁決的candidate。

先前`-1.5°`的Jamie人工PASS rotation紀錄屬歷史狀態，已由第3.5節較晚的`-2.1°` USER LOCKED決定取代；其餘PASS geometry不變。

歷史reference measurement evidence保留如下：

```text
supported visual envelope = [769,220)–[881,283)
reference center          ≈ (825,251.5)
reference dimensions      ≈ 112×63px
reference/runtime ratio   ≈ 0.972
```

`0.972`只是在首次實作前由reference與runtime ink bounds得到的歷史measurement evidence；它從未成為正式scale。正式目前實作scale是 **1.0**，且已經Jamie人工PASS。

### 5.6 Routing／Import／Restore／Editor／App decisions

- `render-a.js`的`C_TABLE`從01擴為精確01＋02；02 entry指向C－02 wrapper與`02_MALL HBN.jpg`。
- C－01 route與geometry維持原樣；C－03～17仍explicit unsupported，未知C BN不得fallback到A table。
- field projection及countdown pre-validation只涵蓋C－01／02。
- `bn/js/workspace.js`不因C－02修改；既有shared `cCountdownText`已足夠。
- Import保留既有worksheet及B15/B16/B17/E16 mapping；C context selected BN只保留01或02，其他值安全fallback至01而不是開放新slot。
- Restore的C allow-list只接受selected BN 01或02；JSON format/version與shared property不變。
- Editor countdown exposure從C－01擴為C－01／02，仍reuse同一field definition、select、allowed values及update path。
- app只enable C－01、C－02 buttons；C－03～17保持disabled。
- C keyboard selection保持停用，避免generic navigation進入未支援C－03；A/B/D keyboard behavior不變。

### 5.7 Preview／Viewer／Launcher／Export

正式Preview call chain：

```text
Workspace state
  → app renderPreview()
  → renderBnToCanvas(canvas, state, "02")
  → C_TABLE["02"]
  → C－02 production wrapper
  → formal A－02 renderer
  → C－02 countdown overlay
```

- Viewer query：`?type=C&bn=02_MALL%20HBN`。
- Viewer載入production wrapper、C－02底圖與對位圖，dimensions固定1200×360，沿用三欄controls、countdown select及overlay toggle。
- Dedicated launcher：`bn/launch/C/02_MALL HBN.command`。
- C－01 Viewer／launcher不因C－02修改。
- `bn/js/export.js`不因C－02修改；02 item既有JPG filename、145,000-byte上限、72 DPI、quality及encoder流程保持不變。
- Export執行item 02時經同一`renderBnToCanvas()`與production wrapper；不建立C－02-only Export，也不跳過C－03～17。

### 5.8 Exact implementation boundary（實際落地責任）

C－02落地新增：

- `bn/templates/C/02-mall-hbn.js`
- `bn/launch/C/02_MALL HBN.command`

C－02落地所需修改責任精確位於：

- `bn/js/render-a.js`－C－02 wrapper import、route及01／02 field／validation gate。
- `bn/js/import.js`－C Import selection preservation與Restore 01／02 allow-list。
- `bn/js/editor.js`－countdown control exposure擴為01／02。
- `bn/js/app.js`－C button allow-list擴為01＋02，keyboard gate不變。
- `bn/launch/viewer.html`－C－02 production branch、assets、dimensions及既有controls整合。

C－02不修改：

- `bn/templates/A/02-mall-hbn.js`
- `bn/templates/C/01-ddcard-bn.js`
- `bn/launch/C/01_DDcard BN.command`
- `bn/js/workspace.js`
- `bn/js/export.js`
- `bn/js/countdown.js`
- `bn/css/styles.css`
- C Requirement、Architecture、A/B/D docs／templates／assets／launchers

### 5.9 Verification plan與完成結果

已採用的verification boundary包括：JS syntax/static及launcher shell checks、C 01／02 route與C 03 reject、button／keyboard gates、production wrapper及canvas dimensions、single validation contract、Editor exposure、Import selection／atomicity、Restore allow-list、JSON v1 round-trip、Preview path、Viewer overlay、Export zero-change與A/B/D及C－01 regression checks。

Jamie人工驗證使用dedicated C－02 launcher，確認1200×360 C底圖、A/B－02三欄、`53pt`字型、`#ff4c45`、countdown位置／rotation／scale及overlay visual result，並明確回覆「可以了」。C－02人工視覺驗證結果為 **PASS**。

---

## 6. Current Supported C Slots

目前正式接入且已完成 Jamie launcher 人工驗證的 C 版位為 `C－01～14`。這十四個版位均已納入 Code Commit `0c9da10`。

C－15～17 的產品決策為 shared reuse 且不增加 countdown；routing 尚未接入，因此目前不得寫成 runtime supported。

---

## 7. Regression Boundary

後續任何C版位工作都必須保護：

- C－01已PASS的其他geometry保持：`40pt`、`#ff4c45`、center `(274.5,563.0)`及uniform scale `1.4`；目前effective Canvas rotation為`-2.1°`。
- C－02已PASS的其他geometry保持：`53pt`、`#ff4c45`、center `(825,251.5)`及uniform scale `1.0`；目前effective Canvas rotation為`-2.1°`。
- C－03已PASS的其他geometry保持：`60pt`、`#ff4c45`、center `(863.5,276.5)`及uniform scale `0.94`；目前effective Canvas rotation為`-2.1°`。
- C－01～14既有production route、Preview、Import、Restore、Editor、JSON、viewer及launcher行為。
- A/B/D不得因後續C版位被重構或改變route／asset／renderer output。
- A templates不得為C countdown修改。
- 各版位geometry獨立；不得把前一版位的center、rotation或scale直接套用下一版位。
- Photoshop規格若以pt鎖定，必須保留pt；不得擅自把目前effective `40pt`、`53pt`等轉為px。
- C countdown完整字串、`C!E16` single source、唯一validation contract及JSON v1 round-trip。
- Preview／Export共用`renderBnToCanvas()`的同源性。
- C－15～17若後續接入，只能落地已LOCKED的shared reuse decision，不得新增countdown或C-specific geometry。
- 共用Proposal不代表「一次設計全部C版位」，也不授權預建route、registry、geometry或抽象。

---

## 8. Scope／Out of Scope

### 8.1 本文件保留的責任

- C－01～14已完成的decisions、implementation records與Jamie Manual PASS。
- C－01～14共用且已成立的countdown、state、Import、Restore、Editor、Preview、JSON、Export及manual verification architecture。
- C－15～17 shared reuse decision與asset dependency evidence。
- 後續Proposal治理規則與regression boundary。

### 8.2 明確不在範圍

- C－01～14任何返工、重新量測或pixel tuning。
- C－15～17任何countdown geometry、C-specific wrapper、額外state／mapping／Editor control，或未經implementation的runtime支援宣稱。
- C全樣式registry／config／framework預建或架構重設。
- C－01～14重新人工驗證。
- A/B/D重構、D返工或歷史問題。
- 修改runtime code、template、launcher、asset、font、vendor或正式工單。
- 跳過C－15～17 routing現況而宣稱17版位完整C Export成功。
- 圖片生成、comparison image、diff image、screenshot或asset轉檔。

---

## 9. Future Proposal Update Rule

從C－03開始：

1. 不新增`FSS_BN_C03_..._Proposal...`或其他逐版位C Proposal檔案。
2. 每個新C版位完成Phase 3時，只在本文件尾端追加自己的slot section。
3. Slot section必須保存自己的scope、source-of-truth、repository/reference evidence、renderer decision、geometry、routing/data responsibilities、exact file boundary、verification plan與實際outcome。
4. 已有shared decision以cross-reference方式沿用，不重複generic流程文字。
5. 只有新slot evidence與第3節既有shared architecture真正衝突時，才提出清楚、最小的shared architecture delta。
6. Architecture delta不得反向改寫已PASS C－01／02；若確有regression或source-of-truth conflict，必須明確列為conflict並由Jamie裁決。
7. 歷史 section 中的candidate／planned／pending／unsupported僅代表當時 phase 狀態；current status以第24節為準。
8. Requirement繼續負責產品需求；本Proposal負責已核准的實作裁決與落地紀錄。不得用Proposal取代或反向改寫Requirement。
9. C－15～17只記錄已LOCKED的shared reuse與dependency evidence；routing實作仍需Jamie後續授權。

---

## 10. Documentation Consolidation Record

| 日期 | 變更 | 結果 |
|---|---|---|
| 2026-08-28 | 建立C樣式單一共用Proposal治理 | 將C－01、C－02逐版位Proposal的重要approved content整併至本文件；不重新裁決技術內容，不修改implementation |
| 2026-08-28 | 補記C－01完成狀態 | Phase 4 Coding完成；最終geometry含uniform scale 1.4；Jamie dedicated launcher人工驗證PASS |
| 2026-08-28 | 補記C－02完成狀態 | Phase 4 Coding完成；current implemented geometry為53pt、center `(825,251.5)`、rotation `-1.5°`、scale 1.0；Jamie雙擊launcher並回覆「可以了」，人工驗證PASS |
| 2026-08-28 | 鎖定後續文件治理 | C－03～14未來Phase 3直接追加本文件；C－15～17目前不新增內容；不再建立逐版位C Proposal |
| 2026-08-28 | 新增C－03 Phase 3 Proposal | Phase 0 USER LOCKED與Phase 2 evidence已收斂；核准C－03-specific wrapper及7-file Phase 4邊界，首次geometry為center `(863.5,276.5)`、Canvas rotation `-2.2°`、uniform scale `0.94`；尚未Coding、尚未Jamie人工驗證 |
| 2026-08-28 | 補記C－03完成與最終lock | Phase 4 Coding完成；Jamie人工PASS；最終font為`60pt`，center `(863.5,276.5)`、Canvas rotation `-2.2°`、uniform scale `0.94`；第12節保留Phase 3歷史，第13.19節作後續regression lock |
| 2026-08-28 | 新增C－04 Phase 3 Proposal | 核准C－04-specific wrapper及7-file Phase 4邊界；首次geometry candidate為center `(523,145)`、Canvas rotation `-3.3°`、neutral uniform scale `1.0`；`32pt`保持USER LOCKED literal；尚未Coding、尚未Jamie人工驗證 |
| 2026-08-28 | C－01～04 rotation統一修正 | Jamie在C－04 Phase 4後新增USER LOCKED決定：目前已實作C－01～04的Canvas rotation統一為`-2.1°`（視覺約`2.1° CCW`）；取代先前各版位rotation值，其他geometry不變；C－05～17不在本決定範圍 |
| 2026-08-28 | C－01 countdown font-size修正 | Jamie後續新增USER LOCKED決定：C－01由`38.67pt`改為literal `40pt "ShopeeNotoSans Bold"`；center `(274.5,563)`、rotation `-2.1°`、scale `1.4`及color `#ff4c45`不變；C－02／03／04不受影響 |

---

## 11. Conflict／Open Status

### CONFLICT

None。

C Requirement已同步涵蓋C－01～17，與目前C－01～14 implementation及C－15～17 shared reuse decision一致。

### OPEN

- C－15～17：shared reuse decision已LOCKED；C routing尚未啟用。
- 完整17版位C Export：仍受C－15～17 routing未啟用限制；本文件不宣稱已完成。

C－01～14的current implemented geometry及Jamie manual result均已PASS，不列為OPEN。

---

## 12. C－03｜`03_Coin page BN` Phase 3 Proposal

> **Historical phase record — current result is FINAL LOCKED／Manual Verification PASS.** 本節的candidate、planned、尚未Coding與待Jamie驗證文字只記錄當時Phase 3狀態；current authority為第24節與Code Commit `0c9da10`，geometry數值不因本註記改寫。

> **Historical / Superseded by Jamie's later -2.1° USER LOCKED decision：** 本節保存C－03 Phase 2 evidence、Phase 3 `-2.2°` candidate及當時人工PASS歷史；目前effective Canvas rotation以第3.5節的`-2.1°`為準，center、font、font size、color及uniform scale不變。

> 狀態：**C－03 Phase 3 Proposal approved for Phase 4 implementation**
>
> 尚未Phase 4 Coding、尚未Phase 5 Verification、尚未Phase 6 Jamie Manual Verification，亦尚未成為supported slot
>
> 本節依第1.2節單一文件治理規則追加；沒有建立C－03 standalone Proposal

### 12.1 Scope／Phase Boundary

本節只裁決C－03最小vertical slice：

- 完整reuse正式A/B－03 headline、subheadline及protectionText renderer行為。
- 以C－03-specific wrapper在相同canvas疊加既有C countdown。
- 將既有C gates由精確01／02最小擴為01／02／03。
- Reuse現有countdown state、validation、Import、Restore、Editor、JSON與Preview／Export bridge。
- 新增dedicated C－03 launcher及既有viewer的最小C－03 branch，供Jamie人工驗證。

本節不處理C－04～17、不建立C framework／registry redesign、不修改Requirement／Architecture，也不代表C－03已Coding、已支援或已人工PASS。

### 12.2 USER LOCKED Requirements

- Slot：`03_Coin page BN`。
- Headline、subheadline、protectionText的位置、字型樣式、字型大小及顏色與正式A/B－03完全相同。
- Countdown font source：`ShopeeNotoSans(content)-Bold`。
- 正式Canvas alias：`ShopeeNotoSans Bold`。
- 正式font string精確為`59.35pt "ShopeeNotoSans Bold"`。
- Countdown color：`#ff4c45`。
- 合法值精確為完整字串`0天`～`9天`。
- Excel source：`C!E16`；不得自行補「天」。
- `59.35pt`必須原值保留，禁止由應用程式換算成其他font-size。
- 禁止修改font-size補償geometry。
- 若需視覺尺寸修正，只能以獨立uniform visual scale處理；禁止non-uniform scale。
- 底圖：`bn/assets/C/底圖/03_Coin page BN.jpg`。
- 對位：`bn/assets/C/對位/03_Coin page BN.png`，只供人工校對，不進正式Preview／Export output。
- 禁止生成圖片。

### 12.3 Repository Asset Evidence

| 用途 | Format／Mode | Dimensions | Evidence boundary |
|---|---|---|---|
| `bn/assets/C/底圖/03_Coin page BN.jpg` | JPEG／RGB | `1200×391` | 正式blank bottom；不是finished reference |
| `bn/assets/C/對位/03_Coin page BN.png` | PNG／RGBA | `1200×391` | 對位overlay；不是正式文字renderer |

底圖與overlay dimensions一致。Phase 4不得修改、轉檔、重新壓縮或重存兩個assets。

### 12.4 A/B－03 Formal Renderer Evidence／Mandatory Reuse

正式template：`bn/templates/A/03-coin-page-bn.js`。

Exports：

- `renderCoinPageBn()`
- `waitForCoinPageBnFonts()`

Canvas：`1200×391`。

正式三欄：

| Field | Layout | Font | Color |
|---|---|---|---|
| headline | `[92,168,395,46]` | `37pt "ShopeeNotoSans Medium"` | `#ffffff` |
| subheadline ordinary runs | `[92,225,500,64]` | `50pt "ShopeeNotoSans Bold"` | `#fff285` |
| subheadline `$`／`%` runs | 同一subheadline layout | `40pt "ShopeeNotoSans Bold"` | `#fff285` |
| protectionText | `[92,302,500,25]` | `21pt "ShopeeNotoSans Medium"` | `#a6f4e6` |

正式behavior：

- `textAlign = "left"`、`textBaseline = "alphabetic"`。
- 使用`measureText()`及`actualBoundingBox*`，將visual ink top-left對準layout left/top。
- Headline／protectionText使用2× temporary canvas後high-quality downsample。
- Subheadline直接繪於正式canvas。
- `$`／`%`沿用A－03既有特殊run splitting及boundary-glyph ink-bottom alignment。
- Type A與B實際從同一`A_TABLE["03"]`取得此renderer，不是只依命名推測共用。

因此Phase 4必須直接reuse正式A－03 renderer，不得複製、抽取或重新實作三欄drawing helpers，也不得修改`bn/templates/A/03-coin-page-bn.js`。

### 12.5 Existing C Shared Infrastructure Decision

C－03直接reuse：

- `bn/js/countdown.js`的唯一exact allowed-values／validation contract。
- `bn/js/workspace.js`的top-level `cCountdownText`及`updateCCountdown()`。
- C worksheet selection及`C!B15/B16/B17`、`C!E16` mapping。
- JSON v1 type C-only `cCountdownText` serialization。
- Restore的exact countdown validation。
- Editor既有countdown field definition、select、options及update path。
- `renderBnToCanvas()`作為Preview／Export共同production bridge。
- 既有C asset base。

禁止建立第二套countdown state、validator、JSON schema、Excel mapping或Editor control；不升JSON version，也不新增C－03 Excel cell。

### 12.6 Finished Reference／Measured Geometry Evidence

可信finished reference：`/Users/jamie/Downloads/C-assets/03_Coin page BN.jpg`，`1200×391` JPEG RGB。它與repo blank bottom不同，並包含完成文案及`0天`。

`0天` measured evidence採half-open coordinates：

```text
core bounds             = [801,925) × [241,312)
core size               = 124 × 71
core center             = (863.0,276.5)
support envelope        = [800,927) × [240,313)
support size            = 127 × 73
support center          = (863.5,276.5)
center uncertainty      ≈ ±1px
```

正式`59.35pt "ShopeeNotoSans Bold"` runtime metrics：

```text
actualBoundingBoxLeft    = -3.639979839324951
actualBoundingBoxRight   = 131.118408203125
actualBoundingBoxAscent  = 65.2822494506836
actualBoundingBoxDescent = 6.5677947998046875
advance width            = 132.8592529296875
visual ink width         = 134.75838804244995
visual ink height        = 71.85004425048828
```

Rotation evidence：

- Reference視覺為輕微逆時針。
- 不同threshold evidence約`1.8°～2.5°`逆時針。
- Evidence-supported中心候選約`2.2°`逆時針；Canvas numeric candidate約`-2.2°`。
- JPEG及glyph輪廓不能證明Photoshop exact source rotation；此數值只屬approximate evidence。
- 禁止直接套用C－01或C－02角度。

Scale evidence：

```text
support/runtime raw width ratio          ≈ 0.94243
support/runtime raw height ratio         ≈ 1.01600
raw mean                                 ≈ 0.97922
scale-1 envelope after ~2.2° rotation    ≈ 137.42 × 76.97
reference support                        ≈ 127 × 73
rotation-adjusted width-derived scale    ≈ 0.9242
rotation-adjusted height-derived scale   ≈ 0.9484
rotation-adjusted mean candidate         ≈ 0.9363
evidence-supported exploration range     ≈ 0.92～0.96
```

目前沒有足夠證據要求non-uniform scaling。以上measurement不得用來修改`59.35pt`。

### 12.7 Phase 3 First-Implementation Geometry Decision

Phase 4首次implementation精確採：

```text
COUNTDOWN_FONT          = '59.35pt "ShopeeNotoSans Bold"'
COUNTDOWN_COLOR         = '#ff4c45'
COUNTDOWN_TARGET_CENTER = (863.5, 276.5)
COUNTDOWN_ROTATION      = -2.2deg
COUNTDOWN_VISUAL_SCALE  = 0.94
```

分類必須保持：

- `59.35pt`、font source／alias與`#ff4c45`是USER LOCKED。
- Center `(863.5,276.5)`是Phase 2 measured support center所支持的首次implementation target。
- `-2.2deg`是Phase 3首次Canvas rotation candidate，來源為約`1.8°～2.5°`逆時針evidence。
- `0.94`是Phase 3首次uniform scale candidate，來源為reference／runtime及rotation-adjusted比較。
- Rotation與scale不是Photoshop exact source values，也尚未經Jamie人工鎖定。

Phase 4不得自動pixel-tune或自行把`-2.2deg`／`0.94`換成其他值。Jamie若回報視覺不符，只能在C－03 wrapper內最小調整target center、rotation或uniform scale；`59.35pt`不得修改。

### 12.8 Renderer Architecture Decision

採用C－03-specific wrapper，Phase 4預定新增：

`bn/templates/C/03-coin-page-bn.js`

Wrapper責任：

1. Import正式A－03 dimensions、`renderCoinPageBn()`及`waitForCoinPageBnFonts()`。
2. 先呼叫正式A－03 renderer繪製底圖及三欄，不複製三欄drawing logic。
3. Reuse既有`isValidCCountdown()`；非法或missing countdown fail closed。
4. 驗證正式Bold countdown font ready。
5. 驗證A renderer完成後canvas仍為`1200×391`。
6. 在同一canvas疊加countdown，使用精確`59.35pt "ShopeeNotoSans Bold"`與`#ff4c45`。
7. 以`measureText()`及`actualBoundingBoxLeft/Right/Ascent/Descent`求glyph visual ink center。
8. 使用C－03-local transform：

   ```text
   save
   → translate(863.5, 276.5)
   → rotate(-2.2deg)
   → scale(0.94, 0.94)
   → fillText(text, -inkCenterX, -inkCenterY)
   → restore
   ```

9. Rotation使用Canvas numeric convention，視覺約`2.2°`逆時針。
10. Target center是visual ink center，不是alphabetic baseline；禁止直接當`fillText()`座標。
11. 禁止應用程式自行轉換`59.35pt`、禁止non-uniform scale、禁止transform洩漏。

### 12.9 Routing Decision

Phase 4只把C support gates由精確01／02擴為01／02／03：

- `bn/js/render-a.js` import C－03 wrapper。
- `C_TABLE`新增精確`"03"` entry，background為`03_Coin page BN.jpg`。
- Countdown field projection及pre-validation allow-list擴為01／02／03。
- C－04～17繼續explicit reject；未知C slot不得fallback到`A_TABLE`。
- C－01／02 entries、geometry及結果不變。
- A/B/D route resolution不修改、不重構。

### 12.10 Import Decision

`bn/js/import.js`只擴充C selected BN allow-list：

- C context 01 Import後維持01。
- C context 02 Import後維持02。
- C context 03 Import後維持03。
- 其他C slot context維持現有安全fallback至01，不順手開放C－04～17。
- `C!B15/B16/B17`及`C!E16` mapping完全不變；不新增Excel cell。
- Illegal countdown仍使Import atomic failure。
- A/B/D Import behavior不變。

### 12.11 Restore／JSON Decision

- Type C JSON v1 selected BN allow-list擴為01／02／03。
- C－04～17繼續explicit reject。
- `cCountdownText`仍使用唯一exact validation。
- JSON format仍為`FSS BN Workspace`、version仍為`1`。
- 不新增C－03 property、不修改`bn/js/export.js`。
- A/B/D Restore及serialized JSON shape不變。

### 12.12 Editor Decision

- `bn/js/editor.js`的C countdown select exposure由01／02擴為01／02／03。
- Reuse同一field definition、options、validation及workspace update path。
- 不建立第二套control。
- C－04～17不顯示countdown。
- A/B/D Editor不變。

### 12.13 App Decision

- `bn/js/app.js`只enable C－01／02／03 buttons。
- C－04～17 buttons保持disabled。
- C keyboard navigation現有early return保持，不恢復generic keyboard navigation。
- Preview lifecycle、Workspace subscription及A/B/D behavior不重構。

### 12.14 Viewer Decision

`bn/launch/viewer.html`只新增C－03 branch：

- Query：`type=C&bn=03_Coin%20page%20BN`。
- Import production C－03 wrapper及既有countdown module。
- Dimensions：`1200×391`。
- Bottom：`../assets/C/底圖/03_Coin page BN.jpg`。
- Overlay：`../assets/C/對位/03_Coin page BN.png`。
- 顯示A/B－03對應三欄inputs及共用`0天～9天`select。
- Countdown切換沿用既有即時重繪；overlay toggle及dimensions check沿用現有機制。
- 不建立第二份Viewer，不複製production drawing algorithm。
- C－01／02 viewer branches不得改寫；C－04～17不得新增branch。

### 12.15 Launcher Decision

Phase 4新增：

`bn/launch/C/03_Coin page BN.command`

精確URL：

```text
http://127.0.0.1:4173/bn/launch/viewer.html?type=C&bn=03_Coin%20page%20BN
```

Launcher沿用C－01／02 convention：Python HTTP server、port readiness、cleanup、browser open、error handling及既有executable mode。它不得依賴C－04～17，也不得修改C－01／02 launchers。

### 12.16 Workspace／Countdown／Export／CSS Boundary

Phase 4預期且要求：

- `bn/js/workspace.js`不修改；直接reuse`cCountdownText`／`updateCCountdown()`。
- `bn/js/countdown.js`不修改；直接reuse現有exact validator。
- `bn/js/export.js`不修改；JSON v1及17-item Export loop維持原狀。
- `bn/css/styles.css`不修改；正式font mapping及既有countdown control styling已足夠。

不得建立C－03-only Export、不得skip C－04～17、不得宣稱完整C Export成功。未來正式loop走到03時應自然經同一`renderBnToCanvas()` route；目前仍會在後續unsupported slot失敗。

若Phase 4發現必須修改上述任一檔才能支援C－03，視為Proposal conflict，立即停止並回報，不得自行擴scope或增加第8檔。

### 12.17 Exact Phase 4 Planned File Scope

新增恰2檔：

1. `bn/templates/C/03-coin-page-bn.js`
2. `bn/launch/C/03_Coin page BN.command`

修改恰5檔：

3. `bn/js/render-a.js`
4. `bn/js/import.js`
5. `bn/js/editor.js`
6. `bn/js/app.js`
7. `bn/launch/viewer.html`

精確上限：`2 added + 5 modified = 7 files`。若需要第8檔，立即停止並回報Proposal conflict。

Phase 4明確禁止修改：

- `bn/templates/A/03-coin-page-bn.js`
- `bn/templates/C/01-ddcard-bn.js`
- `bn/templates/C/02-mall-hbn.js`
- C－01／02 launchers
- `bn/js/workspace.js`
- `bn/js/export.js`
- `bn/js/countdown.js`
- `bn/css/styles.css`
- Requirement、Architecture、assets、fonts、vendor、D templates及其他A templates
- C－04～17任何implementation

### 12.18 Phase 5 Verification Plan（本輪不執行）

Phase 5至少執行：

1. `git diff --check`。
2. 所有Phase 4新增／修改JS syntax checks。
3. `zsh -n "bn/launch/C/03_Coin page BN.command"`。
4. Viewer inline module parse。
5. C－01 route smoke及geometry regression。
6. C－02 route smoke及geometry regression。
7. C－03 route smoke；canvas為`1200×391`。
8. C－04 route仍explicit reject。
9. `0天～9天`全部合法；非法countdown全部reject。
10. Editor countdown只出現在C－01／02／03。
11. Import C context保持01→01、02→02、03→03；unsupported context依本Proposal fallback至01。
12. Restore接受C－01／02／03、拒絕C－04。
13. JSON format/version 1及`cCountdownText` round-trip不變。
14. A/B/D route、Import、Restore、Editor及JSON smoke。
15. A/B－03 renderer hash/content unchanged。
16. `workspace.js`、`countdown.js`、`export.js`、`styles.css` unchanged。
17. 實際Phase 4 scope精確為7檔。
18. 不生成圖片、不做自動pixel tuning。

### 12.19 Phase 6 Jamie Manual Verification Plan

Jamie雙擊：

`bn/launch/C/03_Coin page BN.command`

人工確認：

1. Canvas及C－03底圖為`1200×391`。
2. Headline、subheadline、protectionText與正式A/B－03一致，包含`$`／`%` formatting。
3. Countdown font string維持`59.35pt "ShopeeNotoSans Bold"`，對應正式`ShopeeNotoSans(content)-Bold`。
4. Color為`#ff4c45`。
5. 首次target center約`(863.5,276.5)`。
6. 首次視覺rotation約`2.2°`逆時針／Canvas numeric `-2.2°`。
7. 首次uniform visual scale為`0.94`。
8. Overlay可切換並完成對位檢查。
9. `0天～9天`切換後均正確更新。

只有Jamie明確回覆PASS／「可以了」才可鎖定C－03最終geometry。若Jamie要求調整，只允許在C－03 wrapper內最小修改target center、rotation或uniform scale；`59.35pt`與A/B－03 renderer不得修改。

### 12.20 Regression Boundary

- C－01已PASS的其他geometry不得改：`40pt`、center `(274.5,563.0)`、scale `1.4`；目前effective Canvas rotation為`-2.1°`。
- C－02已PASS的其他geometry不得改：`53pt`、center `(825,251.5)`、scale `1.0`；目前effective Canvas rotation為`-2.1°`。
- C－03不得套用C－01／02 geometry；只使用本節C－03-local evidence與candidate。
- 正式A/B－03 renderer不得修改。
- A/B/D route、Import、Restore、Editor、JSON、Export不得因C－03重構。
- C－04～17不得處理或預建。

### 12.21 Conflict／Open／Acceptance State

`CONFLICT: None`

現有C Requirement明文scope只涵蓋C－01；它未定義C－03，但這是文件scope邊界，不是與本輪USER LOCKED或Phase 2 evidence的直接衝突。

仍OPEN且必須由Jamie launcher裁決：

- 最終pixel-level target center。
- 最終rotation。
- 最終uniform visual scale。
- 所有合法countdown值的最終視覺接受度。

本節完成條件只代表Phase 3 Proposal已核准進入Phase 4；不代表已Coding、已supported、已完成Phase 5或已Jamie人工PASS。

---

## 13. C－04｜`04_Loyalty BN` Phase 3 Proposal

> **Historical phase record — current result is FINAL LOCKED／Manual Verification PASS.** 本節的candidate、planned、尚未Coding與待Jamie驗證文字只記錄當時Phase 3狀態；current authority為第24節與Code Commit `0c9da10`，geometry數值不因本註記改寫。

> **Historical / Superseded by Jamie's later -2.1° USER LOCKED decision：** 本節保存C－04 Phase 2 rotation evidence及Phase 3 `-3.3°`首次candidate歷史；目前effective Canvas rotation以第3.5節的`-2.1°`為準，center、font、font size、color及uniform scale不變。

> 狀態：**C－04 Phase 3 Proposal approved for Phase 4 implementation**
>
> 尚未Phase 4 Coding、尚未Phase 5 Verification、尚未Phase 6 Jamie Manual Verification，亦尚未成為supported slot
>
> 本節依第1.2節單一文件治理規則追加；沒有建立C－04 standalone Proposal，也沒有改寫C－01／02／03既有section

### 13.1 Scope／Phase Boundary

本節只裁決C－04最小vertical slice：

- 完整reuse正式A/B－04 headline、subheadline及protectionText renderer行為。
- 以C－04-specific wrapper在相同canvas疊加既有C countdown。
- 將目前已成立的C gates由精確01／02／03最小擴為01／02／03／04。
- Reuse現有countdown state、validation、Import、Restore、Editor、JSON及Preview／Export bridge。
- 新增dedicated C－04 launcher及既有viewer的最小C－04 branch，供Jamie人工驗證。

本節不處理C－05～17、不建立C framework／registry redesign、不修改Requirement／Architecture，也不代表C－04已Coding、已支援或已人工PASS。

上一輪未取得literal 32pt browser `measureText()`數值報告；GPT已裁決該數值報告不是C－04 Phase 3前置門檻，也不是architecture blocker。本節不重查browser限制、不嘗試繞過安全政策、不手算pt→px，也不使用其他字型metric工具冒充正式browser evidence。Phase 4 production wrapper仍必須在正常runtime以`measureText()`及`actualBoundingBox*`完成visual ink centering；這與Phase 2沒有預先擷取metrics報告並不衝突。

### 13.2 USER LOCKED Requirements

- Slot：`04_Loyalty BN`。
- Headline、subheadline、protectionText的位置、字型樣式、字型大小及顏色與正式A/B－04完全相同。
- Countdown font source：`ShopeeNotoSans(content)-Bold`。
- 正式Canvas alias：`ShopeeNotoSans Bold`。
- 正式font string精確為`32pt "ShopeeNotoSans Bold"`。
- `32pt`必須保持literal pt，禁止pt→px或以其他font-size補償geometry。
- Countdown color：`#ff4c45`。
- 合法值精確為完整字串`0天`～`9天`。
- Excel source：`C!E16`；不得自行補「天」。
- 底圖：`bn/assets/C/底圖/04_Loyalty BN.png`。
- 對位：`bn/assets/C/對位/04_Loyalty BN.png`，只供人工校對，不進正式Preview／Export output。
- Canvas：`702×208`。
- 只允許uniform visual scale；禁止non-uniform scale。
- 禁止生成圖片。

### 13.3 A/B－04 Formal Renderer Evidence／Mandatory Reuse

正式template：`bn/templates/A/04-loyalty-bn.js`。

Exports：

- `renderLoyaltyBn()`。
- `waitForLoyaltyBnFonts()`。
- `LOYALTY_BN_WIDTH = 702`。
- `LOYALTY_BN_HEIGHT = 208`。
- `LOYALTY_BN_LAYOUT`。

Type A與B實際從同一`A_TABLE["04"]`取得此renderer，只由asset base區分；正式底圖filename都是`04_Loyalty BN.png`。

正式三欄：

| Field | Layout | Font | Color |
|---|---|---|---|
| headline | `[32,52,245,30]` | `24pt "ShopeeNotoSans Medium"` | `#ffffff` |
| subheadline ordinary runs | `[32,88,350,45]` | `35pt "ShopeeNotoSans Bold"` | `#fff285` |
| subheadline `$`／`%` runs | 同一subheadline layout | `30pt "ShopeeNotoSans Bold"` | `#fff285` |
| protectionText | `[32,139,350,16]` | `12pt "ShopeeNotoSans Medium"` | `#a6f4e6` |

正式behavior：

- `textAlign = "left"`、`textBaseline = "alphabetic"`。
- 使用`measureText()`及`actualBoundingBox*`，將visual ink top-left對準layout left/top。
- Headline／protectionText使用2× temporary canvas後high-quality downsample。
- Subheadline直接繪於正式canvas。
- `$`／`%`沿用A－04既有特殊run splitting及ordinary boundary-glyph ink-bottom alignment。
- 正式三欄無文字rotation、無clipping。

因此Phase 4必須直接reuse正式A－04 renderer，不得複製、抽取或重新實作三欄drawing helpers，也不得修改`bn/templates/A/04-loyalty-bn.js`。

### 13.4 Assets／Finished Reference Evidence

正式C－04 assets：

| 用途 | Format／Mode | Dimensions | SHA-256 |
|---|---|---|---|
| `bn/assets/C/底圖/04_Loyalty BN.png` | PNG／RGBA | `702×208` | `95fe3f6d4b9cbafa3081d5f1d7b4c7c0305c595000e6f0ae601ce763a0a27ee2` |
| `bn/assets/C/對位/04_Loyalty BN.png` | PNG／RGBA | `702×208` | `97b14f9c609e0403ada4a251a1ef752a5134bf88b5bc84ac0b3a097d1055c3dd` |

可信finished reference：

```text
path       = /Users/jamie/Downloads/C-assets/04_Loyalty BN.png
dimensions = 702 × 208
SHA-256    = 63db76ca6923349fde688b67d58747705dd948184cdad3c85e7063adb3a1fce2
```

它與repo blank bottom及overlay的hash、bytes及內容均不同；Downloads的`底圖／對位`同名候選則分別與repo兩個assets完全同hash，因此不會被誤當finished reference。Phase 4不得修改、轉檔、重新壓縮或重存正式assets。

### 13.5 Finished-Reference Geometry Evidence

在lower stopwatch-face局部ROI中，以接近`#ff4c45`的像素及finished-reference／blank差分隔離countdown，避免上方紅色badge及其他紅色圖形污染。`0天`evidence採inclusive pixel bounds：

```text
core bounds             = (490,127)–(555,163)
core envelope           = 66 × 37
core center             = (522.5,145.0)
support bounds          = (489,126)–(557,164)
support envelope        = 69 × 39
support center          = (523.0,145.0)
measurement uncertainty ≈ ±1px
center uncertainty      ≈ x ±0.5～1px／y ±1px
```

Rotation evidence：

- Reference視覺為輕微逆時針。
- Connected-component evidence約`3.36°`逆時針。
- 其他threshold／PCA signals約`2.6°～4.1°`逆時針。
- 保守evidence range約`2°～4.5°`逆時針；Canvas numeric convention為負角。
- JPEG／PNG輪廓及connected-component statistics不能證明Photoshop exact transform。
- 禁止直接套用C－01、C－02或C－03角度。

目前沒有證據要求額外visual scale，也沒有證據支持non-uniform scale。Neutral `1.0`只作首次implementation candidate；不得宣稱已由browser metrics證明。

### 13.6 Phase 3 First-Implementation Geometry Decision

Phase 4首次implementation精確採：

```text
COUNTDOWN_FONT          = '32pt "ShopeeNotoSans Bold"'
COUNTDOWN_COLOR         = '#ff4c45'
COUNTDOWN_TARGET_CENTER = (523, 145)
COUNTDOWN_ROTATION      = -3.3deg
COUNTDOWN_VISUAL_SCALE  = 1.0
```

分類必須保持：

- Font source／family及Canvas alias是USER LOCKED。
- `32pt`是USER LOCKED，必須保持literal pt；不得轉px或修改font-size補償geometry。
- `#ff4c45`是USER LOCKED。
- Center `(523,145)`是Phase 2 finished-reference measured support center所支持的首次implementation target。
- `-3.3deg`是Phase 2 evidence範圍內的首次Canvas rotation candidate，不是Photoshop exact transform。
- `1.0`是沒有證據要求額外scale時採用的neutral首次uniform-scale candidate，不是假裝已由browser metrics證明。
- Center、rotation與uniform scale的最終值必須由Jamie Phase 6 launcher人工確認。

以上`-3.3deg`是當時Phase 4首次implementation constraint，現已由第3.5節較晚的`-2.1°` USER LOCKED決定取代；`1.0`、center、`32pt`、font family及color不變。禁止自動pixel-tune及non-uniform scale。

### 13.7 Renderer Architecture Decision

採用C－04-specific wrapper，Phase 4預定新增：

`bn/templates/C/04-loyalty-bn.js`

Architecture：

```text
C－04 wrapper
  → formal A－04 renderLoyaltyBn()
  → C－04 countdown overlay
```

Wrapper責任：

1. Import正式A－04 dimensions、`renderLoyaltyBn()`及`waitForLoyaltyBnFonts()`。
2. 先呼叫正式A－04 renderer繪製底圖及三欄，不複製三欄drawing logic。
3. Reuse既有`isValidCCountdown()`；非法或missing countdown fail closed。
4. 等待並驗證正式`ShopeeNotoSans Bold` countdown font ready。
5. 使用精確literal `32pt "ShopeeNotoSans Bold"`及`#ff4c45`。
6. 驗證A renderer完成後canvas仍為`702×208`。
7. 以runtime `measureText()`及`actualBoundingBoxLeft/Right/Ascent/Descent`求glyph visual ink center。
8. 使用C－04-local transform：

   ```text
   save
   → translate(523, 145)
   → rotate(-3.3deg)
   → scale(1.0, 1.0)
   → fillText(text, -inkCenterX, -inkCenterY)
   → restore
   ```

9. Rotation使用Canvas numeric convention，視覺約`3.3°`逆時針。
10. Target center是visual ink center，不是alphabetic baseline；禁止直接當`fillText()`座標。
11. 禁止pt→px、non-uniform scale及transform洩漏。
12. Wrapper只負責C－04 countdown，不處理其他C slot。

### 13.8 Routing Decision

Phase 4只把C support gates由精確01／02／03擴為01／02／03／04：

- `bn/js/render-a.js` import C－04 wrapper。
- `C_TABLE`新增精確`"04"` entry，background為`04_Loyalty BN.png`。
- Countdown field projection及pre-validation allow-list擴為01／02／03／04。
- C－05～17繼續explicit reject；未知C slot不得fallback到`A_TABLE`。
- C－01／02／03 entries、geometry及結果不變。
- A/B/D route resolution不修改、不重構。

### 13.9 Import Decision

`bn/js/import.js`只擴充C selected BN allow-list：

- C context 01 Import後維持01。
- C context 02 Import後維持02。
- C context 03 Import後維持03。
- C context 04 Import後維持04。
- 其他C slot context維持現有安全fallback至01，不順手開放C－05～17。
- `C!B15/B16/B17`及`C!E16` mapping完全不變；不新增Excel cell。
- Illegal countdown仍使Import atomic failure。
- A/B/D Import behavior不變。

### 13.10 Restore／JSON Decision

- Type C JSON v1 selected BN allow-list擴為01／02／03／04。
- C－05～17繼續explicit reject。
- `cCountdownText`仍使用唯一exact validation及既有保存機制。
- JSON format仍為`FSS BN Workspace`、version仍為`1`。
- 不新增C－04 property、不修改`bn/js/export.js`。
- A/B/D Restore及serialized JSON shape不變。

### 13.11 Editor Decision

- `bn/js/editor.js`的C countdown select exposure由01／02／03擴為01／02／03／04。
- Reuse同一field definition、`0天～9天`options、validation及workspace update path。
- 不建立第二套control或C－04-specific三欄Editor。
- C－05～17不顯示countdown。
- A/B/D Editor不顯示C countdown；既有shared三欄Editor行為不變。

### 13.12 App Decision

- `bn/js/app.js`只enable C－01／02／03／04 buttons。
- C－05～17 buttons保持disabled。
- C keyboard navigation現有early return保持，不恢復generic keyboard navigation。
- Preview token lifecycle、Workspace subscription及A/B/D behavior不重構。

### 13.13 Viewer Decision

`bn/launch/viewer.html`只新增C－04 branch：

- Query：`type=C&bn=04_Loyalty%20BN`。
- Import production C－04 wrapper及既有countdown module。
- Dimensions：`702×208`。
- Bottom：`../assets/C/底圖/04_Loyalty BN.png`。
- Overlay：`../assets/C/對位/04_Loyalty BN.png`。
- 顯示A/B－04對應三欄inputs及共用`0天～9天`select。
- Countdown或三欄變更沿用既有即時重繪；overlay toggle及dimensions check沿用現有機制。
- 不建立第二份Viewer，不複製production countdown drawing algorithm。
- C－01／02／03 viewer branches不得改寫；C－05～17不得新增branch。

### 13.14 Launcher Decision

Phase 4新增：

`bn/launch/C/04_Loyalty BN.command`

精確URL：

```text
http://127.0.0.1:4173/bn/launch/viewer.html?type=C&bn=04_Loyalty%20BN
```

Launcher沿用C－01／02／03 convention：Python HTTP server、port readiness、cleanup、browser open、error handling、repo root resolve及executable mode `755`。它不得依賴C－05～17，也不得修改C－01／02／03 launchers。

### 13.15 Workspace／Countdown／Export／CSS Boundary

Phase 4預期且要求：

- `bn/js/workspace.js`不修改；直接reuse`cCountdownText`／`updateCCountdown()`。
- `bn/js/countdown.js`不修改；直接reuse現有exact validator。
- `bn/js/export.js`不修改；JSON v1及17-item Export loop維持原狀。
- `bn/css/styles.css`不修改；正式font mapping及既有countdown control styling已足夠。

不得建立C－04-only Export、不得skip C－05～17、不得宣稱完整C Export成功。正式loop走到04時應自然經同一`renderBnToCanvas()` route；目前仍會在後續unsupported slot失敗。

若Phase 4發現必須修改上述任一檔才能支援C－04，視為`PROPOSAL CONFLICT`，立即停止並回報，不得自行擴scope或增加第8檔。

### 13.16 Exact Phase 4 Planned File Scope

新增恰2檔：

1. `bn/templates/C/04-loyalty-bn.js`
2. `bn/launch/C/04_Loyalty BN.command`

修改恰5檔：

3. `bn/js/render-a.js`
4. `bn/js/import.js`
5. `bn/js/editor.js`
6. `bn/js/app.js`
7. `bn/launch/viewer.html`

精確上限：`2 added + 5 modified = 7 files`。若需要第8檔，立即停止並回報`PROPOSAL CONFLICT`。

Phase 4明確禁止修改：

- `bn/templates/A/04-loyalty-bn.js`
- `bn/templates/C/01-ddcard-bn.js`
- `bn/templates/C/02-mall-hbn.js`
- `bn/templates/C/03-coin-page-bn.js`
- C－01／02／03 launchers
- `bn/js/workspace.js`
- `bn/js/countdown.js`
- `bn/js/export.js`
- `bn/css/styles.css`
- Requirement、Architecture、assets、fonts、vendor、D templates及其他A templates
- C－05～17任何implementation

### 13.17 Phase 5 Verification Plan（本輪不執行）

Phase 5至少規劃：

1. `git diff --check`。
2. 所有Phase 4新增／修改JS syntax checks。
3. `zsh -n "bn/launch/C/04_Loyalty BN.command"`。
4. Viewer inline module parse。
5. C－01／02／03／04 route smoke及C－01／02／03 geometry regression。
6. C－05 route仍explicit reject。
7. C－04 canvas為`702×208`。
8. `0天`、`9天`合法；`10天`及其他非法countdown reject。
9. Editor countdown只出現在C－01／02／03／04。
10. Import C context保持01→01、02→02、03→03、04→04；unsupported context fallback至01。
11. Restore接受C－01／02／03／04、拒絕C－05。
12. JSON format/version 1及`cCountdownText` round-trip不變。
13. A/B/D－04 route／Editor smoke及A/B/D既有行為不變。
14. A－04 renderer hash/content unchanged。
15. C－01／02／03 wrappers與launchers hash/content unchanged。
16. `workspace.js`、`countdown.js`、`export.js`、`styles.css` unchanged。
17. 實際Phase 4 scope精確為7檔。
18. 不生成圖片、不做pixel comparison、不做自動geometry tuning。

### 13.18 Phase 6 Jamie Manual Verification Plan

Jamie雙擊：

`bn/launch/C/04_Loyalty BN.command`

人工確認：

1. C－04底圖及Canvas為`702×208`。
2. Headline、subheadline、protectionText與正式A/B－04一致，包含2× downsample及`$`／`%` formatting結果。
3. Countdown font string維持literal `32pt "ShopeeNotoSans Bold"`，對應正式`ShopeeNotoSans(content)-Bold`。
4. Color為`#ff4c45`。
5. 首次target center為`(523,145)`。
6. 目前USER LOCKED視覺rotation約`2.1°`逆時針／Canvas numeric `-2.1°`。
7. 首次uniform visual scale為`1.0`。
8. Overlay可切換並完成對位檢查。
9. `0天～9天`切換後均正確更新。

只有Jamie明確回覆PASS／「可以了」才可鎖定C－04最終geometry。若Jamie要求視覺微調，只允許在C－04 wrapper內最小修改target center、rotation或uniform scale；不得修改`32pt`、font family、color、A－04、C－01／02／03或shared architecture。

### 13.19 C－01／02／03 Regression Boundary

- C－01已PASS的其他geometry不得改：`40pt`、center `(274.5,563.0)`、scale `1.4`；目前effective Canvas rotation為`-2.1°`。
- C－02已PASS的其他geometry不得改：`53pt`、center `(825,251.5)`、scale `1.0`；目前effective Canvas rotation為`-2.1°`。
- C－03已由Jamie人工PASS並正式鎖定，不得修改、重測、重推或質疑：

  ```text
  font string          = 60pt "ShopeeNotoSans Bold"
  color                = #ff4c45
  target visual center = (863.5, 276.5)
  Canvas rotation      = -2.1°
  uniform visual scale = 0.94
  ```

- C－04不得套用C－01／02／03 geometry；只使用本節C－04-local evidence與candidate。
- 正式A/B－04 renderer不得修改。
- A/B/D route、Import、Restore、Editor、JSON、Export不得因C－04重構。
- C－05～17不得處理或預建。

### 13.20 Conflict／Open／Acceptance State

`CONFLICT: None`

現有C Requirement明文scope未同步涵蓋C－04；這是文件scope邊界，不是與本節USER LOCKED、Phase 2 evidence或architecture decision的直接衝突。本輪不修改Requirement；後續正式Documentation Update另行處理。

沒有browser-metrics blocker。缺少預先擷取的literal 32pt metrics數值報告，不阻止Phase 4 production wrapper在正常runtime呼叫`measureText()`完成visual ink centering，也不阻止採用neutral scale `1.0`作為首次implementation candidate。

仍OPEN且必須由Jamie launcher裁決：

- 最終pixel-level target center。
- USER LOCKED `-2.1°` rotation的最終人工視覺接受度。
- 最終uniform visual scale。
- 所有合法countdown值的最終視覺接受度。

本節完成條件只代表C－04 Phase 3 Proposal已核准進入Phase 4；不代表已Coding、已supported、已完成Phase 5或已Jamie人工PASS。

---

## 14. C－05｜`05_MSBN` Phase 3 Proposal

> **Historical phase record — current result is FINAL LOCKED／Manual Verification PASS.** 本節的candidate、planned、尚未Coding與待Jamie驗證文字只記錄當時Phase 3狀態；current authority為第24節與Code Commit `0c9da10`，geometry數值不因本註記改寫。

> 狀態：**C－05 Phase 3 Proposal approved for Phase 4 implementation**
>
> 尚未Phase 4 Coding、尚未Phase 5 Verification、尚未Phase 6 Jamie Manual Verification，亦尚未成為supported slot
>
> 本節只依已完成且PASS的C－05 Phase 2 evidence追加；不重新調查C－01～04，不處理或預建C－06～17

### 14.1 Scope／Phase Boundary

本節只裁決C－05最小vertical slice：

- 完整reuse正式A/B－05 headline、subheadline及protectionText rendering behavior。
- 以C－05-specific wrapper在同一正式Canvas疊加既有C countdown。
- 將現有C support gates由精確01～04最小擴為01～05。
- Reuse現有countdown state、validation、Import、Restore、Editor、JSON及Preview／Export bridge。
- 新增dedicated C－05 launcher及既有viewer的唯一C－05 branch，供Jamie人工對位。

本節不授權Coding，不修改Requirement／Architecture，不建立C－05獨立Proposal，也不處理C－06～17。

### 14.2 USER LOCKED Requirements

- Slot：`05_MSBN`。
- Headline、subheadline、protectionText的位置、字型樣式、字型大小、顏色及正式rendering behavior與A/B－05完全相同。
- Countdown font source：`ShopeeNotoSans(content)-Bold`。
- Canvas font alias：`ShopeeNotoSans Bold`。
- Countdown font string精確為literal `60pt "ShopeeNotoSans Bold"`；禁止pt→px。
- Countdown color：`#ff4c45`。
- Canvas rotation精確為`-2.1°`，視覺約`2.1° CCW`；此值是USER LOCKED，不是candidate，Phase 3不得提出其他角度。
- 合法值精確為完整字串`0天`～`9天`。
- Excel source：`C!E16`；不得自行補「天」。
- Preview／Editor必須可修改countdown；Import／Restore／JSON沿用既有C countdown state及validation contract保存完整字串。
- Bottom：`bn/assets/C/底圖/05_MSBN.png`。
- Overlay：`bn/assets/C/對位/05_MSBN.png`，只供人工校對，不進正式Preview／Export output。

### 14.3 A/B－05 Formal Renderer Evidence／Mandatory Reuse

正式template：`bn/templates/A/05-msbn.js`。

- Renderer：`renderMsbn()`。
- Font waiter：`waitForMsbnFonts()`。
- 正式Canvas：`1200×400`。
- 正式bottom contract：`1200×360`，繪於Canvas `(0,20)`，因此Canvas上下各保留20px區域。

正式三欄規格：

| 欄位 | Geometry | Font | Color | 正式行為 |
|---|---|---|---|---|
| headline | `[118,113,370,43]` | `35pt "ShopeeNotoSans Medium"` | `#ffffff` | `left`／`alphabetic`；visual ink置中；2× temporary canvas後high-quality downsample |
| subheadline | `[96,173,414,75]` | ordinary `37.5pt "ShopeeNotoSans Bold"`；`$`／`%`為`32pt "ShopeeNotoSans Bold"` | `#007661` | ordinary／symbol runs分割；整組visual ink置中；直接繪正式Canvas；`$`優先對齊後方、`%`優先對齊前方ordinary boundary glyph ink bottom |
| protectionText | `[96,266,414,23]` | `19pt "ShopeeNotoSans Medium"` | `#a6f4e6` | `left`／`alphabetic`；visual ink置中；2× temporary canvas後high-quality downsample |

Phase 4必須直接reuse正式A－05 renderer，不得複製、簡化或重寫上述三欄drawing、temporary canvas、downsample、mixed-run或boundary-glyph alignment邏輯；`bn/templates/A/05-msbn.js`保持零修改。

### 14.4 Asset Contract

| 用途 | Format | Intrinsic dimensions | SHA-256 |
|---|---|---|---|
| `bn/assets/C/底圖/05_MSBN.png` | PNG RGBA | `1200×360` | `06b74c4a5867c582cd01de718cb9ee774fb88c2b499a9e7da6721f2a9a9c9c05` |
| `bn/assets/C/對位/05_MSBN.png` | PNG RGBA | `1200×400` | `43eb02bebe2b67740c6aeee197912dc8dedde54932dec32196e2c614d526972d` |

Bottom、overlay dimensions不同不是conflict：正式A－05既有contract本來就是在`1200×400` Canvas的`(0,20)`繪製`1200×360` bottom，而overlay對應完整`1200×400` Canvas。Phase 4不得resize、轉檔、修改asset、改Canvas architecture或加入額外workaround。

### 14.5 Countdown Geometry Decision

```text
COUNTDOWN_FONT          = '60pt "ShopeeNotoSans Bold"'
COUNTDOWN_COLOR         = '#ff4c45'
COUNTDOWN_TARGET_CENTER = (864, 278)
COUNTDOWN_ROTATION      = -2.1deg
COUNTDOWN_VISUAL_SCALE  = 0.94
```

分類必須保持：

- Font source／alias、literal `60pt`、`#ff4c45`及Canvas rotation `-2.1°`是USER LOCKED；禁止pt→px，rotation不得改列candidate或重新研究。
- Target center `(864,278)`是 **Phase 3 initial candidate, pending Jamie launcher visual verification**。
- Uniform visual scale `0.94`是 **Phase 3 initial candidate, pending Jamie launcher visual verification**。
- Center及scale尚未Jamie人工PASS；Phase 4不得自動pixel-tune或自行調整。只有Jamie Phase 6明確指示後才可單獨微調center／scale。

### 14.6 Countdown Rendering Algorithm

C－05沿用已成立的C wrapper visual ink-center模式：

1. 等待正式A－05 `waitForMsbnFonts()`完成。
2. Load並check `60pt "ShopeeNotoSans Bold"` countdown font。
3. 以`isValidCCountdown()`驗證`cCountdownText`；missing或非法值fail closed。
4. 設定`ctx.font = '60pt "ShopeeNotoSans Bold"'`、`textAlign = "left"`、`textBaseline = "alphabetic"`。
5. 使用`measureText()`與`actualBoundingBoxLeft/Right/Ascent/Descent`取得visual ink rect及center。
6. 使用下列C－05-local transform：

   ```text
   save
   → translate(864, 278)
   → rotate(-2.1 * Math.PI / 180)
   → scale(0.94, 0.94)
   → fillStyle = "#ff4c45"
   → fillText(text, -inkCenterX, -inkCenterY)
   → restore
   ```

Target是visual ink center，不是alphabetic baseline。禁止CSS transform、rotation sign反轉、pt→px、non-uniform scale、transform洩漏或shared geometry／rotation helper。

### 14.7 Wrapper Architecture Decision

Phase 4預定新增：

`bn/templates/C/05-msbn.js`

Architecture：

```text
C－05 wrapper
  → formal A－05 renderMsbn()
  → C－05 countdown overlay
```

Wrapper只負責：import正式A－05 dimensions／renderer／font waiter、reuse`isValidCCountdown()`、等待正式fonts、先完整執行A－05 renderer、驗證正式Canvas、再繪製C－05 countdown。對外export命名保持與正式`renderMsbn()`／`waitForMsbnFonts()`及現有viewer convention相容，不建立新抽象層。

### 14.8 Routing Decision

`bn/js/render-a.js`目前`C_TABLE`只支援C01～04，C05 explicit unsupported。Phase 4只做：

- Import C－05 wrapper。
- 新增`C_TABLE["05"]`，background精確為`05_MSBN.png`。
- 將既有countdown field projection及pre-validation BN id gate由01～04擴為01～05。
- Unsupported boundary改為C06～17；未知C slot仍不得fallback到`A_TABLE`。

不得重構A/B/D routing或預開C06～17。

### 14.9 Import／Restore Decision

`bn/js/import.js`目前C supported BN IDs為01～04；Phase 4只增加`"05"`。

- Import仍只讀C Sheet的`B15/B16/B17/E16`，保留完整`0天～9天`字串、atomic validation、supported selectedBnId preservation及unsupported context fallback至01。
- Restore仍使用JSON v1、C-only `cCountdownText`及exact countdown validation；C01～05 selectedBnId可接受，C06～17拒絕。
- 不升JSON version、不新增欄位、不修改A/B/D Import／Restore。

### 14.10 Editor Decision

`bn/js/editor.js`只把既有C countdown control exposure gate由C01～04擴為C01～05。C－05沿用現有headline、subheadline、protectionText及唯一`0天～9天`countdown select；不建立C－05-specific UI，不改C01～04，也不處理C06～17。

### 14.11 App Decision

`bn/js/app.js`的`C_ENABLED_BN_IDS`只增加`"05"`；C06～17繼續disabled，現有C keyboard early-return及A/B/D behavior保持不變。

### 14.12 Viewer Decision

`bn/launch/viewer.html`只新增唯一C－05 branch：

- Query：`type=C&bn=05_MSBN`。
- Production wrapper：`../templates/C/05-msbn.js`。
- Canvas：`1200×400`。
- Bottom：`../assets/C/底圖/05_MSBN.png`。
- Overlay：`../assets/C/對位/05_MSBN.png`。
- 使用C－05 wrapper對外的正式`renderMsbn`／`waitForMsbnFonts`相容exports。
- 顯示既有三欄inputs、共用`0天～9天`countdown select及overlay toggle。

不得建立第二份viewer、改寫C01～04 branches或處理C06～17。

### 14.13 Launcher Decision

Phase 4預定新增：

`bn/launch/C/05_MSBN.command`

Launcher沿用C01～04 convention，開啟既有viewer的精確URL：

```text
http://127.0.0.1:4173/bn/launch/viewer.html?type=C&bn=05_MSBN
```

維持既有Python HTTP server、port readiness、cleanup、browser open、error handling、repo root resolution及executable mode convention；不建立新server或新viewer。

### 14.14 Phase 4 Exact File Scope

Phase 4預計精確7檔。

新增2檔：

1. `bn/templates/C/05-msbn.js`
2. `bn/launch/C/05_MSBN.command`

修改5檔：

3. `bn/js/render-a.js`
4. `bn/js/import.js`
5. `bn/js/editor.js`
6. `bn/js/app.js`
7. `bn/launch/viewer.html`

若實作需要第8檔，必須停止並重新裁決scope，不得自行擴大。

### 14.15 Explicit Zero-Modification Boundary

Phase 4不需要修改：

- `bn/js/workspace.js`
- `bn/js/countdown.js`
- `bn/js/export.js`
- `bn/css/styles.css`
- `bn/templates/A/05-msbn.js`
- C01～04 wrappers及launchers
- Requirement／Architecture
- A/B/D implementation
- assets、fonts、vendor

既有C state、exact validator、JSON／Export bridge、Editor styling及production render bridge已足夠。不得為了完整性或DRY硬加檔案、shared helper或shared rotation constant。

### 14.16 Phase 5 Verification Plan（本輪不執行）

Phase 4 Coding後的AI self-check最多包含：

1. Exact 7-file scope與`git diff --check`。
2. 新增／修改JS syntax checks、launcher `zsh -n`及viewer inline module parse。
3. C－05 route成功、C06仍explicit reject。
4. C－05 Canvas `1200×400`及bottom／overlay contract。
5. Import C05 selected context、unsupported context fallback及invalid countdown atomic failure。
6. Restore接受C01～05、拒絕C06；JSON v1及`cCountdownText`不變。
7. Editor countdown gate與App enabled gate精確擴至C05。
8. `0天～9天`合法，非法countdown reject。
9. Wrapper font literal `60pt "ShopeeNotoSans Bold"`、color`#ff4c45`、rotation`-2.1°`、center candidate`(864,278)`及scale candidate`0.94`。
10. A－05、C01～04、shared runtime及A/B/D protection hashes／smoke boundary。

Phase 5不擴為完整C style regression suite，不要求browser pixel measurement，不生成圖片，也不自動調整geometry。

### 14.17 Phase 6 Jamie Manual Verification Plan（本輪不執行）

Jamie雙擊：

`bn/launch/C/05_MSBN.command`

人工確認：

1. C－05底圖正確、overlay可切換、Canvas為`1200×400`。
2. Headline、subheadline、protectionText完整沿用正式A/B－05行為，包含2× downsample及`$`／`%`mixed-run alignment。
3. Countdown顯示，font視覺符合literal `60pt "ShopeeNotoSans Bold"`，color為`#ff4c45`。
4. Canvas rotation精確`-2.1°`，此USER LOCKED值不因人工對位重新研究。
5. Initial center `(864,278)`及uniform scale`0.94`是否需要Jamie指示的單獨微調。
6. `0天～9天`切換正常。

只有Jamie明確回覆PASS／「可以了」才能鎖定center／scale及C－05最終人工結果；AI不得自行宣告Manual PASS，也不得自行修改USER LOCKED font size或rotation。

### 14.18 C－06～17 Boundary

C－06～17完全不在本節範圍。不得預建C06 wrapper、launcher、route、geometry、font size、center或scale，不新增C06～14任何spec，也不新增C15～17內容。C－05完成後仍須依Jamie授權逐版處理。

### 14.19 Conflict／Open／Acceptance State

`CONFLICT: None`

Bottom `1200×360`、Canvas／overlay `1200×400`及bottom draw `(0,20)`是正式A－05既有contract，不是conflict，也不要求asset或architecture workaround。

仍OPEN且必須由Jamie launcher裁決：

- Initial center `(864,278)`的最終人工視覺接受度。
- Initial uniform scale `0.94`的最終人工視覺接受度。
- 所有合法countdown值的最終視覺接受度。

Font literal `60pt "ShopeeNotoSans Bold"`、color`#ff4c45`及Canvas rotation`-2.1°`不是OPEN candidate；它們是USER LOCKED。

本節完成只代表C－05 Phase 3 Proposal已核准進入Phase 4；不代表已Coding、已supported、已完成Phase 5或已Jamie人工PASS。

---

## 15. C－06｜`06_IG` Phase 3 Proposal

> **Historical phase record — current result is FINAL LOCKED／Manual Verification PASS.** 本節的candidate、planned、尚未Coding與待Jamie驗證文字只記錄當時Phase 3狀態；current authority為第24節與Code Commit `0c9da10`，geometry數值不因本註記改寫。

> 狀態：**C－06 Phase 3 Proposal approved for Phase 4 implementation**
>
> 尚未Phase 4 Coding、尚未Phase 5 Verification、尚未Phase 6 Jamie Manual Verification，亦尚未成為supported slot
>
> 本節只依已完成且PASS的C－06 Phase 2 evidence追加；不重新調查C－01～05，不處理或預建 C－07～17

### 15.1 Scope／Current Repository State

本節只裁決C－06最小vertical slice：

- 完整reuse正式A/B－06 headline、subheadline及protectionText rendering behavior。
- 以C－06-specific wrapper在同一正式Canvas疊加既有C countdown。
- 將目前repository已成立的C support gates由精確01～05最小擴為01～06。
- Reuse現有countdown state、validation、Import、Restore、Editor、JSON及Preview／Export bridge。
- 新增dedicated C－06 launcher及既有viewer的唯一C－06 branch，供Jamie人工對位。

Phase 2已確認目前repository實際狀態為：C－01～05 wrappers、routes、Import／Restore allow-list、Editor gate、App gate及viewer branches已存在；C－06仍explicit unsupported。此為C－06 Proposal所必要的current-state delta，不回頭改寫前述slot的歷史section。

本節不授權Coding，不修改Requirement／Architecture，不建立C－06獨立Proposal，也不處理C－07～17。

### 15.2 USER LOCKED Requirements

- Slot：`06_IG`。
- Headline、subheadline、protectionText的位置、字型樣式、字型大小、顏色及正式rendering behavior與A/B－06完全相同。
- Countdown font source：`ShopeeNotoSans(content)-Bold`。
- Canvas font alias：`ShopeeNotoSans Bold`。
- Countdown font string精確為literal `112pt "ShopeeNotoSans Bold"`；禁止pt→px。
- Countdown color：`#ff4c45`。
- Canvas rotation精確為`-2.1°`，視覺約`2.1° CCW`；此值是USER LOCKED，不是candidate，Phase 3不得提出其他角度。
- 合法值精確為完整字串`0天`～`9天`。
- Excel source：`C!E16`；不得自行補「天」。
- Preview／Editor必須可修改countdown；Import／Restore／JSON沿用既有C countdown state及validation contract保存完整字串。
- Bottom：`bn/assets/C/底圖/06_IG.jpg`。
- Overlay：`bn/assets/C/對位/06_IG.png`，只供人工校對，不進正式Preview／Export output。

### 15.3 A/B－06 Formal Renderer Evidence／Mandatory Reuse

正式template：`bn/templates/A/06-ig.js`。

- Renderer：`renderIg()`。
- Font waiter：`waitForIgFonts()`。
- 正式Canvas：`900×1600`。
- 正式bottom contract：`900×1600`。
- Bottom draw：`drawImage(backgroundImage, 0, 0, 900, 1600)`；底圖與Canvas同尺寸，沒有額外offset。

正式三欄規格：

| 欄位 | Geometry | Font | Color | 正式行為 |
|---|---|---|---|---|
| headline | `[175,387,550,65]` | `52.5pt "ShopeeNotoSans Medium"` | `#ffffff` | `left`／`alphabetic`；visual ink置中；2× temporary canvas後high-quality downsample |
| subheadline | `[136,472,630,82]` | ordinary `65pt "ShopeeNotoSans Bold"`；`$`／`%`為`55pt "ShopeeNotoSans Bold"` | `#fff285` | ordinary／special runs分割；整組visual ink置中；`$`優先對齊後方、`%`優先對齊前方ordinary boundary glyph ink bottom |
| protectionText | `[136,573,630,37]` | `30pt "ShopeeNotoSans Medium"` | `#a6f4e6` | `left`／`alphabetic`；visual ink置中；2× temporary canvas後high-quality downsample |

A－06的headline／protection temporary Canvas為`1800×3200`，temporary context先`scale(2,2)`；正式renderer另保留fonts-ready檢查、`measureText()` metrics finite檢查、background complete／natural dimensions validation與三欄ink-fit validation return。

Phase 4必須直接reuse正式A－06 renderer，不得複製、簡化或重寫上述三欄drawing、temporary canvas、downsample、mixed-run或boundary-glyph alignment邏輯；`bn/templates/A/06-ig.js`保持零修改。

### 15.4 Asset Contract

| 用途 | Format | Intrinsic dimensions | SHA-256 |
|---|---|---|---|
| `bn/assets/C/底圖/06_IG.jpg` | JPEG | `900×1600` | `bd285e9b75411ca2d7adc30165c4fbf11fb02a18ce16a6f0864270a37a0053f0` |
| `bn/assets/C/對位/06_IG.png` | PNG RGBA | `900×1600` | `79803d0cd9a2601ae9142b4317b60ea270308f2719b9616d1eeeea2f293badc9` |

Bottom、overlay與正式Canvas全部為`900×1600`，不存在尺寸conflict，也不需要resize、asset修改、Canvas architecture調整或background workaround。

Phase 2另確認指定完稿參考`/Users/jamie/Downloads/C-assets/06_IG.jpg`為`900×1600` JPEG，SHA-256為`6ea21a04cdc097e2d6be01ccc501c18647273dd837e37a90434d2b34584819ed`。本節只保存Phase 2結論，不重新分析reference。

### 15.5 Countdown Geometry Decision

```text
COUNTDOWN_FONT          = '112pt "ShopeeNotoSans Bold"'
COUNTDOWN_COLOR         = '#ff4c45'
COUNTDOWN_TARGET_CENTER = (463, 1168)
COUNTDOWN_ROTATION      = -2.1deg
COUNTDOWN_VISUAL_SCALE  = 1.0
```

分類必須保持：

- Font source／alias、literal `112pt`、`#ff4c45`及Canvas rotation `-2.1°`是USER LOCKED；禁止pt→px，rotation不得改列candidate或重新研究。
- Target center `(463,1168)`是 **Phase 3 initial candidate, pending Jamie launcher visual verification**。
- Uniform visual scale `1.0`是 **Phase 3 initial candidate, pending Jamie launcher visual verification**。
- Center及scale尚未Jamie人工PASS；Phase 4不得自動pixel-tune或自行調整。只有Jamie Phase 6明確指示後才可單獨微調center／scale。

### 15.6 Countdown Rendering Algorithm

C－06沿用已成立的C wrapper visual ink-center模式：

1. 等待正式A－06 `waitForIgFonts()`完成。
2. Load並check `112pt "ShopeeNotoSans Bold"` countdown font。
3. 以`isValidCCountdown()`驗證`cCountdownText`；missing或非法值fail closed。
4. 設定`ctx.font = '112pt "ShopeeNotoSans Bold"'`、`textAlign = "left"`、`textBaseline = "alphabetic"`。
5. 使用`measureText()`與`actualBoundingBoxLeft/Right/Ascent/Descent`取得visual ink rect及center。
6. 使用下列C－06-local transform：

   ```text
   save
   → translate(463, 1168)
   → rotate(-2.1 * Math.PI / 180)
   → scale(1.0, 1.0)
   → fillStyle = "#ff4c45"
   → fillText(text, -inkCenterX, -inkCenterY)
   → restore
   ```

Target是visual ink center，不是alphabetic baseline。禁止CSS transform、rotation sign反轉、pt→px、non-uniform scale、transform洩漏或shared geometry／rotation helper。

### 15.7 Wrapper Architecture Decision

Phase 4預定新增：

`bn/templates/C/06-ig.js`

Architecture：

```text
C－06 wrapper
  → formal A－06 renderIg()
  → C－06 countdown overlay
```

Wrapper只負責：import正式A－06 dimensions／renderer／font waiter、reuse`isValidCCountdown()`、等待正式fonts、先完整執行A－06 renderer、驗證正式Canvas、再繪製C－06 countdown。對外export命名保持與正式`renderIg()`／`waitForIgFonts()`及現有viewer convention相容，不建立新抽象層。

### 15.8 Routing Decision

`bn/js/render-a.js`目前`C_TABLE`支援C01～05，C06 explicit unsupported。Phase 4只做：

- Import C－06 wrapper。
- 新增`C_TABLE["06"]`，background精確為`06_IG.jpg`。
- 將既有countdown field projection及pre-validation BN id gate由01～05擴為01～06。
- Unsupported boundary改為C07～17；未知C slot仍不得fallback到`A_TABLE`。

不得重構A/B/D routing或預開C07～17。

### 15.9 Import／Restore Decision

`bn/js/import.js`目前C supported BN IDs為01～05；Phase 4只增加`"06"`。

- Import仍只讀C Sheet的`B15/B16/B17/E16`，保留完整`0天～9天`字串、atomic validation、supported selectedBnId preservation及unsupported context fallback至01。
- Restore仍使用JSON v1、C-only `cCountdownText`及exact countdown validation；C01～06 selectedBnId可接受，C07～17拒絕。
- 不升JSON version、不新增欄位、不修改A/B/D Import／Restore。

### 15.10 Editor Decision

`bn/js/editor.js`只把既有C countdown control exposure gate由C01～05擴為C01～06。C－06沿用現有headline、subheadline、protectionText及唯一`0天～9天`countdown select；不建立C－06-specific UI，不改C01～05，也不處理C07～17。

### 15.11 App Decision

`bn/js/app.js`的`C_ENABLED_BN_IDS`只增加`"06"`；C07～17繼續disabled，現有C keyboard early-return及A/B/D behavior保持不變。

### 15.12 Viewer Decision

`bn/launch/viewer.html`只新增唯一C－06 branch：

- Query：`type=C&bn=06_IG`。
- Production wrapper：`../templates/C/06-ig.js`。
- Canvas：`900×1600`。
- Bottom：`../assets/C/底圖/06_IG.jpg`。
- Overlay：`../assets/C/對位/06_IG.png`。
- 使用C－06 wrapper對外與正式`renderIg`／`waitForIgFonts`相容的exports。
- 顯示既有三欄inputs、共用`0天～9天`countdown select及overlay toggle。

不得建立第二份viewer、改寫C01～05 branches或處理C07～17。

### 15.13 Launcher Decision

Phase 4預定新增：

`bn/launch/C/06_IG.command`

Launcher沿用C01～05 convention，開啟既有viewer的精確URL：

```text
http://127.0.0.1:4173/bn/launch/viewer.html?type=C&bn=06_IG
```

維持既有Python HTTP server、port readiness、cleanup、browser open、error handling、repo root resolution及executable mode convention；不建立新server或新viewer。

### 15.14 Phase 4 Exact File Scope

Phase 4預計精確7檔。

新增2檔：

1. `bn/templates/C/06-ig.js`
2. `bn/launch/C/06_IG.command`

修改5檔：

3. `bn/js/render-a.js`
4. `bn/js/import.js`
5. `bn/js/editor.js`
6. `bn/js/app.js`
7. `bn/launch/viewer.html`

若實作需要第8檔，必須停止並重新裁決scope，不得自行擴大。

### 15.15 Explicit Zero-Modification Boundary

Phase 4不需要修改：

- `bn/js/workspace.js`
- `bn/js/countdown.js`
- `bn/js/export.js`
- `bn/css/styles.css`
- `bn/templates/A/06-ig.js`
- C01～05 wrappers及launchers
- Requirement／Architecture
- Shared Proposal（本節Phase 3完成後不再動）
- A/B/D implementation
- assets、fonts、vendor

既有C state、exact validator、JSON／Export bridge、Editor styling及production render bridge已足夠。不得為了完整性或DRY硬加檔案、shared helper或shared rotation constant。

### 15.16 Phase 5 Verification Plan（本輪不執行）

Phase 4 Coding後的AI self-check最多包含：

1. Exact 7-file scope與`git diff --check`。
2. 新增／修改JS syntax checks、launcher `zsh -n`及viewer inline module parse。
3. C－06 route成功、C07仍explicit reject。
4. C－06 Canvas／bottom／overlay的`900×1600`contract。
5. Import C06 selected context、unsupported context fallback及invalid countdown atomic failure。
6. Restore接受C01～06、拒絕C07；JSON v1及`cCountdownText`不變。
7. Editor countdown gate與App enabled gate精確擴至C06。
8. `0天～9天`合法，非法countdown reject。
9. Wrapper font literal `112pt "ShopeeNotoSans Bold"`、color `#ff4c45`、rotation `-2.1°`、center candidate `(463,1168)`及scale candidate `1.0`。
10. A－06、C01～05、shared runtime及A/B/D protection hashes／smoke boundary。

Phase 5不擴為完整C style regression suite，不要求browser pixel measurement，不生成圖片，也不自動調整geometry。

### 15.17 Phase 6 Jamie Manual Verification Plan（本輪不執行）

Jamie雙擊：

`bn/launch/C/06_IG.command`

人工確認：

1. C－06底圖正確、overlay可切換、Canvas為`900×1600`。
2. Headline、subheadline、protectionText完整沿用正式A/B－06行為，包含2× downsample及`$`／`%` mixed-run alignment。
3. Countdown顯示，font視覺符合literal `112pt "ShopeeNotoSans Bold"`，color為`#ff4c45`。
4. Canvas rotation精確`-2.1°`，此USER LOCKED值不因人工對位重新研究。
5. Initial center `(463,1168)`及uniform scale `1.0`是否需要Jamie指示的單獨微調。
6. `0天～9天`切換正常。

只有Jamie明確回覆PASS／「可以了」才能鎖定center／scale及C－06最終人工結果；AI不得自行宣告Manual PASS，也不得自行修改USER LOCKED font size或rotation。

### 15.18 C－07～17 Boundary

C－07～17完全不在本節範圍。不得預建任何 C07 wrapper、launcher、route、geometry、font size、center或scale，不新增C07～14任何spec，也不新增C15～17內容。C－06完成後仍須依Jamie授權逐版處理。

### 15.19 Conflict／Open／Acceptance State

`CONFLICT: None`

Bottom、overlay與正式Canvas全部為`900×1600`，不存在尺寸conflict或額外background workaround。既有C state、validator、JSON／Export bridge與Editor styling也已足夠C－06，不需要第8檔。

仍OPEN且必須由Jamie launcher裁決：

- Initial center `(463,1168)`的最終人工視覺接受度。
- Initial uniform scale `1.0`的最終人工視覺接受度。
- 所有合法countdown值的最終視覺接受度。

Font literal `112pt "ShopeeNotoSans Bold"`、color `#ff4c45`及Canvas rotation `-2.1°`不是OPEN candidate；它們是USER LOCKED。

本節完成只代表C－06 Phase 3 Proposal已核准進入Phase 4；不代表已Coding、已supported、已完成Phase 5或已Jamie人工PASS。

## 16. C－07｜`07_FB POST` Phase 3 Proposal

> **Historical phase record — current result is FINAL LOCKED／Manual Verification PASS.** 本節的candidate、planned、尚未Coding與待Jamie驗證文字只記錄當時Phase 3狀態；current authority為第24節與Code Commit `0c9da10`，geometry數值不因本註記改寫。

本節只追加C－07已確認的Phase 3設計，不回寫或改寫C01～06，不預先處理C08～17。本節完成只代表C－07設計可等待Jamie授權進入Phase 4 Coding；不代表已實作、已驗證、完整C Export ready或已Jamie人工PASS。

### 16.1 Scope／Phase Boundary

- 版位：`07_FB POST`。
- 正式Canvas：`1200×630`。
- Headline、subheadline、protectionText完整沿用正式A/B－07 renderer。
- C－07只額外疊加既有C contract的`cCountdownText`。
- Phase 3只鎖定wrapper、routing、Import／Restore、Editor、App、Viewer、launcher與後續驗證計畫；本輪不Coding、不改Requirement／Architecture、不生成媒體。
- C08～17保持unsupported且不在本節範圍。

### 16.2 USER LOCKED Requirements

- Countdown font source：`ShopeeNotoSans(content)-Bold`。
- Canvas alias：`ShopeeNotoSans Bold`。
- Font literal精確為`75pt "ShopeeNotoSans Bold"`；禁止pt→px。
- Color精確為`#ff4c45`。
- Canvas rotation精確為`-2.1°`，視覺約`2.1° CCW`；此值是USER LOCKED，不是candidate，不得重新研究或改變sign。
- 合法值精確為完整字串`0天`～`9天`。
- Excel source：`C!E16`；不得自行由純數字組成「天」。
- Preview／Editor可修改countdown；Import／Restore／JSON沿用既有C countdown contract保存完整字串。
- Bottom：`bn/assets/C/底圖/07_FB POST.jpg`。
- Overlay：`bn/assets/C/對位/07_FB POST.png`，只供人工校對，不進正式Preview／Export output。

### 16.3 A/B－07 Formal Renderer Evidence／Mandatory Reuse

正式template：`bn/templates/A/07-fb-post.js`。

- Renderer：`renderFbPost()`。
- Font waiter：`waitForFbPostFonts()`。
- 正式Canvas：`1200×630`。
- Background必須是已decode的`HTMLImageElement`，intrinsic dimensions精確為`1200×630`。
- Bottom draw：`drawImage(backgroundImage, 0, 0, 1200, 630)`；無offset、crop或resize。

正式三欄規格：

| 欄位 | Geometry | Font | Color | 正式行為 |
|---|---|---|---|---|
| headline | `[54,266,405,49]` | `39pt "ShopeeNotoSans Medium"` | `#ffffff` | `left`／`alphabetic`；visual ink左緣貼齊box left並垂直置中；2× temporary Canvas後high-quality smoothing downsample |
| subheadline | `[54,325,475,62]` | ordinary `49pt "ShopeeNotoSans Bold"`；`$`／`%`為`41pt "ShopeeNotoSans Bold"` | `#fff285` | ordinary／special runs分割；special glyph bottom依相鄰ordinary boundary glyph ink bottom對齊；整組visual ink左緣貼齊box left並垂直置中；直接繪正式Canvas |
| protectionText | `[54,401,475,28]` | `22.5pt "ShopeeNotoSans Medium"` | `#a6f4e6` | `left`／`alphabetic`；visual ink左緣貼齊box left並垂直置中；2× temporary Canvas後high-quality downsample |

A－07另保留layout bounds、font readiness、finite `measureText()`／`actualBoundingBox*` validation、ink-fit metadata、headline／protection temporary Canvas與subheadline special-run alignment。正式renderer回傳三欄validation object。

Phase 4必須採：

```text
C－07 wrapper
  → formal A－07 renderFbPost()
  → C－07 countdown overlay
```

不得複製、簡化或重寫A－07三欄邏輯；`bn/templates/A/07-fb-post.js`保持零修改。現有C wrapper convention在呼叫A renderer後不回傳A validation result，而是回傳`undefined`；C－07沿用此既有pattern，不建立新的return architecture，也不返工C01～06。

### 16.4 Asset Contract

| 用途 | Format | Intrinsic dimensions | Alpha | SHA-256 |
|---|---|---|---|---|
| `bn/assets/C/底圖/07_FB POST.jpg` | JPEG baseline、8-bit、3 components | `1200×630` | 無 | `418b9b79c088c02bf07d85e92f37d893ba388039a93bd18beb3d8893d39d878a` |
| `bn/assets/C/對位/07_FB POST.png` | PNG、8-bit RGBA、non-interlaced | `1200×630` | 有 | `cdef025181837954d91a61e1a95426aa3175effb75b5679e08210737de25d025` |

Bottom、overlay與正式Canvas全部為`1200×630`，不存在尺寸conflict。不需要resize、crop、offset、asset轉檔／修改、Canvas dimensions變更或background workaround。

### 16.5 Countdown Geometry Decision

```text
COUNTDOWN_FONT          = '75pt "ShopeeNotoSans Bold"'
COUNTDOWN_COLOR         = '#ff4c45'
COUNTDOWN_TARGET_CENTER = (870, 400)
COUNTDOWN_ROTATION      = -2.1deg
COUNTDOWN_VISUAL_SCALE  = 1.0
```

分類必須保持：

- Font source／alias、literal `75pt`、`#ff4c45`及Canvas rotation `-2.1°`是USER LOCKED；禁止pt→px，rotation不是candidate。
- Target center `(870,400)`是 **Phase 3 initial candidate, pending Jamie launcher visual verification**。
- Uniform visual scale `1.0`是 **Phase 3 initial candidate, pending Jamie launcher visual verification**。
- Center及scale尚未Jamie人工PASS；Phase 4不得自動pixel-tune或自行調整。只有Jamie Phase 6明確指示後才可單獨微調center／scale。

### 16.6 Countdown Rendering Algorithm

C－07沿用既有C01～06 visual ink-center模式：

1. 等待正式A－07 `waitForFbPostFonts()`完成。
2. Load並check `75pt "ShopeeNotoSans Bold"` countdown font。
3. 以`isValidCCountdown()`驗證`cCountdownText`；missing或非法值fail closed。
4. 設定`ctx.font = '75pt "ShopeeNotoSans Bold"'`、`textAlign = "left"`、`textBaseline = "alphabetic"`。
5. 使用`measureText()`與`actualBoundingBoxLeft/Right/Ascent/Descent`取得visual ink rect及center；metrics必須finite且ink bounds有效。
6. 使用下列C－07-local transform：

   ```text
   save
   → translate(870, 400)
   → rotate(-2.1 * Math.PI / 180)
   → scale(1.0, 1.0)
   → fillStyle = "#ff4c45"
   → fillText(text, -inkCenterX, -inkCenterY)
   → restore
   ```

Target是visual ink center，不是alphabetic baseline。禁止CSS transform、rotation sign反轉、pt→px、non-uniform scale、transform洩漏或shared geometry／rotation helper。

### 16.7 Wrapper Architecture Decision

Phase 4預定新增：

`bn/templates/C/07-fb-post.js`

Wrapper只負責：

- Import/reuse A－07正式dimensions exports、`renderFbPost()`及`waitForFbPostFonts()`。
- Import/reuse `../../js/countdown.js`的`isValidCCountdown()`。
- 等待A－07正式fonts及C countdown Bold font。
- 驗證完整`0天`～`9天`字串。
- 先完整執行A－07 renderer並保留其全部正式行為，再驗證正式Canvas為`1200×630`，最後疊C－07 countdown。
- 對外renderer／waiter naming保持與A－07語意及現有viewer convention相容。

不得修改A－07、複製三欄rendering code或建立新shared architecture。

### 16.8 Routing Decision

`bn/js/render-a.js`目前`C_TABLE`與countdown projection／pre-validation gate支援C01～06，C07 explicit unsupported。Phase 4只做：

- Import C－07 wrapper。
- 新增`C_TABLE["07"]`，background精確為`07_FB POST.jpg`。
- 將`C_COUNTDOWN_BN_IDS`由01～06擴為01～07。
- 同步必要unsupported message。
- C08～17保持unsupported，未知C slot不得fallback至`A_TABLE`。

不得修改`A_TABLE`、B／D routing、重構registry或預建後續slots。

### 16.9 Import／Restore Decision

`bn/js/import.js`只將`C_SUPPORTED_BN_IDS`由01～06擴為01～07，並同步既有錯誤訊息。

- Import仍選Sheet C並讀取`B15/B16/B17/E16`；E16保存完整`0天`～`9天`字串，非法countdown維持atomic failure。
- Supported C07 selected context保留；unsupported context沿用既有fallback行為。
- Restore共用同一supported IDs；C07 selectedBnId合法，C08～17仍拒絕。
- JSON version維持`1`，C-only `cCountdownText`欄位及validation contract不變。

不得新增JSON欄位、修改workspace state或改動A/B/D Import／Restore。

### 16.10 Editor Decision

`bn/js/editor.js`只把既有C countdown field gate由C01～06擴為C01～07。C－07沿用現有headline、subheadline、protectionText與唯一`0天`～`9天`countdown select；不建立C07-specific UI、不改CSS、不改C01～06 behavior。

### 16.11 App Decision

`bn/js/app.js`只將`C_ENABLED_BN_IDS`由01～06擴為01～07。C08～17繼續disabled；不得重構App或改A/B/D behavior。

### 16.12 Viewer Decision

`bn/launch/viewer.html`只新增唯一C－07 branch：

- Query：`type=C&bn=07_FB POST`。
- Production wrapper：`../templates/C/07-fb-post.js`。
- Canvas：`1200×630`。
- Bottom：`../assets/C/底圖/07_FB POST.jpg`。
- Overlay：`../assets/C/對位/07_FB POST.png`。
- Renderer：`renderFbPost`。
- Font waiter：`waitForFbPostFonts`。
- 顯示既有三欄inputs、共用`0天`～`9天`countdown select及overlay toggle。
- 同步必要unsupported summary。

不得建立第二份viewer、改寫C01～06 branches或預建C08 branch。

### 16.13 Launcher Decision

Phase 4預定新增：

`bn/launch/C/07_FB POST.command`

Launcher完全沿用C01～06 convention，開啟既有viewer的精確URL：

```text
http://127.0.0.1:4173/bn/launch/viewer.html?type=C&bn=07_FB%20POST
```

空白必須依既有launcher convention正確URL encode，不得將未encode空白直接放入URL。維持既有Python HTTP server、port readiness、cleanup、browser open、error handling、repo root resolution與executable mode `755` convention；不建立新server或新viewer。

### 16.14 Phase 4 Exact File Scope

Phase 4預計精確7檔。

新增2檔：

1. `bn/templates/C/07-fb-post.js`
2. `bn/launch/C/07_FB POST.command`

修改5檔：

3. `bn/js/render-a.js`
4. `bn/js/import.js`
5. `bn/js/editor.js`
6. `bn/js/app.js`
7. `bn/launch/viewer.html`

若實作發現需要第8檔，必須停止並回報scope conflict，不得自行擴大。

### 16.15 Explicit Zero-Modification Boundary

Phase 4不需要修改：

- `bn/js/workspace.js`
- `bn/js/countdown.js`
- `bn/js/export.js`
- `bn/css/styles.css`
- `bn/templates/A/07-fb-post.js`
- C01～06 wrappers及launchers
- Shared Proposal（本節Phase 3完成後Phase 4不再修改）
- Requirement／Architecture
- C assets、fonts、vendor
- A/B/D implementation
- C08～17

既有C state、exact validator、JSON／Export bridge、Editor styling及production render bridge已足夠C－07。不得為了完整性或DRY硬加檔案、shared helper或shared rotation constant。

### 16.16 Export Boundary

- 07既有輸出格式為JPG。
- C－07 route接通後沿用既有`renderBnToCanvas()`橋接。
- JSON v1既有C countdown保存邏輯不變。
- `bn/js/export.js`不需修改。
- C08～17尚未完成；本節不得宣稱完整C 17版位Export或full C workspace readiness已完成。

### 16.17 Phase 5 Verification Plan（本輪不執行）

Phase 4 Coding後的AI self-check只涵蓋C－07必要範圍：

1. Exact 7-file implementation scope與`git diff --check`。
2. C－07 wrapper、`render-a.js`、`import.js`、`editor.js`、`app.js` syntax checks；launcher `zsh -n`及viewer inline module parse。
3. C－07 route成功、C08 route明確拒絕。
4. C－07 Canvas／bottom／overlay的`1200×630`contract與background placement。
5. `0天`～`9天`合法，`10天`等非法值拒絕。
6. Wrapper精確保存literal `75pt "ShopeeNotoSans Bold"`、`#ff4c45`、rotation `-2.1°`、center candidate `(870,400)`與scale candidate `1.0`。
7. Import保留C07 selected context及非法countdown atomic failure。
8. Restore接受C07、拒絕C08；JSON v1及`cCountdownText`不變。
9. Editor countdown gate與App enabled gate精確擴至C07。
10. Viewer C07 branch、launcher URL及mode符合contract。
11. A－07 template、C01～06 wrappers／launchers、workspace／countdown／export／styles、Proposal／Requirement、C07 assets與A/B/D boundaries的hash protection。

Phase 5不擴為完整C regression suite，不做browser pixel measurement，不生成圖片，不自動調整geometry。

### 16.18 Phase 6 Jamie Manual Verification Plan（本輪不執行）

Jamie之後雙擊：

`bn/launch/C/07_FB POST.command`

人工確認：

1. C－07底圖正確、overlay可切換、Canvas為`1200×630`。
2. Headline、subheadline、protectionText完整沿用正式A/B－07行為，包含headline／protection 2× downsample及subheadline `$`／`%` special-run alignment。
3. Countdown顯示，font視覺符合literal `75pt "ShopeeNotoSans Bold"`，color為`#ff4c45`。
4. Canvas rotation精確`-2.1°`；此USER LOCKED值不得因人工對位重新研究。
5. Initial center `(870,400)`及uniform scale `1.0`是否需要Jamie明確指示的單點微調。
6. `0天`～`9天`切換正常。

只有Jamie明確回覆PASS／「可以了」才能鎖定center／scale與C－07最終人工結果。AI不得自行宣告Manual PASS，也不得自行修改USER LOCKED font、color或rotation。

### 16.19 C－08～17 Boundary

C－08～17完全不在本節範圍。不得預建C08 wrapper、launcher、routing、geometry、font size、center或scale，不新增C08～14 countdown spec，也不新增C15～17內容。C－07完成後仍須依Jamie授權逐版處理。

### 16.20 Conflict／Open／Acceptance State

`CONFLICT: None`

Bottom、overlay與正式Canvas全部為`1200×630`，不存在尺寸conflict或額外background workaround。既有C state、validator、JSON／Export bridge與Editor styling已足夠C－07，不需要第8檔。

仍OPEN且必須由Jamie launcher裁決：

- Initial center `(870,400)`的最終人工視覺接受度。
- Initial uniform scale `1.0`的最終人工視覺接受度。
- 所有合法countdown值的最終視覺接受度。

Font literal `75pt "ShopeeNotoSans Bold"`、color `#ff4c45`及Canvas rotation `-2.1°`不是OPEN candidate；它們是USER LOCKED。

本節完成只代表C－07 Phase 3 Proposal可等待Jamie授權進入Phase 4；不代表已Coding、已supported、已完成Phase 5、完整C Export ready或已Jamie人工PASS。

## 17. C－08｜`08_SPX TVBN_1` Phase 3 Proposal

> **Historical phase record — current result is FINAL LOCKED／Manual Verification PASS.** 本節的candidate、planned、尚未Coding與待Jamie驗證文字只記錄當時Phase 3狀態；current authority為第24節與Code Commit `0c9da10`，geometry數值不因本註記改寫。

本節只追加C－08已確認的Phase 3設計，不回寫或改寫C01～07，不預先處理C09～17。本節完成只代表C－08設計可等待Jamie授權進入Phase 4 Coding；不代表已實作、已驗證、完整C Export ready或已Jamie人工PASS。

### 17.1 Scope／Phase Boundary

- 版位：`08_SPX TVBN_1`。
- 正式Canvas：`1080×1920`。
- Headline、subheadline、protectionText完整沿用正式A/B－08 renderer。
- C－08只額外疊加既有C contract的`cCountdownText`。
- Phase 3只鎖定wrapper、routing、Import／Restore、Editor、App、Viewer、launcher與後續驗證計畫；本輪不Coding、不改Requirement／Architecture、不生成媒體。
- C09～17保持unsupported且不在本節範圍。

### 17.2 USER LOCKED Requirements

- Countdown font source：`ShopeeNotoSans(content)-Bold`。
- Canvas alias：`ShopeeNotoSans Bold`。
- Font literal精確為`130pt "ShopeeNotoSans Bold"`；禁止pt→px。
- Color精確為`#ff4c45`。
- Canvas rotation精確為`-2.1°`，視覺約`2.1° CCW`；此值是USER LOCKED，不是candidate，不得重新研究或改變sign。
- 合法值精確為完整字串`0天`～`9天`。
- Excel source：`C!E16`；不得自行由純數字組成「天」。
- Preview／Editor可修改countdown；Import／Restore／JSON沿用既有C countdown contract保存完整字串。
- Bottom：`bn/assets/C/底圖/08_SPX TVBN_1.jpg`。
- Overlay：`bn/assets/C/對位/08_SPX TVBN_1.png`，只供人工校對，不進正式Preview／Export output。

### 17.3 A/B－08 Formal Renderer Evidence／Mandatory Reuse

正式template：`bn/templates/A/08-spx-tvbn-1.js`。

- Renderer：`renderSpxTvbn1()`。
- Font waiter：`waitForSpxTvbn1Fonts()`。
- 正式Canvas：`1080×1920`。
- Background必須是已decode的`HTMLImageElement`，intrinsic dimensions精確為`1080×1920`。
- Bottom draw：`drawImage(backgroundImage, 0, 0, 1080, 1920)`；無offset、crop或resize。

正式三欄規格：

| 欄位 | Geometry | Font | Color | 正式行為 |
|---|---|---|---|---|
| headline | `[167,507,745,87]` | `70pt "ShopeeNotoSans Medium"` | `#ffffff` | `left`／`alphabetic`；以`actualBoundingBox*`將visual ink水平及垂直置中；2× temporary Canvas `2160×3840`後high-quality smoothing downsample |
| subheadline | `[94,619,890,114]` | ordinary `90pt "ShopeeNotoSans Bold"`；`$`／`%`為`75pt "ShopeeNotoSans Bold"` | `#fff285` | ordinary／special runs分割；special glyph依相鄰ordinary boundary glyph ink bottom對齊；整組visual ink水平及垂直置中；直接繪正式Canvas |
| protectionText | `[94,759,890,51]` | `40pt "ShopeeNotoSans Medium"` | `#a6f4e6` | `left`／`alphabetic`；visual ink水平及垂直置中；2× temporary Canvas後high-quality downsample |

A－08另保留frame bounds、font readiness/load、finite `measureText()`／`actualBoundingBox*` validation、centered visual-ink fit metadata、headline／protection temporary Canvas與subheadline special-run alignment。正式renderer回傳三欄validation object。

Phase 4必須採：

```text
C－08 wrapper
  → formal A－08 renderSpxTvbn1()
  → C－08 countdown overlay
```

不得複製、簡化或重寫A－08三欄邏輯；`bn/templates/A/08-spx-tvbn-1.js`保持零修改。現有C wrapper convention在呼叫A renderer後不回傳A validation result，而是回傳`undefined`；C－08沿用此既有pattern，不建立新的return architecture，也不返工C01～07。

### 17.4 Asset Contract

| 用途 | Format | Intrinsic dimensions | Alpha | SHA-256 |
|---|---|---|---|---|
| `bn/assets/C/底圖/08_SPX TVBN_1.jpg` | JPEG baseline、8-bit、3 components | `1080×1920` | 無 | `a8d3d7a6f8efc7789b07cdb9879a3aeb3815c2ff9861eea53a3e9b21260e8b78` |
| `bn/assets/C/對位/08_SPX TVBN_1.png` | PNG、8-bit RGBA、non-interlaced | `1080×1920` | 有 | `fe9e294d6a6d77a8611c9fcfaed7cfc3e431fbeda8f7ae120db71db98ebd4ee1` |

Bottom、overlay與正式Canvas全部為`1080×1920`，不存在尺寸conflict。不需要resize、crop、offset、asset轉檔／修改、Canvas dimensions變更或background workaround。

### 17.5 Countdown Geometry Decision

```text
COUNTDOWN_FONT          = '130pt "ShopeeNotoSans Bold"'
COUNTDOWN_COLOR         = '#ff4c45'
COUNTDOWN_TARGET_CENTER = (570, 1450)
COUNTDOWN_ROTATION      = -2.1deg
COUNTDOWN_VISUAL_SCALE  = 1.0
```

分類必須保持：

- Font source／alias、literal `130pt`、`#ff4c45`及Canvas rotation `-2.1°`是USER LOCKED；禁止pt→px，rotation不是candidate。
- Target center `(570,1450)`是 **Phase 3 initial candidate, pending Jamie launcher visual verification**。
- Uniform visual scale `1.0`是 **Phase 3 initial candidate, pending Jamie launcher visual verification**。
- Center及scale尚未Jamie人工PASS；Phase 4不得自動pixel-tune或自行調整。只有Jamie Phase 6明確指示後才可單獨微調center／scale。

### 17.6 Countdown Rendering Algorithm

C－08沿用既有C01～07 visual ink-center模式：

1. 等待正式A－08 `waitForSpxTvbn1Fonts()`完成。
2. Load並check `130pt "ShopeeNotoSans Bold"` countdown font。
3. 以`isValidCCountdown()`驗證`cCountdownText`；missing或非法值fail closed。
4. 設定`ctx.font = '130pt "ShopeeNotoSans Bold"'`、`textAlign = "left"`、`textBaseline = "alphabetic"`。
5. 使用`measureText()`與`actualBoundingBoxLeft/Right/Ascent/Descent`取得visual ink rect及center；metrics必須finite且ink bounds有效。
6. 使用下列C－08-local transform：

   ```text
   save
   → translate(570, 1450)
   → rotate(-2.1 * Math.PI / 180)
   → scale(1.0, 1.0)
   → fillStyle = "#ff4c45"
   → fillText(text, -inkCenterX, -inkCenterY)
   → restore
   ```

Target是visual ink center，不是alphabetic baseline。禁止CSS transform、rotation sign反轉、pt→px、non-uniform scale、transform洩漏或shared geometry／rotation helper。

### 17.7 Wrapper Architecture Decision

Phase 4預定新增：

`bn/templates/C/08-spx-tvbn-1.js`

Wrapper只負責：

- Import/reuse A－08正式dimensions exports、`renderSpxTvbn1()`及`waitForSpxTvbn1Fonts()`。
- Import/reuse `../../js/countdown.js`的`isValidCCountdown()`。
- 等待A－08正式fonts及C countdown Bold font。
- 驗證完整`0天`～`9天`字串。
- 先完整執行A－08 renderer並保留其全部正式行為，再驗證正式Canvas為`1080×1920`，最後疊C－08 countdown。
- 對外renderer／waiter naming保持與A－08語意及現有viewer convention相容。

不得修改A－08、複製三欄rendering code或建立新shared architecture。

### 17.8 Routing Decision

`bn/js/render-a.js`目前`C_TABLE`與countdown projection／pre-validation gate支援C01～07，C08 explicit unsupported。Phase 4只做：

- Import C－08 wrapper。
- 新增`C_TABLE["08"]`，background精確為`08_SPX TVBN_1.jpg`。
- 將`C_COUNTDOWN_BN_IDS`由01～07擴為01～08。
- 同步必要unsupported message。
- C09～17保持unsupported，未知C slot不得fallback至`A_TABLE`。

不得修改`A_TABLE`、B／D routing、重構registry或預建後續slots。

### 17.9 Import／Restore Decision

`bn/js/import.js`只將`C_SUPPORTED_BN_IDS`由01～07擴為01～08，並同步既有錯誤訊息。

- Import仍選Sheet C並讀取`B15/B16/B17/E16`；E16保存完整`0天`～`9天`字串，非法countdown維持atomic failure。
- Supported C08 selected context保留；unsupported context沿用既有fallback行為。
- Restore共用同一supported IDs；C08 selectedBnId合法，C09～17仍拒絕。
- JSON version維持`1`，C-only `cCountdownText`欄位及validation contract不變。

不得新增JSON欄位、修改workspace state或改動A/B/D Import／Restore。

### 17.10 Editor Decision

`bn/js/editor.js`只把既有C countdown field gate由C01～07擴為C01～08。C－08沿用現有headline、subheadline、protectionText與唯一`0天`～`9天`countdown select；不建立C08-specific UI、不改CSS、不改C01～07 behavior。

### 17.11 App Decision

`bn/js/app.js`只將`C_ENABLED_BN_IDS`由01～07擴為01～08。C09～17繼續disabled；不得重構App或改A/B/D behavior。

### 17.12 Viewer Decision

`bn/launch/viewer.html`只新增唯一C－08 branch：

- Query：`type=C&bn=08_SPX TVBN_1`。
- Production wrapper：`../templates/C/08-spx-tvbn-1.js`。
- Canvas：`1080×1920`。
- Bottom：`../assets/C/底圖/08_SPX TVBN_1.jpg`。
- Overlay：`../assets/C/對位/08_SPX TVBN_1.png`。
- Renderer：`renderSpxTvbn1`。
- Font waiter：`waitForSpxTvbn1Fonts`。
- 顯示既有三欄inputs、共用`0天`～`9天`countdown select及overlay toggle。
- 同步必要unsupported summary。

不得建立第二份viewer、改寫C01～07 branches或預建C09 branch。

### 17.13 Launcher Decision

Phase 4預定新增：

`bn/launch/C/08_SPX TVBN_1.command`

Launcher完全沿用C01～07 convention，開啟既有viewer的精確URL：

```text
http://127.0.0.1:4173/bn/launch/viewer.html?type=C&bn=08_SPX%20TVBN_1
```

空白必須依既有launcher convention正確URL encode，不得為此另建helper。維持既有Python HTTP server、port readiness、cleanup、browser open、error handling、repo root resolution與executable mode `755` convention；不建立新server或新viewer。

### 17.14 Phase 4 Exact File Scope

Phase 4預計精確7檔。

新增2檔：

1. `bn/templates/C/08-spx-tvbn-1.js`
2. `bn/launch/C/08_SPX TVBN_1.command`

修改5檔：

3. `bn/js/render-a.js`
4. `bn/js/import.js`
5. `bn/js/editor.js`
6. `bn/js/app.js`
7. `bn/launch/viewer.html`

若實作發現需要第8檔，必須停止並回報scope conflict，不得自行擴大。

### 17.15 Explicit Zero-Modification Boundary

Phase 4不需要修改：

- `bn/js/workspace.js`
- `bn/js/countdown.js`
- `bn/js/export.js`
- `bn/css/styles.css`
- `bn/templates/A/08-spx-tvbn-1.js`
- C01～07 wrappers及launchers
- Shared Proposal（本節Phase 3完成後Phase 4不再修改）
- Requirement／Architecture
- C assets、fonts、vendor
- A/B/D implementation
- C09～17

既有C state、exact validator、JSON／Export bridge、Editor styling及production render bridge已足夠C－08。不得為了完整性或DRY硬加檔案、shared helper或shared rotation constant。

### 17.16 Export Boundary

- 08既有輸出格式為JPG。
- C－08 route接通後沿用既有`renderBnToCanvas()`橋接。
- JSON v1既有C countdown保存邏輯不變。
- `bn/js/export.js`不需修改。
- C09～17尚未完成；本節不得宣稱完整C 17版位Export或full C workspace readiness已完成。

### 17.17 Phase 5 Verification Plan（本輪不執行）

Phase 4 Coding後的AI self-check只涵蓋C－08必要範圍：

1. Exact 7-file implementation scope與`git diff --check`。
2. C－08 wrapper、`render-a.js`、`import.js`、`editor.js`、`app.js` syntax checks；launcher `zsh -n`及viewer inline module parse。
3. C－08 route成功、C09 route明確拒絕。
4. C－08 Canvas／bottom／overlay的`1080×1920`contract與background placement。
5. `0天`～`9天`合法，`10天`等非法值拒絕。
6. Wrapper精確保存literal `130pt "ShopeeNotoSans Bold"`、`#ff4c45`、rotation `-2.1°`、center candidate `(570,1450)`與scale candidate `1.0`。
7. Import保留C08 selected context及非法countdown atomic failure。
8. Restore接受C08、拒絕C09；JSON v1及`cCountdownText`不變。
9. Editor countdown gate與App enabled gate精確擴至C08。
10. Viewer C08 branch、launcher URL及mode符合contract。
11. A－08 template、C01～07 wrappers／launchers、workspace／countdown／export／styles、Proposal／Requirement、C08 assets與A/B/D boundaries的hash protection。

Phase 5不擴為完整C regression suite，不做browser pixel measurement，不生成圖片，不自動調整geometry。

### 17.18 Phase 6 Jamie Manual Verification Plan（本輪不執行）

Jamie之後雙擊：

`bn/launch/C/08_SPX TVBN_1.command`

人工確認：

1. C－08底圖正確、overlay可切換、Canvas為`1080×1920`。
2. Headline、subheadline、protectionText完整沿用正式A/B－08行為，包含headline／protection 2× downsample及subheadline `$`／`%` special-run alignment。
3. Countdown顯示，font視覺符合literal `130pt "ShopeeNotoSans Bold"`，color為`#ff4c45`。
4. Canvas rotation精確`-2.1°`；此USER LOCKED值不得因人工對位重新研究。
5. Initial center `(570,1450)`及uniform scale `1.0`是否需要Jamie明確指示的單點微調。
6. `0天`～`9天`切換正常。

只有Jamie明確回覆PASS／「可以了」才能鎖定center／scale與C－08最終人工結果。AI不得自行宣告Manual PASS，也不得自行修改USER LOCKED font、color或rotation。

### 17.19 C－09～17 Boundary

C－09～17完全不在本節範圍。不得預建C09 wrapper、launcher、routing、geometry、font size、center或scale，不新增C09～14 countdown spec，也不新增C15～17內容。C－08完成後仍須依Jamie授權逐版處理。

### 17.20 Conflict／Open／Acceptance State

`CONFLICT: None`

Bottom、overlay與正式Canvas全部為`1080×1920`，不存在尺寸conflict或額外background workaround。既有C state、validator、JSON／Export bridge與Editor styling已足夠C－08，不需要第8檔。

仍OPEN且必須由Jamie launcher裁決：

- Initial center `(570,1450)`的最終人工視覺接受度。
- Initial uniform scale `1.0`的最終人工視覺接受度。
- 所有合法countdown值的最終視覺接受度。

Font literal `130pt "ShopeeNotoSans Bold"`、color `#ff4c45`及Canvas rotation `-2.1°`不是OPEN candidate；它們是USER LOCKED。

本節完成只代表C－08 Phase 3 Proposal可等待Jamie授權進入Phase 4；不代表已Coding、已supported、已完成Phase 5、完整C Export ready或已Jamie人工PASS。

## 18. C－09｜`09_SPX TVBN_2` Phase 3 Proposal

> **Historical phase record — current result is FINAL LOCKED／Manual Verification PASS.** 本節的candidate、planned、尚未Coding與待Jamie驗證文字只記錄當時Phase 3狀態；current authority為第24節與Code Commit `0c9da10`，geometry數值不因本註記改寫。

### 18.1 Scope／Phase Boundary

本節只定義C－09 Phase 4的最小實作設計與後續驗證邊界，不在本節執行Coding、不修改Requirement／Architecture，不重新調查Phase 2或分析參考圖。

- 版位：`09_SPX TVBN_2`。
- 三欄完整沿用正式A/B－09行為。
- C－09額外疊加既有C countdown contract。
- C01～08不返工；C10～17仍不支援且不在本節範圍。
- 本節不代表C－09已Coding、已完成Phase 5或已Jamie人工PASS。

### 18.2 USER LOCKED Requirements

- Countdown font source：`ShopeeNotoSans(content)-Bold`。
- Canvas alias：`ShopeeNotoSans Bold`。
- Font literal：`105pt "ShopeeNotoSans Bold"`；禁止pt→px。
- Color：`#ff4c45`。
- Canvas rotation：`-2.1°`，視覺約`2.1° CCW`。
- Legal values：完整字串`0天`～`9天`。
- Excel source：`C!E16`。
- Preview／Editor可修改countdown；Import／Restore／JSON沿用既有C countdown contract。
- Bottom：`bn/assets/C/底圖/09_SPX TVBN_2.jpg`。
- Overlay：`bn/assets/C/對位/09_SPX TVBN_2.png`，只供人工校對，不進正式Preview／Export output。

Literal `105pt`、`#ff4c45`與rotation `-2.1°`是USER LOCKED，不是candidate、不得重新研究或自行調整。

### 18.3 A/B－09 Formal Renderer Evidence／Mandatory Reuse

正式template：`bn/templates/A/09-spx-tvbn-2.js`。

- Renderer：`renderSpxTvbn2()`。
- Font waiter：`waitForSpxTvbn2Fonts()`。
- 正式Canvas：`1599×1080`。
- Background必須是已decode／ready的`HTMLImageElement`，intrinsic dimensions精確為`1599×1080`。
- Bottom draw：`drawImage(backgroundImage, 0, 0, 1599, 1080)`；無offset、crop或實質resize。

正式三欄規格：

| 欄位 | Geometry | Font | Color | 正式行為 |
|---|---|---|---|---|
| headline | `[51,465,620,75]` | `60pt "ShopeeNotoSans Medium"` | `#ffffff` | `left`／`alphabetic`；visual ink左對齊、垂直置中；2× temporary Canvas `3198×2160`後high-quality smoothing downsample |
| subheadline | `[51,557,740,97]` | ordinary `76pt "ShopeeNotoSans Bold"`；`$`／`%`為`65pt "ShopeeNotoSans Bold"` | `#fff285` | ordinary／special runs分割；special glyph依相鄰ordinary boundary glyph ink bottom對齊；整組visual ink左對齊、垂直置中；直接繪正式Canvas |
| protectionText | `[51,674,740,44]` | `35pt "ShopeeNotoSans Medium"` | `#a6f4e6` | `left`／`alphabetic`；visual ink左對齊、垂直置中；2× temporary Canvas後high-quality downsample |

A－09另保留frame bounds與finite數值validation、font readiness/load validation、finite `measureText()`／`actualBoundingBox*` validation、visual ink-fit metadata、headline／protection temporary Canvas、subheadline `$`／`%` mixed-run formatting與boundary glyph ink-bottom alignment。正式renderer回傳frozen三欄validation object。

Phase 4必須採：

```text
C－09 wrapper
  → formal A－09 renderSpxTvbn2()
  → C－09 countdown overlay
```

不得複製、簡化或重寫A－09三欄邏輯；`bn/templates/A/09-spx-tvbn-2.js`保持零修改。現有C wrapper convention在呼叫A renderer後不回傳A validation result，而是回傳`undefined`；C－09沿用此既有pattern，不建立新return architecture，也不返工C01～08。

### 18.4 Asset Contract

| 用途 | Format | Intrinsic dimensions | Alpha | SHA-256 |
|---|---|---|---|---|
| `bn/assets/C/底圖/09_SPX TVBN_2.jpg` | JPEG baseline、8-bit、3 components | `1599×1080` | 無 | `2572f175cf88cc948c235bf52045b652d6ae21dd38252ca3b054c9bb2c7fcdfd` |
| `bn/assets/C/對位/09_SPX TVBN_2.png` | PNG、8-bit RGBA、non-interlaced | `1599×1080` | 有 | `93ccba1fed4cd0d70dfcb52075efd2670199c186d8b46d635713586b63b504d2` |

Bottom、overlay與正式Canvas全部為`1599×1080`，不存在尺寸conflict。不需要resize、crop、offset、asset轉檔／修改、Canvas dimensions變更或background workaround。

### 18.5 Countdown Geometry Decision

```text
COUNTDOWN_FONT          = '105pt "ShopeeNotoSans Bold"'
COUNTDOWN_COLOR         = '#ff4c45'
COUNTDOWN_TARGET_CENTER = (1185, 665)
COUNTDOWN_ROTATION      = -2.1deg
COUNTDOWN_VISUAL_SCALE  = 1.0
```

分類必須保持：

- Font source／alias、literal `105pt`、`#ff4c45`及Canvas rotation `-2.1°`是USER LOCKED；禁止pt→px，rotation不是candidate。
- Target center `(1185,665)`是 **Phase 3 initial candidate, pending Jamie launcher visual verification**。
- Uniform visual scale `1.0`是 **Phase 3 initial candidate, pending Jamie launcher visual verification**。
- Center及scale尚未Jamie人工PASS；Phase 4不得自動pixel-tune或自行調整。只有Jamie後續明確指示後才可單點微調center／scale。

### 18.6 Countdown Rendering Algorithm

C－09沿用既有C01～08 visual ink-center模式：

1. 等待正式A－09 `waitForSpxTvbn2Fonts()`完成。
2. Load並check `105pt "ShopeeNotoSans Bold"` countdown font。
3. 以`isValidCCountdown()`驗證`cCountdownText`；missing或非法值fail closed。
4. 設定`ctx.font = '105pt "ShopeeNotoSans Bold"'`、`textAlign = "left"`、`textBaseline = "alphabetic"`。
5. 使用`measureText()`與`actualBoundingBoxLeft/Right/Ascent/Descent`取得visual ink rect及center；metrics必須finite且ink bounds有效。
6. 使用下列C－09-local transform：

   ```text
   save
   → translate(1185, 665)
   → rotate(-2.1 * Math.PI / 180)
   → scale(1.0, 1.0)
   → fillStyle = "#ff4c45"
   → fillText(text, -inkCenterX, -inkCenterY)
   → restore
   ```

Target是visual ink center，不是alphabetic baseline。禁止CSS transform、rotation sign反轉、pt→px、non-uniform scale、transform洩漏或shared geometry／rotation helper。

### 18.7 Wrapper Architecture Decision

Phase 4預定新增：

`bn/templates/C/09-spx-tvbn-2.js`

Wrapper只負責：

- Import/reuse A－09正式dimensions exports、`renderSpxTvbn2()`及`waitForSpxTvbn2Fonts()`。
- Import/reuse `../../js/countdown.js`的`isValidCCountdown()`。
- 等待A－09正式fonts及C countdown Bold font。
- 驗證完整`0天`～`9天`字串。
- 先完整執行A－09 renderer並保留其全部正式行為，再驗證正式Canvas為`1599×1080`，最後疊C－09 countdown。
- 對外renderer／waiter naming保持與A－09語意及現有viewer convention相容。

不得修改A－09、複製三欄rendering code或建立新shared architecture。

### 18.8 Routing Decision

`bn/js/render-a.js`目前`C_TABLE`與countdown projection／pre-validation gate支援C01～08，C09 explicit unsupported。Phase 4只做：

- Import C－09 wrapper。
- 新增`C_TABLE["09"]`，background精確為`09_SPX TVBN_2.jpg`。
- 將`C_COUNTDOWN_BN_IDS`由01～08擴為01～09。
- 同步必要unsupported message。
- C10～17保持unsupported，未知C slot不得fallback至`A_TABLE`。

不得修改`A_TABLE`、B／D routing、重構registry或預建後續slots。

### 18.9 Import／Restore Decision

`bn/js/import.js`只將`C_SUPPORTED_BN_IDS`由01～08擴為01～09，並同步既有錯誤訊息。

- Import仍選Sheet C並讀取`B15/B16/B17/E16`；E16保存完整`0天`～`9天`字串，非法countdown維持atomic failure。
- Supported C09 selected context保留；unsupported context沿用既有fallback行為。
- Restore共用同一supported IDs；C09 selectedBnId合法，C10～17仍拒絕。
- JSON version維持`1`，C-only `cCountdownText`欄位及validation contract不變。

不得新增JSON欄位、修改workspace state或改動A/B/D Import／Restore。

### 18.10 Editor Decision

`bn/js/editor.js`只把既有C countdown field gate由C01～08擴為C01～09。C－09沿用現有headline、subheadline、protectionText與唯一`0天`～`9天`countdown select；不建立C09-specific UI、不改CSS、不改C01～08 behavior。

### 18.11 App Decision

`bn/js/app.js`只將`C_ENABLED_BN_IDS`由01～08擴為01～09。C10～17繼續disabled；不得重構App或改A/B/D behavior。

### 18.12 Viewer Decision

`bn/launch/viewer.html`只新增唯一C－09 branch：

- Query：`type=C&bn=09_SPX TVBN_2`。
- Production wrapper：`../templates/C/09-spx-tvbn-2.js`。
- Canvas：`1599×1080`。
- Bottom：`../assets/C/底圖/09_SPX TVBN_2.jpg`。
- Overlay：`../assets/C/對位/09_SPX TVBN_2.png`。
- Renderer：`renderSpxTvbn2`。
- Font waiter：`waitForSpxTvbn2Fonts`。
- 顯示既有三欄inputs、共用`0天`～`9天`countdown select及overlay toggle。
- 同步必要unsupported summary。

不得建立第二份viewer、改寫C01～08 branches或預建C10 branch。

### 18.13 Launcher Decision

Phase 4預定新增：

`bn/launch/C/09_SPX TVBN_2.command`

Launcher完全沿用C01～08 convention，開啟既有viewer的精確URL：

```text
http://127.0.0.1:4173/bn/launch/viewer.html?type=C&bn=09_SPX%20TVBN_2
```

空白必須依既有launcher convention正確URL encode，不得為此另建helper。維持既有Python HTTP server、port readiness、cleanup、browser open、error handling、repo root resolution與executable mode `755` convention；不建立新server或新viewer。

### 18.14 Phase 4 Exact File Scope

Phase 4預計精確7檔。

新增2檔：

1. `bn/templates/C/09-spx-tvbn-2.js`
2. `bn/launch/C/09_SPX TVBN_2.command`

修改5檔：

3. `bn/js/render-a.js`
4. `bn/js/import.js`
5. `bn/js/editor.js`
6. `bn/js/app.js`
7. `bn/launch/viewer.html`

若實作發現需要第8檔，必須停止並回報scope conflict，不得自行擴大。

### 18.15 Explicit Zero-Modification Boundary

Phase 4不需要修改：

- `bn/js/workspace.js`
- `bn/js/countdown.js`
- `bn/js/export.js`
- `bn/css/styles.css`
- `bn/templates/A/09-spx-tvbn-2.js`
- C01～08 wrappers及launchers
- Shared Proposal（本節Phase 3完成後Phase 4不再修改）
- Requirement／Architecture
- C assets、fonts、vendor
- A/B/D implementation
- C10～17

既有C state、exact validator、JSON／Export bridge、Editor styling及production render bridge已足夠C－09。不得為了完整性或DRY硬加檔案、shared helper或shared rotation constant。

### 18.16 Export Boundary

- 09既有輸出格式為JPG。
- C－09 route接通後沿用既有`renderBnToCanvas()`橋接。
- JSON v1既有C countdown保存邏輯不變。
- `bn/js/export.js`不需修改。
- C10～17尚未完成；本節不得宣稱完整C 17版位Export或full C workspace readiness已完成。

### 18.17 Phase 4 Coding Plan（本輪不執行）

Phase 4只能：

1. 在精確7檔scope內新增C－09 wrapper／launcher，並修改`render-a.js`、`import.js`、`editor.js`、`app.js`、`viewer.html`。
2. Wrapper完整reuse A－09 renderer／waiter，不複製三欄邏輯。
3. 精確實作literal `105pt "ShopeeNotoSans Bold"`、`#ff4c45`、rotation `-2.1°`、center candidate `(1185,665)`及scale candidate `1.0`。
4. 開放C09 route／Import／Restore／Editor／App／Viewer／launcher，C10仍explicit unsupported。
5. 保護所有zero-modification檔案與C01～08既有實作。

### 18.18 Phase 4 Coding Integrity Self-Check Plan（本輪不執行）

Coding完成後只做C－09最小Integrity Self-Check：

1. Exact 7-file implementation scope、`git diff --check`、C－09 wrapper及shared JS syntax，launcher `zsh -n`與viewer parse。
2. C－09 route成功、C10 route拒絕。
3. Canvas與background placement精確為`1599×1080`／`0,0,1599,1080`。
4. `0天`、`9天`接受；`10天`拒絕。
5. Wrapper精確保存literal `105pt "ShopeeNotoSans Bold"`、`#ff4c45`、rotation `-2.1°`、center candidate `(1185,665)`與scale candidate `1.0`。
6. Import保留C09 selected context；Restore接受C09、拒絕C10；Editor／App gates與Viewer branch精確擴至C09。
7. Launcher URL／mode、A－09 template、C01～08 wrappers／launchers、workspace／countdown／export／styles、Proposal／Requirement、C09 assets、A/B/D與C10～17 boundaries的hash protection。

此self-check不得稱為正式Phase 5，不擴為完整C regression suite，不做browser pixel measurement或生成圖片。

### 18.19 Jamie Launcher Manual Verification Plan（本輪不執行）

Coding與最小Integrity Self-Check完成後，Jamie使用：

`bn/launch/C/09_SPX TVBN_2.command`

人工確認：

1. C－09底圖正確、overlay可切換、Canvas為`1599×1080`。
2. Headline、subheadline、protectionText完整沿用正式A/B－09行為，包含headline／protection 2× downsample及subheadline `$`／`%` special-run alignment。
3. Countdown顯示，font視覺符合literal `105pt "ShopeeNotoSans Bold"`，color為`#ff4c45`。
4. Canvas rotation精確`-2.1°`；此USER LOCKED值不得因人工對位重新研究。
5. Initial center `(1185,665)`及uniform scale `1.0`是否需要Jamie明確指示的單點微調。
6. `0天`～`9天`切換正常。

只有center／scale可在Jamie明確指示後單點微調。AI不得自行修改USER LOCKED font、color或rotation，也不得自行宣告Jamie Manual PASS。

### 18.20 C－10～17 Boundary

C－10～17完全不在本節範圍。不得預建C10 wrapper、launcher、routing、geometry、font size、center或scale，不新增C10～14 countdown spec，也不新增C15～17內容。C－09完成後仍須依Jamie授權逐版處理。

### 18.21 Conflict／Open／Acceptance State

`CONFLICT: None`

Bottom、overlay與正式Canvas全部為`1599×1080`，不存在尺寸conflict或額外background workaround。既有C state、validator、JSON／Export bridge與Editor styling已足夠C－09，不需要第8檔。

仍OPEN且必須由Jamie launcher裁決：

- Initial center `(1185,665)`的最終人工視覺接受度。
- Initial uniform scale `1.0`的最終人工視覺接受度。
- 所有合法countdown值的最終視覺接受度。

Font literal `105pt "ShopeeNotoSans Bold"`、color `#ff4c45`及Canvas rotation `-2.1°`不是OPEN candidate；它們是USER LOCKED。

本節完成只代表C－09 Phase 3 Proposal可等待Jamie授權進入Phase 4；不代表已Coding、已supported、已完成Phase 5、完整C Export ready或已Jamie人工PASS。

## 19. C－10｜`10_POP UP` Phase 3 Proposal

> **Historical phase record — current result is FINAL LOCKED／Manual Verification PASS.** 本節的candidate、planned、尚未Coding與待Jamie驗證文字只記錄當時Phase 3狀態；current authority為第24節與Code Commit `0c9da10`，geometry數值不因本註記改寫。

### 19.1 Scope／Phase Boundary

本節只定義C－10 Phase 4的最小實作設計與後續驗證邊界，不在本節執行Coding、不修改Requirement／Architecture，不重新調查Phase 2或分析參考圖。

- 版位：`10_POP UP`。
- 三欄完整沿用正式A/B－10行為。
- C－10額外疊加既有C countdown contract。
- C01～09不返工；C11～17仍不支援且不在本節範圍。
- 本節不代表C－10已Coding、已完成Phase 5或已Jamie人工PASS。

### 19.2 USER LOCKED Requirements

- Countdown font source：`ShopeeNotoSans(content)-Bold`。
- Canvas alias：`ShopeeNotoSans Bold`。
- Font literal：`53pt "ShopeeNotoSans Bold"`；禁止pt→px。
- Color：`#ff4c45`。
- Canvas rotation：`-2.1°`，視覺約`2.1° CCW`。
- Legal values：完整字串`0天`～`9天`。
- Excel source：`C!E16`。
- Preview／Editor可修改countdown；Import／Restore／JSON沿用既有C countdown contract。
- Bottom：`bn/assets/C/底圖/10_POP UP.png`。
- Overlay：`bn/assets/C/對位/10_POP UP.png`，只供人工校對，不進正式Preview／Export output。

Literal `53pt`、`#ff4c45`與rotation `-2.1°`是USER LOCKED，不是candidate、不得重新研究或自行調整。

### 19.3 A/B－10 Formal Renderer Evidence／Mandatory Reuse

正式template：`bn/templates/A/10-pop-up.js`。

- Renderer：`renderPopUp()`。
- Font waiter：`waitForPopUpFonts()`。
- 正式Canvas：`580×720`。
- Bottom必須是已decode／ready的`HTMLImageElement`，intrinsic dimensions精確為`475×673`。
- Renderer先執行`clearRect(0, 0, 580, 720)`。
- Bottom placement：`drawImage(backgroundImage, 53, 27, 475, 673)`；無crop或實質resize。

正式三欄規格：

| 欄位 | Geometry | Font | Color | 正式行為 |
|---|---|---|---|---|
| headline | `[129,128,323,38]` | `30pt "ShopeeNotoSans Medium"` | `#ffffff` | `left`／`alphabetic`；glyph visual ink水平及垂直置中；2× temporary Canvas `1160×1440`後high-quality smoothing downsample |
| subheadline | `[85,181,410,51]` | ordinary `40pt "ShopeeNotoSans Bold"`；`$`／`%`為`35pt "ShopeeNotoSans Bold"` | `#fff285` | ordinary／special runs分割；special glyph依相鄰ordinary boundary glyph ink bottom對齊；整組visual ink水平及垂直置中；直接繪正式Canvas |
| protectionText | `[85,242,410,25]` | `20pt "ShopeeNotoSans Medium"` | `#a6f4e6` | `left`／`alphabetic`；visual ink水平及垂直置中；使用同一2× temporary Canvas後high-quality downsample |

A－10另保留固定Canvas／background-placement validation、frame bounds與finite數值validation、font readiness/load validation、finite `measureText()`／`actualBoundingBox*` validation、visual ink-fit metadata、temporary Canvas dimensions／clear／compositing validation、headline／protection downsample、subheadline `$`／`%` mixed-run formatting與boundary glyph ink-bottom alignment。正式renderer回傳frozen三欄validation object。

Phase 4必須採：

```text
C－10 wrapper
  → formal A－10 renderPopUp()
  → C－10 countdown overlay
```

不得複製、簡化或重寫A－10三欄邏輯；`bn/templates/A/10-pop-up.js`保持零修改。現有C wrapper convention在呼叫A renderer後不回傳A validation result，而是回傳`undefined`；C－10沿用此既有pattern，不建立新return architecture，也不返工C01～09。

### 19.4 Asset／Dimension-Mismatch Contract

| 用途 | Format | Intrinsic dimensions | Alpha | SHA-256 |
|---|---|---|---|---|
| `bn/assets/C/底圖/10_POP UP.png` | PNG、8-bit RGBA、non-interlaced | `475×673` | 有 | `55b6f2eb4c6321c4dc7269af5b5a0fc2c8de97db758c696d5006156cc8189ba8` |
| `bn/assets/C/對位/10_POP UP.png` | PNG、8-bit RGBA、non-interlaced | `580×720` | 有 | `12535665392d20786714eca1af1cf2cb554c2fbda00966e9eeaaf3a6db0a5ec7` |

正式尺寸及placement contract：

- Canvas：`580×720`。
- Bottom：`475×673`，由A－10 renderer驗證並繪於Canvas `(53,27,475,673)`。
- Overlay：`580×720`，與Canvas完全一致，Viewer以完整Canvas `(0,0)` contract顯示。
- Bottom與Canvas／overlay尺寸不同是正式A－10 placement contract，不是conflict。
- 不需要第8檔、resize、crop、background `0,0`改寫、overlay workaround、asset轉檔／修改或Canvas dimensions變更。

### 19.5 Countdown Geometry Decision

```text
COUNTDOWN_FONT          = '53pt "ShopeeNotoSans Bold"'
COUNTDOWN_COLOR         = '#ff4c45'
COUNTDOWN_TARGET_CENTER = (290, 525)
COUNTDOWN_ROTATION      = -2.1deg
COUNTDOWN_VISUAL_SCALE  = 1.0
```

分類必須保持：

- Font source／alias、literal `53pt`、`#ff4c45`及Canvas rotation `-2.1°`是USER LOCKED；禁止pt→px，rotation不是candidate。
- Target center `(290,525)`是 **Phase 3 initial candidate, pending Jamie launcher visual verification**。
- Uniform visual scale `1.0`是 **Phase 3 initial candidate, pending Jamie launcher visual verification**。
- Center及scale尚未Jamie人工PASS；Phase 4不得自動pixel-tune或自行調整。只有Jamie後續明確指示後才可單點微調center／scale。

### 19.6 Countdown Rendering Algorithm

C－10沿用既有C01～09 visual ink-center模式：

1. 等待正式A－10 `waitForPopUpFonts()`完成。
2. Load並check `53pt "ShopeeNotoSans Bold"` countdown font。
3. 以`isValidCCountdown()`驗證`cCountdownText`；missing或非法值fail closed。
4. 設定`ctx.font = '53pt "ShopeeNotoSans Bold"'`、`textAlign = "left"`、`textBaseline = "alphabetic"`。
5. 使用`measureText()`與`actualBoundingBoxLeft/Right/Ascent/Descent`取得visual ink rect及center；metrics必須finite且ink bounds有效。
6. 使用下列C－10-local transform：

   ```text
   save
   → translate(290, 525)
   → rotate(-2.1 * Math.PI / 180)
   → scale(1.0, 1.0)
   → fillStyle = "#ff4c45"
   → fillText(text, -inkCenterX, -inkCenterY)
   → restore
   ```

Target是visual ink center，不是alphabetic baseline。禁止CSS transform、rotation sign反轉、pt→px、non-uniform scale、transform洩漏或shared geometry／rotation helper。

### 19.7 Wrapper Architecture Decision

Phase 4預定新增：

`bn/templates/C/10-pop-up.js`

Wrapper只負責：

- Import/reuse A－10正式dimensions／constants exports、`renderPopUp()`及`waitForPopUpFonts()`。
- Import/reuse `../../js/countdown.js`的`isValidCCountdown()`。
- 等待A－10正式fonts及C countdown Bold font。
- 驗證完整`0天`～`9天`字串。
- 先完整執行A－10 renderer並保留其Canvas／background placement及三欄正式行為，再驗證正式Canvas為`580×720`，最後疊C－10 countdown。
- 對外renderer／waiter naming保持與A－10語意及現有viewer convention相容。

不得修改A－10、複製三欄rendering code、改寫bottom placement或建立新shared architecture。

### 19.8 Routing Decision

`bn/js/render-a.js`目前`C_TABLE`與countdown projection／pre-validation gate支援C01～09，C10 explicit unsupported。Phase 4只做：

- Import C－10 wrapper。
- 新增`C_TABLE["10"]`，background精確為`10_POP UP.png`。
- 將`C_COUNTDOWN_BN_IDS`由01～09擴為01～10。
- 同步必要unsupported message。
- C11～17保持unsupported，未知C slot不得fallback至`A_TABLE`。

不得修改`A_TABLE`、B／D routing、重構registry或預建後續slots。

### 19.9 Import／Restore Decision

`bn/js/import.js`只將`C_SUPPORTED_BN_IDS`由01～09擴為01～10，並同步既有錯誤訊息。

- Import仍選Sheet C並讀取`B15/B16/B17/E16`；E16保存完整`0天`～`9天`字串，非法countdown維持atomic failure。
- Supported C10 selected context保留；unsupported context沿用既有fallback行為。
- Restore共用同一supported IDs；C10 selectedBnId合法，C11～17仍拒絕。
- JSON version維持`1`，C-only `cCountdownText`欄位及validation contract不變。

不得新增JSON欄位、修改workspace state或改動A/B/D Import／Restore。

### 19.10 Editor Decision

`bn/js/editor.js`只把既有C countdown field gate由C01～09擴為C01～10。C－10沿用現有headline、subheadline、protectionText與唯一`0天`～`9天`countdown select；不建立C10-specific UI、不改CSS、不改C01～09 behavior。

### 19.11 App Decision

`bn/js/app.js`只將`C_ENABLED_BN_IDS`由01～09擴為01～10。C11～17繼續disabled；不得重構App或改A/B/D behavior。

### 19.12 Viewer Decision

`bn/launch/viewer.html`只新增唯一C－10 branch：

- Query：`type=C&bn=10_POP UP`。
- Production wrapper：`../templates/C/10-pop-up.js`。
- Canvas：`580×720`。
- Bottom：`../assets/C/底圖/10_POP UP.png`，intrinsic `475×673`，正式placement由A－10 renderer處理為`(53,27,475,673)`。
- Overlay：`../assets/C/對位/10_POP UP.png`，intrinsic `580×720`，與Canvas完全一致。
- Renderer：`renderPopUp`。
- Font waiter：`waitForPopUpFonts`。
- 顯示既有三欄inputs、共用`0天`～`9天`countdown select及overlay toggle。
- 同步必要unsupported summary。

不得修改Viewer共用overlay contract、把bottom當成`580×720`、為尺寸差異建立resize workaround、建立第二份viewer、改寫C01～09 branches或預建C11 branch。

### 19.13 Launcher Decision

Phase 4預定新增：

`bn/launch/C/10_POP UP.command`

Launcher完全沿用C01～09 convention，開啟既有viewer的精確URL：

```text
http://127.0.0.1:4173/bn/launch/viewer.html?type=C&bn=10_POP%20UP
```

空白必須依既有launcher convention正確URL encode。維持既有Python HTTP server、port readiness、cleanup、browser open、error handling、repo root resolution與executable mode `755` convention；不建立新server或新viewer。

### 19.14 Phase 4 Exact File Scope

Phase 4預計精確7檔。

新增2檔：

1. `bn/templates/C/10-pop-up.js`
2. `bn/launch/C/10_POP UP.command`

修改5檔：

3. `bn/js/render-a.js`
4. `bn/js/import.js`
5. `bn/js/editor.js`
6. `bn/js/app.js`
7. `bn/launch/viewer.html`

若實作發現需要第8檔，必須停止並回報scope conflict，不得自行擴大。

### 19.15 Explicit Zero-Modification Boundary

Phase 4不需要修改：

- `bn/js/workspace.js`
- `bn/js/countdown.js`
- `bn/js/export.js`
- `bn/css/styles.css`
- `bn/templates/A/10-pop-up.js`
- C01～09 wrappers及launchers
- Shared Proposal（本節Phase 3完成後Phase 4不再修改）
- Requirement／Architecture
- C assets、fonts、vendor
- A/B/D implementation
- C11～17

既有C state、exact validator、JSON／Export bridge、Editor styling及A－10正式background-placement contract已足夠C－10。不得為了完整性或DRY硬加檔案、shared helper、shared rotation constant或尺寸workaround。

### 19.16 Export Boundary

- 10既有輸出格式為PNG，`maxBytes: 250000`。
- C－10 route接通後沿用既有`renderBnToCanvas()`橋接。
- JSON v1既有C countdown保存邏輯不變。
- `bn/js/export.js`不需修改，PNG輸出參數不變。
- C11～17尚未完成；本節不得宣稱完整C 17版位Export或full C workspace readiness已完成。

### 19.17 Phase 4 Coding Plan（本輪不執行）

Phase 4只能：

1. 在精確7檔scope內新增C－10 wrapper／launcher，並修改`render-a.js`、`import.js`、`editor.js`、`app.js`、`viewer.html`。
2. Wrapper完整reuse A－10 renderer／waiter，不複製三欄邏輯或改寫background placement。
3. 保持Canvas `580×720`、bottom `475×673`、placement `(53,27,475,673)`與overlay `580×720`。
4. 精確實作literal `53pt "ShopeeNotoSans Bold"`、`#ff4c45`、rotation `-2.1°`、center candidate `(290,525)`及scale candidate `1.0`。
5. 開放C10 route／Import／Restore／Editor／App／Viewer／launcher，C11仍explicit unsupported。
6. 保護所有zero-modification檔案與C01～09既有實作。

### 19.18 Phase 4 Coding Integrity Self-Check Plan（本輪不執行）

Coding完成後只做C－10最小Integrity Self-Check：

1. Exact 7-file implementation scope、`git diff --check`、C－10 wrapper及shared JS syntax，launcher `zsh -n`與viewer parse。
2. C－10 route成功、C11 route拒絕。
3. Canvas `580×720`、bottom intrinsic `475×673`、background placement `53,27,475,673`及overlay `580×720`。
4. `0天`、`9天`接受；`10天`拒絕。
5. Wrapper精確保存literal `53pt "ShopeeNotoSans Bold"`、`#ff4c45`、rotation `-2.1°`、center candidate `(290,525)`與scale candidate `1.0`。
6. Import保留C10 selected context；Restore接受C10、拒絕C11；Editor／App gates與Viewer branch精確擴至C10。
7. Launcher URL／mode、A－10 template、C01～09 wrappers／launchers、workspace／countdown／export／styles、Proposal／Requirement、C10 assets、A/B/D與C11～17 boundaries的hash protection。

此self-check不得稱為正式Phase 5，不擴為完整C regression suite，不做browser pixel measurement或生成圖片。

### 19.19 Jamie Launcher Manual Verification Plan（本輪不執行）

Coding與最小Integrity Self-Check完成後，Jamie使用：

`bn/launch/C/10_POP UP.command`

人工確認：

1. C－10底圖正確、Canvas為`580×720`，bottom placement精確沿用`(53,27,475,673)`。
2. Overlay可切換且`580×720`與Canvas完整對齊。
3. Headline、subheadline、protectionText完整沿用正式A/B－10行為，包含headline／protection 2× downsample及subheadline `$`／`%` special-run alignment。
4. Countdown顯示，font視覺符合literal `53pt "ShopeeNotoSans Bold"`，color為`#ff4c45`。
5. Canvas rotation精確`-2.1°`；此USER LOCKED值不得因人工對位重新研究。
6. Initial center `(290,525)`及uniform scale `1.0`是否需要Jamie明確指示的單點微調。
7. `0天`～`9天`切換正常。

只有center／scale可在Jamie明確指示後單點微調。AI不得自行修改USER LOCKED font、color、rotation、Canvas dimensions或bottom placement，也不得自行宣告Jamie Manual PASS。

### 19.20 C－11～17 Boundary

C－11～17完全不在本節範圍。不得預建C11 wrapper、launcher、routing、geometry、font size、center或scale，不新增C11～14 countdown spec，也不新增C15～17內容。C－10完成後仍須依Jamie授權逐版處理。

### 19.21 Conflict／Open／Acceptance State

`CONFLICT: None`

Bottom `475×673`、overlay／Canvas `580×720`的尺寸差異是正式A－10 placement contract，不是conflict或額外workaround需求。既有C state、validator、JSON／Export bridge與Editor styling已足夠C－10，不需要第8檔。

仍OPEN且必須由Jamie launcher裁決：

- Initial center `(290,525)`的最終人工視覺接受度。
- Initial uniform scale `1.0`的最終人工視覺接受度。
- 所有合法countdown值的最終視覺接受度。

Font literal `53pt "ShopeeNotoSans Bold"`、color `#ff4c45`及Canvas rotation `-2.1°`不是OPEN candidate；它們是USER LOCKED。Canvas `580×720`、bottom `475×673`與placement `(53,27,475,673)`也不是geometry-tuning candidate。

本節完成只代表C－10 Phase 3 Proposal可等待Jamie授權進入Phase 4；不代表已Coding、已supported、已完成Phase 5、完整C Export ready或已Jamie人工PASS。

## 20. C－11｜`11_Line OA` Phase 3 Proposal

> **Historical phase record — current result is FINAL LOCKED／Manual Verification PASS.** 本節的candidate、planned、尚未Coding與待Jamie驗證文字只記錄當時Phase 3狀態；current authority為第24節與Code Commit `0c9da10`，geometry數值不因本註記改寫。

### 20.1 Scope／Governance

本節只記錄C－11 Phase 2已確認的repository evidence、USER LOCKED需求與後續Phase 4最小實作邊界；不執行Coding，也不改寫C01～10既有Proposal內容。

C－11延續唯一共享C Proposal治理，不建立C11獨立Proposal、Requirement或Architecture文件。本節不處理C12～17，也不宣稱完整C 17版位或full C workspace readiness已完成。

### 20.2 USER LOCKED Requirement

版位：`11_Line OA`。

Headline、subheadline、protectionText的位置、字型樣式、字型大小與顏色全部完整沿用正式A/B－11行為。

C－11額外倒數天數contract：

- Excel source固定為`C!E16`。
- 工單、state、Restore及JSON保存完整字串；合法值只有`0天`～`9天`。
- Preview顯示倒數天數，Editor使用既有countdown select修改。
- Font source：`ShopeeNotoSans(content)-Bold`。
- Canvas alias：`ShopeeNotoSans Bold`。
- Font literal：`87pt "ShopeeNotoSans Bold"`，不得pt→px。
- Color：`#ff4c45`。
- Canvas rotation：精確`-2.1°`，視覺約`2.1° CCW`。

Font literal `87pt`、color `#ff4c45`及rotation `-2.1°`均為USER LOCKED，不是candidate或OPEN，不得重新研究、推導或修改。

### 20.3 Formal A/B－11 Reuse Architecture

正式A/B－11 template：

`bn/templates/A/11-line-oa.js`

正式API：

- Renderer：`renderLineOa()`。
- Font waiter：`waitForLineOaFonts()`。
- Dimensions：`LINE_OA_WIDTH=1040`、`LINE_OA_HEIGHT=1040`。

C－11採用唯一最小architecture：

`C11 wrapper → formal A11 renderLineOa() → countdown overlay`

Wrapper必須先完整執行A－11正式renderer，再疊加C－11 countdown；不得複製或重寫A－11三欄rendering logic，不得修改A－11 template。依既有C wrapper convention，C11 wrapper不新增A renderer validation result的return architecture。

### 20.4 Formal A/B－11 Canvas／Bottom Contract

A－11正式contract：

- Canvas：`1040×1040`。
- Bottom intrinsic dimensions：`1016×1007`。
- Background placement：left `12`、top `12`、width `1016`、height `1007`。
- 正式draw：`drawImage(backgroundImage,12,12,1016,1007)`。
- Renderer先執行：`clearRect(0,0,1040,1040)`。
- Bottom以intrinsic尺寸置於Canvas `(12,12)`；無crop、無實質resize。

C－11不得把bottom強制改成`1040×1040`、不得把placement改成`0,0`，也不得建立resize／crop／尺寸workaround。

### 20.5 Formal A/B－11 Text Rendering Contract

Headline：

- Box：`[230,154,580,68]`。
- Font：`55pt "ShopeeNotoSans Medium"`。
- Color：`#ffffff`。
- `textAlign="left"`、`textBaseline="alphabetic"`。
- 依`actualBoundingBox*` visual ink水平／垂直置中。
- 使用`2080×2080` 2× temporary Canvas，high-quality smoothing downsample至正式Canvas。

Subheadline：

- Box：`[180,240,680,86]`。
- Ordinary font：`68pt "ShopeeNotoSans Bold"`。
- `$`／`%` special font：`60pt "ShopeeNotoSans Bold"`。
- Color：`#fff285`。
- 直接繪正式Canvas。
- Mixed runs整組依visual ink置中；special run使用相鄰ordinary boundary glyph ink-bottom alignment。

Protection：

- Box：`[180,345,680,37]`。
- Font：`30pt "ShopeeNotoSans Regular"`。
- Color：`#a6f4e6`。
- `textAlign="left"`、`textBaseline="alphabetic"`。
- 直接繪正式Canvas，依visual ink水平／垂直置中。

A－11另有Canvas/background bounds validation、font readiness/load validation、finite metrics validation、ink-fit validation、headline 2× downsample、`$`／`%` mixed runs、boundary glyph alignment及frozen三欄validation result。以上全部由正式A－11 renderer保存，C11 wrapper不得複製或改寫。

### 20.6 C－11 Assets／Dimension Contract

Bottom：

- Path：`bn/assets/C/底圖/11_Line OA.png`。
- Format：PNG RGBA。
- Intrinsic dimensions：`1016×1007`。
- SHA-256：`8e25cc348dd7b0528e1b50b3f3cd3f0cc0dfeda6028cea2dc11440f3f7009d57`。

Overlay：

- Path：`bn/assets/C/對位/11_Line OA.png`。
- Format：PNG RGBA。
- Intrinsic dimensions：`1040×1040`。
- SHA-256：`7182b297c9a0f581d13259133ada3a65eeade93c6194c8b1e68f730c84f545e3`。

尺寸關係是正式A－11既有placement contract，不是conflict：

- Canvas／overlay均為`1040×1040`。
- Bottom由A－11 renderer驗證`1016×1007`並繪於`(12,12,1016,1007)`。
- Viewer overlay沿用完整Canvas `(0,0)` contract並驗證overlay intrinsic等於Canvas。
- 不需要第8檔，也不需要resize、crop、asset轉檔或overlay workaround。

### 20.7 Countdown Geometry Decision

USER LOCKED：

- Font：`87pt "ShopeeNotoSans Bold"`。
- Color：`#ff4c45`。
- Rotation：`-2.1°`。

Phase 3 initial candidate, pending Jamie launcher visual verification：

- Target center：`(551,775.5)`。
- Uniform visual scale：`1.0`。

已確認的最小geometry evidence：完稿reference與正式Canvas同為`1040×1040`；countdown主要紅色glyph bounds約為`x=461…641, y=725…826`，合併ink size約`181×102`，visual ink center為`(551,775.5)`。Scale `1.0`只作為首次實作candidate。

Center與scale尚未Jamie人工PASS；最終值必須等待Jamie使用C11 launcher驗證。AI不得自行調整candidate，亦不得修改USER LOCKED font、color或rotation。

### 20.8 Countdown Rendering Algorithm

C11 wrapper沿用既有C01～10 visual ink-center模式：

1. Reuse並等待A－11正式font waiter。
2. 確認`ShopeeNotoSans Bold` countdown font ready。
3. 使用`isValidCCountdown()`驗證`cCountdownText`。
4. 設定`ctx.font = '87pt "ShopeeNotoSans Bold"'`。
5. 設定`textAlign="left"`、`textBaseline="alphabetic"`。
6. 執行`measureText(text)`並驗證`actualBoundingBoxLeft/Right/Ascent/Descent`為finite。
7. 求visual ink rect及`inkCenterX/inkCenterY`。
8. `save()`後依序執行`translate(551,775.5)`、`rotate(-2.1 * Math.PI / 180)`、`scale(1.0,1.0)`。
9. 設定`fillStyle="#ff4c45"`，以`fillText(text,-inkCenterX,-inkCenterY)`或既有wrapper完全等價方式置中。
10. `restore()`。

不得pt→px、改rotation sign、修改locked font／color、建立shared geometry helper或shared rotation helper。

### 20.9 C－11 Wrapper Decision

Phase 4預定新增：

`bn/templates/C/11-line-oa.js`

Wrapper只負責：

- Import/reuse A－11正式dimensions／constants exports、`renderLineOa()`及`waitForLineOaFonts()`。
- Import/reuse`../../js/countdown.js`的`isValidCCountdown()`。
- 等待A－11正式fonts及C countdown Bold font。
- 驗證完整`0天`～`9天`字串。
- 先完整執行A－11 renderer並保存其Canvas、bottom placement及三欄正式行為，再確認Canvas為`1040×1040`，最後疊C－11 countdown。
- 對外renderer／waiter naming保持與A－11語意及既有viewer convention相容。

不得修改A－11、複製三欄rendering code或建立新shared architecture。

### 20.10 Routing Decision

`bn/js/render-a.js`目前`C_TABLE`與`C_COUNTDOWN_BN_IDS`支援C01～10，C11 explicit unsupported。Phase 4只做：

- Import C－11 wrapper。
- 新增`C_TABLE["11"]`，background精確為`11_Line OA.png`。
- 將`C_COUNTDOWN_BN_IDS`由01～10擴為01～11。
- 同步必要unsupported message。
- C12～17保持unsupported。

不得讓C fallback至`A_TABLE`、修改`A_TABLE`、B／D routing、重構registry或預建C12～17。

### 20.11 Import／Restore Decision

`bn/js/import.js`只將`C_SUPPORTED_BN_IDS`由01～10擴為01～11，並同步必要錯誤訊息。

- Import仍選Sheet C並讀取`B15/B16/B17/E16`；E16保存完整`0天`～`9天`字串，非法countdown維持atomic failure。
- Supported C11 selected context保留；unsupported context沿用既有行為。
- Restore共用同一supported IDs；C11 selectedBnId合法，C12～17仍拒絕。
- JSON version維持`1`，`cCountdownText`欄位及validation contract不變。

不得新增JSON欄位、修改workspace state或改動A/B/D Import／Restore。

### 20.12 Editor／App Decision

`bn/js/editor.js`只把既有C countdown field gate由C01～10擴為C01～11。C－11沿用headline、subheadline、protectionText及既有`0天`～`9天`countdown select；不建立C11-specific UI、不修改CSS或C01～10 behavior。

`bn/js/app.js`只將`C_ENABLED_BN_IDS`由01～10擴為01～11。C12～17繼續disabled；不得重構App或改A/B/D behavior。

### 20.13 Viewer Decision

`bn/launch/viewer.html`只新增唯一C－11 branch：

- Query：`type=C&bn=11_Line OA`。
- Production wrapper：`../templates/C/11-line-oa.js`。
- Canvas：`1040×1040`。
- Bottom：`../assets/C/底圖/11_Line OA.png`，intrinsic `1016×1007`，正式placement由A－11 renderer處理為`(12,12,1016,1007)`。
- Overlay：`../assets/C/對位/11_Line OA.png`，intrinsic `1040×1040`，與Canvas完全一致。
- Renderer：`renderLineOa`。
- Font waiter：`waitForLineOaFonts`。
- 顯示既有三欄inputs、共用`0天`～`9天`countdown select及overlay toggle。
- 同步必要unsupported summary。

不得修改Viewer共用overlay contract、把bottom當成`1040×1040`、建立尺寸resize workaround、建立第二份viewer、改寫C01～10 branches或預建C12 branch。

### 20.14 Launcher Decision

Phase 4預定新增：

`bn/launch/C/11_Line OA.command`

Launcher沿用C01～10 convention，開啟既有viewer的精確URL：

```text
http://127.0.0.1:4173/bn/launch/viewer.html?type=C&bn=11_Line%20OA
```

空白依既有convention正確URL encode。維持既有server、port readiness、cleanup、browser open、error handling、repo root resolution及executable mode `755`；不建立新server或viewer。

### 20.15 Phase 4 Exact File Scope

Phase 4預計精確7檔。

新增2檔：

1. `bn/templates/C/11-line-oa.js`
2. `bn/launch/C/11_Line OA.command`

修改5檔：

3. `bn/js/render-a.js`
4. `bn/js/import.js`
5. `bn/js/editor.js`
6. `bn/js/app.js`
7. `bn/launch/viewer.html`

若實作發現需要第8檔，必須停止並回報scope conflict，不得自行擴大。

### 20.16 Explicit Zero-Modification Boundary

Phase 4不需要修改：

- `bn/js/workspace.js`
- `bn/js/countdown.js`
- `bn/js/export.js`
- `bn/css/styles.css`
- `bn/templates/A/11-line-oa.js`
- C01～10 wrappers及launchers
- Shared Proposal（本節Phase 3完成後Phase 4不再修改）
- Requirement／Architecture
- C assets、fonts、vendor
- A/B/D implementation
- C12～17

既有C state、validator、JSON／Export bridge、Editor styling及A－11正式background-placement contract已足夠C－11。不得為了DRY或完整性新增shared helper、shared rotation constant或尺寸workaround。

### 20.17 Export Boundary

- 11既有輸出格式為PNG。
- C－11 route接通後沿用既有`renderBnToCanvas()`。
- JSON v1既有C countdown保存邏輯不變。
- `bn/js/export.js`不需修改，PNG輸出參數不變。
- C12～17尚未完成；不得宣稱完整C 17版位Export或full C workspace readiness已完成。

### 20.18 Phase 4 Coding Plan（本輪不執行）

Phase 4只能：

1. 在精確7檔scope內新增C－11 wrapper／launcher，並修改`render-a.js`、`import.js`、`editor.js`、`app.js`、`viewer.html`。
2. Wrapper完整reuse A－11 renderer／waiter，不複製三欄邏輯或改寫background placement。
3. 保持Canvas `1040×1040`、bottom `1016×1007`、placement `(12,12,1016,1007)`及overlay `1040×1040`。
4. 精確實作literal `87pt "ShopeeNotoSans Bold"`、`#ff4c45`、rotation `-2.1°`、center candidate `(551,775.5)`及scale candidate `1.0`。
5. 開放C11 route／Import／Restore／Editor／App／Viewer／launcher，C12仍explicit unsupported。
6. 保護所有zero-modification檔案與C01～10既有實作。

### 20.19 Phase 4 Coding Integrity Self-Check Plan（本輪不執行）

Coding完成後只做C－11最小Integrity Self-Check：

1. Exact 7-file implementation scope、`git diff --check`、C－11 wrapper及shared JS syntax、launcher `zsh -n`與viewer parse。
2. C－11 route成功，C12 route拒絕。
3. Canvas `1040×1040`、bottom intrinsic `1016×1007`、background placement `12,12,1016,1007`及overlay `1040×1040`。
4. `0天`、`9天`接受；`10天`拒絕。
5. Wrapper精確保存literal `87pt "ShopeeNotoSans Bold"`、`#ff4c45`、rotation `-2.1°`、center candidate `(551,775.5)`與scale candidate `1.0`。
6. Import保留C11 selected context；Restore接受C11、拒絕C12；Editor／App gates與Viewer branch精確擴至C11。
7. Launcher URL／mode、A－11 template、C01～10 wrappers／launchers、workspace／countdown／export／styles、Proposal／Requirement、C11 assets、A/B/D與C12～17 boundaries的hash protection。

此self-check不得稱為正式Phase 5，不擴為完整C regression suite，不做browser pixel measurement或生成圖片。

### 20.20 Jamie Launcher Manual Verification Plan（本輪不執行）

Coding與最小Integrity Self-Check完成後，Jamie使用：

`bn/launch/C/11_Line OA.command`

人工確認：

1. C－11底圖正確、Canvas為`1040×1040`，bottom placement沿用`(12,12,1016,1007)`。
2. Overlay可切換且`1040×1040`與Canvas完整對齊。
3. Headline、subheadline、protectionText完整沿用正式A/B－11，包含headline 2× downsample及subheadline `$`／`%` special-run alignment。
4. Countdown顯示，font視覺符合literal `87pt "ShopeeNotoSans Bold"`，color為`#ff4c45`，rotation精確`-2.1°`。
5. Initial center `(551,775.5)`及uniform scale `1.0`是否需要Jamie明確指示的單點微調。
6. `0天`～`9天`切換正常。

只有center／scale可在Jamie明確指示後單點微調。AI不得自行修改USER LOCKED font、color、rotation、Canvas dimensions或bottom placement，也不得自行宣告Jamie Manual PASS。

### 20.21 Conflict／Boundary／Acceptance State

`CONFLICT: None`

Bottom `1016×1007`、overlay／Canvas `1040×1040`的尺寸差異是正式A－11 placement contract，不是conflict或額外workaround需求。既有C state、validator、JSON／Export bridge與Editor styling已足夠C－11，不需要第8檔。

C12～17完全不在本節範圍；不得預建C12 wrapper、launcher、routing、geometry、font size、center或scale，也不得新增C12～14 countdown spec或C15～17內容。

仍OPEN且必須由Jamie launcher裁決：

- Initial center `(551,775.5)`的最終人工視覺接受度。
- Initial uniform scale `1.0`的最終人工視覺接受度。
- 所有合法countdown值的最終視覺接受度。

Font literal `87pt "ShopeeNotoSans Bold"`、color `#ff4c45`及Canvas rotation `-2.1°`不是OPEN candidate；它們是USER LOCKED。Canvas `1040×1040`、bottom `1016×1007`與placement `(12,12,1016,1007)`也不是geometry-tuning candidate。

本節完成只代表C－11 Phase 3 Proposal可等待Jamie授權進入Phase 4；不代表已Coding、已supported、已完成Phase 5、完整C Export ready或已Jamie人工PASS。

## 21. C－12｜`12_LPBN` Phase 3 Proposal

> **Historical phase record — current result is FINAL LOCKED／Manual Verification PASS.** 本節的candidate、planned、尚未Coding與待Jamie驗證文字只記錄當時Phase 3狀態；current authority為第24節與Code Commit `0c9da10`，geometry數值不因本註記改寫。

### 21.1 Scope and USER LOCKED Requirements

本節只定義C－12｜`12_LPBN`的Phase 4最小實作計畫，不在本節Coding，不修改Requirement／Architecture，不處理C13～17，不重寫或返工C01～11。

C－12主標、副標、保護文字的位置、字型樣式、字型大小與顏色必須完整沿用正式A/B－12行為。額外countdown的USER LOCKED contract為：

- font source：`ShopeeNotoSans(content)-Bold`
- Canvas alias：`ShopeeNotoSans Bold`
- font literal：`74pt "ShopeeNotoSans Bold"`
- color：`#ff4c45`
- Canvas rotation：`-2.1°`
- legal values：完整字串`0天`～`9天`
- Excel source：`C!E16`
- Preview／Editor可修改，Import／Restore／JSON沿用既有C countdown contract

Literal `74pt`、`#ff4c45`與rotation `-2.1°`均是USER LOCKED，不是candidate；不得做pt→px換算、改變rotation sign或重新研究這三項。

### 21.2 Formal A/B－12 Renderer Reuse

正式template為`bn/templates/A/12-lpbn.js`，renderer為`renderLpbn()`，font waiter為`waitForLpbnFonts()`。C－12必須採以下單向reuse：

```text
C12 wrapper → formal A12 renderLpbn() → countdown overlay
```

C12 wrapper不得複製、改寫或旁路實作A12三欄rendering與validation，也不得修改A12 template。

正式Canvas與bottom intrinsic dimensions均為`1200×550`。Background placement為：

```js
drawImage(backgroundImage, 0, 0, 1200, 550)
```

無offset、crop、resize或dimension workaround。

### 21.3 Formal A/B－12 Text Contracts

Headline：

- box：`[58,226,405,49]`
- font：`39pt "ShopeeNotoSans Medium"`
- color：`#ffffff`
- `textAlign="left"`、`textBaseline="alphabetic"`
- actual ink左緣對齊box.left，actual ink垂直置中
- 在`2400×1100` 2× temporary Canvas繪製，high-quality downsample至`1200×550`

Subheadline：

- box：`[58,285,475,62]`
- ordinary font：`49pt "ShopeeNotoSans Bold"`
- `$`／`%` special font：`42pt "ShopeeNotoSans Bold"`
- color：`#fff285`
- mixed runs直接繪於正式Canvas
- 整體actual ink左對齊並垂直置中
- special run依相鄰ordinary glyph ink-bottom alignment

Protection：

- box：`[58,360,475,28]`
- font：`22.5pt "ShopeeNotoSans Medium"`
- color：`#a6f4e6`
- `textAlign="left"`、`textBaseline="alphabetic"`
- actual ink左對齊並垂直置中
- 與headline一同經2× temporary Canvas後downsample

A12正式validation包含Canvas validation、background intrinsic dimensions、三文字框bounds、font readiness、finite glyph metrics，並回傳frozen headline／subheadline／protection validation result、ink bounds、`fitsWidth`與`fitsHeight`。LPBN掛標不參與A12 renderer return contract。

### 21.4 LPBN Badge Formal Contract

正式掛標module為`bn/js/lpbn-badges.js`，workspace state為`lpbnBadgeMonth`，default為空字串。正式月份來源為當前Type worksheet的`E15`，Import時讀取並`trim()`。

正式月份為`9`、`10`、`11`、`12`，每月最多三個固定slot。Assets base為`bn/assets/LPBN掛標/`，實際檔名由`lpbn-badges.js` registry明列，不做runtime檔名解析；例如12月為`12/1212.png`、`12/1218.png`、`12/1225.png`。

正式Preview在`bnId === "12"`時保留base canvas，再以`resolveLpbnBadges(state.lpbnBadgeMonth)`解析，依結果建立最多三張獨立variant canvas，不修改base canvas。

正式Export先以`renderBnToCanvas()`取得base `12_LPBN.jpg`，再把掛標疊至base副本，輸出`12_LPBN_1.jpg`～`12_LPBN_3.jpg`。缺月份群組或slot時沿用既有warning contract。

JSON serializer已無條件保存`lpbnBadgeMonth`。A12 renderer本身不繪製掛標，C12 wrapper也不得新增掛標renderer、把掛標搬入wrapper、修改`lpbn-badges.js`、修改掛標assets或建立C-specific badge architecture。

### 21.5 C12 Import and Restore Badge Delta

`E15`是LPBN掛標月份；`E16`是C countdown，兩者必須明確分開。C12 Excel contract為：

- `C!B15`：headline
- `C!B16`：subheadline
- `C!B17`：protectionText
- `C!E15`：LPBN掛標月份，讀取後`trim()`
- `C!E16`：完整countdown字串`0天`～`9天`，illegal value維持atomic failure

目前Type C Import會把`lpbnBadgeMonth`強制設為`""`，Restore也會清空Type C JSON內該值。Phase 4必須只在原定就會修改的`bn/js/import.js`解除這兩個Type C排除，使C12 Import保存`C!E15`、Restore保留string `lpbnBadgeMonth`，同時保留合法`cCountdownText`。

JSON version仍為`1`，schema不變、不新增欄位、serializer不變，`export.js`不修改。C01～11不是LPBN；既有掛標Preview／Export只在`bnId === "12"`時使用此state，因此不得改變C01～11視覺行為。

### 21.6 C－12 Assets and Dimension Contract

Bottom：`bn/assets/C/底圖/12_LPBN.jpg`

- baseline JPEG、RGB、no alpha
- intrinsic `1200×550`
- SHA-256：`1b74857a05b6b037cab0f4972f4a1b05b51bd83f6427de9414ac0e5d9a01a7a7`

Overlay：`bn/assets/C/對位/12_LPBN.png`

- PNG RGBA、alpha
- intrinsic `1200×550`
- SHA-256：`a12cd86238a99039b59be21a2134c4844e849e5d8528e5d3e210b9d329fe3837`

Formal Canvas、bottom與overlay的dimensions完全一致，均為`1200×550`。無dimension mismatch、coordinate mapping、resize、crop或offset workaround；overlay直接使用完整formal Canvas contract。Phase 4不得修改、resize、crop或轉檔assets。

### 21.7 Countdown Geometry and Rendering Proposal

USER LOCKED：

- font：`74pt "ShopeeNotoSans Bold"`
- color：`#ff4c45`
- rotation：`-2.1°`

Phase 3 initial geometry：

- target center：`(876,365.5)` — **Phase 3 initial candidate, pending Jamie launcher visual verification**
- uniform visual scale：`1.0` — **Phase 3 initial candidate, pending Jamie launcher visual verification**

已確認完稿reference與formal Canvas同為`1200×550`，無座標mapping。`0`主要ink component約為`x=800～856, y=323～408`；`天`約為`x=863～952, y=323～408`；合併bounds約為`x=800～952, y=323～408`，visual center為`(876,365.5)`。JPEG anti-aliasing／threshold可能造成少量bounds誤差；scale `1.0`是首次launcher實作candidate。最終center／scale只能由Jamie launcher人工裁決。

Countdown renderer沿用C01～11 pattern：

1. Reuse A12正式font waiter，再確誊countdown Bold font ready。
2. 以`isValidCCountdown()`驗證完整字串。
3. 設定`ctx.font = '74pt "ShopeeNotoSans Bold"'`、`textAlign="left"`與`textBaseline="alphabetic"`。
4. 以`measureText(text)`的`actualBoundingBoxLeft`、`actualBoundingBoxRight`、`actualBoundingBoxAscent`、`actualBoundingBoxDescent`求visual ink rect與center。
5. `save()`後依序`translate(876,365.5)`、`rotate(-2.1 * Math.PI / 180)`、`scale(1.0,1.0)`，設定`fillStyle="#ff4c45"`。
6. 以`fillText(text,-inkCenterX,-inkCenterY)`或與既有C wrapper完全等價的方式將visual ink center對準target center，最後`restore()`。

不得把`74pt`換算為px、改變rotation sign、自動調整center／scale，或建立shared geometry／rotation helper。

### 21.8 Countdown and LPBN Badge Layering Contract

Base C12 render順序為：

1. A12 background
2. A12 headline／protection temporary-canvas composite
3. A12 subheadline
4. C12 wrapper countdown

Preview／Export badge variant在base C12完成後再疊：

5. LPBN badge overlay

Countdown reference bounds約為`x=800～952, y=323～408`；掛標最大透明ink bounds約為`x=0～246, y=0～57`，兩者不相交。

`No layering conflict found.`

不得因variant badge在countdown之後疊加就創造理論blocker，也不得改寫layer architecture。

### 21.9 C12 Wrapper Decision

Phase 4預計新增`bn/templates/C/12-lpbn.js`，作為最小wrapper：

- import/reuse A12正式dimensions/constants、`renderLpbn()`與`waitForLpbnFonts()`
- import `isValidCCountdown()` from `../../js/countdown.js`
- 先完整執行A12正式renderer，再疊C12 countdown
- 不複製A12三欄rendering，不修改A12
- 不處理LPBN badge，掛標繼續由正式Preview／Export variant flow負責
- 不建立新shared architecture

對外renderer／waiter naming依既有C wrapper與viewer convention與A12語意相容。

### 21.10 Routing Decision

Phase 4只在`bn/js/render-a.js`：

- import C12 wrapper
- 新增`C_TABLE["12"]`，background為`12_LPBN.jpg`
- `C_COUNTDOWN_BN_IDS`由01～11擴為01～12
- 同步必要unsupported message
- C13～17保持unsupported

不得讓C fallback至`A_TABLE`、修改`A_TABLE`／B／D、重構registry或預建C13～17。

### 21.11 Import, Restore, Editor, and App Decisions

`bn/js/import.js`：

- `C_SUPPORTED_BN_IDS`由01～11擴為01～12
- 沿用Sheet C、`B15/B16/B17`與countdown `E16`的既有contract
- 解除Type C Import把`lpbnBadgeMonth`強制清空的排除，使`C!E15`經`trim()`後保存
- 解除Type C Restore清空JSON `lpbnBadgeMonth`的排除
- C12 selected ID合法，C13～17繼續拒絕
- JSON version仍為1、schema／serializer不變

`bn/js/editor.js`只把C countdown field gate由C01～11擴為C01～12。C12使用既有headline、subheadline、protectionText與countdown select。正式平台目前沒有LPBN badge Editor control，Phase 4不新增全域正式掛標Editor UI；月份由Import／Restore進入state。

`bn/js/app.js`只把`C_ENABLED_BN_IDS`由01～11擴為01～12。既有`bnId === "12"` Preview badge stack已Type-independent，C12開通後天然沿用`resolveLpbnBadges(state.lpbnBadgeMonth)`；不建立C-specific badge Preview flow或複製composition。C13～17繼續disabled。

### 21.12 Viewer Decision

Phase 4在`bn/launch/viewer.html`新增唯一C12 branch：

- type=`C`、bn=`12_LPBN`
- production wrapper=`../templates/C/12-lpbn.js`
- Canvas=`1200×550`
- bottom=`../assets/C/底圖/12_LPBN.jpg`，intrinsic `1200×550`
- overlay=`../assets/C/對位/12_LPBN.png`，intrinsic `1200×550`
- renderer=`renderLpbn`，waiter=`waitForLpbnFonts`
- 沿用三欄inputs、countdown select `0天`～`9天`與overlay toggle
- 同步必要unsupported summary

現有viewer沒有LPBN badge month control/state。為了讓Jamie在C12 launcher驗證countdown沒有破壞掛標，Phase 4可在原定就會修改的`viewer.html` C12 branch內加入最小viewer-local驗證control，僅支援空值、`9`、`10`、`11`、`12`，reuse `bn/js/lpbn-badges.js`既有resolver/loading/composition API，以base C12 canvas建立最多三張variant，不修改base canvas contract。

此control只服務C12 launcher人工驗證，不得新增第8檔、修改正式App Editor、workspace、styles、`lpbn-badges.js`或export，也不得影響C01～11 viewer branches或建立第二套正式掛標architecture。若viewer既有架構不適合在最小scope內接入，Phase 4保留C12 bottom／overlay／countdown branch並如實回報，不因此BLOCK Coding或擴大scope。

### 21.13 Launcher Decision

Phase 4預計新增`bn/launch/C/12_LPBN.command`，完全沿用C01～11 launcher convention，指向：

```text
http://127.0.0.1:4173/bn/launch/viewer.html?type=C&bn=12_LPBN
```

沿用既有viewer／server，不建新server或viewer，executable mode預期為`755`。

### 21.14 Phase 4 Exact File Scope

Phase 4預計精確7檔。

新增2檔：

1. `bn/templates/C/12-lpbn.js`
2. `bn/launch/C/12_LPBN.command`

修改5檔：

3. `bn/js/render-a.js`
4. `bn/js/import.js`
5. `bn/js/editor.js`
6. `bn/js/app.js`
7. `bn/launch/viewer.html`

C12 LPBN Import／Restore必要delta仍位於上述`import.js`，不是第8檔。若Phase 4發現需要第8檔，必須停止並回報scope conflict，不得自行擴大。

### 21.15 Explicit Zero-Modification Boundary

Phase 4不需要修改：

- `bn/js/workspace.js`
- `bn/js/countdown.js`
- `bn/js/export.js`
- `bn/css/styles.css`
- `bn/js/lpbn-badges.js`
- `bn/templates/A/12-lpbn.js`
- LPBN掛標assets
- C01～11 wrappers及launchers
- Shared Proposal（本節Phase 3完成後Phase 4不再修改）
- Requirement／Architecture
- C assets、fonts、vendor
- A/B/D implementation
- C13～17

既有C state、countdown validator、LPBN state、resolver/composition、Preview variants、Export variants、JSON serializer與styles已足夠C12。

### 21.16 Export Boundary

12現有正式base輸出為JPG。C12 route接通後沿用`renderBnToCanvas()`；countdown先存在base canvas，因此掛標variants由包含countdown的base副本建立，輸出base `12_LPBN.jpg`與`12_LPBN_1.jpg`～`12_LPBN_3.jpg`。

JSON v1既有`cCountdownText`與`lpbnBadgeMonth`儲存contract不變。`export.js`不得修改，JPG參數、variant naming、最大三個slot、warning behavior與JSON version均不變。C13～17尚未完成；本節不宣稱完整C 17版位Export ready。

### 21.17 Phase 4 Coding Plan（本輪不執行）

Phase 4只能：

1. 在精確7檔scope內新增C12 wrapper／launcher，修改`render-a.js`、`import.js`、`editor.js`、`app.js`與`viewer.html`。
2. Wrapper reuse A12 renderer／waiter，保持Canvas／bottom／overlay `1200×550`與placement `(0,0,1200,550)`。
3. 精確實作`74pt "ShopeeNotoSans Bold"`、`#ff4c45`、rotation `-2.1°`、center candidate `(876,365.5)`與scale candidate `1.0`。
4. 開放C12 route／Import／Restore／Editor／App／Viewer／launcher，C13仍unsupported。
5. 讓C Import的`E15`與Restore的`lpbnBadgeMonth`不再被清空，保持`E16` countdown contract。
6. 天然沿用正式Preview badge stack與Export badge variants，不修改zero-modification檔案。

### 21.18 Phase 4 Coding Integrity Self-Check Plan（本輪不執行）

Coding完成後只做C12最小Integrity Self-Check：

1. Exact 7-file implementation scope、`git diff --check`、C12 wrapper與shared JS syntax、launcher `zsh -n`、viewer parse。
2. C12 route resolve，C13 route reject。
3. Canvas／bottom／overlay `1200×550`，background placement `(0,0,1200,550)`。
4. `0天`、`9天`接受；`10天`拒絕。
5. Wrapper精確保存literal `74pt "ShopeeNotoSans Bold"`、`#ff4c45`、rotation `-2.1°`、center candidate `(876,365.5)`與scale candidate `1.0`。
6. Import接受C12 selected context，保存`C!E15` `lpbnBadgeMonth`與`C!E16` countdown；Restore接受C12、保留`lpbnBadgeMonth`、拒絕C13。
7. Editor gate、App enabled IDs、既有`bnId === "12"` badge Preview flow、Viewer C12 branch與launcher URL／mode均正確。
8. Hash保護A12 template、`lpbn-badges.js`、掛標assets、C01～11 wrappers／launchers、workspace／countdown／export／styles、Proposal／Requirement、C12 assets、A/B/D與C13～17 boundaries。

此self-check不得稱為正式Phase 5，不擴為完整C regression suite，不做browser pixel measurement或產生圖片。

### 21.19 Jamie Launcher Manual Verification Plan（本輪不執行）

Coding與最小Integrity Self-Check完成後，Jamie使用`bn/launch/C/12_LPBN.command`人工確誊：

1. C12底圖正確，Canvas為`1200×550`，overlay可切換且完整對齊。
2. A/B12三欄文字的位置、font、size、color完整沿用，`$`／`%` special formatting正常。
3. Countdown顯示，font視覺符合literal `74pt`，color=`#ff4c45`，rotation=`-2.1°`，`0天`～`9天`切換正常。
4. Initial center `(876,365.5)`與scale `1.0`是否需要Jamie明確指示的單點微調。
5. 若viewer-local掛標驗證control能在既有viewer最小scope內完成，再驗證空月份、`9`／`10`／`11`／`12`、最多三個掛標，以及掛標與countdown互不破壞。

若viewer-local掛標control無法在既有API與精確7檔scope內合理接入，Phase 4如實回報即可；正式App／Export掛標contract仍由既有code protection與runtime smoke確認，不因此擴scope或BLOCK C12 Coding。

只有center／scale可在Jamie明確指示後單點微調。AI不得自行改變font `74pt`、color、rotation、Canvas dimensions、A12文字geometry或LPBN掛標正式contract，也不得自行宣告Jamie Manual PASS。

### 21.20 C13～17 and Zero-Expansion Boundary

C13～17完全不在本節範圍。不得預寫C13 wrapper／launcher／routing／geometry／font size／center／scale，不處理C13／14 line1／line2或countdown規格，也不處理C15～17新內容。C12完成後再依Jamie指示逐版處理。

### 21.21 Conflict／Boundary／Acceptance State

`CONFLICT: None`

C12 Canvas、bottom與overlay同為`1200×550`，不需要mapping或workaround。目前Type C Import／Restore會清空`lpbnBadgeMonth`是C12尚未開通的既有gate，Phase 4可在已列入7檔scope的`import.js`做最小解除排除，不是第8檔或architecture conflict。

仍OPEN且必須由Jamie launcher裁決：

- Initial center `(876,365.5)`的最終人工視覺接受度。
- Initial uniform scale `1.0`的最終人工視覺接受度。
- 所有合法countdown值的最終視覺接受度。

Font literal `74pt "ShopeeNotoSans Bold"`、color `#ff4c45`與Canvas rotation `-2.1°`不是OPEN candidate；它們是USER LOCKED。Canvas／bottom／overlay `1200×550`及placement `(0,0,1200,550)`也不是geometry-tuning candidate。

本節完成只代表C－12 Phase 3 Proposal可等待Jamie授權進入Phase 4；不代表已Coding、已supported、已完成Phase 5、完整C Export ready或已Jamie人工PASS。

## 22. C－13｜`13_Skinny BN_APP` Phase 3 Proposal

> **Historical phase record — current result is FINAL LOCKED／Manual Verification PASS.** 本節的candidate、planned、尚未Coding與待Jamie驗證文字只記錄當時Phase 3狀態；current authority為第24節與Code Commit `0c9da10`，geometry數值不因本註記改寫。

本節僅將C－13 Phase 2 Repository Investigation已確認的設計追加至唯一共享C Proposal。本節不執行Coding，不修改Requirement／Architecture，不重新分析reference或geometry，不處理C14～17，不返工C01～12。

### 22.1 USER LOCKED Requirement and Field Model

版位為`13_Skinny BN_APP`。C13原有文字完整沿用正式A／B13，正式field model精確為：

- `bnText["13"].line1`
- `bnText["13"].line2`
- `cCountdownText`

即`line1 + line2 + countdown`，不是C01～12的`headline + subheadline + protectionText`三欄模型。

C13 countdown USER LOCKED contract：

- font source：`ShopeeNotoSans(content)-Bold`
- Canvas alias：`ShopeeNotoSans Bold`
- font size：literal `31pt`，不做pt→px換算
- color：`#ff4c45`
- Canvas rotation：精確`-2.1°`
- legal values：`0天`～`9天`
- Excel source：`C!E16`
- Preview／Editor可修改；Import／Restore／JSON必須保存

Literal `31pt`、`#ff4c45`與rotation `-2.1°`均為USER LOCKED，不是candidate。

### 22.2 Formal A／B13 Reuse Architecture

正式template為`bn/templates/A/13-skinny-bn-app.js`；B13 reuse A13 template。正式renderer為`renderSkinnyBnApp()`，font waiter為`waitForSkinnyBnAppFonts()`。

C13必須採用：

`C13 wrapper → formal A13 renderSkinnyBnApp() → countdown overlay`

C13 wrapper不得複製A13 renderer、line1／line2 geometry或validation，不得修改A13 template，不得改成C01～12三欄模型。

### 22.3 Formal Canvas, Bottom, and Overlay Contract

A13／C13正式尺寸與placement contract：

- formal Canvas：`358×360`
- bottom intrinsic：`336×318`
- formal background placement：`drawImage(backgroundImage, 11, 20, 336, 318)`
- offset：`(11,20)`
- bottom asset：`bn/assets/C/底圖/13_Skinny BN_APP.png`
- overlay asset：`bn/assets/C/對位/13_Skinny BN_APP.png`
- overlay intrinsic：`358×360`，完整直接疊於formal Canvas

Bottom `336×318`透過A13正式placement `(11,20,336,318)`置於`358×360` Canvas。尺寸不同不是錯誤，不需要resize、crop、額外coordinate mapping或C13 workaround，不修改asset或A13 placement。

### 22.4 Formal A／B13 Line1 Rendering Contract

- state：`bnText["13"].line1`
- box：`[74,42,210,38]`
- font：`30pt "ShopeeNotoSans Medium"`
- color：`#ffffff`
- `textAlign = "left"`
- `textBaseline = "alphabetic"`
- actual ink水平與垂直置中
- 使用`716×720` 2× temporary Canvas
- high-quality downsample至`358×360`

C13直接reuse正式A13 line1 renderer，不複製此邏輯。

### 22.5 Formal A／B13 Line2 and Special Formatting Contract

- state：`bnText["13"].line2`
- box：`[49,89,260,38]`
- ordinary font：`30pt "ShopeeNotoSans Bold"`
- color：`#fff285`
- `textAlign = "left"`
- `textBaseline = "alphabetic"`
- mixed runs整體actual ink水平與垂直置中
- 直接繪於正式`358×360` Canvas，不使用temporary Canvas
- `$`／`%`使用`25pt "ShopeeNotoSans Bold"`
- special glyph依相鄰ordinary glyph的ink-bottom alignment

C13完整reuse正式A13 line2 mixed-run與special formatting，不複製、不重寫。

### 22.6 Formal A13 Validation Contract

正式A13 renderer已負責：Canvas dimensions、bottom intrinsic dimensions、background placement、line1／line2 box bounds、font readiness、finite glyph metrics、frozen line1／line2 validation result、ink bounds、`fitsWidth`與`fitsHeight`。C13 wrapper不複製validation。

### 22.7 C13 Assets Contract

Bottom `bn/assets/C/底圖/13_Skinny BN_APP.png`：

- PNG RGBA，含alpha
- `336×318`
- SHA-256：`2feb6ec0f0f481ba18479785b908f8518efd6676bc19d4ed902b9435da10c3b0`

Overlay `bn/assets/C/對位/13_Skinny BN_APP.png`：

- PNG RGBA，含alpha
- `358×360`
- SHA-256：`008bf83b09f91482ac7d39c0783bd214ee17953e337ded6e6a05745ce35815fb`

### 22.8 Countdown Geometry Candidate and Evidence

USER LOCKED geometry inputs為font `31pt "ShopeeNotoSans Bold"`、color `#ff4c45`與rotation `-2.1°`。Phase 3 initial candidates：

- target center：`(142,266.5)`
- uniform visual scale：`1.0`

Center與scale必須精確標記為`Phase 3 initial candidate, pending Jamie launcher visual verification`，不代表人工PASS。

Phase 2 evidence僅記錄：reference與formal Canvas同為`358×360`，不需mapping；`0`主要ink約`x=111～133, y=249～284`，`天`主要ink約`x=137～173, y=249～284`，合併bounds約`x=111～173, y=249～284`，visual center為`(142,266.5)`。右側`x≈203～214`紅橘component屬非countdown元素，已排除。Transparent edge／threshold可能造成少量bounds誤差；scale `1.0`為首次launcher candidate，最終center／scale由Jamie launcher人工裁決。

### 22.9 Countdown Rendering Algorithm Proposal

C13 wrapper沿用既有C01～12 wrapper pattern：

1. Reuse正式A13 font waiter。
2. 確認countdown Bold font ready。
3. 使用`isValidCCountdown()`驗證。
4. 設定`ctx.font = '31pt "ShopeeNotoSans Bold"'`、`textAlign = "left"`、`textBaseline = "alphabetic"`。
5. `measureText(text)`並使用`actualBoundingBoxLeft`、`actualBoundingBoxRight`、`actualBoundingBoxAscent`、`actualBoundingBoxDescent`求visual ink rect與center。
6. `ctx.save()`，`ctx.translate(142,266.5)`，`ctx.rotate(-2.1 * Math.PI / 180)`，`ctx.scale(1.0,1.0)`。
7. `ctx.fillStyle = "#ff4c45"`，以`ctx.fillText(text,-inkCenterX,-inkCenterY)`或與既有C wrapper完全等價方式繪製。
8. `ctx.restore()`。

不做`31pt`至px換算，不改rotation sign／font／color，不自動調整center／scale，不新建shared geometry／rotation helper，不修改`countdown.js`。

### 22.10 C13 Wrapper and Routing Proposal

Phase 4預計新增`bn/templates/C/13-skinny-bn-app.js`，作為最小wrapper：import／reuse A13正式dimensions／constants、`renderSkinnyBnApp()`、`waitForSkinnyBnAppFonts()`，並從`../../js/countdown.js` import `isValidCCountdown()`。Wrapper先完整執行A13 renderer，再疊C13 countdown；不複製A13 rendering或validation，不建新shared architecture。

`bn/js/render-a.js`只做C13必要delta：

- import C13 wrapper
- 新增`C_TABLE["13"]`，background為`13_Skinny BN_APP.png`
- 使用C13 wrapper renderer／waiter
- `C_COUNTDOWN_BN_IDS`由01～12擴至01～13
- C13 `getBnFieldValues()`取得`bnText["13"].line1`、`bnText["13"].line2`與`cCountdownText`
- 必要unsupported summary同步，C14～17維持unsupported

不fallback C至`A_TABLE`，不修改A／B／D、registry architecture或C01～12 field model。

### 22.11 Import, Restore, and JSON Proposal

`bn/js/import.js`的Phase 4最小delta：

- `C_SUPPORTED_BN_IDS`由01～12擴至01～13；C14～17不加入。
- Type C C13 import讀取`C!L20` → `bnText["13"].line1`。
- Type C C13 import讀取`C!L21` → `bnText["13"].line2`。
- Countdown維持`C!E16`的完整字串`0天`～`9天`；illegal countdown必須atomic failure。
- 不得使用`B15`、`B16`或`B17`作為C13文字來源。

C12 LPBN boundary必須保持：`C!E15` → `lpbnBadgeMonth`；C13不得使用E15作line1、line2或countdown。精確區分為C12 LPBN badge month=`E15`、C countdown=`E16`、C13 line1=`L20`、C13 line2=`L21`。

Restore僅解除C13必要gate：支援selectedBnId 13，保留並使用既有`validateTextFields()`或正式等價validation驗證`bnText["13"].line1`／`line2`，同時保留合法`cCountdownText`；C14～17仍拒絕。

JSON v1已有`bnText`與`cCountdownText`，version、schema、serializer均不變，不新增欄位，`export.js`不修改。

### 22.12 Editor and App Proposal

`bn/js/editor.js`不能僅將13塞入C01～12三欄gate。Type C C13必須reuse既有A／B13 field definitions與C countdown field，顯示：

- line1：「第一行」，上限5
- line2：「第二行」，上限6
- countdown select：`0天`～`9天`

不顯示headline、subheadline或protectionText；只做C13 Type C最小特例／gate，不重寫Editor、不修改layout或`styles.css`。

`bn/js/app.js`只將`C_ENABLED_BN_IDS`由01～12擴至01～13，C14～17仍disabled。C13沒有其他slot-specific App flow；既有`bnId === "12"` LPBN badge stack不得套用C13或被修改。

### 22.13 Viewer and Launcher Proposal

`bn/launch/viewer.html`新增唯一C13 branch：

- type=`C`，bn=`13_Skinny BN_APP`
- production wrapper=`../templates/C/13-skinny-bn-app.js`
- formal Canvas=`358×360`
- bottom=`../assets/C/底圖/13_Skinny BN_APP.png`，intrinsic `336×318`
- background placement由A13 renderer處理為`(11,20,336,318)`
- overlay=`../assets/C/對位/13_Skinny BN_APP.png`，intrinsic `358×360`
- line1 input、line2 input、`0天`～`9天` countdown select、overlay toggle
- 必要unsupported summary同步

Viewer將overlay完整`358×360`疊於formal Canvas，不將bottom stretch成`358×360`，不重寫background placement，不新增三欄fields或C14 branch。

Phase 4預計新增`bn/launch/C/13_Skinny BN_APP.command`，URL精確為`http://127.0.0.1:4173/bn/launch/viewer.html?type=C&bn=13_Skinny%20BN_APP`，沿用既有viewer／server，mode為`755`。

### 22.14 Phase 4 Exact Seven-File Scope

Phase 4精確僅允許7檔：

新增2檔：

1. `bn/templates/C/13-skinny-bn-app.js`
2. `bn/launch/C/13_Skinny BN_APP.command`

修改5檔：

3. `bn/js/render-a.js`
4. `bn/js/import.js`
5. `bn/js/editor.js`
6. `bn/js/app.js`
7. `bn/launch/viewer.html`

若Phase 4發現需要第8檔，必須STOP並回報scope conflict，不得自行擴大。

### 22.15 Explicit Zero-Modification Boundary

Phase 4不修改：

- `bn/js/workspace.js`
- `bn/js/countdown.js`
- `bn/js/export.js`
- `bn/css/styles.css`
- `bn/templates/A/13-skinny-bn-app.js`
- C01～12 wrappers與launchers
- Shared Proposal（本節Phase 3完成後Phase 4不再修改）
- Requirement／Architecture
- C assets、fonts、vendor
- A／B／D implementation
- C14～17

理由是workspace已有`bnText["13"]`、`updateText()`與`cCountdownText`；countdown validator已涵蓋`0天`～`9天`；export已有13 PNG item並經`renderBnToCanvas()`；JSON已有`bnText`與`cCountdownText`；styles已有line input與countdown select所需樣式；A13 renderer已完整處理line1／line2與background placement。

### 22.16 Export Boundary

`export.js`不修改。13既有正式輸出為PNG，C13 route接通後自然透過`renderBnToCanvas()`。JSON v1既有`bnText`與`cCountdownText`，不改PNG export contract、JSON version或欄位。C14～17仍未完成，本節不宣稱完整C 17版位Export ready。

### 22.17 Phase 4 Coding Plan（本輪不執行）

Phase 4預計：

1. 新增C13 wrapper與launcher。
2. `render-a.js`加入C13 route與countdown ID 13，field values使用`bnText["13"].line1/line2 + cCountdownText`。
3. Import C13讀`C!L20/L21`，countdown維持`C!E16`，C12 LPBN `C!E15`保持不變。
4. Restore保留／驗證C13 `bnText`，Editor顯示line1／line2／countdown，App enabled加入C13，Viewer新增C13 branch。
5. 保持Canvas `358×360`、bottom `336×318`、A13 placement `(11,20,336,318)`、overlay `358×360`。
6. 精確保存literal `31pt`、`#ff4c45`、rotation `-2.1°`、center candidate `(142,266.5)`與scale candidate `1.0`。
7. C14維持unsupported，不修改zero-modification檔案。

### 22.18 Phase 4 Coding Integrity Self-Check Plan（本輪不執行）

Coding完成後僅做C13最小Integrity Self-Check：

- exact 7-file scope：新增2檔、修改5檔、無第8檔
- `git diff --check`、C13 wrapper與shared JS syntax、launcher `zsh -n`、viewer parse
- C13 route resolve，C14 route reject
- Canvas `358×360`，bottom `336×318`，placement `(11,20,336,318)`，overlay `358×360`
- legal countdown `0天`／`9天`，illegal `10天`
- literal `31pt`、`#ff4c45`、rotation `-2.1°`、center `(142,266.5)`、scale `1.0`
- Import C13 `L20/L21`、countdown `E16`，C12 `E15` LPBN contract仍存在
- Restore C13 accept並保留line1／line2／countdown，Restore C14 reject
- Editor C13=`line1 + line2 + countdown`，App enabled包含C13，Viewer branch與launcher URL／mode正確
- Hash保護A13 template、C01～12 wrappers／launchers、workspace／countdown／export／styles、Proposal／Requirement、C13 assets、A／B／D與C14～17 boundary
- staged空、HEAD不變、index.lock不存在

此self-check不稱為Phase 5，不擴為完整C regression，不做browser screenshot或生成圖片。

### 22.19 Jamie Launcher Manual Verification Plan

C13 Coding與最小Integrity Self-Check完成後，Jamie使用`bn/launch/C/13_Skinny BN_APP.command`人工確認：formal Canvas、bottom placement、overlay完整對齊、line1／line2與A／B13一致、`$`／`%` special formatting、countdown顯示與`0天`～`9天`切換、literal `31pt`、`#ff4c45`、rotation `-2.1°`，以及center `(142,266.5)`與scale `1.0`的人工視覺接受度。

僅center／scale可在Jamie明確指示後單點微調。AI不得自行修改`31pt`、color、rotation、A13 line1／line2 geometry、Canvas dimensions或background placement，也不得自行宣告Jamie Manual PASS。

### 22.20 C14～17 and Zero-Expansion Boundary

C14～17完全不在本節範圍。不預寫C14 wrapper、launcher、routing、geometry、font size、center、scale或countdown，不處理C15～17任何新內容，不因C13也是Skinny而研究C14。

### 22.21 Conflict／Boundary／Acceptance State

`CONFLICT: None`

C13 reference與formal Canvas同為`358×360`；bottom `336×318`使用A13正式placement `(11,20,336,318)`，overlay為`358×360`，不需要mapping或workaround。目前Type C Import／Restore尚未保留C13 `bnText`是C13未開通的既有gate，Phase 4可於已列入7檔scope的`import.js`做最小delta，不是architecture conflict。

仍OPEN且必須由Jamie launcher裁決：

- Initial center `(142,266.5)`的最終人工視覺接受度。
- Initial uniform scale `1.0`的最終人工視覺接受度。
- 所有合法countdown值的最終視覺接受度。

Font literal `31pt "ShopeeNotoSans Bold"`、color `#ff4c45`與Canvas rotation `-2.1°`不是OPEN candidate，它們是USER LOCKED。Canvas `358×360`、bottom `336×318`、placement `(11,20,336,318)`與overlay `358×360`也不是geometry-tuning candidate。

本節完成只代表C－13 Phase 3 Proposal可等待Jamie授權進入Phase 4；不代表已Coding、已supported、已完成Phase 5、完整C Export ready或已Jamie人工PASS。

## 23. C－14｜14_Skinny BN_PC Phase 3 Proposal

> **Historical phase record — current result is FINAL LOCKED／Manual Verification PASS.** 本節的candidate、planned、尚未Coding與待Jamie驗證文字只記錄當時Phase 3狀態；current authority為第24節與Code Commit `0c9da10`，geometry數值不因本註記改寫。

本節僅將C－14 Phase 2 Repository Investigation已確認的設計追加至唯一共享C Proposal。本節不執行Coding，不修改Requirement／Architecture，不重新分析reference或geometry，不返工C01～13，不處理C15～17。

### 23.1 Formal Field Model and User Wording

C14正式state與field model精確為：

- bnText["14"].line1
- bnText["14"].line2
- cCountdownText

即line1 + line2 + countdown。正式A／B14沒有protectionText，也不使用C01～12的headline／subheadline／protectionText shared三欄模型。

使用者原始描述中的「主標／副標／保護文字」是對既有文字區的泛稱。實作必須以正式A／B14 repository contract為準，不得硬造第三欄。

### 23.2 USER LOCKED Countdown Contract

C14 countdown USER LOCKED contract：

- font source：ShopeeNotoSans(content)-Bold
- Canvas alias：ShopeeNotoSans Bold
- font size：literal 14pt，不做pt→px換算
- color：#ff4c45
- Canvas rotation：精確-2.1°
- legal values：0天～9天
- Excel source：C!E16
- Preview／Editor可修改；Import／Restore／JSON必須保存

Literal 14pt、#ff4c45與rotation -2.1°均為USER LOCKED，不是candidate。

### 23.3 Formal A／B14 Template Architecture

正式template為bn/templates/A/14-skinny-bn-pc.js；B14經既有routing reuse A14。正式renderer為renderSkinnyBnPc()，font waiter為waitForSkinnyBnPcFonts()。

C14必須採用：

C14 wrapper → formal A14 renderSkinnyBnPc() → countdown overlay

C14不得複製A14 renderer、line1／line2 geometry或validation，不得修改A14 template，也不得改成C01～12三欄模型。

### 23.4 Formal Canvas, Bottom, and Overlay Contract

- formal Canvas：400×110
- bottom intrinsic：384×96
- formal background placement：drawImage(backgroundImage, 8, 7, 384, 96)
- offset：(8,7)
- bottom：bn/assets/C/底圖/14_Skinny BN_PC.png
- overlay：bn/assets/C/對位/14_Skinny BN_PC.png
- overlay intrinsic：400×110

Bottom 384×96透過A14正式placement (8,7,384,96)置於400×110 Canvas。Overlay完整400×110直接疊於formal Canvas。Bottom尺寸不同不是錯誤，不需要resize、crop、stretch、額外coordinate mapping或C14 workaround，不修改asset或A14 placement。

### 23.5 Formal A／B14 Line1 Rendering Contract

- state：bnText["14"].line1
- box：[18,23,150,25]
- font：20pt "ShopeeNotoSans Medium"
- color：#ffffff
- textAlign="left"
- textBaseline="alphabetic"
- actual ink左緣對齊box left
- actual ink垂直置中
- 使用800×220、2× temporary Canvas
- high-quality downsample至400×110
- 驗證ink width／height、fitsWidth與fitsHeight

C14直接reuse正式A14 line1 renderer，不複製、不重寫此邏輯。

### 23.6 Formal A／B14 Line2 and Special Formatting Contract

- state：bnText["14"].line2
- box：[18,56,195,29]
- ordinary font：22.5pt "ShopeeNotoSans Bold"
- color：#fff285
- textAlign="left"
- textBaseline="alphabetic"
- mixed runs整體左緣對齊並垂直置中
- 直接繪於400×110 formal Canvas，不使用temporary Canvas
- $／%使用19pt "ShopeeNotoSans Bold"
- special glyph依相鄰ordinary glyph的ink-bottom對齊

C14完整reuse正式A14 line2 mixed-run與special formatting，不複製、不重寫。

### 23.7 Formal A14 Validation Contract

正式A14 renderer負責Canvas dimensions、bottom intrinsic dimensions、background placement、text box bounds、font readiness、finite glyph metrics、ink bounds、fitsWidth、fitsHeight、各欄frozen validation result及最終frozen validation result。C14 wrapper不複製validation。

### 23.8 C14 Assets and Reference Contract

Bottom bn/assets/C/底圖/14_Skinny BN_PC.png：

- PNG RGBA，含alpha
- 384×96
- mode 664
- SHA-256：9bf4008eff8b095c5d368af3f93dbf893963bad68d539ef8b98020e058e9172c

Overlay bn/assets/C/對位/14_Skinny BN_PC.png：

- PNG RGBA，含alpha
- 400×110
- mode 664
- SHA-256：5bcfb994cd983f15473d86da379887804ffed4e2adac5f534633d59f9d287ca7

Phase 2使用的精確local reference為/Users/jamie/Downloads/C-assets/14_Skinny BN_PC.png：

- PNG RGBA，含alpha
- 400×110
- mode 664
- SHA-256：7da990c6594f907a879beb4d84bdda6c38fbf00a683ea401fe65ecc895265872

### 23.9 Countdown Geometry Candidate and Evidence

USER LOCKED geometry inputs為font 14pt "ShopeeNotoSans Bold"、color #ff4c45與rotation -2.1°。

Phase 3 initial candidates：

- target center：(268.5,71.5)
- uniform visual scale：1.0

Center與scale均必須標記為：Phase 3 initial candidate, pending Jamie launcher visual verification.

它們不是USER LOCKED，也不代表Manual PASS。

Phase 2 evidence僅記錄：reference與formal Canvas同為400×110，不需mapping。第一個countdown glyph component約x=255～264、y=64～79；第二個約x=267～282、y=64～79；合併bounds約x=255～282、y=64～79，visual center candidate為(268.5,71.5)。上方x≈255～281、y≈50～60促銷標籤區與右側x≈279～316紅橘圖形已排除。較寬threshold可能使glyph左緣擴至約x=254，X center約268～268.5；transparent edge／antialias約有1px不確定性。Scale 1.0為首次launcher candidate，最終center／scale由Jamie人工裁決。

### 23.10 Countdown Rendering Algorithm Proposal

C14 wrapper沿用既有C13 visual ink-center模式：

1. Reuse正式A14 font waiter。
2. 確認countdown Bold font ready。
3. 使用isValidCCountdown()驗證。
4. 設定ctx.font = '14pt "ShopeeNotoSans Bold"'、textAlign="left"、textBaseline="alphabetic"。
5. measureText(text)，使用actualBoundingBoxLeft、actualBoundingBoxRight、actualBoundingBoxAscent、actualBoundingBoxDescent求visual ink rect與center。
6. ctx.save()，ctx.translate(268.5,71.5)，ctx.rotate(-2.1 * Math.PI / 180)，ctx.scale(1.0,1.0)。
7. ctx.fillStyle="#ff4c45"，以ctx.fillText(text,-inkCenterX,-inkCenterY)或與C13完全等價方式繪製。
8. ctx.restore()。

保留既有C wrapper對invalid／empty metrics的防護。不得轉換14pt、改rotation sign／font／color、動態調整center／scale、建立shared geometry／rotation helper或修改countdown.js。

### 23.11 C14 Wrapper and Routing Proposal

Phase 4預計新增bn/templates/C/14-skinny-bn-pc.js作為最小wrapper：import／reuse A14正式dimensions、renderSkinnyBnPc()與waitForSkinnyBnPcFonts()，並由../../js/countdown.js import isValidCCountdown()。Wrapper先完整執行A14 renderer，再疊C14 countdown，不複製A14 rendering／validation，不建立新shared architecture。

bn/js/render-a.js只做C14必要delta：

- import C14 wrapper
- 新增C_TABLE["14"]，background為14_Skinny BN_PC.png
- 使用C14 wrapper renderer／waiter
- C_COUNTDOWN_BN_IDS由01～13擴至01～14
- C14 getBnFieldValues()取得bnText["14"].line1、line2及cCountdownText
- unsupported summary同步至C01～14，C15～17維持unsupported

不得fallback C至A_TABLE、修改A_TABLE／B／D、重構registry、預開C15～17或接成shared三欄。

### 23.12 Import, Restore, and JSON Proposal

bn/js/import.js的Phase 4最小delta：

- C_SUPPORTED_BN_IDS由01～13擴至01～14；C15～17不加入。
- C!L22 → bnText["14"].line1。
- C!L23 → bnText["14"].line2。
- Countdown維持C!E16完整字串0天～9天；illegal countdown為atomic failure。

Import boundary必須精確保持：

- C13 line1／line2＝C!L20／L21
- C14 line1／line2＝C!L22／L23
- C countdown＝C!E16
- C12 LPBN badge month＝C!E15

C14不得使用C13 L20／L21、B15／B16／B17或shared三欄，也不得破壞C12 E15 contract。

Restore僅解除C14必要gate：supported selectedBnId加入14，以既有validateTextFields("14", …)或正式等價validation保留／驗證bnText["14"].line1／line2，並保留合法cCountdownText；C15～17仍拒絕。

No JSON schema/version delta required.

JSON v1、schema、bnText、cCountdownText及serializer均不變，export.js不修改。

### 23.13 Editor and App Proposal

Type C C14 Editor必須reuse正式A／B14 STORE_FIELDS與既有C countdown field，顯示：

- line1：「第一行」，上限5
- line2：「第二行」，上限6
- countdown select：0天～9天

不得顯示headline、subheadline或protectionText。Phase 4僅將既有C13 line1／line2／countdown special gate最小擴至C14，不重寫Editor、layout或styles。

bn/js/app.js只將C_ENABLED_BN_IDS由01～13擴至01～14。C15～17仍disabled。C14沒有slot-specific App flow；既有bnId === "12" LPBN badge stack不得套用C14或被修改。

### 23.14 Viewer and Launcher Proposal

bn/launch/viewer.html新增唯一C14 branch：

- type=C，bn=14_Skinny BN_PC
- production wrapper=../templates/C/14-skinny-bn-pc.js
- formal Canvas=400×110
- bottom=../assets/C/底圖/14_Skinny BN_PC.png，intrinsic 384×96
- background placement由A14正式renderer處理為(8,7,384,96)
- overlay=../assets/C/對位/14_Skinny BN_PC.png，intrinsic 400×110
- line1 input、line2 input、0天～9天 countdown select、overlay toggle
- 必要unsupported summary同步

Viewer將overlay完整400×110疊於formal Canvas，不stretch bottom、不重寫placement、不新增三欄fields或C15 branch。

Phase 4預計新增bn/launch/C/14_Skinny BN_PC.command，URL精確為http://127.0.0.1:4173/bn/launch/viewer.html?type=C&bn=14_Skinny%20BN_PC，沿用既有viewer／server，mode為755。

### 23.15 Phase 4 Exact Seven-File Scope

Phase 4精確只允許7檔。

新增2檔：

1. bn/templates/C/14-skinny-bn-pc.js
2. bn/launch/C/14_Skinny BN_PC.command

修改5檔：

3. bn/js/render-a.js
4. bn/js/import.js
5. bn/js/editor.js
6. bn/js/app.js
7. bn/launch/viewer.html

若Phase 4需要第8檔，必須STOP並回報SCOPE CONFLICT，不得自行擴大。

### 23.16 Explicit Zero-Modification Boundary

Phase 4不修改：

- bn/js/workspace.js
- bn/js/countdown.js
- bn/js/export.js
- bn/css/styles.css
- bn/templates/A/14-skinny-bn-pc.js
- C01～13 wrappers與launchers
- Shared Proposal（本節Phase 3完成後Phase 4不再修改）
- Requirement／Architecture
- C assets、fonts、vendor
- A／B／D implementation
- C15～17

理由：workspace已有bnText["14"]、updateText()與cCountdownText；countdown validator已涵蓋0天～9天；export已有14 PNG item並經renderBnToCanvas()；JSON已有bnText + cCountdownText；styles已有line inputs與countdown select樣式；A14 renderer已完整處理line1／line2與background placement。

### 23.17 Export Boundary

export.js不修改。14既有正式輸出為PNG，C14 route接通後自然經renderBnToCanvas()。JSON v1既有bnText與cCountdownText，不改PNG contract、JSON version、欄位或serializer。C15～17尚未完成，本節不宣稱完整C 17版位Export ready。

### 23.18 Phase 4 Coding Plan（本輪不執行）

Phase 4預計：

1. 新增C14 wrapper與launcher。
2. render-a加入C14 route、countdown ID 14及bnText["14"].line1／line2 + cCountdownText projection。
3. Import C14讀C!L22/L23，countdown維持C!E16，C13 L20/L21與C12 E15保持。
4. Restore保留／驗證C14 bnText；Editor顯示line1／line2／countdown；App enabled加入14；Viewer新增C14 branch。
5. 保持Canvas 400×110、bottom 384×96、A14 placement (8,7,384,96)、overlay 400×110。
6. 精確保存literal 14pt、#ff4c45、rotation -2.1°、center candidate (268.5,71.5)與scale candidate 1.0。
7. C15維持unsupported，不修改任何zero-modification檔案。

### 23.19 Phase 4 Coding Integrity Self-Check Plan（本輪不執行）

Coding完成後僅做C14最小Integrity Self-Check：

- exact 7-file scope：新增2檔、修改5檔、無第8檔
- git diff --check、C14 wrapper與shared JS syntax、launcher zsh -n、viewer parse
- C14 route resolve，C15 route reject
- Canvas 400×110，bottom 384×96，placement (8,7,384,96)，overlay 400×110
- legal countdown 0天／9天，illegal 10天
- literal 14pt、#ff4c45、rotation -2.1°、center (268.5,71.5)、scale 1.0
- Import C14 L22/L23、countdown E16，C13 L20/L21及C12 E15仍存在
- Restore C14 accept並保留line1／line2／countdown，Restore C15 reject
- JSON version／schema不變
- Editor C14=line1 + line2 + countdown，App enabled包含C14，Viewer branch與launcher URL／mode正確
- Hash保護A14 template、C01～13 wrappers／launchers、workspace／countdown／export／styles、Proposal／Requirement、C14 assets、A／B／D與C15～17 boundary
- staged空、HEAD不變、index.lock不存在

此self-check不稱為Phase 5，不擴為完整C regression，不做browser screenshot或生成圖片。

### 23.20 Jamie Launcher Manual Verification Plan

C14 Coding與最小Integrity Self-Check完成後，Jamie使用bn/launch/C/14_Skinny BN_PC.command人工確認：formal Canvas、bottom placement、overlay完整對齊、line1／line2與A／B14一致、$／% special formatting、countdown顯示與0天～9天切換、literal 14pt、#ff4c45、rotation -2.1°，以及center (268.5,71.5)與scale 1.0的人工視覺接受度。

僅center／scale可在Jamie明確指示後單點微調。AI不得自行修改14pt、color、rotation、A14 line1／line2 geometry、Canvas dimensions或background placement，也不得自行宣告Jamie Manual PASS。

### 23.21 C15～17 and Zero-Expansion Boundary

C15～17完全不在本節範圍。不預寫C15 wrapper、launcher、routing、geometry、font或countdown，也不處理C16／C17任何內容。不得因C14完成後只剩三個版位就順便調查或預建。

### 23.22 Conflict／Boundary／Acceptance State

CONFLICT: None

C14 reference與formal Canvas同為400×110；bottom 384×96使用A14正式placement (8,7,384,96)，overlay為400×110，不需要mapping或workaround。目前Type C Import／Restore尚未保留C14 bnText是C14未開通的既有gate，Phase 4可在已列入7檔scope的import.js做最小delta，不是architecture conflict。

仍OPEN且必須由Jamie launcher裁決：

- Initial center (268.5,71.5)的最終人工視覺接受度。
- Initial uniform scale 1.0的最終人工視覺接受度。
- 所有合法countdown值的最終視覺接受度。

Font literal 14pt "ShopeeNotoSans Bold"、color #ff4c45與Canvas rotation -2.1°不是OPEN candidate，它們是USER LOCKED。Canvas 400×110、bottom 384×96、placement (8,7,384,96)與overlay 400×110也不是geometry-tuning candidate。

本節完成只代表C－14 Phase 3 Proposal可等待Jamie授權進入Phase 4；不代表已Coding、已supported、已完成Phase 5、完整C Export ready或已Jamie人工PASS。

---

## 24. Current Governing Status after C－01～14 Code Commit

> 本節是本文件的 current-status authority。第12～23節及其他歷史段落內的 candidate、planned、pending、尚未Coding、unsupported、待人工驗證等文字，保留作 phase chronology，但凡與本節不同，均已由後續實作與 Jamie 人工裁決取代。

### 24.1 C－01～14 Final Implementation Lock

- C－01～14 均已完成正式 implementation、route、Import／Restore、Editor、Preview renderer、JSON、Export path、viewer branch 與 dedicated launcher。
- 十四個版位均已由 Jamie 使用各自 launcher 完成人工視覺驗證並裁決 **PASS**。
- 正式 Code Commit：`0c9da10472ba3128ea90b64d2340ac8b178d4514`（`feat(bn): integrate C style 01-14`）。
- 各版最終 font、center、rotation、uniform scale 與 visual ink-center algorithm 以該 commit 所納入、且完成 Jamie PASS 的 wrapper 為準；歷史 candidate 不得反向覆蓋。
- C－14 最終鎖定為 `14pt "ShopeeNotoSans Bold"`、`#ff4c45`、Canvas rotation `-2.1°`、center `(268.5,71.5)`、uniform scale `1.0`。
- 本次 Documentation Update 不重開任何 C－01～14 geometry、renderer 或 verification 裁決。

### 24.2 C－15～17 Shared Reuse Lock

- C－15／16／17 與目前 A/B/D 正式行為相同，不增加 C-specific countdown。
- 不建立 C-specific countdown wrapper、geometry、state、Import mapping、Editor control 或 JSON field。
- shared reuse decision 已 **LOCKED**；截至 `0c9da10`，C－15～17 routing 尚未啟用。
- Requirement decision 不等於 runtime completion；在 routing 落地前，不得宣稱 C－15～17 已可由 C workspace Preview／Export。

### 24.3 Asset Dependency Decisions

- `bn/assets/C/底圖/15_AR.jpg` 與 A/B/D 對應檔 byte-identical，SHA-256 `d5098b9dfea1e53e3c60a406f5ffd9e3f04291dbbfc51ac8f1217dfb8de9a136`；不是 C-specific runtime dependency。
- `bn/assets/C/底圖/16_副區.jpg` 與 A/B/D 對應檔 byte-identical，SHA-256 `12902843ca43ffc7f1c89669514afa8477675406f96dab4f9b8819f11ba9506e`；不是 C-specific runtime dependency。
- `bn/assets/C/底圖/17_VIP.png` 為 PNG RGBA `1180×185`，SHA-256 `34df2ee85c09e691a25de31a7f5595833b98c9e01697a7234cb52a845512ba2c`。
- `bn/assets/C/底圖/17_主標題.png` 為 PNG RGBA `1180×83`，SHA-256 `ecf17ed1b9841fd62dd1535bb0573148361ddbc0cd22ed914457b8d38ac32bac`。
- C－17 兩檔與 A/B 對應檔 byte-identical、目前 C runtime reference 為零；正式分類為 `NOT REQUIRED BY C17 RUNTIME`。
- 四個 C15～17 files 均保留為 untracked evidence；本次文件工作不移動、不刪除、不修改，也不授權後續 asset cleanup。

### 24.4 Open Boundary

- OPEN：C－15～17 shared reuse routing 的最小正式接入。
- OPEN 不包含 C－01～14 geometry 或 manual result；這十四版均已 PASS。
- CONFLICT：None。
