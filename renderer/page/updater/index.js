import Vue from 'vue'
import App from './app.vue'

const app = new Vue({
  render: h => h(App)
})

if (module.hot) {
  module.hot.accept()
}

app.$mount('#app')
