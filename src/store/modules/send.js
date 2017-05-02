import {send as sendApi} from '@/api'
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
  switchtype: 'wait'
}

// getters
export const getters = {
  getSend: state => state.data,
  getSendSwitch: state => state.switchtype
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
  }
}

export const mutations = {
  [types.SET_SEND] (state, {data}) {
    state.data = data
  },
  [types.SET_SEND_SWITCH] (state, {switchtype}) {
    state.switch = switchtype
  }
}
