import { CancelToken } from '@/utils'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@c/Layout/index.vue'),
    children: [
      {
        redirect: '/',
        path: '/home',
        name: 'home',
        component: () => import('@v/home.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@v/user/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@v/user/register.vue')
  },
  { path: '/404', name: '404', component: () => import('@v/404.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const whitePaths = ['/login', '/register']

router.beforeEach((to, from, next) => {
  CancelToken.clearPending() // 路由跳转清空发出的请求
  if (`getToken()`) {
    if (whitePaths.includes(to.fullPath)) {
      next({ path: '/' })
    } else {
      if (!to.matched.length) {
        next({ path: '/404' })
      }
      next()
    }
  } else {
    if (whitePaths.includes(to.fullPath)) {
      next() // 无token，白名单内可跳转
    } else {
      next({ path: '/login' })
    }
  }
})

export default router
