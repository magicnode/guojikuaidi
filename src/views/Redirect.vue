<template>
  <div class="redirect">
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'app',
  async created () {
    if (!this.init) {
      alert(1)
      this.$store.commit('SET_USERINIT', {init: true})
    } else {
      let {code, state} = this.$route.query
      const appid = 'wx543968867249e28d'
      const secret = 'efc582e21d07549a8bade66ceefdc312'
      // if (process.env.NODE_ENV !== 'development') {
      // }
      try {
        // const fullPath = this.$route.fullPath
        if (!code && !state) {
          alert('fail')
        } else {
          const openidres = await this.setOpenid({appid, code, secret})
          if (openidres.type !== 'success') {
            this.$vux.toast.show({
              type: 'warn',
              text: '获取openid失败1，请从公众号重新点击进入',
              width: '15rem'
            })
            return
          }
          // 通过openid获取用户信息
          const userinfo = await this.setUserInfo({openid: this.openid})
          if (userinfo.type === 'text') {
            this.$router.push({path: '/bindphone'})
            return
          } else if (userinfo.type === 'warn') {
            this.$vux.toast.show(userinfo)
            return
          }
          alert('success')
          // const _this = this
          // switch (state) {
          //   case 1:
          //     _this.$router.push({path: '/pickup'})
          //     break
          //   case 2:
          //     _this.$router.push({path: '/send'})
          //     break
          //   case 3:
          //     _this.$router.push({path: '/usercenter'})
          //     break
          //   default:
          //     break
          // }
        }
      } catch (e) {
        console.error(e)
        this.$vux.toast.show({
          type: 'warn',
          text: '未知错误发生了...我也很绝望...',
          width: '15rem'
        })
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      isJump: state => state.isJump,
      jumpSrc: state => state.jumpSrc
    }),
    ...mapGetters({
      'openid': 'getOpenId',
      'init': 'getUserInit'
    })
  },
  methods: {
    ...mapActions([
      'setOpenid',
      'setUserInfo'
    ])
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

html,body{
  font-size: 10px;
  padding: 0;
  margin: 0;
}

body {
  background-color: #efeff4;
}

@media screen and (min-width:321px) and (max-width:375px){html{font-size:10px}}
@media screen and (min-width:376px) and (max-width:414px){html{font-size:10px}}
@media screen and (min-width:415px) and (max-width:639px){html{font-size:12px}}
@media screen and (min-width:640px) and (max-width:719px){html{font-size:12px}}
@media screen and (min-width:720px){html{font-size:16px}}
@media screen and (min-width:750px) and (max-width:799px){html{font-size:23.5px}}
@media screen and (min-width:800px)and (max-width:1199px){html{font-size:25px}}
@media screen and (min-width:1200px){html{font-size:30px}}

#app {
	font-family: 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.loading-img {
  position: absolute;
  top: 20%;
  left: 0;
  width: 100%;
  height: auto;
}

.pic-enter-active {
  animation: pic-in .5s;
}
.pic-leave-active {
  animation: pic-out .5s;
}
@keyframes pic-in {
  0% {
    transform: scale(0) rotate3d(360,360,360,360deg);
  }
  50% {
    transform: scale(1.5) rotate3d(120,120,120,120deg);
  }
  100% {
    transform: scale(1) rotate3d(0,0,0,0deg);
  }
}
@keyframes pic-out {
  0% {
    transform: scale(1) rotate3d(0,0,0,0deg);
  }
  50% {
    transform: scale(1.5) rotate3d(120,120,120,120deg);
  }
  100% {
    transform: scale(0) rotate3d(360,360,360,360deg);
  }
}

</style>
