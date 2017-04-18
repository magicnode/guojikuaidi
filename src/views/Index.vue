<template>
  <div class="index">
    <div class="index-header flex">
      <div class="index-header-box" v-for="item in header">
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
        name: '签收'
      }, {
        src: require('../assets/images/home_miaoji_05.png'),
        name: '收件'
      }, {
        src: require('../assets/images/home_miaoji_07.png'),
        name: '寄件'
      }, {
        src: require('../assets/images/home_miaoji_09.png'),
        name: '我的微商'
      }],
      orderfunc: [{
        src: require('../assets/images/min_ico__33.png'),
        name: '支付绑定'
      }, {
        src: require('../assets/images/min_ico__36.png'),
        name: '地址管理'
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
    background-color: #393a3f;
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
}

</style>
