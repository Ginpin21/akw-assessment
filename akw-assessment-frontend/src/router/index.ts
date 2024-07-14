import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import { useUserStore } from '@/stores/userStore'
import AdminLoginView from '@/views/AdminLoginView.vue'
import AdminView from '@/views/AdminView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLoginView
    },
    {
      path: '/admin/',
      name: 'admin',
      component: AdminView
    }
  ]
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  const isRegistered = to.name === 'login' || to.name === 'signup' || to.name === 'admin-login'
  if (!isRegistered && (!userStore.isLoggedIn || userStore.user.email === '')) {
    return { name: 'login' }
  } else if ((to.name === 'login' || to.name === 'signup') && userStore.isLoggedIn) {
    if (userStore.isAdmin) {
      return { name: 'admin' }
    } else {
      return { name: 'home' }
    }
  }
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  if (userStore.isLoggedIn)
    if (to.name === 'admin' && !userStore.isAdmin) {
      return { name: 'home' }
    }
  if (to.name === 'home' && userStore.isAdmin) {
    return { name: 'admin' }
  }
})
export default router
