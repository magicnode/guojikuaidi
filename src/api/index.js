// 董浩伟
let url = 'http://192.168.0.225:8080/DHL/'
// 仝舟
// let url = 'http://192.168.0.125:8066/'
// online app 云端服务 Wechat
// let url = 'http://api.didalive.net/DHL/'

if (process.env.NODE_ENV !== 'development') {
  url = 'http://api.didalive.net/DHL/'
}

export const pic = {
  qr: url + 'wx/pic',
  pickupqr: url + 'wx/signpic'
}

export const address = {
  index: url + 'wx/Mailingaddress/ShowMailingaddressuserid',
  send: url + 'wx/Mailingaddress/ShowMailingaddressuserid',
  pickup: url + 'wx/Consigneeaddress/ShowConsigneeaddressuserid',
  addsend: url + 'wx/Mailingaddress/InsertMailingaddress',
  addpickup: url + 'wx/Consigneeaddress/InsertConsigneeaddress',
  updatesend: url + 'wx/Mailingaddress/UpdateMailingaddress',
  updatepickup: url + 'wx/Consigneeaddress/UpdateConsigneeaddress',
  delete: url + 'wx/deleteAddress',
  checked: url + 'wx/checked',
  default: url + 'wx/GETADDRESSDEFAULT',
  officelocation: url + 'wx/FindStationInfo'
}

export const geography = {
  showcountry: url + 'wx/Country/ShowCountry',
  showprovince: url + 'wx/Province/ShowProvinceid',
  showcity: url + 'wx/City/ShowCityid',
  showcounty: url + 'wx/County/ShowCountyid'
}

export const send = {
  index: url + 'wx/findSend',
  create: url + 'wx/OrderInfo/InsertOrderInfo',
  cancle: url + 'wx/end_send'
}

export const brand = {
  index: url + 'wx/allbrand'
}

export const site = {
  location: url + 'wx/COORDINATES'
}

export const pickup = {
  sign: url + 'wx/TAKECOURIERSIGN',
  wait: url + 'wx/TAKECOURIER',
  all: url + 'wx/ALLDELIVERY'
}

export const user = {
  gettoken: function (code, params) {
    return url + 'wx/GetAccessToken?code=' + code + '&params=' + params
  },
  sendsms: url + 'wx/User/ShowranCode',
  bindphone: url + 'wx/User/AddUserPhone',
  getuserinfo: url + 'login/wxLogin',
  getwebopenid: 'http://app.quandikeji.com/WeChatService/UserOpenId'
}

export const wx = {
  webtoken1: function (AppId, secret, code) {
    const url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + AppId + '&secret=' + secret + '&code=' + code + '&grant_type=authorization_code'
    return url
  },
  webtoken: 'https://api.weixin.qq.com/sns/oauth2/access_token',
  jssdk: url + 'getWxConfig/',
  wxpay: url + 'pay'
}

export const express = {
  // url = url + 'wx/brand=' + brand + '&orderSn=' + orderSn
  route: 'http://app.quandikeji.com:8088/quandiExpressSite1.4.0/Logistics/queryLogisticsInfoForJson'
}

// 杂项
export const sundry = {
  cargotype: url + 'wx/Cargotype/ShowCargotype'
}

// 价格查询
export const price = {
  order: url + 'wx/Price/ShowPrice'
}

export const order = {
  list: url + 'wx/OrderInfo/ShowOrderInfo',
  update: url + 'wx/OrderInfo/UpdateOrderInfostarte',
  updatenumber: url + 'wx/OrderInfo/Updateserialnumberstarte',
  detail: url + 'wx/OrderInfo/ShowOrderInfoid'
}
