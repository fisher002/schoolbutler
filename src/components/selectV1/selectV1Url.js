import axios from '@/axios/axios'
const baseUrl = '/api'

export default {
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
