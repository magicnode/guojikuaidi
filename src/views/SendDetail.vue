<template>
  <div class="senddetail">
    <mj-header title="寄件列表"></mj-header>
    <div class="senddetail-container">
      <div class="address-container-tab">
        <tab active-color='#ff750f'>
          <tab-item selected @on-item-click="changeShow('send')">待寄件</tab-item>
          <tab-item @on-item-click="changeShow('pickup')">收件地址</tab-item>
        </tab>
      </div>
      <div class="senddetail-cell">
<!--         <div class="senddetail-cell-detail" @click="goPath" v-for="item in data[switchtype]" :key="item.id">
          <p class="">
            <span class="senddetail-cell-detail__title">营业厅:</span>
              {{item.office}}
            <span class="wait-senddetail clearfixed">等待取件</span>
          </p>
          <p><span class="senddetail-cell-detail__title">手机号:</span>金刚大剧院</p>
          <p>上海 闵行 七宝镇 信隆路1212号</p>
          <p class="time">2017-4-10</p>
        </div> -->
        <div class="senddetail-cell-detail">
          <div class="senddetail-cell-detail--box border-bottom-grey">
            <span class="senddetail-cell-detail__title">营业厅: asdasd <img src="../assets/images/new/pic_ico_map.png" alt=""></span>
            <span class="wait-senddetail clearfixed">等待取件</span>
          </div>
          <div class="senddetail-cell-detail--box flex border-bottom-grey">
            <div class="send-icon">
              收
            </div>
            <div>
              <p>atom  15751158939</p>
              <p>shanghai changning uqdnj </p>
            </div>
          </div>
          <div class="senddetail-cell-detail--box flex" style="justify-content: space-between;">
            <p class="time">2017-4-10  14:00</p>
            <div>
              <button type="" class="cancle-btn">取消订单</button>
              <button type="" class="gosend-btn">去寄件</button>
            </div>
          </div>
        </div>
      </div>

<!--       <div class="senddetail-cell">
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
      </div> -->
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'senddetail',
  created () {
    this.setSend()
    console.log('data waite', this.data)
  },
  computed: {
    ...mapGetters({
      data: 'getSend',
      switchtype: 'getSendSwitch'
    })
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'setSend'
    ]),
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


.border-bottom-grey {
  border-bottom: 1px solid #999;
}
.send-icon {
  border-radius: 50%;
  background: #BEB9B9;
  color: white;
  margin-right: 1rem;
  width: 3rem;
  height: 3rem;
  font-size: 1.3rem;
  line-height: 3rem;
  text-align: center;
}

.cancle-btn {
  font-size: 1.4rem;
  width: 7rem;
  height: 2.5rem;
  text-align: center;
  border: 1px solid #999;
  padding: 0.3rem;
  border-radius: 5px;
  background: transparent;
  box-sizing: border-box;
  color: #999;
}

.gosend-btn {
  font-size: 1.4rem;
  width: 7rem;
  height: 2.5rem;
  text-align: center;
  box-sizing: border-box;
  border: none;
  padding: 0.3rem;
  border-radius: 5px;
  background: @dark-yellow;
  color: white;
}

.senddetail {
  &-cell {
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
      &--box {
        padding: .5rem;
      }
      &__title {
        font-size: 1.6rem;
        img {
          width: auto;
          height: 2rem;
          vertical-align: top;
        }
      }
      p {
        font-size: 1.4rem;
        padding: .2rem;
      }
      .wait-senddetail {
        float: right;
        color: @dark-yellow;
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
