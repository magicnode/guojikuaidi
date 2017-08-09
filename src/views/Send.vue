<template>
  <div class="send">
    <div class="send-container">
      <div class="send-container-select go-sendlist">
        <group>
          <cell title="寄件列表" link="/send/detail" is-link style="padding:1.2rem 11px;">
            <img slot="icon" class="send-icon" style="display:block;margin-right:.8rem;" src="../assets/images/nav_ivo_che.png" />
          </cell>
        </group>
      </div>
      
      <div class="send-container-address flex" style="border-bottom: 1px solid #dedede;">
        <div class="send-container-address__intro">
          <span class="bgblue">寄</span>
        </div>
        <div class="send-container-address__info">
          <div class="send-container-address__info--line">
            <div>
              <span>
                {{sendAddress['linkman']}}&nbsp;&nbsp;
              </span>
              <span class="address-info">
                {{sendAddress['iphone']}}    
              </span>
            </div>
          </div>
          <p class="address-detail-info">
           {{sendAddress['detailedinformation']}}
          </p>
        </div>
        <div class="send-container-address__link">
          <router-link to="/address?type=send&pick=1">
            地址簿
          </router-link>
        </div>
      </div>
      
      <div class="send-container-address flex">
        <div class="send-container-address__intro">
          <span class="bgred">收</span>
        </div>
        <div class="send-container-address__info">
          <div class="send-container-address__info--line">
            <div>
              <span>{{pickupAddress['recipients']}}&nbsp;&nbsp;</span>
              <span class="address-info">
                {{pickupAddress['iphone']}}
              </span>
            </div>
          </div>
          <p class="address-detail-info">{{pickupAddress['detaliedinformation']}}</p>
        </div>
        <div class="send-container-address__link">
          <router-link to="/address?type=pickup&pick=1">
            地址簿
          </router-link>
        </div>
      </div>

      <div class="send-container-select" >
        <group label-width="6rem" label-align="left">
          <div @click="dialogshow = true">
           <cell  class="office" title="产品规格" is-link>{{'重量: ' + weight + ' kg，体积: ' + volume + ' cm³' || '点击编辑规格'}}</cell>
          </div>
          <selector direction="rtl" v-model="productionType" placeholder="选择产品类型"   title="产品类型" name="district" :options="productionTypeOption" @on-change="onChange">
          </selector>
        </group>
      </div>

      <div class="send-container-package">
        <div class="send-container-package__title">
          <div>
            包裹报关
          </div>
          <div @click="packageShow = true">
            <button type="" >添加包裹</button>
          </div>
        </div>

        <div class="send-container-package__table">
          <table>
            <thead>
              <tr>
                <th>重量/kg</th>
                <th>中文品名</th>
                <th>英文品名</th>
                <th>数量</th>
                <th>单价</th>
                <th>单位</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item, index in packageTable" @touchstart="longTap(index, $event)">
                <td>
                  <input type="number" v-model="item['Customerbearing']">
                </td>
                <td>
                  <input type="text" v-model="item['name']">
                </td>
                <td>
                  <input type="text" v-model="item['Englishname']">
                </td>

                <td>
                  <input type="text" v-model="item['amount']">
                </td>
                <td>
                  <input type="number" v-model="item['price']">
                </td>
                <td>
                  <input type="text" v-model="item['unit']">
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="send-container-package__money">
          预付运费：￥ <span>{{advance}}</span>
        </div>
      </div>

      <div class="div-btn-sub"> 
        <button class="btn-sub" @click="submitSend">提交</button>
      </div>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="dialogshow" class="dialog-demo">
        <div class="dialog-content">
          <div class="dialog-content--weight">
            产品重量(kg)
            <div class="dialog-close" @click="dialogClose">
              <span class="vux-close"></span>
            </div>
          </div>
          <div class="dialog-content--input">
            <group>
               <x-input title="" type="number" required v-model="weight" placeholder="请填写您的物品的实际重量"></x-input>
            </group>
          </div>
        </div>
        <div class="dialog-content">
          <div class="dialog-content--weight">
            产品体积(cm³)
          </div>
          <div class="dialog-content--input volume">
           <input title="" type="number" v-model="len" placeholder="长度"></input>
           <span>*</span>
           <input title="" type="number" show-clear="false" required v-model="wide" placeholder="宽度"></input>
           <span>*</span>
           <input title="" type="number" required v-model="height" placeholder="高度"></input>
           <span>=</span>
           <input title="" disabled type="number" required v-model="volume" placeholder=""></input>            
          </div>
        </div>

        <p class="dialog-tips">
          请准确填写重量或体积，以免耽误货物妥投
        </p>
        <div class="dialog-confirm-btn">
          <button type="" @click.stop="dialogshow = false">确定</button>
        </div>
      </x-dialog>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="packageShow" class="package-dialog">
        <h1>添加包裹</h1>
        <div class="package-close" @click="packageShow = false">
          <span class="vux-close"></span>
        </div>
        <div class="package-dialog-form">
          <group>
            <x-input title="英文品名" type="text" v-model="newpackage['Englishname']" required></x-input>
            <x-input title="中文品名" type="text" v-model="newpackage['name']" required></x-input>
            <x-input title="产品单价" type="number" v-model="newpackage['price']" required></x-input>
            <x-input title="产品价值" type="number" v-model="newpackage['cost']" required></x-input>
            <x-input title="产品数量" type="number" v-model="newpackage['amount']" required></x-input>
            <x-input title="海关编号" type="text" v-model="newpackage['CustomsNo']" required></x-input>
            <x-input title="海关承重" type="number" v-model="newpackage['Customerbearing']" required></x-input>
            <x-input title="产品单位" type="text" v-model="newpackage['unit']" required></x-input>
            <x-input title="包裹备注" type="text" v-model="newpackage['reovme']" required></x-input>
          </group>
          <div class="package-dialog-form__confrim">
            <button type="" class="package-dialog-form__confrim--cancle" @click="packageShow = false">取消</button>
            <button type="" class="package-dialog-form__confrim--sure" @click="addPackge">完成</button>
          </div>
        </div>
        <div class="package-dialog-tips">
          注：单次寄件最多可包含三个包裹，超过三个请分批次寄件
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import { Selector, XInput, XTextarea, Spinner, XDialog, TransferDomDirective as TransferDom } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import { sundry as sundryApi, send as sendApi } from '@/api'
import axios from 'axios'

let instance = axios.create({
  timeout: 5000
})

const localStorage = window.localStorage
const mjToken = localStorage.getItem('mj_token')

// const wx = window.wx

export default {
  name: 'send',
  directives: {
    TransferDom
  },
  components: {
    Selector,
    XInput,
    XTextarea,
    Spinner,
    XDialog
  },
  async created () {
    // wx.config({
    //   appId: 'wxddd3ecf13e8fca82',
    //   timestamp: 123456,
    //   nonceStr: '',
    //   signature: '',
    //   jsApiList: [
    //     'chooseImage',
    //     'showAllNonBaseMenuItem',
    //     'closeWindow',
    //     'scanQRCode',
    //     'chooseWXPay'
    //   ]
    // })
    this.$store.commit('SET_PAGE', {page: 'send'})
    // 获取地址
    this.sendAddress = JSON.parse(localStorage.getItem('mj_send_sendaddress')) || {
      linkman: '',
      iphone: '',
      detailedinformation: ''
    }
    this.pickupAddress = JSON.parse(localStorage.getItem('mj_send_pickupaddress')) || {
      recipients: '',
      iphone: '',
      detaliedinformation: ''
    }
    // 设置 serial number
    this.serialnumber = 'DHL' + new Date().getTime()
    // 获取产品类型
    const cargotype = await instance({
      method: 'post',
      url: sundryApi.cargotype,
      headers: {'token': mjToken}
    })
    let cargotypeData = cargotype.data.obj
    cargotypeData = cargotypeData.map(function (elem) {
      let item = {
        key: elem.id,
        value: elem.name
      }
      return item
    })
    this.productionTypeOption = cargotypeData
  },
  mounted () {
    window.document.title = '寄件'
  },
  computed: {
    ...mapGetters({
      brand: 'getAllBrand',
      address: 'getAddress',
      sendadd: 'getSendAdd',
      result: 'getSendResult',
      openid: 'getOpenId',
      user: 'getUserInfo',
      userid: 'getUserId'
    })
  },
  data () {
    return {
      max: 200,
      businesshall: '',
      goodslabel: '',
      describe: '',
      note: '',
      label: '',
      office: '',
      expresstype: undefined,
      loading: false,
      dialogshow: false,
      // 产品重量
      weight: 0,
      wide: 1,
      len: 1,
      height: 1,
      volume: 1,
      packageShow: false,
      productionType: undefined,
      productionTypeOption: [],
      newpackage: {
        name: '', // 中文名
        Englishname: '', // 英文名
        Customerbearing: '', // 海关承重
        CustomsNo: '', // 海关编号
        amount: '', // 数量
        price: '', // 价格
        cost: '', // 价值
        unit: '', // 单位
        reovme: '' // 备注
      },
      packageTable: [],
      advance: 0,
      sendAddress: {},
      pickupAddress: {}
    }
  },
  methods: {
    ...mapActions([
      'setDefaultAddress',
      'createSend',
      'setAllBrand'
    ]),
    longTap (index, $event) {
      const _this = this
      function longPress () {
        _this.$vux.confirm.show({
          title: '确定删除这一行数据吗?',
          onCancel () {
            console.log('cancle')
          },
          onConfirm () {
            _this.packageTable.splice(index, 1)
          }
        })
      }
      const longTimer = setTimeout(longPress, 800)
      $event.target.ontouchend = () => {
        clearTimeout(longTimer)
      }
    },
    showToast ({text, type}) {
      this.$vux.toast.show({
        text,
        type,
        width: '18rem'
      })
    },
    addPackge () {
      const _this = this
      let complete = []
      console.log('asd', this.newpackage)
      Object.keys(_this.newpackage).forEach(function (key) {
        if (!_this.newpackage[key]) {
          complete.push(false)
        } else {
          complete.push(true)
        }
      })
      if (complete.includes(false)) {
        _this.$vux.toast.show({
          type: 'warn',
          text: '请将信息填写完整',
          width: '16rem',
          time: '600'
        })
        return
      }
      this.newpackage['serialnumber'] = this.serialnumber
      // 超出3个包裹，不允许再加
      if (this.packageTable.length >= 3) {
        this.$vux.toast.show({
          type: 'warn',
          text: '最多添加三个包裹',
          width: '15rem'
        })
        this.packageShow = false
        return
      }
      this.packageTable.push(this.newpackage)
      this.newpackage = {
        name: '', // 中文名
        Englishname: '', // 英文名
        Customerbearing: '', // 海关承重
        CustomsNo: '', // 海关编号
        amount: '', // 数量
        price: '', // 价格
        cost: '', // 价值
        unit: '', // 单位
        reovme: '' // 备注
      }
      this.packageShow = false
    },
    onChange (val) {
      console.log('val', val)
    },
    goPath (path) {
      this.$router.push({path})
    },
    async submitSend () {
      try {
        if (this.loading) return
        // 提交寄件
        // 包裹长度要在1~3之间
        if (!(this.packageTable.length >= 1 && this.packageTable.length <= 3)) {
          this.$vux.toast.show({
            text: '包裹最多3个最少1个',
            width: '18rem',
            type: 'warn'
          })
          return
        }
        this.$vux.loading.show({
          text: '正在提交'
        })
        let headpackages = JSON.stringify(this.packageTable)
        console.log('headpackages', headpackages)
        const result = await instance({
          method: 'post',
          url: sendApi.create,
          params: {
            serialnumber: this.serialnumber,
            type: '123',
            sku: '',
            state: 1,
            // 寄件地址id
            mailid: this.sendAddress['id'],
            // 下单时间
            endtime: new Date(),
            // 收件id
            arrivaid: this.pickupAddress['id'],
            userid: localStorage.getItem('mj_userId'),
            starte: 1,
            extent: this.len,
            widthofitem: this.wide,
            objectheight: this.height,
            bearload: this.weight,
            remove: '111',
            headpackages
          },
          headers: {'token': mjToken}
        })
        this.$vux.loading.hide()
        if (result) {
          this.serialnumber = 'DHL' + new Date().getTime()
          this.showToast({text: '提交成功'})
          // this.$router.push({path: '/send/detail', query: {type: 'waitpay'}})
          return
        } else {
          this.serialnumber = 'DHL' + new Date().getTime()
          this.showToast({text: '提交失败', type: 'warn'})
          return
        }
      } catch (e) {
        console.error(e)
        this.$vux.loading.hide()
        this.showToast({text: '提交失败', type: 'warn'})
        return
      }
    },
    dialogClose () {
      this.weight = 0
      this.len = 1
      this.height = 1
      this.wide = 1
      this.dialogshow = false
    }
  },
  watch: {
    productionType () {
    },
    len (val, oldval) {
      const _this = this
      if (val > 120) {
        _this.$vux.toast.show({
          text: '长度不能大于1.2m',
          width: '18rem',
          type: 'warn'
        })
        _this.len = oldval
        return
      }
      this.volume = this.len * this.height * this.wide
    },
    height (val, oldval) {
      const _this = this
      if (val > 120) {
        _this.$vux.toast.show({
          text: '高度不能大于1.2m',
          width: '18rem',
          type: 'warn'
        })
        _this.height = oldval
        return
      }
      this.volume = this.len * this.height * this.wide
    },
    wide (val, oldval) {
      const _this = this
      if (val > 120) {
        _this.$vux.toast.show({
          text: '宽度不能大于1.2m',
          width: '18rem',
          type: 'warn'
        })
        _this.wide = oldval
        return
      }
      this.volume = this.len * this.height * this.wide
    }
  },
  beforeDestroy () {
    // 离开本页面时，要移除footer class中的hide
    const footer = window.document.getElementsByTagName('footer')[0]
    if (!footer) return
    footer.className = footer.className.replace(/hide/g, '')
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../assets/styles/colors.less';
@import '~vux/src/styles/close';
.dialog-confirm-btn {
  button {
    color: white;
    padding: 0.3rem 0;
    margin: 1rem;
    font-size: 1.8rem;
    width: 30%;
    background-color: #eb1d21;
    border: none;
    border-radius: 5px;
  }
}
.dialog-demo {
  .weui-dialog{
    padding: 1rem 1rem 8px 1rem;
    border-radius: 8px;
  }
  .dialog-close {
    position: absolute;
    top: 4px;
    right: 8px;
    background: white;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .dialog-content {
    text-align: left;
    padding-bottom: 1rem;
    &--weight {
      color: #333;
      padding-bottom: 1rem;
      font-size: 1.5rem;
    }
    &--input {
    }
    &--input.volume {
      padding-top: 1.17rem;
      display: flex;
      align-items: center;
      input {
        flex: 1;
        padding: .7rem .2rem;
        max-width: 50px;
      }
      span {
        flex: 1;
        font-size: 1.8rem;
        text-align: center;
      }

    }
  }
  p.dialog-tips {
    text-align: left;
    padding-top: 1rem;
    font-size: 1.2rem;
    color: #999;
  }
  .img-box {
    height: 350px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
.package-dialog {
  .package-close {
    position: absolute;
    top: 15px;
    right: 8px;
    background: white;
  }
  .weui-dialog{
    padding: 1rem 1rem 8px 1rem;
    border-radius: 8px;
  }
  h1 {
    color: #7f7f7f;
    font-size: 1.8rem;
    font-weight: 100;
  }
  &-form {
    &__confrim {
      padding: .8rem;
      button {
        width: 45%;
        padding: 0.6rem 0;
      }
      &--cancle {
        background: transparent;
        margin-right: 4%;
        color: @red;
        border: 1px solid @red;
        border-radius: 5px;
      }
      &--sure {
        background: @red;
        margin-right: 1rem;
        color: white;
        border: 1px solid @red;
        border-radius: 5px;
      }
    }
  }
  &-tips {
    padding: 0 .6rem;
    text-align: left;
    font-size: 1.2rem;
    color: #999;
  }
}
.bgblue {
  background-color: black;
}

.bgyellow {
  background-color: @dark-yellow;
}

.bgred {
  background-color: @red;
}

.weui-cells {
  margin-top: 12px!important;
}

.weui-cell {
  padding-left: 18px!important;
}

.weui-cell.office.weui-cell_access{
  div.weui-cell__ft {
    font-size: 1.5rem;
    width: 100%;
    color: #333;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.go-sendlist {
  margin-bottom: 1.17647059em;
  .weui-cell {
    margin-top: 0!important;
  }
  .weui-cells {
    margin-top: 0!important;
  }
}

.send-icon {
  width: 3rem;
}

.weui-cell__bd {
  font-size: 1.5rem;
  textarea {
    text-align: right;
  }
  select {
    color: #333;
  }
}

label {
  font-size: 1.5rem;
}

.weui-cell:before {
  border-top: 1px solid @borderbt!important;
}

.fixedbottom {
  padding-top: 0!important;
  padding-bottom: 0!important;
  width: 100%;
  position: fixed;
  bottom: 0;
  button {
    width: 100%!important;
    border-radius: 0!important;
  }
}

.address-detail-info {
  white-space: nowrap;
  max-width: 19rem;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width:320px) {
    width: 14rem;
  }
  @media (min-width:360px) {
    width: 20rem;
  }
  @media (min-width:400px) {
    width: 26rem;
  }
}

.send {
  &-container {
    padding-bottom: 6rem;
    overflow: hidden;
    &-address {
      font-size: 1.4rem;
      padding: .6rem 0;
      padding-left: 18px;
      justify-content: space-between;
      background: white;
      &:first-child {
        border-bottom: 1px solid @borderbt;
      }

      &__intro {
        flex: 1;
        margin-right: 0.5rem;
        span {
          font-size: 1.6rem;
          width: 3rem;
          height: 3rem;
          line-height: 3rem;
          display: block;
          border-radius: 50%;
          color: white;
        }
      }
      
      &__info {
        padding-left: .8rem;
        flex: 9;
        text-align: left;
        &--line {
          div {
            display: flex;
            align-items: center;
          }
        }
      }

      &__link {
        white-space: nowrap;
        flex: 2;
        padding: 0 0;
        padding-right: 15px;
        text-align: right;
        height: 5rem;
        line-height: 5rem;
        a {
          color: @red;
        }
      }
    }

    &-detail {
      margin-top: 1rem;
      font-size: 1.6rem;
      background: white;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      div {
        text-align: left;
        padding: 1rem;
        span {
          padding-right: .5rem;
        }
        input {
          width: 15rem;
          padding: 0.3rem;
        }
        textarea {
          width: 15rem;
          padding: 0.3rem;
        }
      }
    }
    
    &-select {
      label {
        text-align: left;
        padding-left: .1rem;
        color: @greyfont;
      }
    }

    &-package {
      margin-top: 12px;
      background: white;
      padding: 10px 11px 10px 18px;
      &__title {
        padding-bottom: 1rem;
        align-content: center;
        justify-content: space-between;
        display: flex;
        font-size: 1.5rem;
        color: @greyfont;
        button {
          color: @red;
          border: 2px solid @red;
          border-radius: 5px;
          padding: .1rem .3rem;
          background: transparent;
          font-weight: 600;
        }
      }

      &__table {
        padding: .5rem 0;
        border: 1px solid @greyfont;
        border-left-width: 0;
        border-right-width: 0;
        table {
          font-size: 1.5rem;
          width: 100%;
          thead {
            color: @greyfont;
            th {
              font-weight: 100;
            }
          }
          tr {
            td {
              padding: .3rem 0;
              line-height: 2rem;
              font-size: 1.2rem;
              overflow: hidden;
              max-width: 4rem;
              white-space: nowrap;
              text-overflow: ellipsis;
              input {
                width: 3.9rem;
                text-align: center;
                border: none;
                background: transparent;
              }
            }
          }
        }
      }

      &__money {
        text-align: center;
        color: @greyfont;
        padding-top: 10px;
        font-size: 1.5rem;
        span {
          color: @red;
        }
      }
    }

    &-hall {
      margin-top: 1rem;
      padding: 1rem 1rem;
      font-size: 1.4rem;
      background: white;
      justify-content: space-between;
      img {
        width: 3rem;
      }
    }
    .div-btn-sub {
      padding: 2rem 0rem;
      text-align: center;
      overflow: hidden;
      .btn-sub {
        color: white;
        border: none;
        padding: 1rem 0;
        font-size: 1.8rem;
        width: 92%;
        background-color: @red;
        border: none;
        border-radius: 5px;
      }
    }
  }
}
</style>
