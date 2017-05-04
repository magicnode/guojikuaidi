<template>
  <div class="send">
    <mj-header title="寄件"></mj-header>
    <div class="send-container">
      <div class="send-container-address flex">
        <div class="send-container-address__intro">
          <span class="bgblue">寄</span>
        </div>
        <div class="send-container-address__info">
          <p>张师傅 <strong>15751158939</strong></p>
          <p>长in过去14 号 奥施康定</p>
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
          <p>atom <strong>15751158939</strong></p>
          <p>长in过去14 号 奥施康定</p>
        </div>
        <div class="send-container-address__link">
          <router-link to="/address?type=pickup&pick=1">
            地址簿
          </router-link>
        </div>
      </div>

      <div class="send-container-select">
        <group>
          <cell title="营业厅" disabled is-link></cell>
          <selector placeholder="请选择快递品牌"  v-model="express" title="快递品牌" name="district" :options="list" @on-change="onChange"></selector>
          <x-input title="物品描述" :max="max" placeholder="请输入物品描述" v-model="goodslabel"></x-input>
          <x-input title="备注" :max="max" placeholder="请输入备注" v-model="label"></x-input>
        </group>
      </div>

      <div class="send-container-select">
        <group>
          <cell title="寄件列表" link="/send/detail" disabled is-link style="padding:1rem;">
            <img slot="icon" width="33px" style="display:block;margin-right:5px;" src="../assets/images/new/sen_ico_lis.png" />
          </cell>
        </group>
      </div>
      
      <div class="" style="padding:2rem;"> 
        <button type="submit" class="btn-sub">提交</button>
      </div>

    </div>
  </div>
</template>
<script>
import { Selector, XInput } from 'vux'
import { mapGetters } from 'vuex'

export default {
  name: 'send',
  components: {
    Selector,
    XInput
  },
  created () {
  },
  computed: {
    ...mapGetters({
      address: 'getAddress',
      sendadd: 'getSendAdd'
    })
  },
  data () {
    return {
      max: 200,
      express: '',
      businesshall: '',
      goodslabel: '',
      label: '',
      list: [
        '顺丰',
        '韵达',
        '申通',
        '中通',
        '铁通'
      ]
    }
  },
  methods: {
    onChange (val) {
      console.log(val)
    },
    goPath (path) {
      this.$router.push({path})
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
        border-bottom: 1px solid #ececec;
      }
      &__intro {
        flex: 1;
        span {
          font-size: 1.8rem;
          padding: .8rem;
          display: block;
          border-radius: 50%;
          color: white;
        }
      }
      &__info {
        padding-left:1rem;
        flex: 4;
        text-align: left;
        p {
          font-size: 1.6rem;
          white-space: nowrap;
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
    .btn-sub {
      color: white;
      border: none;
      padding: .8rem 1rem;
      font-size: 1.8rem;
      width: 21rem;
      background-color: @dark-yellow;
      border: none;
      border-radius: 5px;
    }
  }
}
</style>
