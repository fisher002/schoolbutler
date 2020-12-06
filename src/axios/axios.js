import axios from 'axios'
import util from '../util/util'
// 引入element-ui的弹出信息
import {
  Message
} from 'element-ui'
import router from '../router';

const httpCode = { //一些常见的http状态码信息，可以自己去调整配置
  400: '(400)请求参数错误',
  401: '(401)权限不足, 请重新登录',
  403: '(403)服务器拒绝本次访问',
  404: '(404)请求资源未找到',
  500: '(500)内部服务器错误',
  501: '(501)服务器不支持该请求中使用的方法',
  502: '(502)网关错误',
  504: '(504)网关超时'
}
/**白名单接口，不需要携带token */
const whileApi = ['/api/am/adminLogin']

// 超时时间 60s
axios.defaults.timeout = 60000;
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

/** 添加请求拦截器 **/
axios.interceptors.request.use(config => {
  /**
   * 在这里：可以根据业务需求可以在发送请求之前做些什么。
   * 例：config.headers['token'] = sessionStorage.getItem('token') || ''
   */
  // 有些接口不需要token访问，可剔除
  config.headers['token'] = whileApi.find(item => item === config.url) ? null : util.getToken();
  return config;
}, error => {
  return Promise.reject(error);
});

/**
 * 返回拦截，可以重新渲染数据
 */
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response) {
    /**
     * 在这里：可以根据业务需求可以在请求失败后做什么。
     * 根据请求失败的http状态码去给用户相应的提示
     * token失效处理
     */
    let tips = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.message;
    Message({
      message: tips,
      type: 'error'
    })
    // token失效处理，强制用户返回登录页面 根据状态码判断
    let flag;
    if (error.response.status == 202) {
      Message({
        message: '登录已失效，即将返回登录页面',
        type: 'error',
        duration: 1000
      })
      setTimeout(() => {
        //回退至登录页面
        router.replace('/');
        sessionStorage.clear();
      }, 2000)
    }
    return Promise.reject(error);
  } else {
    Message({
      message: '请求失败',
      type: 'error'
    })
    return Promise.reject(new Error('请求失败'));
  }
})

export default axios
