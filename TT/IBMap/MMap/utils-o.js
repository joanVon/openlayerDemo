import ol from 'openlayers'
import 'openlayers/dist/ol.css'

const getProjection = (code) => {
  let projCode = ol.proj.get(code)
  return projCode
}

const vectSource = (FprojCode, originGeoJSON) => {
  let srcFeatures = null
  if (typeof originGeoJSON.features !== 'undefined' && originGeoJSON.features.length) {
    srcFeatures = (new ol.format.GeoJSON({ featureProjection: FprojCode })).readFeatures(originGeoJSON)
  }
  return new ol.source.Vector({
    wrapX: false,
    features: srcFeatures
    // features: new ol.format.GeoJSON(),
  })
}

// const vector = () => {
//   new ol.layer.Vector({
//     source: vectSource()
//   })
// }

const olView = (proj, zoom, zoomArea, center) => {
  return new ol.View({
    projection: proj,
    center: center,
    minZoom: zoomArea[0],
    maxZoom: zoomArea[1],
    zoom: zoom
  })
}

const olControl = () => {
  return ol.control.defaults().extend([
    new ol.control.FullScreen()
  ])
}

const olLayers = (imageCfg, vector) => {
  // imageCfg.model, imageCfg.src, imageCfg.mapExtent
  let layers = [
    new ol.layer.Tile({
      preload: Infinity,
      source: new ol.source.OSM()
    }),
    vector
  ]

  if (imageCfg.model) {
    let staticCfg = new ol.layer.Image({
      source: new ol.source.ImageStatic({
        url: imageCfg.src,
        imageExtent: imageCfg.imageExtent
        // imageSize: [620, 400]
      })
    })
    layers.push(staticCfg)
  }

  return layers
}

/* const olMap = (target, isStaticImg, imgUrl, extent, projCode) => {
  // console.log(olLayers)
  // let projCode = getProjection()
  return new ol.Map({
    controls: olControl(),
    layers: olLayers(isStaticImg, imgUrl, extent),
    target: target,
    view: olView(projCode, 16, [8, 20], [120.22016, 30.21267])
  })
} */

const olMap = (target, controls, layers, view) => {
  // console.log(olLayers)
  // let projCode = getProjection()
  return new ol.Map({
    controls: controls,
    layers: layers,
    target: target,
    view: view
  })
}

/* export {
  getProjection,
  olView,
  olControl,
  olLayers
} */

export default {
  getProjection,
  vectSource,

  olView,
  olControl,
  olLayers,
  olMap
}
