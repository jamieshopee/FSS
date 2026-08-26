# FSS BN Generator－固定 17 個 BN 版位與 A／B／C／D Type 差異整理

**整理日期：**2026-08-11 狀態：Phase 0 需求／架構討論整理 用途：供後續
GPT／Codex／Claude 接續使用，避免重新討論或誤解已確認內容。

## 一、本文件範圍

本文件只整理：

「固定 17 個 BN 版位，以及 A／B／C／D 在這些版位中的實際差異。」

目前仍在 Phase 0。

不要因本文件直接進入： - Requirement Specification - Investigation -
Proposal - Coding - 最終 JS 拆檔 - JSON Schema - 暫存格式細節 - ZIP
詳細結構 - Type Registry 實作 - Template 最終檔案格式 - 未來 E／F
的實際需求

不要重新設計已確認的 FSS／BN 整體架構。

## 二、已確認的 BN 核心架構

1.  FSS BN 是一個獨立 Generator。

2.  A／B／C／D 是 FSS BN 內部的 Type，不是四個獨立 Generator。

3.  目前 Type：

-   A
-   B
-   C
-   D

未來可能增加其他 Type。

4.  每個 Type 使用自己的 Excel 工單：

-   A → A 專用 Excel
-   B → B 專用 Excel
-   C → C 專用 Excel
-   D → D 專用 Excel

5.  A／B／C／D 共用同一組固定 17 個 BN 版位。

「共用 17 個版位」的意思是： - 版位名稱共用 - 版位用途共用 -
版位尺寸共用 - Generator 主流程共用

不代表 A／B／C／D 共用相同底圖。

6.  A／B／C／D 各自有專用底圖：

-   A → A 專用底圖
-   B → B 專用底圖
-   C → C 專用底圖
-   D → D 專用底圖

不得因底圖不同就拆成四套 Generator 或四套完整 17 Templates。

## 三、A／B／C／D 已確認差異

A： - A 專用底圖 - 無額外文字帶入 - 無額外 Logo 帶入

B： - B 專用底圖 - 無額外文字帶入 - 無額外 Logo 帶入

C： - C 專用底圖 - 有額外文字帶入 - 無額外 Logo 帶入

D： - D 專用底圖 - 無額外文字帶入 - 有額外 Logo 圖帶入

重要： 先前「尚未確認」的項目已正式確認為「無」，不要再寫成待確認。

目前不要自行推論未來新增 Type 的規則。

（落地註記：樣式 A 與樣式 B 均已完成正式平台整合，目前正式支援的 Type 為
A 與 B。A／B 的差異已正式確認**只有 background 底圖**：A 使用
`bn/assets/A/底圖/`、B 使用 `bn/assets/B/底圖/`；01～17 的 rendering、
typography、geometry、layout、文字資料結構、Editor、Preview、Export 行為與
formats 完全相同，B 沿用同一組固定 17 個正式 renderer，沒有另一套 B
renderer 或 B Template。12_LPBN 掛標行為 A／B 相同，共用既有
`bn/assets/LPBN掛標/` 素材；17_門檻表 的 threshold schema、geometry 與
Manual Editor A／B 相同。B 的正式 Code Commit 為
`4f9fb723930a907b8c3956fd084e757b41302137`，正式行為以
`bn/docs/FSS_BN_B樣式平台整合_Requirement_Specification_v1.0.md` 為準。
C／D 仍未進入正式支援範圍，其上述已確認差異維持本節原記錄，本註記不對
C／D 作任何新裁決。）

（落地註記：樣式 D 的 `01_DDcard BN`（D－01）已完成正式 Template 與人工對位
驗證，Jamie 已確認 PASS，Code Commit 為
`1139a7c3eca005b15c24bef7751ebb0ada740fe1`。D－01 已落實本節記錄的
「D 專用底圖＋額外 Logo 圖帶入」：底圖 `bn/assets/D/底圖/01_DDcard BN.jpg`
（531 × 792），Logo `bn/assets/D/Logo.png`（原始 784 × 112）為固定 renderer
asset，不由 Excel 帶入、不進 Editor、不進 Workspace、不進暫存 JSON；D－01
文字位置與 A／B－01 不同（三框整體下移 29px），typography、顏色、字數規則、
ink 置中與 `$`／`%` 特殊 formatting 沿用 A／B－01。D－01 採 D-specific
template `bn/templates/D/01-ddcard-bn.js` 與獨立校稿入口
`bn/launch/D/01_DDcard BN.command`。

目前已知的 D 整體產品資訊為：D 有自己的 worksheet `D`，工單配置與 A／B
相同；01、02、03、06、07、08、09、10、12 已知存在文字位置與額外 Logo 差異；
01～14 使用 D 底圖；12 仍需掛標；15～17 與 A／B 相同。

重要邊界：**本次只有 D－01 已完成實作與人工驗證**，其餘 D 版位仍待逐一確認
與開發，上述 D 整體資訊不代表其他版位已完成或已定案，也不得據 D－01 推論
其餘 D 版位都必須建立 D-specific template。**目前正式支援的 Type 仍為 A 與
B**：`SUPPORTED_TYPES` 仍為 A／B，正式 renderer registry 尚未 enable D，
樣式 D 在正式平台維持 fail-closed；D 的正式 Import／Restore／Preview／Export
尚未 enable，「D 有自己的 worksheet」只是未來 D platform integration 應遵循
的已確認需求，不代表目前平台已可 Import D。D－02～17 尚未完成，C 不在本註記
範圍；本註記不對 C 或未確認的 D 版位差異作任何新裁決。）

（落地註記：樣式 D 的 `02_MALL HBN`（D－02）亦已完成正式 Template 與人工對位
驗證，Jamie 已確認 PASS，Code Commit 為
`9c9272704517743ae7d8ccdd73c5a5a7bae8c534`。D－02 底圖
`bn/assets/D/底圖/02_MALL HBN.jpg`（1200 × 360）；固定 Logo 仍為共用
`bn/assets/D/Logo.png`（原始 784 × 112），已由 D－01 納管，D－02 只引用、
未新增第二份。與 D－01 不同的是：**D－02 三段文字的位置、字型、顏色、字數
規則與 `$`／`%` formatting 完全沿用 A／B－02，未有任何文字位置差異**；D－02
唯一的差異是新增固定 Logo，Logo box 為 `{left:98, top:96, width:351,
height:50}`，水平靠左。D－02 採 D-specific template
`bn/templates/D/02-mall-hbn.js` 與獨立校稿入口
`bn/launch/D/02_MALL HBN.command`。

前一則註記所述「本次只有 D－01 已完成」自本註記起更新為：**目前已完成實作與
人工驗證的 D 版位為 D－01 與 D－02**；D－03～17 仍待逐一確認與開發，其文字
位置差異與 Logo 位置一律尚未確認，不得由 D－01 或 D－02 推論。**目前正式支援
的 Type 仍為 A 與 B**：`SUPPORTED_TYPES` 仍為 A／B，正式 renderer registry
尚未 enable D，樣式 D 在正式平台維持 fail-closed；D 的正式 Import／Restore／
Preview／Export 尚未 enable，版位 02 既有鎖定的 JPG／72 dpi／≤145,000 bytes
亦尚未對 D 實測。C 不在本註記範圍；本註記不對 C 或未確認的 D 版位差異作任何
新裁決。）

（落地註記：樣式 D 的 `03_Coin page BN`（D－03）亦已完成正式 Template 與人工
對位驗證，Jamie 已確認 PASS，Code Commit 為
`024c621e2c61bd40d3b736af7487b22e332d0273`。D－03 底圖
`bn/assets/D/底圖/03_Coin page BN.jpg`（JPEG 1200 × 391）與對位圖
`bn/assets/D/對位/03_Coin page BN.png`（PNG 1200 × 391）已於該 Code Commit
納管；固定 Logo 仍為共用 `bn/assets/D/Logo.png`（原始 784 × 112），已由
D－01 納管，D－03 只引用、未新增第二份。與 D－02 相同：**D－03 三段文字的
位置、字型、顏色、字數規則與 `$`／`%` formatting 完全沿用 A／B－03，未有任何
文字位置差異**；D－03 唯一的差異是新增固定 Logo，Logo box 為
`{left:92, top:107, width:351, height:50}`，水平靠左（contain 後 350 × 50 @
`x = 92`、`y = 107`，1px 餘量在右側）。原 Photoshop CSS 的
`{687, 508, 351, 50}` 已裁決為誤植，不再使用。D－03 採 D-specific template
`bn/templates/D/03-coin-page-bn.js` 與獨立校稿入口
`bn/launch/D/03_Coin page BN.command`，已封箱的
`bn/templates/A/03-coin-page-bn.js` 未被修改或取代。

前一則註記所述「目前已完成實作與人工驗證的 D 版位為 D－01 與 D－02」自本註記
起更新為：**目前已完成實作與人工驗證的 D 版位為 D－01、D－02 與 D－03**；
D－04～17 仍待逐一確認與開發，其文字位置差異與 Logo 位置一律尚未確認，不得由
D－01、D－02 或 D－03 推論。**目前正式支援的 Type 仍為 A 與 B**：
`SUPPORTED_TYPES` 仍為 A／B，`ASSET_BASE_BY_TYPE` 仍只有 A／B，正式 renderer
registry 尚未 enable D，樣式 D 在正式平台維持 fail-closed；D 的正式 Import／
Restore／Preview／Export 尚未 enable，版位 03 既有鎖定的 JPG／72 dpi（版位 03
無 byte 容量上限）亦尚未對 D 實測，不得記為已驗證。本次完成的是「D－03
renderer ＋ 人工對位驗證」，不是 D 樣式正式平台整合完成。C 不在本註記範圍；
本註記不對 C 或未確認的 D 版位差異作任何新裁決。）

（落地註記：樣式 D 的 `06_IG`（D－06）亦已完成正式 Template 與人工 1:1 overlay
對位驗證，Jamie 已確認 PASS，Code Commit 為
`5def9469d21336787dc35553ff7a17ffde9eac48`。D－06 底圖
`bn/assets/D/底圖/06_IG.jpg`（JPEG 900 × 1600）與對位圖
`bn/assets/D/對位/06_IG.png`（PNG 900 × 1600）已於該 Code Commit 納管；固定
Logo 仍為共用 `bn/assets/D/Logo.png`（原始 784 × 112），已由 D－01 納管，
D－06 只引用、未新增第二份、未再次納管。與 D－02／D－03 相同：**D－06 三段
文字的位置、字型、顏色、字數規則與 `$`／`%` formatting 完全沿用 A／B－06，未有
任何文字位置差異**；D－06 唯一的差異是新增固定 Logo。D－06 正式 canvas 為
900 × 1600，四個正式 box 為 Logo `{left:161, top:282, width:580, height:82}`、
主標 `{left:175, top:387, width:550, height:65}`、副標
`{left:136, top:472, width:630, height:82}`、保護文字
`{left:136, top:573, width:630, height:37}`。Logo 在 box 內**水平＋垂直置中**
（contain 後 `scale = 41/56`、574 × 82 @ `x = 164`、`y = 282`，左右各 3px、
上下各 0px），與 D－02／D－03 的靠左不同，只代表 D－06。原 Photoshop／CSS 的
`left`（`2020`／`2034`／`1995`）已裁決為座標偏移的原始值，屬**已更正歷史資料，
不得再作正式 geometry 使用**。D－06 採 D-specific template
`bn/templates/D/06-ig.js` 與獨立校稿入口 `bn/launch/D/06_IG.command`，已封箱的
`bn/templates/A/06-ig.js` 未被修改或取代。

前一則註記所述「目前已完成實作與人工驗證的 D 版位為 D－01、D－02 與 D－03」自
本註記起更新為：**目前已完成實作與人工驗證的 D 版位為 D－01、D－02、D－03 與
D－06**，四者皆為個別 renderer 與人工對位流程，**不代表整個 D 樣式完成**；
D－04、D－05、D－07～17 仍待逐一確認與開發，其文字位置差異與 Logo 位置一律
尚未確認，不得由已完成的任何 D 版位推論，亦不得提前補上 geometry 或 typography。
**目前正式支援的 Type 仍為 A 與 B**：`SUPPORTED_TYPES` 仍為 A／B，
`ASSET_BASE_BY_TYPE` 仍只有 A／B，`A_TABLE` 未加入 D，正式 renderer registry
尚未 enable D，樣式 D 在正式平台維持 fail-closed；D 的正式 Import／Restore／
Preview／Export 尚未 enable，版位 06 既有鎖定的 JPG／72 dpi（`JPEG_QUALITY = 1.0`、
版位 06 無 byte 容量上限）亦尚未對 D 實測，不得記為已驗證。Jamie 的 PASS 是
「人工 1:1 overlay 對位 PASS」，不是「正式平台 Preview／Export PASS」。本次
完成的是「D－06 renderer ＋ 人工對位驗證」，不是 D 樣式正式平台整合完成。C 不在
本註記範圍；本註記不對 C 或未確認的 D 版位差異作任何新裁決。）

（落地註記：樣式 D 的 `07_FB POST`（D－07）亦已完成正式 Template 與人工 1:1
overlay 對位驗證，Jamie 已親自開啟 `bn/launch/D/07_FB POST.command` 確認 PASS，
Code Commit 為 `b35507340ad12cb976bdc08d96278df756e9b272`。D－07 底圖
`bn/assets/D/底圖/07_FB POST.jpg`（JPEG 1200 × 630）與對位圖
`bn/assets/D/對位/07_FB POST.png`（PNG 1200 × 630）已於該 Code Commit 納管；
固定 Logo 仍為既有共用 `bn/assets/D/Logo.png`（原始 784 × 112），由 D－01 納管，
D－07 只引用、未新增第二份、未再次納管。與 D－02／D－03／D－06 相同：**D－07
三段文字的位置、字型、顏色、字數規則與 `$`／`%` formatting 完全沿用 A／B－07，
未有任何文字位置差異**；D－07 唯一的差異是新增固定 Logo。D－07 正式 canvas 為
1200 × 630，四個正式 box 為 Logo `{left:54, top:201, width:365, height:52}`、
主標 `{left:54, top:266, width:405, height:49}`、副標
`{left:54, top:325, width:475, height:62}`、保護文字
`{left:54, top:401, width:475, height:28}`，四者共用 `left = 54`。三段文字採
**LeftCentered＝水平靠左＋垂直 ink bounding-box 置中**（與 D－01／D－06 的
水平＋垂直置中、D－02／D－03 的靠左靠上皆不同）。Logo 在 box 內**水平靠左＋
垂直置中**（contain 後 `scale = 13/28`、364 × 52 @ `x = 54`、`y = 201`，
左 0px／右 1px、上 0px／下 0px），只代表 D－07。原 Photoshop／CSS 的
Logo `left = 2877` 已裁決為座標偏移的原始值（`Δleft = 2823`、`Δtop = 0`），
屬**已更正歷史資料，不得再作正式 geometry 使用**。D－07 採 D-specific template
`bn/templates/D/07-fb-post.js` 與獨立校稿入口
`bn/launch/D/07_FB POST.command`，已封箱的
`bn/templates/A/07-fb-post.js` 未被修改或取代。

前一則註記所述「目前已完成實作與人工驗證的 D 版位為 D－01、D－02、D－03 與
D－06」自本註記起更新為：**目前已完成實作與人工驗證的 D 版位為 D－01、D－02、
D－03、D－06 與 D－07**，五者皆為個別 renderer 與人工對位流程，**不代表整個 D
樣式完成**；D－04、D－05、D－08～17 仍待逐一確認與開發，其文字位置差異與 Logo
位置一律尚未確認，不得由已完成的任何 D 版位推論，亦不得提前補上 geometry 或
typography。**目前正式支援的 Type 仍為 A 與 B**：`SUPPORTED_TYPES` 仍為 A／B，
`ASSET_BASE_BY_TYPE` 仍只有 A／B，`A_TABLE` 未加入 D，正式 renderer registry
尚未 enable D，樣式 D 在正式平台維持 fail-closed；D 的正式 Import／Restore／
Preview／Export 尚未 enable，版位 07 既有鎖定的 JPG／72 dpi（`JPEG_QUALITY = 1.0`、
版位 07 無 byte 容量上限）亦尚未對 D 實測，不得記為已驗證。Jamie 的 PASS 是
「人工 1:1 overlay 對位 PASS」，**不是「正式平台 Preview／Export PASS」**。本次
完成的是「D－07 renderer ＋ 人工對位驗證」，不是 D 樣式正式平台整合完成。C 不在
本註記範圍；本註記不對 C 或未確認的 D 版位差異作任何新裁決。）

（落地註記：樣式 D 的 `08_SPX TVBN_1`（D－08）亦已完成正式 Template 與人工 1:1
overlay 對位驗證，Jamie 已親自開啟 `bn/launch/D/08_SPX TVBN_1.command` 確認 PASS，
Code Commit 為 `d9359270fea1bd89e96a2eb27c4464b50e0ef6dc`
（`feat(bn): add D08 SPX TVBN 1 template`，parent
`1c9e12782279491395fa5e0f7c9a2da7629f1ac9`）。D－08 底圖
`bn/assets/D/底圖/08_SPX TVBN_1.jpg`（JPEG 1080 × 1920）與對位圖
`bn/assets/D/對位/08_SPX TVBN_1.png`（PNG 1080 × 1920）已於該 Code Commit 納管；
固定 Logo 仍為既有共用 `bn/assets/D/Logo.png`（原始 784 × 112），由 D－01 納管，
D－08 只引用、未新增第二份、未再次納管。與 D－02／D－03／D－06／D－07 相同：
**D－08 三段文字的位置、字型、顏色、字數規則與 `$`／`%` formatting 完全沿用
A／B－08，未有任何文字位置差異**；D－08 唯一的差異是新增固定 Logo。D－08 正式
canvas 為 1080 × 1920，四個正式 box 為 Logo
`{left:147, top:364, width:785, height:112}`、主標
`{left:167, top:507, width:745, height:87}`、副標
`{left:94, top:619, width:890, height:114}`、保護文字
`{left:94, top:759, width:890, height:51}`。三段文字採 **centered ink＝水平＋
垂直 ink bounding-box 置中**（`textAlign="left"`／`textBaseline="alphabetic"`；
與 D－07 的 LeftCentered、D－02／D－03 的靠左靠上皆不同，與 D－01／D－06 同族）。
**保護文字採 A／B－08 的 `{94,759,890,51}`；D 對位圖的 protectionText 標記
`{94,760,890,50}` 已由 Jamie／GPT 裁決為對位標記的 1px 差異，不是 D－08 的新
geometry，未被採用、不得再重新裁決。** Logo 在 box 內**水平＋垂直置中**：contain
後 `scale = min(785/784, 112/112) = 1`（height-bound、1:1 不縮放），destination
784 × 112 @ `x = ` **147.5**、`y = 364`，左 0.5px／右 0.5px、上 0px／下 0px，
aspect 保持 7 : 1，source rect 完整；**fractional `x = 147.5` 原值保留，未做任何
rounding／truncation**（比照 D－01 `90.5` 之既有 precedent）。上述只代表 D－08。
原 Photoshop／CSS 的 Logo `left`（`2006`）與 `top`（`2065`）已裁決為座標偏移的
原始值（`Δleft = 1859`、`Δtop = 1701`，屬 D－08 自身獨立實證，**不得建立共用
offset 規則、不得推論至其他 D 版位**），屬**已更正歷史資料，不得再作正式 geometry
使用**。Medium template-local 2× 的 offscreen 為 2160 × 3840，只涵蓋主標＋保護
文字，Bold 副標與 Logo 皆不進 2×；draw order 為 background → Logo → Medium
local 2×（主標＋保護文字）→ Bold 副標。D－08 採 D-specific template
`bn/templates/D/08-spx-tvbn-1.js` 與獨立校稿入口
`bn/launch/D/08_SPX TVBN_1.command`（Git mode `100755`、query
`?type=D&bn=08_SPX%20TVBN_1`），已封箱的
`bn/templates/A/08-spx-tvbn-1.js` 未被修改或取代；11 個 baseline functions 比對
為 6/11 byte-identical ＋ 5/11 message-only behavior-equivalent、實質差異 0/11，
**不得記為 11/11**。

前一則註記所述「目前已完成實作與人工驗證的 D 版位為 D－01、D－02、D－03、D－06
與 D－07」自本註記起更新為：**目前已完成實作與人工驗證的 D 版位為 D－01、D－02、
D－03、D－06、D－07 與 D－08**，六者皆為個別 renderer 與人工對位流程，**不代表
整個 D 樣式完成**；D－04、D－05、D－09～17 仍待逐一確認與開發，其文字位置差異與
Logo 位置一律尚未確認，不得由已完成的任何 D 版位推論，亦不得提前補上 geometry 或
typography。**目前正式支援的 Type 仍為 A 與 B**：`SUPPORTED_TYPES` 仍為 A／B，
`ASSET_BASE_BY_TYPE` 仍只有 A／B，`A_TABLE` 未加入 D，正式 renderer registry
尚未 enable D，樣式 D 在正式平台維持 fail-closed；D 的正式 Import／Restore／
Preview／Export 尚未 enable，版位 08 既有鎖定的 JPG／72 dpi（`JPEG_QUALITY = 1.0`、
版位 08 無 byte 容量上限）亦尚未對 D 實測，不得記為已驗證。Jamie 的 PASS 是
「人工 1:1 overlay 對位 PASS」，**不是「正式平台 Preview／Export PASS」**。本次
完成的是「D－08 renderer ＋ 人工對位驗證」，不是 D 樣式正式平台整合完成。C 不在
本註記範圍；本註記不對 C 或未確認的 D 版位差異作任何新裁決。）

（落地註記：樣式 D 的 `09_SPX TVBN_2`（D－09）亦已完成正式 Template 與人工 1:1
overlay 對位驗證，Jamie 已親自開啟 `bn/launch/D/09_SPX TVBN_2.command` 確認 PASS，
Code Commit 為 `ac69478cfa90ee62d208e30d139a382718433699`。D－09 底圖
`bn/assets/D/底圖/09_SPX TVBN_2.jpg`（JPEG 1599 × 1080）與對位圖
`bn/assets/D/對位/09_SPX TVBN_2.png`（PNG 1599 × 1080）已於該 Code Commit 納管；
固定 Logo 仍為既有共用 `bn/assets/D/Logo.png`（原始 784 × 112），由 D－01 納管，
D－09 只引用、未新增第二份、未再次納管。與 D－02／D－03／D－06／D－07／D－08
相同：**D－09 三段文字的位置、字型、顏色、字數規則與 `$`／`%` formatting 完全沿用
A／B－09，未有任何文字位置差異**；D－09 唯一的差異是新增固定 Logo。D－09 正式
canvas 為 1599 × 1080，四個正式 box 為 Logo
`{left:51, top:362, width:569, height:81}`、主標
`{left:51, top:465, width:620, height:75}`、副標
`{left:51, top:557, width:740, height:97}`、保護文字
`{left:51, top:674, width:740, height:44}`，四者共用 `left = 51`；四 box
right／bottom 為 620／443、671／540、791／654、791／718，全部落於 1599 × 1080 內。
三段文字採 **LeftCentered＝水平靠左＋垂直 ink bounding-box 置中**（與 D－08 的
centered ink、D－02／D－03 的靠左靠上皆不同，與 D－07 同族）。Logo 在 box 內
**水平靠左＋垂直置中**：contain 後 `scale = min(569/784, 81/112) = 81/112`
（height-bound），destination 567 × 81 @ `x = 51`、`y = 362`，左 0px／右 2px、
上 0px／下 0px，四值皆整數、未 rounding，aspect 保持 7 : 1，source rect 完整；
`destinationX` 為 **51**，未寫成 52。上述只代表 D－09。原 Photoshop／CSS 的
Logo `left`（`3077`）與 `top`（`2063`）已裁決為不可直接作 canvas geometry 的
原始值（`Δleft = 3026`、`Δtop = 1701`，屬 D－09 自身獨立更正證據，**不得建立
跨版位共用 offset 規則、不得推論至其他 D 版位**），屬**已更正歷史資料，不得再作
正式 geometry 使用**。Medium template-local 2× 的 offscreen 為 3198 × 2160，
只涵蓋主標＋保護文字，Bold 副標與 Logo 皆不進 2×；draw order 為 background →
Logo → Medium local 2×（主標＋保護文字）→ Bold 副標。D－09 採 D-specific
template `bn/templates/D/09-spx-tvbn-2.js` 與獨立校稿入口
`bn/launch/D/09_SPX TVBN_2.command`（Git mode `100755`、query
`?type=D&bn=09_SPX%20TVBN_2`），已封箱的
`bn/templates/A/09-spx-tvbn-2.js` 未被修改或取代；11 個 baseline functions 比對
為 6/11 byte-identical ＋ 5/11 message-only behavior-equivalent、實質差異 0/11
（共 6 行，其中 `assertLayoutFitsCanvas` 因本身兩個 `throw` 而為 2 行，其餘各
1 行，每行皆僅 `A－09`→`D－09`），**不得記為 11/11**。viewer 的 D－09 branch
未設 `fieldConfig`（D－01 的 `fieldConfig` 為歷史例外，未套用）。

前一則註記所述「目前已完成實作與人工驗證的 D 版位為 D－01、D－02、D－03、D－06、
D－07 與 D－08」自本註記起更新為：**目前已完成實作與人工驗證的 D 版位為 D－01、
D－02、D－03、D－06、D－07、D－08 與 D－09**，七者皆為個別 renderer 與人工對位
流程，**不代表整個 D 樣式完成**；D－04、D－05、D－10～17 仍待逐一確認與開發，其
文字位置差異與 Logo 位置一律尚未確認，不得由已完成的任何 D 版位推論，亦不得提前
補上 geometry 或 typography。**目前正式支援的 Type 仍為 A 與 B**：
`SUPPORTED_TYPES` 仍為 A／B，`ASSET_BASE_BY_TYPE` 仍只有 A／B，`A_TABLE` 未加入
D，`render-a.js` 未 enable D，正式 renderer registry 尚未 enable D，樣式 D 在正式
平台維持 fail-closed；D 的正式 Import／Restore／Preview／Export 尚未 enable，
版位 09 既有鎖定的 JPG／72 dpi（`{id:"09", name:"09_SPX TVBN_2", format:"jpg"}`、
無 `maxBytes`、`EXPORT_DPI = 72`、JPEG 品質既有全域行為不變）亦尚未對 D 實測，
不得記為已驗證。Jamie 的 PASS 是「人工 1:1 overlay 對位 PASS」，**不是「正式平台
Preview／Export PASS」**。本次完成的是「D－09 renderer ＋ launcher ＋ assets
納管 ＋ 人工對位驗證」，不是 D 樣式正式平台整合完成。C 不在本註記範圍；本註記不對
C 或未確認的 D 版位差異作任何新裁決。）

（落地註記：樣式 D 的 `10_POP UP`（D－10）亦已完成正式 Template 與人工 1:1 overlay
對位驗證，Jamie 已親自開啟 `bn/launch/D/10_POP UP.command` 確認 PASS，Code Commit
為 `1e2cdb939936de18d2665bafc27229bc7a032e3b`。D－10 底圖
`bn/assets/D/底圖/10_POP UP.png`（PNG RGBA 475 × 673）與對位圖
`bn/assets/D/對位/10_POP UP.png`（PNG RGBA 580 × 720）已於該 Code Commit
納管；固定 Logo 仍為既有共用 `bn/assets/D/Logo.png`（原始 784 × 112），由 D－01
納管，D－10 只引用、未新增第二份、未再次納管。**`10_POP UP` 是 17 個版位中唯一 canvas 尺寸（580 ×
720）不等於底圖 intrinsic 尺寸（475 × 673）者**，此 A－10 特例在 D－10 完整保存：底圖繪於精確目的地
`(53, 27, 475, 673)`、未 stretch 成整張 canvas，`clearRect(0, 0, 580,
720)` 保留且仍位於 background 之前，`globalAlpha = 1`、`source-over`、A－10 原有
canvas-size guard、background guard、`assertFontsReady` 與
`assertSpecificationFitsCanvas` 全部保留。與 D－02～D－09 不同：**D－10
三段文字的字型、顏色、字數規則與 `$`／`%` formatting 完全沿用 A／B－10，但文字框位置存在差異** —— 三框的
`left`／`width`／`height` 逐值不變，僅 `top` 各下移 **+44px**（`128 → 172`、`181
→ 225`、`242 → 286`）；此 `+44` 僅為 D－10 自身對位圖像素實證所得之差異，**不得建立
generic／shared offset 規則、不得推論至其他 D 版位**。D－10 另一項差異是新增固定 Logo。D－10 正式
canvas 為 580 × 720，四個正式 box 為 Logo `{left:129, top:109, width:323,
height:46}`、主標 `{left:129, top:172, width:323, height:38}`、副標
`{left:85, top:225, width:410, height:51}`、保護文字 `{left:85, top:286,
width:410, height:25}`，`logo` 為 `POP_UP_LAYOUT` 第一個 key；四 box
right／bottom 為 452／155、452／210、495／276、495／311，全部落於 580 × 720
內。三段文字採 **centered ink＝水平＋垂直 ink bounding-box 置中**（與 D－07／D－09 的
LeftCentered、D－02／D－03 的靠左靠上皆不同，與 D－01／D－06／D－08 同族）。Logo 在 box
內**水平置中＋垂直置中**：contain／no-upscale 後 `scale = min(323/784, 46/112) =
23/56`（height-bound），destination 322 × 46 @ `x = 129.5`、`y = 109`，左
0.5px／右 0.5px、上 0px／下 0px，aspect 保持 7 : 1，source rect
完整；**`destinationX = 129.5` 以 fractional 原值保留，全檔無
rounding／truncation**。上述只代表 D－10。原 Photoshop／CSS 的 四框原始標記
`867`／`807`／`870`／`823`／`923`／`984` 與 D－10 自身 `Δleft = 738`、`Δtop =
698`，屬**已裁決為不可直接作 canvas geometry 的歷史 evidence，不得建立跨版位共用 offset
規則、不得推論至其他 D 版位**，實測未出現於 runtime geometry。Medium template-local 2× 的
offscreen 為 1160 × 1440，只涵蓋 主標＋保護文字，Bold 副標與 Logo 皆不進 2×；draw order
為 clearRect → background → Logo → Medium local 2×（主標＋保護文字）→ Bold 副標
—— 此順序是 A－10 `clearRect` 特例與既有 D Logo precedent 的最小組合，**A－10 是第一個帶
`clearRect` 的 Logo D 版位，repository 中並不存在完全相同的直接 precedent**。D－10 採
D-specific template `bn/templates/D/10-pop-up.js`（exports 恰 2、零
import、signature 為 images object）與獨立校稿入口 `bn/launch/D/10_POP
UP.command`（Git mode `100755`、query `?type=D&bn=10_POP%20UP`、104 行、恰
7 行識別差異），已封箱的 `bn/templates/A/10-pop-up.js` 未被修改或取代；13 個 baseline
functions 比對 為 5/13 byte-identical ＋ 7/13 message-only
behavior-equivalent ＋ 1/13 substantive（`renderPopUp`，因 images
object、Logo guard、Logo draw 與 draw-order 接線），7 者合計 11 行且每行皆僅
`A－10`→`D－10`，殘留 `A－10` literal = 0；新增 `drawPopUpLogo` 不納入該 13
統計，**不得記為 5+8+0**。`assertSpecificationFitsCanvas` 完整保留、仍遍歷
`Object.entries(POP_UP_LAYOUT)`、四邊界與 background placement
驗證未弱化，自然涵蓋新增 Logo box。viewer 的 D－10 branch 未設 `fieldConfig`（D－01 的
`fieldConfig` 為歷史例外，未套用）。）

前一則註記所述「目前已完成實作與人工驗證的 D 版位為 D－01、D－02、D－03、D－06、D－07、D－08 與
D－09」自本註記起更新為：**目前已完成實作與人工驗證的 D 版位為
D－01、D－02、D－03、D－06、D－07、D－08、D－09 與 D－10**，八者皆為個別 renderer
與人工對位流程，**不代表整個 D 樣式完成**；D－04、D－05、D－11～17 仍待逐一確認與開發，其文字位置差異與 Logo
位置一律尚未確認，不得由已完成的任何 D 版位推論，亦不得提前補上 geometry 或 typography。**目前正式支援的
Type 仍為 A 與 B**：`SUPPORTED_TYPES` 仍為 A／B，`ASSET_BASE_BY_TYPE` 仍只有
A／B，`A_TABLE` 未加入 D，`render-a.js` 未 enable D，正式 renderer registry 尚未
enable D，樣式 D 在正式平台維持 fail-closed；D 的正式
Import／Restore／Preview／Export 尚未 enable，版位 10 既有鎖定的 PNG／72
dpi／`maxBytes: 250000`（`{id:"10", name:"10_POP UP", format:"png",
maxBytes:250000}`、`EXPORT_DPI = 72`；既有 PNG 72 dpi pHYs patch
與容量鏈目前只在 A／B 正式路徑實際運行）亦尚未對 D 實測，**本次 Code Commit 與 Manual PASS
不代表已驗證 D－10 的 250,000 bytes**，不得記為已驗證。Jamie 的 PASS 是「人工 1:1 overlay
對位 PASS」，**不是「正式平台 Preview／Export PASS」**。本次完成的是「D－10 renderer ＋
launcher ＋ assets 納管 ＋ 人工對位驗證」，不是 D 樣式正式平台整合完成。C 不在本註記範圍；本註記不對 C
或未確認的 D 版位差異作任何新裁決。

個 BN 版位 ============================================================

### 01_DDcard BN - 尺寸：531 × 792 - 格式：JPG - 分類：主視覺 Resize

### 02_MALL HBN - 尺寸：1200 × 360 - 格式：JPG - 分類：主視覺 Resize

### 03_Coin page BN - 尺寸：1200 × 391 - 格式：JPG - 分類：主視覺 Resize

### 04_Loyalty BN - 尺寸：702 × 208 - 格式：PNG - 分類：主視覺 Resize

### 05_MSBN - 尺寸：1200 × 400 - 格式：PNG - 分類：主視覺 Resize

（早期記載為 1200 × 360／JPG；已依正式 A.xlsx 工單「1200x400／PNG 檔」與 A－05 正式 Template 實作（透明 1200 × 400 Canvas）修正。）

### 06_IG - 尺寸：900 × 1600 - 格式：JPG - 分類：主視覺 Resize

### 07_FB POST - 尺寸：1200 × 630 - 格式：JPG - 分類：主視覺 Resize

### 08_SPX TVBN_1 - 尺寸：1080 × 1920 - 格式：JPG - 分類：主視覺 Resize

### 09_SPX TVBN_2 - 尺寸：1599 × 1080 - 格式：JPG - 分類：主視覺 Resize

### 10_POP UP - 尺寸：580 × 720 - 格式：PNG - 分類：主視覺 Resize

### 11_Line OA - 尺寸：1040 × 1040 - 格式：PNG - 分類：主視覺 Resize

### 12_LPBN - 尺寸：1200 × 550 - 格式：JPG - 分類：主視覺 Resize

（早期記載為 PNG；Jamie 已正式裁決 `12_LPBN.jpg` 為 JPG，早期 PNG 記載屬筆誤，已依裁決與 Code Commit `91aa7f6` 實作修正。）

### 13_Skinny BN_APP - 尺寸：358 × 360 - 格式：PNG - 分類：特殊文字訊息版位

### 14_Skinny BN_PC - 尺寸：400 × 110 - 格式：PNG - 分類：特殊文字訊息版位

### 15_AR - 尺寸：100 × 100 - 格式：JPG - 分類：特殊文字訊息版位

### 16_副區 - 尺寸：1200 × 220 - 格式：JPG - 分類：固定版型＋獨立文字訊息

### 17_門檻表 - 尺寸：1200 × 依內容 - 格式：PNG - 分類：動態門檻表

（格式早期記載為 JPG；已依正式 A.xlsx 工單「PNG 檔」與 A－17 正式 Template
實作修正為 PNG。）

總數： - 01～12：12 個主視覺 Resize 版位 - 13～15：3
個特殊文字訊息版位 - 16：1 個固定版型＋獨立文字訊息版位 - 17：1
個動態門檻表 - 合計：17 個

主視覺 Resize

01～12 為同一組主視覺 Resize 版位。

不需要再逐一比較 01～12 的 A／B／C／D。

目前已確認的 Type 差異直接套用： - A：A 專用底圖 - B：B 專用底圖 - C：C
專用底圖＋額外文字 - D：D 專用底圖＋額外 Logo 圖

01～12 共用的 Excel 主要文字資料目前為： - 主標：限 8 字內 - 副標：限 7
字內 - 保護文字：限 17 字內

01～12 各版位主要差別為： - 尺寸 - 用途 - 輸出格式 - 對應 Type
的專用底圖

不要重新要求提供 01～12 × A／B／C／D 共 48 張圖逐一比對。

特殊文字訊息版位

13～15 的主要特殊點是：

「使用各自獨立的文字訊息，由 Excel 對位帶入。」

不是另一套 Type 架構，不需要逐 Type 重新研究。

### 13_Skinny BN_APP - 尺寸：358 × 360 - 格式：PNG - 第一行：限 5 字內 -

第二行：限 6 字內

### 14_Skinny BN_PC - 尺寸：400 × 110 - 格式：PNG - 第一行：限 5 字內 -

第二行：限 6 字內

### 15_AR - 尺寸：100 × 100 - 格式：JPG - 第一行：限 3 字內 - 第二行：限 3

字內

### 16_副區不是動態表格。

它是： 「固定版型＋自己的文字訊息，由 Excel 對位帶入。」

尺寸： 1200 × 220

格式： JPG

共有 4 個 Excel 文字欄位：

1.  左標題

-   限 10 字內

2.  左文案

-   限 10 字內

3.  右標題

-   限 10 字內

4.  右文案

-   限 10 字內

範例： - 左標題：全站大免運 - 左文案：店取滿\$199免運 -
右標題：商城優選皆適用 - 右文案：宅配滿\$490免運

## 八、17_門檻表－整體結構

### 17_門檻表： - 寬度固定：1200px - 高度：依實際內容增長或縮短 - 格式：PNG

門檻表分成三個區域：

A. 上方深綠色區 - 結構／色塊大小固定 - 只由 Excel 帶入文字

B. 中間門檻資料區 - 動態結構 - 物流欄數可能變動 - 門檻列數可能變動 -
白色色塊可分開或垂直合併 - Excel 資料決定實際內容

C. 下方橘色 VIP 區 - 結構／色塊大小固定 - 只由 Excel 帶入文字

## 九、17_門檻表－物流欄

**目前工單規劃最多提供 5 個物流欄：**

-   物流1
-   物流2
-   物流3
-   物流4
-   物流5

實際沒有使用的物流欄留白。

物流名稱由 Excel 帶入。

實際案例包括： - 蝦皮店到店 - 蝦皮店到店 隔日到貨 - 蝦皮店到店
環保無包裝 - 店到家宅配（含新竹物流、海外宅配）

不要把上述名稱寫死成唯一可能內容；它們是實際範例。

## 十、17_門檻表－門檻列

**門檻列數不是固定。**

依左側實際門檻項目數量決定，例如： - 平日門檻 - 週三/週六加碼 - 6/1加碼

工單可預留多個門檻列。

有資料就填，沒有資料就留白。

有效門檻列數會影響最終門檻表高度。

## 十一、17_門檻表－白色色塊合併規則

白色色塊必須支援： - 分開 - 垂直合併

Excel 使用「↑」明確表示該格需要與上方白色色塊合併。

例如：

物流2： 平日門檻：\$299 週三/週六加碼：↑ 6/1加碼：↑

代表： \$299 顯示為一個垂直跨越三列的白色色塊。

另一例：

物流1： 平日門檻：\$199 週三/週六加碼：\$149 6/1加碼：\$99

代表： 三列各自為獨立白色色塊。

重要： - 不由系統根據「價格是否相同」自行猜測是否合併。 - 合併意圖由
Excel 的「↑」明確指定。 - 空白代表該格沒有資料。 - Excel
工單不需要真的操作 Excel Merge Cells。

## 十二、17_門檻表－目前 Excel 填寫區

**目前確認的門檻表 Excel 填寫概念：**

【主標題】 - 主標題：限 15 字內 - 範例：不限店家無限免運

【適用物流】 - 物流1～物流5 - 每欄填寫對應物流名稱 - 未使用欄位留白

【門檻項目／金額】 - 左側填門檻項目 -
右側對應物流1～物流5填寫金額／文字 - 需要與上方合併時填「↑」 -
無資料留白

【VIP 區】 - VIP 標題：限 20 字內 - VIP 文案：限 20 字內 - CTA：限 3
字（箭頭屬 VIP 底圖固定 graphics，不在 CTA 文字內；早期記載「限 4
字，含箭頭」已依正式 A.xlsx 工單「CTA (限3字)」修正）

目前範例： - VIP 標題：天天無限免運｜不分時段\$49起 - VIP
文案：額外享天天9折優惠券，首月免費試用 - CTA：訂閱去▶

## 十三、17_門檻表 Excel 設計原則

門檻表不硬塞成一般 BN 的固定幾個文字欄位。

Excel 的目的，是明確描述：

「物流欄 × 門檻列 × 每格內容 × 垂直合併關係」

因此目前採用：

-   物流最多 5 欄
-   實際物流數依填寫內容決定
-   門檻列依實際需求填寫
-   「↑」控制與上方白色色塊垂直合併
-   空白表示無資料
-   固定區文字另外對位帶入
-   最終高度依有效內容調整

這種結構必須能涵蓋目前已提供的不同門檻表案例，不為每種活動另外建立一套格式。

17 個版位整理狀態

01～12： 已確認。 主視覺 Resize。 不需要再逐版比較 A／B／C／D。

13～15： 已確認。 各自有自己的文字訊息，由 Excel 對位帶入。

16： 已確認。 固定版型＋4 個獨立文字欄位，由 Excel 對位帶入。

17： 目前門檻表的版面資料結構與 Excel 填寫方向已確認。 包含： -
固定主標區 - 最多 5 個物流欄 - 動態門檻列 - 「↑」控制白格垂直合併 - 固定
VIP 區 - 1200px 固定寬度 - 高度依有效內容變動

（以上為 Phase 0 早期規劃整理。A－17 正式 Template 已完成實作並經 Jamie
手動驗證 PASS；最終已實作規格以
`bn/docs/FSS_BN_Template_Requirement_Specification_v1.0.md` 第 5.1.17 節為準。）

## 十五、後續接手者注意事項

1.  不要重新詢問為什麼 01～12 不逐版比較。 已確認它們是一組主視覺
    Resize。

2.  不要把 A／B／C／D 當成四個 Generator。

3.  不要把「共用固定 17 個版位」誤解成「共用同一張底圖」。

4.  A／B／C／D 底圖各自不同。

5.  C 有額外文字帶入。

6.  D 有額外 Logo 圖帶入。

7.  A／B 沒有上述額外文字／Logo；已確認為「無」，不是「尚未確認」。

8.  13～15 只是各自文字訊息不同，不需要再建立另一套 Type 規則。

9.  16 不是門檻表；它是固定版型＋4 個文字欄位。

10. 17 才是動態門檻表。

11. 17 的白格合併由 Excel「↑」明確指定，不自行猜測。

12. 目前仍是 Phase 0。 不要自行開始 Coding、Proposal
    或最終資料格式設計。

13. 未提供／未確認的資訊不要自行補完。

## 十六、目前開發流程

固定流程：

Phase 0：需求討論 → Phase 1：Requirement Specification → Phase
2：專案調查 → Phase 3：Proposal → Phase 4：Coding → Phase 5：AI 自我驗證
→ Phase 6：Jamie 手動驗證 PASS → Code Commit → Docs Update → Docs Commit
→ Jamie Push → 視情況 Tag／Release

目前位置： Phase 0。

## 十七、現有文件狀態

現有基準文件：

1.  bn/docs/FSS_BN_Architecture.md

-   FSS BN 內部架構基準
-   Phase 0 文件

2.  docs/架構說明.md

-   FSS 入口平台 Locked Architecture Contract
-   BN 固定版位數量已由舊 12 個同步更新為 17 個

目前不要因本整理檔自行 Commit。

待本階段需求整理完成後，再判斷是否需要同步更新正式文件。
