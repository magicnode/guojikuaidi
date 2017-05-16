// wu
// let url = 'http://1a699l6063.imwork.net/WeChatService/'
// xiao
// let url = 'http://171n12404g.imwork.net/WeChatService/'
// online
let url = 'http://app.quandikeji.com/WeChatService/'

if (process.env.NODE_ENV !== 'development') {
  url = 'http://app.quandikeji.com/WeChatService/'
}

export const pic = {
  qr: url + 'pic'
}

export const address = {
  index: url + 'findAddress',
  add: url + 'insertAddress',
  update: url + 'updateAddress',
  delete: url + 'deleteAddress',
  checked: url + 'checked',
  default: url + 'GETADDRESSDEFAULT',
  officelocation: url + 'FindStationInfo'
}

export const send = {
  index: url + 'findSend',
  create: url + 'insertSend'
}

export const brand = {
  index: url + 'allbrand'
}

export const site = {
  location: url + 'COORDINATES'
}

export const pickup = {
  sign: url + 'TAKECOURIERSIGN',
  wait: url + 'TAKECOURIER'
}

export const user = {
  gettoken: function (code, params) {
    return url + 'GetAccessToken?code=' + code + '&params=' + params
  },
  sendsms: url + 'GetRanCode',
  bindphone: url + 'Binding',
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
