<template>
  <div class="pickupdetail">
    <mj-header title="收件明细"></mj-header>
    <div class="pickupdetail-container">
      <p class="pickupdetail-container-sns">运单号码:</p>
      <p class="pickupdetail-container-sns">881223554888866520</p>
      <p class="pickupdetail-container-tips">签收时请出示此二维码，店员扫描签收</p>
      <img class="pickupdetail-container-qr" src="../assets/images/shouye.png" />
      <div class="pickupdetail-container-detail">
        <p>货架号：A-9-526</p>
        <p>联系电话：158655225252</p>
        <p>快递品牌：顺丰</p>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'pickupdetail',
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
.pickupdetail {
  &-container {
    padding: 1rem;
    &-sns {
      font-size: 2.5rem;
    }

    &-tips {
      padding-top: 3rem;
      padding-bottom: 2rem;
      font-size: 1.4rem;
    }

    &-qr {
      width: 80%;
    }

    &-detail {
      padding: 1rem 5rem;
      text-align: justify;
      font-size: 1.2rem;
      p {
        padding-bottom: 1rem;
      }
    }
  }
}
</style>
