<template>
  <div id='map' class="map"></div>
</template>
<script>
import ol from 'ol'
export default {
  name: 'DataShow',
  data () {
    return {map: ''}
  },
  mounted () {
    var extent = [120.227471, 30.215046, 120.231756, 30.217909]
    var projection = new ol.proj.Projection({
      code: 'EPSG:4326',
      extent: extent
    })

    this.map = new ol.Map({
      layers: [
        new ol.layer.Image({
          source: new ol.source.ImageStatic({
            url: '/static/map/building-site.jpg',
            projection: projection,
            imageExtent: extent
          })
        })
      ],
      target: 'map',
      view: new ol.View({
        projection: projection,
        center: ol.extent.getCenter(extent),
        zoom: 3
      })
    })
  }
}
</script>
