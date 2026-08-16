# FSS BN Generator－正式 BN Templates Requirement Specification v1.0

> 階段：Phase 1－Requirement Specification
>
> 文件範圍：固定 17 個正式 BN Templates 與 A／B／C／D Type 真正存在的差異
>
> 狀態：A－01、A－02、A－03、A－04、A－05、A－06、A－07、A－08、A－09、A－10、A－11、A－12 已完成並經 Jamie 手動驗證 PASS；其他版位依確認狀態追加
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

> 樣式 A／內部 Type A 的正式 `01_DDcard BN`、`02_MALL HBN`、`03_Coin page BN`、`04_Loyalty BN`、`05_MSBN`、`06_IG`、`07_FB POST`、`08_SPX TVBN_1`、`09_SPX TVBN_2`、`10_POP UP`、`11_Line OA` 與 `12_LPBN` Template。

目前只定義：

- A－01～12 的正式版位與視覺規格。
- A－01～12 正式 Template 使用底圖與對位圖的需求。
- A－01～12 透過 `bn/launch/A/` 對應入口直接查看與進行視覺驗證的產品需求。
- 既有 BN 控制台維持不變、正式 Template 接入控制台移至後續獨立開發階段的邊界。

目前不處理 A－13～17、樣式 B／C／D 或其他生成器功能，也不為它們建立空章節、TODO、placeholder 或未確認規格表格。

正式 BN Template 採逐樣式、逐版位製作與驗證；目前已完成「樣式 A → `01_DDcard BN`」、「樣式 A → `02_MALL HBN`」、「樣式 A → `03_Coin page BN`」、「樣式 A → `04_Loyalty BN`」、「樣式 A → `05_MSBN`」、「樣式 A → `06_IG`」、「樣式 A → `07_FB POST`」、「樣式 A → `08_SPX TVBN_1`」、「樣式 A → `09_SPX TVBN_2`」、「樣式 A → `10_POP UP`」、「樣式 A → `11_Line OA`」與「樣式 A → `12_LPBN`」。後續版位仍須由 Jamie 逐一確認，不因 A－01～12 完成而預填或製作其他版位。

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

目前已完成的正式 Template 為「樣式 A → `01_DDcard BN`」、「樣式 A → `02_MALL HBN`」、「樣式 A → `03_Coin page BN`」、「樣式 A → `04_Loyalty BN`」、「樣式 A → `05_MSBN`」、「樣式 A → `06_IG`」、「樣式 A → `07_FB POST`」、「樣式 A → `08_SPX TVBN_1`」、「樣式 A → `09_SPX TVBN_2`」、「樣式 A → `10_POP UP`」、「樣式 A → `11_Line OA`」與「樣式 A → `12_LPBN`」。後續 Scope 仍由 Jamie 逐一確認。

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
- 共用 Launch Viewer：`bn/launch/viewer.html`；目前支援 A－01～12。
- A－01 直接啟動入口：`bn/launch/A/01_DDcard BN.command`。
- 正式底圖：`bn/assets/A/底圖/01_DDcard BN.jpg`。
- 正式對位圖：`bn/assets/A/對位/01_DDcard BN.png`。

正式 Canvas 仍為 531 × 792px，三個 Locked 文字框及其 px 座標、水平／垂直置中、顏色與 100% opacity 均未改變。Renderer 直接使用 Photoshop 原始字級單位：主標 Medium 30pt、副標 Bold 45pt、`$`／`%` Bold 37pt、保護文字 Medium 18pt；沒有將 pt 同數值寫成 px，也沒有建立人工 `pt → px` 換算規則。

為縮小 Browser Canvas 與 Photoshop rasterization 的 Medium 視覺差異，主標與保護文字只在 renderer 內以 2× local temporary Canvas rasterization，再高品質縮回正式尺寸並回繪正式 Canvas。此調整不改 Medium 字型、30pt／18pt、顏色、opacity、文字框或座標；不套用 UA／瀏覽器分支或 `textRendering = "geometricPrecision"`，也不影響副標、`$`／`%`、正式底圖或其他內容。Chromium／Chrome 路線與 Safari 的實際 Canvas 輸出均已通過 Jamie 視覺確認，主標與保護文字的粗度／銳利度比未調整版本更接近 Photoshop 完成參考圖，且未見明顯跨瀏覽器字重差異或副標等其他內容 regression。

A－01 `.command` 可由 Jamie 直接雙擊，不必先手動啟動根目錄 `啟動 FSS.command`；它會確認或啟動 `127.0.0.1:4173` 並開啟共用 Viewer 的 A－01 route。正確服務已存在時沿用，若該 port 是不相符的服務則停止並提示，不自行改 port，也不終止既有程序。Launch Viewer 提供三欄測試文字即時編輯、IME-safe、ASCII 0.5／非 ASCII 1 計數、超限 rollback，以及正式對位圖顯示／隱藏；A－02～12 亦沿用這些共用薄校稿能力。

既有 BN 控制台仍維持 placeholder Preview，尚未接入 A－01～12 正式 Template。A－13～17 與 B／C／D 均未製作；目前的 Type A 路徑與 Viewer 實作不預先決定其他 Type 的 Template 共用方式，也不建立 Registry、Framework 或未經確認的抽象化。

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

A－03 `.command` 沿用既有 `127.0.0.1:4173` Launch 流程，開啟上述 route，Git executable mode 為 `100755`。Viewer 仍是共用薄校稿工具，不是第二套 Generator；既有正式 BN 控制台尚未接入 A－01～12 renderer。

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

Launch 是正式 Template 的最小開發／視覺校稿工具，不是第二套 BN 控制台、正式 Workspace 或正式資料輸入流程。A－01～12 Launch 只提供三個測試文字欄位、即時 Canvas 更新及對位圖顯示／隱藏；不得複製控制台 Editor／Workspace，也不得加入 Excel Import、JSON Restore、暫存、Export、ZIP、banwords UI、Type Selection、17 BN Navigation、正式控制台 UI 或 Template 樣式調整功能。

目前樣式 A－`01_DDcard BN`、`02_MALL HBN`、`03_Coin page BN`、`04_Loyalty BN`、`05_MSBN`、`06_IG`、`07_FB POST`、`08_SPX TVBN_1`、`09_SPX TVBN_2`、`10_POP UP`、`11_Line OA` 與 `12_LPBN` 均可由 `bn/launch/A/` 中各自的直接查看入口開啟；Jamie 不必每次依序經過 FSS 首頁、BN 樣式選擇頁、控制台及左側選取。

Phase 1 不決定入口一定是 `.html`、`.command`、symlink、query parameter、wrapper、共用 viewer 或其他技術形式，也不建立任何 Launch 檔案。具體方式必須留待 Phase 2 Investigation，再由 Phase 3 Proposal 提出最小修改方案。

不要求一次建立 68 個空啟動檔，也不預建 A－13～17、B－01～17、C－01～17、D－01～17 的空 Template 或空 Launcher。後續入口仍須逐版位經過正式 Phase 流程，不得因未來全部需要而提前 Coding 未完成版位。

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

本輪不得處理：

- A－13～17 Templates。
- 樣式 B、C、D Templates。
- 13～17 Templates。
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
- A－13～17 的空啟動檔或未使用入口。
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
