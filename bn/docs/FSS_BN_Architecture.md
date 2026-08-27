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
- A－17、B／C／D 的正式 BN Templates、正式 Canvas Layout 與各 Type 專用底圖
- Type C 額外文字正式欄位與 Type D Logo
- `17_門檻表` 手動 Editor
- ZIP／正式圖片 Export

控制台中的「匯入工單 Excel」、「匯入暫存檔」與「下載完整專案」目前為停用入口，不代表上述架構部分已完成。

## 19. A－01 正式 Template 實際落地狀態

樣式 A／`01_DDcard BN` 已完成正式 Template、薄 Launch 驗證入口及 Safari／Chrome 手動視覺驗證，Jamie 已回覆 PASS。Code Commit 為 `38dc62303277e4d0c301ef46b22740ad4675a114`（`feat(bn): add A01 DDcard template`）。

本次實際落地檔案為：

- `bn/templates/A/01-ddcard-bn.js`：A－01 唯一正式 renderer。
- `bn/launch/viewer.html`：共用薄 Viewer，目前支援 A－01～16。
- `bn/launch/A/01_DDcard BN.command`：A－01 專用直接啟動入口。
- `bn/assets/A/底圖/01_DDcard BN.jpg`：A－01 正式 runtime 底圖。
- `bn/assets/A/對位/01_DDcard BN.png`：只供 Launch 視覺校稿的正式對位圖。

A－01 renderer 維持 531 × 792px 正式 Canvas 與三個 Locked 文字框，字級直接使用 Photoshop 原始 `pt`：主標 Medium 30pt、副標 Bold 45pt、`$`／`%` Bold 37pt、保護文字 Medium 18pt。主標與保護文字另以 2× local temporary Canvas rasterization 高品質縮回正式尺寸，僅調整 Medium 的 rasterization 視覺；不改字型、字級、顏色、opacity、文字框或座標，不使用 UA／瀏覽器分支或 `geometricPrecision`，也不影響 Bold 副標、`$`／`%`、底圖或其他內容。Chromium／Chrome 路線與 Safari 均已通過 Jamie 實際視覺驗證，主標與保護文字更接近 Photoshop 完成參考圖，未見明顯跨瀏覽器字重差異或副標等其他內容 regression。

Launch 仍只屬正式 Template 的開發／視覺校稿工具，不是第二套 Generator 或正式控制台。Jamie 可直接雙擊 A－01 `.command`，不必先手動啟動根目錄 `啟動 FSS.command`；入口會確認或啟動 `127.0.0.1:4173`、開啟共用 Viewer 的 A－01 route，並沿用已存在的正確服務。遇到不相符的既有服務時會停止並提示，不自行切換 port 或終止程序。Viewer 提供 A－01 三欄測試文字、IME-safe、既有字數規則與超限 rollback，以及對位圖顯示／隱藏。

既有 BN 控制台仍使用 placeholder Preview，尚未整合 A－01～16 正式 Template。A－17、B／C／D、正式控制台整合及其餘正式輸出架構仍未實作；目前的 Type A 路徑不預先決定 B／C／D 的 Template 共用方式，也不構成新增 Registry、Framework 或未確認抽象化的依據。

## 20. A－02 正式 Template 實際落地狀態

樣式 A／`02_MALL HBN` 已完成獨立正式 renderer、共用薄 Viewer 的 A－02 route、直接 Launch、正式 runtime assets，以及 Phase 5 AI 與 Jamie Chrome／Safari 手動視覺驗證。Code Commit 為 `7fea431dbf1ea769ae383f51d2547ef083578545`（`feat(bn): add A02 MALL HBN template`）。

本次實際落地檔案為：

- `bn/templates/A/02-mall-hbn.js`：A－02 獨立正式 renderer。
- `bn/launch/viewer.html`：共用薄 Viewer，目前支援 A－01～16 route。
- `bn/launch/A/02_MALL HBN.command`：A－02 專用直接啟動入口，維持 executable mode。
- `bn/assets/A/底圖/02_MALL HBN.jpg`：A－02 正式 runtime 底圖。
- `bn/assets/A/對位/02_MALL HBN.png`：只供 Launch 視覺校稿的正式對位圖。

A－02 renderer 維持 1200 × 360px 正式 Canvas。三個文字框均靠左，正式座標分別為主標 `98,153,351,37`、副標 `98,200,445,57`、保護文字 `98,273,445,22`。最初 Photoshop CSS 的 `left: 693px` 已由 Jamie 依正式對位 PNG 與 Photoshop 完成參考圖批准更正為 `98px`，不得再作為正式座標。

字級直接使用 Photoshop 原始 `pt`：主標 Medium 30pt、副標 Bold 45pt、`$`／`%` Bold 37pt、保護文字 Medium 18pt。主標與保護文字經實際 Investigation 後採 A－02 local 2× temporary Canvas rasterization，再高品質縮回正式尺寸；底圖、Bold 副標及 `$`／`%` 仍在正式 Canvas 以 1× 繪製。此方法是 A－02 經實際驗證的版位特定 workaround，不構成所有 BN、所有 Medium 或其他 Type 的全域規則。

A－02 `.command` 使用 `127.0.0.1:4173` 開啟 `viewer.html?type=A&bn=02_MALL%20HBN`。Viewer 的 A－02 Canvas／Preview／overlay 為 1200 × 360；對位 PNG 使用原始 Alpha、同原點及原尺寸 1:1 疊加，不合成進正式 Canvas。三個測試 input 沿用 IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限與超限 rollback。Viewer 仍只是開發／校稿工具，不是第二套 Generator，既有控制台仍未正式接入 A－01～16 renderer。

## 21. A－03 正式 Template 實際落地狀態

樣式 A／`03_Coin page BN` 已完成獨立正式 renderer、共用薄 Viewer 的 A－03 route、直接 Launch、正式 runtime assets、Phase 5 AI 自我驗證及 Jamie Chrome／Safari 手動驗證。Code Commit 為 `3093cc9736db6d59520043921a60932aaf13fd64`（`feat(bn): add A03 Coin page template`）。

本次實際落地檔案為：

- `bn/templates/A/03-coin-page-bn.js`：A－03 獨立正式 renderer。
- `bn/launch/viewer.html`：共用薄 Viewer，目前支援 A－01～16 route。
- `bn/launch/A/03_Coin page BN.command`：A－03 直接啟動入口，使用既有 `127.0.0.1:4173` 流程且 Git mode 為 `100755`。
- `bn/assets/A/底圖/03_Coin page BN.jpg`：A－03 正式 runtime 底圖。
- `bn/assets/A/對位/03_Coin page BN.png`：只供 Launch 視覺校稿的正式對位圖。

A－03 正式 Canvas 為 1200 × 391px。三個文字框均靠左並共同使用 `left: 92px`：主標 `92,168,395,46`、副標 `92,225,500,64`、保護文字 `92,302,500,25`。最初提供的 `left: 192px` 經正式對位 PNG、Photoshop 完成圖與 Browser 1:1 overlay 驗證後確認為誤植，Jamie 已批准更正；正式對位框為 `(92,168)–(487,214)`、`(92,225)–(592,289)`、`(92,302)–(592,327)`。

文字字級直接使用 Photoshop 原始 `pt`：主標 Medium 37pt、副標 Bold 50pt、同一副標欄位中的 `$`／`%` Bold 40pt、保護文字 Medium 21pt。三組文字不水平置中、不垂直置中；字數限制沿用 8／7／17，ASCII = 0.5、非 ASCII = 1。

Jamie 在 A－03 Phase 3／Phase 4 前已批准第一版正式 Coding 直接採版位內 local 2× Medium rendering。Renderer 建立 2400 × 782 temporary Canvas，只讓 Medium 37pt 主標與 Medium 21pt 保護文字經 2× rasterization 及 high-quality downsample；正式底圖、Bold 50pt 副標與 Bold 40pt `$`／`%` 維持正式 1×。此行為不改正式 pt、座標、frame、actual metrics、baseline、advance width、glyph geometry、顏色或 opacity，且只屬 A－03 已驗證行為，不是所有 BN、所有 Medium、A－06～17 或 B／C／D 的全域規則。A－04、A－05 採用同型方法皆經各自獨立 Investigation 與 Jamie 批准，不是自動套用 A－03。

Phase 5 實測保護文字 actual ink height 約 26.124px，相對 25px frame 約多 1.124px；renderer 沒有縮字、修改 `top`／`height`、增加 baseline offset 或其他 workaround。Jamie 已透過 Chrome／Safari 肉眼驗證接受並正式 PASS，因此這是已驗證接受的實際 Canvas metrics 差異，不是未解阻擋，正式 frame height 仍為 25px。

A－03 route 為 `viewer.html?type=A&bn=03_Coin%20page%20BN`。Canvas、Preview 與對位 overlay 均為 1200 × 391；對位 PNG 以原始 Alpha、同原點及原尺寸 1:1 疊加。Viewer 沿用三個測試 input、即時更新、IME-safe、字數限制、超限 rollback 與 overlay toggle，仍只是開發／校稿工具。Phase 5、正式對位、三組 `left: 92px`、local 2× Medium、Bold mixed runs、Chromium／Chrome、Jamie Chrome／Safari，以及 A－01／A－02 regression 均 PASS；Code Commit 前 `git diff --check` PASS。

## 22. A－04 正式 Template 實際落地狀態

樣式 A／`04_Loyalty BN` 已完成獨立正式 renderer、共用薄 Viewer 的 A－04 route、直接 Launch、正式 runtime assets、Phase 5 AI 自我驗證及 Jamie Chrome／Safari 手動驗證。Code Commit 為 `2ff78e993a714ef420229f6816fe078bdbe43677`（`feat(bn): add A04 Loyalty BN template`）。

Code Commit 精確包含：

- `bn/templates/A/04-loyalty-bn.js`：A－04 獨立正式 renderer。
- `bn/launch/viewer.html`：共用薄 Viewer，現支援 A－01～16。
- `bn/launch/A/04_Loyalty BN.command`：A－04 直接啟動入口，Git mode 為 `100755`。
- `bn/assets/A/底圖/04_Loyalty BN.png`：A－04 正式 runtime 底圖。
- `bn/assets/A/對位/04_Loyalty BN.png`：只供 Launch 視覺校稿的正式對位圖。

A－04 正式 Canvas 為 702 × 208px。三個 runtime frame 均靠左並共同使用 `left: 32px`：主標 `32,52,245,30`、副標 `32,88,350,45`、保護文字 `32,139,350,16`。原始 Photoshop 工作區座標為主標 `834,139,245,30`、副標 `834,175,350,45`、保護文字 `834,226,350,16`；Phase 2 依正式對位 PNG Alpha component 確認其一致 local 轉換為 `xLocal = xPhotoshop - 802`、`yLocal = yPhotoshop - 87`，因此 `834px` 不是 runtime `left`。

字級直接使用 Photoshop 原始 `pt`：主標 Medium 24pt、副標 Bold 35pt、同一副標欄位中的 `$`／`%` Bold 30pt、保護文字 Medium 12pt；顏色依序為 `#ffffff`、`#fff285`、`#fff285`、`#a6f4e6`，文字 opacity 均為 100%。Renderer 使用 actual bounding metrics、靠左 ink positioning 與 frame validation，正式 compositing 為 `globalAlpha = 1`、`source-over`；不使用水平／垂直置中、固定 offset、自動縮字、換行、裁切、字距補償或 scale-to-fit。

Jamie 在 A－04 第一版 Phase 3／4 前已批准版位 local 2× Medium rendering。Renderer 建立 1404 × 416 temporary Canvas，只讓 Medium 24pt 主標與 Medium 12pt 保護文字經 2× rasterization 及 high-quality smoothing 縮回正式 702 × 208；正式底圖、Bold 35pt 副標與 Bold 30pt `$`／`%` 維持正式 1×。此行為不改正式 pt、frame、座標、metrics、baseline、advance、glyph geometry、顏色或 opacity，只屬 A－04 經獨立調查、批准及驗證的版位特定行為，不是所有 BN、所有 Medium 或其他 Type 的 shared／global 規則。

A－04 route 為 `viewer.html?type=A&bn=04_Loyalty%20BN`。Canvas、Preview 與 overlay 均為 702 × 208；對位 PNG 以原始 Alpha、同原點、原尺寸 1:1、CSS opacity 1 疊加，不合成進正式 Canvas。Viewer 沿用三個 input、即時 render、IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限、超限 rollback 與 overlay toggle。

A－04 `.command` 固定使用 `127.0.0.1:4173`。正確 Viewer service 已存在時沿用；遇到不相符的外部 service 時停止提示，不換 port、不 kill 外部 process，且只停止自己啟動的 server。

A－04 Phase 5 AI、正式對位 PNG 1:1、Chromium／Chrome、Medium 24pt／12pt 最終粗細與銳利度、Bold mixed `$`／`%`、輸入限制與 rollback，以及 A－01～03 regression 均 PASS；Jamie Chrome／Safari 手動驗證 PASS。Code Commit 前與 Commit 後 whitespace check 均 PASS。

## 23. A－05 正式 Template 實際落地狀態

樣式 A／`05_MSBN` 已完成獨立正式 renderer、共用薄 Viewer 的 A－05 route、直接 Launch、正式 runtime assets、Phase 5 AI 自我驗證及 Jamie Chrome／Safari 手動驗證。Code Commit 為 `f8eace3559eede0dd3fca83760a10062f6ed628e`（`feat(bn): add A05 MSBN template`）。

Code Commit 精確包含：

- `bn/templates/A/05-msbn.js`：A－05 獨立正式 renderer。
- `bn/launch/viewer.html`：共用薄 Viewer，最小增加 A－05 route，現支援 A－01～16。
- `bn/launch/A/05_MSBN.command`：A－05 直接啟動入口，Git mode 為 `100755`。
- `bn/assets/A/底圖/05_MSBN.png`：A－05 正式 runtime 底圖，intrinsic 1200 × 360。
- `bn/assets/A/對位/05_MSBN.png`：只供 Launch 視覺校稿的 1200 × 400 正式對位圖。

A－05 正式 Canvas 是 transparent 1200 × 400px；版位特定 dimension guard 要求 Canvas 精確為 1200 × 400、底圖 intrinsic dimensions 精確為 1200 × 360。底圖只以 `x: 0px; y: 20px; width: 1200px; height: 360px` 原尺寸 1:1 繪製，上下各保留 20px transparent 區域，不 Resize、不 Stretch、不 Scale-to-fit、不補邊，也不修改正式圖片。A－05 不使用「底圖尺寸等於 Canvas」的 guard。

三個正式 runtime frame 為主標 `118,113,370,43`、副標 `96,173,414,75`、保護文字 `96,266,414,23`。Photoshop 工作區原始 frame 為 `412,121,370,43`、`390,181,414,75`、`390,274,414,23`；Phase 2 依正式對位 PNG 確認一致轉換 `xLocal = xPhotoshop - 294`、`yLocal = yPhotoshop - 8`，並經 Jamie 批准使用上述 runtime local frame。

三組文字依完整 actual ink bbox 在各自 frame 中水平＋垂直置中。字級直接使用 Photoshop 原始 `pt`：主標 Medium 35pt、副標 ordinary Bold 37.5pt、同一副標欄位中的 `$`／`%` Bold 32pt、保護文字 Medium 19pt；顏色依序為 `#ffffff`、`#007661`、`#007661`、`#a6f4e6`。副標 ordinary 與 symbol runs 先組成單一 mixed-run group，再依合併後 actual ink bbox 整組置中，不建立 `$`／`%` 獨立欄位。

A－05 經自身 Phase 2 Investigation、Phase 3 Proposal 與 Jamie 批准採版位 local 2× Medium rendering。Renderer 建立 2400 × 800 temporary Canvas，只讓 Medium 35pt 主標與 Medium 19pt 保護文字經 2× rasterization 及 high-quality downsample；正式 1200 × 360 底圖、Bold 37.5pt ordinary subtitle 與 Bold 32pt `$`／`%` 維持正式 1×。此行為不改正式 pt、frame、座標、metrics、baseline、advance、glyph geometry、顏色或 opacity，只屬 A－05 版位特定行為，不是所有 BN、所有 Medium 或其他 Type 的 shared／global 規則。

Renderer 使用 actual bounding metrics 與 frame-fit validation，compositing 維持 `globalAlpha = 1`、`source-over`；不使用固定 offset、自動縮字、換行、裁切、字距補償或 scale-to-fit。Phase 5 實測主標 actual ink height 約比 43px frame 多 0.487px，保護文字約比 23px frame 多 0.633px；沒有為此修改字級、frame、baseline、scale 或加入 workaround。Jamie 已透過 Chrome／Safari 肉眼驗證接受並 PASS，因此兩項是已驗證接受的 subpixel Canvas metrics 差異，不是 unresolved blocker。

A－05 route 為 `viewer.html?type=A&bn=05_MSBN`。Canvas、Preview 與 overlay 均為 1200 × 400；對位 PNG 以原始 Alpha、同原點及原尺寸 1:1 疊加，不合成進正式 Canvas。Viewer 沿用三個 input、即時 render、IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限、超限 rollback 與 overlay toggle。

A－05 `.command` 固定使用 `127.0.0.1:4173`。正確 Viewer service 已存在時沿用；遇到不相符的外部 service 時停止提示，不換 port、不 kill 外部 process，且只停止自己啟動的 server。

A－05 Phase 5 AI、底圖 `0,20` placement、上下各 20px transparent 區域、正式對位 PNG 1:1、多組 `$`／`%` mixed runs、Chromium／Chrome、輸入限制與 rollback，以及 A－01～04 regression 均 PASS；Jamie Chrome／Safari 手動驗證 PASS。Code Commit 前與 Commit 後 whitespace check 均 PASS。

## 24. A－06 正式 Template 實際落地狀態

樣式 A／`06_IG` 已完成獨立正式 renderer、共用薄 Viewer 的 A－06 route、直接 Launch、正式 runtime assets、Phase 5 當時環境可執行的靜態／模擬驗證，以及 Jamie Chrome／Safari 最終手動驗證。Jamie 已明確回覆 PASS。Code Commit 為 `ecd27603408c42c55113b2afbc3fbd14532dc969`（`feat(bn): add A06 IG template`）。

Code Commit 精確包含：

- `bn/templates/A/06-ig.js`：A－06 獨立正式 renderer。
- `bn/launch/viewer.html`：共用薄 Viewer，最小增加 A－06 route，現支援 A－01～16。
- `bn/launch/A/06_IG.command`：A－06 直接啟動入口，Git mode 為 `100755`。
- `bn/assets/A/底圖/06_IG.jpg`：A－06 正式 900 × 1600 runtime 底圖。
- `bn/assets/A/對位/06_IG.png`：只供 Launch 視覺校稿的 900 × 1600 正式對位圖。

A－06 正式 Canvas 為 900 × 1600px；底圖只以 `x: 0px; y: 0px; width: 900px; height: 1600px` 原尺寸 1:1 繪製，不 Resize、不 Stretch、不 Crop、不補邊，也不 Scale-to-fit。三個正式 runtime frame 為主標 `175,387,550,65`、副標 `136,472,630,82`、保護文字 `136,573,630,37`。Photoshop 工作區原始 frame 為 `713,416,550,65`、`674,501,630,82`、`674,602,630,37`；Phase 2 依正式對位 PNG 確認一致轉換 `xLocal = xPhotoshop - 538`、`yLocal = yPhotoshop - 29`，renderer 不使用 Photoshop 工作區座標作為 runtime frame。

三組文字依完整 actual ink bbox 在各自 frame 中水平及垂直置中。字級直接使用 Photoshop 原始 `pt`：主標 Medium 52.5pt、副標 ordinary Bold 65pt、同一副標欄位中的 `$`／`%` Bold 55pt、保護文字 Medium 30pt；顏色依序為 `#ffffff`、`#fff285`、`#fff285`、`#a6f4e6`。副標 ordinary／symbol runs 依 advance width 排成連續 group，symbols 使用相鄰 ordinary glyph actual ink-bottom baseline 邏輯，再依完整 mixed-run actual ink bbox 整組置中；`$`／`%` 不是獨立 Editor 欄位。

A－06 經自身 Investigation、Proposal 與 Jamie 批准採版位 local 2× Medium rendering。Renderer 建立 1800 × 3200 temporary Canvas，context 使用 `scale(2, 2)`，只讓 Medium 52.5pt 主標與 Medium 30pt 保護文字經 high-quality downsample；正式 JPEG 底圖、Bold 65pt ordinary subtitle 與 Bold 55pt `$`／`%` 維持正式 1×。此行為不改正式 pt、frame、座標、metrics、baseline、advance、glyph geometry、顏色或 opacity，只屬 A－06 版位特定行為，不是全 BN、全 Type A、全 Medium 或其他 Type 的 shared／global 規則。

A－06 route 為 `viewer.html?type=A&bn=06_IG`。Canvas、Preview 與 overlay 均為 900 × 1600；對位 PNG 以原始 Alpha、同原點、原尺寸 1:1、CSS opacity 1 疊加，不合成進正式 Canvas。對位 PNG 額外 `(161,282)–(741,364)`、580 × 82 Alpha component 只屬 overlay 校稿內容，不是第四個文字欄位、input 或 renderer layer。Viewer 沿用三個 input、即時 render、IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限、超限 rollback、overlay toggle、dynamic dimensions 與圖片 decode／intrinsic dimension guard。

A－06 `.command` 固定使用 `127.0.0.1:4173`。正確 Viewer service 已存在時沿用；遇到不相符的外部 service 時停止提示，不換 port、不 kill 外部 process，且只停止自己啟動的 server。

Codex Phase 5 當時因 Chrome Browser 實例不可用，沒有宣稱已自動完成真實 Chrome Canvas、Console、overlay 或 font metrics 驗證；已完成 renderer／Viewer 語法、尺寸、frames、pt、顏色、2×／1× 分層、底圖 guard、mixed-run 結構、overlay dimensions／Alpha components、HTTP resources、Launch 語法與 mode、A－01～05 檔案 regression 及 whitespace 等可執行的靜態／模擬驗證。其後 Jamie 已由 Finder 雙擊 A－06 `.command`，在 Chrome／Safari 完成最終實機手動驗證並明確 PASS，因此 A－06 已完成並通過人工驗收，不是 unresolved blocker。Code Commit 後 `git diff --check HEAD^ HEAD` PASS。

目前共用 Viewer 支援 A－01～16。既有 BN 控制台仍維持 placeholder Preview，尚未正式接入這十六個獨立 renderer；A－17 與 B／C／D 仍未落地。本次同步不建立 Registry、Framework、Build System、shared/common/base renderer，也不預先決定後續版位實作方式。

## 25. A－07 正式 Template 實際落地狀態

樣式 A／`07_FB POST` 已完成獨立正式 renderer、共用薄 Viewer 的 A－07 route、直接 Launch、正式 runtime assets、Phase 5 當時環境可執行的靜態／模擬驗證，以及 Jamie Chrome／Safari 最終手動驗證。Jamie 已明確回覆 PASS。Code Commit 為 `0a0b2c5c3d6d0d54258718c60287c4fefd4a1a9e`（`feat(bn): add A07 FB POST template`），且是在 Jamie 完成手動驗證後才建立。

Code Commit 精確包含：

- `bn/templates/A/07-fb-post.js`：A－07 獨立正式 renderer。
- `bn/launch/viewer.html`：共用薄 Viewer，最小增加 A－07 route，現支援 A－01～16。
- `bn/launch/A/07_FB POST.command`：A－07 直接啟動入口，Git mode 為 `100755`。
- `bn/assets/A/底圖/07_FB POST.jpg`：A－07 正式 1200 × 630 runtime 底圖。
- `bn/assets/A/對位/07_FB POST.png`：只供 Launch 視覺校稿的 1200 × 630 RGBA 正式對位圖。

A－07 正式 Canvas 為 1200 × 630px；底圖只以 `x: 0px; y: 0px; width: 1200px; height: 630px` 原尺寸 1:1、正式 1× 繪製，不 Resize、不 Stretch、不 Crop、不補邊、不 Scale-to-fit，也不加入 placement offset。三個正式 runtime frame 為主標 `54,266,405,49`、副標 `54,325,475,62`、保護文字 `54,401,475,28`。Photoshop 工作區原始 frame 為 `718,605,405,49`、`718,664,475,62`、`718,740,475,28`；Phase 2 依正式對位 PNG 確認一致轉換 `xLocal = xPhotoshop - 664`、`yLocal = yPhotoshop - 339`，renderer 不使用 Photoshop 工作區座標作為 runtime frame。

三組文字不是水平置中。Renderer 以 `actualBoundingBoxLeft` 修正 draw origin，使實際 glyph ink 左緣對齊各自 `frame.left = 54px`；垂直方向依 `actualBoundingBoxAscent`／`actualBoundingBoxDescent` 計算完整 actual ink bbox，再將完整 bbox 在各自 frame 內垂直置中。字級直接使用 Photoshop 原始 `pt`：主標 Medium 39pt、副標 ordinary Bold 49pt、同一副標欄位中的 `$`／`%` Bold 41pt、保護文字 Medium 22.5pt；顏色依序為 `#ffffff`、`#fff285`、`#fff285`、`#a6f4e6`，不建立人工 `pt → px` 換算。

副標 ordinary／symbol 先 token 化並依 advance width 排成連續 mixed-run group；symbols 使用相鄰 ordinary glyph actual ink-bottom baseline 邏輯。Renderer 計算完整 mixed group actual ink bbox 後，使整組 actual ink 左緣對齊副標 frame.left，並將完整 bbox 垂直置中，再逐 run 繪製。`$`／`%` 不是獨立 Editor 欄位；不存在 fixed symbol offset、字距補償、自動縮字、換行或裁切。

A－07 經自身 Investigation、Proposal 與 Jamie 批准採版位 local 2× Medium rendering。Renderer 建立 2400 × 1260 temporary Canvas，context 使用 `scale(2, 2)`，只讓 Medium 39pt 主標與 Medium 22.5pt 保護文字依原始 pt、正式 runtime frames 及相同 actual ink 定位邏輯繪製，再以 `imageSmoothingEnabled = true`、`imageSmoothingQuality = "high"` high-quality downsample 回正式 1200 × 630 Canvas。正式 JPEG 底圖、Bold 49pt ordinary subtitle 與 Bold 41pt `$`／`%` 維持正式 1×。此行為只屬 A－07 版位特定 rendering，不是全 BN、全 Medium 或其他 Type 的 shared／global 規則。

A－07 route 為 `viewer.html?type=A&bn=07_FB%20POST`，`URLSearchParams` 解碼後的 `bn` 值為 `07_FB POST`。Canvas、Preview 與 overlay 均為 1200 × 630；正式對位 PNG 以原始 Alpha、同原點、原尺寸 1:1、CSS opacity 1 疊加，不合成進正式 Canvas。對位 PNG 額外 `(54,201)–(419,253)`、365 × 52 component 只屬 overlay 校稿內容，不是第四個文字欄位、input、Editor field、runtime frame 或 renderer layer。Viewer 沿用三個 input、合法內容即時 render、IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限、超限 rollback、overlay toggle、dynamic dimensions 與圖片 decode／intrinsic dimension guard。

A－07 `.command` 固定使用 `127.0.0.1:4173` 開啟上述 URL。正確 Viewer service 已存在時沿用；遇到不相符的外部 service 時停止提示，不換 port、不 kill 外部 process，且只停止自己啟動的 server。Filesystem permission 為 755，Code Commit 中 Git executable mode 為 `100755`。

Codex Phase 5 完成 renderer／Viewer／Launch 語法、HTTP resources、圖片 dimensions／Alpha components、定位公式、local 2× 分層、mixed-run 結構與多組測試、frame-fit validation 結構、A－01～06 靜態 regression 及 `git diff --check` 等當時環境可執行的靜態／in-memory deterministic 模擬驗證。因受控 Chrome Browser extension／實例不可用，Codex 沒有取得或宣稱真實 Chrome Canvas actual font metrics、Console、overlay 視覺或 rasterization PASS；模擬數值不是 ShopeeNotoSans Browser actual metrics。

其後 Jamie 已由 Finder 雙擊 A－07 `.command`，在 Chrome／Safari 完成真實視覺、文字定位、Medium 39pt／22.5pt 粗細與銳利度、Bold 49pt／41pt mixed baseline、`$`／`%`、Overlay、輸入限制／rollback、中文 IME、Console 與 A－01～06 regression 的人工驗證，並明確回覆 PASS。因此 A－07 已完成並通過人工驗收，不是 unresolved blocker。Code Commit 的 `git diff --check HEAD^ HEAD` PASS。

目前共用 Viewer 支援 A－01～16。既有 BN 控制台仍維持 placeholder Preview，尚未正式接入這十六個獨立 renderer；A－17 與 B／C／D 仍未落地。本次同步不建立 Registry、Framework、Build System、shared/common/base renderer，也不預先決定後續版位實作方式。

## 26. A－08 正式 Template 實際落地狀態

樣式 A／`08_SPX TVBN_1` 已完成獨立正式 renderer、共用薄 Viewer 的 A－08 route、直接 Launch、正式 runtime assets、Phase 5 當時環境可執行的靜態／模擬驗證，以及 Jamie Chrome／Safari 最終手動驗證。Jamie 已明確回覆 PASS。Code Commit 為 `feb2a5b38952b365f1c84daf768dd762f147316d`（`feat(bn): add A08 SPX TVBN 1 template`），且是在 Jamie 完成手動驗證後才建立。

Code Commit 精確包含：

- `bn/templates/A/08-spx-tvbn-1.js`：A－08 獨立正式 renderer。
- `bn/launch/viewer.html`：共用薄 Viewer，最小增加 A－08 route，現支援 A－01～16。
- `bn/launch/A/08_SPX TVBN_1.command`：A－08 直接啟動入口，Git mode 為 `100755`。
- `bn/assets/A/底圖/08_SPX TVBN_1.jpg`：A－08 正式 1080 × 1920 runtime 底圖。
- `bn/assets/A/對位/08_SPX TVBN_1.png`：只供 Launch 視覺校稿的 1080 × 1920 RGBA 正式對位圖。

A－08 正式 Canvas 為 1080 × 1920px；底圖只以 `x: 0px; y: 0px; width: 1080px; height: 1920px` 原尺寸 1:1、正式 1× 繪製，不 Resize、不 Stretch、不 Crop、不補邊、不 Scale-to-fit，也不加入 placement offset。三個正式 runtime frame 為主標 `167,507,745,87`、副標 `94,619,890,114`、保護文字 `94,759,890,51`。Photoshop 工作區原始 frame 為 `1047,507,745,87`、`974,619,890,114`、`974,759,890,51`；Phase 2 依正式對位 PNG 確認一致轉換 `xLocal = xPhotoshop - 880`、`yLocal = yPhotoshop`，renderer 不使用 Photoshop 工作區座標作為 runtime frame。

三組文字依完整 actual ink bbox 水平＋垂直置中。Renderer 使用 `actualBoundingBoxLeft`／`Right`／`Ascent`／`Descent` 計算完整 ink bbox，不以單純 `textAlign: center`、固定 baseline 或 top-left positioning 取代 actual ink 計算。字級直接使用 Photoshop 原始 `pt`：主標 Medium 70pt、副標 ordinary Bold 90pt、同一副標欄位中的 `$`／`%` Bold 75pt、保護文字 Medium 40pt；顏色依序為 `#ffffff`、`#fff285`、`#fff285`、`#a6f4e6`，不建立人工 `pt → px` 換算。

副標 ordinary／symbol 先 token 化並依 advance width 排成連續 mixed-run group；symbols 使用相鄰 ordinary glyph actual ink-bottom baseline 邏輯。Renderer 計算完整 mixed group actual ink bbox 後將整組水平＋垂直置中，再逐 run 繪製。`$`／`%` 不是獨立 Editor 欄位；不存在 fixed symbol offset、字距補償、自動縮字、換行或裁切。

A－08 經自身 Phase 1／2、Proposal 與 Jamie 批准採版位 local 2× Medium rendering。Renderer 建立 2160 × 3840 temporary Canvas，context 使用 `scale(2, 2)`，只讓 Medium 70pt 主標與 Medium 40pt 保護文字依原始 pt、正式 runtime frames 及相同 actual ink 置中邏輯繪製，再以 high-quality downsample 回正式 1080 × 1920 Canvas。正式 JPEG 底圖、Bold 90pt ordinary subtitle 與 Bold 75pt `$`／`%` 維持正式 1×；繪製順序為底圖 1×、transparent Medium layer 縮回合成、Bold mixed subtitle 1×。此行為只屬 A－08 版位特定 rendering，不是全 BN、全 Medium 或其他 Type 的 shared／global 規則。

A－08 route 為 `viewer.html?type=A&bn=08_SPX%20TVBN_1`，解碼後為 `type=A`、`bn=08_SPX TVBN_1`。Canvas、Preview 與 overlay 均為 1080 × 1920；正式對位 PNG 以原始 Alpha、同原點、原尺寸 1:1、CSS opacity 1 疊加，不合成進正式 Canvas。對位 PNG 額外 `(147,364)–(932,476)`、785 × 112 component 只屬 overlay 校稿內容，不是第四個文字欄位、input、Editor field、runtime frame 或 renderer layer。保護文字正式 frame `94,759,890,51` 與高 Alpha component `(94,760)–(984,810)`、890 × 50 的 1px 差異保持原樣；沒有新增 frame、offset、baseline 或其他 workaround，Jamie 已實機接受並 PASS。

Viewer 沿用三個 input、合法內容即時 render、IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限、超限 rollback、overlay toggle、dynamic dimensions 與圖片 decode／intrinsic dimension guard。A－08 `.command` 固定使用 `127.0.0.1:4173`；正確 Viewer service 已存在時沿用，遇到不相符的外部 service 時停止提示，不換 port、不 kill 外部 process，必要時使用 `/usr/bin/python3 -m http.server`，且只停止自己啟動的 server。Filesystem permission 為 755，Code Commit 中 Git mode 為 `100755`。

Codex Phase 5 完成 renderer／Viewer／Launch 語法、HTTP resources、圖片 dimensions／Alpha components、定位公式、local 2× 分層、mixed-run 結構、frame-fit validation、deterministic mock、A－01～07 靜態 regression、whitespace 與 Git Scope 等當時環境可執行的靜態／模擬驗證。因 Chrome extension／native host 當時不可用，Codex 沒有取得或宣稱真實 Chrome Canvas ShopeeNotoSans font metrics、Console、overlay／Photoshop 視覺、Medium rasterization 或真實 mixed baseline PASS；mock metrics 不是 Browser actual font metrics。

其後 Jamie 已由 Finder 雙擊 A－08 `.command`，在 Chrome／Safari 完成真實 Canvas、overlay、文字定位、Medium 70pt／40pt 粗細與銳利度、Bold 90pt／75pt mixed baseline、不同位置的 `$`／`%`、已知 1px 對位差異、輸入限制／rollback、中文 IME、Console 與 A－01～07 regression 的人工驗證，並明確回覆 PASS。因此 A－08 已完成並通過人工驗收，不是 unresolved blocker。Code Commit 的 `git diff --check HEAD^ HEAD` PASS。

目前共用 Viewer 支援 A－01～16。既有 BN 控制台仍維持 placeholder Preview，尚未正式接入這十六個獨立 renderer；A－17 與 B／C／D 仍未落地。本次同步不建立 Registry、Framework、Build System、shared/common/base renderer，也不預先決定後續版位實作方式。

## 27. A－09 正式 Template 實際落地狀態

樣式 A／`09_SPX TVBN_2` 已完成獨立正式 renderer、共用薄 Viewer 的 A－09 route、直接 Launch、正式 runtime assets、Phase 5 當時環境可執行的靜態／模擬驗證，以及 Jamie Chrome／Safari 最終手動驗證。Jamie 已明確回覆 PASS。Code Commit 為 `c32f1c5e02fc772b918133d4e35a0df0e75485f0`（`feat(bn): add A09 SPX TVBN 2 template`），且是在 Jamie 完成手動驗證後才建立。

Code Commit 精確包含：

- `bn/templates/A/09-spx-tvbn-2.js`：A－09 獨立正式 renderer。
- `bn/launch/viewer.html`：共用薄 Viewer，最小增加 A－09 route，現支援 A－01～16。
- `bn/launch/A/09_SPX TVBN_2.command`：A－09 直接啟動入口，Git mode 為 `100755`。
- `bn/assets/A/底圖/09_SPX TVBN_2.jpg`：A－09 正式 1599 × 1080 runtime 底圖。
- `bn/assets/A/對位/09_SPX TVBN_2.png`：只供 Launch 視覺校稿的 1599 × 1080 RGBA 正式對位圖。

A－09 正式 Canvas 為 1599 × 1080px；底圖只以 `x: 0px; y: 0px; width: 1599px; height: 1080px` 原尺寸 1:1、正式 1× 繪製，不 Resize、不 Stretch、不 Crop、不補邊、不 Scale-to-fit，也不加入 placement offset。三個正式 runtime frame 為主標 `51,465,620,75`、副標 `51,557,740,97`、保護文字 `51,674,740,44`。Photoshop 工作區原始 frame 為 `322,916,620,75`、`322,1008,740,97`、`322,1125,740,44`；Phase 2 依正式對位 PNG 確認一致轉換 `xLocal = xPhotoshop - 271`、`yLocal = yPhotoshop - 451`，renderer 不使用 Photoshop 工作區座標作為 runtime frame。

三組文字不是水平置中。Renderer 使用 `measureText()` 的 `actualBoundingBoxLeft`／`Right`／`Ascent`／`Descent`，以 `actualBoundingBoxLeft` 修正 draw origin，使實際 glyph ink 左緣對齊各自 `frame.left = 51px`；垂直方向依完整 actual ink bbox 在各自 frame 中置中。字級直接使用 Photoshop 原始 `pt`：主標 Medium 60pt、副標 ordinary Bold 76pt、同一副標欄位中的 `$`／`%` Bold 65pt、保護文字 Medium 35pt；顏色依序為 `#ffffff`、`#fff285`、`#fff285`、`#a6f4e6`，不建立人工 `pt → px` 換算。

副標 ordinary／symbol 先 token 化並依 advance width 排成連續 mixed-run group；symbols 使用相鄰 ordinary glyph actual ink-bottom baseline 邏輯。Renderer 計算完整 mixed group actual ink bbox 後，使整組 actual ink 左緣對齊副標 frame.left，並將完整 bbox 垂直置中，再逐 run 繪製。`$`／`%` 不是獨立 Editor 欄位；不存在 fixed symbol offset、字距補償、自動縮字、換行或裁切。

A－09 經自身 Phase 1／2、Proposal 與 Jamie 批准採版位 local 2× Medium rendering。Renderer 建立 3198 × 2160 transparent temporary Canvas，context 使用 `scale(2, 2)`，只讓 Medium 60pt 主標與 Medium 35pt 保護文字依原始 pt、正式 runtime frames 及相同 actual ink 定位邏輯繪製，再以 high-quality downsample 回正式 1599 × 1080 Canvas。正式 JPEG 底圖、Bold 76pt ordinary subtitle 與 Bold 65pt `$`／`%` 維持正式 1×；繪製順序為底圖 1×、transparent Medium layer 縮回合成、Bold mixed subtitle 1×，正式 compositing 使用 `globalAlpha = 1` 與 `source-over`。此行為只屬 A－09 版位特定 rendering，不是全 BN、全 Medium 或其他 Type 的 shared／global 規則。

A－09 route 為 `viewer.html?type=A&bn=09_SPX%20TVBN_2`，解碼後為 `type=A`、`bn=09_SPX TVBN_2`。Canvas、Preview 與 overlay 均為 1599 × 1080；正式對位 PNG 以原始 Alpha、同原點、原尺寸 1:1、CSS opacity 1 疊加，不合成進正式 Canvas。對位 PNG 額外 `(51,362)–(620,443)`、569 × 81 component 只屬 overlay 校稿內容，不是第四個文字欄位、input、Editor field、runtime frame 或 renderer layer；其餘正式 components 為主標 `(51,465)–(671,540)`、副標 `(51,557)–(791,654)`、保護文字 `(51,674)–(791,718)`。

Viewer 沿用三個 input、合法內容即時 render、IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限、超限 rollback、overlay toggle、dynamic dimensions 與圖片 decode／intrinsic dimension guard。A－09 `.command` 固定使用 `127.0.0.1:4173`；正確 Viewer service 已存在時沿用，遇到不相符的外部 service 時停止提示，不換 port、不 kill 外部 process，必要時使用 `/usr/bin/python3 -m http.server`，且只停止自己啟動的 server。Filesystem permission 為 755，Code Commit 中 Git mode 為 `100755`。

Codex Phase 5 完成 renderer／Viewer／Launch 語法、HTTP resources、圖片 decode／dimensions／Alpha components、正式 frames、actual-ink 定位公式、local 2× 分層、mixed-run deterministic／in-memory 模擬、Viewer 靜態邏輯、A－01～08 regression、whitespace 與 Git Scope 等當時環境可執行的驗證。因受控 Chrome extension／native host 當時不可用，Codex 沒有取得或宣稱真實 Chrome ShopeeNotoSans actual font metrics、Console、Canvas＋overlay／Photoshop 視覺、Medium rasterization、Chrome／Safari rasterization 或真實中文 IME PASS；deterministic 假 metrics 不是 Browser actual font metrics。

其後 Jamie 已由 Finder 雙擊 A－09 `.command`，在 Chrome／Safari 完成真實 Canvas、overlay、actual-ink 文字定位、Medium 60pt／35pt 粗細與銳利度、Bold 76pt／65pt mixed baseline、不同位置的 `$`／`%`、輸入限制／rollback、真實中文 IME、Console 與 A－01～08 regression 的人工驗證，並明確回覆 PASS。因此 A－09 已完成並通過人工驗收，不是 unresolved blocker。Photoshop 完成參考圖 `/Users/jamie/Downloads/A-assets/09_SPX TVBN_2.jpg` 僅作唯讀視覺基準，不是 runtime asset。Code Commit 的 `git diff --check HEAD^ HEAD` PASS。

目前共用 Viewer 支援 A－01～16。既有 BN 控制台仍維持 placeholder Preview，尚未正式接入這十六個獨立 renderer；A－17 與 B／C／D 仍未落地。本次同步不建立 Registry、Framework、Build System、shared/common/base renderer，也不預先決定後續版位實作方式。

## 28. A－10 正式 Template 實際落地狀態

樣式 A／`10_POP UP` 已完成獨立正式 renderer、共用薄 Viewer 的 A－10 route、直接 Launch、正式 runtime assets、Phase 5 當時環境可執行的靜態／deterministic 驗證，以及 Jamie Chrome／Safari 最終手動驗證。Jamie 已明確回覆 PASS。Code Commit 為 `92aebac0b014c17094ea0401808ba0ab505a4dfe`（`feat(bn): add A10 POP UP template`），且是在 Jamie 完成手動驗證後才建立；`git diff --check HEAD^ HEAD` PASS。

Code Commit 精確包含：

- `bn/templates/A/10-pop-up.js`：A－10 獨立正式 renderer。
- `bn/launch/viewer.html`：共用薄 Viewer，最小增加 A－10 route，現支援 A－01～16。
- `bn/launch/A/10_POP UP.command`：A－10 直接啟動入口，Git mode 為 `100755`。
- `bn/assets/A/底圖/10_POP UP.png`：A－10 正式 475 × 673 RGBA runtime 底圖。
- `bn/assets/A/對位/10_POP UP.png`：只供 Launch 視覺校稿的 580 × 720 RGBA 正式對位圖。

A－10 正式 Canvas 為 transparent 580 × 720px；版位特定 dimension guard 分別要求 Canvas 精確為 580 × 720、底圖 intrinsic dimensions 精確為 475 × 673。底圖只以 `x: 53px; y: 27px; width: 475px; height: 673px` 原尺寸 1:1、正式 1× 繪製，不 Resize、不 Stretch、不 Crop、不補邊、不 Scale-to-fit，也不使用「底圖尺寸等於 Canvas」的一般 guard。

三個正式 runtime frame 為主標 `129,128,323,38`、副標 `85,181,410,51`、保護文字 `85,242,410,25`。Photoshop 工作區原始 frame 為 `565,759,323,38`、`521,812,410,51`、`521,873,410,25`；Phase 2 確認一致轉換 `xLocal = xPhotoshop - 436`、`yLocal = yPhotoshop - 631`，renderer 不使用 Photoshop 工作區座標作為 runtime frame。

三組文字使用 `measureText()` 的 `actualBoundingBoxLeft`／`Right`／`Ascent`／`Descent` 計算完整 actual ink bbox，再於各自 frame 內水平＋垂直置中；不是單純 `textAlign: center`、靠左、top alignment、固定 baseline 或 fixed offset。字級直接使用 Photoshop 原始 `pt`：主標 Medium 30pt、副標 ordinary Bold 40pt、同一副標欄位中的 `$`／`%` Bold 35pt、保護文字 Medium 20pt；顏色依序為 `#ffffff`、`#fff285`、`#fff285`、`#a6f4e6`，不建立人工 `pt → px` 換算。

副標 ordinary／symbol 先 token 化並依 advance width 排成連續 mixed-run group；symbols 使用相鄰 ordinary glyph actual ink-bottom baseline 邏輯。Renderer 計算完整 mixed group actual ink bbox 後將整組水平＋垂直置中，再逐 run 繪製。`$`／`%` 不是獨立 Editor 欄位；不存在 fixed symbol offset、spacing compensation、自動縮字、換行或裁切。

A－10 經自身 Requirement、Investigation、Proposal 與 Jamie 批准採版位 local 2× Medium rendering。Renderer 建立 1160 × 1440 transparent temporary Canvas，context 使用 `scale(2, 2)`，只讓 Medium 30pt 主標與 Medium 20pt 保護文字依原始 pt、正式 runtime frames 及相同 actual ink 置中邏輯繪製，再以 high-quality downsample 回正式 580 × 720 Canvas。正式 PNG 底圖、Bold 40pt ordinary subtitle 與 Bold 35pt `$`／`%` 維持正式 1×；繪製順序為底圖 `53,27,475,673` 正式 1×、transparent Medium layer 縮回合成、Bold mixed subtitle 1×，正式 compositing 使用 `globalAlpha = 1` 與 `source-over`。此行為只屬 A－10 版位特定 rendering，不是全 BN、全 Medium 或其他 Type 的 shared／global 規則。

底部「逛逛去 ▶」是正式底圖內的固定圖像內容，不是第四個文字欄位、input、Editor field、runtime frame 或 renderer text layer；renderer 不重繪 CTA。

A－10 route 為 `viewer.html?type=A&bn=10_POP%20UP`，解碼後為 `type=A`、`bn=10_POP UP`。Canvas、Preview 與 overlay 均為 580 × 720；正式對位 PNG 以原始 Alpha、同原點、原尺寸 1:1、CSS opacity 1 疊加，不合成進正式 Canvas。Viewer 沿用三個 input、合法內容即時 render、IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限、超限 rollback、overlay toggle、dynamic dimensions 與圖片 decode／intrinsic dimension guard。

A－10 `.command` 固定使用 `127.0.0.1:4173`；正確 Viewer service 已存在時沿用，遇到不相符的外部 service 時停止提示，不換 port、不 kill 外部 process，必要時使用 `/usr/bin/python3 -m http.server`，且只停止自己啟動的 server。Filesystem permission 為 755，Code Commit 中 Git mode 為 `100755`。

Codex Phase 5 完成 renderer／Viewer／Launch 語法、正式 assets decode／dimensions、底圖 placement、transparent Canvas 邊界、runtime frames、actual-ink 置中公式、local 2× 分層、mixed-run deterministic／in-memory 模擬、Viewer input／IME／rollback 靜態邏輯、HTTP resources、A－01～09 regression、whitespace 與 Git Scope 等當時環境可執行的驗證。因受控 Chrome extension／native host 當時不可用，Codex 沒有取得或宣稱真實 Browser actual font metrics、Console、rasterization、Canvas＋overlay／Photoshop 視覺或真實中文 IME PASS。

其後 Jamie 已由 Finder 雙擊 A－10 `.command`，在 Chrome／Safari 完成底圖 placement、透明邊界、固定 CTA、三欄 actual-ink 定位、Medium 30pt／20pt 粗細與銳利度、Bold 40pt／35pt mixed baseline、不同位置的 `$`／`%`、正式 overlay、輸入限制／rollback、真實中文 IME、Console 與必要 regression 的實機驗證，並明確回覆 PASS。因此 A－10 已完成並通過人工驗收，不是 unresolved blocker。

目前共用 Viewer 支援 A－01～16。既有 BN 控制台仍維持 placeholder Preview，尚未正式接入這十六個獨立 renderer；A－17 與 B／C／D 仍未落地。本次同步不建立 Registry、Framework、Build System、shared/common/base renderer，也不預先決定後續版位實作方式。

## 29. A－11 正式 Template 實際落地狀態

樣式 A／`11_Line OA` 已完成獨立正式 renderer、共用薄 Viewer 的 A－11 route、直接 Launch、正式 runtime assets、Phase 5 當時環境可執行的驗證、frame-fit Bug Investigation 與最小 Bug Fix／Re-validation，以及 Jamie Chrome／Safari 最終手動驗證。Jamie 已明確回覆 PASS。Code Commit 為 `91cecef9b24867fd7e8a885e8346beb580e56ed7`（`feat(bn): add A11 Line OA template`），且是在 Jamie 完成手動驗證後才建立；`git diff --check HEAD^ HEAD` PASS。

Code Commit 精確包含：

- `bn/templates/A/11-line-oa.js`：A－11 獨立正式 renderer。
- `bn/launch/viewer.html`：共用薄 Viewer，最小增加 A－11 route 與正式 Regular WOFF2 mapping，現支援 A－01～16。
- `bn/launch/A/11_Line OA.command`：A－11 直接啟動入口，Git mode 為 `100755`。
- `bn/assets/A/底圖/11_Line OA.png`：A－11 正式 1016 × 1007 RGBA runtime 底圖。
- `bn/assets/A/對位/11_Line OA.png`：只供 Launch 視覺校稿的 1040 × 1040 RGBA 正式對位圖。

A－11 正式 Canvas 為 transparent 1040 × 1040px；版位特定 dimension guard 分別要求 Canvas 精確為 1040 × 1040、底圖 intrinsic dimensions 精確為 1016 × 1007。底圖只以 `x: 12px; y: 12px; width: 1016px; height: 1007px` 原尺寸 1:1、正式 1× 繪製，不 Resize、不 Stretch、不 Crop、不補邊、不 Scale-to-fit，也不使用「底圖尺寸等於 Canvas」的一般 guard。

三個正式 runtime frame 為主標 `230,154,580,68`、副標 `180,240,680,86`、保護文字 `180,345,680,37`。Photoshop 工作區原始 frame 為 `503,696,580,68`、`453,782,680,86`、`453,887,680,37`；Phase 2 確認一致轉換 `xLocal = xPhotoshop - 273`、`yLocal = yPhotoshop - 542`，renderer 不使用 Photoshop 工作區座標作為 runtime frame。

三組文字使用 `measureText()` 的 `actualBoundingBoxLeft`／`Right`／`Ascent`／`Descent` 計算完整 actual ink bbox，再於各自 frame 內水平＋垂直置中。字級直接使用 Photoshop 原始 `pt`：主標 Medium 55pt、副標 ordinary Bold 68pt、同一副標欄位中的 `$`／`%` Bold 60pt、保護文字 Regular 30pt；顏色依序為 `#ffffff`、`#fff285`、`#fff285`、`#a6f4e6`。保護文字正式使用 Regular／weight 400，不是 Medium；Viewer 因此最小新增正式 `ShopeeNotoSans Regular` WOFF2 `@font-face` mapping，既有 Medium／Bold mapping 不變。

副標 ordinary／symbol 先 token 化並依 advance width 排成連續 mixed-run group；symbols 使用相鄰 ordinary glyph actual ink-bottom baseline 邏輯。Renderer 計算完整 mixed group actual ink bbox 後將整組水平＋垂直置中，再逐 run 繪製。`$`／`%` 不是獨立 Editor 欄位；不存在 fixed symbol offset、spacing compensation、自動縮字、換行或裁切。

A－11 經自身 Requirement、Investigation、Proposal 與 Jamie 批准採版位 local 2× Medium rendering。Renderer 建立 2080 × 2080 transparent temporary Canvas，context 使用 `scale(2, 2)`，只讓 Medium 55pt 主標依原始 pt、正式 runtime frame 及相同 actual ink 置中邏輯繪製，再以 high-quality downsample 回正式 1040 × 1040 Canvas。Regular 30pt 保護文字、Bold 68pt ordinary subtitle、Bold 60pt `$`／`%` 與正式 PNG 底圖維持正式 1×；繪製順序為底圖 `12,12,1016,1007` 正式 1×、transparent Medium 主標 layer 縮回合成、Regular 保護文字 1×、Bold mixed subtitle 1×，正式 compositing 使用 `globalAlpha = 1` 與 `source-over`。此行為只屬 A－11 版位特定 rendering，不是全 BN、全 Medium 或其他 Type 的 shared／global 規則。

右上 Shopee Logo／「蝦皮購物」與底部「逛逛去 ▶」都是正式底圖內固定圖像內容，不是第四個文字欄位、input、Editor field、runtime frame 或 renderer text layer。

A－11 初版對 `fitsWidth: false` 或 `fitsHeight: false` 採 hard-stop，Jamie 實機因而遇到主標 frame-fit 停止訊息。Bug Investigation 確認 local 2× measurement 沒有 double scaling、actual-ink 置中公式未發現錯誤、font family／weight／font-ready mapping 一致；直接停止原因是 A－11 新增的零容忍 frame-fit policy。正式 Bug Fix 後仍真實計算並回傳三欄的 ink geometry 與 `fitsWidth`／`fitsHeight`，false 不被強制改成 true，但 frame-fit 改為非阻擋式 validation，文字仍依原 actual-ink 置中座標 render。Canvas／Image／decode／intrinsic dimensions／placement／frame geometry／2D context／temporary Canvas／font-ready／non-finite TextMetrics 等真正安全 guard 仍維持 hard-stop；沒有新增 epsilon、tolerance、offset、縮字、換行、裁切、scale compensation 或 Browser-specific workaround。

A－11 route 為 `viewer.html?type=A&bn=11_Line%20OA`。Canvas、Preview 與 overlay 均為 1040 × 1040；正式對位 PNG 以原始 Alpha、同原點、原尺寸 1:1、CSS opacity 1 疊加，不合成進正式 Canvas。Viewer 沿用三個 input、合法內容即時 render、IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限、超限 rollback、overlay toggle、dynamic dimensions 與圖片 decode／intrinsic dimension guard。

A－11 `.command` 固定使用 `127.0.0.1:4173`；正確 Viewer service 已存在時沿用，遇到不相符的外部 service 時停止提示，不換 port、不 kill 外部 process，必要時使用 `/usr/bin/python3 -m http.server`，且只停止自己啟動的 server。Filesystem permission 為 755，Code Commit 中 Git mode 為 `100755`。

Codex 完成 renderer module／Viewer／Launch 語法、HTTP resources、圖片 decode／dimensions／Alpha、底圖 placement、runtime frames、WOFF2 mapping、local 2×／1× 分層、mixed-run deterministic 測試、frame-fit validation policy、真正 hard-stop guards、A－01～10 regression、whitespace 與 Git Scope 等當時環境可執行的驗證。受控 Chrome 不可用時，Codex 沒有取得或宣稱真實 Browser actual TextMetrics、Console、rasterization、真實中文 IME 或視覺 PASS。

其後 Jamie 已由 Finder 雙擊 A－11 `.command`，在 Chrome／Safari 完成 Bug Fix 後的正式 Canvas、底圖 placement、固定 Logo／CTA、三欄 actual-ink 定位、Medium 55pt、Regular 30pt、Bold 68pt／60pt mixed baseline、`$`／`%`、正式 overlay、輸入限制／rollback、真實中文 IME、Console 與必要 regression 的實機驗證，並明確回覆 PASS。因此 A－11 已完成並通過人工驗收，不是 unresolved blocker。

目前共用 Viewer 支援 A－01～16。既有 BN 控制台仍維持 placeholder Preview，尚未正式接入這十六個獨立 renderer；A－17 與 B／C／D 仍未落地。本次同步不建立 Registry、Framework、Build System、shared/common/base renderer，也不預先決定後續版位實作方式。

## 30. A－12 正式 Template 實際落地狀態

樣式 A／`12_LPBN` 已完成獨立正式 renderer、共用薄 Viewer 的 A－12 route、Finder Launch、正式 runtime assets、Phase 5 AI 自我驗證，以及 Jamie Chrome／Safari 最終手動驗證。Jamie 已明確回覆 PASS。Code Commit 為 `828a9539d2d0048815671243e7c9ad50b600067b`（`feat(bn): add A12 LPBN template`），且是在 Jamie 完成手動驗證後才建立；`git diff --check HEAD^ HEAD` PASS。

Code Commit 精確包含：

- `bn/templates/A/12-lpbn.js`：A－12 獨立正式 renderer。
- `bn/launch/viewer.html`：共用薄 Viewer，最小增加 A－12 route，現支援 A－01～16。
- `bn/launch/A/12_LPBN.command`：A－12 直接啟動入口，Git mode 為 `100755`。
- `bn/assets/A/底圖/12_LPBN.jpg`：A－12 正式 1200 × 550 JPEG runtime 底圖。
- `bn/assets/A/對位/12_LPBN.png`：只供 Launch 視覺校稿的 1200 × 550 RGBA 正式對位圖。

A－12 正式 Canvas 為 transparent 1200 × 550px。正式底圖 intrinsic dimensions 為 1200 × 550，只以 `x: 0px; y: 0px; width: 1200px; height: 550px` 原尺寸 1:1、正式 1× 繪製，不 Resize、不 Stretch、不 Crop、不補邊、不 Scale-to-fit，也不加入額外 offset。正式對位 PNG 保留原始 Alpha，以相同原點、原尺寸 1:1、CSS opacity 1 疊加，只供 Viewer 校稿，不合成進正式 Canvas。

三個正式 runtime frame 為主標 `58,226,405,49`、副標 `58,285,475,62`、保護文字 `58,360,475,28`。Photoshop 工作區原始 frame 為 `665,401,405,49`、`665,460,475,62`、`665,535,475,28`；歷史座標轉換為 `xLocal = xPhotoshop - 607`、`yLocal = yPhotoshop - 175`，renderer 直接使用 runtime frames。

三欄使用 `measureText()` 的 `actualBoundingBoxLeft`／`Right`／`Ascent`／`Descent` 計算完整 actual ink bbox；水平方向以 actual ink 左緣精確對齊各自 `frame.left`，垂直方向則將完整 actual ink bbox 置中於 frame。字級直接使用 Photoshop 原始 `pt`：主標 Medium 39pt、副標 ordinary Bold 49pt、同一副標 input 中的 `$`／`%` Bold 42pt、保護文字 Medium 22.5pt；顏色依序為 `#ffffff`、`#fff285`、`#fff285`、`#a6f4e6`，沒有人工 `pt → px` 換算。

副標 ordinary／symbol runs 依 advance width 連續排列。`$` baseline 優先參考後方 ordinary glyph actual ink-bottom，無後方時回退前方；`%` 優先參考前方 ordinary glyph，無前方時回退後方。合併完整 mixed group actual ink bbox 後，整組採 actual ink 左對齊並垂直置中，支援 symbol 位於開頭、中間或結尾；沒有獨立 symbol input、fixed offset、spacing compensation、自動縮字、換行或裁切。

A－12 採版位 local 2× Medium rendering。Renderer 建立 2400 × 1100 transparent temporary Canvas，context 使用 `scale(2, 2)`，只讓 Medium 39pt 主標與 Medium 22.5pt 保護文字依原始 pt、正式 runtime frames 及相同 actual-ink 定位邏輯繪製，再以 high-quality downsample 回正式 1200 × 550 Canvas。正式 JPEG 底圖、Bold 49pt ordinary subtitle 與 Bold 42pt `$`／`%` 維持正式 1×；繪製順序為底圖正式 1×、transparent Medium local 2× layer 縮回合成、Bold mixed subtitle 正式 1×，正式 compositing 使用 `globalAlpha = 1` 與 `source-over`。此行為只屬 A－12，不是全 BN、全 Medium 或其他 Type 的 shared／global 規則。

A－12 延續 A－11 最終 frame-fit policy：三欄的 `inkWidth`、`inkHeight`、`inkLeft`、`inkTop`、`inkRight`、`inkBottom`、`fitsWidth` 與 `fitsHeight` 依真實 actual ink metrics 如實計算並回傳；false 不被強制改成 true，也不阻擋 render。Canvas／Image／context、decode、intrinsic dimensions、placement／frame geometry、temporary Canvas dimensions、font-ready 與 non-finite TextMetrics 等結構性錯誤仍維持 hard-stop。Font-ready 沿用正式 Medium／Bold WOFF2 mapping，使用 `document.fonts.load()`／`check()` 檢查四組正式 font specification，未 ready 不 fallback。

對位圖另有 `(58,161)–(423,213)`、365 × 52 Alpha component，只屬 overlay 校稿內容，不是第四個文字欄位、input、runtime frame 或 renderer text layer。

A－12 route 為 `viewer.html?type=A&bn=12_LPBN`。Canvas、Preview 與 overlay 均為 1200 × 550；Viewer 沿用三個 input、合法內容即時 render、IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限、超限 rollback、overlay toggle 與 dynamic dimensions。

A－12 `.command` 固定使用 `127.0.0.1:4173`；正確 Viewer service 已存在時沿用，遇到不相符的外部 service 時停止提示，不換 port、不 kill 外部 process，且只停止自己啟動的 server。Filesystem permission 為 755，Code Commit 中 Git mode 為 `100755`。

Codex Phase 5 已完成 renderer／Viewer／command 語法、HTTP resources、assets、dimensions、placement、runtime frames、正式字型、local 2×／1× 分層、actual-ink 邏輯、mixed-run deterministic 測試、frame-fit policy、overlay、input／rollback、In-app Browser Console 與 A－01～11 regression 等環境可執行的檢查；mock／sandbox metrics 沒有被宣稱為真實 Chrome／Safari TextMetrics。其後 Jamie 已由 Finder Launch 在 Chrome／Safari 完成最終實機驗證並明確回覆 PASS。

目前共用 Viewer 支援 A－01～16。既有 BN 控制台仍維持 placeholder Preview，尚未正式接入這十六個獨立 renderer；A－17 與 B／C／D 仍未落地。本次同步不建立 Registry、Framework、Build System、shared/common/base renderer，也不預先決定後續版位實作方式。

## 31. A－13 正式 Template 實際落地狀態

樣式 A／`13_Skinny BN_APP` 已完成獨立正式 renderer、共用薄 Viewer 的 A－13 route、Finder Launch、正式 runtime assets、Phase 5 AI 自我驗證，以及 Jamie Chrome／Safari 最終手動驗證。Jamie 已明確回覆 PASS。Code Commit 為 `6b68c1d92d8c1da64433e7b64abb779e442b3d36`（`feat(bn): add A13 Skinny BN APP template`），且是在 Jamie 完成手動驗證後才建立；`git diff --check HEAD^ HEAD` PASS。

Code Commit 精確包含：

- `bn/templates/A/13-skinny-bn-app.js`：A－13 獨立正式 renderer。
- `bn/launch/viewer.html`：共用薄 Viewer，最小增加 A－13 route 與版位別兩-input 欄位設定，現支援 A－01～16。
- `bn/launch/A/13_Skinny BN_APP.command`：A－13 直接啟動入口，Git mode 為 `100755`。
- `bn/assets/A/底圖/13_Skinny BN_APP.png`：A－13 正式 336 × 318 RGBA runtime 底圖。
- `bn/assets/A/對位/13_Skinny BN_APP.png`：只供 Launch 視覺校稿的 358 × 360 RGBA 正式對位圖。

A－13 屬 Phase 0 文件的「特殊文字訊息版位」，是目前第一個正式兩-input 版位。正式 Canvas 為 transparent 358 × 360px；版位特定 dimension guard 分別要求 Canvas 精確為 358 × 360、底圖 intrinsic dimensions 精確為 336 × 318。底圖只以 `x: 11px; y: 20px; width: 336px; height: 318px` 原尺寸 1:1、正式 1× 繪製，不 Resize、不 Stretch、不 Crop、不補邊、不 Scale-to-fit，Canvas 四周保留透明區，也不使用「底圖尺寸等於 Canvas」的一般 guard。

A－13 精確只有兩個動態文字欄位，沒有第三欄或保護文字欄位；右側播放鍵、蝦皮公仔與紙箱均為正式底圖固定圖像內容，不是文字欄位、input、Editor field、runtime frame 或 renderer text layer。兩個正式 runtime frame 為第一行 `74,42,210,38`、第二行 `49,89,260,38`。Photoshop 工作區原始 frame 為 `536,312,210,38`、`511,359,260,38`；Phase 2 依正式對位 PNG Alpha components 逐框驗算確認一致轉換 `xLocal = xPhotoshop - 462`、`yLocal = yPhotoshop - 270`，renderer 不使用 Photoshop 工作區座標作為 runtime frame。

兩欄文字使用 `measureText()` 的 `actualBoundingBoxLeft`／`Right`／`Ascent`／`Descent` 計算完整 actual ink bbox，再於各自 frame 內水平＋垂直置中；不是單純 `textAlign: center`、固定 baseline 或 fixed offset。字級直接使用 Photoshop 原始 `pt`：第一行 Medium 30pt、第二行 ordinary Bold 30pt、同一第二行欄位中的 `$`／`%` Bold 25pt；顏色依序為 `#ffffff`、`#fff285`、`#fff285`，不建立人工 `pt → px` 換算。字數上限為第一行 5、第二行 6，算法 ASCII 0.5／非 ASCII 1。

第二行 ordinary／symbol 先 token 化並依 advance width 排成連續 mixed-run group；`$` 優先參考後方 ordinary glyph actual ink-bottom、無後方時回退前方，`%` 優先參考前方、無前方時回退後方，並跳過無 ink 字元。Renderer 計算完整 mixed group actual ink bbox 後將整組水平＋垂直置中，再逐 run 繪製，支援 symbol 位於開頭、中間或結尾。`$`／`%` 不是獨立 Editor 欄位；不存在 fixed symbol offset、spacing compensation、自動縮字、換行或裁切。

A－13 採版位 local 2× Medium rendering。Renderer 建立 716 × 720 transparent temporary Canvas，context 使用 `scale(2, 2)`，只讓第一行 Medium 30pt 依原始 pt、正式 runtime frame 及相同 actual-ink 置中邏輯繪製，再以 high-quality downsample 回正式 358 × 360 Canvas。正式 PNG 底圖、Bold 30pt ordinary 與 Bold 25pt `$`／`%` 維持正式 1×；繪製順序為 clear transparent Canvas、底圖 `11,20,336,318` 正式 1×、transparent Medium local 2× layer 縮回合成、Bold mixed 第二行正式 1×，正式 compositing 使用 `globalAlpha = 1` 與 `source-over`。此行為只屬 A－13，不是全 BN、全 Medium 或其他 Type 的 shared／global 規則。

A－13 延續 A－11／12 最終 frame-fit policy：兩欄的 `inkWidth`、`inkHeight`、`inkLeft`、`inkTop`、`inkRight`、`inkBottom`、`fitsWidth` 與 `fitsHeight` 依真實 actual ink metrics 如實計算並回傳；false 不被強制改成 true，也不阻擋 render，不加入 epsilon、tolerance、offset、縮字或 workaround。Canvas／Image／context、decode、底圖 intrinsic dimensions、Canvas dimensions、placement／frame geometry、temporary Canvas 716 × 720、font-ready 與 non-finite TextMetrics 等結構性錯誤仍維持 hard-stop。Font-ready 沿用既有正式 Medium／Bold WOFF2 mapping，不新增 font mapping，使用 `document.fonts.load()`／`check()` 精確檢查 30pt Medium、30pt Bold 與 25pt Bold，未 ready 不 fallback。

A－13 route 為 `viewer.html?type=A&bn=13_Skinny%20BN_APP`，解碼後為 `type=A`、`bn=13_Skinny BN_APP`。Canvas、Preview 與 overlay 均為 358 × 360；正式對位 PNG 以原始 Alpha、同原點、原尺寸 1:1、CSS opacity 1 疊加，不合成進正式 Canvas。A－13 是共用 Viewer 首個正式兩-input 版位：Viewer 以最小版位別欄位設定顯示「第一行」（上限 5、預設「週六免運日」）與「第二行」（上限 6、預設「全站$499免運」）兩個 input；第三個既有 input 與 label 在 A－13 route 下 hidden＋disabled，不進 fields、state 或 render。A－01～12 各 route 維持既有三 input、既有 label、預設文字與 8／7／17 上限完全不變；本次不因兩-input 需求建立第二套 Viewer、不重構共用 Viewer、不接正式控制台。IME-safe、超限 rollback、ASCII 0.5／非 ASCII 1、overlay toggle、dynamic dimensions 與圖片 decode／intrinsic dimension guard 均沿用。

A－13 `.command` 完全沿用 A－12 已 PASS 結構，固定使用 `127.0.0.1:4173`；正確 Viewer service 已存在時沿用，遇到不相符的外部 service 時停止提示，不換 port、不 kill 外部 process，必要時使用 `/usr/bin/python3 -m http.server`，且只停止自己啟動的 server。Filesystem permission 為 755，Code Commit 中 Git mode 為 `100755`。

Claude Phase 5 已完成當時環境可執行的 deterministic／static／sandbox 驗證：renderer／Viewer module 語法、`.command` 與 A－12 已 PASS 腳本逐行 diff（sandbox 無 zsh，以此替代 `zsh -n`）、HTTP resources、正式 assets decode／dimensions／Alpha／SHA-256、底圖 placement、runtime frames、font-ready 結構、local 2×／1× 分層、actual-ink 置中公式、mixed-run deterministic 測試（`$`／`%` 開頭／中間／結尾、多 symbol、純 symbol、空字串、advance 連續性）、frame-fit false 不阻擋、結構性 hard-stop、兩 input 5／6 與 rollback／IME-safe 邏輯、overlay 1:1，以及 A－01～12 regression、whitespace 與 Git Scope。Mock／sandbox metrics 沒有被宣稱為真實 Chrome／Safari Browser actual TextMetrics 或視覺 PASS。其後 Jamie 已由 Finder 雙擊 A－13 `.command`，在 Chrome／Safari 完成真實 Canvas、底圖 placement 與透明邊界、overlay、兩欄 actual-ink 置中、Medium 30pt local 2× 粗細與銳利度、Bold 30pt／25pt mixed baseline、不同位置的 `$`／`%`、輸入限制／rollback、真實中文 IME、Console 與必要 regression 的實機驗證，並明確回覆 PASS。因此 A－13 已完成並通過人工驗收，不是 unresolved blocker。

目前共用 Viewer 支援 A－01～16。既有 BN 控制台仍維持 placeholder Preview，尚未正式接入這十六個獨立 renderer；A－17 與 B／C／D 仍未落地。本次同步不建立 Registry、Framework、Build System、shared/common/base renderer，也不預先決定後續版位實作方式。

## 32. A－14 正式 Template 實際落地狀態

樣式 A／`14_Skinny BN_PC` 已完成獨立正式 renderer、共用薄 Viewer 的 A－14 route、Finder Launch、正式 runtime assets、Phase 5 AI 自我驗證，以及 Jamie Chrome／Safari 最終手動驗證。Jamie 已明確回覆 PASS。Code Commit 為 `dc43507386a5adfa1d9ab6b4b99f3da8a1b5ca7d`（`feat(bn): add A14 Skinny BN PC template`），且是在 Jamie 完成手動驗證後才建立；`git diff --check HEAD^ HEAD` PASS。

Code Commit 精確包含：

- `bn/templates/A/14-skinny-bn-pc.js`：A－14 獨立正式 renderer。
- `bn/launch/viewer.html`：共用薄 Viewer，最小增加 A－14 route 與版位別 fieldConfig，現支援 A－01～16。
- `bn/launch/A/14_Skinny BN_PC.command`：A－14 直接啟動入口，Git mode 為 `100755`。
- `bn/assets/A/底圖/14_Skinny BN_PC.png`：A－14 正式 384 × 96 RGBA runtime 底圖。
- `bn/assets/A/對位/14_Skinny BN_PC.png`：只供 Launch 視覺校稿的 400 × 110 RGBA 正式對位圖。

A－14 屬 Phase 0 文件的「特殊文字訊息版位」，是繼 A－13 後第二個兩-input 版位。正式 Canvas 為 transparent 400 × 110px；版位特定 dimension guard 分別要求 Canvas 精確為 400 × 110、底圖 intrinsic dimensions 精確為 384 × 96。底圖只以 `x: 8px; y: 7px; width: 384px; height: 96px` 原尺寸 1:1、正式 1× 繪製，不 Resize、不 Stretch、不 Crop、不補邊、不 Scale-to-fit，Canvas 四周保留透明區，也不使用「底圖尺寸等於 Canvas」的一般 guard。

A－14 精確只有兩個動態文字欄位；右側播放鍵、蝦皮公仔與紙箱均為正式底圖固定圖像內容，不是文字欄位、input、CTA、runtime frame 或 renderer text layer。兩個正式 runtime frame 為第一行 `18,23,150,25`、第二行 `18,56,195,29`。Photoshop 工作區原始 frame 為 `959,418,150,25`、`959,451,195,29`；Phase 2 依正式對位 PNG Alpha components 逐框驗算確認一致轉換 `xLocal = xPhotoshop - 941`、`yLocal = yPhotoshop - 395`，renderer 不使用 Photoshop 工作區座標作為 runtime frame。

兩欄文字使用 `measureText()` 的 `actualBoundingBoxLeft`／`Right`／`Ascent`／`Descent` 計算完整 actual ink bbox；水平方向為 actual-ink 靠左對齊，實際 glyph ink 左緣精確落在各自 `frame.left = 18px`（與 A－13 的水平置中不同），垂直方向將完整 actual ink bbox 置中於各自 frame。字級直接使用 Photoshop 原始 `pt`：第一行 Medium 20pt、第二行 ordinary Bold 22.5pt、同一第二行欄位中的 `$`／`%` Bold 19pt；顏色依序為 `#ffffff`、`#fff285`、`#fff285`，不建立人工 `pt → px` 換算。字數上限為第一行 5、第二行 6，算法 ASCII 0.5／非 ASCII 1。

第二行 ordinary／symbol 先 token 化並依 advance width 排成連續 mixed-run group；`$` 優先參考後方 ordinary glyph actual ink-bottom、無後方時回退前方，`%` 優先參考前方、無前方時回退後方，並逐 glyph 跳過無 ink 字元。Renderer 計算完整 mixed group actual ink bbox 後，使整組 actual ink 左緣對齊第二行 `frame.left` 並垂直置中，再逐 run 繪製，支援 symbol 位於開頭、中間、結尾及多 symbol。`$`／`%` 不是獨立 Editor 欄位；不存在 fixed symbol offset、spacing compensation、自動縮字、換行或裁切。

A－14 採版位 local 2× Medium rendering。Renderer 建立 800 × 220 transparent temporary Canvas，context 使用 `scale(2, 2)`，只讓第一行 Medium 20pt 依原始 pt、正式 runtime frame 及相同 actual-ink 定位邏輯繪製（沒有 measurement ×2／÷2 補償），再以 high-quality downsample 回正式 400 × 110 Canvas。正式 PNG 底圖、Bold 22.5pt ordinary 與 Bold 19pt `$`／`%` 維持正式 1×；繪製順序為 clear transparent Canvas、底圖 `8,7,384,96` 正式 1×、transparent Medium local 2× layer 縮回合成、Bold mixed 第二行正式 1×，正式 compositing 使用 `globalAlpha = 1` 與 `source-over`。此行為只屬 A－14，不是全 BN、全 Medium 或其他 Type 的 shared／global 規則。

A－14 延續 A－11～13 最終 frame-fit policy：兩欄的 `inkWidth`、`inkHeight`、`inkLeft`、`inkTop`、`inkRight`、`inkBottom`、`fitsWidth` 與 `fitsHeight` 依真實 actual ink metrics 如實計算並回傳；false 不被強制改成 true，也不阻擋 render，不加入 epsilon、tolerance、offset、縮字或 workaround。Canvas／Image／context、decode、底圖 intrinsic dimensions、Canvas dimensions、placement／frame geometry、temporary Canvas 800 × 220、font-ready 與 non-finite TextMetrics／ink geometry 等結構性錯誤仍維持 hard-stop。Font-ready 沿用既有正式 Medium／Bold WOFF2 mapping，不新增 font mapping，使用 `document.fonts.load()`／`check()` 精確檢查 20pt Medium、22.5pt Bold 與 19pt Bold，未 ready 不 fallback。

A－14 route 為 `viewer.html?type=A&bn=14_Skinny%20BN_PC`，解碼後為 `type=A`、`bn=14_Skinny BN_PC`。Canvas、Preview 與 overlay 均為 400 × 110；正式對位 PNG 以原始 Alpha、同原點、原尺寸 1:1、CSS opacity 1 疊加，不合成進正式 Canvas。A－14 直接復用 A－13 已落地的 Viewer 版位別 fieldConfig 兩-input 架構，只最小追加 route 與自己的 fieldConfig，沒有再次重構 Viewer：顯示「第一行」（上限 5、預設「週六免運日」）與「第二行」（上限 6、預設「全站$499免運」）兩個 input；第三個既有 input 與 label 沿用 hidden＋disabled，不進 fields、state 或 render。A－01～12 各 route 維持三 input 8／7／17、A－13 route 維持兩 input 5／6，行為完全不變。IME-safe、超限 rollback、ASCII 0.5／非 ASCII 1、overlay toggle、dynamic dimensions 與圖片 decode／intrinsic dimension guard 均沿用。

A－14 `.command` 完全沿用 A－13 已 PASS 結構，固定使用 `127.0.0.1:4173`；正確 Viewer service 已存在時沿用，遇到不相符的外部 service 時停止提示，不換 port、不 kill 外部 process，必要時使用 `/usr/bin/python3 -m http.server`，且只停止自己啟動的 server。Filesystem executable，Code Commit 中 Git mode 為 `100755`。

Claude Phase 5 已完成當時環境可執行的 deterministic／static／sandbox 驗證：renderer／Viewer module 語法、HTTP resources、正式 assets decode／dimensions／Alpha／SHA-256、底圖 placement 與雙 guard、runtime frames、font-ready 結構、local 2×／1× 分層、actual-ink 左對齊＋垂直置中公式、renderer mock 測試 35/35、Viewer 邏輯測試 15/15、A－01～13 regression、whitespace 與 Git Scope。sandbox 無 zsh，`zsh -n` 未執行，改以與 A－13 已 PASS script 的逐行 diff（僅預期替換）作替代證據；mock／sandbox metrics 沒有被宣稱為真實 Chrome／Safari Browser actual TextMetrics 或視覺 PASS。其後 Jamie 已由 Finder 雙擊 A－14 `.command`，在 Chrome／Safari 完成真實 Canvas、底圖 placement 與透明邊界、overlay、兩欄 actual-ink 左對齊＋垂直置中、Medium 20pt local 2× 粗細與銳利度、Bold 22.5pt／19pt mixed baseline、不同位置的 `$`／`%`、輸入限制／rollback、真實中文 IME、Console 與必要 regression 的實機驗證，並明確回覆 PASS。因此 A－14 已完成並通過人工驗收，不是 unresolved blocker。

目前共用 Viewer 支援 A－01～16。既有 BN 控制台仍維持 placeholder Preview，尚未正式接入這十六個獨立 renderer；A－17 與 B／C／D 仍未落地。本次同步不建立 Registry、Framework、Build System、shared/common/base renderer，也不預先決定後續版位實作方式。

## 33. A－15 正式 Template 實際落地狀態

樣式 A／`15_AR` 已完成獨立正式 renderer、共用薄 Viewer 的 A－15 route、Finder Launch、正式 runtime assets、Phase 5 AI 自我驗證，以及 Jamie Chrome／Safari 最終手動驗證。Jamie 已明確回覆 PASS。Code Commit 為 `5c833297c31f7f98269aeec20d65b59b8b5bb126`（`feat(bn): add A15 AR template`），且是在 Jamie 完成手動驗證後才建立；`git diff --check HEAD^ HEAD` PASS。

Code Commit 精確包含：

- `bn/templates/A/15-ar.js`：A－15 獨立正式 renderer。
- `bn/launch/viewer.html`：共用薄 Viewer，最小增加 A－15 route 與版位別 fieldConfig，現支援 A－01～16。
- `bn/launch/A/15_AR.command`：A－15 直接啟動入口，Git mode 為 `100755`。
- `bn/assets/A/底圖/15_AR.jpg`：A－15 正式 100 × 100 JPEG RGB runtime 底圖。
- `bn/assets/A/對位/15_AR.png`：只供 Launch 視覺校稿的 100 × 100 RGBA 正式對位圖。

兩張 committed assets 的 SHA-256 與 Phase 2／5 原檔完全一致（底圖 `d5098b9dfea1e53e3c60a406f5ffd9e3f04291dbbfc51ac8f1217dfb8de9a136`、對位 `d1cf28e80ea937145dfd749655179898af5a7cf0606952e91f61670139f83664`），只加入版本控制、零修改。

A－15 屬 Phase 0 文件的「特殊文字訊息版位」，是第三個兩-input 版位。正式 Canvas 為 100 × 100px；底圖 intrinsic dimensions 精確等於 Canvas，只以 `x: 0px; y: 0px; width: 100px; height: 100px` 原尺寸 1:1、正式 1× 繪製，不 Resize、不 Stretch、不 Crop、不補邊、不 Scale-to-fit；Canvas 與底圖 intrinsic 採各自精確 100 × 100 dimension guard。

A－15 精確只有兩個動態文字欄位。兩個正式 runtime frame 為第一行 `14,22,72,25`、第二行 `14,54,72,25`。Photoshop 工作區原始 frame 為 `481,422,72,25`、`481,454,72,25`；Phase 2 依正式對位 PNG Alpha components 逐框驗算確認一致轉換 `xLocal = xPhotoshop - 467`、`yLocal = yPhotoshop - 400`，renderer 直接使用已確認 runtime frames，不在 render 時重新推算。對位 PNG level-49 的三條橫條只是 overlay 校稿間距指示，不是文字欄位、input、renderer layer 或第三欄。

兩行文字規格完全相同：`ShopeeNotoSans Bold`、`#fff285`；字級由 renderer 的 deterministic tokenizer 決定——使用 JavaScript Unicode property escape `/\p{Script=Han}/u`，以 `for...of` 按 code point 迭代並將連續同類字元合併為 run，Unicode Script=Han 字元使用 Bold 18pt、其他所有字元使用 Bold 18.5pt；「其他」包含英文字母、數字、`$`、`%`、半形／全形符號、空白與非 ASCII 拉丁字元（如 `é`），Unicode Script=Han 的 `々` 依標準分類為 Han。字級 tokenizer 與 Viewer 字數算法（ASCII 0.5／非 ASCII 1，兩行上限均為 3）是兩套獨立規則。所有字級直接使用原始 pt，不建立人工 `pt → px` 換算。

同一行所有 18pt／18.5pt Bold runs 使用 `textAlign="left"`、`textBaseline="alphabetic"`，各自以 `measureText()` 的 `actualBoundingBoxLeft`／`Right`／`Ascent`／`Descent` 量測，共用同一 alphabetic baseline（不使用 A－13／14 的 `$`／`%` ink-bottom baseline 規則、不加 per-run baseline offset），依 advance width 連續排列，合併整行完整 mixed-group actual ink bbox 後整組於各自 72 × 25 frame 內水平＋垂直置中；空字串不繪製並回傳 0 × 0 validation。

A－15 兩行全部是 Bold，沒有任何 Medium run，因此**不建立 local 2× temporary Canvas，全部文字與底圖維持正式 1×**；先前輸入中的「Medium 直接採 local 2×」已在 Phase 1／2 調查確認與本版實際文字規格衝突，並於 Phase 3 正式裁決為沿用前版的筆誤，Bold 不套入 2×。此結果只屬 A－15，不反向改寫 A－01～14 各版既有 local 2× 規格。正式繪製順序為 clear Canvas、底圖 `0,0,100,100` 正式 1×、第一行 Bold mixed 1×、第二行 Bold mixed 1×，正式 compositing 使用 `globalAlpha = 1` 與 `source-over`。

A－15 延續 A－11～14 最終 frame-fit policy：兩行的 `inkWidth`、`inkHeight`、`inkLeft`、`inkTop`、`inkRight`、`inkBottom`、`fitsWidth` 與 `fitsHeight` 依真實 actual ink metrics 如實計算並回傳；false 不被強制改成 true，也不阻擋 render，不加入 epsilon、tolerance、offset 或縮字。Canvas／Image／context、decode、底圖 intrinsic、Canvas dimensions、placement／frame geometry、font-ready 與 non-finite TextMetrics／ink geometry 等結構性錯誤仍維持 hard-stop；本版無 temporary Canvas，故無 2× temporary Canvas guard。Font-ready 沿用既有正式 Bold WOFF2 mapping，不新增 font mapping，使用 `document.fonts.load()`／`check()` 精確檢查 18pt Bold 與 18.5pt Bold，未 ready 不 fallback。

A－15 route 為 `viewer.html?type=A&bn=15_AR`。Canvas、Preview 與 overlay 均為 100 × 100；正式對位 PNG 以原始 Alpha、同原點、原尺寸 1:1、CSS opacity 1 疊加，decode 後尺寸 guard，不合成進正式 Canvas。A－15 直接復用 A－13／14 已落地的 Viewer 版位別 fieldConfig 兩-input 架構，只最小追加 route 與自己的 fieldConfig，未重構 Viewer：顯示「第一行」（上限 3、預設「宅配滿」）與「第二行」（上限 3、預設「$490」）兩個 input；第三個既有 input 與 label 沿用 hidden＋disabled，不進 fields、state 或 render。A－01～12 各 route 維持三 input 8／7／17、A－13～14 route 維持兩 input 5／6，行為完全不變。IME-safe、超限 rollback、ASCII 0.5／非 ASCII 1、overlay toggle、dynamic dimensions 與圖片 decode／intrinsic dimension guard 均沿用。

A－15 `.command` 完全沿用 A－14 已 PASS 結構，固定使用 `127.0.0.1:4173`；正確 Viewer service 以 marker 驗證後沿用，遇到不相符的外部 service 時停止提示，不換 port、不 kill 外部 process，必要時使用 `/usr/bin/python3 -m http.server`，且只停止自己啟動的 server。Filesystem executable，Code Commit 中 Git mode 為 `100755`。

Claude Phase 5 已完成當時環境可執行的 deterministic／static／sandbox 驗證：renderer／Viewer module 語法、HTTP 200、正式 assets decode／dimensions／SHA-256、placement 與雙 guard、runtime frames、font-ready 結構、renderer mock 測試 27/27（含 Han/Other tokenizer 邊界字元、共用 alphabetic baseline、advance continuity、mixed-group actual-ink 置中、無 temporary Canvas／無 `scale(2,2)`、空字串、frame-fit false non-blocking、結構性 hard-stop）、Viewer 邏輯測試 15/15、A－01～14 regression、whitespace 與 Git Scope。sandbox 無 zsh，`zsh -n` 未執行，改以與 A－14 已 PASS script 的逐行 diff（僅預期替換）作替代證據；mock／sandbox metrics 沒有被宣稱為真實 Chrome／Safari Browser actual TextMetrics 或視覺 PASS。其後 Jamie 已由 Finder 雙擊 A－15 `.command`，在 Chrome／Safari 完成真實 Canvas、100 × 100 小 Canvas rasterization、Bold 18pt／18.5pt 1× 清晰度、混排 common alphabetic baseline、兩行 actual-ink 水平＋垂直置中、25px frame-fit、overlay 與間距指示線、輸入限制／rollback、真實中文 IME、Console 與必要 regression 的實機驗證，並明確回覆 PASS。因此 A－15 已完成並通過人工驗收，不是 unresolved blocker。

目前共用 Viewer 支援 A－01～16。既有 BN 控制台仍維持 placeholder Preview，尚未正式接入這十六個獨立 renderer；A－17 與 B／C／D 仍未落地。本次同步不建立 Registry、Framework、Build System、shared/common/base renderer，也不預先決定後續版位實作方式。

## 34. A－16 正式 Template 實際落地狀態

樣式 A／`16_副區` 已完成獨立正式 renderer、共用薄 Viewer 的 A－16 route、Finder Launch、正式 runtime assets、Phase 5 AI 自我驗證，以及 Jamie Chrome／Safari 最終手動驗證。Jamie 已明確回覆 PASS。Code Commit 為 `714d3d050234ff5935149163fbfc4fcca695a412`（`feat(bn): add A16 sub area template`），且是在 Jamie 完成手動驗證後才建立；`git diff --check HEAD^ HEAD` PASS。

Code Commit 精確包含：

- `bn/templates/A/16-sub-area.js`：A－16 獨立正式 renderer。
- `bn/launch/viewer.html`：共用薄 Viewer，最小增加第 4 靜態 slot 與 A－16 route／fieldConfig，現支援 A－01～16。
- `bn/launch/A/16_副區.command`：A－16 直接啟動入口，Git mode 為 `100755`。
- `bn/assets/A/底圖/16_副區.jpg`：A－16 正式 1200 × 220 JPEG RGB runtime 底圖。
- `bn/assets/A/對位/16_副區.png`：只供 Launch 視覺校稿的 1200 × 220 RGBA 正式對位圖。

兩張 committed assets 的 SHA-256 與 Phase 2／5 原檔完全一致（底圖 `12902843ca43ffc7f1c89669514afa8477675406f96dab4f9b8819f11ba9506e`、對位 `f716ccf2e955e0770e5115966ac1703327a3720e17ece618759015f01f1bee77`），只由 untracked 轉 tracked、零修改。

A－16 屬 Phase 0 文件的「固定版型＋獨立文字訊息」版位，是目前第一個正式四-input 版位。正式 Canvas 為 1200 × 220px；Phase 0 文件的尺寸舊記載 `1200×200` 已依 Jamie Locked Input、正式底圖／對位圖 intrinsic、完成參考圖與 committed renderer 的一致證據於本次 Docs Update 修正為 `1200×220`。底圖 intrinsic dimensions 精確等於 Canvas，只以 `x: 0px; y: 0px; width: 1200px; height: 220px` 原尺寸 1:1、正式 1× 繪製，不 Resize、不 Stretch、不 Crop、不補邊、不 Scale-to-fit；Canvas 與底圖 intrinsic 採各自精確 dimension guard。深綠／淺色固定區塊與邊框全部屬正式底圖內容，renderer 不建立 graphics layer。

A－16 動態內容精確為四個文字欄位：左標題、左文案、右標題、右文案。四個正式 runtime frame 為左標題 `37,44,540,42`、右標題 `622,44,540,42`、左文案 `37,121,540,43`、右文案 `622,121,540,43`。Photoshop 工作區原始 frame 為 `313,384,540,42`、`898,384,540,42`、`313,461,540,43`、`898,461,540,43`；Phase 2 依正式對位 PNG Alpha components 四框逐一驗算確認一致轉換 `xLocal = xPhotoshop - 276`、`yLocal = yPhotoshop - 340`，renderer 直接使用已確認 runtime frames，不在 render 時重新推算。

字級直接使用 Photoshop 原始 `pt`：左右標題 Medium 34pt `#ffffff`；左右文案 ordinary Bold 34pt `#ee4d2d`、同一文案欄位中的 `$`／`%` Bold 28pt `#ee4d2d`；不建立人工 `pt → px` 換算。四欄 limit 均為 10，字數算法 ASCII 0.5／非 ASCII 1。四個文字框全部使用 `measureText()` 的 `actualBoundingBoxLeft`／`Right`／`Ascent`／`Descent` 計算完整 actual ink bbox，於各自 frame 內水平＋垂直置中；`textAlign="left"`、`textBaseline="alphabetic"`，由 metrics 補償 draw origin，不以 `textAlign="center"` 取代 actual-ink 計算。

A－16 採版位 local 2× Medium rendering：建立單一 2400 × 440 transparent temporary Canvas（精確尺寸 guard），context 使用 `scale(2, 2)`，左右兩個 Medium 34pt 標題依各自正式 logical frame 與原始 pt 同層依序繪製（無 measurement ×2／÷2 補償），再以 high-quality downsample 一次縮回正式 1200 × 220 Canvas。正式底圖、Bold 34pt ordinary 與 Bold 28pt `$`／`%` 維持正式 1×，Bold 不進 Medium layer；繪製順序為 clear transparent Canvas、底圖 `0,0,1200,220` 正式 1×、Medium 雙標題 local 2× layer 縮回合成、左 Bold mixed 文案 1×、右 Bold mixed 文案 1×，正式 compositing 使用 `globalAlpha = 1` 與 `source-over`。此行為只屬 A－16，不是全 BN、全 Medium 或其他 Type 的 shared／global 規則。

左右文案各自獨立套用既有已 PASS mixed-run 策略：tokenize `$`／`%` symbol runs 與 ordinary runs、advance width 連續排列、`$` 優先後方 ordinary glyph actual ink-bottom／無後方回退前方、`%` 優先前方／無前方回退後方、逐 glyph 跳過無 ink 字元、支援 symbol 開頭／中間／結尾及多 symbol；合併完整 mixed-group actual ink bbox 後整組於各自 540 × 43 frame 內水平＋垂直置中（非 A－12／14 的左對齊），再逐 run 繪製。`$`／`%` 不是獨立 Editor 欄位；不存在 fixed symbol offset、spacing compensation、自動縮字、換行或裁切。

A－16 延續 A－11～15 最終 frame-fit policy：四欄的 `inkWidth`、`inkHeight`、`inkLeft`、`inkTop`、`inkRight`、`inkBottom`、`fitsWidth` 與 `fitsHeight` 依真實 actual ink metrics 如實計算並回傳；false 不被強制改成 true，也不阻擋 render，不加入 epsilon、tolerance、offset 或縮字。Canvas／Image／context、decode、底圖 intrinsic、Canvas dimensions、placement／frame geometry、temporary Canvas 2400 × 440、font-ready 與 non-finite TextMetrics／ink geometry 等結構性錯誤仍維持 hard-stop。Font-ready 沿用既有正式 Medium／Bold WOFF2 mapping，不新增 font mapping，使用 `document.fonts.load()`／`check()` 精確檢查 34pt Medium、34pt Bold 與 28pt Bold，未 ready 不 fallback。

A－16 route 為 `viewer.html?type=A&bn=16_%E5%89%AF%E5%8D%80`，解碼後為 `type=A`、`bn=16_副區`。Canvas、Preview 與 overlay 均為 1200 × 220；正式對位 PNG 以原始 Alpha、同原點、原尺寸 1:1、CSS opacity 1 疊加，decode 後尺寸 guard，不合成進正式 Canvas。A－16 是共用 Viewer 第一個正式四-input 版位：本次只做最小擴充——新增第 4 個靜態 label＋input slot（初始 hidden＋disabled）、`fieldSlots` 由 3 擴為 4、used slot 最小解除 hidden——未重構 Viewer、未建立 dynamic DOM framework。A－16 fieldConfig 為 `leftTitle`「左標題」、`leftCopy`「左文案」、`rightTitle`「右標題」、`rightCopy`「右文案」，limit 全 10，預設「全站大免運」「店取滿$199免運」「商城優選皆適用」「宅配滿$490免運」。A－01～12 各 route 維持三 input 8／7／17、A－13～14 維持兩 input 5／6、A－15 維持兩 input 3／3，行為完全不變；非 A－16 route 的第 4 slot 維持 hidden＋disabled。IME-safe、超限 rollback、ASCII 0.5／非 ASCII 1、overlay toggle、dynamic dimensions 與圖片 decode／intrinsic dimension guard 均沿用。

A－16 `.command` 完全沿用 A－15 已 PASS 結構，固定使用 `127.0.0.1:4173`；正確 Viewer service 以 marker 驗證後沿用，遇到不相符的外部 service 時停止提示，不換 port、不 kill 外部 process，必要時使用 `/usr/bin/python3 -m http.server`，且只停止自己啟動的 server。Filesystem executable，Code Commit 中 Git mode 為 `100755`。

Claude Phase 5 已完成當時環境可執行的 deterministic／static／sandbox 驗證：renderer／Viewer module 語法、HTTP 200、正式 assets decode／dimensions／SHA-256、placement 與雙 guard、四 runtime frames、font-ready 結構、2400 × 440 temporary Canvas、雙 Medium 標題同層 2× 與一次 downsample、Bold 文案 1×、四欄 actual-ink 置中、mixed runs 各位置、結構性 hard-stop、Viewer 邏輯測試 20/20，以及 A－01～15 regression 與 Git Scope。Renderer mock 測試最終 34/34 PASS；初跑曾有 1 項 fitsWidth 測試 FAIL，經查為 mock 測試字串寬度不足 540px 的測試資料問題、非 renderer 缺陷，加長測試字串後全數通過。sandbox 無 zsh，`zsh -n` 未執行，改以與 A－15 已 PASS script 的逐行 diff（僅預期替換）作替代證據；mock／sandbox metrics 沒有被宣稱為真實 Chrome／Safari Browser actual TextMetrics 或視覺 PASS。其後 Jamie 已由 Finder 雙擊 A－16 `.command`，在 Chrome／Safari 完成真實 Canvas、底圖與固定區塊、Medium 34pt local 2× 粗細與銳利度、Bold 34pt／28pt mixed baseline、不同位置的 `$`／`%`、四框 actual-ink 置中、四-input 操作與輸入限制／rollback、overlay、真實中文 IME、Console 與必要 regression 的實機驗證，並明確回覆 PASS。因此 A－16 已完成並通過人工驗收，不是 unresolved blocker。

目前共用 Viewer 支援 A－01～16。既有 BN 控制台仍維持 placeholder Preview，尚未正式接入這十六個獨立 renderer；A－17 與 B／C／D 仍未落地。本次同步不建立 Registry、Framework、Build System、shared/common/base renderer，也不預先決定後續版位實作方式。

## 35. A－17 正式 Template 實際落地狀態

樣式 A／`17_門檻表` 已完成獨立正式 table renderer、共用薄 Viewer 的 A－17 專用 branch、Finder Launch、正式 runtime assets、Phase 5 真實 Chromium AI 自驗、兩輪最小 Visual Tuning，以及 Jamie Chrome／Safari 最終手動驗證。Jamie 已明確回覆 PASS。Code Commit 為 `556a79c25ce9d7ddb77b25075484312f37ea4197`（`feat(bn): add A17 threshold table template`），且是在 Jamie 完成手動驗證後由 Jamie 於 macOS Terminal 建立；`git diff --check HEAD^ HEAD` PASS。

Code Commit 精確包含：

- `bn/templates/A/17-threshold-table.js`：A－17 獨立正式 table renderer。
- `bn/launch/A/17_門檻表.command`：A－17 直接啟動入口，Git mode 為 `100755`。
- `bn/launch/viewer.html`：共用薄 Viewer，最小增加 A－17 專用 branch。
- `bn/assets/A/底圖/17_主標題.png`：正式主標底圖，PNG RGBA，intrinsic 1180 × 83，SHA-256 `ecf17ed1b9841fd62dd1535bb0573148361ddbc0cd22ed914457b8d38ac32bac`。
- `bn/assets/A/底圖/17_VIP.png`：正式 VIP 底圖，PNG RGBA，intrinsic 1180 × 185，SHA-256 `34df2ee85c09e691a25de31a7f5595833b98c9e01697a7234cb52a845512ba2c`。

A－17 是目前唯一的動態門檻表版位，與 A－01～16 的固定 Canvas＋固定文字 frame 模式不同：正式輸出為 PNG，Canvas 固定 width 1200px、height 動態（`canvasHeight = 290 + middleHeight`）；body x = 10、width = 1180，外距 top 10／bottom 12；垂直組成為 `17_主標題.png`（1:1 @ `(10, 10)`）→ renderer 依資料自繪的 dynamic middle → `17_VIP.png`（1:1 緊接其後），三段直接相接。中段 background `#1a9c8b`、外 padding 與 cell gap 均 12px、生成色塊 radius 10px；橫向 `12 + 177 + 12 + 967 + 12 = 1180`。物流最多 5 欄、實際 N 欄時欄寬 `(967 − 12 × (N − 1)) / N`（fractional coordinates），完全未使用欄不生成並重新分配；line1／line2 為明確欄位，任一有效物流有 line2 時 logistics row = 80px、否則 45px；line2 依 Unicode Han 計數（`/\p{Script=Han}/u`）≤5 用 28px `#006351`、>5 用 17px `#4e4e4e`。門檻名稱支援 literal `\n` 強制斷行＋153px 實際 `measureText()` greedy auto-wrap，baseline pitch 30px，`rowHeight = 70 + (lineCount − 1) × 30`。金額 cell `#fffced`、32px Bold、單行雙向置中，顏色依 dropdown 對映綠 `#006351`／紅 `#d0011b`，空 amount 仍生成空白白格。`↑`（trim 後精確 U+2191）為向上 merge 指令：只能併入正上方相鄰 open segment，merged geometry 含跨越 row heights＋12px gaps，文字／顏色沿用起始格且不繪製 `↑`；無效 `↑` 生成獨立空白白格＋warning，不猜值、不整張 fail。資料問題採 warnings 照常生成，結構性錯誤才 hard-stop；frame-fit 沿用如實回報 policy。

A－17 正式字級經 Jamie Visual Tuning 裁決為 **Canvas `px` 同值**（主標 50px Bold `#ffed54`、左欄 label／物流／門檻 28px Bold、物流長名稱 17px、金額 32px Bold、VIP 標題 36px Bold `#d0011b`、VIP 文案 34px Bold `#ffffff`、CTA 30px Regular `#ffffff`）：Photoshop 設計數值必須以同值 px 呈現才能還原正式成品尺度，禁止 runtime `pt` 與 96/72／1.333 換算；早期 pt runtime 造成的整體 4/3 放大與「週三/週六」多斷行已修正，不是正式規格。VIP 三組文字使用已驗證 asset-local frames：標題 `(217, 42, 935, 34)` 置中、文案 `(201, 128, 720, 34)` 置中、CTA `(1003, 128, 85, 34)` 靠右＋垂直置中，runtime origin `(10, 10 + 83 + middleHeight)`；local frames 由 Photoshop absolute 經單一平移 `local = absolute − (3328, 1190)` 驗證成立。

第二輪 Visual Tuning 經 Jamie 批准與 Manual PASS：僅左側兩類 28px Bold `#ffee9f` 黃字（「適用物流」label＋全部門檻名稱）採 A－17 local 2× temporary canvas（`scale(2, 2)`）＋`imageSmoothingQuality = "high"` 一次 downsample 回正式 1×；不套用右側物流名稱、金額、主標、VIP、CTA，不是全域規則，geometry／wrap／字級／frame 均不因此改變。Jamie 另明確裁決兩項為「可接受的 nominal-frame overflow」，非視覺缺陷、非 Coding bug、不阻擋 Manual PASS，diagnostic warning 保留：VIP 標題 ink 高約 36px 相對 34px frame（`fitsHeight = false`）；CTA ink 寬約 88px 相對 85px frame（`fitsWidth = false`，右緣仍精確對齊）。

A－17 route 為 `viewer.html?type=A&bn=17_%E9%96%80%E6%AA%BB%E8%A1%A8`。A－17 無對位 PNG，不使用 overlay（overlay image／toggle 於此 route 隱藏停用、decode guard 跳過）。Viewer A－17 branch 以 preset select（P1～P7）＋JSON textarea＋warnings 區作 Launch 校稿：P1 為正式 A.xlsx sample，於 px runtime 實測 4 物流、columnWidth 232.75、logistics row 80、threshold heights `[70, 100, 70]`（「週三/週六\n加碼」2 visual lines／100px）、middleHeight 380、Canvas 1200 × 670；歷史上的 298／588 只是兩門檻列 scratch sanity 數值，不是 P1 正式高度。JSON parse 失敗保留上一個有效 Preview、IME composition-safe；render 後依 canvas intrinsic 同步 CSS 尺寸（維持精確 1:1）。既有 4 個 field slots 於 A－17 hidden＋disabled；A－01～16 各 route 行為完全不變，Phase 5 已對 A－01／02／15／16 作 route regression 無回歸。此校稿 UI 只屬 Launch 工具，`17_門檻表` 控制台手動 Editor 維持第一輪排除、`getEditorFields("17")` 仍回傳空陣列。

目前共用 Viewer 支援 A－01～17，樣式 A 全部 17 個正式版位均已落地。既有 BN 控制台仍維持 placeholder Preview，尚未正式接入這十七個獨立 renderer；B／C／D、正式 Excel Import、Workspace Schema、Export／ZIP 仍未實作。本次同步不建立 Registry、Framework、Build System、shared/common/base renderer，也不預先決定後續版位或 Type 的實作方式。

## 36. A 樣式平台整合實際落地狀態

> 本節同步「A 樣式平台整合＋A－17 Manual Editor」已完成並經 Jamie Manual Verification PASS 的架構狀態。Code Commit 為 `91aa7f644b42be29651754af280fd094a2f2cfb0`（`feat(bn): integrate style A platform with A-17 manual editor`）。第 18.4 節「尚未落地的架構部分」中的正式 Excel Import、正式 Workspace、Restore、Export，以及第 19～35 節各版位段落中「既有 BN 控制台仍維持 placeholder Preview、尚未正式接入」的過渡描述，自本節起由本節取代；各節其餘歷史決策與 Template 規格不變。完整正式行為以 `bn/docs/FSS_BN_A樣式平台整合_Requirement_Specification_v1.0.md`（含第 25～26 節）為準。

### 36.1 已落地範圍

- 樣式 A 的 01～17 已全部接入正式控制台：正式 Excel Import（僅讀 workbook `Sheets.A`、A15/A16/A17 標籤驗證、detached candidate → Atomic replace、Import 不做 banwords）→ 統一 Workspace → 17 個既有正式 renderer Preview → 暫存 Restore → 完整專案 Export。
- Code Commit 落地檔案：`bn/index.html`、`bn/css/styles.css`、`bn/js/app.js`、`bn/js/editor.js`、`bn/js/workspace.js`、`bn/js/import.js`、`bn/js/export.js`、`bn/js/render-a.js`、`bn/js/vendor/`（SheetJS CE 0.20.3、JSZip 3.10.1，各附 LICENSE；依生成器分離原則為 BN 自有副本）、`啟動 FSS.command`。
- 正式 Workspace state＝`{currentType, selectedBnId, shared, bnText, threshold}`：01～12 共用單一 `shared` 文字組（永遠同步）；13～16 各自獨立；17 為固定 5×9 的結構化 `threshold`。第 18.2 節之第一輪 runtime 骨架描述自此由本 shape 取代。
- Restore 暫存 JSON＝`{format:"FSS BN Workspace", version:1, type:"A", selectedBnId, shared, bnText, threshold}`；覆蓋前確認、Atomic。
- Preview：`render-a.js` A-only renderer 對應表＋asset/font readiness；Preview Fit 以 viewport 實測計算顯示 scale（scale≤1、只寫 inline style、不動 backing dimensions），06／08／17 完整 fit、15 不放大，均 Manual PASS。
- Export：同一 Workspace 序列輸出 17 張；ZIP 根層 17 圖＋1 份 `FSS BN_MMDD.json`（無資料夾、無 manifest）、ZIP 名 `FSS BN_MMDD.zip`；格式固定 01 JPG、02 JPG、03 JPG、04 PNG、05 PNG、06 JPG、07 JPG、08 JPG、09 JPG、10 PNG、11 PNG、12 JPG（`12_LPBN.jpg` 1200×550）、13 PNG、14 PNG、15 JPG、16 JPG、17 PNG；全部成品 72 dpi metadata（PNG pHYs 2835 ppm／JPEG JFIF 72×72，byte-level patch 不重編碼）；JPG quality 1.0；`01_DDcard BN.jpg` ≤245,000 bytes、`02_MALL HBN.jpg` ≤145,000 bytes 之自動 quality 搜尋（0.5～1.0、patch 後 bytes 判定、floor 仍超標則整次 fail）為正式行為。
- A－17 Manual Editor：右欄「主標題 → 編輯門檻表 → VIP 標題 → VIP 文案 → CTA」（15/20/20/3，沿用既有 Editor 引擎與 banwords／IME／rollback）；Modal 直接編輯正式 threshold（無 draft）；新增／刪除物流與門檻（5／9 上限、session-only 空項規則、刪除同步 compact logistics＋全部 9 組 cells／整組門檻上移、`↑` 語意交由既有 renderer）；schema 永遠固定 5×9。

### 36.2 啟動流程正式行為

`啟動 FSS.command`：固定 `127.0.0.1:4173`、server 就緒後以 Google Chrome 開啟；啟動前以 `lsof` 偵測 4173 既有 listener，佔用即拒絕啟動且不 kill 外部 process；readiness 輪詢同時確認自身 child process 存活；本機 server 對 `.js`／`.css` 回應 `Cache-Control: no-store`，避免本機開發驗證重用舊 module。

### 36.3 邊界維持

- B／C／D 尚未接入平台；A／B／C／D 是否共用 renderer／helper／schema／registry 尚未裁決；本節不構成跨 Type 架構決策。
- `10_POP UP.png` 容量控制**已實作、已驗證**（Code Commit `0dadb5470470a91fe1aad240516697a001f9b4f0`，`feat(bn): enforce PNG size limit for A10`）：最終檔 ≤250,000 bytes（精確 bytes，非 250 KiB；舊 ≤145KB 記錄已取代）。正式 pipeline＝Canvas native PNG encode → 既有 72 dpi pHYs patch → patch 後 final Blob bytes Gate；≤250,000 直接採用 native lossless；超標才由原始 Canvas raw RGBA 進 UPNG 256-color indexed PNG（保留 alpha／tRNS、580×720 不變）→ 重新 patch 72 dpi → 再 Gate；仍超標則整次 Export failure、不產出 partial ZIP。僅 10 有 PNG capacity fallback；04／05／11／13／14／17 維持 native lossless、不經 UPNG；01／02 JPEG capacity logic 零修改；renderer／Preview／Template 零修改。依賴完全 local／offline vendor（無 CDN runtime）：`bn/js/vendor/pako.min.js`（pako@2.1.0，MIT AND Zlib，sha256 `ede2693a4a6a5126b9d35669062b358ecab6ae7b9b86a1cf302feb45a8514907`）與 `bn/js/vendor/upng.js`（upng-js@2.1.0，MIT，sha256 `b7c0bdb021dffeb82f1ac27c6762f939f967a9e4e0886518fef649331b612164`；上游原檔自帶 trailing-whitespace，屬已知 `git diff --check` vendor exception，詳見 A樣式平台整合 spec 27.9）；`bn/index.html` 載入順序 xlsx → jszip → pako → upng → app module，pako 必先於 UPNG。AI Verification 25/25 PASS（fallback 實測 95,376 bytes）、Jamie Manual Verification PASS。Requirement 與完整記錄見 `FSS_BN_A樣式平台整合_Requirement_Specification_v1.0.md` 第 27 節。
- A－01～17 正式 renderer、Launch／Viewer 於本輪零修改；Launch 仍只是校稿工具。

## 37. A－12 LPBN 掛標 variants 實際落地狀態

> 本節同步「A－12／`12_LPBN` optional 掛標 variants」已完成並經 Jamie Manual Verification PASS 的架構狀態。Code Commit 為 `dad56a465f20e064452c6866c82fcf02be2e6751`（`feat(bn): add LPBN badge variants`），且是在 Jamie 完成手動驗證後才建立；`git diff --check HEAD^ HEAD` PASS。第 36.1 節的正式 Workspace state、Restore 暫存 JSON 與 Export 三項描述，自本節起由本節 37.3～37.5 取代；第 36 節其餘內容不變。完整產品行為以 `bn/docs/FSS_BN_A12_LPBN掛標_Requirement_Specification_v1.0.md` 為準。

### 37.1 已落地範圍

- 工單 `Sheets.A` 的 `E15` 為 optional「LPBN 掛標月份」（label 位於 `D15`），正式值目前為 `9`／`10`／`11`／`12`。它是 A－12 專用資料，**不屬於** 01～12 共用 `shared` 主標／副標／保護文字，也不影響其他任何版位。
- `E15` 空白時，A－12 完全維持既有行為：Preview 單一無掛標 canvas、Export 只有 `12_LPBN.jpg`。
- `E15` 有月份且該群組三張素材齊全時，A－12 形成 base ＋ 3 個掛標 variants；既有無掛標 `12_LPBN.jpg` 永遠保留，不被 variant 取代。
- Code Commit 落地檔案：`bn/js/lpbn-badges.js`（新增）、`bn/js/import.js`、`bn/js/workspace.js`、`bn/js/app.js`、`bn/js/export.js`、`bn/css/styles.css`，以及 `bn/assets/LPBN掛標/{9,10,11,12}/` 共 12 張正式掛標 PNG。

### 37.2 掛標 assets 與 A－12-local registry 責任

- 正式掛標素材位於 `bn/assets/LPBN掛標/<month>/`，每張皆為預先製作完成的 1200 × 550 transparent PNG，與 A－12 正式 Canvas 完全同尺寸。程式不繪製掛標內容、文字、shape，也不計算座標或調整尺寸。
- 月份 → asset slots 由 `bn/js/lpbn-badges.js` 內的 **A－12-local 靜態 registry** 明確定義固定順位，不做 runtime 檔名日期推導、不依賴 HTTP directory autoindex、不依賴檔案系統回傳順序。正式順位為：`9` → `99.png`／`918.png`／`925.png`；`10` → `1010.png`／`1018.png`／`1025.png`；`11` → `1111.png`／`1118.png`／`1125.png`；`12` → `1212.png`／`1218.png`／`1225.png`，依序對應 slot 1／2／3。
- `lpbn-badges.js` 只負責四件事：月份→固定 slot asset mapping、掛標 image 載入與 Promise cache（載入失敗即從 cache 移除，後續操作可重試）、`resolveLpbnBadges()` 回傳實際可用 variants 與缺失狀態、以及由既有 base canvas 複製後疊加 overlay 的 variant composition。它是 A－12 專屬 module，**未建立通用 Badge System、Variant Framework 或 Asset Manager**，也未修改 `render-a.js` 的既有 asset loading。
- `bn/templates/A/12-lpbn.js` 於本輪**零修改**：掛標一律在既有 base render 完成後於外層疊加，A－12 layout geometry、文字規格與 shared text 行為皆不變。
- 長期維護規則：新增月份的正常維護動作為「新增該月份 3 張掛標 PNG ＋ 在此 A－12-local registry 增加一筆月份 mapping」，不應每月修改 `12-lpbn.js`，也不因此建立平台級掛標系統。

### 37.3 正式 Workspace state（取代第 36.1 節對應描述）

正式 Workspace state＝`{currentType, selectedBnId, shared, bnText, threshold, lpbnBadgeMonth}`：01～12 共用單一 `shared` 文字組（永遠同步）；13～16 各自獨立；17 為固定 5×9 的結構化 `threshold`；`lpbnBadgeMonth` 為 A－12 專用 optional top-level 值，預設空字串。Import 只讀取並保存 `E15`，**不檢查 registry、不檢查 asset 是否存在**，也不因 optional 掛標素材問題讓整份工單 Import 失敗；掛標可用性一律由 Preview／Export 於 runtime 判定。

### 37.4 Restore 暫存 JSON（取代第 36.1 節對應描述）

Restore 暫存 JSON＝`{format:"FSS BN Workspace", version:1, type:"A", selectedBnId, shared, bnText, threshold, lpbnBadgeMonth}`；覆蓋前確認、Atomic 行為不變。`lpbnBadgeMonth` 為 backward-compatible optional 欄位，**JSON version 維持 `1`、未升版**；既有不含該欄位的 v1 暫存檔仍可正常 Restore，缺值時視同空白並回到 base-only 行為。

### 37.5 Preview／Export（取代第 36.1 節對應描述）

- Preview 與 Export **共用同一個 variant resolver**，因此兩邊對「本次有哪些可用 variants、各自對應哪個 overlay 與 slot」的判定必然一致。
- Preview：左側仍是既有 17 個版位，未新增版位。選取 `12_LPBN` 且有可用 variants 時，中間 Preview 以垂直堆疊呈現 base、variant 1、variant 2、variant 3（正常完整群組為四張），總高度超出時由既有 `.preview-column` 捲動；此時每張只受 Preview 欄可用寬度限制並維持 1200:550 比例。`E15` 空白或無可用 variants 時回到既有單張 fit 行為。其他 16 個版位 Preview 行為完全不變。Editor 未新增掛標月份或掛標 1／2／3 欄位。
- Export：同一 Workspace 序列輸出 01→17；A－12 的 base 仍依既有路徑輸出 `12_LPBN.jpg`，其後依實際可用 slot 追加 `12_LPBN_1.jpg`／`12_LPBN_2.jpg`／`12_LPBN_3.jpg`。slot 缺失時 suffix **不重新編號**（例如 slot 2 缺失時輸出 `_1` 與 `_3`）。ZIP 仍為根層扁平、無資料夾、無 manifest，ZIP 名稱與 `FSS BN_MMDD.json` 規則不變；完整月份時 ZIP 圖檔數由 17 張增為 20 張（另加既有 Workspace JSON），`E15` 空白時仍為 17 張圖＋JSON。這只是 A－12 一個 item 產生額外 variants，**未改 17 版位模型、未重新設計 ZIP／JSON 架構、未修改既有 Export format 表**。
- A－12 全部 base 與 variants 皆維持 1200 × 550、JPG、72 dpi，完整沿用既有 JPEG quality 1.0 ＋ 72 dpi JFIF byte-level patch；A－12 **未新增** byte limit、quality retry 或 compression fallback。
- 掛標群組不存在，或群組存在但部分素材無法載入時，base Preview／Export 一律保留、可用 variants 繼續處理，不因 optional 掛標讓整體失敗；Export 的最終狀態訊息會保留該警告，不被結束訊息覆蓋。

### 37.6 邊界維持

- 01／02 JPEG capacity logic（`01_DDcard BN.jpg` ≤245,000 bytes、`02_MALL HBN.jpg` ≤145,000 bytes）、`10_POP UP.png` ≤250,000 bytes 之 native lossless → UPNG 256-color → fail、A－17 Manual Editor、A－01～11／13～17 renderer、01～12 shared 文字行為，於本輪全部零修改。
- `bn/templates/A/12-lpbn.js`、`bn/js/render-a.js`、`bn/js/editor.js`、`bn/index.html`、Launch／Viewer、vendor 於本輪零修改；未新增任何 dependency。
- 掛標素材在資產定位上屬 LPBN 共用資產，未來其他 Type 的 LPBN 可能共用；但**本輪正式功能只涵蓋 A－12**，B／C／D 尚未實作掛標，本節不構成跨 Type 架構決策。

## 38. B 樣式平台整合實際落地狀態

> 本節同步「B 樣式平台整合」已完成並經 Phase 5 AI Verification 與 Phase 6 Jamie 手動驗證 PASS 的架構狀態。Code Commit 為 `4f9fb723930a907b8c3956fd084e757b41302137`（`feat(bn): add style B platform integration`，parent `7e157bdaaa42aa5be1977449d3ff86c3921bbaa0`），且是在 Jamie 完成手動驗證後才建立；`git diff --check HEAD^ HEAD` PASS。第 36.3 節「B／C／D 尚未接入平台」與第 37.6 節「本輪正式功能只涵蓋 A－12，B／C／D 尚未實作掛標」兩項跨 Type 狀態描述，就**目前正式支援範圍**而言自本節起由本節取代；兩節其餘內容與各節歷史決策不變。完整產品行為以 `bn/docs/FSS_BN_B樣式平台整合_Requirement_Specification_v1.0.md`（含第 27 節）為準。

### 38.1 目前正式支援的 Type

目前正式支援的 Type 為 **A 與 B**。B－01～17 與 A－01～17 一一對應，兩者**共用同一個 Generator、同一個控制台、同一條 Import → Workspace → Preview → Restore → Export 流程，以及同一組固定 17 個正式 renderer/template definitions**。A／B 的唯一版型差異是各自使用自己的 background assets；Canvas dimensions、文字位置、字型、字級、顏色、特殊 formatting、layout、geometry、01～12 shared text、13～16 獨立文字資料結構、Editor、Preview、Export behavior 與 formats、既有 compression／capacity behavior 全部相同。B 不是另一套 renderer behavior。

C／D 仍未進入正式支援範圍（見 38.7）。

### 38.2 Type → background asset base

`bn/js/render-a.js` 仍為實際的正式 renderer integration 檔案，沿用既有 17 個 A renderer/template definitions 與既有 registry（registry 只存檔名，17 筆 entry 零修改）。background base 依 `currentType` 解析：

- Type A → `bn/assets/A/底圖/`
- Type B → `bn/assets/B/底圖/`
- 非 A／B → 明確失敗，**不 fallback 至 A 或 B**

17 的 `17_主標題.png` 與 `17_VIP.png` 同樣依 `currentType` 自對應 Type 目錄取得。image cache 沿用既有機制（key 為解析後完整 URL）。未建立 B renderer 檔案、B template registry、B templates 或 generic renderer framework。檔名 `render-a.js` 現同時服務 A 與 B，**未 rename**。

### 38.3 Type → Excel worksheet

- Type A → worksheet `A`；Type B → worksheet `B`；**無 fallback**，不取「第一個 worksheet」。
- 樣式驗證發生於 worksheet lookup **之前**，因此工單內即使實際存在其他 worksheet 也不會被讀取。
- A／B 共用同一組 validation anchors（`A15`／`A16`／`A17`）、同一組 cell mapping、同一套 validation schema；未建立第二套 mapping。01～12 為 `B15`／`B16`／`B17`；13 為 `L20`／`L21`；14 為 `L22`／`L23`；15 為 `L24`／`L25`；16 為 `L26`／`L27`／`O26`／`O27`；B－12 掛標月份為 B worksheet `E15`；17 為 `I29`、`I32:M33`、9 組門檻列（起始列 35）、`I53`／`I54`／`I55`。
- Import 成功後保留實際 `currentType`；Import 失敗訊息反映實際 Type／worksheet，且 Type A 的既有三則訊息在 Type A 下維持逐字相同。Import 失敗維持既有 Atomic 語意。

### 38.4 Workspace 與 Restore

Workspace Data **未因 B 重新設計**，維持既有 `currentType`／`selectedBnId`／`shared`／`bnText`／`threshold`／`lpbnBadgeMonth`；未新增任何 B-specific schema 或欄位，`bn/js/workspace.js` 零修改。暫存 JSON 的 `type` 採用 Workspace 實際 Type（A workspace → `"A"`、B workspace → `"B"`）。Restore 正式接受 A 與 B，並依 JSON 自己的 `type` 完整恢復，不需使用者先手動切換樣式；其他值一律 reject 且 Workspace 不被替換。ZIP `FSS BN_MMDD.zip` 與暫存 JSON `FSS BN_MMDD.json` 的命名規則未變。

### 38.5 B－12 掛標沿用

B－12 已正式支援與 A－12 相同的掛標流程：base 為 `bn/assets/B/底圖/12_LPBN.jpg`，月份取自 B worksheet `E15`（正式月份 9／10／11／12），overlay assets 仍共用既有 `bn/assets/LPBN掛標/<月份>/`。`E15` 空白只輸出 base，完整合法月份輸出 base ＋ 三張 variants。`bn/js/lpbn-badges.js` 於本輪**零修改**；未建立 B-specific badge assets、B badge registry 或通用 Badge System。A／B variants 均為 JPG、1200 × 550、72 dpi；`12_LPBN` 目前無 byte limit。

### 38.6 B－17 沿用

B－17 完整沿用 A－17 的 threshold schema、renderer、geometry、Manual Editor、Preview 與 Export，資料來源改為 B worksheet 但 mapping 與 schema 相同。Manual Editor 對 A 與 B 皆可用；A－17 Manual Editor 為 LOCKED，未重新設計，Modal 本身零修改。未建立 B-specific threshold schema、B－17 renderer 或 B-specific Editor。

### 38.7 C／D 邊界

C／D 仍未進入正式支援範圍。落地後行為為：Import 在 worksheet lookup 前明確 reject、Preview 明確失敗且不顯示 A 或 B 背景、Export 因 render 階段即失敗而不產出任何成品、`type` 為 C／D 的暫存 JSON 一律 reject。**工單內存在 C／D worksheet 不代表 C／D 已支援；UI 可選擇 C／D 卡片亦不代表 renderer 已支援。** 本輪未為 C／D 建立任何 mapping、asset resolver、Requirement 或功能，UI 樣式卡片未修改。第 14 節「尚未定案事項」中的「每一種 Type 的完整 Excel 欄位」與「暫存 JSON Schema」，就 A 與 B 而言已由各自 Requirement 正式定案，對 C／D 及未來 Type 仍然適用。

### 38.8 邊界維持

- `bn/templates/A/*.js`（17 檔）、`bn/js/lpbn-badges.js`、`bn/js/workspace.js`、`bn/js/editor.js`、`bn/js/banwords*.js`、`bn/index.html`、`bn/css/`、`bn/js/vendor/*`、`bn/assets/A/*`、`bn/assets/LPBN掛標/*`、`bn/launch/*` 與正式工單 Excel，於本輪全部零修改；未新增任何程式檔或 dependency。
- 01／02 JPEG capacity logic、`10_POP UP.png` ≤250,000 bytes 之 native lossless → UPNG 256-color → fail、既有 compression ladder、72 dpi 行為、A－17 Manual Editor 與 A－01～17 renderer 行為，於本輪全部零修改。
- `bn/assets/B/底圖/` 18 個正式 assets 已於本次 Code Commit 正式納入版控；其中 15／16／17 對應素材與 A 相同屬正式狀態，不是缺漏或暫存。
- 本節不建立 Registry、Framework、Build System、shared/common/base renderer 或任何跨 Type 抽象層，也不預先決定 C／D 的實作方式。

## 39. D－01 正式 Template 實際落地狀態

> 本節同步樣式 D／`01_DDcard BN`（D－01）**單一版位**的正式 Template 與人工對位驗證入口已完成，且經 Phase 6 Jamie 手動對位驗證 PASS 的架構狀態。Code Commit 為 `1139a7c3eca005b15c24bef7751ebb0ada740fe1`（`feat(bn): add D01 DDcard template`，parent `88bd112729a061d012c23d780c4d6718766c8823`），且是在 Jamie 完成手動驗證後才建立；`git diff --check HEAD^ HEAD` PASS。**本節只記錄 D－01 一個版位的 Template 落地，不是「D 樣式正式平台整合完成」**；第 38 節「目前正式支援的 Type 為 A 與 B」與 38.7 節 C／D 邊界**未被本節取代，仍然有效**。完整需求與實作規劃見 `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md` 的「D－01 Requirement」章節與 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 的「D－01 Proposal」章節；樣式 D 只維護這兩份總文件，不建立逐版位 Requirement／Proposal 文件。

### 39.1 已落地檔案

- `bn/templates/D/01-ddcard-bn.js`：D－01 唯一正式 renderer，為 D-specific template definition。
- `bn/launch/D/01_DDcard BN.command`：D－01 專用直接啟動入口，Git mode 為 `100755`。
- `bn/launch/viewer.html`：共用薄 Viewer，最小增加**只服務 D－01** 的校稿 branch；A－01～17 既有 branch 全部未修改。
- `bn/assets/D/Logo.png`：D－01 正式固定 Logo asset（原始 784 × 112 PNG）。
- `bn/assets/D/底圖/01_DDcard BN.jpg`：D－01 正式 runtime 底圖（531 × 792）。
- `bn/assets/D/對位/01_DDcard BN.png`：只供 Launch 視覺校稿的正式對位圖（531 × 792）。

本次只納管上列三個 D－01 素材；`bn/assets/D/` 底下 D－02～16 的其餘素材仍未納入版控，屬尚未開發版位。

### 39.2 D－01 renderer 行為

D－01 維持 531 × 792px 正式 Canvas。三個文字框沿用 A／B－01 已驗證的 typography、顏色、字數規則與 ink bounding-box 水平＋垂直置中行為：主標 Medium 30pt `#ffffff`、副標 Bold 45pt `#fff285`、副標 `$`／`%` Bold 37pt（既有 tokenization 與相鄰 ordinary run 邊界字 ink-bottom 對齊行為完整保留）、保護文字 Medium 18pt `#a6f4e6`。Medium 主標與保護文字沿用 template-local 2× 暫存 Canvas rasterization 後高品質縮回正式尺寸，Bold 副標不進 2× pass。

D－01 相對 A／B－01 的差異只有兩項：文字 placement 與新增固定 Logo。文字框為 headline `{left:90, top:170, width:351, height:37}`、subheadline `{left:43, top:221, width:445, height:57}`、protectionText `{left:43, top:296, width:445, height:22}`，即 A／B－01 對應框整體下移 29px，`left`／`width`／`height` 相同。

固定 Logo box 為 `{left:90, top:103, width:351, height:50}`。Logo 以 contain 等比例縮放完整落入該 box 後水平＋垂直置中：source 784 × 112、`scale = min(351/784, 50/112) = 25/56`，destination 為 350 × 50、`x = 90.5`、`y = 103`。`x` 保留 fractional `90.5` 以維持精確置中，**不做 rounding**；亦**不 stretch 成 351 × 50、不 cover、不 crop、不裁切 source**。Logo 繪製自成一組 `save()` → `imageSmoothingEnabled = true` → `imageSmoothingQuality = "high"` → `drawImage()` → `restore()`，不依賴 Medium 2× pass 內部的 smoothing state，也不放進 Medium 2× surface。Logo 的 PNG alpha 由既有 `source-over` 與 `globalAlpha = 1` 自然合成，未新增任何 blending／compositing。

完整 draw order 為 **background → Logo → Medium local 2×（主標＋保護文字）→ Bold 副標**。四個 box 互不重疊。

Logo 為**固定 renderer asset**：不由 Excel 帶入、不進 Editor、不進 Workspace state、不進暫存 JSON schema。固定素材（底圖、Logo）由 caller 載入完成後以 images object 傳入 renderer，renderer 本身不自行載圖、不做 cache；此 invocation 形狀沿用 A－17 既有的 images-object 慣例，未新增第四參數、未建立新 cache 或 asset framework。

### 39.3 Launch 校稿路徑（不是正式 Preview／Export）

D－01 route 為 `viewer.html?type=D&bn=01_DDcard%20BN`。`.command` 沿用 A launcher 既有行為：`127.0.0.1:4173`、repo root 推導、viewer path、server reuse、readiness marker、curl 判定、`trap` 收尾與 `open` 行為全部相同，只調整 D 專屬 URL 與識別名稱。Canvas、Preview 與 overlay 均為 531 × 792；對位 PNG 以原始 Alpha、同原點及原尺寸 1:1 疊加，**不合成進正式 Canvas**，亦不進入任何輸出。Logo 由 renderer 真正畫入 Canvas，不是 DOM overlay；關閉對位圖開關後 Logo 與三段文字仍留在 Canvas 上。

Viewer 的 D－01 branch 沿用既有 `fieldConfig` 機制提供 D－01 專用測試文字，並沿用既有 IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限與超限 rollback：主標 `宅配免運無限加碼`（8.0 units）、副標 `宅配滿$490再9%`（7.0 units）、保護文字 `免運優惠須依店家適用之物流方案為主`（17.0 units）。三者皆取字數上限以最大化 ink 寬度；副標同時包含 `$` 與 `%`，覆蓋 `$`→後方 ordinary run 與 `%`→前方 ordinary run 兩條 formatting 路徑。A－01～12 共用預設測試字串未修改。

Launch 與 Viewer 仍只是正式 Template 的開發／視覺校稿工具，**不是第二套 Generator、不是正式控制台 Preview、不是正式資料輸入流程**。本節不得被解讀為正式 Preview／Export call chain。

### 39.4 正式平台邊界（D 仍 fail-closed）

- **目前正式支援的 Type 仍為 A 與 B**；`bn/js/import.js` 的 `SUPPORTED_TYPES` 仍為 `["A", "B"]`，`bn/js/render-a.js` 的 `ASSET_BASE_BY_TYPE` 仍只有 A 與 B。
- 正式 renderer registry **尚未 enable D**：`A_TABLE` 未加入 type 維度，也未加入任何 D entry。D－01 的 renderer 目前只能經由 `bn/launch/` 校稿路徑執行。
- 樣式 D 在正式平台**維持 fail-closed**，行為與 38.7 節相同：Import 在 worksheet lookup 前明確 reject、Preview 明確失敗且不 fallback 至 A 或 B 背景、Export 因 render 階段即失敗而不產出任何成品、`type` 為 D 的暫存 JSON 一律 reject。UI 樣式卡片未修改；**可選擇 D 卡片不代表 D 已支援**。
- 因此 D 的正式 Excel worksheet Import、Restore、控制台 Preview 與 Export 均**尚未 enable**；D－01 的正式 Preview ↔ Export 一致性實測，以及版位 01 的 JPG／72 dpi／≤245,000 bytes 實測，**deferred until D platform integration**。
- 「D 有自己的 worksheet `D`，工單配置與 A／B 相同，01～12 仍為 `B15`／`B16`／`B17`」屬**已確認的產品需求**，是未來 D platform integration 應遵循的依據，**不代表目前平台已可 Import D**。

### 39.5 邊界維持

- `bn/js/render-a.js`、`bn/js/import.js`、`bn/js/workspace.js`、`bn/js/export.js`、`bn/js/app.js`、`bn/js/editor.js`、`bn/js/banwords*.js`、`bn/js/lpbn-badges.js`、`bn/js/vendor/*`、`bn/index.html`、`bn/css/`、`bn/templates/A/*.js`（17 檔）、`bn/launch/A/*.command`（17 檔）、`bn/assets/A/*`、`bn/assets/B/*`、`bn/assets/LPBN掛標/*`、fonts 與正式工單 Excel，於本輪全部零修改。
- A－01～17 與 B－01～17 的 renderer 行為、Preview 與 Export 輸出未改變；既有 compression／capacity behavior、72 dpi 行為與 A－17 Manual Editor 未修改。
- 本節的 D-specific template 裁決**只代表 D－01**。D－02～17 尚未完成，不得據本節推論其餘 D 版位都必須建立 D-specific template；未確認的 D 版位差異不得預先補完。
- 本節未建立 Registry、Framework、Build System、plugin system、generic asset framework、共用 scale helper、shared/common/base renderer 或任何跨 Type／跨版位抽象層，也不預先決定 C 或 D－02～17 的實作方式。樣式 C 不在本輪範圍。

## 40. D－02 正式 Template 實際落地狀態

> 本節同步樣式 D／`02_MALL HBN`（D－02）**單一版位**的正式 Template 與人工對位驗證入口已完成，且經 Phase 6 Jamie 手動對位驗證 PASS 的架構狀態。Code Commit 為 `9c9272704517743ae7d8ccdd73c5a5a7bae8c534`（`feat(bn): add D02 MALL HBN template`，parent `e77fe6b96ebc32aba2159ddb9a010e88f3bbec4d`），且是在 Jamie 完成手動驗證後才建立；`git diff --check HEAD^ HEAD` PASS。**本節只記錄 D－02 一個版位的 Template 落地，不是「D 樣式正式平台整合完成」**；第 38 節「目前正式支援的 Type 為 A 與 B」與 38.7 節 C／D 邊界**未被本節取代，仍然有效**。完整需求見 `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md` 的「D－02 Requirement」章節，實作紀錄見 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 的「D－02 Implementation Record」章節；樣式 D 只維護這兩份總文件，不建立逐版位 Requirement／Proposal 文件。

### 40.1 已落地檔案

- `bn/templates/D/02-mall-hbn.js`：D－02 唯一正式 renderer，為 D-specific template definition。
- `bn/launch/D/02_MALL HBN.command`：D－02 專用直接啟動入口，Git mode 為 `100755`。
- `bn/launch/viewer.html`：共用薄 Viewer，最小增加**只服務 D－02** 的校稿 branch（+16／−1，2 個 hunk）；A－01～17 與 D－01 既有 branch 全部未修改。
- `bn/assets/D/底圖/02_MALL HBN.jpg`：D－02 正式 runtime 底圖（1200 × 360）。
- `bn/assets/D/對位/02_MALL HBN.png`：只供 Launch 視覺校稿的正式對位圖（1200 × 360）。

固定 Logo `bn/assets/D/Logo.png`（原始 784 × 112）**已於 D－01 Code Commit 納管，D－02 僅引用，不在本次 Code Commit 內**，未修改、未重存、未建立第二份副本。`bn/assets/D/` 底下 D－03～16 的其餘素材仍未納入版控，屬尚未開發版位。

### 40.2 D－02 renderer 行為

D－02 維持 1200 × 360px 正式 Canvas。三個文字框與 A／B－02 **完全相同**：主標 `98,153,351,37`、副標 `98,200,445,57`、保護文字 `98,273,445,22`；typography、顏色、字數規則（8／7／17）、ink bounding-box **靠左＋靠上**定位與副標 `$`／`%` 特殊 formatting 全部沿用 A／B－02。D－02 template 的 8 個共用文字 helper 與 A－02 逐位元組相同。Medium 主標與保護文字沿用 template-local 2× 暫存 Canvas（offscreen 2400 × 720）後高品質縮回正式尺寸；Bold 副標與 Logo 皆不進 2× pass。

D－02 相對 A／B－02 的差異只有一項：**新增固定 Logo**。Logo box 為 `{left:98, top:96, width:351, height:50}`；以 contain 等比例縮放，`scale = min(351/784, 50/112) = 25/56`，destination 為 **350 × 50、`x = 98`、`y = 96`**，**水平靠左**（destination x 取 box left，未套用 D－01 的水平置中公式）；垂直餘量恰為 0，故靠上與置中結果相同。四個 destination 值皆為整數，實作未做 rounding；亦**不 stretch 成 351 × 50、不 cover、不 crop、不裁切 source**。Logo 繪製自成一組 `save()` → `imageSmoothingEnabled = true` → `imageSmoothingQuality = "high"` → `drawImage()` → `restore()`，不依賴 Medium 2× 的 smoothing state、不放進 Medium 2× surface。Logo 的 PNG alpha 由既有 `source-over` 與 `globalAlpha = 1` 自然合成，未新增 blending／compositing。

完整 draw order 為 **background → Logo → Medium local 2×（主標＋保護文字）→ Bold 副標**。四個 box 互不重疊。

Logo 為**固定 renderer asset**：不由 Excel 帶入、不進 Editor、不進 Workspace state、不進暫存 JSON schema。固定素材（底圖、Logo）由 caller 載入完成後以 images object `{ backgroundImage, logoImage }` 傳入 renderer；renderer 本身不自行載圖、不做 cache，exports 恰為 `waitForMallHbnFonts` 與 `renderMallHbn`，且維持 A－02 既有的 fit validation 回傳行為。**未修改已封箱的 A－02 template、未與 D－01 合併成 generic D renderer。**

### 40.3 Launch 校稿路徑（不是正式 Preview／Export）

D－02 route 為 `viewer.html?type=D&bn=02_MALL%20HBN`。`.command` 沿用 A－02 launcher 既有行為（僅 7 行識別差異）：`127.0.0.1:4173`、repo root 推導、viewer path、server reuse、readiness marker、curl 判定、`trap` 收尾與 `open` 行為全部相同。Canvas、Preview 與 overlay 均為 1200 × 360；對位 PNG 以原始 Alpha、同原點及原尺寸 1:1 疊加，**不合成進正式 Canvas**，亦不進入任何輸出。Logo 由 renderer 真正畫入 Canvas，不是 DOM overlay；關閉對位圖開關後 Logo 與三段文字仍留在 Canvas 上。

Viewer 的 D－02 branch **未設 `fieldConfig`**，沿用既有 01～12 shared default 測試文字並沿用既有 IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限與超限 rollback；A－01～12 共用預設測試字串未修改。`logoSource`／`logoImage` 宣告、Logo 載入區與共用 `render()` 均沿用 D－01 已建立的機制，未再改動；A－01～16 收到的第二參數仍為原本同一個 `backgroundImage` 物件，A－17 獨立 threshold path 未變。

Launch 與 Viewer 仍只是正式 Template 的開發／視覺校稿工具，**不是第二套 Generator、不是正式控制台 Preview、不是正式資料輸入流程**，不得被解讀為正式 Preview／Export call chain。

### 40.4 正式平台邊界（D 仍 fail-closed）

- **目前正式支援的 Type 仍為 A 與 B**；`bn/js/import.js` 的 `SUPPORTED_TYPES` 仍為 `["A", "B"]`，`bn/js/render-a.js` 的 `ASSET_BASE_BY_TYPE` 仍只有 A 與 B。
- 正式 renderer registry **尚未 enable D**：`A_TABLE` 未加入 type 維度，也未加入任何 D entry。D－02 的 renderer 目前只能經由 `bn/launch/` 校稿路徑執行。
- 樣式 D 在正式平台**維持 fail-closed**，行為與 38.7 節相同；**可選擇 D 卡片不代表 D 已支援**。
- D 的正式 Excel worksheet Import、Restore、控制台 Preview 與 Export 均**尚未 enable**；D－02 的正式 Preview ↔ Export 一致性實測，以及版位 02 既有鎖定的 **JPG／72 dpi／≤ 145,000 bytes** 實測，**deferred until D platform integration**（本次逐版位工作未執行 D Export 實測，不得記為已驗證）。
- 「D 有自己的 worksheet `D`，工單配置與 A／B 相同，01～12 仍為 `B15`／`B16`／`B17`」屬**已確認的產品需求**，是未來 D platform integration 應遵循的依據，**不代表目前平台已可 Import D**。

### 40.5 邊界維持

- `bn/js/render-a.js`、`bn/js/import.js`、`bn/js/workspace.js`、`bn/js/export.js`、`bn/js/app.js`、`bn/js/editor.js`、`bn/js/banwords*.js`、`bn/js/lpbn-badges.js`、`bn/js/vendor/*`、`bn/index.html`、`bn/css/`、`bn/templates/A/*.js`（17 檔）、`bn/launch/A/*.command`（17 檔）、`bn/templates/D/01-ddcard-bn.js`、`bn/launch/D/01_DDcard BN.command`、`bn/assets/A/*`、`bn/assets/B/*`、`bn/assets/D/Logo.png`、`bn/assets/LPBN掛標/*`、fonts、正式工單 Excel 與所有既有文件，於本輪全部零修改。
- A－01～17 與 B－01～17 的 renderer 行為、Preview 與 Export 輸出未改變；D－01 行為未改變；既有 compression／capacity behavior、72 dpi 行為與 A－17 Manual Editor 未修改。
- 本節的 D-specific template 裁決**只代表 D－02**。D－03～17 尚未完成，不得據本節推論其餘 D 版位都必須建立 D-specific template；未確認的 D 版位差異不得預先補完。
- 本節未建立 Registry、Framework、Build System、plugin system、generic asset framework、共用 scale helper、共用 Logo helper 或任何跨 Type／跨版位抽象層，也不預先決定 C 或 D－03～17 的實作方式。樣式 C 不在本輪範圍。

（後續同步：D－03 已完成，見第 41 節；本節其餘內容維持不變。）

---

## 41. D－03 正式 Template 實際落地狀態

> 本節同步樣式 D／`03_Coin page BN`（D－03）**單一版位**的正式 Template 與人工對位驗證入口已完成，且經 Phase 6 Jamie 手動對位驗證 PASS 的架構狀態。Code Commit 為 `024c621e2c61bd40d3b736af7487b22e332d0273`（`feat(bn): add D03 Coin page BN template`，parent `de1d98a70aa6e29e95397a913a46e0a30e01b7af`），且是在 Jamie 完成手動驗證後才建立；`git diff --check HEAD^ HEAD` PASS。**本節只記錄 D－03 一個版位的 Template 落地，不是「D 樣式正式平台整合完成」**；第 38 節「目前正式支援的 Type 為 A 與 B」與 38.7 節 C／D 邊界**未被本節取代，仍然有效**。完整需求見 `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md` 的「D－03 Requirement」章節（完成狀態見其 9.15 節），實作紀錄見 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 的「D－03」章節（落地紀錄見其 8.15 節）；樣式 D 只維護這兩份總文件，不建立逐版位 Requirement／Proposal 文件。

### 41.1 已落地檔案

- `bn/templates/D/03-coin-page-bn.js`：D－03 唯一正式 renderer，為 D-specific template definition。
- `bn/launch/D/03_Coin page BN.command`：D－03 專用直接啟動入口，Git mode 為 `100755`。
- `bn/launch/viewer.html`：共用薄 Viewer，最小增加**只服務 D－03** 的校稿 branch（+16／−1）；A－01～17 與 D－01、D－02 既有 branch 全部未修改。
- `bn/assets/D/底圖/03_Coin page BN.jpg`：D－03 正式 runtime 底圖（JPEG 1200 × 391）。
- `bn/assets/D/對位/03_Coin page BN.png`：只供 Launch 視覺校稿的正式對位圖（PNG 1200 × 391）。

固定 Logo `bn/assets/D/Logo.png`（原始 784 × 112）**已於 D－01 Code Commit 納管，D－03 僅引用，不在本次 Code Commit 內**，未修改、未重存、未建立第二份副本。`bn/assets/D/` 底下 D－04～16 的其餘 26 個素材仍未納入版控，屬尚未開發版位。

### 41.2 D－03 renderer 行為

D－03 維持 1200 × 391px 正式 Canvas。三個文字框與 A／B－03 **完全相同**：主標 `92,168,395,46`、副標 `92,225,500,64`、保護文字 `92,302,500,25`；typography（主標 Medium 37pt `#ffffff`、副標 Bold 50pt `#fff285`、副標 `$`／`%` Bold 40pt、保護文字 Medium 21pt `#a6f4e6`）、字數規則（8／7／17）、ink bounding-box **靠左＋靠上**定位（`textAlign="left"`／`textBaseline="alphabetic"`）與副標 `$`／`%` 特殊 formatting、boundary glyph ink-bottom 對齊、fit validation 全部沿用 A／B－03。D－03 template 的 8 個共用文字 helper 與 A－03 逐位元組相同，且未新增 A－01 式「主標與保護文字皆空即早退」guard。Medium 主標與保護文字沿用 template-local 2× 暫存 Canvas（offscreen **2400 × 782**）後高品質縮回正式尺寸；Bold 副標與 Logo 皆不進 2× pass。

D－03 相對 A／B－03 的差異只有一項：**新增固定 Logo**。Logo box 為 `{left:92, top:107, width:351, height:50}`；以 contain 等比例縮放，`scale = min(351/784, 50/112) = 25/56`，destination 為 **350 × 50、`x = 92`、`y = 107`**，**水平靠左**（destination x 取 box left，未套用置中公式）；水平餘量 1px 保留在右側，垂直餘量恰為 0，故靠上與置中結果相同。四個 destination 值皆為整數，實作未做 rounding（無 `Math.round`／`floor`／`ceil`／`trunc`／`toFixed`／`parseInt`／bitwise truncation）；亦**不 stretch 成 351 × 50、不 cover、不 crop、不裁切 source**（source rect 完整）。原 Photoshop CSS 的 `{687, 508, 351, 50}` 已裁決為誤植（該 `top` 在 1200 × 391 canvas 上垂直無效），未出現於實作。Logo 繪製自成一組 `save()` → `imageSmoothingEnabled = true` → `imageSmoothingQuality = "high"` → `drawImage()` → `restore()`，不依賴 Medium 2× 的 smoothing state、不放進 Medium 2× surface。Logo 的 PNG alpha 由既有 `source-over` 與 `globalAlpha = 1` 自然合成，未新增 blending／compositing。

完整 draw order 為 **background → Logo → Medium local 2×（主標＋保護文字）→ Bold 副標**。四個 box 互不重疊。

Logo 為**固定 renderer asset**：不由 Excel 帶入、不進 Editor、不進 Workspace state、不進暫存 JSON schema。固定素材（底圖、Logo）由 caller 載入完成後以 images object `{ backgroundImage, logoImage }` 傳入 renderer；renderer 本身不自行載圖、不做 cache，exports 恰為 `waitForCoinPageBnFonts` 與 `renderCoinPageBn`（零 import），且維持 A－03 既有的 fit validation 回傳行為。**未修改已封箱的 A－03 template、未與 D－01／D－02 合併成 generic D renderer。**

### 41.3 Launch 校稿路徑（不是正式 Preview／Export）

D－03 route 為 `viewer.html?type=D&bn=03_Coin%20page%20BN`。`.command` 沿用 A－03 launcher 既有行為（僅 7 行識別差異，未重構）：`127.0.0.1:4173`、repo root 推導、viewer path、server reuse、readiness marker、curl 判定、`trap` 收尾與 `open` 行為全部相同。Canvas、Preview 與 overlay 均為 1200 × 391；對位 PNG 以原始 Alpha、同原點及原尺寸 1:1 疊加，**不合成進正式 Canvas**，亦不進入任何輸出。Logo 由 renderer 真正畫入 Canvas，不是 DOM overlay；關閉對位圖開關後 Logo 與三段文字仍留在 Canvas 上。

Viewer 的 D－03 branch **未設 `fieldConfig`**，沿用既有 01～12 shared default 測試文字並沿用既有 IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限與超限 rollback；A－01～12 共用預設測試字串未修改。`logoSource`／`logoImage` 宣告、Logo 載入區與共用 `render()` 的 images-object ternary 均沿用 D－01 已建立的機制，未再改動；A－01～16 收到的第二參數仍為原本同一個 `backgroundImage` 物件，A－17 獨立 threshold path 未變。

Launch 與 Viewer 仍只是正式 Template 的開發／視覺校稿工具，**不是第二套 Generator、不是正式控制台 Preview、不是正式資料輸入流程**，不得被解讀為正式 Preview／Export call chain；Jamie 的 PASS 是**人工對位 PASS**，不是正式平台 Preview／Export PASS。

### 41.4 正式平台邊界（D 仍 fail-closed）

- **目前正式支援的 Type 仍為 A 與 B**；`bn/js/import.js` 的 `SUPPORTED_TYPES` 仍為 `["A", "B"]`，`bn/js/render-a.js` 的 `ASSET_BASE_BY_TYPE` 仍只有 A 與 B。
- 正式 renderer registry **尚未 enable D**：`A_TABLE` 未加入 type 維度，也未加入任何 D entry。D－03 的 renderer 目前只能經由 `bn/launch/` 校稿路徑執行。
- 樣式 D 在正式平台**維持 fail-closed**，行為與 38.7 節相同；**可選擇 D 卡片不代表 D 已支援**。
- D 的正式 Excel worksheet Import、Restore、控制台 Preview 與 Export 均**尚未 enable**；D－03 的正式 Preview ↔ Export 一致性實測，以及版位 03 既有鎖定的 **JPG／72 dpi**（由既有 `EXPORT_ITEMS` 以版位 id 提供，與樣式 type 無關；**版位 03 無 byte 容量上限**，與 01 的 ≤245,000 bytes、02 的 ≤145,000 bytes 不同）實測，**deferred until D platform integration**（本次逐版位工作未執行 D Export 實測，不得記為已驗證）。
- 「D 有自己的 worksheet `D`，工單配置與 A／B 相同，01～12 仍為 `B15`／`B16`／`B17`」屬**已確認的產品需求**，是未來 D platform integration 應遵循的依據，**不代表目前平台已可 Import D**。

### 41.5 邊界維持

- `bn/js/render-a.js`、`bn/js/import.js`、`bn/js/workspace.js`、`bn/js/export.js`、`bn/js/app.js`、`bn/js/editor.js`、`bn/js/banwords*.js`、`bn/js/lpbn-badges.js`、`bn/js/vendor/*`、`bn/index.html`、`bn/css/`、`bn/templates/A/*.js`（17 檔）、`bn/launch/A/*.command`（17 檔）、`bn/templates/D/01-ddcard-bn.js`、`bn/templates/D/02-mall-hbn.js`、`bn/launch/D/01_DDcard BN.command`、`bn/launch/D/02_MALL HBN.command`、`bn/assets/A/*`、`bn/assets/B/*`、`bn/assets/D/Logo.png`、`bn/assets/LPBN掛標/*`、fonts、正式工單 Excel 與所有既有文件，於 D－03 Code Commit 全部零修改。
- A－01～17 與 B－01～17 的 renderer 行為、Preview 與 Export 輸出未改變；D－01、D－02 行為未改變；既有 compression／capacity behavior、72 dpi 行為與 A－17 Manual Editor 未修改。
- 本節的 D-specific template 裁決**只代表 D－03**。D－04～17 尚未完成，不得據本節推論其餘 D 版位都必須建立 D-specific template；未確認的 D 版位差異不得預先補完。
- 本節未建立 Registry、Framework、Build System、plugin system、generic asset framework、共用 scale helper、共用 Logo helper 或任何跨 Type／跨版位抽象層，也不預先決定 C 或 D－04～17 的實作方式。樣式 C 不在本輪範圍。

（後續同步：D－06 已完成，見第 42 節；本節其餘內容維持不變。）

---

## 42. D－06 正式 Template 實際落地狀態

> 本節同步樣式 D／`06_IG`（D－06）**單一版位**的正式 Template 與人工對位驗證入口已完成，且經 Phase 6 Jamie 手動 1:1 overlay 對位驗證 PASS 的架構狀態。Code Commit 為 `5def9469d21336787dc35553ff7a17ffde9eac48`（`feat(bn): add D06 IG template`，parent `5a2ba2ffa40254f2b3c45cab5e8fa4051b9505db`），且是在 Jamie 完成手動驗證後才建立；`git diff --check HEAD^ HEAD` PASS。**本節只記錄 D－06 一個版位的 Template 落地，不是「D 樣式正式平台整合完成」**；第 38 節「目前正式支援的 Type 為 A 與 B」與 38.7 節 C／D 邊界**未被本節取代，仍然有效**。完整需求見 `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md` 的「D－06 Requirement」章節（完成狀態見其 10.16 節），實作紀錄見 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 的「D－06」章節（落地紀錄見其 9.19 節）；樣式 D 只維護這兩份總文件，不建立逐版位 Requirement／Proposal 文件。

### 42.1 已落地檔案

- `bn/templates/D/06-ig.js`：D－06 唯一正式 renderer，為 D-specific template definition（406 行、零 import、exports 恰 `waitForIgFonts` 與 `renderIg`）。
- `bn/launch/D/06_IG.command`：D－06 專用直接啟動入口，Git mode 為 `100755`。
- `bn/launch/viewer.html`：共用薄 Viewer，最小增加**只服務 D－06** 的校稿 branch（+16／−1）；A－01～17 與 D－01、D－02、D－03 既有 branch 全部未修改。
- `bn/assets/D/底圖/06_IG.jpg`：D－06 正式 runtime 底圖（JPEG 900 × 1600）。
- `bn/assets/D/對位/06_IG.png`：只供 Launch 視覺校稿的正式對位圖（PNG 900 × 1600）。

固定 Logo `bn/assets/D/Logo.png`（原始 784 × 112）**已於 D－01 Code Commit 納管，D－06 僅引用，不在本次 Code Commit 內**，未修改、未重存、未再次納管、未建立第二份副本。`bn/assets/D/` 底下 D－04、D－05、D－07～16 的其餘 24 個素材仍未納入版控，屬尚未開發版位。

### 42.2 D－06 renderer 行為

D－06 維持 900 × 1600px 正式 Canvas。三個文字框與 A／B－06 **完全相同**：主標 `175,387,550,65`、副標 `136,472,630,82`、保護文字 `136,573,630,37`；typography（主標 Medium `52.5pt` `#ffffff`、副標 Bold `65pt` `#fff285`、副標 `$`／`%` Bold `55pt` `#fff285`、保護文字 Medium `30pt` `#a6f4e6`）、字數規則（8／7／17）、**actualBoundingBox-based ink bounding-box 水平＋垂直置中**定位（`textAlign="left"`／`textBaseline="alphabetic"`）與副標 `$`／`%` 特殊 formatting（`tokenizeSubheadline`／`adjacentOrdinaryRun`／`boundaryGlyphInkBottom` 的 boundary glyph ink-bottom 對齊）、fit validation 全部沿用 A／B－06。D－06 template 的 8 個共用文字 helper 與 A－06 比對為 **6/8 逐位元組相同**＋ **2/8 behavior-equivalent**（`measureRun`、`boundaryGlyphInkBottom` 各一行 runtime error message 的版位標示由 `A－06` 改為 `D－06`，沿用 D template 不殘留 A 版位標示之慣例；演算法、控制流與回傳值零差異）。Medium 主標與保護文字沿用 template-local 2× 暫存 Canvas（offscreen **1800 × 3200**）後高品質縮回正式尺寸；Bold 副標與 Logo 皆不進 2× pass，且未新增 A－01 式「兩段 Medium 都空就整體 early return」guard。

D－06 相對 A／B－06 的差異只有一項：**新增固定 Logo**。Logo box 為 `{left:161, top:282, width:580, height:82}`；以 contain 等比例縮放，`scale = min(580/784, 82/112) = 41/56`，destination 為 **574 × 82**，並在 box 內**水平＋垂直置中**：`destinationX = box.left + (box.width − destinationWidth) / 2 = 164`、`destinationY = box.top + (box.height − destinationHeight) / 2 = 282`；水平餘量 3px 平分於左右，垂直餘量恰為 0。四個 destination 值皆為整數，實作未做 rounding／truncation；亦**不 stretch 成 580 × 82、不 cover、不 crop、不裁切 source**（source rect 完整 `0, 0, 784, 112`）。原 Photoshop／CSS 的 `left`（`2020`／`2034`／`1995`）已裁決為座標偏移資料（固定 `Δleft = 1859`、`Δtop = 0`），屬**已更正之歷史原始值，未出現於實作、不得再使用**。Logo 繪製自成一組 `save()` → `imageSmoothingEnabled = true` → `imageSmoothingQuality = "high"` → `drawImage()` → `restore()`，不依賴 Medium 2× 的 smoothing state。Logo 的 PNG alpha 由既有 `source-over` 與 `globalAlpha = 1` 自然合成，未新增 blending／compositing／filter。

完整 draw order 為 **background → Logo → Medium local 2×（主標＋保護文字）→ Bold 副標**。四個 box 互不重疊（Logo bottom = 364 < 主標 top = 387）。

Logo 為**固定 renderer asset**：不由 Excel 帶入、不進 Editor、不進 Workspace state、不進暫存 JSON schema。固定素材（底圖、Logo）由 caller 載入完成後以 images object `{ backgroundImage, logoImage }` 傳入 renderer；renderer 本身不自行載圖、不做 cache，且維持 A－06 既有的 fit validation 回傳行為。**未修改已封箱的 A－06 template、未與 D－01～03 合併成 generic D renderer。**

### 42.3 Launch 校稿路徑（不是正式 Preview／Export）

D－06 route 為 `viewer.html?type=D&bn=06_IG`。`.command` 沿用 A－06 launcher 既有行為（僅 7 行識別差異，未重構）：`127.0.0.1:4173`、repo root 推導、viewer path、server reuse、readiness marker、curl 判定、`trap` 收尾與 `open` 行為全部相同。Canvas、Preview 與 overlay 均為 900 × 1600；對位 PNG 以原始 Alpha、同原點及原尺寸 1:1 疊加，**不合成進正式 Canvas**，亦不進入任何輸出。Logo 由 renderer 真正畫入 Canvas，不是 DOM overlay；關閉對位圖開關後 Logo 與三段文字仍留在 Canvas 上。

Viewer 的 D－06 branch **未設 `fieldConfig`**，沿用既有 01～12 shared default 測試文字並沿用既有 IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限與超限 rollback；A－01～12 共用預設測試字串未修改。`logoSource`／`logoImage` 宣告、Logo 共用載入區與共用 `render()` 的 images-object ternary 均沿用 D－01 已建立的機制，未再改動；A－01～16 收到的第二參數仍為原本同一個 `backgroundImage` 物件，A－17 獨立 threshold path 未變。

Launch 與 Viewer 仍只是正式 Template 的開發／視覺校稿工具，**不是第二套 Generator、不是正式控制台 Preview、不是正式資料輸入流程**，不得被解讀為正式 Preview／Export call chain；**Jamie 的 PASS 是「人工 1:1 overlay 對位 PASS」，不是「正式平台 Preview／Export PASS」，後者尚未做。**

### 42.4 正式平台邊界（D 仍 fail-closed）

- **目前正式支援的 Type 仍為 A 與 B**；`bn/js/import.js` 的 `SUPPORTED_TYPES` 仍為 `["A", "B"]`，`bn/js/render-a.js` 的 `ASSET_BASE_BY_TYPE` 仍只有 A 與 B。
- 正式 renderer registry **尚未 enable D**：`A_TABLE` 未加入 type 維度，也未加入任何 D entry。D－06 的 renderer 目前只能經由 `bn/launch/` 校稿路徑執行。
- 樣式 D 在正式平台**維持 fail-closed**，行為與 38.7 節相同；**可選擇 D 卡片不代表 D 已支援**。
- D 的正式 Excel worksheet Import、Restore、控制台 Preview 與 Export 均**尚未 enable**；D－06 的正式 Preview ↔ Export 一致性實測，以及版位 06 既有鎖定的 **JPG／72 dpi**（`EXPORT_DPI = 72`、`JPEG_QUALITY = 1.0`、**版位 06 無 `maxBytes`／無 byte 容量上限**）實際 Export 驗證，**deferred until D platform integration**（本次逐版位工作未執行 D Export 實測，不得記為已驗證）。
- 「D 有自己的 worksheet `D`，工單配置與 A／B 相同，01～12 仍為 `B15`／`B16`／`B17`」屬**已確認的產品需求**，是未來 D platform integration 應遵循的依據，**不代表目前平台已可 Import D**。

### 42.5 邊界維持

- `bn/js/render-a.js`、`bn/js/import.js`、`bn/js/workspace.js`、`bn/js/export.js`、`bn/js/app.js`、`bn/js/editor.js`、`bn/js/banwords*.js`、`bn/js/lpbn-badges.js`、`bn/js/vendor/*`、`bn/index.html`、`bn/css/`、`bn/templates/A/*.js`（17 檔，含 A－06）、`bn/launch/A/*.command`（17 檔）、`bn/templates/D/01-ddcard-bn.js`、`bn/templates/D/02-mall-hbn.js`、`bn/templates/D/03-coin-page-bn.js`、`bn/launch/D/01_DDcard BN.command`、`bn/launch/D/02_MALL HBN.command`、`bn/launch/D/03_Coin page BN.command`、`bn/assets/A/*`、`bn/assets/B/*`、`bn/assets/D/Logo.png`、`bn/assets/LPBN掛標/*`、fonts、正式工單 Excel 與所有既有文件，於 D－06 Code Commit 全部零修改。
- A－01～17 與 B－01～17 的 renderer 行為、Preview 與 Export 輸出未改變；D－01、D－02、D－03 行為未改變；既有 compression／capacity behavior、72 dpi 行為與 A－17 Manual Editor 未修改。
- 本節的 D-specific template 裁決**只代表 D－06**。目前已完成的 D 版位為 D－01、D－02、D－03、D－06，皆為**個別** renderer 與人工對位流程，**不代表整個 D 樣式完成**；D－04、D－05、D－07～17 尚未完成，不得據本節推論其餘 D 版位的 template 形狀、Logo 位置（特別是 D－06 的 Logo **水平＋垂直置中**與 D－02／D－03 的**靠左**不同）或文字差異，未確認的 D 版位差異不得預先補完。
- 本節未建立 Registry、Framework、Build System、plugin system、generic asset framework、共用 scale helper、共用 Logo helper、共用 2× helper、共用 alignment helper 或任何跨 Type／跨版位抽象層，也不預先決定 C 或 D－04、D－05、D－07～17 的實作方式。樣式 C 不在本輪範圍。

（後續同步：D－07 已完成，見第 43 節；本節其餘內容維持不變。）

---

## 43. D－07 正式 Template 實際落地狀態

> 本節同步樣式 D／`07_FB POST`（D－07）**單一版位**的正式 Template 與人工對位驗證入口已完成，且經 Phase 6 Jamie 手動 1:1 overlay 對位驗證 PASS 的架構狀態。Code Commit 為 `b35507340ad12cb976bdc08d96278df756e9b272`（`feat(bn): add D07 FB POST template`，parent `17249b983d4e0c9943a75f6f273865fda984d647`），且是在 Jamie 完成手動驗證後才建立；`git diff --check HEAD^ HEAD` PASS。**本節只記錄 D－07 一個版位的 Template 落地，不是「D 樣式正式平台整合完成」**；第 38 節「目前正式支援的 Type 為 A 與 B」與 38.7 節 C／D 邊界**未被本節取代，仍然有效**。完整需求見 `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md` 的「D－07 Requirement」章節（完成狀態見其 11.16 節），實作紀錄見 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 的「D－07」章節（落地紀錄見其 10.21 節）；樣式 D 只維護這兩份總文件，不建立逐版位 Requirement／Proposal 文件。

### 43.1 已落地檔案

- `bn/templates/D/07-fb-post.js`：D－07 唯一正式 renderer，為 D-specific template definition（425 行、零 import、exports 恰 `waitForFbPostFonts` 與 `renderFbPost`）。
- `bn/launch/D/07_FB POST.command`：D－07 專用直接啟動入口，Git mode 為 `100755`。
- `bn/launch/viewer.html`：共用薄 Viewer，最小增加**只服務 D－07** 的校稿 branch（+16／−1）；A－01～17（含 A－07）與 D－01、D－02、D－03、D－06 既有 branch 全部未修改。
- `bn/assets/D/底圖/07_FB POST.jpg`：D－07 正式 runtime 底圖（JPEG 1200 × 630）。
- `bn/assets/D/對位/07_FB POST.png`：只供 Launch 視覺校稿的正式對位圖（PNG 1200 × 630）。

固定 Logo `bn/assets/D/Logo.png`（原始 784 × 112）為**既有 tracked 共用 asset（由 D－01 Code Commit 納管），D－07 僅引用，不在本次 Code Commit 內**，未修改、未重存、未再次納管、未建立第二份副本。`bn/assets/D/` 底下 D－04、D－05、D－08～16 的其餘 22 個素材仍未納入版控，屬尚未開發版位。

### 43.2 D－07 renderer 行為

D－07 維持 1200 × 630px 正式 Canvas。三個文字框與 A／B－07 **完全相同**：主標 `54,266,405,49`、副標 `54,325,475,62`、保護文字 `54,401,475,28`；typography（主標 Medium `39pt` `#ffffff`、副標 Bold `49pt` `#fff285`、副標 `$`／`%` Bold `41pt` `#fff285`、保護文字 Medium `22.5pt` `#a6f4e6`）、字數規則（8／7／17）、**LeftCentered＝水平靠左＋垂直 ink bounding-box 置中**定位（`textAlign="left"`／`textBaseline="alphabetic"`，`inkLeft = box.left`、`inkTop = box.top + (box.height − inkHeight) / 2`）與副標 `$`／`%` 特殊 formatting（`tokenizeSubheadline`／`adjacentOrdinaryRun`／`boundaryGlyphInkBottom` 的 boundary glyph ink-bottom 對齊，`$` 取後方、`%` 取前方，含 reverse fallback）、fit validation 全部沿用 A／B－07。**D－07 template 的 8 個核心文字 helper 與 A－07 比對為 6/8 逐位元組相同 ＋ 2/8 behavior-equivalent，實質差異 0/8**（`measureRun`、`boundaryGlyphInkBottom` 各一行 runtime error message 的版位標示由 `A－07` 改為 `D－07`，沿用 D template 不殘留 A 版位標示之慣例；演算法、控制流與回傳值零差異）。A－07 專屬的 `assertLayoutFitsCanvas`、`drawFbPostMediumText`、`assertFontsReady` 在版位標示正規化後亦為 behavior-equivalent；其中 **`assertLayoutFitsCanvas` 完整保留、仍由 `renderFbPost` 呼叫、仍遍歷 `Object.entries(FB_POST_LAYOUT)`，因此自然一併驗證新增的 Logo box**，四 box 實測 right／bottom 為 logo 419／253、headline 459／315、subheadline 529／387、protectionText 529／429，全部落於 1200 × 630 內。Medium 主標與保護文字沿用 template-local 2× 暫存 Canvas（offscreen **2400 × 1260**）後高品質縮回正式尺寸；Bold 副標與 Logo 皆不進 2× pass，且未新增 A－01 式「兩段 Medium 都空就整體 early return」guard。

D－07 相對 A／B－07 的差異只有一項：**新增固定 Logo**。Logo box 為 `{left:54, top:201, width:365, height:52}`（與三文字共用同一條左基準線 `left = 54`）；以 contain 等比例縮放，`scale = min(365/784, 52/112) = 13/28`（height-bound），destination 為 **364 × 52**，並在 box 內**水平靠左＋垂直置中**：`destinationX = box.left = 54`、`destinationY = box.top + (box.height − destinationHeight) / 2 = 201`；水平餘量 1px 落在右側（左 0px／右 1px），垂直餘量恰為 0（上 0px／下 0px）。四個 destination 值皆為整數，實作未做 rounding／truncation；亦**不 stretch 成 365 × 52、不 cover、不 crop、不裁切 source**（source rect 完整 `0, 0, 784, 112`），aspect 保持 7 : 1。原 Photoshop／CSS 的 Logo `left = 2877` 已裁決為座標偏移資料（`Δleft = 2823`、`Δtop = 0`），屬**已更正之歷史原始值，未出現於實作、不得再使用**。Logo 繪製自成一組 `save()` → `imageSmoothingEnabled = true` → `imageSmoothingQuality = "high"` → `drawImage()` → `restore()`，不依賴 Medium 2× 的 smoothing state。Logo 的 PNG alpha 由既有 `source-over` 與 `globalAlpha = 1` 自然合成，未新增 blending／compositing／filter。

完整 draw order 為 **background → Logo → Medium local 2×（主標＋保護文字）→ Bold 副標**。四個 box 互不重疊（Logo bottom = 253 < 主標 top = 266）。

Logo 為**固定 renderer asset**：不由 Excel 帶入、不進 Editor、不進 Workspace state、不進暫存 JSON schema。固定素材（底圖、Logo）由 caller 載入完成後以 images object `{ backgroundImage, logoImage }` 傳入 renderer；renderer 本身不自行載圖、不做 cache，且維持 A－07 既有的 fit validation 回傳行為。**未修改已封箱的 A－07 template、未與 D－01／02／03／06 合併成 generic D renderer。**

### 43.3 Launch 校稿路徑（不是正式 Preview／Export）

D－07 route 為 `viewer.html?type=D&bn=07_FB%20POST`（版位名含空白，以 `%20` 編碼；viewer 以 `URLSearchParams` 解析後還原為 `07_FB POST`）。`.command` 沿用 A－07 launcher 既有行為（僅 7 行識別差異，未重構）：`127.0.0.1:4173`、repo root 推導、viewer path、server reuse、readiness marker、curl 判定、`trap` 收尾與 `open` 行為全部相同。Canvas、Preview 與 overlay 均為 1200 × 630；對位 PNG 以原始 Alpha、同原點及原尺寸 1:1 疊加，**不合成進正式 Canvas**，亦不進入任何輸出。Logo 由 renderer 真正畫入 Canvas，不是 DOM overlay；關閉對位圖開關後 Logo 與三段文字仍留在 Canvas 上。

Viewer 的 D－07 branch **未設 `fieldConfig`**，沿用既有 01～12 shared default 測試文字並沿用既有 IME-safe、ASCII 0.5／非 ASCII 1、8／7／17 上限與超限 rollback；A－01～12 共用預設測試字串未修改。`logoSource`／`logoImage` 宣告、Logo 共用載入區與共用 `render()` 的 images-object ternary 均沿用 D－01 已建立的機制，未再改動；A－01～16 收到的第二參數仍為原本同一個 `backgroundImage` 物件，A－17 獨立 threshold path 未變。

Launch 與 Viewer 仍只是正式 Template 的開發／視覺校稿工具，**不是第二套 Generator、不是正式控制台 Preview、不是正式資料輸入流程**，不得被解讀為正式 Preview／Export call chain；**Jamie 的 PASS 是「人工 1:1 overlay 對位 PASS」，不是「正式平台 Preview／Export PASS」，後者尚未做。**

### 43.4 正式平台邊界（D 仍 fail-closed）

- **目前正式支援的 Type 仍為 A 與 B**；`bn/js/import.js` 的 `SUPPORTED_TYPES` 仍為 `["A", "B"]`，`bn/js/render-a.js` 的 `ASSET_BASE_BY_TYPE` 仍只有 A 與 B。
- 正式 renderer registry **尚未 enable D**：`A_TABLE` 未加入 type 維度，也未加入任何 D entry。D－07 的 renderer 目前只能經由 `bn/launch/` 校稿路徑執行。
- 樣式 D 在正式平台**維持 fail-closed**，行為與 38.7 節相同；**可選擇 D 卡片不代表 D 已支援**。
- D 的正式 Excel worksheet Import、Restore、控制台 Preview 與 Export 均**尚未 enable**；D－07 的正式 Preview ↔ Export 一致性實測，以及版位 07 既有鎖定的 **JPG／72 dpi**（`EXPORT_DPI = 72`、`JPEG_QUALITY = 1.0`、**版位 07 無 `maxBytes`／無 byte 容量上限**）實際 Export 驗證，**deferred until D platform integration**（本次逐版位工作未執行 D Export 實測，不得記為已驗證）。
- 「D 有自己的 worksheet `D`，工單配置與 A／B 相同，01～12 仍為 `B15`／`B16`／`B17`」屬**已確認的產品需求**，是未來 D platform integration 應遵循的依據，**不代表目前平台已可 Import D**。

### 43.5 邊界維持

- `bn/js/render-a.js`、`bn/js/import.js`、`bn/js/workspace.js`、`bn/js/export.js`、`bn/js/app.js`、`bn/js/editor.js`、`bn/js/banwords*.js`、`bn/js/lpbn-badges.js`、`bn/js/vendor/*`、`bn/index.html`、`bn/css/`、`bn/templates/A/*.js`（17 檔，含 A－07）、`bn/launch/A/*.command`（17 檔）、`bn/templates/D/01-ddcard-bn.js`、`bn/templates/D/02-mall-hbn.js`、`bn/templates/D/03-coin-page-bn.js`、`bn/templates/D/06-ig.js`、四個既有 D launcher、`bn/assets/A/*`、`bn/assets/B/*`、`bn/assets/D/Logo.png`、`bn/assets/LPBN掛標/*`、fonts、正式工單 Excel 與所有既有文件，於 D－07 Code Commit 全部零修改。
- A－01～17 與 B－01～17 的 renderer 行為、Preview 與 Export 輸出未改變；D－01、D－02、D－03、D－06 行為未改變；既有 compression／capacity behavior、72 dpi 行為與 A－17 Manual Editor 未修改。
- 本節的 D-specific template 裁決**只代表 D－07**。目前已完成的 D 版位為 D－01、D－02、D－03、D－06、D－07，皆為**個別** renderer 與人工對位流程，**不代表整個 D 樣式完成**；D－04、D－05、D－08～17 尚未完成，不得據本節推論其餘 D 版位的 template 形狀、Logo 位置（D－07 為**水平靠左＋垂直置中**，與 D－02／D－03 的**靠左靠上**、D－01／D－06 的**水平＋垂直置中**皆不同）或文字對齊（D－07 為 **LeftCentered**，與 D－01／D－06 的 centered、D－02／D－03 的 left-top 皆不同），未確認的 D 版位差異不得預先補完。
- 本節未建立 Registry、Framework、Build System、plugin system、generic asset framework、共用 scale helper、共用 Logo helper、共用 2× helper、共用 alignment helper 或任何跨 Type／跨版位抽象層，也不預先決定 C 或 D－04、D－05、D－08～17 的實作方式。樣式 C 不在本輪範圍。
---

## 44. D－08 正式 Template 實際落地狀態

> 本節同步樣式 D／`08_SPX TVBN_1`（D－08）**單一版位**的正式 Template 與人工對位驗證入口已完成，且經 Phase 6 Jamie 手動 1:1 overlay 對位驗證 PASS 的架構狀態。Code Commit 為 `d9359270fea1bd89e96a2eb27c4464b50e0ef6dc`（`feat(bn): add D08 SPX TVBN 1 template`，parent `1c9e12782279491395fa5e0f7c9a2da7629f1ac9`），且是在 Jamie 完成手動驗證後才建立；`git diff --check HEAD^ HEAD` PASS。**本節只記錄 D－08 一個版位的 Template 落地，不是「D 樣式正式平台整合完成」**；第 38 節「目前正式支援的 Type 為 A 與 B」與 38.7 節 C／D 邊界**未被本節取代，仍然有效**。完整需求見 `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md` 的「D－08 Requirement」章節（完成狀態見其 12.16 節），實作紀錄見 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 的「D－08」章節（落地紀錄見其 11.23 節）；樣式 D 只維護這兩份總文件，不建立逐版位 Requirement／Proposal 文件。

### 44.1 已落地檔案

- `bn/templates/D/08-spx-tvbn-1.js`：D－08 唯一正式 renderer，為 D-specific template definition（416 行、零 import、exports 恰 `waitForSpxTvbn1Fonts` 與 `renderSpxTvbn1`）。
- `bn/launch/D/08_SPX TVBN_1.command`：D－08 專用直接啟動入口，Git mode 為 `100755`。
- `bn/launch/viewer.html`：共用薄 Viewer，最小增加**只服務 D－08** 的校稿 branch（+16／−1）；A－01～17（含 A－08）與 D－01、D－02、D－03、D－06、D－07 既有 branch 全部未修改。
- `bn/assets/D/底圖/08_SPX TVBN_1.jpg`：D－08 正式 runtime 底圖（JPEG 1080 × 1920）。
- `bn/assets/D/對位/08_SPX TVBN_1.png`：只供 Launch 視覺校稿的正式對位圖（PNG 1080 × 1920）。

固定 Logo `bn/assets/D/Logo.png`（原始 784 × 112）為**既有 tracked 共用 asset（由 D－01 Code Commit 納管），D－08 僅引用，不在本次 Code Commit 內**，未修改、未重存、未再次納管、未建立第二份副本。`bn/assets/D/` 底下 D－04、D－05、D－09～16 的其餘 20 個素材仍未納入版控，屬尚未開發版位。

### 44.2 D－08 renderer 行為

D－08 維持 1080 × 1920px 正式 Canvas。三個文字框與 A／B－08 **完全相同**：主標 `167,507,745,87`、副標 `94,619,890,114`、保護文字 `94,759,890,51`；typography（主標 Medium `70pt` `#ffffff`、副標 Bold `90pt` `#fff285`、副標 `$`／`%` Bold `75pt` `#fff285`、保護文字 Medium `40pt` `#a6f4e6`）、既有字數規則、**centered ink＝水平＋垂直 ink bounding-box 置中**定位（`textAlign="left"`／`textBaseline="alphabetic"`，`inkLeft = box.left + (box.width − inkWidth) / 2`、`inkTop = box.top + (box.height − inkHeight) / 2`；**不是 LeftCentered、不是 left／top**）與副標 `$`／`%` 特殊 formatting（`tokenizeSubheadline`／`adjacentOrdinaryRun`／`boundaryGlyphInkBottom` 的 boundary glyph ink-bottom 對齊，`$` 取後方、`%` 取前方，含 reverse fallback）、fit validation 全部沿用 A／B－08。**保護文字採 A／B－08 的 `{94,759,890,51}`；D 對位圖的 protectionText 標記 `{94,760,890,50}` 已裁決為對位標記的 1px 差異，未被採用、不得再重新裁決。**

**D－08 template 的 11 個 baseline functions 與 A－08 比對為 6/11 逐位元組相同 ＋ 5/11 behavior-equivalent，實質差異 0/11**（byte-identical 者為 `hasInk`、`validateCenteredInkFitsBox`、`drawCenteredText`、`tokenizeSubheadline`、`adjacentOrdinaryRun`、`drawCenteredMixedSubheadline`；behavior-equivalent 者為 `assertFrameBounds`、`measureRun`、`boundaryGlyphInkBottom`、`drawSpxTvbn1MediumText`、`assertFontsReady`，各一行 runtime error message 的版位標示由 `A－08` 改為 `D－08`，沿用 D template 不殘留 A 版位標示之慣例；演算法、控制流與回傳值零差異）。**不得記為 11/11 byte-identical。** 其中 **`assertFrameBounds` 完整保留、仍由 `renderSpxTvbn1` 呼叫、仍遍歷 `Object.entries(SPX_TVBN_1_LAYOUT)`、四邊界檢查未弱化，因此自然一併驗證新增的 Logo box**，四 box 實測 right／bottom 為 logo 932／476、headline 912／594、subheadline 984／733、protectionText 984／810，全部落於 1080 × 1920 內。D－08 另比照 D－01／D－06／D－07 precedent 加入最小 **canvas-size guard**（`canvas.width` 必須 1080、`canvas.height` 必須 1920，不符即 fail-fast）；此為 D template 層的一致性加強，**已封箱的 A－08 baseline 本身未被修改，亦未抽出 shared guard**。Medium 主標與保護文字沿用 template-local 2× 暫存 Canvas（`MEDIUM_RENDER_SCALE = 2`、offscreen **2160 × 3840**）後高品質縮回正式尺寸；Bold 副標與 Logo 皆不進 2× pass，未新增函式層「兩段 Medium 都空就整體 early return」guard，每段文字空字串各自回傳零 ink fit validation 之既有行為保留。

D－08 相對 A／B－08 的差異只有一項：**新增固定 Logo**。Logo box 為 `{left:147, top:364, width:785, height:112}`；以 contain 等比例縮放，`scale = min(785/784, 112/112) = 1`（height-bound、1:1 不縮放），destination 為 **784 × 112**，並在 box 內**水平＋垂直置中**：`destinationX = box.left + (box.width − destinationWidth) / 2 = ` **147.5**、`destinationY = box.top + (box.height − destinationHeight) / 2 = ` **364**；水平餘量 1px 平分為左 **0.5px**／右 **0.5px**，垂直餘量恰為 0（上 0px／下 0px）。**`destinationX` 為 fractional `147.5`，實作原值保留、未做任何 rounding／truncation**（無 `Math.round`／`Math.floor`／`Math.ceil`／`Math.trunc`／`toFixed`／`parseInt`／bitwise，比照 D－01 `90.5` 之既有 precedent）；亦**不 stretch 成 785 × 112、不 cover、不 crop、不裁切 source**（source rect 完整 `0, 0, 784, 112`），aspect 保持 7 : 1。原 Photoshop／CSS 的 Logo `left`（`2006`）與 `top`（`2065`）已裁決為座標偏移資料（`Δleft = 1859`、`Δtop = 1701`，屬 D－08 自身獨立實證，**不得建立共用 offset 規則、不得推論至其他 D 版位**），屬**已更正之歷史原始值，未出現於實作、不得再使用**。Logo 繪製自成一組 `save()` → `imageSmoothingEnabled = true` → `imageSmoothingQuality = "high"` → `drawImage()` → `restore()`，不依賴 Medium 2× 的 smoothing state。Logo 的 PNG alpha 由既有 `source-over` 與 `globalAlpha = 1` 自然合成，未新增 blending／compositing／filter。

完整 draw order 為 **background → Logo → Medium local 2×（主標＋保護文字）→ Bold 副標**。四個 box 互不重疊（Logo bottom = 476 < 主標 top = 507）。

Logo 為**固定 renderer asset**：不由 Excel 帶入、不進 Editor、不進 Workspace state、不進暫存 JSON schema。固定素材（底圖、Logo）由 caller 載入完成後以 images object `{ backgroundImage, logoImage }` 傳入 renderer；renderer 本身不自行載圖、不做 cache，且維持 A－08 既有的 fit validation 回傳行為。**未修改已封箱的 A－08 template、未與 D－01／02／03／06／07 合併成 generic D renderer、未建立 shared Logo helper／shared 2× helper／shared alignment helper／D template registry。**

### 44.3 Launch 校稿路徑（不是正式 Preview／Export）

D－08 route 為 `viewer.html?type=D&bn=08_SPX%20TVBN_1`（版位名含空白，以 `%20` 編碼；viewer 以 `URLSearchParams` 解析後還原為 `08_SPX TVBN_1`）。`.command` 沿用 A－08 launcher 既有行為（104 行不變、僅 7 行識別差異，未重構）：`127.0.0.1:4173`、repo root 推導、viewer path、server reuse、readiness marker、curl 判定、`trap` 收尾與 `open` 行為全部相同。Canvas、Preview 與 overlay 均為 1080 × 1920；對位 PNG 以原始 Alpha、同原點及原尺寸 1:1 疊加，**不合成進正式 Canvas**，亦不進入任何輸出。Logo 由 renderer 真正畫入 Canvas，不是 DOM overlay；關閉對位圖開關後 Logo 與三段文字仍留在 Canvas 上。

Viewer 的 D－08 branch **未設 `fieldConfig`**，沿用既有 01～12 shared default 測試文字並沿用既有 IME-safe、ASCII 0.5／非 ASCII 1 與既有上限／超限 rollback；A－01～12 共用預設測試字串未修改。`logoSource`／`logoImage` 宣告、Logo 共用載入區與共用 `render()` 的 images-object ternary 均沿用 D－01 已建立的機制，未再改動；A－01～16 收到的第二參數仍為原本同一個 `backgroundImage` 物件，A－17 獨立 threshold path 未變。

Launch 與 Viewer 仍只是正式 Template 的開發／視覺校稿工具，**不是第二套 Generator、不是正式控制台 Preview、不是正式資料輸入流程**，不得被解讀為正式 Preview／Export call chain；**Jamie 的 PASS 是「人工 1:1 overlay 對位 PASS」，不是「正式平台 Preview／Export PASS」，後者尚未做。**

### 44.4 仍未 enable 的平台邊界

正式支援的 Type 仍為 **A 與 B**：`SUPPORTED_TYPES` 仍為 `["A", "B"]`，`ASSET_BASE_BY_TYPE` 仍只有 A 與 B，`A_TABLE` 未加入 D entry 或 type 維度，`bn/js/render-a.js` 未加入 D，正式 renderer registry 尚未 enable D，樣式 D 在正式平台維持 fail-closed；正式平台六個核心 JS（`render-a.js`、`import.js`、`workspace.js`、`export.js`、`app.js`、`editor.js`）於本次 Code Commit 全部零修改。D 的正式 Excel worksheet Import、Restore、控制台 Preview 與 Export 尚未 enable；D－08 正式 Preview ↔ Export 一致性實測與版位 08 既有鎖定的 **JPG／72 dpi**（`{ id: "08", name: "08_SPX TVBN_1", format: "jpg" }`、`EXPORT_DPI = 72`、`JPEG_QUALITY = 1.0`、**版位 08 無 `maxBytes`／無 byte 容量上限**）實際輸出驗證，全部 **deferred until D platform integration**，本次未執行 D Export 實測，不得記為已驗證。

目前已完成的樣式 D 版位為 **D－01、D－02、D－03、D－06、D－07 與 D－08**，六者皆為個別 renderer 與人工對位流程，**不代表整個 D 樣式完成**；D－04、D－05、D－09～17 尚未完成、尚未確認，不得由已完成的任何 D 版位推論其 geometry、Logo 位置或文字差異，亦不得提前規格化。樣式 C 不在本節範圍。
---

## 45. D－09 正式 Template 實際落地狀態

> 本節同步樣式 D／`09_SPX TVBN_2`（D－09）**單一版位**的正式 Template 與人工對位驗證入口已完成，且經 Phase 6 Jamie 手動 1:1 overlay 對位驗證 PASS 的架構狀態。Code Commit 為 `ac69478cfa90ee62d208e30d139a382718433699`（`feat(bn): add D09 SPX TVBN 2 template`，parent `2509764d8c41b83cccce209cc8e646ab809d796a`），且是在 Jamie 完成手動驗證後才建立；`git diff --check HEAD^ HEAD` PASS。**本節只記錄 D－09 一個版位的 Template 落地，不是「D 樣式正式平台整合完成」**；第 38 節「目前正式支援的 Type 為 A 與 B」與 38.7 節 C／D 邊界**未被本節取代，仍然有效**。完整需求見 `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md` 的「D－09 Requirement」章節（完成狀態見其 13.18 節），實作紀錄見 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 的「D－09」章節（落地紀錄見其 12.27 節）；樣式 D 只維護這兩份總文件，不建立逐版位 Requirement／Proposal 文件。

### 45.1 已落地檔案

- `bn/templates/D/09-spx-tvbn-2.js`：D－09 唯一正式 renderer，為 D-specific template definition（421 行、零 import、exports 恰 `waitForSpxTvbn2Fonts` 與 `renderSpxTvbn2`）。
- `bn/launch/D/09_SPX TVBN_2.command`：D－09 專用直接啟動入口，Git mode 為 `100755`。
- `bn/launch/viewer.html`：共用薄 Viewer，最小增加**只服務 D－09** 的校稿 branch（+16／−1）；A－01～17（含 A－09）與 D－01、D－02、D－03、D－06、D－07、D－08 既有 branch 全部未修改。
- `bn/assets/D/底圖/09_SPX TVBN_2.jpg`：D－09 正式 runtime 底圖（JPEG 1599 × 1080）。
- `bn/assets/D/對位/09_SPX TVBN_2.png`：只供 Launch 視覺校稿的正式對位圖（PNG 1599 × 1080）。

固定 Logo `bn/assets/D/Logo.png`（原始 784 × 112）為**既有 tracked 共用 asset（由 D－01 Code Commit 納管），D－09 僅引用，不在本次 Code Commit 內**，未修改、未重存、未再次納管、未建立第二份副本。`bn/assets/D/` 底下 D－04、D－05、D－10～16 的其餘 18 個素材仍未納入版控，屬尚未開發版位。

### 45.2 D－09 renderer 行為

D－09 維持 1599 × 1080px 正式 Canvas。三個文字框與 A／B－09 **完全相同**：主標 `51,465,620,75`、副標 `51,557,740,97`、保護文字 `51,674,740,44`；typography（主標 Medium `60pt` `#ffffff`、副標 Bold `76pt` `#fff285`、副標 `$`／`%` Bold `65pt` `#fff285`、保護文字 Medium `35pt` `#a6f4e6`；未新增 `symbolColor`）、既有字數規則、**LeftCentered＝水平靠左＋垂直 ink bounding-box 置中**定位（`textAlign="left"`／`textBaseline="alphabetic"`，`inkLeft = box.left`、`inkTop = box.top + (box.height − inkHeight) / 2`；**不是 centered ink、不是 left／top**）與副標 `$`／`%` 特殊 formatting（`tokenizeSubheadline`／`adjacentOrdinaryRun`／`boundaryGlyphInkBottom` 的 boundary glyph ink-bottom 對齊，`$` 取後方、`%` 取前方，含 reverse fallback 的 `preferred` → `fallback` 兩段式實作）、fit validation 與每段空字串零 ink 行為全部沿用 A／B－09。

**D－09 template 的 11 個 baseline functions 與 A－09 比對為 6/11 逐位元組相同 ＋ 5/11 behavior-equivalent，實質差異 0/11**（byte-identical 者為 `hasInk`、`validateLeftCenteredInkFitsBox`、`drawLeftCenteredText`、`tokenizeSubheadline`、`adjacentOrdinaryRun`、`drawLeftCenteredMixedSubheadline`；behavior-equivalent 者為 `assertLayoutFitsCanvas`、`measureRun`、`boundaryGlyphInkBottom`、`drawSpxTvbn2MediumText`、`assertFontsReady`，五者合計 **6 行** runtime error message 差異 —— 其中 `assertLayoutFitsCanvas` 因函式本身含兩個 `throw` 而為 **2 行**，其餘四者各 **1 行** —— 每一行皆僅為版位標示由 `A－09` 改為 `D－09`，沿用 D template 不殘留 A 版位標示之慣例；演算法、控制流與回傳值零差異）。**不得記為 11/11 byte-identical。** 新增的 `drawSpxTvbn2Logo` 與 renderer body 必要的 Logo 接線不納入此 11 個 baseline helper 統計。其中 **`assertLayoutFitsCanvas` 完整保留、仍由 `renderSpxTvbn2` 呼叫、仍遍歷 `Object.entries(SPX_TVBN_2_LAYOUT)`、`Number.isFinite`／`width > 0`／`height > 0` 與四邊界檢查均未弱化，因此自然一併驗證新增的 Logo box**，四 box 實測 right／bottom 為 logo **620／443**、主標 **671／540**、副標 **791／654**、保護文字 **791／718**，全部落於 1599 × 1080 內。D－09 另比照 D－01／06／07／08 precedent 加入最小 **canvas-size guard**（`canvas.width` 必須 1599、`canvas.height` 必須 1080，不符即 fail-fast）；此為 D template 層的一致性加強，**已封箱的 A－09 baseline 本身未被修改，亦未抽出 shared guard**。Medium 主標與保護文字沿用 template-local 2× 暫存 Canvas（`MEDIUM_RENDER_SCALE = 2`、offscreen **3198 × 2160**）後高品質縮回正式尺寸；Bold 副標與 Logo 皆不進 2× pass，未新增函式層「兩段 Medium 都空就整體 early return」guard。

D－09 相對 A／B－09 的差異只有一項：**新增固定 Logo**。Logo box 為 `{left:51, top:362, width:569, height:81}`（與三文字共用同一條左基準線 `left = 51`）；以 contain 等比例縮放，`scale = min(569/784, 81/112) = 81/112`（height-bound），destination 為 **567 × 81**，並在 box 內**水平靠左＋垂直置中**：`destinationX = box.left = ` **51**、`destinationY = box.top + (box.height − destinationHeight) / 2 = ` **362**；水平餘量 2px 落在右側（左 **0px**／右 **2px**），垂直餘量恰為 0（上 **0px**／下 **0px**）。四個 destination 值皆為整數，實作未做 rounding／truncation（`destinationX` 為 **51**，**未寫成 52**）；亦**不 stretch 成 569 × 81、不 cover、不 crop、不裁切 source**（source rect 完整 `0, 0, 784, 112`），aspect 保持 **7 : 1**。原 Photoshop／CSS 的 Logo `left`（`3077`）與 `top`（`2063`）已裁決為不可直接作 canvas geometry 的座標偏移資料（D－09 自身 `Δleft = 3026`、`Δtop = 1701`，屬本版位獨立更正證據，**不得建立跨版位共用 offset 規則、不得推論至其他 D 版位**），屬**已更正之歷史原始值，未出現於實作、不得再使用**。Logo 繪製自成一組 `save()` → `imageSmoothingEnabled = true` → `imageSmoothingQuality = "high"` → `drawImage()` → `restore()`，不依賴 Medium 2× 的 smoothing state。Logo 的 PNG alpha 由既有 `source-over` 與 `globalAlpha = 1` 自然合成，未新增 blending／compositing／filter。

完整 draw order 為 **background → Logo → Medium local 2×（主標＋保護文字）→ Bold 副標**。四個 box 互不重疊（Logo bottom = 443 < 主標 top = 465）。

Logo 為**固定 renderer asset**：不由 Excel 帶入、不進 Editor、不進 Workspace state、不進暫存 JSON schema。固定素材（底圖、Logo）由 caller 載入完成後以 images object `{ backgroundImage, logoImage }` 傳入 renderer；renderer 本身不自行載圖、不做 cache，且維持 A－09 既有的 fit validation 回傳行為。**未修改已封箱的 A－09 template、未與 D－01／02／03／06／07／08 合併成 generic D renderer、未建立 shared Logo helper／shared 2× helper／shared alignment helper／D template registry。**

### 45.3 Launch 校稿路徑（不是正式 Preview／Export）

D－09 route 為 `viewer.html?type=D&bn=09_SPX%20TVBN_2`（版位名含空白，以 `%20` 編碼；viewer 以 `URLSearchParams` 解析後還原為 `09_SPX TVBN_2`）。`.command` 沿用 A－09 launcher 既有行為（104 行不變、僅 7 行識別差異，未重構）：`127.0.0.1:4173`、repo root 推導、viewer path、server reuse、readiness marker、curl 判定、`trap` 收尾與 `open` 行為全部相同。Canvas、Preview 與 overlay 均為 1599 × 1080；對位 PNG 以原始 Alpha、同原點及原尺寸 1:1 疊加，**不合成進正式 Canvas**，亦不進入任何輸出。Logo 由 renderer 真正畫入 Canvas，不是 DOM overlay；關閉對位圖開關後 Logo 與三段文字仍留在 Canvas 上。

Viewer 的 D－09 branch **未設 `fieldConfig`**，沿用既有 01～12 shared default 測試文字（**D－01 的 `fieldConfig` 為樣式 D 最早建立時的歷史例外，未套用至 D－09**）；A－01～12 共用預設測試字串未修改。`logoSource`／`logoImage` 宣告、Logo 共用載入區與共用 `render()` 的 images-object ternary 均沿用 D－01 已建立的機制，未再改動；A－01～16 收到的第二參數仍為原本同一個 `backgroundImage` 物件，A－17 獨立 threshold path 未變。

Launch 與 Viewer 仍只是正式 Template 的開發／視覺校稿工具，**不是第二套 Generator、不是正式控制台 Preview、不是正式資料輸入流程**，不得被解讀為正式 Preview／Export call chain；**Jamie 的 PASS 是「人工 1:1 overlay 對位 PASS」，不是「正式平台 Preview／Export PASS」，後者尚未做。**

### 45.4 仍未 enable 的平台邊界

正式支援的 Type 仍為 **A 與 B**：`SUPPORTED_TYPES` 仍為 `["A", "B"]`，`ASSET_BASE_BY_TYPE` 仍只有 A 與 B，`A_TABLE` 未加入 D entry 或 type 維度，`bn/js/render-a.js` 未 enable D、未 import 任何 D template，正式 renderer registry 尚未 enable D，樣式 D 在正式平台維持 fail-closed；正式平台六個核心 JS（`render-a.js`、`import.js`、`workspace.js`、`export.js`、`app.js`、`editor.js`）於本次 Code Commit 全部零修改。D 的正式 Excel worksheet Import、Restore、控制台 Preview 與 Export 尚未 enable；D－09 正式 Preview ↔ Export 一致性實測與版位 09 既有鎖定的 **JPG／72 dpi**（`{ id: "09", name: "09_SPX TVBN_2", format: "jpg" }`、**無 `maxBytes`，亦無任何 D-specific `maxBytes`**、`EXPORT_DPI = 72`、JPEG 品質既有全域行為不變）實際輸出驗證，全部 **deferred until D platform integration**，本次未執行 D Export 實測，不得記為已驗證。

目前已完成的樣式 D 版位為 **D－01、D－02、D－03、D－06、D－07、D－08 與 D－09**，七者皆為個別 renderer 與人工對位流程，**不代表整個 D 樣式完成**；D－04、D－05、D－10～17 仍須逐一確認與開發，**不得由 D－09 或其他已完成 D 版位推論**其 geometry、Logo 位置或文字差異，亦不得提前規格化。樣式 C 不在本節範圍。

## 46. D－10 正式 Template 實際落地狀態

> 本節同步樣式 D／`10_POP UP`（D－10）**單一版位**的正式 Template 與人工對位驗證入口已完成，且經 Phase 6 Jamie 手動 1:1 overlay 對位驗證 PASS 的架構狀態。Code Commit 為 `1e2cdb939936de18d2665bafc27229bc7a032e3b`（`feat(bn): add D10 POP UP template`，parent `30be4920277042d05e10d6185fcee5923bafb0e3`），且是在 Jamie 完成手動驗證後才建立；`git diff --check HEAD^ HEAD` PASS。**本節只記錄 D－10 一個版位的 Template 落地，不是「D 樣式正式平台整合完成」**；第 38 節「目前正式支援的 Type 為 A 與 B」與 38.7 節 C／D 邊界**未被本節取代，仍然有效**。完整需求見 `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md` 的「D－10 Requirement」章節（含 14.6【JAMIE/GPT LOCKED DECISION】geometry 裁決，完成狀態見其 14.20 節），實作紀錄見 `bn/docs/FSS_BN_D樣式_Proposal_v1.0.md` 的「D－10」章節（落地紀錄見其 13.27 節）；樣式 D 只維護這兩份總文件，不建立逐版位 Requirement／Proposal 文件。

### 46.1 已落地檔案

- `bn/templates/D/10-pop-up.js`：D－10 唯一正式 renderer，為 D-specific template definition（465 行、零 import、exports 恰 `waitForPopUpFonts` 與 `renderPopUp`）。
- `bn/launch/D/10_POP UP.command`：D－10 專用直接啟動入口，Git mode 為 `100755`。
- `bn/launch/viewer.html`：共用薄 Viewer，最小增加**只服務 D－10** 的校稿 branch（+16／−1，branch 本體 15 行）；A－01～17（含 A－10）與 D－01、D－02、D－03、D－06、D－07、D－08、D－09 既有 branch 全部未修改。
- `bn/assets/D/底圖/10_POP UP.png`：D－10 正式 runtime 底圖（PNG RGBA **475 × 673**、202,577 bytes）。
- `bn/assets/D/對位/10_POP UP.png`：只供 Launch 視覺校稿的正式對位圖（PNG RGBA **580 × 720**、19,744 bytes）。

固定 Logo `bn/assets/D/Logo.png`（原始 784 × 112）為**既有 tracked 共用 asset（由 D－01 Code Commit 納管），D－10 僅引用，不在本次 Code Commit 內**，未修改、未重存、未再次納管、未建立第二份副本。`bn/assets/D/` 底下 D－04、D－05、D－11～17 的其餘 16 個素材仍未納入版控，屬尚未開發版位。

### 46.2 D－10 renderer 行為

**`10_POP UP` 是 17 個版位中唯一 canvas 尺寸 ≠ 底圖 intrinsic 尺寸者**，此 A－10 特殊結構在 D－10 完整保存：正式 Canvas 為 **580 × 720px**，底圖 intrinsic 為 **475 × 673**，並繪於精確目的地 **`(53, 27, 475, 673)`**（**未 stretch 成整張 canvas**）；`context.clearRect(0, 0, 580, 720)` 完整保留且仍位於 background 之前；`globalAlpha = 1`、`globalCompositeOperation = "source-over"`；canvas instance guard、background instance／readiness／intrinsic（475 × 673 硬斷言）guard、**A－10 原本已內建的 canvas-size guard**（D－10 未另行新增）、`assertFontsReady` 與 `assertSpecificationFitsCanvas` 全部保留。

三個文字框相對 A／B－10 **僅 `top` 各下移 +44px**，`left`／`width`／`height` 逐值不變：主標 `129,172,323,38`、副標 `85,225,410,51`、保護文字 `85,286,410,25`（A－10 baseline 原為 `top` `128`／`181`／`242`）。**此 `+44` 僅代表 D－10 自身 A→D 的對位圖像素實證差異，未建立 generic／shared offset 規則、未寫成常數、不得推論至任何其他 D 版位。** typography（主標 Medium `30pt` `#ffffff`、副標 Bold `40pt` `#fff285`、副標 `$`／`%` Bold `35pt` `#fff285`、保護文字 Medium `20pt` `#a6f4e6`；未新增 `symbolColor`）、既有字數規則、**centered ink＝水平＋垂直 ink bounding-box 置中**定位（`textAlign="left"`／`textBaseline="alphabetic"`，`x = box.left + (box.width − inkWidth) / 2 − run.inkLeft`、`y = box.top + box.height / 2 − (run.inkTop + run.inkBottom) / 2`；**不是 LeftCentered、不是 left／top**）與副標 `$`／`%` 特殊 formatting（`tokenizeSubheadline`／`adjacentOrdinaryRun`／`boundaryGlyphInkBottom` 的 boundary glyph ink-bottom 對齊，`$` 主取後方 ordinary glyph、`%` 主取前方 ordinary glyph，含 reverse fallback 的 `preferred` → `fallback` 兩段式實作）、fit validation 與每段空字串零 ink 行為全部沿用 A／B－10。

**D－10 template 的 13 個 baseline functions 與 A－10 比對為 5/13 逐位元組相同 ＋ 7/13 message-only behavior-equivalent ＋ 1/13 substantive**（byte-identical 者為 `hasInk`、`drawCenteredText`、`tokenizeSubheadline`、`adjacentOrdinaryRun`、`drawCenteredMixedSubheadline`；message-only 者為 `assertSpecificationFitsCanvas`、`measureRun`、`boundaryGlyphInkBottom`、`validateCenteredInkFitsBox`、`drawPopUpMediumText`、`assertFontsReady`、`waitForPopUpFonts`，七者合計 **11 行** runtime error message 差異 —— `assertSpecificationFitsCanvas` 因函式本身含四個 `throw` 而為 **4 行**、`drawPopUpMediumText` 為 **2 行**，其餘五者各 **1 行** —— 每一行皆僅為版位標示由 `A－10` 改為 `D－10`，沿用 D template 不殘留 A 版位標示之慣例，演算法、控制流與回傳值零差異；substantive 者僅 **`renderPopUp`**，且只因 signature 改為 images object、images 防禦式解構、Logo readiness guard、Logo draw 與 draw-order 接線及版位標示）。**不得記為 5+8+0 或任何其他數字。** 新增的 template-local `drawPopUpLogo` 為 D-specific 新函式，不納入此 13 個 baseline function 統計。其中 **`assertSpecificationFitsCanvas` 完整保留、未改名、未換 generic helper、仍由 `renderPopUp` 呼叫、仍遍歷 `Object.entries(POP_UP_LAYOUT)`、`Number.isFinite`／`width > 0`／`height > 0`、四邊界檢查與 background placement 驗證均未弱化，因此自然一併驗證新增的 Logo box**，四 box 實測 right／bottom 為 logo **452／155**、主標 **452／210**、副標 **495／276**、保護文字 **495／311**，全部落於 580 × 720 內。**已封箱的 A－10 baseline 本身未被修改（sha256 維持 `3b555271cdaccae7fc5cf5a49d481f923318eba5f0965ec001ea6e4065e656ed`），亦未抽出 shared guard。** Medium 主標與保護文字沿用 template-local 2× 暫存 Canvas（`MEDIUM_RENDER_SCALE = 2`、offscreen **1160 × 1440**，既有尺寸硬斷言保留）後高品質縮回正式尺寸；Bold 副標與 Logo 皆不進 2× pass，未新增函式層「兩段 Medium 都空就整體 early return」guard。

D－10 相對 A／B－10 的差異有兩項：**三文字框 `top` 各 +44px**（如上）與**新增固定 Logo**。Logo box 為 `{left:129, top:109, width:323, height:46}`（`POP_UP_LAYOUT` 第一個 key）；以 contain／no-upscale 等比例縮放，`scale = min(323/784, 46/112) = ` **`23/56`**（height-bound），destination 為 **322 × 46**，並在 box 內**水平置中＋垂直置中**：`destinationX = box.left + (box.width − destinationWidth) / 2 = ` **129.5**、`destinationY = box.top + (box.height − destinationHeight) / 2 = ` **109**；水平餘量對半分配（左 **0.5px**／右 **0.5px**），垂直餘量恰為 0（上 **0px**／下 **0px**）。**`destinationX = 129.5` 以 fractional 原值保留**，實作實測未做 rounding／truncation（全檔無 `Math.round`／`Math.floor`／`Math.ceil`／`Math.trunc`／`toFixed`／`parseInt`／bitwise）；亦**不 stretch 成 323 × 46、不 cover、不 crop、不裁切 source**（source rect 完整 `0, 0, sourceWidth, sourceHeight`），aspect 保持 **7 : 1**。原 Photoshop／CSS 的四框原始標記 `867`／`807`／`870`／`823`／`923`／`984` 與 D－10 自身 `Δleft = 738`／`Δtop = 698` 屬**不可直接作 canvas geometry 的歷史 evidence**（**不得建立跨版位共用 offset 規則、不得推論至其他 D 版位**），實測**未出現於實作、不得再使用**。Logo 繪製自成一組 `save()` → `imageSmoothingEnabled = true` → `imageSmoothingQuality = "high"` → `drawImage()` → `restore()`，不依賴 Medium 2× 的 smoothing state。Logo 的 PNG alpha 由既有 `source-over` 與 `globalAlpha = 1` 自然合成，未新增 blending／compositing／filter。

完整 draw order 為 **`clearRect → background → Logo → Medium local 2×（主標＋保護文字）→ Bold 副標`**。此順序是**「A－10 唯一既有 `clearRect` 位於 background 之前」與「既有 7/7 已完成 D Logo renderer 一致的 `background → Logo → Medium2x → BoldSub`」兩項既有 evidence 的最小組合**；**A－10 是第一個帶 `clearRect` 的 Logo D 版位，repository 中並不存在完全相同的直接 precedent**，不得記為「原本就已存在相同 precedent」。四個 box 互不重疊（Logo bottom = 155 < 主標 top = 172，間距 17px）。

Logo 為**固定 renderer asset**：不由 Excel 帶入、不進 Editor、不進 Workspace state、不進暫存 JSON schema。固定素材（底圖、Logo）由 caller 載入完成後以 images object `{ backgroundImage, logoImage }` 傳入 renderer；renderer 本身不自行載圖、不做 cache，且維持 A－10 既有的 fit validation 回傳行為。**未修改已封箱的 A－10 template、未與 D－01～09 合併成 generic D renderer、未建立 shared Logo helper／shared 2× helper／shared alignment helper／shared image abstraction／D template registry。**

### 46.3 Launch 校稿路徑（不是正式 Preview／Export）

D－10 route 為 `viewer.html?type=D&bn=10_POP%20UP`（版位名含空白，以 `%20` 編碼；viewer 以 `URLSearchParams` 解析後還原為 `10_POP UP`）。`.command` 沿用 A－10 launcher 既有行為（**104 行不變、僅 7 行識別差異（L12、38、39、41、49、94、100）**，未重構）：`127.0.0.1:4173`、repo root 推導、viewer path、server reuse、readiness marker、curl 判定、`trap` 收尾與 `open` 行為全部相同。Canvas、Preview 與 overlay 均為 580 × 720（對位圖 intrinsic 亦為 580 × 720，直接通過既有 overlay 1:1 validation）；對位 PNG 以原始 Alpha、同原點及原尺寸 1:1 疊加，**不合成進正式 Canvas**，亦不進入任何輸出。Logo 由 renderer 真正畫入 Canvas，不是 DOM overlay；關閉對位圖開關後 Logo 與三段文字仍留在 Canvas 上。

Viewer 的 D－10 branch **未設 `fieldConfig`**，沿用既有 01～12 shared default 測試文字（**D－01 的 `fieldConfig` 為樣式 D 最早建立時的歷史例外，未套用至 D－10**）；A－01～12 共用預設測試字串未修改。`logoSource`／`logoImage` 宣告、Logo 共用載入區與共用 `render()` 的 images-object ternary 均沿用 D－01 已建立的機制，未再改動；A－01～16 收到的第二參數仍為原本同一個 `backgroundImage` 物件，A－17 獨立 threshold path 未變。

Launch 與 Viewer 仍只是正式 Template 的開發／視覺校稿工具，**不是第二套 Generator、不是正式控制台 Preview、不是正式資料輸入流程**，不得被解讀為正式 Preview／Export call chain；**Jamie 的 PASS 是「人工 1:1 overlay 對位 PASS」，不是「正式平台 Preview／Export PASS」，後者尚未做。**

### 46.4 仍未 enable 的平台邊界

正式支援的 Type 仍為 **A 與 B**：`SUPPORTED_TYPES` 仍為 `["A", "B"]`，`ASSET_BASE_BY_TYPE` 仍只有 A 與 B，`A_TABLE` 未加入 D entry 或 type 維度，`bn/js/render-a.js` 未 enable D、未 import 任何 D template，正式 renderer registry 尚未 enable D，樣式 D 在正式平台維持 fail-closed；正式平台六個核心 JS（`render-a.js`、`import.js`、`workspace.js`、`export.js`、`app.js`、`editor.js`）於本次 Code Commit 全部零修改。D 的正式 Excel worksheet Import、Restore、控制台 Preview 與 Export 尚未 enable；D－10 正式 Preview ↔ Export 一致性實測與版位 10 既有鎖定的 **PNG／72 dpi／`maxBytes: 250000`**（`{ id: "10", name: "10_POP UP", format: "png", maxBytes: 250000 }`、`EXPORT_DPI = 72`；既有 PNG 72 dpi pHYs patch 與容量鏈**目前只在 A／B 正式路徑實際運行**）實際輸出驗證，全部 **deferred until D platform integration**。本次 Code Commit 與 Jamie Manual PASS **不代表已驗證 D－10 的 250,000 bytes**；本次未執行 D Export 實測，不得記為已驗證。

目前已完成的樣式 D 版位為 **D－01、D－02、D－03、D－06、D－07、D－08、D－09 與 D－10**，八者皆為個別 renderer 與人工對位流程，**不代表整個 D 樣式完成**；D－04、D－05、D－11～17 仍須逐一確認與開發，**不得由 D－10 或其他已完成 D 版位推論**其 geometry、Logo 位置或文字差異，亦不得提前規格化。樣式 C 不在本節範圍。

## 47. D－12 正式 Template 實際落地狀態

> 本節只同步 `12_LPBN`（D－12）單一版位落地與 Jamie Phase 6 人工 1:1 overlay PASS。Code Commit 為 **`4397a40fb69b12a11b3c6e61aa9bef1581f73409`**（`feat(bn): add D12 LPBN template`，parent `bd20a44b217da505fc8412021b6ca054d582bb4e`），精確 5 paths（1 M＋4 A）。這不是 D platform integration 或正式 Preview／Export PASS；第 38 節 A／B 正式支援邊界仍有效。完整規格見 D 樣式 Requirement 第 15 節（完成狀態 15.21），實作紀錄見 D 樣式 Proposal 第 14 節（14.26）。

### 47.1 已落地檔案

- `bn/templates/D/12-lpbn.js`：D－12 renderer，零 import、exports 恰 `waitForLpbnFonts`／`renderLpbn`。
- `bn/launch/D/12_LPBN.command`：專用校稿入口，mode `100755`，query `?type=D&bn=12_LPBN`。
- `bn/launch/viewer.html`：只增加 D－12 additive branch，未設 `fieldConfig`，共用機制未重構。
- `bn/assets/D/底圖/12_LPBN.jpg` 與 `bn/assets/D/對位/12_LPBN.png`：均為 1200 × 550；前者為 runtime 底圖，後者只供 1:1 overlay 校稿。

既有 tracked `bn/assets/D/Logo.png`（784 × 112）只被引用，未在本 commit 修改或再次納管。

三素材 dimensions／bytes／SHA-256：底圖 JPG 1200 × 550／131,471／`589ba6ce783340e3075ecc934558cbea2b2ade033ecd352c45386314d68d6634`；對位 PNG 1200 × 550／16,091／`912c5f9d3d06cfe30be4809c1d508b32220b0064a3f7e6925d63140aedb7f8a0`；共用 Logo PNG 784 × 112／48,618／`99813cf81a7963ff2e81d60e478332d6f24db4ea8462c059cb466770f016de24`。

### 47.2 Renderer 行為

Canvas／background 為 **1200 × 550 @ (0,0)**；四框為 logo `{58,161,365,52}`、headline `{58,226,405,49}`、subheadline `{58,285,475,62}`、protectionText `{58,360,475,28}`，三文字框與 A／B－12 逐值相同。Logo contain／no-upscale `scale=13/28`，destination **364 × 52 @ (58,161)**，餘量 0／1／0／0、完整 7:1 source、水平靠左且無 rounding／stretch／crop。Photoshop `(478,944,365,52)` 與 `Δ(-420,-783)` 只保留為 D－12 evidence，未形成 generic offset。

文字 typography、left-centered ink、`$`／`%` formatting 與 fit validation 沿用 A／B－12；Medium template-local 2× 為 **2400 × 1100**，只畫 headline＋protectionText。唯一正式 draw order 為 **canvas reset → clearRect → background → Logo → Medium local 2× → Bold subheadline**，只適用 D－12。A－12 baseline functions 比對為 6/14 byte-identical＋7/14 message-only behavior-equivalent＋1/14 substantive（`renderLpbn`），新增 `drawLpbnLogo` 另計；`assertSpecificationFitsCanvas` 未弱化並涵蓋四框，A－12 zero-diff。

### 47.3 Launch 校稿路徑

Launcher 104 行、與 A－12 僅 7 行識別差異；Viewer 沿用既有共用 Logo loader、images dispatch 與 overlay 1:1 validation，3 處 stale comments zero-diff。對位 PNG 不合成進正式 Canvas。Jamie 已親自開啟 launcher 完成 Phase 6 人工 1:1 overlay 並明確 **PASS**；此入口仍只是開發校稿工具，不是正式控制台 Preview／Export。

### 47.4 平台邊界

正式支援 Type 仍只有 **A／B**：`SUPPORTED_TYPES`、`ASSET_BASE_BY_TYPE`、`A_TABLE`／renderer registry 均未 enable D，六個核心 JS zero-diff，D 維持 fail-closed。LPBN 掛標正式 D 行為、D－12 Export、Preview↔Export 與 D platform integration 全部 deferred。已完成個別 renderer／人工對位的集合更新為 **D－01、D－02、D－03、D－06、D－07、D－08、D－09、D－10、D－12**，不代表整個 D 完成；D－04、D－05、D－11、D－13～17 仍未完成，樣式 C 不在本節範圍。

## 48. D 樣式正式平台整合實際落地狀態

> 本節記錄 `e31f7be0b73fcca6db59bae693137f8fe8a8a329`（`feat(bn): integrate D style into generator`，parent `173fcb06b4cc2d4a8e749ecaa50b58cd5335bec5`）之正式架構結果，以及 Jamie 已完成的正式控制台 Manual Verification **PASS**。第 39～47 節「尚未平台整合」文字保留為各 template落地當時的歷史狀態，已由本節取代；各節 launcher人工1:1 overlay PASS仍是另一層驗證，不與本次平台 PASS混寫。

### 48.1 Renderer 與 asset routing

`bn/js/render-a.js`保留既有 `A_TABLE`並新增稀疏 `D_OVERRIDE_TABLE`，精確只含 Group A **01／02／03／06／07／08／09／10／12**；這九個 route使用既有 D-specific renderer、`bn/assets/D/底圖/`對應底圖與 tracked `bn/assets/D/Logo.png`，維持既有 `{backgroundImage, logoImage}` contract。Group B allow-list精確為 **04／05／11／13／14／15／16／17**：04～16 reuse同 ID A renderer與原單一 `backgroundImage` contract，但背景改走D底圖；17 reuse A threshold renderer／model並直接讀取 canonical A `17_主標題.png`／`17_VIP.png`。沒有完整 `D_TABLE`、Group B D renderer／template／launcher、D－17 copies或模糊 fallback；未知 type／BN id與缺必要 asset／renderer均明確失敗。

### 48.2 Data、Editor、LPBN 與 Export

`bn/js/import.js`正式接受A／B／D；D Excel精確讀取worksheet `D`並沿用既有 mapping、threshold parser、`E15` LPBN月份與 atomic replace。Restore使用同一allow-list，Workspace JSON維持`FSS BN Workspace` version 1並保存`type:"D"`。一般Editor沿用BN-id欄位模型；`bn/js/app.js`只把既有D－17 threshold Editor／Modal gate擴為A／B／D。D－15 unit計數、D－16四欄模型、D－17 dynamic threshold geometry均未改。

D－12透過 central renderer自然沿用既有 LPBN resolver／variant chain：base保留、最多三個固定slots、缺slot不重新編號，Preview／Export共用resolver。Export繼續由既有BN-id matrix、72 dpi、JPG quality與01／02／10容量策略驅動；Workspace JSON寫入ZIP並保存D type。`export.js`、`workspace.js`、`lpbn-badges.js`與`editor.js`全部 zero-diff。

### 48.3 Commit、素材與 regression boundary

Code Commit精確為 **10 paths＝3 M＋7 A**：修改 `import.js`、`render-a.js`、`app.js`，並納管 D－04／05／11／13／14／15／16七張runtime底圖。`index.html`、CSS、A templates、九個D templates、launchers、viewer、D Logo、canonical17 assets、badge assets、fonts與vendor均 zero-diff。七張 `bn/assets/D/對位/` 04／05／11／13／14／15／16圖維持untracked，只作人工校稿／evidence，不進runtime。

Jamie正式控制台 Manual PASS確認本次 D平台整合可用；此狀態不是Push／Tag／Release紀錄。樣式C與shared／generic重構不在本次範圍。
