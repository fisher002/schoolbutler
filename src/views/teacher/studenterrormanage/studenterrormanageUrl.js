import axios from '@/axios/axios'
const baseUrl = '/api'
const url = '/tc/studenterror'

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
  },
  update(param, type) {
    return axios({
      url: type === 'add' ? `${baseUrl}${url}/listadd` : `${baseUrl}${url}/edit`,
      method: 'post',
      data: param
    })
  },
  getClassList(param) {
    return axios({
      url: `${baseUrl}/tc/studentclass/list`,
      method: 'post',
      data: param
    })
  },
}
