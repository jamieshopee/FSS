# FSS BN－03／04／10／11 Shared CTA Amendment v1.0

> **Status：CURRENT／FORMAL SUPERSEDING AMENDMENT**
> **Authority：Jamie-approved 03／04／10／11 Shared CTA specification adjustment**
> **Effective implementation：`cac2b353bd6c66c30f1d056791fd4a9ccd9ec199`**
> **Validation gate：Jamie Manual Validation PASS**
> **Record date：2026-09-17**

---

## 1. 文件目的與效力

本文件是 FSS BN 的窄範圍正式 superseding amendment，記錄 A／B／C／D 樣式之 03、04、10、11 版位新增 Shared CTA 後的 current contract。

本 Amendment 僅取代既有正式文件中與下列事項直接衝突的敘述：

- 03／04／10／11 的 shared CTA 欄位、Editor、Excel Import、Workspace／JSON contract；
- 上述四個版位的 CTA text renderer contract；
- 將上述四個版位的 CTA 文字描述為固定底圖內容的舊敘述。

本 Amendment 不宣告任何既有 Requirement、Architecture、Type integration requirement 或已完成 Phase 整份失效。未被本文件明確取代的 Locked decisions 與正式規格繼續有效。

---

## 2. Scope 與 Shared CTA State

本 Amendment 僅適用於 A／B／C／D 樣式的以下四個 BN 版位：

- 03 Coin page BN
- 04 Loyalty BN
- 10 POP UP
- 11 Line OA

正式 runtime key 為 `cta`；Workspace state 為 `workspace.shared.cta`；default 為空字串 `""`。

CTA 是 03／04／10／11 共用欄位。Editor 僅在上述四個版位顯示 CTA Editor；其他版位不得因本 Amendment 新增 CTA Editor 或 CTA rendering。

---

## 3. Text Validation Contract

CTA 上限為 **3 existing units**，沿用現有 FSS BN Editor 的字數計算：

- ASCII：0.5 unit
- non-ASCII：1 unit

範例：

- `逛逛去` = 3 units
- `ABC123` = 3 units

CTA 沿用既有 IME-safe、banwords、rollback 與 inline error contract。超過 3 units 時沿用既有 rollback 行為；不得新增 Chinese-only validator，banwords 仍依既有規則運作。

---

## 4. Visual Contract

所有 A／B／C／D CTA 共用以下 typography 與 alignment contract：

- Font：ShopeeNotoSans(content)-Regular
- Color：`#007661`
- Horizontal alignment：actual-ink centered
- Vertical alignment：actual-ink centered
- 無 padding compensation
- 無 manual offset
- 無 letter spacing
- 無 shrink
- 無 wrap
- 無 multiline
- 無 magic compensation

四個版位的正式 rectangle 與字級如下：

| BN | Canvas rectangle `(x, y, w, h)` | Photoshop reference `(left, top, width, height)` | Font size |
|---|---:|---:|---:|
| 03 Coin page BN | `(1066, 349, 85, 27)` | `(2090, 750, 85, 27)` | 22pt |
| 04 Loyalty BN | `(609, 177, 60, 19)` | `(1633, 1010, 60, 19)` | 16pt |
| 10 POP UP | `(212, 650, 125, 39)` | `(5352, 650, 125, 39)` | 32pt |
| 11 Line OA | `(430, 959, 148, 47)` | `(5570, 1751, 148, 47)` | 38pt |

A／B／C／D 的同一版位使用相同 CTA rectangle、font、font size 與 color。

---

## 5. Type／Renderer Contract

- **A**：03／04／10／11 是 canonical CTA rendering implementation。
- **B**：繼續完整 reuse A；不得建立 B 專屬 CTA renderer。
- **C**：03／04／10／11 wrapper 將 CTA 傳給 A renderer，並保留既有 countdown rendering；CTA 不得改變 C countdown contract。
- **D**：D03、D10 的 independent renderer 實作相同 CTA contract；D04、D11 繼續 reuse A renderer。CTA 不得改變 D 原有 Logo contract。

這是既有 renderer topology 內的窄範圍功能增加，不是 architecture refactor。

---

## 6. Excel Import Contract

### 6.1 A／B／D

- CTA label cell：`D15`
- Exact label：`3.4.10.11 CTA (限3中文字)`
- CTA value cell：`E15`
- `E15:F15` 若為 merged range，讀取其 top-left cell `E15`

### 6.2 C

- `E15` 繼續保留既有 countdown
- CTA label cell：`D16`
- CTA value cell：`E16`

Import 不呼叫 banwords。合法 blank CTA 會清空 CTA；其他既有 Excel mapping 不因本 Amendment 改變。

---

## 7. Workspace／JSON Contract

- JSON format 維持 `FSS BN Workspace`
- JSON version 維持 `1`，不得升為 version 2
- `workspace.shared` 新增 `cta`
- `cta` default 為 `""`
- 舊 version 1 JSON 若缺少 CTA，`cta` 必須 deterministic default 為 `""`
- JSON 若包含 CTA，其值必須為 string，且不得超過 3 existing units
- 格式正確的舊 version 1 Workspace 不得因缺少 CTA 而載入失敗

---

## 8. Background Asset Contract Change

03／04／10／11 的 **CTA 文字**現在由 renderer 動態繪製。既有正式文件若將 10／11 CTA，或上述四個版位的 CTA 文字，描述為固定於底圖／background baked-in content，該描述僅在本 Amendment 的四個版位與 CTA text 範圍內被取代。

本次動態化僅限 CTA text。本 Amendment 不宣稱整個 CTA button、CTA graphic、arrow 或 background 改由 renderer 動態生成；例如 03 的 CTA button base／arrow 仍可屬於背景 asset。

---

## 9. Explicit Non-Changes

本 Amendment 不改變：

- 03／04／10／11 以外的 BN Editor 與 renderer contract；
- 既有主標、副標、保護文字欄位與其限制；
- banwords engine、IME handling、字數計算方式、rollback 與 inline error architecture；
- C countdown 的資料位置、rendering、geometry 與既有行為；
- D03／D10 Logo contract；
- Preview／Export architecture；
- A／B／C／D 的既有 renderer reuse topology，除本文件明列的 CTA parameter passing 與 drawing 外；
- Workspace schema format name 與 JSON version；
- 其他既有 Excel mapping；
- Import 不呼叫 banwords 的既有 contract；
- 任何非本文件明列的 asset、renderer、版位或已完成 Phase 規格。

---

## 10. Implementation Record

- Code Commit：`cac2b353bd6c66c30f1d056791fd4a9ccd9ec199`
- Short Hash：`cac2b35`
- Commit Message：`feat(bn): add shared CTA to 03 04 10 11`
- Parent：`796c3369bc99a6f677e4061550f56f8e776c1c18`
- Commit Stat：13 files changed, 287 insertions(+), 19 deletions(-)

Runtime scope：

- `bn/js/workspace.js`
- `bn/js/editor.js`
- `bn/js/import.js`
- `bn/templates/A/03-coin-page-bn.js`
- `bn/templates/A/04-loyalty-bn.js`
- `bn/templates/A/10-pop-up.js`
- `bn/templates/A/11-line-oa.js`
- `bn/templates/C/03-coin-page-bn.js`
- `bn/templates/C/04-loyalty-bn.js`
- `bn/templates/C/10-pop-up.js`
- `bn/templates/C/11-line-oa.js`
- `bn/templates/D/03-coin-page-bn.js`
- `bn/templates/D/10-pop-up.js`

---

## 11. Validation Record

Jamie Manual Validation 是本次變更的最終人工驗證 gate，結果如下：

| Type | 03 | 04 | 10 | 11 |
|---|---|---|---|---|
| A | PASS | PASS | PASS | PASS |
| B | PASS | PASS | PASS | PASS |
| C | PASS | PASS | PASS | PASS |
| D | PASS | PASS | PASS | PASS |

- 16／16 target Preview：PASS
- Excel Import：PASS
- Export：PASS
- C countdown regression：PASS
- D03／D10 Logo regression：PASS

先前自動化階段未可靠驗證的項目，不因上述人工驗證結果而被改寫為 automated PASS；本文件不主張未實際完成的 automated verification。

---

## 12. Superseded Statements

本 Amendment 僅 supersede 下列正式文件中與本文件 current contract 直接衝突的部分：

1. `FSS_BN_Requirement_Specification_v1.0.md`
   - 01～12 僅有主標／副標／保護文字三個 shared fields 的定義，在 03／04／10／11 範圍內增加本文件定義的 shared CTA。
2. `FSS_BN_A樣式平台整合_Requirement_Specification_v1.0.md`
   - 01～12 shared fields、Editor、Excel mapping、Workspace／JSON shared shape 中排除 CTA 的舊定義，僅於 03／04／10／11 範圍內由本文件更新。
3. `FSS_BN_B樣式平台整合_Requirement_Specification_v1.0.md`
   - B 01～12 僅沿用三個 shared text fields 與舊 Excel mapping 的敘述，僅於 03／04／10／11 範圍內增加 shared CTA；B reuse A 的架構保持有效。
4. `FSS_BN_C樣式平台整合_Requirement_Specification_v1.0.md`
   - C01～12 僅有主標／副標／保護文字及 countdown 的舊欄位、Excel、Workspace／JSON 與 wrapper parameter contract，僅於 03／04／10／11 範圍內增加 CTA；既有 countdown contract 保持有效。
5. `FSS_BN_D樣式平台整合_Requirement_Specification_v1.0.md`
   - D01～12 僅有三個 shared text fields 的 Editor／Excel 定義，以及未傳遞或繪製 CTA 的 D renderer/reuse 敘述，僅於 03／04／10／11 範圍內由本文件更新；既有 Group A／Group B topology 與 Logo contract 保持有效。
6. `FSS_BN_Template_Requirement_Specification_v1.0.md`
   - A10／A11 將 `逛逛去 ▶` CTA 文字視為固定底圖內容、不是第四欄位或 runtime layer 的敘述，僅就 CTA text 由本文件取代。
7. `FSS_BN_Architecture.md`
   - A10／A11 將 CTA 文字視為固定 background content、renderer 不重繪 CTA 的敘述；以及舊 shared Workspace／JSON／Excel shape 未包含 CTA 的敘述，僅於本文件明列範圍內被取代。

上述 supersession 不改寫原文件的歷史內容，也不取代整份文件。各文件中未與本 Amendment 直接衝突的條款繼續有效。

---

## 13. Governance Boundary

若既有 FSS BN 正式文件與本 Amendment 在 A／B／C／D 的 03／04／10／11 Shared CTA 範圍內衝突，以本 Amendment 為 current authority。

本 Amendment 未明確變更的既有規格繼續有效；不得將本 Amendment 擴張適用至其他版位、其他欄位、其他 renderer 行為或其他已完成 Phase。
