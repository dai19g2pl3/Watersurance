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
    dataField: "",
    text: ""
  }
];

class Tables extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <BootstrapTable keyField="id" data={{}} columns={columns} />
      </div>
    );
  }
}

export default Tables;
