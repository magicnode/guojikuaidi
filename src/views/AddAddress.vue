<template>
  <div class="addaddress">
    <div class="addaddress-container">
      <group>
        <x-input type="text" title="联系人" v-model="linkman" :max="20" placeholder="请填写您的真实姓名" required></x-input>
        <x-input type="text" title="公司名" v-model="company" :max="20" placeholder="请填写您的公司名" required></x-input>
        <x-input type="number" title="邮编" v-model="postcode" :max="20" placeholder="请填写邮编" required></x-input>
        <x-input v-show="type === 2" type="text" title="证件" v-model="idnumber" :max="20" placeholder="请填写身份证号/护照号" required></x-input>
        <x-input title="电话" v-model="iphone" placeholder="请输入手机号" required></x-input>
        <div @click="steppickershow = !steppickershow">
          <x-input disabled title="地区" placeholder="请选择国家、省市区" type="text" required v-model="location"></x-input>
        </div>
        <x-textarea type="text" title="地址" :max="80" placeholder="请详细到门牌号 (限80字)" :show-counter="false" v-model="detailedinformation" :rows="1" :height="22" required>
        </x-textarea>
        <x-textarea type="text" title="备注" :max="50" placeholder="请添加备注 (限50字)" :show-counter="false" v-model="remove" :rows="1" :height="22" required>
        </x-textarea>
       </group>
       <group>
         <x-switch title="设为默认地址" class="mj-switch" v-model="value"></x-switch>
       </group>
       <step-location :steppickerShow="steppickershow" v-on:listenClose="closeStepLocation" v-on:listenConfrim="confirmStep">
       </step-location>
       <div class="addaddress-container-add">
         <p class="addaddress-container-add--btn" @click.stop="saveAddress">创建</p>
       </div>
    </div>
  </div>
</template>
<script>
import { XInput, XSwitch, XTextarea, XAddress, Picker, Radio } from 'vux'
import { mapActions } from 'vuex'

export default {
  name: 'addaddress',
  components: {
    XInput,
    XSwitch,
    XAddress,
    Radio,
    XTextarea,
    Picker
  },
  created () {
    const query = this.$route.query
    this.pagetype = query.pagetype || 'add'
    const type = query.type
    this.type = type === 'send' ? 1 : 2
    if (this.pagetype === 'edit') {
      this.id = query.id
      this.linkname = query.linkname
      this.iphone = query.iphone
      this.detailedinformation = query.detaliedinformation
    }
  },
  mounted () {
    window.document.title = '添加地址'
  },
  data () {
    return {
      type: 1,
      steppickershow: false,
      picker: false,
      pagetype: 'add',
      idnumber: '',
      query: {},
      linkman: '',
      company: '',
      postcode: '',
      iphone: '',
      location: '',
      locationid: {},
      detailedinformation: '',
      remove: '',
      value: false,
      addressVal: []
    }
  },
  methods: {
    ...mapActions([
      'addAddress',
      'eidtAddress'
    ]),
    closeStepLocation (val) {
      this.steppickershow = val
    },
    confirmStep (val) {
      this.location = val.show
      this.locationid = val.val
    },
    checkMobile (num) {
      const reg = /^1[1|3|4|5|7|8|9][0-9]\d{8}$/
      return reg.test(num)
    },
    change (value) {
      console.log('new Value', value)
    },
    async saveAddress () {
      // const checked = this.value ? 1 : 2
      if (!this.linkman || !this.iphone || !this.detailedinformation || !this.location) {
        this.$vux.toast.show({
          text: '请将信息填写完整',
          type: 'warn',
          width: '18rem'
        })
        return
      }
      if (!this.checkMobile(this.iphone)) {
        this.$vux.toast.show({
          text: '手机号格式不对，请重新填写',
          type: 'warn',
          width: '18rem'
        })
        return
      }
      const locationId = this.locationid
      const res = await this.addAddress({...locationId, detailedinformation: this.detailedinformation, postcode: this.postcode, iphone: this.iphone, linkman: this.linkman, company: this.company, remove: this.remove, type: this.type, idnumber: this.idnumber})
      if (res.type !== 'success') {
        return this.$vux.toast.show(res)
      }
      this.$vux.toast.show(res)
      this.$router.go(-1)
    },
    fixBtn () {
      const Btn = window.document.getElementsByClassName('addaddress-container-add')[0]
      const classname = Btn.className
      setTimeout(function () {
        Btn.className = classname.replace(/fixed-fill/g, '')
        Btn.className += ' fixed-fill'
      }, 500)
    },
    removeFixBtn () {
      const Btn = window.document.getElementsByClassName('addaddress-container-add')[0]
      const classname = Btn.className
      setTimeout(function () {
        Btn.className = classname.replace(/fixed-fill/g, '')
      }, 500)
    }
  },
  watch: {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/styles/colors.less';
@import '../assets/styles/helpers.less';
.addaddress {
  min-height: 100vh;
  background-color: @bg-grey;
  &-container {
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
        background: @red;
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

</style>
