# FSS BN Generator－D 樣式平台整合 Requirement Specification v1.0

> **【CURRENT CONTRACT UPDATE】** Code Commit `8a141c1c905107546c25cd125015e1ec7ee61609`（`fix(bn): remove LPBN badge variants`）已取消 A／B／C／D 的 LPBN 掛標。D－12 current Preview／Export只保留單一 base `12_LPBN.jpg`，D worksheet `E15`不再匯入月份；第9.3、11～15、17～23與25節中的badge／`lpbnBadgeMonth`敘述保留為當時Requirement或歷史完成紀錄，已由本註記取代。JSON仍為version 1，新JSON不輸出`lpbnBadgeMonth`，legacy欄位接受但忽略；base格式、quality、72 dpi、size／capacity contract與D renderer geometry不變，dormant module／assets仍保留。

> 階段：Phase 1－Requirement Specification
>
> 開發範圍：FSS BN 樣式 D 的正式平台整合（Type Routing → Excel Import → Workspace → Preview → Editor → Restore → Export）
>
> 狀態：Phase 1 草稿，待 Jamie／GPT Review；尚未進入 Phase 2 Repository Investigation、Phase 3 Proposal、Phase 4 Coding 或正式平台驗證
>
> 整理日期：2026-08-26
>
> 基準 HEAD：`173fcb06b4cc2d4a8e749ecaa50b58cd5335bec5`（`docs(bn): document D12 LPBN template`）

---

## 1. 文件目的與 Scope

本文件依已完成的 D Platform Integration Phase 0 Decision Lock，定義「FSS BN－D 樣式正式平台整合」的產品需求與未來驗收標準。

本輪 Scope 為：讓使用者在既有 BN 樣式選擇頁選擇 D 後，於同一套正式控制台完成「匯入正式工單 Excel 的 `D` worksheet → 建立完整 D Workspace → 切換並 Preview 01～17 → 使用既有 Editor／D－17 Modal微調 → Restore暫存 → 下載完整專案」的正式流程。

本文件只定義 Requirement，不撰寫 Proposal或implementation patch。下列既有文件為上位或引用基準，本文件不修改、不取代：

- `bn/docs/FSS_BN_Requirement_Specification_v1.0.md`
- `bn/docs/FSS_BN_A樣式平台整合_Requirement_Specification_v1.0.md`
- `bn/docs/FSS_BN_B樣式平台整合_Requirement_Specification_v1.0.md`
- `bn/docs/FSS_BN_D樣式_Requirement_Specification_v1.0.md`，尤其第16節
- `bn/docs/FSS_BN_A12_LPBN掛標_Requirement_Specification_v1.0.md`
- `bn/docs/FSS_BN_Template_Requirement_Specification_v1.0.md`
- `bn/docs/FSS_BN_Architecture.md`
- `bn/docs/FSS_BN_17版位_Type差異_Phase0整理.md`
- `bn/docs/FSS_BN_正式版位建立_SOP.md`

---

## 2. 前置完成狀態與證據邊界

**【REPOSITORY EVIDENCE】** D－01／02／03／06／07／08／09／10／12 已各自完成 D-specific renderer、launcher與assets，並經Jamie人工1:1 overlay驗證PASS；這只證明各自template視覺與對位完成。

**【JAMIE/GPT LOCKED DECISION】** D－04／05／11／13／14完整沿用各自A／B同版位的文字geometry、typography、alignment、formatting、Medium local 2×、guards與draw order，唯一D-specific視覺差異是對應D底圖。D－15／16／17完整沿用A／B同版位renderer／model行為。

**【REPOSITORY EVIDENCE／CURRENT STATE】** 目前正式平台仍只支援A／B。D Import、Restore、正式控制台Preview與Export尚未enable，任何既有D template人工PASS都不等於正式平台Preview／Export PASS。

**【FUTURE ACCEPTANCE】** 本文件中的平台行為全部須待後續獲授權的Investigation、Proposal、Coding及完整驗證後才可記為PASS。

---

## 3. Non-goals／Scope Boundary

本Requirement不得被解釋為授權下列事項：

- 修改任一A renderer的視覺規格、geometry、typography、formatting、guards或draw order。
- 修改Group A既有D-specific renderer的視覺規格或已完成Logo placement。
- 為Group B建立D-specific renderer、template、launcher或對位流程。
- 建立完整重複`D_TABLE`，或複製17份Type D routing metadata只為形式完整。
- 為統一function signature而修改Group B renderer contract。
- 建立D-specific Workspace schema、Import schema、Editor欄位、badge assets、badge resolver、threshold schema或Export matrix。
- 複製D－17的`17_主標題.png`／`17_VIP.png`到D目錄。
- 重編碼、另存、改名、移動或修改任何D asset。
- 重新設計控制台UI、CSS、Reset、Editor、Modal、Preview layout、ZIP結構或命名。
- 處理樣式C、清理stale comments或建立無直接需求的shared／generic abstraction。
- 宣稱Type D已正式支援、已完成Preview／Export或已通過Jamie平台驗證。

---

## 4. Type D 核心產品定義

- 樣式D是同一個FSS BN Generator內部的Type，不是第二個Generator或第二套控制台。
- Type D進入後繼續使用既有17個固定BN名稱、`currentType`、`selectedBnId`、Workspace、Editor、Preview、Restore及Export主流程。
- Type D與A／B的差異必須由“renderer routing”及“asset routing”明確表達；兩者是獨立概念，不得因為reuse A renderer就誤用A／B底圖。
- 未知type、未知BN id、缺renderer、缺asset、asset未就緒或intrinsic不符時必須fail-closed，不得以A、B、其他BN或第一筆entry模糊fallback。

---

## 5. 17版位正式Renderer Routing

**【JAMIE/GPT LOCKED DECISION】** 唯一正式模型是 **per-BN D override＋explicit A renderer reuse／fallback**。

### 5.1 Group A－D-specific override

Group A精確為：**01／02／03／06／07／08／09／10／12**。

- Type D且BN id命中Group A時，必須呼叫該版位現有D-specific renderer。
- 每個renderer繼續使用自身現有exports、fonts readiness、layout validation、Logo sizing、draw order與fit validation。
- 不得以A renderer取代Group A，也不得重新製作其D renderer。

### 5.2 Group B－explicit A renderer reuse

Group B精確為：**04／05／11／13／14／15／16／17**。

- Type D且BN id命中Group B時，必須明確reuse同版位A renderer。
- 04／05／11／13／14保留各自不同的canvas、background placement、文字geometry、typography、alignment、Medium local 2×、validation、guards及draw order。
- 15保留現有line1／line2及ASCII 0.5、非ASCII 1的runtime unit規則。
- 16保留leftTitle／leftCopy／rightTitle／rightCopy四欄模型。
- 17保留threshold model、dynamic geometry、warnings及Modal／Editor行為。
- 禁止為Group B建立八份無內容差異的D renderer。

### 5.3 Routing fail-closed

- Group A／B集合不得遺漏、重複或動態猜測。
- 只有精確已知Type D與精確已知BN id才可選定對應route。
- 未命中Group A／B、對應renderer不可用或contract不滿足時必須停止該次Preview／Export並呈現可理解錯誤，不得改走其他renderer。

---

## 6. Renderer Reuse 與 Asset Routing 必須分離

### 6.1 Group A assets

Group A必須使用：

- 對應`bn/assets/D/底圖/`底圖；以及
- 既有tracked共用`bn/assets/D/Logo.png`。

Group A renderer必須取得其既有Logo-aware images contract，即已載入、已decode且通過intrinsic／readiness要求的`backgroundImage`與`logoImage`。不得把Logo移入Excel、Editor、Workspace或JSON。

### 6.2 Group B assets

- 04／05／11／13／14／15／16雖然reuse A renderer，background仍必須使用`bn/assets/D/底圖/`的同版位D底圖。
- Group B不得因reuse A renderer而讀取`bn/assets/A/底圖/`或`bn/assets/B/底圖/`的對應background。
- 17不要求D asset copy；須直接使用第7節定義的canonical 17 assets。
- renderer選擇與asset來源必須分別驗證；任一錯誤不得由另一Type asset補位。

---

## 7. D－17 Canonical Assets

**【JAMIE/GPT LOCKED DECISION】** D－17直接共用目前canonical：

- `17_主標題.png`
- `17_VIP.png`

現有A／B對應文件已逐byte identical；Type D不得為了目錄形式完整而新增無內容差異的D copies。

- D－17須向既有A threshold renderer提供完整的`titleImage`／`vipImage` images contract。
- Canonical assets必須通過既有decode、intrinsic及readiness guards；失敗時fail-closed。
- 本Requirement不指定未來resolver內部路徑或常數名稱，只鎖定「不複製D assets、明確共用canonical pair」的產品結果。

---

## 8. Excel Import－Type 與 Worksheet

- Type D必須加入正式合法Import type。
- 當`currentType = "D"`時，Import必須讀取同名worksheet **`D`**。
- 不得讀取A／B／C、第一張worksheet或任何其他worksheet作為fallback。
- workbook無法解析、D worksheet不存在、validation anchors不符或必要資料不足時，Import必須整體失敗且不得破壞目前Workspace。
- D不建立另一套Import schema；D沿用A／B既有mapping與validation語意，只更換worksheet source。

正式validation anchors沿用：

| Cell | 正式期望label |
|---|---|
| `A15` | `主標 (限8字內)` |
| `A16` | `副標 (限7字內)` |
| `A17` | `保護文字 (限17字內)` |

---

## 9. D Worksheet 正式Mapping

### 9.1 01～12 shared text

| 欄位 | D worksheet cell |
|---|---|
| headline | `B15` |
| subheadline | `B16` |
| protectionText | `B17` |

- 01～12使用同一組shared text source；任一版位合法編輯後，其他01～12同步。
- `E20:E55`顯示區即使存在公式，也不是第二份Import source。

### 9.2 13～16獨立欄位

| BN | 欄位 | D worksheet cell |
|---|---|---|
| 13 | line1／line2 | `L20`／`L21` |
| 14 | line1／line2 | `L22`／`L23` |
| 15 | line1／line2 | `L24`／`L25` |
| 16 | leftTitle／leftCopy | `L26`／`L27` |
| 16 | rightTitle／rightCopy | `O26`／`O27` |

### 9.3 D－12 LPBN月份

- label位於`D15`，月份值由`E15`進入既有`lpbnBadgeMonth`。
- 此值只服務12，不屬於01～12 shared text，也不得影響其他版位。

### 9.4 D－17 threshold

| 區塊 | D worksheet cell／範圍 |
|---|---|
| 主標題 | `I29` |
| 物流欄 | `I32:M33` |
| 9組門檻名稱 | `H35`、`H37`、`H39`、`H41`、`H43`、`H45`、`H47`、`H49`、`H51` |
| 顏色／合並標示 | `I:M`各名稱列 |
| 金額 | `I:M`各名稱列下一列 |
| VIP標題／文案／CTA | `I53`／`I54`／`I55` |

不得為D重新定義threshold schema、`↑`語意、顏色validation或空slot判定。

---

## 10. Import Atomic 與 Validation 語意

- Import成功時必須一次建立可供01～17使用的完整Workspace，不得只導入當前selected BN。
- 成功後保留`currentType = "D"`與當前合法`selectedBnId`，並以新資料立即驅動當前Preview。
- Import失敗必須維持現有Workspace完整不變；不得先清空、部分寫入或留下半套D state。
- 現有validation、錯誤聚合及可理解錯誤提示語意沿用，只將D加入合法type並讓type／worksheet指稱正確。
- Excel Import不新增D-only validation，也不執行Editor banwords檢查。

---

## 11. Workspace、Reset 與 Type Switching

- D沿用既有Workspace欄位：`currentType`、`selectedBnId`、`shared`、`bnText`、`threshold`、`lpbnBadgeMonth`。
- 不新增D-only state、D-only欄位或第二套Workspace schema。
- 切換selected BN不得丟失其他版位資料，也不得改變`currentType`。
- Editor、D－17 Modal、Preview與Export均必須以Workspace為唯一正式資料source，不得從DOM反向猜測正式資料。
- Import／Restore成功時繼續採用整包atomic replace。
- Reset必須清除當前Workspace並回到既有Type選擇流程，不得保留污染下一次工作的D資料。
- 使用者重新開始其他Type工作時，D state不得污染A／B；Restore則依JSON自身type完整恢復，不受進入Restore前的Type影響。

---

## 12. Workspace JSON 與 Restore

**【JAMIE/GPT LOCKED DECISION】** Workspace JSON維持現有format、schema及 **`version: 1`**，不升版。

- `type: "D"`須加入合法type值。
- D snapshot繼續保存`selectedBnId`、`shared`、`bnText`、`threshold`、`lpbnBadgeMonth`，不得新增無需求欄位。
- Serialize必須寫入Workspace實際type，不得固定寫A／B。
- Restore成功後必須依JSON自身`type`恢復完整Workspace；合法D JSON恢復後`currentType = "D"`。
- 既有shared／bnText／threshold／lpbnBadgeMonth validation與字數規則沿用。
- Restore仍須atomic：格式、version、type或任何必要資料無效時全部reject，當前Workspace不變。
- 除A／B／D以外的未知type仍fail-closed；本Requirement不定義C Restore。

---

## 13. Editor Requirement

- D不建立D-specific Editor；欄位組合、IME保護、banwords、rollback及即時同步沿用既有正式行為。
- 01～12：headline／subheadline／protectionText，上限8／7／17 units，並保持shared同步。
- 13／14：line1／line2，上限分別5／6 units。
- 15：line1／line2，各上限3 units；ASCII每字0.5、非ASCII每字1。
- 16：leftTitle／leftCopy／rightTitle／rightCopy，各上限10 units。
- 17：右側mainTitle／vipTitle／vipCopy／vipCta及threshold Modal沿用既有A／B model與validation。
- D－17有threshold資料且被選中時，必須解除目前僅A／B可用的產品gate，使同一顆既有Editor／Modal對D可用；不得複製UI或建立D分支版本。
- 不合法或超限編輯不得寫入Workspace，也不得產生與Workspace不一致的Preview。

---

## 14. Preview 與 Renderer Contract

- Type D選定後，01～17均須能在正式控制台使用同一Preview區域呈現。
- Preview必須呼叫第5節的正式route及第6～7節的正式assets；不得使用launcher overlay、對位圖、DOM placeholder或第二套視覺renderer作為正式成品source。
- Group A必須維持既有Logo-aware images contract；caller必須提供已載入的D background與共用D Logo。
- Group B 04～16必須維持各自現有A renderer contract；禁止為了統一interface改寫renderer。
- D－17繼續使用其既有`{titleImage, vipImage}` contract及dynamic canvas height。
- Preview與Export必須同源：相同Workspace資料、相同renderer route、相同assets。
- 字型、asset load、decode、intrinsic、Canvas或layout guard失敗時不得顯示錯誤成品；必須fail-closed。
- D－17尚無threshold時沿用現有空狀態，不得構造假model。

---

## 15. D－12 LPBN Badge

**【JAMIE/GPT LOCKED DECISION】** Type D－12沿用現有LPBN badge resolver／variant chain，不建立D-specific badge assets或resolver。

- 月份來源是D worksheet `E15`，保存於既有`lpbnBadgeMonth`。
- Base `12_LPBN.jpg`永遠存在且不被overlay修改。
- 月份空白時只保留base，不建立variant。
- 已知月份沿用既有固定slot 1／2／3 mapping，最多產生三張實際可用variants。
- 缺slot時只略過缺失slot，其他slot保留正式編號，不得重新編號。
- 未知月份群組與部分缺失時的既有warning／局部降級語意沿用。
- Preview與Export必須共用同一resolver結果；不得各自維護另一套月份或slot判定。
- Badge overlays繼續共用`bn/assets/LPBN掛標/`，不得fork D目錄。

以上是平台整合Requirement；目前尚未Coding，也尚未取得D正式Preview／Export PASS。

---

## 16. D－17 Threshold／Dynamic Geometry／Modal

- D－17完整沿用A－17 threshold model、最多5個物流欄、最多9組門檻、顏色語意、`↑` merge、warnings及dynamic geometry。
- D－17 Preview與Export使用第7節canonical title／VIP assets，不建立D copies。
- D worksheet資料須建立與現有renderer及Modal兼容的同一structured model。
- D－17有資料時，既有Manual Editor／Modal對D可用；修改必須寫回同一`threshold`子樹並即時驅動Preview。
- D－17切換離開再回來、Serialize／Restore及Export都必須保留同一model語意。
- 不得修改17的geometry、renderer、Modal layout、fixed schema capacity或既有validation行為。

---

## 17. Export Matrix

**【JAMIE/GPT LOCKED DECISION】** Type D完整沿用現行BN-id based matrix，不建立D-specific export matrix：

| ID | 正式格式 | 既有特殊要求 |
|---|---|---|
| 01 | JPG | 最終≤245,000 bytes |
| 02 | JPG | 最終≤145,000 bytes |
| 03 | JPG | 無額外byte limit |
| 04 | PNG | 無額外byte limit |
| 05 | PNG | 無額外byte limit |
| 06 | JPG | 無額外byte limit |
| 07 | JPG | 無額外byte limit |
| 08 | JPG | 無額外byte limit |
| 09 | JPG | 無額外byte limit |
| 10 | PNG | 最終≤250,000 bytes |
| 11 | PNG | 無額外byte limit |
| 12 | JPG | base＋實際可用badge variants；無byte limit |
| 13 | PNG | 無額外byte limit |
| 14 | PNG | 無額外byte limit |
| 15 | JPG | 無額外byte limit |
| 16 | JPG | 無額外byte limit |
| 17 | PNG | dynamic actual height |

所有版位沿用現行72 dpi、Locked pixel dimensions及相同BN id的編碼規則；不得因Type D改變format、dimensions或限制。

---

## 18. Encoding／Capacity／Failure Policy

- 一般JPG沿用既有`JPEG_QUALITY = 1.0`語意及JPEG 72 dpi metadata處理。
- 01／02沿用既有quality floor 0.5、固定7次binary search及“以72 dpi patch後最終bytes判定”的策略；不得為D放寬限制。
- PNG沿用現有72 dpi pHYs byte-level patch，不得為D改動pixel data或尺寸。
- 10沿用native lossless → UPNG 256-color → fail的既有ladder；不得新增第三條降級路徑或提高250,000 bytes上限。
- 12 base／variants沿用JPG 72 dpi規則；不新增byte limit。
- 17以renderer實際dynamic height輸出PNG，不得固定高度或裁切。
- 任一renderer、asset、encode、DPI patch或capacity步驟失敗時，完整Export必須fail-closed，不得靜默缺件或降低A／B既有限制來讓D通過。

這些均為未來正式驗收要求；D Export目前尚未執行或驗證。

---

## 19. ZIP／Workspace JSON 交付

- ZIP命名沿用`FSS BN_MMDD.zip`。
- ZIP內Workspace JSON沿用`FSS BN_MMDD.json`，與ZIP使用同一次執行取得的MMDD。
- ZIP根層結構、17個base成品正式名稱及12可用variants命名沿用現行規則；不新增Type前綴、D目錄、manifest或第二份JSON。
- JSON必須保存`type: "D"`及完整Workspace snapshot，且維持`version: 1`。
- D－12 base與實際可用slot variants必須按既有正式名稱進入ZIP。
- D－17必須按實際dynamic geometry輸出。

---

## 20. Fail-closed／Error Safety

- Type、worksheet、BN id、renderer或asset不存在時必須明確失敗，不得fallback至A／B、其他worksheet、其他BN或第一筆資料。
- Import／Restore失敗必須atomic，目前Workspace保持不變。
- Preview失敗不得顯示上一Type、上一BN或部分錯誤Canvas冒充成功結果。
- Export失敗不得宣稱完整專案成功，也不得以放寬capacity／quality／DPI規則繼續輸出。
- 錯誤必須可理解並反映實際Type／worksheet；具體文案屬於後續Proposal最小接線，不得藉機重做UI。
- 目前Type D仍fail-closed；本Requirement文件本身不得被描述為enable D。

---

## 21. Regression Boundary

後續平台整合必須同時滿足：

- A／B現有Import、Restore、Workspace、Editor、Preview、LPBN、17 Modal、Export、capacity及ZIP／JSON行為零回歸。
- A templates全部零視覺規格修改。
- Group A九個既有D templates零視覺規格修改；其既有人工1:1 overlay PASS不被重開。
- Group B不得新增D renderer／template／launcher，也不得修改A renderer來製造D差異。
- D assets不得重編碼、另存、改名、移動或為了routing複製。
- D－17不得新增asset copies；threshold model／dynamic geometry／Modal不得修改。
- LPBN badge assets、resolver、slot mapping與composition不得為D fork。
- Workspace不得新增D-only state；JSON不得升版或新增無需求欄位。
- Export不得新增D-specific matrix或降低A／B規則。
- 樣式C完全不在範圍。
- UI／CSS不得預設改版；只有未來Proposal證明為enable既有D功能所必要的最小gate才可提出。

---

## 22. Phase 1 Acceptance Criteria（均為未來平台驗收，尚未PASS）

1. 17版位routing集合精確為Group A `01/02/03/06/07/08/09/10/12`與Group B `04/05/11/13/14/15/16/17`，無漏項、重複或模糊fallback。
2. Type D命中Group A時使用既有D-specific renderer、對應D底圖及共用D Logo，且Logo-aware images contract完整。
3. Type D命中Group B時reuse同版位A renderer；04／05／11／13／14／15／16使用對應D底圖，不誤用A／B底圖。
4. D－17 reuse A threshold renderer／model，並使用canonical `17_主標題.png`／`17_VIP.png`，未建立D copies。
5. 選擇D後Import只讀取worksheet `D`；worksheet缺失或validation不符時atomic fail且不讀取A／B／C。
6. D的01～12從`B15/B16/B17`建立shared text並維持同步。
7. D的13～16依`L20:L27`、`O26/O27`建立正確獨立欄位；15維持ASCII 0.5／非ASCII 1 unit規則。
8. D－12月份從`E15`進入`lpbnBadgeMonth`，不並入shared text。
9. D－17依`I29`、`I32:M33`、9組門檻列及`I53:I55`建立完整threshold model。
10. Import成功一次建立01～17完整Workspace；失敗不部分替換。
11. `currentType`／`selectedBnId`在Import、編輯、切換、Preview與Export中保持正確；Reset及跨Type工作無資料污染。
12. Workspace JSON維持現有format/schema及`version: 1`；D snapshot寫入`type: "D"`並可atomic Restore。
13. 未知JSON type仍fail-closed，未定義或enable樣式C。
14. 01～16既有Editor欄位、字數、IME、banwords、rollback與即時同步行為在D下可用且無D-specific欄位。
15. D－17有資料時，既有threshold Modal／Editor對D可用並寫回同一model；geometry與validation未改。
16. D－01～17均可由正式控制台Preview；Group A／B contracts不被強制統一，asset／font／intrinsic失敗時fail-closed。
17. D－12 Preview始終保留base；合法月份最多顯示3個固定slot variants，缺slot不重新編號，並與Export共用resolver。
18. D完整Export產出01～17並符合第17～18節matrix、72 dpi、quality、capacity及failure policy。
19. D－12 Export包含base與實際可用badge variants；D－17按dynamic actual height輸出。
20. ZIP／JSON命名與結構不變，JSON保存`type: "D"`且version仍1。
21. 未建立完整`D_TABLE`、Group B D renderer／launcher、D-only Workspace／Import／Editor／badge／Export系統或D－17 asset copies。
22. A／B全部正式行為、A templates與Group A既有D視覺輸出零回歸。
23. Type D在完成Coding及完整驗證前不得宣稱正式支援；九個D template人工PASS不得誤寫成控制台Preview／Export PASS。
24. 樣式C、stale comments、UI改版與無需求shared／generic refactor均未進入scope。

---

## 23. Phase Boundary／Decision Completeness

本文件已承接並固定Phase 0全部產品決策：

- per-BN D override＋explicit A renderer reuse；
- Group A／B精確集合；
- D－17 canonical assets；
- D－12沿用現有badge chain；
- D Export沿用BN-id matrix；
- Workspace JSON維持version 1並接受`type: "D"`。

上述事項不得在後續文件重新寫成Open Question。真正尚未完成的是技術調查、Proposal、Coding與驗證，不是產品需求裁決。

本輪只完成Phase 1 Requirement；未執行Phase 2 Repository Investigation、Phase 3 Proposal、Phase 4 Coding、Preview、Export、AI Verification、Jamie平台驗證、Stage或Commit。完成本文件後必須停止等待Jamie／GPT Review。

---

## 24. 修改邊界

- 本輪只允許建立本Requirement；現有`FSS_BN_D樣式_Requirement_Specification_v1.0.md` §16保持逐byte不變。
- 不修改任何其他docs、Code、HTML、CSS、JS、JSON、template、launcher、viewer、asset、font、Excel或Git config。
- 後續只有在Jamie／GPT明確授權且遵守固定Phase流程後，才可進入下一階段。
- 若未來發現本Requirement與LOCKED架構或已PASS行為有真正衝突，必須停止並交Jamie／GPT裁決，不得自行改變已LOCKED需求或以Coding繞過。

---

## 25. Implementation／Verification／Code Commit Outcome

> **【CURRENT COMPLETION RECORD】** 本節記錄本Requirement的實際完成結果，不改寫第1～24節在各Phase成立的歷史敘述。前文「目前Type D仍fail-closed」「尚未Coding／驗證」與Acceptance Criteria「均為未來」已由本節實證完成狀態取代。

### 25.1 Implementation 與 commit scope

D樣式正式平台整合已由 Code Commit **`e31f7be0b73fcca6db59bae693137f8fe8a8a329`**（`feat(bn): integrate D style into generator`，parent `173fcb06b4cc2d4a8e749ecaa50b58cd5335bec5`）落地。Commit精確為 **10 paths＝3 M＋7 A**：

- `M bn/js/import.js`
- `M bn/js/render-a.js`
- `M bn/js/app.js`
- `A bn/assets/D/底圖/04_Loyalty BN.png`
- `A bn/assets/D/底圖/05_MSBN.png`
- `A bn/assets/D/底圖/11_Line OA.png`
- `A bn/assets/D/底圖/13_Skinny BN_APP.png`
- `A bn/assets/D/底圖/14_Skinny BN_PC.png`
- `A bn/assets/D/底圖/15_AR.jpg`
- `A bn/assets/D/底圖/16_副區.jpg`

`export.js`、`workspace.js`、`lpbn-badges.js`、`editor.js`、`index.html`、CSS、A templates、九個既有D templates、launchers、viewer、D Logo、canonical 17 assets、badge assets、fonts與vendor均不在該Code Commit且zero-diff。

### 25.2 Requirement 落地結果

- Routing採稀疏`D_OVERRIDE_TABLE`＋精確Group B allow-list。Group A精確為`01/02/03/06/07/08/09/10/12`，使用既有D renderer、D底圖及共用D Logo；Group B精確為`04/05/11/13/14/15/16/17`，reuse同ID A renderer，04～16使用D底圖，17使用A threshold renderer／model及canonical A 17 assets。
- 未建立完整`D_TABLE`、Group B D renderer／template／launcher或D－17 asset copies；Group A override遺失、未知type／BN id、缺必要asset／renderer仍fail-closed。
- Import／Restore allow-list已為A／B／D；D只讀worksheet `D`並沿用既有mapping、E15、threshold parser、validation與atomic replace。Workspace JSON維持`FSS BN Workspace` version 1並接受／保存`type:"D"`。
- Editor沿用BN-id模型；D－17 threshold Editor／Modal gate已納入D，D－15 unit算法、D－16四欄模型及D－17 dynamic model均保持。
- D－12已正式沿用既有LPBN resolver／variant chain：base保留、最多三個固定slots、缺slot不重新編號，Preview與Export同源。
- D Export沿用第17～19節既有BN-id matrix、72 dpi、一般JPG quality 1.0及01／02／10容量策略；ZIP內JSON保存D type。`export.js`因central renderer可自然支援D而維持zero-diff。

### 25.3 Runtime assets integrity

七張已納管runtime底圖之HEAD實證如下：

| Path | bytes | SHA-256 |
|---|---:|---|
| `bn/assets/D/底圖/04_Loyalty BN.png` | 95,172 | `6abe8300b2d7a4d1e1527df6d27c3dd489ed98fc330ef409d637073829de4262` |
| `bn/assets/D/底圖/05_MSBN.png` | 244,560 | `b0936beb957afc76f620d400c58e106cd0798127295b072df4b0259dbde32b11` |
| `bn/assets/D/底圖/11_Line OA.png` | 520,378 | `0a42091e6066b3626cd3aba795c52c6e28cd2ac70d88b423d818c2a2bfa2dd76` |
| `bn/assets/D/底圖/13_Skinny BN_APP.png` | 92,682 | `a76acfa43ca73b63f829b6c08947071ba03302f9bd4bf4293e460233590ac016` |
| `bn/assets/D/底圖/14_Skinny BN_PC.png` | 28,854 | `0c0b56d6d0d708105edd37a9b97db1ebcb111ac5b1e10ae2f100f2a38948dc18` |
| `bn/assets/D/底圖/15_AR.jpg` | 897 | `d5098b9dfea1e53e3c60a406f5ffd9e3f04291dbbfc51ac8f1217dfb8de9a136` |
| `bn/assets/D/底圖/16_副區.jpg` | 21,629 | `12902843ca43ffc7f1c89669514afa8477675406f96dab4f9b8819f11ba9506e` |

七張`bn/assets/D/對位/` 04／05／11／13／14／15／16圖未被runtime引用、未進Code Commit，仍為untracked人工校稿／evidence素材。

### 25.4 Verification status

Phase 5 static／programmatic verification已PASS；Jamie其後已完成正式控制台Manual Verification並明確 **PASS**。此PASS涵蓋D平台整合結果，與Group A各template launcher的人工1:1 overlay PASS不同；不是Push／Tag／Release PASS。Type D現在已正式enable，前文deferred的D－12 badge與D Export平台行為已依本Requirement落地並通過Manual Verification；樣式C仍未定義或enable。
