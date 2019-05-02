export default {
  items: [
    {
      divider: true
    },
    {
      title: true,
      name: "Watersurance"
    },
    {
      name: "Meu Perfil",
      url: "/base/card-user",
      icon: "icon-user"
    },
    {
      name: "Contrato",
      url: "/base/tables",
      icon: "icon-notebook"
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
    }
  ]
};
