// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import { WechatPlugin, Group, Cell, ConfirmPlugin } from 'vux'

import router from './router'
import store from './store'
import App from './App'

FastClick.attach(document.body)

Vue.use(WechatPlugin)
Vue.use(ConfirmPlugin)

Vue.config.productionTip = false

Vue.component('group', Group)
Vue.component('cell', Cell)

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach((to, from) => {
  store.commit('updateLoadingStatus', {isLoading: false})
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
