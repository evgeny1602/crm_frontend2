const main_menu_items = [
    {
      text: "Панель состояния",
      icon: "mdi-apps",
      to: "/"
    },
    {
      text: "Пользователи",
      icon: "mdi-account-multiple",
      subLinks: [
        {
          'text': "Пользователи",
          'to': "/users"
        },
        {
          'text': 'Группы пользователей',
          'to': '/usergroups'
        }
      ]
    },
    {
      text: "Задачи",
      icon: "mdi-format-list-checks",
      subLinks: [
        {
          'text': "Типы задач",
          'to': "/tasktypes"
        },
        {
          'text': 'Список задач',
          'to': '/tasks'
        }
      ]
    },
    {
      text: "События",
      icon: "mdi-calendar",
      subLinks: [
        {
          'text': "Типы событий",
          'to': "/eventtypes"
        },
        {
          'text': 'Список событий',
          'to': '/events'
        }
      ]
    },
    {
      text: "Сделки",
      icon: "mdi-handshake-outline",
      subLinks: [
        {
          'text': "Типы сделок",
          'to': "/dealtypes"
        },
        {
          'text': 'Список сделок',
          'to': '/deals'
        }
      ]
    },
    {
      text: "Клиенты",
      icon: "mdi-human-greeting",
      subLinks: [
        {
          'text': "Клиенты",
          'to': "/clients"
        },
        {
          'text': 'Группы клиентов',
          'to': '/clientgroups'
        },
        {
          'text': 'Адреса клиентов',
          'to': '/clientaddresses'
        }
      ]
    },
    {
      text: "Выход",
      icon: "mdi-logout",
      to: '/logout'
    }
  ]

  export default main_menu_items