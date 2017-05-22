<template>
  <div class="map">
    <div id="iCenter" style="height: 100vh;">
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import {site as siteApi} from '@/api'
import pic from '../assets/images/new/office404(1).jpg'

let instance = axios.create({
  timeout: 2000
})

export default {
  name: 'send',
  components: {
  },
  mounted () {
    window.document.title = '选择营业厅'
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
            console.log('info', info)
            // let cf = confirm('是否选择' + info.descript + '为寄件营业厅')
            // if (cf) {
            //   info = JSON.stringify(info)
            //   window.localStorage.removeItem('mj_addressInfo')
            //   window.localStorage.setItem('mj_addressInfo', info)
            //   window.history.go(-1)
            // }
            window.AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {
              const marker = new window.AMap.Marker({
                map: mapObj,
                zIndex: 9999999,
                position: [info.longitude, info.latitude],
                draggable: false
              })
              const photo = '<img width=300 height=140 src="' + pic + '"><br>'
              const officeBtnId = 'userId' + info.userId
              const infoWindow = new SimpleInfoWindow({
                infoTitle: '<span>妙寄全网站点: ' + info.name || '' + '</span>',
                infoBody: photo + '<p class="office-info"><p>具体地址: ' + info.descript + '</p><p>电话号码: ' + info.mobile + '</p><p>是否选择该营业厅为寄件营业厅?</p><p class="div-confirm-btn"><button type="" id="' + officeBtnId + '" class="confirm-btn">确定</button></p></p>',
                offset: new window.AMap.Pixel(0, -31)
              })
              console.log('btn id', officeBtnId)
              console.log('btn id', typeof officeBtnId)
              setTimeout(function () {
                const btn = window.document.getElementById(officeBtnId)
                console.log('btn', btn)
                btn.addEventListener('click', function () {
                  // let cf = confirm('是否选择' + info.descript + '为寄件营业厅')
                  // if (cf) {
                  // }
                  info = JSON.stringify(info)
                  window.localStorage.removeItem('mj_addressInfo')
                  window.localStorage.setItem('mj_addressInfo', info)
                  window.history.go(-1)
                })
              }, 1000)
              function openInfoWin () {
                infoWindow.open(mapObj, marker.getPosition())
              }
              window.AMap.event.addListener(marker, 'click', function () {
                openInfoWin()
              })
              openInfoWin()
            })
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
.normal-btn {
  width: 6.6rem;
  font-size: 1.4rem;
  text-align: center;
  padding: .4rem .4rem;
  border-radius: 5px;
  box-sizing: border-box;
  white-space: nowrap;
}

.confirm-btn {
  .normal-btn;
  color: white;
  border: none;
  background: @dark-yellow;
}

.div-confirm-btn {
  text-align: center;
  padding: .5rem;
  padding-bottom: 0;
}

</style>
