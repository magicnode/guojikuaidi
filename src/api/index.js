// 吴聪
// let url = 'http://1a699l6063.imwork.net/WeChatService/'
// 董浩伟
let url = 'http://192.168.0.225:8080/DHL/'
// 仝舟
// let url = 'http://192.168.0.125:8066/'
// online app 云端服务
// let url = 'http://app.quandikeji.com/WeChatService/'

if (process.env.NODE_ENV !== 'development') {
  url = 'http://app.quandikeji.com/WeChatService/'
}

export const pic = {
  qr: url + 'pic',
  pickupqr: url + 'signpic'
}

export const address = {
  index: url + 'Mailingaddress/ShowMailingaddressuserid',
  send: url + 'Mailingaddress/ShowMailingaddressuserid',
  pickup: url + 'Consigneeaddress/ShowConsigneeaddressuserid',
  add: url + 'insertAddress',
  update: url + 'updateAddress',
  delete: url + 'deleteAddress',
  checked: url + 'checked',
  default: url + 'GETADDRESSDEFAULT',
  officelocation: url + 'FindStationInfo'
}

export const geography = {
  showcountry: url + 'Country/ShowCountry',
  showprovince: url + 'Province/ShowProvinceid',
  showcity: url + 'City/ShowCityid',
  showcounty: url + 'County/ShowCountyid'
}

export const send = {
  index: url + 'findSend',
  create: url + 'OrderInfo/InsertOrderInfo',
  cancle: url + 'end_send'
}

export const brand = {
  index: url + 'allbrand'
}

export const site = {
  location: url + 'COORDINATES'
}

export const pickup = {
  sign: url + 'TAKECOURIERSIGN',
  wait: url + 'TAKECOURIER',
  all: url + 'ALLDELIVERY'
}

export const user = {
  gettoken: function (code, params) {
    return url + 'GetAccessToken?code=' + code + '&params=' + params
  },
  sendsms: url + 'User/ShowranCode',
  bindphone: url + 'User/AddUserPhone',
  getuserinfo: url + 'UserInfo',
  getwebopenid: url + 'UserOpenId'
}

export const wx = {
  webtoken1: function (AppId, secret, code) {
    const url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + AppId + '&secret=' + secret + '&code=' + code + '&grant_type=authorization_code'
    return url
  },
  webtoken: 'https://api.weixin.qq.com/sns/oauth2/access_token'
}

export const express = {
  // url = url + 'brand=' + brand + '&orderSn=' + orderSn
  route: 'http://app.quandikeji.com:8088/quandiExpressSite1.4.0/Logistics/queryLogisticsInfoForJson'
}

// 杂项
export const sundry = {
  cargotype: url + 'Cargotype/ShowCargotype'
}
