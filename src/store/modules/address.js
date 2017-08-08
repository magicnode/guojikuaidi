import {address as addressApi} from '@/api'
import axios from 'axios'
import window from 'window'

import * as types from '../mutation-types'

let local = window.localStorage
let instance = axios.create({
  timeout: 3000
})

const mjToken = local.getItem('mj_token')

export const state = {
  data: {},
  query: {
  }
}

// getters
export const getters = {
  getAddress: state => state.data,
  getAddressResult: state => state.result
}

// actions
export const actions = {
  async changeAddress ({ commit }) {
    try {
      const send = await instance({
        method: 'post',
        url: addressApi.send,
        params: {
          userid: local.getItem('mj_userId')
        },
        headers: {
          'token': mjToken
        }
      })
      const pickup = await instance({
        method: 'post',
        url: addressApi.pickup,
        params: {
          userid: local.getItem('mj_userId')
        },
        headers: {'token': mjToken}
      })
      if (send.status === 200 && pickup.status === 200) {
        let data = {
          send: send.data.obj,
          pickup: pickup.data.obj
        }
        commit(types.SET_ADDRESS, {data})
        return {
          type: 'success',
          info: '请求成功',
          width: '18rem'
        }
      }
      return {
        type: 'warn',
        info: '获取地址信息失败',
        width: '18rem'
      }
    } catch (e) {
      console.error(e)
      return {
        type: 'warn',
        info: '网络错误',
        width: '18rem'
      }
    }
  },
  async addAddress ({commit, dispatch}, {nationid, provinnce, city, county, detailedinformation,
    postcode, iphone, userid = local.getItem('mj_userId'), endtime = new Date().getTime(), start = 1, linkman, idnumber, company, remove, type = 1}) {
    try {
      let url, params
      if (type === 1) {
        url = addressApi.addsend
        params = {
          nationid, provinnce, city, county, detailedinformation, postcode, iphone, userid, endtime, start, linkman, company, remove
        }
      } else {
        url = addressApi.addpickup
        const nation = nationid
        params = {
          nation, provinnce, city, county, detaliedinformation: detailedinformation, postcode, iphone, userid, endtime, start, recipients: linkman, idnumber, company, remark: remove
        }
      }
      const res = await instance({
        method: 'post',
        url,
        params,
        headers: {'token': mjToken}
      })
      if (res.status === 200) {
        dispatch('changeAddress')
        return {
          type: 'success',
          info: '添加地址成功',
          width: '18rem'
        }
      }
    } catch (e) {
      console.error(e)
      let result = {
        type: 'warn',
        info: '添加地址失败',
        width: '18rem'
      }
      commit(types.SET_ADDRESS_RES, {result})
    }
  },
  eidtAddress ({dispatch}, {id, address, province, city, district, mobile, name, checked = 2, userId = local.getItem('mj_userId'), addressType = 1}) {
    instance.get(addressApi.update, {
      params: {id, address, province, city, district, mobile, name, checked, userId, addressType}
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch('changeAddress')
      }
    })
    .catch(err => {
      console.error(err)
    })
  },
  checkedAddress ({commit, dispatch}, {id, addressType}) {
    instance.get(addressApi.checked, {
      params: {id, addressType, userId: local.getItem('mj_userId')}
    })
    .then((res) => {
      console.log('res url', res.request.responseURL)
      if (res.status === 200) {
        dispatch('changeAddress')
        let result = {
          show: true,
          type: 'success',
          info: '修改默认地址成功'
        }
        commit(types.SET_ADDRESS_RES, {result})
      } else {
        let result = {
          show: true,
          type: 'warn',
          info: '修改默认地址失败'
        }
        commit(types.SET_ADDRESS_RES, {result})
      }
    })
    .catch(err => {
      console.error(err)
      let result = {
        show: true,
        type: 'warn',
        info: '修改默认地址失败',
        width: '16rem'
      }
      commit(types.SET_ADDRESS_RES, {result})
    })
  }
}

export const mutations = {
  [types.SET_ADDRESS] (state, {data}) {
    state.data = data
  },
  [types.SET_ADDRESS_RES] (stater, {result}) {
    state.result = result
  }
}
