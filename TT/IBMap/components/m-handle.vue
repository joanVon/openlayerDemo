<template>
  <div class='handle-box'>
    <div class='operate'>
      <el-button @click="editArea" :type="editAreaActive? 'primary': ''">区域编辑</el-button>
      <el-button @click="bindDevice" :type="bindDeviceActive? 'primary': ''">设备标记</el-button>
    </div>
    <div class="legends">
      <ul>
        <li>
          <i class="icon"></i>
          <span>普通区域</span>
        </li>
        <li>
          <i class="icon"></i>
          <span>危险区域</span>
        </li>
        <li>
          <i class="icon"></i>
          <span>监控点</span>
        </li>
        <li>
          <i class="icon"></i>
          <span>环境量设备</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'm-handle',
  data () {
    return {
      editAreaActive: false,
      bindDeviceActive: false
    }
  },
  methods: {
    editArea () {
      this.editAreaActive = !this.editAreaActive
      if (this.bindDeviceActive && this.editAreaActive) {
        this.bindDevice()
      }
      this.$emit('editArea', this.editAreaActive)
    },
    bindDevice () {
      this.bindDeviceActive = !this.bindDeviceActive
      if (this.editAreaActive && this.bindDeviceActive) {
        this.editArea()
      }
      this.$emit('bindDevice', this.bindDeviceActive)
    }
  }
}
</script>
<style lang="less" scoped>
.operate {
  margin-bottom: 20px;
}
.legends {
  width: 250px;
  box-sizing: border-box;
  margin-left: -25px;
  border-radius: 15px;
  padding: 20px 25px 12px 25px;
  background: rgba(243, 241, 241, 0.67);
  overflow: hidden;
  li {
    float: left;
    width: 100px;
    color: #333;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    margin-bottom: 8px;
    cursor: pointer;
  }
}
</style>
