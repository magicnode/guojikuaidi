<template>
  <div class="usercenter">
    <div class="usercenter-info"> 
      <img :src="user.headimgurl" :alt="user.nickname">
      <p>{{user.nickname}}</p>
    </div>

    <div class="usercenter-orderfunc">
      <div class="usercenter-orderfunc-box flex" v-for="item in orderfunc" @click="goPath(item.path)">
        <div class="usercenter-orderfunc-box--info">
          <img :src="item.src" alt="">
          <span>{{item.name}}</span>
        </div>
        <span class="arrow-left"></span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'usercenter',
  created () {
    if (!this.openid) {
      return this.$router.push({path: '/', query: {page: 3}})
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUserInfo',
      openid: 'getOpenId'
    })
  },
  data () {
    return {
      isShow: false,
      orderfunc: [{
        src: require('../assets/images/new/min_ico_add.png'),
        name: '地址管理',
        path: '/address'
      }, {
        src: require('../assets/images/new/min_ico_pac.png'),
        name: '我的包裹'
      }, {
        src: require('../assets/images/new/min_ico_rea.png'),
        name: '实名认证'
      }, {
        src: require('../assets/images/new/min_ico_cus.png'),
        name: '客服中心'
      }]
    }
  },
  methods: {
    goPath (path) {
      if (!path) {
        this.$vux.toast.show({
          text: '暂未开放',
          type: 'warn'
        })
        return
      }
      this.$router.push({path})
      return
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
  padding: 1.2rem;
  &-info {
    padding: 1rem;
    background: @dark-yellow;
    overflow: hidden;
    position: relative;
    height: 12rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 6rem;
      border-radius: 50%;
    }
    p {
      color: white;
      font-size: 1.6rem;
      padding: 1rem 0;
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

  &-orderfunc {
    flex-wrap: wrap;
    border-top: 1px solid #F1F1F1;
    &-box {
      justify-content: space-between;
      padding: .8rem 0;
      padding-left: 1rem;
      box-sizing: border-box;
      background: #fff;
      border-right: 1px solid #F1F1F1;
      border-bottom: 1px solid #F1F1F1;
      &--info {
        flex: 3;
        text-align: left;
        img {
          width: 1.8rem;
          height: 2rem;
          margin-right: 7px;
          vertical-align:middle;
          font-size: 0;
        }
        span {
          font-size: 1.6rem;
        }
      }
      .arrow-left {
        flex: 1;
        height: 1.3rem;
        background: url('../assets/images/new/sen_ico_arr.png') no-repeat;
        background-size: 0.9rem 1.3rem;
        background-position-x: 80%;
      }
    }
  }
}
</style>
