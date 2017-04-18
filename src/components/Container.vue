<template>
  <div class="mj">
    <mh-header :title="title"></mh-header>
    <div class="mj-container">
      <slot name="container"></slot>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'index',
  created () {
  },
  data () {
    return {
      date: null,
      modalVisi: false
    }
  },
  methods: {
  },
  computed: {
    ...mapState(['title'])
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../assets/styles/colors.less';
  @import '../assets/styles/helpers.less';
 .mj {
    &-container {
      min-height: 92vh;
      background-color: @bg-grey;
    }
 }
</style>
