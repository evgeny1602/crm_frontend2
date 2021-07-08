import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth'
import crud from '@/store/modules/crud'
import app from '@/store/modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { auth, crud, app }
})
