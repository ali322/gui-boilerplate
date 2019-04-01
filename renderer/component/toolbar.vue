<template>
  <div class="toolbar-overlay">
    <div class="toolbar">
      <div class="toolbar-dragger">
        <slot></slot>
      </div>
      <button @click="minimize" class="toolbar-item">
        <i class="fas fa-minus"></i>
      </button>
      <button @click="close" class="toolbar-item">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { remote } from 'electron'
import { Component } from 'vue-property-decorator'

let win: Electron.BrowserWindow = remote.getCurrentWindow()

@Component
export default class Toolbar extends Vue {
  close() {
    win.close()
  }
  minimize() {
    win.minimize()
  }
}
</script>

<style lang="less" scoped>
.toolbar-overlay {
  position: absolute;
  -webkit-user-select: none;
  top: 0;
  left: 0;
  right: 0;
  height: 25px;
  z-index: 999;
}
.toolbar {
  display: flex;
  -webkit-user-select: none;
  .toolbar-dragger {
    flex: 1;
    -webkit-app-region: drag;
  }
  .toolbar-item {
    background: transparent;
    width: 25px;
    line-height: 25px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
    -webkit-appearance: none;
    border: 0 none;
    padding: 0;
    i{
      font-size: 12px;
    }
  }
}
</style>
