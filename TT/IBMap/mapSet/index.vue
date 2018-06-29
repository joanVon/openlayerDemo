<template>
  <div class="map-box">
    <div id='map' class="map"></div>
    <m-hanlde @editArea="hdEditArea" @bindDevice="hdBindDevice" class="handle"></m-hanlde>
    <m-popup @close="closePopup" ref="mPopup">

    </m-popup>
  </div>
</template>
<script>
import Projection from 'ol/proj/Projection'
import Map from 'ol/Map'
import View from 'ol/View'
import Feature from 'ol/Feature'
import Overlay from 'ol/Overlay'
import { Draw, Modify, Snap } from 'ol/interaction'
import { Vector as VectorLayer, Image as ImageLayer } from 'ol/layer'
import { Vector as VectorSource, ImageStatic } from 'ol/source'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'
import { getCenter } from 'ol/extent'
import { Polygon } from 'ol/geom'
import mHanlde from '../components/m-handle'
import mPopup from '../components/m-popup'
const area = { source: '', draw: '', snap: '', modify: '' }
const areaThemes = {
  normal: {
    fillColor: 'rgba(0, 78, 49, 0.5)',
    strokeColor: 'rgba(0, 78, 49, 0.81)',
    imageColor: 'rgba(0, 78, 49, 0.81)'
  },
  danger: {
    fillColor: 'rgba(227, 49, 9, 0.65)',
    strokeColor: '#e36209',
    imageColor: '#e36209'
  }
}
export default {
  name: 'DataShow',
  components: { mHanlde, mPopup },
  data () {
    return {
      map: {},
      projection: {},

      handleType: 'Polygon',
      mapInfo: { id: 'gd100001', name: '海康威视三期', img: '/static/map/building-site.jpg', extent: [120.227471, 30.215046, 120.231756, 30.217909] },
      markers: [{ id: 'mk10001', name: '安全帽', point: [120.228471, 30.216555] }],
      areaDatas: [{ id: 10000001, name: '普通区域', type: 'normal', points: [[[120.228571, 30.215655], [120.229671, 30.215655], [120.229471, 30.216555], [120.228571, 30.215655]]] },
      { id: 10000002, name: '危险区域', type: 'danger', points: [[[120.229571, 30.217255], [120.229971, 30.216655], [120.231071, 30.216555], [120.229571, 30.217255]]] }]
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initMap(Object.assign({ targetId: 'map', code: 'EPSG:4326', zoom: 3 }, this.mapInfo))
        .renderArea(this.areaDatas)
    })
  },
  methods: {

    initMap (mapInfo) {
      this.projection = new Projection({
        code: mapInfo.code,
        extent: mapInfo.extent
      })
      this.overlay = new Overlay({
        element: this.$refs.mPopup.$el,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      })
      this.map = new Map({
        layers: [
          new ImageLayer({
            source: new ImageStatic({
              url: mapInfo.img,
              projection: this.projection,
              imageExtent: mapInfo.extent
            })
          })
        ],
        target: mapInfo.targetId,
        overlays: [this.overlay],
        view: new View({
          projection: this.projection,
          center: getCenter(mapInfo.extent),
          zoom: mapInfo.zoom
        })
      })

      return this
    },
    renderMarker (markers) {

    },
    renderArea (areas) {
      let features = areas.map((item) => {
        let feature = new Feature({
          id: item.id,
          name: item.name,
          geometry: new Polygon(item.points)
        })
        feature.setStyle(new Style({
          fill: new Fill({ color: areaThemes[item.type].fillColor }),
          stroke: new Stroke({ color: areaThemes[item.type].strokeColor, width: 2 }),
          image: new CircleStyle({ radius: 7, fill: new Fill({ color: areaThemes[item.type].imageColor }) })
        }))
        return feature
      })
      area.source = new VectorSource({ features })
      this.map.addLayer(this.createPolygonLayer())

      return this
    },
    createPolygonLayer (type) {
      return new VectorLayer({
        source: area.source,
        style: new Style({
          fill: new Fill({ color: 'rgba(255, 255, 255, .2)' }),
          stroke: new Stroke({ color: '#ffcc33', width: 2 }),
          image: new CircleStyle({ radius: 7, fill: new Fill({ color: '#ffcc33' }) })
        })
      })
    },
    hdEditArea (bool) {
      if (bool) {
        // 激活绘制交互
        area.draw = new Draw({ source: area.source, type: 'Polygon' })
        this.map.addInteraction(area.draw)
        area.draw.on('drawend', (e) => {
          debugger
          this.overlay.setPosition(e.coordinate)
        })
        // 激活修改交互
        area.modify = new Modify({ source: area.source })
        this.map.addInteraction(area.modify)
        area.modify.on('modifyend', (e) => {

        })
        // 激活选中点自动吸附效果
        area.snap = new Snap({ source: area.source })
        this.map.addInteraction(area.snap)
      } else {
        this.map.removeInteraction(area.draw)
        this.map.removeInteraction(area.modify)
        this.map.removeInteraction(area.snap)
      }
    },
    hdBindDevice () {

    },
    // 处理弹窗关闭事件
    closePopup (e) {

    }
  }
}
</script>
<style lang='less' scoped>
.map-box {
  position: relative;
}
.handle {
  position: absolute;
  z-index: 10000;
  top: 20px;
  right: 20px;
}
</style>
