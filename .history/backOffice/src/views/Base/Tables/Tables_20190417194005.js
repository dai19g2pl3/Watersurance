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

var user = [
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    nif: faker.random.number()
  },
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    nif: faker.random.number()
  },
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    nif: faker.random.number()
  },
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    nif: faker.random.number()
  },
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    nif: faker.random.number()
  },
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    nif: faker.random.number()
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
    headerAlign: "center"
  },
  {
    dataField: "nif",
    text: "NIF",
    sort: true,
    headerAlign: "center"
  } /*,
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
            color: "black",
            width: "500px"
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
            blurToSave: true
          })}
        />
      </div>
    )}
  </ToolkitProvider>
);
