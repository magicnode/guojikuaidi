<template>
  <div class="map">
    <div id="iCenter" style="height: 100vh;">
    </div>
  </div>
</template>
<script>
import {address as addressApi} from '@/api'

export default {
  name: 'send',
  components: {
  },
  async created () {
    const {userId} = this.$route.query
    if (!userId) {
      this.$vux.toast.show({
        text: '缺少关键数据， 无法查询营业厅地址',
        type: 'warn',
        width: '26rem'
      })
      return
    }
    this.$http({
      method: 'post',
      url
    })
  },
  mounted () {
    window.document.title = '营业厅地图'
    let mapObj = new window.AMap.Map('iCenter', {
      resizeEnable: true,
      zoom: 13,
      center: [121, 31]
    })
    window.AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {
      const marker = new window.AMap.Marker({
        map: mapObj,
        zIndex: 9999999,
        position: [121, 31],
        draggable: false
      })
      const infoWindow = new SimpleInfoWindow({
        infoTitle: '<strong>' + 'asd' + '</strong>',
        infoBody: '<p class="office-info"><p>手机号：' + 15751158939 + '</p>' + '它能够帮助您在网站或移动端中构的地图应用程序</p>',
        offset: new window.AMap.Pixel(0, -31)
      })
      function openInfoWin () {
        infoWindow.open(mapObj, marker.getPosition())
      }
      window.AMap.event.addListener(marker, 'click', function () {
        openInfoWin()
      })
      openInfoWin()
    })
  },
  computed: {
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../assets/styles/colors.less';
</style>
