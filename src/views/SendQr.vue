<template>
  <div class="sendqr">
    <div class="sendqr-container">
      <p class="sendqr-container-sns">运单号码: </p>
      <p class="sendqr-container-sns">{{orderSn}}</p>
      <img class="sendqr-container-qr" :src="qr" />
    </div>
  </div>
</template>
<script>
import {pic as picApi} from '@/api'

export default {
  name: 'sendqr',
  created () {
    const query = this.$route.query
    this.qr = picApi.qr + '?orderSn=' + query.orderSn + '&userId=' + window.localStorage.getItem('mj_userId')
    console.log('qr', this.qr)
  },
  mounted () {
    window.document.title = '寄件明细'
  },
  computed: {
  },
  data () {
    return {
      qr: '',
      orderSn: ''
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
.sendqr {
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
  }
}
</style>
