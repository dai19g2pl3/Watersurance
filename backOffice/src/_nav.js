export default {
  items: [
    {
      title: true,
      name: "Utilizadores"
    },
    {
      name: "Utilizadores",
      url: "/base",
      icon: "icon-user",
      children: [
        {
          name: "Listar",
          url: "/base/table-user",
          icon: "icon-people"
        },
        {
          name: "Adicionar",
          url: "/base/form-user",
          icon: "icon-user-follow"
        }
      ]
    },
    {
      divider: true
    },
    {
      title: true,
      name: "Watersurance"
    },

    {
      name: "Sensores",
      url: "/base/table-sensor",
      icon: "icon-notebook"
    },
    {
      name: "Objetos",
      url: "/base/table-select-object",
      icon: "icon-notebook"
    },
    {
      name: "Habitações",
      url: "/base/tables",
      icon: "icon-home",
      children: [
        {
          name: "Listar",
          url: "/base/table-habitation",
          icon: "icon-arrow-right"
        },
        {
          name: "Adicionar",
          url: "/base/table-select-user",
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
          url: "/base/table-ocorrencia",
          icon: "icon-arrow-right"
        },
        {
          name: "Submeter",
          url: "/base/table-select-habitation",
          icon: "icon-arrow-right"
        }
      ]
    },
    {
      divider: true
    }
  ]
};
