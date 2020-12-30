import axios from '@/axios/axios'
const baseUrl = '/api'
const url = '/tc/student'

export default {
  getPageList(param) {
    return axios({
      url: `${baseUrl}${url}/page`,
      method: 'get',
      params: param
    })
  },
  getList(param) {
    return axios({
      url: `${baseUrl}${url}/list`,
      method: 'post',
      data: {
        ...param
      }
    })
  },
  getDetail(param) {
    return axios({
      url: `${baseUrl}${url}/${param}`,
      method: 'get'
    })
  }
}
