<template>
  <div class="window updater-window">
    <toolbar></toolbar>
    <div class="updater-info" v-if="updating">
      <updater-progress :percent="updatePercent"></updater-progress>
      <p v-if="updatePercent < 100">正在下载更新...( {{downloadSpeed}}kb/s )</p>
      <p v-else>下载完成应用重启中...</p>
    </div>
    <div class="updater-info" v-else>
      <p>检测到可用版本 v{{updateVersion}} 是否更新?</p>
      <div class="btns">
        <button @click="update" type="primary">确定</button>
        <button @click="close" type="secondary">取消</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ipcRenderer, remote } from 'electron'
import { Component } from 'vue-property-decorator'
import Toolbar from '@/component/toolbar.vue'
import UpdaterProgress from '@/component/progress.vue'

const win: Electron.BrowserWindow = remote.getCurrentWindow()

@Component({
  components: {
    Toolbar,
    UpdaterProgress
  }
})
export default class App extends Vue {
  updateVisible: boolean = false
  updating: boolean = true
  updateVersion: string = ''
  downloadSpeed: number = 0
  updatePercent: number = 30

  mounted() {
    ipcRenderer.on('update-available', (info: any) => {
      this.updateVersion = info.version
      let notify = new Notification('发现新版本', {
        body: `发现新版本 v${info.version}`
      })

      notify.onclick = () => {
        ipcRenderer.send('open-window', 'updater')
      }
    })

    ipcRenderer.on('download-progress', (_: any, ret: any) => {
      let percent = ret.percent || 0
      percent = percent > this.updatePercent ? percent : this.updatePercent
      // console.log('percent', percent)
      this.updatePercent = Math.floor(percent)
      this.downloadSpeed = Math.floor(ret.bytesPerSecond / 1024)
    })

    ipcRenderer.on('update-downloaded', () => {
      this.updating = false
      this.updatePercent = 0
      this.updateVersion = ''
      this.updateVisible = false
    })

    ipcRenderer.on('update-version', (_: any, ver: string) => {
      this.updateVersion = ver
    })
  }
  update() {
    this.updating = true
    ipcRenderer.send('download-update')
  }
  close() {
    win.close()
  }
  minimize() {
    win.minimize()
  }
}
</script>