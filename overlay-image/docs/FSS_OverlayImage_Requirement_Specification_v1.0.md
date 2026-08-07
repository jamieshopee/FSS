# FSS Overlay Image 生成器－Requirement Specification v1.0

> 階段：Phase 1－Requirement Specification
> 狀態：待 Jamie 確認
> 需求基準：Phase 0 已完成
> 文件目的：作為後續專案調查、Proposal、Coding 與驗證的完整需求依據；後續工作不需回頭閱讀 `Phase0_完整需求整理.txt`。

---

## 1. 文件定位與規範來源

### 1.1 文件定位

本文件整理 FSS Overlay Image 生成器目前已確認的完整需求。本文件不是 Proposal，不包含 Coding、技術實作或資料結構設計。

Jamie 確認本文件後，才可依《開發流程》進入 Phase 2 專案調查；不得跳過需求確認直接進入 Proposal 或 Coding。

### 1.2 正式來源與適用範圍

| 正式文件 | 適用範圍 |
|---|---|
| `docs/架構說明.md` | FSS 平台架構、生成器分離原則、資料夾職責與主要使用流程 |
| `docs/開發流程.md` | Phase、責任分工、Proposal、Coding、驗證與 Git 流程 |
| `overlay-image/docs/Phase0_完整需求整理.txt` | 已確認的 FSS Overlay Image 產品、流程、資料、介面、操作與範圍需求 |
| `overlay-image/docs/Layout_ABCD_規格整理.txt` | **Layout A～D 的唯一正式規格來源** |

Layout A～D 的適用情境、辨識、排版、字型、字級、字色、符號與換行等規格，全部直接引用 `Layout_ABCD_規格整理.txt`，本文件不重新定義。

### 1.3 Locked 原則

本文件所收錄之 Phase 0 需求均為 Locked。不得：

- 修改需求或 Locked 規格。
- 新增或刪除需求。
- 自行重新設計。
- 自行延伸功能。
- 自行補完未討論內容。
- 對 Layout A～D 重新定義、合併規則、互相轉換或自行猜測。

重複資訊僅重新分類，不因整理而刪除其規範效果。

---

## 2. 產品目的與定位

### 2.1 產品名稱

FSS Overlay Image 生成器。

### 2.2 產品定位

FSS Overlay Image 是批次生成器。主要目的為透過 Excel 自動產生全部 Overlay Image；「檢查」是主要流程，手動編輯只提供必要微調。

本產品不是完整設計編輯器，不提供自由設計。

### 2.3 產品主要流程

匯入 Excel → 自動產生全部 Overlay Image 預覽 → 檢查 → 必要時微調 → 下載完整專案。

---

## 3. 名詞定義

| 名詞 | 定義 |
|---|---|
| Overlay Image | 單一成品項目；設計與預覽尺寸為 1200 × 1200 px。一個三列製作區塊產生一張 Overlay Image。 |
| 編號 | Overlay Image 的識別值，同時直接作為該 Overlay Image 的 PNG 輸出檔名。 |
| Badge | Overlay Image 上的一個訊息；一個訊息等於一個 Badge。每張 Overlay Image 最多 3 個 Badge。 |
| 第一格／第二格／第三格 | Excel 既有欄位名稱，也是 Badge 當下由左至右的位置；不是 Badge 的永久身份。 |
| Layout | Badge 的文字樣式與排版規則。現有選項為 A、B、C、D；正式規格只見 `Layout_ABCD_規格整理.txt`。 |
| Excel 工單 | Overlay Image 的主要資料來源；一個三列製作區塊對應一張 Overlay Image，每個訊息只使用一個儲存格。 |
| Generator | FSS Overlay Image 生成器介面，負責批次產生預覽及提供必要微調。 |
| 預覽 | Generator 左側顯示的 1200 × 1200 px Overlay Image。 |
| 暫存檔 | 保存下載當下完整工作區狀態的單一 JSON 檔案；不是只保存原始 Excel。 |
| 完整專案 | 一個 ZIP，包含全部 1200 × 1200 PNG、全部 320 × 320 PNG，以及一個完整工作區 JSON 暫存檔。 |
| 工作區 | Generator 目前載入的全部 Overlay Image、Badge 與所有編輯結果。 |

---

## 4. 系統與架構邊界

### 4.1 FSS 平台關係

- FSS 入口頁讀取 `tools.json` 動態產生生成器入口。
- Overlay Image 位於獨立的 `overlay-image/` 資料夾。
- Overlay Image 應各自帶完整的 `js/`、`css/`、`forms/`、`templates/`、`assets/`，與其他生成器互不相依。
- 入口平台只透過 `tools.json` 管理可用生成器，不直接依賴 Overlay Image 內部實作。
- 正常情況下，新增、修改或移除 Overlay Image，不需要修改其他生成器的程式碼。
- 預覽項目由 Excel 工單資料動態建立，不在 HTML 寫死。

### 4.2 資料夾職責

| 資料夾 | 職責 |
|---|---|
| `js/` | Overlay Image 的流程、Excel 解析、下載、暫存等程式邏輯；採功能拆分，避免巨型單一檔案。 |
| `css/` | Overlay Image 生成器本身的介面樣式。 |
| `forms/` | Excel 欄位對應。 |
| `templates/` | 各類成品版型與呈現規則，以及版型所需的固定樣式或資源。 |
| `assets/` | Overlay Image 專案固定素材。 |

### 4.3 支援平台界線

正式架構將本工具定義為 FSS 入口平台下的網頁生成器，並由瀏覽器或作業系統處理同名下載。現有正式需求未指定瀏覽器清單、瀏覽器版本、作業系統清單或行動裝置支援範圍；本文件不新增任何未確認的平台承諾。

---

## 5. 操作流程

### 5.1 Excel 主流程

1. 使用者匯入工單 Excel。
2. Generator 依 Excel 每一個已填寫的三列製作區塊動態產生一張 Overlay Image，並顯示全部預覽。
3. 使用者檢查全部 Overlay Image。
4. 如有必要，使用者選取單張 Overlay Image，進行允許的 Badge 微調。
5. 使用者下載完整專案 ZIP。

### 5.2 暫存還原流程

1. 使用者匯入 JSON 暫存檔。
2. Generator 清除目前工作區。
3. Generator 依 JSON 完整還原全部 Overlay Image 與所有編輯狀態。
4. 工作區回到該暫存檔下載當下的完整狀態。

匯入暫存不與目前資料合併、不追加 Overlay Image，也不保留匯入前的修改。

### 5.3 重設流程

1. 使用者點選「重設工作區域」。
2. Generator 顯示一次不可逆操作確認。
3. 使用者確認後，Generator 清除全部工作內容。
4. 工作區回到尚未匯入 Excel 或暫存檔的初始狀態。

---

## 6. 系統流程與狀態規則

### 6.1 Excel 匯入後

- Excel 匯入採 Atomic Import；Excel 結構、編號、Layout、顏色、Badge 格式或其他既有資料格式任一不符時，拒絕整次匯入，不建立部分 Overlay Image，也不修改目前工作區。
- 每張 Overlay Image 內全部 Badge 實際量測總寬超過 1120 px 屬於 Width Warning，不是 Atomic Error；系統不因此拒絕 Excel 匯入。
- 一個已填寫的三列製作區塊產生一張 Overlay Image。
- Excel 帶入 Overlay Image 編號，以及每個 Badge 的原始 Layout、原始顏色、原始文字與初始順序。
- 每張 Overlay Image 最多 3 個 Badge；未使用的格子留白。
- 超過 1120 px 的 Overlay Image 與其他全部合法 Overlay Image 仍進入工作區，超規項目的 Preview 顯示 Width Warning，供使用者修改內容。
- 左側顯示全部 Overlay Image 預覽。
- 右側同一時間只編輯目前選取的一張 Overlay Image。

### 6.2 編輯同步

對目前選取 Overlay Image 進行下列操作時，左側對應預覽必須即時更新：

- 修改文字。
- 刪除 Badge。
- 新增 Badge。
- 拖曳調整 Badge 順序。

工作區成功建立或還原後，文字修改或新增 Badge 即使使該張 Overlay Image 的 Badge 總寬超過 1120 px，修改仍成立且不回復原值；Preview 與 Editor 必須顯示即時 Warning。修改文字或刪除 Badge 後重新量測，回到 1120 px 以內時 Warning 立即消失。

### 6.3 Badge 順序狀態

- Badge 由 Overlay Image 左下開始，依序向右增加。
- 多個 Badge 左右相連。
- 由左至右依序為第一格、第二格、第三格。
- 順序完全依目前位置決定，不依顏色、Layout 或文字長度重新排序。
- 拖曳時 Layout、顏色與文字作為完整 Badge 一起移動。
- 刪除後新增的 Badge 不需補回原本刪除的固定位置；新增後由拖曳決定實際順序。

### 6.4 下載狀態

下載完整專案時，系統以當下完整工作區產生全部尺寸 PNG 與 JSON 暫存。JSON 必須包含所有匯入資料與所有編輯結果。

- 只要工作區存在任一 Badge 總寬超過 1120 px 的 Overlay Image，即不得下載完整專案。
- 「下載完整專案」按鈕正下方不需先點擊即顯示全部超規項目；每張各列一行，依工作區原順序顯示 `編號 X：Badge 總寬 XXXXpx，超過 1120px，請修改。`，不依寬度重新排序。
- 全部項目修正至 1120 px 以內後，超規清單立即消失；成功匯出後顯示「完整專案已建立。」
- Import／Restore 的成功與錯誤訊息仍顯示在匯入資料區，不與 Export 狀態混用。

---

## 7. Excel 工單規格

### 7.1 基本結構

- 一個三列製作區塊等於一張 Overlay Image。
- 編號位於 A 欄，跨該製作區塊的三列合併。
- 欄位名稱維持「編號」「第一格」「第二格」「第三格」，不得改成 Item ID、Badge 1 或其他名稱。
- 第一格、第二格、第三格的資料值分別位於 C、E、G 欄。
- B、D、F 欄為固定標籤，不屬於 Overlay Image 資料。
- 每個 Badge 的資料於三列製作區塊中依序為：文字樣式、顏色、文字內容。
- Excel 每個訊息永遠只使用一個儲存格。
- 最多 3 個 Badge；不用的格子留白。

### 7.2 編號

編號用途只有：

1. Overlay Image 識別。
2. 輸出檔名。

不另外增加輸出檔名欄位。

### 7.3 文字樣式

- 使用 Excel 下拉選單。
- 選項固定為 A、B、C、D。
- 不開放自行修改下拉選項。
- 各選項對應的 Layout 規格只引用 `Layout_ABCD_規格整理.txt`。

### 7.4 顏色

- 使用 Excel 下拉選單。
- Excel 與 Generator 顯示名稱固定為：紅、綠、黃、藍。
- 不開放自行修改下拉選項。

顏色對應如下：

| Excel／Generator 顯示名稱 | 色碼 | Layout 正式文件用語 |
|---|---|---|
| 紅 | `#D0011B` | 紅 |
| 綠 | `#007661` | 綠 |
| 黃 | `#FFD200` | 黃 |
| 藍 | `#113366` | 深藍 |

上表只記錄兩份正式來源對同一色碼的既有稱呼：操作介面與 Excel 仍顯示「藍」，不因此修改 Layout 文件的「深藍」用語。

### 7.5 不存在的欄位

工單不需要：

- BadgeCount。
- 商品名稱。
- 活動名稱。
- 商品代號。
- 其他未討論欄位。

---

## 8. Badge 共通規格

### 8.1 數量與尺寸

- 一個訊息等於一個 Badge。
- 一張 Overlay Image 最多 3 個 Badge。
- Badge 高度固定為 150 px。
- Badge 左右 Padding 固定為 20 px。
- Badge 寬度依文字內容自動伸縮。
- 每張 Overlay Image 內全部 Badge 的實際量測總寬最多為 1120 px；Badge 可為 1～3 個，此上限不是 1200 × 1200 Canvas 尺寸。

### 8.2 排列

- 多個 Badge 左右相連。
- 從左下開始，依第一格、第二格、第三格的目前順序向右排列。
- 不依顏色、Layout 或文字長度重新排序。

### 8.3 顏色與字色

- 背景色由 Excel 指定；新增 Badge 則由使用者選擇。
- 黃底固定使用紅字 `#D0011B`。
- 其他底色固定使用白字 `#FFFFFF`。
- Layout A 的字色依 Layout A 正式規格，不套用上述共通字色規則。
- Layout 呈現的完整字色規格以 `Layout_ABCD_規格整理.txt` 為準。

---

## 9. Generator UI

### 9.1 整體介面

- 介面風格沿用 FSS 入口平台。
- 視覺方向為深色、Liquid Glass、FSS 系列一致風格。
- 版面為左右兩欄。
- 左側欄為響應式。
- 右側欄為固定寬度。

### 9.2 右側欄內容與順序

右側欄包含：

1. 匯入工單 Excel。
2. 匯入暫存檔。
3. 目前選取 Overlay Image 的 Badge 編輯區。
4. 下載完整專案。
5. 重設工作區域。

「下載完整專案」位於主要操作流程底部；Export 狀態顯示於按鈕正下方，「重設工作區域」位於 Export 狀態下方。

### 9.3 Badge 編輯卡片呈現

- 右側每個 Badge 分成獨立區塊。
- Badge 卡片採深色卡片。
- Layout 與顏色以純文字資訊顯示，例如「A／紅」。
- 不將整張卡片做成紅、綠、黃、藍背景，避免右側欄顏色搶走左側預覽的視覺焦點。
- 顯示一行提示：「拖曳調整順序」。
- 目前選取 Overlay Image 的 Badge 總寬超過 1120 px 時，Editor 顯示該張實際總寬、1120 px 上限及請修改提示；回到上限內時立即消失。

---

## 10. Overlay Image Preview

### 10.1 預覽尺寸與排列

- 左側顯示所有 Overlay Image 預覽。
- 預覽只顯示 1200 × 1200 px。
- 桌面寬度足夠時，一行 3 張起。
- 視窗變窄時，響應式減少欄數。
- 每張預覽卡左上角只顯示編號，編號不用太大。

### 10.2 選取回饋

點擊 Overlay Image 時：

1. 預覽卡先短暫微放大。
2. 預覽卡再回到原本大小。
3. 被選取的預覽卡以重點色外框持續標示。

微放大是短暫點擊回饋；顏色外框持續表示目前選取的 Overlay Image。

Badge 總寬超過 1120 px 的 Overlay Image 仍建立預覽，並顯示該張實際 Badge 總寬、1120 px 上限及請修改提示。Width Warning 不取代目前選取項目的重點色外框。

### 10.3 編輯關聯

- 右側欄同一時間只編輯目前選取的一張 Overlay Image。
- 文字修改、Badge 刪除、Badge 新增與 Badge 拖曳排序都必須即時反映到左側目前選取的 Overlay Image 預覽。

---

## 11. Badge 編輯規則

### 11.1 Excel 帶入的 Badge

允許：

- 修改文字。
- 拖曳排序。
- 刪除整個 Badge。

不允許：

- 修改 Layout。
- 修改顏色。

Layout 與顏色僅作資訊顯示，不作可編輯控制項。

### 11.2 新增 Badge

- 目前 Overlay Image 少於 3 個 Badge 時才允許新增。
- 新增後仍不得超過 3 個 Badge。
- 使用者自行選擇 Layout：A、B、C、D。
- 使用者自行選擇顏色：紅、綠、黃、藍。
- 選擇 Layout 後，顯示該 Layout 對應的文字輸入介面。
- 新增完成後可以修改文字、拖曳排序、刪除。
- 新增 Badge 不需補回原本刪除的固定位置；新增後透過拖曳決定實際順序。

### 11.3 Layout 對應的文字編輯介面

以下只規定 Generator 編輯欄位，不重新定義 Layout 的辨識或呈現規格：

| Layout | Generator 文字編輯欄位 |
|---|---|
| A | 一個文字輸入欄。 |
| B | 一個文字輸入欄。 |
| C | 不顯示混合文字框；顯示「左側四字」及「數字＋特殊符號」兩個對應欄位。 |
| D | 不顯示含換行的混合文字框；顯示「第一行」及「第二行」兩個對應欄位。 |

Layout C 的欄位讓使用者直接知道內容顯示區域，Generator 不需在編輯階段再次猜拆法。Layout D 的欄位讓使用者直接知道每段文字顯示行別，不需自行維護換行符號。

所有 Layout 的實際辨識、格式與呈現，均只引用 `Layout_ABCD_規格整理.txt`。

### 11.4 刪除 Badge

- 所有 Badge 都可以整格刪除。
- 刪除時，該 Badge 的 Layout、顏色與文字一起移除。
- 刪除後總數少於 3 時，可以新增 Badge。

### 11.5 Badge 拖曳排序

- 排序採拖曳，不使用箭頭。
- 拖曳對象為整個 Badge；Layout、顏色與文字一起移動。
- 排序後由左至右即為第一格、第二格、第三格。
- 第一格、第二格、第三格代表目前左右位置，不是 Badge 的永久身份。

---

## 12. Layout A～D

### 12.1 唯一正式規格來源

Layout A～D 的全部規格直接引用：

`overlay-image/docs/Layout_ABCD_規格整理.txt`

本 Requirement Specification 不複製、不摘要、不重新定義 Layout A～D 的適用、辨識、排版、字型、字級、字色、符號或換行規格。

任何 Layout 行為均不得由本文件另行推導或補完。

---

## 13. 暫存

### 13.1 暫存格式與範圍

- 暫存檔格式為 JSON。
- 一個 JSON 暫存包含全部 Overlay Image，不是一張 Overlay Image 一個 JSON。
- 暫存不是只保存原始 Excel。

### 13.2 必須保存的完整狀態

JSON 必須完整保存下載當下工作區的所有內容，包括：

- 全部 Overlay Image。
- 每張 Overlay Image 的編號。
- 每張 Overlay Image 當下的 Badge 數量。
- Badge 當下的左右順序。
- 每個 Badge 的 Layout。
- 每個 Badge 的顏色。
- 每個 Badge 的文字內容。
- Excel 匯入後做過的所有文字修改。
- 刪除 Badge 的結果。
- 新增的 Badge。
- 新增 Badge 的 Layout。
- 新增 Badge 的顏色。
- 新增 Badge 的文字。
- 下載當下目前完整工作狀態。

核心原則：匯入暫存後，工作區必須完整回到下載暫存當下的狀態。

### 13.3 匯入暫存

- 匯入格式為 JSON。
- JSON Restore 採 Atomic Restore；必須先在暫存資料結構中完成完整驗證及正規化，全部成功後才一次替換目前工作區。
- Restore 資料任一 Overlay Image 的 Badge 總寬超過 1120 px 時，拒絕整次還原；不還原部分資料，也不修改目前工作區。
- 匯入後完全覆蓋目前工作區。
- 不與目前資料合併。
- 不追加 Overlay Image。
- 不保留匯入前的修改。
- JSON schema 與 version 不變；Width Warning 為執行期間衍生狀態，不保存於 JSON。

流程固定為：在暫存資料結構中完整驗證及正規化 → 全部通過後一次替換目前工作區 → 回到暫存檔下載當下的狀態。

---

## 14. 匯出

### 14.1 成品尺寸與格式

- 設計尺寸：1200 × 1200 px。
- 最終輸出：ZIP 壓縮檔。
- ZIP 內含 1200 × 1200 PNG、320 × 320 PNG，以及一個 JSON 暫存檔。
- 1200 × 1200 PNG：72 dpi。
- 320 × 320 PNG：72 dpi。
- 320 × 320 由 1200 × 1200 自動縮小，不另外設計版型。
- 每張 PNG 的檔名直接使用 Excel 的「編號」。
- 匯出前必須驗證整個工作區；只要任一 Overlay Image 的 Badge 總寬超過 1120 px，必須在建立 ZIP、PNG 或 JSON 前阻止匯出。
- 全部 Overlay Image 均修正至 1120 px 以內後，才可下載完整專案。

### 14.2 ZIP 命名

ZIP 檔名格式：`OverlayImage_MMDD.zip`。

例如：`OverlayImage_0804.zip`。

同一天可以重複下載；若發生同名，由瀏覽器或作業系統依預設方式處理。

### 14.3 ZIP 結構

```text
OverlayImage_MMDD.zip
├── 1200x1200/
│   ├── 編號.png
│   └── …
├── 320x320/
│   ├── 編號.png
│   └── …
└── OverlayImage_MMDD.json
```

- `1200x1200/` 存放全部 1200 × 1200 PNG。
- `320x320/` 存放全部 320 × 320 PNG。
- `OverlayImage_MMDD.json` 保存下載當下全部工作區狀態。

---

## 15. 重設工作區域

- 「重設工作區域」顯示於右側欄「下載完整專案」下方。
- 重設後清除目前全部 Overlay Image。
- 清除所有文字修改。
- 清除所有 Badge 排序。
- 清除所有新增 Badge。
- 清除所有刪除結果。
- 回到尚未匯入 Excel 或暫存檔的初始狀態。
- 因此操作不可逆，執行前需要一次確認。

確認訊息方向：

> 確定要重設工作區域嗎？
> 目前尚未下載的內容將會清除。

---

## 16. Locked 規格總表

以下分類全部為 Locked；為避免重複內容，本表只指向完整規格位置，不再次摘要：

| Locked 類別 | 完整規格位置 | 狀態 |
|---|---|---|
| 產品定位 | §2 | Locked |
| 尺寸與輸出 | §14 | Locked |
| Badge 共通規格 | §6.3、§8 | Locked |
| 顏色規格 | §7.4、§8.3 | Locked |
| Layout A～D | `Layout_ABCD_規格整理.txt`；本文件 §12 僅引用 | Locked |
| Excel 工單 | §7 | Locked |
| Generator 整體介面 | §9 | Locked |
| Overlay Image Preview | §10 | Locked |
| Excel 帶入 Badge 編輯 | §11.1 | Locked |
| 新增 Badge | §11.2、§11.3 | Locked |
| 刪除 Badge | §11.4 | Locked |
| Badge 排序 | §6.3、§11.5 | Locked |
| 暫存與匯入暫存 | §13 | Locked |
| 下載完整專案 | §14 | Locked |
| 重設工作區域 | §15 | Locked |
| 操作責任與設計原則 | §17 | Locked |
| FSS 平台架構 | §4；`docs/架構說明.md` | Locked |

---

## 17. Scope Boundary

### 17.1 必要功能

- 匯入工單 Excel。
- 依已填寫的三列製作區塊數自動產生全部 Overlay Image 預覽。
- 選取與檢查 Overlay Image。
- 對 Excel Badge 修改文字、拖曳排序、刪除。
- 未滿 3 個 Badge 時新增 Badge。
- 匯入完整 JSON 暫存並覆蓋還原工作區。
- 下載完整專案 ZIP。
- 重設工作區域。

### 17.2 明確不做

- 完整設計編輯器。
- 自由設計。
- 自由變更 Excel 帶入 Badge 的 Layout。
- 自由變更 Excel 帶入 Badge 的顏色。
- 自動轉換 Layout。
- Layout 之間共用辨識或排版。
- 自動猜測 Layout C 拆字。
- 自動猜測 Layout D 換行。
- 修改既有 Layout A～D 以支援未來新格式。
- Badge 排序箭頭。
- BadgeCount 欄位。
- 額外輸出檔名欄位。
- 商品名稱、活動名稱、商品代號或其他未討論 Excel 欄位。
- 320 × 320 的獨立版型設計。
- 暫存匯入時合併或追加資料。
- 新增未討論的編輯能力。
- 未要求的功能延伸。
- 未確認的瀏覽器、作業系統或行動裝置支援承諾。

### 17.3 修改邊界

- 後續 Proposal 與 Coding 只能處理本文件確認的內容。
- 必須遵循 FSS Architecture Contract，不重新設計平台架構。
- Overlay Image 內部實作不得造成其他生成器相依或要求修改其他生成器程式碼；新增或移除生成器時僅同步更新 `tools.json`。
- Layout A～D 不在 Requirement Specification 重新定義；後續實作必須直接依 Layout 正式文件。
- 只提供必要微調，不得擴大為自由編輯。
- 不得順手重構或修改無關功能。
- 若 Proposal 需要改變，必須停止並由 Jamie 決定。

### 17.4 操作與設計原則

所有操作必須：

- 直覺。
- 容易理解。
- 容易維護。
- 不破壞 Excel 工單的核心設定。

---

## 18. 完成標準

FSS Overlay Image 只有在下列需求全部成立時，才符合本 Requirement Specification：

### 18.1 批次產生與預覽

- 工單每一個已填寫的三列製作區塊均動態產生對應 Overlay Image。
- 每張 Overlay Image 正確保留編號、Badge 內容、Layout、顏色與初始順序。
- 左側顯示全部 1200 × 1200 預覽，並符合響應式排列、編號、點擊回饋與選取外框規則。

### 18.2 編輯

- 右側只編輯目前選取 Overlay Image。
- Excel Badge 只能修改文字、拖曳與整格刪除，不能修改 Layout 或顏色。
- 少於 3 個 Badge 時可依既定選項與欄位新增 Badge，總數不得超過 3。
- 拖曳、刪除、新增與文字修改均即時更新對應預覽。
- Badge 的尺寸、總寬、排列與順序符合共通規格。
- 工作區編輯造成 Badge 總寬超過 1120 px 時，修改保留且 Preview／Editor 顯示 Warning；回到上限內時 Warning 立即消失。
- Layout 呈現完整符合唯一正式 Layout 文件，且未加入猜測、轉換或共用規則。

### 18.3 暫存與還原

- 下載產生的單一 JSON 包含全部 Overlay Image 及下載當下所有工作狀態。
- 合法 JSON 通過 Atomic Restore 後完全覆蓋目前工作區，並完整還原至下載當下狀態；含有 Badge 總寬超過 1120 px 的 JSON 必須整次拒絕。

### 18.4 匯出

- 一次下載產生一個 `OverlayImage_MMDD.zip`。
- ZIP 結構、資料夾名稱及 JSON 名稱符合本文件。
- 每張 Overlay Image 均輸出 1200 × 1200、72 dpi PNG。
- 每張 Overlay Image 均由 1200 版本自動縮小輸出 320 × 320、72 dpi PNG。
- 所有 PNG 直接以編號命名。
- 任何超過 1120 px 的 Overlay Image 均在 ZIP、PNG、JSON 建立前阻止完整專案匯出；下載區逐項列出超規編號與實際寬度，全部修正後清單立即消失並可正常匯出。

### 18.5 重設與範圍

- 重設按鈕位置、一次確認、清除內容與初始狀態符合本文件。
- 未實作任何「明確不做」項目或其他未討論功能。
- 未破壞 FSS 平台架構或其他生成器的獨立性。

---

## 19. 後續階段門檻

1. Jamie 確認本 Requirement Specification。
2. 確認後進入 Phase 2 專案調查；第一次只能閱讀專案、理解架構、找相關檔案、可沿用功能、Root Cause、風險與必要決策問題，不得 Coding。
3. Phase 2 完成後才可提出 Proposal。
4. Proposal 經 Jamie 確認後才可 Coding。
5. Coding、AI 自我驗證、Jamie 手動驗證 PASS、Code Commit、Docs Update、Docs Commit、Jamie Push 與可能的 Tag／Release，均依 `docs/開發流程.md` 執行。

---

## 20. 文件整併狀態

本次未修改任何需求內容、任何 Locked 規格或任何既有正式文件。Requirement Specification 已將既有需求重新分類、重新整理章節，並依文件職責改為引用正式文件；此整理不涉及需求內容或 Locked 規格的修改。

本文件僅進行以下整理：

- 將 Phase 0 的非 Layout 需求依 Requirement Specification 章節重新分類並完整收錄。
- Layout A～D 不從原文件搬出，不在本文件重複定義，只引用唯一正式來源。
- `Phase0_完整需求整理.txt` 保留為 Phase 0 歷史文件；本文件經 Jamie 確認後，後續 Proposal 與 Coding 以本文件及其引用的 Layout 正式文件為需求依據。

---

## 附錄 A：Phase 0 需求追溯

| Phase 0 原章節 | 本文件承接位置 |
|---|---|
| 一、產品定位 | §2、§5、§17 |
| 二、尺寸與輸出 | §14、§16、§18 |
| 三、Badge 共通規格 | §6、§8、§16 |
| 四、顏色規格 | §7.4、§8.3、§16 |
| 五、Layout 共通原則 | §12（引用 Layout 正式文件）、§16、§17 |
| 六、Layout A | §11.3（僅編輯欄位）、§12（正式規格引用） |
| 七、Layout B | §11.3（僅編輯欄位）、§12（正式規格引用） |
| 八、Layout C | §11.3（僅編輯欄位）、§12（正式規格引用）、§17.2 |
| 九、Layout D | §11.3（僅編輯欄位）、§12（正式規格引用）、§17.2 |
| 十、Excel 工單 | §7 |
| 十一、Generator 整體介面 | §9.1 |
| 十二、左側欄－Overlay Image 預覽 | §10 |
| 十三、右側欄內容 | §9.2 |
| 十四、Excel 帶入 Badge 的編輯規則 | §9.3、§11.1 |
| 十五、新增 Badge | §11.2、§11.3 |
| 十六、刪除 Badge | §11.4 |
| 十七、Badge 排序 | §6.3、§11.5 |
| 十八、暫存檔 | §13.1、§13.2 |
| 十九、匯入暫存 | §5.2、§13.3 |
| 二十、下載完整專案 | §14 |
| 二十一、重設工作區域 | §5.3、§15 |
| 二十二、操作責任與設計原則 | §2、§7、§11、§17 |
| 二十三、目前階段與下一步 | §1.1、§19 |

本追溯表確認 Phase 0 的 23 個原章節均已承接；Layout 內容依文件規則改為正式來源引用，而非在本文件重複定義。
