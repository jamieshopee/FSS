# FSS BN Generator－第一輪開發 Requirement Specification v1.0

> 階段：Phase 1－Requirement Specification
>
> 第一輪開發範圍：BN Type 選擇頁＋BN 控制台最初骨架
>
> 狀態：第一輪控制台骨架已完成，Jamie 手動驗證 PASS
>
> 整理日期：2026-08-12
>
> 實作同步日期：2026-08-12
>
> Code Commit：`c34f9d7b808a07cf2270277a579b5c75207d69aa`（`feat(bn): add generator control center`）

## 1. 文件目的

本文件根據已確認的 Phase 0 文件，定義 FSS BN Generator 第一輪開發需求，供後續 Phase 2 Investigation 與 Phase 3 Proposal 使用。

本文件只定義產品需求與完成標準，不指定實作方式，不修改或取代下列架構基準：

- 《FSS 入口平台－Architecture Contract v1.0（Locked）》
- 《FSS BN 內部架構基準》
- 《FSS BN Generator－固定 17 個 BN 版位與 A／B／C／D Type 差異整理》

## 2. 產品目的與開發範圍

第一輪開發的產品目的是：

> 讓使用者可以從 FSS 首頁進入 BN，選擇 A／B／C／D Type，並進入一個可承載後續固定 17 個 BN Templates 的最初版控制台。

### 2.1 包含範圍

- BN Type 選擇頁
- A／B／C／D 卡片入口
- BN 控制台三欄骨架
- 左側固定 17 個 BN 純文字清單
- 清楚的 Selected 狀態
- 滑鼠選取
- 鍵盤 `↑`／`↓` 切換
- 中間單一 BN Preview 容器
- Preview 與目前選取 BN 的同步行為
- 右側操作區結構
- 右側依目前 BN 動態切換文字欄位的規格
- 文字修改即時更新目前 Preview 的需求
- 已確認字數限制的行為
- `banwords.xlsx` 需求邊界
- 匯入暫存覆蓋 Workspace 前的提示與確認需求
- 重設後清除目前工作並回到 Type 選擇頁

### 2.2 輸入與輸出邊界

本輪介面需承載的輸入入口為 Type 對應的 Excel 工單、暫存檔及目前 BN 的文字內容；但最終 Excel Mapping／Schema 與暫存 JSON Schema 不在本輪定案。

BN Generator 的最終輸出方向為下載完整專案；但最終 ZIP 詳細結構、完整 Export 實作細節及 17 個正式成品的製作不在第一輪範圍。

## 3. 既有架構限制

- FSS BN 是 FSS 下的一個獨立 Generator。
- A、B、C、D 是同一個 BN Generator 內部 Type，不是四個 Generator。
- 各 Type 使用專用 Excel 工單，並可有各自的 Mapping／Schema。
- Excel 匯入後必須進入統一 Workspace Data。
- A／B／C／D 共用 Generator 主流程、Import Engine、Workspace、Preview、必要微調、暫存、還原、Export 與固定 17 個 BN Templates。
- 不得為不同 Type 複製四套完整程式或四套 17 個 Templates。
- 不得修改 FSS 入口平台 Locked Architecture Contract。

## 4. 使用者主流程

```text
FSS 首頁
→ 點擊「BN」
→ BN Type 選擇頁
→ 選擇 A／B／C／D
→ BN 控制台
```

Type 選擇頁是一次 BN 工作的起點。若使用者要重新開始 Excel 工作，必須先回到 Type 選擇頁、重新選擇 Type，再匯入該 Type 對應的 Excel 工單。控制台內不提供直接切換 Type 的功能。

## 5. BN Type 選擇頁需求

- 目前提供 A、B、C、D 四個 Type。
- 每個 Type 使用卡片形式呈現並可進入 BN 控制台。
- 未來新增 Type 時依序增加，但本輪不定義或製作 E／F 等未確認 Type。
- 介面視覺風格沿用 FSS 平台既有風格。
- Type 選擇不得造成 Generator 或共用流程分裂。

## 6. BN 控制台 Layout

BN 控制台固定採三欄：

| 區域 | 寬度 | 需求 |
|---|---|---|
| 左側欄 | 固定寬度 | 顯示固定 17 個 BN 項目並提供選取 |
| 中間欄 | 響應式，使用剩餘可用空間 | 顯示目前選取的單一 BN Preview |
| 右側欄 | 固定寬度 | 提供匯入、文字微調、下載及重設操作 |

控制台整體視覺風格沿用 FSS 平台。本文件不指定欄寬數值或其他未確認的視覺實作細節。

## 7. 左側欄需求

左側固定顯示下列 17 個正式 BN 名稱：

1. `01_DDcard BN`
2. `02_MALL HBN`
3. `03_Coin page BN`
4. `04_Loyalty BN`
5. `05_MSBN`
6. `06_IG`
7. `07_FB POST`
8. `08_SPX TVBN_1`
9. `09_SPX TVBN_2`
10. `10_POP UP`
11. `11_Line OA`
12. `12_LPBN`
13. `13_Skinny BN_APP`
14. `14_Skinny BN_PC`
15. `15_AR`
16. `16_副區`
17. `17_門檻表`

清單必須符合以下規則：

- 使用純文字，不顯示縮圖。
- 必須清楚顯示目前 Selected 項目。
- 支援滑鼠點選。
- 支援鍵盤 `↑`／`↓` 切換。
- 不增加其他鍵盤快捷鍵。
- 切換項目時，中間 Preview 與右側文字欄位必須同步切換。

## 8. 中間 Preview 需求

- 中間欄只顯示目前選取的單一 BN Preview。
- 左側選取改變時，Preview 容器必須同步顯示對應 BN。
- 第一輪只要求 Preview 容器及選取同步行為，不要求一次完成 17 個正式 Templates。
- 是否在第一輪 Coding 使用 placeholder 或其他尚未完成 Template 的呈現方式，不在本 Requirement 指定，留待後續 Proposal 決定。

## 9. 右側欄需求

右側主要操作順序固定為：

1. 匯入工單 Excel
2. 匯入暫存檔
3. 修改目前選取 BN 的文字內容
4. 下載完整專案
5. 重設工作區域

不得增加未確認的操作、額外匯入格式或額外 Export 格式。

右側不得固定顯示全部 17 個 BN 的所有欄位。目前選取哪一個 BN，就只顯示該 BN 真正需要的文字欄位；不同 BN 可以有不同欄位，但不得因此建立 17 套完整 Editor 流程。

## 10. 文字編輯、即時同步與字數限制

### 10.1 文字編輯規則

右側只允許修改文字內容，不允許修改：

- 字型
- 字重
- 字級
- 顏色
- 文字位置
- 對齊
- Template 原始樣式
- 其他視覺設定

Template 原本使用的樣式與顏色必須維持不變。

### 10.2 即時同步規則

- 使用者修改右側文字後，中間目前 BN Preview 必須即時更新。
- 不提供「套用」按鈕。
- 不增加額外儲存步驟。

### 10.3 字數限制

- 每個文字欄位依 Phase 0 版位文件已確認的限制執行。
- 超過限制時必須禁止繼續輸入，並同時顯示警告。
- 不得修改既有字數限制或自行建立新的計算規則。
- 最終警告文案尚未定案。

## 11. `banwords.xlsx` 需求

- BN 文字內容必須綁定 `banwords.xlsx` 禁用語檢查。
- 行為概念沿用現有 SPX AD 正式機制。
- 命中禁用語時的處理與顯示方式，以 SPX AD 現有正式行為為基準。
- BN 不另行建立第二套禁用語規則。

本階段不調查 SPX AD 程式細節，也不指定實作方式。實際沿用方式留待 Phase 2 Investigation。

## 12. Workspace 操作行為

### 12.1 重新開始 Excel 工作

- 使用者必須先回到 BN Type 選擇頁。
- 使用者重新選擇 A／B／C／D，再匯入該 Type 對應的 Excel 工單。
- 控制台內不提供直接切換 Type 的功能。

### 12.2 匯入暫存檔

- 可在 BN 控制台內執行。
- 匯入後會完全覆蓋目前 Workspace。
- 執行前必須提示使用者目前工作將被覆蓋。
- 只有使用者確認後才可執行匯入。
- 最終警告文案、按鈕名稱及 Dialog 視覺尚未定案。

### 12.3 重設工作區域

- 清除目前工作。
- 回到 BN Type 選擇頁。
- 不增加其他 Reset 行為。

## 13. `17_門檻表` 邊界

- `17_門檻表` 是固定 17 個 BN 之一。
- 左側清單必須可以選取 `17_門檻表`。
- 選取後，中間 Preview 容器必須切換至 `17_門檻表`。
- 其既有 Excel 與版位需求維持 Phase 0 文件內容。
- 其控制台手動 Editor UI 尚未定案，待實際製作 `17_門檻表` 時再定義。

第一輪不得設計或製作動態 row editor、logistics editor、merge editor、`↑` UI、表格管理功能或動態新增／刪除列 UI。

## 14. 支援平台與環境

- 本功能運行於既有 FSS Web 平台及其既有部署方式。
- 本輪不建立原生 App、桌面版或其他獨立執行環境。
- 瀏覽器與作業系統的最終支援清單尚未定案；此事項不阻擋 Phase 2 Investigation。

## 15. 明確不做的內容

- 17 個正式 BN Templates 全部製作
- 17 個版位的完整 Layout Coding
- `17_門檻表` Editor
- 最終 Excel Mapping／Schema
- 最終 Workspace JSON Schema
- 最終 ZIP 詳細結構
- 完整 Export 實作細節
- 未來 E／F Type
- 新增樣式編輯能力
- 任意拖拉版面
- 顏色、字型或位置調整
- 額外設定頁、編輯工具、快捷鍵、匯入格式、Export 格式或 UI 模式
- 未確認的 Template 規則、資料結構及其他 Jamie 未要求的功能

## 16. 完成標準

第一輪開發在後續完成 Coding 與驗證時，必須符合：

1. 使用者可從 FSS 首頁點擊 BN 並先進入 Type 選擇頁。
2. Type 選擇頁提供 A／B／C／D 卡片，選擇後進入同一套 BN 控制台。
3. 控制台呈現左側固定、中間響應式、右側固定的三欄骨架。
4. 左側以純文字顯示全部 17 個正式名稱，並清楚顯示 Selected 狀態。
5. 滑鼠及鍵盤 `↑`／`↓` 可以切換目前 BN。
6. 切換 BN 時，中間 Preview 容器及右側文字欄位同步切換。
7. 右側操作區依確認順序呈現，且不加入額外操作。
8. 右側只顯示目前 BN 所需文字欄位，且只允許文字修改。
9. 文字修改不需要套用或額外儲存步驟，並即時反映至目前 Preview。
10. 已確認的文字欄位必須限制字數；超限時禁止繼續輸入並顯示警告。
11. 禁用語行為符合 Phase 2 對 SPX AD 正式行為的調查結果，不另建規則。
12. 匯入暫存前提示將覆蓋目前 Workspace，並須經使用者確認。
13. 重設工作區域會清除目前工作並回到 Type 選擇頁。
14. `17_門檻表` 可被選取及切換 Preview，但未加入未確認的手動 Editor。
15. 未製作或自行補完本文件「明確不做」的內容。

以上完成標準只定義需求結果；placeholder、資料結構、檔案拆分及其他實作選擇須由後續 Phase 2／Phase 3 處理，不得由本文件預先指定。

## 17. 修改邊界

後續第一輪開發只可修改 Proposal 經 Jamie 確認、且為完成本文件需求所必要的 BN 相關檔案。

不得：

- 修改 FSS 入口平台 Locked Architecture Contract。
- 改造 Overlay Image 或其他 Generator 的內部實作。
- 將 A／B／C／D 拆成四套完整流程。
- 複製四套 17 個 Templates。
- 藉本需求進行無關重構或功能擴充。
- 在 Proposal 未確認前 Coding。

若 Phase 2／Phase 3 發現需求與既有架構衝突，必須停止並交由 Jamie 決定。

## 18. 尚未定案但不阻擋 Phase 2 的事項

- 第一輪尚未完成 Template 時，Preview 容器的實際呈現方式
- 欄寬數值及本文件未指定的 UI 視覺細節
- 字數超限警告的最終文案
- 匯入暫存的最終警告文案、按鈕名稱及 Dialog 視覺
- `banwords.xlsx` 實際沿用 SPX AD 的程式方式
- `17_門檻表` 的手動 Editor UI
- 最終 Excel Mapping／Schema
- 最終 Workspace JSON Schema
- 最終 ZIP 詳細結構及完整 Export 實作細節
- 瀏覽器與作業系統的最終支援清單

以上事項不阻擋進入 Phase 2 Investigation；不得在本階段自行補完。

## 19. 第一輪實作完成同步紀錄

> 本節只同步第一輪實際落地結果，不重寫前述 Requirement 歷史內容，也不代表 FSS BN Generator、17 個正式 BN Templates 或完整匯入／輸出流程已完成。

### 19.1 完成與驗證狀態

- 第一輪「BN 樣式選擇頁＋BN 控制台最初骨架」已完成 Coding、AI 自我驗證及 Jamie 手動驗證。
- Code Commit 為 `c34f9d7b808a07cf2270277a579b5c75207d69aa`（`feat(bn): add generator control center`）。
- FSS 首頁既有 BN 入口可直接進入 `bn/`，本次沒有修改 FSS 首頁或 `tools.json`。

### 19.2 樣式選擇頁與控制台

- BN 使用單一 `bn/index.html`，同頁包含互斥的「BN 樣式選擇頁」與「共用 BN 控制台」兩個 UI 狀態。
- 使用者介面統一顯示「樣式 A／B／C／D」；內部程式仍保留 `currentType` 與 A／B／C／D runtime value 等既有 Type 概念，並非架構 Rename。
- 樣式卡片使用 FSS 根目錄 `assets/A.jpg`、`assets/B.jpg`、`assets/C.jpg`、`assets/D.jpg`；四張皆為 256 × 256 JPEG。
- 控制台採左側固定欄、中間響應式 Preview、右側固定控制欄的三欄配置。
- 左側依正式順序顯示固定 17 個 BN 名稱，初始 Selected 為 `01_DDcard BN`。
- 左側支援滑鼠及鍵盤 `↑`／`↓` 切換，首尾不循環；輸入框／控制項聚焦、IME composition 或 modifier key 狀態不觸發切換。
- 中間目前是一般 DOM placeholder Preview，只用於驗證目前樣式、目前 BN、目前文字內容與即時同步；尚未接入正式 BN Template 或 Canvas。

### 19.3 文字 Editor、Workspace 與 Reset

右側依目前 Selected BN 顯示第一輪 UI-only 文字欄位：

| BN | 欄位與限制 |
|---|---|
| 01～12 | 主標 8、副標 7、保護文字 17 |
| 13、14 | 第一行 5、第二行 6 |
| 15 | 第一行 3、第二行 3 |
| 16 | 左標題 10、左文案 10、右標題 10、右文案 10 |
| 17 | 第一輪不提供手動 Editor |

- 合法文字變更會即時同步至 runtime Workspace 與 Preview，沒有「套用」按鈕。
- 一般 input 不重建整個 Editor；composition 中不提交，compositionend 後只提交最終內容。
- 字數以 Unicode code point 逐字計算：ASCII 為 0.5，非 ASCII 為 1。超限時拒絕候選結果、回復上一個合法值、維持 Workspace／Preview 原值並顯示該欄位 Warning。
- 第一輪 Workspace 只保存目前樣式、Selected BN 與 01～16 的暫時文字內容，僅服務目前控制台 runtime，不是最終 Workspace JSON Schema，也不提供序列化或 Restore 格式。
- 「重設工作區域」已完成：清除第一輪 runtime Workspace 與目前樣式，回到 BN 樣式選擇頁。

### 19.4 banwords 實作狀態

- 正式來源為 `bn/assets/banwords.xlsx`，SHA-256 為 `0b88f82d75606a3ad3eaccf3dc03f05c3d34eb79f11bb3ab7e13e6128bfdf4c5`。
- Runtime 使用由正式 Excel 預處理產生的 `bn/js/banwords-data.js`，目前包含 66 筆有效規則；Runtime 不直接解析 xlsx。
- 第一輪正式行為包含 literal／regex、exclude、replacement、無 replacement 時移除命中文字、blocked、message、IME-safe，以及清理完成後才進行字數驗證並同步 Workspace／Preview。
- 第一輪不包含 allowChars sanitation、數字格式化或日期格式化。
- 禁用語提示顯示於觸發欄位輸入框正下方的 inline message，不使用遠端 Toast。

### 19.5 仍未完成的邊界

下列功能尚未實作，不得因第一輪控制台骨架完成而視為已完成：

- 正式 Excel Import 與 A／B／C／D Excel Mapping
- 暫存 JSON Restore 與正式 Workspace JSON Schema
- ZIP Export 與正式圖片 Export
- 17 個正式 BN Templates 與正式 Canvas Layout
- Type／樣式專用 BN 底圖
- Type C 額外文字正式欄位
- Type D Logo
- `17_門檻表` 手動 Editor

控制台中的「匯入工單 Excel」、「匯入暫存檔」與「下載完整專案」目前只有明確停用的入口，並非已完成功能。

> （後續同步）A 樣式平台整合（Excel Import／正式 Workspace／renderer Preview／Restore／Export）與 A－17 Manual Editor 已完成並經 Jamie Manual Verification PASS，Code Commit `91aa7f6`；正式行為見 `bn/docs/FSS_BN_A樣式平台整合_Requirement_Specification_v1.0.md` 與 `FSS_BN_Architecture.md` 第 36 節。本文件其餘第一輪 Requirement 歷史內容維持不變。

> （後續同步）B 樣式平台整合已完成並經 Phase 5 AI Verification 與 Phase 6 Jamie 手動驗證 PASS，Code Commit `4f9fb723930a907b8c3956fd084e757b41302137`（`feat(bn): add style B platform integration`）。因此**目前正式支援的樣式為 A 與 B**：Type A 使用 Excel worksheet `A` 與 `bn/assets/A/底圖/`，Type B 使用 worksheet `B` 與 `bn/assets/B/底圖/`；兩者共用同一組固定 17 個正式 renderer、同一套 Excel cell mapping 與 validation schema、同一個 Workspace 結構、同一套 Editor／Preview／Export 行為與 Export formats。上列「Type／樣式專用 BN 底圖」就 A 與 B 而言已完成；`17_門檻表` 手動 Editor 對 A 與 B 皆已可用。Type C 額外文字、Type D Logo 與 C／D 的 Import／Restore 仍未進入正式支援範圍。正式行為見 `bn/docs/FSS_BN_B樣式平台整合_Requirement_Specification_v1.0.md`（含第 27 節）與 `FSS_BN_Architecture.md` 第 38 節。本文件其餘第一輪 Requirement 歷史內容維持不變。

> （後續同步）**目前正式支援的樣式仍為 A 與 B**，`SUPPORTED_TYPES` 仍為 `["A", "B"]`。樣式 D 目前處於**逐版位建置**狀態：`01_DDcard BN`（D－01）已完成正式 Template 與人工對位驗證並經 Jamie PASS，Code Commit `1139a7c3eca005b15c24bef7751ebb0ada740fe1`（`feat(bn): add D01 DDcard template`）；上列「Type D Logo」就 D－01 而言已於 renderer 層落實為固定 asset（不由 Excel 帶入、不進 Editor、不進 Workspace、不進暫存 JSON）。但**本次完成的是 D－01 renderer 與人工對位驗證，不是 D 樣式正式平台整合**：正式 renderer registry 尚未 enable D，樣式 D 在正式平台維持 fail-closed，D 的 Excel Import、Restore、控制台 Preview 與 Export 尚未 enable，因此「Type D Logo 與 C／D 的 Import／Restore 仍未進入正式支援範圍」在平台層面依然成立。「D 有自己的 worksheet `D`、工單配置與 A／B 相同」屬已確認產品需求，是未來 D platform integration 應遵循的依據，不代表目前平台已可 Import D。D－02～17 尚未完成，Type C 額外文字仍未進入正式支援範圍。D－01 正式規格見 `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md` 的「D－01 Requirement」章節（樣式 D 只維護一份總 Requirement 與一份總 Proposal，不建立逐版位文件），落地狀態見 `FSS_BN_Architecture.md` 第 39 節與 `FSS_BN_Template_Requirement_Specification_v1.0.md` 第 5.2 節。本文件其餘第一輪 Requirement 歷史內容維持不變。
