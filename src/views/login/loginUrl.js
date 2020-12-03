import axios from 'axios'
const baseUrl = '/api'
const url = '/am'

export default {
  checkLogin(params) {
    return axios({
      url: `${baseUrl}${url}/login`,
      method: 'post',
      params: params
    })
  }
}
