import Vue from 'vue'
import Vuex from 'vuex'

import * as address from './modules/address'
import * as user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    address,
    user
  },
  state: {
    title: '妙寄',
    isLoading: false,
    isJump: false,
    jumpSrc: 'http://112.74.34.241:3000/pics/random?show=1'
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
