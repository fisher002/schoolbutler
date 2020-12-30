import axios from '@/axios/axios'
const baseUrl = '/api'
const url = '/tc/arrange'

export default {
  getList(param) {
    return axios({
      url: `${baseUrl}${url}/list`,
      method: 'post',
      data: {
        ...param
      }
    })
  },
  getPageList(param) {
    return axios({
      url: `${baseUrl}${url}/page`,
      method: 'get',
      params: param
    })
  },
  getDetail(param) {
    return axios({
      url: `${baseUrl}${url}/${param}`,
      method: 'get'
    })
  },
  update(param) {
    return axios({
      url: `${baseUrl}${url}/edit`,
      method: 'post',
      data: param
    })
  },
}
