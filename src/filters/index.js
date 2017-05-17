export const addOne = function (num) {
  return Number(num) + 1
}

export const sendstatus = function (val) {
  // 状态1.等待接单，2.中转中，3.已派送，4.已签收 5. 已取消
  const sendsta = {
    1: '待接单',
    2: '中转中',
    3: '已派送',
    4: '已签收',
    5: '已取消'
  }
  return sendsta[val]
}

export const pickupstatus = function (val) {
  // 状态1.等待接单，2.中转中，3.已派送，4.已签收
  const sendsta = {
    1: '待接单',
    2: '中转中',
    3: '已派送',
    4: '已签收'
  }
  return sendsta[val]
}

export const formatdate = function (date) {
  date = new Date(date)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month > 10 ? month : '0' + month
  let day = date.getDate()
  day = day > 10 ? day : '0' + day
  return year + '-' + month + '-' + day
}

export const formatedatestamp = function (timpstamp) {
  if (!timpstamp) {
    return ''
  }
  let date = new Date(Number(timpstamp))
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month > 10 ? month : '0' + month
  let day = date.getDate()
  day = day > 10 ? day : '0' + day
  let h = date.getHours() + ':'
  let m = date.getMinutes() + ':'
  let s = date.getSeconds()
  return year + '-' + month + '-' + day + ' ' + h + m + s
}

const BRAND_TYPE = {
  '0': '全部品牌',
  '2': '优速',
  '3': '龙邦',
  '4': '速尔',
  '5': '快捷',
  '6': '全峰',
  '7': '百世快递',
  '8': '天天',
  '9': '中通',
  '11': '申通',
  '12': '圆通',
  '14': 'EMS',
  '15': '国通',
  '16': '蚂蚁帮',
  '17': '邮政小包',
  '18': '宅急送',
  '19': '跨越',
  '20': '京东',
  '21': '达达',
  '22': '万象',
  '23': '妙寄',
  '24': '中铁',
  '27': '品骏',
  '26': '安能',
  '28': '日日顺',
  '29': '如风达',
  '10': '韵达',
  '13': '顺丰',
  '71': '高铁快运'
}

const BRAND_IMG = {
  '0': '全部品牌',
  '2': './static/imgs/expresslogo/yousu.png',
  '3': './static/imgs/expresslogo/longbang.png',
  '4': './static/imgs/expresslogo/suer.png',
  '5': './static/imgs/expresslogo/kuaijie.png',
  '6': './static/imgs/expresslogo/quanfeng.png',
  '7': './static/imgs/expresslogo/baishi.png',
  '8': './static/imgs/expresslogo/tiantian.png',
  '9': './static/imgs/expresslogo/zhongtong.png',
  '10': './static/imgs/expresslogo/yunda.png',
  '11': './static/imgs/expresslogo/shentong.png',
  '12': './static/imgs/expresslogo/yuantong.png',
  '13': './static/imgs/expresslogo/shunfeng.png',
  '14': './static/imgs/expresslogo/ems.png',
  '15': './static/imgs/expresslogo/guotong.png',
  '16': './static/imgs/expresslogo/mayibang.png',
  '17': './static/imgs/expresslogo/yuancheng.png',
  '18': './static/imgs/expresslogo/zhaijisong.png',
  '19': './static/imgs/expresslogo/kuayue.png',
  '20': './static/imgs/expresslogo/jingdong.png',
  '21': './static/imgs/expresslogo/dada.png',
  '22': './static/imgs/expresslogo/wanxiang.png',
  '23': './static/imgs/expresslogo/miaoji.png',
  '24': './static/imgs/expresslogo/zhongtie.png',
  '27': './static/imgs/expresslogo/pinjun.png',
  '26': './static/imgs/expresslogo/anneng.png',
  '28': './static/imgs/expresslogo/ririshun.png',
  '29': './static/imgs/expresslogo/rufengda.png',
  '71': './static/imgs/expresslogo/gaotiekuaiyun.png'
}

export const brandtype = function (val) {
  if (!val) {
    return BRAND_TYPE['0']
  }
  val = val.toString()
  if (!BRAND_TYPE[val]) {
    return '快递'
  }
  return BRAND_TYPE[val]
}

export const brandimg = function (val) {
  return BRAND_IMG[val]
}

export const pickupstate = function (val) {
  const states = {
    0: '等待数据',
    1: '成功',
    2: '未接听',
    3: '空号',
    4: '线路故障',
    5: '失败',
    101: '待取件',
    102: '上架',
    103: '分派',
    301: '已经签收',
    302: '退回',
    201: '问题件'
  }
  return states[val]
}
