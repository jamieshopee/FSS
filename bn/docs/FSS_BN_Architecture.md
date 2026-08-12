# FSS BN 內部架構基準

> 階段：Phase 0
>
> 狀態：Jamie + GPT 目前已確認內容之整理；待 Jamie 與 GPT 審稿
>
> 文件性質：FSS BN Generator 內部 Architecture Baseline
>
> 適用對象：後續參與 FSS BN 討論或開發的 GPT、Codex、Claude

## 1. 文件目的

本文件整理 FSS BN Generator 在 Phase 0 已確認的內部架構，作為後續討論與開發的共同基準，避免重新設計、流程分裂或對共用邊界產生誤解。

本文件只描述 **FSS BN 生成器內部架構**，不修改、取代或重新設計既有的《FSS 入口平台 — Architecture Contract v1.0（Locked）》。

若後續建議與本文件已確認架構衝突，必須先明確提出衝突並交由 Jamie 決定，不得直接改變架構。

## 2. 文件定位與範圍

本文件是 Phase 0 架構基準，不是：

- Requirement Specification
- Proposal
- Implementation Spec
- Coding Plan

本文件不進入 Phase 1、Phase 2 或 Phase 3，也不決定尚未完成討論的產品、UI、資料格式或實作細節。

## 3. 既有 FSS 架構前提

FSS 入口平台既有 Architecture Contract 維持不變。目前 FSS 包含：

- BN
- Overlay Image

BN 位於 FSS 之下的獨立生成器目錄：

```text
FSS/
└── bn/
```

BN 是一個獨立 Generator。A、B、C、D 是 BN 內部的 Type，不是四個獨立 Generator，也不得拆成四套完整程式。

本文件不改變下列既有平台邊界：

- FSS 入口平台透過 `tools.json` 管理 Generator。
- BN 與 Overlay Image 各自位於獨立資料夾，彼此不依賴內部實作。
- BN 內部架構不得反向改造 FSS 入口平台。

## 4. 核心架構原則

FSS BN 的核心原則為：

> Excel 可以獨立，資料 Mapping 可以依 Type 不同，但 Generator 主流程維持共用。

具體而言：

1. A、B、C、D 使用各自專用的 Excel 工單。
2. 各 Type 可以有自己的 Excel 欄位 Mapping、Schema 與真正必要的特殊資料規則。
3. Excel 匯入完成後，資料進入統一的 Workspace Data 與共用生成流程。
4. 所有 Type 共用同一組固定 17 個 BN Templates。
5. Preview、必要微調、暫存、Workspace 還原與 Export／完整專案下載流程維持共用。
6. Type 之間只處理真正存在的差異，不複製完整流程。

## 5. 使用者主要流程

整體進入流程為：

```text
FSS 首頁 → BN Type 選擇頁 → 選擇 A／B／C／D → BN 控制台
```

### Step 1：從 FSS 首頁進入 BN

使用者在 FSS 首頁點擊「BN」後，先進入 BN Type 選擇頁，不直接進入控制台。

### Step 2：選擇 BN Type

Type 選擇頁目前以卡片形式提供 A、B、C、D。未來若新增其他 Type，再依序增加。A、B、C、D 仍只是同一個 BN Generator 內部的 Type，不因 Type 選擇頁而拆成四個 Generator。

Type 選擇頁視為一次 BN 工作的起點，視覺風格沿用 FSS 平台既有風格。未來架構允許增加 E、F 等新 Type，但其實際需求尚未定案，不得為未知需求預先擴充或過度設計。

### Step 3：進入 BN 控制台並匯入 Type 對應工單

使用者選擇 Type 後進入 BN 控制台，使用該 Type 專用的 Excel 工單，接著點擊「匯入 Excel」。

目前對應關係為：

| BN Type | 對應工單 |
|---|---|
| A | A 專用 Excel |
| B | B 專用 Excel |
| C | C 專用 Excel |
| D | D 專用 Excel |

### Step 4：自動生成全部 BN

系統依 Excel 資料，透過共用生成流程自動生成固定 17 個 BN 版位。

### Step 5：檢查與必要微調

使用者檢查全部 BN；只有必要時才進行微調。檢查是主要流程，微調是例外功能。

### Step 6：下載完整專案

使用者下載完整專案。完整專案需包含：

- 成品
- 可供 Workspace 還原使用的暫存檔

完整專案 ZIP 的詳細結構與暫存資料格式尚未定案。

### 5.1 BN 控制台整體 Layout

BN 控制台採三欄配置，整體介面風格沿用 FSS 平台：

| 區域 | 寬度 | 職責 |
|---|---|---|
| 左側欄 | 固定寬度 | 顯示固定 17 個 BN 項目，供使用者選取 |
| 中間欄 | 響應式，使用剩餘可用空間 | 顯示左側目前選取的單一 BN Preview |
| 右側欄 | 固定寬度 | 提供匯入、文字微調、下載與重設操作 |

### 5.2 左側 17 個 BN 項目

左側固定顯示 17 個 BN 項目，規則如下：

- 採純文字清單，不顯示縮圖。
- 使用正式 BN 版位名稱，例如 `01_DDcard BN`、`02_MALL HBN`；完整名稱以《FSS BN Generator－固定 17 個 BN 版位與 A／B／C／D Type 差異整理》為準。
- 必須清楚呈現目前選取項目。
- 支援滑鼠點選。
- 支援鍵盤 `↑`／`↓` 切換 BN。

切換目前 BN 時，中間 Preview 與右側文字內容編輯區必須同步切換至該 BN。

### 5.3 右側操作順序

右側主要操作依序為：

1. 匯入工單 Excel
2. 匯入暫存檔
3. 修改目前選取 BN 的文字內容
4. 下載完整專案
5. 重設工作區域

右側不固定顯示全部 17 個 BN 的所有欄位。左側目前選取哪一個 BN，右側就只顯示並編輯該 BN 真正需要的文字欄位；不同 BN 可以有不同欄位。01～12、13～15、16 的實際欄位與字數限制，以現有 17 版位 Phase 0 文件為準。這項差異不得被實作成 17 套完整 Editor 流程。

### 5.4 文字微調邊界

控制台的必要微調只允許修改文字內容，不開放使用者修改：

- 字型
- 字重
- 字級
- 顏色
- 文字位置
- 對齊
- Template 原始樣式
- 其他視覺樣式

Excel 資料帶入後，Template 原本使用的樣式與顏色維持不變。文字修改後，必須即時更新中間目前選取 BN 的 Preview。

各欄位沿用該 BN 已確認的字數限制，不得自行更改。輸入超過限制時，必須禁止繼續輸入並同時顯示警告；最終警告文案尚未定案。

### 5.5 `banwords.xlsx` 禁用語檢查

BN 的文字內容必須綁定 `banwords.xlsx` 禁用語檢查。其行為沿用現有 SPX AD 已完成的禁用語機制；命中禁用語時的實際顯示與處理方式，也以 SPX AD 現有行為為基準，不另行設計一套 BN 規則。

本節只確認需求與沿用方向。SPX AD 現有實作及 BN 可沿用方式，留待 Phase 2 Investigation 實際調查。

### 5.6 重新匯入、匯入暫存與重設工作區域

#### 重新匯入 Excel

若要重新開始 Excel 工作，使用者必須先回到 BN Type 選擇頁，重新選擇 A／B／C／D，再匯入該 Type 對應的 Excel 工單。

#### 匯入暫存檔

匯入暫存檔可直接在 BN 控制台內執行。匯入後會完全覆蓋目前 Workspace，因此執行前必須提示使用者目前工作將被覆蓋，並在使用者確認後才執行。最終提示文案與按鈕名稱尚未定案。

#### 重設工作區域

「重設工作區域」會清除目前工作，並回到 BN Type 選擇頁。本階段不自行補充其他 Reset 行為。

### 5.7 `17_門檻表` 的控制台邊界

`17_門檻表` 仍是左側固定 17 個 BN 項目之一，選取後由中間欄顯示 Preview。其既有 Excel 與資料結構需求維持目前 17 版位 Phase 0 文件已確認內容。

由於 `17_門檻表` 包含物流欄、動態門檻列、白色色塊垂直合併、`↑` 合併規則與動態高度，其控制台手動編輯 UI 本階段不定案，留待實際製作 `17_門檻表` 時再定義。不得因此阻止前面的 BN 控制台骨架製作，也不得在本階段自行設計門檻表 Editor。

## 6. Type 與 Excel 的關係

A、B、C、D 的 Excel 工單彼此獨立。即使部分 Type 的欄位目前幾乎相同，也不因此強制共用同一份 Excel。

維持專用工單的原因是：使用者先選擇 BN Type，再使用該 Type 對應工單，可直接知道應填寫哪些資料。

未來新增 Type 時，可以新增該 Type 專用 Excel；但「Excel 獨立」不代表「程式流程獨立」。不得因專用工單而為每個 Type 建立一套從 Import 到 Export 的完整流程，例如：

- A 專用的一整套 Import、Preview、Workspace 與 Export
- B 專用的一整套 Import、Preview、Workspace 與 Export
- C 專用的一整套 Import、Preview、Workspace 與 Export
- D 專用的一整套 Import、Preview、Workspace 與 Export

可以共用的匯入、預覽、Workspace、下載、暫存與還原邏輯，均應維持共用。

## 7. Excel Import 架構

A、B、C、D 可以各自具有 Excel 欄位 Mapping／Schema，但共用同一套 Excel Import Engine 與匯入流程。

```text
A 專用 Excel ─┐
B 專用 Excel ─┤
C 專用 Excel ─┼─→ 共用 Excel Import Engine ─→ 統一 Workspace Data
D 專用 Excel ─┘
```

Type 在匯入階段提供的差異資訊為：

- 現在是哪一種 BN Type
- 使用哪一份 Type 專用 Excel 工單
- 該 Excel 欄位如何 Mapping
- 該 Type 需要哪些資料
- 真正屬於該 Type 的特殊資料規則

匯入完成後，資料必須進入統一的 Workspace Data 與共用生成流程。A、B、C、D 不得從 Import 開始一路分裂成四套 Preview、Editor、Export 或 Workspace 流程。

各 Type 的完整 Excel 欄位與 Mapping／Schema 內容尚未定案。

## 8. 統一 Workspace Data

Workspace Data 是 Excel Import 與 17 個共用 Templates 之間的統一資料層。其概念結構為：

```text
Workspace Data
├── 共用資料
└── Type／Template 必要的特殊資料
```

大部分 Type／版位使用相同的主要文字資料；少數 Template 可能需要額外資料。例如某一版位左側仍使用共用主要文字，右側另有倒數資訊「1天」。此情況代表該 Template 額外需要一個資料欄位，不代表需要另一套 Generator。

特殊欄位不存在或不適用時，不應改變整個 Generator 架構。暫存 JSON Schema 與 Workspace Data 的最終欄位結構尚未定案。

## 9. 共用 17 個 BN Templates

A、B、C、D 全部使用同一組固定 17 個 BN Templates。17 個版位是 BN Generator 的共用版位集合，不是每個 Type 各自複製一組 17 個版位。

架構關係為：

```text
同一組 17 個 BN Templates
+
不同 Type 的資料／顯示差異
```

每個 Template 只讀取自身需要的 Workspace Data。例如：

```text
BN 01 → 共用文字
BN 02 → 共用文字
BN 03 → 共用文字 + 特殊右側文字
BN 04 → 共用文字
...
BN 17 → 依自身需求取得資料
```

以上編號只用於說明資料取得方式，不代表 Template 的正式名稱或詳細規格。17 個版位目前已確認的正式名稱、尺寸、輸出格式、分類、文字欄位與門檻表資料結構，以《FSS BN Generator－固定 17 個 BN 版位與 A／B／C／D Type 差異整理》為準；該文件未確認的詳細 Layout 與實際檔案格式仍不得自行補完。

## 10. 共用與獨立的邊界

### 10.1 Type 各自獨立

- A／B／C／D 的選擇
- 各 Type 專用 Excel 工單
- 各 Type 的 Excel 欄位 Mapping／Schema
- 真正屬於該 Type 的特殊資料規則

### 10.2 所有 Type 共用

- FSS BN Generator
- BN 控制中心
- Excel Import Engine（流程共用）
- Workspace
- 固定 17 個 BN Templates
- Preview
- 必要微調功能
- 暫存
- Workspace 還原
- 完整專案下載
- Export 流程

## 11. 整體架構概念

```text
FSS BN
│
├── 選擇 BN Type
│   ├── A
│   ├── B
│   ├── C
│   └── D
│
├── Type 對應 Excel
│   ├── A 專用 Excel
│   ├── B 專用 Excel
│   ├── C 專用 Excel
│   └── D 專用 Excel
│
├── 共用 Excel Import Engine
│   └── 依 Type 使用對應 Mapping／Schema
│
├── 統一 Workspace Data
│   ├── 共用資料
│   └── Type／Template 必要的特殊資料
│
├── 共用固定 17 個 BN Templates
│   └── 每個 Template 只取得自身需要的資料
│
├── 共用 Preview／必要微調
│
├── 共用 Workspace／暫存／還原
│
└── 共用 Export／完整專案下載
```

## 12. 明確禁止的架構分裂

依目前已確認架構，不得：

- 將 A、B、C、D 設計成四個獨立 Generator。
- 因 Type 不同而拆成四套完整程式。
- 為 A、B、C、D 各複製一組 17 個 Templates。
- 因 Excel 工單獨立而建立四套完整 Import 流程。
- 讓各 Type 從 Import 一路分裂成各自的 Preview、Editor、Workspace、暫存、還原與 Export 流程。
- 因單一 Template 多一個特殊文字欄位而建立另一套 Generator。
- 以 BN 內部需求修改或重新設計 FSS 入口平台 Architecture Contract。

## 13. 未來新增 Type 的邊界

架構必須允許後續增加新的 BN Type。新增 Type 時，可以增加其專用 Excel、Mapping／Schema 與已確認的必要差異；共用 Generator 主流程及共用 17 個 Templates 的原則不因此改變。

未來 E、F 等 Type 的實際需求尚未定案。不得在需求確認前推測其欄位、Template 差異、流程或實作方式。

## 14. 尚未定案事項

以下內容不在本文件中自行補完：

- A／B／C／D 的正式名稱
- 每一種 Type 的完整 Excel 欄位
- 17 版位 Phase 0 文件尚未確認的規格
- 各 Template 尚未確認的詳細 Layout
- 本文件未明確確認的 UI 視覺細節與最終介面文案
- `17_門檻表` 的控制台手動編輯 UI
- `banwords.xlsx` 在 BN 中的實際沿用方式
- 暫存 JSON Schema
- 完整專案 ZIP 詳細結構
- JavaScript 最終拆檔方式
- Type Registry 最終實作形式
- Template 實際檔案格式
- 未來 E／F Type 的實際需求

上述項目一律標記為「尚未定案」，不得由後續參與者自行猜測或補完。

## 15. 與既有 Architecture Contract 的對照

### 15.1 無衝突的部分

本文件維持下列既有 Contract 原則：

- BN 是 FSS 下的獨立 Generator。
- BN 與 Overlay Image 維持生成器分離。
- 入口平台架構與 `tools.json` 管理方式不變。
- BN 採 Excel 批次生成、檢查為主、必要微調為例外的主要流程。
- BN 內部仍包含控制中心、Excel 解析、Templates、暫存與下載等職責。

### 15.2 版位數量一致狀態

- FSS Architecture Contract 與 FSS BN Architecture 現在一致。
- BN 目前固定為 17 個版位。
- 不再存在「12 個／17 個」的待處理衝突。

## 16. 後續使用規則

後續 GPT、Codex、Claude 進行 FSS BN 討論或開發時，應先以本文件作為 BN 內部架構基準。

若新需求或建議涉及以下情況，必須先停止並提出衝突：

- 將 Type 拆成獨立 Generator 或完整獨立流程
- 複製多套 17 個 Templates
- 改變共用 Import、Workspace、Preview、暫存、還原或 Export 邊界
- 修改 FSS 入口平台 Architecture Contract
- 對尚未定案事項自行作產品或實作決策

任何架構衝突或變更均由 Jamie 決定，不得直接重新設計。

## 17. 後續預定開發順序

本節只記錄目前方向，不代表已進入後續階段或授權 Coding：

```text
Phase 0 文件整理完成
→ Jamie + GPT 審稿
→ Phase 1 Requirement Specification
→ Phase 2 Investigation
→ Phase 3 Proposal
→ Jamie 確認
→ Phase 4 Coding
→ AI 自我驗證
→ Jamie 手動驗證 PASS
→ Code Commit
→ Docs Update
→ Docs Commit
→ Jamie Push
```

第一輪 Coding 預計只製作「BN Type 選擇頁＋BN 控制台最初骨架」，不是一次完成全部 17 個正式 BN Templates。控制台骨架穩定並完成驗證後，17 個版位預定依下列方向建立或接入：

```text
01～12 主視覺 Resize
→ 13～15 特殊文字訊息
→ 16_副區
→ 17_門檻表
```

以上為 Phase 0 當時記錄的開發順序方向；第一輪實際落地狀態見第 18 節。

## 18. 第一輪實際落地狀態

> 本節同步第一輪控制台骨架的已完成架構狀態。前述 Phase 0 內容保留為架構基準與歷史決策；本節不代表正式 Import、Workspace Schema、Export 或 17 個 BN Templates 已完成。

第一輪「BN 樣式選擇頁＋BN 控制台最初骨架」已完成 Coding、AI 自我驗證及 Jamie 手動驗證。Code Commit 為 `c34f9d7b808a07cf2270277a579b5c75207d69aa`（`feat(bn): add generator control center`）。

### 18.1 已落地檔案與頁面狀態

```text
FSS/
├── assets/
│   ├── A.jpg
│   ├── B.jpg
│   ├── C.jpg
│   └── D.jpg
└── bn/
    ├── index.html
    ├── css/
    │   └── styles.css
    ├── js/
    │   ├── app.js
    │   ├── workspace.js
    │   ├── editor.js
    │   ├── banwords.js
    │   └── banwords-data.js
    └── assets/
        └── banwords.xlsx
```

- FSS 首頁既有 `tools.json` 已指向 `bn/`，第一輪不需修改入口平台。
- 單一 `bn/index.html` 內含互斥的樣式選擇頁與共用控制台狀態，沒有為 A／B／C／D 建立四套頁面或流程。
- 使用者介面使用「樣式」一詞；內部仍使用既有 Type runtime 概念與 `currentType`，不改變本文件的 Type 架構定義。
- 樣式 A／B／C／D 卡片使用 `assets/A.jpg` 至 `assets/D.jpg` 四張 256 × 256 JPEG；這些圖片只是選擇卡片圖示，不是正式 BN Template 底圖。
- 控制台已落地固定左欄、響應式中欄與固定右欄；左側固定 17 個正式 BN，中央目前只提供 placeholder Preview，右側依 Selected BN 建立第一輪文字 Editor。

### 18.2 第一輪 runtime 邊界

- `workspace.js` 目前只保存 `currentType`、`selectedBnId` 與 01～16 的暫時文字內容，並以小型 subscribe／notify 支援控制台同步。
- 此 state 只服務第一輪 runtime，不是最終 Workspace Data 或 JSON Schema，沒有序列化、暫存 Restore 或 Export 格式。
- `17_門檻表` 可被選取並切換 placeholder Preview，但第一輪不提供手動 Editor。
- 「重設工作區域」會清除第一輪 runtime state 並回到樣式選擇頁。

### 18.3 banwords 落地邊界

- 正式規則來源為 `bn/assets/banwords.xlsx`，SHA-256 為 `0b88f82d75606a3ad3eaccf3dc03f05c3d34eb79f11bb3ab7e13e6128bfdf4c5`。
- `bn/js/banwords-data.js` 是由正式 Excel 預處理產生、可重新生成替換的 runtime 衍生資料，目前包含 66 筆有效規則；Runtime 不直接解析 xlsx。
- `banwords.js` 只承載第一輪需要的 literal／regex、exclude、replacement、移除、blocked 與 message 核心；不包含 allowChars sanitation、數字格式化或日期格式化。
- 禁用語訊息使用觸發欄位正下方的 inline message，不使用遠端 Toast。

### 18.4 尚未落地的架構部分

下列項目仍維持原架構方向，但尚未實作：

- 正式 Excel Import Engine 與各 Type Excel Mapping
- 正式 Workspace Data／JSON Schema 與暫存 Restore
- A－01 以外的正式 BN Templates、正式 Canvas Layout 與各 Type 專用底圖
- Type C 額外文字正式欄位與 Type D Logo
- `17_門檻表` 手動 Editor
- ZIP／正式圖片 Export

控制台中的「匯入工單 Excel」、「匯入暫存檔」與「下載完整專案」目前為停用入口，不代表上述架構部分已完成。

## 19. A－01 正式 Template 實際落地狀態

樣式 A／`01_DDcard BN` 已完成正式 Template、薄 Launch 驗證入口及 Safari／Chrome 手動視覺驗證，Jamie 已回覆 PASS。Code Commit 為 `38dc62303277e4d0c301ef46b22740ad4675a114`（`feat(bn): add A01 DDcard template`）。

本次實際落地檔案為：

- `bn/templates/A/01-ddcard-bn.js`：A－01 唯一正式 renderer。
- `bn/launch/viewer.html`：共用薄 Viewer，目前只支援 A－01。
- `bn/launch/A/01_DDcard BN.command`：A－01 專用直接啟動入口。
- `bn/assets/A/底圖/01_DDcard BN.jpg`：A－01 正式 runtime 底圖。
- `bn/assets/A/對位/01_DDcard BN.png`：只供 Launch 視覺校稿的正式對位圖。

A－01 renderer 維持 531 × 792px 正式 Canvas 與三個 Locked 文字框，字級直接使用 Photoshop 原始 `pt`：主標 Medium 30pt、副標 Bold 45pt、`$`／`%` Bold 37pt、保護文字 Medium 18pt。主標與保護文字另以 2× local temporary Canvas rasterization 高品質縮回正式尺寸，僅調整 Medium 的 rasterization 視覺；不改字型、字級、顏色、opacity、文字框或座標，不使用 UA／瀏覽器分支或 `geometricPrecision`，也不影響 Bold 副標、`$`／`%`、底圖或其他內容。Chromium／Chrome 路線與 Safari 均已通過 Jamie 實際視覺驗證，主標與保護文字更接近 Photoshop 完成參考圖，未見明顯跨瀏覽器字重差異或副標等其他內容 regression。

Launch 仍只屬正式 Template 的開發／視覺校稿工具，不是第二套 Generator 或正式控制台。Jamie 可直接雙擊 A－01 `.command`，不必先手動啟動根目錄 `啟動 FSS.command`；入口會確認或啟動 `127.0.0.1:4173`、開啟共用 Viewer 的 A－01 route，並沿用已存在的正確服務。遇到不相符的既有服務時會停止並提示，不自行切換 port 或終止程序。Viewer 提供 A－01 三欄測試文字、IME-safe、既有字數規則與超限 rollback，以及對位圖顯示／隱藏。

既有 BN 控制台仍使用 placeholder Preview，尚未整合 A－01 正式 Template。A－02～17、B／C／D、正式控制台整合及其餘正式輸出架構仍未實作；A－01 目前的 Type A 路徑不預先決定 B／C／D 的 Template 共用方式，也不構成新增 Registry、Framework 或未確認抽象化的依據。
