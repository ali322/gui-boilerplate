<template>
  <div class="content">
    <div class="title">
      <h2>other window</h2>
    </div>
    <div class="body">
      <div class="buttons">
        <button @click="close">close window</button>
      </div>
    </div>
  </div>
</template>

<script>
import { remote } from 'electron'
const win = remote.getCurrentWindow()

export default {
  methods: {
    close() {
      win.close()
    }
  }
}
</script>
