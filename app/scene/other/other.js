import Vue from 'vue'
import App from './other.vue'
import './other.less'

const app = new Vue({
  render: h => h(App)
})

app.$mount('#app')