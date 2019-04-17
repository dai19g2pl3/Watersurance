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

class Tables extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <BootstrapTable
          keyField="id"
          data={{}}
          columns={columns}
          striped
          hover
          condensed
        />
      </div>
    );
  }
}

export default Tables;
