import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
const columns = [
  {
    dataField: "id",
    text: "ID Cliente"
  },
  {
    dataField: "name",
    text: "Nome"
  },
  {
    dataField: "username",
    text: "username"
  },
  {
    dataField: "email",
    text: "email"
  },
  {
    dataField: "nif",
    text: "NIF"
  }
];

class TableUser extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <BootstrapTable keyField="id" data={{}} columns={columns} />
      </div>
    );
  }
}

export default TableUser;
