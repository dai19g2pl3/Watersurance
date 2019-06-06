import React from "react";
import DefaultLayout from "./containers/DefaultLayout";

const Breadcrumbs = React.lazy(() => import("./views/Base/Breadcrumbs"));
const Cards = React.lazy(() => import("./views/Base/Cards"));
const Forms = React.lazy(() => import("./views/Base/Forms"));
const Navbars = React.lazy(() => import("./views/Base/Navbars"));
const Navs = React.lazy(() => import("./views/Base/Navs"));
const Tables = React.lazy(() => import("./views/Base/Tables"));
const Dashboard = React.lazy(() => import("./views/Dashboard"));
const DashboardCliente = React.lazy(() => import("./views/DashboardCliente"));
const Widgets = React.lazy(() => import("./views/Widgets/Widgets"));
const BtnEditar = React.lazy(() => import("./views/Base/BtnEditar"));
const BtnApagar = React.lazy(() => import("./views/Base/BtnApagar"));
const BtnAdicionarUser = React.lazy(() =>
  import("./views/Base/BtnAdicionarUser")
);
const FormOcorrencia = React.lazy(() => import("./views/Base/FormOcorrencia"));
const FormHabitacao = React.lazy(() => import("./views/Base/FormHabitacao"));
const FormCliente = React.lazy(() => import("./views/Base/FormCliente"));
const FormUser = React.lazy(() => import("./views/Base/FormUser"));
const CardUser = React.lazy(() => import("./views/Base/CardUser"));
const CardCasa = React.lazy(() => import("./views/Base/CardCasa"));
const TableSelectHabitation = React.lazy(() =>
  import("./views/Base/TableSelectHabitation")
);
const TableSelectUser = React.lazy(() =>
  import("./views/Base/TableSelectUser")
);
const TableOcorrencia = React.lazy(() =>
  import("./views/Base/TableOcorrencia")
);
const TableUser = React.lazy(() => import("./views/Base/TableUser"));
const TableSensor = React.lazy(() => import("./views/Base/TableSensor"));
const BtnAdicionar = React.lazy(() => import("./views/Base/BtnAdicionar"));
const BtnAdicionarHabitation = React.lazy(() =>
  import("./views/Base/BtnAdicionarHabitation")
);
const TableHabitation = React.lazy(() =>
  import("./views/Base/TableHabitation")
);

const FormObject = React.lazy(() => import("./views/Base/FormObject"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home", component: DefaultLayout },
  { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
  {
    path: "/cliente/dashboard",
    exact: true,
    name: "Dashboard Cliente",
    component: DashboardCliente
  },
  { path: "/base", exact: true, name: "Base", component: Cards },
  { path: "/base/cards", name: "Cards", component: Cards },
  { path: "/base/forms", name: "Forms", component: Forms },

  { path: "/base/tables", name: "Tables", component: Tables },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", component: Breadcrumbs },
  { path: "/base/navbars", name: "Navbars", component: Navbars },
  { path: "/base/navs", name: "Navs", component: Navs },
  { path: "/widgets", name: "Widgets", component: Widgets },
  {
    path: "/base/btnEditar",
    exact: true,
    name: "Button Editar",
    component: BtnEditar
  },
  {
    path: "/base/btnApagar",
    exact: true,
    name: "Button Apagar",
    component: BtnApagar
  },
  {
    path: "/base/form-ocorrencia",
    exact: true,
    name: "Form Ocorrencia",
    component: FormOcorrencia
  },
  {
    path: "/base/form-habitacao",
    exact: true,
    name: "Form Habitacao",
    component: FormHabitacao
  },
  {
    path: "/base/card-user",
    exact: true,
    name: "Card User",
    component: CardUser
  },
  {
    path: "/base/form-cliente",
    exact: true,
    name: "Form Cliente",
    component: FormCliente
  },
  {
    path: "/base/table-user",
    exact: true,
    name: "Table User",
    component: TableUser
  },
  {
    path: "/base/table-sensor",
    exact: true,
    name: "Table Sensor",
    component: TableSensor
  },
  {
    path: "/base/btnAdicionar",
    exact: true,
    name: "Adicionar User",
    component: BtnAdicionar
  },
  {
    path: "/base/table-habitation",
    exact: true,
    name: "Table Home",
    component: TableHabitation
  },
  {
    path: "/base/card-casa",
    exact: true,
    name: "Card Casa",
    component: CardCasa
  },
  {
    path: "/base/table-select-habitation",
    exact: true,
    name: "Table Select Habitation",
    component: TableSelectHabitation
  },
  {
    path: "/base/btnAdicionarUser",
    exact: true,
    name: "Button Adicionar User",
    component: BtnAdicionarUser
  },
  {
    path: "/base/table-select-user",
    exact: true,
    name: "Table Select User",
    component: TableSelectUser
  },
  {
    path: "/base/btnAdicionarHabitation",
    exact: true,
    name: "Button Adicionar Habitation",
    component: BtnAdicionarHabitation
  },
  {
    path: "/base/form-user",
    exact: true,
    name: "Form User",
    component: FormUser
  },
  {
    path: "/base/table-ocorrencia",
    exact: true,
    name: "Table Ocorrencia",
    component: TableOcorrencia
  },
  {
    path: "/base/form-object",
    exact: true,
    name: "Form Object",
    component: FormObject
  }
];

export default routes;
