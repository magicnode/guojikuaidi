<template>
  <div class="sendqr">
    <div class="container">
      <div class="sendqr-img">
        <img class="sendqr-container-qr" :src="qr" />
        <p>寄件时，请向店员出示此二维码</p>
      </div>
      <div class="sendqr-detail">
        <div class="sendqr-detail-box">
          <div class="sendqr-detail-box__icon">
            <span class="bgblue">寄</span>
          </div>
          <div class="sendqr-detail-box__detail">
            <p>{{data.sendAddress.name + '   ' + data.sendAddress.mobile}}</p>
            <p>{{data.sendAddress.province + data.sendAddress.district + data.sendAddress.address}}</p>
          </div>
        </div>
        <div class="sendqr-detail-box">
          <div class="sendqr-detail-box__icon">
            <span class="bgyellow">收</span>
          </div>
          <div class="sendqr-detail-box__detail">
            <p>{{data.receiptAddress.name + '   ' + data.receiptAddress.mobile}}</p>
            <p>{{data.receiptAddress.province + data.receiptAddress.district + data.receiptAddress.address}}</p>
          </div>
        </div>
        <div class="sendqr-detail-box">
          <span class="sendqr-detail-box__title">寄件站点</span>
          <span class="sendqr-detail-box__yin">:</span>
          <span class="sendqr-detail-box__content">{{data.office.name}}</span>
          <img style="width: 1.4rem;padding: 0 1rem;position: absolute;right: 6px;" src="../assets/images/new/pic_ico_map.png" alt="地址" @click="watchOffice(data.officeId)">
        </div>
        <div class="sendqr-detail-box">
          <span class="sendqr-detail-box__title">快递品牌</span>
          <span class="sendqr-detail-box__yin">:</span>
          <span class="sendqr-detail-box__content">{{data.brand}}</span>
        </div>
        <div class="sendqr-detail-box">
          <span class="sendqr-detail-box__title">快递类型</span>
          <span class="sendqr-detail-box__yin">:</span>
          <span class="sendqr-detail-box__content">{{data.type | sendstatus}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {pic as picApi} from '@/api'

export default {
  name: 'sendqr',
  async created () {
    let query = this.$route.query
    let id = query.id || ''
    this.qr = picApi.qr + '?orderSn=' + '' + '&userId=' + id
    const result = await this.setSingleSend({id})
    if (result.type !== 'success') {
      this.$vux.toast.show(result)
    }
  },
  mounted () {
    window.document.title = '寄件明细'
  },
  computed: {
    ...mapGetters({
      data: 'getQrSend'
    })
  },
  data () {
    return {
      qr: '',
      order: '',
      item: {},
      sendAddress: {},
      pickupAddress: {}
    }
  },
  methods: {
    ...mapActions([
      'setSingleSend'
    ]),
    watchOffice (userId) {
      this.$router.push({path: '/office/location', query: {userId}})
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/styles/colors.less';
@import '../assets/styles/helpers.less';
.bgblue {
  background-color: @light-blue;
}
.bgyellow {
  background-color: @dark-yellow;
}
.sendqr {
  .container {
  }
  &-img {
    .btg;
    background: white;
    padding: 1rem;
    img {
      width: 15rem;
    }
    p {
      font-size: 1.4rem;
      color: @greyfont;
    }
  }
  &-detail {
    .btopg;
    margin-top: 20px;
    box-sizing: border-box;
    &-box {
      .flex;
      .btg;
      background: white;
      padding: 1rem 2rem;
      &__icon {
        flex: 1;
        span {
          font-size: 1.8rem;
          width: 4rem;
          height: 4rem;
          line-height: 4rem;
          display: block;
          border-radius: 50%;
          color: white;
        }
      }
      &__detail {
        flex: 4;
        text-align: left;
        p {
          font-size: 1.4rem;
          width: 20rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          @media (max-width:320px) {
            width: 16rem;
          }
          @media (min-width:400px) {
            width: 25rem;
          }
        }
      }
      &__title {
        font-size: 1.6rem;
        width: 7rem;
        text-align: left;
      }
      &__yin {
        font-size: 1.6rem;
      }
      &__content {
        font-size: 1.6rem;
        color: @dark-yellow;
        margin-left: 1rem;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>
