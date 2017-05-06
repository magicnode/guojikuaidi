<template>
  <div class="map">
    <mj-header title="营业厅地图"></mj-header>
    <div id="iCenter" style="height: 93vh;">
      
    </div>
  </div>
</template>
<script>

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
        noIpLocate: 3,
        convert: true,
        showButton: true,
        buttonPosition: 'LB',
        buttonOffset: new window.AMap.Pixel(10, 20),
        showMarker: true,
        showCircle: true,
        panToLocation: true,
        zoomToAccuracy: false
      })
      mapObj.addControl(geolocation)
      // let bounds = mapObj.getBounds()
      // alert(bounds)
      // let marker1 = new window.AMap.Marker({
      //   position: bounds[0],
      //   offset: new window.AMap.Pixel(-17, -42),
      //   draggable: true
      // })
      // marker1.setMap(mapObj)
      // let marker2 = new window.AMap.Marker({
      //   position: bounds[1],
      //   offset: new window.AMap.Pixel(17, 42),
      //   draggable: true
      // })
      // marker2.setMap(mapObj)
      geolocation.getCurrentPosition()
      window.AMap.event.addListener(geolocation, 'complete', function (data) {
        let bounds = mapObj.getBounds()
        // alert(bounds + ';;;;;' + bounds.getSouthWest() + ';;;' + bounds.getNorthEast())
        let marker1 = new window.AMap.Marker({
          position: bounds[0],
          offset: new window.AMap.Pixel(-17, -42),
          draggable: true
        })
        marker1.setMap(mapObj)
        let marker2 = new window.AMap.Marker({
          position: bounds[1],
          offset: new window.AMap.Pixel(17, 42),
          draggable: true
        })
        marker2.setMap(mapObj)
      })
      window.AMap.event.addListener(geolocation, 'error', function () {
        alert('定位失败')
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
