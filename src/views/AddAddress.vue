<template>
  <div class="addaddress">
    <div class="addaddress-container">
      <group>
         <x-input title="姓名" v-model="name" max="20" placeholder="请填写您的真实姓名" required></x-input>
         <x-input title="电话" v-model="mobile" placeholder="请输入手机号" required></x-input>
         <x-address class="quyu" title="地区" v-model="location" :list="addressData" placeholder="请选择省市区"></x-address>
         <x-input title="地址" v-model="address"  max="80" placeholder="请详细到门牌号 (限80字)" required></x-input>
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
import { XInput, XSwitch, XAddress, ChinaAddressV3Data, Radio, Value2nameFilter as value2name } from 'vux'
import { mapActions } from 'vuex'

export default {
  name: 'addaddress',
  components: {
    XInput,
    XSwitch,
    XAddress,
    Radio
  },
  created () {
  },
  mounted () {
    window.document.title = '添加地址'
  },
  data () {
    return {
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
      'addAddress'
    ]),
    checkMobile (num) {
      const reg = /^1[1|3|4|5|7|8|9][0-9]\d{4,8}$/
      return reg.test(num)
    },
    async saveAddress () {
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
