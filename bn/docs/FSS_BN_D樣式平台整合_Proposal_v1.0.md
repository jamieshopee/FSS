# FSS BN Generator－D 樣式正式平台整合 Proposal v1.0

> 階段：Phase 3－Implementation Proposal
>
> 狀態：待 Jamie／GPT Review；尚未進入 Phase 4 Coding、Phase 5 Verification 或正式平台人工驗證
>
> 整理日期：2026-08-26
>
> 基準 HEAD：`173fcb06b4cc2d4a8e749ecaa50b58cd5335bec5`（`docs(bn): document D12 LPBN template`）

---

## 1. 文件目的與治理來源

本文件把已 Review PASS 的 D 樣式正式平台整合 Phase 1 Requirement 與 Phase 2 Repository Investigation 收斂為可直接交給 Phase 4 Coding 的最小 implementation proposal。

本文件必須服從且不得改寫下列已鎖定來源：

- `bn/docs/FSS_BN_D樣式平台整合_Requirement_Specification_v1.0.md`
- `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md`，尤其第 16 節 Phase 0 Decision Lock

本 Proposal 只描述未來最小修改面、執行順序與驗證 gate，不代表 Type D 已 enable，也不代表 D Import、Restore、正式控制台 Preview 或 Export 已通過驗證。

---

## 2. Scope／Non-goals

### 2.1 本 Proposal 的唯一目標

以現行控制台、Workspace、renderer bridge、Editor、Preview 與 Export 主流程為基礎，透過最小 3 個 core JS 修改及納管 7 張既有 D runtime 底圖，使 Type D 具備後續正式平台整合與驗證的完整前提。

### 2.2 明確不在範圍

- 不修改任何版位的 geometry、typography、alignment、formatting、guards、draw order 或 canvas 規格。
- 不建立完整 17-entry `D_TABLE`。
- 不為 Group B 建立 D renderer、template、launcher 或對位流程。
- 不修改九個既有 D-specific renderer。
- 不修改任何 A renderer 來統一 function signature。
- 不建立 shared asset manager、Logo service、generic images abstraction 或第二套控制台。
- 不修改 Workspace schema、JSON format 或 version。
- 不修改 LPBN badge resolver、badge assets、slot mapping 或 composition。
- 不修改 Export matrix、quality、DPI、capacity、ZIP 或 JSON 命名。
- 不修改 UI／CSS，不新增 D-specific Editor 欄位或控制項。
- 不處理樣式 C、stale comments、banwords、vendor 或無直接需求的 refactor。
- 不把 D template 既有人工 overlay PASS 誤寫為 D 正式平台整合 PASS。

---

## 3. Phase 2 Repository Evidence 摘要

### 3.1 現行 blocker

| 核心檔案 | Repository 現況 | Type D blocker |
|---|---|---|
| `bn/js/import.js` | `SUPPORTED_TYPES` 精確為 A／B；Excel 與 Restore 共用同一 allow-list | D 在 workbook 讀取前及 Restore validation 被拒絕 |
| `bn/js/render-a.js` | `ASSET_BASE_BY_TYPE` 只有 A／B；`A_TABLE` 只有 A renderer；一般版位只傳單一 `backgroundImage` | 無 D asset base、D override、Logo loading 與 D－17 canonical route |
| `bn/js/app.js` | 樣式卡與一般流程已 type-agnostic；D－17按鈕／Modal仍有 A/B-only gate | D－17 Editor／Modal被隱藏 |

### 3.2 已實證可 zero-diff

- `bn/js/export.js`：規則按 BN id；render 經中央 `renderBnToCanvas`；JSON保存 `state.currentType`；12 variants只按 id。
- `bn/js/workspace.js`：state、start、replace、reset、selection、text及threshold storage均type-agnostic。
- `bn/js/lpbn-badges.js`：resolver只依月份；無type gate。
- `bn/js/editor.js`：fields、limits、ASCII 0.5／非ASCII 1、IME、banwords及rollback均按BN id或共用邏輯。
- `bn/index.html`：D樣式卡及控制台DOM已存在。

### 3.3 既有 renderer contracts

- Group A九個D renderer全部維持 `render(canvas, images, fields)`，其中`images`必須提供`backgroundImage`與`logoImage`。
- Group B 04／05／11／13／14／15／16全部維持現有A renderer的`render(canvas, backgroundImage, fields)`。
- 17維持`renderThresholdTable(canvas, { titleImage, vipImage }, model)`。

Phase 2未發現需要第4個core file的repository conflict。

---

## 4. 正式 Implementation Decisions

本節決策全部鎖定，不留 OPEN：

1. Routing採用稀疏 `D_OVERRIDE_TABLE`，只列Group A九個D-specific entries。
2. Group A精確為`01/02/03/06/07/08/09/10/12`。
3. Group B精確為`04/05/11/13/14/15/16/17`，明確受控reuse同ID `A_TABLE` entry。
4. Type D Group A使用D renderer、D底圖及tracked共用D Logo。
5. Type D Group B 04～16使用A renderer及對應D底圖；不得誤用A／B底圖。
6. Type D＋17使用A目錄中既有canonical `17_主標題.png`／`17_VIP.png`；不得搜尋D copies或新增D copies。
7. Logo loading集中在`renderBnToCanvas`已解析type、bnId及entry之後、呼叫renderer之前。
8. Phase 4 core files恰為`import.js`、`render-a.js`、`app.js`。
9. Phase 4 runtime asset additions恰為7張既有D底圖；7張Group B對位圖排除。
10. `export.js`、`workspace.js`、`lpbn-badges.js`、`editor.js`及其餘Regression Boundary全部zero-diff。

---

## 5. Exact Phase 4 File Change Plan

### 5.1 Core JS－恰3個 modified paths

| Path | 最小改動 |
|---|---|
| `bn/js/import.js` | `SUPPORTED_TYPES`由A／B擴為A／B／D；只同步直接受allow-list影響的說明或錯誤文字 |
| `bn/js/render-a.js` | 九個D imports、D asset base、稀疏D override metadata、受控route、Group A Logo loading及D－17 canonical base |
| `bn/js/app.js` | 現有D－17 threshold Editor／Modal合法type gate納入D |

### 5.2 Runtime assets－恰7個 added paths

- `bn/assets/D/底圖/04_Loyalty BN.png`
- `bn/assets/D/底圖/05_MSBN.png`
- `bn/assets/D/底圖/11_Line OA.png`
- `bn/assets/D/底圖/13_Skinny BN_APP.png`
- `bn/assets/D/底圖/14_Skinny BN_PC.png`
- `bn/assets/D/底圖/15_AR.jpg`
- `bn/assets/D/底圖/16_副區.jpg`

Phase 4預計Code diff scope為 **3 M＋7 A＝10 paths**。這是Proposal候選，實際Coding及commit前仍須用Git逐 path實證，不得為符合數字硬湊。

本Proposal文件本身不屬未來Code Commit。

---

## 6. `import.js` 最小方案

### 6.1 Allow-list

`SUPPORTED_TYPES`精確由A／B擴為A／B／D。不得納入C或其他值。

此一改動同時作用於：

- `parseExcelFile`的type validation；以及
- `parseWorkspaceJson`的Restore type validation。

### 6.2 Excel Import保持既有參數化流程

Type D必須自然沿用現行`workbook.Sheets[type]`，精確讀取worksheet `D`。不得新增D-specific parser、schema或fallback。

下列mapping全部zero-diff：

- 01～12：`B15/B16/B17`
- D－12月份：`E15`
- 13：`L20/L21`
- 14：`L22/L23`
- 15：`L24/L25`
- 16：`L26/L27/O26/O27`
- 17：既有threshold mapping及`parseThresholdModel`

`candidate.currentType`繼續直接取傳入type；`selectedBnId`、shared、bnText、threshold及lpbnBadgeMonth schema不變。

### 6.3 Restore保持version 1

- `WORKSPACE_FORMAT`不變。
- `WORKSPACE_VERSION`維持1。
- `type: "D"`經同一allow-list成為合法值。
- shared／bnText／threshold／lpbnBadgeMonth validation完全沿用。
- app仍只在完整parse成功後執行`replaceWorkspace`，維持atomic。

### 6.4 Error wording boundary

由`SUPPORTED_TYPES.join()`自然產生的支援樣式文字會隨allow-list最小同步。不得重寫其他Import／Restore錯誤訊息或UI。

---

## 7. `render-a.js` 稀疏 D Override Routing

### 7.1 九個D template imports

只新增下列既有exports的imports，不修改其來源檔：

| ID | Renderer | Font waiter |
|---|---|---|
| 01 | `renderDdcardBn` | `waitForDdcardBnFonts` |
| 02 | `renderMallHbn` | `waitForMallHbnFonts` |
| 03 | `renderCoinPageBn` | `waitForCoinPageBnFonts` |
| 06 | `renderIg` | `waitForIgFonts` |
| 07 | `renderFbPost` | `waitForFbPostFonts` |
| 08 | `renderSpxTvbn1` | `waitForSpxTvbn1Fonts` |
| 09 | `renderSpxTvbn2` | `waitForSpxTvbn2Fonts` |
| 10 | `renderPopUp` | `waitForPopUpFonts` |
| 12 | `renderLpbn` | `waitForLpbnFonts` |

Imports必須使用各自`bn/templates/D/`現有檔案；不得建立barrel、registry module或重新export。

### 7.2 `D_OVERRIDE_TABLE`

稀疏table只含精確九個IDs：`01/02/03/06/07/08/09/10/12`。D正式底圖base精確為`../assets/D/底圖/`。

| ID | D background filename |
|---|---|
| 01 | `01_DDcard BN.jpg` |
| 02 | `02_MALL HBN.jpg` |
| 03 | `03_Coin page BN.jpg` |
| 06 | `06_IG.jpg` |
| 07 | `07_FB POST.jpg` |
| 08 | `08_SPX TVBN_1.jpg` |
| 09 | `09_SPX TVBN_2.jpg` |
| 10 | `10_POP UP.png` |
| 12 | `12_LPBN.jpg` |

每個entry只提供現有bridge真正需要的metadata：D renderer、既有font waiter及上表D background filename。不得加入Group B entry，也不得複製17份A metadata。

### 7.3 受控Group B reuse

Type D未命中`D_OVERRIDE_TABLE`時，不得直接對所有未知ID執行模糊A fallback。route必須先確認bnId是精確Group B集合`04/05/11/13/14/15/16/17`，且同ID `A_TABLE` entry存在，才可reuse。

Phase 4可用private immutable Group B ID allow-list作最小guard；它只保護routing，不是第二份renderer table或generic registry。

此guard同時確保：若未來Group A override意外缺失，不能靜默退回A renderer。

### 7.4 Type routing完整語意

- Type A／B：維持現行`A_TABLE` renderer與各自asset base，行為zero-diff。
- Type D＋Group A：使用`D_OVERRIDE_TABLE`及D asset base。
- Type D＋Group B 04～16：使用同ID `A_TABLE` entry及D asset base。
- Type D＋17：使用同ID `A_TABLE` threshold entry及第10節canonical asset base。
- 未知type：throw。
- 未知BN id：throw。
- 缺D override、缺受控A reuse entry、缺asset或renderer contract不符：throw。

不得fallback至第一筆entry、其他BN、其他type或A／B底圖。

---

## 8. Group A Logo／Images Contract

### 8.1 Logo source

- 固定使用tracked `bn/assets/D/Logo.png`。
- intrinsic為784×112，48,618 bytes。
- Phase 4只引用，不修改、不複製、不重新編碼。

### 8.2 Loader位置

Logo loading集中在`renderBnToCanvas`內：完成type、bnId、entry與asset base解析後，於呼叫Group A renderer之前，與D background及font waiter一同等待。Logo URL須以private base `../assets/D/`及filename `Logo.png`交給既有`getImage()`，不得錯接`../assets/D/底圖/`。

必須沿用現有private `getImage()`：

- URL-keyed Promise cache；
- load error後cache eviction；
- 現有錯誤傳播與fail-closed語意。

不得新增shared helper module、Logo cache、asset service或跨檔抽象。

### 8.3 Invocation

只有Type D＋Group A傳入`{backgroundImage, logoImage}`。field values仍由現行`getBnFieldValues`取得。

九個D renderer現有signature、intrinsic guards、Logo contain／placement、layout validation、fonts與draw order全部zero-diff。

Group B不得載入Logo，也不得收到images object。

---

## 9. Group B Renderer Reuse Contract

04／05／11／13／14／15／16必須：

- 明確reuse同ID `A_TABLE` entry；
- 從D asset base載入同名D background；
- 等待該A entry既有font waiter；
- 維持單一`backgroundImage` invocation；
- 維持各版位既有fields、geometry、validation及draw order。

禁止因reuse A renderer而使用A／B底圖，亦禁止為傳入Logo或統一signature修改A renderer。

---

## 10. D－17 Canonical Asset Routing

### 10.1 正式選擇

Type D＋BN 17使用一個`render-a.js` private canonical base常數，精確指向`../assets/A/底圖/`中的：

- `17_主標題.png`
- `17_VIP.png`

A／B兩組既有檔案已由Phase 2確認byte-identical；本Proposal正式選擇A目錄作D－17 canonical source。

### 10.2 Control-flow boundary

- 只在Type D＋17解析asset URL時改用canonical base。
- A／B既有17 asset routing保持原行為。
- 繼續使用現有`getImage()`、entry font waiter與`renderThresholdTable`。
- images contract仍為`{titleImage, vipImage}`。
- threshold model、dynamic geometry、warnings、Editor／Modal資料結構全部zero-diff。
- 不得建立`bn/assets/D/底圖/17_*` copies。

---

## 11. `app.js` D－17 Gate

唯一程式改動是讓現有`showThresholdEditor`合法type條件精確接受A／B／D，同時繼續要求：

- `selectedBnId === "17"`；以及
- Workspace具有合法threshold model。

不得新增D-specific按鈕、Modal、listener、Editor renderer或state。

下列app流程全部zero-diff：

- 樣式卡click與`workspace.start`；
- 一般01～16 Editor；
- Import／Restore事件處理；
- Preview及error presentation；
- Export事件處理；
- BN navigation與keyboard；
- D－12 LPBN Preview resolver／variant chain；
- threshold Modal既有讀寫與compact行為。

---

## 12. Zero-diff Core Rationale

### 12.1 `export.js`

`EXPORT_ITEMS`及format／maxBytes完全按BN id；所有base render均經中央`renderBnToCanvas`。JSON已直接保存`state.currentType`，12 variants只檢查BN id並共用既有resolver。因此Type D routing完成後不需修改`export.js`。

這只是implementation reasoning；D Export尚未執行或驗證，不得記為PASS。

### 12.2 `workspace.js`

Workspace本身只保存type值，不維護type allow-list。start、replace、reset、selection、shared、bnText及threshold更新均type-agnostic；合法性由Import／Restore boundary負責。因此zero-diff。

### 12.3 `lpbn-badges.js`

resolver唯一產品輸入是月份，固定slot mapping、asset loading、partial status及composition均不檢type。D－12由現有app／export `bnId === "12"` chain自然共用，因此zero-diff。

### 12.4 `editor.js`

fields與limits只依BN id；15的ASCII 0.5／非ASCII 1、IME、banwords、rollback與counter均為共用邏輯。D－17可用性blocker位於app gate，不在editor engine，因此zero-diff。

---

## 13. Runtime Asset Scope

### 13.1 Phase 4必須原bytes納管的7張底圖

| Path | Intrinsic | Bytes | SHA-256 |
|---|---:|---:|---|
| `bn/assets/D/底圖/04_Loyalty BN.png` | 702×208 | 95,172 | `6abe8300b2d7a4d1e1527df6d27c3dd489ed98fc330ef409d637073829de4262` |
| `bn/assets/D/底圖/05_MSBN.png` | 1200×360 | 244,560 | `b0936beb957afc76f620d400c58e106cd0798127295b072df4b0259dbde32b11` |
| `bn/assets/D/底圖/11_Line OA.png` | 1016×1007 | 520,378 | `0a42091e6066b3626cd3aba795c52c6e28cd2ac70d88b423d818c2a2bfa2dd76` |
| `bn/assets/D/底圖/13_Skinny BN_APP.png` | 336×318 | 92,682 | `a76acfa43ca73b63f829b6c08947071ba03302f9bd4bf4293e460233590ac016` |
| `bn/assets/D/底圖/14_Skinny BN_PC.png` | 384×96 | 28,854 | `0c0b56d6d0d708105edd37a9b97db1ebcb111ac5b1e10ae2f100f2a38948dc18` |
| `bn/assets/D/底圖/15_AR.jpg` | 100×100 | 897 | `d5098b9dfea1e53e3c60a406f5ffd9e3f04291dbbfc51ac8f1217dfb8de9a136` |
| `bn/assets/D/底圖/16_副區.jpg` | 1200×220 | 21,629 | `12902843ca43ffc7f1c89669514afa8477675406f96dab4f9b8819f11ba9506e` |

Phase 4只能把現有bytes加入Git，不得另存、轉檔、壓縮或重編碼。

### 13.2 明確排除的7張對位圖

| Path | Intrinsic | Bytes | SHA-256 |
|---|---:|---:|---|
| `bn/assets/D/對位/04_Loyalty BN.png` | 702×208 | 5,519 | `8c3214121c7fa154eb4d41ae93e76b79b3e455503a093ce031b8ff3c83ea14d1` |
| `bn/assets/D/對位/05_MSBN.png` | 1200×400 | 12,328 | `90bfd190bb817d2ee11c42d4a6aaeae36d56ab725b4ffab6d6e6aec075206170` |
| `bn/assets/D/對位/11_Line OA.png` | 1040×1040 | 30,257 | `39d043c341131ca1c7606f7941dd5cf11d70a50148325cc65f12dbfe50a17257` |
| `bn/assets/D/對位/13_Skinny BN_APP.png` | 358×360 | 8,458 | `f7e82d22d6825e68ff0521f2b8c0a21425a901917ee19790fd8e24f89bcdf1de` |
| `bn/assets/D/對位/14_Skinny BN_PC.png` | 400×110 | 2,767 | `bc61a996be84e658591173861ea669d0a289074f32dffc673a46633694827f0f` |
| `bn/assets/D/對位/15_AR.png` | 100×100 | 370 | `d1cf28e80ea937145dfd749655179898af5a7cf0606952e91f61670139f83664` |
| `bn/assets/D/對位/16_副區.png` | 1200×220 | 6,491 | `f716ccf2e955e0770e5115966ac1703327a3720e17ece618759015f01f1bee77` |

正式runtime沒有引用這些對位圖，且Group B禁止建立launcher。七張對位圖不屬Phase 4 Coding或未來Code Commit，保持untracked，不得因素材形式完整而納管。

---

## 14. Explicit Zero-diff Regression Boundary

Phase 4必須維持下列paths／systems零修改：

- `bn/js/export.js`
- `bn/js/workspace.js`
- `bn/js/lpbn-badges.js`
- `bn/js/editor.js`
- `bn/index.html`
- `bn/css/*`
- 所有`bn/templates/A/*`
- 九個既有`bn/templates/D/*`
- 所有既有launchers與`bn/launch/viewer.html`
- A／B及D既有tracked assets
- canonical `17_主標題.png`／`17_VIP.png`
- `bn/assets/D/Logo.png`
- `bn/assets/LPBN掛標/*`
- Workspace schema／format／version
- fonts、vendor、banwords
- 樣式C全部檔案與行為

不得為D支援強行把zero-diff檔案加入Coding scope。

---

## 15. Fail-closed／Error Plan

- 未知type在Import／Restore及renderer routing皆明確失敗。
- 未知BN id或不屬Group A／B精確集合時明確失敗。
- Group A override缺失不得退回A renderer。
- Group B只有精確八個ID可reuse同ID A entry。
- Type D Group B不得讀A／B background。
- Type D＋17不得讀不存在的D canonical copies。
- background、Logo、title／VIP image load或font waiter失敗時沿用現有throw與cache eviction。
- renderer、Canvas、intrinsic、layout、encode、DPI或capacity失敗時不得輸出部分成功結果。
- 不得降低01／02／10容量限制或跳過任一Export item。

錯誤文字只做直接受新增合法type影響的必要同步，不重做error UI或清理歷史註解。

---

## 16. Phase 4 Coding Sequence

未來取得Phase 4明確授權後，順序鎖定為：

1. 重做嚴格Git Precheck，確認HEAD、staged、既有diff、locks及10個候選paths狀態。
2. 在`import.js`最小擴充A／B／D allow-list。
3. 在`render-a.js`加入九個D imports及稀疏`D_OVERRIDE_TABLE`。
4. 加入D asset base及Group A／Group B受控routing。
5. 在既定control-flow位置接入Group A background＋Logo loading與images invocation。
6. 接入Type D＋17的A canonical asset base。
7. 在`app.js`只解除D－17既有type gate。
8. 以原bytes納管7張runtime D底圖，明確排除7張對位圖。
9. 執行syntax／static checks及`git diff --check`。
10. 停止並依既有phase流程等待Phase 5自驗；不得順手Documentation Update。

若實作過程顯示需要第4個core file、Group B renderer、asset重編碼或其他超出本Proposal的改動，立即停止回報CONFLICT，不得擴大scope。

---

## 17. Phase 5 Static／Programmatic Verification Matrix

Phase 5須驗證但不得把結果誤當正式平台Manual PASS：

1. `SUPPORTED_TYPES`精確為A／B／D，不含C。
2. Excel Import仍使用`workbook.Sheets[type]`，所有D mapping逐值不變。
3. Restore仍為Workspace JSON version 1，合法接受`type: "D"`。
4. `D_OVERRIDE_TABLE`精確九個IDs，無Group B或17。
5. Group B受控allow-list精確八個IDs，無遺漏、重複或未知fallback。
6. 九個D imports逐一對應既有exports；D renderer檔案與signature零修改。
7. Type D Group A route到D renderer、D background及D Logo。
8. Type D Group B 04～16 route到同ID A renderer及D background，維持單一background contract。
9. Type D＋17 route到A canonical title／VIP assets，repository無D copies。
10. A／B routing及asset base保持現行行為。
11. app D－17 gate精確接受A／B／D；其餘app流程無D-specific分支。
12. 7張D底圖bytes／dimensions／SHA-256與第13.1節一致。
13. 7張Group B對位圖未被納管或引用。
14. 第14節zero-diff boundary全部無diff。
15. Node syntax/static import checks通過。
16. `git diff --check`通過，staged仍為0。

Phase 5不得開viewer、執行正式Preview／Export或生成圖片，除非後續獨立授權明確改變phase驗證範圍。

---

## 18. 正式平台 Manual Verification Strategy

Phase 4 Coding與Phase 5自驗完成後，必須由Jamie在正式控制台執行Type D整合驗證；既有逐版位launcher overlay PASS不能替代此驗證。

至少覆蓋：

1. 選擇Type D並成功匯入正式D worksheet，完整建立01～17 Workspace。
2. 逐一切換01～17並確認正式控制台Preview可用。
3. Group A九版位顯示正確D底圖與共用D Logo。
4. Group B 04～16使用正確D底圖且文字行為與同版位A baseline一致。
5. D－17使用canonical assets、dynamic geometry及同一Editor／Modal。
6. D－12 base永遠存在；月份空白、合法月份、partial slots及fixed-slot variants行為正確。
7. Workspace JSON保存`type: "D"`、version 1，Restore後完整恢復。
8. 完整Export ZIP包含17個base outputs及D－12實際可用variants。
9. 01／02／10容量、72 dpi、format matrix及17 dynamic height符合第19節。
10. 必要A／B regression smoke test無回歸。

任何Import、Restore、Preview、Editor、badge或Export失敗時立即停止並精確回報，不得自行擴大修正其他問題。

---

## 19. Export Manual Verification Detail

未來正式Export驗證必須核對：

| ID | 格式／限制 |
|---|---|
| 01 | JPG，最終≤245,000 bytes |
| 02 | JPG，最終≤145,000 bytes |
| 03 | JPG |
| 04 | PNG |
| 05 | PNG |
| 06 | JPG |
| 07 | JPG |
| 08 | JPG |
| 09 | JPG |
| 10 | PNG，最終≤250,000 bytes |
| 11 | PNG |
| 12 | JPG base＋實際可用fixed-slot variants |
| 13 | PNG |
| 14 | PNG |
| 15 | JPG |
| 16 | JPG |
| 17 | PNG，renderer實際dynamic height |

所有輸出沿用72 dpi及既有BN-id encoding policy。ZIP／JSON命名與結構不變，Workspace JSON維持version 1並保存`type: "D"`。

完整Export任一步驟失敗必須fail-closed；不得漏檔、降低限制或仍顯示完整專案成功。

本節是未來驗證計畫，目前D Export尚未執行或PASS。

---

## 20. Code Commit Gate

Phase 4 Coding與Phase 5自驗完成後仍禁止Code Commit。只有Jamie完成第18～19節正式平台Manual Verification並明確PASS，才可在後續獨立授權下進入Code Commit。

未來Code Commit候選paths精確為：

1. `bn/js/import.js`
2. `bn/js/render-a.js`
3. `bn/js/app.js`
4. `bn/assets/D/底圖/04_Loyalty BN.png`
5. `bn/assets/D/底圖/05_MSBN.png`
6. `bn/assets/D/底圖/11_Line OA.png`
7. `bn/assets/D/底圖/13_Skinny BN_APP.png`
8. `bn/assets/D/底圖/14_Skinny BN_PC.png`
9. `bn/assets/D/底圖/15_AR.jpg`
10. `bn/assets/D/底圖/16_副區.jpg`

實際commit前必須重新用Git證明候選恰為上述10 paths；若不符立即停止，不得硬湊、忽略或夾帶其他path。

Documentation Update與Docs Commit須在Code Commit之後另行授權；本Proposal不得預先執行。

---

## 21. Acceptance Mapping

| Requirement領域 | Proposal落點 |
|---|---|
| 17版位routing | 第4、7節 |
| Group A Logo-aware contract | 第8節 |
| Group B A renderer＋D asset routing | 第9節 |
| D－17 canonical assets | 第10節 |
| Import D worksheet／mapping | 第6節 |
| Restore JSON v1／type D | 第6.3節 |
| D－17 Editor／Modal | 第11節 |
| D－12 badges | 第12.3、18節 |
| Export matrix／capacity／72 dpi | 第12.1、19節 |
| Runtime assets | 第13節 |
| Fail-closed | 第15節 |
| A／B regression／zero-diff | 第14、17、18節 |
| Phase boundaries／Commit Gate | 第16、20、22節 |

---

## 22. Stop Conditions／Phase Boundary

Phase 4或後續驗證遇到下列任一情況即停止：

- 3個core files不足以完成已鎖定Requirement；
- 必須修改任何zero-diff檔案；
- 任一Group B需要D renderer、template或launcher；
- 任一D底圖intrinsic或hash與第13節不符；
- D－17無法在不複製assets下使用canonical pair；
- Group A Logo contract必須修改既有D renderer；
- Import／Restore需要D-specific schema或JSON升版；
- Export需要D-specific matrix或放寬A／B限制；
- 出現樣式C、UI改版、stale cleanup或shared refactor需求；
- Git diff包含未授權path。

本輪只完成Phase 3 Proposal；未執行Phase 4 Coding、Phase 5 Verification、Preview、Export、Manual Verification、Stage或Commit。Proposal完成後必須停止等待Jamie／GPT Review。

---

## 23. Implementation Outcome／Manual PASS／Code Commit

> **【CURRENT COMPLETION RECORD】** 本節只補記本Proposal已實際執行的結果；第1～22節的future tense、stop conditions與commit gate保留為當時Phase語境，已由本節完成紀錄取代。

### 23.1 Phase 4／5 實際結果

Phase 4精確修改`bn/js/import.js`、`bn/js/render-a.js`、`bn/js/app.js`三個core JS，並原bytes納管第13.1節七張runtime D底圖；沒有第4個core檔、Group B renderer／template／launcher、D－17 copies、asset重編碼或shared／generic refactor。Phase 5 syntax、static imports、routing、Import／Restore、D－17、D－12 badge reachability、Export matrix、A／B regression、asset hashes與zero-diff boundary全部PASS。

實際routing與Proposal一致：`D_OVERRIDE_TABLE`只含Group A `01/02/03/06/07/08/09/10/12`；精確Group B allow-list為`04/05/11/13/14/15/16/17`。Group A使用既有D renderer＋D background＋tracked D Logo；Group B 04～16使用同ID A renderer＋D background且無Logo；D－17使用A threshold renderer／model與canonical A 17 assets。未知route與缺必要內容均fail-closed。

Import／Restore正式接受A／B／D，D Excel只讀worksheet `D`；既有mapping、E15月份、threshold parser、validation與atomic semantics保持。Workspace JSON仍為version 1並保存`type:"D"`。`app.js`只有D－17 threshold gate擴為A／B／D；D－12透過central renderer自然進入既有badge resolver／variant chain。`export.js`保持zero-diff，既有BN-id matrix、72 dpi、quality／capacity與ZIP／JSON行為透過central renderer支援D。

### 23.2 Manual Verification 與唯一 Code Commit

Jamie在正式控制台完成第18～19節Manual Verification並明確 **PASS**；此PASS不同於九個D-specific template launcher的人工1:1 overlay PASS，也未被描述為Push／Release PASS。其後依第20節gate建立唯一Code Commit：**`e31f7be0b73fcca6db59bae693137f8fe8a8a329`**，message **`feat(bn): integrate D style into generator`**，parent `173fcb06b4cc2d4a8e749ecaa50b58cd5335bec5`。

Commit tree精確為 **10 paths＝3 M＋7 A**，與第5節／第20節候選集合完全一致；`git diff --check HEAD^ HEAD` PASS。七張對位圖仍為untracked evidence且未被runtime引用。`export.js`、`workspace.js`、`lpbn-badges.js`、`editor.js`、`index.html`、CSS、A templates、九個D templates、launchers、viewer、D Logo、canonical 17 assets與badge assets均zero-diff。

至此Proposal的Phase 4 Coding、Phase 5 Verification、正式控制台Manual Verification與Code Commit gate均已完成；Documentation Update為後續獨立文件同步，並不表示已Push／Tag／Release。樣式C仍為zero-scope。
