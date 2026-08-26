# FSS BN Generator－正式 BN Templates Requirement Specification v1.0

> 階段：Phase 1－Requirement Specification
>
> 文件範圍：固定 17 個正式 BN Templates 與 A／B／C／D Type 真正存在的差異
>
> 狀態：A－01、A－02、A－03、A－04、A－05、A－06、A－07、A－08、A－09、A－10、A－11、A－12、A－13、A－14、A－15、A－16 已完成並經 Jamie 手動驗證 PASS；其他版位依確認狀態追加
>
> 整理日期：2026-08-12
>
> A－01 落地狀態同步日期：2026-08-13
>
> A－02 落地狀態同步日期：2026-08-13
>
> A－03 落地狀態同步日期：2026-08-13
>
> A－04 落地狀態同步日期：2026-08-13
>
> A－05 落地狀態同步日期：2026-08-13
>
> A－06 落地狀態同步日期：2026-08-14
>
> A－07 落地狀態同步日期：2026-08-14
>
> A－08 落地狀態同步日期：2026-08-14
>
> A－09 落地狀態同步日期：2026-08-15
>
> A－10 落地狀態同步日期：2026-08-15
>
> A－11 落地狀態同步日期：2026-08-16
>
> A－12 落地狀態同步日期：2026-08-16
>
> A－13 落地狀態同步日期：2026-08-16
>
> A－14 落地狀態同步日期：2026-08-16
>
> A－15 落地狀態同步日期：2026-08-16
>
> A－16 落地狀態同步日期：2026-08-16
>
> D－01 落地狀態同步日期：2026-08-24（樣式 D／`01_DDcard BN` 已完成正式 Template 與人工對位驗證並經 Jamie PASS；見第 5.2 節。其餘 D 版位仍待逐一確認）
>
> D－02 落地狀態同步日期：2026-08-24（樣式 D／`02_MALL HBN` 已完成正式 Template 與人工對位驗證並經 Jamie PASS；見第 5.2.2 節。D－03～17 仍待逐一確認）

## 1. 文件目的

本文件統一定義 FSS BN Generator 固定 17 個正式 BN Templates，以及 A／B／C／D Type 真正存在差異的產品需求、完成標準與修改邊界，供各版位後續 Phase 2 Investigation 使用。

本文件只整理已確認的 Phase 1 Requirement，不指定技術實作方式，不進行專案調查，也不提出 Proposal。下列正式文件仍為本文件的上位架構與需求基準：

- `docs/開發流程.md`
- `docs/架構說明.md`
- `bn/docs/FSS_BN_Architecture.md`
- `bn/docs/FSS_BN_Requirement_Specification_v1.0.md`
- `bn/docs/FSS_BN_17版位_Type差異_Phase0整理.md`

既有第一輪「BN 樣式選擇頁＋BN 控制台最初骨架」已完成並通過驗證；本文件不重寫其 Requirement 歷史，也不重新設計已完成的介面與流程。

正式 BN Templates 只維護本文件一份 Requirement Specification。每當 Jamie 確認一個新樣式／版位，再將其已確認 Requirement 追加至本文件；不為每個 BN 版位另建一份 Requirement 文件，也不預填尚未確認的規格。

## 2. 文件 Scope

本文件服務：

- 固定 17 個正式 BN Templates。
- A／B／C／D Type 真正存在的差異。
- 各正式 Template 的 Launch 開發／視覺驗證需求。

這項文件定位不代表 68 個獨立 Template 系統、68 個獨立產品、每個 BN 一份 Requirement 文件、每個 Type 一套 Generator／控制台，或每個 Type 複製一組 17 Templates。

目前已確認並納入完整 Requirement 的對象為：

> 樣式 A／內部 Type A 的正式 `01_DDcard BN`、`02_MALL HBN`、`03_Coin page BN`、`04_Loyalty BN`、`05_MSBN`、`06_IG`、`07_FB POST`、`08_SPX TVBN_1`、`09_SPX TVBN_2`、`10_POP UP`、`11_Line OA`、`12_LPBN`、`13_Skinny BN_APP`、`14_Skinny BN_PC`、`15_AR` 與 `16_副區` Template。

目前只定義：

- A－01～16 的正式版位與視覺規格。
- A－01～16 正式 Template 使用底圖與對位圖的需求。
- A－01～16 透過 `bn/launch/A/` 對應入口直接查看與進行視覺驗證的產品需求。
- 既有 BN 控制台維持不變、正式 Template 接入控制台移至後續獨立開發階段的邊界。

目前不處理 A－17、樣式 B／C／D 或其他生成器功能，也不為它們建立空章節、TODO、placeholder 或未確認規格表格。

正式 BN Template 採逐樣式、逐版位製作與驗證；目前已完成「樣式 A → `01_DDcard BN`」、「樣式 A → `02_MALL HBN`」、「樣式 A → `03_Coin page BN`」、「樣式 A → `04_Loyalty BN`」、「樣式 A → `05_MSBN`」、「樣式 A → `06_IG`」、「樣式 A → `07_FB POST`」、「樣式 A → `08_SPX TVBN_1`」、「樣式 A → `09_SPX TVBN_2`」、「樣式 A → `10_POP UP`」、「樣式 A → `11_Line OA`」、「樣式 A → `12_LPBN`」、「樣式 A → `13_Skinny BN_APP`」、「樣式 A → `14_Skinny BN_PC`」、「樣式 A → `15_AR`」與「樣式 A → `16_副區`」。後續版位仍須由 Jamie 逐一確認，不因 A－01～16 完成而預填或製作其他版位。

## 3. 既有 Locked 架構

- FSS BN 是 FSS 下的一個 Generator。
- 樣式 A／B／C／D 是同一個 BN Generator 內部的 Type；使用者 UI 顯示「樣式」，內部仍維持 Type 與 `currentType` 概念。
- A／B／C／D 共用同一組固定 17 個 BN Templates 與 Generator 主流程。
- 各 Type 可以使用自己的正式底圖及真正存在的差異，但不得因此拆成四個 Generator、四套控制台、四套完整流程或四組 17 Templates。
- 本輪「逐樣式、逐版位」只代表正式 Template 的開發與驗證順序，不改變共用 Template 系統。
- `bn/launch/` 只作為指定 Type 與 BN 版位的正式 Template 開發／視覺驗證入口，不是第二套 Generator 或第二套 Template 系統，也不得成為 A／B／C／D 各自獨立的正式 Template 實作或 68 份互相複製的正式 Layout 程式。
- 第一輪已完成並 PASS 的樣式選擇頁、控制台、Editor、runtime Workspace 與 banwords 行為必須保留，不得藉本輪重新設計或重構。
- FSS 入口平台 Locked Architecture Contract 維持不變。

## 4. 正式 Templates 共通開發原則

- 正式 BN Templates 採「逐樣式、逐版位確認與製作」，但 Requirement 只維護本文件一份。
- 每個新 BN 版位仍依 `docs/開發流程.md` 經過需求確認、更新本文件、必要 Investigation、Proposal、Coding、AI 自我驗證與 Jamie 手動驗證 PASS。
- 不得機械式重複已調查並實作驗證 PASS 的共通知識。若 Launch 架構、WOFF2 載入、Template 基礎方式或對位驗證方式已在 A－01 完成驗證，後續版位只調查真正新增或不同的部分。
- 上述原則不改變正式 Phase 順序，只避免重複無意義的調查。
- 未經 Jamie 確認的樣式／版位不得預填 Requirement、空章節、TODO、placeholder 或規格表格。

目前已完成的正式 Template 為「樣式 A → `01_DDcard BN`」、「樣式 A → `02_MALL HBN`」、「樣式 A → `03_Coin page BN`」、「樣式 A → `04_Loyalty BN`」、「樣式 A → `05_MSBN`」、「樣式 A → `06_IG`」、「樣式 A → `07_FB POST`」、「樣式 A → `08_SPX TVBN_1`」、「樣式 A → `09_SPX TVBN_2`」、「樣式 A → `10_POP UP`」、「樣式 A → `11_Line OA`」、「樣式 A → `12_LPBN`」、「樣式 A → `13_Skinny BN_APP`」、「樣式 A → `14_Skinny BN_PC`」、「樣式 A → `15_AR`」與「樣式 A → `16_副區`」。後續 Scope 仍由 Jamie 逐一確認。

## 5. 正式版位 Requirement

### 5.1 樣式 A

#### 5.1.1 `01_DDcard BN`

##### 5.1.1.1 正式版位規格

| 項目 | 正式需求 |
|---|---|
| 正式名稱 | `01_DDcard BN` |
| 樣式／內部 Type | 樣式 A／Type A |
| 分類 | 主視覺 Resize |
| Canvas | 531 × 792px |
| 正式輸出格式 | JPG |
| 正式底圖 | `bn/assets/A/底圖/01_DDcard BN.jpg` |
| 正式對位圖 | `bn/assets/A/對位/01_DDcard BN.png` |
| Type 差異 | 使用 A 專用底圖；無額外 Type 文字；無額外 Logo |

本文件不定義未確認的 Resize 演算法、responsive 規則或 JPG Export 實作方式。

##### 5.1.1.2 主標需求

| 項目 | 正式需求 |
|---|---|
| 欄位 | 主標 |
| 既有字數限制 | 8 |
| 字型 | `ShopeeNotoSans(content)-Medium` |
| 字級 | 30pt；Canvas font-size 直接使用 `30pt` |
| 顏色 | `#ffffff` |
| 文字框 | `left: 90px; top: 141px; width: 351px; height: 37px` |
| 水平對齊 | 在文字框內置中 |
| 垂直對齊 | 在文字框內置中 |
| Opacity | 100% |

Photoshop 複製 CSS 曾出現的 `opacity: 0.302` 不採用；正式需求為 100% opacity。

##### 5.1.1.3 副標需求

| 項目 | 正式需求 |
|---|---|
| 欄位 | 副標 |
| 既有字數限制 | 7 |
| 主要文字字型 | `ShopeeNotoSans(content)-Bold` |
| 主要文字字級 | 45pt；Canvas font-size 直接使用 `45pt` |
| 顏色 | `#fff285` |
| 文字框 | `left: 43px; top: 192px; width: 445px; height: 57px` |
| 水平對齊 | 在文字框內置中 |
| 垂直對齊 | 在文字框內置中 |
| Opacity | 100% |

副標是一個完整文字內容；其中 `$`／`%` 依第 5.1.1.4 節使用特殊字級，其餘主要文字維持 45pt。

##### 5.1.1.4 `$`／`%` 特殊符號需求

副標內容中的 `$` 與 `%`：

- 屬於同一個副標內容的一部分，不是新增文字欄位。
- 字型為 `ShopeeNotoSans(content)-Bold`。
- 字級為 37pt；Canvas font-size 直接使用 `37pt`。
- 顏色為 `#fff285`。
- Opacity 為 100%。

目前正式資料沒有定義 45pt 主要文字與 37pt `$`／`%` 的精確 baseline／glyph 對齊規則。本文件不得自行補完；實際對位方式必須留待 Phase 2 依現有資產、正式對位圖、既有字型與可取得資訊調查及驗證。

##### 5.1.1.5 保護文字需求

| 項目 | 正式需求 |
|---|---|
| 欄位 | 保護文字 |
| 既有字數限制 | 17 |
| 字型 | `ShopeeNotoSans(content)-Medium` |
| 字級 | 18pt；Canvas font-size 直接使用 `18pt` |
| 顏色 | `#a6f4e6` |
| 文字框 | `left: 43px; top: 267px; width: 445px; height: 22px` |
| 水平對齊 | 在文字框內置中 |
| 垂直對齊 | 在文字框內置中 |
| Opacity | 100% |

Photoshop 複製 CSS 曾出現的 `opacity: 0.302` 不採用；正式需求為 100% opacity。

上述 A－01 正式字級均保留 Photoshop 原始設計單位，Canvas 2D `font` 的 font-size 必須直接使用 `30pt`、`45pt`、`37pt` 與 `18pt`。不得將其改寫為同數值的 `30px`、`45px`、`37px`、`18px`，也不得由專案程式人工換算為 `40px`、`60px`、`49.33px`、`24px`。Canvas 531 × 792px 與三個文字框的 px 尺寸及座標維持不變。

##### 5.1.1.6 Photoshop CSS 資料邊界

三個文字框的 `left`、`top`、`width` 與 `height` 來自 Photoshop 複製 CSS，並作為本輪正式版面位置需求。

Photoshop 資料中的 `z-index: 391`、`z-index: 392`、`z-index: 393` 是 Photoshop 圖層／匯出資訊，不是 Generator 必須使用的正式 z-index。Generator 的實際層級實作方式留待 Phase 2 Investigation 與 Phase 3 Proposal；不得因 Photoshop CSS 加入其他未確認行為。

##### 5.1.1.7 底圖與對位圖需求

###### 5.1.1.7.1 正式底圖

- A－01 必須使用 `bn/assets/A/底圖/01_DDcard BN.jpg`。
- 該底圖是樣式 A 專用正式底圖。
- 不得以樣式選擇卡片圖片或其他 placeholder 代替正式底圖。
- 樣式 A 沒有額外 Type 文字或 Logo。

###### 5.1.1.7.2 正式對位圖

`bn/assets/A/對位/01_DDcard BN.png` 是 A－01 正式視覺驗證依據。後續實作必須能以它驗證：

- 三個文字框的位置。
- 文字在框內水平與垂直置中的結果。
- 字型與字重。
- 字級。
- 顏色。
- 整體視覺對位。

本階段不指定測試工具、Pixel Diff 或其他具體驗證實作。

##### 5.1.1.8 既有 Editor／Workspace 邊界

第一輪控制台已具有 A－01 的下列 Editor 欄位：

- 主標。
- 副標。
- 保護文字。

下列行為已完成並 PASS，且維持 Locked：

- 合法文字即時同步至 Preview。
- IME-safe。
- 既有字數限制：主標 8、副標 7、保護文字 17。
- 字數計算：ASCII 為 0.5，非 ASCII 為 1。
- 超限時拒絕候選結果，並保留上一個合法值及 Workspace／Preview 原值。
- `banwords.xlsx` 衍生的既有 banwords 行為。
- 欄位下方 inline banwords message。

本輪不修改既有 Editor、Workspace 或控制台，不要求既有 Editor 即時驅動正式 A－01 Template，也不得將此項列為本輪完成標準。既有控制台 placeholder Preview 可以維持目前狀態。

後續進行正式控制台整合時，應沿用上述既有 Editor 行為，不得重新設計 Editor、建立另一套文字驗證流程、修改 banwords 或改變既有字數限制。該整合屬後續獨立開發階段，本文件不預先設計。

Launch 視覺驗證使用第 5.1.1.9 節已確認的預設測試文字與最小文字輸入，不得因此建立第二套完整正式 Editor。既有 runtime Workspace 仍只作為第一輪控制台的暫時文字狀態，本輪不定義或製作正式 Workspace JSON Schema、序列化或 Restore。

##### 5.1.1.9 正式 Template／Launch 查看需求

本輪後續實作完成時，Jamie 必須能透過 `bn/launch/A/` 中 A－01 的對應入口，直接查看樣式 A 的正式 `01_DDcard BN` Template，並確認：

- 531 × 792px 的 A－01 正式版位。
- A－01 正式底圖。
- 依第 5.1.1.2 節呈現的正式主標。
- 依第 5.1.1.3、5.1.1.4 節呈現的正式副標及 `$`／`%` 特殊字級。
- 依第 5.1.1.5 節呈現的正式保護文字。
- 三個文字框的正式尺寸、位置、水平置中與垂直置中結果。
- 全部已確認的字型、字重、字級、顏色與 100% opacity。

A－01 Launch 預設測試文字固定為：

| 欄位 | 預設測試文字 |
|---|---|
| 主標 | `商城優選無限免運` |
| 副標 | `宅配免運$490起` |
| 保護文字 | `免運優惠須依店家適用之物流為主` |

上述文字來自 Jamie 已提供的 A－01 正式視覺參考，不得自行替換為其他預設文案。預設副標已包含 `$`，必須能直接校稿 45pt 主要文字、37pt `$`、整組水平置中與 baseline／glyph 視覺結果。Jamie 可以暫時輸入包含 `%` 的其他合法副標，以校稿 37pt `%`；該臨時測試內容不得寫回本文件或取代正式預設文案。

A－01 Launch 必須提供主標、副標及保護文字三個最小文字輸入欄位。Jamie 修改任一合法測試文字後，正式 A－01 Canvas 必須即時更新。Launch 文字輸入只能改變測試內容，不得修改字型、字重、字級、顏色、位置、文字框寬高、對齊、opacity 或其他 Template Locked 樣式。

Launch 測試文字必須遵守既有字數限制：主標 8、副標 7、保護文字 17；字數仍以 ASCII 0.5、非 ASCII 1 計算。只有符合限制的測試文字可以成為 Canvas 顯示狀態，不得另建不同的字數規則。Launch 不加入 banwords UI 或 inline banwords message。

Launch 必須提供「顯示／隱藏對位圖」開關。開啟時，`bn/assets/A/對位/01_DDcard BN.png` 必須以原始 531 × 792px、與正式 Canvas 相同的座標系統，1:1 疊加於 Template 上方；不得 Resize、位移、重新生成或修改圖片內容。對位圖必須使用 PNG 本身既有 Alpha／透明度，不得另套 CSS `opacity`、Canvas `globalAlpha`、透明度 Slider 或自動淡化。關閉時必須完全隱藏對位圖。

對位圖開關只屬於 `bn/launch/` 開發／視覺校稿頁，不得加入正式 Template、BN 控制台、Editor、Workspace 或 Export 成品；正式 BN Template 與輸出內容不得包含對位遮罩。

本輪先完成 A－01 正式 Template，並透過獨立 Launch 入口直接查看、與正式對位圖比較、進行視覺調整及交由 Jamie 確認。本輪不要求把 A－01 正式 Template 接入既有 BN 控制台；控制台不修改、不重構、不重新設計，placeholder Preview 可以繼續維持目前狀態。正式 Templates 接入控制台留到後續獨立開發階段，本文件不預先設計該整合階段。

##### 5.1.1.10 正式落地與驗證狀態

A－01 是第一個已完成的正式 BN Template。Jamie 已完成 Safari／Chrome 手動視覺驗證並回覆 PASS；Code Commit 為 `38dc62303277e4d0c301ef46b22740ad4675a114`（`feat(bn): add A01 DDcard template`）。

正式落地項目為：

- Template renderer：`bn/templates/A/01-ddcard-bn.js`。
- 共用 Launch Viewer：`bn/launch/viewer.html`；目前支援 A－01～16。
- A－01 直接啟動入口：`bn/launch/A/01_DDcard BN.command`。
- 正式底圖：`bn/assets/A/底圖/01_DDcard BN.jpg`。
- 正式對位圖：`bn/assets/A/對位/01_DDcard BN.png`。

正式 Canvas 仍為 531 × 792px，三個 Locked 文字框及其 px 座標、水平／垂直置中、顏色與 100% opacity 均未改變。Renderer 直接使用 Photoshop 原始字級單位：主標 Medium 30pt、副標 Bold 45pt、`$`／`%` Bold 37pt、保護文字 Medium 18pt；沒有將 pt 同數值寫成 px，也沒有建立人工 `pt → px` 換算規則。

為縮小 Browser Canvas 與 Photoshop rasterization 的 Medium 視覺差異，主標與保護文字只在 renderer 內以 2× local temporary Canvas rasterization，再高品質縮回正式尺寸並回繪正式 Canvas。此調整不改 Medium 字型、30pt／18pt、顏色、opacity、文字框或座標；不套用 UA／瀏覽器分支或 `textRendering = "geometricPrecision"`，也不影響副標、`$`／`%`、正式底圖或其他內容。Chromium／Chrome 路線與 Safari 的實際 Canvas 輸出均已通過 Jamie 視覺確認，主標與保護文字的粗度／銳利度比未調整版本更接近 Photoshop 完成參考圖，且未見明顯跨瀏覽器字重差異或副標等其他內容 regression。

A－01 `.command` 可由 Jamie 直接雙擊，不必先手動啟動根目錄 `啟動 FSS.command`；它會確認或啟動 `127.0.0.1:4173` 並開啟共用 Viewer 的 A－01 route。正確服務已存在時沿用，若該 port 是不相符的服務則停止並提示，不自行改 port，也不終止既有程序。Launch Viewer 提供三欄測試文字即時編輯、IME-safe、ASCII 0.5／非 ASCII 1 計數、超限 rollback，以及正式對位圖顯示／隱藏；A－02～12 亦沿用這些共用薄校稿能力。

既有 BN 控制台仍維持 placeholder Preview，尚未接入 A－01～16 正式 Template。A－17 與 B／C／D 均未製作；目前的 Type A 路徑與 Viewer 實作不預先決定其他 Type 的 Template 共用方式，也不建立 Registry、Framework 或未經確認的抽象化。

#### 5.1.2 `02_MALL HBN`

##### 5.1.2.1 正式版位規格

| 項目 | 正式需求 |
|---|---|
| 正式名稱 | `02_MALL HBN` |
| 樣式／內部 Type | 樣式 A／Type A |
| 分類 | 主視覺 Resize |
| Canvas | 1200 × 360px |
| 正式 renderer | `bn/templates/A/02-mall-hbn.js` |
| 共用 Viewer | `bn/launch/viewer.html` |
| 直接 Launch | `bn/launch/A/02_MALL HBN.command` |
| 正式底圖 | `bn/assets/A/底圖/02_MALL HBN.jpg` |
| 正式對位圖 | `bn/assets/A/對位/02_MALL HBN.png` |

正式底圖是有效的 1200 × 360 JPEG，必須在正式 1200 × 360 Canvas 以 1:1、100% opacity 直接繪製。正式對位圖是具有原始部分透明 Alpha 的 1200 × 360 RGBA PNG，只供 Launch 視覺校稿。

##### 5.1.2.2 文字需求

| 欄位 | 字型／字重 | 字級 | 顏色 | 正式文字框 | 對齊 | 字數上限 |
|---|---|---|---|---|---|---|
| 主標 | `ShopeeNotoSans(content)-Medium` | 30pt | `#ffffff` | `left: 98px; top: 153px; width: 351px; height: 37px` | 靠左；不水平置中、不垂直置中 | 8 |
| 副標一般文字 | `ShopeeNotoSans(content)-Bold` | 45pt | `#fff285` | `left: 98px; top: 200px; width: 445px; height: 57px` | 靠左；不水平置中、不垂直置中 | 7 |
| 副標 `$`／`%` | `ShopeeNotoSans(content)-Bold` | 37pt | `#fff285` | 同一副標文字框 | 同一副標內容內的 mixed runs | 同副標欄位 |
| 保護文字 | `ShopeeNotoSans(content)-Medium` | 18pt | `#a6f4e6` | `left: 98px; top: 273px; width: 445px; height: 22px` | 靠左；不水平置中、不垂直置中 | 17 |

副標中的 `$`／`%` 是同一副標欄位內容的一部分，不是獨立 Editor 欄位。一般文字維持 Bold 45pt，只有 `$`／`%` 使用 Bold 37pt；mixed runs 的 baseline／glyph 對位已經正式對位圖與 Jamie 視覺驗證 PASS。

三欄文字均為 100% opacity。字數算法沿用 BN Locked 規格：ASCII = 0.5、非 ASCII = 1。Photoshop 字級直接作為 Canvas 2D `font` 的 font-size，使用 `30pt`、`45pt`、`37pt`、`18pt`；不得改成同數值 px，也不得建立人工 `pt → px` 換算規則。

##### 5.1.2.3 `left` 座標正式更正

最初 Jamie 提供的 Photoshop CSS 曾顯示三個文字框皆為 `left: 693px`。Phase 5 實際驗證時，該值與正式對位 PNG 及 Photoshop 完成參考圖衝突。正式對位 PNG 的三個框為：

- 主標：`(98,153)–(449,190)`，即 351 × 37px。
- 副標：`(98,200)–(543,257)`，即 445 × 57px。
- 保護文字：`(98,273)–(543,295)`，即 445 × 22px。

三個框的 `top`、`width`、`height` 均與原規格完全吻合，只有 `left` 不一致。Jamie 明確批准後，A－02 三個文字框的正式 Locked `left` 均更正為 `98px`；`693px` 只屬已更正的原始誤植，不得再作為 A－02 正式座標。

##### 5.1.2.4 A－02 local Medium 2× 視覺修正

A－02 正常 1× Browser Canvas 驗證時，Medium 30pt 主標與 Medium 18pt 保護文字相較 Photoshop 完成圖肉眼偏粗／偏糊。經獨立 Visual Tuning Investigation 比較後，確認與 A－01 已 PASS 的 Medium rasterization 問題屬同類。

A－02 renderer 最終採用版位內 local `MEDIUM_RENDER_SCALE = 2`：只將主標 Medium 30pt 與保護文字 Medium 18pt 繪製至 2× temporary Canvas，再以 high-quality smoothing 縮回正式 1200 × 360 Canvas。正式 pt、`left`、`top`、文字框、actual bounding metrics、baseline、advance width、glyph geometry、顏色與 opacity 均保持不變。

下列內容不進入 temporary Medium layer，仍直接在正式 Canvas 以 1× 繪製：

- 正式底圖：1:1 直接 render。
- 副標一般文字：Bold 45pt。
- 副標 `$`／`%`：Bold 37pt。

這是 A－02 經實際 Investigation 與 Jamie 驗證後採用的版位特定 workaround。雖然方法與 A－01 同型，仍不得升級為所有 BN、所有 Medium 或其他 Type 的全域規則；後續版位必須先正常 render，只有實際出現同類問題並完成 Investigation 後才能採用。

##### 5.1.2.5 Launch／Viewer

A－02 使用共用薄校稿頁 `bn/launch/viewer.html`，route 為：

`viewer.html?type=A&bn=02_MALL%20HBN`

Viewer 仍是正式 Template 的最小校稿工具，不是第二套 Generator。A－02 Canvas、Preview 與 overlay 均為 1200 × 360；對位 PNG 使用原始 Alpha、相同原點及原尺寸 1:1 疊加，不額外設定 opacity、不 Resize、不位移，也不合成進正式 Canvas。

Viewer 沿用主標、副標、保護文字三個測試 input，支援合法內容即時更新、IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限與超限 rollback。A－02 `.command` 使用 `127.0.0.1:4173` 開啟上述 route，並維持 executable mode。

##### 5.1.2.6 正式落地與驗證狀態

A－02 已完成 Phase 5 AI 自我驗證，正式對位 PNG 位置、Chromium／Chrome 路線、`$`／`%` mixed runs 與 A－01 regression 均 PASS。Jamie 已完成 Chrome／Safari 手動驗證並回覆 PASS；Medium 30pt／18pt 經 A－02 local 2× 修正後的最終清晰度亦由 Jamie 確認 PASS。

Code Commit 為 `7fea431dbf1ea769ae383f51d2547ef083578545`（`feat(bn): add A02 MALL HBN template`）。Code Commit 前 `git diff --check` PASS。

#### 5.1.3 `03_Coin page BN`

##### 5.1.3.1 正式版位規格

| 項目 | 正式需求 |
|---|---|
| 正式名稱 | `03_Coin page BN` |
| 樣式／內部 Type | 樣式 A／Type A |
| 分類 | 主視覺 Resize |
| Canvas | 1200 × 391px |
| 正式 renderer | `bn/templates/A/03-coin-page-bn.js` |
| 共用 Viewer | `bn/launch/viewer.html` |
| 直接 Launch | `bn/launch/A/03_Coin page BN.command` |
| 正式底圖 | `bn/assets/A/底圖/03_Coin page BN.jpg` |
| 正式對位圖 | `bn/assets/A/對位/03_Coin page BN.png` |

正式底圖是 1200 × 391 JPEG，必須在正式 Canvas 以 1:1、100% opacity 直接繪製。正式對位圖是 1200 × 391 RGBA PNG，只供 Launch 視覺校稿。

##### 5.1.3.2 文字需求

| 欄位 | 字型／字重 | 字級 | 顏色 | 正式文字框 | 對齊 | 字數上限 |
|---|---|---|---|---|---|---|
| 主標 | `ShopeeNotoSans(content)-Medium` | 37pt | `#ffffff` | `left: 92px; top: 168px; width: 395px; height: 46px` | 靠左；不水平置中、不垂直置中 | 8 |
| 副標一般文字 | `ShopeeNotoSans(content)-Bold` | 50pt | `#fff285` | `left: 92px; top: 225px; width: 500px; height: 64px` | 靠左；不水平置中、不垂直置中 | 7 |
| 副標 `$`／`%` | `ShopeeNotoSans(content)-Bold` | 40pt | `#fff285` | 同一副標文字框 | 同一副標內容內的 mixed runs | 同副標欄位 |
| 保護文字 | `ShopeeNotoSans(content)-Medium` | 21pt | `#a6f4e6` | `left: 92px; top: 302px; width: 500px; height: 25px` | 靠左；不水平置中、不垂直置中 | 17 |

三個文字框共同以 `left: 92px` 為靠左基準。副標中的 `$`／`%` 是同一副標欄位的一部分，不是獨立 Editor 欄位。三欄文字均為 100% opacity；字數算法為 ASCII = 0.5、非 ASCII = 1。Canvas 2D `font` 直接使用 Photoshop 原始 `37pt`、`50pt`、`40pt`、`21pt`，不建立人工 `pt → px` 換算規則。

##### 5.1.3.3 `left` 座標正式更正

最初提供的 A－03 規格曾將三個文字框的 `left` 寫為 `192px`。Phase 5 以正式對位 PNG、Photoshop 完成圖及 Browser 1:1 overlay 驗證後，確認該值為誤植。正式對位 PNG 的三個框為：

- 主標：`(92,168)–(487,214)`，即 395 × 46px。
- 副標：`(92,225)–(592,289)`，即 500 × 64px。
- 保護文字：`(92,302)–(592,327)`，即 500 × 25px。

Jamie 已批准將 A－03 三個正式 Locked `left` 統一更正為 `92px`；`192px` 只屬已更正的原始誤植，不得再作為正式座標。

##### 5.1.3.4 A－03 local Medium 2× rendering

Jamie 在 A－03 Phase 3／Phase 4 前已明確批准從第一版正式 Coding 直接採用版位內 local `MEDIUM_RENDER_SCALE = 2`，不是 Phase 5 發現問題後才臨時加入。Renderer 建立 2400 × 782 temporary Canvas，只將 Medium 37pt 主標與 Medium 21pt 保護文字以 2× rasterization 繪製，再以 high-quality smoothing 縮回正式 1200 × 391 Canvas。

正式底圖、Bold 50pt 副標與 Bold 40pt `$`／`%` 均維持正式 1×。2× 不改變正式 pt、`left`／`top`、frame width／height、actual metrics、baseline、advance width、glyph geometry、顏色或 opacity。

這是 A－03 經批准並驗證 PASS 的版位特定 rendering 行為，不是所有 BN、所有 Medium、A－06～17 或 B／C／D 的共用／全域規則；後續版位不得自動套用。A－04、A－05 採用同型方法皆經各自獨立 Phase 2／3 判斷與 Jamie 批准，不是由 A－03 自動繼承。

##### 5.1.3.5 已接受的 Canvas metrics 差異

Phase 5 實測 Medium 21pt 保護文字 actual ink height 約為 26.124px，相對 Photoshop 25px frame 約多 1.124px。正式 frame 仍維持 `left: 92px; top: 302px; width: 500px; height: 25px`，沒有透過縮字、修改 `top`／`height`、baseline offset 或其他 workaround 改動。

Jamie 已使用 Chrome／Safari 完成實際肉眼驗證並接受此差異，A－03 正式 PASS；此項是已驗證接受的實際 Canvas metrics 差異，不是 unresolved blocker，也不把 frame height 改寫為 26.124px。

##### 5.1.3.6 Launch／Viewer

A－03 使用共用薄校稿頁 `bn/launch/viewer.html`。Route 為 `type=A&bn=03_Coin page BN`，URL encoded route 為：

`viewer.html?type=A&bn=03_Coin%20page%20BN`

Viewer 的 A－03 Canvas、Preview 與 overlay 均為 1200 × 391；對位 PNG 使用原始 Alpha、相同原點及原尺寸 1:1 疊加，不額外設定 opacity、不 Resize、不位移，也不合成進正式 Canvas。三個測試 input 沿用即時更新、IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限、超限 rollback 與 overlay toggle。

A－03 `.command` 沿用既有 `127.0.0.1:4173` Launch 流程，開啟上述 route，Git executable mode 為 `100755`。Viewer 仍是共用薄校稿工具，不是第二套 Generator；既有正式 BN 控制台尚未接入 A－01～16 renderer。

##### 5.1.3.7 正式落地與驗證狀態

A－03 Phase 5 AI 自我驗證 PASS；正式對位 PNG 1:1 overlay、三組 `left: 92px`、local 2× Medium 37pt／21pt 最終視覺、Bold 50pt 與 `$`／`%` Bold 40pt mixed runs、字數限制／rollback／IME-safe 行為及 Chromium／Chrome 路線均 PASS。A－01、A－02 regression PASS，Code Commit 前 `git diff --check` PASS。

Jamie 已完成 Chrome／Safari 手動驗證並回覆 PASS。Code Commit 為 `3093cc9736db6d59520043921a60932aaf13fd64`（`feat(bn): add A03 Coin page template`）。

#### 5.1.4 `04_Loyalty BN`

##### 5.1.4.1 正式版位規格

| 項目 | 正式需求 |
|---|---|
| 正式名稱 | `04_Loyalty BN` |
| 樣式／內部 Type | 樣式 A／Type A |
| 分類 | 主視覺 Resize |
| Canvas | 702 × 208px |
| 正式 renderer | `bn/templates/A/04-loyalty-bn.js` |
| 共用 Viewer | `bn/launch/viewer.html` |
| 直接 Launch | `bn/launch/A/04_Loyalty BN.command` |
| 正式底圖 | `bn/assets/A/底圖/04_Loyalty BN.png` |
| 正式對位圖 | `bn/assets/A/對位/04_Loyalty BN.png` |

正式底圖是 702 × 208 RGBA PNG，Alpha 為完全不透明；renderer 必須在正式 702 × 208 Canvas 以 1:1、100% opacity 直接繪製。正式對位圖是 702 × 208 RGBA PNG，保留其原始部分透明 Alpha，只供 Launch 視覺校稿。

##### 5.1.4.2 文字需求

| 欄位 | 字型／字重 | 字級 | 顏色 | 正式 runtime frame | 對齊 | 字數上限 |
|---|---|---|---|---|---|---|
| 主標 | `ShopeeNotoSans(content)-Medium` | 24pt | `#ffffff` | `left: 32px; top: 52px; width: 245px; height: 30px` | 靠左；不水平置中、不垂直置中 | 8 |
| 副標一般文字 | `ShopeeNotoSans(content)-Bold` | 35pt | `#fff285` | `left: 32px; top: 88px; width: 350px; height: 45px` | 靠左；不水平置中、不垂直置中 | 7 |
| 副標 `$`／`%` | `ShopeeNotoSans(content)-Bold` | 30pt | `#fff285` | 同一副標文字框 | 同一副標內容內的 mixed runs | 同副標欄位 |
| 保護文字 | `ShopeeNotoSans(content)-Medium` | 12pt | `#a6f4e6` | `left: 32px; top: 139px; width: 350px; height: 16px` | 靠左；不水平置中、不垂直置中 | 17 |

三個文字框共同以 `left: 32px` 為靠左基準。副標中的 `$`／`%` 是同一副標欄位的一部分，不是獨立 Editor 欄位。三欄文字均為 100% opacity；字數算法為 ASCII = 0.5、非 ASCII = 1。Canvas 2D `font` 直接使用 Photoshop 原始 `24pt`、`35pt`、`30pt`、`12pt`，不建立人工 `pt → px` 換算規則。

##### 5.1.4.3 Photoshop 工作區座標與 runtime local frame

Jamie 最初提供的 Photoshop 工作區文字框為：

- 主標：`834,139,245,30`。
- 副標：`834,175,350,45`。
- 保護文字：`834,226,350,16`。

上述座標屬於較大的 Photoshop 工作區，不是 702 × 208 runtime Canvas 座標。Phase 2 依正式對位 PNG 的 Alpha component 實測出三個 local frame 為 `(32,52)–(277,82)`、`(32,88)–(382,133)`、`(32,139)–(382,155)`；其 width／height 與 Photoshop 規格精確一致，且三組均符合一致轉換：

- `xLocal = xPhotoshop - 802`
- `yLocal = yPhotoshop - 87`

因此 A－04 正式 runtime `left` 為 `32px`，不是 `834px`；正式 runtime frame 只採第 5.1.4.2 節記錄的 local 座標。

##### 5.1.4.4 A－04 local Medium 2× rendering

Jamie 在 A－04 Phase 3／Phase 4 第一版 Coding 前已批准採用版位內 local `MEDIUM_RENDER_SCALE = 2`。Renderer 建立 1404 × 416 transparent temporary Canvas，只將 Medium 24pt 主標與 Medium 12pt 保護文字以 `scale(2, 2)` rasterize，再以 `imageSmoothingEnabled = true`、`imageSmoothingQuality = "high"` 縮回正式 702 × 208 Canvas。

正式底圖、Bold 35pt 副標與 Bold 30pt `$`／`%` 均維持正式 1×。2× 不改變正式 pt、frame、座標、actual metrics、baseline、advance width、glyph geometry、顏色或 opacity。

這是 A－04 經獨立 Phase 2 Investigation、Phase 3 Proposal、Jamie 批准及實際驗證 PASS 的版位特定 rendering 行為。不得將它升級成所有 BN、所有 Medium、A－06～17 或 B／C／D 的 shared／global 規則，亦不得因此建立 shared/common/base renderer。A－05 採同型方法是經其自身 Phase 2／3 決策與 Jamie 批准，不是自動套用 A－04。

##### 5.1.4.5 Renderer 定位與 frame validation

A－04 renderer 使用 `measureText()` 的 `actualBoundingBoxLeft`、`actualBoundingBoxRight`、`actualBoundingBoxAscent` 與 `actualBoundingBoxDescent`，將實際 ink left／top 對應到正式 frame 的 `left`／`top`，並回傳 ink width、height、right、bottom、`fitsWidth` 與 `fitsHeight` validation。

正式 compositing 使用 `globalAlpha = 1` 與 `source-over`，順序為正式底圖 1×、local 2× Medium transparent layer 縮回合成、Bold mixed subtitle 1×。Renderer 不使用水平／垂直置中、固定 offset、自動縮字、換行、裁切、字距補償或 scale-to-fit。

##### 5.1.4.6 Launch／Viewer

A－04 使用共用薄校稿頁 `bn/launch/viewer.html`，URL encoded route 為：

`viewer.html?type=A&bn=04_Loyalty%20BN`

Viewer 的 Canvas、Preview 與 overlay 均為 702 × 208。正式對位 PNG 使用原始 Alpha、相同原點及原尺寸 1:1 疊加，CSS opacity 為 1，不 Resize、不位移，也不合成進正式 Canvas。

Viewer 沿用主標、副標、保護文字三個測試 input、合法內容即時 render、IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限、超限 rollback 與 overlay toggle。

A－04 `.command` 使用 `127.0.0.1:4173` 開啟上述 route，固定使用 port 4173。正確 Viewer service 已存在時沿用；不相符的外部 service 占用 port 時停止提示，不自行換 port、不 kill 外部 process，且只停止自己啟動的 server。Code Commit 中 `.command` Git mode 為 `100755`。

##### 5.1.4.7 正式落地與驗證狀態

A－04 Phase 5 AI 自我驗證 PASS；正式對位 PNG 原始 Alpha 1:1 overlay、Chromium／Chrome 路線、Medium 24pt／12pt 最終粗細與銳利度、Bold 35pt 與 `$`／`%` Bold 30pt mixed runs、三欄輸入限制與 rollback，以及 A－01～03 regression 均 PASS。Jamie 已完成 Chrome／Safari 手動驗證並明確回覆 PASS。Code Commit 前及 `git diff --check HEAD^ HEAD` 均 PASS。

Code Commit 為 `2ff78e993a714ef420229f6816fe078bdbe43677`（`feat(bn): add A04 Loyalty BN template`），精確包含：

- `bn/templates/A/04-loyalty-bn.js`
- `bn/launch/viewer.html`
- `bn/launch/A/04_Loyalty BN.command`
- `bn/assets/A/底圖/04_Loyalty BN.png`
- `bn/assets/A/對位/04_Loyalty BN.png`

#### 5.1.5 `05_MSBN`

##### 5.1.5.1 正式版位規格

| 項目 | 正式需求 |
|---|---|
| 正式名稱 | `05_MSBN` |
| 樣式／內部 Type | 樣式 A／Type A |
| 分類 | 主視覺 Resize |
| Canvas | 1200 × 400px transparent Canvas |
| 正式 renderer | `bn/templates/A/05-msbn.js` |
| 共用 Viewer | `bn/launch/viewer.html` |
| 直接 Launch | `bn/launch/A/05_MSBN.command` |
| 正式底圖 | `bn/assets/A/底圖/05_MSBN.png`，intrinsic 1200 × 360px |
| 正式對位圖 | `bn/assets/A/對位/05_MSBN.png`，1200 × 400px |

A－05 使用版位特定 dimension guard：正式 Canvas 必須精確為 1200 × 400，正式底圖 intrinsic dimensions 必須精確為 1200 × 360。Renderer 將底圖以原尺寸 `x: 0px; y: 20px; width: 1200px; height: 360px` 1:1 繪製，上下各保留 20px transparent 區域；不 Resize、不 Stretch、不 Scale-to-fit、不補邊，也不修改正式圖片。A－05 不使用「底圖 intrinsic dimensions 必須等於 Canvas dimensions」的 guard。

正式對位圖為 1200 × 400 RGBA PNG，只供 Viewer 校稿；Viewer 使用原始 Alpha、相同原點及原尺寸 1:1 疊加，不合成進正式 Canvas。

##### 5.1.5.2 文字需求

| 欄位 | 字型／字重 | 字級 | 顏色 | 正式 runtime frame | 對齊 | 字數上限 |
|---|---|---|---|---|---|---|
| 主標 | `ShopeeNotoSans(content)-Medium` | 35pt | `#ffffff` | `left: 118px; top: 113px; width: 370px; height: 43px` | actual ink bbox 水平＋垂直置中 | 8 |
| 副標一般文字 | `ShopeeNotoSans(content)-Bold` | 37.5pt | `#007661` | `left: 96px; top: 173px; width: 414px; height: 75px` | mixed-run group 整組水平＋垂直置中 | 7 |
| 副標 `$`／`%` | `ShopeeNotoSans(content)-Bold` | 32pt | `#007661` | 同一副標文字框 | 同一 mixed-run group | 同副標欄位 |
| 保護文字 | `ShopeeNotoSans(content)-Medium` | 19pt | `#a6f4e6` | `left: 96px; top: 266px; width: 414px; height: 23px` | actual ink bbox 水平＋垂直置中 | 17 |

三組文字均為 100% opacity。主標與保護文字依 `actualBoundingBoxLeft`、`actualBoundingBoxRight`、`actualBoundingBoxAscent`、`actualBoundingBoxDescent` 計算完整 ink bbox，再於各自正式 frame 中水平及垂直置中。副標 ordinary text 與 `$`／`%` 先拆成連續 runs、組成同一完整 mixed-run group，再依合併後的 actual ink bbox 將整組置中於 `96,173,414,75`；`$`／`%` 不是獨立 Editor 欄位，也不各自置中。

字數算法為 ASCII = 0.5、非 ASCII = 1。Canvas 2D `font` 直接使用 Photoshop 原始 `35pt`、`37.5pt`、`32pt`、`19pt`，不建立人工 `pt → px` 換算規則。

##### 5.1.5.3 Photoshop 工作區座標與 runtime local frame

Jamie 最初提供的 Photoshop 工作區文字框為：

- 主標：`412,121,370,43`。
- 副標：`390,181,414,75`。
- 保護文字：`390,274,414,23`。

上述值不是正式 1200 × 400 runtime Canvas 座標。Phase 2 依正式對位 PNG 實測並經 Jamie 批准，確認一致轉換為：

- `xLocal = xPhotoshop - 294`
- `yLocal = yPhotoshop - 8`

因此正式 runtime frame 只使用主標 `118,113,370,43`、副標 `96,173,414,75`、保護文字 `96,266,414,23`；Photoshop 工作區原始座標不得作為 renderer frame。

##### 5.1.5.4 A－05 local Medium 2× rendering

A－05 經 Phase 2 Investigation、Phase 3 Proposal 與 Jamie 批准，從第一版正式 Coding 採版位內 local `MEDIUM_RENDER_SCALE = 2`。Renderer 建立 2400 × 800 transparent temporary Canvas，只將 Medium 35pt 主標與 Medium 19pt 保護文字以 `scale(2, 2)` 及相同正式 frame／actual metrics／baseline 邏輯繪製，再以 `imageSmoothingEnabled = true`、`imageSmoothingQuality = "high"` 縮回正式 1200 × 400 Canvas。

正式 1200 × 360 底圖、Bold 37.5pt ordinary subtitle 與 Bold 32pt `$`／`%` 均維持正式 1×。2× 不改變正式 pt、frame、座標、metrics、baseline、advance width、glyph geometry、顏色或 opacity。

這是 A－05 經自身調查、批准及 Chrome／Safari 驗證 PASS 的版位特定 rendering 行為，不得升級成所有 BN、所有 Medium、A－06～17 或 B／C／D 的 shared／global 規則，亦不得因此建立 shared/common/base renderer。

##### 5.1.5.5 Renderer validation 與已接受的 subpixel metrics

Renderer 使用 actual bounding metrics 計算三組文字完整 ink bbox，並回傳 ink width、height、right、bottom、`fitsWidth` 與 `fitsHeight`。正式 compositing 使用 `globalAlpha = 1` 與 `source-over`，順序為 1200 × 360 底圖在 `0,20` 以 1× 繪製、local 2× Medium transparent layer 縮回合成、Bold mixed subtitle 1×。

Renderer 不使用固定 offset、自動縮字、換行、裁切、字距補償或 scale-to-fit。Phase 5 實測主標 actual ink height 約比 43px frame 多 0.487px，保護文字 actual ink height 約比 23px frame 多 0.633px；沒有因此修改字級、frame、baseline、scale、2× 或加入其他 workaround。Jamie 已在 Chrome／Safari 肉眼驗證接受並正式 PASS，因此兩項均屬已驗證接受的 subpixel Canvas metrics 差異，不是 unresolved blocker，正式 frame height 仍為 43px 與 23px。

##### 5.1.5.6 Launch／Viewer

A－05 使用共用薄校稿頁 `bn/launch/viewer.html`，route 為：

`viewer.html?type=A&bn=05_MSBN`

Viewer 的 Canvas、Preview 與 overlay 均為 1200 × 400。正式對位 PNG 使用原始 Alpha、相同原點及原尺寸 1:1 疊加，不另加 opacity、不 Resize、不位移，也不合成進正式 Canvas。

Viewer 沿用三個測試 input、合法內容即時 render、IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限、超限 rollback 與 overlay toggle。A－05 `.command` 固定使用 `127.0.0.1:4173` 開啟上述 route；正確 Viewer service 已存在時沿用，不相符的外部 service 占用 port 時停止提示，不換 port、不 kill 外部 process，且只停止自己啟動的 server。Code Commit 中 `.command` Git mode 為 `100755`。

##### 5.1.5.7 正式落地與驗證狀態

A－05 Phase 5 AI 自我驗證 PASS；正式底圖 `0,20,1200,360` placement、上下各 20px transparent 區域、正式對位 PNG 原始 Alpha 1:1 overlay、多組 `$`／`%` mixed runs、Chromium／Chrome 路線、三欄輸入限制與 rollback，以及 A－01～04 regression 均 PASS。Jamie 已完成 Chrome／Safari 手動驗證並明確回覆 PASS，亦接受第 5.1.5.5 節記錄的 subpixel metrics 差異。Code Commit 前及 `git diff --check HEAD^ HEAD` 均 PASS。

Code Commit 為 `f8eace3559eede0dd3fca83760a10062f6ed628e`（`feat(bn): add A05 MSBN template`），精確包含：

- `bn/templates/A/05-msbn.js`
- `bn/launch/viewer.html`
- `bn/launch/A/05_MSBN.command`
- `bn/assets/A/底圖/05_MSBN.png`
- `bn/assets/A/對位/05_MSBN.png`

#### 5.1.6 `06_IG`

##### 5.1.6.1 正式版位規格

| 項目 | 正式需求 |
|---|---|
| 正式名稱 | `06_IG` |
| 樣式／內部 Type | 樣式 A／Type A |
| 分類 | 主視覺 Resize |
| Canvas | 900 × 1600px |
| 正式 renderer | `bn/templates/A/06-ig.js` |
| 共用 Viewer | `bn/launch/viewer.html` |
| 直接 Launch | `bn/launch/A/06_IG.command` |
| 正式底圖 | `bn/assets/A/底圖/06_IG.jpg`，intrinsic 900 × 1600px |
| 正式對位圖 | `bn/assets/A/對位/06_IG.png`，900 × 1600px |

正式 JPEG 底圖只以 `x: 0px; y: 0px; width: 900px; height: 1600px` 原尺寸 1:1 繪製，不 Resize、不 Stretch、不 Crop、不補邊，也不 Scale-to-fit。正式對位 PNG 只供 Viewer 校稿，使用原始 Alpha、相同原點及 900 × 1600 原尺寸 1:1 疊加，CSS opacity 為 1，不合成進正式 Canvas。

##### 5.1.6.2 文字需求

| 欄位 | 字型／字重 | 字級 | 顏色 | 正式 runtime frame | 對齊 | 字數上限 |
|---|---|---|---|---|---|---|
| 主標 | `ShopeeNotoSans(content)-Medium` | 52.5pt | `#ffffff` | `left: 175px; top: 387px; width: 550px; height: 65px` | actual ink bbox 水平＋垂直置中 | 8 |
| 副標一般文字 | `ShopeeNotoSans(content)-Bold` | 65pt | `#fff285` | `left: 136px; top: 472px; width: 630px; height: 82px` | mixed-run group 整組水平＋垂直置中 | 7 |
| 副標 `$`／`%` | `ShopeeNotoSans(content)-Bold` | 55pt | `#fff285` | 同一副標文字框 | 同一 mixed-run group | 同副標欄位 |
| 保護文字 | `ShopeeNotoSans(content)-Medium` | 30pt | `#a6f4e6` | `left: 136px; top: 573px; width: 630px; height: 37px` | actual ink bbox 水平＋垂直置中 | 17 |

三組文字均為 100% opacity，依 `actualBoundingBoxLeft`、`actualBoundingBoxRight`、`actualBoundingBoxAscent`、`actualBoundingBoxDescent` 計算完整 ink bbox，再於各自正式 frame 中水平及垂直置中。Canvas 2D `font` 直接使用 Photoshop 原始 `52.5pt`、`65pt`、`55pt`、`30pt`，包含小數 `52.5pt`，不建立人工 `pt → px` 換算規則。

副標 ordinary text 與 `$`／`%` 依 advance width 排成連續 runs，symbols 沿用相鄰 ordinary glyph actual ink-bottom baseline 邏輯；所有 runs 合併為完整 actual ink bbox 後，才將整個 mixed-run group 水平及垂直置中於 `136,472,630,82`。`$`／`%` 不是獨立 Editor 欄位，不建立第四個 input，也不使用 fixed offset、字距補償、自動縮字或換行。

##### 5.1.6.3 Photoshop 工作區座標與 runtime local frame

A－06 原始 Photoshop 工作區 frame 為主標 `713,416,550,65`、副標 `674,501,630,82`、保護文字 `674,602,630,37`。Phase 2 依正式對位 PNG Alpha components 確認一致轉換：

- `xLocal = xPhotoshop - 538`
- `yLocal = yPhotoshop - 29`

因此 renderer 只使用正式 runtime local frame：主標 `175,387,550,65`、副標 `136,472,630,82`、保護文字 `136,573,630,37`；Photoshop 工作區原始座標不得作為 runtime frame。

##### 5.1.6.4 A－06 local Medium 2× rendering

A－06 經自身 Phase 2 Investigation、Phase 3 Proposal 與 Jamie 批准，從第一版正式 Coding 採版位內 local `MEDIUM_RENDER_SCALE = 2`。Renderer 建立 1800 × 3200 transparent temporary Canvas，context 使用 `scale(2, 2)`，只將 Medium 52.5pt 主標與 Medium 30pt 保護文字依相同正式 frame、actual metrics 及 baseline 邏輯繪製，再以 `imageSmoothingEnabled = true`、`imageSmoothingQuality = "high"` 縮回正式 900 × 1600 Canvas。

正式 JPEG 底圖、Bold 65pt ordinary subtitle 與 Bold 55pt `$`／`%` 均維持正式 1×。2× 不改變正式 pt、frame、座標、metrics、baseline、advance width、glyph geometry、顏色或 opacity。這是 A－06 經獨立調查、批准及 Chrome／Safari 驗證 PASS 的版位特定行為，不是所有 BN、所有 Type A、所有 Medium 或其他 Type 的 shared／global 規則，也不因此建立 shared helper 或 base renderer。

##### 5.1.6.5 Renderer validation 與 compositing

Renderer 使用 actual bounding metrics 計算三組完整 ink bbox，並回傳 ink width、height、right、bottom、`fitsWidth` 與 `fitsHeight`。正式 compositing 維持 `globalAlpha = 1` 與 `source-over`，順序為正式 JPEG 底圖 1×、local 2× Medium transparent layer 縮回合成、Bold mixed subtitle 1×。Renderer 不使用 fixed offset、字距補償、自動縮字、換行、裁切或 scale-to-fit。

##### 5.1.6.6 對位 PNG 額外 Alpha component

正式對位 PNG 除三個文字 frame 外，另有 `(161,282)–(741,364)`、尺寸 580 × 82 的 Alpha component。該 component 只屬正式 overlay 校稿內容，維持原圖不變；它不是第四個文字欄位，不建立第四個 input、Editor field 或 renderer layer。

##### 5.1.6.7 Launch／Viewer

A－06 使用共用薄校稿頁 `bn/launch/viewer.html`，route 為：

`viewer.html?type=A&bn=06_IG`

Viewer 的 Canvas、Preview 與 overlay 均為 900 × 1600，沿用三個測試 input、合法內容即時 render、IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限、超限 rollback、overlay toggle、dynamic dimensions，以及圖片 decode／intrinsic dimension guard。

A－06 `.command` 固定使用 `127.0.0.1:4173` 開啟上述 route。正確 Viewer service 已存在時沿用；遇到不相符的外部 service 占用 port 時停止提示，不換 port、不 kill 外部 process，且只停止自己啟動的 server。Code Commit 中 `.command` Git mode 為 `100755`。

##### 5.1.6.8 正式落地與驗證狀態

Codex Phase 5 完成 renderer／Viewer 語法、尺寸、frames、pt、顏色、2×／1× 分層、底圖 guard、mixed-run 結構、overlay dimensions／Alpha components、HTTP resources、Launch 語法與 mode、A－01～05 檔案 regression 及 whitespace 等當時環境可執行的靜態／模擬驗證。當時因 Chrome Browser 實例不可用，Codex 沒有宣稱已自動完成真實 Chrome Canvas、Console、overlay 或 font metrics 驗證。

之後 Jamie 已由 Finder 雙擊 A－06 `.command`，在 Chrome／Safari 完成最終實機手動驗證並明確回覆 PASS。因此 A－06 已完成並通過人工驗收，不是 unresolved blocker。

Code Commit 為 `ecd27603408c42c55113b2afbc3fbd14532dc969`（`feat(bn): add A06 IG template`），`git diff --check HEAD^ HEAD` PASS，精確包含：

- `bn/templates/A/06-ig.js`
- `bn/launch/viewer.html`
- `bn/launch/A/06_IG.command`（Git mode `100755`）
- `bn/assets/A/底圖/06_IG.jpg`
- `bn/assets/A/對位/06_IG.png`

#### 5.1.7 `07_FB POST`

##### 5.1.7.1 正式版位規格

| 項目 | 正式需求 |
|---|---|
| 正式名稱 | `07_FB POST` |
| 樣式／內部 Type | 樣式 A／Type A |
| 分類 | 主視覺 Resize |
| Canvas | 1200 × 630px |
| 正式 renderer | `bn/templates/A/07-fb-post.js` |
| 共用 Viewer | `bn/launch/viewer.html` |
| 直接 Launch | `bn/launch/A/07_FB POST.command` |
| 正式底圖 | `bn/assets/A/底圖/07_FB POST.jpg`，intrinsic 1200 × 630px |
| 正式對位圖 | `bn/assets/A/對位/07_FB POST.png`，1200 × 630px RGBA |

正式 JPEG 底圖只以 `x: 0px; y: 0px; width: 1200px; height: 630px` 原尺寸 1:1、正式 1× 繪製，不 Resize、不 Stretch、不 Crop、不補邊、不 Scale-to-fit，也不加入 placement offset。正式對位 PNG 只供 Viewer 校稿，使用原始 Alpha、相同原點及 1200 × 630 原尺寸 1:1 疊加，CSS opacity 為 1，不合成進正式 Canvas。

##### 5.1.7.2 文字需求與定位

| 欄位 | 字型／字重 | 字級 | 顏色 | 正式 runtime frame | 對齊 | 字數上限 |
|---|---|---|---|---|---|---|
| 主標 | `ShopeeNotoSans(content)-Medium` | 39pt | `#ffffff` | `left: 54px; top: 266px; width: 405px; height: 49px` | actual glyph ink 左緣靠左＋完整 ink bbox 垂直置中 | 8 |
| 副標一般文字 | `ShopeeNotoSans(content)-Bold` | 49pt | `#fff285` | `left: 54px; top: 325px; width: 475px; height: 62px` | mixed-run group actual ink 左緣靠左＋完整 bbox 垂直置中 | 7 |
| 副標 `$`／`%` | `ShopeeNotoSans(content)-Bold` | 41pt | `#fff285` | 同一副標文字框 | 同一 mixed-run group | 同副標欄位 |
| 保護文字 | `ShopeeNotoSans(content)-Medium` | 22.5pt | `#a6f4e6` | `left: 54px; top: 401px; width: 475px; height: 28px` | actual glyph ink 左緣靠左＋完整 ink bbox 垂直置中 | 17 |

三組文字均為 100% opacity，且不是水平置中。Renderer 依 `actualBoundingBoxLeft` 修正 draw origin，使實際 glyph ink 左緣對齊各自 `frame.left = 54px`；垂直方向使用 `actualBoundingBoxAscent`／`actualBoundingBoxDescent` 計算完整 actual ink bbox，再將完整 bbox 在各自 frame 中垂直置中。此規則不是單純 `textAlign: left`、固定 baseline、top-left positioning 或水平＋垂直置中。

Canvas 2D `font` 直接使用 Photoshop 原始 `39pt`、`49pt`、`41pt`、`22.5pt`，包含小數 `22.5pt`，不建立人工 `pt → px` 換算規則。

副標 ordinary text 與 `$`／`%` 先 token 化，ordinary 使用 Bold 49pt、symbols 使用 Bold 41pt，依 advance width 排成連續 mixed-run group。Symbols 沿用相鄰 ordinary glyph actual ink-bottom baseline 邏輯；所有 runs 合併為完整 actual ink bbox 後，使整組 actual ink 左緣對齊副標 frame.left，並將完整 bbox 垂直置中，再逐 run 繪製。`$`／`%` 不是獨立 Editor 欄位，不使用 fixed symbol offset、字距補償、自動縮字、換行或裁切。

##### 5.1.7.3 Photoshop 工作區座標與 runtime local frame

A－07 原始 Photoshop 工作區 frame 為主標 `718,605,405,49`、副標 `718,664,475,62`、保護文字 `718,740,475,28`。Phase 2 依正式對位 PNG Alpha components 確認一致轉換：

- `xLocal = xPhotoshop - 664`
- `yLocal = yPhotoshop - 339`

因此 renderer 只使用正式 runtime local frame：主標 `54,266,405,49`、副標 `54,325,475,62`、保護文字 `54,401,475,28`；Photoshop 工作區原始座標不得作為 runtime frame。

##### 5.1.7.4 A－07 local Medium 2× rendering

A－07 經自身 Phase 2 Investigation、Phase 3 Proposal 與 Jamie 批准，從第一版正式 Coding 採版位內 local `MEDIUM_RENDER_SCALE = 2`。Renderer 建立 2400 × 1260 transparent temporary Canvas，context 使用 `scale(2, 2)`，只將 Medium 39pt 主標與 Medium 22.5pt 保護文字依原始 pt、正式 runtime frames、actual ink 左緣靠左及完整 bbox 垂直置中邏輯繪製，再以 `imageSmoothingEnabled = true`、`imageSmoothingQuality = "high"` high-quality downsample 回正式 1200 × 630 Canvas。

正式 JPEG 底圖、Bold 49pt ordinary subtitle 與 Bold 41pt `$`／`%` 均維持正式 1×。2× 不改變正式 pt、frame、座標、metrics、baseline、advance width、glyph geometry、顏色或 opacity。這是 A－07 經獨立調查、批准及 Chrome／Safari 驗證 PASS 的版位特定 rendering 行為，不是所有 BN、所有 Medium 或其他 Type 的 shared／global 規則，也不因此建立 shared helper 或 base renderer。

##### 5.1.7.5 Renderer validation 與 compositing

Renderer 使用 actual bounding metrics 計算三組完整 ink bbox，並回傳 ink width、height、left、top、right、bottom、`fitsWidth` 與 `fitsHeight`。正式 compositing 維持 `globalAlpha = 1` 與 `source-over`，順序為正式 JPEG 底圖 1×、local 2× Medium transparent layer縮回合成、Bold mixed subtitle 1×。Renderer 不使用 fixed offset、字距補償、自動縮字、換行、裁切或 scale-to-fit。

##### 5.1.7.6 對位 PNG 額外 Alpha component

正式對位 PNG 除三個文字 frame 外，另有 `(54,201)–(419,253)`、尺寸 365 × 52 的 Alpha component。該 component 只屬正式 overlay 校稿內容，維持原圖不變；它不是第四個文字欄位，不建立第四個 input、Editor field、runtime frame 或 renderer layer。

##### 5.1.7.7 Launch／Viewer

A－07 使用共用薄校稿頁 `bn/launch/viewer.html`，route 為：

`viewer.html?type=A&bn=07_FB%20POST`

`URLSearchParams` 解碼後的 `bn` 值為 `07_FB POST`。Viewer 載入 `../templates/A/07-fb-post.js`；Canvas、Preview 與 overlay 均為 1200 × 630，底圖為 `../assets/A/底圖/07_FB POST.jpg`，對位圖為 `../assets/A/對位/07_FB POST.png`。正式對位圖使用原始 Alpha、同原點、原尺寸 1:1、CSS opacity 1 疊加，不合成進正式 Canvas。

Viewer 沿用三個測試 input、合法內容即時 render、IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限、超限 rollback、overlay toggle、dynamic dimensions，以及圖片 decode／intrinsic dimension guard。

A－07 `.command` 固定使用 `127.0.0.1:4173` 開啟上述 route。正確 Viewer service 已存在時沿用；遇到不相符的外部 service 占用 port 時停止提示，不換 port、不 kill 外部 process，且只停止自己啟動的 server。Filesystem permission 為 755，Code Commit 中 `.command` Git mode 為 `100755`。

##### 5.1.7.8 正式落地與驗證狀態

Codex Phase 5 完成 renderer／Viewer／Launch 語法、HTTP resources、圖片 dimensions／Alpha components、定位公式、local 2× 分層、mixed-run 結構與多組測試、frame-fit validation 結構、A－01～06 靜態 regression 及 `git diff --check` 等當時環境可執行的靜態／in-memory deterministic 模擬驗證。因受控 Chrome Browser extension／實例不可用，Codex 沒有取得或宣稱真實 Chrome Canvas actual font metrics、Console、overlay 視覺或 rasterization PASS；in-memory simulation 數值不是 ShopeeNotoSans Browser actual metrics。

之後 Jamie 已由 Finder 雙擊 A－07 `.command`，在 Chrome／Safari 完成真實視覺、文字定位、Medium 39pt／22.5pt 粗細與銳利度、Bold 49pt／41pt mixed baseline、`$`／`%`、Overlay、輸入限制／rollback、中文 IME、Console 與 A－01～06 regression 的人工驗證，並明確回覆 PASS。因此 A－07 已完成並通過人工驗收，不是 unresolved blocker。

Code Commit 是在 Jamie Chrome／Safari 手動 PASS 後建立，Hash 為 `0a0b2c5c3d6d0d54258718c60287c4fefd4a1a9e`（`feat(bn): add A07 FB POST template`），`git diff --check HEAD^ HEAD` PASS，精確包含：

- `bn/templates/A/07-fb-post.js`
- `bn/launch/viewer.html`
- `bn/launch/A/07_FB POST.command`（Git mode `100755`）
- `bn/assets/A/底圖/07_FB POST.jpg`
- `bn/assets/A/對位/07_FB POST.png`

#### 5.1.8 `08_SPX TVBN_1`

##### 5.1.8.1 正式版位規格

| 項目 | 正式需求 |
|---|---|
| 正式名稱 | `08_SPX TVBN_1` |
| 樣式／內部 Type | 樣式 A／Type A |
| 分類 | 主視覺 Resize |
| Canvas | 1080 × 1920px |
| 正式 renderer | `bn/templates/A/08-spx-tvbn-1.js` |
| 共用 Viewer | `bn/launch/viewer.html` |
| 直接 Launch | `bn/launch/A/08_SPX TVBN_1.command` |
| 正式底圖 | `bn/assets/A/底圖/08_SPX TVBN_1.jpg`，intrinsic 1080 × 1920px |
| 正式對位圖 | `bn/assets/A/對位/08_SPX TVBN_1.png`，1080 × 1920px RGBA |

正式 JPEG 底圖只以 `x: 0px; y: 0px; width: 1080px; height: 1920px` 原尺寸 1:1、正式 1× 繪製，不 Resize、不 Stretch、不 Crop、不補邊、不 Scale-to-fit，也不加入 placement offset。正式對位 PNG 只供 Viewer 校稿，使用原始 Alpha、相同原點及 1080 × 1920 原尺寸 1:1 疊加，CSS opacity 為 1，不合成進正式 Canvas。

##### 5.1.8.2 文字需求與定位

| 欄位 | 字型／字重 | 字級 | 顏色 | 正式 runtime frame | 對齊 | 字數上限 |
|---|---|---|---|---|---|---|
| 主標 | `ShopeeNotoSans(content)-Medium` | 70pt | `#ffffff` | `left: 167px; top: 507px; width: 745px; height: 87px` | 完整 actual ink bbox 水平＋垂直置中 | 8 |
| 副標一般文字 | `ShopeeNotoSans(content)-Bold` | 90pt | `#fff285` | `left: 94px; top: 619px; width: 890px; height: 114px` | mixed-run group 完整 actual ink bbox 水平＋垂直置中 | 7 |
| 副標 `$`／`%` | `ShopeeNotoSans(content)-Bold` | 75pt | `#fff285` | 同一副標文字框 | 同一 mixed-run group | 同副標欄位 |
| 保護文字 | `ShopeeNotoSans(content)-Medium` | 40pt | `#a6f4e6` | `left: 94px; top: 759px; width: 890px; height: 51px` | 完整 actual ink bbox 水平＋垂直置中 | 17 |

三組文字均為 100% opacity。Renderer 使用 `measureText()` 的 `actualBoundingBoxLeft`、`actualBoundingBoxRight`、`actualBoundingBoxAscent` 與 `actualBoundingBoxDescent` 計算完整 actual ink bbox，將完整 bbox 水平及垂直置中於正式 frame；不使用單純 `textAlign: center`、固定 baseline、top-left positioning 或 fixed offset 取代 actual ink 計算。

Canvas 2D `font` 直接使用 Photoshop 原始 `70pt`、`90pt`、`75pt` 與 `40pt`，不建立人工 `pt → px` 換算規則。

副標 ordinary text 與 `$`／`%` 先 token 化，ordinary 使用 Bold 90pt、symbols 使用 Bold 75pt，依 advance width 排成連續 mixed-run group。Symbols 使用相鄰 ordinary glyph actual ink-bottom baseline 邏輯；所有 runs 合併為完整 actual ink bbox 後，將整組水平＋垂直置中，再逐 run 繪製。`$`／`%` 不是獨立 Editor 欄位，不使用 fixed symbol offset、字距補償、自動縮字、換行或裁切。

##### 5.1.8.3 Photoshop 工作區座標與 runtime local frame

A－08 原始 Photoshop 工作區 frame 為主標 `1047,507,745,87`、副標 `974,619,890,114`、保護文字 `974,759,890,51`。Phase 2 依正式對位 PNG Alpha components 確認一致轉換：

- `xLocal = xPhotoshop - 880`
- `yLocal = yPhotoshop`

因此 renderer 只使用正式 runtime local frame：主標 `167,507,745,87`、副標 `94,619,890,114`、保護文字 `94,759,890,51`；Photoshop 工作區原始座標不得作為 runtime frame。

##### 5.1.8.4 A－08 local Medium 2× rendering

A－08 經自身 Phase 1／2、Phase 3 Proposal 與 Jamie 批准，從第一版正式 Coding 採版位內 local `MEDIUM_RENDER_SCALE = 2`。Renderer 建立 2160 × 3840 transparent temporary Canvas，context 使用 `scale(2, 2)`，只將 Medium 70pt 主標與 Medium 40pt 保護文字依原始 pt、正式 runtime frames 及相同完整 actual ink bbox 水平＋垂直置中邏輯繪製，再以 `imageSmoothingEnabled = true`、`imageSmoothingQuality = "high"` high-quality downsample 回正式 1080 × 1920 Canvas。

正式 JPEG 底圖、Bold 90pt ordinary subtitle 與 Bold 75pt `$`／`%` 均維持正式 1×。正式繪製順序是底圖 1×、transparent Medium layer 2× 縮回合成、Bold mixed subtitle 1×。2× 不改變正式 pt、frame、座標、metrics、baseline、advance width、glyph geometry、顏色或 opacity。這是 A－08 經獨立調查、批准及 Chrome／Safari 驗證 PASS 的版位特定 rendering 行為，不是所有 BN、所有 Medium 或其他 Type 的 shared／global 規則，也不因此建立 shared helper 或 base renderer。

##### 5.1.8.5 Renderer validation 與 compositing

Renderer 使用 actual bounding metrics 計算三組完整 ink bbox，並回傳 ink width、height、left、top、right、bottom、`fitsWidth` 與 `fitsHeight`。正式 compositing 維持 `globalAlpha = 1` 與 `source-over`。Renderer 不使用 fixed offset、字距補償、自動縮字、換行、裁切或 scale-to-fit。

##### 5.1.8.6 對位 PNG 額外 Alpha component 與已接受差異

正式對位 PNG 除三個文字 frame 外，另有 `(147,364)–(932,476)`、尺寸 785 × 112 的 Alpha component。該 component 只屬正式 overlay 校稿內容，維持原圖不變；它不是第四個文字欄位，不建立第四個 input、Editor field、runtime frame 或 renderer layer。

保護文字正式 frame 維持 `94,759,890,51`；正式對位 PNG 的高 Alpha component 為 `(94,760)–(984,810)`、尺寸 890 × 50。這個 1px 差異沒有被改寫成 frame、offset、baseline 或其他 workaround。Jamie 已在 Chrome／Safari 實際視覺驗證後接受並明確 PASS；它是已知且已接受的校稿差異，不是 unresolved blocker。

##### 5.1.8.7 Launch／Viewer

A－08 使用共用薄校稿頁 `bn/launch/viewer.html`，route 為：

`viewer.html?type=A&bn=08_SPX%20TVBN_1`

`URLSearchParams` 解碼後為 `type=A`、`bn=08_SPX TVBN_1`。Viewer 載入 `../templates/A/08-spx-tvbn-1.js`；Canvas、Preview 與 overlay 均為 1080 × 1920，底圖為 `../assets/A/底圖/08_SPX TVBN_1.jpg`，對位圖為 `../assets/A/對位/08_SPX TVBN_1.png`。正式對位圖使用原始 Alpha、同原點、原尺寸 1:1、CSS opacity 1 疊加，不合成進正式 Canvas。

Viewer 沿用三個測試 input、合法內容即時 render、IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限、超限 rollback、overlay toggle、dynamic dimensions，以及圖片 decode／intrinsic dimension guard。

A－08 `.command` 開啟 `http://127.0.0.1:4173/bn/launch/viewer.html?type=A&bn=08_SPX%20TVBN_1`。正確 Viewer service 已存在時沿用；遇到不相符的外部 service 占用固定 port 4173 時停止提示，不換 port、不 kill 外部 process，必要時使用 `/usr/bin/python3 -m http.server`，且只停止自己啟動的 server。Filesystem permission 為 755，Code Commit 中 Git executable mode 為 `100755`。

##### 5.1.8.8 正式落地與驗證狀態

Codex Phase 5 完成 renderer／Viewer／Launch 語法、HTTP resources、圖片 dimensions／Alpha components、定位公式、local 2× 分層、mixed-run 結構、frame-fit validation、deterministic mock、A－01～07 靜態 regression、whitespace 與 Git Scope 等當時環境可執行的靜態／模擬驗證。因 Chrome extension／native host 當時不可用，Codex 沒有取得或宣稱真實 Chrome Canvas ShopeeNotoSans font metrics、Console、overlay／Photoshop 視覺、Medium rasterization 或真實 mixed baseline PASS；mock metrics 不是 Browser actual font metrics。

之後 Jamie 已由 Finder 雙擊 A－08 `.command`，在 Chrome／Safari 完成真實 Canvas、overlay、文字定位、Medium 70pt／40pt 粗細與銳利度、Bold 90pt／75pt mixed baseline、不同位置的 `$`／`%`、已知 1px 對位差異、輸入限制／rollback、中文 IME、Console 與 A－01～07 regression 的人工驗證，並明確回覆 PASS。因此 A－08 已完成並通過人工驗收，不是 unresolved blocker。

Code Commit 是在 Jamie Chrome／Safari 手動 PASS 後建立，Hash 為 `feb2a5b38952b365f1c84daf768dd762f147316d`（`feat(bn): add A08 SPX TVBN 1 template`），`git diff --check HEAD^ HEAD` PASS，精確包含：

- `bn/templates/A/08-spx-tvbn-1.js`
- `bn/launch/viewer.html`
- `bn/launch/A/08_SPX TVBN_1.command`（Git mode `100755`）
- `bn/assets/A/底圖/08_SPX TVBN_1.jpg`
- `bn/assets/A/對位/08_SPX TVBN_1.png`

#### 5.1.9 `09_SPX TVBN_2`

##### 5.1.9.1 正式版位規格

| 項目 | 正式需求 |
|---|---|
| 正式名稱 | `09_SPX TVBN_2` |
| 樣式／內部 Type | 樣式 A／Type A |
| 分類 | 主視覺 Resize |
| Canvas | 1599 × 1080px |
| 正式 renderer | `bn/templates/A/09-spx-tvbn-2.js` |
| 共用 Viewer | `bn/launch/viewer.html` |
| 直接 Launch | `bn/launch/A/09_SPX TVBN_2.command` |
| 正式底圖 | `bn/assets/A/底圖/09_SPX TVBN_2.jpg`，intrinsic 1599 × 1080px |
| 正式對位圖 | `bn/assets/A/對位/09_SPX TVBN_2.png`，1599 × 1080px RGBA |

正式 JPEG 底圖只以 `x: 0px; y: 0px; width: 1599px; height: 1080px` 原尺寸 1:1、正式 1× 繪製，不 Resize、不 Stretch、不 Crop、不補邊、不 Scale-to-fit，也不加入 placement offset。正式對位 PNG 只供 Viewer 校稿，使用原始 Alpha、相同原點及 1599 × 1080 原尺寸 1:1 疊加，CSS opacity 為 1，不合成進正式 Canvas。

##### 5.1.9.2 文字需求與定位

| 欄位 | 字型／字重 | 字級 | 顏色 | 正式 runtime frame | 對齊 | 字數上限 |
|---|---|---|---|---|---|---|
| 主標 | `ShopeeNotoSans(content)-Medium` | 60pt | `#ffffff` | `left: 51px; top: 465px; width: 620px; height: 75px` | actual glyph ink 左緣靠左＋完整 actual ink bbox 垂直置中 | 8 |
| 副標一般文字 | `ShopeeNotoSans(content)-Bold` | 76pt | `#fff285` | `left: 51px; top: 557px; width: 740px; height: 97px` | mixed-run group actual ink 左緣靠左＋完整 bbox 垂直置中 | 7 |
| 副標 `$`／`%` | `ShopeeNotoSans(content)-Bold` | 65pt | `#fff285` | 同一副標文字框 | 同一 mixed-run group | 同副標欄位 |
| 保護文字 | `ShopeeNotoSans(content)-Medium` | 35pt | `#a6f4e6` | `left: 51px; top: 674px; width: 740px; height: 44px` | actual glyph ink 左緣靠左＋完整 actual ink bbox 垂直置中 | 17 |

三組文字均為 100% opacity，且不是水平置中。Renderer 使用 `measureText()` 的 `actualBoundingBoxLeft`、`actualBoundingBoxRight`、`actualBoundingBoxAscent` 與 `actualBoundingBoxDescent`，以 `actualBoundingBoxLeft` 修正 draw origin，使實際 glyph ink 左緣對齊各自 `frame.left = 51px`；垂直方向依完整 actual ink bbox 在各自 frame 內置中。正式定位不是單純將 `fillText()` origin 設為 frame.left、top-left positioning、top alignment、固定 baseline 或 fixed offset。

Canvas 2D `font` 直接使用 Photoshop 原始 `60pt`、`76pt`、`65pt` 與 `35pt`，不建立人工 `pt → px` 換算規則。

副標 ordinary text 與 `$`／`%` 先 token 化，ordinary 使用 Bold 76pt、symbols 使用 Bold 65pt，依 advance width 排成連續 mixed-run group。Symbols 使用相鄰 ordinary glyph actual ink-bottom baseline 邏輯；所有 runs 合併為完整 actual ink bbox 後，使整組 actual ink 左緣對齊副標 frame.left，並將完整 bbox 垂直置中，再逐 run 繪製。`$`／`%` 不是獨立 Editor 欄位，不使用 fixed symbol offset、字距補償、自動縮字、換行或裁切。

##### 5.1.9.3 Photoshop 工作區座標與 runtime local frame

A－09 原始 Photoshop 工作區 frame 為主標 `322,916,620,75`、副標 `322,1008,740,97`、保護文字 `322,1125,740,44`。Phase 2 依正式對位 PNG Alpha components 確認一致轉換：

- `xLocal = xPhotoshop - 271`
- `yLocal = yPhotoshop - 451`

因此 renderer 只使用正式 runtime local frame：主標 `51,465,620,75`、副標 `51,557,740,97`、保護文字 `51,674,740,44`；Photoshop 工作區原始座標不得作為 runtime frame。

##### 5.1.9.4 A－09 local Medium 2× rendering

A－09 經自身 Phase 1／2、Phase 3 Proposal 與 Jamie 批准，從第一版正式 Coding 採版位內 local `MEDIUM_RENDER_SCALE = 2`。Renderer 建立 3198 × 2160 transparent temporary Canvas，context 使用 `scale(2, 2)`，只將 Medium 60pt 主標與 Medium 35pt 保護文字依原始 pt、正式 runtime frames 及相同 actual-ink 左靠＋垂直置中邏輯繪製，再以 `imageSmoothingEnabled = true`、`imageSmoothingQuality = "high"` high-quality downsample 回正式 1599 × 1080 Canvas。

正式 JPEG 底圖、Bold 76pt ordinary subtitle 與 Bold 65pt `$`／`%` 均維持正式 1×。正式繪製順序是底圖 1×、transparent Medium layer 2× 縮回合成、Bold mixed subtitle 1×。2× 不改變正式 pt、frame、座標、metrics、baseline、advance width、glyph geometry、顏色或 opacity。這是 A－09 經獨立調查、批准及 Chrome／Safari 驗證 PASS 的版位特定 rendering 行為，不是所有 BN、所有 Medium 或其他 Type 的 shared／global 規則，也不因此建立 shared helper、base renderer、Registry 或 Framework。

##### 5.1.9.5 Renderer validation 與 compositing

Renderer 驗證 Canvas／Image／2D context、圖片完成狀態與 intrinsic dimensions、正式 WOFF2 font-ready、finite actual metrics、frame 正值與 Canvas bounds，並回傳三組 ink width、height、left、top、right、bottom、`fitsWidth` 與 `fitsHeight`。正式 compositing 維持 `globalAlpha = 1` 與 `source-over`。Renderer 不使用 fixed offset、字距補償、自動縮字、換行、裁切、filter 或 scale-to-fit。

##### 5.1.9.6 對位 PNG 額外 Alpha component

正式對位 PNG 的 Alpha components 為：

- 額外校稿內容：`(51,362)–(620,443)`，569 × 81。
- 主標：`(51,465)–(671,540)`，620 × 75。
- 副標：`(51,557)–(791,654)`，740 × 97。
- 保護文字：`(51,674)–(791,718)`，740 × 44。

額外 569 × 81 component 只屬正式 overlay 校稿內容，維持原圖不變；它不是第四個文字欄位，不建立第四個 input、Editor field、runtime frame 或 renderer layer。

##### 5.1.9.7 Launch／Viewer

A－09 使用共用薄校稿頁 `bn/launch/viewer.html`，route 為：

`viewer.html?type=A&bn=09_SPX%20TVBN_2`

`URLSearchParams` 解碼後為 `type=A`、`bn=09_SPX TVBN_2`。Viewer 載入 `../templates/A/09-spx-tvbn-2.js`；Canvas、Preview 與 overlay 均為 1599 × 1080，底圖為 `../assets/A/底圖/09_SPX TVBN_2.jpg`，對位圖為 `../assets/A/對位/09_SPX TVBN_2.png`。正式對位圖使用原始 Alpha、同原點、原尺寸 1:1、CSS opacity 1 疊加，不合成進正式 Canvas。

Viewer 沿用三個測試 input、合法內容即時 render、IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限、超限 rollback、overlay toggle、dynamic dimensions，以及圖片 decode／intrinsic dimension guard。

A－09 `.command` 開啟 `http://127.0.0.1:4173/bn/launch/viewer.html?type=A&bn=09_SPX%20TVBN_2`。正確 Viewer service 已存在時沿用；遇到不相符的外部 service 占用固定 port 4173 時停止提示，不換 port、不 kill 外部 process，必要時使用 `/usr/bin/python3 -m http.server`，且只停止自己啟動的 server。Filesystem permission 為 755，Code Commit 中 Git executable mode 為 `100755`。

##### 5.1.9.8 正式落地與驗證狀態

Codex Phase 5 完成 renderer／Viewer／Launch 語法、HTTP resources、圖片 decode／dimensions／Alpha components、正式 frames、actual-ink 定位公式、local 2× 分層、mixed-run deterministic／in-memory 模擬、Viewer 靜態邏輯、A－01～08 regression、whitespace 與 Git Scope 等當時環境可執行的驗證。受控 Chrome 環境當時因 Chrome extension 與 native host 不可用，Codex 沒有取得或宣稱真實 Chrome ShopeeNotoSans actual font metrics、Console、Canvas＋overlay／Photoshop 視覺、Medium 粗細／銳利度、Chrome／Safari rasterization 或真實中文 IME PASS；deterministic 假 metrics 不是 Browser actual font metrics。

之後 Jamie 已由 Finder 雙擊 A－09 `.command`，在 Chrome／Safari 完成真實 Canvas、overlay、actual-ink 文字定位、Medium 60pt／35pt 粗細與銳利度、Bold 76pt／65pt mixed baseline、不同位置的 `$`／`%`、輸入限制／rollback、真實中文 IME、Console 與 A－01～08 regression 的人工驗證，並明確回覆 PASS。因此 A－09 已完成並通過人工驗收，不是 unresolved blocker。

Photoshop 完成參考圖 `/Users/jamie/Downloads/A-assets/09_SPX TVBN_2.jpg` 僅為 Phase 5 唯讀視覺基準，不是 Repository runtime asset。

Code Commit 是在 Jamie Chrome／Safari 手動 PASS 後建立，Hash 為 `c32f1c5e02fc772b918133d4e35a0df0e75485f0`（`feat(bn): add A09 SPX TVBN 2 template`），`git diff --check HEAD^ HEAD` PASS，精確包含：

- `bn/templates/A/09-spx-tvbn-2.js`
- `bn/launch/viewer.html`
- `bn/launch/A/09_SPX TVBN_2.command`（Git mode `100755`）
- `bn/assets/A/底圖/09_SPX TVBN_2.jpg`
- `bn/assets/A/對位/09_SPX TVBN_2.png`

#### 5.1.10 `10_POP UP`

##### 5.1.10.1 正式版位規格

| 項目 | 正式需求 |
|---|---|
| 正式名稱 | `10_POP UP` |
| 樣式／內部 Type | 樣式 A／Type A |
| 分類 | 主視覺 Resize |
| Canvas | 580 × 720px transparent Canvas |
| 正式 renderer | `bn/templates/A/10-pop-up.js` |
| 共用 Viewer | `bn/launch/viewer.html` |
| 直接 Launch | `bn/launch/A/10_POP UP.command` |
| 正式底圖 | `bn/assets/A/底圖/10_POP UP.png`，intrinsic 475 × 673px RGBA PNG |
| 正式對位圖 | `bn/assets/A/對位/10_POP UP.png`，580 × 720px RGBA PNG |

正式 Canvas 維持透明，不填背景色。正式底圖 intrinsic dimensions 與 Canvas 不相同，因此 A－10 不套用「底圖 intrinsic dimensions 必須等於 Canvas dimensions」的一般 guard。Renderer 必須分別驗證 Canvas 精確為 580 × 720、底圖精確為 475 × 673，再將底圖只以 `x: 53px; y: 27px; width: 475px; height: 673px` 原尺寸 1:1、正式 1× 繪製；不得 Resize、Stretch、Crop、補邊、Scale-to-fit 或改成幾何置中。

正式對位 PNG 只供 Viewer 校稿，使用原始 Alpha、同原點及 580 × 720 原尺寸 1:1 疊加，CSS opacity 為 1，不 Resize、不位移，也不合成進正式 Canvas。

##### 5.1.10.2 文字需求與定位

| 欄位 | 字型／字重 | 字級 | 顏色 | 正式 runtime frame | 對齊 | 字數上限 |
|---|---|---|---|---|---|---|
| 主標 | `ShopeeNotoSans(content)-Medium` | 30pt | `#ffffff` | `left: 129px; top: 128px; width: 323px; height: 38px` | 完整 actual ink bbox 水平＋垂直置中 | 8 |
| 副標一般文字 | `ShopeeNotoSans(content)-Bold` | 40pt | `#fff285` | `left: 85px; top: 181px; width: 410px; height: 51px` | mixed-run group 完整 actual ink bbox 水平＋垂直置中 | 7 |
| 副標 `$`／`%` | `ShopeeNotoSans(content)-Bold` | 35pt | `#fff285` | 同一副標文字框 | 同一 mixed-run group | 同副標欄位 |
| 保護文字 | `ShopeeNotoSans(content)-Medium` | 20pt | `#a6f4e6` | `left: 85px; top: 242px; width: 410px; height: 25px` | 完整 actual ink bbox 水平＋垂直置中 | 17 |

三組文字均為 100% opacity。Renderer 使用 `measureText()` 的 `actualBoundingBoxLeft`、`actualBoundingBoxRight`、`actualBoundingBoxAscent` 與 `actualBoundingBoxDescent` 計算完整 actual ink bbox，將完整 bbox 水平及垂直置中於正式 frame；不使用單純 `textAlign: center`、靠左、top alignment、固定 baseline 或 fixed offset 取代 actual ink 計算。

Canvas 2D `font` 直接使用 Photoshop 原始 `30pt`、`40pt`、`35pt` 與 `20pt`，不建立人工 `pt → px` 換算規則。

副標 ordinary text 與 `$`／`%` 維持單一 input，先 token 化為 mixed runs；ordinary 使用 Bold 40pt、symbols 使用 Bold 35pt，依各 run advance width 連續排列。Symbols 使用相鄰 ordinary glyph actual ink-bottom baseline 邏輯；所有 runs 合併成完整 mixed group actual ink bbox 後，將整組水平＋垂直置中，再逐 run 繪製。`$`／`%` 不是獨立 Editor 欄位，不使用 fixed symbol offset、spacing compensation、自動縮字、換行或裁切。

##### 5.1.10.3 Photoshop 工作區座標與 runtime local frame

A－10 原始 Photoshop 工作區 frame 為主標 `565,759,323,38`、副標 `521,812,410,51`、保護文字 `521,873,410,25`。Phase 2 依正式對位 PNG 確認一致轉換：

- `xLocal = xPhotoshop - 436`
- `yLocal = yPhotoshop - 631`

因此 renderer 只使用正式 runtime local frame：主標 `129,128,323,38`、副標 `85,181,410,51`、保護文字 `85,242,410,25`；Photoshop 工作區座標只作歷史規格來源，不得直接作為 runtime frame。

##### 5.1.10.4 A－10 local Medium 2× rendering

A－10 經自身 Phase 1／2、Phase 3 Proposal 與 Jamie 批准，從第一版正式 Coding 採版位內 local `MEDIUM_RENDER_SCALE = 2`。Renderer 建立 1160 × 1440 transparent temporary Canvas，context 使用 `scale(2, 2)`，只將 Medium 30pt 主標與 Medium 20pt 保護文字依原始 pt、正式 runtime frames 及相同完整 actual ink bbox 水平＋垂直置中邏輯繪製，再以 `imageSmoothingEnabled = true`、`imageSmoothingQuality = "high"` high-quality downsample 回正式 580 × 720 Canvas。

正式 PNG 底圖、Bold 40pt ordinary subtitle 與 Bold 35pt `$`／`%` 均維持正式 1×。正式繪製順序為底圖 `53,27,475,673` 正式 1×、transparent Medium layer 2× 縮回合成、Bold mixed subtitle 正式 1×；正式 compositing 使用 `globalAlpha = 1` 與 `source-over`。2× 不改變正式 pt、frame、座標、metrics、baseline、advance width、glyph geometry、顏色或 opacity。這是 A－10 版位特定 rendering，不是全 BN、全 Medium 或其他 Type 的 shared／global 規則，也沒有建立 helper、base renderer、Registry 或 Framework。

##### 5.1.10.5 固定 CTA 與 Renderer validation

底部「逛逛去 ▶」已存在正式底圖，是固定圖像內容。它不是第四個文字欄位、input、Editor field、runtime frame 或 renderer text layer；renderer 不重繪、文字化、裁切或覆蓋 CTA。

Renderer 驗證 Canvas／HTMLImageElement／2D context、圖片完成狀態、A－10 版位特定的 Canvas／底圖 dimensions、底圖 placement bounds、正式 WOFF2 font-ready、frame finite／positive／Canvas bounds、finite actual metrics、temporary Canvas dimensions 及 frame-fit。Renderer 回傳三組 ink width、height、left、top、right、bottom、`fitsWidth` 與 `fitsHeight`；必要驗證失敗時停止並回報，不 fallback 或自行調整正式規格。

##### 5.1.10.6 Launch／Viewer

A－10 使用共用薄校稿頁 `bn/launch/viewer.html`，route 為：

`viewer.html?type=A&bn=10_POP%20UP`

`URLSearchParams` 解碼後為 `type=A`、`bn=10_POP UP`。Viewer 載入 `../templates/A/10-pop-up.js`；Canvas、Preview 與 overlay 均為 580 × 720，底圖為 `../assets/A/底圖/10_POP UP.png`，對位圖為 `../assets/A/對位/10_POP UP.png`。正式對位圖使用原始 Alpha、同原點、原尺寸 1:1、CSS opacity 1 疊加，不合成進正式 Canvas。

Viewer 沿用三個測試 input、合法內容即時 render、IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限、超限 rollback、overlay toggle、dynamic dimensions，以及圖片 decode／intrinsic dimension guard。

A－10 `.command` 開啟 `http://127.0.0.1:4173/bn/launch/viewer.html?type=A&bn=10_POP%20UP`。正確 Viewer service 已存在時沿用；遇到不相符的外部 service 占用固定 port 4173 時停止提示，不換 port、不 kill 外部 process，必要時使用 `/usr/bin/python3 -m http.server`，且只停止自己啟動的 server。Filesystem permission 為 755，Code Commit 中 Git executable mode 為 `100755`。

##### 5.1.10.7 正式落地與驗證狀態

Codex Phase 5 完成 renderer／Viewer／Launch 語法、正式 assets decode／dimensions、底圖 placement、transparent Canvas 邊界、runtime frames、actual-ink 置中公式、local 2× 分層、mixed-run deterministic／in-memory 模擬、Viewer input／IME／rollback 靜態邏輯、HTTP resources、A－01～09 regression、whitespace 與 Git Scope 等當時環境可執行的驗證。受控 Chrome 環境當時因 Chrome extension 與 native host 不可用，Codex 沒有取得或宣稱真實 Browser ShopeeNotoSans actual font metrics、Console、rasterization、Canvas＋overlay／Photoshop 視覺或真實中文 IME PASS；deterministic 假 metrics 不是 Browser actual font metrics。

之後 Jamie 已由 Finder 雙擊 A－10 `.command`，在 Chrome／Safari 完成底圖 placement、透明邊界、固定 CTA、三欄 actual-ink 定位、Medium 30pt／20pt 粗細與銳利度、Bold 40pt／35pt mixed baseline、不同位置的 `$`／`%`、正式 overlay、輸入限制／rollback、真實中文 IME、Console 與必要 regression 的實機驗證，並明確回覆 PASS。因此 A－10 已完成並通過人工驗收，不是 unresolved blocker。

Code Commit 是在 Jamie Chrome／Safari 手動 PASS 後建立，Hash 為 `92aebac0b014c17094ea0401808ba0ab505a4dfe`（`feat(bn): add A10 POP UP template`），`git diff --check HEAD^ HEAD` PASS，精確包含：

- `bn/templates/A/10-pop-up.js`
- `bn/launch/viewer.html`
- `bn/launch/A/10_POP UP.command`（Git mode `100755`）
- `bn/assets/A/底圖/10_POP UP.png`
- `bn/assets/A/對位/10_POP UP.png`

#### 5.1.11 `11_Line OA`

##### 5.1.11.1 正式版位規格

| 項目 | 正式需求 |
|---|---|
| 正式名稱 | `11_Line OA` |
| 樣式／內部 Type | 樣式 A／Type A |
| 分類 | 主視覺 Resize |
| Canvas | 1040 × 1040px transparent Canvas |
| 正式 renderer | `bn/templates/A/11-line-oa.js` |
| 共用 Viewer | `bn/launch/viewer.html` |
| 直接 Launch | `bn/launch/A/11_Line OA.command` |
| 正式底圖 | `bn/assets/A/底圖/11_Line OA.png`，intrinsic 1016 × 1007px RGBA PNG |
| 正式對位圖 | `bn/assets/A/對位/11_Line OA.png`，1040 × 1040px RGBA PNG |

正式 Canvas 維持透明，不填背景色。正式底圖 intrinsic dimensions 與 Canvas 不相同，因此 A－11 不套用「底圖 intrinsic dimensions 必須等於 Canvas dimensions」的一般 guard。Renderer 必須分別驗證 Canvas 精確為 1040 × 1040、底圖精確為 1016 × 1007，再將底圖只以 `x: 12px; y: 12px; width: 1016px; height: 1007px` 原尺寸 1:1、正式 1× 繪製；不得 Resize、Stretch、Crop、補邊或 Scale-to-fit。

正式對位 PNG 只供 Viewer 校稿，使用原始 Alpha、同原點及 1040 × 1040 原尺寸 1:1 疊加，CSS opacity 為 1，不 Resize、不位移，也不合成進正式 Canvas。

##### 5.1.11.2 文字需求與定位

| 欄位 | 字型／字重 | 字級 | 顏色 | 正式 runtime frame | 對齊 | 字數上限 |
|---|---|---|---|---|---|---|
| 主標 | `ShopeeNotoSans(content)-Medium` | 55pt | `#ffffff` | `left: 230px; top: 154px; width: 580px; height: 68px` | 完整 actual ink bbox 水平＋垂直置中 | 8 |
| 副標一般文字 | `ShopeeNotoSans(content)-Bold` | 68pt | `#fff285` | `left: 180px; top: 240px; width: 680px; height: 86px` | mixed-run group 完整 actual ink bbox 水平＋垂直置中 | 7 |
| 副標 `$`／`%` | `ShopeeNotoSans(content)-Bold` | 60pt | `#fff285` | 同一副標文字框 | 同一 mixed-run group | 同副標欄位 |
| 保護文字 | `ShopeeNotoSans(content)-Regular` | 30pt | `#a6f4e6` | `left: 180px; top: 345px; width: 680px; height: 37px` | 完整 actual ink bbox 水平＋垂直置中 | 17 |

三組文字均為 100% opacity。Renderer 使用 `measureText()` 的 `actualBoundingBoxLeft`、`actualBoundingBoxRight`、`actualBoundingBoxAscent` 與 `actualBoundingBoxDescent` 計算完整 actual ink bbox，再將完整 bbox 水平及垂直置中於正式 frame；不使用單純 `textAlign: center`、靠左、top alignment、固定 baseline 或 fixed offset 取代 actual ink 計算。

Canvas 2D `font` 直接使用 Photoshop 原始 `55pt`、`68pt`、`60pt` 與 `30pt`，不建立人工 `pt → px` 換算規則。保護文字的正式字重是 Regular／weight 400，不是 Medium。

副標 ordinary text 與 `$`／`%` 維持單一 input，先 token 化為 mixed runs；ordinary 使用 Bold 68pt、symbols 使用 Bold 60pt，依各 run advance width 連續排列。Symbols 使用相鄰 ordinary glyph actual ink-bottom baseline 邏輯；所有 runs 合併成完整 mixed group actual ink bbox 後，將整組水平＋垂直置中，再逐 run 繪製。`$`／`%` 不是獨立 Editor 欄位，不使用 fixed symbol offset、spacing compensation、自動縮字、換行或裁切。

##### 5.1.11.3 Photoshop 工作區座標與 runtime local frame

A－11 原始 Photoshop 工作區 frame 為主標 `503,696,580,68`、副標 `453,782,680,86`、保護文字 `453,887,680,37`。Phase 2 依正式對位 PNG 確認一致轉換：

- `xLocal = xPhotoshop - 273`
- `yLocal = yPhotoshop - 542`

因此 renderer 只使用正式 runtime local frame：主標 `230,154,580,68`、副標 `180,240,680,86`、保護文字 `180,345,680,37`；Photoshop 工作區座標只作規格來源，不得直接作為 runtime frame。

##### 5.1.11.4 A－11 local Medium 2× rendering

A－11 經自身 Requirement、Investigation、Proposal 與 Jamie 批准採版位 local `MEDIUM_RENDER_SCALE = 2`。Renderer 建立 2080 × 2080 transparent temporary Canvas，context 使用 `scale(2, 2)`，只讓 Medium 55pt 主標依原始 pt、正式 runtime frame 及相同完整 actual ink bbox 水平＋垂直置中邏輯繪製，再以 `imageSmoothingEnabled = true`、`imageSmoothingQuality = "high"` high-quality downsample 回正式 1040 × 1040 Canvas。

Regular 30pt 保護文字、Bold 68pt ordinary subtitle、Bold 60pt `$`／`%` 與正式 PNG 底圖均維持正式 1×。正式繪製順序為底圖 `12,12,1016,1007` 正式 1×、transparent Medium 55pt 主標 layer 2× 縮回合成、Regular 30pt 保護文字正式 1×、Bold 68pt／60pt mixed subtitle 正式 1×；正式 compositing 使用 `globalAlpha = 1` 與 `source-over`。2× 不改變正式 pt、frame、座標、metrics、baseline、advance width、glyph geometry、顏色或 opacity。

這是 A－11 版位特定 rendering，不是全 BN、全 Medium 或其他 Type 的 shared／global 規則，也沒有建立 helper、base renderer、Registry 或 Framework。A－11 保護文字是 Regular 30pt，因此不進入 Medium 2× layer。

##### 5.1.11.5 固定 Logo／CTA 與 Renderer guards

右上 Shopee Logo／「蝦皮購物」及底部「逛逛去 ▶」皆已存在正式底圖，是固定圖像內容。它們不是第四個文字欄位、input、Editor field、runtime frame 或 renderer text layer；renderer 不重繪、文字化、裁切或覆蓋這些固定內容。

Renderer 對下列真正無法安全 render 的條件維持 hard-stop：Canvas／HTMLImageElement 型別、圖片完成解碼、底圖 intrinsic dimensions、Canvas／底圖 placement、2D context、正式 frame finite／positive／Canvas bounds、temporary Canvas dimensions、正式 WOFF2 font-ready，以及 non-finite TextMetrics。這些 guard 失敗時停止並回報，不 fallback 或自行調整正式規格。

##### 5.1.11.6 Frame-fit Bug 與正式 validation policy

A－11 初版 renderer 對 `fitsWidth: false` 或 `fitsHeight: false` 採零容忍 hard-stop throw。Jamie 首次實機驗證時，因此遇到「A－11 主標 正式文字超出 frame，已停止 Template render」。後續最小 Bug Investigation 確認：local 2× measurement 沒有 double scaling，actual bbox 水平＋垂直置中公式未發現錯誤，Medium family／weight／font-ready mapping 亦一致；直接造成停止的是 A－11 新增的 frame-fit hard-stop policy。

正式 Bug Fix 後，renderer 仍依原公式真實計算並回傳每欄的 `inkWidth`、`inkHeight`、`inkLeft`、`inkTop`、`inkRight`、`inkBottom`、`fitsWidth` 與 `fitsHeight`。`fitsWidth: false` 或 `fitsHeight: false` 不再 throw，也不會被強制改成 `true`；文字仍依原 actual-ink 置中座標正常完成 render。此規則一致適用主標、副標 mixed group與保護文字三欄。

因此 A－11 的 frame-fit 是非阻擋式 validation，不是 render blocker；第 5.1.11.5 節列出的真正安全 guard 仍維持 hard-stop。Bug Fix 沒有新增 epsilon、tolerance、fixed offset、縮字、換行、裁切、scale compensation、filter 或 Browser-specific workaround，也沒有修改任何字級、frame、底圖 placement、baseline 公式、actual-ink 置中公式或 local 2× 策略。

##### 5.1.11.7 Launch／Viewer

A－11 使用共用薄校稿頁 `bn/launch/viewer.html`，route 為：

`viewer.html?type=A&bn=11_Line%20OA`

`URLSearchParams` 解碼後為 `type=A`、`bn=11_Line OA`。Viewer 載入 `../templates/A/11-line-oa.js`；Canvas、Preview 與 overlay 均為 1040 × 1040，底圖為 `../assets/A/底圖/11_Line OA.png`，對位圖為 `../assets/A/對位/11_Line OA.png`。正式對位圖使用原始 Alpha、同原點、原尺寸 1:1、CSS opacity 1 疊加，不合成進正式 Canvas。

為支援 A－11 Regular 30pt 保護文字，Viewer 最小新增正式 `ShopeeNotoSans Regular` `@font-face`，引用 `fonts/ShopeeNotoSans(content)-Regular.woff2` 並使用 `font-weight: 400`；既有 Medium／Bold mapping 保持不變。

Viewer 沿用三個測試 input、合法內容即時 render、IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限、超限 rollback、overlay toggle、dynamic dimensions，以及圖片 decode／intrinsic dimension guard。

A－11 `.command` 開啟 `http://127.0.0.1:4173/bn/launch/viewer.html?type=A&bn=11_Line%20OA`。正確 Viewer service 已存在時沿用；遇到不相符的外部 service 占用固定 port 4173 時停止提示，不換 port、不 kill 外部 process，必要時使用 `/usr/bin/python3 -m http.server`，且只停止自己啟動的 server。Filesystem permission 為 755，Code Commit 中 Git executable mode 為 `100755`。

##### 5.1.11.8 正式落地與驗證狀態

Codex 完成 renderer module／Viewer／Launch 語法、HTTP resources、正式 assets decode／dimensions／Alpha、底圖 placement、runtime frames、正式 WOFF2 mapping、local 2×／1× 分層、mixed-run deterministic 測試、frame-fit 非阻擋 validation policy、真正 hard-stop guards、A－01～10 regression、whitespace 與 Git Scope 等當時環境可執行的驗證。受控 Chrome 不可用時，Codex 沒有取得或宣稱真實 Browser actual TextMetrics、Console、rasterization、真實中文 IME 或視覺 PASS；deterministic metrics 不是 Browser actual font metrics。

其後 Jamie 已由 Finder 雙擊 A－11 `.command`，在 Chrome／Safari 完成 Bug Fix 後的正式 Canvas、底圖 placement、固定 Logo／CTA、三欄 actual-ink 定位、Medium 55pt 主標、Regular 30pt 保護文字、Bold 68pt／60pt mixed baseline、`$`／`%`、正式 overlay、輸入限制／rollback、真實中文 IME、Console 與必要 regression 的實機驗證，並明確回覆 PASS。因此 A－11 已完成並通過人工驗收，不是 unresolved blocker。

Code Commit 是在 Jamie Chrome／Safari 手動 PASS 後建立，Hash 為 `91cecef9b24867fd7e8a885e8346beb580e56ed7`（`feat(bn): add A11 Line OA template`），`git diff --check HEAD^ HEAD` PASS，精確包含：

- `bn/templates/A/11-line-oa.js`
- `bn/launch/viewer.html`
- `bn/launch/A/11_Line OA.command`（Git mode `100755`）
- `bn/assets/A/底圖/11_Line OA.png`
- `bn/assets/A/對位/11_Line OA.png`

#### 5.1.12 `12_LPBN`

##### 5.1.12.1 正式版位與資產規格

| 項目 | 正式需求 |
|---|---|
| 正式名稱 | `12_LPBN` |
| 樣式／內部 Type | 樣式 A／Type A |
| Canvas | 1200 × 550px transparent Canvas |
| Template renderer | `bn/templates/A/12-lpbn.js` |
| 正式底圖 | `bn/assets/A/底圖/12_LPBN.jpg` |
| 底圖 intrinsic dimensions | 1200 × 550px |
| 底圖正式 placement | `0, 0, 1200, 550`；原尺寸 1:1、正式 1× |
| 正式對位圖 | `bn/assets/A/對位/12_LPBN.png` |
| Viewer | `bn/launch/viewer.html` |
| Viewer route | `viewer.html?type=A&bn=12_LPBN` |
| Finder Launch | `bn/launch/A/12_LPBN.command` |

正式底圖不 Resize、不 stretch、不 crop、不 scale-to-fit、不補邊，也不加入額外 offset。正式對位圖為 1200 × 550px，Viewer 保留其原始 Alpha，以相同原點及原尺寸 1:1、CSS opacity 1 疊加，只供校稿；對位圖不合成進正式 Canvas。

##### 5.1.12.2 正式文字規格與座標

| 欄位 | 字型／字重 | 字級 | 顏色 | Runtime frame（left, top, width, height） | 字數上限 |
|---|---|---:|---|---|---:|
| 主標 | `ShopeeNotoSans Medium` | 39pt | `#ffffff` | `58, 226, 405, 49` | 8 |
| 副標 ordinary | `ShopeeNotoSans Bold` | 49pt | `#fff285` | `58, 285, 475, 62` | 7 |
| 副標 `$`／`%` | `ShopeeNotoSans Bold` | 42pt | `#fff285` | 同一副標 frame 與同一 input | 同副標 |
| 保護文字 | `ShopeeNotoSans Medium` | 22.5pt | `#a6f4e6` | `58, 360, 475, 28` | 17 |

所有字級直接使用 Photoshop 原始 `pt` 作 Canvas font specification，不進行人工 `pt → px` 換算。字數算法維持 ASCII = 0.5、非 ASCII = 1，主標／副標／保護文字上限為 8／7／17。

三欄均以 `measureText()` 的 `actualBoundingBoxLeft`、`actualBoundingBoxRight`、`actualBoundingBoxAscent` 與 `actualBoundingBoxDescent` 計算完整 actual ink bbox。水平方向以 actual ink 左緣精確對齊 `frame.left`，不是只依賴 `textAlign = "left"`；垂直方向則將完整 actual ink bbox 置中於各自 frame。

Photoshop 原始 frames 為：

- 主標：`665, 401, 405, 49`
- 副標：`665, 460, 475, 62`
- 保護文字：`665, 535, 475, 28`

Photoshop 工作區到 runtime Canvas 的歷史座標轉換為 `xLocal = xPhotoshop - 607`、`yLocal = yPhotoshop - 175`。Renderer 直接使用上述 runtime frames，不把 Photoshop 工作區座標當作 runtime 座標。

##### 5.1.12.3 Local 2× Medium 與正式繪製順序

A－12 使用版位 local `MEDIUM_RENDER_SCALE = 2`：temporary Canvas 固定為 2400 × 1100，context 使用 `scale(2, 2)`。只有 Medium 39pt 主標與 Medium 22.5pt 保護文字進入 transparent local 2× layer，再以 `imageSmoothingEnabled = true`、`imageSmoothingQuality = "high"` 縮回正式 1200 × 550 Canvas。

正式底圖、Bold 49pt ordinary subtitle 與 Bold 42pt `$`／`%` 維持正式 1×。正式繪製順序為：

1. 正式底圖 `0, 0, 1200, 550` 以原尺寸 1:1、正式 1× 繪製。
2. Medium transparent local 2× layer 高品質縮回並合成。
3. Bold mixed subtitle 以正式 1× 繪製。

正式 Canvas 使用 `globalAlpha = 1` 與 `globalCompositeOperation = "source-over"`。Local 2× 不改變正式 pt、frame、actual metrics、baseline、advance、glyph geometry、顏色或 opacity；此行為只屬 A－12，不建立 shared／global Medium helper、base renderer、Registry 或 Framework。

##### 5.1.12.4 副標 mixed-run 規則

副標維持單一 input。Ordinary 49pt 與 `$`／`%` 42pt runs 依 advance width 連續排列，沒有獨立 symbol input、fixed offset、spacing compensation、自動縮字、換行或裁切。

Symbol baseline 使用相鄰 ordinary glyph actual ink-bottom：`$` 優先使用後方 ordinary glyph，無後方時回退前方；`%` 優先使用前方 ordinary glyph，無前方時回退後方。此規則支援 symbol 位於開頭、中間或結尾。完成全部 runs 後合併完整 mixed group actual ink bbox，再將整組 actual ink 左緣對齊副標 `frame.left`，並在副標 frame 內垂直置中。

##### 5.1.12.5 Frame-fit、guards 與 overlay 額外 component

A－12 延續 A－11 最終正式 frame-fit policy：renderer 依真實 actual ink metrics 如實計算並回傳 `inkWidth`、`inkHeight`、`inkLeft`、`inkTop`、`inkRight`、`inkBottom`、`fitsWidth` 與 `fitsHeight`；`fitsWidth: false` 或 `fitsHeight: false` 是 validation 結果，不是 render blocker，也不會被強制改成 `true`。Canvas／HTMLImageElement／2D context、image decode、intrinsic dimensions、placement／frame finite、positive 及 Canvas bounds、temporary Canvas dimensions、font-ready，以及 non-finite TextMetrics 等結構性錯誤仍維持 hard-stop，並回報 A－12 專屬錯誤。

Font-ready 沿用 Viewer 的正式 `ShopeeNotoSans Medium`／`ShopeeNotoSans Bold` WOFF2 mapping，renderer 透過 `document.fonts.load()` 與 `document.fonts.check()` 精確檢查 39pt Medium、49pt Bold、42pt Bold 及 22.5pt Medium；未 ready 時 hard-stop，不 fallback。

正式對位圖另有 `(58, 161)–(423, 213)`、尺寸 365 × 52 的 Alpha component。它只屬 overlay 校稿內容，不是第四個動態文字欄位、input、runtime frame 或 renderer text layer。

##### 5.1.12.6 Viewer／Launch 與驗證狀態

共用 Viewer 的 A－12 Canvas、Preview 與 overlay 均為 1200 × 550。Viewer 沿用三個 input、合法內容即時 render、IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限與超限 rollback，以及 overlay toggle。

`bn/launch/A/12_LPBN.command` 固定使用 `127.0.0.1:4173`。正確 Viewer service 已存在時沿用；其他 service 占用 port 時停止提示，不換 port、不 kill 外部 process，且只停止自身啟動的 server。Filesystem permission 為 755，Git executable mode 為 `100755`。

Codex Phase 5 已完成 renderer／Viewer／command 語法、HTTP resources、正式 assets、dimensions、底圖 placement、runtime frames、正式字型、local 2×／1× 分層、actual-ink 定位邏輯、mixed-run deterministic 測試、frame-fit policy、overlay、input／rollback、In-app Browser Console 與 A－01～11 regression 等當時環境可執行的檢查。Mock／sandbox metrics 不被記作真實 Chrome／Safari TextMetrics。

Jamie 其後已由 Finder Launch 在 Chrome／Safari 完成最終實機驗證並明確回覆 PASS，之後才建立 Code Commit。Code Commit 為 `828a9539d2d0048815671243e7c9ad50b600067b`（`feat(bn): add A12 LPBN template`），`git diff --check HEAD^ HEAD` PASS，精確包含：

- `bn/templates/A/12-lpbn.js`
- `bn/launch/viewer.html`
- `bn/launch/A/12_LPBN.command`（Git mode `100755`）
- `bn/assets/A/底圖/12_LPBN.jpg`
- `bn/assets/A/對位/12_LPBN.png`

##### 5.1.12.7 Optional LPBN 掛標 variants（後續輪次追加，已實作並驗證 PASS）

A－12 於後續輪次新增 optional 掛標 variants。Code Commit 為 `dad56a465f20e064452c6866c82fcf02be2e6751`（`feat(bn): add LPBN badge variants`），Jamie Manual Verification PASS。完整產品行為以 `bn/docs/FSS_BN_A12_LPBN掛標_Requirement_Specification_v1.0.md` 為準；本小節只記錄與 A－12 template／輸出行為直接相關的邊界。

- 正式工單 `Sheets.A` 的 `E15` 為 optional「LPBN 掛標月份」（正式值目前為 `9`／`10`／`11`／`12`），屬 A－12 專用資料，不屬於 01～12 共用主標／副標／保護文字。`E15` 空白時 A－12 完全維持既有單一輸出行為。
- 有月份且素材齊全時，A－12 由既有無掛標成品加上 3 個掛標 variants；因此本節 5.1.12.1～5.1.12.6 的規格**不應被理解為 A－12 永遠只有單一輸出**。既有無掛標 `12_LPBN.jpg` 永遠保留，不被 variant 取代。
- 掛標為預先製作完成的 1200 × 550 transparent PNG overlay，位於 `bn/assets/LPBN掛標/<month>/`，與 A－12 正式 Canvas 完全同尺寸。掛標一律在既有 base render 完成後於 template 之外疊加：**`bn/templates/A/12-lpbn.js` 零修改**，本節既有 Canvas 尺寸、底圖 placement、三欄 runtime frames、字級／顏色、local 2× Medium 分層、mixed-run 規則、frame-fit policy 與 guards 全部不變。
- 全部 base 與 variants 維持 1200 × 550、JPG、72 dpi；A－12 未新增 byte limit、quality retry 或 compression fallback。
- Export 檔名：base 仍為 `12_LPBN.jpg`，variants 為 `12_LPBN_1.jpg`／`12_LPBN_2.jpg`／`12_LPBN_3.jpg`；slot 缺失時 suffix 不重新編號。
- 掛標未建立通用 Badge System；本輪只涵蓋 A－12，其他 A 版位與 B／C／D 均未實作掛標。

#### 5.1.13 `13_Skinny BN_APP`

##### 5.1.13.1 正式版位與資產規格

| 項目 | 正式需求 |
|---|---|
| 正式名稱 | `13_Skinny BN_APP` |
| 樣式／內部 Type | 樣式 A／Type A |
| 版位分類 | 特殊文字訊息版位（A－13 是目前第一個正式兩-input 版位） |
| Canvas | 358 × 360px transparent Canvas |
| Template renderer | `bn/templates/A/13-skinny-bn-app.js` |
| 正式底圖 | `bn/assets/A/底圖/13_Skinny BN_APP.png` |
| 底圖 intrinsic dimensions | 336 × 318px |
| 底圖正式 placement | `11, 20, 336, 318`；原尺寸 1:1、正式 1× |
| 正式對位圖 | `bn/assets/A/對位/13_Skinny BN_APP.png`（358 × 360px） |
| Viewer | `bn/launch/viewer.html` |
| Viewer route | `viewer.html?type=A&bn=13_Skinny%20BN_APP` |
| Finder Launch | `bn/launch/A/13_Skinny BN_APP.command` |

正式底圖 intrinsic dimensions 為 336 × 318，不等於 Canvas 358 × 360；renderer 只以 `11, 20, 336, 318` 原尺寸 1:1、正式 1× 繪製，不 Resize、不 stretch、不 crop、不 scale-to-fit、不補邊，Canvas 四周保留透明區。正式對位圖為 358 × 360px，Viewer 保留其原始 Alpha，以相同原點及原尺寸 1:1、CSS opacity 1 疊加，只供校稿；對位圖不合成進正式 Canvas。

A－13 精確只有兩個動態文字欄位（第一行、第二行），不是三欄，也沒有保護文字欄位。右側播放鍵、蝦皮公仔、紙箱等均屬正式底圖固定圖像內容，不是文字欄位、input、Editor field、runtime frame 或 renderer text layer。

##### 5.1.13.2 正式文字規格與座標

| 欄位 | 字型／字重 | 字級 | 顏色 | Runtime frame（left, top, width, height） | 字數上限 |
|---|---|---:|---|---|---:|
| 第一行 | `ShopeeNotoSans Medium` | 30pt | `#ffffff` | `74, 42, 210, 38` | 5 |
| 第二行 ordinary | `ShopeeNotoSans Bold` | 30pt | `#fff285` | `49, 89, 260, 38` | 6 |
| 第二行 `$`／`%` | `ShopeeNotoSans Bold` | 25pt | `#fff285` | 同一第二行 frame 與同一 input | 同第二行 |

所有字級直接使用 Photoshop 原始 `pt` 作 Canvas font specification，不進行人工 `pt → px` 換算。字數算法維持 ASCII = 0.5、非 ASCII = 1，第一行／第二行上限為 5／6。

兩欄均以 `measureText()` 的 `actualBoundingBoxLeft`、`actualBoundingBoxRight`、`actualBoundingBoxAscent` 與 `actualBoundingBoxDescent` 計算完整 actual ink bbox，並在各自 frame 內水平＋垂直置中；不是只依賴 `textAlign = "center"`、fixed baseline、fixed offset 或人工 spacing。空字串回傳 0 × 0 validation 且不繪製。

Photoshop 原始 frames 為：

- 第一行：`536, 312, 210, 38`
- 第二行：`511, 359, 260, 38`

Photoshop 工作區到 runtime Canvas 的座標轉換為 `xLocal = xPhotoshop - 462`、`yLocal = yPhotoshop - 270`（兩框逐一驗算一致）。Renderer 直接使用上述 runtime frames，不把 Photoshop 工作區座標當作 runtime 座標。

##### 5.1.13.3 Local 2× Medium 與正式繪製順序

A－13 使用版位 local `MEDIUM_RENDER_SCALE = 2`：temporary transparent Canvas 固定為 716 × 720，context 使用 `scale(2, 2)`。只有第一行 Medium 30pt 進入 local 2× layer，再以 `imageSmoothingEnabled = true`、`imageSmoothingQuality = "high"` 縮回正式 358 × 360 Canvas。

正式底圖與第二行 Bold 30pt ordinary、Bold 25pt `$`／`%` 維持正式 1×，Bold 不進 Medium layer。正式繪製順序為：

1. clear transparent Canvas。
2. 正式底圖 `11, 20, 336, 318` 以原尺寸 1:1、正式 1× 繪製。
3. 第一行 Medium transparent local 2× layer 高品質縮回並合成。
4. 第二行 Bold mixed runs 以正式 1× 繪製。

正式 Canvas 使用 `globalAlpha = 1` 與 `globalCompositeOperation = "source-over"`。Local 2× 不改變正式 pt、frame、actual metrics、baseline、advance、glyph geometry、顏色或 opacity；此行為只屬 A－13，不建立 shared／global Medium helper、base renderer、Registry 或 Framework。

##### 5.1.13.4 第二行 mixed-run 規則

第二行維持單一 input。Ordinary 30pt 與 `$`／`%` 25pt runs 先 tokenize，再依 advance width 連續排列，沒有獨立 symbol input、fixed symbol offset、spacing compensation、自動縮字、換行或裁切。

Symbol baseline 使用相鄰 ordinary glyph actual ink-bottom：`$` 優先參考後方 ordinary glyph，無後方時回退前方；`%` 優先參考前方 ordinary glyph，無前方時回退後方；相鄰 glyph 逐字掃描並跳過無 ink 字元。此規則支援 symbol 位於開頭、中間或結尾。完成全部 runs 後合併完整 mixed group actual ink bbox，再將整組於第二行 frame 內水平＋垂直置中（與 A－12 的整組左對齊不同，A－13 為整組置中），最後逐 run 繪製。

##### 5.1.13.5 Frame-fit 與 hard-stop guards

A－13 沿用 A－11／12 最終正式 frame-fit policy：renderer 依真實 actual ink metrics 如實計算並回傳兩欄各自的 `inkWidth`、`inkHeight`、`inkLeft`、`inkTop`、`inkRight`、`inkBottom`、`fitsWidth` 與 `fitsHeight`；`fitsWidth: false` 或 `fitsHeight: false` 是 validation 結果，不是 render blocker，也不會被強制改成 `true`，不加入 epsilon、tolerance、offset、縮字或 workaround。

Canvas／HTMLImageElement 型別、image complete／decode、底圖 intrinsic dimensions 精確 336 × 318、Canvas dimensions 精確 358 × 360、placement／frame finite、positive 及 Canvas bounds、正式與 temporary 2D context、temporary Canvas 精確 716 × 720、font-ready，以及 non-finite TextMetrics／ink geometry 等結構性錯誤仍維持 hard-stop，並回報 A－13 專屬錯誤。

Font-ready 沿用 Viewer 既有正式 `ShopeeNotoSans Medium`／`ShopeeNotoSans Bold` WOFF2 mapping，不新增 font mapping；renderer 透過 `document.fonts.load()` 與 `document.fonts.check()` 精確檢查 30pt Medium、30pt Bold 及 25pt Bold；未 ready 時 hard-stop，不 fallback。

##### 5.1.13.6 Viewer 兩-input 最小支援

A－13 route 為 `viewer.html?type=A&bn=13_Skinny%20BN_APP`，`URLSearchParams` 解碼後為 `type=A`、`bn=13_Skinny BN_APP`。Canvas、Preview 與 overlay 均為 358 × 360。

A－13 是共用 Viewer 第一個正式兩-input 版位。Viewer 以最小版位別欄位設定支援：第一行 input label 為「第一行」、上限 5、預設校稿文字「週六免運日」；第二行 input label 為「第二行」、上限 6、預設校稿文字「全站$499免運」。第三個既有 input 與 label 在 A－13 route 下為 hidden＋disabled，不進 fields、不進 state、不參與 render／validation。

A－01～12 各 route 仍維持既有三個 input、既有 label、既有預設文字與 8／7／17 上限，行為完全不變；版位別欄位設定只屬 route 設定，不是全域兩-input 改動。IME-safe、compositionend 後 commit、超限 rollback、ASCII 0.5／非 ASCII 1、overlay toggle 與圖片 decode／intrinsic dimension guard 均沿用既有機制。

##### 5.1.13.7 Launch／驗證狀態與 Code Commit

`bn/launch/A/13_Skinny BN_APP.command` 完全沿用 A－12 已 PASS 結構，固定使用 `127.0.0.1:4173` 開啟 A－13 route。正確 Viewer service 已存在時沿用；其他 service 占用 port 時停止提示，不換 port、不 kill 外部 process，必要時使用 `/usr/bin/python3 -m http.server`，且只停止自身啟動的 server。Filesystem permission 為 755，Git executable mode 為 `100755`。

Claude Phase 5 已完成當時環境可執行的 deterministic／static／sandbox 驗證：renderer／Viewer module 語法、`.command` 與 A－12 已 PASS 腳本逐行 diff（sandbox 無 zsh，以此替代 `zsh -n`）、HTTP resources、正式 assets decode／dimensions／Alpha／SHA-256、底圖 placement、runtime frames、font-ready 結構、local 2×／1× 分層、actual-ink 置中公式、mixed-run deterministic 測試（`$`／`%` 開頭／中間／結尾、多 symbol、純 symbol、空字串、advance 連續性）、frame-fit false 不阻擋、結構性 hard-stop、兩 input 5／6 rollback 與 IME-safe 邏輯、overlay 1:1，以及 A－01～12 regression 與 Git Scope。Mock／sandbox metrics 不是真實 Chrome／Safari Browser actual TextMetrics，未被記作視覺 PASS。

其後 Jamie 已由 Finder 雙擊 A－13 `.command`，在 Chrome／Safari 完成最終實機手動驗證並明確回覆 PASS，之後才建立 Code Commit。Code Commit 為 `6b68c1d92d8c1da64433e7b64abb779e442b3d36`（`feat(bn): add A13 Skinny BN APP template`），`git diff --check HEAD^ HEAD` PASS，精確包含：

- `bn/templates/A/13-skinny-bn-app.js`
- `bn/launch/viewer.html`
- `bn/launch/A/13_Skinny BN_APP.command`（Git mode `100755`）
- `bn/assets/A/底圖/13_Skinny BN_APP.png`
- `bn/assets/A/對位/13_Skinny BN_APP.png`

#### 5.1.14 `14_Skinny BN_PC`

##### 5.1.14.1 正式版位與資產規格

| 項目 | 正式需求 |
|---|---|
| 正式名稱 | `14_Skinny BN_PC` |
| 樣式／內部 Type | 樣式 A／Type A |
| 版位分類 | 特殊文字訊息版位（兩-input 版位） |
| Canvas | 400 × 110px transparent Canvas |
| Template renderer | `bn/templates/A/14-skinny-bn-pc.js` |
| 正式底圖 | `bn/assets/A/底圖/14_Skinny BN_PC.png` |
| 底圖 intrinsic dimensions | 384 × 96px |
| 底圖正式 placement | `8, 7, 384, 96`；原尺寸 1:1、正式 1× |
| 正式對位圖 | `bn/assets/A/對位/14_Skinny BN_PC.png`（400 × 110px） |
| Viewer | `bn/launch/viewer.html` |
| Viewer route | `viewer.html?type=A&bn=14_Skinny%20BN_PC` |
| Finder Launch | `bn/launch/A/14_Skinny BN_PC.command` |

正式底圖 intrinsic dimensions 為 384 × 96，不等於 Canvas 400 × 110；renderer 只以 `8, 7, 384, 96` 原尺寸 1:1、正式 1× 繪製，不 Resize、不 stretch、不 crop、不 scale-to-fit、不補邊，Canvas 四周保留透明區。Canvas 400 × 110 與底圖 intrinsic 384 × 96 採各自精確 dimension guard，結構錯誤 hard-stop。正式對位圖為 400 × 110px，Viewer 保留其原始 Alpha，以相同原點及原尺寸 1:1、CSS opacity 1 疊加，只供校稿；對位圖不合成進正式 Canvas。

A－14 精確只有兩個動態文字欄位（第一行、第二行）。右側播放鍵、蝦皮公仔、紙箱等均屬正式底圖固定圖像內容，不是文字欄位、input、CTA、runtime frame 或 renderer text layer。

##### 5.1.14.2 正式文字規格與座標

| 欄位 | 字型／字重 | 字級 | 顏色 | Runtime frame（left, top, width, height） | 字數上限 |
|---|---|---:|---|---|---:|
| 第一行 | `ShopeeNotoSans Medium` | 20pt | `#ffffff` | `18, 23, 150, 25` | 5 |
| 第二行 ordinary | `ShopeeNotoSans Bold` | 22.5pt | `#fff285` | `18, 56, 195, 29` | 6 |
| 第二行 `$`／`%` | `ShopeeNotoSans Bold` | 19pt | `#fff285` | 同一第二行 frame 與同一 input | 同第二行 |

所有字級直接使用 Photoshop 原始 `pt` 作 Canvas font specification，沒有人工 `pt → px` 換算。字數算法維持 ASCII = 0.5、非 ASCII = 1，第一行／第二行上限為 5／6。

兩欄均以 `measureText()` 的 `actualBoundingBoxLeft`、`actualBoundingBoxRight`、`actualBoundingBoxAscent` 與 `actualBoundingBoxDescent` 計算完整 actual ink bbox。水平方向為 **actual-ink 靠左對齊**：實際 glyph ink 左緣精確落在各自 `frame.left = 18px`，不是只依賴 `textAlign = "left"`，也與 A－13 的水平置中不同；垂直方向則將完整 actual ink bbox 置中於各自 frame。空字串回傳 0 × 0 validation 且不繪製。

Photoshop 原始 frames 為：

- 第一行：`959, 418, 150, 25`
- 第二行：`959, 451, 195, 29`

Photoshop 工作區到 runtime Canvas 的座標轉換為 `xLocal = xPhotoshop - 941`、`yLocal = yPhotoshop - 395`（兩框逐一驗算一致）。Renderer 直接使用上述 runtime frames，不把 Photoshop 工作區座標當作 runtime 座標。

##### 5.1.14.3 Local 2× Medium 與正式繪製順序

A－14 使用版位 local `MEDIUM_RENDER_SCALE = 2`：temporary transparent Canvas 固定為 800 × 220，context 使用 `scale(2, 2)`。只有第一行 Medium 20pt 進入 local 2× layer，仍使用正式 logical frame 與原始 pt，沒有 measurement ×2／÷2 補償，再以 `imageSmoothingEnabled = true`、`imageSmoothingQuality = "high"` 縮回正式 400 × 110 Canvas。

正式底圖與第二行 Bold 22.5pt ordinary、Bold 19pt `$`／`%` 維持正式 1×，Bold 不進 Medium layer。正式繪製順序為：

1. clear transparent Canvas。
2. 正式底圖 `8, 7, 384, 96` 以原尺寸 1:1、正式 1× 繪製。
3. 第一行 Medium transparent local 2× layer 高品質縮回並合成。
4. 第二行 Bold mixed runs 以正式 1× 繪製。

正式 Canvas 使用 `globalAlpha = 1` 與 `globalCompositeOperation = "source-over"`。此 local 2× 只屬 A－14 版位特定行為，不建立 shared／global Medium helper、base renderer、Registry 或 Framework。

##### 5.1.14.4 第二行 mixed-run 規則

第二行維持單一 input。Ordinary 22.5pt 與 `$`／`%` 19pt runs 先 tokenize，再依 advance width 連續排列，沒有獨立 symbol input、fixed symbol offset、spacing compensation、自動縮字、換行或裁切。

Symbol baseline 使用相鄰 ordinary glyph actual ink-bottom：`$` 優先參考後方 ordinary glyph，無後方時回退前方；`%` 優先參考前方 ordinary glyph，無前方時回退後方；相鄰 glyph 逐字掃描並跳過無 ink 字元。此規則支援 symbol 位於開頭、中間、結尾及多 symbol。完成全部 runs 後合併完整 mixed group actual ink bbox，再將整組 actual ink 左緣對齊第二行 `frame.left` 並在 frame 內垂直置中（整組左對齊，與 A－13 的整組水平置中不同），最後逐 run 繪製。

##### 5.1.14.5 Frame-fit 與 hard-stop guards

A－14 沿用 A－11～13 最終正式 frame-fit policy：renderer 依真實 actual ink metrics 如實計算並回傳兩欄各自的 `inkWidth`、`inkHeight`、`inkLeft`、`inkTop`、`inkRight`、`inkBottom`、`fitsWidth` 與 `fitsHeight`；`fitsWidth: false` 或 `fitsHeight: false` 是 validation 結果，不是 render blocker，也不會被強制改成 `true`，不加入 epsilon、tolerance、offset、縮字或 workaround。

Canvas／HTMLImageElement 型別、image complete／decode、底圖 intrinsic dimensions 精確 384 × 96、Canvas dimensions 精確 400 × 110、placement／frame finite、positive 及 Canvas bounds、正式與 temporary 2D context、temporary Canvas 精確 800 × 220、font-ready，以及 non-finite TextMetrics／ink geometry 等結構性錯誤仍維持 hard-stop，並回報 A－14 專屬錯誤。

Font-ready 沿用 Viewer 既有正式 `ShopeeNotoSans Medium`／`ShopeeNotoSans Bold` WOFF2 mapping，不新增 font mapping；renderer 透過 `document.fonts.load()` 與 `document.fonts.check()` 精確檢查 20pt Medium、22.5pt Bold 及 19pt Bold；未 ready 時 hard-stop，不 fallback。

##### 5.1.14.6 Viewer 兩-input 支援

A－14 route 為 `viewer.html?type=A&bn=14_Skinny%20BN_PC`，`URLSearchParams` 解碼後為 `type=A`、`bn=14_Skinny BN_PC`。Canvas、Preview 與 overlay 均為 400 × 110。

A－14 直接復用 A－13 已落地並 PASS 的 Viewer 版位別 fieldConfig 兩-input 架構，只最小追加 A－14 route 與自己的 fieldConfig，沒有再次重構 Viewer：第一行 input label 為「第一行」、上限 5、預設校稿文字「週六免運日」；第二行 input label 為「第二行」、上限 6、預設校稿文字「全站$499免運」。第三個既有 input 與 label 沿用 hidden＋disabled 機制，不進 fields、不進 state、不參與 render／validation。

A－01～12 各 route 仍維持既有三個 input 與 8／7／17 上限，A－13 route 仍維持兩 input 與 5／6 上限，行為完全不變。`countTextUnits`（ASCII 0.5／非 ASCII 1）、IME-safe、compositionend 後 commit、超限 rollback、overlay toggle 與圖片 decode／intrinsic dimension guard 均沿用既有機制。

##### 5.1.14.7 Launch／驗證狀態與 Code Commit

`bn/launch/A/14_Skinny BN_PC.command` 完全沿用 A－13 已 PASS 結構，固定使用 `127.0.0.1:4173` 開啟 A－14 route。正確 Viewer service 已存在時沿用；其他 service 占用 port 時停止提示，不換 port、不 kill 外部 process，必要時使用 `/usr/bin/python3 -m http.server`，且只停止自身啟動的 server。Filesystem executable，Git executable mode 為 `100755`。

Claude Phase 5 已完成當時環境可執行的 deterministic／static／sandbox 驗證：renderer／Viewer module 語法、HTTP resources、正式 assets decode／dimensions／Alpha／SHA-256、底圖 placement 與雙 guard、runtime frames、font-ready 結構、local 2×／1× 分層、actual-ink 左對齊＋垂直置中公式、renderer mock 測試 35/35（含 `$`／`%` 開頭／中間／結尾、多 symbol、純 symbol、ordinary-only、advance 連續性、整組左對齊、空字串、frame-fit false 不阻擋、結構性 hard-stop）、Viewer 邏輯測試 15/15，以及 A－01～13 regression 與 Git Scope。sandbox 無 zsh，`zsh -n` 未執行，改以與 A－13 已 PASS script 的逐行 diff（僅預期 URL／函式名／提示替換）作替代證據；mock／sandbox metrics 不是真實 Chrome／Safari Browser actual TextMetrics，未被記作視覺 PASS。

其後 Jamie 已由 Finder 雙擊 A－14 `.command`，在 Chrome／Safari 完成最終實機手動驗證並明確回覆 PASS，之後才建立 Code Commit。Code Commit 為 `dc43507386a5adfa1d9ab6b4b99f3da8a1b5ca7d`（`feat(bn): add A14 Skinny BN PC template`），`git diff --check HEAD^ HEAD` PASS，精確包含：

- `bn/templates/A/14-skinny-bn-pc.js`
- `bn/launch/viewer.html`
- `bn/launch/A/14_Skinny BN_PC.command`（Git mode `100755`）
- `bn/assets/A/底圖/14_Skinny BN_PC.png`
- `bn/assets/A/對位/14_Skinny BN_PC.png`

#### 5.1.15 `15_AR`

##### 5.1.15.1 正式版位與資產規格

| 項目 | 正式需求 |
|---|---|
| 正式名稱 | `15_AR` |
| 樣式／內部 Type | 樣式 A／Type A |
| 版位分類 | 特殊文字訊息版位（兩-input 版位） |
| Canvas | 100 × 100px |
| Template renderer | `bn/templates/A/15-ar.js` |
| 正式底圖 | `bn/assets/A/底圖/15_AR.jpg`（JPEG RGB） |
| 底圖 intrinsic dimensions | 100 × 100px |
| 底圖正式 placement | `0, 0, 100, 100`；原尺寸 1:1、正式 1× |
| 正式對位圖 | `bn/assets/A/對位/15_AR.png`（RGBA，100 × 100px） |
| Viewer | `bn/launch/viewer.html` |
| Viewer route | `viewer.html?type=A&bn=15_AR` |
| Finder Launch | `bn/launch/A/15_AR.command` |

正式底圖 intrinsic dimensions 精確等於 Canvas 100 × 100；renderer 只以 `0, 0, 100, 100` 原尺寸 1:1、正式 1× 繪製，不 Resize、不 stretch、不 crop、不 scale-to-fit、不補邊。Canvas 100 × 100 與底圖 intrinsic 100 × 100 採各自精確 dimension guard，結構錯誤 hard-stop。正式對位圖為 100 × 100px，Viewer 保留其原始 Alpha，以相同原點及原尺寸 1:1、CSS opacity 1 疊加，只供校稿；對位圖不合成進正式 Canvas。

A－15 精確只有兩個動態文字欄位（第一行、第二行），無第三欄。對位 PNG 中 level-49 的三條 72px 寬橫條只是 overlay 校稿間距指示，不是文字欄位、input、renderer layer 或第三欄。

##### 5.1.15.2 正式文字規格與座標

| 欄位 | 字型／字重 | 字級 | 顏色 | Runtime frame（left, top, width, height） | 字數上限 |
|---|---|---|---|---|---:|
| 第一行 Han 字元 | `ShopeeNotoSans Bold` | 18pt | `#fff285` | `14, 22, 72, 25` | 3 |
| 第一行 其他字元 | `ShopeeNotoSans Bold` | 18.5pt | `#fff285` | 同一第一行 frame 與同一 input | 同第一行 |
| 第二行 Han 字元 | `ShopeeNotoSans Bold` | 18pt | `#fff285` | `14, 54, 72, 25` | 3 |
| 第二行 其他字元 | `ShopeeNotoSans Bold` | 18.5pt | `#fff285` | 同一第二行 frame 與同一 input | 同第二行 |

兩行規格完全相同。所有字級直接使用原始 `pt` 作 Canvas font specification，沒有人工 `pt → px` 換算。第一行／第二行上限均為 3；Viewer 字數算法仍是既有 ASCII = 0.5、非 ASCII = 1。

**字級 tokenizer 與 Viewer 字數算法是兩套獨立規則，不得混用**：renderer 的字級分類使用 JavaScript Unicode property escape `/\p{Script=Han}/u`，以 `for...of` 按 code point 迭代，連續同類字元合併為 run——Unicode Script=Han 字元 → Bold 18pt，其他所有字元 → Bold 18.5pt。「其他」包含英文字母、數字、`$`、`%`、半形／全形符號、空白、非 ASCII 拉丁字元（如 `é`）；Unicode Script=Han 的 `々` 依標準分類為 Han 18pt。字級分類不是 ASCII vs 非 ASCII；ASCII 0.5／非 ASCII 1 只用於 Viewer 字數計算。

Photoshop 原始 frames 為：

- 第一行：`481, 422, 72, 25`
- 第二行：`481, 454, 72, 25`

Photoshop 工作區到 runtime Canvas 的座標轉換為 `xLocal = xPhotoshop - 467`、`yLocal = yPhotoshop - 400`（兩框逐一驗算一致）。Renderer 直接使用上述已確認 runtime frames，不在 render 時重新推算。

##### 5.1.15.3 共用 alphabetic baseline 與整組置中

所有 runs 使用 `textAlign = "left"`、`textBaseline = "alphabetic"`，各自以 `measureText()` 的 `width` 與 `actualBoundingBoxLeft/Right/Ascent/Descent` 量測，任一 non-finite hard-stop。同一行所有 18pt／18.5pt Bold runs 共用同一 alphabetic baseline，不使用 A－13／14 的 `$`／`%` ink-bottom baseline 規則、不加 per-run baseline offset；各 run 依 advance width 連續排列，無人工 spacing。合併整行完整 mixed-group actual ink bbox 後，整組在各自 72 × 25 frame 內水平＋垂直置中（以 actual-ink bbox 計算，不是單純 `textAlign = "center"`）；空字串不繪製並回傳 0 × 0 validation。

##### 5.1.15.4 全部正式 1×，無 local 2×

A－15 兩行全部使用 Bold，沒有任何 Medium run，因此 **A－15 不建立 local 2× temporary Canvas，全部文字與底圖維持正式 1×**。先前輸入中的「Medium 直接採 local 2×」已在 Phase 1／2 調查確認與本版實際文字規格衝突，並於 Phase 3 正式裁決為沿用前版的筆誤；Bold 不得套入 2×。此結果只屬 A－15，不反向改寫 A－01～14 各版既有 local 2× 規格。

正式繪製順序為：

1. clear Canvas。
2. 正式底圖 `0, 0, 100, 100` 以原尺寸 1:1、正式 1× 繪製。
3. 第一行 Bold mixed runs 以正式 1× 繪製。
4. 第二行 Bold mixed runs 以正式 1× 繪製。

正式 Canvas 使用 `globalAlpha = 1` 與 `globalCompositeOperation = "source-over"`。

##### 5.1.15.5 Font-ready、frame-fit 與 hard-stop guards

Font-ready 精確檢查 `18pt "ShopeeNotoSans Bold"` 與 `18.5pt "ShopeeNotoSans Bold"`，沿用 Viewer 既有 Bold WOFF2 mapping，透過 `document.fonts.load()` 與 `document.fonts.check()`（test text 涵蓋 Han 與非 Han）；未 ready hard-stop、不 fallback、不新增 font mapping。

A－15 沿用 A－11～14 最終 frame-fit policy：兩行各自如實計算並回傳 `inkWidth`、`inkHeight`、`inkLeft`、`inkTop`、`inkRight`、`inkBottom`、`fitsWidth`、`fitsHeight` 八欄位；`fitsWidth: false` 或 `fitsHeight: false` 不改成 `true`、不阻擋 render，不加入 epsilon、tolerance、offset 或縮字。Canvas／HTMLImageElement 型別、image complete／decode、底圖 intrinsic ≠ 100 × 100、Canvas ≠ 100 × 100、placement／frame geometry、2D context、font-ready、non-finite TextMetrics／ink geometry 等結構性錯誤仍 hard-stop，並回報 A－15 專屬錯誤。本版無 temporary Canvas，因此沒有 2× temporary Canvas guard。

##### 5.1.15.6 Viewer 兩-input 支援

A－15 route 為 `viewer.html?type=A&bn=15_AR`。Canvas、Preview 與 overlay 均為 100 × 100。

A－15 直接復用 A－13／14 已 PASS 的 Viewer 版位別 fieldConfig 兩-input 架構，只最小追加 route 與自己的 fieldConfig，未重構 Viewer：第一行 input label 為「第一行」、上限 3、預設校稿文字「宅配滿」；第二行 input label 為「第二行」、上限 3、預設校稿文字「$490」。第三個既有 input 與 label 沿用 hidden＋disabled 機制，不進 fields、不進 state、不參與 render／validation。

A－01～12 各 route 仍維持三個 input 與 8／7／17 上限，A－13～14 route 仍維持兩 input 與 5／6 上限，行為完全不變。`countTextUnits`（ASCII 0.5／非 ASCII 1）、IME-safe、compositionend 後 commit、超限 rollback、overlay toggle 與圖片 decode／intrinsic dimension guard 均沿用既有機制。

##### 5.1.15.7 Launch／驗證狀態與 Code Commit

`bn/launch/A/15_AR.command` 完全沿用 A－14 已 PASS 結構，固定使用 `127.0.0.1:4173` 開啟 `?type=A&bn=15_AR`。正確 Viewer service 以 marker 驗證後沿用；其他 service 占用 port 時停止提示，不換 port、不 kill 外部 process，必要時使用 `/usr/bin/python3 -m http.server`，且只停止自身啟動的 server。Filesystem executable，Git executable mode 為 `100755`。

Claude Phase 5 已完成當時環境可執行的 deterministic／static／sandbox 驗證：renderer／Viewer module 語法、HTTP 200、正式 assets decode／dimensions／SHA-256、placement 與雙 guard、runtime frames、font-ready 結構、renderer mock 測試 27/27（含 tokenizer 純 Han／純 Other／多次切換／`$`／`%`／全形符號／全形空白／`é`／`々`、共用 baseline（所有 run y 相同）、advance continuity、mixed-group actual-ink 置中、無 temporary Canvas／無 `scale(2,2)`、空字串、frame-fit false non-blocking、結構性 hard-stop）、Viewer 邏輯測試 15/15，以及 A－01～14 regression 與 Git Scope（`git diff --check` PASS）。sandbox 無 zsh，`zsh -n` 未執行，改以與 A－14 已 PASS script 的逐行 diff（僅預期替換）作替代證據；mock metrics 不是 Chrome／Safari actual TextMetrics，未被記作視覺 PASS。

其後 Jamie 已由 Finder 雙擊 A－15 `.command`，在 Chrome／Safari 完成最終實機手動驗證並明確回覆 PASS，之後才建立 Code Commit。Code Commit 為 `5c833297c31f7f98269aeec20d65b59b8b5bb126`（`feat(bn): add A15 AR template`），`git diff --check HEAD^ HEAD` PASS，精確包含：

- `bn/templates/A/15-ar.js`
- `bn/launch/viewer.html`
- `bn/launch/A/15_AR.command`（Git mode `100755`）
- `bn/assets/A/底圖/15_AR.jpg`
- `bn/assets/A/對位/15_AR.png`

兩張 committed assets 的 SHA-256 與 Phase 2／5 原檔完全一致（底圖 `d5098b9dfea1e53e3c60a406f5ffd9e3f04291dbbfc51ac8f1217dfb8de9a136`、對位 `d1cf28e80ea937145dfd749655179898af5a7cf0606952e91f61670139f83664`），只加入版本控制、零修改。

#### 5.1.16 `16_副區`

##### 5.1.16.1 正式版位與資產規格

| 項目 | 正式需求 |
|---|---|
| 正式名稱 | `16_副區` |
| 樣式／內部 Type | 樣式 A／Type A |
| 版位分類 | 固定版型＋獨立文字訊息（A－16 是目前第一個正式四-input 版位） |
| Canvas | 1200 × 220px |
| Template renderer | `bn/templates/A/16-sub-area.js` |
| 正式底圖 | `bn/assets/A/底圖/16_副區.jpg`（JPEG RGB，intrinsic 1200 × 220） |
| 正式對位圖 | `bn/assets/A/對位/16_副區.png`（RGBA，intrinsic 1200 × 220） |
| 底圖正式 placement | `0, 0, 1200, 220`；原尺寸 1:1、正式 1× |
| Viewer | `bn/launch/viewer.html` |
| Viewer route | `viewer.html?type=A&bn=16_%E5%89%AF%E5%8D%80` |
| Finder Launch | `bn/launch/A/16_副區.command` |

正式底圖 intrinsic dimensions 精確等於 Canvas 1200 × 220；renderer 只以 `0, 0, 1200, 220` 原尺寸 1:1、正式 1× 繪製，不 Resize、不 stretch、不 crop、不 scale-to-fit、不補邊。Canvas 1200 × 220 與底圖 intrinsic 1200 × 220 採各自精確 dimension guard，結構錯誤 hard-stop。深綠／淺色固定區塊與邊框全部屬正式底圖內容，renderer 不建立任何 graphics layer。

A－16 動態內容精確為四個文字欄位：左標題、左文案、右標題、右文案，不合併。原 Phase 0 文件的 A－16 尺寸舊記載 `1200×200` 已依 Jamie Locked Input、正式底圖／對位圖 intrinsic、完成參考圖與 committed renderer 的一致證據修正為 `1200×220`。

##### 5.1.16.2 正式文字規格與座標

| 欄位 | 字型／字重 | 字級 | 顏色 | Runtime frame（left, top, width, height） | 字數上限 |
|---|---|---:|---|---|---:|
| 左標題 | `ShopeeNotoSans Medium` | 34pt | `#ffffff` | `37, 44, 540, 42` | 10 |
| 右標題 | `ShopeeNotoSans Medium` | 34pt | `#ffffff` | `622, 44, 540, 42` | 10 |
| 左文案 ordinary | `ShopeeNotoSans Bold` | 34pt | `#ee4d2d` | `37, 121, 540, 43` | 10 |
| 右文案 ordinary | `ShopeeNotoSans Bold` | 34pt | `#ee4d2d` | `622, 121, 540, 43` | 10 |
| 文案 `$`／`%` | `ShopeeNotoSans Bold` | 28pt | `#ee4d2d` | 同一文案 frame 與同一 input | 同文案 |

所有字級直接使用 Photoshop 原始 `pt` 作 Canvas font specification，沒有人工 `pt → px` 換算。四欄 limit 均為 10；Viewer 字數算法沿用 ASCII = 0.5、非 ASCII = 1。預設校稿文字為左標題「全站大免運」、左文案「店取滿$199免運」、右標題「商城優選皆適用」、右文案「宅配滿$490免運」（`countTextUnits` 實測 5／7／7／7，均 ≤10）。

四個文字框全部以 `measureText()` 的 `actualBoundingBoxLeft`、`actualBoundingBoxRight`、`actualBoundingBoxAscent` 與 `actualBoundingBoxDescent` 計算完整 actual ink bbox，在各自 frame 內水平＋垂直置中；`textAlign = "left"`、`textBaseline = "alphabetic"`，由 metrics 補償 draw origin 使完整 ink bbox 中心對齊 frame 中心，不以 `textAlign = "center"` 取代 actual-ink 計算（與 A－11／13 已 PASS 公式同型）。空字串回傳 0 × 0 validation 且不繪製。

Photoshop 原始 frames 為：

- 左標題：`313, 384, 540, 42`
- 右標題：`898, 384, 540, 42`
- 左文案：`313, 461, 540, 43`
- 右文案：`898, 461, 540, 43`

Photoshop 工作區到 runtime Canvas 的座標轉換為 `xLocal = xPhotoshop - 276`、`yLocal = yPhotoshop - 340`（四框逐一驗算一致）。Renderer 直接使用已確認 runtime frames，不在 render 時重新推算。

##### 5.1.16.3 Local 2× Medium（雙標題單一 layer）與正式繪製順序

A－16 使用版位 local `MEDIUM_RENDER_SCALE = 2`：建立**單一** transparent temporary Canvas，固定 2400 × 440 並精確尺寸 guard，context 使用 `scale(2, 2)`；左標題與右標題兩個 Medium 34pt 文字依各自正式 logical runtime frame 與原始 pt 在同一 layer 依序繪製（不做 measurement ×2／÷2 人工補償），再以 `imageSmoothingEnabled = true`、`imageSmoothingQuality = "high"` **一次** downsample 回正式 1200 × 220 Canvas；兩個標題 validation 各自保留。

正式底圖與左右 Bold 34pt ordinary、Bold 28pt `$`／`%` 全程維持正式 1×，Bold 不進 Medium layer。正式繪製順序為：

1. clear transparent Canvas。
2. 正式底圖 `0, 0, 1200, 220` 以原尺寸 1:1、正式 1× 繪製。
3. Medium 左右雙標題 local 2× layer 高品質縮回並合成。
4. 左 Bold mixed 文案以正式 1× 繪製。
5. 右 Bold mixed 文案以正式 1× 繪製。

正式 Canvas 使用 `globalAlpha = 1` 與 `globalCompositeOperation = "source-over"`。此 local 2× 只屬 A－16 版位特定行為，不建立 shared／global Medium helper、base renderer、Registry 或 Framework。

##### 5.1.16.4 文案 mixed-run 規則

左右文案各自維持單一 input 並各自獨立排版。Ordinary 34pt 與 `$`／`%` 28pt runs 先 tokenize，再依 advance width 連續排列，沒有獨立 symbol input、fixed symbol offset、spacing compensation、自動縮字、換行或裁切。

Symbol baseline 使用相鄰 ordinary glyph actual ink-bottom：`$` 優先參考後方 ordinary glyph，無後方時回退前方；`%` 優先參考前方 ordinary glyph，無前方時回退後方；相鄰 glyph 逐字掃描並跳過無 ink 字元。此規則支援 symbol 位於開頭、中間、結尾及多 symbol。完成全部 runs 後合併完整 mixed-group actual ink bbox，再將整組於各自 540 × 43 frame 內水平＋垂直置中（整組置中，不是 A－12／14 的左對齊），最後逐 run 正式 1× 繪製。

##### 5.1.16.5 Font-ready、frame-fit 與 hard-stop guards

Font-ready 精確檢查 `34pt "ShopeeNotoSans Medium"`、`34pt "ShopeeNotoSans Bold"` 與 `28pt "ShopeeNotoSans Bold"`，沿用 Viewer 既有 Medium／Bold WOFF2 mapping，透過 `document.fonts.load()` 與 `document.fonts.check()`；未 ready hard-stop、不 fallback、不新增 font mapping。

A－16 沿用 A－11～15 最終 frame-fit policy：四欄各自如實計算並回傳 `inkWidth`、`inkHeight`、`inkLeft`、`inkTop`、`inkRight`、`inkBottom`、`fitsWidth`、`fitsHeight` 八欄位；`fitsWidth: false` 或 `fitsHeight: false` 如實保留、不改 `true`、不阻擋 render，不加入 epsilon、tolerance、offset 或縮字。Canvas／HTMLImageElement 型別、image complete／decode、底圖 intrinsic ≠ 1200 × 220、Canvas ≠ 1200 × 220、placement／frame geometry、正式與 temporary 2D context、temporary Canvas ≠ 2400 × 440、font-ready、non-finite TextMetrics／ink geometry 等結構性錯誤仍 hard-stop，並回報 A－16 專屬錯誤。

##### 5.1.16.6 Viewer 四-input 支援

A－16 route 為 `viewer.html?type=A&bn=16_%E5%89%AF%E5%8D%80`，`URLSearchParams` 解碼後為 `type=A`、`bn=16_副區`。Canvas、Preview 與 overlay 均為 1200 × 220。

A－16 是共用 Viewer 第一個正式四-input 版位。本次只做最小擴充而非重構：既有三個靜態 slot 之後新增第 4 個靜態 label＋input slot（初始 hidden＋disabled）；`fieldSlots` 由 3 擴為 4；fieldConfig 建立使用中的 slot 時以最小邏輯解除 hidden。A－16 fieldConfig 為 `leftTitle`（label「左標題」）、`leftCopy`（label「左文案」）、`rightTitle`（label「右標題」）、`rightCopy`（label「右文案」），limit 全部 10。

A－01～12 各 route 仍為三-input 8／7／17，A－13～14 為兩-input 5／6，A－15 為兩-input 3／3，行為完全不變；非 A－16 route 的第 4 slot 維持 hidden＋disabled，不進 fields、state 或 render。`countTextUnits`、IME-safe、compositionend 後 commit、超限 rollback、overlay toggle 與圖片 decode／intrinsic dimension guard 均沿用既有機制。

正式對位圖以原始 Alpha、與 Canvas 同原點、原尺寸 1200 × 220 1:1、CSS opacity 1 疊加，decode 後 dimension guard，只供 toggle 校稿，不合成進正式 Canvas。

##### 5.1.16.7 Launch／驗證狀態與 Code Commit

`bn/launch/A/16_副區.command` 完全沿用 A－15 已 PASS 結構，固定使用 `127.0.0.1:4173` 開啟 `?type=A&bn=16_%E5%89%AF%E5%8D%80`。正確 Viewer service 以 marker 驗證後沿用；其他 service 占用 port 時停止提示，不換 port、不 kill 外部 process，必要時使用 `/usr/bin/python3 -m http.server`，且只停止自身啟動的 server。Filesystem executable，Git executable mode 為 `100755`。

Claude Phase 5 已完成當時環境可執行的 deterministic／static／sandbox 驗證：renderer／Viewer module 語法、HTTP 200、正式 assets decode／dimensions／SHA-256、placement 與雙 guard、四 runtime frames、font-ready 結構、2400 × 440 temporary Canvas、雙 Medium 標題同層 2× 與一次 downsample、Bold 文案 1×、四欄 actual-ink 置中、mixed runs（`$`／`%` 開頭／中間／結尾、多 symbol、純 symbol、advance 連續、baseline fallback）、結構性 hard-stop、Viewer 邏輯測試 20/20（四-input、第 4 slot 顯示邏輯、A－01～15 route 與 limit 不變），以及 A－01～15 regression 與 Git Scope（`git diff --check` PASS）。Renderer mock 測試最終 **34/34 PASS**；初跑曾有 1 項 fitsWidth 測試 FAIL，經查為 mock 測試字串寬度不足 540px 的測試資料問題，非 renderer 缺陷，加長測試字串後全數通過。sandbox 無 zsh，`zsh -n` 未執行，改以與 A－15 已 PASS script 的逐行 diff（僅預期替換）作替代證據；mock metrics 不是 Chrome／Safari actual TextMetrics，未被記作視覺 PASS。

其後 Jamie 已由 Finder 雙擊 A－16 `.command`，在 Chrome／Safari 完成最終實機手動驗證並明確回覆 PASS，之後才建立 Code Commit。Code Commit 為 `714d3d050234ff5935149163fbfc4fcca695a412`（`feat(bn): add A16 sub area template`），`git diff --check HEAD^ HEAD` PASS，精確包含：

- `bn/templates/A/16-sub-area.js`
- `bn/launch/viewer.html`
- `bn/launch/A/16_副區.command`（Git mode `100755`）
- `bn/assets/A/底圖/16_副區.jpg`
- `bn/assets/A/對位/16_副區.png`

兩張 committed assets 的 SHA-256 與 Phase 2／5 原檔完全一致（底圖 `12902843ca43ffc7f1c89669514afa8477675406f96dab4f9b8819f11ba9506e`、對位 `f716ccf2e955e0770e5115966ac1703327a3720e17ece618759015f01f1bee77`），只由 untracked 轉為 tracked、零修改。

#### 5.1.17 `17_門檻表`

##### 5.1.17.1 正式版位與資產規格

| 項目 | 正式需求 |
|---|---|
| 正式名稱 | `17_門檻表` |
| 樣式／內部 Type | 樣式 A／Type A |
| 版位分類 | 動態門檻表（dynamic threshold table；A－17 是目前唯一表格型動態版位） |
| Canvas | 固定 width 1200px；height 動態，`canvasHeight = 290 + middleHeight` |
| 正式輸出格式 | PNG |
| Template renderer | `bn/templates/A/17-threshold-table.js` |
| 正式主標底圖 | `bn/assets/A/底圖/17_主標題.png`（PNG RGBA，intrinsic 1180 × 83） |
| 正式 VIP 底圖 | `bn/assets/A/底圖/17_VIP.png`（PNG RGBA，intrinsic 1180 × 185） |
| 對位圖 | 無。A－17 不使用 overlay，校稿依 presets＋JSON 測試資料與正式參考圖人工比對 |
| Viewer | `bn/launch/viewer.html`（A－17 專用 branch） |
| Viewer route | `viewer.html?type=A&bn=17_%E9%96%80%E6%AA%BB%E8%A1%A8` |
| Finder Launch | `bn/launch/A/17_門檻表.command` |

A－17 與 A－01～16 的「固定 Canvas＋固定底圖＋固定文字 frame」模式不同：主標與 VIP 為固定 asset 區，中段門檻表由 renderer 依資料動態自繪，最終 Canvas 高度依實際內容決定，不補成固定高度、不縮放內容。

##### 5.1.17.2 Canvas 動態 geometry 與中段結構

- body：x = 10、width = 1180；外距 top 10、bottom 12、左右各 10。
- 垂直組成：`17_主標題.png`（1:1 置於 `(10, 10)`）→ dynamic middle → `17_VIP.png`（1:1 接於 `(10, 10 + 83 + middleHeight)`）；三段直接相接。
- 中段：background `#1a9c8b`、直角（外圓角由上下 assets 承擔）；外 padding 四邊 12px；cell gap 水平／垂直 12px；生成色塊 radius 10px。
- 橫向：`12 + 177（左欄） + 12 + 967（logistics area） + 12 = 1180`。
- `middleHeight = 12 + logisticsRowHeight + Σ(12 + thresholdRowHeight) + 12`；`canvasHeight = 10 + 83 + middleHeight + 185 + 12 = 290 + middleHeight`。
- 兩張 assets 只以原尺寸 1:1 繪製並各自精確 intrinsic dimension guard（1180×83／1180×185），不 Resize、不 stretch、不 crop。

##### 5.1.17.3 正式字級單位裁決（Canvas px 同值）

A－17 正式字級經 Visual Tuning 由 Jamie 正式裁決為 **Canvas `px` 同值**：Photoshop 提供的設計數值在本版位 Canvas runtime 必須以同值 `px` 呈現才能還原正式成品尺度；禁止 runtime 使用 `pt`、禁止 96/72、1.333 或其他 pt→px 放大換算。此裁決取代本版位早期以 `pt` 直接作 Canvas font specification 的做法（pt runtime 曾造成整體約 4/3 放大與「週三/週六」多斷一行，已修正，不得記為正式規格）。

| 文字 | 字型／字重 | 字級 | 顏色 |
|---|---|---:|---|
| 主標題 | `ShopeeNotoSans Bold` | 50px | `#ffed54` |
| 左欄「適用物流」label／門檻名稱 | `ShopeeNotoSans Bold` | 28px | `#ffee9f` |
| 物流名稱 line1／line2（Han ≤5） | `ShopeeNotoSans Bold` | 28px | `#006351` |
| 物流名稱 line2（Han >5） | `ShopeeNotoSans Bold` | 17px | `#4e4e4e` |
| 金額 | `ShopeeNotoSans Bold` | 32px | 依 dropdown：綠 `#006351`／紅 `#d0011b` |
| VIP 標題 | `ShopeeNotoSans Bold` | 36px | `#d0011b` |
| VIP 文案 | `ShopeeNotoSans Bold` | 34px | `#ffffff` |
| CTA | `ShopeeNotoSans Regular` | 30px | `#ffffff` |

主標題上限 15 字、VIP 標題／文案各 20 字、CTA 3 字（箭頭屬 VIP 底圖固定 graphics，不在 CTA 文字內）。主標題文字於 1180 × 83 主標區內依 actual ink bbox 水平＋垂直置中。Font-ready 以 `document.fonts.load()`／`check()` 精確檢查上表全部字級；A－17 不使用 Medium，無 Medium local 2×。

##### 5.1.17.4 物流欄與物流名稱

- 最多 5 個物流欄；實際使用 N 欄時欄寬 `(967 − 12 × (N − 1)) / N`，允許 fractional coordinates；完全未使用之物流欄（名稱與該欄全部 color／amount 皆空）不生成並重新分配寬度。
- line1／line2 為 Excel／test model 的兩個明確欄位，renderer 不自行把 line1 拆成兩行。
- 任一有效物流存在 line2 → logisticsRowHeight = 80px；否則 45px；左側「適用物流」cell 與所有物流 cells 同高。
- line2 以 Unicode Han 計數（`/\p{Script=Han}/u` 逐 code point；A－17 local 實作）：Han ≤5 → 28px `#006351`；Han >5 → 17px `#4e4e4e`。此為正式視覺規則，不是超限縮字；不使用 UTF-16 length、code point 總數或 countTextUnits。
- line1＋line2 作為文字 group：垂直依整組 ink bbox 置中、各 visual line 水平各自置中，baseline pitch 30px。

##### 5.1.17.5 門檻名稱換行與 row height

- 左欄 width 177px、fill `#006351`、text safe padding 四邊 12px、可用文字寬 153px。
- 門檻名稱支援 literal `\n` 強制斷行；每段內再依 153px 以實際 `measureText()` 寬度 greedy auto-wrap（按 code point 迭代，不拆 surrogate pair）；不縮字、不 scale-to-fit，超寬由 frame-fit 如實回報。
- 全部 visual lines 依 30px baseline pitch 堆疊，整組垂直置中、各行水平置中。
- `rowHeight = 70 + (lineCount − 1) × 30`；金額內容不參與 row height 計算。

##### 5.1.17.6 金額 cell

fill `#fffced`、radius 10、32px Bold、永遠單行、於 cell（或合併後整格）內水平＋垂直置中；高度跟隨所屬 threshold row。顏色只依資料 dropdown 對映：綠 → `#006351`、紅 → `#d0011b`，renderer 不依金額內容猜色。空 amount 仍生成空白白格，不改 row geometry。

##### 5.1.17.7 `↑` merge 與無效 `↑`

- 控制值（color／amount／`↑` 判斷）解析前先 trim ASCII whitespace＋U+3000；`↑` 為 trim 後精確 U+2191，是 merge 指令，不是輸出文字，renderer 永不繪製 `↑` 字元。
- 有效 `↑` 只能併入正上方相鄰的 open segment（有效金額起始格或其連續延伸）；merged geometry 必須包含跨越的實際 row heights＋被覆蓋的 12px vertical gaps，不得使用 fixedRowHeight × rowspan；文字與顏色沿用起始金額 cell，於完整 merged 白格內雙向置中。空白 amount 會關閉 segment。
- 無效 `↑`（首列即 `↑`、上方為空白格或無效格）：生成獨立空白白格＋warning（標明物流×門檻與原因），不猜值、不猜 merge、不畫 `↑`，整張照常生成。

##### 5.1.17.8 Warnings 與 hard-stop 邊界

可恢復資料問題一律 warnings＋照常生成：物流名稱空白但欄內有資料（欄仍生成、名稱格空白）；門檻 label 空白但列內有資料（列仍生成、左格空白、70px）；color 有值 amount 空白（空白白格）；amount 有值 color 空白（白格、不畫金額，不得預設綠色）；非法 color（同前）；`↑` 帶 color（忽略並警告）；無效 `↑`。結構性錯誤才 hard-stop：canvas／image 型別、asset intrinsic 不符、字型未 ready、2D context 失敗、非有限 metrics、>5 物流／>9 門檻、全空 table。frame-fit 沿用既有 policy：`fitsWidth`／`fitsHeight` 如實回傳，false 不阻擋 render、不縮字、不加 tolerance。

##### 5.1.17.9 VIP 固定區與 local frames

VIP asset 已含橘底、蝦皮 VIP graphics/logo、白色 title rectangle、黑色 CTA pill 與箭頭等全部固定 graphics，renderer 不重畫。三組文字使用已驗證的 asset-local frames（相對 1180 × 185 asset 左上角；runtime origin 為 `(10, 10 + 83 + middleHeight)`）：

| 欄位 | Local frame（left, top, width, height） | 對齊 |
|---|---|---|
| VIP 標題 | `217, 42, 935, 34` | 水平＋垂直置中，36px Bold `#d0011b` |
| VIP 文案 | `201, 128, 720, 34` | 水平＋垂直置中，34px Bold `#ffffff` |
| CTA | `1003, 128, 85, 34` | 靠右＋垂直置中，30px Regular `#ffffff` |

Local frames 由 Photoshop absolute frames（title 3545/1232、copy 3529/1318、CTA 4331/1318）經單一平移 `local = absolute − (3328, 1190)` deterministic 驗證成立（A－17 VIP Local Frame Verification PASS）；Photoshop 大工作區 absolute 座標不寫入 renderer。

##### 5.1.17.10 左欄黃字 local 2×（Jamie Manual PASS）

A－17 經獨立 Investigation 與 Jamie 批准／Manual PASS，僅對左側兩類 28px Bold `#ffee9f` 黃字——「適用物流」label 與全部門檻名稱——採版位 local 2× rendering：建立 transparent temporary canvas（1200 × canvasHeight 的 2× backing、尺寸 guard），`scale(2, 2)` 後以原字級與原 logical frames／對齊邏輯繪製，再以 `imageSmoothingEnabled = true`、`imageSmoothingQuality = "high"` 一次 downsample 回正式 1× Canvas。此規則**只限 A－17 左欄黃字**：不套用右側物流名稱（同為 28px Bold）、17px 小字、金額、主標、VIP 標題／文案、CTA，不是全域規則，不得推廣到其他版位；geometry、wrap、字級、frame 均不因 local 2× 改變（wrap 與定位仍依正式 1× metrics，`measureText` 不受 transform 影響）。

##### 5.1.17.11 已接受的 nominal-frame overflow（Jamie 裁決）

Jamie 已明確裁決下列兩項為「可接受的 nominal-frame overflow」，不是視覺缺陷、不是 Coding bug，不需要修改字級／frame／座標／字型／geometry，也不阻擋 Manual Validation PASS：

- VIP 標題：actual ink 高約 36px，相對 34px nominal frame `fitsHeight = false`。
- CTA：`訂閱去` actual ink 寬約 88px，相對 85px nominal frame `fitsWidth = false`（右緣仍精確對齊 frame 右緣）。

兩項 frame-fit diagnostic warning 保留於 Launch 警告區作校稿診斷資訊，不因此修改 renderer。

##### 5.1.17.12 Viewer A－17 branch（presets＋JSON textarea）

A－17 不使用一般 4-input fieldConfig：既有 4 個 field slots 於 A－17 route hidden＋disabled；改提供 preset select（P1～P7）＋JSON textarea＋warnings 區。P1 為正式 A.xlsx sample（4 物流／3 門檻／↑ merge／Han >5 小字），P2～P7 依序覆蓋 5 欄最小高度、單欄最寬、Han 5／6 邊界、1～4 行換行（含 `\n` 與純 auto-wrap）、空白金額／中間空列／跨異高 merge、錯誤資料 warnings。JSON parse 失敗顯示錯誤並保留上一個有效 Preview；IME composition 中不 parse。A－17 無 overlay：overlay image／toggle 隱藏停用、decode guard 跳過。每次 render 後 Viewer 依 `canvas.width/height` 同步 preview／canvas CSS 尺寸（Canvas intrinsic 與 CSS 維持精確 1:1）。此校稿 UI 只限 Launch 開發／視覺校稿，不是正式 Editor、Excel Import、Workspace 或 Export；A－17 控制台第一輪 Editor 排除規格維持不變。A－01～16 各 route 行為零變動。

##### 5.1.17.13 Launch／驗證狀態與 Code Commit

`bn/launch/A/17_門檻表.command` 完全沿用 A－16 已 PASS 結構（僅替換版位名與 URL），固定 `127.0.0.1:4173`、marker 驗證、占用即停、不換 port、不 kill 外部 process；Git mode `100755`。

Phase 5 以真實 Chromium（Playwright headless）＋正式 Shopee WOFF2 完成 AI 自驗：P1 正式 sample 於 px runtime 為 4 物流、columnWidth 232.75、logistics row 80、threshold heights `[70, 100, 70]`（「週三/週六\n加碼」為 2 visual lines／100px）、middleHeight 380、Canvas **1200 × 670**；P1～P7 dynamic geometry／`↑` merge（含跨異高列與 pixel 級無縫驗證）／blank amount／warnings（P7 七條）／JSON rollback／IME／overlay disabled／動態 Canvas 全部驗證 PASS；A－01／02／15／16 route regression 無回歸；A－01～16 本輪零修改。歷史備註：298／588 只是過往「兩門檻列」scratch geometry sanity 數值，不存在 Repository，不是 A.xlsx P1 正式高度。其後 Jamie 已由 Finder 雙擊 `.command` 在 Chrome／Safari 完成實機手動驗證（含左欄黃字 local 2× 效果）並明確 PASS。

Code Commit 為 `556a79c25ce9d7ddb77b25075484312f37ea4197`（`feat(bn): add A17 threshold table template`），`git diff --check HEAD^ HEAD` PASS，精確包含：

- `bn/templates/A/17-threshold-table.js`
- `bn/launch/A/17_門檻表.command`（Git mode `100755`）
- `bn/launch/viewer.html`（A－17 branch 最小修改）
- `bn/assets/A/底圖/17_主標題.png`（SHA-256 `ecf17ed1b9841fd62dd1535bb0573148361ddbc0cd22ed914457b8d38ac32bac`）
- `bn/assets/A/底圖/17_VIP.png`（SHA-256 `34df2ee85c09e691a25de31a7f5595833b98c9e01697a7234cb52a845512ba2c`）

### 5.2 樣式 D

本節只登錄樣式 D 已完成的版位。樣式 D 採與樣式 A 相同的逐版位製作與驗證原則；未完成的 D 版位不預填、不建立空章節、不預先補完未確認差異。

#### 5.2.1 `01_DDcard BN`

##### 5.2.1.1 正式規格來源

D－01 的完整正式規格、幾何、typography、Logo 裁決、Scope Boundary 與 Acceptance Criteria 以 `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md` 的「D－01 Requirement」章節為準，實作規劃以 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 的「D－01 Proposal」章節為準。樣式 D 只維護這一份總 Requirement 與一份總 Proposal，**不建立逐版位 Requirement／Proposal 文件**。**本節只作狀態登錄與規格引用，不複製該兩份文件內容，以免產生重複且可能不同步的第二份需求。**

D－01 與樣式 A／B 的 `01_DDcard BN` 共用同一組已確認的文字內容模型與視覺樣式（Canvas 531 × 792、主標 Medium 30pt `#ffffff`、副標 Bold 45pt `#fff285`、副標 `$`／`%` Bold 37pt 特殊 formatting、保護文字 Medium 18pt `#a6f4e6`、ink bounding-box 水平＋垂直置中、8／7／17 字數規則、Medium template-local 2× rasterization）。D－01 真正存在的差異只有兩項：

1. 文字 placement 為 A／B－01 對應框整體下移 29px：headline `{left:90, top:170, width:351, height:37}`、subheadline `{left:43, top:221, width:445, height:57}`、protectionText `{left:43, top:296, width:445, height:22}`。
2. 新增固定 Logo。Logo box `{left:90, top:103, width:351, height:50}`；source `bn/assets/D/Logo.png` 原始 784 × 112；以 contain 等比例縮放並水平＋垂直置中，`scale = min(351/784, 50/112) = 25/56`，destination 350 × 50、`x = 90.5`、`y = 103`；保留 fractional `90.5`，禁止 rounding、禁止 stretch 成 351 × 50、禁止 cover／crop／source clipping。Logo 為固定 renderer asset，**不由 Excel 帶入、不進 Editor、不進 Workspace、不進暫存 JSON**。

draw order 為 background → Logo → Medium local 2×（主標＋保護文字）→ Bold 副標；四個 box 互不重疊。

##### 5.2.1.2 正式落地與驗證狀態

D－01 是樣式 D 第一個已完成的正式 BN Template，採 D-specific template definition（未在已封箱的 `bn/templates/A/01-ddcard-bn.js` 加入 D 分支）。Jamie 已親自由 Finder 雙擊 D－01 `.command` 完成人工對位驗證並明確回覆 PASS。

Code Commit 為 `1139a7c3eca005b15c24bef7751ebb0ada740fe1`（`feat(bn): add D01 DDcard template`，parent `88bd112729a061d012c23d780c4d6718766c8823`），Code Commit 前後 `git diff --check` 與 `git diff --check HEAD^ HEAD` 均 PASS，精確包含：

- `bn/templates/D/01-ddcard-bn.js`
- `bn/launch/D/01_DDcard BN.command`（Git mode `100755`）
- `bn/launch/viewer.html`（只服務 D－01 的校稿 branch 最小修改）
- `bn/assets/D/Logo.png`（SHA-256 `99813cf81a7963ff2e81d60e478332d6f24db4ea8462c059cb466770f016de24`）
- `bn/assets/D/底圖/01_DDcard BN.jpg`（SHA-256 `95e8748066cdb2e7ac9606d9b481473df5336f98e624aa0fbb0d51b6f313bf68`）
- `bn/assets/D/對位/01_DDcard BN.png`（SHA-256 `9c573d804b95da0dd901874fcdaa71136e2255e5ce31d962a9580c1d7c8ce1f8`）

D－01 route 為 `viewer.html?type=D&bn=01_DDcard%20BN`，沿用既有共用薄 Viewer 與 A launcher 既有 `127.0.0.1:4173`／marker／server reuse／`trap` 行為；Canvas、Preview 與 overlay 均為 531 × 792，對位 PNG 以原始 Alpha、同原點及原尺寸 1:1 疊加，不合成進正式 Canvas。Viewer 沿用既有 `fieldConfig` 機制提供 D－01 專用測試文字（主標 `宅配免運無限加碼` 8.0 units、副標 `宅配滿$490再9%` 7.0 units、保護文字 `免運優惠須依店家適用之物流方案為主` 17.0 units），副標同時覆蓋 `$`→後方 ordinary run 與 `%`→前方 ordinary run 兩條 formatting 路徑；A－01～12 共用預設測試字串未修改。

##### 5.2.1.3 尚未完成的邊界

- **本次完成的是「D－01 renderer ＋ 人工對位驗證」，不是「D 樣式正式平台整合完成」。**
- 目前正式支援的樣式仍為 **A 與 B**；`SUPPORTED_TYPES` 仍為 `["A", "B"]`，`ASSET_BASE_BY_TYPE` 仍只有 A 與 B，正式 renderer registry 尚未 enable D，樣式 D 在正式平台維持 fail-closed。
- D 的正式 Excel worksheet Import、Restore、控制台 Preview 與 Export **尚未 enable**；D－01 的正式 Preview ↔ Export 一致性實測與版位 01 的 JPG／72 dpi／≤245,000 bytes 實測 **deferred until D platform integration**。
- 「D 有自己的 worksheet `D`，工單配置與 A／B 相同」屬已確認產品需求，是未來 D platform integration 應遵循的依據，**不代表目前平台已可 Import D**。
- D－02～17 尚未完成。本節的 D-specific template 裁決**只代表 D－01**，不得據此推論其餘 D 版位都必須建立 D-specific template，也不得預先補完未確認的 D 版位差異。樣式 C 不在本節範圍。

#### 5.2.2 `02_MALL HBN`

##### 5.2.2.1 正式規格來源

D－02 的完整正式規格、幾何、typography、Logo 裁決與 deferred 邊界以 `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md` 的「D－02 Requirement」章節為準，實作紀錄以 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 的「D－02 Implementation Record」章節為準。樣式 D 只維護這一份總 Requirement 與一份總 Proposal，**不建立逐版位 Requirement／Proposal 文件**。**本節只作狀態登錄與規格引用，不複製該兩份文件內容。**

D－02 與樣式 A／B 的 `02_MALL HBN` 共用同一組已確認的文字內容模型與視覺樣式（Canvas 1200 × 360、主標 Medium 30pt `#ffffff`、副標 Bold 45pt `#fff285`、副標 `$`／`%` Bold 37pt 特殊 formatting、保護文字 Medium 18pt `#a6f4e6`、ink bounding-box 靠左＋靠上、8／7／17 字數規則、Medium template-local 2× rasterization）。**D－02 真正存在的差異只有一項**：

1. 新增固定 Logo。Logo box `{left:98, top:96, width:351, height:50}`；source `bn/assets/D/Logo.png` 原始 784 × 112（已由 D－01 納管，D－02 僅引用，非本版位新增素材）；以 contain 等比例縮放並**水平靠左**，`scale = min(351/784, 50/112) = 25/56`，destination 350 × 50、`x = 98`、`y = 96`（垂直餘量為 0，靠上與置中結果相同）；禁止 rounding、禁止 stretch 成 351 × 50、禁止 cover／crop／source clipping。Logo 為固定 renderer asset，**不由 Excel 帶入、不進 Editor、不進 Workspace、不進暫存 JSON**。

三個文字 box 與 A／B－02 **完全相同**：headline `{98,153,351,37}`、subheadline `{98,200,445,57}`、protectionText `{98,273,445,22}`。draw order 為 background → Logo → Medium local 2×（主標＋保護文字）→ Bold 副標。

##### 5.2.2.2 正式落地與驗證狀態

D－02 採 D-specific template definition（未在已封箱的 `bn/templates/A/02-mall-hbn.js` 加入 D 分支）。Jamie 已親自由 Finder 雙擊 D－02 `.command` 完成人工對位驗證並明確回覆 PASS。

Code Commit 為 `9c9272704517743ae7d8ccdd73c5a5a7bae8c534`（`feat(bn): add D02 MALL HBN template`，parent `e77fe6b96ebc32aba2159ddb9a010e88f3bbec4d`），`git diff --check HEAD^ HEAD` PASS，精確包含 5 個路徑：

- `bn/templates/D/02-mall-hbn.js`
- `bn/launch/D/02_MALL HBN.command`（Git mode `100755`）
- `bn/launch/viewer.html`（只服務 D－02 的校稿 branch 最小修改）
- `bn/assets/D/底圖/02_MALL HBN.jpg`（JPEG 1200 × 360）
- `bn/assets/D/對位/02_MALL HBN.png`（PNG 1200 × 360，只供 Launch 視覺校稿）

D－02 route 為 `viewer.html?type=D&bn=02_MALL%20HBN`，沿用既有共用薄 Viewer 與 A－02 launcher 既有 `127.0.0.1:4173`／marker／server reuse／`trap` 行為（僅 7 行識別差異）；對位 PNG 1:1 疊加，不合成進正式 Canvas。Viewer 的 D－02 分支**未設 `fieldConfig`**，沿用既有 01～12 shared default 測試文字；A－01～12 共用預設未修改。D－02 template 的 8 個共用文字 helper 與 A－02 逐位元組相同。

##### 5.2.2.3 尚未完成的邊界

- **本次完成的是「D－02 renderer ＋ 人工對位驗證」，不是「D 樣式正式平台整合完成」。**
- 目前正式支援的樣式仍為 **A 與 B**；`SUPPORTED_TYPES` 仍為 `["A", "B"]`，`ASSET_BASE_BY_TYPE` 仍只有 A 與 B，正式 renderer registry 尚未 enable D，樣式 D 在正式平台維持 fail-closed。
- D 的正式 Excel worksheet Import、Restore、控制台 Preview 與 Export **尚未 enable**；D－02 正式 Preview ↔ Export 一致性實測，以及版位 02 既有鎖定的 **JPG／72 dpi／≤ 145,000 bytes** 實測，**deferred until D platform integration**（本次未執行 D Export 實測，不得記為已驗證）。
- 「D 有自己的 worksheet `D`，工單配置與 A／B 相同」屬已確認產品需求，**不代表目前平台已可 Import D**。
- D－03～17 尚未完成。本節裁決**只代表 D－02**，不得據此推論其餘 D 版位的 template 形狀、Logo 位置或文字差異，也不得預先補完未確認的 D 版位差異。樣式 C 不在本節範圍。

（後續同步：D－03 已於 D－03 Code Commit 完成，見第 5.2.3 節；本節其餘內容維持不變。）

#### 5.2.3 `03_Coin page BN`

##### 5.2.3.1 正式規格來源

D－03 的完整正式規格、幾何、typography、Logo 裁決與 deferred 邊界以 `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md` 的「D－03 Requirement」章節為準（完成狀態見該章節 9.15 節），實作紀錄以 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 的「D－03」章節（落地紀錄見 8.15 節）為準。樣式 D 只維護這一份總 Requirement 與一份總 Proposal，**不建立逐版位 Requirement／Proposal 文件**。**本節只作狀態登錄與規格引用，不複製該兩份文件內容。**

D－03 與樣式 A／B 的 `03_Coin page BN` 共用同一組已確認的文字內容模型與視覺樣式（Canvas 1200 × 391、主標 Medium 37pt `#ffffff`、副標 Bold 50pt `#fff285`、副標 `$`／`%` Bold 40pt 特殊 formatting、保護文字 Medium 21pt `#a6f4e6`、ink bounding-box 靠左＋靠上、8／7／17 字數規則、Medium template-local 2× rasterization）。**D－03 真正存在的差異只有一項**：

1. 新增固定 Logo。Logo box `{left:92, top:107, width:351, height:50}`；source `bn/assets/D/Logo.png` 原始 784 × 112（已由 D－01 納管，D－03 僅引用，非本版位新增素材）；以 contain 等比例縮放並**水平靠左**，`scale = min(351/784, 50/112) = 25/56`，destination 350 × 50、`x = 92`、`y = 107`，右側保留 1px 餘量（垂直餘量為 0，靠上與置中結果相同）；禁止 rounding、禁止 stretch 成 351 × 50、禁止 cover／crop／source clipping。Logo 為固定 renderer asset，**不由 Excel 帶入、不進 Editor、不進 Workspace、不進暫存 JSON**。

三段文字 box 為 headline `{92,168,395,46}`、subheadline `{92,225,500,64}`、protectionText `{92,302,500,25}`；Medium local 2× 的 offscreen 為 **2400 × 782**，只涵蓋 headline ＋ protectionText，Bold subheadline 與 Logo 均未進 2× surface；draw order 為 **background → Logo → Medium local 2× → Bold subheadline**。原 Photoshop CSS 的 `{687, 508, 351, 50}` 已裁決為誤植（該 `top` 在 1200 × 391 canvas 上垂直無效），不得再使用。

##### 5.2.3.2 正式落地與驗證狀態

D－03 採 D-specific template definition（未在已封箱的 `bn/templates/A/03-coin-page-bn.js` 加入 D 分支，亦未修改或取代該檔）。Jamie 已親自由 Finder 雙擊 D－03 `.command` 完成人工對位驗證並明確回覆 PASS。

Code Commit 為 **`024c621e2c61bd40d3b736af7487b22e332d0273`**（`feat(bn): add D03 Coin page BN template`，parent `de1d98a70aa6e29e95397a913a46e0a30e01b7af`），`git diff --check HEAD^ HEAD` PASS，精確包含 5 個路徑：

- `bn/templates/D/03-coin-page-bn.js`（新增）
- `bn/launch/D/03_Coin page BN.command`（新增，Git mode `100755`）
- `bn/launch/viewer.html`（只服務 D－03 的校稿 branch 最小修改）
- `bn/assets/D/底圖/03_Coin page BN.jpg`（新增納管，JPEG 1200 × 391）
- `bn/assets/D/對位/03_Coin page BN.png`（新增納管，PNG 1200 × 391）

`bn/assets/D/Logo.png` 不在本次 commit 內（已由 D－01 納管，D－03 僅引用、未修改、未重存、未建立第二份）。

D－03 route 為 `viewer.html?type=D&bn=03_Coin%20page%20BN`，沿用既有共用薄 Viewer 與 A－03 launcher 既有 `127.0.0.1:4173`／marker／server reuse／`trap` 行為（僅 7 行識別差異，未重構）；對位 PNG 1:1 疊加，不合成進正式 Canvas。Viewer 的 D－03 分支**未設 `fieldConfig`**，沿用既有 01～12 shared default 測試文字；A－01～12 共用預設未修改。D－03 template 的 8 個共用文字 helper 與 A－03 逐位元組相同；Logo smoothing 為 renderer-local 且自成一組 `save`／`restore`。

##### 5.2.3.3 尚未完成的邊界

- **本次完成的是「D－03 renderer ＋ 人工對位驗證」，不是「D 樣式正式平台整合完成」。** Jamie 的 PASS 是人工對位 PASS，不是正式平台 Preview／Export PASS。
- 目前正式支援的樣式仍為 **A 與 B**；`SUPPORTED_TYPES` 仍為 `["A", "B"]`，`ASSET_BASE_BY_TYPE` 仍只有 A 與 B，正式 renderer registry 尚未 enable D，樣式 D 在正式平台維持 fail-closed；正式平台六個核心 JS 於本次 Code Commit 全部零修改。
- D 的正式 Excel worksheet Import、Restore、控制台 Preview 與 Export **尚未 enable**；D－03 正式 Preview ↔ Export 一致性實測，以及版位 03 既有鎖定的 **JPG／72 dpi**（**版位 03 無 byte 容量上限**，與 01 的 ≤245,000 bytes、02 的 ≤145,000 bytes 不同）實測，**deferred until D platform integration**（本次未執行 D Export 實測，不得記為已驗證）。
- 「D 有自己的 worksheet `D`，工單配置與 A／B 相同」屬已確認產品需求，**不代表目前平台已可 Import D**。
- D－04～17 尚未完成。本節裁決**只代表 D－03**，不得據此推論其餘 D 版位的 template 形狀、Logo 位置或文字差異，也不得預先補完未確認的 D 版位差異。樣式 C 不在本節範圍。

（後續同步：D－06 已於 D－06 Code Commit 完成，見第 5.2.4 節；本節其餘內容維持不變。）

#### 5.2.4 `06_IG`

##### 5.2.4.1 正式規格來源

D－06 的完整正式規格、幾何、typography、Logo 裁決與 deferred 邊界以 `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md` 的「D－06 Requirement」章節為準（完成狀態見該章節 10.16 節），實作紀錄以 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 的「D－06」章節（落地紀錄見其 9.19 節）為準。樣式 D 只維護這一份總 Requirement 與一份總 Proposal，**不建立逐版位 Requirement／Proposal 文件**。**本節只作狀態登錄與規格引用，不複製該兩份文件內容。**

D－06 與樣式 A／B 的 `06_IG` 共用同一組已確認的文字內容模型與視覺樣式（Canvas **900 × 1600**、主標 Medium `52.5pt` `#ffffff`、副標 Bold `65pt` `#fff285`、副標 `$`／`%` Bold `55pt` `#fff285` 特殊 formatting、保護文字 Medium `30pt` `#a6f4e6`、**actualBoundingBox-based ink bounding-box 水平＋垂直置中**（`textAlign="left"`／`textBaseline="alphabetic"`）、8／7／17 字數規則、Medium template-local 2× rasterization）。A－06 與 B－06 共用同一正式 renderer `bn/templates/A/06-ig.js`（`A_TABLE` 僅以版位 id 為 key、無 type 維度，A／B 差異只由 `ASSET_BASE_BY_TYPE` 切換底圖路徑）。**D－06 真正存在的差異只有一項**：

1. 新增固定 Logo。Logo box `{left:161, top:282, width:580, height:82}`；source `bn/assets/D/Logo.png` 原始 784 × 112（已由 D－01 納管，D－06 僅引用，非本版位新增素材）；以 contain 等比例縮放並在 box 內**水平＋垂直置中**，`scale = min(580/784, 82/112) = 41/56`，destination **574 × 82**、`destinationX = box.left + (box.width − destinationWidth) / 2 = 164`、`destinationY = box.top + (box.height − destinationHeight) / 2 = 282`，左右各 3px、上下各 0px，四值皆為整數；禁止 rounding／truncation、禁止 stretch 成 580 × 82、禁止 cover／crop／source clipping。Logo smoothing 為 renderer-local 獨立 `save() → imageSmoothingEnabled = true → imageSmoothingQuality = "high" → drawImage() → restore()`；Logo **不進 Medium 2× surface**。Logo 為固定 renderer asset，**不由 Excel 帶入、不進 Editor、不進 Workspace、不進暫存 JSON**。

三段文字 box 為 headline `{left:175, top:387, width:550, height:65}`、subheadline `{left:136, top:472, width:630, height:82}`、protectionText `{left:136, top:573, width:630, height:37}`，與 A／B－06 `IG_LAYOUT` 逐值相同；Medium local 2× 的 offscreen 為 **1800 × 3200**，只涵蓋 headline ＋ protectionText，Bold subheadline 與 Logo 均不進 2×，且未新增 A－01 式整體 early-return；draw order 為 **background → Logo → Medium local 2×（headline ＋ protectionText）→ Bold subheadline**，`globalAlpha = 1`、`globalCompositeOperation = "source-over"`。原 Photoshop／CSS 的 `left`（`2020`／`2034`／`1995`）已裁決為座標偏移資料（固定 `Δleft = 1859`、`Δtop = 0`），僅屬**已更正的歷史原始值，不得再作正式 geometry 使用**。

##### 5.2.4.2 正式落地與驗證狀態

D－06 採 D-specific template definition（未在已封箱的 `bn/templates/A/06-ig.js` 加入 D 分支，亦未修改或取代該檔）。Jamie 已親自由 Finder 雙擊 D－06 `.command` 完成**人工 1:1 overlay 對位驗證**並明確回覆 PASS。

Code Commit 為 **`5def9469d21336787dc35553ff7a17ffde9eac48`**（`feat(bn): add D06 IG template`，parent `5a2ba2ffa40254f2b3c45cab5e8fa4051b9505db`），`git diff --check HEAD^ HEAD` PASS，精確包含 5 個路徑（1 個 M ＋ 4 個 A）：

- `A` `bn/templates/D/06-ig.js`（新增）
- `A` `bn/launch/D/06_IG.command`（新增，Git mode `100755`）
- `M` `bn/launch/viewer.html`（只服務 D－06 的校稿 branch 最小修改，+16／−1）
- `A` `bn/assets/D/底圖/06_IG.jpg`（新增納管，JPEG 900 × 1600）
- `A` `bn/assets/D/對位/06_IG.png`（新增納管，PNG 900 × 1600）

`bn/assets/D/Logo.png` 不在本次 commit 內（已由 D－01 納管，D－06 僅引用既有 tracked asset、未修改、未重存、未再次納管）。

D－06 route 為 `viewer.html?type=D&bn=06_IG`，沿用既有共用薄 Viewer 與 A－06 launcher 既有 `127.0.0.1:4173`／marker／server reuse／`trap` 行為（僅 7 行識別差異，未重構）；對位 PNG 1:1 疊加，不合成進正式 Canvas。Viewer 的 D－06 分支**未設 `fieldConfig`**，沿用既有 01～12 shared default 測試文字；A－01～12 共用預設未修改。D－06 template exports 恰 2（`waitForIgFonts`、`renderIg`）、零 import，signature 為 `renderIg(canvas, images, { headline, subheadline, protectionText } = {})`。A－06 的 8 個共用文字 helper 落地比對為 **6/8 逐位元組相同**＋ **2/8 behavior-equivalent**（`measureRun`、`boundaryGlyphInkBottom` 各一行 runtime error message 的版位標示由 `A－06` 改為 `D－06`，演算法／控制流／回傳值零差異）；**不得記為 8/8 byte-identical**。

##### 5.2.4.3 尚未完成的邊界

- **本次完成的是「D－06 renderer ＋ 人工對位驗證」，不是「D 樣式正式平台整合完成」。** Jamie 的 PASS 是**人工 1:1 overlay 對位 PASS**，不是正式平台 Preview／Export PASS，後者尚未做。
- 目前正式支援的樣式仍為 **A 與 B**；`SUPPORTED_TYPES` 仍為 `["A", "B"]`，`ASSET_BASE_BY_TYPE` 仍只有 A 與 B，`A_TABLE` 未加入 D entry 或 type 維度，正式 renderer registry 尚未 enable D，樣式 D 在正式平台維持 fail-closed；正式平台六個核心 JS 於本次 Code Commit 全部零修改。
- D 的正式 Excel worksheet Import、Restore、控制台 Preview 與 Export **尚未 enable**；D－06 正式 Preview ↔ Export 一致性實測，以及版位 06 既有鎖定的 **JPG／72 dpi**（`JPEG_QUALITY = 1.0`、**版位 06 無 `maxBytes`／無 byte 容量上限**）實際 Export 驗證，**deferred until D platform integration**（本次未執行 D Export 實測，不得記為已驗證）。
- 「D 有自己的 worksheet `D`，工單配置與 A／B 相同」屬已確認產品需求，**不代表目前平台已可 Import D**。
- 目前已完成的樣式 D 版位為 D－01、D－02、D－03、D－06，皆為**個別** renderer 與人工對位流程，不代表整個 D 樣式完成。D－04、D－05、D－07～17 尚未完成。本節裁決**只代表 D－06**，不得據此推論其餘 D 版位的 template 形狀、Logo 位置或文字差異，也不得預先補完未確認的 D 版位差異。樣式 C 不在本節範圍。

（後續同步：D－07 已於 D－07 Code Commit 完成，見第 5.2.5 節；本節其餘內容維持不變。）

#### 5.2.5 `07_FB POST`

##### 5.2.5.1 正式規格來源

D－07 的完整正式規格、幾何、typography、Logo 裁決與 deferred 邊界以 `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md` 的「D－07 Requirement」章節為準（完成狀態見該章節 11.16 節），實作紀錄以 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 的「D－07」章節（落地紀錄見其 10.21 節）為準。樣式 D 只維護這一份總 Requirement 與一份總 Proposal，**不建立逐版位 Requirement／Proposal 文件**。**本節只作狀態登錄與規格引用，不複製該兩份文件內容。**

D－07 與樣式 A／B 的 `07_FB POST` 共用同一組已確認的文字內容模型與視覺樣式（Canvas **1200 × 630**、主標 Medium `39pt` `#ffffff`、副標 Bold `49pt` `#fff285`、副標 `$`／`%` Bold `41pt` `#fff285` 特殊 formatting、保護文字 Medium `22.5pt` `#a6f4e6`、**LeftCentered＝水平靠左＋垂直 ink bounding-box 置中**（`textAlign="left"`／`textBaseline="alphabetic"`）、8／7／17 字數規則、Medium template-local 2× rasterization）。A－07 與 B－07 共用同一正式 renderer `bn/templates/A/07-fb-post.js`（`A_TABLE` 僅以版位 id 為 key、無 type 維度，A／B 差異只由 `ASSET_BASE_BY_TYPE` 切換底圖路徑）。**D－07 真正存在的差異只有一項**：

1. 新增固定 Logo。Logo box `{left:54, top:201, width:365, height:52}`；source `bn/assets/D/Logo.png` 原始 784 × 112（既有 tracked 共用 asset，由 D－01 納管，D－07 僅引用，非本版位新增素材）；以 contain 等比例縮放並在 box 內**水平靠左＋垂直置中**，`scale = min(365/784, 52/112) = 13/28`（height-bound），destination **364 × 52**、`destinationX = box.left = 54`、`destinationY = box.top + (box.height − destinationHeight) / 2 = 201`，左 0px／右 1px／上 0px／下 0px，四值皆為整數，aspect 保持 7 : 1；禁止 rounding／truncation、禁止 stretch 成 365 × 52、禁止 cover／crop／source clipping。Logo smoothing 為 renderer-local 獨立 `save() → imageSmoothingEnabled = true → imageSmoothingQuality = "high" → drawImage() → restore()`；Logo **不進 Medium 2× surface**。Logo 為固定 renderer asset，**不由 Excel 帶入、不進 Editor、不進 Workspace、不進暫存 JSON**。

三段文字 box 為 headline `{left:54, top:266, width:405, height:49}`、subheadline `{left:54, top:325, width:475, height:62}`、protectionText `{left:54, top:401, width:475, height:28}`，與 A／B－07 `FB_POST_LAYOUT` 逐值相同；四個 box 共用 `left = 54`。Medium local 2× 的 offscreen 為 **2400 × 1260**，只涵蓋 headline ＋ protectionText，Bold subheadline 與 Logo 均不進 2×，且未新增 A－01 式整體 early-return；draw order 為 **background → Logo → Medium local 2×（headline ＋ protectionText）→ Bold subheadline**，`globalAlpha = 1`、`globalCompositeOperation = "source-over"`。原 Photoshop／CSS 的 Logo `left = 2877` 已裁決為座標偏移資料（`Δleft = 2823`、`Δtop = 0`），僅屬**已更正的歷史原始值，不得再作正式 geometry 使用**。

##### 5.2.5.2 正式落地與驗證狀態

D－07 採 D-specific template definition（未在已封箱的 `bn/templates/A/07-fb-post.js` 加入 D 分支，亦未修改或取代該檔）。Jamie 已**親自開啟 `bn/launch/D/07_FB POST.command` 完成 Phase 6 人工 1:1 overlay 對位驗證並明確 PASS**。

Code Commit 為 **`b35507340ad12cb976bdc08d96278df756e9b272`**（`feat(bn): add D07 FB POST template`，parent `17249b983d4e0c9943a75f6f273865fda984d647`），`git diff --check HEAD^ HEAD` PASS，精確包含 5 個路徑（1 個 M ＋ 4 個 A）：

- `M` `bn/launch/viewer.html`（只服務 D－07 的校稿 branch 最小修改，+16／−1）
- `A` `bn/templates/D/07-fb-post.js`（新增）
- `A` `bn/launch/D/07_FB POST.command`（新增，Git mode `100755`）
- `A` `bn/assets/D/底圖/07_FB POST.jpg`（新增納管，JPEG 1200 × 630）
- `A` `bn/assets/D/對位/07_FB POST.png`（新增納管，PNG 1200 × 630）

`bn/assets/D/Logo.png` 不在本次 commit 內（既有 tracked 共用 asset，由 D－01 納管；D－07 僅引用、未修改、未重存、未再次納管）。

D－07 route 為 `viewer.html?type=D&bn=07_FB%20POST`（空白以 `%20` 編碼），沿用既有共用薄 Viewer 與 A－07 launcher 既有 `127.0.0.1:4173`／marker／server reuse／`trap` 行為（僅 7 行識別差異，未重構）；對位 PNG 1:1 疊加，不合成進正式 Canvas。Viewer 的 D－07 分支**未設 `fieldConfig`**，沿用既有 01～12 shared default 測試文字；A－01～12 共用預設未修改。D－07 template exports 恰 2（`waitForFbPostFonts`、`renderFbPost`）、零 import，signature 為 `renderFbPost(canvas, images, { headline, subheadline, protectionText } = {})`。**A－07 的 8 個核心文字 helper 落地比對為 6/8 byte-identical ＋ 2/8 behavior-equivalent，實質差異 0/8**（behavior-equivalent 者為 `measureRun` 與 `boundaryGlyphInkBottom`，唯一差異為各一行 runtime error message 的版位標示 `A－07` → `D－07`，演算法／控制流／回傳值零差異）；**不得記為 8/8 byte-identical**。A－07 專屬的 `assertLayoutFitsCanvas`、`drawFbPostMediumText`、`assertFontsReady` 在版位標示正規化後亦為 behavior-equivalent；其中 **`assertLayoutFitsCanvas` 完整保留並自然涵蓋新增的 Logo box**，四 box 實測 right／bottom 為 419／253、459／315、529／387、529／429，全部落於 1200 × 630 內。

##### 5.2.5.3 尚未完成的邊界

- **本次完成的是「D－07 renderer ＋ 人工對位驗證」，不是「D 樣式正式平台整合完成」。** Jamie 的 PASS 是**人工 1:1 overlay 對位 PASS**，**不是正式平台 Preview／Export PASS**，後者尚未做。
- 目前正式支援的樣式仍為 **A 與 B**；`SUPPORTED_TYPES` 仍為 `["A", "B"]`，`ASSET_BASE_BY_TYPE` 仍只有 A 與 B，`A_TABLE` 未加入 D entry 或 type 維度，正式 renderer registry 尚未 enable D，樣式 D 在正式平台維持 fail-closed；正式平台六個核心 JS 於本次 Code Commit 全部零修改。
- D 的正式 Excel worksheet Import、Restore、控制台 Preview 與 Export **尚未 enable**；D－07 正式 Preview ↔ Export 一致性實測，以及版位 07 既有鎖定的 **JPG／72 dpi**（`EXPORT_DPI = 72`、`JPEG_QUALITY = 1.0`、**版位 07 無 `maxBytes`／無 byte 容量上限**）實際 Export 驗證，**deferred until D platform integration**（本次未執行 D Export 實測，不得記為已驗證）。
- 「D 有自己的 worksheet `D`，工單配置與 A／B 相同」屬已確認產品需求，**不代表目前平台已可 Import D**。
- 目前已完成的樣式 D 版位為 D－01、D－02、D－03、D－06、D－07，皆為**個別** renderer 與人工對位流程，不代表整個 D 樣式完成。D－04、D－05、D－08～17 尚未完成。本節裁決**只代表 D－07**，不得據此推論其餘 D 版位的 template 形狀、Logo 位置或文字差異，也不得預先補完未確認的 D 版位差異。樣式 C 不在本節範圍。

#### 5.2.6 `08_SPX TVBN_1`

##### 5.2.6.1 正式規格來源

D－08 的完整正式規格、幾何、typography、Logo 裁決與 deferred 邊界以 `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md` 的「D－08 Requirement」章節為準（完成狀態見該章節 12.16 節），實作紀錄以 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 的「D－08」章節（落地紀錄見其 11.23 節）為準。樣式 D 只維護這一份總 Requirement 與一份總 Proposal，**不建立逐版位 Requirement／Proposal 文件**。**本節只作狀態登錄與規格引用，不複製該兩份文件內容。**

D－08 與樣式 A／B 的 `08_SPX TVBN_1` 共用同一組已確認的文字內容模型與視覺樣式（Canvas **1080 × 1920**、主標 Medium `70pt` `#ffffff`、副標 Bold `90pt` `#fff285`、副標 `$`／`%` Bold `75pt` `#fff285` 特殊 formatting、保護文字 Medium `40pt` `#a6f4e6`、**centered ink＝水平＋垂直 ink bounding-box 置中**（`textAlign="left"`／`textBaseline="alphabetic"`，**不是 LeftCentered、不是 left／top**）、既有字數規則、Medium template-local 2× rasterization）。A－08 與 B－08 共用同一正式 renderer `bn/templates/A/08-spx-tvbn-1.js`（`A_TABLE` 僅以版位 id 為 key、無 type 維度，A／B 差異只由 `ASSET_BASE_BY_TYPE` 切換底圖路徑）。**D－08 真正存在的差異只有一項**：

1. 新增固定 Logo。Logo box `{left:147, top:364, width:785, height:112}`；source `bn/assets/D/Logo.png` 原始 784 × 112（既有 tracked 共用 asset，由 D－01 納管，D－08 僅引用，**非本版位新增素材**）；以 contain 等比例縮放並在 box 內**水平＋垂直置中**，`scale = min(785/784, 112/112) = 1`（height-bound、1:1 不縮放），destination **784 × 112**、`destinationX = box.left + (box.width − destinationWidth) / 2 = ` **147.5**、`destinationY = box.top + (box.height − destinationHeight) / 2 = ` **364**，即 **`784 × 112 @ (147.5, 364)`**，左 **0.5px**／右 **0.5px**／上 **0px**／下 **0px**，aspect 保持 **7 : 1**；**fractional `destinationX = 147.5` 原值保留**，禁止 rounding／truncation（`Math.round`／`Math.floor`／`Math.ceil`／`Math.trunc`／`toFixed`／`parseInt`／bitwise）、禁止 stretch 成 785 × 112、禁止 cover／crop／source clipping（source rect 完整 `0, 0, 784, 112`）。Logo smoothing 為 template-local 獨立 `save() → imageSmoothingEnabled = true → imageSmoothingQuality = "high" → drawImage() → restore()`；Logo 由 renderer **真正畫入 canvas**（非 DOM overlay）、**不進 Medium 2× surface**、**未建立 shared Logo helper**。Logo 為固定 renderer asset，**不由 Excel 帶入、不進 Editor、不進 Workspace、不進暫存 JSON**。

三段文字 box 為 headline `{left:167, top:507, width:745, height:87}`、subheadline `{left:94, top:619, width:890, height:114}`、protectionText `{left:94, top:759, width:890, height:51}`，與 A／B－08 `SPX_TVBN_1_LAYOUT` 逐值相同。**protectionText 正式值為 `{94,759,890,51}`；D 對位圖的 protectionText 標記 `{94,760,890,50}` 已由 Jamie／GPT 裁決為對位標記的 1px 差異，不是 D－08 的新 geometry，未被採用、不得再重新裁決。** Medium local 2× 的 offscreen 為 **2160 × 3840**，只涵蓋 headline ＋ protectionText，Bold subheadline 與 Logo 均不進 2×，且未新增函式層「兩段 Medium 都空就整體 early-return」，每段文字空字串各自回傳零 ink fit validation 之既有行為保留；draw order 為 **background → Logo → Medium local 2×（headline ＋ protectionText）→ Bold subheadline**，`globalAlpha = 1`、`globalCompositeOperation = "source-over"`。原 Photoshop／CSS 的 Logo `left`（`2006`）與 `top`（`2065`）已裁決為座標偏移資料（`Δleft = 1859`、`Δtop = 1701`，屬 D－08 自身獨立實證、**不得建立共用 offset 規則、不得推論至其他 D 版位**），僅屬**已更正的歷史原始值，不得再作正式 geometry 使用**。

##### 5.2.6.2 正式落地與驗證狀態

D－08 採 D-specific template definition（未在已封箱的 `bn/templates/A/08-spx-tvbn-1.js` 加入 D 分支，亦未修改或取代該檔）。Jamie 已**親自開啟 `bn/launch/D/08_SPX TVBN_1.command` 完成 Phase 6 人工 1:1 overlay 對位驗證並明確 PASS**。

Code Commit 為 **`d9359270fea1bd89e96a2eb27c4464b50e0ef6dc`**（`feat(bn): add D08 SPX TVBN 1 template`，parent `1c9e12782279491395fa5e0f7c9a2da7629f1ac9`），`git diff --check HEAD^ HEAD` PASS，精確包含 5 個路徑（1 個 M ＋ 4 個 A）：

- `M` `bn/launch/viewer.html`（只服務 D－08 的校稿 branch 最小修改，+16／−1）
- `A` `bn/templates/D/08-spx-tvbn-1.js`（新增）
- `A` `bn/launch/D/08_SPX TVBN_1.command`（新增，Git mode `100755`）
- `A` `bn/assets/D/底圖/08_SPX TVBN_1.jpg`（新增納管，JPEG 1080 × 1920）
- `A` `bn/assets/D/對位/08_SPX TVBN_1.png`（新增納管，PNG 1080 × 1920）

`bn/assets/D/Logo.png` 不在本次 commit 內（既有 tracked 共用 asset，由 D－01 納管；D－08 僅引用、未修改、未重存、未再次納管）。

D－08 route 為 `viewer.html?type=D&bn=08_SPX%20TVBN_1`（空白以 `%20` 編碼），沿用既有共用薄 Viewer 與 A－08 launcher 既有 `127.0.0.1:4173`／marker／server reuse／`trap` 行為（僅 7 行識別差異、104 行未變，未重構）；對位 PNG 1:1 疊加，不合成進正式 Canvas。Viewer 的 D－08 分支**未設 `fieldConfig`**，沿用既有 01～12 shared default 測試文字；A－01～12 共用預設未修改。D－08 template exports 恰 2（`waitForSpxTvbn1Fonts`、`renderSpxTvbn1`）、零 import，signature 為 `renderSpxTvbn1(canvas, images, { headline, subheadline, protectionText } = {})`。**A－08 的 11 個 baseline functions 落地比對為 6/11 byte-identical ＋ 5/11 message-only behavior-equivalent，實質差異 0/11**：byte-identical 者為 `hasInk`、`validateCenteredInkFitsBox`、`drawCenteredText`、`tokenizeSubheadline`、`adjacentOrdinaryRun`、`drawCenteredMixedSubheadline`；behavior-equivalent 者為 `assertFrameBounds`、`measureRun`、`boundaryGlyphInkBottom`、`drawSpxTvbn1MediumText`、`assertFontsReady`，唯一差異為各一行 runtime error message 的版位標示 `A－08` → `D－08`，演算法／控制流／回傳值零差異；**不得記為 11/11 byte-identical**。其中 **`assertFrameBounds` 完整保留並自然涵蓋新增的 Logo box**，四 box 實測 right／bottom 為 logo 932／476、headline 912／594、subheadline 984／733、protectionText 984／810，全部落於 1080 × 1920 內。D－08 另比照 D－01／D－06／D－07 precedent 加入最小 **canvas-size guard**（`canvas.width` 必須 1080、`canvas.height` 必須 1920，不符即 fail-fast）；此為 D template 層一致性加強，**A－08 baseline 本身未被修改，亦未抽出 shared guard**。

##### 5.2.6.3 尚未完成的邊界

- **本次完成的是「D－08 renderer ＋ 人工對位驗證」，不是「D 樣式正式平台整合完成」。** Jamie 的 PASS 是**人工 1:1 overlay 對位 PASS**，**不是正式平台 Preview／Export PASS**，後者尚未做。
- 目前正式支援的樣式仍為 **A 與 B**；`SUPPORTED_TYPES` 仍為 `["A", "B"]`，`ASSET_BASE_BY_TYPE` 仍只有 A 與 B，`A_TABLE` 未加入 D entry 或 type 維度，正式 renderer registry 尚未 enable D，樣式 D 在正式平台維持 fail-closed；正式平台六個核心 JS 於本次 Code Commit 全部零修改。
- D 的正式 Excel worksheet Import、Restore、控制台 Preview 與 Export **尚未 enable**；D－08 正式 Preview ↔ Export 一致性實測，以及版位 08 既有鎖定的 **JPG／72 dpi**（`EXPORT_ITEMS` 中 `{ id: "08", name: "08_SPX TVBN_1", format: "jpg" }`、`EXPORT_DPI = 72`、`JPEG_QUALITY = 1.0`、**版位 08 無 `maxBytes`／無 byte 容量上限**）實際 Export 驗證，**deferred until D platform integration**（本次未執行 D Export 實測，不得記為已驗證）。
- 「D 有自己的 worksheet `D`，工單配置與 A／B 相同」屬已確認產品需求，**不代表目前平台已可 Import D**。
- 目前已完成的樣式 D 版位為 D－01、D－02、D－03、D－06、D－07、D－08，皆為**個別** renderer 與人工對位流程，不代表整個 D 樣式完成。D－04、D－05、D－09～17 尚未完成。本節裁決**只代表 D－08**，不得據此推論其餘 D 版位的 template 形狀、Logo 位置或文字差異，也不得預先補完未確認的 D 版位差異。樣式 C 不在本節範圍。

#### 5.2.7 `09_SPX TVBN_2`

##### 5.2.7.1 正式規格來源

D－09 的完整正式規格、幾何、typography、Logo 裁決與 deferred 邊界以 `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md` 的「D－09 Requirement」章節為準（完成狀態見該章節 13.18 節），實作紀錄以 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 的「D－09」章節（落地紀錄見其 12.27 節）為準。樣式 D 只維護這一份總 Requirement 與一份總 Proposal，**不建立逐版位 Requirement／Proposal 文件**。**本節只作狀態登錄與規格引用，不複製該兩份文件內容。**

D－09 與樣式 A／B 的 `09_SPX TVBN_2` 共用同一組已確認的文字內容模型與視覺樣式（Canvas **1599 × 1080**、主標 Medium `60pt` `#ffffff`、副標 Bold `76pt` `#fff285`、副標 `$`／`%` Bold `65pt` `#fff285` 特殊 formatting、保護文字 Medium `35pt` `#a6f4e6`、**LeftCentered＝水平靠左＋垂直 ink bounding-box 置中**（`textAlign="left"`／`textBaseline="alphabetic"`）、既有字數規則、Medium template-local 2× rasterization）。A－09 與 B－09 共用同一正式 renderer `bn/templates/A/09-spx-tvbn-2.js`（`A_TABLE` 僅以版位 id 為 key、無 type 維度，A／B 差異只由 `ASSET_BASE_BY_TYPE` 切換底圖路徑）。**D－09 真正存在的差異只有一項**：

1. 新增固定 Logo。Logo box `{left:51, top:362, width:569, height:81}`；source `bn/assets/D/Logo.png` 原始 784 × 112（既有 tracked 共用 asset，由 D－01 納管，D－09 僅引用，**非本版位新增素材，未在本次 Code Commit 再次納管**）；以 contain 等比例縮放並在 box 內**水平靠左＋垂直置中**，`scale = min(569/784, 81/112) = 81/112`（height-bound），destination **567 × 81**、`destinationX = box.left = ` **51**（**不得寫成 52**）、`destinationY = box.top + (box.height − destinationHeight) / 2 = ` **362**，即 **`567 × 81 @ (51, 362)`**，左 **0px**／右 **2px**／上 **0px**／下 **0px**，四值皆為整數，aspect 保持 **7 : 1**；禁止 rounding／truncation、禁止 stretch 成 569 × 81、禁止 cover／crop／source clipping（source rect 完整 `0, 0, 784, 112`）。Logo smoothing 為 template-local 獨立 `save() → imageSmoothingEnabled = true → imageSmoothingQuality = "high" → drawImage() → restore()`；Logo 由 renderer **真正畫入 canvas**（非 DOM overlay）、**不進 Medium 2× surface**、**未建立 shared Logo helper**。Logo 為固定 renderer asset，**不由 Excel 帶入、不進 Editor、不進 Workspace、不進暫存 JSON**。

三段文字 box 為 headline `{left:51, top:465, width:620, height:75}`、subheadline `{left:51, top:557, width:740, height:97}`、protectionText `{left:51, top:674, width:740, height:44}`，與 A／B－09 `SPX_TVBN_2_LAYOUT` 逐值相同；**四個 box 共用 `left = 51`**，四 box right／bottom 為 **620／443、671／540、791／654、791／718**，全部落於 1599 × 1080 內。Medium local 2× 的 offscreen 為 **3198 × 2160**，只涵蓋 headline ＋ protectionText，Bold subheadline 與 Logo 均不進 2×，且未新增函式層「兩段 Medium 都空就整體 early-return」，每段文字空字串各自回傳零 ink fit validation 之既有行為保留；draw order 為 **background → Logo → Medium local 2×（headline ＋ protectionText）→ Bold subheadline**，`globalAlpha = 1`、`globalCompositeOperation = "source-over"`。原 Photoshop／CSS 的 Logo `left`（`3077`）與 `top`（`2063`）已裁決為**不可直接作 canvas geometry 的歷史原始值**（D－09 自身 `Δleft = 3026`、`Δtop = 1701`，屬本版位獨立更正證據，**不得建立跨版位共用 offset 規則、不得推論至其他 D 版位**），**不得再作正式 geometry 使用**。

##### 5.2.7.2 正式落地與驗證狀態

D－09 採 D-specific template definition（未在已封箱的 `bn/templates/A/09-spx-tvbn-2.js` 加入 D 分支，亦未修改或取代該檔）。Jamie 已**親自開啟 `bn/launch/D/09_SPX TVBN_2.command` 完成 Phase 6 人工 1:1 overlay 對位驗證並明確 PASS**。

Code Commit 為 **`ac69478cfa90ee62d208e30d139a382718433699`**（`feat(bn): add D09 SPX TVBN 2 template`，parent `2509764d8c41b83cccce209cc8e646ab809d796a`），`git diff --check HEAD^ HEAD` PASS，精確包含 5 個路徑（1 個 M ＋ 4 個 A）：

- `M` `bn/launch/viewer.html`（只服務 D－09 的校稿 branch 最小修改，+16／−1）
- `A` `bn/templates/D/09-spx-tvbn-2.js`（新增，421 行）
- `A` `bn/launch/D/09_SPX TVBN_2.command`（新增，Git mode `100755`）
- `A` `bn/assets/D/底圖/09_SPX TVBN_2.jpg`（新增納管，JPEG 1599 × 1080）
- `A` `bn/assets/D/對位/09_SPX TVBN_2.png`（新增納管，PNG 1599 × 1080）

`bn/assets/D/Logo.png` 不在本次 commit 內（既有 tracked 共用 asset，由 D－01 納管；D－09 僅引用、未修改、未重存、未再次納管）。

D－09 route 為 `viewer.html?type=D&bn=09_SPX%20TVBN_2`（空白以 `%20` 編碼），沿用既有共用薄 Viewer 與 A－09 launcher 既有 `127.0.0.1:4173`／marker／server reuse／`trap` 行為（104 行不變、僅 7 行識別差異，未重構）；對位 PNG 1:1 疊加，不合成進正式 Canvas。Viewer 的 D－09 分支**未設 `fieldConfig`**，沿用既有 01～12 shared default 測試文字（**D－01 的 `fieldConfig` 為歷史例外，未套用至 D－09**）；A－01～12 共用預設未修改。D－09 template exports 恰 2（`waitForSpxTvbn2Fonts`、`renderSpxTvbn2`）、零 import，signature 為 `renderSpxTvbn2(canvas, images, { headline, subheadline, protectionText } = {})`。**A－09 的 11 個 baseline functions 落地比對為 6/11 byte-identical ＋ 5/11 message-only behavior-equivalent，實質差異 0/11**：byte-identical 者為 `hasInk`、`validateLeftCenteredInkFitsBox`、`drawLeftCenteredText`、`tokenizeSubheadline`、`adjacentOrdinaryRun`、`drawLeftCenteredMixedSubheadline`；behavior-equivalent 者為 `assertLayoutFitsCanvas`、`measureRun`、`boundaryGlyphInkBottom`、`drawSpxTvbn2MediumText`、`assertFontsReady`，五者合計 **6 行** runtime error message 差異（**`assertLayoutFitsCanvas` 因函式本身含兩個 `throw` 而為 2 行**，其餘四者各 1 行），每一行皆僅為版位標示 `A－09` → `D－09`，演算法／控制流／回傳值零差異；**不得記為 11/11 byte-identical**。新增的 `drawSpxTvbn2Logo` 與 renderer body 必要的 Logo 接線不納入此 11 個 baseline helper 統計。其中 **`assertLayoutFitsCanvas` 完整保留、仍遍歷 `Object.entries(SPX_TVBN_2_LAYOUT)`、四邊界檢查未弱化，因此自然一併涵蓋新增的 Logo box**。D－09 另比照既有 D precedent 加入最小 **canvas-size guard**（`canvas.width` 必須 1599、`canvas.height` 必須 1080，不符即 fail-fast）；此為 D template 層一致性加強，**A－09 baseline 本身未被修改，亦未抽出 shared guard**。

##### 5.2.7.3 尚未完成的邊界

- **本次完成的是「D－09 renderer ＋ launcher ＋ assets 納管 ＋ 人工對位驗證」，不是「D 樣式正式平台整合完成」。** Jamie 的 PASS 是**人工 1:1 overlay 對位 PASS**，**不是正式平台 Preview／Export PASS**，後者尚未做。
- 目前正式支援的樣式仍為 **A 與 B**；`SUPPORTED_TYPES` 仍為 `["A", "B"]`，`ASSET_BASE_BY_TYPE` 仍只有 A 與 B，`A_TABLE` 未加入 D entry 或 type 維度，`bn/js/render-a.js` 未 enable D，正式 renderer registry 尚未 enable D，樣式 D 在正式平台維持 fail-closed；正式平台六個核心 JS 於本次 Code Commit 全部零修改。
- D 的正式 Excel worksheet Import、Restore、控制台 Preview 與 Export **尚未 enable**；D－09 正式 Preview ↔ Export 一致性實測，以及版位 09 既有鎖定的 **JPG／72 dpi**（`EXPORT_ITEMS` 中 `{ id: "09", name: "09_SPX TVBN_2", format: "jpg" }`、**無 `maxBytes`，亦無任何 D-specific `maxBytes`**、`EXPORT_DPI = 72`、JPEG 品質既有全域行為不變）實際 Export 驗證，**deferred until D platform integration**（本次未執行 D Export 實測，不得記為已驗證）。
- 「D 有自己的 worksheet `D`，工單配置與 A／B 相同」屬已確認產品需求，**不代表目前平台已可 Import D**。
- 目前已完成的樣式 D 版位為 D－01、D－02、D－03、D－06、D－07、D－08、D－09，皆為**個別** renderer 與人工對位流程，不代表整個 D 樣式完成。D－04、D－05、D－10～17 仍須逐一確認與開發。本節裁決**只代表 D－09**，不得據此推論其餘 D 版位的 template 形狀、Logo 位置或文字差異，也不得預先補完未確認的 D 版位差異。樣式 C 不在本節範圍。

#### 5.2.8 `10_POP UP`

##### 5.2.8.1 正式規格來源

D－10 的完整正式規格、幾何、typography、Logo 裁決與 deferred 邊界以 `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md` 的「D－10 Requirement」章節為準（含 14.6【JAMIE/GPT LOCKED DECISION】geometry 裁決，完成狀態見該章節 14.20 節），實作紀錄以 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 的「D－10」章節（落地紀錄見其 13.27 節）為準。樣式 D 只維護這一份總 Requirement 與一份總 Proposal，**不建立逐版位 Requirement／Proposal 文件**。**本節只作狀態登錄與規格引用，不複製該兩份文件內容。**

D－10 與樣式 A／B 的 `10_POP UP` 共用同一組已確認的文字內容模型與視覺樣式（Canvas **580 × 720**、主標 Medium `30pt` `#ffffff`、副標 Bold `40pt` `#fff285`、副標 `$`／`%` Bold `35pt` `#fff285` 特殊 formatting、保護文字 Medium `20pt` `#a6f4e6`、**centered ink＝水平＋垂直 ink bounding-box 置中**（`textAlign="left"`／`textBaseline="alphabetic"`）、既有字數規則、Medium template-local 2× rasterization）。A－10 與 B－10 共用同一正式 renderer `bn/templates/A/10-pop-up.js`（`A_TABLE` 僅以版位 id 為 key、無 type 維度，A／B 差異只由 `ASSET_BASE_BY_TYPE` 切換底圖路徑）；**A／B－10 既有規格未被本節修改**。

**`10_POP UP` 為 17 版位中唯一 canvas 尺寸 ≠ 底圖 intrinsic 尺寸者**，此 A－10 特例在 D－10 完整保存：canvas **580 × 720**、background intrinsic **475 × 673**、background 繪製目的地精確為 **`(53, 27, 475, 673)`**（未 stretch 成整張 canvas）；`context.clearRect(0, 0, 580, 720)` 保留且仍位於 background 之前；`globalAlpha = 1`、`globalCompositeOperation = "source-over"`；canvas instance guard、background instance／readiness／intrinsic（475 × 673 硬斷言）guard、**A－10 原本已存在的 canvas-size guard**、`assertFontsReady` 與 `assertSpecificationFitsCanvas` 全部保留。

**D－10 真正存在的差異有兩項**：

1. 新增固定 Logo。Logo box `{left:129, top:109, width:323, height:46}`；source `bn/assets/D/Logo.png` 原始 784 × 112（既有 tracked 共用 asset，由 D－01 納管，D－10 僅引用，**非本版位新增素材，未在本次 Code Commit 再次納管**）；以 contain／no-upscale 等比例縮放並在 box 內**水平置中＋垂直置中**，`scale = min(323/784, 46/112) = ` **`23/56`**（height-bound），destination **322 × 46**、`destinationX = box.left + (box.width − destinationWidth) / 2 = ` **129.5**、`destinationY = box.top + (box.height − destinationHeight) / 2 = ` **109**，即 **`322 × 46 @ (129.5, 109)`**，左 **0.5px**／右 **0.5px**／上 **0px**／下 **0px**，aspect 保持 **7 : 1**；**`destinationX = 129.5` 必須以 fractional 原值保留**，禁止 rounding／truncation（實作實測全檔無 `Math.round`／`floor`／`ceil`／`trunc`／`toFixed`／`parseInt`／bitwise），禁止 stretch 成 323 × 46、禁止 cover／crop／source clipping（source rect 完整 `0, 0, sourceWidth, sourceHeight`）。Logo smoothing 為 template-local 獨立 `save() → imageSmoothingEnabled = true → imageSmoothingQuality = "high" → drawImage() → restore()`；Logo 由 renderer **真正畫入 canvas**（非 DOM overlay）、**不進 Medium 2× surface**、**未建立 shared Logo helper**。Logo 為固定 renderer asset，**不由 Excel 帶入、不進 Editor、不進 Workspace、不進暫存 JSON**。
2. 三段文字框相對 A／B－10 `POP_UP_LAYOUT` **僅 `top` 各下移 +44px**（`left`／`width`／`height` 逐值不變）。此為 D－10 對位圖像素實證所得之 D－10 自身差異，**不得建立 generic／shared offset 規則、不得推論至其他 D 版位**。

三段文字 box 為 headline `{left:129, top:172, width:323, height:38}`、subheadline `{left:85, top:225, width:410, height:51}`、protectionText `{left:85, top:286, width:410, height:25}`；四 box right／bottom 為 **452／155、452／210、495／276、495／311**，全部落於 580 × 720 內，`logo` 為 `POP_UP_LAYOUT` 第一個 key。Medium local 2× 的 offscreen 為 **1160 × 1440**（既有尺寸硬斷言保留），只涵蓋 headline ＋ protectionText，Bold subheadline 與 Logo 均不進 2×，且未新增函式層「兩段 Medium 都空就整體 early-return」，每段文字空字串各自回傳零 ink fit validation 之既有行為保留；draw order 為 **`clearRect → background → Logo → Medium local 2×（headline ＋ protectionText）→ Bold subheadline`**。此 draw order 是**「A－10 唯一既有 `clearRect` 位於 background 之前」與「既有 7/7 已完成 D Logo renderer 一致的 `background → Logo → Medium2x → BoldSub`」兩項既有 evidence 的最小組合**；**A－10 是第一個帶 `clearRect` 的 Logo D 版位，repository 中並不存在完全相同的直接 precedent。** 原 Photoshop／CSS 四框原始標記 `867`／`807`／`870`／`823`／`923`／`984` 與 D－10 自身 `Δleft = 738`／`Δtop = 698` 屬**歷史 evidence，不可直接作 canvas geometry**（實測未出現於 runtime geometry），**不得建立跨版位共用 offset 規則、不得推論至其他 D 版位**。

##### 5.2.8.2 正式落地與驗證狀態

D－10 採 D-specific template definition（未在已封箱的 `bn/templates/A/10-pop-up.js` 加入 D 分支，亦未修改或取代該檔；該檔 sha256 維持 `3b555271cdaccae7fc5cf5a49d481f923318eba5f0965ec001ea6e4065e656ed`）。Jamie 已**親自開啟 `bn/launch/D/10_POP UP.command` 完成 Phase 6 人工 1:1 overlay 對位驗證並明確 PASS**。

Code Commit 為 **`1e2cdb939936de18d2665bafc27229bc7a032e3b`**（`feat(bn): add D10 POP UP template`，parent `30be4920277042d05e10d6185fcee5923bafb0e3`），`git diff --check HEAD^ HEAD` PASS，精確包含 5 個路徑（1 個 M ＋ 4 個 A）：

- `M` `bn/launch/viewer.html`（只服務 D－10 的校稿 branch 最小修改，+16／−1，branch 本體 15 行）
- `A` `bn/templates/D/10-pop-up.js`（新增，465 行）
- `A` `bn/launch/D/10_POP UP.command`（新增，Git mode `100755`）
- `A` `bn/assets/D/底圖/10_POP UP.png`（新增納管，PNG RGBA 475 × 673、202,577 bytes）
- `A` `bn/assets/D/對位/10_POP UP.png`（新增納管，PNG RGBA 580 × 720、19,744 bytes）

`bn/assets/D/Logo.png` 不在本次 commit 內（既有 tracked 共用 asset，由 D－01 納管；D－10 僅引用、未修改、未重存、未再次納管）。

D－10 route 為 `viewer.html?type=D&bn=10_POP%20UP`（空白以 `%20` 編碼），沿用既有共用薄 Viewer 與 A－10 launcher 既有 `127.0.0.1:4173`／marker／server reuse／`trap` 行為（**104 行不變、僅 7 行識別差異（L12、38、39、41、49、94、100）**，未重構）；對位 PNG 為 580 × 720，與 canvas 1:1 疊加，不合成進正式 Canvas。Viewer 的 D－10 分支**未設 `fieldConfig`**，沿用既有 01～12 shared default 測試文字（**D－01 的 `fieldConfig` 為歷史例外，未套用至 D－10**）；A－01～12 共用預設未修改，共用 Logo loader、images-object dispatch ternary、overlay 1:1 validation、A／B（含 A－10）、A－17 與 D－01～09 branches 全部未改。D－10 template exports 恰 2（`waitForPopUpFonts`、`renderPopUp`）、**零 import**，`POP_UP_WIDTH`／`POP_UP_HEIGHT`／`POP_UP_BACKGROUND`／`POP_UP_LAYOUT` 均為 module-local，signature 為 `renderPopUp(canvas, images, { headline, subheadline, protectionText } = {})` 並以防禦式 `images && typeof images === "object" ? images : {}` 解構。

**A－10 的 13 個 baseline functions 落地比對為 5/13 byte-identical ＋ 7/13 message-only behavior-equivalent ＋ 1/13 substantive**：byte-identical 者為 `hasInk`、`drawCenteredText`、`tokenizeSubheadline`、`adjacentOrdinaryRun`、`drawCenteredMixedSubheadline`；message-only behavior-equivalent 者為 `assertSpecificationFitsCanvas`（4 行）、`measureRun`（1 行）、`boundaryGlyphInkBottom`（1 行）、`validateCenteredInkFitsBox`（1 行）、`drawPopUpMediumText`（2 行）、`assertFontsReady`（1 行）、`waitForPopUpFonts`（1 行），七者合計 **11 行** runtime error message 差異，每一行皆僅為版位標示 `A－10` → `D－10`，演算法／控制流／回傳值零差異；substantive 者僅 **`renderPopUp`**，且只因 images object 解構、Logo readiness guard、Logo draw 與 draw-order 接線及版位標示。D template 殘留 `A－10` literal = 0。新增的 template-local `drawPopUpLogo` 為 D-specific 新函式，**不納入此 13 個 baseline function 統計**；**不得記為 5+8+0 或任何其他數字**。其中 **`assertSpecificationFitsCanvas` 完整保留、未改名、未換 generic helper、仍遍歷 `Object.entries(POP_UP_LAYOUT)`、`Number.isFinite`／`width > 0`／`height > 0`／四邊界與 background placement 驗證均未弱化，因此自然一併涵蓋新增的 Logo box**。**A－10 baseline 本身未被修改，亦未抽出 shared guard**；D－10 未另行新增 canvas-size guard（A－10 原本已內建）。

##### 5.2.8.3 尚未完成的邊界

- **本次完成的是「D－10 renderer ＋ launcher ＋ assets 納管 ＋ 人工 1:1 overlay 對位驗證」，不是「D 樣式正式平台整合完成」。** Jamie 的 PASS 是**人工 1:1 overlay 對位 PASS**，**不是正式平台 Preview／Export PASS**，後者尚未做。
- 目前正式支援的樣式仍為 **A 與 B**；`SUPPORTED_TYPES` 仍為 `["A", "B"]`，`ASSET_BASE_BY_TYPE` 仍只有 A 與 B，`A_TABLE` 未加入 D entry 或 type 維度，`bn/js/render-a.js` 未 enable D、未 import 任何 D template，正式 renderer registry 尚未 enable D，樣式 D 在正式平台維持 fail-closed；正式平台六個核心 JS 於本次 Code Commit 全部零修改。
- D 的正式 Excel worksheet Import、Restore、控制台 Preview 與 Export **尚未 enable**；D－10 正式 Preview ↔ Export 一致性實測，以及版位 10 既有鎖定的 **PNG／72 dpi／`maxBytes: 250000`**（`EXPORT_ITEMS` 中 `{ id: "10", name: "10_POP UP", format: "png", maxBytes: 250000 }`、`EXPORT_DPI = 72`；既有 PNG 72 dpi pHYs patch 與容量鏈**目前只在 A／B 正式路徑實際運行**）實際 Export 驗證，**deferred until D platform integration**。本次 Code Commit 與 Jamie Manual PASS **不代表已驗證 D－10 的 250,000 bytes**；本輪未執行 D Export 實測，不得記為已驗證，`bn/js/export.js` zero-diff。
- 「D 有自己的 worksheet `D`，工單配置與 A／B 相同」屬已確認產品需求，**不代表目前平台已可 Import D**。
- 目前已完成的樣式 D 版位為 D－01、D－02、D－03、D－06、D－07、D－08、D－09、D－10，皆為**個別** renderer 與人工對位流程，不代表整個 D 樣式完成。D－04、D－05、D－11～17 仍須逐一確認與開發。本節裁決**只代表 D－10**，不得據此推論其餘 D 版位的 template 形狀、Logo 位置或文字差異，也不得預先補完未確認的 D 版位差異。樣式 C 不在本節範圍。

#### 5.2.9 `12_LPBN`

##### 5.2.9.1 正式規格來源與落地值

D－12 完整正式規格以 `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md` 第 15 節為準（完成狀態見 15.21），實作紀錄見 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 第 14 節（落地紀錄見 14.26）；不建立逐版位文件。Canvas／background 為 **1200 × 550 @ (0,0)**；四框為 Logo `{58,161,365,52}`、headline `{58,226,405,49}`、subheadline `{58,285,475,62}`、protectionText `{58,360,475,28}`，三文字框與 A／B－12 逐值相同。Photoshop `(478,944,365,52)` 與 `Δ(-420,-783)` 只屬 D－12 歷史 evidence，不是 generic offset。

Logo source `bn/assets/D/Logo.png` 為既有 tracked 784 × 112（7:1），contain／no-upscale `scale=13/28`，destination **364 × 52 @ (58,161)**，餘量左0／右1／上0／下0，完整 source rect、水平靠左、無 rounding／stretch／crop。Typography 為 headline 39pt Medium `#ffffff`、subheadline 49pt Bold `#fff285`、`$`／`%` 42pt Bold `#fff285`、protectionText 22.5pt Medium `#a6f4e6`；三文字沿用 A／B－12 left-centered ink、特殊符號 formatting 與 fit validation。Medium template-local 2× 為 2400 × 1100，只涵蓋 headline＋protectionText；Logo／Bold 不進 2×。正式 draw order 為 **canvas reset → clearRect → background → Logo → Medium local 2× → Bold subheadline**，僅 D－12，不得 generic/shared 推廣。

##### 5.2.9.2 正式落地與驗證狀態

Code Commit **`4397a40fb69b12a11b3c6e61aa9bef1581f73409`**（`feat(bn): add D12 LPBN template`，parent `bd20a44b217da505fc8412021b6ca054d582bb4e`）精確包含 5 paths（1 M＋4 A）：`bn/templates/D/12-lpbn.js`、`bn/launch/D/12_LPBN.command`（mode `100755`）、`bn/launch/viewer.html`、`bn/assets/D/底圖/12_LPBN.jpg`、`bn/assets/D/對位/12_LPBN.png`；共用 Logo 不在 commit 內。Renderer 零 import、exports 恰 `waitForLpbnFonts`／`renderLpbn`；A－12 baseline functions 實測 6/14 byte-identical＋7/14 message-only＋1/14 substantive，Logo helper `drawLpbnLogo` 另計，validation 未弱化。Viewer 僅 additive D－12 branch、無 `fieldConfig`；launcher query `?type=D&bn=12_LPBN`。Jamie 已親自完成 Phase 6 人工 1:1 overlay 對位並明確 **PASS**。

三素材 dimensions／bytes／SHA-256 分別為：底圖 JPG 1200 × 550／131,471／`589ba6ce783340e3075ecc934558cbea2b2ade033ecd352c45386314d68d6634`；對位 PNG 1200 × 550／16,091／`912c5f9d3d06cfe30be4809c1d508b32220b0064a3f7e6925d63140aedb7f8a0`；共用 Logo PNG 784 × 112／48,618／`99813cf81a7963ff2e81d60e478332d6f24db4ea8462c059cb466770f016de24`。

##### 5.2.9.3 尚未完成的邊界

- Jamie 的 PASS 是人工 1:1 overlay 對位 PASS，**不是正式平台 Preview／Export PASS**。
- 正式 Type 仍只支援 A／B；D 維持 fail-closed，六個核心 JS zero-diff。LPBN 掛標正式 D 行為、D－12 Export 與 D platform integration 仍 deferred。
- 已完成個別 renderer／人工對位的 D 版位更新為 **D－01、D－02、D－03、D－06、D－07、D－08、D－09、D－10、D－12**；不代表整個 D 完成。D－04、D－05、D－11、D－13～17 仍未完成，不得由 D－12 推論其規格；樣式 C 不在本節範圍。

## 6. Launch 驗證原則

正式 Launch 的目標目錄結構為：

```text
bn/
└── launch/
    ├── A/
    ├── B/
    ├── C/
    └── D/
```

最終產品方向是 A／B／C／D 各樣式底下的固定 17 個 BN 版位都具有直接查看能力，讓 Jamie 能依「樣式＋BN 版位」找到並開啟指定正式 Template。

`bn/launch/` 的用途只限正式 BN Template 的開發／視覺驗證入口。Launch 只負責讓指定 Type 與 BN 版位可以直接開啟及查看；它不是第二套 Generator、第二套 Template 系統、四套獨立正式 Template 實作或 68 份互相複製的正式 Layout 程式。Launch 必須呈現共用正式 Template 系統中的同一份正式 Template，不得複製正式 Template 程式。

Launch 是正式 Template 的最小開發／視覺校稿工具，不是第二套 BN 控制台、正式 Workspace 或正式資料輸入流程。A－01～12 Launch 只提供三個測試文字欄位，A－13、A－14 與 A－15 Launch 只提供「第一行」「第二行」兩個測試文字欄位，A－16 Launch 提供「左標題」「左文案」「右標題」「右文案」四個測試文字欄位，A－17 Launch 提供 preset select（P1～P7）＋JSON textarea＋warnings 區且無對位圖（見 5.1.17.12）；均只含即時 Canvas 更新（與各自的對位圖顯示／隱藏，A－17 除外），不得複製控制台 Editor／Workspace，也不得加入 Excel Import、JSON Restore、暫存、Export、ZIP、banwords UI、Type Selection、17 BN Navigation、正式控制台 UI 或 Template 樣式調整功能。

目前樣式 A－`01_DDcard BN`、`02_MALL HBN`、`03_Coin page BN`、`04_Loyalty BN`、`05_MSBN`、`06_IG`、`07_FB POST`、`08_SPX TVBN_1`、`09_SPX TVBN_2`、`10_POP UP`、`11_Line OA`、`12_LPBN`、`13_Skinny BN_APP`、`14_Skinny BN_PC`、`15_AR`、`16_副區` 與 `17_門檻表` 均可由 `bn/launch/A/` 中各自的直接查看入口開啟；Jamie 不必每次依序經過 FSS 首頁、BN 樣式選擇頁、控制台及左側選取。

Phase 1 不決定入口一定是 `.html`、`.command`、symlink、query parameter、wrapper、共用 viewer 或其他技術形式，也不建立任何 Launch 檔案。具體方式必須留待 Phase 2 Investigation，再由 Phase 3 Proposal 提出最小修改方案。

不要求一次建立 68 個空啟動檔，也不預建 A－17、B－01～17、C－01～17、D－01～17 的空 Template 或空 Launcher。後續入口仍須逐版位經過正式 Phase 流程，不得因未來全部需要而提前 Coding 未完成版位。

## 7. 共通完成邊界

以下為 A－01 第一輪完成時的個別完成邊界：

1. 只完成樣式 A／Type A 的正式 `01_DDcard BN` Template，沒有順帶製作其他 Template 或 Type。
2. 正式 Canvas 為 531 × 792px，正式輸出格式需求為 JPG。
3. 使用 `bn/assets/A/底圖/01_DDcard BN.jpg`，且沒有額外 Type 文字或 Logo。
4. 主標符合第 5.1.1.2 節完整規格與主標 8 字既有限制。
5. 副標符合第 5.1.1.3 節完整規格與副標 7 字既有限制。
6. 副標中的 `$`／`%` 使用同字型、同顏色及 37pt，並仍屬同一副標內容。
7. 保護文字符合第 5.1.1.5 節完整規格與保護文字 17 字既有限制。
8. 三個文字框內的文字均水平置中並垂直置中。
9. 三個文字欄位均為 100% opacity，不採用 Photoshop CSS 中的 `opacity: 0.302`。
10. Jamie 可透過 `bn/launch/A/` 中 A－01 的對應入口直接查看正式 Template。
11. Launch 初始顯示三組已確認預設測試文字，並可透過三個最小文字欄位即時更新正式 Canvas。
12. Launch 測試文字遵守主標 8、副標 7、保護文字 17，以及 ASCII 0.5／非 ASCII 1 的既有字數規則。
13. Launch 可顯示或隱藏 `bn/assets/A/對位/01_DDcard BN.png`；顯示時使用原始尺寸、原始座標及 PNG 自有 Alpha 1:1 疊加，不另行調整透明度。
14. 對位圖只存在 Launch 校稿畫面，不進入正式 Template、控制台、Workspace 或成品。
15. Launch 入口沿用共用正式 Template，不複製另一套 Template、Editor、Workspace 或正式 Layout 程式。
16. 既有 BN 控制台、Editor、Workspace、banwords 及 placeholder Preview 均未修改或重構。
17. A－01 正式 Template 未接入控制台；正式控制台整合留待後續獨立開發階段。
18. 未製作其他正式 BN，亦未建立 68 套 Template 程式、空 Template 或空 Launcher。
19. 未處理 Excel、Restore、Workspace Schema、Export、ZIP 或第 8 節其他明確不做內容。

以上只定義需求結果；實作方式須依後續 Phase 2 Investigation 與經 Jamie 確認的 Phase 3 Proposal 決定。

後續每個新樣式／版位的個別完成標準，只有在 Requirement 經 Jamie 確認後才追加至本文件；不得預先建立未確認項目。

## 8. 明確不做的內容

本輪不得處理（A－17 已於 5.1.17 正式完成，不再屬於本清單）：

- 樣式 B、C、D Templates。
- Excel Import、Excel Mapping／Schema。
- 暫存 Restore、Workspace JSON Schema。
- Export、ZIP、JPG Export Coding。
- `17_門檻表` Editor。
- 字型、字重、字級、顏色或位置的使用者調整 UI。
- 新增文字欄位或拖曳文字。
- Template Designer。
- Type Registry、Template Registry、新 Framework 或 Build System。
- 未來 Type。
- 未確認的 responsive Template、Resize 演算法、文字縮放、overflow、自動換行、符號 baseline 規則。
- 任何因「未來可能需要」而新增的抽象化。
- 已 PASS 控制台或樣式選擇頁的重新設計、重構或 UI 修改。
- A－01 正式 Template 接入既有 BN 控制台。
- 正式 Templates 與控制台的整合設計。
- banwords 修改。
- Launch banwords UI 或 inline banwords message。
- Launch Excel Import、Workspace、JSON Restore、暫存、Export 或 ZIP。
- Launch Type Selection、17 BN Navigation、正式控制台 UI 或 Reset Workspace。
- Launch 字型、字重、字級、顏色、座標、文字框、對齊、opacity、Resize 或 Template 樣式調整功能。
- 對位圖 Resize、位移、重新生成、內容修改、額外 opacity／globalAlpha、透明度 Slider 或自動淡化。
- 對位圖進入正式 Template、BN 控制台、Editor、Workspace 或 Export 成品。
- B－01～17、C－01～17、D－01～17 的空 Template、空 Launcher 或正式 Layout 程式。
- 一次建立 68 個啟動檔或 68 份正式 Template 程式。

## 9. 修改邊界

本次 Phase 1 只允許將尚未 Commit 的 A－01 Requirement 整理為本共用正式 Templates Requirement Specification，不得修改 HTML、CSS、JavaScript、JSON、圖片、字型、Excel 或其他程式碼／資產，也不得修改既有第一輪 Requirement 歷史內容。

後續階段若進入實作，只可在 Phase 2 完成調查、Phase 3 Proposal 經 Jamie 確認後，修改完成 A－01 所必要的最小檔案。不得藉 A－01：

- 修改 FSS 入口平台 Locked Architecture Contract。
- 改造 Overlay Image 或其他 Generator。
- 分裂共用 Generator、控制台、17 Templates 或資料流程。
- 實作其他版位、Type 或未確認功能。
- 重構已 PASS 的控制台、Editor、Workspace 或 banwords。
- 將 A－01 正式 Template 接入既有控制台，或預先設計後續控制台整合階段。

若後續發現 Requirement 與正式文件或 Locked 架構衝突，必須停止並交由 Jamie 決定。

## 10. Phase 2 Investigation 邊界

以下事項與 A－01 後續實作直接相關，但 Phase 1 不得自行決定：

1. 正式 Template 最適合放在哪個既有或新 BN 目錄。
2. 正式 Template 如何維持未來 A／B／C／D 共用，而不是複製。
3. `bn/launch/A/B/C/D` 的最小結構方式，以及如何只作為薄入口。
4. A－01 直接查看入口應如何實作，並讓 Jamie 最容易直接開啟查看。
5. 目前 FSS／BN 的啟動方式、現有 HTML／JavaScript 架構及可沿用的 viewer／Template render 方式；是否需要 local server 才能正常載入字型、圖片與 JavaScript，以及 macOS 現有開發環境可沿用的方式。
6. 現有 WOFF2 字型的正式載入方式，如何忠實使用已確認的 Medium／Bold 字型。
7. Photoshop `pt` 在目前 Web render 中應如何忠實呈現。
8. 三個固定文字框水平及垂直置中的可靠實作方式。
9. 副標 45pt 主要文字與 37pt `$`／`%` 在正式字型中的實際 glyph／baseline 對位。
10. 正式底圖與對位圖的實際路徑、尺寸、格式及檔案狀態。
11. Launch 如何以三個最小文字欄位提供已確認預設測試文字、套用既有字數規則並即時更新 Canvas，且不建立第二套完整 Editor／Workspace。
12. 如何以顯示／隱藏開關將正式對位圖依原始尺寸、座標與 Alpha 1:1 疊加，並以最小方式驗證 A－01 視覺結果；Phase 1 不指定 Pixel Diff 或視覺測試 Framework。
13. 實際資產目錄目前是半形 `A` 或全形 `Ａ`，以及正式 Requirement 路徑與實際檔案是否一致；Phase 1 只記錄問題，不 Rename 或修改資產。

目前上述調查只聚焦第一張 A－01，不得擴張至其他 16 個 BN、樣式 B／C／D、Excel Import、Export、Restore、`17_門檻表` 或未來架構。未來新增已確認版位時，若共通項目已在 A－01 調查並實作驗證 PASS，不得重新調查整個 Generator，只調查該版位真正新增或不同的部分。
