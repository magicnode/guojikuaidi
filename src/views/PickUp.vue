<template>
  <div class="senddetail">
    <div class="senddetail-container">
      <div class="address-container-tab">
        <tab active-color='#ff750f'>
          <tab-item selected @on-item-click="changeShow('wait')">待取件</tab-item>
          <tab-item @on-item-click="changeShow('sign')">已完成</tab-item>
        </tab>
      </div>
      <div class="senddetail-cell" v-show="show === 'wait'">
        <h1 v-show="wait.length === 0">没有待取件数据</h1>
        <div class="senddetail-cell-detail" v-for="item in wait" :key="item.createTime">
            <div class="senddetail-cell-detail--box border-bottom-grey">
              <span class="senddetail-cell-detail__title"><img :src="item.brandId | brandimg" :alt="item.brandId | brandtype"> {{item.orderSn}} <img src="../assets/images/new/pic_ico_map.png" alt=""></span>
              <span class="wait-senddetail clearfixed">{{item.state | pickupstate}}</span>
            </div>
            <div class="senddetail-cell-detail--box flex border-bottom-grey" >
              <div>
                <p>营业厅：  {{item.descript}}</p>
                <p>地址：  {{item.province + item.city + '市' + item.district + item.descript}}</p>
                <p>电话： {{item.mobile}} </p>
              </div>
            </div>
            <div class="senddetail-cell-detail--box flex" style="justify-content: space-between;">
              <p class="time">{{item.createTime | formatedatestamp}}</p>
              <div>
                <button type="" class="gosend-btn" @click="goPath(item, 'wait')">去取件</button>
              </div>
            </div>
        </div>
        <!-- <div>
          <divider>下拉刷新、上拉加载</divider>
           <scroller lock-x scrollbar-y use-pullup use-pulldown height="200vh" @on-pullup-loading="loadMoreSign" @on-pulldown-loading="refreshSign" v-model="signstatus" ref="scroller">
             <div class="box2">
               <h1 v-show="wait.length === 0">没有代取件数据</h1>
               <div class="senddetail-cell-detail" v-for="item in wait" :key="item.createTime">
                   <div class="senddetail-cell-detail--box border-bottom-grey">
                     <span class="senddetail-cell-detail__title"><img :src="item.brandId | brandimg" :alt="item.brandId | brandtype"> {{item.orderSn}} <img src="../assets/images/new/pic_ico_map.png" alt=""></span>
                     <span class="wait-senddetail clearfixed">{{item.state | pickupstate}}</span>
                   </div>
                   <div class="senddetail-cell-detail--box flex border-bottom-grey" >
                     <div>
                       <p>营业厅：  {{item.descript}}</p>
                       <p>地址：  {{item.province + item.city + '市' + item.district + item.descript}}</p>
                       <p>电话： {{item.mobile}} </p>
                     </div>
                   </div>
                   <div class="senddetail-cell-detail--box flex" style="justify-content: space-between;">
                     <p class="time">{{item.createTime | formatedatestamp}}</p>
                     <div>
                       <button type="" class="gosend-btn" @click="goPath(item, 'wait')">去取件</button>
                     </div>
                   </div>
               </div>
             </div>

             <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
               <span></span>
               <span v-show="signstatus.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
             </div>
           </scroller>
        </div> -->
      </div>
      <!-- 已寄件 -->
      <div class="senddetail-cell" v-show="show === 'sign'">
        <h1 v-show="sign.length === 0">没有已经取件数据</h1>
        <div class="senddetail-cell-detail" v-for="item in sign" :key="item.createTime">
            <div class="senddetail-cell-detail--box border-bottom-grey">
              <span class="senddetail-cell-detail__title"><img :src="item.brandId | brandimg" :alt="item.brandId | brandtype"> {{item.orderSn}} <img src="../assets/images/new/pic_ico_map.png" alt=""></span>
              <span class="wait-senddetail clearfixed">{{item.state | pickupstate}}</span>
            </div>
            <div class="senddetail-cell-detail--box flex border-bottom-grey" >
              <div>
                <p>营业厅：  {{item.descript}}</p>
                <p>地址：  {{item.province + item.city + '市' + item.district + item.descript}}</p>
                <p>电话： {{item.mobile}} </p>
              </div>
            </div>
            <div class="senddetail-cell-detail--box flex" style="justify-content: space-between;">
              <p class="time">{{item.createTime | formatedatestamp}}</p>
            </div>
        </div>
<!--         <div>
          <divider>下拉刷新、上拉加载</divider>
           <scroller lock-x scrollbar-y use-pullup use-pulldown height="71vh" @on-pullup-loading="loadMoreSign" @on-pulldown-loading="refreshSign" v-model="signstatus" ref="scroller">
             <div class="box2">
               <h1 v-show="sign.length === 0">没有已经取件数据</h1>
               <div class="senddetail-cell-detail" v-for="item in sign" :key="item.createTime">
                   <div class="senddetail-cell-detail--box border-bottom-grey">
                     <span class="senddetail-cell-detail__title"><img :src="item.brandId | brandimg" :alt="item.brandId | brandtype"> {{item.orderSn}} <img src="../assets/images/new/pic_ico_map.png" alt=""></span>
                     <span class="wait-senddetail clearfixed">{{item.state | pickupstate}}</span>
                   </div>
                   <div class="senddetail-cell-detail--box flex border-bottom-grey" >
                     <div>
                       <p>营业厅：  {{item.descript}}</p>
                       <p>地址：  {{item.province + item.city + '市' + item.district + item.descript}}</p>
                       <p>电话： {{item.mobile}} </p>
                     </div>
                   </div>
                   <div class="senddetail-cell-detail--box flex" style="justify-content: space-between;">
                     <p class="time">{{item.createTime | formatedatestamp}}</p>
                   </div>
               </div>
             </div>

             <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
               <span></span>
               <span v-show="signstatus.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
             </div>
           </scroller>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { Scroller, Divider, XSwitch, Group, Spinner } from 'vux'

export default {
  name: 'pickup',
  components: {
    Scroller,
    Divider,
    XSwitch,
    Group,
    Spinner
  },
  async created () {
    if (!this.openid) {
      return this.$router.push({path: '/init', query: {page: 1}})
    }
    if (!this.user.mobile) {
      const userinfo = await this.setUserInfo({openid: this.openid})
      this.$vux.toast.show(userinfo)
      if (userinfo.type === 'text') {
        return this.$router.push({path: '/bindphone', query: {page: 1}})
      }
    }
    if (this.sign.length <= 0 && this.wait.length <= 0) {
      this.initPickUpList()
    }
  },
  computed: {
    ...mapGetters({
      'sign': 'getPickUpSign',
      'wait': 'getPickUpWait',
      'user': 'getUserInfo',
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
      pullupEnabled: true,
      signstatus: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      }
    }
  },
  methods: {
    ...mapActions([
      'addPickUpSign',
      'addPickUpWait',
      'setUserInfo'
    ]),
    loadMoreSign () {
      setTimeout(() => {
        this.n += 10
        setTimeout(() => {
          this.$refs.scroller.donePullup()
        }, 10)
      }, 1000)
    },
    refreshSign () {
      setTimeout(() => {
        // this.n = 10
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scroller.donePulldown()
            this.pullupEnabled && this.$refs.scroller.enablePullup()
          }, 10)
        })
      }, 1000)
    },
    changeShow (type) {
      this.show = type
    },
    showToast (data) {
      this.$vux.toast.show({
        text: data.text || '出错啦',
        type: data.type || 'warn',
        width: '18rem'
      })
    },
    async initPickUpList () {
      const result = await this.addPickUpSign({
        mobile: this.user.mobile,
        page: 1,
        rows: 200
      })
      this.showToast(result)
      const result1 = await this.addPickUpWait({
        mobile: this.user.mobile,
        page: 1,
        rows: 200
      })
      const _this = this
      setTimeout(function () {
        _this.showToast(result1)
      }, 1000)
      return
    },
    goPath (item) {
      this.$router.push({path: '/pickup/detail', query: item})
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
