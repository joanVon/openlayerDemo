import Map from 'ol/Map'

const olMap = (target, projection, layers, view) => {
  return new Map({
    projection: projection,
    // controls: controls,
    layers: layers,
    target: target,
    view: view
  })
}

export default {
  olMap
}
