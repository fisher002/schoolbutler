import axios from '@/axios/axios'
const baseUrl = '/api'
const url = '/ac/speciality'

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
  getDetail(param) {
    return axios({
      url: `${baseUrl}${url}/${param}`,
      method: 'get'
    })
  },
  update(param, type) {
    return axios({
      url: type === 'add' ? `${baseUrl}${url}/add` : `${baseUrl}${url}/edit`,
      method: 'post',
      data: param
    })
  },
  delete(param) {
    return axios({
      url: `${baseUrl}${url}/delete`,
      method: 'delete',
      params: param
    })
  },
  getCollegeList() {
    return axios({
      url: `${baseUrl}/ac/college/list`,
      method: 'post',
      data: {}
    })
  }
}
