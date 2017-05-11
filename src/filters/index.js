export const addOne = function (num) {
  return Number(num) + 1
}

export const sendstatus = function (val) {
  // 状态1.等待接单，2.中转中，3.已派送，4.已签收
  const sendsta = {
    1: '等待接单',
    2: '中转中',
    3: '已派送',
    4: '已签收'
  }
  return sendsta[val]
}
