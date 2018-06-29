<template>
  <div class="page-content map">
    <!-- 操作面板 -->
    <div class="operation-area">
      <div class="opt-btn-group">
        <span class="opt-btn opt-draw">区域绘制</span>
        <span class="opt-btn opt-mark">设备标记</span>
      </div>

      <div class="opt-panel">
        <el-radio-group v-model="optSwitch">
          <el-radio label="normal">普通区域</el-radio>
          <el-radio label="danger">危险区域</el-radio>
          <el-radio label="camera">监控点</el-radio>
          <el-radio label="e-device">环境量设备</el-radio>
          <!-- <el-radio label="4">坐标定位</el-radio> -->
        </el-radio-group>
      </div>
    </div>
    <div id="diyMap"></div>
  </div>
</template>

<script>
import Util from './utils'
import ol from 'openlayers'
import './mapStyle.less'

export default {
  name: 'DiyMap',
  props: {
    data: { type: Object,
      default: () => {
        return Object.assign({ 'type': 'FeatureCollection' }, {})
      } },
    projCode: { type: String, default: 'EPSG:4326' },
    extent: {
      type: Array,
      default: () => { return [120.220524, 30.214435, 120.212713, 30.207322] }
    },
    imageStatic: { type: Object,
      default: () => {
        return {
          model: true,
          src: '',
          imageExtent: [0, 0]
        }
      } }
  },
  data () {
    return {
      // vector: null,
      map: null,
      mapExtent: this.extent,
      zoom: 16,
      zoomArea: [8, 20],
      center: [120.22016, 30.21267],

      // vSource: null,
      draw: null,

      optSwitch: ''
    }
  },
  computed: {
    projection () {
      return ol.proj.get(this.projCode)
    },
    vSource () {
      return Util.vectSource(this.projection, this.data)
    },
    vector () {
      return new ol.layer.Vector({
        source: this.vSource
      })
    }
  },
  methods: {
    addInteractions () {
      let value = 'None'
      if (value !== 'None') {
        this.draw = new ol.interaction.Draw({
          source: this.vSource,
          type: 'Polygon',
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(255, 99, 71, 0.3)'
            }),
            stroke: new ol.style.Stroke({
              color: 'tomato',
              width: 2
            })
          })
        })
        this.map.addInteraction(this.draw)
      }
    }
  },
  mounted () {
    this.imageStatic.src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530165488&di=9a1e28a1bff61e54041230557abf8be3&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.csup.gov.cn%2Fadmin%2Fkindeditor%2Fattached%2Fimage%2F20160823%2F20160823152400_8927.jpg'
    this.imageStatic.imageExtent = [120.220524, 30.214435, 120.212713, 30.207322]

    // this.vSource = Util.vectSource(this.projection, this.data)
    /* const vector = new ol.layer.Vector({
      source: this.vSource
    }) */
    const controls = Util.olControl()
    const layers = Util.olLayers(this.imageStatic, this.vector)
    const view = Util.olView(this.projection, this.zoom, this.zoomArea, this.center)

    const selectClick = new ol.interaction.Select({
      condition: ol.events.condition.click
    })
    const modify = new ol.interaction.Modify({
      source: this.vSource,
      features: selectClick.getFeatures()
    })

    this.map = Util.olMap('diyMap', controls, layers, view)

    this.map.addInteraction(selectClick)
    this.map.addInteraction(modify)
  }
}
</script>
<style>
.ol-full-screen {
  top: auto;
  bottom: 2.5em;
}
</style>

