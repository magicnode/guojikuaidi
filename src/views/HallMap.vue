<template>
  <div class="map">
    <div id="iCenter" style="height: 100vh;">
    </div>
    <div id="panel"></div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import {site as siteApi, brand as brandApi} from '@/api'
import pic from '../assets/images/new/officedefault.png'

let instance = axios.create({
  timeout: 2000
})

export default {
  name: 'send',
  components: {
  },
  mounted () {
    window.document.title = '选择寄件站点'
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
      async function getBounds (selfPosition) {
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
            // offset: new window.AMap.Pixel(-17, -42),
            draggable: false
          })
          marker.setMap(mapObj)
          const userId = info.userId
          window.AMap.event.addListener(marker, 'click', async function (data) {
            let info = data.target.G.info
            const brandRes = await axios({
              method: 'get',
              url: brandApi.index,
              params: {
                id: userId
              }
            })
            let brand = ''
            if (brandRes.status !== 200) {
              brand = ''
            } else {
              let data = brandRes.data
              brand = '<p>此站点引入的快递品牌有: ' + data + '</p>'
            }
            let officeBtnId = ''
            window.AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {
              officeBtnId = 'userId' + info.userId
              const photo = '<div class="officeimg"><img src="' + pic + '"></div>'
              const infoWindow = new SimpleInfoWindow({
                infoTitle: '<span>"妙寄"全网站点: ' + info.name || '' + '</span>',
                infoBody: photo + '<div class="office-detail"><p class="office-info"><p>具体地址: ' + info.descript + '</p><p>电话号码: <a href="tel:' + info.mobile + '">' + info.mobile + '</a></p>' + brand + '<p>是否选择该站点为寄件站点?</p><p class="div-confirm-btn"><button type="button" id="' + officeBtnId + '" class="confirm-btn hide">确定</button></p></p></div>',
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
            // 设置按钮绑定事件
            setTimeout(function () {
              const btn = window.document.getElementById(officeBtnId)
              btn.addEventListener('click', function (event) {
                event.stopPropagation()
                info = JSON.stringify(info)
                window.localStorage.removeItem('mj_addressInfo')
                window.localStorage.setItem('mj_addressInfo', info)
                window.history.go(-1)
              }, true)
              btn.className = btn.className.replace(/hide/g, '')
            }, 500)
            // window.AMap.plugin(['AMap.Walking'], function () {
            //   // const walking = new window.AMap.Walking()
            //   const walking = new window.AMap.Walking()
            //   walking.clear()
            //   // new window.AMap.LngLat(selfPosition.getLng(), selfPosition.getLat())
            //   // new window.AMap.LngLat(121.345506, 31.222795)
            //   const positionlat = new window.AMap.LngLat(selfPosition.getLng(), selfPosition.getLat())
            //   walking.search(positionlat, new window.AMap.LngLat(info.longitude, info.latitude), function (status, result) {
            //     if (status === 'complete') {
            //       (new window.Lib.AMap.WalkingRender()).autoRender({
            //         data: result,
            //         map: mapObj,
            //         panel: 'panel'
            //       })
            //     }
            //   })
            // })
            return
          })
        }
      }
      window.AMap.event.addListener(geolocation, 'complete', function (data) {
        const selfPosition = data.position
        getBounds(selfPosition)
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
@import '../assets/styles/helpers.less';
.amap-ui-smp-ifwn-container {
  max-width: 22rem;
  @media (max-width:320px) {
    max-width: 22rem;
  }
  @media (min-width:360px) {
    max-width: 42rem;
  }
  @media (min-width:400px) {
    max-width: 47rem;
  }
}
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
