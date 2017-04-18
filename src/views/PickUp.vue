<template>
  <div class="pickup">
    <div class="pickup-cell">
      <p class="pickup-cell-status">待签收:</p>
      <div class="pickup-cell-detail">
        <p class=""><span class="pickup-cell-detail__title">单号:</span>8455415245555 <span>等待取件</span></p>
        <p><span class="pickup-cell-detail__title">营业厅:</span>金刚大剧院</p>
        <p>上海 闵行 七宝镇 信隆路1212号</p>
        <p>2017-4-10</p>
      </div>
    </div>

    <div class="pickup-cell">
      <p class="pickup-cell-status">已签收:</p>
      <div class="pickup-cell-detail">
        <p><span>单号:</span>8455415245555 <span>已经签收</span></p>
        <p><span>营业厅:</span>金刚大剧院</p>
        <p>上海 闵行 七宝镇 信隆路1212号</p>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'pickup',
  created () {
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../assets/styles/colors.less';
</style>
