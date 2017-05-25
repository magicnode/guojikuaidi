<template>
  <div class="senddetail">
    <div class="senddetail-container">
      <div class="senddetail-container-tab">
        <tab active-color='#ff750f'>
          <tab-item selected @on-item-click="changeShow('wait')">待取件</tab-item>
          <tab-item @on-item-click="changeShow('sign')">已完成</tab-item>
        </tab>
      </div>
      <div class="senddetail-cell" v-show="show === 'wait'">
        <scroller 
          :on-refresh="refreshWait"
          :on-infinite="infiniteWait"
          ref="my_scroller_1"
          class="senddetail-scroller">
          <mj-spinner type="line" slot="refresh-spinner"></mj-spinner>
          <div class="senddetail-cell-detail" v-for="item in wait" :key="item.createTime">
              <mj-pickupitem :item="item"></mj-pickupitem>
          </div>
          <mj-spinner type="circle" slot="infinite-spinner"></mj-spinner>
          <div style="height: 50px;">
          </div>
        </scroller>
      </div>
      <!-- 已取件 -->
      <div class="senddetail-cell" v-show="show === 'sign'">
        <scroller 
          :on-refresh="refreshSign"
          :on-infinite="infiniteSign"
          ref="my_scroller_2"
          class="senddetail-scroller">
          <mj-spinner type="line" slot="refresh-spinner"></mj-spinner>
          <div class="senddetail-cell-detail" v-for="item in sign" :key="item.createTime">
              <mj-pickupitem :item="item"></mj-pickupitem>
          </div>
          <mj-spinner type="circle" slot="infinite-spinner"></mj-spinner>
          <div style="height: 50px;">
          </div>
        </scroller>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { Divider, XSwitch, Spinner } from 'vux'

export default {
  name: 'pickup',
  components: {
    Divider,
    XSwitch,
    Spinner
  },
  async created () {
    this.$store.commit('SET_PAGE', {page: 'pickup'})
    if (!this.openid || this.userid === '' || !this.userid) {
      return this.$router.push({path: '/init', query: {page: 1}})
    }
    if (!this.user.mobile) {
      const userinfo = await this.setUserInfo({openid: this.openid})
      this.$vux.toast.show(userinfo)
      if (userinfo.type === 'text') {
        return this.$router.push({path: '/bindphone', query: {page: 1}})
      } else if (userinfo.type === 'warn') {
        return this.$router.push({path: '/nouser'})
      }
    }
    console.log('qrsd', this.wait)
  },
  computed: {
    ...mapGetters({
      'sign': 'getPickUpSign',
      'signquery': 'getPickUpSignQuery',
      'wait': 'getPickUpWait',
      'waitquery': 'getPickUpWaitQuery',
      'user': 'getUserInfo',
      'userid': 'getUserId',
      'openid': 'getOpenId'
    })
  },
  mounted () {
    window.document.title = '取件列表'
  },
  data () {
    return {
      n: 10,
      show: 'wait',
      nowait: false,
      pullupEnabled: true,
      signstatus: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      }
    }
  },
  methods: {
    ...mapActions([
      'initPickUpSign',
      'addPickUpSign',
      'initPickUpWait',
      'addPickUpWait',
      'setUserInfo'
    ]),
    changeShow (type) {
      this.show = type
    },
    async refreshWait (done) {
      const mobile = this.user.mobile
      const _this = this
      const query = {
        mobile,
        page: 1,
        rows: 5
      }
      setTimeout(async function () {
        console.log('refresh wait')
        const resultWait = await _this.initPickUpWait({query})
        if (resultWait.type !== 'success') {
          _this.showToast(resultWait)
        }
        done(true)
      }, 1200)
    },
    async infiniteWait (done) {
      const mobile = this.user.mobile
      const _this = this
      setTimeout(async function () {
        console.log('infinite wait')
        _this.waitquery.mobile = mobile
        const resultWait = await _this.addPickUpWait({query: _this.waitquery})
        if (resultWait.type !== 'success') {
          _this.showToast(resultWait)
        }
        if (resultWait.stop) {
          done(true)
          return
        }
        done(true)
      }, 1200)
    },
    async refreshSign (done) {
      const mobile = this.user.mobile
      const _this = this
      const query = {
        mobile,
        page: 1,
        rows: 5
      }
      setTimeout(async function () {
        console.log('refresh sign')
        const resultWait = await _this.initPickUpSign({query})
        if (resultWait.type !== 'success') {
          _this.showToast(resultWait)
        }
        done()
      }, 1200)
    },
    async infiniteSign (done) {
      const mobile = this.user.mobile
      const _this = this
      setTimeout(async function () {
        console.log('infinite sign')
        _this.signquery.mobile = mobile
        const resultSign = await _this.addPickUpSign({query: _this.signquery})
        if (resultSign.type !== 'success') {
          _this.showToast(resultSign)
        }
        if (resultSign.stop) {
          done(true)
          return
        }
        done()
      }, 1200)
    },
    showToast (data) {
      this.$vux.toast.show({
        text: data.text || '出错啦',
        type: data.type || 'warn',
        width: '18rem'
      })
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

.normal-btn {
  width: 6rem;
  font-size: 1.4rem;
  text-align: center;
  padding: .2rem .5rem;
  border-radius: 5px;
  box-sizing: border-box;
  white-space: nowrap;
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
  .normal-btn;
  border: none;
  background: @dark-yellow;
  color: white;
}

.office-info {
  color: #999;
  flex: 6;
}
.address-icon {
  flex: 1;
  text-align: center;
  border-left: 1px solid @borderbt;
  padding: 1.3rem;
  padding-left: 2rem;
  margin-left: 2rem;
  img {
    width: 1.8rem;
  }
}
.senddetail {
  &-container {
    &-tab {
      position: fixed;
      width: 100%;
      z-index: 1000;
    }
  }
  &-scroller {
    padding-top: 42px;
  }
  &-cell {
    padding-bottom: 8rem;
    &-status {
      font-size: 1.6rem;
      text-align: left;
      padding: 1rem;
      padding-bottom: 0;
    }
    &-detail {
      background: white;
      text-align: justify;
      padding: 0 15px;
      margin: 1rem 0;
      &--box {
        padding: .4rem 0;
      }
      &__title {
        font-size: 1.5rem;
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
        padding-top: .3rem;
      }
      .already-senddetail {
        float: right;
        color: #999;
        padding-top: .3rem;
      }
      .time {
        font-size: 1.2rem;
        color: #333;
      }
    }
  }
}
</style>
