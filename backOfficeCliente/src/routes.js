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
const FormOcorrencia = React.lazy(() => import("./views/Base/FormOcorrencia"));
const FormOcorrenciaCliente = React.lazy(() =>
  import("./views/Base/FormOcorrenciaCliente/FormOcorrenciaCliente")
);
const FormHabitacao = React.lazy(() => import("./views/Base/FormHabitacao"));
const FormCliente = React.lazy(() => import("./views/Base/FormCliente"));
const CardUser = React.lazy(() => import("./views/Base/CardUser"));
const CardCasa = React.lazy(() => import("./views/Base/CardCasa"));
const CardPerfil = React.lazy(() => import("./views/Base/CardPerfil"));
const TableUser = React.lazy(() => import("./views/Base/TableUser"));
const TableSensor = React.lazy(() => import("./views/Base/TableSensor"));
const Contract = React.lazy(() => import("./views/Base/Contract"));
const BtnAdicionar = React.lazy(() => import("./views/Base/BtnAdicionar"));
const TableSelectObject = React.lazy(() =>
  import("./views/Base/TableSelectObject")
);
const TableHabitation = React.lazy(() =>
  import("./views/Base/TableHabitation")
);
const TableOcorrencia = React.lazy(() =>
  import("./views/Base/TableOcorrencia")
);
const BtnAdicionarObjeto = React.lazy(() =>
  import("./views/Base/BtnAdicionarObjeto")
);
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
    path: "/base/table-ocorrencia",
    exact: true,
    name: "Table Ocorrencia",
    component: TableOcorrencia
  },
  {
    path: "/base/card-casa",
    exact: true,
    name: "Card Casa",
    component: CardCasa
  },
  {
    path: "/base/card-perfil",
    exact: true,
    name: "Card Perfil",
    component: CardPerfil
  },
  {
    path: "/base/contract",
    exact: true,
    name: "Contract",
    component: Contract
  },
  {
    path: "/base/form-ocorrencia-cliente",
    exact: true,
    name: "Form Ocorrencia Cliente",
    component: FormOcorrenciaCliente
  },
  {
    path: "/base/table-select-object",
    exact: true,
    name: "Table Select Object",
    component: TableSelectObject
  },
  {
    path: "/base/btn-adicionar-object",
    exact: true,
    name: "Btn Adicionar Object",
    component: BtnAdicionarObjeto
  }
];

export default routes;
