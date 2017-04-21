<template>
  <footer>
    <ul>
      <li v-for="item in foot" @click="goPath(item.path)" :class="item.class">
        <img :src="item.icon" :alt="item.name">
        <p>{{ item.name }}</p>
      </li>
    </ul>
    <div class="footer-send" @click.stop="goPath('/send')">
      <img :src="send.icon" :alt="send.name">
    </div>
  </footer>
</template>

<script>
import homePng from '../assets/images/home_miaoji_54_nor.png'
import searchPng from '../assets/images/home_miaoji_57.png'
import msgPng from '../assets/images/home_miaoji_60.png'
import minePng from '../assets/images/home_miaoji_63.png'
import sendPng from '../assets/images/wode_52.png'

export default {
  name: 'footer',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      foot: [{
        name: '妙寄',
        path: '/index',
        icon: homePng,
        class: 'fl'
      }, {
        name: '查询',
        path: '/index',
        icon: searchPng,
        class: 'fl'
      }, {
        name: '我的',
        path: '/usercenter',
        icon: minePng,
        class: 'fr'
      }, {
        name: '消息',
        path: '/index',
        icon: msgPng,
        class: 'fr'
      }],
      send: {
        name: '寄件',
        path: '/index',
        icon: sendPng,
        class: ''
      }
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
  .clear {
    content: '';
    clear: both;
  }
  .fl {
    float: left;
    &:after {
      .clear;
    }
  }
  .fr {
    float: right;
    &:after {
      .clear;
    }
  }
  ul {
    width: 100%;
    overflow: hidden;
    padding-top: 0.05rem;
    padding-bottom: 0.05rem;
    li {
      width: 17%;
      padding: 0.1rem;
      list-style: none;
      text-align: center;
      font-size: 0.3rem;
      color: #333333;
      margin: 0 auto;
      text-decoration: none;
      display: block;
      img {
        width: 33%;
        max-height: 3rem;
        display: block;
        margin: 0 auto;
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
