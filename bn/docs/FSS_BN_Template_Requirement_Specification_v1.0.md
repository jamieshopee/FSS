# FSS BN Generator－正式 BN Templates Requirement Specification v1.0

> 階段：Phase 1－Requirement Specification
>
> 文件範圍：固定 17 個正式 BN Templates 與 A／B／C／D Type 真正存在的差異
>
> 狀態：A－01 已完成並經 Jamie 手動驗證 PASS；其他版位依確認狀態追加
>
> 整理日期：2026-08-12
>
> A－01 落地狀態同步日期：2026-08-13

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

目前唯一已確認並納入完整 Requirement 的對象為：

> 樣式 A／內部 Type A 的正式 `01_DDcard BN` Template。

目前只定義：

- A－01 的正式版位與視覺規格。
- A－01 正式 Template 使用底圖與對位圖的需求。
- A－01 透過 `bn/launch/A/` 對應入口直接查看與進行視覺驗證的產品需求。
- 既有 BN 控制台維持不變、正式 Template 接入控制台移至後續獨立開發階段的邊界。
- 後續完成 A－01 所需的最小 Phase 2 待調查事項。

目前不處理 A－02～17、樣式 B／C／D 或其他生成器功能，也不為它們建立空章節、TODO、placeholder 或未確認規格表格。

正式 BN Template 採逐樣式、逐版位製作與驗證；目前第一張只有「樣式 A → `01_DDcard BN`」。A－01 完成並經 Jamie 驗證後，再依後續需求決定下一個版位，本文件不指定或製作 A－02。

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

目前第一張正式 Template 為「樣式 A → `01_DDcard BN`」。A－01 完成並經 Jamie 驗證後，再依後續需求決定下一個版位；本文件不指定 A－02 為下一個 Scope。

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
- 共用 Launch Viewer：`bn/launch/viewer.html`；目前只支援 A－01。
- A－01 直接啟動入口：`bn/launch/A/01_DDcard BN.command`。
- 正式底圖：`bn/assets/A/底圖/01_DDcard BN.jpg`。
- 正式對位圖：`bn/assets/A/對位/01_DDcard BN.png`。

正式 Canvas 仍為 531 × 792px，三個 Locked 文字框及其 px 座標、水平／垂直置中、顏色與 100% opacity 均未改變。Renderer 直接使用 Photoshop 原始字級單位：主標 Medium 30pt、副標 Bold 45pt、`$`／`%` Bold 37pt、保護文字 Medium 18pt；沒有將 pt 同數值寫成 px，也沒有建立人工 `pt → px` 換算規則。

為縮小 Browser Canvas 與 Photoshop rasterization 的 Medium 視覺差異，主標與保護文字只在 renderer 內以 2× local temporary Canvas rasterization，再高品質縮回正式尺寸並回繪正式 Canvas。此調整不改 Medium 字型、30pt／18pt、顏色、opacity、文字框或座標；不套用 UA／瀏覽器分支或 `textRendering = "geometricPrecision"`，也不影響副標、`$`／`%`、正式底圖或其他內容。Chromium／Chrome 路線與 Safari 的實際 Canvas 輸出均已通過 Jamie 視覺確認，主標與保護文字的粗度／銳利度比未調整版本更接近 Photoshop 完成參考圖，且未見明顯跨瀏覽器字重差異或副標等其他內容 regression。

A－01 `.command` 可由 Jamie 直接雙擊，不必先手動啟動根目錄 `啟動 FSS.command`；它會確認或啟動 `127.0.0.1:4173` 並開啟共用 Viewer 的 A－01 route。正確服務已存在時沿用，若該 port 是不相符的服務則停止並提示，不自行改 port，也不終止既有程序。Launch Viewer 提供三欄測試文字即時編輯、IME-safe、ASCII 0.5／非 ASCII 1 計數、超限 rollback，以及正式對位圖顯示／隱藏；這些能力只服務 A－01 開發與視覺校稿。

既有 BN 控制台仍維持 placeholder Preview，尚未接入 A－01 正式 Template。A－02～17 與 B／C／D 均未製作；目前的 A－01 路徑與 Viewer 實作不預先決定其他 Type 的 Template 共用方式，也不建立 Registry、Framework 或未經確認的抽象化。

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

Launch 是正式 Template 的最小開發／視覺校稿工具，不是第二套 BN 控制台、正式 Workspace 或正式資料輸入流程。A－01 Launch 只提供三個測試文字欄位、即時 Canvas 更新及對位圖顯示／隱藏；不得複製控制台 Editor／Workspace，也不得加入 Excel Import、JSON Restore、暫存、Export、ZIP、banwords UI、Type Selection、17 BN Navigation、正式控制台 UI 或 Template 樣式調整功能。

本輪只要求樣式 A－`01_DDcard BN` 完成後，可由 `bn/launch/A/` 中的對應直接查看入口開啟；Jamie 不必每次依序經過 FSS 首頁、BN 樣式選擇頁、控制台及左側選取。

Phase 1 不決定入口一定是 `.html`、`.command`、symlink、query parameter、wrapper、共用 viewer 或其他技術形式，也不建立任何 Launch 檔案。具體方式必須留待 Phase 2 Investigation，再由 Phase 3 Proposal 提出最小修改方案。

本輪不要求一次建立 68 個空啟動檔，也不預建 A－02～17、B－01～17、C－01～17、D－01～17 的空 Template 或空 Launcher。Launch 基礎目錄是否在第一張建立，以及後續入口應逐一建立或安全沿用共用薄入口，留待 Phase 2／Phase 3 判斷，不得因未來全部需要而提前 Coding 未完成版位。

## 7. 共通完成邊界

目前 A－01 在後續完成 Coding 與驗證時，必須同時符合：

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

- A－02～A－12 Templates。
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
- A－02～17 的空啟動檔或未使用入口。
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
