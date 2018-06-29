<template>
  <div class="m-popup">
    <a class="m-popup-closer" @close="close"></a>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'm-popup',
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style scoped lang="less">
.m-popup {
  position: absolute;
  background-color: white;
  box-sizing: border-box;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -300px;
  min-width: 220px;
}
.m-popup:after,
.m-popup:before {
  top: 100%;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.m-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.m-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.m-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.m-popup-closer:after {
  color: #333;
  content: '✖';
}
</style>
