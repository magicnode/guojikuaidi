<template>
  <div class="test">
    <h1>{{url}}</h1>
    <h1>{{res}}</h1>
    <input type="text" name="" v-model="code" placeholder="code input">
    <button type="" @click="getopenid">获取openid</button>
  </div>
</template>

<script>
import axios from 'axios'
import {user as userApi} from '@/api'

export default {
  created () {
  },
  data () {
    return {
      url: '11',
      res: '',
      code: ''
    }
  },
  methods: {
    async getopenid () {
      const appid = 'wx543968867249e28d'
      const secret = 'efc582e21d07549a8bade66ceefdc312'
      const url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=' + secret + '&code=' + this.code + '&grant_type=authorization_code'
      this.url = url
      alert(url)
      alert(userApi.getwebopenid)
      const res = await axios({
        method: 'post',
        url: userApi.getwebopenid,
        params: {
          url
        }
      })
      console.log('res', res)
      // const res = await axios.get(url)
      // this.res = res
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
</style>
