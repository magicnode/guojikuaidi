<template>
  <div class="index">
    <div class="index-header flex">
      <div class="index-header-box" v-for="item in header" :key="item.name" @click="goPath(item.path)">
        <img :src="item.src" alt="">
        <p>{{item.name}}</p>
      </div>
    </div>

    <div class="index-func flex">
      <div class="index-func-box" v-for="item in func">
        <img :src="item.src" alt="">
        <p>{{item.name}}</p>
      </div>
    </div>

  </div>
</template>
<script>

export default {
  name: 'index',
  created () {
  },
  data () {
    return {
      header: [{
        src: require('../assets/images/home_miaoji_03.png'),
        name: '签收',
        path: 'Sign'
      }, {
        src: require('../assets/images/home_miaoji_05.png'),
        name: '收件',
        path: 'PickUp'
      }, {
        src: require('../assets/images/home_miaoji_07.png'),
        name: '寄件',
        path: 'Send'
      }, {
        src: require('../assets/images/home_miaoji_09.png'),
        name: '我的微商',
        path: 'WeShop'
      }],
      func: [{
        src: require('../assets/images/home_miaoji_19.png'),
        name: '我的账户'
      }, {
        src: require('../assets/images/home_miaoji_16.png'),
        name: '快递信息'
      }, {
        src: require('../assets/images/home_miaoji_22.png'),
        name: '账单查询'
      }, {
        src: require('../assets/images/home_miaoji_25.png'),
        name: '实名认证'
      }, {
        src: require('../assets/images/home_miaoji_31.png'),
        name: '锦囊赚钱'
      }, {
        src: require('../assets/images/home_miaoji_22.png'),
        name: '保险服务'
      }, {
        src: require('../assets/images/home_miaoji_34.png'),
        name: '福利兑换'
      }, {
        src: require('../assets/images/home_miaoji_37.png'),
        name: '好友寄件'
      }, {
        src: require('../assets/images/home_miaoji_44.png'),
        name: '客服中心'
      }, {
        src: require('../assets/images/home_miaoji_46.png'),
        name: '快递投诉'
      }]
    }
  },
  methods: {
    goPath (name) {
      this.$router.push({name})
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

.index {
  &-header {
    padding: 1rem 0;
    border-top: 0.05rem solid #000;
    width: 100%;
    background-color: @header-dark;
    justify-content: space-around;
    &-box {
      flex: 1;
      color: white;
      img {
        width: 50%;
      }
      p {
        font-size: 1.4rem;
      }
    }
  }

  &-func {
    flex-wrap: wrap;
    border-top: 1px solid #F1F1F1;
    &-box {
      padding-top: 1rem;
      min-width: 25%;
      width: 25%;
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
