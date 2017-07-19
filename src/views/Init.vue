<template>
  <div id="app">
    <router-view></router-view>
    <transition name="pic">
      <img class="loading-img" v-show="isJump" :src="jumpSrc" alt="">
    </transition>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
import config from 'config'
import { Loading } from 'vux'
import { mapState, mapActions, mapGetters } from 'vuex'

let appid = config.dev.appid
let secret = config.dev.appsecret
let redirectUri = 'http://171u9555b3.iask.in/'
if (process.env.NODE_ENV !== 'development') {
  console.log('this is pro app')
  appid = config.pro.appid
  secret = config.pro.appsecret
  redirectUri = 'http://www.mijihome.cn/redirect/'
}

export default {
  name: 'app',
  async created () {
    this.$vux.toast.show({
      type: 'text',
      width: '18rem',
      time: '1500',
      text: '正在为您跳转，请稍候'
    })
    let localStorage = window.localStorage
    const code = localStorage.getItem('mj_code')
    const openid = localStorage.getItem('mj_openid')
    if (code) {
      // 通过code获取openid
      const openidres = await this.setOpenid({appid, code, secret})
      if (openidres.type !== 'success') {
        this.$vux.toast.show({
          type: 'warn',
          text: '获取openid失败，请从公众号重新点击进入',
          width: '20rem'
        })
        window.localStorage.removeItem('mj_code')
        return this.$router.push({path: '/nouser'})
      }
      // 通过openid获取用户信息
      let openid = openidres.openid
      window.localStorage.removeItem('mj_code')
      await this.getUserInfoByOpenid({openid})
      return
    }
    // 从localstorage中获取openid
    if (openid) {
      // 通过openid从数据库中查询用户数据
      await this.getUserInfoByOpenid({openid})
    } else {
      // 获取openid失败, 跳转到授权页面
      let {page} = this.$route.query
      const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_base&state=' + page + '#wechat_redirect'
      window.location.href = url
      return
    }
  },
  data () {
    return {
    }
  },
  components: {
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      isJump: state => state.isJump,
      jumpSrc: state => state.jumpSrc
    }),
    ...mapGetters({
      'openid': 'getOpenId'
    })
  },
  methods: {
    ...mapActions([
      'setOpenid',
      'setUserInfo'
    ]),
    async getUserInfoByOpenid ({openid}) {
      const userinfo = await this.setUserInfo({openid})
      if (userinfo.type === 'text') {
        // 用户未绑定手机， 跳转绑定手机页面
        this.$router.push({path: '/bindphone'})
        return
      } else if (userinfo.type === 'success') {
        // 获取用户信息成功, 根据page跳转页面
        this.$vux.toast.show({
          type: 'success',
          text: '登录成功',
          width: '16rem'
        })
        let {page} = this.$route.query
        const _this = this
        switch (page) {
          case 1:
            _this.$router.push({path: '/pickup'})
            break
          case 2:
            _this.$router.push({path: '/send'})
            break
          case 3:
            _this.$router.push({path: '/usercenter'})
            break
          default:
            _this.$router.push({path: '/usercenter'})
            break
        }
        return
      } else {
        window.localStorage.removeItem('mj_openid')
        return this.$router.push({path: '/nouser'})
      }
    }
  }
}
</script>

<style lang="less">
</style>
