<template>
    <div class="logisticsresult">
      <div class="logisticsresult-title">
        <div class="logisticsresult-title-img">
          <img :src="brand | brandlogo" :alt="brand | brandtype">
        </div>
        <div class="logisticsresult-title-brand">
          <p>快递品牌: {{brand | brandtype}}</p>
          <p>{{'快递单号: ' + route.orderSn}}</p>
        </div>
      </div>
      <div class="wrapper">
        <h1 v-show="route.errorResult">{{route.errorResult}}</h1>
        <div v-for="part, index in route.parts" class="logisticsresult-content" :class="{isfirstPart: index === 0}">
          <div class="logisticsresult-content--part date-intro">
            <p class="minute">{{part.time | getMinute}}</p>
            <p class="date">{{part.time | getDate}}</p>
          </div>
          <div class="line logisticsresult-content--part">
            <div class="line-div">
            </div>
          </div>
          <div class="logisticsresult-content--part">            
            <p>{{part.processInfo}}</p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'expressroute',
  async created () {
    this.$vux.loading.show({text: ' '})
    const query = this.$route.query
    this.brand = query.brand
    const res = await this.setExpressRoute(query)
    if (res.type !== 'success') {
      this.$vux.loading.hide()
      this.$vux.toast.show(res)
    } else {
      this.$vux.loading.hide()
    }
  },
  mounted () {
    window.document.title = '路由信息'
  },
  data () {
    return {
      brand: ''
    }
  },
  computed: {
    ...mapGetters({
      route: 'getExpressRoute'
    })
  },
  methods: {
    ...mapActions([
      'setExpressRoute'
    ])
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/styles/colors.less';
@import '../assets/styles/helpers.less';
@grey: #efeff4;

.isfirstPart {
  color: @dark-yellow;
  .line {
    &:before {
      background: @dark-yellow!important;
    }
    &-div {
      background: @dark-yellow!important;
    }
  }
}

.logisticsresult {
  &-title {
    display: flex;
    padding: 1.5rem;
    background: @dark-yellow;
    &-img {
      img {
        width: 5rem;
        font-size: 0;
        vertical-align: middle;
        border-radius: 15%;
      }
    }
    &-brand {
      text-align: left;
      padding-left: 1rem;
      p {
        color: white;
        &:first-child {
          font-size:  1.4rem;
          margin: 0;
          padding: .6rem 0;
        }
        &:last-child {
          font-size: 1.4rem;
          margin: 0;
        }
      }
    }
  }
  .wrapper {
    background: white;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  &-content {
    display: flex;
    padding: 1rem;
    padding-bottom: 0;
    &:first-child {
      p {
        color: @dark-yellow;
      }
    }
    .date-intro {
      max-width: 8rem;
    }
    &--part {
      text-align: justify;
      padding: 0 1rem;
      // flex: 1;
      p {
        font-size: 1.4rem;
      }
      p.minute {
        text-align: center;
        font-size: 1.4rem;
        max-height: 1.4rem;
        // overflow: hidden;
        white-space: nowrap;
      }
      p.date {
        text-align: center;
        font-size: 1.3rem;
        max-height: 1.3rem;
        // overflow: hidden;
        white-space: nowrap;
      }
    }
    div.line {
      width: 1rem;
      &:before {
        content: ' ';
        display: inline-block;
        width: 12px;
        height: 12px;
        background: #999;
        border-radius: 50%;
      }
      &-div {
        height: 5rem;
        width: 2px;
        margin-left: 38%;
        background: #999;
      }
    }
  }
}
</style>
