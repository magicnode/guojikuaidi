<template>
  <div class="addaddress">
    <mj-header title="添加地址"></mj-header>
    <div class="addaddress-container">
      <group>
         <x-input title="真实姓名" v-model="name" placeholder="请填写您的真实姓名"></x-input>
         <x-input title="联系方式" v-model="lianxi" placeholder="请输入手机号"></x-input>
         <x-address class="quyu" title="所在地区" v-model="value" :list="addressData" placeholder="请选择省市区"></x-address>
         <x-input title="详细地址" v-model="detail" placeholder="请详细到门牌号"></x-input>
         <div class="g-radio">
           <label><input type="radio" name="type" value="">寄件地址</label>
           <label><input type="radio" name="type" value="">收件地址</label>
         </div>
         <x-switch title="设为默认地址" v-model="value"></x-switch>
       </group>
    </div>
  </div>
</template>
<script>
import { XInput, XSwitch, XAddress, ChinaAddressV3Data, Radio } from 'vux'

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
  data () {
    return {
      addressData: ChinaAddressV3Data,
      value: false,
      name: '',
      lianxi: '',
      quyu: [],
      code: '',
      detail: '',
      radioData: [ '寄件地址', '收件地址' ]
    }
  },
  methods: {
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
    .quyu {
      .weui-label {
        width: 5em;
      }
      .vux-popup-picker-select {
        color: #999;
        text-align: left!important;
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
</style>
