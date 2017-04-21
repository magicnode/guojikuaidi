<template>
  <div class="sendend">
    <mj-header title="寄件结束"></mj-header>
    <div class="sendend-container">
      <p class="sendend-container-sns">单号:</p>
      <p class="sendend-container-sns">881223554888866520</p>
      <div class="sendend-container-info flex">
        <div class="sendend-container-info__sendend">
          <p>寄件地址:</p>
          <p>张鰦蕋</p>
          <p>15751158939</p>
          <p>长宁区</p>
        </div>
        <div class="">
          <span>至</span>
        </div>
        <div class="sendend-container-info__sendend">
          <p>收件地址:</p>
          <p>吳樬</p>
          <p>15752258939</p>
          <p>迷航区</p>
        </div>
      </div>

      <div class="sendend-container-detail">
        <p>重量：</p>
        <p>5KG</p>
      </div>
      <div class="sendend-container-detail">
        <p>价格：</p>
        <p>￥22</p>
      </div>

      <div class="sendend-container-func flex">
        <button type="">确认支付</button>
        <button type="">取消</button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'sendend',
  created () {
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../assets/styles/colors.less';
@import '../assets/styles/helpers.less';
.sendend {
  &-container {
    padding: 1rem;
    &-sns {
      font-size: 2.5rem;
    }

    &-info {
      justify-content: space-around;
      font-size: 1.4rem;
      div {
        text-align: left;
        p {
          padding: .3rem;
        }
      }
    }

    &-func {
      padding-top: 2rem;
      justify-content: space-around;
      font-size: 1.4rem;
      button {
        color: white;
        border: none;
        padding: .5rem 1rem;
        font-size: 1.8rem;
        width: 100px;
        background: inherit;
        background-color: rgba(22, 155, 213, 1);
        border: none;
        border-radius: 5px;
      }
    }

  }
}
</style>
