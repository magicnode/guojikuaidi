<template>
  <div class="usercenter">
    <div class="usercenter-info"> 
      <img src="../assets/images/min_ico_1.png" class="usercenter-info-identify">
      <div class="flex">
        <div class="flex-box usercenter-info-icon">
          <img src="../assets/images/atm.jpg" class="usercenter-info-icon">
        </div>
        <div class="flex-box usercenter-info-detail">
          <p>阿童木</p>
          <p>15686565445</p>
          <p>优惠券　0　|　积分　0　|　评价　0</p>
        </div>
      </div>
    </div>

    <div class="usercenter-balance flex">
      <div class="usercenter-balance-count">
        余额 ￥ 50000
      </div>
      <div class="usercenter-balance-func">
        充值提现 <img src="../assets/images/mini_ico_4.png" alt="">
      </div>
    </div>

    <div class="usercenter-order flex">
      <span class="usercenter-order-title">
        <img src="../assets/images/min_ico__03.png" alt=""><span>我的订单</span>
      </span>
      <span class="usercenter-order-icon" :class="{'arrow-top': isShow}" @click.stop="isShow = !isShow">
        <img src="../assets/images/min_ico_2r.png" alt="" >
      </span>
    </div>
    
    <transition name="expand">
      <div class="usercenter-orderdetail flex" v-show="isShow">
        <div class="usercenter-orderdetail-box" v-for="item in orderdetail">
          <img :src="item.src" alt="">
          <p>{{item.name}}</p>
        </div>
      </div>
    </transition>

    <div class="usercenter-orderfunc flex">
      <div class="usercenter-orderfunc-box" v-for="item in orderfunc" @click="goPath(item.path)">
        <img :src="item.src" alt="">
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'usercenter',
  created () {
  },
  data () {
    return {
      isShow: false,
      orderdetail: [{
        src: require('../assets/images/min_ico__07.png'),
        name: '寄件订单'
      }, {
        src: require('../assets/images/min_ico__09.png'),
        name: '待取件'
      }, {
        src: require('../assets/images/min_ico__11.png'),
        name: '待支付'
      }, {
        src: require('../assets/images/min_ico__13.png'),
        name: '待评论'
      }, {
        src: require('../assets/images/min_ico__20.png'),
        name: '收件订单'
      }, {
        src: require('../assets/images/min_ico__22.png'),
        name: '待签收'
      }, {
        src: require('../assets/images/min_ico__24.png'),
        name: '投诉订单'
      }, {
        src: require('../assets/images/min_ico__26.png'),
        name: '赔偿订单'
      }],
      orderfunc: [{
        src: require('../assets/images/min_ico__33.png'),
        name: '支付绑定'
      }, {
        src: require('../assets/images/min_ico__36.png'),
        name: '地址管理',
        path: '/address'
      }, {
        src: require('../assets/images/min_ico__39.png'),
        name: '账单记录'
      }, {
        src: require('../assets/images/min_ico__45.png'),
        name: '我的红包'
      }, {
        src: require('../assets/images/min_ico__48.png'),
        name: '我的好友'
      }, {
        src: require('../assets/images/min_ico__51.png'),
        name: '我的保险'
      }, {
        src: require('../assets/images/min_ico__57.png'),
        name: '推荐反现'
      }, {
        src: require('../assets/images/min_ico__59.png'),
        name: '咨询投诉'
      }, {
        src: require('../assets/images/min_ico__61.png'),
        name: '客服中心'
      }]
    }
  },
  methods: {
    goPath (path) {
      this.$router.push({path})
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../assets/styles/colors.less';

.flex {
  display: flex;
  align-items: center;
}

.usercenter-padding {
  padding: 1rem;
}

.arrow-top {
  transform: rotate(180deg);
}

.usercenter {
  overflow: hidden;
  padding-bottom: 11vh;
  &-info {
    padding: 1rem;
    background: @dark-yellow;
    width: 100%;
    overflow: hidden;
    position: relative;
    &-identify {
      width: 6%;
      position: absolute;
      right: 20%;
      top: 1rem;
    }
    &-icon {
      flex: 1;
      img {
        width: 100%;
        border-radius: 10%;
        vertical-align: middle;
        min-height: 6rem;
      }
    }
    &-detail {
      padding-left: 1rem;
      color: white;
      flex: 4;
      text-align: left;
      p {
        font-size: 1.3rem;
        padding: .1rem;
      }
    }
  }

  &-balance {
    justify-content: space-between;
    padding: .6rem 1rem;
    font-size: 1.6rem;
    font-weight: 600;
    background: white;
    img {
      padding-left: 1rem;
      width: 1rem;
      vertical-align: middle;
    }
  }

  &-order {
    .usercenter-padding;
    justify-content: space-between;
    background: #fff;
    margin-top: 1rem;
    &-title {
      font-size: 1.2rem;
      img {
        width: 20%;
        vertical-align: bottom;
        *vertical-align: middle;
        margin-right: 1rem;
      }
    }

    &-icon {
      width: 4rem;
      text-align: right;
      transition: all .4s;
      img {
        width: 1.4rem;
        vertical-align: middle;
      }
    }
  }

  &-orderdetail {
    flex-wrap: wrap;
    border-top: 1px solid #F1F1F1;
    &-box {
      padding-top: 1rem;
      min-width: 25%;
      box-sizing: border-box;
      background: #fff;
      border-right: 1px solid #F1F1F1;
      font-size: 1.2rem;
      &:after {
        padding-top: 1rem;
        display: block;
        content: '';
        border-bottom: 1px solid #F1F1F1;
      }
      img {
        width: 36%;
      }
    }
  }

  &-orderfunc {
    margin-top: 1rem;
    flex-wrap: wrap;
    border-top: 1px solid #F1F1F1;
    &-box {
      padding-top: 1rem;
      min-width: 33.33%;
      width: 33.33%;
      box-sizing: border-box;
      background: #fff;
      border-right: 1px solid #F1F1F1;
      &:after {
        padding-top: 1rem;
        display: block;
        content: '';
        border-bottom: 1px solid #F1F1F1;
      }
      img {
        width: 36%;
      }
    }
  }
}
</style>
