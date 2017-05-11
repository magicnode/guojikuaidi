<template>
  <div class="map">
    <mj-header title="营业厅地图"></mj-header>
    <div id="iCenter" style="height: 93vh;">
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import {site as siteApi} from '@/api'

let instance = axios.create({
  timeout: 2000
})

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
      async function getBounds () {
        let bounds = mapObj.getBounds()
        let southwestOb = bounds.getSouthWest()
        let southwest = []
        southwest[0] = southwestOb.lng
        southwest[1] = southwestOb.lat
        let northeastOb = bounds.getNorthEast()
        let northeast = []
        northeast[0] = northeastOb.lng
        northeast[1] = northeastOb.lat
        const res = await instance.get(siteApi.location, {
          params: {southwest: '[' + southwest.toString() + ']', northeast: '[' + northeast.toString() + ']'}
        })
        let data = res.data
        for (let i = 0, len = data.length; i < len; i++) {
          let info = data[i]
          let marker = new window.AMap.Marker({
            info: data[i],
            position: [info.longitude, info.latitude],
            offset: new window.AMap.Pixel(-17, -42),
            draggable: false
          })
          marker.setMap(mapObj)
          window.AMap.event.addListener(marker, 'click', function (data) {
            let info = data.target.G.info
            let cf = confirm('是否选择' + info.descript + '为寄件营业厅')
            if (cf) {
              info = JSON.stringify(info)
              window.localStorage.removeItem('addressInfo')
              window.localStorage.setItem('addressInfo', info)
              window.history.go(-1)
            }
            return
          })
        }
      }
      window.AMap.event.addListener(geolocation, 'complete', function (data) {
        getBounds()
      })
      window.AMap.event.addListener(geolocation, 'error', function () {
        // alert('定位失败')
        console.log('定位失败')
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
    ...mapGetters({
      site: 'getSite',
      recent: 'getSiteRecent'
    })
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'addSite'
    ])
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../assets/styles/colors.less';
</style>
