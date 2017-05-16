<template>
  <div class="send">
    <div class="send-container">
      <div class="send-container-address flex">
        <div class="send-container-address__intro">
          <span class="bgblue">寄</span>
        </div>
        <div class="send-container-address__info">
          <div class="send-container-address__info--line">
            <div>
              <span>
                {{sendAddress['name']}}
              </span>
              <span class="address-info">
                {{sendAddress['mobile']}}    
              </span>
            </div>
          </div>
          <p>
           {{sendAddress['address']}}
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
          <span class="bgyellow">收</span>
        </div>
        <div class="send-container-address__info">
          <div class="send-container-address__info--line">
            <div>
              <span>{{pickupAddress['name']}}</span>
              <span class="address-info">
                {{pickupAddress['mobile']}}
              </span>
            </div>
          </div>
          <p>{{pickupAddress['address']}}</p>
        </div>
        <div class="send-container-address__link">
          <router-link to="/address?type=pickup&pick=1">
            地址簿
          </router-link>
        </div>
      </div>
      <div class="send-container-select">
        <group label-width="8rem" label-margin-right="1rem" label-align="left">
          <cell class="office" title="营业厅" disabled is-link link="/hallmap">{{office || '请选择营业厅'}}</cell>
          <selector placeholder="请选择快递品牌"  v-model="sendadd.express" title="快递品牌" name="district" :options="brand" @on-change="onChange"></selector>
          <x-textarea title="物品描述" :show-counter="false" :max="max" :autosize="true" placeholder="请输入物品描述 (200字限制)" :rows="1" v-model="describe"></x-textarea>
          <x-textarea title="备注" :max="max" placeholder="请输入备注 (200字限制)" :autosize="true" :show-counter="false" v-model="note" :rows="1"></x-textarea>
        </group>
      </div>
      <div class="send-container-select">
        <group>
          <cell title="寄件列表" link="/send/detail" disabled is-link style="padding:1.5rem;">
            <img slot="icon" width="33px" style="display:block;margin-right:5px;" src="../assets/images/new/sen_ico_lis.png" />
          </cell>
        </group>
      </div>
      <div class="div-btn-sub"> 
        <button class="btn-sub" @click="submitSend">提交</button>
      </div>

    </div>
  </div>
</template>
<script>
import { Selector, XInput, XTextarea } from 'vux'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'send',
  components: {
    Selector,
    XInput,
    XTextarea
  },
  async created () {
    this.$store.commit('SET_PAGE', {page: 'send'})
    if (!this.openid) {
      return this.$router.push({path: '/init', query: {page: 2}})
    }
    if (!this.user.mobile) {
      const userinfo = await this.setUserInfo({openid: this.openid})
      this.$vux.toast.show(userinfo)
      if (userinfo.type === 'text') {
        return this.$router.push({path: '/bindphone', query: {page: 2}})
      }
    }
    if (this.brand.length <= 0) {
      this.initBrand()
    }
    if (!this.sendAddress['id'] && !this.pickupAddress['id']) {
      this.setDefaultAddress()
    }
    let addressInfo = window.localStorage.getItem('mj_addressInfo')
    addressInfo = JSON.parse(addressInfo)
    this.office = addressInfo ? addressInfo.descript : ''
  },
  mounted () {
    window.document.title = '寄件'
  },
  computed: {
    ...mapGetters({
      brand: 'getAllBrand',
      address: 'getAddress',
      sendadd: 'getSendAdd',
      sendAddress: 'getSendAddress',
      pickupAddress: 'getPickupAddress',
      result: 'getSendResult',
      openid: 'getOpenId',
      user: 'getUserInfo'
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
      office: ''
    }
  },
  methods: {
    ...mapActions([
      'setDefaultAddress',
      'createSend',
      'setAllBrand'
    ]),
    async initBrand () {
      const result = await this.setAllBrand()
      if (result.type !== 'success') {
        this.showToast({text: result.text, type: result.type})
      }
    },
    showToast ({text, type}) {
      this.$vux.toast.show({
        text,
        type,
        width: '18rem'
      })
    },
    onChange (val) {
      this.$store.commit('SET_SEND_ADD', {express: val})
    },
    goPath (path) {
      this.$router.push({path})
    },
    async submitSend () {
      let addressInfo = window.localStorage.getItem('mj_addressInfo')
      addressInfo = JSON.parse(addressInfo)
      if (!this.sendadd.express) {
        this.showToast({text: '请选择快递品牌', type: 'warn'})
        return
      }
      if (!addressInfo.id) {
        this.showToast({text: '请选择营业厅', type: 'warn'})
        return
      }
      if (!this.describe) {
        this.showToast({text: '请输入物品描述', type: 'warn'})
        return
      }
      const timestamp = 'time' + new Date().getTime()
      const result = await this.createSend({
        brand: this.sendadd.express,
        describe: this.describe,
        note: this.label,
        order: timestamp,
        office: addressInfo.id,
        receiptAddressId: this.pickupAddress['id'],
        sendAddressId: this.sendAddress['id'],
        type: 1
      })
      if (result) {
        this.showToast({text: '提交成功'})
        this.$router.push({path: '/send/detail'})
        return
      } else {
        this.showToast({text: '提交失败', type: 'warn'})
        return
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../assets/styles/colors.less';
.bgblue {
  background-color: @light-blue;
}
.bgyellow {
  background-color: @dark-yellow;
}
.weui-cell.office.weui-cell_access{
  div.weui-cell__ft {
    width: 100%;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

label {
  font-size: 1.6rem;
}
.weui-cell__bd {
  font-size: 1.6rem;
}
.weui-cell:before {
  border-top: 1px solid @borderbt!important;
}
.send {
  &-container {
    padding-bottom: 6rem;
    overflow: hidden;
    &-address {
      font-size: 1.4rem;
      padding: 1rem 0;
      padding-left: 1rem;
      justify-content: space-between;
      background: white;
      &:first-child {
        border-bottom: 1px solid @borderbt;
      }
      &__intro {
        flex: 1;
        span {
          font-size: 1.8rem;
          width: 4rem;
          height: 4rem;
          line-height: 4rem;
          display: block;
          border-radius: 50%;
          color: white;
        }
      }
      &__info {
        padding-left:1rem;
        flex: 3;
        text-align: left;
        &--line {
          div {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      }
      &__link {
        flex: 2;
        padding: 0 1rem;
        height: 5rem;
        line-height: 5rem;
        a {
          color: @dark-yellow;
          padding: .5rem;
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
            padding-left: 1rem;
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
      padding: 1.7rem;
      padding-top: 2.2rem;
      text-align: center;
      overflow: hidden;
      .btn-sub {
        color: white;
        border: none;
        padding: 1.2rem 0;
        font-size: 1.8rem;
        width: 100%;
        background-color: @dark-yellow;
        border: none;
        border-radius: 5px;
      }
    }
  }
}
</style>
