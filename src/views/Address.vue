<template>
  <div class="address">
    <div class="address-container">
      <div class="address-container-tab">
        <tab active-color='#ff750f'>
          <tab-item :selected="addressType ==='send'" @on-item-click="changeShow('send')">寄件地址</tab-item>
          <tab-item :selected="addressType === 'pickup'" @on-item-click="changeShow('pickup')">收件地址</tab-item>
        </tab>
      </div>
      <p v-if="pick" style="text-align: left;font-size: 1.4rem;padding: 0.5rem;padding-bottom: 0;">点击手机号或姓名处选择地址</p>
      <div class="address-container-list">
        <scroller 
          :on-refresh="refresh"
          :on-infinite="infinite"
          ref="my_scroller_address"
          class="address-scroller">
          <mj-spinner type="line" slot="refresh-spinner"></mj-spinner>
          <div class="address-container-list__item" v-for="item in data[addressType]" :key="item.id">
              <div class="flex address-container-list__item--info" @click="selectAddress(item)">
                <div>
                  <p>{{item.name + '  '}} {{item.mobile}}</p>
                  <p class="location">{{item.district + item.address}}</p>
                </div>
               <img v-show="!pick" src="../assets/images/add_ico_del.png" alt="" @click="deleteItem(item.id)">
              </div>
              <div class="flex address-container-list__item--func flex">
                <span class="is-default" v-show="item.checked == 1">
                  <img src="../assets/images/sen_btn_che.png" alt="">
                  <span>默认地址</span>
                </span>
                <span class="not-default" v-show="item.checked == 2" @click.stop="changeChecked(item.id, item.checked)">
                  <img src="../assets/images/add_ico_nor.png" alt="">
                  <span>设为默认</span>
                </span>
                <span class="edit" @click="goPath('/address/add', item, {pagetype: 'edit'})">
                  <img src="../assets/images/add_ico_cha.png" alt="">
                  <span>编辑</span>
                </span>
              </div>
          </div>
          <div class="address-container-add" @click="goPath('/address/add', {type: addressType, pagetype: 'add'})">
            <p>新增地址</p>
          </div>
        </scroller>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'address',
  created () {
    this.changeAddress()
    if (this.result['type'] === 'warn') {
      this.showToast()
    }
    const {type, pick} = this.$route.query
    const localtype = window.localStorage.getItem('mj_address_page_switch_type')
    this.addressType = type || localtype || 'send'
    this.pick = pick === '1'
  },
  mounted () {
    window.document.title = '地址管理'
  },
  data () {
    return {
      addressType: 'send',
      pick: false
    }
  },
  computed: {
    ...mapGetters({
      userId: 'getUserId',
      data: 'getAddress',
      result: 'getAddressResult'
    })
  },
  methods: {
    goPath (path, query, plus) {
      if (plus) {
        Object.assign(query, plus)
        // Object.keys(plus).forEach(key => {
        //   query[key] = plus[key]
        // })
      }
      this.$router.push({path, query})
    },
    showToast () {
      if (this.result['show'] === true) {
        this.$vux.toast.show({
          text: this.result['info'],
          type: this.result['type']
        })
      }
    },
    selectAddress (item) {
      if (!this.pick) return
      if (this.addressType === 'send') {
        this.setSendAddress({sendAddress: item})
      } else {
        this.setPickupAddress({pickupAddress: item})
      }
      this.$vux.toast.show({
        text: '选择地址成功',
        type: 'success',
        width: '18rem'
      })
      this.$router.go(-1)
    },
    changeShow (type) {
      window.localStorage.setItem('mj_address_page_switch_type', type)
      this.addressType = type
    },
    ...mapActions([
      'changeAddress',
      'delAddress',
      'checkedAddress',
      'setSendAddress',
      'setPickupAddress',
      'setDefaultAddress'
    ]),
    deleteItem (id) {
      // 显示
      const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
      this.$vux.confirm.show({
        // 组件除show外的属性
        title: '确定删除这一地址吗?',
        onCancel () {
          console.log(_this)
        },
        onConfirm () {
          _this.$vux.loading.show({
            text: '正在提交'
          })
          _this.delAddress({id})
          _this.setDefaultAddress()
          _this.$vux.loading.hide()
          // 显示
          _this.$vux.toast.show({
            text: '删除成功',
            width: '18rem'
          })
        }
      })
    },
    changeChecked (id, checked) {
      if (checked === 1) {
        return
      }
      const _this = this
      let type = 1
      if (this.addressType !== 'send') {
        type = 2
      }
      this.$vux.confirm.show({
        // 组件除show外的属性
        title: '确定将这一地址设置为默认地址吗?',
        onCancel () {
          console.log(_this)
        },
        onConfirm () {
          _this.checkedAddress({id, addressType: type})
          // 显示
          _this.showToast()
        }
      })
    },
    async refresh (done) {
      const _this = this
      setTimeout(async function () {
        console.log('refresh address')
        await _this.changeAddress()
        done()
      }, 1200)
    },
    async infinite (done) {
      await this.changeAddress()
      done(true)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/styles/colors.less';
@import '../assets/styles/helpers.less';
.address {
  min-height: 100vh;
  background-color: @bg-grey;
  &-container {
    &-tab {
      position: fixed;
      width: 100%;
      z-index: 1000;
    }
    &-add {
      padding: 1rem 1rem;
      p {
        font-size: 1.8rem;
        padding: 1rem 0;
        color: white;
        background: @dark-yellow;
        border-radius: 6px;
      }
    }
    &-list {
      &__intro {
        padding: 1rem;
        padding-top: 0;
        font-size:1.4rem;
        text-align: left;
      }
      &__item {
        margin-bottom: 12px;
        background: white;
        .padding {
          padding: 1rem;
        }
        &--info {
          justify-content: space-between;
          border-bottom: 1px solid #f1f1f1;
          .padding;
          .location {
            color: #999;
            font-size: 1.4rem;
            width: 21rem;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
            @media (max-width:320px) {
              width: 21rem;
            }
            @media (min-width:360px) {
              width: 25rem;
            }
            @media (min-width:400px) {
              width: 28rem;
            }
          }
          p {
            text-align: left;
            font-size: 1.6rem;
          }
          img {
            width: 2rem;
          }
        }
        &--func {
          font-size: 1.2rem;
          justify-content: space-between;
          .padding;
          .edit {
            img {
              width: 1.2rem;
              vertical-align: middle;
            }
          }
          .is-default {
            color: #ff6d40;
            img {
              width: 1.2rem;
              vertical-align: text-top;
              *vertical-align: middle;
              font-size: 0;
            }
          }
          .not-default {
            color: #999;
            img {
              width: 1.2rem;
              vertical-align: text-top;
              *vertical-align: middle;
              font-size: 0;
            }
          }
        }
      }
    }
  }
  &-scroller {
    padding-top: 52px;
  }
}
</style>
