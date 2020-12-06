import axios from '@/axios/axios'
const baseUrl = '/api'
const url = '/am'

export default {
  checkLogin(params,type) {
    return axios({
      url: type === 'admin' ? `${baseUrl}/adminLogin` : `${baseUrl}/teacherLogin`,
      method: 'post',
      data: params
    })
  }
}
