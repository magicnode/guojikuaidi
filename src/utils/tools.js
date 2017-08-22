/**
 * [从json中获取与传入条件相等的元素]
 * @param  {[Object]} obj [传入的json]
 * @param  {[String]} id  [需要的条件]
 * @return {[String]}     [description]
 */
export const getNameById = function (obj, id) {
  let newobj = ''
  Object.keys(obj).forEach((elem, index) => {
    if (obj[elem]['id'] === Number(id)) {
      newobj = obj[elem]
    }
  })
  return newobj['name']
}

/**
 * [js正则验证手机号 15位数字+'+'+'-']
 * @param  {[String]} num  [传入的手机号]
 * @param  {[String]} type [预留字段，以后区分国内和国外手机号，不传则同时验证]
 * @return {[Boolean]}      [description]
 */
export const checkMobile = function (num, type) {
  const regFor = /^\+?\d{2,4}-?\d{10,11}$/
  const regCN = /^1(3|4|5|7|8|9|6)\d{9}$/
  return regFor.test(num) || regCN.test(num)
}

export const checkPostcode = function (num) {
  // 邮编“数字”+“英文”+“-”共10位
  // 起始数字不能为0，然后是5个数字  [1-9]\d{5} 国内邮编
  const regCN = /^[1-9]\d{5}$/g
  const regUSA = /\d{5}-\d{4}|\d{5}/
  const regFor = /^\w{0,5}-?\d{4,6}$/g
  return regFor.test(num) || regCN.test(num) || regUSA.test(num)
}

export const checkSpechars = function (str) {
  const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
  return pattern.test(str)
}
