<template>
  <div class="pickupitem">
    <div class="pickupitem-box">
      <span class="pickupitem-box__title"><img :src="item.brandId | brandimg" :alt="item.brandId | brandtype"> {{item.orderSn}}</span>
      <span class="pickupitem-box__state clearfixed">{{item.state | expressstate}}</span>
    </div>
    <div class="pickupitem-box flex">
      <div class="pickupitem-box__office">
        <p>取件站点：  {{item.name}}</p>
        <p>地址：  {{item.city + '市' + item.district + item.descript}}</p>
        <p>电话： {{item.mobile}} </p>
      </div>
      <div class="pickupitem-box__address">
        <img src="../assets/images/new/pic_ico_map.png" alt="" @click="watchOffice(item.userId)">
      </div>
    </div>
    <div class="pickupitem-box flex" style="justify-content: space-between;">
      <p class="pickupitem-box__time">{{item.createTime | formatedatestamp}}</p>
      <div class="pickupitem-box__btn" v-show="item.state !== '301' && item.state !== '302' && item.state !== '201'">
        <button type="" class="pickupitem-box__btn--get" @click="goPath(item, 'wait')">去取件</button>
      </div>
      <div class="pickupitem-box__btn" v-show="item.state === '301' || item.state === '302' || item.state === '201'">
        <button type="button" class="pickupitem-box__btn--detail" @click="goPath(item, 'wait')">查看详情</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'pickupitem',
  props: {
    item: {
      type: Object,
      default: ''
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
    goPath (item) {
      this.$router.push({path: '/pickup/detail', query: item})
    },
    watchOffice (userId) {
      this.$router.push({path: '/office/location', query: {userId}})
    }
  }
}

</script>

<style lang="less" scoped>
@import '../assets/styles/colors.less';

.flex {
  display: flex;
}

.border-bottom-grey {
  border-bottom: 1px solid @borderbt;
}


.normal-btn {
  width: 6rem;
  font-size: 1.4rem;
  text-align: center;
  padding: .5rem 0;
  border-radius: 5px;
  box-sizing: border-box;
  white-space: nowrap;
}

.pickupitem {
  background: white;
  text-align: justify;
  margin: 1rem 0;
  &-box {
    .border-bottom-grey;
    &:last-child {
      border-bottom-width: 0;
    }
    padding: .5rem 0;
    &__title {
      font-size: 1.5rem;
      img {
        margin-right: .5rem;
        width: auto;
        height: 3rem;
        vertical-align: middle;
        border-radius: 6px;
      }
    }
    &__state {
      float: right;
      color: @dark-yellow;
      padding-top: .5rem;
      font-size: 1.3rem;
    }
    &__office {
      color: #999;
      flex: 6;
      p {
        font-size: 1.4rem;
        padding: .2rem;
      }
    }
    &__address {
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
    &__time {
      font-size: 1.2rem;
      color: #333;
    }
    &__btn {
      &--detail {
        .normal-btn;
        color: #999;
        border: 1px solid #999;
        background: transparent;
      }
      &--get {
        .normal-btn;
        border: 1px solid @dark-yellow;
        background: @dark-yellow;
        color: white;
      }
    }
  }
}
</style>
