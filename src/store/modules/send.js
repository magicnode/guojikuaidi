import {send as sendApi, address as addressApi} from '@/api'
import axios from 'axios'
import window from 'window'

import * as types from '../mutation-types'

let local = window.localStorage
let instance = axios.create({
  timeout: 3000
})

export const state = {
  data: {
    init: false,
    wait: [],
    data: []
  },
  query: {
  },
  add: {
    brand: '',
    describe: '',
    note: '',
    office: '',
    order: '',
    receiptAddressId: '',
    sendAddressId: '',
    sum: '',
    type: ''
  },
  sendAddress: {
    name: '',
    mobile: '',
    address: ''
  },
  pickupAddress: {
    name: '',
    mobile: '',
    address: ''
  },
  switchtype: 'wait',
  result: {
    show: false,
    type: 'success',
    info: '成功'
  }
}

// getters
export const getters = {
  getSend: state => state.data,
  getSendSwitch: state => state.switchtype,
  getSendAdd: state => state.add,
  getSendAddress: state => state.sendAddress,
  getPickupAddress: state => state.pickupAddress,
  getSendResult: state => state.result
}

// actions
export const actions = {
  async setSend ({ commit }) {
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
          if (item.type === 1) {
            wait.push(item)
          } else if (item.type !== 1 && item.type !== 5) {
            ready.push(item)
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
  selectSendAddress ({ commit }, { sendAddressId }) {
    commit(types.SET_SEND_ADD, {sendAddressId})
  },
  selectPickUpAddress ({ commit }, {receiptAddressId}) {
    commit(types.SET_SEND_ADD, {receiptAddressId})
  },
  async setDefaultAddress ({commit}) {
    try {
      const {data} = await instance.get(addressApi.default, {
        params: {userId: local.userId}
      })
      commit(types.SET_SEND_DEFAULTADDRESS, {sendAddress: data.SendAddress, pickupAddress: data.receiptAddress})
    } catch (err) {
      console.error(err)
    }
  },
  setSendAddress ({commit}, {sendAddress}) {
    commit(types.SET_SEND_DEFAULTADDRESS, {sendAddress})
  },
  setPickupAddress ({commit}, {pickupAddress}) {
    commit(types.SET_SEND_DEFAULTADDRESS, {pickupAddress})
  },
  async createSend ({dispatch, commit}, {
        brand = state.add.brand,
        describe = state.add.describe,
        note = state.add.note,
        office = state.add.office,
        order = state.add.order,
        receiptAddressId = state.add.receiptAddressId,
        sendAddressId = state.add.sendAddressId,
        sum = state.add.sum,
        type = state.add.type }) {
    try {
      const res = await axios.get(sendApi.create, {
        params: {
          brand,
          describe,
          note,
          office,
          order,
          receiptAddressId,
          sendAddressId,
          sum,
          type,
          userId: local.userId
        }
      })
      if (res.data) {
        commit(types.SET_SEND_RES, {show: true, type: 'success', info: '寄件成功'})
        await dispatch('setSend')
        return true
      } else {
        commit(types.SET_SEND_RES, {show: true, type: 'warn', info: '寄件失败'})
        return false
      }
    } catch (err) {
      console.log(err)
      commit(types.SET_SEND_RES, {show: true, type: 'warn', info: '寄件失败'})
      return false
    }
  },
  async cancleSend ({ dispatch, commit }, { brand, describe, note, office, order, receiptAddressId, sendAddressId, sum, type }) {
    try {
      const res = await axios.get(sendApi.create, {
        params: {
          brand,
          describe,
          note,
          office,
          order,
          receiptAddressId,
          sendAddressId,
          sum,
          type: 5,
          userId: local.userId
        }
      })
      if (res.data) {
        await dispatch('setSend')
        return {
          type: 'success',
          text: '取消寄件成功'
        }
      } else {
        return {
          type: 'warn',
          text: '取消寄件失败'
        }
      }
    } catch (err) {
      console.error(err)
      return {
        type: 'warn',
        text: '取消寄件失败'
      }
    }
  }
}

export const mutations = {
  [types.SET_SEND] (state, {data}) {
    state.data = data
  },
  [types.SET_SEND_SWITCH] (state, {switchtype}) {
    state.switch = switchtype
  },
  [types.SET_SEND_ADD] (state, {
     brand = state.add.brand,
     describe = state.add.describe,
     note = state.add.note,
     office = state.add.office,
     order = state.add.order,
     receiptAddressId = state.add.receiptAddressId,
     sendAddressId = state.add.sendAddressId,
     sum = state.add.sum,
     type = state.add.type }) {
    state.add = { brand, describe, note, office, order, receiptAddressId, sendAddressId, sum, type }
  },
  [types.SET_SEND_DEFAULTADDRESS] (state, {sendAddress = state.sendAddress, pickupAddress = state.pickupAddress}) {
    state.sendAddress = sendAddress
    state.pickupAddress = pickupAddress
    console.log(',,,', pickupAddress)
  },
  [types.SET_SEND_RES] (state, {show = false, type, info}) {
    state.result.show = show
    state.result.type = type
    state.result.info = info
  }
}
