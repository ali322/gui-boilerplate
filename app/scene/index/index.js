import Vue from 'vue'
import App from './index.vue'
import './index.less'

const app = new Vue({
  render: h => h(App)
})

app.$mount('#app')