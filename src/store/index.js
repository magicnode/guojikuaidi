import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
  },
  state: {
    title: '妙寄',
    isLoading: false
  },
  actions: {
  },
  getters: {
  },
  mutations: {
    SET_TITLE (state, { title }) {
      state.title = title
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})

export default store
