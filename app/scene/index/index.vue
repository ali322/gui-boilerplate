<template>
  <div class="content">
    <h2>gui boilerplate</h2>
    <p>build gui application with electron + vue</p>
    <input type="text" v-model="val"/>
    <button>other window</button>
    <button>close window</button>
  </div>
</template>

<script>
import { ipcRenderer, remote } from "electron"
const win = remote.getCurrentWindow()

export default {
  data() {
    return {
      val: ''
    }
  },
  methods: {
    open() {
      ipcRenderer.send('open-window', 'other', this.val)
    },
    close() {
      win.close()
    }
  }
}
</script>

<style>
</style>
