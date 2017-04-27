let url = 'http://192.168.0.201:8890/WeChatService/'
if (process.env.NODE_ENV !== 'development') {
  url = 'http://192.168.0.201:8890/WeChatService/'
}

export const address = {
  index: url + 'findAddress',
  add: url + 'insertAddress',
  update: url + 'updateAddress',
  delete: url + 'deleteAddress',
  check: url + 'check'
}
