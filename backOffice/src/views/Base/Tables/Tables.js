import React, { Component } from "react";
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

const data = [
  { id: 0, nome: "asd", email: "asd@asd.com", estado: 0 },
  {
    id: 1,
    nome: "qwe",
    email: "fdsaasf@asd.com",
    estado: 1
  },
  { id: 2, nome: "asdf", email: "afassd@asuymfd.com", estado: 0 },
  { id: 3, nome: "yuiokj", email: "fad@asmuyd.com", estado: 1 },
  { id: 4, nome: "dgtbr", email: "htrthe@njmuy.com", estado: 1 },
  { id: 5, nome: "asfgt", email: "gtrh@ffdsa.com", estado: 1 },
  { id: 6, nome: "wegrwe", email: "sadff@dsf.com", estado: 0 }
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
    text: "ID",
    sort: true,
    hidden: false
  },
  {
    dataField: "nome",
    text: "Nome",
    sort: true,
    headerAlign: "center"
  },
  {
    dataField: "email",
    text: "E-mail",
    sort: true,
    textAlign: "center",
    headerAlign: "center"
    /*}, {
  dataField: 'morada',
  text: 'Morada',
  sort: true,
  headerAlign: 'center'
}, {
  dataField: 'telefone',
  text: 'Telefone',
  sort: true,
  headerAlign: 'center'*/
  },
  {
    dataField: "estado",
    text: "Estado",
    headerStyle: { width: 150 },
    headerAlign: "center",
    editable: false,
    formatter: cell => selectOptions[cell],
    filter: selectFilter({
      options: selectOptions,
      defaultValue: 0
    })
  }
];

class Tables extends Component {
  render() {
    return (
      <div id="table">
        <Tables>
          <ToolkitProvider keyField="id" data={[data]} columns={columns} search>
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
                  data={data}
                  columns={columns}
                  pagination={paginationFactory()}
                  striped
                  condensed
                  bordered={false}
                  selectRow={{ mode: "checkbox" }}
                  rowStyle={{ textAlign: "center" }}
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
        </Tables>
        )
      </div>
    );
  }
}

export default Tables;
