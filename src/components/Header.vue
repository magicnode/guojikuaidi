<template>
  <header>
    <div class="header">
      <div :class="{'header-index': isIndex}">
      </div>
      <div :class="{'header-hide': isIndex}" class="header-left" @click="goBack">
        <slot name="left"></slot>
      </div>
      <div class="header-title" @click.stop="goIndex">{{title}}</div>
      <div class="header-right">        
      </div>
    </div>
  </header>
</template>

<script>
import window from 'window'

export default {
  name: 'header',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isIndex: false
    }
  },
  created () {
    const path = this.$route.path
    if (path === '/') {
      this.isIndex = true
    }
  },
  methods: {
    goBack () {
      const path = this.$route.path
      if (path !== '/' && window.history.length === 1) {
        this.$router.push({path: '/'})
      } else {
        this.$router.go(-1)
      }
    },
    goIndex () {
      const path = this.$route.path
      const that = this
      if (path !== '/index' && path !== '/') {
        that.$vux.confirm.show({
          title: '是否返回主页?',
          onCancel () {},
          onConfirm () {
            that.$router.push({path: '/'})
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../assets/styles/colors.less';
  .header {
    display: flex;
    align-items: center;
    background-color: @header-dark;
    padding: 0 .2rem;
    height: 7vh;
    &-hide {
      display: none;
    }
    &-index {
      flex: 1;
      height: 2rem;
    }
    &-title {
      flex: 2;
      color: white;
      font-size: 1.8rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    &-left {
      flex: 1;
      height: 2rem;
      background: url('../assets/images/back.png') no-repeat;
      background-size: 2rem;
      background-position: 1rem 0rem;
    }
    &-right {
      flex: 1;
    }
  }
</style>
