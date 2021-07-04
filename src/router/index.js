import Vue from 'vue'
import VueRouter from 'vue-router'

import { app_routes, site_title } from '../config/routes'

import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: app_routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path == '/logout') {
//     store.dispatch('logout');
//     next('/login');
//     return;
//   }
//   next();
// });

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if (store.getters.isLoggedIn) {
//       next();
//       return;
//     }
//     next('/login');
//   } else {
//     next();
//   }
// });

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
  // авыаыв
});

export default router
