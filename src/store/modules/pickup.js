import {pickup as pickupApi} from '@/api'
import axios from 'axios'

import * as types from '../mutation-types'

let instance = axios.create({
  timeout: 3000
})

export const state = {
  sign: {
    data: [],
    query: {
      page: 1,
      rows: 5
    }
  },
  wait: {
    data: [],
    query: {
      page: 1,
      rows: 5
    }
  },
  switchtype: 'wait'
}

// getters
export const getters = {
  getPickUpSign: state => state.sign.data,
  getPickUpWait: state => state.wait.data,
  getPickUpSignQuery: state => state.sign.query,
  getPickUpWaitQuery: state => state.wait.query,
  getPickUpType: state => state.switchtype
}

// actions
export const actions = {
  async initPickUpSign ({ commit }, {query = {mobile: '', page: 1, rows: 5}}) {
    try {
      const res = await instance.get(pickupApi.sign, {
        params: query
      })
      if (res.status === 200) {
        const data = res.data
        query.page = query.page + 1
        commit(types.SET_PICKUP_SIGN, {data, query})
        return {
          text: '获取已签收寄件成功',
          type: 'success'
        }
      }
      return {
        text: '获取已签收寄件失败',
        type: 'warn'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '获取已签收寄件失败, 网络错误',
        type: 'warn'
      }
    }
  },
  async addPickUpSign ({ commit }, {query = {mobile: '', page: 1, rows: 5}}) {
    try {
      const res = await instance.get(pickupApi.sign, {
        params: query
      })
      if (res.status === 200) {
        let resdata = res.data
        let data = state.sign.data
        if (resdata.length <= 0) {
          return {
            text: '没有数据了~',
            type: 'text',
            stop: true
          }
        }
        data = data.concat(resdata)
        query.page = query.page + 1
        commit(types.SET_PICKUP_SIGN, {data, query})
        return {
          text: '获取已签收寄件成功',
          type: 'success'
        }
      }
      return {
        text: '获取已签收寄件失败',
        type: 'warn'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '获取已签收寄件失败, 网络错误',
        type: 'warn'
      }
    }
  },
  async initPickUpWait ({ commit }, {query = {mobile: '', page: 1, rows: 5}}) {
    try {
      const res = await instance.get(pickupApi.wait, {
        params: query
      })
      if (res.status === 200) {
        const data = res.data
        if (data.length <= 0) {
          return {
            text: '没有数据',
            type: 'text'
          }
        }
        query.page = query.page + 1
        commit(types.SET_PICKUP_WAIT, {data, query})
        return {
          text: '获取已签收寄件成功',
          type: 'success'
        }
      }
      return {
        text: '获取已签收寄件失败',
        type: 'warn'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '获取已签收寄件失败, 网络错误',
        type: 'warn'
      }
    }
  },
  async addPickUpWait ({ commit }, {query = {mobile: '', page: 1, rows: 5}}) {
    try {
      const res = await instance.get(pickupApi.wait, {
        params: query
      })
      if (res.status === 200) {
        const resdata = res.data
        let data = state.wait.data
        if (resdata.length <= 0) {
          return {
            text: '没有数据了~',
            type: 'text',
            stop: true
          }
        }
        data = data.concat(resdata)
        query.page = query.page + 1
        commit(types.SET_PICKUP_WAIT, {data, query})
        return {
          text: '获取未签收寄件成功',
          type: 'success'
        }
      }
      return {
        text: '获取未签收寄件失败',
        type: 'warn'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '获取未签收寄件失败,网络错误',
        type: 'warn'
      }
    }
  }
}

export const mutations = {
  [types.SET_PICKUP_SIGN] (state, {data = state.sign.data, query = state.sign.query}) {
    state.sign = {
      data,
      query
    }
  },
  [types.SET_PICKUP_WAIT] (state, {data = state.wait.data, query = state.wait.query}) {
    state.wait = {
      data,
      query
    }
  }
}
