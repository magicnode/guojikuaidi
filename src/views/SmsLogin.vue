<template>
<div>  
  <mj-header title="手机登录"></mj-header>
  <div class="login">
    <input type="" name="" placeholder="请输入手机号">
    <input type="" name="" placeholder="请输入验证码">
    <div>
      <button type="" class="get-code">点此获取验证码</button>
      <button class="confirm">确定</button>
    </div>
  </div>
</div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'login',
  created () {
    this.setUserId({userId: 1})
  },
  methods: {
    ...mapActions([
      'setUserId'
    ])
  }
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 2rem;
  input {
    width: 50%;
    padding: .5rem;
    margin: .5rem;
  }
  div {
    padding: .5rem;
    margin: 1rem;
  }
  .get-code {
    border: none;
    background: lightblue;
    padding: 0.6rem;
    color: white;
    border-radius: 5px;
  }
  .confirm {
    border: none;
    background: forestgreen;
    padding: 0.6rem;
    color: white;
    border-radius: 5px;
  }
}
</style>
