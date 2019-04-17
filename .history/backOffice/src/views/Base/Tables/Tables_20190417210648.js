//eslint-disable-next-line
import React, { Component } from "react";
import faker from "faker";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
//eslint-disable-next-line
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";
import cellEditFactory from "react-bootstrap-table2-editor";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const { SearchBar } = Search;

const selectOptions = {
  0: "Ativo",
  1: "Inativo"
};
faker.locale = "pt_BR";

var user = [
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    nif: faker.random.number(),
    isActive: 1
  },
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    nif: faker.random.number(),
    isActive: 0
  },
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    nif: faker.random.number(),
    isActive: 1
  },
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    nif: faker.random.number(),
    isActive: 0
  },
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    nif: faker.random.number(),
    isActive: 1
  },
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    nif: faker.random.number(),
    isActive: 0
  }
];

const defaultSorted = [
  {
    dataField: "name",
    order: "desc"
  }
];

const columns = [
  {
    dataField: "id",
    text: "ID Cliente",
    sort: true,
    hidden: true
  },
  {
    dataField: "name",
    text: "Nome",
    sort: true,
    headerAlign: "center"
  },
  {
    dataField: "email",
    text: "Email",
    sort: true,
    editable: true,
    headerAlign: "center"
  },
  {
    dataField: "nif",
    text: "NIF",
    sort: true,
    editable: true,
    headerAlign: "center"
  },
  {
    dataField: "isActive",
    text: "Estado",
    headerStyle: { width: 150 },
    headerAlign: "center",
    editable: false,
    formatter: cell => selectOptions[cell]
    filter: selectFilter({
      options: selectOptions,
      defaultValue: 0
    })
  },
  {
    dataField: "actions",
    isDummyField: true,
    text: "Ações",
    editable: false,
    formatter: (cellContent, row) => {
      return (
        <h5>
          <i className="icon-info" /> <span> </span>
          <i className="icon-pencil" /> <span />
          <i className="icon-trash" />
        </h5>
      );
    }
  }

  /*,
  {
    dataField: "lastLogin",
    text: "Ultimo Login",
    sort: true,
    headerAlign: "center"
  }*/
];

export default () => (
  <ToolkitProvider keyField="id" data={user} columns={columns} search>
    {props => (
      <div>
        <SearchBar
          {...props.searchProps}
          className="custome-search-field"
          style={{
            color: "black"
          }}
          delay={800}
          placeholder="Pesquisar"
        />
        <BootstrapTable
          keyField="id"
          {...props.baseProps}
          columns={columns}
          pagination={paginationFactory()}
          striped
          data={user}
          condensed
          bordered={false}
          defaultSorted={defaultSorted}
          filter={filterFactory()}
          cellEdit={cellEditFactory({
            mode: "dbclick",
            blurToSave: true,
            nonEditableRows: () => [0, 4, 5]
          })}
        />
      </div>
    )}
  </ToolkitProvider>
);
