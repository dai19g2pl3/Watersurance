export default {
  items: [
    {
      title: true,
      name: "Utilizadores"
    },
    {
      name: "Seguradoras",
      url: "/base/tables",
      icon: "icon-user",
      children: [
        {
          name: "Listar",
          url: "/base/tables",
          icon: "icon-arrow-right"
        },
        {
          name: "Adicionar",
          url: "/base/form-seguradora",
          icon: "icon-arrow-right"
        }
      ]
    },
    {
      name: "Meu Perfil",
      url: "/base/card-user",
      icon: "icon-user"
    },
    {
      divider: true
    },
    {
      title: true,
      name: "Watersurance"
    },

    {
      name: "Contratos",
      url: "/base/tables",
      icon: "icon-notebook"
    }
  ]
};
