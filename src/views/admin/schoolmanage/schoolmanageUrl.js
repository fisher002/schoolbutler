import axios from '@/axios/axios'
const baseUrl = '/api'
const url = '/ac'

export default {
    getList(param) {
        return axios({
            url: `${baseUrl}${url}/list`,
            method: 'post',
            data: {...param}
        })
    },
    getDetail(param) {
        return axios({
            url: `${baseUrl}${url}/${param}`,
            method: 'get'
        })
    },
    updateSchool(param) {
        return axios({
            url: `${baseUrl}${url}/add`,
            method: 'post',
            data: param
        })
    },
    deleteSchool(param) {
        return axios({
            url: `${baseUrl}${url}/delete`,
            method: 'delete',
            params: param
        })
    }
}