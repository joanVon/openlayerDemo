<template>
  <div class="map-operation-panel">
    <el-button class="opt-btn" :type="areaActive ? 'primary': ''" @click="handleAreaBtn">区域绘制</el-button>
    <el-button class="opt-btn" :type="markActive ? 'primary': ''" @click="handleMarkBtn">设备标记</el-button>
  </div>
</template>

<script>
  export default {
    name: 'MapPanel',
    data () {
      return {
        areaActive: false,
        markActive: false
      }
    },
    watch: {
      /* areaActive (areaStat) {
        this.markActive = !areaStat
      },
      markActive (markStat) {
        this.areaActive = !markStat
      } */
    },
    mounted () {
  
    },
    methods: {
      handleAreaBtn () {
        this.areaActive = !this.areaActive
        if (this.areaActive) {
          this.markActive = false
        }
        this.$emit('activeDraw', this.areaActive)
      },
      handleMarkBtn () {
        this.markActive = !this.markActive
        if (this.markActive) {
          this.areaActive = false
        }
        this.$emit('activeMark', this.markActive)
      }
    }
  }
</script>
