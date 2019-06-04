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
      url: "/base/card-perfil",
      icon: "icon-user"
    },
    {
      name: "Sensores",
      url: "/base/table-sensor",
      icon: "icon-notebook"
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
          url: "/base/form-ocorrencia-cliente",
          icon: "icon-arrow-right"
        }
      ]
    }
  ]
};
