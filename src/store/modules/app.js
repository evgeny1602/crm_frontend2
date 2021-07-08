export const mutationTypes = {
    showAddEditForm: '[app] showAddEditForm',
    hideAddEditForm: '[app] hideAddEditForm',
    setItemSingle: '[app] setItemSingle',
    setItemsMany: '[app] setItemsMany',
    setOrderFields: '[app] setOrderFields',
    setFilterFields: '[app] setFilterFields',
    setHeaders: '[app] setHeaders',
    setItemTitle: '[app] setItemTitle',
    setItemTitle2: '[app] setItemTitle2',
    setCurrentItem: '[app] setCurrentItem',
    clearCurrentItem: '[app] clearCurrentItem',
    showDeleteForm: '[app] showDeleteForm',
    hideDeleteForm: '[app] hideDeleteForm',
}

export const actionTypes = {
    showAddEditForm: '[app] showAddEditForm',
    hideAddEditForm: '[app] hideAddEditForm',
    setItemSingle: '[app] setItemSingle',
    setItemsMany: '[app] setItemsMany',
    setOrderFields: '[app] setOrderFields',
    setFilterFields: '[app] setFilterFields',
    setHeaders: '[app] setHeaders',
    setItemTitle: '[app] setItemTitle',
    setItemTitle2: '[app] setItemTitle2',
    setCurrentItem: '[app] setCurrentItem',
    clearCurrentItem: '[app] clearCurrentItem',
    showDeleteForm: '[app] showDeleteForm',
    hideDeleteForm: '[app] hideDeleteForm',
}

const state = {
    isDeleteFormVisible: false,
    isAddEditFormVisible: false,
    itemSingle: '',
    itemsMany: '',
    orderFields: [],
    filterFields: [],
    headers: [],
    itemTitle: '',
    itemTitle2: '',
    currentItem: null
}

const mutations = {



    [mutationTypes.clearCurrentItem](state) {
        state.currentItem = {}
        for (const header of state.headers) {
            state.currentItem[header.value] = null
        }
    },

    [mutationTypes.setCurrentItem](state, value) {
        state.currentItem = value
    },

    [mutationTypes.setItemTitle](state, value) {
        state.itemTitle = value
    },
    [mutationTypes.setItemTitle2](state, value) {
        state.itemTitle2 = value
    },

    [mutationTypes.setItemSingle](state, value) {
        state.itemSingle = value
    },
    [mutationTypes.setItemsMany](state, value) {
        state.itemsMany = value
    },
    [mutationTypes.setOrderFields](state, value) {
        state.orderFields = value
    },
    [mutationTypes.setFilterFields](state, value) {
        state.filterFields = value
    },
    [mutationTypes.setHeaders](state, value) {
        state.headers = value
    },
    [mutationTypes.showAddEditForm](state) {
        state.isAddEditFormVisible = true
    },
    [mutationTypes.hideAddEditForm](state) {
        state.isAddEditFormVisible = false
    },

    [mutationTypes.showDeleteForm](state) {
        state.isDeleteFormVisible = true
    },
    [mutationTypes.hideDeleteForm](state) {
        state.isDeleteFormVisible = false
    }
}

const actions = {
    [actionTypes.clearCurrentItem](context) {
        context.commit(mutationTypes.clearCurrentItem)
    },
    [actionTypes.setCurrentItem](context, value) {
        context.commit(mutationTypes.setCurrentItem, value)
    },
    [actionTypes.setItemTitle](context, value) {
        context.commit(mutationTypes.setItemTitle, value)
    },
    [actionTypes.setItemTitle2](context, value) {
        context.commit(mutationTypes.setItemTitle2, value)
    },

    [actionTypes.setItemSingle](context, value) {
        context.commit(mutationTypes.setItemSingle, value)
    },
    [actionTypes.setItemsMany](context, value) {
        context.commit(mutationTypes.setItemsMany, value)
    },
    [actionTypes.setOrderFields](context, value) {
        context.commit(mutationTypes.setOrderFields, value)
    },
    [actionTypes.setFilterFields](context, value) {
        context.commit(mutationTypes.setFilterFields, value)
    },
    [actionTypes.setHeaders](context, value) {
        context.commit(mutationTypes.setHeaders, value)
    },
    [actionTypes.showAddEditForm](context) {
        context.commit(mutationTypes.showAddEditForm)
    },
    [actionTypes.hideAddEditForm](context) {
        context.commit(mutationTypes.hideAddEditForm)
    },
    [actionTypes.showDeleteForm](context) {
        context.commit(mutationTypes.showDeleteForm)
    },
    [actionTypes.hideDeleteForm](context) {
        context.commit(mutationTypes.hideDeleteForm)
    },
}

export default {
    state,
    mutations,
    actions
}