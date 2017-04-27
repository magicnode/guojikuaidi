import Vue from 'vue'
import Router from 'vue-router'

import Container from '@/views/Container'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Container',
    component: Container,
    children: [{
      path: '/index',
      name: 'Index',
      component: require('@/views/Index')
    }, {
      path: '/usercenter',
      name: 'UserCenter',
      component: require('@/views/UserCenter')
    }, {
      path: '/send',
      name: 'Send',
      component: require('@/views/Send')
    }, {
      path: '/pickup',
      name: 'PickUp',
      component: require('@/views/PickUp')
    }]
  }, {
    path: '/address',
    name: 'Address',
    component: require('@/views/Address')
  }, {
    path: '/address/add',
    name: 'AddAddress',
    component: require('@/views/AddAddress')
  }, {
    path: '/pickup/detail',
    name: 'PickUpDetail',
    component: require('@/views/PickUpDetail')
  }, {
    path: '/send/detail',
    name: 'SendDetail',
    component: require('@/views/SendDetail')
  }, {
    path: '/send/qr',
    name: 'SendQr',
    component: require('@/views/SendQr')
  }, {
    path: '/send/end',
    name: 'SendEnd',
    component: require('@/views/SendEnd')
  }, {
    path: '/user/package',
    name: 'Package',
    component: require('@/views/Package')
  }, {
    path: '/smslogin',
    name: 'SmsLogin',
    component: require('@/views/SmsLogin')
  }]
})
