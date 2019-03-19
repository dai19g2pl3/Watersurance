export default {
  items: [
    {
      title: true,
      name: 'Utilizadores',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Administrador',
      url: '/base',
      icon: 'icon-user',
      children: [
        {
          name: 'Gerir Administradores',
          url: '/base/tables',
          icon: 'icon-people',
        },
        {
          name: 'Registar Administrador',
          url: '/base/cards',
          icon: 'icon-user-follow',
        },
      ]
    },
    {
      name: 'Cliente',
      url: '/base',
      icon: 'icon-user',
      children: [
        {
          name: 'Gerir Clientes',
          url: '/base/tables',
          icon: 'icon-people',
        },
        {
          name: 'Registar Cliente',
          url: '/base/cards',
          icon: 'icon-user-follow',
        },
      ]
    },
    {
      title: true,
      name: 'Coisas',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Ocorrência',
      url: '/base',
      icon: 'icon-folder',
      children: [
        {
          name: 'Gerir Ocorrências',
          url: '/base/tables',
          icon: 'icon-folder',
        },
        {
          name: 'Registar Ocorrência',
          url: '/base/cards',
          icon: 'icon-folder-alt',
        },
      ]
    },
  ],
};
