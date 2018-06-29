<template>
  <el-popover ref="markerPopover" placement="top" width="160" :visible-arrow="true" v-model="markerVisible">
      <slot></slot>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="markerVisible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="markerVisible = false">确定</el-button>
      </div>
    </el-popover>
</template>

<script>
  export default {
    name: 'MarkerPop',
    props: {
      visible: {type: Boolean, default: false}
    },
    data () {
      return {
        markerVisible: this.visible
      }
    },
    watch: {
      markerVisible (n, o) {
        this.$emit('update:visible', n)
      },
      visible (newVisible) {
        this.markerVisible = newVisible
      }
    }
  }
</script>
