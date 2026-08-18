# FSS BN Generator－正式 BN 版位建立 SOP

用途：作為 FSS BN Generator 01～17 正式版位製作時的固定流程、新
GPT／Codex／Claude 對話交接基準。

狀態：本 SOP 以「樣式 A－01_DDcard BN」已實際完成並驗證 PASS
的流程整理。 原則：A－01 的「流程」可沿用；A－01
特有的視覺實作不可自動套用到其他版位。

------------------------------------------------------------------------

## 1. 核心開發原則

正式 BN 必須以：

「一個樣式 × 一個版位」

為最小開發單位。

例如：

-   A－01_DDcard BN
-   A－02_MALL HBN
-   A－03_Coin page BN

不要一次 Coding 01～17。 不要一次 Coding A／B／C／D。
不要因名稱相同就預設不同樣式可以共用 renderer。

每一個版位先獨立確認；真的確認存在共用規則後，才考慮是否需要共用。

優先目標是：

-   好理解
-   好維護
-   好校稿
-   好修改
-   不提前抽象化

禁止因「未來可能需要」提前建立：

-   Registry
-   Framework
-   Build System
-   shared/common/base 抽象層
-   四套 Generator
-   四套控制台
-   未確認的跨 Type 共用 renderer

------------------------------------------------------------------------

## 2. Locked 專案邊界

既有 BN 控制台已完成並 PASS，不因製作正式 Template 而重新設計。

目前既有流程：

FSS 首頁 → BN → 樣式 A／B／C／D → 共用 BN 控制台

控制台目前正式 Template 尚未全面接入。

製作單一正式版位時，不得順便修改：

-   BN 樣式選擇頁
-   共用控制台
-   Editor
-   Workspace
-   banwords
-   Excel Import
-   Restore
-   Export
-   ZIP
-   其他尚未進入本輪 Scope 的功能

除非該階段 Requirement 明確批准。

------------------------------------------------------------------------

## 3. 正式文件優先順序

開始任何版位前，必須先讀專案正式文件。

至少包含：

-   `docs/開發流程.md`
-   `docs/架構說明.md`
-   `bn/docs/FSS_BN_Architecture.md`
-   `bn/docs/FSS_BN_Requirement_Specification_v1.0.md`
-   `bn/docs/FSS_BN_17版位_Type差異_Phase0整理.md`
-   `bn/docs/FSS_BN_Template_Requirement_Specification_v1.0.md`

其中：

`bn/docs/FSS_BN_17版位_Type差異_Phase0整理.md`

是 01～17 版位差異的核心 Phase 0 文件。

不得依 AI 記憶自行補完。

------------------------------------------------------------------------

## 4. 每個版位開始前 Jamie 要提供的資料

進入一個新版位時，只提供該版位真正需要的資料。

基本資料：

### 4.1 版位識別

例如：

`A－02_MALL HBN`

必須沿用 Locked 正式名稱，不自行改名。

### 4.2 Canvas／版位尺寸

例如：

`531 × 792px`

Canvas 尺寸與 Photoshop 文字單位是不同概念，不要混在一起。

### 4.3 正式底圖

例如：

`bn/assets/A/底圖/02_MALL HBN.jpg`

實際副檔名依正式資產為準，不自行轉檔。

### 4.4 正式對位圖

例如：

`bn/assets/A/對位/02_MALL HBN.png`

對位圖應保持：

-   原始尺寸
-   原始位置
-   原始 Alpha

Launch 不得自行再加 opacity、Resize 或位移。

### 4.5 每個文字欄位的 Photoshop 規格

每一組文字至少提供：

-   欄位名稱
-   字型
-   字重
-   字級
-   顏色
-   left
-   top
-   width
-   height
-   水平對齊方式
-   垂直對齊方式
-   字數限制（若已有）
-   特殊符號規則（若有）

Photoshop 複製出的 CSS 可以直接作為座標與文字框尺寸來源。

### 4.6 完成參考圖

建議提供一張 Photoshop 正式完成畫面供人工比對。

它用於：

-   字體粗細
-   銳利度
-   字距
-   baseline
-   整體視覺
-   特殊符號

對位 PNG 與完成參考圖用途不同：

對位 PNG： → 驗證位置／框位。

Photoshop 完成圖： → 驗證實際視覺。

------------------------------------------------------------------------

## 5. 固定 Phase 流程

每一個正式版位都遵守：

Phase 0 → Phase 1 Requirement → Phase 2 Investigation → Phase 3 Proposal
→ Phase 4 Coding → Phase 5 AI 自我驗證 → Jamie 手動驗證 PASS → Code
Commit → Docs Update → Docs Commit

不得跳 Phase。

如果某項共通知識已經由前一個版位正式調查並驗證，可以引用既有結論；不要機械式重新調查整個
Generator。

但新版位真正不同的部分仍必須確認。

------------------------------------------------------------------------

## 6. Phase 0－確認既有版位差異

開始前先查看：

`bn/docs/FSS_BN_17版位_Type差異_Phase0整理.md`

確認：

-   此版位屬於哪一類
-   A／B／C／D 已知差異
-   哪些已定案
-   哪些尚未定案

只處理目前版位。

不要順便把下一個版位的問題一起拉進來。

------------------------------------------------------------------------

## 7. Phase 1－Requirement

正式 Template Requirement 統一維護於：

`bn/docs/FSS_BN_Template_Requirement_Specification_v1.0.md`

不要每個 BN 建一份 Requirement MD。

每完成一個新版位的 Requirement，就追加／維護於同一份 Template
Requirement。

Requirement 要鎖定：

-   樣式
-   版位
-   Canvas 尺寸
-   正式底圖
-   正式對位圖
-   文字欄位
-   字型
-   字級
-   顏色
-   文字框
-   對齊方式
-   特殊符號
-   字數限制
-   Launch 校稿需求
-   本輪明確不做的內容

Requirement 不自行增加 Photoshop 沒有提供的視覺規則。

------------------------------------------------------------------------

## 8. Photoshop pt 的處理原則

BN 必須把 Photoshop 提供的正式字級當成正式規格。

如果 Requirement 為：

`30pt`

Canvas font specification 就使用：

`30pt`

不要自行改寫成：

`30px`

也不要自行加入：

-   `1pt = 1.333px`
-   `96 / 72`
-   `4 / 3`
-   `PT_TO_PX`

除非未來某一版位的正式 Requirement 明確要求。

Canvas 尺寸仍可以是 px，例如：

`531 × 792px`

這不代表文字也必須以 px 描述。

------------------------------------------------------------------------

## 9. Phase 2－Investigation

只調查會阻擋目前版位製作的事項。

可能包括：

-   正式資產是否存在
-   實際圖片格式
-   圖片尺寸
-   WOFF2 是否存在
-   Photoshop CSS 座標
-   特殊符號 baseline
-   文字置中
-   瀏覽器實際 rasterization
-   Launch 是否需要新增最小支援

不要重新調查已完成的控制台。

不要調查未進 Scope 的 13～17 或其他 Type。

若資訊真的不足，只問 Jamie 最小必要問題。

------------------------------------------------------------------------

## 10. Phase 3－Proposal

Proposal 只提出目前版位的最小修改方案。

必須列：

-   新增檔案
-   修改檔案
-   不修改檔案
-   renderer 責任
-   Launch 責任
-   AI 驗證方式
-   Jamie 驗證方式
-   風險
-   是否仍有待決事項

Jamie 批准 Proposal 前不得 Coding。

------------------------------------------------------------------------

## 11. Template 目錄原則

Template 依樣式分開。

例如：

`bn/templates/A/` `bn/templates/B/` `bn/templates/C/` `bn/templates/D/`

A－01 已完成：

`bn/templates/A/01-ddcard-bn.js`

不要因為 B－01 也叫 `01_DDcard BN`，就預設 B 一定要共用 A renderer。

先看 B 的正式規格。

如果未來確認真的完全相同，再另外決定是否值得共用。

不要一開始就為「可能共用」增加抽象層。

------------------------------------------------------------------------

## 12. Launch 校稿架構

Launch 是開發／視覺驗證工具，不是第二套 Generator。

目前已驗證結構：

`bn/launch/viewer.html`

加上：

`bn/launch/<樣式>/<版位>.command`

例如：

`bn/launch/A/01_DDcard BN.command`

Jamie 的使用方式：

Finder 雙擊 `.command` → 自動確認／啟動 localhost → 開啟 Viewer →
直接校稿該版位

每個版位只需要一個直接啟動 `.command`。

不要再為每個版位建立獨立 HTML。

------------------------------------------------------------------------

## 13. Viewer 原則

`viewer.html` 是共用的薄校稿頁。

它可以提供該版位需要的：

-   測試文字 input
-   即時 Preview
-   對位圖開關

但不得變成：

-   第二套控制台
-   Workspace
-   Excel Import
-   Restore
-   Export
-   ZIP
-   Template Style Editor

Viewer 只能讓 Jamie 校稿目前正式 Template。

------------------------------------------------------------------------

## 14. 對位圖開關

Launch 應提供：

「顯示／隱藏對位圖」

對位圖：

-   與 Canvas 使用相同尺寸
-   相同座標原點
-   1:1 疊加
-   使用 PNG 原始 Alpha
-   不額外設定 opacity
-   不使用 globalAlpha
-   不 Resize
-   不位移
-   不合成進正式 Canvas

關閉後必須完全隱藏，且不能改變正式 Canvas 內容。

------------------------------------------------------------------------

## 15. Launch 文字編輯

若版位包含動態文字，Launch 可提供最小 input 方便 Jamie 校稿不同內容。

目的只是：

「換不同文字確認 Template 是否穩定。」

不是建立第二套 Editor。

若該欄位已有正式字數規則，Launch 應依 Requirement 驗證。

已知 BN 字數算法：

-   ASCII = 0.5
-   非 ASCII = 1

若該欄位 Requirement 有上限：

-   合法值即時更新
-   超限拒絕
-   保留上一個合法值
-   IME composition 中不提早提交
-   compositionend 後才 commit

不要自行替尚未定義上限的欄位增加上限。

------------------------------------------------------------------------

## 16. Phase 4－Coding

Coding 只做 Proposal 批准內容。

固定原則：

-   能改一檔不改兩檔
-   能改一段不改整個模組
-   不重構無關程式
-   不處理下一個版位
-   不處理其他 Type
-   不修改 Locked UI
-   不提前做控制台整合
-   不自行增加功能

完成後不得直接 Commit。

先進 AI 自我驗證。

------------------------------------------------------------------------

## 17. Browser 與 Photoshop 視覺差異

Chrome／Safari Canvas 的文字 rasterization 可能與 Photoshop 不完全相同。

遇到差異時：

先 Investigation。

依序排除：

-   字型是否真的載入
-   font-family mapping
-   fallback
-   synthetic weight
-   字級
-   glyph geometry
-   位置
-   browser rasterization

不要看到「比較粗」就直接換字型、改字級或加 offset。

------------------------------------------------------------------------

## 18. A－01 的 Medium 2× 方法不是全域規則

A－01 實際遇到：

Medium 主標與保護文字在 Chrome／Safari 直接 rasterize 時，比 Photoshop
明顯偏粗／偏糊。

A－01 最終採用：

2× temporary Canvas render → high-quality 縮回正式尺寸

而且只套用：

-   A－01 主標 Medium
-   A－01 保護文字 Medium

沒有套用：

-   A－01 Bold 副標
-   `$`
-   `%`
-   底圖

這個方法已經 A－01 Chrome／Safari／Jamie PASS。

但是：

**這不是所有 BN 的正式共通規則。**

製作 A－02、A－03......時：

先用該版位正式規格正常 render。

只有真的出現同樣的 rasterization 問題，經 Investigation
確認後，才決定是否採取相同方式。

禁止因 A－01 使用 2× 就全部 BN 自動使用 2×。

------------------------------------------------------------------------

## 19. Phase 5－AI 自我驗證

每個版位至少確認：

-   正式 Canvas 尺寸
-   正式底圖
-   正式字型
-   字級
-   顏色
-   文字框
-   水平／垂直位置
-   特殊符號
-   opacity
-   Launch 正常
-   Input 正常（若有）
-   IME-safe（若有）
-   字數限制（若有）
-   對位圖開關
-   Console 無 error
-   沒有影響其他已完成版位
-   沒有修改控制台
-   `git diff --check` PASS

AI PASS 後停止。

等待 Jamie 手動驗證。

------------------------------------------------------------------------

## 20. Jamie 手動驗證

Jamie 應直接雙擊：

`bn/launch/<樣式>/<版位>.command`

至少檢查：

-   與 Photoshop 完成圖視覺是否接近
-   字體粗細
-   銳利度
-   字級
-   顏色
-   位置
-   對位圖
-   特殊符號
-   不同測試文字
-   Chrome
-   Safari

如果有問題：

不要 Commit。

只針對問題進行最小 Investigation／修正。

Jamie 明確說：

`PASS`

之後才可以 Code Commit。

------------------------------------------------------------------------

## 21. Code Commit

Code Commit 與 Docs Commit 必須分開。

Code Commit 只收：

-   本版位 renderer
-   本版位 `.command`
-   Viewer 的必要修改（若本版位真的需要）
-   本版位正式 runtime assets
-   其他經 Proposal 批准的程式檔

不要把 Requirement 文件混進 Code Commit。

尤其 assets 可能已一次放入很多未製作版位：

禁止：

`git add bn/`

禁止：

`git add .`

必須精確 Stage 本次版位檔案。

------------------------------------------------------------------------

## 22. 未追蹤 assets 的處理

Jamie 可能已提前把後續版位的：

-   底圖
-   對位圖

放進：

`bn/assets/<樣式>/`

這些可以保持 untracked。

例如製作 A－01 時：

只 Commit A－01 正式底圖與對位圖。

A－02～16 繼續 untracked。

Working Tree 因此不 Clean 是正常的。

不要為了 Clean：

-   全部 Commit
-   刪除
-   移動
-   加入 ignore

------------------------------------------------------------------------

## 23. Docs Update

Code Commit 完成後才進 Docs Update。

主要維護：

`bn/docs/FSS_BN_Template_Requirement_Specification_v1.0.md`

必要時最小同步：

`bn/docs/FSS_BN_Architecture.md`

不要每完成一個版位就建立新的 MD。

Template Requirement 應逐步累積已確認的正式版位。

Docs Update 要記錄：

-   實際 Template 路徑
-   Launch 路徑
-   正式資產
-   最終 renderer 行為
-   驗證狀態
-   Jamie PASS
-   Code Commit
-   特殊實作原因（若有）

只記錄實際完成內容。

不要把未製作版位寫成完成。

------------------------------------------------------------------------

## 24. Docs Commit

Docs Update 經 Jamie／GPT 審核後：

才建立 Docs Commit。

Docs Commit 只提交批准的文件。

不要把後續未製作 assets 一起 Stage。

Docs Commit 後如果只剩後續 assets untracked：

Working Tree 仍非 Clean 是正常的。

------------------------------------------------------------------------

## 25. Push／Tag／Release

Push：

由 Jamie 使用 GitHub Desktop。

一般單一版位完成：

不需要 Tag。 不需要 Release。

只有到適合正式發布的節點才討論 Tag／Release。

不要每完成一張 BN 就建立版本。

------------------------------------------------------------------------

## 26. A－01 已驗證參考實作

正式版位：

`樣式 A / 01_DDcard BN`

Code Commit：

`38dc62303277e4d0c301ef46b22740ad4675a114`

`feat(bn): add A01 DDcard template`

Docs Commit：

`db760d5f511d7917432bc5476ffff319615c62fe`

`docs(bn): document A01 DDcard template`

正式 renderer：

`bn/templates/A/01-ddcard-bn.js`

共用 Viewer：

`bn/launch/viewer.html`

直接入口：

`bn/launch/A/01_DDcard BN.command`

正式資產：

`bn/assets/A/底圖/01_DDcard BN.jpg`

`bn/assets/A/對位/01_DDcard BN.png`

A－01 已完成：

-   AI PASS
-   Chrome 驗證
-   Safari 驗證
-   Jamie PASS

但 A－01 的特殊 rendering 方法不可自動視為其他版位 Requirement。

------------------------------------------------------------------------

## 27. 新 GPT 對話接手規則

當一個 GPT 對話太長，需要換新對話時：

提供這份 SOP。

並告訴新 GPT：

1.  現在正在做哪個樣式／版位。
2.  前一個已完成版位是哪一個。
3.  最新 Code Commit。
4.  最新 Docs Commit。
5.  Working Tree 是否有 untracked assets。
6.  本版位 Photoshop 規格。
7.  本版位底圖／對位圖。
8.  必要時提供 Photoshop 完成參考圖。

新 GPT 必須先讀正式文件與本 SOP。

不得因換對話就重新設計已完成架構。

不得重新討論已 PASS 的 A－01。

------------------------------------------------------------------------

## 28. 新版位開始時的最小對話格式

Jamie 可以直接提供：

「現在開始樣式 A－02_MALL HBN。

尺寸： ...

主標： 字型： 字級： 顏色： CSS： ...

副標： ...

底圖： ...

對位圖： ...

文字水平／垂直規則： ...

請依 BN 正式版位建立 SOP，先進 Phase 1，不要 Coding。」

之後依固定 Phase 繼續。

------------------------------------------------------------------------

## 29. 防止 AI 把問題複雜化

任何 GPT／Codex／Claude 都必須遵守：

-   不要一開始想共用
-   不要為未來提前抽象化
-   不要順便重構
-   不要一次處理多個版位
-   不要一次處理 A／B／C／D
-   不要重新設計控制台
-   不要自行補 Requirement
-   不要自行推測 Photoshop 規則
-   不要把其他專案／Generator 的做法自動套入 BN
-   不要因某一版位的 workaround 成功就升級成全域規則
-   不要無限延伸問題

判斷標準：

**現在這個版位要正確完成，最少需要改什麼？**

只做那些。

------------------------------------------------------------------------

## 30. 每個版位完成定義

一個「樣式 × 版位」只有在以下全部完成後才算正式收尾：

-   Requirement 已確認
-   Investigation 完成
-   Proposal 已批准
-   Coding 完成
-   AI 自我驗證 PASS
-   Jamie 手動驗證 PASS
-   Code Commit 完成
-   Docs Update 完成
-   Docs Commit 完成

之後才開始下一個版位。

------------------------------------------------------------------------

# 最重要的三條

1.  **一次只做一個樣式 × 一個版位。**
2.  **不要提前共用、抽象化或延伸；先把眼前版位做對。**
3.  **AI PASS 不等於完成，Jamie 明確 PASS 後才能 Commit。**
