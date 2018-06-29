import DataShow from './dataShow/index'
import SetPoint from './setPoint/index'
import SetArea from './setArea/index'
import SetPicLayer from './setPicLayer/index'
import MapSet from './mapSet/index'
import MMap from './MMap/index'
import Test from './MMap/test'
export default [
  {
    path: '/ibMap',
    redirect: '/ibMap/dataShow'
  },
  {
    path: '/ibMap/dataShow',
    name: 'DataShow',
    component: DataShow
  },
  {
    path: '/ibMap/setPoint',
    name: 'SetPoint',
    component: SetPoint
  },
  {
    path: '/ibMap/setArea',
    name: 'SetArea',
    component: SetArea
  },
  {
    path: '/ibMap/setPicLayer',
    name: 'SetPicLayer',
    component: SetPicLayer
  },
  {
    path: '/ibMap/mapSet',
    name: 'mapSet',
    component: MapSet
  },
  {
    path: '/ibMap/MMap',
    name: 'MMap',
    component: MMap
  }, {
    path: '/ibMap/test',
    name: 'Test',
    component: Test
  }
]
