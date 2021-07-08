import axios from './axios'

const create = (url, params) => {
    return axios.post(url, params)
}

const readAll = (url, params) => {
    const paramsStr = Object.keys(params).map((k) => `${k}=${params[k]}`).join('&')
    return axios.get(`${url}?${paramsStr}`)
}

const update = (url, params) => {
    return axios.patch(url, params)
}

const deleteOne = (url) => {
    return axios.delete(url)
}

export default { create, readAll, update, deleteOne }