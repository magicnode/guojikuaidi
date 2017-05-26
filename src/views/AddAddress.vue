<template>
  <div class="addaddress">
    <div class="addaddress-container">
      <group>
         <x-input title="姓名" v-model="name" :max="20" placeholder="请填写您的真实姓名" required></x-input>
         <x-input title="电话" v-model="mobile" placeholder="请输入手机号" required></x-input>
         <x-address v-if="pagetype === 'add'" class="quyu" required title="地区" v-model="location" :list="addressData" placeholder="请选择省市区"></x-address>
         <x-address class="quyu" v-if="pagetype === 'edit'" required title="地区" raw-value v-model="location" :list="addressData" placeholder="请选择省市区"></x-address>
         <x-textarea type="text" title="地址" :max="80" placeholder="请详细到门牌号 (限80字)" :autosize="true" :show-counter="false" v-model="address" :rows="1" required>
         </x-textarea>
       </group>
       <group>
         <x-switch title="设为默认地址" class="mj-switch" v-model="value"></x-switch>
       </group>
       <div class="addaddress-container-add">
         <p @click.stop="saveAddress">保存</p>
       </div>
    </div>
  </div>
</template>
<script>
import { XInput, XSwitch, XTextarea, XAddress, ChinaAddressV3Data, Radio, Value2nameFilter as value2name } from 'vux'
import { mapActions } from 'vuex'

export default {
  name: 'addaddress',
  components: {
    XInput,
    XSwitch,
    XAddress,
    Radio,
    XTextarea
  },
  created () {
    const query = this.$route.query
    this.pagetype = query.pagetype || 'add'
    console.log('eidt', query)
    if (this.pagetype === 'edit') {
      this.id = query.id
      this.name = query.name
      this.mobile = query.mobile
      this.address = query.address
      this.location = [query.province, query.city, query.district]
      if (query.checked === 1) {
        this.value = true
      }
    }
  },
  mounted () {
    window.document.title = '添加地址'
  },
  data () {
    return {
      pagetype: 'add',
      addressData: ChinaAddressV3Data,
      name: '',
      mobile: '',
      location: [],
      address: '',
      value: false
    }
  },
  methods: {
    ...mapActions([
      'addAddress',
      'eidtAddress'
    ]),
    checkMobile (num) {
      const reg = /^1[1|3|4|5|7|8|9][0-9]\d{8}$/
      return reg.test(num)
    },
    edit () {
      const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
      this.$vux.confirm.show({
        title: '确定修改地址吗?',
        onCancel () {
        },
        async onConfirm () {
          const rel = value2name(_this.location, ChinaAddressV3Data).split(' ')
          const checked = _this.value ? 1 : 2
          let {addressType} = _this.$route.query
          if (!_this.name || !_this.mobile || !_this.address || !_this.location) {
            _this.$vux.toast.show({
              text: '请将信息填写完整',
              type: 'warn'
            })
            return
          }
          if (!_this.checkMobile(_this.mobile)) {
            _this.$vux.toast.show({
              text: '手机号格式不对，请重新填写',
              type: 'warn',
              width: '30rem'
            })
            return
          }
          _this.eidtAddress({id: _this.id, address: _this.address, province: rel[0], city: rel[1], district: rel[2], mobile: _this.mobile, name: _this.name, checked, addressType})
          _this.$router.go(-1)
        }
      })
    },
    async add () {
      const rel = value2name(this.location, ChinaAddressV3Data).split(' ')
      const checked = this.value ? 1 : 2
      let {type} = this.$route.query
      type = type === 'pickup' ? 2 : 1
      if (!this.name || !this.mobile || !this.address || !this.location) {
        this.$vux.toast.show({
          text: '请将信息填写完整',
          type: 'warn',
          width: '18rem'
        })
        return
      }
      if (!this.checkMobile(this.mobile)) {
        this.$vux.toast.show({
          text: '手机号格式不对，请重新填写',
          type: 'warn',
          width: '18rem'
        })
        return
      }
      await this.addAddress({address: this.address, province: rel[0], city: rel[1], district: rel[2], mobile: this.mobile, name: this.name, checked, addressType: type})
      this.$router.go(-1)
    },
    async saveAddress () {
      if (this.pagetype === 'add') {
        this.add()
      } else {
        this.edit()
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../assets/styles/colors.less';
@import '../assets/styles/helpers.less';
.addaddress {
  min-height: 100vh;
  background-color: @bg-grey;
  &-container {
    .weui-cell__bd.weui-cell__primary {
      input {
        text-align: right;
      }
    }
    .quyu {
      font-size: 1.5rem;
      .weui-label {
        text-align: left;
        padding-left: .6rem;
      }
      .vux-popup-picker-select {
        color: #666;
        span {
          font-size: 1.5rem;
        }
      }
    }
    &-add {
      margin-top: 10rem;
      padding: 1rem 1rem;
      p {
        font-size: 1.8rem;
        padding: 1rem 0;
        width: 100%;
        color: white;
        background: @dark-yellow;
        border-radius: 6px;
      }
    }
    .g-radio {
      padding: 1rem;
      padding-right: 0;
      &:before {
        content: " ";
        margin-bottom: .7rem;
        display: block;
        width: 100%;
        height: 1px;
        border-top: 1px solid #D9D9D9;
        color: #D9D9D9;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
    }
  }
}

.mj-switch {
  padding: 10px 15px!important;
  .weui-cell__ft {
    .weui-switch {
      width: 40px!important;
      height: 20px!important;
      &:checked {
        border-color: @dark-yellow;
        background-color: @dark-yellow;
      }
      &:before {
        width: 40px;
        height: 20px;
      }
      &:after {
        width: 20px;
        height: 18px;
      }
    }
  }
}
</style>
