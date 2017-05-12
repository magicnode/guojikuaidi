<template>
  <div class="pickupdetail">
    <div class="pickupdetail-container">
      <p class="pickupdetail-container-sns">运单号码:</p>
      <p class="pickupdetail-container-sns">{{orderSn}}</p>
      <p class="pickupdetail-container-tips">签收时请出示此二维码，店员扫描签收</p>
      <img class="pickupdetail-container-qr" :src="qr" />
      <div class="pickupdetail-container-detail">
        <p>联系电话：{{mobile}}</p>
        <p>站点名: {{name}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import {pic as picApi} from '@/api'

export default {
  name: 'pickupdetail',
  created () {
    const query = this.$route.query
    this.qr = picApi.qr + '?orderSn=' + query.orderSn + '&userId=' + window.localStorage.getItem('mj_userId')
    console.log('qr', this.qr)
    this.mobile = query.mobile
    this.name = query.name
  },
  mounted () {
    window.document.title = '收件明细'
  },
  data () {
    return {
      qr: '',
      orderSn: '',
      mobile: '',
      name: ''
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
