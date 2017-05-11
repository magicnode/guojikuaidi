<template>
  <div class="login">
     <div class="login-container">
       <div class="logo">
          <img src="../assets/images/new/bin_log.png" alt="妙寄图标">
       </div>
       <div class="input mobile">
         <div>
           <img src="../assets/images/new/bin_ico_pho.png" alt="phone">
         </div>
         <div>
           <input type="text" name="mobile" v-model="mobile" placeholder="输入手机号" />
         </div>
         <div>
           <button v-show="getting === false" type="" class="button btn-get" @click="getCode">获取验证码</button>
           <span v-show="getting === true" style="white-space: nowrap;font-size: 1.6rem;">{{time + ' s 后可重新获取'}}</span>
         </div>
       </div>
       <div class="input mobile">
         <div>
           <img src="../assets/images/new/bin_ico_ver.png" alt="phone">
         </div>
         <div>
           <input type="text" name="mobile" v-model="code" placeholder="输入验证码" />
         </div>
       </div>
       <div class="check" style="padding-top: 2rem;">
         <button class="button btn-login" @click="submitPhone">确定</button>
       </div>
     </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'login',
  created () {
  },
  data () {
    return {
      mobile: '',
      sendmobile: '',
      code: '',
      getting: false,
      time: 30
    }
  },
  computed: {
    ...mapGetters({
      'openid': 'getOpenId',
      'smscode': 'getSmsCode'
    })
  },
  methods: {
    ...mapActions([
      'setOpenid',
      'smsSend',
      'bindUser'
    ]),
    setTime () {
      const _this = this
      const timeval = setInterval(function () {
        if (_this.time === 1) {
          clearInterval(timeval)
          _this.getting = false
          _this.time = 30
          return
        }
        _this.time--
      }, 1000)
    },
    async getCode () {
      const mb = this.mobile
      if (!this.mobile) {
        this.$vux.toast.show({
          text: '手机号不能为空!',
          type: 'warn',
          width: '15rem'
        })
        return
      }
      const regphone = /^1[0-9]{10}$/
      if (!regphone.test(this.mobile)) {
        this.$vux.toast.show({
          text: '请输入正确的手机号',
          type: 'warn',
          width: '18rem'
        })
        return
      }
      if (!this.openid) {
        this.$vux.toast.show({
          text: '未知错误发生了...我也很绝望...',
          type: 'text',
          width: '20rem'
        })
        return
      }
      this.getting = true
      this.setTime()
      const res = await this.smsSend({
        mobile: this.mobile,
        openid: this.openid
      })
      this.$vux.toast.show(res)
      if (res.type === 'success') {
        this.sendmobile = mb
      }
      return
    },
    async submitPhone () {
      if (this.code !== this.smscode) {
        this.$vux.toast.show({
          text: '验证码不匹配',
          type: 'warn',
          width: '18rem'
        })
        return
      }
      if (!this.sendmobile) {
        this.$vux.toast.show({
          text: '手机号出错, 请重新输入',
          type: 'warn',
          width: '18rem'
        })
        return
      }
      const bindres = await this.bindUser({
        mobile: this.sendmobile,
        openid: this.openid
      })
      this.$vux.toast.show(bindres)
      if (bindres.type === 'success') {
        this.$router.push({path: '/usercenter'})
        return
      }
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../assets/styles/colors.less';
.btn-get {
  border-radius: 5px;
  color: @dark-yellow;
  border: 1px solid @dark-yellow;
  background: transparent;
  padding: 0.3rem;
}

.btn-login {
  width: 70%;
  border-radius: 5px;
  padding: 1rem;
  color: white;
  border: none;
  background: @dark-yellow;
}

.login {
  background: white;
  height: 100vh;
  *height: 62rem;
  &-container {
    padding: 2rem;
    .logo {
      img {
        width: 30%;
      }
    }
    .input {
      padding-left: 2rem;
      margin-top: 2rem;
      display: flex;
      align-items: center;
      // justify-content: center;
      border-bottom: 1px solid @borderbt;
      div {
        padding: .5rem;
        img {
          height: 2rem;
        }
        input {
          padding: .4rem;
          border: none;
          height: 2.6rem;
        }
      }
    }
  }
}
</style>
