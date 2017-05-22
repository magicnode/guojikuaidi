<template>
  <div class="mj">
    <transition name="bounce">
      <router-view></router-view>
    </transition>
    <mj-footer></mj-footer>
  </div>
</template>
<script>
import MJFooter from '@/components/Footer'

export default {
  name: 'contains',
  created () {
    // if (process.env.NODE_ENV === 'development') {
    //   window.localStorage.setItem('mj_code', code)
    //   window.localStorage.setItem('mj_init', 'done')
    //   window.localStorage.setItem('mj_headimgurl', '//wx.qlogo.cn/mmopen/zYCT2SFoRZOlR2cj0EFrkNWbEBzsW8jxnPN7RFOEePukrWG3ItP6icX1jKXYliaVibBMUnAprSDPqPttLuApDx8Yz4aCJt22XOP/0')
    //   window.localStorage.setItem('mj_mobile', '17317272575')
    //   window.localStorage.setItem('mj_nickname', '呃嗯丶')
    //   window.localStorage.setItem('mj_openid', 'oCk9ywj1vT0B3ltw2m3dfE6FnHzI')
    //   window.localStorage.setItem('mj_userId', '8')
    //   return
    // }
    // 获取路径参数
    // function GetQueryString (name) {
    //   const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    //   const params = window.location.search.substr(1).match(reg)
    //   if (params !== null) return params[2]
    //   return null
    // }
    // const code = GetQueryString('code')
    // const state = GetQueryString('state')
    // if (!code && !state) {
    //   console.log('container.vue: no code fail')
    //   return this.$router.push({path: '/nouser'})
    // } else {
    //   window.localStorage.removeItem('mj_code')
    //   window.localStorage.removeItem('mj_init')
    //   window.localStorage.setItem('mj_code', code)
    //   window.localStorage.setItem('mj_init', 'done')
    //   this.$router.push({path: '/init', query: {code, page: state}})
    //   return
    // }
  },
  components: {
    'mj-footer': MJFooter
  },
  data () {
    return {
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../assets/styles/colors.less';
.mj {
  min-height: 100vh;
  background-color: @bg-grey;
}

.bounce-enter-active {
  animation: bounce-in .4s;
}
.bounce-leave-active {
  animation: bounce-out .5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0);
  }
}

.expand-enter-active {
  animation: expand-in .5s;
}
.expand-leave-active {
  animation: expand-out .7s;
}
@keyframes expand-in {
  0% {
    margin-top: 1rem;
    transform: scale(.6) translateX(-1500px);
  }
  25% {
    margin-top: 1rem;
    transform: scale(.6) translateX(200px);
  }
  50% {
    margin-top: 1rem;
    transform: scale(.6) translateX(200px);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes expand-out {
  0% {
    margin-top: 1rem;
    transform: scaleX(.8) scaleY(.6);
  }
  9% {
    margin-top: 1rem;
    transform: scaleX(.8) scaleY(.6);
  }
  10% {
    margin-top: 1rem;
    transform: scaleX(.8) scaleY(.6) translateX(100px);
  }
  25% {
    margin-top: 1rem;
    transform: scaleX(.8) scaleY(.6) translateX(200px);
  }
  50% {
    margin-top: 1rem;
    transform: scaleX(.8) scaleY(.6) translateX(250px);
  }
  75% {
    margin-top: 1rem;
    transform: scaleX(.8) scaleY(.6) translateX(-1000px);
  }
  100% {
    margin-top: 1rem;
    transform: scaleX(.8) scaleY(0) translateX(-1000px);
  }
}


</style>
