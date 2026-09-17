# FSS BN Generator－A／B／C／D－15_AR Mixed Font Amendment v1.0

> **Status：CURRENT／FORMAL SUPERSEDING AMENDMENT**
>
> Authority：Jamie-approved visual specification adjustment
>
> Effective implementation：Code Commit `1caef5e1fb67d55bc12d4760a179f10298766ba0`
>
> Validation gate：Jamie Manual Validation PASS
>
> 記錄日期：2026-09-17

---

## 1. 文件目的與效力

本文件是 A／B／C／D－`15_AR` 的窄範圍正式 superseding amendment，記錄已批准、已實作且已通過 Jamie Manual Validation 的 Han font face 調整。

本文件只 supersede 既有正式文件中與「A／B／C／D－`15_AR` 的 Han font face 為 `ShopeeNotoSans(content)-Bold`」、「A－15 沒有 Medium run」及「A－15 font readiness 只需 Bold」直接衝突的敘述。既有 Locked 文件保留為歷史規格與完成紀錄，不直接修改；除本文件明列的單一 font-face 決策外，其他 Locked decisions、已完成 Phase、renderer contract 與平台行為繼續有效。

若既有文件與本 amendment 在上述窄範圍內衝突，以本 amendment 為 current authority；不衝突內容仍以原正式文件為準。

---

## 2. Scope

本 amendment 精確適用於：

- 樣式 A／Type A－`15_AR`
- 樣式 B／Type B－`15_AR`
- 樣式 C／Type C－`15_AR`
- 樣式 D／Type D－`15_AR`

A／B／C／D－`15_AR` 繼續共用 `bn/templates/A/15-ar.js` 的 `renderAr()` renderer contract。本 amendment 不建立 Type-specific renderer，也不擴張到 01～14、16～17 或其他 renderer／平台功能。

---

## 3. Previous Rule

本 amendment 生效前，兩個 `15_AR` 文字欄位的字元分類與 font rule 為：

| 字元類型 | Font |
|---|---|
| Han／Unicode `Script=Han` | `18pt "ShopeeNotoSans(content)-Bold"` |
| Other／非 Han | `18.5pt "ShopeeNotoSans(content)-Bold"` |

---

## 4. New Current Rule

兩個 `15_AR` 文字欄位目前的正式規格為：

| 字元類型 | Font | Canvas family alias |
|---|---|---|
| Han／Unicode `Script=Han` | `18pt "ShopeeNotoSans(content)-Medium"` | `ShopeeNotoSans Medium` |
| Other／非 Han | `18.5pt "ShopeeNotoSans(content)-Bold"` | `ShopeeNotoSans Bold` |

Han 的定義仍為既有 renderer 使用的 Unicode `Script=Han` 分類。Other 是所有非 Han 字元，包含英文字母、數字、符號、空白及其他非 Han 字元。

此決策只把 Han font face 從 Bold 改為 Medium。Other 的 Bold font face 與兩類字級均未改變。

---

## 5. Explicit Non-Changes

下列事項全部維持既有正式規格與實作：

- Han 字級 `18pt`
- Other 字級 `18.5pt`
- Unicode `Script=Han` classifier 與 `HAN_PATTERN`
- tokenizer 與 `tokenizeLine()`
- run grouping
- `measureText()`／`measureRun()` algorithm
- mixed-run 總寬與 actual-ink bounding-box 計算
- `drawCenteredMixedLine()` actual-ink 水平／垂直置中
- 所有 runs 共用 common alphabetic baseline
- `textAlign = "left"` 與 `textBaseline = "alphabetic"`
- line1 frame `14, 22, 72, 25`
- line2 frame `14, 54, 72, 25`
- positioning algorithm、fit detection 與 frame-fit reporting
- 顏色 `#fff285`
- draw order 與 compositing
- Canvas `100 × 100`
- 正式 1× rendering；不新增 local 2× temporary Canvas
- JPG export、JPEG quality 與 72 dpi patch
- Preview／Export 共用正式 renderer 的架構
- A／B／C／D 共用 `renderAr()` 的 routing
- assets、font files 與既有 `@font-face` mapping
- Workspace、Editor、Excel Import、Restore 與 JSON schema
- 01～14、16～17 的 renderer 與視覺規格

本 amendment 不加入 spacing、人工 offset、tolerance、縮字、typography helper、mixed-font renderer refactor 或 Type-specific `15_AR` renderer。

---

## 6. Font Readiness Current Rule

`waitForArFonts()`／`FONT_CHECKS` 必須等待 `15_AR` 實際使用的兩個 font specification：

- `18pt "ShopeeNotoSans Medium"`
- `18.5pt "ShopeeNotoSans Bold"`

兩者均須經既有 `document.fonts.load()` 與 `document.fonts.check()` readiness contract；未 ready 時維持 hard-stop，不得依賴 fallback。既有 Medium／Bold WOFF2 assets 與 family mapping 不變。

---

## 7. Implementation Record

- Code Commit：`1caef5e1fb67d55bc12d4760a179f10298766ba0`
- Commit message：`fix(bn): update 15 AR mixed font`
- Parent：`5a7a266fa26ee8054c226dad84fa0a1e50ef3040`
- Runtime scope：`M bn/templates/A/15-ar.js`
- Diff stat：`1 file changed, 2 insertions(+), 1 deletion(-)`

實作只新增既有 Medium family alias 的使用，並將 `HAN_FONT` 由 `18pt "ShopeeNotoSans Bold"` 改為 `18pt "ShopeeNotoSans Medium"`；`OTHER_FONT` 保持 `18.5pt "ShopeeNotoSans Bold"`。`FONT_CHECKS` 結構未改，因引用 `HAN_FONT`／`OTHER_FONT` 而自然等待目前實際使用的兩個 font specifications。

---

## 8. Validation Record

- Static Validation：PASS
- Font readiness：PASS
- A／B／C／D－`15_AR` Browser Validation：PASS
- Jamie Manual Validation：PASS（最終人工驗證 gate）

Browser Validation 涵蓋純中文、純英文／數字及中英數符號混排的 renderer／Preview smoke、line1／line2、mixed runs、置中、baseline、font readiness 與 Console error 檢查。自動化環境未可靠完成的完整 end-to-end Export artifact 產出仍記為 **NOT VERIFIED by automation**；不得將該項改寫為 automated PASS。Preview／Export 共用同一 `renderAr()` call path 的 architecture／reachability 已確認，且最終以 Jamie Manual Validation PASS 作為人工驗證 gate。

---

## 9. Superseded Statements

### 9.1 `FSS_BN_Template_Requirement_Specification_v1.0.md`

本 amendment 只 supersede §5.1.15 中下列直接衝突部分：

1. §5.1.15.2 表格中「第一行 Han 字元」與「第二行 Han 字元」的 `ShopeeNotoSans Bold` font face，改由本文件第 4 節的 `ShopeeNotoSans Medium` current rule 取代。
2. §5.1.15.2 tokenizer 說明中的「Unicode Script=Han 字元 → Bold 18pt」，改由「Unicode Script=Han 字元 → Medium 18pt」取代；Other → Bold 18.5pt 不變。
3. §5.1.15.3 的「同一行所有 18pt／18.5pt Bold runs」只在 font-face 描述上被取代為「18pt Medium Han runs／18.5pt Bold Other runs」；common alphabetic baseline、measurement 與置中算法不變。
4. §5.1.15.4 的「兩行全部使用 Bold，沒有任何 Medium run」及 draw-order 項目中的「Bold mixed runs」font-face 描述被取代；正式 1×、無 local 2×、draw order 與 compositing 決策不變。
5. §5.1.15.5 的 Bold-only font-ready checks（18pt Bold＋18.5pt Bold）改由本文件第 6 節的 18pt Medium＋18.5pt Bold readiness rule 取代；load／check、hard-stop 與 no-fallback contract 不變。

### 9.2 `FSS_BN_Architecture.md`

本 amendment 只 supersede §33 中下列直接衝突部分：

1. 「兩行文字規格完全相同：`ShopeeNotoSans Bold`」及「Han 使用 Bold 18pt」的 current font-face 描述。
2. 「同一行所有 18pt／18.5pt Bold runs」的 font-face 描述；其 measureText、advance continuity、common alphabetic baseline 與 actual-ink centering 架構不變。
3. 「兩行全部是 Bold，沒有任何 Medium run」及 draw-order 中「Bold mixed」的 font-face 描述；正式 1× 與無 temporary Canvas 的架構不變。
4. 「Font-ready 沿用 Bold WOFF2 mapping、不新增 font mapping、檢查 18pt Bold 與 18.5pt Bold」改由既有 Medium／Bold mapping下的 18pt Medium＋18.5pt Bold readiness rule 取代。

§33 原 A－15 建立時的 Code Commit、Phase 5 與 Jamie Chrome／Safari PASS 敘述保留為當時歷史完成紀錄；本 amendment 不刪除或重寫該歷史紀錄，只建立其後 font-face 調整的 current authority。

### 9.3 A／B／C／D 平台整合文件

下列 shared-routing 敘述不與新 font rule 衝突，因此不被 supersede：

- A 平台整合使用既有正式 `15_AR` renderer。
- B－15 完整沿用 A－15 rendering／typography／geometry。
- C－15 shared reuse `renderAr()`，不建立 C-specific wrapper／geometry。
- D－15 位於 explicit A renderer reuse group，沿用同版位 `renderAr()` contract。

這些文件對 typography 的繼承，自本 amendment 生效後自然指向第 4 節的 current rule；其 routing、asset source、Workspace、Preview 與 Export 決策全部維持有效。

---

## 10. Governance Boundary

- 本文件不修改、刪除或重寫任何既有 Locked 文件內容。
- 本文件不回溯改寫 A－15 原始完成 Phase 或歷史 PASS 紀錄。
- 本文件只成為 A／B／C／D－`15_AR` Han font face 與相應 font readiness 的 current authority。
- 後續若要修改其他字級、字元分類、geometry、renderer algorithm、2× policy、平台 routing 或其他版位，必須另行取得 Jamie 明確決策；不得由本 amendment 推導授權。
