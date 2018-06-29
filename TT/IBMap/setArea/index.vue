<template>
  <div class="map-box">
    <div id='map' class="map"></div>
    <div class='handle-box'>
      <el-select v-model="handleType" placeholder="请选择" @change="handleChange">
        <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import ol from 'ol'
export default {
  name: 'DataShow',
  data () {
    return {
      map: {},
      draw: '',
      snap: '',
      source: '',
      handleType: 'Polygon',
      typeOptions: ['Polygon', 'Circle']
    }
  },
  mounted () {
    let extent = [120.227471, 30.215046, 120.231756, 30.217909]
    let projection = new ol.proj.Projection({
      code: 'EPSG:4326',
      extent: extent
    })
    let imageLayer = new ol.layer.Image({
      source: new ol.source.ImageStatic({
        url: '/static/map/building-site.jpg',
        projection: projection,
        imageExtent: extent
      })
    })
    this.source = new ol.source.Vector()
    let vector = new ol.layer.Vector({
      source: this.source,
      style: new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
          color: '#ffcc33',
          width: 2
        }),
        image: new ol.style.Circle({
          radius: 7,
          fill: new ol.style.Fill({
            color: '#ffcc33'
          })
        })
      })
    })
    let map = this.map = new ol.Map({
      layers: [
        imageLayer, vector, this.getIconLayer()
      ],
      target: 'map',
      view: new ol.View({
        projection: projection,
        center: ol.extent.getCenter(extent),
        zoom: 3
      })
    })
    let modify = new ol.interaction.Modify({ source: this.source })
    map.addInteraction(modify)
    this.handleChange()
  },
  methods: {
    addInteractions () {
      let map = this.map
      this.draw = new ol.interaction.Draw({
        source: this.source,
        type: this.handleType
      })
      map.addInteraction(this.draw)
      this.snap = new ol.interaction.Snap({ source: this.source })
      map.addInteraction(this.snap)
    },
    handleChange () {
      let map = this.map
      map.removeInteraction(this.draw)
      map.removeInteraction(this.snap)
      this.addInteractions()
    },
    getIconLayer () {
      var iconFeature = this.iconFeature = new ol.Feature({
        geometry: new ol.geom.Point([120.229888, 30.216555]),
        name: 'Null Island',
        population: 4000,
        rainfall: 500,
        type: 'icon'
      })

      var iconStyle = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
          anchor: [0.5, 1],
          src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
        }))
      })
      var vectorSource = new ol.source.Vector({
        features: [iconFeature]
      })
      var vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: iconStyle
      })
      return vectorLayer
    }
  }
}
</script>
<style lang='less' scoped>
.handle-box {
  position: absolute;
}
</style>
