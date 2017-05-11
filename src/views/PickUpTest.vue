<template>
  <div class="senddetail">
    <mj-header title="取件列表"></mj-header>
    <div class="senddetail-container">
      <div class="address-container-tab">
        <tab active-color='#ff750f'>
          <tab-item selected @on-item-click="changeShow('wait1')">待取件</tab-item>
          <tab-item @on-item-click="changeShow('sign1')">已完成</tab-item>
        </tab>
      </div>
      <div class="senddetail-cell" v-show="show === 'wait1'">
        <div>
           <h1 v-show="wait.length === 0">没有代取件数据</h1>
           <div class="senddetail-cell-detail" v-for="item in wait" :key="item.createTime">
               {{item}}
           </div>
        </div>
      </div>
      <!-- 已寄件 -->
      <div class="senddetail-cell" v-show="show === 'sign1'">
        <div>
         <h1 v-show="sign.length === 0">没有已经取件数据</h1>
         <div class="senddetail-cell-detail" v-for="item in sign" :key="item.createTime">
           <h1>{{item}}</h1>
         </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'pickuptest',
  created () {
    this.initPickUpList()
  },
  computed: {
    ...mapGetters({
      'sign': 'getPickUpSign',
      'wait': 'getPickUpWait',
      'user': 'getUserInfo'
    })
  },
  data () {
    return {
      show: 'wait1'
    }
  },
  methods: {
    ...mapActions([
      'addPickUpSign',
      'addPickUpWait'
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
    async initPickUpList () {
      const result = await this.addPickUpSign({
        mobile: this.user.mobile,
        page: 1,
        rows: 10
      })
      this.showToast(result)
      await this.addPickUpWait({
        mobile: this.user.mobile,
        page: 1,
        rows: 10
      })
      console.log('asd sign', this.sign)
      console.log('asd wair', this.wait)
      console.log('asd wair', typeof this.wait)
      console.log('asd wair', Array.isArray(this.wait))
      console.log('asd wair', this.wait[0])
      console.log('asd wair', this.wait[1])
      return
    },
    goPath (id, type) {
      this.$router.push({path: '/pickup/detail', query: {id, type}})
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

.box2-wrap {
  height: 300px;
  overflow: hidden;
}
.rotate {
  display: inline-block;
  transform: rotate(-180deg);
}
.pullup-arrow {
  transition: all linear 0.2s;
  color: #666;
  font-size: 25px;
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
