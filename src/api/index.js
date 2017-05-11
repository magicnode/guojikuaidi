let url = 'http://192.168.0.201:8890/WeChatService/'
if (process.env.NODE_ENV !== 'development') {
  url = 'http://192.168.0.201:8890/WeChatService/'
}

let urlW = 'http://1a699l6063.imwork.net/WeChatService/'
if (process.env.NODE_ENV !== 'development') {
  urlW = 'http://1a699l6063.imwork.net/WeChatService/'
}

export const address = {
  index: url + 'findAddress',
  add: url + 'insertAddress',
  update: url + 'updateAddress',
  delete: url + 'deleteAddress',
  checked: url + 'checked',
  default: url + 'GETADDRESSDEFAULT'
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
    return urlW + 'GetAccessToken?code=' + code + '&params=' + params
  },
  sendsms: urlW + 'GetRanCode',
  bindphone: urlW + 'Binding',
  getuserinfo: urlW + 'UserInfo'
}

export const wx = {
  webtoken1: function (AppId, secret, code) {
    const url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + AppId + '&secret=' + secret + '&code=' + code + '&grant_type=authorization_code'
    return url
  },
  webtoken: 'https://api.weixin.qq.com/sns/oauth2/access_token'
}
