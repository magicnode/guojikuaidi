<template>
  <div class="map">
    <mj-header title="营业厅地图"></mj-header>
    <div id="iCenter" style="height: 93vh;">
    </div>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'send',
  components: {
  },
  mounted () {
    let mapObj = new window.AMap.Map('iCenter', {
      resizeEnable: true,
      zoom: 14
    })
    mapObj.plugin('AMap.Geolocation', function () {
      let geolocation = new window.AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
        noIpLocate: 0,
        convert: true,
        showButton: true,
        buttonPosition: 'LB',
        buttonOffset: new window.AMap.Pixel(10, 20),
        showMarker: true,
        showCircle: true,
        panToLocation: true,
        zoomToAccuracy: false,
        GeoLocationFirst: true
      })
      mapObj.addControl(geolocation)
      geolocation.getCurrentPosition()
      // const _this = this
      function getBounds () {
        let bounds = mapObj.getBounds()
        // alert(bounds)
        let marker1 = new window.AMap.Marker({
          position: bounds[0],
          offset: new window.AMap.Pixel(-17, -42),
          draggable: false,
          content: '<h1>123</h1>'
        })
        marker1.setMap(mapObj)
        let marker2 = new window.AMap.Marker({
          position: bounds[1],
          offset: new window.AMap.Pixel(17, 42),
          draggable: false,
          content: '<h1>456</h1>'
        })
        marker2.setMap(mapObj)
      }
      window.AMap.event.addListener(geolocation, 'complete', function (data) {
        getBounds()
      })
      window.AMap.event.addListener(geolocation, 'error', function () {
        alert('定位失败')
      })
      window.AMap.event.addListener(mapObj, 'dragend', function () {
        setTimeout(function () {
          getBounds()
        }, 1000)
      })
      window.AMap.event.addListener(mapObj, 'zoomend', function () {
        setTimeout(function () {
          getBounds()
        }, 1000)
      })
    })
  },
  created () {
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
