import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
//eslint-disable-next-line
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAllUsers } from "../../../actions/usersAction";
import BtnAdicionarUser from "../BtnAdicionarUser/BtnAdicionarUser";

const { SearchBar } = Search;

class TableSelectHabitation extends Component {
  render() {
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
        dataField: "casa",
        text: "Habitação",
        sort: true,
        headerAlign: "center"
      },

      {
        dataField: "AddUser",
        isDummyField: true,
        text: "Escolher",
        headerAlign: "center",
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return (
            <div>
              <BtnAdicionarUser row={row} />
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

    const fetchUser = this.props.users;
    let data = [];

    fetchUser.forEach(function(user) {
      let isActive;

      if (user.isActive === false) {
        isActive = 0;
      } else isActive = 1;

      data.push({
        id: user.id,
        name: user.name,
        email: user.email,
        nif: user.nif,
        isActive: isActive
      });
    });
    var user = data;
    return (
      <div>
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
                data={user}
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //getAllUsers: bindActionCreators(getAllUsers, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableSelectHabitation);
