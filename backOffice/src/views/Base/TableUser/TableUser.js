//eslint-disable-next-line
import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
//eslint-disable-next-line
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BtnEditar from "../BtnEditar/BtnEditar";
import BtnApagar from "../BtnApagar/BtnApagar";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllUsers } from '../../../actions/usersAction'

const { SearchBar } = Search;

const selectOptions = {
  0: "Ativo",
  1: "Inativo"
};

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
  },
  {
    dataField: "isActive",
    text: "Estado",
    headerStyle: { width: 150 },
    headerAlign: "center",
    formatter: cell => selectOptions[cell],
    filter: selectFilter({
      options: selectOptions,
      defaultValue: 0
    })
  },
  {
    dataField: "edit",
    isDummyField: true,
    text: "Editar",
    headerAlign: "center",
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <div>
          <BtnEditar />
        </div>
      );
    }
  },
  {
    dataField: "delete",
    isDummyField: true,
    text: "Apagar",
    headerAlign: "center",
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <div>
          <BtnApagar />
        </div>
      );
    }
  }
];
const defaultSorted = [
  {
    dataField: "name",
    order: "desc"
  }
];

class TableUser extends Component {
  componentDidMount() {
    this.props.getAllUsers()
  }

  render() {
    console.log('this.props', this.props)
    return (
      <div>
        <ToolkitProvider keyField="id" data={{}} columns={columns} search>
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
                data={{}}
                bordered={false}
                defaultSorted={defaultSorted}
                filter={filterFactory()}
              />
            </div>
          )}
        </ToolkitProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllUsers: bindActionCreators(getAllUsers, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableUser);
