export default {
  items: [
    {
      title: true,
      name: "Utilizadores"
    },
    {
      name: "Segurador",
      url: "/base/tables",
      icon: "icon-user"
    },
    {
      name: "Cliente",
      url: "/base/table-user",
      icon: "icon-user"
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
    },
    {
      name: "Habitações",
      url: "/base/tables",
      icon: "icon-home",
      children: [
        {
          name: "Listar",
          url: "/base/tables",
          icon: "icon-arrow-right"
        },
        {
          name: "Adicionar",
          url: "/base/form-habitacao",
          icon: "icon-arrow-right"
        }
      ]
    },
    {
      name: "Ocorrências",
      url: "/theme/colors",
      icon: "icon-tag",
      children: [
        {
          name: "Listar",
          url: "/base/tables",
          icon: "icon-arrow-right"
        },
        {
          name: "Submeter",
          url: "/base/form-ocorrencia",
          icon: "icon-arrow-right"
        }
      ]
    },
    {
      divider: true
    },
    {
      title: true,
      name: "Extras"
    },
    {
      name: "Pages",
      url: "/pages",
      icon: "icon-star",
      children: [
        {
          name: "Login",
          url: "/login",
          icon: "icon-star"
        },
        {
          name: "Register",
          url: "/register",
          icon: "icon-star"
        },
        {
          name: "Error 404",
          url: "/404",
          icon: "icon-star"
        },
        {
          name: "Error 500",
          url: "/500",
          icon: "icon-star"
        },
        {
          name: "Cliente",
          url: "/Cliente",
          icon: "icon-star"
        }
      ]
    }
  ]
};
