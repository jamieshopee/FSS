# FSS BN－A／B／C／D－17_門檻表 Multiline Threshold Name Amendment v1.0

> **Status：CURRENT／FORMAL SUPERSEDING AMENDMENT**
>
> Authority：Jamie-approved `17_門檻表` Modal UX adjustment
>
> Effective implementation：Code Commit `cb7a00a9fd82139e5e4af064850f37babdddb8cb`
>
> Validation gate：Jamie Manual Validation PASS
>
> 記錄日期：2026-10-09

---

## 1. 文件目的與效力

本文件是 FSS BN A／B／C／D 共用 `17_門檻表` Modal 的窄範圍正式 superseding amendment，記錄「門檻項目／門檻名稱」允許使用者以 Enter 輸入換行後的 current contract。

本 Amendment 只 supersede 既有正式文件中，與「`17_門檻表` Modal 的門檻名稱只能使用單行輸入控制項或不得手動輸入換行」直接衝突的敘述或解讀。既有 Locked 文件保留為歷史規格與完成紀錄，不直接修改；除本文件明列的 Modal 輸入 UX 外，其他 Locked decisions、renderer contract、已完成 Phase 與平台行為繼續有效。

若既有文件與本 Amendment 在上述窄範圍內衝突，以本 Amendment 為 current authority。本 Amendment 不宣告任何整份 Requirement、Architecture 或 Type integration specification 失效。

---

## 2. Scope 與 Current UX Rule

本 Amendment 精確適用於 A／B／C／D 共用的 `17_門檻表`「編輯門檻表」Modal，且只調整最左側的「門檻項目／門檻名稱」輸入控制項：

- 門檻名稱由單行 HTML `input` 改為 multiline HTML `textarea`。
- 使用者可在 textarea 內以原生 Enter 行為插入 literal LF（`\n`）。
- textarea 保存原始 newline；不得在 commit 前移除、替換或正規化該 LF。
- 不新增 Enter keyboard handler；Enter 行為由 textarea 原生處理。
- 不新增字數限制、行數限制或 textarea 自動增高行為。

本 Amendment 不適用於其他 16 個 BN 版位，也不把其他 Modal 欄位改為 multiline。

---

## 3. Data Update Contract

門檻名稱 textarea 沿用既有即時更新流程：

`input event` → `commitThreshold()` → existing Workspace threshold state → Workspace notify → Preview

textarea 的 `value`（包含 literal LF）直接寫入既有 `threshold.thresholds[*].name`。不新增 Apply／Save／Cancel、draft state、第二份 threshold model 或 newline-specific state。

A／B／C／D 繼續共用同一套 Modal 與 threshold Workspace model；本次不建立 Type-specific Editor、Modal 或 schema。

---

## 4. Existing Renderer Contract（未修改）

下列能力在本 Amendment 生效前已由正式 A－17 renderer 規格與實作提供；它們不是本次新增的 renderer 功能：

- literal `\n` 強制斷行；
- 每個 literal-LF segment 內依 153px 可用文字寬，以實際 `measureText()` 寬度進行既有 greedy auto-wrap；
- visual lines 使用 30px baseline pitch；
- `rowHeight = 70 + (lineCount − 1) × 30`，每增加一個 visual line，該列高度增加 30px；
- 同列右側金額 cell 高度跟隨同一個動態 threshold row rectangle；
- `↑` 合併格沿用既有動態 row rectangles 與 12px row gaps 計算完整 merged geometry；
- Canvas width 維持 1200px，總高度依既有 `canvasHeight = 290 + middleHeight` 動態增加。

本次 Code Commit 未修改 `bn/templates/A/17-threshold-table.js`，沒有改變 wrap、measurement、row-height、merge、positioning、typography、color、warnings 或 fit behavior。

---

## 5. Preview／Export Contract

Preview 與 Export 繼續使用既有同一套 `17_門檻表` renderer 與相同 Workspace threshold state。門檻名稱中的 literal LF、visual-line 計算、動態列高、右側金額格高度、`↑` merged geometry 與 Canvas 總高度，必須在 Preview 與 Export 中保持一致。

本 Amendment 不建立第二套 Export rendering、不修改 Export pipeline，也不新增 Export-only newline handling。

---

## 6. Explicit Non-Changes

本 Amendment 不改變：

- 物流名稱 line1／line2：仍使用既有單行 `input`；
- 金額：仍使用既有單行 `input`；
- 綠／紅顏色 mapping；
- `↑` 指令、merge 規則與 invalid-`↑` behavior；
- threshold 固定 `logistics[5]`／`thresholds[9]` schema capacity；
- Excel mapping 與 Excel Import behavior；
- Workspace schema；
- JSON format 與 version（維持 version `1`）；
- JSON Save／Restore architecture；
- A－17 renderer 與 canonical assets；
- A／B／C／D 的 `renderThresholdTable()` reuse topology；
- Preview renderer 與 Export pipeline；
- Modal 的新增、刪除、compact、數量顯示與 layout structure；
- IME、banwords、character counting、rollback 或其他 Editor behavior；
- 其他 16 個 BN 版位；
- 任何 CSS、HTML、asset、font、Locked specification 或已完成 Phase。

本 Amendment 不建立 textarea 自動增高規格，也不授權重構門檻表系統。

---

## 7. Implementation Record

- Code Commit：`cb7a00a9fd82139e5e4af064850f37babdddb8cb`
- Short Hash：`cb7a00a`
- Commit Message：`feat(bn): support multiline threshold names`
- Parent：`ae066f4d88594aa27f16ec7e70d6fc272d89688b`
- Runtime scope：`M bn/js/app.js`
- Diff stat：`1 file changed, 11 insertions(+), 1 deletion(-)`

實作新增門檻名稱專用的 `makeThresholdNameTextarea()`，並只在 `buildThresholdRow()` 的門檻名稱欄位使用；既有共用 `makeThresholdTextInput()`、物流名稱 input 與金額 input 均未修改。textarea 沿用既有 `input` listener 與 `commitThreshold()` data flow，沒有新增 Enter handler。

---

## 8. Validation Record

- A－17 Enter newline：PASS
- B－17 Enter newline：PASS
- C－17 Enter newline：PASS
- D－17 Enter newline：PASS
- 各 Type Canvas height：`670px → 700px`（新增一個 visual line，精確增加 30px）
- Preview：PASS
- Export：PASS
- Excel Import regression：PASS
- JSON Save／Restore：PASS
- Browser console errors：0
- Jamie Manual Validation：PASS（最終人工驗證 gate）
- `git diff --check`：PASS

驗證使用 textarea 內的實際 Enter 輸入，不是直接設定含 `\n` 的測試字串。文件只記錄已完成的驗證，不延伸宣稱未執行項目為 PASS。

---

## 9. Superseded Statements

### 9.1 `FSS_BN_A樣式平台整合_Requirement_Specification_v1.0.md`

本 Amendment 只更新 §25.2／§26.5 中「門檻列 name 輸入」的 current control-type contract：門檻名稱目前為支援原生 Enter 與 literal LF 的 multiline textarea。§25.5 的既有即時 Workspace／Preview data flow、不新增字數限制與不新增 validation 等規格繼續有效。

### 9.2 `FSS_BN_B樣式平台整合_Requirement_Specification_v1.0.md` 與 `FSS_BN_Architecture.md`

B－17 繼續完整沿用 A－17 的 threshold schema、renderer、geometry、Manual Editor、Preview 與 Export。既有「Modal 本身零修改」是 B 平台整合當時的歷史完成狀態；自本 Amendment 生效後，A／B 共用 Modal 的門檻名稱 current control-type 依第 2 節更新。此項不建立 B-specific Editor 或 renderer。

### 9.3 C／D 平台整合規格

C－17 與 D－17 既有「沿用 shared／existing threshold Modal」的 routing 與 reuse 決策不被 supersede；其所沿用的 current shared Modal 自本 Amendment 生效後包含第 2 節的 multiline threshold-name behavior。不得據此建立 C-specific 或 D-specific Modal／renderer。

### 9.4 Renderer 正式規格

`FSS_BN_Template_Requirement_Specification_v1.0.md` §5.1.17.5 與 `FSS_BN_Architecture.md` §35 已記錄 literal `\n`、153px auto-wrap、30px pitch 與動態 row height；這些敘述不與本 Amendment 衝突，因此不被 supersede，並繼續作為 renderer current authority。

本 Amendment 只 supersede 任何將 `17_門檻表` Modal 門檻名稱限制為單行輸入的直接衝突敘述或解讀，不改寫原文件歷史內容，也不取代整份 Requirement 或 Architecture。

---

## 10. Governance Boundary

- 本文件不修改、刪除或重寫任何既有 Locked 文件內容。
- 本文件不回溯改寫 A－17 原始完成 Phase、B／C／D integration Phase 或歷史 PASS 紀錄。
- 本文件只成為 A／B／C／D 共用 `17_門檻表` Modal 之門檻名稱 multiline input UX 的 current authority。
- 後續若要修改 renderer、geometry、row-height algorithm、merge、schema、Excel mapping、其他 Modal 欄位、其他版位或 textarea layout behavior，必須另行取得 Jamie 明確決策；不得由本 Amendment 推導授權。
