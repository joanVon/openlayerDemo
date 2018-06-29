import ol from 'ol'

class map {
  /**
   *Creates an instance of map.
   * @param {string} [mapInfo={ id: 'gd100001', name: '海康威视三期', img: '/static/map/building-site.jpg', extend: [120.227471, 30.215046, 120.231756, 30.217909], zoom: 3 }]
   * @memberof map
   */
  constructor (mapInfo = { id: 'gd100001', name: '海康威视三期', img: '/static/map/building-site.jpg', extend: [120.227471, 30.215046, 120.231756, 30.217909], zoom: 3 }) {
    this.projection = new ol.proj.Projection({
      code: 'EPSG:4326',
      extent: mapInfo.extent
    })
    this.map = new ol.Map({
      layers: [
        new ol.layer.Image({
          source: new ol.source.ImageStatic({
            url: mapInfo.img,
            projection: this.projection,
            imageExtent: mapInfo.extent
          })
        })
      ],
      target: 'map',
      view: new ol.View({
        projection: this.projection,
        center: ol.extent.getCenter(mapInfo.extent),
        zoom: mapInfo.zoom
      })
    })
  }
  addMarker () {

  }
}

export default map
