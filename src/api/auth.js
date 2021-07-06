import axios from './axios'

const register = payload => {
    return axios.post('/users', payload)
}

const login = payload => {
    return axios.post('/users/login', payload)
}

const getCurrentUser = () => {
    return axios.get('/users/current')
}

export default {
    register,
    login,
    getCurrentUser
}