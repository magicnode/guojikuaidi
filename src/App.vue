<template>
  <div id="app">
    <router-view></router-view>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
import { Loading } from 'vux'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    })
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
  background-color: #fbf9fe;
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

</style>
