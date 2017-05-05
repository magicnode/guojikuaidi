import {send as sendApi, address as addressApi} from '@/api'
import axios from 'axios'
import window from 'window'

import * as types from '../mutation-types'

let local = window.localStorage
let instance = axios.create({
  timeout: 2000
})

export const state = {
  data: {},
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
  setSend ({ commit }) {
    instance.get(sendApi.index, {
      params: {userId: local.userId}
    })
    .then((res) => {
      console.log('data rs', res.request.responseURL)
      if (res.status === 200) {
        let data = res.data
        let wait = []
        let ready = []
        for (let i = 0, len = data.length; i < len; i++) {
          let item = data[i]
          if (item.type === 4) {
            ready.push(item)
          } else {
            wait.push(item)
          }
        }
        // pickup = pickup.sort((v1, v2) => {
        //   return v1.checked - v2.checked
        // })
        // send = send.sort((v1, v2) => {
        //   return v1.checked - v2.checked
        // })
        data.wait = wait
        data.ready = ready
        console.log('data', data)
        console.log('data wait', data.wait)
        commit(types.SET_SEND, {data})
      }
    })
    .catch(err => {
      console.error(err)
    })
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
  async createSend ({commit}, {
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
      } else {
        commit(types.SET_SEND_RES, {show: true, type: 'warn', info: '寄件失败'})
      }
    } catch (err) {
      console.log(err)
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
