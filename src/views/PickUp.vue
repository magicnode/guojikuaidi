<template>
  <div class="pickup">
    <mj-header title="收件"></mj-header>
    <div class="scroll-container">
      <div class="pickup-cell">
        <p class="pickup-cell-status">待签收:</p>
        <div class="pickup-cell-detail" @click="goPath">
          <p class=""><span class="pickup-cell-detail__title">单号:</span>8455415245555 <span class="wait-pickup clearfixed">等待取件</span></p>
          <p><span class="pickup-cell-detail__title">营业厅:</span>金刚大剧院</p>
          <p>上海 闵行 七宝镇 信隆路1212号</p>
          <p class="time">2017-4-10</p>
        </div>

        <div class="pickup-cell-detail">
          <p class=""><span class="pickup-cell-detail__title">单号:</span>8455415245555 <span class="wait-pickup clearfixed">等待取件</span></p>
          <p><span class="pickup-cell-detail__title">营业厅:</span>金刚大剧院</p>
          <p>上海 闵行 七宝镇 信隆路1212号</p>
          <p class="time">2017-4-10</p>
        </div>
        <hr>
      </div>

      <div class="pickup-cell">
        <p class="pickup-cell-status">已签收:</p>
        <div class="pickup-cell-detail">
          <p><span>单号:</span>8455415245555 <span class="already-pickup clearfixed">已经签收</span></p>
          <p><span>营业厅:</span>金刚大剧院</p>
          <p>上海 闵行 七宝镇 信隆路1212号</p>
          <p class="time">2017-4-10</p>
        </div>

        <div class="pickup-cell-detail">
          <p><span>单号:</span>8455415245555 <span class="already-pickup clearfixed">已经签收</span></p>
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
  name: 'pickup',
  created () {
  },
  data () {
    return {
    }
  },
  methods: {
    goPath () {
      this.$router.push({path: 'pickup/detail'})
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../assets/styles/colors.less';
@import '../assets/styles/helpers.less';
.scroll-container {
  padding: 0 1rem;
  padding-bottom: 9vh;
}

.pickup {
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
      .wait-pickup {
        float: right;
        color: red;
      }
      .already-pickup {
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
