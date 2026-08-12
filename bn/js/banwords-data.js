// 由 FSS 根目錄 banwords.xlsx 的「禁用語」工作表產生，重新生成即可替換。
// 正式來源為 banwords.xlsx；請勿手動維護此衍生資料。
export const BANWORD_RULES = Object.freeze([
  {
    "row": 2,
    "keyword": "撒",
    "replacement": "灑",
    "exclude": "",
    "message": "請改成\"灑\""
  },
  {
    "row": 3,
    "keyword": "購物金",
    "replacement": "優惠券",
    "exclude": "",
    "message": "請改成\"優惠券\""
  },
  {
    "row": 4,
    "keyword": "抵用券",
    "replacement": "優惠券",
    "exclude": "",
    "message": "請改成\"優惠券\""
  },
  {
    "row": 5,
    "keyword": "折價券",
    "replacement": "優惠券",
    "exclude": "",
    "message": "請改成\"優惠券\""
  },
  {
    "row": 6,
    "keyword": "蝦皮券",
    "replacement": "優惠券",
    "exclude": "",
    "message": "請改成\"優惠券\""
  },
  {
    "row": 7,
    "keyword": "蝦幣券",
    "replacement": "優惠券",
    "exclude": "",
    "message": "請改成\"優惠券\""
  },
  {
    "row": 8,
    "keyword": "折扣券",
    "replacement": "優惠券",
    "exclude": "",
    "message": "請改成\"優惠券\""
  },
  {
    "row": 9,
    "keyword": "$蝦幣",
    "replacement": "蝦幣",
    "exclude": "",
    "message": "蝦幣前後勿放$符號"
  },
  {
    "row": 10,
    "keyword": "蝦幣$",
    "replacement": "蝦幣",
    "exclude": "",
    "message": "蝦幣前後勿放$符號"
  },
  {
    "row": 11,
    "keyword": "\\$\\d+\\s*蝦幣",
    "replacement": "蝦幣",
    "exclude": "",
    "message": "蝦幣前後勿放$符號"
  },
  {
    "row": 12,
    "keyword": "元",
    "replacement": "",
    "exclude": "萬元、百元、千元，元祖",
    "message": "避免用\"元\"，金額請用$符號"
  },
  {
    "row": 13,
    "keyword": "蝦幣*元",
    "replacement": "",
    "exclude": "",
    "message": "蝦幣後勿加元"
  },
  {
    "row": 14,
    "keyword": "*元蝦幣",
    "replacement": "",
    "exclude": "",
    "message": "勿使用元，金額請使用\"$\"符號取代"
  },
  {
    "row": 15,
    "keyword": "*倍蝦幣",
    "replacement": "",
    "exclude": "",
    "message": "蝦幣不用倍數呈現，請改用\"%\"取代"
  },
  {
    "row": 16,
    "keyword": "賺",
    "replacement": "",
    "exclude": "賺錢、賺到、賺翻、賺爛",
    "message": "避免使用任何可能使蝦幣看起來有金錢價值的用語"
  },
  {
    "row": 17,
    "keyword": "賺取",
    "replacement": "",
    "exclude": "",
    "message": "避免使用任何可能使蝦幣看起來有金錢價值的用語"
  },
  {
    "row": 18,
    "keyword": "賣蝦幣",
    "replacement": "",
    "exclude": "",
    "message": "避免使用任何可能使蝦幣看起來有金錢價值的用語"
  },
  {
    "row": 19,
    "keyword": "up",
    "replacement": "起",
    "exclude": "",
    "message": "up改用中文字\"起\""
  },
  {
    "row": 20,
    "keyword": "商城狂購節",
    "replacement": "",
    "exclude": "",
    "message": "避免使用蝦皮站上活動名稱"
  },
  {
    "row": 21,
    "keyword": "蝦皮吃貨節",
    "replacement": "",
    "exclude": "",
    "message": "避免使用蝦皮站上活動名稱"
  },
  {
    "row": 22,
    "keyword": "蝦皮中元節",
    "replacement": "",
    "exclude": "",
    "message": "避免使用蝦皮站上活動名稱"
  },
  {
    "row": 23,
    "keyword": "蝦皮時尚週",
    "replacement": "",
    "exclude": "",
    "message": "避免使用蝦皮站上活動名稱"
  },
  {
    "row": 24,
    "keyword": "18號",
    "replacement": "",
    "exclude": "",
    "message": "避免使用蝦皮站上活動名稱"
  },
  {
    "row": 25,
    "keyword": "25號",
    "replacement": "",
    "exclude": "",
    "message": "避免使用蝦皮站上活動名稱"
  },
  {
    "row": 26,
    "keyword": "18節",
    "replacement": "",
    "exclude": "",
    "message": "避免使用蝦皮站上活動名稱"
  },
  {
    "row": 27,
    "keyword": "25節",
    "replacement": "",
    "exclude": "",
    "message": "避免使用蝦皮站上活動名稱"
  },
  {
    "row": 28,
    "keyword": "最強",
    "replacement": "超",
    "exclude": "",
    "message": "避免使用\"最\"字，無法證明最高級，請改成\"超\""
  },
  {
    "row": 29,
    "keyword": "最便宜",
    "replacement": "超",
    "exclude": "",
    "message": "避免使用\"最\"字，無法證明最高級，請改成\"超\""
  },
  {
    "row": 30,
    "keyword": "最低價",
    "replacement": "超",
    "exclude": "",
    "message": "避免使用\"最\"字，無法證明最高級，請改成\"超\""
  },
  {
    "row": 31,
    "keyword": "最優惠",
    "replacement": "超",
    "exclude": "",
    "message": "避免使用\"最\"字，無法證明最高級，請改成\"超\""
  },
  {
    "row": 32,
    "keyword": "最大牌",
    "replacement": "超",
    "exclude": "",
    "message": "避免使用\"最\"字，無法證明最高級，請改成\"超\""
  },
  {
    "row": 33,
    "keyword": "最佳",
    "replacement": "",
    "exclude": "",
    "message": "避免使用\"最佳\"，無法證明最高級"
  },
  {
    "row": 34,
    "keyword": "最大品牌",
    "replacement": "超",
    "exclude": "",
    "message": "避免使用\"最\"字，無法證明最高級，請改成\"超\""
  },
  {
    "row": 35,
    "keyword": "效果最好",
    "replacement": "超",
    "exclude": "",
    "message": "避免使用\"最\"字，無法證明最高級，請改成\"超\""
  },
  {
    "row": 36,
    "keyword": "年度最強",
    "replacement": "超",
    "exclude": "",
    "message": "避免使用\"最\"字，無法證明最高級，請改成\"超\""
  },
  {
    "row": 37,
    "keyword": "競網最便宜",
    "replacement": "超",
    "exclude": "",
    "message": "避免使用\"最\"字，無法證明最高級，請改成\"超\""
  },
  {
    "row": 38,
    "keyword": "獨家",
    "replacement": "",
    "exclude": "",
    "message": "需確認只有蝦皮獨家，非其他網家也有相同/類似活動，避免產生法務及客訴疑慮"
  },
  {
    "row": 39,
    "keyword": "第一",
    "replacement": "",
    "exclude": "",
    "message": "避免使用No1，因蝦皮無法證明第一名，需廠商提供更多資訊確認"
  },
  {
    "row": 40,
    "keyword": "No1",
    "replacement": "",
    "exclude": "",
    "message": "避免使用No1，因蝦皮無法證明第一名，需廠商提供更多資訊確認"
  },
  {
    "row": 41,
    "keyword": "No.1",
    "replacement": "",
    "exclude": "",
    "message": "避免使用No1，因蝦皮無法證明第一名，需廠商提供更多資訊確認"
  },
  {
    "row": 42,
    "keyword": "專屬",
    "replacement": "限定",
    "exclude": "",
    "message": "請改成\"屬於、限定\""
  },
  {
    "row": 43,
    "keyword": "VIP",
    "replacement": "限定",
    "exclude": "",
    "message": "請改成\"屬於、限定\""
  },
  {
    "row": 44,
    "keyword": "拚",
    "replacement": "拼",
    "exclude": "",
    "message": "請改成\"拼\""
  },
  {
    "row": 45,
    "keyword": "卷",
    "replacement": "券",
    "exclude": "",
    "message": "請改成\"券\""
  },
  {
    "row": 46,
    "keyword": "周",
    "replacement": "週",
    "exclude": "周邊",
    "message": "請改成\"週\""
  },
  {
    "row": 47,
    "keyword": "千",
    "replacement": "",
    "exclude": "滿千、折千、千萬",
    "message": "\"千\"請改用阿拉伯數字呈現"
  },
  {
    "row": 48,
    "keyword": "仟",
    "replacement": "",
    "exclude": "滿仟、折仟",
    "message": "\"仟\"請改用阿拉伯數字呈現"
  },
  {
    "row": 49,
    "keyword": "百",
    "replacement": "",
    "exclude": "德國百靈、百萬、滿百、折百、百元",
    "message": "\"百\"請改用阿拉伯數字呈現"
  },
  {
    "row": 50,
    "keyword": "~",
    "replacement": "-",
    "exclude": "",
    "message": "日期的\"~\" 請改成\"-\"並且確認符號前後要有空白區隔"
  },
  {
    "row": 51,
    "keyword": "!",
    "replacement": "",
    "exclude": "",
    "message": "請勿使用!符號"
  },
  {
    "row": 52,
    "keyword": "?",
    "replacement": "",
    "exclude": "",
    "message": "請勿使用?符號"
  },
  {
    "row": 53,
    "keyword": "=+",
    "replacement": "",
    "exclude": "",
    "message": "請勿使用+符號"
  },
  {
    "row": 54,
    "keyword": ".",
    "replacement": "",
    "exclude": "",
    "message": "請勿使用.符號"
  },
  {
    "row": 55,
    "keyword": "\"",
    "replacement": "",
    "exclude": "",
    "message": "請勿使用\"符號"
  },
  {
    "row": 56,
    "keyword": "一",
    "replacement": "1",
    "exclude": "一級、一站搞定、一級節能、一級能效、均一價、一日限定、星期一、一日、一鍵、一次、一代",
    "message": "\"一\"請改用阿拉伯數字呈現"
  },
  {
    "row": 57,
    "keyword": "二",
    "replacement": "2",
    "exclude": "星期二、二代、不二",
    "message": "\"二\"請改用阿拉伯數字呈現"
  },
  {
    "row": 58,
    "keyword": "三",
    "replacement": "3",
    "exclude": "三星、三麗鷗、三得利、三槍牌、三菱、星期三、三代",
    "message": "\"三\"請改用阿拉伯數字呈現"
  },
  {
    "row": 59,
    "keyword": "四",
    "replacement": "4",
    "exclude": "星期四、四季、四代",
    "message": "\"四\"請改用阿拉伯數字呈現"
  },
  {
    "row": 60,
    "keyword": "五",
    "replacement": "5",
    "exclude": "黑五、星期五、五代、五木",
    "message": "\"五\"請改用阿拉伯數字呈現"
  },
  {
    "row": 61,
    "keyword": "六",
    "replacement": "6",
    "exclude": "星期六、六代",
    "message": "\"六\"請改用阿拉伯數字呈現"
  },
  {
    "row": 62,
    "keyword": "七",
    "replacement": "7",
    "exclude": "七星、七代、七夕",
    "message": "\"七\"請改用阿拉伯數字呈現"
  },
  {
    "row": 63,
    "keyword": "八",
    "replacement": "8",
    "exclude": "八代",
    "message": "\"八\"請改用阿拉伯數字呈現"
  },
  {
    "row": 64,
    "keyword": "九",
    "replacement": "9",
    "exclude": "九代",
    "message": "\"九\"請改用阿拉伯數字呈現"
  },
  {
    "row": 65,
    "keyword": "十",
    "replacement": "10",
    "exclude": "十全、十美、十代",
    "message": "\"十\"請改用阿拉伯數字呈現"
  },
  {
    "row": 66,
    "keyword": "劵",
    "replacement": "券",
    "exclude": "",
    "message": ""
  },
  {
    "row": 67,
    "keyword": "兩",
    "replacement": "2",
    "exclude": "",
    "message": ""
  }
]);
