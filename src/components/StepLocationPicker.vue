<template>
  <div class="steplocationpicker" v-show="steppickerShow">
    <div class="steplocationpicker-edit">
      <div class="steplocationpicker-edit--left" @click="steppickerShow = false">
        <span>取消</span>
      </div>
      <div class="steplocationpicker-edit--right" v-show="step > 1" @click="step>=0&&step--">
        <span>上一步</span>
      </div>
      <div class="steplocationpicker-edit--right" @click="step<4&&step++">
        <span>下一步</span>
      </div>
    </div>
    <div class="steplocationpicker-step" v-show="step === 1">
      <p>选择国家</p>
      <picker :data='countryData' v-model='countryVal' :fixed-columns="1" :columns="1"></picker>
    </div>
    <div class="steplocationpicker-step" v-show="step === 2">
      <p>选择省</p>
      <picker :data='provinceData' v-model='provinceVal' :fixed-columns="1" :columns="1"></picker>
    </div>
    <div class="steplocationpicker-step" v-show="step === 3">
      <p>选择市</p>
      <picker :data='cityData' v-model='cityVal' :fixed-columns="1" :columns="1"></picker>
    </div>
    <div class="steplocationpicker-step" v-show="step === 4">
      <p>选择区</p>
      <picker :data='countyData' v-model='countyVal' :fixed-columns="1" :columns="1"></picker>
    </div>
  </div>
</template>

<script>
import { XInput, Picker } from 'vux'
import { geography as geographyApi } from '@/api'
import axios from 'axios'

let instance = axios.create({
  timeout: 3000
})

export default {
  name: 'steplocationpicker',
  props: {
    steppickerShow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Picker,
    XInput
  },
  computed: {
  },
  data () {
    return {
      step: 1,
      countryData: [{
        name: '中国',
        value: 1,
        parent: 0
      }, {
        name: '美国',
        value: 2,
        parent: 0
      }],
      countryVal: [],
      provinceData: [{
        name: '海南',
        value: 1,
        parent: 0
      }, {
        name: '上海',
        value: 2,
        parent: 0
      }],
      provinceVal: [],
      cityData: [{
        name: '上海',
        value: 1,
        parent: 0
      }, {
        name: '杭州',
        value: 2,
        parent: 0
      }],
      cityVal: [],
      countyData: [{
        name: '闵行区',
        value: 1,
        parent: 0
      }, {
        name: '西湖区',
        value: 2,
        parent: 0
      }],
      countyVal: []
    }
  },
  async created () {
    try {
      const res = await instance({
        method: 'post',
        url: geographyApi.showcountry
      })
      if (res.status !== 200) {
        return this.$vux.toast.show({
          type: 'warn',
          text: '获取路由失败'
        })
      }
      const data = res.data
      if (data.code !== 200) {
        return this.$vux.toast.show({
          type: 'warn',
          text: data.mess
        })
      }
      console.log('data', data)
      return {}
    } catch (e) {
      console.error(e)
      return this.$vux.toast.show({
        type: 'warn',
        width: '18rem',
        text: '网络请求错误'
      })
    }
  },
  methods: {
    change (value) {
      console.log('new Value', value)
    }
  },
  watch: {
    step (val, oldval) {
      console.log(val)
    }
  }
}

</script>

<style lang="less" scoped>
@import '../assets/styles/colors.less';
@import '../assets/styles/helpers.less';

.steplocationpicker {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 2;
  &-edit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    padding-left: 25px;
    font-size: 1.5rem;
    margin-top: 1rem;
    background: white;
    &--left {
      flex: 1;
    }
    &--right {
      flex: 1;
      color: @red;
    }
  }
  &-step {
    p {
      text-align: left;
      background: white;
      padding: 10px;
      padding-left: 24px;
      font-size: 1.4rem;
    }
  }
}
</style>
