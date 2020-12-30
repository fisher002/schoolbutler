import axios from '@/axios/axios'
const baseUrl = '/api'
const url = '/tc/studentclass'

export default {
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
  },
  getTeacherList(param) {
    return axios({
      url: `${baseUrl}/ac/teacher/list`,
      method: 'post',
      data: param
    })
  },
}
