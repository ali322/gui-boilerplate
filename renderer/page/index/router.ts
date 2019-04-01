import Vue from 'vue'
import VueRouter from 'vue-router'
import { Component } from 'vue-property-decorator'
import routes from './routes'

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'hash'
})

export default router
