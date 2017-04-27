<template>
  <footer>
    <ul>
      <li v-for="item in foot" @click="goPath(item.path)">
        <img :src="item.icon" :alt="item.name">
        <p>{{ item.name }}</p>
      </li>
    </ul>
  </footer>
</template>

<script>
import searchPng from '../assets/images/home_miaoji_57.png'
import msgPng from '../assets/images/home_miaoji_60.png'
import minePng from '../assets/images/home_miaoji_63.png'
// import sendPng from '../assets/images/wode_52.png'

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
        name: '收件',
        path: '/pickup',
        icon: searchPng
      }, {
        name: '寄件',
        path: '/send',
        icon: msgPng
      }, {
        name: '我的',
        path: '/usercenter',
        icon: minePng
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
  ul {
    width: 100%;
    overflow: hidden;
    padding: 1rem 0;
    display: flex;
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
