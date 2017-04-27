import {address as addressApi} from '@/api'
import axios from 'axios'
import window from 'window'

import * as types from '../mutation-types'

let local = window.localStorage
let instance = axios.create({
  timeout: 1000
})

export const state = {
  data: {},
  query: {
  }
}

// getters
export const getters = {
  getAddress: state => state.data
}

// actions
export const actions = {
  changeAddress ({ commit }) {
    instance.get(addressApi.index, {
      params: {userId: local.userId}
    })
    .then((res) => {
      console.log('data rs', res.request.responseURL)
      if (res.status === 200) {
        let data = res.data
        let send = []
        let pickup = []
        for (let i = 0, len = data.length; i < len; i++) {
          let item = data[i]
          if (item.addressType === 1) {
            send.push(item)
          } else if (item.addressType === 2) {
            pickup.push(item)
          }
        }
        pickup = pickup.sort((v1, v2) => {
          return v1.checked - v2.checked
        })
        send = send.sort((v1, v2) => {
          return v1.checked - v2.checked
        })
        data.send = send
        data.pickup = pickup
        console.log('data', data)
        commit(types.SET_ADDRESS, {data})
      }
    })
    .catch(err => {
      console.error(err)
    })
  },
  delAddress ({dispatch}, {id}) {
    instance.get(addressApi.delete, {
      params: {
        id
      }
    })
    .then((res) => {
      console.log('res url', res.request.responseURL)
      if (res.status === 200) {
        dispatch('changeAddress')
      }
    })
    .catch(err => {
      console.error(err)
    })
  },
  addAddress ({dispatch}, {address, province, city, district, mobile, name, checked = 2, userId = local.userId, addressType = 1}) {
    instance.get(addressApi.add, {
      params: {address, province, city, district, mobile, name, checked, userId, addressType}
    })
    .then((res) => {
      console.log('res url', res.request.responseURL)
      if (res.status === 200) {
        dispatch('changeAddress')
      }
    })
    .catch(err => {
      console.error(err)
    })
  }
}

export const mutations = {
  [types.SET_ADDRESS] (state, {data}) {
    state.data = data
  }
}
