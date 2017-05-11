import {site as siteApi} from '@/api'
import axios from 'axios'
import window from 'window'

import * as types from '../mutation-types'

let local = window.localStorage
let instance = axios.create({
  timeout: 2000
})

export const state = {
  data: [],
  recent: []
}

// getters
export const getters = {
  getSite: state => state.data,
  getSiteRecent: state => state.recent
}

// actions
export const actions = {
  async addSite ({ commit }, {southwest, northeast}) {
    try {
      const res = await instance.get(siteApi.location, {
        params: {southwest, northeast}
      })
      if (res.status === 200) {
        console.log(`location data is ${resdata}`)
        let resdata = res.data
        let data = state.data.concat(resdata)
        data = Array.from(new Set(data))
        commit(types.SET_SITE, {data})
        commit(types.SET_SITE_RECENT, {recent: resdata})
        return {
          text: '获取营业厅地址成功',
          type: 'success'
        }
      }
      return {
        text: '获取营业厅地址失败',
        type: 'warn'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '获取营业厅地址失败',
        type: 'warn'
      }
    }
  }
}

export const mutations = {
  [types.SET_SITE] (state, {data}) {
    state.data = data
  },
  [types.SET_SITE_RECENT] (state, {recent}) {
    state.recent = recent
  }
}
