import Vue from 'vue'
import Router from 'vue-router'

import Container from '@/views/Container'

Vue.use(Router)

// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}

export default new Router({
  // mode: 'history',
  base: __dirname,
  scrollBehavior,
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
        scrollToTop: false,
        requiresAuth: false,
        requiresMobile: false
      }
    }, {
      path: '/send',
      name: 'Send',
      component: require('@/views/Send'),
      meta: {
        scrollToTop: false,
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
    meta: { scrollToTop: true }
  }, {
    path: '/address/edit',
    name: 'EditAddress',
    component: require('@/views/EditAddress'),
    meta: { scrollToTop: true }
  }, {
    path: '/pickup/detail',
    name: 'PickUpDetail',
    component: require('@/views/PickUpDetail'),
    meta: { scrollToTop: true }
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
