// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import md5 from 'js-md5'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$md5 = md5

// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆
    if (sessionStorage.getItem('isLogin') && sessionStorage.getItem('token')) { // 查询本地存储信息是否已经登陆
      next();
    } else {
      next({
        path: '/', // 未登录则跳转至登录页面
      });
    }
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
