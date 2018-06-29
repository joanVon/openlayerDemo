<template>
  <div>
    <div id="allmap" ref="allmap"></div>
    <div id="r-result">
      <input type="button" @click="addGroundOverlay" value="添加" />
      <input type="button" @click="removeGroundOverlay" value="删除" />
    </div>
  </div>
</template>
<script>
import BMap from 'BMap'
export default {
  name: 'DataShow',
  data () {
    return {
      map: '',
      groundOverlay: ''
    }
  },
  mounted () {
    let hkvision = new BMap.Point(120.229807, 30.216514)

    // 创建Map实例
    let map = this.map = new BMap.Map('allmap')

    map.setMaxZoom(30)
    // 居中放大
    map.centerAndZoom(hkvision, 30)

    // 启用滚轮放大缩小
    map.enableScrollWheelZoom()

    // 西南角和东北角
    let SW = new BMap.Point(120.228374, 30.215031)
    let NE = new BMap.Point(120.231438, 30.218199)

    let groundOverlayOptions = {
      opacity: 1,
      displayOnMinLevel: 14,
      displayOnMaxLevel: 100
    }

    // 初始化GroundOverlay
    let groundOverlay = this.groundOverlay = new BMap.GroundOverlay(new BMap.Bounds(SW, NE), groundOverlayOptions)
    // 设置GroundOverlay的图片地址
    groundOverlay.setImageURL('/static/map/building-site.jpg')

    // 单击事件
    groundOverlay.addEventListener('click', function (clickEvent) {
      // console.log('clickEvent', clickEvent)
    })

    // 双击事件
    groundOverlay.addEventListener('dblclick', function (dblclickEvent) {
      // console.log('dblclickEvent', dblclickEvent)
    })
    function addMarker (point) {
      let marker = new BMap.Marker(point)
      map.addOverlay(marker)
    }
    // 随机向地图添加25个标注
    let bounds = groundOverlay.getBounds()
    let sw = bounds.getSouthWest()
    let ne = bounds.getNorthEast()
    let lngSpan = Math.abs(sw.lng - ne.lng)
    let latSpan = Math.abs(ne.lat - sw.lat)
    for (let i = 0; i < 25; i++) {
      let point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7))
      addMarker(point)
    }
  },
  methods: {
    addGroundOverlay () {
      // 添加GroundOverlay
      this.map.addOverlay(this.groundOverlay)
      this.groundOverlay.Lg.parentNode.parentNode.style.zIndex = 300
    },
    removeGroundOverlay () {
      // 移除GroundOverlay
      this.map.removeOverlay(this.groundOverlay)
    }
  }
}
</script>
<style>
#allmap {
  height: 900px;
  width: 100%;
}
#r-result {
  width: 100%;
}
</style>
