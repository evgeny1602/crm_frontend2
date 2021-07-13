import authApi from '@/api/auth'
import { TOKEN } from '@/api/axios'

export const mutationTypes = {
    registerStart: '[auth] registerStart',
    registerSuccess: '[auth] registerSuccess',
    registerFailure: '[auth] registerFailure',

    loginStart: '[auth] loginStart',
    loginSuccess: '[auth] loginSuccess',
    loginFailure: '[auth] loginFailure',

    getCurrentUserStart: '[auth] getCurrentUserStart',
    getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
    getCurrentUserFailure: '[auth] getCurrentUserFailure',

    logOut: '[auth] logOut',
}

export const actionTypes = {
    register: '[auth] register',
    login: '[auth] login',
    getCurrentUser: '[auth] getCurrentUser',
    logOut: '[auth] logOut'
}

const state = {
    isLoading: false,
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null
}

const mutations = {
    [mutationTypes.registerStart](state) {
        state.isSubmitting = true
        state.validationErrors = null
    },
    [mutationTypes.registerSuccess](state, user) {
        state.currentUser = user
        state.isLoggedIn = true
        state.isSubmitting = false
    },
    [mutationTypes.registerFailure](state, errors) {
        state.isSubmitting = false
        state.validationErrors = errors
    },

    [mutationTypes.loginStart](state) {
        state.isSubmitting = true
        state.validationErrors = null
    },
    [mutationTypes.loginSuccess](state, user) {
        state.currentUser = user
        state.isLoggedIn = true
        state.isSubmittingfalse
    },
    [mutationTypes.loginFailure](state, errors) {
        state.isSubmitting = false
        state.validationErrors = errors
    },

    [mutationTypes.getCurrentUserStart](state) {
        state.isLoading = true
    },
    [mutationTypes.getCurrentUserSuccess](state, user) {
        state.isLoading = false
        state.currentUser = user
        state.isLoggedIn = true
    },
    [mutationTypes.getCurrentUserFailure](state) {
        state.isLoading = false
        state.isLoggedIn = false
        state.currentUser = null
    },

    [mutationTypes.logOut](state) {
        state.isLoggedIn = false
        state.currentUser = null
    }
}

const actions = {
    [actionTypes.logOut](context) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.logOut)
            window.localStorage.removeItem(TOKEN)
            resolve()
        })

    },
    [actionTypes.register](context, payload) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.registerStart)
            authApi
                .register(payload)
                .then(response => {
                    context.commit(mutationTypes.registerSuccess, response.data.user)
                    window.localStorage.setItem(TOKEN, response.data.user.token)
                    resolve(response.data.user)
                })
                .catch(result => {
                    context.commit(mutationTypes.registerFailure, result.response.data.errors)
                })
        })


    },
    [actionTypes.login](context, payload) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.loginStart)
            authApi
                .login(payload)
                .then(response => {
                    context.commit(mutationTypes.loginSuccess, response.data.user)
                    window.localStorage.setItem(TOKEN, response.data.user.token)
                    resolve(response.data.user)
                })
                .catch(result => {
                    if (result.response.data.message) {
                        context.commit(mutationTypes.loginFailure, { 'message': [result.response.data.message,] })
                    } else {
                        context.commit(mutationTypes.loginFailure, result.response.data.errors)
                    }
                })
        })
    },
    [actionTypes.getCurrentUser](context) {
        return new Promise((resolve) => {
            context.commit(mutationTypes.getCurrentUserStart)
            authApi
                .getCurrentUser()
                .then(response => {
                    context.commit(mutationTypes.getCurrentUserSuccess, response.data.user)
                    window.localStorage.setItem(TOKEN, response.data.user.token)
                    resolve(response.data.user)
                })
                .catch(result => {
                    if (result.response.data.message) {
                        context.commit(mutationTypes.getCurrentUserFailure, { 'message': [result.response.data.message,] })
                    } else {
                        context.commit(mutationTypes.getCurrentUserFailure, result.response.data.errors)
                    }
                })
        })
    },
}

export default {
    state,
    mutations,
    actions
}