import {pickup as pickupApi} from '@/api'
import axios from 'axios'

import * as types from '../mutation-types'

let instance = axios.create({
  timeout: 3000
})

export const state = {
  sign: [],
  wait: [],
  signquery: {
    page: 1,
    row: 5
  },
  waitquery: {
    page: 1,
    row: 5
  },
  switchtype: 'wait'
}

// getters
export const getters = {
  getPickUpSign: state => state.sign,
  getPickUpWait: state => state.wait,
  getPickUpSignQuery: state => state.signquery,
  getPickUpWaitQuery: state => state.waitquery,
  getPickUpType: state => state.switchtype
}

// actions
export const actions = {
  async addPickUpSign ({ commit }, {mobile, page, rows}) {
    try {
      const res = await instance.get(pickupApi.sign, {
        params: {
          mobile, page, rows
        }
      })
      if (res.status === 200) {
        let resdata = res.data
        let sign = state.sign
        sign = sign.concat(resdata)
        sign = Array.from(new Set(sign))
        commit(types.SET_PICKUP_SIGN, {sign})
        return {
          text: '获取已签收寄件成功',
          type: 'success'
        }
      }
      return {
        text: '获取已签收寄件成功失败',
        type: 'warn'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '获取已签收寄件成功失败',
        type: 'warn'
      }
    }
  },
  async addPickUpWait ({ commit }, {mobile, page, rows}) {
    try {
      const res = await instance.get(pickupApi.wait, {
        params: { mobile, page, rows }
      })
      if (res.status === 200) {
        let resdata = res.data
        let wait = state.wait
        wait = wait.concat(resdata)
        wait = Array.from(new Set(wait))
        commit(types.SET_PICKUP_WAIT, {wait})
        return {
          text: '获取未签收寄件成功',
          type: 'success'
        }
      }
      return {
        text: '获取未签收寄件成功失败',
        type: 'warn'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '获取已签收寄件成功失败',
        type: 'warn'
      }
    }
  }
}

export const mutations = {
  [types.SET_PICKUP_SIGN] (state, {sign}) {
    state.sign = sign
  },
  [types.SET_PICKUP_WAIT] (state, {wait}) {
    state.wait = wait
  }
}
