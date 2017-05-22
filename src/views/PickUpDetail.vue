<template>
  <div class="pickupqr">
   <div class="container">
     <div class="pickupqr-img">
       <img class="pickupqr-container-qr" :src="qr" />
       <p>请向店员出示此二维码</p>
     </div>
     <div class="pickupqr-detail">
       <div class="pickupqr-detail-box">
         <span class="pickupqr-detail-box__title">运单号码</span>
         <span class="pickupqr-detail-box__yin">:</span>
         <span class="pickupqr-detail-box__content">{{orderSn}}</span>
       </div>
       <div class="pickupqr-detail-box">
         <span class="pickupqr-detail-box__title">货架号</span>
         <span class="pickupqr-detail-box__yin">:</span>
         <span class="pickupqr-detail-box__content">{{code}}</span>
       </div>
       <div class="pickupqr-detail-box">
         <span class="pickupqr-detail-box__title">快递品牌</span>
         <span class="pickupqr-detail-box__yin">:</span>
         <span class="pickupqr-detail-box__content">{{brandId | brandtype}}</span>
       </div>
       <div class="pickupqr-detail-box">
         <span class="pickupqr-detail-box__title">快递类型</span>
         <span class="pickupqr-detail-box__yin">:</span>
         <span class="pickupqr-detail-box__content">{{state | pickupstate}}</span>
       </div>
     </div>
     <div class="pickupqr-detail">
       <div class="pickupqr-detail-box">
         <span class="pickupqr-detail-box__title">营业厅</span>
         <span class="pickupqr-detail-box__yin">:</span>
         <span class="pickupqr-detail-box__content">{{query.name}}</span>
         <img style="width: 1.4rem;padding: 0 1rem;position: absolute;right: 6px;" src="../assets/images/new/pic_ico_map.png" alt="地址" @click="watchOffice(query.userId)">
       </div>
       <div class="pickupqr-detail-box">
         <span class="pickupqr-detail-box__title">地址</span>
         <span class="pickupqr-detail-box__yin">:</span>
         <span class="pickupqr-detail-box__content">{{query.city + '市' + query.district + query.descript}}</span>
       </div>
       <div class="pickupqr-detail-box">
         <span class="pickupqr-detail-box__title">电话</span>
         <span class="pickupqr-detail-box__yin">:</span>
         <span class="pickupqr-detail-box__content">{{query.mobile}}</span>
       </div>
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
    const userId = query.userId
    this.qr = picApi.qr + '?orderSn=' + query.orderSn + '&userId=' + window.localStorage.getItem('mj_userId') || userId
    this.orderSn = query.orderSn
    this.mobile = query.mobile
    this.code = query.code
    this.state = query.state
    this.brandId = query.brandId
    this.query = query
  },
  mounted () {
    window.document.title = '收件明细'
  },
  data () {
    return {
      qr: '',
      orderSn: '',
      mobile: '',
      code: '',
      state: '',
      brandId: '',
      query: {}
    }
  },
  methods: {
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
.pickupqr {
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
    margin-top: 16px;
    box-sizing: border-box;
    &-box {
      .flex;
      .btg;
      background: white;
      padding: .7rem 2rem;
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
      }
    }
  }
}
</style>
