# FSS BN Generator－A 樣式平台整合 Requirement Specification v1.0

> **【CURRENT CONTRACT UPDATE】** Code Commit `8a141c1c905107546c25cd125015e1ec7ee61609`（`fix(bn): remove LPBN badge variants`）已取消 A／B／C／D 的 LPBN 掛標。A－12 current Preview／Export均只有單一 base `12_LPBN.jpg`；第26節記錄的 `lpbnBadgeMonth`與 `_1`～`_3` variants屬當時歷史落地狀態，已被本註記取代。Workspace JSON仍為version 1，新JSON不再輸出`lpbnBadgeMonth`，legacy欄位可Restore但會被忽略；base filename、JPG、1200 × 550、quality 1.0、72 dpi與無byte limit不變。

> 階段：Phase 1－Requirement Specification
>
> 開發範圍：FSS BN 樣式 A 的正式平台整合（Excel Import → Workspace → 正式 renderer → Preview → Restore → Export）
>
> 狀態：Phase 1 草稿，待 Jamie＋GPT 審稿；未經 Jamie 確認不得進入 Phase 2
>
> 整理日期：2026-08-18
>
> 基準 HEAD：`b87a6ea2be95e59912a55f3f5cb7e3113cfe98f4`

## 1. 文件目的與本輪 Scope

本文件依已結案的 Phase 0（含 Jamie 對 Open Questions 1～3 的正式裁決）定義「FSS BN－A 樣式平台整合」的產品需求與完成標準，供 Phase 2 Investigation 與 Phase 3 Proposal 使用。

本輪 Scope 為：讓使用者在既有 BN 控制台中，於選擇樣式 A 後，完成「匯入正式 A 工單 Excel → 自動建立完整 A 工作內容 → 以已完成的 A－01～17 正式 renderer 呈現 Preview → 必要文字微調 → 匯入暫存還原 → 下載完整專案」的完整正式流程。

本文件只定義產品需求，不指定實作方式。下列正式文件為上位基準，本文件不修改、不取代：

- `docs/開發流程.md`
- `docs/架構說明.md`（Locked Architecture Contract）
- `bn/docs/FSS_BN_Architecture.md`
- `bn/docs/FSS_BN_Requirement_Specification_v1.0.md`（第一輪，已完成 PASS）
- `bn/docs/FSS_BN_Template_Requirement_Specification_v1.0.md`（A－01～17 正式 Templates，已完成 PASS）
- `bn/docs/FSS_BN_17版位_Type差異_Phase0整理.md`
- `bn/docs/FSS_BN_正式版位建立_SOP.md`

## 2. 前置已完成狀態

- 第一輪「BN 樣式選擇頁＋BN 控制台最初骨架」已完成並 PASS（Code Commit `c34f9d7`、Docs Commit `157ba3f`），含左側 17 BN 清單、鍵盤／滑鼠切換、右側 Editor（IME-safe、字數、banwords）、Reset。
- A－01～17 全部正式 Template 已完成、AI 自驗與 Jamie Manual Validation PASS，位於 `bn/templates/A/`；Launch 入口位於 `bn/launch/A/`；`bn/launch/viewer.html` 為校稿工具。
- 正式 A 工單 Excel 的 A 分頁 mapping 已於 Phase 0 實測確認（見第 5、6、8 節）。
- 目前尚未實作：Excel Import、暫存 Restore、Export、Workspace→renderer 接入、正式 Canvas Preview。控制台 Preview 仍為 DOM placeholder；`bn/js/workspace.js` 為第一輪 runtime 骨架，不是正式 Workspace Schema。

## 3. 非目標／Scope Boundary

本輪不得：

- 製作或修改任何 A－01～17 正式 Template：不得重新製作、不得改視覺規格、不得 Visual Tuning、不得改 renderer API／exports。
- 處理樣式 B／C／D：不得製作其 Template、不得讓 A 整合順手支援 B／C／D、不得複製 A 流程給其他樣式。
- 討論或裁決 A／B／C／D 最終是否共用 renderer、helper、schema、registry 或其他抽象架構。
- 重新設計既有控制台 UI、樣式選擇頁、Editor、Reset、banwords 或 Launch／Viewer。
- 建立 A－17 專用手動 Editor（見第 8 節）。
- 修改 Excel 工單內容、label 或 validation。
- 修改 FSS 入口平台 Locked Architecture Contract 或 Overlay Image。
- 在本 Requirement 決定任何 implementation（parser library、函式、mapping module、adapter、registry、Workspace object shape、serialization 格式、JS 拆檔）。

允許的 UI 變化僅限：把現有已預留但 disabled 的「匯入工單 Excel」「匯入暫存檔」「下載完整專案」入口接通為正式功能，以及以正式 renderer Preview 取代中間欄 placeholder。若後續 Investigation 發現真正 integration blocker 必須改 UI，必須在 Phase 3 Proposal 明確提出並取得 Jamie 批准。

## 4. Type A 與 Excel A worksheet 自動對應

- 使用者必須先在平台選擇樣式 A，再於控制台匯入正式工單 Excel。
- 匯入時平台必須自動讀取該 workbook 的 `A` 分頁；不得要求使用者再次選擇 worksheet。
- 目前工作樣式為 A 時，Import 不得改讀 `B`／`C`／`D` 分頁，也不得 fallback 至「第一個 worksheet」或任何其他分頁。
- 若 workbook 無法解析、`A` 分頁不存在、或必要資料不足以建立完整 Workspace，Import 必須失敗（見第 9 節），且不得破壞目前 Workspace。
- 本節只描述本輪樣式 A 的必要行為，不設計跨 Type 架構。

## 5. A－01～12 共用文字與同步規則（Jamie 已裁決）

- Excel 唯一 source：主標 `B15`、副標 `B16`、保護文字 `B17`。A 分頁 01～12 顯示區（E20～E55）只是引用 B15／B16／B17 的 formula reference，不是第二 source；Import 不得以顯示區為準。
- 匯入後 A－01～12 必須全部使用同一組主標／副標／保護文字。
- 使用者於右側 Editor 修改任一 A－01～12 版位的主標時，其餘 11 個版位的主標必須同步為相同內容；副標與保護文字同理。
- A－01～12 永遠不允許文字分歧；不存在「單一版位獨立改文字」的合法狀態。
- 字數限制維持：主標 8、副標 7、保護文字 17；算法沿用既有 runtime（ASCII 0.5、非 ASCII 1）。
- 以上為產品 source-of-truth 語意。Workspace 底層究竟保存一份 shared data、多份同步副本或其他方式，屬 storage implementation，必須留待 Phase 2 Investigation／Phase 3 Proposal，本文件不得寫死。

## 6. A－13～16 Excel mapping 與獨立資料規則

Mapping 已於 Phase 0 實測鎖定：

| BN | 欄位 → Excel cell（A 分頁） | 字數上限（units） |
|---|---|---|
| 13_Skinny BN_APP | 第一行 `L20`、第二行 `L21` | 5／6 |
| 14_Skinny BN_PC | 第一行 `L22`、第二行 `L23` | 5／6 |
| 15_AR | 第一行 `L24`、第二行 `L25` | 3／3（見第 7 節） |
| 16_副區 | 左標題 `L26`、左文案 `L27`、右標題 `O26`、右文案 `O27` | 各 10 |

- A－13～16 各自為獨立資料，彼此不同步，也不與 01～12 共用組同步。
- 字數算法一律沿用既有 runtime：ASCII 0.5、非 ASCII 1。

## 7. A－15 正式字數規則（Jamie 已裁決）

- A－15 每欄位沿用目前 BN runtime 規則：ASCII 每字 0.5、非 ASCII 每字 1、上限 3 units；即最多 3 個非 ASCII、6 個 ASCII，或同權重混合且總 units ≤ 3。
- Excel label「限全中文3字或全英數符號2字」不作為正式平台驗證規則；本輪不得修改該 label。
- Excel validation `LENB(L24)<=6` 與 runtime 規則主要計算方向一致，此差異已由 Jamie 裁決並記錄，不再是 Open Question。

## 8. A－17 特殊整合邊界

- A－17 已依同一份正式工單 Excel 完成正式動態 renderer 並 Manual PASS；平台整合必須沿用既有正式行為。不得重新研究其 Excel mapping、不得重新定義 model、不得修改 dynamic geometry、物流欄、門檻列、amount color、`↑` merge、VIP 或 warnings 行為。
- 正式 model 語意維持：`mainTitle`、`logistics`（≤5）、`thresholds`（≤9）、`vip`。renderer 呼叫現況為 `renderThresholdTable(canvas, {titleImage, vipImage}, model)`，Canvas 寬 1200、高度動態、有 warnings 回傳；此僅作 Requirement 邊界依據，本文件不提出重構。
- **本輪不提供 A－17 的一般右側文字 Editor（即 01～16 那種文字欄位 Editor）**。控制台選取 A－17 時，右側維持既有「不提供手動 Editor」狀態。
- 但 A－17 必須能完整經 Excel Import → Workspace → 正式 renderer → Preview 正常運作，且後續 Export 必須能正常輸出 A－17 成品。無一般 Editor 不得成為 A－17 缺 Preview 或缺 Export 的理由。
- Import 對 A－17 必須沿用既有正式工單資料語意（主標題、物流 1～5 的 line1／line2、門檻列成對之顏色＋金額、`↑` merge 指令、空白留白、VIP 標題／文案／CTA），建立可供既有正式 A－17 renderer 使用的完整 structured data；工單中預留而未填寫的門檻列依既有正式行為視為未使用。
- 未來是否另做 A－17 專用 Editor 不屬本輪 Scope，本文件不預先裁決。
- （後續追加：A－17 專用 Manual Editor 已由 Jamie 定案，正式 Requirement 見第 25 節；本節其餘邊界不變。）

## 9. Excel Import 成功／失敗／Atomic 原則

成功時：

- Import 必須一次建立完整的 A 工作內容：01～12 共用文字組、13～16 各自欄位、17 完整 structured data，使 01～17 全部可由同一 Workspace 切換、Preview 與後續 Export。不得只匯入目前選取的 BN。
- 匯入成功後，目前選取 BN 的 Preview 必須立即反映匯入資料；使用者切換至任何 01～17 均必須看到匯入結果。
- Import 不得改變目前工作樣式（A）。

失敗時（Atomic 原則）：

- workbook 無法解析、`A` 分頁不存在、或必要資料無法建立完整 Workspace 時，Import 必須整體失敗。
- 失敗不得清空、不得部分覆蓋、不得留下半套 Workspace；目前 Workspace 必須維持匯入前狀態。
- 失敗必須向使用者呈現可理解的失敗狀態（具體文案與視覺見第 19 節與第 23 節）。

其他：

- Excel Import 不做 banwords 檢查。
- 本文件不定 parser library、不定函式、不定 mapping module、不定 adapter、不定 registry；如何解析 xlsx 屬 Phase 2／3。

## 10. Workspace 產品資料語意與切換保存要求

以下定義產品行為，不定義 storage implementation：

- 同一個 A Workspace 必須同時承載 01～17 全部所需資料。
- 切換 selected BN 不得丟失任何其他 BN 的資料。
- 01～12 共用文字是單一產品 source of truth；Editor 修改必須使全部 01～12 同步（見第 5 節）。
- 13～16 各自獨立保存。
- 17 必須保存完整 structured data，使用者切換離開 A－17 再回來，必須得到同一 Preview 結果；後續 Export 亦必須得到同一輸出結果。
- Editor 的合法修改必須即時反映至 Workspace，再由 Workspace 驅動 Preview；Preview 不得以 Editor DOM 作為正式資料 source。
- 正式 Workspace JSON shape、欄位命名、shared data 實際 storage 方式、A－17 底層存放結構、serialization implementation 均留待 Phase 2／3，本文件不得寫死。現有 `bn/js/workspace.js` 第一輪骨架不得直接視為正式 Schema。

## 11. Editor → Workspace → Preview 即時同步

- 使用者修改右側文字且內容合法時，必須即時寫入 Workspace 並即時更新中間目前 BN 的 Preview；不得有「套用」按鈕或額外儲存步驟（沿用第一輪已 PASS 行為）。
- 01～12 任一版位修改後，切換至其他任何 01～12 版位，Preview 與 Editor 均必須呈現同步後的同一組文字。
- 13～16 修改只影響該版位自身。
- 不合法內容（超限、結構錯誤）不得寫入 Workspace，也不得更新 Preview（沿用既有 rollback 行為，見第 12 節）。

## 12. IME／字數／banwords 保護

- IME 防護必須沿用既有正式行為：`compositionstart`／`compositionend` 保護；composition 進行中不得把中間字串正式 commit；`compositionend` 後才提交最終內容並同步。
- 字數算法沿用既有 runtime：ASCII 0.5、非 ASCII 1，逐 Unicode code point 計算；各欄位上限依第 5～7 節。超限時必須禁止寫入 Workspace、回復上一個合法值並顯示警告（沿用既有 rollback 產品行為）。
- banwords 沿用既有正式 engine（`bn/js/banwords.js`＋預產 `bn/js/banwords-data.js`）與既有 blocked／replacement／remove／message 行為；只作用於 Editor 輸入，Excel Import 不檢查 banwords。
- 本輪不得重新設計 banwords 引擎、規則或提示 UI。若正式文件與現行 Code 對命中提示呈現仍有 inline message／Toast 描述差異，本輪一律沿用目前正式 runtime 行為（inline message），不得藉整合重做 banwords UI，除非該差異直接阻擋整合並經 Jamie 批准。

## 13. 正式 renderer → Preview 要求

- 正式控制台中間 Preview 必須使用已完成的 A－01～17 正式 renderer 輸出，不得另寫第二套視覺 renderer，不得使用 Launch overlay／對位圖作為正式畫面，不得以 DOM placeholder 作為最終 Preview。
- 切換 BN 時，Preview 必須依當前 Workspace 中該 BN 的資料重新呈現。
- 01～12 共用文字修改後，切換任何 01～12 均必須看到同步後結果；13～16 各自呈現自己的資料。
- A－17 即使沒有一般右側 Editor，也必須正常 Preview（資料來源為 Import／Restore 建立的 structured data）。
- Preview 內容必須與正式成品同源（同一 renderer、同一資料），不得出現 Preview 與 Export 成品不一致的第二套視覺結果。

## 14. 字型／assets／Canvas／A－17 動態高度的產品要求

- 正式 Preview 與 Export 必須使用正式 WOFF2 字型與 `bn/assets/A/` 正式底圖；不得替換、降級或另建副本。
- 各 renderer 既有的字型等待（`waitFor*Fonts`）與底圖 decode／intrinsic 尺寸 guard 行為不得被本 Requirement 改寫；guard 失敗時屬失敗狀態，適用第 19 節。
- 正式 Preview 必須尊重各 renderer 的 intrinsic Canvas size（如 A－01 531×792、A－08 1080×1920、A－15 100×100）；A－17 必須支援動態 Canvas height。
- 中間欄如何在有限空間顯示大尺寸 Canvas（顯示縮放策略）屬 Phase 2 調查／Phase 3 提案事項；無論顯示縮放為何，均不得改變 renderer 實際輸出內容與成品尺寸。
- 字型、assets 的載入時序與載入責任歸屬（控制台何時 load／wait／validate）屬 implementation，留待 Phase 2／3；本文件只要求「字型與底圖未就緒時不得產出錯誤成品或錯誤 Preview」。

## 15. Restore（匯入暫存檔）Atomic 行為

- 匯入暫存檔可在控制台內執行；匯入後會完整覆蓋目前 Workspace。
- 覆蓋前必須提示使用者目前工作將被覆蓋，並在使用者確認後才執行（沿用既有已鎖定需求；最終文案／按鈕／Dialog 視覺見第 23 節）。
- 必須採 Atomic Restore：只有暫存資料完整解析且驗證成功後，才一次性 replace 目前 Workspace。
- Restore 失敗時不得先清空、不得部分覆蓋目前 Workspace；目前工作必須維持原狀，並呈現可理解的失敗狀態。
- Restore 成功後，樣式（Type）、01～17 全部資料、selected BN 與必要工作狀態必須恢復到可正常 Editor／Preview／Export 的一致狀態。
- 本輪只要求能 Restore 樣式 A 的正式暫存資料；B／C／D 暫存的支援行為不在本輪定義，不得因本輪預先裁決跨 Type Restore 規則。無效、無法完整解析或無法完整驗證的 A 暫存必須拒絕，且不得清空、部分覆蓋或破壞目前 Workspace；只有完整解析與驗證成功後才可 Atomic replace Workspace。
- 暫存檔的 JSON Schema、檔名、serialization implementation 不在 Phase 1 定案，留待 Phase 2／3。

## 16. Reset 行為

沿用既有正式行為，不得因 A 平台整合重新設計：

- 「重設工作區域」清空目前 Workspace（含匯入與微調後的全部 01～17 資料）並回到 BN 樣式選擇頁。
- 不增加其他 Reset 行為。

## 17. Export／下載完整專案產品要求

- 本輪 A 樣式平台整合最終必須能由同一 Workspace 一次產出 A－01～17 全部正式成品。
- 成品必須由已完成的正式 renderer 生成；不得另做第二套 Export renderer；Export 與 Preview 必須同源。
- A－17 即使無一般 Editor，仍必須可 Export。
- 依既有架構方向，下載完整專案必須包含：全部正式成品，以及可供 Restore 使用的 Workspace 暫存資料。
- 完整專案下載檔案必須為 ZIP。ZIP 壓縮檔名稱必須為 `FSS BN_下載當下的日期`（Jamie 已裁決）；「下載當下的日期」必須使用實際執行下載時的日期，不得使用工單日期、活動日期、Import 日期或固定日期。Jamie 尚未指定日期字串的具體格式，本文件只鎖定命名語意，不得自行發明 `YYYY-MM-DD`、`YYYYMMDD`、民國年或其他格式（見第 23 節）。
- 完整專案 ZIP 中所有正式成品圖檔，不論 JPG 或 PNG，皆必須以 72 dpi 作為正式輸出解析度 metadata／成品解析度要求（Jamie 已裁決）。不得因設定 72 dpi 改變各 A－01～17 已 Locked 的正式 pixel dimensions、Canvas geometry、版面比例、renderer 視覺、文字尺寸、底圖尺寸或 A－17 動態高度；亦不得 Resize 成品來「達成 72 dpi」。72 dpi 在 Browser Export 中如何寫入 JPG／PNG metadata、使用何種 encoder／library、若 Canvas native export 不直接提供該 metadata 應如何處理，全部留待 Phase 2 Investigation／Phase 3 Proposal（見第 22 節）。
- 已由正式工單與已完成 Template 鎖定的輸出格式必須沿用：01～03 JPG、04 PNG、05 PNG（透明 Canvas 1200×400）、06～09 JPG、10～11 PNG、12 JPG（Jamie 最終裁決：`12_LPBN.jpg`、1200×550；早期「10～12 PNG」記載中 12 為歷史筆誤）、13～14 PNG、15 JPG、16 JPG、17 PNG（寬 1200、高依內容）。
  - 文件差異紀錄：`FSS_BN_17版位_Type差異_Phase0整理.md` 早期將 05_MSBN 記為 1200×360／JPG；正式工單 Excel（`1200x400`／`PNG 檔`）與已完成 A－05 正式 Template（透明 1200×400 Canvas）均為 PNG。本文件依正式工單與已 PASS Template 採 PNG，處理方式比照該文件對 A－17 格式的既有自我修正前例；是否回修該整理檔屬 Docs Update 範圍，由 Jamie 決定。
- ZIP 名稱以外的完整專案內部規格——資料夾層級、17 張成品實際檔名、暫存檔名、manifest、JPG 壓縮品質等——正式文件仍標記「尚未定案」；本文件不自行發明，列於第 23 節 Requirement Open Questions。72 dpi（已裁決之解析度要求）與 JPG 壓縮品質（未裁決）是兩件不同的事，不得混同。

## 18. Launch Viewer 與正式平台責任邊界

- `bn/launch/viewer.html` 與 `bn/launch/A/*.command` 只是正式 Template 的開發／視覺校稿工具，不是正式 Generator Preview、不是正式資料輸入流程。
- Viewer 的對位 overlay、測試 inputs、A－17 preset select、JSON textarea、warnings 校稿區均不得直接搬成正式控制台功能。
- Viewer 中已驗證的 renderer 呼叫行為（載入底圖＋等待字型後 render、A－17 雙圖＋動態高度＋warnings 消化）只作為既有能力的校稿證據，供 Phase 2 調查參考；本文件不因此指定實作方式。
- 本輪整合不得修改 Launch、Viewer 或 `.command` 檔案；A－01～17 各 Launch 入口行為不得回歸。

## 19. Error／Failure Safety

- Import、Restore、Export 任一失敗都不得造成半套 Workspace、部分覆蓋或不一致狀態。
- 不得默默 fallback：不得改讀錯誤 Type／錯誤 worksheet、不得改用錯誤 renderer、不得以 placeholder 頂替正式成品而不告知。
- 字型或正式 assets 未就緒／載入失敗時，必須呈現失敗狀態，不得輸出錯誤 Preview 或錯誤成品。
- 失敗必須提供使用者可理解的失敗狀態；具體 Toast／Dialog 文案與 CSS 不在 Phase 1 寫死（正式文件尚未定案者列第 23 節）。

## 20. Compatibility／不得回歸

- 不得修改 `bn/templates/A/` 任何 renderer 檔案；A－01～17 視覺輸出不得改變。
- 既有控制台已 PASS 行為不得回歸：樣式選擇頁、左側 17 BN 清單、Selected 狀態、滑鼠與鍵盤 ↑／↓（首尾不循環、IME／modifier／focus 防護）、右側依 BN 動態欄位、即時同步、字數 rollback、banwords inline message、Reset。
- 既有 Launch／Viewer 全部 route 行為不得回歸。
- FSS 入口平台、`tools.json`、Overlay Image 不得修改。
- 右側控制欄維持既有固定寬度配置與操作順序（匯入工單 Excel → 匯入暫存檔 → 文字微調 → 下載完整專案 → 重設工作區域），不新增未確認操作。

## 21. Acceptance Criteria

本輪完成時必須全部成立（供 Phase 5 AI 自驗與 Phase 6 Jamie 手動驗證）：

1. 選擇樣式 A 後可匯入正式 A 工單 Excel；平台自動讀取 `A` 分頁，無需再選 worksheet。
2. 匯入成功後 01～17 全部可切換、可 Preview；01～12 顯示 B15／B16／B17 共用組；13～16 顯示各自 mapping 欄位；17 依工單資料正常 Preview。
3. 修改任一 01～12 的主標／副標／保護文字，其餘 11 個版位同步；切換驗證無分歧。
4. 13～16 修改只影響自身；切換離開再回來資料不丟失。
5. A－17 無一般右側 Editor，但 Preview 正常、資料完整保存、切換往返結果一致。
6. Preview 全部由正式 renderer 生成；無 placeholder、無第二套視覺 renderer；各版位 intrinsic Canvas size 正確、A－17 高度動態。
7. 字數限制（8／7／17；5／6；3／3；10×4）與 ASCII 0.5／非 ASCII 1 算法全部沿用；超限 rollback 正常；IME composition 中不 commit。
8. banwords 沿用既有 engine 與 inline message；Excel Import 不觸發 banwords。
9. 無效 Excel（無法解析／無 A 分頁／必要資料不足）匯入失敗且目前 Workspace 完好。
10. Restore 覆蓋前有提示與確認；成功後 01～17 資料與工作狀態一致可用；失敗時目前 Workspace 完好；非樣式 A 或無效暫存被拒。
11. Reset 清空目前工作並回樣式選擇頁。
12. 下載完整專案可由同一 Workspace 產出 A－01～17 全部成品，格式符合第 17 節鎖定表；成品與 Preview 同源；並包含可供 Restore 的暫存資料。
13. 既有控制台、Launch／Viewer、A－01～17 renderer 檔案零修改且行為零回歸。
14. 未處理 B／C／D，未建立跨 Type 抽象架構。
15. 下載完整專案時，ZIP 名稱符合 `FSS BN_下載當下的日期` 產品規則，日期為實際執行下載當下的日期。
16. ZIP 內 A－01～17 正式 JPG／PNG 成品皆維持各自 Locked pixel dimensions 並符合 72 dpi 要求；A－17 仍以動態實際高度輸出，不得為 72 dpi 改動 Canvas pixel height；所有 Preview／Export 仍使用既有正式 renderer，未建立第二套視覺輸出。

## 22. 留待 Phase 2 Investigation 的技術問題（不是 Jamie Open Question）

1. 瀏覽器端解析 xlsx 的可行方式與最小依賴。
2. A 分頁各 mapping 區塊的實際讀取與驗證方式（含 formula cell 取值、A－17 區塊列掃描）。
3. 正式 Workspace 的資料結構與 01～12 共用文字的同步機制（單一 shared data、同步副本或其他）。
4. A－17 structured data 在 Workspace 的承載結構。
5. 控制台如何載入／呼叫 17 個正式 renderer module（含 A－17 雙圖與 warnings 消化）。
6. 字型與底圖在控制台的載入時序、快取與 guard 失敗處理。
7. 中間欄大尺寸 Canvas 的顯示縮放方式（不得改變成品）。
8. Canvas → JPG／PNG 成品輸出與 ZIP 打包的技術方式。
9. 暫存資料的 serialization／驗證方式與 Atomic replace 的實作。
10. Import／Restore／Export 失敗狀態的呈現位置與既有 UI 的銜接方式。
11. 72 dpi 在 Browser Export 的寫入方式：JPG／PNG metadata 如何設定、使用何種 encoder／library、Canvas native export 不直接提供該 metadata 時的處理方式（不得改變 Locked pixel dimensions）。

## 23. Requirement Open Questions（需 Jamie 產品裁決）

以下為正式文件標記「尚未定案」且無法由 Repository／Excel／Phase 0 裁決推得的產品規格；Phase 1 不自行發明。除第 1、2 項建議於 Phase 3 Proposal 前裁決外，其餘均為文案／細節，可於 Proposal 或 Coding 前補裁決，不阻擋 Phase 2 Investigation：

1. 完整專案 ZIP 的內部使用者可見結構：資料夾層級、17 張成品實際檔名規則、暫存檔名／位置、是否需要 manifest。這是使用者直接接觸的交付結構，屬產品決策；既有文件僅鎖定「包含成品＋可 Restore 暫存資料」。（ZIP 壓縮檔名稱本身已由 Jamie 裁決為 `FSS BN_下載當下的日期`，不再屬本項未定範圍。）
2. `FSS BN_下載當下的日期` 中日期字串的具體格式（Jamie 已裁決命名語意與「實際下載當下」的日期來源，但尚未指定格式；若 implementation 前仍未裁決，需先由 Jamie 決定，不得自行發明）。
3. JPG 成品的壓縮品質基準（影響交付品質的產品可見項；若 Jamie 同意以 Phase 6 視覺驗收為準，可由 Phase 3 Proposal 提出建議值再裁決）。此項與已裁決之 72 dpi 解析度要求是兩件不同的事。
4. 匯入暫存覆蓋確認的最終文案、按鈕名稱與 Dialog 視覺（既有文件已標記尚未定案）。
5. Import／Restore／Export 失敗提示的最終文案（本文件只鎖定「必須可理解、不得默默失敗」原則）。
6. 字數超限警告的最終文案（沿用第一輪既有標記，尚未定案；現行 runtime 文案可否直接轉正由 Jamie 決定）。

## 24. 修改邊界

- 本文件為 Phase 1 產物；本階段只允許本 Requirement 文件的建立與修訂，不得修改任何 Code、HTML、CSS、JS、JSON、Excel、Template、asset、font、Launch、Viewer、Workspace、Editor、SOP 或其他正式文件。
- 後續階段只可在 Phase 2 完成調查、Phase 3 Proposal 經 Jamie 確認後，修改完成本 Requirement 所必要的最小檔案。
- 若 Phase 2／3 發現本 Requirement 與既有 Locked 架構或已 PASS 行為衝突，必須停止並交由 Jamie 決定。

> （落地註記）第 23 節第 1～3 項已由 Jamie 後續裁決並落地：ZIP 根層＝17 張成品＋1 份 `FSS BN_MMDD.json`、無資料夾、無 manifest、成品檔名＝正式版位名稱；MMDD 取實際下載當下月日；JPG quality＝1.0（01／02 另有容量控制，見第 26 節）。第 4～6 項文案已以現行 runtime 文案落地並經 Jamie Manual Verification 接受。

## 25. A－17 Manual Editor Requirement（後續輪次追加，Jamie 已裁決）

本節為 A 樣式平台整合完成後追加之 A－17 專用手動 Editor 正式 Requirement；Phase 0 Investigation 已完成並經 Jamie／GPT 批准。本節不改變本文件其他章節之任何既有鎖定。

### 25.1 右側 Editor（A－17 選中時）

- 右欄維持既有寬度與三欄平台架構，依序提供：主標題、VIP 標題、VIP 文案、CTA 四個文字欄位，與「編輯門檻表」按鈕。
- 四欄沿用既有通用 Editor 機制（IME-safe commit、超限 rollback、ASCII 0.5／非 ASCII 1 字數算法、既有 banwords），不得建立 A－17 第二套 Editor engine。
- 字數上限固定：主標題 15、VIP 標題 20、VIP 文案 20、CTA 3。
- 四欄分別對映既有 `threshold.mainTitle`／`threshold.vip.title`／`threshold.vip.copy`／`threshold.vip.cta`。
- A－17 Manual Editor（含 Modal）僅於 Workspace 已存在 threshold 資料（已完成 Import／Restore）時可用；尚未匯入時維持既有提示狀態。

### 25.2 門檻表 Modal

- 點「編輯門檻表」開啟單一 Modal／overlay；不開新頁、不新增 route；關閉按鈕只負責隱藏 Modal，不做 rollback。
- Modal 頂部必須顯示目前數量：「適用物流 N / 5」「門檻項目 M / 9」，並提供「＋新增物流」（上限 5）與「＋新增門檻」（上限 9）；達上限時對應按鈕 disabled。
- 表格只顯示目前正在編輯的 N 個物流欄 × M 個門檻列，不得一次攤開固定 5×9 全部空欄空列。
- 物流欄包含：line1 輸入、line2 輸入、刪除；門檻列包含：name 輸入、刪除、目前 N 個 cells。
- 每個 cell 僅包含「金額輸入＋狀態下拉」；狀態下拉固定為「綠／紅／↑」。

### 25.3 綠／紅／↑ mapping（沿用既有 model，不改 renderer）

- 選「綠」：`cell.color="綠"`、`cell.amount=金額輸入值`；選「紅」：`cell.color="紅"`、`cell.amount=金額輸入值`。
- 選「↑」：`cell.amount="↑"`、`cell.color=""`；此時金額輸入清空並停用。
- 反向載入：`cell.amount==="↑"` 顯示 ↑；否則依 `cell.color` 顯示綠／紅。
- `↑` 的 merge 語意（含刪除門檻後產生的無效 ↑ 行為）完全依既有正式 renderer 規則，Editor 不得另做修補或第二套 merge 格式。

### 25.4 新增／刪除／compact（schema 固定 5×9 不變）

- 既有 `state.threshold = {mainTitle, logistics[5], thresholds[9], vip}` schema 不得修改；新增／刪除只做 slot 資料之 shift／clear。
- 新增物流：啟用下一個空 slot；新增門檻：啟用下一組空 pair。
- 使用者按「＋新增」後，新空欄／空列在輸入內容前不得因重繪而消失（Modal 編輯階段之顯示數量以 UI 層維持，不得為此修改 threshold schema 或建立第二份資料 model）；關閉 Modal 後重新開啟時，顯示數量以既有 threshold 資料之有效數量重新推導（未輸入任何內容之空欄空列不保留）。
- 刪除物流 i：同一次 state 更新內，`logistics` 自 i 起左移補位且尾端清空，**且全部 `thresholds[*].cells` 同欄索引一起左移、尾端清空**，保持欄位對齊。
- 刪除門檻 p：整組（name＋cells）自 p 起上移補位、尾端清空為空 pair。
- 刪除不加 confirm，直接刪除並 compact。

### 25.5 資料流與邊界

- 所有合法修改即時寫回既有 `state.threshold`，經既有 Workspace notify → Preview render 資料流即時更新（含 A－17 動態高度）；不得建立 Apply／Save／Cancel／draft／第二份 threshold model。
- Modal 內物流名稱、門檻名稱、金額欄位：不新增字數上限、不接 banwords、不自行發明 validation；renderer warnings 維持既有 console 層級，不新增 Modal inline warning system。
- 不得修改：threshold schema、`import.js` mapping、A－17 renderer、`render-a.js`、`export.js`、Preview Fit、01～16 renderer、Excel、vendor、assets、fonts、Launch／Viewer、`啟動 FSS.command`；不處理 B／C／D。

### 25.6 Acceptance Criteria（原輪次定義）

1. 選取 17 且已匯入時，右欄顯示四欄＋「編輯門檻表」；四欄可編輯且字數 15/20/20/3、IME／rollback／banwords 行為與 01～16 一致；修改即時反映 Preview。
2. Modal 開啟顯示正確 N/5、M/9 與 N×M 實際內容；無 5×9 空表攤開。
3. ＋新增物流／門檻可用且達 5／9 上限時 disabled；新增之空欄空列在輸入前不消失。
4. 刪除中間物流後，其後物流與全部門檻對應 cells 同步左移、尾端清空；刪除中間門檻後整組上移、尾端清空；Preview 即時正確。
5. cell 狀態下拉綠／紅／↑ 依 25.3 mapping 寫入與載入；選 ↑ 時金額清空停用。
6. 全程 threshold schema 維持 5×9；renderer／import／render-a／export／Preview Fit 零修改；Export 成品行為與先前驗證完全一致。
7. Modal 關閉只隱藏；重開依資料重新推導 N/M。

## 26. 實際落地狀態（Code Commit `91aa7f644b42be29651754af280fd094a2f2cfb0`）

本節記錄本 Requirement（含 §25 A－17 Manual Editor）已全部實作完成、通過分段 AI 自驗與 Jamie Manual Verification，並以單一 Code Commit `91aa7f6`（`feat(bn): integrate style A platform with A-17 manual editor`）正式提交的最終行為。以下均為已驗證事實，取代前述章節中「尚未實作／留待後續」之過渡描述；產品規則本身不變。

### 26.1 平台整合落地

- A 樣式 01～17 已全部接入正式平台：Excel Import → Workspace → 正式 renderer → Preview → Restore → Export 全鏈可用。
- Code Commit 精確包含 13 檔：`bn/index.html`、`bn/css/styles.css`、`bn/js/app.js`、`bn/js/editor.js`、`bn/js/workspace.js`、`bn/js/import.js`、`bn/js/export.js`、`bn/js/render-a.js`、`bn/js/vendor/`（SheetJS CE 0.20.3＋JSZip 3.10.1＋兩份 LICENSE）、`啟動 FSS.command`。
- 正式 Workspace state shape＝`{currentType, selectedBnId, shared, bnText, threshold}`：01～12 共用單一 `shared`（主標／副標／保護文字，永遠同步、不可分歧）；13～16 各自獨立於 `bnText`；17 使用結構化 `threshold`（固定 `logistics[5]`／`thresholds[9]`／`vip`，永遠 5×9，不因編輯或 compact 變動長度）。

### 26.2 Import／Restore

- Excel Import 僅精確讀取 workbook 的 `Sheets.A`（不 fallback）；以 A15／A16／A17 固定標籤驗證正式工單；01～12 只讀 B15／B16／B17；13～16 讀 L20/L21、L22/L23、L24/L25、L26/L27/O26/O27；A－17 依工單區塊組成 5×9 model。detached candidate 完整建立並驗證後才 Atomic replace；任何失敗不觸碰現有 Workspace；Import 不做 banwords。
- Restore 暫存 JSON schema＝`{format:"FSS BN Workspace", version:1, type:"A", selectedBnId, shared, bnText, threshold}`；覆蓋前確認、Atomic、壞檔拒絕且現況不變。
  - （現況註記）後續 Code Commit `dad56a465f20e064452c6866c82fcf02be2e6751` 於此 payload 追加 A－12 專用 optional 欄位 `lpbnBadgeMonth`；**JSON version 維持 `1`、未升版**，既有不含該欄位的 v1 暫存檔仍可正常 Restore 並回到 base-only 行為。實作與資料流以 `bn/docs/FSS_BN_Architecture.md` 第 37.3～37.4 節為準。

### 26.3 Preview

- Preview 由 `render-a.js` 之 A-only renderer 對應表驅動（17 個正式 renderer 靜態載入、asset／font readiness 後 render；renderer API 零修改）。
- Preview Fit 已完成並 Manual PASS：以 viewport 實測尺寸計算顯示 scale（`min(availW/w, availH/h, 1)`、只寫 inline style、不動 backing dimensions、ResizeObserver＋resize 重算）；06（900×1600）、08（1080×1920）、17（1200×動態）完整 fit，15（100×100）不放大。

### 26.4 Export

- 同一 Workspace 序列輸出 01→17；ZIP 根層＝17 張成品＋1 份 `FSS BN_MMDD.json`（共 18 項，無資料夾、無 manifest）；ZIP 名稱 `FSS BN_MMDD.zip`，MMDD 取實際下載當下、同次共用。
  - （現況註記）此「17 張成品／共 18 項」為本節 Code Commit 當時之落地狀態。後續 Code Commit `dad56a465f20e064452c6866c82fcf02be2e6751`（`feat(bn): add LPBN badge variants`）為 A－12 新增 optional 掛標 variants：工單 `Sheets.A` 之 `E15` 指定掛標月份且素材齊全時，A－12 於既有 `12_LPBN.jpg` 之外追加 `12_LPBN_1.jpg`／`_2.jpg`／`_3.jpg`，ZIP 圖檔數由 17 張增為 20 張（另加同一份 `FSS BN_MMDD.json`）；`E15` 空白時仍為 17 張圖＋JSON。ZIP 根層扁平、無資料夾、無 manifest、ZIP 名稱規則、本節既有格式表、72 dpi 與 JPG quality 1.0 行為均不變，17 版位模型亦未改變。詳見 `bn/docs/FSS_BN_A12_LPBN掛標_Requirement_Specification_v1.0.md` 與 `bn/docs/FSS_BN_Architecture.md` 第 37 節。
- 正式格式固定：01 JPG、02 JPG、03 JPG、04 PNG、05 PNG、06 JPG、07 JPG、08 JPG、09 JPG、10 PNG、11 PNG、12 JPG、13 PNG、14 PNG、15 JPG、16 JPG、17 PNG；`12_LPBN.jpg`＝1200×550。
- PNG／JPG 一律寫入 72 dpi metadata（PNG pHYs 2835 ppm、JPEG JFIF 72×72，byte-level patch、不重編碼、不 Resize）；JPG quality＝1.0。
- 容量控制（正式行為）：`01_DDcard BN.jpg` 最終檔 ≤245,000 bytes、`02_MALL HBN.jpg` ≤145,000 bytes——於 0.5～1.0 內自動搜尋符合上限的最高 quality（patch 後 bytes 判定；q=0.5 仍超標則整次 Export fail）。其餘 JPG 維持 quality 1.0。
- `10_POP UP.png` 容量需求：舊記錄之 ≤145KB 已由 Jamie 正式裁決**取代**為最終檔 ≤250,000 bytes，並已於後續 Code Commit `0dadb5470470a91fe1aad240516697a001f9b4f0`（`feat(bn): enforce PNG size limit for A10`）**實作完成**；正式 Requirement 與實作／驗證記錄見第 27 節（含 27.9）。

### 26.5 A－17 Manual Editor 最終正式行為

- 僅於選中 17 且 threshold 存在時顯示；右欄順序＝**主標題 → 編輯門檻表 → VIP 標題 → VIP 文案 → CTA**；四欄上限 15／20／20／3，沿用既有 Editor 字數（ASCII 0.5／非 ASCII 1）、banwords、IME-safe、超限 rollback。
- Modal 直接編輯正式 threshold（immutable 寫回 `workspace.updateThreshold`），無 Apply／draft／第二份 model；物流最多 5、門檻最多 9，達上限「＋新增」disabled。
- 新增之空 slot 為 session-only：未輸入內容者 close／reopen 消失；輸入後即寫入 Workspace 並保留。
- 物流 line1／line2、門檻 name、cell 金額／狀態可直接編輯；狀態下拉綠／紅／↑：綠→`color="綠"`、紅→`color="紅"`；選 ↑→`amount="↑"`、`color=""`、金額清空並鎖定；↑→綠／紅後金額重新可輸入。
- 刪除物流（一鍵即刪）：`logistics` 左移補位＋尾端清空，並**同步** compact 全部 9 組 `thresholds[*].cells` 同欄；刪除門檻：整組（name＋cells）上移＋尾端清為空 pair；`↑` 語意完全交由既有 renderer，Editor 不修補。
- Round 6.1／6.2 修正：刪除 used 項時 session display 只減 1，同 session 其他空欄／空列保留（display index 依 compact 左移／上移映射）。
- 每次合法修改即時經既有 notify → Preview 重繪（含動態高度）；切離 17 按鈕隱藏、回 17 重新顯示；17 未匯入時維持既有提示、不建立假 threshold。

### 26.6 啟動流程（詳見 `bn/docs/FSS_BN_Architecture.md` 第 36 節）

`啟動 FSS.command`：固定 127.0.0.1:4173、readiness 確認後以 Google Chrome 開啟；啟動前偵測 4173 既有 listener 即拒絕啟動且不 kill 外部 process；本機 server 對 `.js`／`.css` 回應 `Cache-Control: no-store`，避免開發驗證重用舊 module。

### 26.7 Scope Boundary（維持）

僅樣式 A 完成平台整合；B／C／D 尚未接入；A／B／C／D 是否共用 renderer／helper／schema／registry 尚未裁決；`10_POP UP` 容量 Requirement（≤250,000 bytes，第 27 節）已裁決並已實作完成（Code Commit `0dadb5470470a91fe1aad240516697a001f9b4f0`，見 27.9）。本節不構成任何跨 Type 架構決策。

> （後續同步）上段「僅樣式 A 完成平台整合；B／C／D 尚未接入」為本輪 A 平台整合完成時的真實狀態記錄。其後樣式 B 已完成正式平台整合並經 Phase 5 AI Verification 與 Phase 6 Jamie 手動驗證 PASS，Code Commit `4f9fb723930a907b8c3956fd084e757b41302137`（`feat(bn): add style B platform integration`）：**目前正式支援的樣式為 A 與 B**，Type A 使用 worksheet `A` 與 `bn/assets/A/底圖/`、Type B 使用 worksheet `B` 與 `bn/assets/B/底圖/`，兩者共用同一組固定 17 個正式 renderer、同一套 cell mapping 與 validation schema、同一個 Workspace 結構與同一套 Export 行為；C／D 仍未進入正式支援範圍。第 26.3 節「`render-a.js` 之 A-only renderer 對應表」就目前狀態而言，該對應表現同時服務 A 與 B（檔名未 rename、17 筆 entry 未修改）。本文件其餘 A 自身 Requirement 與歷史裁決一律維持原文，未因 B 落地而改寫；B 的正式行為見 `bn/docs/FSS_BN_B樣式平台整合_Requirement_Specification_v1.0.md` 與 `FSS_BN_Architecture.md` 第 38 節。

## 27. `10_POP UP.png` 容量 Requirement（≤250,000 bytes；已實作、已驗證）

> 本節為正式 Requirement，經 Investigation、Repository 外獨立 PoC 與 Jamie Manual Visual Verification 後由 Jamie 正式裁決成立，**取代**舊文件記錄之「`10_POP UP.png` ≤145KB」需求（舊 145KB 僅為歷史記錄，現已不適用）。本節狀態＝Requirement 已裁決且**已實作完成**：Proposal、Coding、AI Verification（25/25 PASS）與 Jamie Manual Verification 均已完成，正式行為以 Code Commit `0dadb5470470a91fe1aad240516697a001f9b4f0`（`feat(bn): enforce PNG size limit for A10`）落地；實作與驗證記錄見 27.9。

### 27.1 需求定義

- 版位：`10_POP UP`；格式：PNG；尺寸：580 × 720；檔名：`10_POP UP.png`（不變）。
- 最終下載檔案（ZIP 內該張成品）必須 ≤**250,000 bytes**。此為精確 byte 上限：不是「250 KB」模糊語意、不是 250 KiB（256,000 bytes）。Requirement 與後續 Code 一律使用 `250000`。
- 容量 Gate 判定基準：**72 dpi pHYs patch 後的最終 Blob bytes**（與 01／02 JPG capacity Gate「patch 後 bytes 判定」同一原則）。encode 前或 patch 前的 bytes 不得作為判定依據。

### 27.2 正式 Compression Policy（native → 256-color → fail）

1. 以現有 browser native Canvas PNG encoder（`canvas.toBlob("image/png")`）產生 PNG。
2. 套用現有 byte-level 72 dpi pHYs patch（不 re-encode、不動 IDAT、不改 pixel dimensions）。
3. 檢查 patch 後最終 bytes：≤250,000 → **直接採用 native lossless PNG**，不執行任何 quantization，加入 ZIP。
4. patch 後 >250,000 → 進入唯一 fallback：以**原始 Canvas raw RGBA pixels** 做 UPNG 256-color indexed PNG encode。禁止以已 patch 過的 PNG 作為 quantization 的正式中間來源。
5. fallback encode 完成後**重新**套用 72 dpi pHYs patch（任何 re-encode 之後都必須重新 patch，因 re-encode 可能移除 metadata）。
6. 重新檢查 patch 後最終 bytes：≤250,000 → PASS，加入 ZIP；仍 >250,000 → **整次完整專案 Export failure**。

正式 ladder 僅此三態：native lossless → UPNG 256 colors → Export failure。**不包含**：UPNG lossless 中繼步（PoC 實測僅 −16.5%、317,944 bytes 仍 FAIL，Jamie 裁決捨棄）、192／128／96／64／48／32／16／8 colors、dithering。後續 Phase 不得自行增加 fallback 階層。

### 27.3 Invariants（兩條路徑一律適用）

- **Pixel dimensions**：最終成品必須維持 580 × 720。禁止 resize、downscale、改 Canvas backing dimensions、裁切。壓縮只能改變 PNG serialization／color representation／compressed bytes，不得改 layout dimensions。
- **格式**：最終永遠是合法 PNG。native path 可維持 color type 6（RGBA）；quantized fallback 允許 color type 3（indexed）＋tRNS。不要求「一定 color type 6」；正式要求＝合法 PNG、580×720、alpha 正常、72 dpi、≤250,000 bytes。
- **Alpha**：本版位素材含 103,210 個全透明 pixels 與 362 個半透明 anti-aliasing pixels（PoC 實測）。fallback 必須保留完全透明區與必要半透明 AA；不得 flatten alpha、不得填白底或任何背景、**JPG fallback 永久禁止**。
- **72 dpi**：所有最終成品必須帶 72 dpi pHYs metadata；正式順序見 27.2（encode → patch → Gate；不得 patch 後 re-encode 直接交付）。

### 27.4 Failure Policy

UPNG 256-color＋72 dpi patch 後仍 >250,000 bytes 時，正式行為＝**整次完整專案 Export failure**（不產出 ZIP）。與 01／02 JPG capacity Gate「無法在正式允許品質內達標 → 整次 Export fail」原則一致。不得：自動改 JPG、resize／downscale、改 Canvas dimensions、改 renderer、降至 128／64／更低色數、加 dithering 再嘗試、靜默輸出超標 PNG、ZIP 少放 `10_POP UP`、legacy RGB 均勻量化、任何未經 Requirement 裁決之 fallback。

### 27.5 適用範圍與 Regression Boundary

- 本容量 policy **只適用 `10_POP UP`**。其他 PNG 版位（04／05／11／13／14／17）無本次 byte-limit 需求，必須維持現行 native lossless PNG 輸出；不得因本功能全面套用 quantization。未來其他 PNG 若另有 byte-limit，另行 Requirement 裁決。
- renderer／Preview／Template／Canvas dimensions／layout／文字／圖片 positioning 一律零修改。PNG compression 是 Export serialization concern，不是 rendering concern；Preview 必須繼續顯示 renderer 原始高品質 Canvas，不因 Export quantization 改變。
- 01／02 JPG capacity 功能（≤245,000／≤145,000 bytes、quality search、Gate）完全 LOCKED：不得修改、不得抽象重構、不得因 PNG 功能共用而改寫。
- 其他 Export contract 不變：`FSS BN_MMDD.zip`／`FSS BN_MMDD.json`、ZIP 根層 17 圖＋1 JSON、Workspace JSON schema（`{format:"FSS BN Workspace", version:1, type:"A", selectedBnId, shared, bnText, threshold}`）、01→17 sequential export、正式 format table（01–03 JPG、04–05 PNG、06–09 JPG、10–11 PNG、12 JPG＝1200×550、13–14 PNG、15–16 JPG、17 PNG）、JPEG quality 既有行為、PNG／JPG 72 dpi contract。
- Sequential／memory：維持 01→17 sequential，不同時 quantize 多張；只有 10 native 超標時才建立 RGBA ImageData（1,670,400 bytes）／UPNG 暫存 buffer／quantized Blob。本 Requirement 不要求 Web Worker、WASM、parallel export；Proposal 若發現真正必要須另行提出，不得自行擴 scope。
- Future consideration（不在本次 scope）：未來若立案「單張圖片下載」，應重用本節同一 serialization／capacity policy，避免 ZIP 與單張行為分歧。本次不新增單張下載、不預先重構 Export architecture、不決定 helper／API 名稱。

### 27.6 Dependency Requirement

- fallback 需要可於 browser 內完成 256-color indexed PNG encode 的 library；已完成 PoC 驗證的候選為 **UPNG.js＋pako**。
- 正式 implementation 必須：完全 client-side、完全 offline、不依賴 CDN runtime（不得自 cdnjs 等載入）、不依賴 server、Safari／Chrome 可用、License 可 vendor 進 Repository；UPNG／pako 應 local vendor（比照 `bn/js/vendor/` 既有慣例）。
- 正式 vendor 來源、檔案版本 pinning 與載入方式已由 Proposal Phase 裁決並於 Code Commit 落地（版本、sha256 pin、載入順序見 27.9）。
- 技術描述界線：UPNG 支援 PNG encode／quantization，PoC 已驗證 256-color indexed PNG 可滿足本版位需求；UPNG **不內建** Floyd-Steinberg dithering（若未來另有需求，屬額外實作或其他 quantizer capability，另行裁決）；UPNG 不保證任何未來圖片必然 ≤250,000 bytes——真正的保證機制是 27.2 的 byte Gate 與 27.4 的 failure policy。

### 27.7 PoC Evidence 與裁決記錄

PoC 於 Repository 外以正式 FSS Export 成品 `10_POP UP.png`（380,713 bytes、580×720、color type 6、含 72 dpi pHYs）為 baseline；所有 candidate 以 72 dpi patch 後 bytes 判定：

| Candidate | 方式 | patch 後 bytes | 結果 | 裁決 |
|---|---|---|---|---|
| A | Native（browser PNG） | 380,713 | FAIL | baseline，超標 |
| B | UPNG lossless（cnum=0） | 317,944 | FAIL | 不保留為正式中繼步（僅 −16.5% 仍超標，徒增一次 encode） |
| C | UPNG 256-color indexed＋tRNS | **95,376** | **PASS**（−75%，餘裕約 154,624 bytes） | **正式採用**；580×720、alpha 正常、encode 約 116ms |
| D | UPNG 128-color | 77,213 | PASS | 不採用：256 已達標，無理由多犧牲色彩品質 |

品質證據（256-color vs native）：PSNR 41.87 dB、平均每 pixel error 1.18/255、error ≥100 僅 18 pixels（集中於 CTA 按鈕下緣 AA transition）；品牌色 teal `[0,118,97]` 與 yellow `[255,242,133]` 精確保留，紅 Δ2、白字 Δ3；alpha error ≥32 僅 27 pixels（圓角／按鈕 AA 單像素邊緣）。Jamie 已完成 Native vs 256-color 肉眼比較（小字副標、黃色大字、吉祥物、背景、商品箱陰影、品牌色、透明區、CTA），**Manual Visual Verification：PASS**。Dithering：未執行、不需要（無不可接受 banding）、不在本次 scope。

### 27.8 Out of Scope

本功能明確排除（Requirement Phase 定義，Coding 完成後仍維持）：dithering、128／64 等 palette ladder、其他 PNG capacity control、B／C／D、renderer、Preview、Template、Workspace schema、Import、Editor、A－17 Manual Editor、單張下載、Web Worker、WASM、server-side compression、CDN runtime、01／02 JPG 重構、ZIP 結構變更、JSON schema 變更。（Requirement Phase 當時另排除之 Coding 與正式 vendor 安裝，已於後續 Phase 依裁決完成，見 27.9。）

### 27.9 Implementation／Verification／Completion 記錄

**Code Commit**：`0dadb5470470a91fe1aad240516697a001f9b4f0`（`feat(bn): enforce PNG size limit for A10`），於 Jamie Manual Verification PASS 後建立，精確包含 6 檔：`bn/index.html`、`bn/js/export.js`、`bn/js/vendor/pako.min.js`、`bn/js/vendor/upng.js`、`bn/js/vendor/LICENSE.pako.txt`、`bn/js/vendor/LICENSE.upng.txt`。

**Implementation（正式已落地行為）**：
- `export.js`：`EXPORT_ITEMS` item 10 加入 `maxBytes: 250000`（唯一有 PNG maxBytes 的版位）；新增 PNG capacity helper（`encodePngWithinLimit`），實作 27.2 之 native lossless → UPNG 256-color indexed → 整次 Export fail ladder，容量一律以 72 dpi patch 後最終 Blob bytes 判定，fallback 自原始 Canvas raw RGBA encode 並於 encode 後重新 patch 72 dpi；無 `maxBytes` 之 PNG（04／05／11／13／14／17）走原文 native path，不經 UPNG；JPEG helper 與 JPEG branch 零修改。fallback 超標之 failure 文案等義於「`10_POP UP` 以 256 色 PNG 壓縮後仍為 {實際 bytes} bytes，超過容量上限 250000 bytes，無法輸出完整專案。」，經既有 export catch 顯示，整次 Export abort、不產出 partial ZIP。
- `index.html`：script 載入順序＝`xlsx.full.min.js` → `jszip.min.js` → `pako.min.js` → `upng.js` → `app.js`（module），全部 defer、全部 local；**pako 必須先於 UPNG**（UPNG 於載入當下綁定 global `pako`，順序顛倒會於 encode 時失敗）。
- **正式 vendor（完全 local、完全 offline、無 CDN runtime）**：`bn/js/vendor/upng.js`＝npm `upng-js@2.1.0` artifact 內 `UPNG.js` 原檔（byte-identical，31,508 bytes，sha256 `b7c0bdb021dffeb82f1ac27c6762f939f967a9e4e0886518fef649331b612164`，MIT，LICENSE 原文＝`LICENSE.upng.txt`）；`bn/js/vendor/pako.min.js`＝npm `pako@2.1.0` artifact 內 `dist/pako.min.js`（46,859 bytes，sha256 `ede2693a4a6a5126b9d35669062b358ecab6ae7b9b86a1cf302feb45a8514907`，MIT AND Zlib，LICENSE 原文＝`LICENSE.pako.txt`）。

**Verification**：
- AI Verification **25/25 PASS**（以正式 380,713-byte baseline＋repo 實際 export.js 原文＋repo 內正式 vendor 檔執行）：native ≤上限 path 提前 return、不呼叫 getImageData／UPNG；native >上限 → 256 fallback 最終 **95,376 bytes**（≤250,000）、IHDR 580×720、PNG color type 3（indexed）、pHYs 2835×2835 pixels/meter・unit=1・唯一、PLTE／tRNS 正常、全透明 pixels 103,210 與 baseline 完全一致、UPNG 回讀＋Pillow 獨立 decode PASS；failure path：256 仍超標時 throw、`exportWorkspace` abort、`zip.generateAsync` 不執行、無 partial ZIP；Workspace JSON schema、format table、01→17 sequential order 驗證不變。Safari／Chrome 實機部分由 Manual Verification 覆蓋。
- **Jamie Manual Verification：PASS**（正式完整專案 Export 可用、`10_POP UP` 容量與畫面驗收通過），Code Commit 於 PASS 後才建立。

**Vendor Note（已知 `git diff --check` exception）**：Code Commit 後 `git diff --check HEAD^ HEAD` 對非 vendor-upng 之 5 檔全部 PASS；`bn/js/vendor/upng.js` 為上游 byte-identical 原檔，自帶 155 行 trailing-whitespace warnings。Jamie 正式裁決：保留原始 bytes、不為消除 whitespace warning 修改 vendor source（修改即破壞 sha256 pin）。未來看到 `git diff --check` 對此檔的 whitespace warning 時，以上列 sha256 pin 驗證即可確認屬已知 vendor exception，並非 FSS source regression。
