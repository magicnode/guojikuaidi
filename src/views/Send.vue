<template>
  <div class="send">
    <mj-header title="寄件"></mj-header>
    <div class="send-container">
      <div class="send-container-address flex">
        <p class="send-container-address__intro">寄</p>
        <div>
          淮海路1189号
        </div>
        <div class="send-container-address__link">
          <router-link to="/address">
            地址簿
          </router-link>
        </div>
      </div>
      <div class="send-container-address flex">
        <p class="send-container-address__intro">收</p>
        <div>
          绥宁路998号
        </div>
        <div class="send-container-address__link">
          <router-link to="/address">
            地址簿
          </router-link>
        </div>
      </div>

      <div class="send-container-select">
        <group>
          <selector placeholder="请选择快递品牌" v-model="express" title="营业厅" name="district" :options="list" @on-change="onChange"></selector>
          <selector placeholder="请选择快递品牌"  v-model="express" title="快递品牌" name="district" :options="list" @on-change="onChange"></selector>
          <selector placeholder="请选择快递品牌" v-model="express" title="物品描述" name="district" :options="list" @on-change="onChange"></selector>
          <selector placeholder="请选择快递品牌" v-model="express" title="备注" name="district" :options="list" @on-change="onChange"></selector>
        </group>
      </div>
      
<!--       <div class="send-container-count">
        <div class="send-container-count__title flex">
          <p>运价计算</p>
          <button type="" @click="goPath('/send/detail')">寄件列表</button>
        </div>

        <div class="send-container-count__main flex">
          <input type="text" name="">
          <p>—></p>
          <input type="text" name="">
          <p>=</p>
          <input type="text" name="" disabled>
        </div>
      </div> -->
      <button type="submit" class="btn-sub">提交</button>

    </div>
  </div>
</template>
<script>
import { Selector } from 'vux'

export default {
  name: 'send',
  components: {
    Selector
  },
  created () {
  },
  data () {
    return {
      express: '',
      list: [{
        key: 'gd',
        value: '顺丰'
      }, {
        key: 'gx',
        value: '韵达'
      }]
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
      &__intro {
        height: 1.5rem;
        width: 1.5rem;
        padding: .5rem;
        border: 1px solid #999;
        border-radius: 50%;
      }
      &__link {
        padding: 0 1rem;
        height: 5rem;
        line-height: 5rem;
        border-left: 1px solid #999;
        a {
          padding: .5rem;
          border: 1px solid #999;
          border-radius: 10%;
          color: black;
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

    &-count {
      &__title {
        padding: 1rem;
        font-size:1.4rem;
        justify-content: space-between;
        button {
          background: white;
          padding: 0.4rem;
          border: 1px solid #666;
          border-radius: 10%;
        }
      }

      &__main {
        padding: 1rem;
        justify-content: space-between;
        input {
          flex: 1;
          padding: .3rem;
          width: 2rem;
        }
        p {
          flex: 1;
        }
      }

      .btn-sub {
        color: white;
        border: none;
        padding: .5rem 1rem;
        font-size: 1.8rem;
        width: 140px;
        background: inherit;
        background-color: rgba(22, 155, 213, 1);
        border: none;
        border-radius: 5px;
      }
    }
  }
}
</style>
