import Vue from 'vue'
import Vuex from 'vuex'

import * as user from './modules/user'
import * as send from './modules/send'
import * as address from './modules/address'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    send,
    address
  },
  state: {
    title: '妙寄',
    isLoading: false,
    isJump: false,
    jumpSrc: 'http://112.74.34.241:3000/pics/random?show=1',
    toast: {
      show: false,
      type: 'success',
      info: 'show'
    },
    brand: []
  },
  actions: {
  },
  getters: {
  },
  mutations: {
    SET_TITLE (state, { title }) {
      state.title = title
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateJumpStatus (state, payload) {
      state.isJump = payload.isJump
    },
    updateJumpSrc (state, payload) {
      state.jumpSrc = payload.jumpSrc
    }
  }
})

export default store
