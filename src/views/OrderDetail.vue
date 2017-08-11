<template>
  <div class="sendqr">
    <div class="container">
      <div class="sendqr-img">
        <router-link :to="{path: '/express/route', query: {orderSn: data.order, brand: data.brandId}}" class="express-router__link" v-show="data.type !== 1">查看路由</router-link>
        <div class="sendqr-img--wait" v-show="data.type === 1">
          <img :src="qr" />
          <p>寄件时，请向店员出示此二维码</p>
        </div>
        <div class="sendqr-img--sign" v-show="data.type !== 1">
          <img src="../assets/images/new/rec_ico_rig.png" />
          <p>快递已经寄出</p>
        </div>
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
          <span class="sendqr-detail-box__title">快递品牌</span>
          <span class="sendqr-detail-box__yin">:</span>
          <span class="sendqr-detail-box__content">{{data.brandId | brandtype}}</span>
        </div>
        <div class="sendqr-detail-box">
          <span class="sendqr-detail-box__title">快递类型</span>
          <span class="sendqr-detail-box__yin">:</span>
          <span class="sendqr-detail-box__content">{{data.expresstype | pickupstate}}</span>
        </div>
        <div class="sendqr-detail-box" v-show="data.pay_type">
          <span class="sendqr-detail-box__title">支付方式</span>
          <span class="sendqr-detail-box__yin">:</span>
          <span class="sendqr-detail-box__content">{{data.pay_type | paytype}}</span>
        </div>
        <div class="sendqr-detail-box" v-show="data.price">
          <span class="sendqr-detail-box__title">支付金额</span>
          <span class="sendqr-detail-box__yin">:</span>
          <span class="sendqr-detail-box__content">{{'￥' +data.price}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {pic as picApi} from '@/api'

export default {
  name: 'orderdetail',
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
.darkyellow {
  color: @dark-yellow;
}

.lightyellow {
  color: @red!important;
}
.sendqr {
  .container {
  }
  &-img {
    .btg;
    background: white;
    padding: 1rem;
    padding-bottom: 2.5rem;
    &--wait {
      img {
        width: 15rem;
      }
      p {
        font-size: 1.4rem;
        color: @greyfont;
      }
    }
    &--sign {
      img {
        padding: 2.5rem;
        padding-bottom: 0.8rem;
        width: 6rem;
        height: auto;
      }
      p {
        font-size: 1.8rem;
        color: @dark-yellow;
      }
    }
    button {
      text-align: center;
      border: none;
      background: @dark-yellow;
      padding: 0 0.3rem;
      color: white;
      border-radius: 5px;
      margin-left: 6px;
    }
  }
  &-detail {
    .btopg;
    margin-top: 1.17647059em;
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
          white-space: pre-line;
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
