import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由懒加载lazyload路由->使用时才加载
export default new Router({
  routes: [
    { path: '/',
      component: () => import('@/views/tabbar-layout'),
      children: [{
        path: '/',
        name: 'home',
        component: () => import('@/views/home')

      }] },
    { path: '/login',
      name: 'login',
      component: () => import('@/views/login') }
  ]
})
