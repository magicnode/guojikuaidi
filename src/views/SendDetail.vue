<template>
  <div class="senddetail">
    <mj-header title="寄件列表"></mj-header>
    <div class="senddetail-container">
      <div class="address-container-tab">
        <tab active-color='#ff750f'>
          <tab-item selected @on-item-click="changeShow('wait')">待寄件</tab-item>
          <tab-item @on-item-click="changeShow('ready')">已寄件</tab-item>
        </tab>
      </div>
      <div class="senddetail-cell" v-show="show === 'wait'">
        <div class="senddetail-cell-detail" v-for="item in data['wait']" :key="item.id">
          <div class="senddetail-cell-detail--box border-bottom-grey">
            <span class="senddetail-cell-detail__title">营业厅: {{item.office}} <img src="../assets/images/new/pic_ico_map.png" alt=""></span>
            <span class="wait-senddetail clearfixed">{{item.type | sendstatus}}</span>
          </div>
          <div class="senddetail-cell-detail--box flex border-bottom-grey" >
            <div class="send-icon">
              收
            </div>
            <div>
              <p>atom  {{item.receiptAddress.mobile}}</p>
              <p>{{item.receiptAddress.province + item.receiptAddress.city + item.receiptAddress.district + item.receiptAddress.address}} </p>
            </div>
          </div>
          <div class="senddetail-cell-detail--box flex" style="justify-content: space-between;">
            <p class="time">{{item.createTime}}</p>
            <div>
              <button type="" class="cancle-btn">取消订单</button>
              <button type="" class="gosend-btn" @click="goPath(item.id, 'wait')">去寄件</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 已寄件 -->
      <div class="senddetail-cell" v-show="show === 'ready'">
        <div class="senddetail-cell-detail" v-for="item in data['ready']" :key="item.id">
          <div class="senddetail-cell-detail--box border-bottom-grey">
            <span class="senddetail-cell-detail__title">{{item.brand + ' '}} {{item.order}}</span>
            <span class="wait-senddetail clearfixed">{{item.type | sendstatus}}</span>
          </div>
          <div class="senddetail-cell-detail--box flex border-bottom-grey">
            <div class="send-icon">
              收
            </div>
            <div>
              <p>atom  {{item.receiptAddress.mobile}}</p>
              <p>{{item.receiptAddress.province + item.receiptAddress.city + item.receiptAddress.district + item.receiptAddress.address}} </p>
            </div>
          </div>
          <div class="senddetail-cell-detail--box flex" style="justify-content: space-between;">
            <p class="time">{{item.createTime}}</p>
            <span class="sum-money">{{'￥' + item.sum}}</span>
            <div>
              <button type="" class="cancle-btn" @click="goPath(item.id, 'ready')">查看订单</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'senddetail',
  created () {
    if (!this.data.init) {
      this.initSendList()
    }
    console.log('data', this.data)
  },
  computed: {
    ...mapGetters({
      data: 'getSend',
      switchtype: 'getSendSwitch'
    })
  },
  data () {
    return {
      show: 'wait'
    }
  },
  methods: {
    ...mapActions([
      'setSend'
    ]),
    changeShow (type) {
      this.show = type
    },
    showToast (data) {
      this.$vux.toast.show({
        text: data.text || '出错啦',
        type: data.type || 'warn'
      })
    },
    async initSendList () {
      const result = await this.setSend()
      this.showToast(result)
    },
    goPath (id, type) {
      this.$router.push({path: 'qr', query: {id, type}})
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
  border-bottom: 1px solid #ececec;
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

.sum-money {
 font-size: 1.4rem;
 color: @dark-yellow;
}

.cancle-btn {
  font-size: 1.4rem;
  height: 2.5rem;
  text-align: center;
  border: 1px solid #999;
  padding: 0.3rem;
  border-radius: 5px;
  background: transparent;
  box-sizing: border-box;
  color: #999;
  white-space: nowrap;
}

.gosend-btn {
  font-size: 1.4rem;
  height: 2.5rem;
  text-align: center;
  box-sizing: border-box;
  border: none;
  padding: 0.3rem;
  border-radius: 5px;
  background: @dark-yellow;
  color: white;
  white-space: nowrap;
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
