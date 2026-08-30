# FSS BN Generator－C 樣式平台整合 Requirement Specification v1.0

> 狀態：C 樣式完整產品需求已 LOCKED
>
> Implementation baseline：C－01～14 已完成正式實作，並經 Jamie 逐版 launcher 人工驗證 PASS
>
> Code Commit：`0c9da10472ba3128ea90b64d2340ac8b178d4514`（`feat(bn): integrate C style 01-14`）
>
> C－15～17：shared reuse decision 已 LOCKED；截至 `0c9da10` 尚未啟用 C routing

## 1. 文件目的與適用範圍

本文件定義 C 樣式 C－01～17 的正式產品需求與目前 repository 落地狀態。C－01～14 為在既有 A/B 文字行為上增加倒數天數的版位；C－15～17 沿用目前 A/B/D 的正式 shared 行為，不增加 C-specific 倒數欄位。

本文件取代先前只涵蓋 C－01 或單版位 Phase 文件的狹義範圍。各版歷史量測、候選值與人工調整紀錄保留在共享 Proposal，惟最終狀態以本文件及 `0c9da10` 的正式實作為準。

## 2. C－01～14 共通 USER LOCKED 需求

1. 主標、副標、保護文字的位置、字型樣式、字型大小、顏色與各版正式 A/B 行為相同。
2. 每個版位額外增加「倒數天數」，位置與 geometry 依版位個別鎖定。
3. 倒數來源固定為工單 C Sheet 的 `E16`。
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

正式工單的既有 mapping 沿用目前 A/B Import 規則；C Sheet 額外以 `E16` 提供完整倒數字串。

### 3.2 C－13～14

C－13～14 沿用 Skinny banner 的既有兩行文字模型：

- `line1`：第一行
- `line2`：第二行

倒數來源同樣固定為 C Sheet `E16`，並以同一完整字串 validation 規則處理。

### 3.3 C－12 既有欄位證據

C－12 沿用既有 LPBN 掛標機制；LPBN month source 為 `C!E15`，倒數天數 source 為 `C!E16`。兩者是不同欄位、不同責任，不得互相替代、混用或推導。

### 3.4 C－13／14 Import mapping

- C－13 的 `line1`／`line2` 精確讀取 `C!L20`／`C!L21`。
- C－14 的 `line1`／`line2` 精確讀取 `C!L22`／`C!L23`。
- 兩版倒數仍只讀取 `C!E16`，不從 Skinny 文字 cells 推導。

## 4. Workspace／Import／Restore／JSON

1. Workspace 必須承載目前選取的 Type 與 C－01～14 倒數完整字串，使 Preview、Editor、Restore 與 Export 讀取相同狀態。
2. Import 依目前選取 Type 選擇對應 Excel Sheet；Type C 必須選擇 Sheet `C`。
3. Import 只接受 `0天`～`9天`，不得將數字、空值或其他格式自動正規化為合法值。
4. Restore 必須在既有 allow-list／validation 邊界內保存 C 倒數欄位；非法值不得繞過 Import validation。
5. JSON 維持目前 schema/version 契約，保存 Type、版位既有文字與倒數完整字串。此需求不授權另開 schema version 或建立 C-only JSON 格式。
6. C－15～17 不新增倒數 state、Import mapping、Restore 欄位或 JSON 欄位。

## 5. Editor／Preview／Export

1. C－01～14 Editor 顯示倒數天數控制項，僅允許 `0天`～`9天`，變更後更新相同 workspace state。
2. C－01～14 Preview renderer 讀取該 state 並套用對應版位 wrapper 的正式 geometry。
3. Export 取得目前 Type、版位 renderer 與 type-specific asset base，輸出結果必須與 Preview 使用相同 renderer/state 契約。
4. C－01～14 的正式 wrapper 與 launcher 已納入 `0c9da10`；launcher 只作人工驗證入口，不是獨立資料來源。
5. C－01～14 的正式底圖與對位圖亦已納入同一 Code Commit；對位圖只供人工驗證，不進入正式輸出。
6. C－15～17 未啟用 C routing 前，不得宣稱已可從 C workspace 正式 Preview／Export。

## 6. C－01～14 實作與驗證狀態

| 範圍 | 正式狀態 | 倒數需求 | 驗證 |
|---|---|---|---|
| C－01～12 | 已實作於 C wrappers | `E16` 完整字串，`0天`～`9天` | Jamie launcher Manual PASS |
| C－13～14 | 已實作於 Skinny C wrappers | `E16` 完整字串，`0天`～`9天` | Jamie launcher Manual PASS |

C－14 最終鎖定值為：font `14pt "ShopeeNotoSans Bold"`、color `#ff4c45`、Canvas rotation `-2.1°`、center `(268.5,71.5)`、uniform scale `1.0`。此組值為 Jamie 人工驗證後的最終值。

## 7. C－15～17 Shared Reuse 決策

### 7.1 正式產品行為

1. C－15／16／17 與目前 A/B/D 正式行為相同。
2. 不增加 C-specific 倒數天數。
3. 不建立 C-specific wrapper、倒數 geometry、額外 state、Import mapping、Editor control 或 JSON 欄位。
4. shared reuse decision 已 LOCKED；具體 C routing 尚未落地，仍是後續 implementation item。
5. 本文件只記錄需求與 repository evidence，不以文件文字假裝 routing 已完成。

### 7.2 C－15／16 asset dependency evidence

- `bn/assets/C/底圖/15_AR.jpg` 與 A/B/D 對應檔 byte-identical，SHA-256 為 `d5098b9dfea1e53e3c60a406f5ffd9e3f04291dbbfc51ac8f1217dfb8de9a136`。
- `bn/assets/C/底圖/16_副區.jpg` 與 A/B/D 對應檔 byte-identical，SHA-256 為 `12902843ca43ffc7f1c89669514afa8477675406f96dab4f9b8819f11ba9506e`。
- 因正式產品行為鎖定為 shared reuse，且 canonical copies byte-identical，這兩個 C copies 不構成 C-specific runtime dependency。
- 兩檔目前保留為 untracked evidence；本次 Documentation Update 不移動、不刪除、不修改，也不將此判斷擴張為 asset cleanup 授權。

### 7.3 C－17 asset dependency evidence

- `bn/assets/C/底圖/17_VIP.png`：PNG RGBA，`1180×185`，SHA-256 `34df2ee85c09e691a25de31a7f5595833b98c9e01697a7234cb52a845512ba2c`。
- `bn/assets/C/底圖/17_主標題.png`：PNG RGBA，`1180×83`，SHA-256 `ecf17ed1b9841fd62dd1535bb0573148361ddbc0cd22ed914457b8d38ac32bac`。
- 兩檔與 A/B 對應檔 byte-identical；目前 C runtime reference 數為零。
- A－17 正式行為由 `bn/templates/A/17-threshold-table.js` 的 `renderThresholdTable()` 提供；D－17 已有 canonical-A reuse precedent。
- 正式分類：`NOT REQUIRED BY C17 RUNTIME`。
- 兩檔目前保留為 untracked evidence；本次 Documentation Update 不移動、不刪除、不修改。

## 8. Runtime 狀態與後續邊界

| 範圍 | Requirement 決策 | `0c9da10` runtime 狀態 |
|---|---|---|
| C－01～14 | C-specific countdown | 已實作、已人工 PASS、已進 Code Commit |
| C－15～17 | shared reuse、無倒數 | 決策已 LOCKED；C routing 尚未啟用 |

後續若實作 C－15～17 routing，必須遵守以下邊界：

- 不得建立倒數欄位或 C-specific geometry。
- 不得以 routing 工作為由重構 A/B/D。
- 不得把目前保留的 C copies 誤寫為已被 runtime 使用。
- 不得在沒有程式證據時宣稱 Preview／Editor／Export 已完成支援。

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
- C－15～17：shared reuse decision 已 LOCKED，不增加倒數；routing 尚待後續實作。
- C－15／16 C copies：不是 C-specific runtime dependency，保持未修改。
- C－17 兩張 C copies：`NOT REQUIRED BY C17 RUNTIME`，保持未修改。
- 本次 Documentation Update 僅同步文件，不建立 Docs Commit。
