import {user as userApi} from '@/api'
import axios from 'axios'
import * as types from '../mutation-types'
import window from 'window'

let instance = axios.create({
  timeout: 10000
})

export const state = {
  init: false,
  userId: null,
  info: {
    mobile: '',
    nickname: '',
    headimgurl: ''
  },
  openid: '',
  smscode: ''
}

export const getters = {
  getUserId: state => {
    let userId = state.userId
    if (!userId) {
      userId = window.localStorage.userId ? window.localStorage.userId : 1
    }
    return userId
  },
  getUserInfo: state => state.info,
  getOpenId: state => state.openid,
  getSmsCode: state => state.smscode,
  getUserInit: state => state.init
}

export const actions = {
  setUserId ({ commit }, { userId }) {
    window.localStorage.removeItem('userId')
    window.localStorage.setItem('userId', userId)
    commit(types.SET_USERID, { userId })
  },
  async setUserInfo ({ dispatch, commit }, {openid}) {
    try {
      const res = await instance.post(userApi.getuserinfo, {
        openid
      })
      if (res.status === 200) {
        let info = res.data
        if (!info.mobile) {
          return {
            text: '用户未绑定手机号，将跳转绑定页面',
            width: '15rem',
            type: 'text'
          }
        }
        dispatch('setUserId', {userId: info.id})
        commit(types.SET_USERINFO, {info})
        return {
          text: '获取用户信息成功',
          width: '15rem',
          type: 'success'
        }
      }
      return {
        text: '获取用户信息失败',
        width: '15rem',
        type: 'warn'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '获取用户信息失败',
        width: '15rem',
        type: 'warn'
      }
    }
  },
  async setOpenid ({ commit }, {appid, secret, code}) {
    try {
      alert('1111')
      alert(appid)
      alert(code)
      const url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=' + secret + '&code=' + code + '&grant_type=authorization_code'
      alert(url)
      const res = await axios({
        method: 'get',
        url
      })
      if (res.status === 200) {
        alert(res.status)
        let data = res.data
        alert(res.data.errcode)
        let openid = data.openid
        if (data.errcode) {
          return {
            text: data.errmsg,
            type: 'warn'
          }
        }
        commit(types.SET_OPENID, {openid})
        return {
          text: '获取用户openid成功',
          type: 'success'
        }
      }
      return {
        text: '获取用户openid失败',
        type: 'warn'
      }
    } catch (err) {
      alert(err)
      return {
        text: '获取用户openid失败',
        type: 'warn'
      }
    }
  },
  async smsSend ({commit}, {mobile, openid}) {
    try {
      console.log('mobile', mobile)
      console.log('openid', openid)
      const res = await instance({
        method: 'post',
        url: userApi.sendsms,
        params: {
          mobile,
          openid
        }
      })
      const data = res.data
      const code = data.code
      console.log('sms data', data)
      if (code === 200) {
        commit(types.SET_SMSCODE, {smscode: data.obj})
        return {
          text: data.mess,
          type: 'success'
        }
      } else if (code === 201) {
        return {
          text: data.mess,
          type: 'warn'
        }
      }
      return {
        text: '发送短信失败',
        type: 'warn'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '网络错误',
        type: 'warn'
      }
    }
  },
  async bindUser ({dispatch, commit}, {mobile, openid}) {
    try {
      console.log('mobile', mobile)
      console.log('openid', openid)
      const res = await instance({
        method: 'post',
        url: userApi.bindphone,
        params: {
          mobile,
          openid
        }
      })
      const data = res.data
      const code = data.code
      if (code === 200) {
        await dispatch('setUserInfo', {openid})
        return {
          text: data.mess,
          type: 'success'
        }
      } else if (code === 201) {
        return {
          text: data.mess,
          width: '15rem',
          type: 'warn'
        }
      }
      return {
        text: '绑定帐号失败',
        type: 'warn',
        width: '15rem'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '绑定帐号失败',
        type: 'warn',
        width: '15rem'
      }
    }
  }
}

export const mutations = {
  [types.SET_USERID] (state, { userId }) {
    state.userId = userId
  },
  [types.SET_USERINFO] (state, { info }) {
    state.info = info
  },
  [types.SET_OPENID] (state, { openid }) {
    state.openid = openid
  },
  [types.SET_SMSCODE] (state, { smscode }) {
    state.smscode = smscode
  },
  [types.SET_USERINIT] (state, { init }) {
    state.init = init
  }
}
