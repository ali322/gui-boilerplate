import App from './app.vue'
import Home from './home.vue'
import About from './about.vue'

const routes = [
  {
    name: 'index',
    path: '/',
    component: App,
    children: [
      {
        name: 'home',
        path: '',
        component: Home
      },
      {
        name: 'about',
        path: 'about',
        component: About
      }
    ]
  }
]

export default routes
