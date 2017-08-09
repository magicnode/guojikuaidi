<template>
  <div class="steplocationpicker" v-show="steppickerShow">
    <div class="steplocationpicker-edit">
      <div class="steplocationpicker-edit--left" @click="close">
        <span>取消</span>
      </div>
      <div class="steplocationpicker-edit--right" v-show="step > 1" @click="step>=0&&step--">
        <span>上一步</span>
      </div>
      <div class="steplocationpicker-edit--right" @click="step<4&&step++" v-show="step!==4">
        <span>下一步</span>
      </div>
      <div class="steplocationpicker-edit--right" @click="confirm" v-show="step===4">
        <span>确定</span>
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

const mjToken = window.localStorage.getItem('mj_token')

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
      countryData: [],
      countryVal: [],
      provinceData: [],
      provinceVal: [],
      cityData: [],
      cityVal: [],
      countyData: [],
      countyVal: []
    }
  },
  async created () {
    try {
      const res = await instance({
        method: 'post',
        url: geographyApi.showcountry,
        headers: {'token': mjToken}
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
      this.countryData = data.obj.map(function (elem) {
        return {
          name: elem.name,
          value: elem.id
        }
      })
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
    },
    close () {
      this.$emit('listenClose', false)
    },
    confirm () {
      const location = {
        show: this.countryData[this.countryVal - 1]['name'] + this.provinceData[this.provinceVal - 1]['name'] + this.cityData[this.cityVal - 1]['name'] + this.countyData[this.countyVal - 1]['name'],
        val: {
          nationid: Number(this.countryVal),
          provinnce: Number(this.provinceVal),
          city: Number(this.cityVal),
          county: Number(this.countyVal)
        }
      }
      this.$emit('listenConfrim', location)
      this.$emit('listenClose', false)
    }
  },
  watch: {
    async step (val, oldval) {
      if (val === 2) {
        console.log(11)
      }
      switch (val) {
        case 2:
          try {
            const res = await instance({
              method: 'post',
              url: geographyApi.showprovince,
              params: {
                countryid: Number(this.countryVal)
              },
              headers: {'token': mjToken}
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
            this.provinceData = data.obj.map(function (elem) {
              return {
                name: elem.name,
                value: elem.id
              }
            })
          } catch (e) {
            console.error(e)
            return this.$vux.toast.show({
              type: 'warn',
              width: '18rem',
              text: '网络请求错误'
            })
          }
          break
        case 3:
          try {
            const res = await instance({
              method: 'post',
              url: geographyApi.showcity,
              params: {
                provinceid: Number(this.provinceVal)
              },
              headers: {'token': mjToken}
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
            this.cityData = data.obj.map(function (elem) {
              return {
                name: elem.name,
                value: elem.id
              }
            })
          } catch (e) {
            console.error(e)
            return this.$vux.toast.show({
              type: 'warn',
              width: '18rem',
              text: '网络请求错误'
            })
          }
          break
        case 4:
          try {
            const res = await instance({
              method: 'post',
              url: geographyApi.showcounty,
              params: {
                cityid: Number(this.cityVal)
              },
              headers: {'token': mjToken}
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
            this.countyData = data.obj.map(function (elem) {
              return {
                name: elem.name,
                value: elem.id
              }
            })
          } catch (e) {
            console.error(e)
            return this.$vux.toast.show({
              type: 'warn',
              width: '18rem',
              text: '网络请求错误'
            })
          }
          break
        default:
          break
      }
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
  background: white;
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
