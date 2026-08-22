# FSS BN — A－12／12_LPBN 掛標 Requirement Specification v1.0

**階段**：Phase 1 Requirement
**主題**：A－12（`12_LPBN`）依工單指定的 LPBN 掛標月份，在保留既有無掛標輸出的前提下，增加最多三張掛標 variants
**前置**：Phase 0 Investigation 完成、Phase 0 裁決摘要經 Jamie／GPT Review PASS
**Base HEAD**：`6dadfda162e230e1c4959b6041a2012fd2d46460`

---

## 1. 文件目的與本輪 Scope

本文件定義 A－12（`12_LPBN`）新增掛標輸出的正式產品需求與驗收標準。

本輪 Scope 僅涵蓋 **樣式 A 的 12_LPBN**。本文件描述「產品必須做到什麼」與「如何驗收」，不指定實作方式。具體的資料結構、asset discovery／registry 形狀、函式與 helper 設計、DOM 結構、CSS layout、載入時序等，一律屬 Phase 2 Investigation 確認範圍與 Phase 3 Proposal 決定範圍，本文件不寫死。

本文件不修改、不取代、不同步任何其他既有文件。Architecture、Template Requirement、A 樣式平台整合 Requirement、17 版位 Phase 0 整理等文件的更新屬後續 Documentation Update，不屬本輪。

---

## 2. 需求背景

A－12 為 `12_LPBN`，既有正式 baseline 為 **1200 × 550、JPG、72 dpi**。目前一筆工單的 A－12 只產生一張無掛標 LPBN。

新需求為：當工單指定「LPBN 掛標月份」時，**保留既有無掛標版本**，並依該月份的預製掛標素材增加最多三張掛標 variants。

掛標本身是**預先製作完成**的 1200 × 550 transparent PNG overlay，與 LPBN Canvas 完全同尺寸。程式不負責繪製掛標內容、不負責掛標文字、不負責掛標 shape、不負責計算掛標座標、不負責調整掛標尺寸。

A－12 原有的 shared 主標／副標／保護文字行為與 layout geometry 不因本需求改變。

---

## 3. 名詞定義

| 名詞 | 定義 |
|---|---|
| **LPBN 掛標月份** | 工單提供的 A－12 專用值，用以指定本次要使用的掛標素材群組。 |
| **掛標素材群組**（群組） | 對應某一個掛標月份的一組預製掛標 PNG。 |
| **base** | 既有的無掛標 12_LPBN 輸出／畫面。 |
| **掛標 variant**（variant） | 在 base 之上疊加單一掛標 overlay 後的輸出／畫面。 |
| **完整群組** | 含 3 張掛標素材的群組。 |

---

## 4. 資料來源：LPBN 掛標月份

- 正式來源為工單 **Sheet `A`**，label 位於 **`D15`**、value 位於 **`E15`**（`E15:F15` merged）。
- 該值為 **A－12 專用資料**，**不屬於** 01～12 shared 主標／副標／保護文字，不得併入 shared 資料語意，也不得影響任何其他版位。
- 該值為 **optional**：工單可以不填。
- 正式群組值為 **9／10／11／12**，與掛標素材群組直接對應。不要求工單填寫補零形式，系統亦不進行補零轉換。
- 本需求**不得**因此重新串聯、改讀或新增任何其他工單欄位。`B15`／`B16`／`B17` 的 01～12 shared 文字，以及 13～17 既有的工單對應關係，全部維持不變。

---

## 5. Optional 語意與空白行為

- **`E15` 空白時**，A－12 必須**完全維持既有行為**：只顯示、只輸出既有的無掛標 `12_LPBN`，不產生任何 variant，不顯示任何掛標相關錯誤或警告。此情境即為現行 baseline，不得有任何行為差異。
- **`E15` 有有效月份值時**，系統使用該月份對應的掛標素材群組產生 variants。

---

## 6. 掛標素材與群組

- 掛標素材位於 `bn/assets/LPBN掛標/`，依月份群組分組。目前正式群組為 **9／10／11／12**。
- 正常情況下，每個群組含 **3 張** 1200 × 550 transparent PNG。
- 掛標素材定位為 **LPBN 共用資產**。本輪功能只涵蓋 A－12；不得因該定位而在本輪實作其他 Type，亦不得建立通用 Badge System。

---

## 7. 掛標 variant 的視覺定義

- 掛標 variant 的視覺結果，必須**等同於**「既有 A－12 base 完成後，將對應的 1200 × 550 transparent PNG overlay 以完整畫布對齊方式疊加其上」。
- 疊加**不得**改變既有 shared 主標／副標／保護文字的內容、字型、位置或呈現方式。
- 疊加**不得**改變 A－12 既有 base layout geometry。
- 程式不重繪掛標內容，不對掛標素材做縮放、裁切、位移或重新著色。
- base 與所有 variant 的 shared 文字內容必須完全相同，差異僅在於是否疊加掛標 overlay、以及疊加哪一張。

---

## 8. 掛標順序與 variant 編號

- 掛標的先後順序，必須依 **掛標檔名所代表的日期先後** 決定。
- **不得**依字串排序、檔案系統回傳順序或 HTTP 回應順序決定順序。
- 日期最早者為 variant 1（suffix `_1`），次早者為 variant 2（`_2`），第三者為 variant 3（`_3`）。

目前正式素材的對應結果：

| 月份群組 | `_1` | `_2` | `_3` |
|---|---|---|---|
| 9 | `99.png` | `918.png` | `925.png` |
| 10 | `1010.png` | `1018.png` | `1025.png` |
| 11 | `1111.png` | `1118.png` | `1125.png` |
| 12 | `1212.png` | `1218.png` | `1225.png` |

---

## 9. Export 輸出與檔名

- A－12 的**無掛標正式輸出檔名維持既有規則，即 `12_LPBN.jpg`**。不得為了本需求重新命名既有 base 檔案。
- 完整群組時，三個掛標 variant 的輸出檔名為 **`12_LPBN_1.jpg`、`12_LPBN_2.jpg`、`12_LPBN_3.jpg`**，即以既有 base 名稱為基礎加上 variant suffix，並沿用 A－12 既有的 JPG 副檔名。
- 因此完整群組時，A－12 於一次輸出中共產生 **4 個檔案**：base ＋ 3 variants。
- base 與所有 variant 的成品規格一致：**1200 × 550、JPG、72 dpi**。
- 既有輸出封裝（ZIP／暫存 JSON）的整體結構不重新設計；A－12 的新增輸出沿用既有輸出結構承載。

---

## 10. Preview 產品要求

- 左側版位清單**仍只有一個 `12_LPBN`**，不因 variants 而新增版位。
- 選取 `12_LPBN` 時，中間 Preview 必須以**垂直排列**方式一起呈現 A－12 的**實際可用輸出視覺**。
- 完整群組時，Preview 由上到下依序為：**無掛標、掛標1、掛標2、掛標3**，共四張。
- `E15` 空白時，Preview 只顯示無掛標一張。
- **不得**以 tabs、切換器或任何需要使用者切換才能看到 variants 的形式作為本需求的 Preview 行為。
- Preview 呈現的 variant 順序必須與第 8 節的日期排序一致。
- Preview 必須讓使用者能辨識每一張對應的是 base 或第幾個 variant。具體標示形式屬 Proposal。

---

## 11. Editor 與版位清單

- 掛標月份**不是**控制台人工選擇的資料，一律由工單決定。
- 本輪 Editor **不新增**掛標1／掛標2／掛標3 的選擇欄位，亦不新增掛標月份的輸入欄位。
- A－12 的 Editor 欄位維持既有 01～12 shared 主標／副標／保護文字，行為不變。
- 左側版位清單維持既有 17 個版位，不因 variants 增加、拆分或重排版位。

---

## 12. Workspace／暫存 JSON 持久化

- 掛標月份必須成為 Workspace 的持久資料，並隨暫存 JSON 一併保存。
- 必須滿足完整往返：**Import 工單 → 儲存 Workspace JSON → Restore → Preview／Export**，還原後必須得到**同一個掛標月份**，並產生與 Restore 前一致的 Preview 與 Export 結果。
- **舊的 Workspace JSON 若不含掛標月份資料，必須能自然視同「掛標月份空白」**，並回到既有的無掛標 A－12 行為，不得因缺少該欄位而拒絕還原、報錯或產生不一致狀態。
- **不得**因本需求無必要地升級 Workspace JSON version。本 Requirement 不預設升版；若 Proposal 階段證明技術上確實必要，須另行回報 Jamie 裁決。
- 本文件只描述「掛標月份必須被保存」這項最小資料責任，不指定欄位名稱、資料型別表示法、存放位置或序列化方式，該等細節屬 Proposal。

---

## 13. 異常處理

本需求只定義以下兩種已裁決的異常情境，不擴充其他 validation。

### 13.1 掛標群組不存在

- **不得**讓整份工單 Import 失敗。掛標為 optional 功能，不得因其異常而阻斷其他 16 個版位的正常流程。
- A－12 的 **base Preview 與 base Export 必須保留**，行為等同無掛標情境。
- 必須向使用者顯示**清楚提示**，說明指定的掛標群組不存在。不得靜默略過。
- 提示的呈現位置與文案屬 Proposal。

### 13.2 掛標群組存在但素材少於 3 張

- **不得**整體 fail。
- 必須向使用者顯示**素材不足提示**。
- Preview 與 Export 都只處理**實際存在**的掛標 variants，加上**永遠存在的 base**。
- **不得**捏造缺少的掛標 variant，**不得**建立空白檔或佔位檔湊足三張。
- variant suffix 必須保留「**日期排序後的實際順位**」語意：suffix 綁定該素材在群組日期順序中的位置，**不得因中間缺少素材而重新壓縮編號**。例如某群組實際只存在日期順位第 1 與第 3 的素材時，輸出應為 `12_LPBN_1.jpg` 與 `12_LPBN_3.jpg`，而**不是**重新命名為 `_1` 與 `_2`。
- 「如何得知群組的日期順位定義」屬 group→assets 的判定方式，為 Proposal 範圍，本文件不指定。

---

## 14. Preview／Export 一致性

- Preview 與 Export 對「哪些 variants 可用」的判定必須**完全一致**。
- 不得出現 Preview 顯示某 variant 但 Export 未輸出、或 Export 輸出某 variant 但 Preview 未顯示的情形。
- 不得出現 Preview 與 Export 對同一 variant 使用不同 suffix 或不同素材的情形。

---

## 15. 維護性要求

- 新增月份／新增掛標群組的維護目標為 **data／content update**：新增該月份的掛標素材，並更新必要的最小 asset data／registry。
- **不應**要求每月修改 A－12 的 renderer／function logic 才能支援新月份。
- 正式產品行為**不得**依賴瀏覽器 HTTP directory autoindex 自動列舉目錄作為 asset discovery 契約。
- 具體的 group→assets discovery／registry 方式屬 Proposal，本文件不寫死。

---

## 16. 已由 Investigation 證明的架構邊界

以下為 Phase 0 Investigation 的既有事實，記錄為本需求的邊界條件，**非** implementation 指定：

- A－12 的 Preview 與 Export 共用同一條 renderer 路徑，因此第 14 節的一致性要求在既有架構下可自然成立。
- A－12 既有 base renderer 可維持不變；掛標可於既有 base render 完成後，以同尺寸 transparent PNG overlay 疊加達成，無需改寫 base 繪製邏輯。
- A－12 既有無專屬 capacity logic。
- 掛標月份不經 Editor 輸入，Editor 在技術上可維持不動。
- 掛標月份若要支援 Restore 後再次 Preview／Export，必須被納入持久資料。
- 標準瀏覽器無法可靠列舉伺服器目錄，HTTP directory autoindex 不可作為正式產品契約。

---

## 17. Acceptance Criteria

本需求完成時，以下全部必須成立。

| # | 驗收項目 | 通過條件 |
|---|---|---|
| **AC1** | `E15` 空白 | A－12 完全維持既有行為：Preview 只有一張無掛標，Export 只有 `12_LPBN.jpg`，無任何 variant、無掛標相關提示 |
| **AC2** | 完整 3 張素材 | 指定月份群組含 3 張素材時，A－12 形成 base ＋ 3 variants，共 4 個可用輸出 |
| **AC3** | Preview 四張垂直排列 | 選取 `12_LPBN` 時，中間 Preview 垂直排列由上到下為無掛標、掛標1、掛標2、掛標3，不使用 tabs／切換器 |
| **AC4** | Export 檔名 | 輸出含 `12_LPBN.jpg`、`12_LPBN_1.jpg`、`12_LPBN_2.jpg`、`12_LPBN_3.jpg`；base 檔名未被更動 |
| **AC5** | 日期排序 | variant 順序依檔名代表的日期先後；以 9 月群組驗證 `99`→`_1`、`918`→`_2`、`925`→`_3`，且不受檔案系統或 HTTP 回傳順序影響 |
| **AC6** | 群組不存在 | 工單 Import 不失敗；A－12 base Preview 與 base Export 保留；顯示清楚提示 |
| **AC7** | 群組少於 3 張 | 不整體 fail；顯示素材不足提示；Preview 與 Export 只含 base ＋ 實際存在的 variants；未捏造 variant、未建立空白檔；suffix 未被壓縮重新編號 |
| **AC8** | Preview／Export 一致 | 上述所有情境中，Preview 顯示的可用 variants 與 Export 輸出的 variants 完全一致（數量、順序、suffix、素材對應） |
| **AC9** | Save／Restore 保留 | Import 工單 → 儲存 Workspace JSON → Restore 後，掛標月份與 variants 完全還原，Preview 與 Export 結果與 Restore 前一致 |
| **AC10** | 舊 JSON 相容 | 不含掛標月份欄位的既有 Workspace JSON 可正常 Restore，並回到 base-only 行為，不報錯、不拒絕還原 |
| **AC11** | Regression：shared text 與 base geometry | 01～12 shared 主標／副標／保護文字行為未變；A－12 base layout geometry 未變；base 視覺與本需求前完全一致 |
| **AC12** | 成品規格 | base 與所有 variant 皆為 1200 × 550、JPG、72 dpi |
| **AC13** | Editor | Editor 未新增掛標1／2／3 選擇欄位，未新增掛標月份輸入欄位；A－12 Editor 欄位與行為維持既有 |
| **AC14** | 版位清單 | 左側仍為既有 17 個版位，未因 variants 增加、拆分或重排版位 |
| **AC15** | 其他版位與 LOCKED logic | 其他 A－01～11／13～17 renderer 輸出未變；01／02 JPG 容量控制、10_POP UP PNG 容量控制、A－17 Manual Editor 行為全部未受影響 |

---

## 18. LOCKED／Regression Boundary

以下項目在本需求中一律不得更動：

- `01_DDcard BN` JPG ≤ 245,000 bytes 容量控制 — 不碰。
- `02_MALL HBN` JPG ≤ 145,000 bytes 容量控制 — 不碰。
- `10_POP UP` PNG 580 × 720 ≤ 250,000 bytes，native lossless → UPNG 256-color → fail 的 ladder — 不碰。
- A－17 Manual Editor — 不碰。
- 其他 A－01～11／13～17 renderer 不因本需求修改。
- A－12 **不新增** byte limit、**不新增** quality retry、**不新增** compression fallback。
- A－12 layout geometry 不重新設計。
- 01～12 shared 主標／副標／保護文字行為不變。
- A－12 原本無掛標的 Preview／Export baseline 必須保持。
- A－12 維持 1200 × 550、JPG、72 dpi。
- 既有 ZIP／暫存 JSON 的整體架構不重新設計。

---

## 19. Out of Scope

- B／C／D 的功能實作。
- 通用 Badge System 或任何跨 Type 掛標抽象層。
- 其他版位（A－01～11／13～17）的掛標。
- 控制台其他無關功能。
- 重新設計 Excel 工單。
- 重新設計 Workspace。
- 新增任何 capacity requirement。
- 工單 `D16:F17` 的 validation 殘留。
- 與本輪無關的 Git／Release／deployment 事項。
- Proposal 級細節：具體 registry／data structure、helper 與 function 設計、DOM 結構、CSS layout、asset 載入時序與快取方式。

---

## 20. Future Consideration

掛標素材定位為 LPBN 共用資產，未來可能供其他 Type 的 LPBN 共用。

此為未來考量，**不構成本輪需求**，不得據此在本輪增加抽象層、預留介面或實作其他 Type。

---

## 21. 修改邊界

- 本文件為 Phase 1 產物。本階段只允許建立與修訂本 Requirement 文件，不得修改任何 Code、HTML、CSS、JS、JSON、Excel、Template、asset、font、Launch、Viewer、Workspace、Editor、SOP 或其他既有正式文件。
- 後續只可在 Phase 2 完成調查、Phase 3 Proposal 經 Jamie 確認後，修改完成本 Requirement 所必要的最小檔案。
- 若 Phase 2／3 發現本 Requirement 與既有 LOCKED 架構或已 PASS 行為衝突，必須停止並交由 Jamie 裁決。
