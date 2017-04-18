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
  }]
})
