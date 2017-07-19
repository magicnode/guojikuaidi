<template>
  <footer>
    <ul>
      <li v-for="item in foot" @click="goPath(item.path)" :key="item.key">
        <div class="footer-active" v-if="item.key === page">
          <img :src="item.activeicon" :alt="item.name">
          <p>{{ item.name }}</p>
        </div>
        <div class="footer-unactive" v-else>
          <img :src="item.icon" :alt="item.name">
          <p>{{ item.name }}</p>
        </div>
      </li>
    </ul>
  </footer>
</template>

<script>
import {mapGetters} from 'vuex'
import sendPng from '../assets/images/new/nav_sen_nor.png'
import acsendPng from '../assets/images/nav_ivo_che.png'
import minePng from '../assets/images/new/nav_min_nor.png'
import acminePng from '../assets/images/nav_min_che.png'

export default {
  name: 'footer',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      'page': 'getPage'
    })
  },
  data () {
    return {
      foot: [{
        name: '寄件',
        path: '/send',
        icon: sendPng,
        activeicon: acsendPng,
        key: 'send'
      }, {
        name: '我的',
        path: '/usercenter',
        icon: minePng,
        activeicon: acminePng,
        key: 'usercenter'
      }]
    }
  },
  created () {
  },
  methods: {
    goPath (path) {
      this.$router.push({path})
    }
  }
}

</script>

<style lang="less" scoped>
@import '../assets/styles/colors.less';
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  border-top: 1px solid @borderbt;
  ul {
    width: 100%;
    overflow: hidden;
    display: flex;
    li {
      flex: 1;
      padding: .4rem .1rem;
      list-style: none;
      text-align: center;
      font-size: 0.3rem;
      color: #333333;
      margin: 0 auto;
      text-decoration: none;
      display: block;
      border-right: 1px solid #ececec;
      box-sizing: border-box;
      &:last-child {
        border-right-width: 0;
      }
      p {
        font-size: 1.4rem;
        color: #999;
      }
      img {
        width: 2.4rem;
        height: 2.2rem;
        display: block;
        margin: 0 auto;
      }
      div.footer-active {
        p {
          color: @red;
        }
      }
      div.footer-unactive {
        p {
          color: @greyfont;
        }
      }
    }
  }
  .footer-send {
    img {
      width: 5.8rem;
      position: absolute;
      bottom: 0rem;
      left: 40%;
      display: block;
      z-index: 100;
    }
  }
}
</style>
