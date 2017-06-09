<template>
  <div class="usercenter">
    <div class="usercenter-info"> 
      <img :src="user.headimgurl" :alt="user.nickname">
      <p>{{user.nickname}}</p>
    </div>
    <div class="usercenter-orderfunc">
      <div class="usercenter-orderfunc-box flex" v-for="item in orderfunc" @click="goPath(item.path)" v-if="item.show">
        <div class="usercenter-orderfunc-box--info">
          <img :src="item.src" alt="">
          <span>{{item.name}}</span>
        </div>
        <span class="arrow-left"></span>
      </div>
    </div>
    <div class="refresh">
      <button :class="{'roate-change': isReresh}" class="btn-sub" @click="loginout"></button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'usercenter',
  async created () {
    this.$store.commit('SET_PAGE', {page: 'usercenter'})
  },
  computed: {
    ...mapGetters({
      user: 'getUserInfo',
      userid: 'getUserId',
      openid: 'getOpenId'
    })
  },
  mounted () {
    window.document.title = '我的'
  },
  data () {
    return {
      isShow: false,
      orderfunc: [{
        src: require('../assets/images/new/min_ico_add.png'),
        name: '地址管理',
        path: '/address',
        show: true
      }, {
        src: require('../assets/images/new/min_ico_pac.png'),
        name: '我的包裹',
        path: '/user/package',
        show: true
      }, {
        src: require('../assets/images/new/min_ico_rea.png'),
        name: '实名认证',
        show: false
      }, {
        src: require('../assets/images/new/min_ico_cus.png'),
        name: '客服中心',
        path: '/customer/service',
        show: true
      }],
      isReresh: false
    }
  },
  methods: {
    goPath (path) {
      if (!path) {
        this.$vux.toast.show({
          text: '暂未开放',
          type: 'warn',
          width: '16rem'
        })
        return
      }
      this.$router.push({path})
      return
    },
    loginout () {
      const _this = this
      this.$vux.confirm.show({
        title: '确定刷新状态吗?',
        onCancel () {
          console.log('no loginout')
        },
        onConfirm () {
          window.localStorage.clear()
          _this.isReresh = true
          setTimeout(function () {
            _this.$router.push({path: '/init', query: {page: 3}})
          }, 1100)
        }
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/styles/colors.less';

.flex {
  display: flex;
  align-items: center;
}

.refresh {
  position: absolute;
  top: 2rem;
  right: 2rem;
  .btn-sub {
    color: white;
    border: none;
    padding: .1rem .2rem;
    font-size: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
    background: url('../assets/images/new/refresh.png') no-repeat;
    background-size: 100% 100%;
    border: none;
    border-radius: 5px;
    transition: all 1s;
  }
}

.roate-change {
  animation: roate 1s ease both alternate;
  animation-iteration-count: 1;
  animation-delay: -0.1s;
  animation-fill-mode: forwards;
  // animation-direction: reverse;
}

@keyframes roate {
  0% {
    transform: scale(2.5) rotate(0deg);
  }
  50% {
    transform: scale(1) rotate(36000deg);
  }
  70% {
    transform: scale(1.5) rotate(7200000deg);
  }
  100% {
    transform: scale(1) rotate(720000000deg);
  }
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
    padding: 2rem;
    background: @dark-yellow;
    overflow: hidden;
    position: relative;
    height: 12rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 7.5rem;
      border-radius: 50%;
    }
    p {
      color: white;
      font-size: 1.6rem;
      padding: 1rem 0 0 0;
      // position: absolute;
      // top: 11rem;
      width: 100%;
      text-align: center;
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
    &-box {
      justify-content: space-between;
      padding: 1.2rem .5rem;
      padding-left: 1rem;
      box-sizing: border-box;
      background: #fff;
      border: 1px solid @borderbt;
      border-top-width: 0;
      &--info {
        flex: 3;
        text-align: left;
        img {
          width: 1.9rem;
          height: auto;
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
