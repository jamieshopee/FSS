# FSS Overlay Image Generator

FSS Overlay Image Generator 已完成實作，並於 2026-08-05 通過 AI 自我驗證與 Jamie 手動功能驗證。

## 使用方式

1. 由 FSS 根目錄啟動既有本機 HTTP Server。
2. 從 FSS 入口平台進入 Overlay Image，或開啟 `overlay-image/`。
3. 匯入 `forms/FSS_OverlayImage_工單.xlsx` 同格式的正式 Excel 工單。
4. 檢查全部 Overlay Image，必要時編輯、調整順序或新增 Badge。
5. 下載完整專案 ZIP。

Generator 為獨立 HTML、CSS、JavaScript 與 Templates，不依賴 FSS 平台 CSS 或 JavaScript；正式字型直接引用 FSS 根目錄的 ShopeeNotoSans Regular、Medium、Bold。

## 正式字型資源

正式 Web 字型使用 FSS 根目錄 `fonts/` 內的完整 WOFF2：Regular、Medium、Bold。CSS `@font-face` 均引用 `.woff2`，目的是降低 GitHub Pages 首次載入時間。

本次只進行 TTF 至 WOFF2 的格式轉換，未做 Subset；`font-family`、`font-weight`、`font-style` 保持不變，Canvas、Layout、排版與功能亦無變更。

對應 Code Commit：`d8c5b1545e0cf48f0c80c643582f61a137d5fee0`（`perf: replace TTF fonts with WOFF2`）。

## 已完成功能

- 正式 Excel 工單三列製作區塊解析。
- Excel Atomic Import 與欄位、編號、Layout、顏色、內容及總寬驗證。
- Layout A、B、C、D Canvas 預覽與 Badge 編輯。
- Badge 新增、刪除及拖曳排序。
- JSON 暫存檔完整還原與 Atomic Restore。
- 1200 × 1200 PNG 與由其等比例縮小的 320 × 320 PNG。
- 兩種 PNG 均寫入 72 dpi metadata。
- ZIP 批次輸出與工作區重設。

Layout A～D 的正式定義以 `docs/Layout_ABCD_規格整理.txt` 為唯一來源；完整產品需求以 `docs/FSS_OverlayImage_Requirement_Specification_v1.0.md` 為準。

## Layout Visual Tuning

Layout A～D 已依正式字型與 Canvas 實際 glyph bounds 完成視覺調整，並通過 Jamie 手動驗證：

- Layout A：依各文字 run 的實際 bounds 計算寬度與置中位置，縮小的 $／% 依相鄰數字 ink bottom 動態對齊。
- Layout B：依單行文字的實際 bounds 計算 Badge 寬度、左右 20px 可見留白及垂直置中。
- Layout C：左側兩行、數字及 $／% 分別依正式字型規格呈現；左側與數值區間距為 10px，數字與 $／% 間距為 5px，整組依實際 bounds 置中。
- Layout D：兩行可見 glyph 間距為 10px；前置 $ 與後置 % 分別依相鄰的第一個或最後一個可見 glyph 動態對齊，整組依實際 bounds 置中。

所有 Layout 的 Badge 寬度、左右可見留白、超寬驗證與實際 Canvas 繪製均使用各 Layout 自己的量測結果；Layout 之間不共用辨識或排版規則。

## 第三方程式庫

第三方程式庫固定存放於 `js/vendor/`，執行期間不連線 CDN：

- SheetJS Community Edition 0.20.3：`xlsx.full.min.js`，來源為 SheetJS 官方 standalone distribution，Apache License 2.0。
- JSZip 3.10.1：`jszip.min.js`，來源為 JSZip 官方 distribution，MIT 或 GPLv3 雙授權。

原始 license 分別保存於 `LICENSE.sheetjs.txt` 與 `LICENSE.jszip.txt`。

## 完成驗證

正式工單實際驗證結果：

- 成功建立 5 張 Overlay Image、11 個 Badge。
- Overlay Image 總寬依序為 314、670、1112、469、951 px，均未超過 1200 px。
- Preview、1200 PNG 與 320 PNG 的輸出一致性驗證通過。
- 1200 PNG 與 320 PNG 均確認為 72 dpi metadata。
- Excel Atomic Import、JSON Restore、Badge 編輯與新增、超寬拒絕、匯出及重設 Regression Test 通過。
- 全部 JavaScript 語法檢查與 `git diff --check` 通過。
- Layout A、B、C、D Visual Tuning 均通過 Jamie 手動驗證。
