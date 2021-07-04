import Dashboard from '../views/Dashboard'

const site_title = 'DubaiGold - CRM'

const app_routes = [
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
      meta: {
        title: 'Вход в систему'
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      meta: {
        title: 'Выход из системы'
      }
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        title: 'Панель состояния',
        requiresAuth: true
      }
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue'),
      meta: {
        title: 'Пользователи',
        requiresAuth: true
      }
    },
    {
      path: '/usergroups',
      name: 'Usergroups',
      component: () => import(/* webpackChunkName: "usergroups" */ '../views/Usergroups.vue'),
      meta: {
        title: 'Группы пользователей',
        requiresAuth: true
      }
    },
    {
      path: '/tasktypes',
      name: 'Tasktypes',
      component: () => import(/* webpackChunkName: "tasktypes" */ '../views/Tasktypes.vue'),
      meta: {
        title: 'Типы задач',
        requiresAuth: true
      }
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: () => import(/* webpackChunkName: "tasks" */ '../views/Tasks.vue'),
      meta: {
        title: 'Список задач',
        requiresAuth: true
      }
    },
    {
      path: '/eventtypes',
      name: 'Eventtypes',
      component: () => import(/* webpackChunkName: "eventtypes" */ '../views/Eventtypes.vue'),
      meta: {
        title: 'Типы событий',
        requiresAuth: true
      }
    },
    {
      path: '/events',
      name: 'Events',
      component: () => import(/* webpackChunkName: "events" */ '../views/Events.vue'),
      meta: {
        title: 'Список событий',
        requiresAuth: true
      }
    },
    {
      path: '/dealtypes',
      name: 'Dealtypes',
      component: () => import(/* webpackChunkName: "dealtypes" */ '../views/Dealtypes.vue'),
      meta: {
        title: 'Типы сделок',
        requiresAuth: true
      }
    },
  
    {
      path: '/clients',
      name: 'Clients',
      component: () => import(/* webpackChunkName: "clients" */ '../views/Clients.vue'),
      meta: {
        title: 'Клиенты',
        requiresAuth: true
      }
    },
    {
      path: '/clientgroups',
      name: 'Clientgroups',
      component: () => import(/* webpackChunkName: "clientgroups" */ '../views/Clientgroups.vue'),
      meta: {
        title: 'Группы клиентов',
        requiresAuth: true
      }
    },
    {
      path: '/clientaddresses',
      name: 'Clientaddresses',
      component: () => import(/* webpackChunkName: "clientaddresses" */ '../views/Clientaddresses.vue'),
      meta: {
        title: 'Адреса клиентов',
        requiresAuth: true
      }
    }  
  ]

  export { app_routes, site_title }