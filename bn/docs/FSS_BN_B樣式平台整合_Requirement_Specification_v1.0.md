# FSS BN Generator－B 樣式平台整合 Requirement Specification v1.0

> 階段：Phase 1－Requirement Specification
>
> 開發範圍：FSS BN 樣式 B 的正式平台整合（Excel Import → Workspace → 正式 renderer → Preview → Restore → Export）
>
> 狀態：**Requirement 已裁決且已實作完成**。Phase 0～6 全部 PASS，已由 Code Commit `4f9fb723930a907b8c3956fd084e757b41302137`（`feat(bn): add style B platform integration`）正式落地。落地與驗證記錄見第 27 節。
>
> 整理日期：2026-08-23（Phase 1 建立）
>
> Phase 1 基準 HEAD：`7e157bdaaa42aa5be1977449d3ff86c3921bbaa0`（`fix(bn): align selected BN name underscore spacing`）
>
> 正式落地 Code Commit：`4f9fb723930a907b8c3956fd084e757b41302137`（parent `7e157bdaaa42aa5be1977449d3ff86c3921bbaa0`）

---

## 1. 文件目的與本輪 Scope

本文件依已結案的 B 樣式 Phase 0（Jamie／GPT 正式裁決）與已完成的正式工單最小唯讀實證，定義「FSS BN－B 樣式平台整合」的產品需求與完成標準，供 Phase 3 Proposal 使用。

本輪 Scope 為：讓使用者在既有 BN 控制台中，於選擇樣式 B 後，完成「匯入正式工單 Excel 的 `B` worksheet → 自動建立完整 B 工作內容 → 以既有 01～17 正式 renderer 搭配 B 專用底圖呈現 Preview → 必要文字微調 → 匯入暫存還原 → 下載完整專案」的完整正式流程。

本文件只定義產品需求，**不指定實作方式**。下列正式文件為上位基準，本文件不修改、不取代、不同步：

- `docs/開發流程.md`
- `docs/架構說明.md`（Locked Architecture Contract）
- `bn/docs/FSS_BN_Architecture.md`
- `bn/docs/FSS_BN_Requirement_Specification_v1.0.md`
- `bn/docs/FSS_BN_Template_Requirement_Specification_v1.0.md`
- `bn/docs/FSS_BN_17版位_Type差異_Phase0整理.md`
- `bn/docs/FSS_BN_A樣式平台整合_Requirement_Specification_v1.0.md`
- `bn/docs/FSS_BN_A12_LPBN掛標_Requirement_Specification_v1.0.md`
- `bn/docs/FSS_BN_正式版位建立_SOP.md`

本文件採 **「A baseline ＋ B delta」** 表述方式。凡 B 完整沿用 A 的 typography、geometry、版位視覺細節，一律以引用既有正式 A Requirement 表達，**不複製 17 份完整視覺規格表**。

---

## 2. 前置已完成狀態

- A－01～17 正式 Template 已完成，經 AI 自驗與 Jamie 手動驗證 PASS。
- A 樣式平台整合（Import／Workspace／Preview／Restore／Export）已完成並 PASS。
- A－12 LPBN 掛標 variants 已完成並 PASS。
- B 的 17 個版位所需正式底圖已由 Jamie 放入 `bn/assets/B/底圖/`（實際 18 個檔案，因 17 使用 `17_主標題.png` 與 `17_VIP.png` 兩張）。這些 assets 目前為 untracked，屬 `bn/docs/FSS_BN_正式版位建立_SOP.md` 第 22 節所述的正常狀態。
- B 樣式 Phase 2 Technical Investigation 已完成（見第 23 節）。
- 正式工單 Excel `B` worksheet 的結構／validation／cell mapping 最小唯讀實證已完成並 PASS（見第 9～13 節）。

---

## 3. 非目標／Scope Boundary

本輪不得：

- 修改或重新設計任何既有 01～17 正式 renderer 的視覺規格、geometry、typography 或 renderer 行為。
- 為 B 建立另一套 renderer。
- 為 B 建立 B-specific Template。
- 為 B 建立 B-specific 對位圖。
- 為 B 建立 `bn/launch/B/`。
- 為 B 建立 B-specific Editor。
- 為 B 建立 B-specific Workspace schema。
- 為 B 新增任何 B-specific 文字欄位。
- 為 B 建立另一套 Import mapping。
- 為 B 建立另一套 badge assets 或任何通用 Badge System。
- 為 B－17 建立另一套 threshold schema。
- 重新設計既有 Workspace、Editor、Manual Editor、Preview、Export、compression 策略或 ZIP／JSON 命名規則。
- 修改正式工單 Excel 的內容、label 或 validation。
- 處理樣式 C／D（見第 21 節）。
- 因「未來可能共用」而預先建立任何抽象層、預留介面或跨 Type 通用系統。
- 在本 Requirement 決定任何 implementation（見第 23 節）。

---

## 4. B 樣式核心定義

- 樣式 B（內部 Type B）是同一個 FSS BN Generator 內部的 Type，**不是第二個 Generator、不是第二套控制台、不是第二套流程**。
- **B 不是另一套 renderer behavior。** B－01～17 與 A－01～17 **一一對應**，對應關係為固定 17 個版位的同名同編號對應。
- A 與 B 的 rendering behavior 相同。
- **A／B 的版型差異只有一項：各自使用自己的 background assets。** 除此之外沒有其他產品層級的版型差異。
- 使用者介面顯示「樣式」，系統內部維持 Type 與 `currentType` 概念。

---

## 5. A／B background asset source

| Type | 正式 background asset 目錄 |
|---|---|
| A | `bn/assets/A/底圖/` |
| B | `bn/assets/B/底圖/` |

- 目前工作樣式為 A 時，01～17 的 background 必須全部取自 `bn/assets/A/底圖/`。
- 目前工作樣式為 B 時，01～17 的 background 必須全部取自 `bn/assets/B/底圖/`。
- 系統不得在任一 Type 下混用另一 Type 的 background，也不得在找不到對應素材時 fallback 至另一 Type 的目錄。
- 本節只定義 A 與 B 兩個 Type 的 background source。C／D 不在本輪範圍。

---

## 6. B 正式底圖清單與素材狀態

B 的 17 個版位所需正式底圖已全部放置於 `bn/assets/B/底圖/`，共 18 個檔案：

| 版位 | B 正式底圖檔名 |
|---|---|
| 01 | `01_DDcard BN.jpg` |
| 02 | `02_MALL HBN.jpg` |
| 03 | `03_Coin page BN.jpg` |
| 04 | `04_Loyalty BN.png` |
| 05 | `05_MSBN.png` |
| 06 | `06_IG.jpg` |
| 07 | `07_FB POST.jpg` |
| 08 | `08_SPX TVBN_1.jpg` |
| 09 | `09_SPX TVBN_2.jpg` |
| 10 | `10_POP UP.png` |
| 11 | `11_Line OA.png` |
| 12 | `12_LPBN.jpg` |
| 13 | `13_Skinny BN_APP.png` |
| 14 | `14_Skinny BN_PC.png` |
| 15 | `15_AR.jpg` |
| 16 | `16_副區.jpg` |
| 17 | `17_主標題.png` 與 `17_VIP.png`（同一版位使用兩張） |

檔名與 `bn/assets/A/底圖/` 逐字相同，差異只在所屬 Type 目錄。

**B－15、B－16、B－17 的正式底圖／asset 與 A 對應素材完全相同，是正確的正式狀態。**

- 這不是漏放。
- 這不是暫存。
- 這不是錯誤。
- 後續任何階段不得再要求 Jamie 確認此事。
- 不得因為 byte-identical 而修改、刪除、替換、重新命名或移動這些 assets。
- 不得因此為 B－15／16／17 建立任何「共用素材」的特殊處理或例外規則；它們在 Requirement 上與其他 B 版位完全一致，只是 B 的正式素材內容恰好與 A 相同。

---

## 7. B－01～17 沿用 A 的 rendering／typography／geometry

除 background asset source 外，B－01～17 **完整沿用** A－01～17 的既有正式 Requirement：

- Canvas dimensions
- 文字位置
- 字型
- 字級
- 顏色
- 特殊 formatting
- layout
- geometry
- headline 規則
- subheadline 規則
- protectionText 規則
- 01～12 shared text 行為
- 13～16 各自獨立文字資料結構
- Editor 行為
- Preview 行為
- Export 行為
- Export formats
- 既有容量限制／compression 行為

上述各版位的完整正式視覺規格（字型、字級、顏色、文字框座標、對齊方式、特殊符號、字數限制等）以 `bn/docs/FSS_BN_Template_Requirement_Specification_v1.0.md` 第 5.1 節對應版位為準，**以引用方式生效**。

- 本文件不重述、不複製、不改寫上述任何規格。
- 若未來 A 的某版位視覺規格經正式程序變更，B 對應版位自動沿用變更後的規格；B 不維護第二份視覺規格。
- B 不新增 B-specific 文字欄位、不新增 B-specific Editor、不新增 B-specific renderer Requirement。

---

## 8. Type 與 Excel worksheet 的對應

- 使用者必須先在平台選擇樣式，再於控制台匯入正式工單 Excel。
- **Type A → Import 使用 worksheet `A`。**
- **Type B → Import 使用 worksheet `B`。**
- Import 必須依目前工作 Type 自動選擇對應 worksheet；不得要求使用者再次選擇 worksheet。
- 目前工作樣式為 B 時，Import **不得** 改讀 `A` worksheet，**不得** fallback 至「第一個 worksheet」或任何其他 worksheet。反之，目前工作樣式為 A 時，亦不得改讀 `B`。
- 若 workbook 無法解析、目前 Type 對應的 worksheet 不存在、或必要資料不足以建立完整 Workspace，Import 必須失敗，且不得破壞目前 Workspace。Import 的成功／失敗／Atomic 原則沿用 `bn/docs/FSS_BN_A樣式平台整合_Requirement_Specification_v1.0.md` 第 9 節既有正式行為，本文件不重新設計。
- **本節只定義 A 與 B。C／D worksheet 的 Import 行為目前不定義。**

---

## 9. A／B 共用 cell mapping 與 validation schema

正式 Requirement：**B 沿用 A 的全部 cell mapping 與 validation schema，只依目前 Type 選擇 worksheet source。**

- A／B worksheet 的資料結構相同。
- A／B worksheet 的 cell mapping 相同。
- A／B worksheet 的欄位語意相同。
- A／B worksheet 的 validation schema 相同。
- **B 不建立另一套 Import mapping。**

正式工單最小唯讀實證已 PASS 的 validation anchors：

| Cell | worksheet `A` 正式 label | worksheet `B` 正式 label | 判定 |
|---|---|---|---|
| `A15` | `主標 (限8字內)` | `主標 (限8字內)` | 逐字相同 |
| `A16` | `副標 (限7字內)` | `副標 (限7字內)` | 逐字相同 |
| `A17` | `保護文字 (限17字內)` | `保護文字 (限17字內)` | 逐字相同 |

上述 anchors 為判定「是否為正式工單」的既有 validation 依據，A／B 共用同一組期望值與同一組 cell address。

> 兩個 worksheet 的實際填入文案可以不同，這是正常的資料差異，不構成 mapping 或 schema 差異。判定依據一律為「同一種資料是否位於相同 cell address、必要 validation anchor 是否相同、結構是否一致」。

---

## 10. 01～12 shared text

B－01～12 沿用 A 的 shared text 行為與資料語意，資料來源為 worksheet `B` 的相同 cell address：

| 欄位 | Cell（A／B 相同） |
|---|---|
| headline | `B15` |
| subheadline | `B16` |
| protectionText | `B17` |

- 這三個欄位為 01～12 共用；於任一版位編輯後，其餘版位必須同步反映，行為與 A 相同。
- headline／subheadline／protectionText 的字數限制、IME 保護、banwords 檢查等既有規則完全沿用 A，不因 B 而變更。

---

## 11. 13～16 各自獨立文字資料

B－13～16 沿用 A 的獨立文字資料結構，資料來源為 worksheet `B` 的相同 cell address：

| 版位 | 欄位 | Cell（A／B 相同） |
|---|---|---|
| 13 | line1 / line2 | `L20` / `L21` |
| 14 | line1 / line2 | `L22` / `L23` |
| 15 | line1 / line2 | `L24` / `L25` |
| 16 | leftTitle | `L26` |
| 16 | leftCopy | `L27` |
| 16 | rightTitle | `O26` |
| 16 | rightCopy | `O27` |

- 13～16 的文字互相獨立，且不屬於 01～12 shared text，行為與 A 相同。
- B 不新增、不移除、不重新編排任何 13～16 欄位。

---

## 12. B－12 LPBN 掛標

B－12 的 LPBN 掛標 Requirement 與 A－12 **完全相同**，唯一差異為 base background 與月份資料來源的 worksheet。

**基本規格**

- Canvas 1200 × 550
- 正式輸出格式 JPG
- 72 dpi
- 目前無 byte limit
- Base background：`bn/assets/B/底圖/12_LPBN.jpg`

**掛標月份資料來源**

- worksheet `B`，label 位於 `D15`，value 位於 `E15`（`E15:F15` merged）。
- 正式工單實證已 PASS：worksheet `A` 與 worksheet `B` 的 `D15` label 皆為 `LPBN 掛標月份`，逐字相同；月份 value 位置皆為 `E15`；merged range 皆為 `E15:F15`。
- 該值為 B－12 專用 optional 資料，**不屬於** 01～12 shared 文字，不得併入 shared 資料語意，也不得影響任何其他版位。
- 正式月份為 **9／10／11／12**。

**輸出行為**

- `E15` 空白時，B－12 只產出 base：`12_LPBN.jpg`，不產生任何 variant，不顯示任何掛標相關錯誤或警告。
- `E15` 為完整合法月份時，B－12 產出 base ＋ 三張 variants：
  - `12_LPBN.jpg`
  - `12_LPBN_1.jpg`
  - `12_LPBN_2.jpg`
  - `12_LPBN_3.jpg`

**掛標素材**

- 掛標 overlay assets **共用既有** `bn/assets/LPBN掛標/`，依月份群組分組。
- **B 不建立另一套 badge assets。**
- **B 不建立新的 Badge System、Variant Framework 或跨 Type 掛標抽象層。**
- B 的掛標 composition behavior 與 A－12 相同：base 永遠保留且不被 overlay 修改，每個實際可用 slot 各自產生獨立輸出，slot 編號沿用既有正式順位。
- 掛標素材缺失時的降級行為、Preview 與 Export 的 variant 判定一致性要求，沿用 `bn/docs/FSS_BN_A12_LPBN掛標_Requirement_Specification_v1.0.md` 既有正式 Requirement，本文件不重新設計。

---

## 13. B－17 threshold 與 Manual Editor

B－17 **完整沿用** A－17 Requirement。資料來源改為 worksheet `B`，但 cell mapping 與 schema 與 A 完全相同。

**正式工單實證已 PASS 的 mapping（A／B 相同）**

| 區塊 | Cell／區域 |
|---|---|
| 主標題 | `I29` |
| 物流欄 | `I32:M33`（欄 I／J／K／L／M，第 32、33 列） |
| 門檻列 | 9 組；起始列 35；名稱列為 35／37／39／41／43／45／47／49／51 |
| 門檻列名稱 | `H{名稱列}` |
| 門檻列色彩／合併標示 | `I:M{名稱列}` |
| 門檻列金額 | `I:M{名稱列＋1}` |
| VIP 標題 | `I53` |
| VIP 文案 | `I54` |
| VIP CTA | `I55` |

**沿用範圍**

- threshold 資料結構相同。
- renderer geometry 相同。
- 主標區 geometry 相同。
- 物流／門檻表 geometry 相同。
- VIP 區 geometry 相同。
- Manual Editor 行為相同。
- Preview 行為相同。
- Export 行為相同。
- PNG 規格相同。

**邊界**

- **A－17 Manual Editor 為 LOCKED。** B 的加入不得重新設計 Manual Editor 的任何行為、UI、資料流或編輯語意。
- **不得建立另一套 threshold schema。** B－17 與 A－17 使用同一個 threshold 資料結構與同一組固定 schema 尺寸。
- B－17 選中且已匯入工單資料時，Manual Editor 必須可用，行為與 A－17 完全一致。
- B－17 的兩張 background（`17_主標題.png`、`17_VIP.png`）取自 `bn/assets/B/底圖/`，其餘視覺規格沿用 `bn/docs/FSS_BN_Template_Requirement_Specification_v1.0.md` 第 5.1.17 節。

---

## 14. Workspace 與 `currentType` Requirement

- **不重新設計 Workspace。** 既有 Workspace 大方向維持不變：`currentType`、`selectedBnId`、`shared`、`bnText`、`threshold`、`lpbnBadgeMonth`。
- **B 不新增 B-specific Workspace schema**、不新增 B-specific 欄位。
- `currentType` 必須能正確表示 B，並在整個工作流程中**正確保留 Type 身分**。
- 使用者選擇樣式 B 後，`currentType` 必須維持為 B，直到使用者主動重設工作區域、重新選擇樣式，或以 Restore 載入指定其他 Type 的暫存檔為止。
- **任何流程都不得將 B 靜默改回 A。** 具體而言，匯入工單 Excel、切換版位、文字編輯、Manual Editor 編輯、Preview 重繪與 Export 均不得改變目前 Type 身分。
- Workspace 內既有的資料語意（shared 與 bnText 的分工、threshold 子樹、lpbnBadgeMonth 的 optional 語意）在 B 下與 A 完全相同。

---

## 15. 暫存 JSON 與 Restore Requirement

**Type 身分持久化**

- 暫存 JSON 的 `type` 是**完整 Workspace snapshot 的一部分**。
- A 的 Workspace／JSON：`type` = A。
- B 的 Workspace／JSON：`type` = B。
- 匯出暫存時，必須寫入當下 Workspace 實際的 Type，不得寫成固定值。

**Restore 行為**

- Restore 成功後，Workspace 必須依 **JSON 自己的 `type`** 完整恢復。
- 目前工作區是 B，Restore 一份 A 的 JSON：成功後 Workspace Type = A。
- 目前工作區是 A，Restore 一份 B 的 JSON：成功後 Workspace Type = B。
- 使用者目前正在 A 或 B，**不影響** Restore JSON 自己指定的 Type。

**支援範圍**

- 目前正式 Restore 支援的 Type 為 **A** 與 **B**。
- **不得因為 UI 已有 C／D 按鈕，就提前接受或定義 C／D 的 Restore 行為。**
- Restore 的 Atomic 行為、覆蓋確認、驗證失敗處理沿用既有正式 Requirement，本文件不重新設計。

---

## 16. Editor 與 Preview Requirement

- **B 不新增 B-specific Editor。** 右側 Editor 的欄位組成、字數限制、IME 保護、banwords 檢查、即時同步行為在 B 下與 A 完全相同。
- Editor → Workspace → Preview 的即時同步行為與 A 相同。
- 選擇樣式 B 後，左側 17 個版位清單、鍵盤／滑鼠切換行為與 A 相同。
- Preview 必須以既有正式 renderer 呈現，並使用 B 的 background assets（第 5 節）。Preview 與 Export 必須同源，不得建立第二套視覺輸出。
- B－12 選中且掛標月份為合法完整月份時，Preview 必須同時呈現 base 與實際可用的掛標 variants，行為與 A－12 相同。
- B－17 未匯入工單資料時的空狀態提示行為與 A－17 相同。

---

## 17. Export formats

B 對應版位沿用 A 的正式 Export formats：

| 版位 | 正式輸出格式 |
|---|---|
| 01 | JPG |
| 02 | JPG |
| 03 | JPG |
| 04 | PNG |
| 05 | PNG |
| 06 | JPG |
| 07 | JPG |
| 08 | JPG |
| 09 | JPG |
| 10 | PNG |
| 11 | PNG |
| 12 | JPG |
| 13 | PNG |
| 14 | PNG |
| 15 | JPG |
| 16 | JPG |
| 17 | PNG |

- 不得為 B 自行改變任何版位的輸出格式。
- 各版位的 pixel dimensions 與 72 dpi 要求沿用 A 既有正式規格。
- B－17 仍以動態實際高度輸出。
- B－12 的掛標 variants 沿用第 12 節定義的檔名與格式。

---

## 18. LOCKED 容量限制與 compression 行為

以下既有正式行為為 **LOCKED**，B 沿用對應 A 版位的正式行為，且不得因 B 的加入重新設計：

| 版位 | LOCKED 正式行為 |
|---|---|
| `01_DDcard BN` | JPG；最終檔案 ≤ 245,000 bytes |
| `02_MALL HBN` | JPG；最終檔案 ≤ 145,000 bytes |
| `10_POP UP` | PNG；580 × 720；最終檔案 ≤ 250,000 bytes；native lossless → UPNG 256-color → fail |
| `12_LPBN` | 1200 × 550；JPG；72 dpi；目前沒有 byte limit |

- **不得重新設計 compression 策略**、不得調整既有 quality 搜尋範圍或 ladder 順序。
- 不得為 B 新增任何既有 A 沒有的 capacity requirement。
- 不得為 B－12 新增 byte limit、quality retry 或 compression fallback。
- 容量判定基準沿用既有正式規則（以最終寫出的 bytes 為準）。

---

## 19. ZIP／JSON 命名

- ZIP 與暫存 JSON 的命名規則**本輪不修改**，沿用既有正式規則：
  - `FSS BN_MMDD.zip`
  - `FSS BN_MMDD.json`
- `MMDD` 取實際執行下載當下的月日；ZIP 與其內含 JSON 共用同一個日期。
- ZIP 內部結構沿用既有正式規則（根層放置 17 張成品與 1 份暫存 JSON，無資料夾、無 manifest，成品檔名為正式版位名稱）。
- 即使同一天先後匯出 A 與 B 可能產生同名檔案，**這不是本輪需求，不得擴大處理**，不得因此新增 Type 標記、序號、資料夾層級或任何命名變更。

---

## 20. A Regression Boundary

**B 的加入不得造成 A regression。** 以下已正式完成並 PASS 的 A－01～17 行為必須完全保持：

- rendering
- geometry
- typography
- Editor
- Manual Editor
- Import mapping
- Preview
- Export
- 容量控制
- LPBN 掛標正式行為

具體要求：

- A 選定後的 background 必須仍全部取自 `bn/assets/A/底圖/`。
- A 的 Import 必須仍使用 worksheet `A`，validation anchors 與 cell mapping 不變。
- A 的暫存 JSON 必須仍以 `type` = A 匯出，並可正常 Restore。
- A－12 的掛標 base／variants 輸出與檔名不變。
- A－17 Manual Editor 的所有既有行為不變。
- A 的 01／02／10 容量控制與 12 的無 byte limit 狀態不變。
- 既有 01～17 renderer 的視覺輸出必須與 B 加入前逐版位一致。

---

## 21. C／D Out of Scope

樣式 C／D **完全不在本輪 scope**：

- 不研究 C／D。
- 不為 C／D 建立 Requirement。
- 不為 C／D 定義 Import 行為或 worksheet 對應。
- 不為 C／D 定義 Restore 行為。
- 不為 C／D 定義 assets resolution。
- 不因 UI 已存在 C／D 選擇入口，就在本 Requirement 中提前寫入任何 C／D 規格。
- 不因「未來可能共用」而建立通用系統、抽象層或預留介面。

C／D 需各自完成正式 Phase 0 裁決後，才可進入其 Requirement 階段。

---

## 22. Acceptance Criteria

Phase 4 Coding 完成後，須逐項驗收：

1. 於樣式選擇頁選擇 B，可進入 BN 控制台，且介面顯示目前樣式為 B。
2. 選擇 B 後匯入正式工單 Excel，系統自動讀取 worksheet `B`，不要求使用者選擇 worksheet。
3. 選擇 B 時 Import 不讀 `A` worksheet，也不 fallback 至任何其他 worksheet；選擇 A 時同理不讀 `B`。
4. worksheet `B` 的 `A15`／`A16`／`A17` validation anchors 依既有期望值通過驗證；anchor 不符時 Import 失敗且不破壞目前 Workspace。
5. B 的 01～12 shared text 取自 `B15`／`B16`／`B17`，並於 01～12 之間正確同步。
6. B 的 13～16 獨立文字取自 `L20`～`L27`、`O26`、`O27`，各自獨立且不併入 shared。
7. B－01～17 的 Preview 全部使用 `bn/assets/B/底圖/` 的對應素材，無任一版位取用 A 素材。
8. B－01～17 的 Preview 視覺（文字位置、字型、字級、顏色、特殊 formatting、layout、geometry）與 A 對應版位規則一致，差異僅來自 background。
9. B－12 在 `E15` 空白時只產出 `12_LPBN.jpg`，無任何掛標相關錯誤或警告。
10. B－12 在 `E15` 為完整合法月份（9／10／11／12）時，產出 `12_LPBN.jpg` 與 `12_LPBN_1/2/3.jpg`，掛標素材取自既有 `bn/assets/LPBN掛標/`。
11. B－12 的 base 輸出不被 overlay 修改；Preview 與 Export 的 variant 判定一致。
12. B－17 由 worksheet `B` 的 `I29`、`I32:M33`、門檻列 9 組、`I53`～`I55` 正確建立 threshold；Preview 與 A－17 行為一致。
13. B－17 選中且有資料時，Manual Editor 可用且行為與 A－17 完全相同；未因 B 新增第二套 threshold schema。
14. B 的 Workspace 在匯入、切換版位、文字編輯、Manual Editor 編輯、Preview、Export 全流程中，`currentType` 始終維持 B，不被靜默改回 A。
15. B 匯出的暫存 JSON `type` = B；A 匯出的暫存 JSON `type` = A。
16. 目前工作區為 B 時 Restore A JSON，成功後 Workspace Type = A；目前工作區為 A 時 Restore B JSON，成功後 Workspace Type = B。
17. Restore 目前只接受 A 與 B；未提前接受 C／D。
18. B 的下載完整專案可由同一 Workspace 產出 01～17 全部成品，格式符合第 17 節；成品與 Preview 同源。
19. B 的 `01_DDcard BN` ≤ 245,000 bytes、`02_MALL HBN` ≤ 145,000 bytes、`10_POP UP` PNG 580 × 720 ≤ 250,000 bytes 且遵循既有 ladder；`12_LPBN` 維持 1200 × 550／JPG／72 dpi 且無 byte limit。
20. ZIP 與暫存 JSON 命名維持 `FSS BN_MMDD.zip` 與 `FSS BN_MMDD.json`，內部結構不變。
21. A－01～17 的 rendering、geometry、typography、Editor、Manual Editor、Import mapping、Preview、Export、容量控制、LPBN 掛標行為全部零回歸。
22. 未為 B 建立第二套 renderer、第二套 Template、B-specific 對位圖、`bn/launch/B/`、B-specific Editor、B-specific Workspace schema、另一套 Import mapping、另一套 badge assets 或任何通用 Badge System。
23. 未處理 C／D，未建立任何跨 Type 抽象架構。

---

## 23. Phase 2 技術證據的承接邊界

B 樣式的 Phase 2 Technical Investigation 已完成，其結論可由後續階段直接承接，**不得重做**。已確認之技術事實摘要如下（僅為承接記錄，不構成 Requirement）：

- 既有 17 個 renderer 本身沒有 Type gate。
- renderer 使用 caller 注入的 `HTMLImageElement`。
- renderer 本身不直接讀取 A asset path。
- background path 的 A 耦合集中於現有 asset resolution 邊界。
- B 的 18 個正式 assets 尺寸／格式符合對應 A renderer 的既有 assertion。
- B－12 的 badge resolver／composition 本身 Type-neutral。
- B－17 的 renderer／threshold model 本身 Type-neutral。
- 目前存在若干 A-only Type gates，將留到 Phase 3 Proposal 處理。

**Phase 1 邊界聲明**：以上屬 Phase 2 技術證據。本 Requirement 文件**不得**、也未將任何 Phase 3 implementation solution 寫成 Requirement。本文件不規定應如何修改任何函式、不規定應建立何種 lookup table、不規定應如何 parameterize、不規定應如何處理 asset base 常數、不規定應如何變更 function signature、不規定應修改哪些程式行、不規定應建立何種 abstraction。所有實作方式一律由 Phase 3 Proposal 提出並經 Jamie 確認。

---

## 24. 尚未裁決事項

截至本文件建立時，B 樣式 Phase 1 的產品 Requirement 已完整裁決，無阻擋 Phase 3 的未決項目。

以下為僅供記錄的一項待確認細節，**不阻擋 Phase 3**，本文件不自行裁決：

1. **Import 失敗訊息中的 worksheet 指稱方式。** 既有 A 的 Import 失敗訊息文案是以現行 runtime 文案落地並經 Jamie 接受。B 加入後，同一組訊息會同時服務兩個 worksheet。訊息文案是否需要指出實際使用的 worksheet（例如區分 A 與 B），屬產品文案決策，需 Jamie 裁決。既有「必須可理解、不得默默失敗」的原則不變。

若後續發現其他 Requirement 缺口，一律只回報，不得自行裁決，亦不得修改本文件已裁決之 Requirement 來配合。

> （落地註記）上述第 1 項已由 Jamie 裁決並落地：Import 失敗訊息必須與實際 Type／worksheet 一致、不得誤導；Type A 的三則既有 Excel Import 訊息在 Type A 下維持與落地前逐字相同，Type B 則正確顯示 B。實作記錄見第 27 節。本節其餘內容維持 Phase 1 原始記錄。

---

## 25. Phase 狀態與後續流程

FSS BN Generator 固定流程不得自行更改。B 樣式目前狀態：

| Phase | 狀態 |
|---|---|
| Phase 0－需求與差異裁決 | **PASS** |
| Phase 1－Requirement | **PASS**（本文件） |
| Phase 2－Technical Investigation | **PASS**（見第 23 節） |
| Phase 3－Proposal | **PASS** |
| Phase 4－Coding | **PASS** |
| Phase 5－AI Verification | **PASS** |
| Phase 6－Jamie 手動驗證 | **PASS** |
| Code Commit | **PASS**：`4f9fb723930a907b8c3956fd084e757b41302137` |
| Documentation Update | 進行中（本節與第 27 節即本階段產物） |
| Docs Commit | 尚未進行；需另行取得明確指令 |

明確狀態聲明：

- B 樣式**已正式落地**，正式行為記錄見第 27 節。
- `bn/assets/B/底圖/` 的 18 個正式 assets 已於 Code Commit `4f9fb723930a907b8c3956fd084e757b41302137` 正式納入版控。
- Jamie 已完成 B 樣式的 Phase 6 手動驗證並 PASS。
- 目前正式支援的樣式為 **A 與 B**；C／D 仍未進入正式支援範圍（見第 21 節）。

> （原始 Phase 1 記錄）本節在 Phase 1 建立時記載「B 尚未落地、18 個 assets 仍為 untracked、Jamie 尚未進行 Phase 6」，屬當時真實狀態；上表與上列聲明為 Code Commit 後的 Documentation Update 結果，取代該過渡描述。第 1～24 節之 Requirement 與 Acceptance Criteria 一律維持 Phase 1 原文，未因落地而改寫。

---

## 26. 修改邊界

- 本文件為 Phase 1 產物。本階段只允許建立與修訂本 Requirement 文件，不得修改任何 Code、HTML、CSS、JS、JSON、Excel、Template、asset、font、Launch、Viewer、Workspace、Editor、SOP 或其他既有正式文件。
- 本文件不修改、不取代、不同步第 1 節所列任何上位文件；既有文件中因 B 進入 Requirement 階段而可能過時的敘述，屬後續 Documentation Update 範圍，本輪不處理。
- 後續只可在 Phase 3 Proposal 經 Jamie 確認後，修改完成本 Requirement 所必要的最小檔案。
- 若 Phase 3／4 發現本 Requirement 與既有 LOCKED 架構或已 PASS 行為衝突，必須停止並交由 Jamie 裁決，不得自行調整已裁決 Requirement。

---

## 27. 實際落地狀態（Code Commit `4f9fb723930a907b8c3956fd084e757b41302137`）

> 本節記錄本 Requirement 已全部實作完成、通過 Phase 5 AI Verification 與 Phase 6 Jamie 手動驗證，並以單一 Code Commit `4f9fb723930a907b8c3956fd084e757b41302137`（`feat(bn): add style B platform integration`，parent `7e157bdaaa42aa5be1977449d3ff86c3921bbaa0`）正式提交的最終行為。以下均為已驗證事實，取代第 25 節原本「尚未落地」之過渡描述；**產品規則本身不變**，第 1～24 節之 Requirement 與 Acceptance Criteria 維持 Phase 1 原文。

### 27.1 Commit 範圍

- 4 個 JS：`bn/js/render-a.js`、`bn/js/import.js`、`bn/js/export.js`、`bn/js/app.js`。
- 18 個正式 B assets：`bn/assets/B/底圖/` 全部檔案（01～16 各一張、17 為 `17_主標題.png` 與 `17_VIP.png`）。
- 合計 22 個檔案（4 個 modified、18 個 added）；`git diff --check HEAD^ HEAD` PASS。
- **零修改**：`bn/templates/A/*.js`（17 檔）、`bn/js/lpbn-badges.js`、`bn/js/workspace.js`、`bn/js/editor.js`、`bn/js/banwords*.js`、`bn/index.html`、`bn/css/`、`bn/js/vendor/*`、`bn/assets/A/*`、`bn/assets/LPBN掛標/*`、`bn/launch/*`、正式工單 Excel。
- 未新增任何程式檔、未新增任何 dependency、未建立 B renderer、B template、B template registry、generic renderer framework、generic Badge System 或任何跨 Type 抽象層。

### 27.2 Background asset resolution

`bn/js/render-a.js` 仍為實際的正式 renderer integration 檔案，並沿用既有 17 個 A renderer/template definitions 與既有 registry（17 筆 entry 只存檔名、零修改）。背景 base 改為依 `currentType` 解析：

- Type A → `../assets/A/底圖/`
- Type B → `../assets/B/底圖/`
- 非 A／B → **fail clearly**，不 fallback 至 A 或 B。

17 的 `17_主標題.png` 與 `17_VIP.png` 同樣依 `currentType` 自對應 Type 目錄取得。image cache 沿用既有機制（key 為解析後完整 URL，A／B 天然不碰撞）。檔名 `render-a.js` 現同時服務 A 與 B，**未 rename**；命名不屬功能問題。

### 27.3 Excel Import

- Type A → worksheet `A`；Type B → worksheet `B`；**無 fallback**，不取「第一個 worksheet」。
- 樣式驗證發生於 worksheet lookup **之前**：非正式支援的樣式一律明確失敗，不因正式工單內實際存在其他 worksheet 而被接受。
- A／B 共用同一組 validation anchors（`A15`／`A16`／`A17`）、同一組 cell mapping、同一套 validation schema；**未建立第二套 mapping**。
- Import 成功後保留實際 `currentType`（Type B 匯入後仍為 B，不被靜默改回 A）。
- Import 失敗訊息反映實際 Type／worksheet；Type A 的三則既有訊息在 Type A 下與落地前**逐字相同**（`工單 Excel 沒有 A 工作表。`／`A 工作表 {address} 必須為「{expected}」，無法確認為正式 A 工單。`／`A 工作表 17_門檻表 工單資料不完整：至少需要一個物流欄與一個門檻列。`）。未建立新的 Error System 或錯誤分類架構。
- Import 失敗維持既有 Atomic 語意：失敗時目前 Workspace 完全不變。

### 27.4 Workspace 與 Restore

- Workspace schema **未因 B 重新設計**，維持既有 `currentType`／`selectedBnId`／`shared`／`bnText`／`threshold`／`lpbnBadgeMonth`；未新增任何 B-specific 欄位或 schema。
- 暫存 JSON：A workspace → `type: "A"`；B workspace → `type: "B"`。
- Restore 正式接受 A 與 B，並依 JSON 自己的 `type` 完整恢復（目前 B 匯入 A JSON → Type 變 A；目前 A 匯入 B JSON → Type 變 B），不需使用者先手動切換樣式。
- 其他值一律 reject 且 Workspace 不被替換。

### 27.5 B－12 LPBN 掛標

- B－12 已正式支援與 A－12 相同的掛標流程。base 為 `bn/assets/B/底圖/12_LPBN.jpg`，掛標月份取自 B worksheet `E15`，正式月份 9／10／11／12。
- `E15` 空白 → 只輸出 `12_LPBN.jpg`；`E15` 為完整合法月份 → 輸出 `12_LPBN.jpg` 與 `12_LPBN_1.jpg`／`12_LPBN_2.jpg`／`12_LPBN_3.jpg`。
- overlay assets 仍共用既有 `bn/assets/LPBN掛標/<月份>/`；**未建立 B-specific badge assets、未建立 B badge registry、未建立通用 Badge System**。
- `bn/js/lpbn-badges.js` 於本次 Code Commit **零修改**；B－12 完全沿用既有 chain。
- A／B 的掛標 variants 均為 JPG、1200 × 550、72 dpi；`12_LPBN` 目前沒有 byte limit。

### 27.6 B－17 門檻表

- B－17 完整沿用 A－17 的 threshold schema、renderer、geometry、Manual Editor、Preview 與 Export；**未建立 B-specific threshold schema、未建立 B－17 renderer、未建立 B-specific Editor**。
- B worksheet 使用與 A 相同的 threshold mapping（主標 `I29`、物流 `I32:M33`、9 組門檻列起始列 35、VIP `I53`／`I54`／`I55`）。
- 「編輯門檻表」Manual Editor 對 A 與 B 皆可用；A－17 Manual Editor 為 LOCKED，未重新設計，Modal 本身零修改。

### 27.7 Export

- A／B 的正式 Export formats 相同：01 JPG、02 JPG、03 JPG、04 PNG、05 PNG、06 JPG、07 JPG、08 JPG、09 JPG、10 PNG、11 PNG、12 JPG、13 PNG、14 PNG、15 JPG、16 JPG、17 PNG。
- 72 dpi 行為維持；ZIP 為 `FSS BN_MMDD.zip`、暫存 JSON 為 `FSS BN_MMDD.json`，ZIP 內部結構與命名規則未變。
- LOCKED 容量與 compression 行為未因 B 改動：`01_DDcard BN` ≤245,000 bytes、`02_MALL HBN` ≤145,000 bytes、`10_POP UP` PNG 580 × 720 ≤250,000 bytes（native lossless → UPNG 256-color → fail）、`12_LPBN` 1200 × 550 JPG 72 dpi 且無 byte limit。既有 compression ladder 維持，未重新設計。

### 27.8 C／D 邊界

C／D 仍未進入正式支援範圍。落地後的行為為：Import 在 worksheet lookup 前明確 reject（不讀取工單內的 C／D worksheet）、Preview 明確失敗且不顯示 A 或 B 背景、Export 因 render 階段即失敗而不產出任何成品、`type` 為 C／D 的暫存 JSON 一律 reject。UI 的樣式卡片未修改，**未為 C／D 建立任何 mapping、resolver、Requirement 或功能**。

### 27.9 Verification 記錄

- **Phase 5 AI Verification：PASS**（Combined）。由 Claude 的 static／parser／data-flow evidence、Codex 的 Browser Verification，以及 Jamie 對 A－04 的實機確認共同構成。
- **Phase 6 Jamie 手動驗證：PASS。**
- 已驗證 PASS 的項目：A／B Preview 01～17；A／B 的 17 Manual Editor；A／B 的 12 LPBN（A `E15`=9、B `E15`=10 皆為 base ＋ 3 variants）；A／B Export；A 暫存 JSON `type`=A、B 暫存 JSON `type`=B；17 版位 Export formats；輸出 dimensions；72 dpi；LOCKED capacity；C 的 Export fail-clear；Repository Integrity。
- A regression：A 的 rendering、geometry、typography、Editor、Manual Editor、Import mapping、Preview、Export、容量控制與 LPBN 掛標行為均確認無回歸。
