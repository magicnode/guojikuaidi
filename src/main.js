// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueScroller from 'vue-scroller'
import { WechatPlugin, Group, Cell, ConfirmPlugin, Tab, TabItem, ToastPlugin, LoadingPlugin } from 'vux'

import router from './router'
import store from './store'
import App from './App'
import AxiosPlugin from './plugins/axios'
import * as filters from './filters'
import Header from './components/Header.vue'
import SendItem from './components/SendItem.vue'
import OrderItem from './components/OrderItem.vue'
import MJSpinner from './components/MJSpinner.vue'
import StepLocationPicker from './components/StepLocationPicker.vue'

import window from 'window'

FastClick.attach(document.body)

Vue.use(VueScroller)
Vue.use(AxiosPlugin)
Vue.use(WechatPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

Vue.config.productionTip = false

Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('tab', Tab)
Vue.component('tabItem', TabItem)
Vue.component('mj-header', Header)
Vue.component('mj-spinner', MJSpinner)
Vue.component('mj-senditem', SendItem)
Vue.component('mj-orderitem', OrderItem)
Vue.component('step-location', StepLocationPicker)

function SwitchfullPath (fullPath) {
  let page = ''
  switch (fullPath) {
    case '/send':
      page = 2
      break
    case '/usercenter':
      page = 3
      break
    default:
      page = 3
      break
  }
  return page
}

router.beforeEach(function (to, from, next) {
  // login auth
  const local = window.localStorage
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (process.env.NODE_ENV !== 'development') {
      // 生产环境验证登录码是否过期
      const expire = local.getItem('mj_expire') || JSON.stringify({'expire': '0'})
      if (!expire || JSON.parse(expire)['expire'] <= (new Date().getTime())) {
        local.clear()
        const fullPath = to.fullPath
        const page = SwitchfullPath(fullPath)
        return next({
          path: '/init',
          query: { page }
        })
      }
    }
    // 时间戳未过期，进行下一步验证
    const openid = local.getItem('mj_openid')
    const userid = local.getItem('mj_userId')
    const token = local.getItem('mj_token')
    if (!openid || userid === '' || !userid || !token) {
      const fullPath = to.fullPath
      const page = SwitchfullPath(fullPath)
      return next({
        path: '/init',
        query: { page }
      })
    }
  }
  return next()
})

router.afterEach((to, from) => {
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
