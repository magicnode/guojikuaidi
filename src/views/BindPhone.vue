<template>
  <div class="bind">
     <div class="bind-container">
       <div class="logo">
          <img src="../assets/images/new/bin_log.png" alt="妙寄图标">
       </div>
       <div class="input mobile">
         <div>
           <img src="../assets/images/new/bin_ico_pho.png" alt="phone">
         </div>
         <div>
           <input style="max-width: 10rem;" type="text" name="mobile" v-model="mobile" placeholder="输入手机号" />
         </div>
         <div class="getcode">
           <button v-show="getting === false && (mobile.toString().length < 11) === true" type="" class="button btn-get-disable">获取验证码</button>
           <button v-show="getting === false && (mobile.toString().length >= 11) ===true" type="" class="button btn-get" @click="getCode">获取验证码</button>
           <span v-show="getting === true" style="white-space: nowrap;font-size: 1.2rem;">{{time + ' s 后可重新获取'}}</span>
         </div>
       </div>
       <div class="input mobile" @click="foucsOnCode">
         <div>
           <img src="../assets/images/new/bin_ico_ver.png" alt="phone">
         </div>
         <div>
           <input style="max-width: 10rem;" id="inputCode" type="text" name="mobile" v-model="code" placeholder="输入验证码" />
         </div>
         <div class="getcode">
           <button type="" class="" style="color: transparent;background:transparent;border:none;">获取验证码</button>
          </div>
       </div>
       <div class="check" style="padding-top: 4rem;">
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
  mounted () {
    window.document.title = '手机绑定'
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
      'bindUser',
      'setUserInfo'
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
    foucsOnCode () {
      window.document.getElementById('inputCode').focus()
    },
    async getCode () {
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
          text: 'openid无法获取，请重新登录',
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
      const mb = this.mobile
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
      const _this = this
      if (bindres.type === 'success') {
        setTimeout(async function () {
          await _this.getUserInfoByOpenid({openid: _this.openid})
        }, 1500)
      }
    },
    async getUserInfoByOpenid ({openid}) {
      const userinfo = await this.setUserInfo({openid})
      if (userinfo.type === 'text') {
        // 用户未绑定手机， 跳转绑定手机页面
        this.$router.push({path: '/bindphone'})
        return
      } else if (userinfo.type === 'success') {
        // 获取用户信息成功, 根据page跳转页面
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
      } else {
        this.$vux.toast.show(userinfo)
        return
      }
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/styles/colors.less';
.btn-normal {
  border-radius: 5px;
  padding: .3rem .3rem;
  font-size: 1.4rem;
}

.btn-get {
  .btn-normal;
  color: @dark-yellow;
  border: 1px solid @dark-yellow;
  background: transparent
}

.btn-get-disable {
  .btn-normal;
  color: @greybtn;
  border: 1px solid @greybtn;
}

.btn-login {
  font-size: 1.5rem;
  width: 100%;
  border-radius: 5px;
  padding: 1rem;
  color: white;
  border: none;
  background: @dark-yellow;
}

.getcode {
  width: 9rem;
}

.bind {
  background: white;
  height: 100vh;
  *height: 62rem;
  &-container {
    padding: 2.5rem;
    .logo {
      padding: 1rem;
      padding-bottom: 2rem;
      img {
        width: 30%;
      }
    }
    .input {
      margin-top: 2rem;
      display: flex;
      align-items: center;
      justify-content: space-around;
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
          font-size: 1.4rem;
        }
      }
    }
  }
}
</style>
