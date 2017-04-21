<template>
  <div class="senddetail">
    <mj-header title="寄件列表"></mj-header>
    <div class="scroll-container">
      <div class="senddetail-cell">
        <p class="senddetail-cell-status">待寄件:</p>
        <div class="senddetail-cell-detail" @click="goPath">
          <p class=""><span class="senddetail-cell-detail__title">单号:</span>8455415245555 <span class="wait-senddetail clearfixed">等待取件</span></p>
          <p><span class="senddetail-cell-detail__title">营业厅:</span>金刚大剧院</p>
          <p>上海 闵行 七宝镇 信隆路1212号</p>
          <p class="time">2017-4-10</p>
        </div>

        <div class="senddetail-cell-detail">
          <p class=""><span class="senddetail-cell-detail__title">单号:</span>8455415245555 <span class="wait-senddetail clearfixed">等待取件</span></p>
          <p><span class="senddetail-cell-detail__title">营业厅:</span>金刚大剧院</p>
          <p>上海 闵行 七宝镇 信隆路1212号</p>
          <p class="time">2017-4-10</p>
        </div>
        <hr>
      </div>

      <div class="senddetail-cell">
        <p class="senddetail-cell-status">已寄件:</p>
        <div class="senddetail-cell-detail">
          <p><span>单号:</span>8455415245555 <span class="already-senddetail clearfixed">已经签收</span></p>
          <p><span>营业厅:</span>金刚大剧院</p>
          <p>上海 闵行 七宝镇 信隆路1212号</p>
          <p class="time">2017-4-10</p>
        </div>

        <div class="senddetail-cell-detail">
          <p><span>单号:</span>8455415245555 <span class="already-senddetail clearfixed">已经签收</span></p>
          <p><span>营业厅:</span>金刚大剧院</p>
          <p>上海 闵行 七宝镇 信隆路1212号</p>
          <p class="time">2017-4-10</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'senddetail',
  created () {
  },
  data () {
    return {
    }
  },
  methods: {
    goPath () {
      this.$router.push({path: 'qr'})
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/styles/colors.less';
@import '../assets/styles/helpers.less';
.scroll-container {
  padding: 0 1rem;
}

.senddetail {
  &-cell {
    padding: 0 1rem;
    &-status {
      font-size: 1.6rem;
      text-align: left;
      padding: 1rem;
      padding-bottom: 0;
    }
    &-detail {
      background: white;
      text-align: justify;
      padding: 1rem;
      margin: 1rem 0;
      p {
        font-size: 1.4rem;
        padding: .2rem;
      }
      .wait-senddetail {
        float: right;
        color: red;
      }
      .already-senddetail {
        float: right;
        color: #999;
      }
      .time {
        font-size: 1.3rem;
        color: #999;
      }
    }
  }
}
</style>
