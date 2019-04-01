import Vue from 'vue'
import router from './router'
import store from './store'

const app = new Vue({
  store,
  router,
  render: h => h({
    template: '<router-view></router-view>'
  })
})

if (module.hot) {
  module.hot.accept()
}

app.$mount('#app')
