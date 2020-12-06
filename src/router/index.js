import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/comLogin'
import index from '@/views/index/index'
// 管理员端
import adminrouter from './adminrouter'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      component: index,
      redirect: '/default/defaultindex',
      meta: {
        requireAuth: true // 配置此条，进入页面前判断是否需要登陆
      },
      children: [
        ...adminrouter
      ]
    }
  ]
})
