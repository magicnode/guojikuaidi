<template>
  <!-- 未寄件 -->
  <div v-if="item.type === 1 && item.type !== 5">
    <div class="senditem">
      <div class="senditem-box">
        <span class="senditem-box__office">
         <span class="senditem-box__office--info">
          寄件站点: {{item.office | officeinfo}}
         </span>
         <img src="../assets/images/new/pic_ico_map.png" alt="item.office.descript" @click="watchOffice(item.officeId)">
        </span>
      </div>
      <div class="senditem-box flex">
        <div class="senditem-box__icon">
          收
        </div>
        <div class="senditem-box__address">
          <p>{{item.receiptAddress ? item.receiptAddress.name : ''}}  {{item.receiptAddress ? item.receiptAddress.mobile : ''}}</p>
          <p class="senditem-box__address--detail">{{item.receiptAddress ? item.receiptAddress.province + item.receiptAddress.city + item.receiptAddress.district + item.receiptAddress.address : ''}}</p>
        </div>
        <span class="senditem-box__state">{{item.type | sendstatus}}</span>
      </div>
      <div class="senditem-box flex" style="justify-content: space-between;">
        <p class="senditem-box__time">{{item.createTime}}</p>
        <div>
          <button v-show="item.type !== 5 && !readonly" type="" class="cancle-btn" @click="cancle(item)">取消订单</button>
          <button v-show="item.type !== 5" type="" class="gosend-btn" @click="goPath(item, 'wait')">去寄件</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 已寄件 -->
  <div v-else-if="item.type !== 1 && item.type !== 5">
    <div class="senditem">
      <div class="senditem-box">
        <span class="senditem-box__office">
         <span class="senditem-box__office--info">
          寄件站点: {{item.office | officeinfo}}
         </span>
         <img src="../assets/images/new/pic_ico_map.png" alt="item.office.descript" @click="watchOffice(item.officeId)">
        </span>
      </div>
      <div class="senditem-box flex">
        <div class="senditem-box__icon">
          收
        </div>
        <div class="senditem-box__address">
          <p>{{item.receiptAddress ? item.receiptAddress.name : ''}}  {{item.receiptAddress ? item.receiptAddress.mobile : ''}}</p>
          <p class="senditem-box__address--detail">{{item.receiptAddress ? item.receiptAddress.province + item.receiptAddress.city + item.receiptAddress.district + item.receiptAddress.address : ''}}</p>
        </div>
        <span class="senditem-box__state">{{item.type | sendstatus}}</span>
      </div>
      <div class="senditem-box flex" style="justify-content: space-between;">
        <p class="senditem-box__time">{{item.createTime}}</p>
        <div class="senditem-box__btn">
          <span class="senditem-box__price">{{'￥' + item.price}}</span>
          <button type="" class="cancle-btn" @click="goPath(item, 'ready')">查看详情</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'senditem',
  props: {
    item: {
      type: Object,
      default: {}
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    ...mapActions([
      'setSend',
      'cancleSend'
    ]),
    showToast (data) {
      this.$vux.toast.show({
        text: data.text || '出错啦',
        type: data.type || 'warn',
        width: data.width || '20rem'
      })
    },
    goPath (item, type) {
      console.log('irwem', item)
      const id = item.id
      const order = item.order
      this.$router.push({path: '/send/qr', query: {id, order}})
    },
    showOffice ({province = '', city = '', district = '', descript = ''}) {
      const content = province + city + district + descript
      this.showToast({
        text: content,
        type: 'text',
        width: '25rem'
      })
    },
    async cancle (item) {
      const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
      this.$vux.confirm.show({
        title: '确定取消这一订单吗?',
        onCancel () {
        },
        async onConfirm () {
          const res = await _this.cancleSend({
            id: item.id,
            type: 5})
          _this.showToast(res)
        }
      })
    },
    watchOffice (userId) {
      this.$router.push({path: '/office/location', query: {userId}})
    }
  }
}

</script>

<style lang="less" scoped>
@import '../assets/styles/colors.less';
@import '../assets/styles/helpers.less';

.border-bottom-grey {
  border-bottom: 1px solid @borderbt;
}

.normal-btn {
  width: 6.6rem;
  font-size: 1.4rem;
  text-align: center;
  padding: .4rem .4rem;
  border-radius: 5px;
  box-sizing: border-box;
  white-space: nowrap;
}

.cancle-btn {
  .normal-btn;
  color: #999;
  margin-right: 0.4rem;
  border: 1px solid #999;
  background: transparent;
}

.gosend-btn {
  .normal-btn;
  color: white;
  border: none;
  border: 1px solid @dark-yellow;
  background: @dark-yellow;
}

.senditem {
  &-box {
    .border-bottom-grey;
    background: white;
    text-align: justify;
    padding: .7rem 0;
    &:last-child {
      border-bottom-width: 0;
    }
    &__office {
      img {
        width: auto;
        height: 2.5rem;
        float: right;
        vertical-align: middle;
      }
      &--info {
        font-size: 1.5rem;
        max-width: 86%;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: bottom;
      }
    }
    &__state {
      font-size: 1.3rem;
      color: @dark-yellow;
      padding-top: .3rem;
      position: absolute;
      right: 2.7rem;
    }
    &__price {
      padding-right: 1rem;
      font-size: 1.4rem;
      color: @dark-yellow;
    }
    &__icon {
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
    &__address {
      font-size: 1.3rem;
      &--detail {
        width: 18rem;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        @media (max-width:320px) {
          width: 14rem;
        }
        @media (min-width:360px) {
          width: 18rem;
        }
        @media (min-width:400px) {
          width: 20rem;
        }
      }
    }
  }
}
</style>
