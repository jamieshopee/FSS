# FSS BN－週一～週六禁用語排除 Amendment v1.0

> **Status：CURRENT／FORMAL SUPERSEDING AMENDMENT**
>
> Authority：Jamie-approved banwords data-rule adjustment
>
> Effective implementation：Data Commit `100819c15d6258c4ec2f7cab1a0808ac4e862c25`
>
> Validation gate：Jamie Manual Validation PASS
>
> 記錄日期：2026-09-17

---

## 1. 文件目的與效力

本文件是 FSS BN「週一～週六」禁用語排除的窄範圍正式 superseding amendment，記錄已批准、已實作且已通過 Jamie Manual Validation 的六項 exclusion 資料調整。

本文件只 supersede 既有正式資料與文件中和下列兩項直接衝突的內容：

1. 「一」至「六」規則在「週一」至「週六」語境下的 exclusion policy。
2. 用來識別 current `bn/assets/banwords.xlsx` artifact 的 SHA-256。

既有 Locked 文件保留為歷史規格與完成紀錄，不直接修改。除本文件明列的六項 exclusion 與 current workbook checksum 外，所有其他 Locked specification、banwords rules、architecture decisions 與已完成 Phase 繼續有效。若既有內容與本 amendment 在上述窄範圍內衝突，以本 amendment 為 current authority；不衝突內容仍以原正式文件及 source-of-truth workbook 為準。

---

## 2. Scope 與 Current Rule

本 amendment 僅在既有中文數字替換規則中新增下列 exclusion：

| 禁用語規則 | 新增 exclusion |
|---|---|
| 一 | `週一` |
| 二 | `週二` |
| 三 | `週三` |
| 四 | `週四` |
| 五 | `週五` |
| 六 | `週六` |

「一」至「六」各規則原有 exclusions 全數保留；本次只在每筆規則尾端追加對應的「週一」至「週六」。exclusion 仍依既有 occurrence-specific 行為，只保護被 exclusion phrase 涵蓋的該次 match，不放行同一字串中的其他獨立 match。

---

## 3. Expected Behavior

| 輸入 | 處理後文字 | 提示行為 |
|---|---|---|
| `週六免運日` | `週六免運日` | 不顯示「六」禁用語提示 |
| `六大好禮` | `6大好禮` | 保留既有「六」禁用語提示 |
| `週六送六件` | `週六送6件` | `週六` 中的「六」被排除；後面的獨立「六」仍替換並顯示既有提示 |

相同行為分別適用於「週一」至「週六」及其對應的「一」至「六」規則。

---

## 4. Explicit Non-Scope 與 Non-Changes

本 amendment 不新增或暗示下列 exclusion：

- `週日`
- `週天`
- `禮拜*`
- `周*`
- 任何其他未在第 2 節明列的 exclusion

下列項目全部維持既有正式規格與實作：

- 其他 60 筆 banword rules
- 所有既有 exclusions
- banwords engine
- exclusion algorithm 與 occurrence-specific 判斷
- Editor 與 rollback 行為
- IME handling
- character counting
- Workspace
- Import
- JSON Restore
- Preview
- Export
- A／B／C／D routing
- 所有 renderer
- Workspace schema

本 amendment 不建立第二套禁用語系統，不修改 engine、Editor、Workspace、Preview 或 Export architecture。

---

## 5. Source of Truth 與 Current Checksum

正式 banwords source of truth 維持：

- `bn/assets/banwords.xlsx`

Browser runtime generated data 維持：

- `bn/js/banwords-data.js`

有效規則數維持 `66`。Runtime 仍使用由正式 Excel 同步產生的資料，不直接解析 xlsx。

本 amendment 生效後，current `bn/assets/banwords.xlsx` SHA-256 為：

`9aa36581ce2def1eb8ef059bf9208de6b850395f65e184a19c47d7d2b1165b13`

既有正式文件中記錄的舊 `banwords.xlsx` SHA-256，在判斷 **current workbook artifact** 時由上述 checksum supersede。原 Locked 文件中的歷史值不修改，並繼續作為當時版本的歷史紀錄。

---

## 6. Implementation Record

- Data Commit：`100819c15d6258c4ec2f7cab1a0808ac4e862c25`
- Short hash：`100819c`
- Commit message：`fix(bn): exclude weekdays from numeral replacement`
- Parent：`70726b108af254f201967375ddbcca522fc21e2a`
- Data scope：
  - `M bn/assets/banwords.xlsx`
  - `M bn/js/banwords-data.js`

實作只在 Excel source of truth 的「一」至「六」六筆規則之排除欄追加對應「週一」至「週六」，並精確同步 runtime generated data 的同六筆 `exclude`。規則順序、keyword、replacement、message 與其餘 60 筆規則均未改變。

---

## 7. Validation Record

- Excel source verification：PASS
- Excel／runtime 66／66 equality：PASS
- Runtime functional validation：13／13 PASS
- A／B／C／D Browser Validation：PASS
- Browser console errors：0
- Jamie Manual Validation：PASS（最終人工驗證 gate）
- `git diff --check`：PASS

本節只記錄已執行並取得結果的驗證，不延伸宣稱其他未執行測試為 PASS。

---

## 8. Superseded Statements 與 Governance Boundary

### 8.1 `FSS_BN_Requirement_Specification_v1.0.md`

本 amendment 只 supersede §19.4 中用舊 SHA-256 識別 current `bn/assets/banwords.xlsx` 的敘述。該節所記錄的正式來源、66 筆有效規則、runtime generated data、engine 行為、Editor／Workspace／Preview 同步與 inline message 行為均未被 supersede。

### 8.2 `FSS_BN_Architecture.md`

本 amendment 只 supersede §18.3 中用舊 SHA-256 識別 current `bn/assets/banwords.xlsx` 的敘述。該節所記錄的 source／generated-data 關係、66 筆有效規則、runtime 不直接解析 xlsx、engine 邊界及訊息呈現方式均未被 supersede。

### 8.3 一～六規則的 exclusion policy

Data Commit parent 所代表的既有正式資料中，「一」至「六」規則尚未排除「週一」至「週六」。該窄範圍 policy 由本文件第 2 節的 current rule supersede；其他既有 exclusion 與其他 banword rules 全部繼續有效。

本 amendment 不宣稱整份 `FSS_BN_Requirement_Specification_v1.0.md` 或 `FSS_BN_Architecture.md` 已被 supersede，也不刪除、重寫或回溯改寫任何 Locked 文件、歷史 Phase completion 或 PASS record。後續若要新增其他 exclusion、修改 engine／schema／routing 或改變其他 banword rule，必須另行取得 Jamie 明確決策，不得由本 amendment 推導授權。
