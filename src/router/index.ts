import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RoleView from '../views/RoleView.vue'
import UserView from '../views/UserView.vue'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'users'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/roles',
    name: 'roles',
    component: RoleView,
    // beforeEnter: (to, from, next) => {
    //   if(!store.getters['auth/authenticated']) {
    //     return next({
    //       name: 'login'
    //     })
    //   } 
    //   next()
    // }
  },
  {
    path: '/users',
    name: 'users',
    component: UserView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
