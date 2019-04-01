<template>
  <div :class="{'layout-with-border': !isMac}" class="layout">
    <toolbar></toolbar>
    <div class="layout-sidebar">
      <div class="layout-menu">
        <router-link :class="{active: actived === 'home'}" :to="{path: '/'}" exact>
          <i class="fas fa-home"></i>
          <span class="menu-tip">Dashboard</span>
        </router-link>
        <router-link :class="{active: actived === 'about'}" :to="{path: '/about'}">
          <i class="fas fa-rocket"></i>
          <span class="menu-tip">About</span>
        </router-link>
      </div>
    </div>
    <div class="layout-content">
      <div class="layout-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Toolbar from '@/component/toolbar.vue'

@Component({
  components: {
    Toolbar
  }
})
export default class App extends Vue {
  isMac: boolean = process.platform === 'darwin'
  get actived() {
    return this.$route.matched[1].name
  }
}
</script>

<style lang="less" scoped>
.layout{
  height: 100%;
  position: relative;
  display: flex;
  &.layout-with-border {
    border: 2px solid #bababa;
  }
  .layout-sidebar{
    width: 70px;
    padding-top: 25px;
    background: #262940;
    .layout-menu {
      display: flex;
      flex-direction: column;
      & > a {
        display: block;
        padding: 10px 0;
        text-align: center;
        cursor: pointer;
        text-decoration: none;
        color: rgba(255, 255, 255, 0.5);
        &.active {
          color: #fff;
        }
        .menu-tip {
          display: block;
          font-size: 12px;
          padding-top: 4px;
        }
      }
    }
  }
  .layout-content {
    flex: 1;
    padding-top: 25px;
    background: #fff;
    .layout-main {
      height: 100%;
      overflow: hidden;
      overflow-y: auto;
    }
  }
}
</style>

