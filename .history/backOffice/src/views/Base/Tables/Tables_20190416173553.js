import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
//eslint-disable-next-line
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";
import cellEditFactory from "react-bootstrap-table2-editor";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const { SearchBar } = Search;

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

export default () => (
  <ToolkitProvider keyField="id" data={[]} columns={columns} search>
    {props => (
      <div>
        <SearchBar
          {...props.searchProps}
          className="custome-search-field"
          style={{ color: "pink" }}
          delay={800}
          placeholder="Pesquisar"
        />
        <BootstrapTable
          keyField="id"
          {...props.baseProps}
          data={[]}
          columns={columns}
          pagination={paginationFactory()}
          striped
          condensed
          bordered={false}
          selectRow={{ mode: "checkbox" }}
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
