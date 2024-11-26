import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/auth/AuthView.vue'
import checkIfUserIsAuthenticated from '@/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
    },
    {
      path: '/users',
      name: 'users',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/UsersView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/rooms',
      name: 'rooms',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/RoomsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/reservations',
      name: 'reservations',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/ReservationsView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

const isAuthenticated = checkIfUserIsAuthenticated()

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'auth' })
  } else if (to.name === 'auth' && isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
