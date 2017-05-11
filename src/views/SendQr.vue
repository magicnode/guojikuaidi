<template>
  <div class="sendqr">
    <mj-header title="寄件明细"></mj-header>
    <div class="sendqr-container">
      <p class="sendqr-container-sns">运单号码: </p>
      <p class="sendqr-container-sns">881223554888866520</p>
      <img class="sendqr-container-qr" src="../assets/images/shouye.png" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'sendqr',
  created () {
    if (!this.data.init) {
      this.initSendList()
    }
    const {id, type} = this.$route.query
    this.detail = this.data[type][0]
    console.log('data', this.data)
    console.log('data', id)
  },
  computed: {
    ...mapGetters({
      data: 'getSend'
    })
  },
  data () {
    return {
      detail: {}
    }
  },
  methods: {
    ...mapActions([
      'setSend'
    ]),
    async initSendList () {
      const result = await this.setSend()
      this.showToast(result)
    }
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
