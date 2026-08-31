# FSS BN Generator－C 樣式平台整合 Requirement Specification v1.0

> 狀態：C 樣式完整產品需求已 LOCKED
>
> Implementation baseline：C－01～17 已完成正式控制台／runtime 整合，並經 Jamie Phase 6 人工驗證 PASS
>
> Code Commits：C－01～14 `0c9da10472ba3128ea90b64d2340ac8b178d4514`（`feat(bn): integrate C style 01-14`）；C－15～17 shared integration 與 keyboard fix `78d7718e953b303ec03ecad6328fe6adb17da275`（`feat(bn): complete C style control center integration`）
>
> C－15～17：正式 shared reuse 已落地，無 countdown，不建立 C-specific template／wrapper／geometry
>
> Current contract update：`8a141c1c905107546c25cd125015e1ec7ee61609`（`fix(bn): remove LPBN badge variants`）已取消 A／B／C／D 的 LPBN 掛標，並將 C－01～14 countdown Excel source 由 `C!E16` 改為 `C!E15`；AI 與 Jamie Manual Verification PASS。

## 1. 文件目的與適用範圍

本文件定義 C 樣式 C－01～17 的正式產品需求與目前 repository 落地狀態。C－01～14 為在既有 A/B 文字行為上增加倒數天數的版位；C－15～17 沿用目前 A/B/D 的正式 shared 行為，不增加 C-specific 倒數欄位。

本文件取代先前只涵蓋 C－01 或單版位 Phase 文件的狹義範圍。各版歷史量測、候選值與人工調整紀錄保留在共享 Proposal，惟最終狀態以本文件、`0c9da10` 的 C－01～14 實作與 `78d7718` 的 C－15～17 控制台整合為準。

## 2. C－01～14 共通 USER LOCKED 需求

1. 主標、副標、保護文字的位置、字型樣式、字型大小、顏色與各版正式 A/B 行為相同。
2. 每個版位額外增加「倒數天數」，位置與 geometry 依版位個別鎖定。
3. 倒數來源固定為工單 C Sheet 的 `E15`；最新工單語意為 `C!D15=倒數天數`、`C!E15=0天`、`C!E16=空白`。
4. 工單儲存完整文字，例如 `0天`；Import、Editor、renderer 與 Export 不得把純數字自行組成「天」。
5. 合法值只允許 `0天`～`9天`。
6. 倒數字型來源為 repository 的 `ShopeeNotoSans(content)-Bold.woff2`，Canvas 正式 family alias 為 `ShopeeNotoSans Bold`。
7. 倒數顏色固定為 `#ff4c45`。
8. Photoshop pt font size 在 renderer 中保持 literal pt，不做 pt→px conversion。
9. 每版的 font literal、center、rotation、scale 與 transform／visual ink-center 行為，以完成 Jamie launcher 人工驗證 PASS 並納入 `0c9da10` 的正式 wrapper 為準；不得再以歷史候選值反向覆蓋。
10. C－01～14 Preview 必須顯示倒數天數，Editor 必須允許使用者修改，Import／Restore／JSON 必須保存該完整字串，Export 必須使用同一 state 產出。

## 3. 既有文字模型與 Excel mapping

### 3.1 C－01～12

C－01～12 沿用既有三欄文字模型：

- `headline`：主標
- `subheadline`：副標
- `protectionText`：保護文字

正式工單的既有 mapping 沿用目前 A/B Import 規則；C Sheet 額外以 `E15` 提供完整倒數字串。

### 3.2 C－13～14

C－13～14 沿用 Skinny banner 的既有兩行文字模型：

- `line1`：第一行
- `line2`：第二行

倒數來源同樣固定為 C Sheet `E15`，並以同一完整字串 validation 規則處理。

### 3.3 C－12 現行欄位契約

C－12目前只有 countdown責任，與C－01～14相同由`C!E15`取得完整倒數字串；不再有LPBN badge month責任。`C!E16`目前空白且不再是countdown source。LPBN Preview／Export只保留單一base，既有C－12 renderer與countdown geometry完全不變。

### 3.4 C－13／14 Import mapping

- C－13 的 `line1`／`line2` 精確讀取 `C!L20`／`C!L21`。
- C－14 的 `line1`／`line2` 精確讀取 `C!L22`／`C!L23`。
- 兩版倒數仍只讀取 `C!E15`，不從 Skinny 文字 cells 推導。

## 4. Workspace／Import／Restore／JSON

1. Workspace 必須承載目前選取的 Type 與 C－01～14 倒數完整字串，使 Preview、Editor、Restore 與 Export 讀取相同狀態。
2. Import 依目前選取 Type 選擇對應 Excel Sheet；Type C 必須選擇 Sheet `C`。
3. Import 只接受 `0天`～`9天`，不得將數字、空值或其他格式自動正規化為合法值。
4. Restore 必須在既有 allow-list／validation 邊界內保存 C 倒數欄位；非法值不得繞過 Import validation。
5. JSON 維持目前 schema/version 契約，保存 Type、版位既有文字與倒數完整字串。此需求不授權另開 schema version 或建立 C-only JSON 格式。
6. C－15～17 不新增倒數 state、Import mapping、Restore 欄位或 JSON 欄位；JSON v1 serialization 將 `cCountdownText` 正規化為 `null`。
7. C－15／16 分別保存與 Restore 既有 `bnText["15"]` 與 `bnText["16"]`；C－17 保存與 Restore 既有 `threshold` model，不新增 workspace state 或 schema version。
8. JSON version維持`1`；新JSON不再輸出`lpbnBadgeMonth`。Legacy JSON若含該欄位仍可Restore，但欄位會被忽略，不恢復badge行為。

## 5. Editor／Preview／Export

1. C－01～14 Editor 顯示倒數天數控制項，僅允許 `0天`～`9天`，變更後更新相同 workspace state。
2. C－01～14 Preview renderer 讀取該 state 並套用對應版位 wrapper 的正式 geometry。
3. Export 取得目前 Type、版位 renderer 與 type-specific asset base，輸出結果必須與 Preview 使用相同 renderer/state 契約。
4. C－01～14 的正式 wrapper 與 launcher 已納入 `0c9da10`；launcher 只作人工驗證入口，不是獨立資料來源。
5. C－01～14 的正式底圖與對位圖亦已納入同一 Code Commit；對位圖只供人工驗證，不進入正式輸出。
6. C－15～17 已可從 C workspace 正式 Preview／Export；三版位不顯示 countdown Editor，C－17 使用既有 threshold Modal。
7. C 的左側 BN list 正式啟用 01～17；`ArrowUp`／`ArrowDown` 共用 A/B/D 既有 selection contract，首尾維持 non-wrap。

## 6. C－01～14 實作與驗證狀態

| 範圍 | 正式狀態 | 倒數需求 | 驗證 |
|---|---|---|---|
| C－01～12 | 已實作於 C wrappers | `E15` 完整字串，`0天`～`9天` | Jamie launcher／current contract Manual PASS |
| C－13～14 | 已實作於 Skinny C wrappers | `E15` 完整字串，`0天`～`9天` | Jamie launcher／current contract Manual PASS |

C－14 最終鎖定值為：font `14pt "ShopeeNotoSans Bold"`、color `#ff4c45`、Canvas rotation `-2.1°`、center `(268.5,71.5)`、uniform scale `1.0`。此組值為 Jamie 人工驗證後的最終值。

## 7. C－15～17 Shared Reuse 決策

### 7.1 正式產品行為

1. C－15／16／17 與目前 A/B/D 正式行為相同。
2. 不增加 C-specific 倒數天數。
3. 不建立 C-specific wrapper、倒數 geometry、額外 state、Import mapping、Editor control 或 JSON 欄位。
4. shared reuse 已由 `78d7718` 正式落地：C－15→`renderAr()`、C－16→`renderSubArea()`、C－17→`renderThresholdTable()`。
5. C－15 沿用 `bnText["15"]` 與 `C!L24/L25`；C－16 沿用 `bnText["16"]` 與 `C!L26/L27/O26/O27`。
6. C－17 沿用 `threshold`、`parseThresholdModel()` 與既有 threshold Modal；資料來源為 `I29`、`I32:M33`、`H35:M52`、`I53:I55`。

### 7.2 C－15／16 asset dependency evidence

- `bn/assets/C/底圖/15_AR.jpg` 與 A/B/D 對應檔 byte-identical，SHA-256 為 `d5098b9dfea1e53e3c60a406f5ffd9e3f04291dbbfc51ac8f1217dfb8de9a136`。
- `bn/assets/C/底圖/16_副區.jpg` 與 A/B/D 對應檔 byte-identical，SHA-256 為 `12902843ca43ffc7f1c89669514afa8477675406f96dab4f9b8819f11ba9506e`。
- C－15／16 runtime 分別使用 canonical A `15_AR.jpg`／`16_副區.jpg`。
- 因正式產品行為鎖定為 shared reuse，且 canonical copies byte-identical，這兩個 C copies 不構成 C-specific runtime dependency。
- 兩檔目前保留為 untracked evidence；本次 Documentation Update 不移動、不刪除、不修改，也不將此判斷擴張為 asset cleanup 授權。

### 7.3 C－17 asset dependency evidence

- `bn/assets/C/底圖/17_VIP.png`：PNG RGBA，`1180×185`，SHA-256 `34df2ee85c09e691a25de31a7f5595833b98c9e01697a7234cb52a845512ba2c`。
- `bn/assets/C/底圖/17_主標題.png`：PNG RGBA，`1180×83`，SHA-256 `ecf17ed1b9841fd62dd1535bb0573148361ddbc0cd22ed914457b8d38ac32bac`。
- 兩檔與 A/B 對應檔 byte-identical；C runtime 使用 canonical A copies，對這兩個 C copies 的 runtime reference 數為零。
- A－17 正式行為由 `bn/templates/A/17-threshold-table.js` 的 `renderThresholdTable()` 提供；D－17 已有 canonical-A reuse precedent。
- 正式分類：`NOT REQUIRED BY C17 RUNTIME`。
- 兩檔目前保留為 untracked evidence；本次 Documentation Update 不移動、不刪除、不修改。

## 8. Runtime 狀態與已落地邊界

| 範圍 | Requirement 決策 | Current runtime 狀態 |
|---|---|---|
| C－01～14 | C-specific countdown | `0c9da10` 已實作、已人工 PASS |
| C－15～17 | shared reuse、無倒數 | `78d7718` 已啟用 routing／Import／Restore／Preview／Editor boundary／JSON／Export，Jamie Phase 6 PASS |

已落地實作遵守以下邊界：

- 不得建立倒數欄位或 C-specific geometry。
- 不得以 routing 工作為由重構 A/B/D。
- 不得把目前保留的 C copies 誤寫為已被 runtime 使用。
- C－15／16 使用 canonical A `15_AR.jpg`／`16_副區.jpg`；C－17 使用 canonical A `17_主標題.png`／`17_VIP.png`。
- Export 仍使用統一 `renderBnToCanvas()` 與17項 `EXPORT_ITEMS`；format、quality、72 DPI、capacity 與 filename contract 未變。
- A／B／C／D 的 `12_LPBN`均只Preview／Export單一base `12_LPBN.jpg`，不生成badge variants；dormant module／assets仍保留。
- Keyboard fix 僅刪除舊 `if (state.currentType === "C") return;`，沒有新增 C-specific handler 或 keyboard array。

## 9. 非目標

本文件不授權：

- C－01～14 geometry 返工或 pixel tuning。
- A/B/D renderer 重構。
- D 返工或歷史問題處理。
- asset cleanup、搬移或刪除。
- schema version 變更或 registry architecture 重設計。
- Stage／Commit／Push／Tag／Release。

## 10. Acceptance Summary

- C－01～14：正式需求、程式實作與 Jamie launcher Manual PASS 一致，Code Commit 為 `0c9da10`。
- C－15～17：shared reuse 已由 `78d7718` 正式落地，不增加倒數，Jamie Phase 6 Manual Verification PASS。
- C－15／16 C copies：不是 C-specific runtime dependency，保持未修改。
- C－17 兩張 C copies：`NOT REQUIRED BY C17 RUNTIME`，保持未修改。
- 本次 Documentation Update 僅同步文件，不建立 Docs Commit。
