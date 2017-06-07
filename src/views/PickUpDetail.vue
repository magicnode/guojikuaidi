<template>
  <div class="pickupqr">
   <div class="container">
     <div class="pickupqr-img">
       <router-link :to="{path: '/express/route', query: {orderSn: query.orderSn, brand: query.brandId}}" class="express-router__link">查看路由</router-link>
       <div class="pickupqr-img--wait" v-show="state !== '301'">
         <img :src="qr" />
         <p>
           取件时，请向店员出示此二维码
         </p>
       </div>
       <div class="pickupqr-img--sign" v-show="state === '301'">
         <img src="../assets/images/new/rec_ico_rig.png" />
         <p>
            快递已经签收
         </p>
       </div>
     </div>
     <div class="pickupqr-detail">
       <div class="pickupqr-detail-box">
         <span class="pickupqr-detail-box__title">运单号码</span>
         <span class="pickupqr-detail-box__yin">:</span>
         <span class="pickupqr-detail-box__content">{{query.orderSn}}</span>
       </div>
       <div class="pickupqr-detail-box">
         <span class="pickupqr-detail-box__title">货架号</span>
         <span class="pickupqr-detail-box__yin">:</span>
         <span class="pickupqr-detail-box__content">{{query.code}}</span>
       </div>
       <div class="pickupqr-detail-box">
         <span class="pickupqr-detail-box__title">快递品牌</span>
         <span class="pickupqr-detail-box__yin">:</span>
         <span class="pickupqr-detail-box__content">{{query.brandId | brandtype}}</span>
       </div>
       <div class="pickupqr-detail-box">
         <span class="pickupqr-detail-box__title">快递类型</span>
         <span class="pickupqr-detail-box__yin">:</span>
         <span :class="{'darkyellow': (Number(query.expresstype) === 0), 'lightyellow': (Number(query.expresstype) !== 0)}" class="pickupqr-detail-box__content" >{{query.expresstype | pickupstate}}</span>
       </div>
     </div>
     <div class="pickupqr-detail">
       <div class="pickupqr-detail-box">
         <span class="pickupqr-detail-box__title">取件站点</span>
         <span class="pickupqr-detail-box__yin">:</span>
         <span class="pickupqr-detail-box__content">{{office.name}}</span>
         <img style="width: 1.4rem;padding: 0 1rem;position: absolute;right: 6px;" src="../assets/images/new/pic_ico_map.png" alt="地址" @click="watchOffice(query.userId)">
       </div>
       <div class="pickupqr-detail-box">
         <span class="pickupqr-detail-box__title">地址</span>
         <span class="pickupqr-detail-box__yin">:</span>
         <span class="pickupqr-detail-box__content">{{office.province + office.city + '市' + office.district + office.descript}}</span>
       </div>
       <div class="pickupqr-detail-box">
         <span class="pickupqr-detail-box__title">电话</span>
         <span class="pickupqr-detail-box__yin">:</span>
         <span class="pickupqr-detail-box__content"><a :href="tel">{{office.mobile}}</a></span>
       </div>
     </div>
   </div>
  </div>
</template>
<script>
import {pic as picApi, address as addressApi} from '@/api'

export default {
  name: 'pickupdetail',
  async created () {
    const query = this.$route.query
    const userId = query.userId
    this.qr = picApi.pickupqr + '?orderSn=' + query.orderSn + '&userId=' + userId || window.localStorage.getItem('mj_userId')
    this.query = query
    const office = await this.$http.post(addressApi.officelocation + '?userId=' + query.userId)
    this.state = query.state || '101'
    if (office.status !== 200) {
      this.$vux.toast.show({
        text: '获取站点信息失败',
        type: 'warn',
        width: '18rem'
      })
    } else {
      this.office = office.data
      this.tel = 'tel:' + this.office.mobile
    }
  },
  mounted () {
    window.document.title = '收件明细'
  },
  data () {
    return {
      qr: '',
      office: {},
      query: {},
      tel: '',
      state: ''
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

.darkyellow {
  color: @dark-yellow;
}

.lightyellow {
  color: @red!important;
}

.pickupqr {
  .container {
  }
  &-img {
    .btg;
    background: white;
    padding: 1rem;
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
        width: 8rem;
        height: auto;
      }
      p {
        padding-top: 1.5rem;
        font-size: 1.8rem;
        color: @dark-yellow;
      }
    }
    button {
      text-align: center;
      border: none;
      background: @dark-yellow;
      padding: .2rem 0.3rem;
      color: white;
      border-radius: 5px;
      margin-left: 6px;
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
      padding-right: 0;
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
        white-space: pre-wrap;
        max-width: 80%;
        text-align: left;
        a {
          color: @dark-yellow;
        }
      }
    }
  }
}
</style>
