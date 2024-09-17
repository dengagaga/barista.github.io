import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QrView from '../views/QrView.vue'
import FinanceView from '../views/FinanceView.vue'
import TablView from '../views/TablView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/finance',
      name: 'FinanceView',
      component: FinanceView
    },
    {
      path: '/qr',
      name: 'QR',
      component: QrView
    },
    {
      path: '/Tabl',
      name: 'Tabl',
      component: TablView
    },
    {
      path: '/main',
      name: 'main',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MainView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (!token && to.path !== '/' && to.path !== '/') {
    next('/')
  } else {
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next()
  }
})

export default router
