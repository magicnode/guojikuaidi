import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import window from 'window'

import * as user from './modules/user'
import * as send from './modules/send'
import * as address from './modules/address'
import {brand as brandApi} from '@/api'

Vue.use(Vuex)

// let local = window.localStorage
let instance = axios.create({
  timeout: 2000
})

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
    async setAllBrand ({commit}) {
      try {
        const result = await instance.get(brandApi.index)
        if (result.data) {
          commit('SET_BRAND', {brand: result.data})
          return {
            text: '获取快递品牌成功',
            type: 'success'
          }
        }
        return {
          text: '获取快递品牌失败',
          type: 'warn'
        }
      } catch (err) {
        console.error(err)
        return {
          text: '网络请求错误',
          type: 'warn'
        }
      }
    }
  },
  getters: {
    getAllBrand: state => state.brand
  },
  mutations: {
    SET_TITLE (state, { title }) {
      state.title = title
    },
    SET_BRAND (state, { brand }) {
      state.brand = brand
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
