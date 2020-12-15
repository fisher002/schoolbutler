import axios from '@/axios/axios'
const baseUrl = '/api'
const url = '/ac/studentclass'

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
  getSchoolList(param) {
    return axios({
      url: `${baseUrl}/ac/school/list`,
      method: 'post',
      data: {}
    })
  },
  getCollegeList(param) {
    return axios({
      url: `${baseUrl}/ac/college/list`,
      method: 'post',
      data: param
    })
  },
  getSpecialityList(param) {
    return axios({
      url: `${baseUrl}/ac/speciality/list`,
      method: 'post',
      data: param
    })
  }
}
