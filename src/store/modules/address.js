import {address as addressApi, geography as geographyApi} from '@/api'
import { getNameById } from '../../util/tools'
import axios from 'axios'
import window from 'window'

import * as types from '../mutation-types'

let local = window.localStorage
let instance = axios.create({
  timeout: 3000
})

export const state = {
  data: {},
  query: {
  }
}

// function MathZ (val) {
//   if (val < 0) {
//     return 0
//   }
//   return val
// }

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
          'token': local.getItem('mj_token')
        }
      })
      const pickup = await instance({
        method: 'post',
        url: addressApi.pickup,
        params: {
          userid: local.getItem('mj_userId')
        },
        headers: {'token': local.getItem('mj_token')}
      })
      if (send.status === 200 && pickup.status === 200) {
        let sendData = send.data.obj.sort(function (a, b) {
          return a.endtime < b.endtime
        })
        let pickupData = pickup.data.obj.sort(function (a, b) {
          return a.endtime < b.endtime
        })
        let data = {
          send: sendData,
          pickup: pickupData
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
      console.log('params', params)
      const res = await instance({
        method: 'post',
        url,
        params,
        headers: {'token': local.getItem('mj_token')}
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
  async eidtAddress ({dispatch}, {id, type = 'send', status = 2}) {
    try {
      let url
      if (type === 'send') {
        url = addressApi.updatesend
      } else {
        url = addressApi.updatepickup
      }
      const res = await instance({
        method: 'post',
        url,
        params: {
          id,
          status
        },
        headers: {'token': local.getItem('mj_token')}
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
      return {
        type: 'warn',
        info: '添加地址失败',
        width: '18rem'
      }
    }
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
  },
  async getGeography ({commit}, {countryid, provinceid, cityid, countyid}) {
    try {
      countryid = Number(countryid)
      provinceid = Number(provinceid)
      cityid = Number(cityid)
      countyid = Number(countyid)
      const country = await instance({
        method: 'post',
        url: geographyApi.showcountry,
        headers: {'token': local.getItem('mj_token')}
      })
      const province = await instance({
        method: 'post',
        url: geographyApi.showprovince,
        params: {
          countryid
        },
        headers: {'token': local.getItem('mj_token')}
      })
      const city = await instance({
        method: 'post',
        url: geographyApi.showcity,
        params: {
          provinceid
        },
        headers: {'token': local.getItem('mj_token')}
      })
      const county = await instance({
        method: 'post',
        url: geographyApi.showcounty,
        params: {
          cityid
        },
        headers: {'token': local.getItem('mj_token')}
      })
      const str = getNameById(country.data.obj, countryid) + getNameById(province.data.obj, provinceid) + getNameById(city.data.obj, cityid) + getNameById(county.data.obj, countyid)
      return {
        type: 'success',
        text: '获取成功',
        width: '18rem',
        data: str
      }
    } catch (e) {
      console.error(e)
      return {
        type: 'warn',
        info: '获取失败',
        width: '18rem'
      }
    }
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
