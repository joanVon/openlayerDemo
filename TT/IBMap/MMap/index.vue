<template>
  <div id="mMap">
    <map-panel @activeDraw="handleDraw" @activeMark="handleMark"></map-panel>

    <el-popover ref="areaPop" placement="right" width="300" trigger="click" v-model="areaPopShow">
      <!-- <el-radio class="radio" v-model="areaType" label="1">正常</el-radio>
      <el-radio class="radio" v-model="areaType" label="2">危險</el-radio> -->
      <el-radio-group v-model="areaType">
        <el-radio :label="1">正常</el-radio>
        <el-radio :label="2">危險</el-radio>
      </el-radio-group>
    </el-popover>

    <el-popover ref="markerPopover" placement="top" width="160" :visible-arrow="true" v-model="markerPopShow">
      <p>{{markerCoord[0]}} {{markerCoord[1]}}</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="markerPopShow = false">取消</el-button>
        <el-button type="primary" size="mini" @click="markerPopShow = false">确定</el-button>
      </div>
    </el-popover>

    <!-- <marker-pop ref="pMarkPop" :visible.sync="markerPopShow"></marker-pop> -->

  </div>
</template>

<script>
// import Vue from 'vue'
import Map from 'ol/Map'
// import {defaults as defaultControls, FullScreen} from 'ol/control'
import OSM from 'ol/source/OSM'
import Projection from 'ol/proj/Projection'
import ImageLayer from 'ol/layer/Image'

// import Feature from 'ol/Feature'
// import Point from 'ol/geom/Point'
import { Fill, Stroke, Style } from 'ol/style'
import { Draw, Modify, Snap } from 'ol/interaction'

import Overlay from 'ol/Overlay'

// import {toStringHDMS} from 'ol/coordinate.js'

import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'

import Static from 'ol/source/ImageStatic'

import { fromLonLat, toLonLat } from 'ol/proj'
import { getCenter } from 'ol/extent'
import View from 'ol/View'

// import Util from './util.js'
import './mapStyle.less'

import MapPanel from './optPanel.vue'
// import MarkerPop from './markerPop.vue'

const initCfg = {
  code: 'EPSG:4326',
  extent: [120.220524, 30.214435, 120.212713, 30.207322]
}
const imageCfg = {
  url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530165488&di=9a1e28a1bff61e54041230557abf8be3&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.csup.gov.cn%2Fadmin%2Fkindeditor%2Fattached%2Fimage%2F20160823%2F20160823152400_8927.jpg',
  imageExtent: initCfg.extent
}
// const markerLayer = new Markers('markers')
const stylesNormal = [
  new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 3
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    })
  })
]

/* const stylesSpec = [
  new Style({
    stroke: new Stroke({
      color: 'red',
      width: 3
    }),
    fill: new Fill({
      color: 'red'
    })
  })
] */
// const iconFeature = (position) => {
//   return new Feature(new Point(position))
// }
// features: (new GeoJSON()).readFeatures(geojsonObject)
const source = new VectorSource()
// 普通
const vectorLayer = new VectorLayer({
  source: source,
  style: stylesNormal
})
// 特殊
// const vectorDanger = new VectorLayer({
//   source: source,
//   style: stylesSpec
// })

const viewZoom = {
  zoom: 16,
  zoomArea: [8, 20]
}

const projection = new Projection({
  code: initCfg.code,
  extent: initCfg.extent
})
// const mapControls = defaultControls().extend([
//   new FullScreen()
// ])
const mapLayers = [
  new TileLayer({
    preload: Infinity,
    source: new OSM()
  }),
  new ImageLayer({
    source: new Static({
      url: imageCfg.url,
      projection: projection,
      imageExtent: imageCfg.imageExtent
    })
  }),
  vectorLayer
  // vectorDanger
]

const modify = new Modify({
  source: source
  // features: selectClick.getFeatures()
})

const mapView = new View({
  center: fromLonLat(getCenter(initCfg.extent)),
  // center: getCenter(initCfg.extent),
  minZoom: viewZoom.zoomArea[0],
  maxZoom: viewZoom.zoomArea[1],
  zoom: viewZoom.zoom
})
export default {
  name: 'DiyMap',
  components: { MapPanel },
  data () {
    return {
      diyAreaStyle: [ new Style({
        stroke: new Stroke({color: 'blue', width: 3}),
        fill: new Fill({color: 'rgba(0, 0, 255, 0.1)'})}),
        new Style({
          stroke: new Stroke({color: 'red', width: 3}),
          fill: new Fill({color: 'tomato'})
        })],
      areaType: 1,
      currentArea: null,
      areaPoper: null,

      markerSt: false,
      map: null,
      isDraw: false,
      isMark: false,

      draw: null,
      snap: null,

      marker: null,
      markerCoord: [],
      markerPopShow: false,
      areaPopShow: false,
      markerPoper: null
    }
  },
  mounted () {
    this.initMap()
    this.map.removeInteraction(this.draw)
    this.map.addInteraction(modify)

    let popCenter = getCenter(this.markerCoord)
    // [popCenter[0], popCenter[1] - 10]
    // debugger
    this.areaPoper = new Overlay({
      element: this.$refs.areaPop.$el,
      position: popCenter,
      positioning: 'top-center'
    })
    this.markerPoper = new Overlay({
      element: this.$refs.markerPopover.$el,
      position: popCenter,
      positioning: 'top-right'
    })
  },
  watch: {
    areaType (type) {
      if (type === 2) {
        this.currentArea.setStyle(this.diyAreaStyle[1])
      } else {
        this.currentArea.setStyle(this.diyAreaStyle[0])
      }
    },
    isDraw (sta) {
      this.isDraw = sta
      if (!this.isDraw) {
        this.map.removeInteraction(this.draw)
      }
    },
    isMark (sta) {
      this.isMark = sta
      if (!this.isMark) {
        this.map.removeEventListener('click', (evt) => { this.createMarker(evt) })
      }
    }
  },
  methods: {
    initMap () {
      // this.map = Util.olMap('mMap', projection, mapLayers, mapView)
      this.map = new Map({
        projection: projection,
        // controls: controls,
        layers: mapLayers,
        overlays: [],
        target: 'mMap',
        view: mapView
      })
    },
    // 画区域
    handleDraw (areaStatus) {
      // console.log(areaStatus)
      this.isDraw = areaStatus

      // let listener, sketch

      if (this.isDraw) {
        this.isMark = false
        this.draw = new Draw({source: source, type: 'Polygon', style: stylesNormal})

        this.snap = new Snap({ source: source })
        this.map.addInteraction(this.snap)
        this.map.addInteraction(this.draw)

        let that = this

        this.draw.on('drawend', (evt) => { that.handleAreaPoper(evt) })
      } else {
        this.areaPopShow = false
        this.map.removeInteraction(this.draw)
        // this.snap.removeInteraction(this.snap)
      }
    },

    handleAreaPoper (endEvent) {
      let geo = endEvent.feature.getGeometry()
      this.markerCoord = geo.getLastCoordinate()
      this.currentArea = endEvent.feature
      // console.log(this.markerCoord)
      // debugger
      this.areaPoper.setPosition(this.markerCoord)

      this.map.addOverlay(this.areaPoper)
      this.areaPopShow = true
      // this.isDraw = false

      // this.switchAreaType(this.areaType, this.currentArea)
    },

    switchAreaType (val, feature) {
      console.log(val)
      console.log(feature)
      if (val === 2) {
        feature.setStyle(this.diyAreaStyle[1])
      }
    },

    createMarker (evt) {
      this.markerCoord = toLonLat(evt.coordinate)

      let DomIcon = document.createElement('i')
      DomIcon.setAttribute('id', getCenter(this.markerCoord)[0])
      DomIcon.className = 'iconfont icon-icon_area_nor marker-point'

      const pointMarker = new Overlay({
        element: DomIcon,
        position: this.markerCoord
        // position: toLonLat(evt.coordinate),
      })

      this.markerPoper.setPosition([evt.coordinate[0], evt.coordinate[1] + 200])

      this.map.addOverlay(this.markerPoper)
      this.markerPopShow = true

      this.map.addOverlay(pointMarker)
      pointMarker.setPosition(evt.coordinate)
    },
    handleMark (markStatus) {
      this.isMark = markStatus

      if (this.isMark) {
        this.isDraw = false
        this.map.addEventListener('click', (evt) => { this.createMarker(evt) })
      } else {
        this.map.removeEventListener('click', (evt) => { this.createMarker(evt) })
      }
    }
  }
}
</script>



