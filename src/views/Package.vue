<template>
  <div class="package">
    <mj-header title="我的包裹"></mj-header>
    <div class="package-container">
      <div class="package-container-tab">
        <tab active-color='#ff750f'>
          <tab-item selected @on-item-click="onItemClick">寄件</tab-item>
          <tab-item @on-item-click="onItemClick">收件</tab-item>
        </tab>
      </div>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem } from 'vux'

export default {
  name: 'package',
  components: {
    Tab,
    TabItem
  },
  created () {
  },
  data () {
    return {
    }
  },
  methods: {
    onItemClick () {
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../assets/styles/colors.less';
@import '../assets/styles/helpers.less';
.package {
  &-container {
    &-tab {
      .vux-tab-item {
        font-size: 1.6rem!important;
      }
    }
  }
}
</style>
