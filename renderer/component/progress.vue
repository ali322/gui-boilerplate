<template>
<div class="progress-wrapper">
  <div class="progress">
    <div :style="{width: `${percent}%`}" class="progress-bar"></div>
  </div>
  <div class="progress-text">{{percent}}%</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class UpdaterProgress extends Vue {
  @Prop({ default: 0 }) percent!: number
}
</script>

<style lang="less" scoped>
.progress-wrapper{
  display: flex;
  align-items: center;
}
.progress{
  overflow: hidden;
  position: relative;
  line-height: 10px;
  background-color: #F6F9F6;
  border-radius: 10px;
  flex: auto;
  .progress-bar{
    height: 10px;
    line-height: 10px;
    position: relative;
    border-radius: 10px;
    background-color: #2d98ff;
  }
}
.progress-text{
  height: 20px;
  line-height: 20px;
  font-size: 12px;
}
</style>
