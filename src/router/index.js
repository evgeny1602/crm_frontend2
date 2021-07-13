import Vue from 'vue'
import VueRouter from 'vue-router'

import { app_routes, site_title } from '../config/routes'

import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: app_routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.auth.isLoggedIn) {
      next();
      return;
    }
    next({ name: 'Login' });
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  document.title = site_title + ' | ' + to.meta.title;
  next();
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    Nprogress.start();
  }
  next();
});

router.afterEach(() => {
  Nprogress.done();
});

export default router
