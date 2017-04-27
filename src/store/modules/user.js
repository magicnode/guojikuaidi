import * as types from '../mutation-types'
import window from 'window'

export const state = {
  userId: 1
}

export const getters = {
  getUserId: state => {
    let userId = state.userId
    if (!userId) {
      userId = window.localStorage.userId ? window.localStorage.userId : null
    }
    return userId
  }
}

export const actions = {
  setUserId ({ commit }, { userId }) {
    window.localStorage.removeItem('userId')
    window.localStorage.setItem('userId', userId)
    commit(types.SET_USERID, { userId })
  }
}

export const mutations = {
  [types.SET_USERID] (state, { userId }) {
    state.userId = userId
  }
}
