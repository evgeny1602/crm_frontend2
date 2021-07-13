import axios from 'axios'
import { apiServer, apiPort } from '../config/api_config'

export const TOKEN = 'crm-token'

const server = process.env.NODE_ENV == 'development' ? 'localhost' : apiServer

axios.defaults.baseURL = `http://${server}:${apiPort}/api`

axios.interceptors.request.use(config => {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
        config.headers.Authorization = `Token ${token}`
    }
    return config
})

export default axios