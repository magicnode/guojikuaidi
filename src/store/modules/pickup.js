import {send as sendApi, address as addressApi} from '@/api'
import axios from 'axios'
import window from 'window'

import * as types from '../mutation-types'

let local = window.localStorage
let instance = axios.create({
  timeout: 2000
})

export const state = {
  data: {
  }
}

// getters
export const getters = {
  getPickUp: state => state.data
}

// actions
export const actions = {
  async setPickUp ({ commit }) {
    try {
      const res = await instance.get(sendApi.index, {
        params: {userId: local.userId}
      })
      if (res.status === 200) {
        let resdata = res.data
        let data = {}
        let wait = []
        let ready = []
        for (let i = 0, len = resdata.length; i < len; i++) {
          let item = resdata[i]
          if (item.type === 4) {
            ready.push(item)
          } else {
            wait.push(item)
          }
        }
        data.wait = wait
        data.ready = ready
        data.init = true
        commit(types.SET_SEND, {data})
        return {
          text: '获取寄件列表成功',
          type: 'success'
        }
      }
      return {
        text: '获取寄件列表失败',
        type: 'warn'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '获取寄件列表失败',
        type: 'warn'
      }
    }
  },
  async addPickUp ({commit}, {mobile, page, rows}) {
    try {
      const res = await axios.get(sendApi.create, {
        params: {
        }
      })
      if (res.data) {
        commit(types.SET_SEND_RES, {show: true, type: 'success', info: '寄件成功'})
        return true
      } else {
        commit(types.SET_SEND_RES, {show: true, type: 'warn', info: '寄件失败'})
        return false
      }
    } catch (err) {
      console.log(err)
      return true
    }
  }
}

export const mutations = {
  [types.SET_PICKUP] (state, {data}) {
    state.data = data
  }
}
