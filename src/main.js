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
import PickupItem from './components/PickupItem.vue'
import SendItem from './components/SendItem.vue'
import MJSpinner from './components/MJSpinner.vue'

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
Vue.component('mj-pickupitem', PickupItem)
Vue.component('mj-senditem', SendItem)

router.beforeEach(function (to, from, next) {
  // let jumpSrc = 'http://112.74.34.241:3000/pics/random?show=1'
  // const timestamp = new Date().getTime()
  // jumpSrc = jumpSrc + '&timestamp=' + timestamp
  // store.commit('updateJumpSrc', {jumpSrc})
  // store.commit('updateLoadingStatus', {isLoading: true})
  // store.commit('updateJumpStatus', {isJump: false})
  next()
})

router.afterEach((to, from) => {
  // store.commit('updateLoadingStatus', {isLoading: false})
  // setTimeout(function () {
  //   store.commit('updateJumpStatus', {isJump: false})
  // }, 500)
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
