import crudApi from '@/api/crud'

export const mutationTypes = {
    readAllStart: '[crud] readAllStart',
    readAllSuccess: '[crud] readAllSuccess',
    readAllFailure: '[crud] readAllFailure',
    createStart: '[crud] createStart',
    createSuccess: '[crud] createSuccess',
    createFailure: '[crud] createFailure',
    deleteOneStart: '[crud] deleteOneStart',
    deleteOneSuccess: '[crud] deleteOneSuccess',
    deleteOneFailure: '[crud] deleteOneFailure',
    updateStart: '[crud] updateStart',
    updateSuccess: '[crud] updateSuccess',
    updateFailure: '[crud] updateFailure',
}

export const actionTypes = {
    create: '[crud] create',
    readAll: '[crud] readAll',
    deleteOne: '[crud] deleteOne',
    update: '[crud] update',
}

const state = {
    isLoading: false,
    data: null,
    error: null
}

const mutations = {
    [mutationTypes.deleteOneStart](state) {
        state.isLoading = true
        state.error = null
        state.data = null
    },
    [mutationTypes.deleteOneSuccess](state) {
        state.isLoading = false
    },
    [mutationTypes.deleteOneFailure](state) {
        state.isLoading = false
    },

    [mutationTypes.createStart](state) {
        state.isLoading = true
        state.error = null
        state.data = null
    },
    [mutationTypes.createSuccess](state, data) {
        state.isLoading = false
        state.data = data
    },
    [mutationTypes.createFailure](state) {
        state.isLoading = false
    },

    [mutationTypes.updateStart](state) {
        state.isLoading = true
        state.error = null
        state.data = null
    },
    [mutationTypes.updateSuccess](state, data) {
        state.isLoading = false
        state.data = data
    },
    [mutationTypes.updateFailure](state) {
        state.isLoading = false
    },

    [mutationTypes.readAllStart](state) {
        state.isLoading = true
        state.data = null
        state.error = null
    },
    [mutationTypes.readAllSuccess](state, data) {
        state.isLoading = false
        state.data = data
    },
    [mutationTypes.readAllFailure](state) {
        state.isLoading = false
    }
}

const actions = {
    [actionTypes.update](context, { apiUrl, params }) {
        return new Promise(resolve => {
            context.commit(mutationTypes.updateStart)
            crudApi.update(apiUrl, params)
                .then(response => {
                    context.commit(mutationTypes.updateSuccess)
                    resolve(response.data)
                })
                .catch(() => {
                    context.commit(mutationTypes.updateFailure)
                })
        })
    },

    [actionTypes.deleteOne](context, apiUrl) {
        return new Promise(resolve => {
            context.commit(mutationTypes.deleteOneStart)
            crudApi.deleteOne(apiUrl)
                .then(response => {
                    context.commit(mutationTypes.deleteOneSuccess)
                    resolve(response.data)
                })
                .catch(() => {
                    context.commit(mutationTypes.deleteOneFailure)
                })
        })
    },

    [actionTypes.create](context, { apiUrl, params }) {
        return new Promise(resolve => {
            context.commit(mutationTypes.createStart)
            crudApi.create(apiUrl, params)
                .then(response => {
                    context.commit(mutationTypes.createSuccess)
                    resolve(response.data)
                })
                .catch(() => {
                    context.commit(mutationTypes.createFailure)
                })
        })
    },

    [actionTypes.readAll](context, { apiUrl, params }) {
        return new Promise(resolve => {
            context.commit(mutationTypes.readAllStart)
            crudApi.readAll(apiUrl, params)
                .then(response => {
                    context.commit(mutationTypes.readAllSuccess, response.data)
                    resolve(response.data)
                })
                .catch(() => {
                    context.commit(mutationTypes.readAllFailure)
                })
        })
    }
}

export default { state, actions, mutations }