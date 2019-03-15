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
          url: '/base/breadcrumbs',
          icon: 'icon-people',
        },
        {
          name: 'Novo Administrador',
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
          url: '/base/breadcrumbs',
          icon: 'icon-people',
        },
        {
          name: 'Novo Cliente',
          url: '/base/cards',
          icon: 'icon-user-follow',
        },
      ]
    },
  ],
};
