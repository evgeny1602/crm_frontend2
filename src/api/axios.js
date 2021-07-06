import axios from 'axios'

export const TOKEN = 'crm-token'

axios.defaults.baseURL = 'http://localhost:3000/api'

axios.interceptors.request.use(config => {
    const token = window.localStorage.getItem(TOKEN)
    if (token) {
        config.headers.Authorization = `Token ${token}`
    }
    return config
})

export default axios