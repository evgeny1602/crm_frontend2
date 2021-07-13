import axios from './axios'


const filterParams = params => {
    let resultParams = {}
    for (const k of Object.keys(params)) {
        if (params[k] === '') {
            continue
        }
        resultParams[k] = params[k]
    }
    return resultParams
}


const create = (url, params) => {
    return axios.post(url, filterParams(params))
}

const readAll = (url, params) => {
    // console.log(url, params)
    const paramsStr = Object.keys(params).map((k) => `${k}=${params[k]}`).join('&')
    return axios.get(`${url}?${paramsStr}`)
}

const update = (url, params) => {
    // console.log(params)
    return axios.patch(url, filterParams(params))
}

const deleteOne = (url) => {
    return axios.delete(url)
}

export default { create, readAll, update, deleteOne }