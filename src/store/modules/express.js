import {express as expressApi} from '@/api'
import axios from 'axios'

import * as types from '../mutation-types'

let instance = axios.create({
  timeout: 3000
})

export const state = {
  data: {}
}

// getters
export const getters = {
  getExpressRoute: state => state.data
}

// actions
export const actions = {
  async setExpressRoute ({commit}, {brand, orderSn}) {
    try {
      const res = await instance({
        method: 'get',
        url: expressApi.route,
        params: {
          orderSn
        }
      })
      if (res.status === 200) {
        const data = res.data
        commit(types.SET_EXPRESS_ROTUE, {data})
        return {
          type: 'success',
          info: '获取路由成功',
          width: '15rem'
        }
      }
      return {
        type: 'warn',
        info: '获取路由失败',
        width: '15rem'
      }
    } catch (e) {
      console.error(e)
      return {
        type: 'warn',
        info: '获取路由失败',
        width: '15rem'
      }
    }
  }
}

export const mutations = {
  [types.SET_EXPRESS_ROTUE] (state, {data}) {
    state.data = data
  }
}
