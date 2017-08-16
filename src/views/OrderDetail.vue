<template>
  <div class="sendqr">
    <div class="container">
      <div class="sendqr-detail">
        <div class="sendqr-detail-box">
          <div class="sendqr-detail-box__icon">
            <span class="bgblue">寄</span>
          </div>
          <div class="sendqr-detail-box__detail">
            <p>{{data.listMailingaddress[0].linkman + '   ' + data.listMailingaddress[0].iphone}}</p>
            <p>{{sendAddress}}</p>
            <p>{{ data.listMailingaddress[0].detailedinformation}}</p>
          </div>
        </div>
        <div class="sendqr-detail-box">
          <div class="sendqr-detail-box__icon">
            <span class="bgyellow">收</span>
          </div>
          <div class="sendqr-detail-box__detail">
            <p>{{data.listConsigneeaddress[0].recipients + '   ' + data.listConsigneeaddress[0].iphone}}</p>
            <p>{{pickupAddress}}</p>
            <p>{{data.listConsigneeaddress[0].detaliedinformation}}</p>
          </div>
        </div>
        <div class="sendqr-detail-box">
          <span class="sendqr-detail-box__title">备注</span>
          <span class="sendqr-detail-box__yin">:</span>
          <span class="sendqr-detail-box__content">{{data.remove}}</span>
        </div>
        <div class="sendqr-detail-box">
          <span class="sendqr-detail-box__title">订单状态</span>
          <span class="sendqr-detail-box__yin">:</span>
          <span class="sendqr-detail-box__content">{{data.starte | orderstatus}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import { order as orderApi } from '@/api'

let instance = axios.create({
  timeout: 5000
})

const localStorage = window.localStorage

export default {
  name: 'orderdetail',
  async created () {
    let query = this.$route.query
    let id = query.id || 1
    await this.getOrderDetail(id)
    const sendgeography = this.data['listMailingaddress'][0]
    const sendAddress = await this.getGeography({countryid: sendgeography.nationid, provinceid: sendgeography.provinnce, cityid: sendgeography.city, countyid: sendgeography.county})
    this.sendAddress = sendAddress.data
    const pickupgeography = this.data['listConsigneeaddress'][0]
    const pickupAddress = await this.getGeography({countryid: pickupgeography.nation, provinceid: pickupgeography.provinnce, cityid: pickupgeography.city, countyid: pickupgeography.county})
    this.pickupAddress = pickupAddress.data
  },
  mounted () {
    window.document.title = '寄件明细'
  },
  data () {
    return {
      data: {},
      item: {},
      sendAddress: '',
      pickupAddress: ''
    }
  },
  methods: {
    ...mapActions([
      'getGeography'
    ]),
    async getOrderDetail (id = 1) {
      try {
        const orderdetail = await instance({
          method: 'post',
          url: orderApi.detail,
          params: {
            OrderInfoid: id
          },
          headers: {'token': localStorage.getItem('mj_token')}
        })
        if (orderdetail.status !== 200) {
          return this.$vux.toast.show({
            text: '获取寄件详情失败',
            type: 'warn',
            width: '18rem'
          })
        }
        if (orderdetail.data.code !== 200) {
          return this.$vux.toast.show({
            text: orderdetail.data.mess,
            type: 'warn',
            width: '18rem'
          })
        }
        let data = orderdetail.data.obj
        console.log('data', data)
        if (data.length > 0) {
          data.sort(function (a, b) {
            return a.id < b.id
          })
        }
        this.data = data[0]
        return
      } catch (e) {
        console.error(e)
        return this.$vux.toast.show({
          text: e.message,
          type: 'warn',
          width: '18rem'
        })
      }
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
