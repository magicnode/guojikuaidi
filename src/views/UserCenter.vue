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
    <div class="" style="padding:2rem 0;"> 
      <button class="btn-sub" @click="loginout">刷新状态</button>
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
      }]
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
          _this.$router.push({path: '/init', query: {page: 3}})
        }
      })
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

.btn-sub {
  color: white;
  border: none;
  padding: 1rem 1rem;
  font-size: 1.8rem;
  width: 100%;
  background-color: @dark-yellow;
  border: none;
  border-radius: 5px;
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
    border-top: 1px solid @borderbt;
    &-box {
      justify-content: space-between;
      padding: 1.2rem .5rem;
      padding-left: 1rem;
      box-sizing: border-box;
      background: #fff;
      border-right: 1px solid @borderbt;
      border-left: 1px solid @borderbt;
      border-bottom: 1px solid @borderbt;
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
