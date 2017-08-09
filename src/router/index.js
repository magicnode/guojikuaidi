import Vue from 'vue'
import Router from 'vue-router'

import Container from '@/views/Container'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: __dirname,
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
      component: require('@/views/UserCenter'),
      meta: {
        requiresAuth: false,
        requiresMobile: false
      }
    }, {
      path: '/send',
      name: 'Send',
      component: require('@/views/Send'),
      meta: {
        requiresAuth: false,
        requiresMobile: false
      }
    }, {
      path: '/pickup',
      name: 'PickUp',
      component: require('@/views/PickUp'),
      meta: {
        requiresAuth: false,
        requiresMobile: false
      }
    }, {
      path: '/pickuptest',
      name: 'PickUpTest',
      component: require('@/views/PickUpTest')
    }]
  }, {
    path: '/address',
    name: 'Address',
    component: require('@/views/Address'),
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/address/add',
    name: 'AddAddress',
    component: require('@/views/AddAddress'),
    meta: { requiresAuth: true }
  }, {
    path: '/address/edit',
    name: 'EditAddress',
    component: require('@/views/EditAddress'),
    meta: { requiresAuth: true }
  }, {
    path: '/pickup/detail',
    name: 'PickUpDetail',
    component: require('@/views/PickUpDetail'),
    meta: { requiresAuth: true }
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
    path: '/smslogin',
    name: 'SmsLogin',
    component: require('@/views/SmsLogin')
  }, {
    path: '/hallmap',
    name: 'HallMap',
    component: require('@/views/HallMap')
  }, {
    path: '/login',
    name: 'Login',
    component: require('@/views/Login')
  }, {
    path: '/bindphone',
    name: 'BindPhone',
    component: require('@/views/BindPhone')
  }, {
    path: '/redirect',
    name: 'Redirect',
    component: require('@/views/Redirect')
  }, {
    path: '/test',
    name: 'Test',
    component: require('@/views/Test')
  }, {
    path: '/init',
    name: 'Init',
    component: require('@/views/Init')
  }, {
    path: '/office/location',
    name: 'OfficeLocation',
    component: require('@/views/OfficeLocation')
  }, {
    path: '/nouser',
    name: 'NoUser',
    component: require('@/views/NoUser')
  }, {
    path: '/user/package',
    name: 'UserPackage',
    component: require('@/views/UserPackage')
  }, {
    path: '/customer/service',
    name: 'CustomerService',
    component: require('@/views/CustomerService')
  }, {
    path: '/express/route',
    name: 'ExpressRoute',
    component: require('@/views/ExpressRoute'),
    meta: {
      intro: '快递路由信息'
    }
  }]
})
