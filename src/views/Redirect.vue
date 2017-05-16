<template>
  <div class="redirect">
  </div>
</template>

<script>

export default {
  created () {
    let {code, state} = this.$route.query
    if (!code && !state) {
      console.log('Redirect.vue: no code fail')
    } else {
      window.localStorage.removeItem('mj_code')
      window.localStorage.setItem('mj_code', code)
      this.$router.push({path: '/init', query: {code, page: state}})
    }
  },
  data () {
    return {
    }
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
