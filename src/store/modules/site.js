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
          text: '获取"妙寄"全网站点成功',
          type: 'success',
          width: '18rem'
        }
      }
      return {
        text: '获取站点地址失败',
        type: 'warn',
        width: '18rem'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '获取站点地址失败',
        type: 'warn',
        width: '18rem'
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
