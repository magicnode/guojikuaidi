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
           <button type="" class="button btn-get">获取验证码</button>
         </div>
       </div>
       <div class="input mobile">
         <div>
           <img src="../assets/images/new/bin_ico_ver.png" alt="phone">
         </div>
         <div>
           <input type="text" name="mobile" v-model="mobile" placeholder="输入验证码" />
         </div>
       </div>

       <div class="check" style="padding-top: 2rem;">
         <button class="button btn-login">登录</button>
       </div>
     </div>
  </div>
</template>
<script>

export default {
  name: 'login',
  created () {
  },
  data () {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
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
