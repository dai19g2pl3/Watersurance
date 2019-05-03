export default {
  items: [
    {
      title: true,
      name: "Utilizadores"
    },

    {
      name: "Cliente",
      url: "/base/table-user",
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
      name: "Sensores",
      url: "/base/table-sensor",
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
          url: "/base/table-user",
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
    }
  ]
};
