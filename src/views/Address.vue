<template>
  <div class="address">
    <mj-header title="地址管理"></mj-header>
    <div class="address-container">
      <div class="address-container-tab">
        <tab active-color='#ff750f'>
          <tab-item selected @on-item-click="changeShow('send')">寄件地址</tab-item>
          <tab-item @on-item-click="changeShow('pickup')">收件地址</tab-item>
        </tab>
      </div>

      <div class="address-container-list">
        <div class="address-container-list__item" v-for="item in data[addressType]" :key="item.name">
          <div class="flex address-container-list__item--info">
            <div>
              <p>{{item.name}} <strong>{{item.mobile}}</strong></p>
              <p class="location" style="font-size:1.4rem;">{{item.province + item.city + ' ' + item.district + item.address}}</p>
            </div>
           <img src="../assets/images/add_ico_del.png" alt="" @click="deleteItem(item.id)">
          </div>
          <div class="flex address-container-list__item--func flex">
            <span class="is-default" v-show="item.checked == 1" @click.stop="changeChecked(item.id, item.checked)">
              <img src="../assets/images/sen_btn_che.png" alt="">
              <span>默认地址</span>
            </span>
            <span class="not-default" v-show="item.checked == 2" @click.stop="changeChecked(item.id, item.checked)">
              <img src="../assets/images/add_ico_nor.png" alt="">
              <span>设为默认</span>
            </span>
            <span class="edit" @click="goPath('/address/edit', item)">
              <img src="../assets/images/add_ico_cha.png" alt="">
              <span>编辑</span>
            </span>
          </div>
        </div>

        <div class="address-container-add" @click="goPath('/address/add', {type: addressType})">
          <p>新增地址</p>
        </div>
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
  },
  data () {
    return {
      addressType: 'send'
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
    goPath (path, query) {
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
    changeShow (type) {
      this.addressType = type
    },
    ...mapActions([
      'changeAddress',
      'delAddress',
      'checkedAddress'
    ]),
    deleteItem (id) {
      console.log('id', id)
      // 显示
      const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
      this.$vux.confirm.show({
        // 组件除show外的属性
        title: '确定删除这一地址吗?',
        onCancel () {
          console.log(_this)
        },
        onConfirm () {
          _this.delAddress({id})
          // 显示
          _this.$vux.toast.show({
            text: '删除成功'
          })
        }
      })
    },
    changeChecked (id, checked) {
      // if (checked === 1) {
      //   return
      // }
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
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../assets/styles/colors.less';
@import '../assets/styles/helpers.less';
.address {
  min-height: 100vh;
  background-color: @bg-grey;
  &-container {
    &-add {
      padding: 1rem 3rem;
      p {
        font-size: 1.6rem;
        padding: .7rem;
        color: white;
        background: @dark-yellow;
        border-radius: 6px;
      }
    }

    &-list {
      margin-top: 2rem;
      &__intro {
        padding: 1rem;
        padding-top: 0;
        font-size:1.4rem;
        text-align: left;
      }
      &__item {
        margin-bottom: 2rem;
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
}
</style>
