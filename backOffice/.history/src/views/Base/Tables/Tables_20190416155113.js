import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
const columns = [
  {
    dataField: "id",
    text: "Product ID"
  },
  {
    dataField: "name",
    text: "Product Name"
  },
  {
    dataField: "price",
    text: "Product Price"
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
