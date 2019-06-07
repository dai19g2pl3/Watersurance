//eslint-disable-next-line
import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
//eslint-disable-next-line
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BtnAdicionarHabitation from "./../BtnAdicionarHabitation/BtnAdicionarHabitation";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAllUsers } from "../../../actions/usersAction";
import { addHabitation } from "../../../actions/habitationsAction";
import Swal from "sweetalert2";
const { SearchBar } = Search;

class TableSelectUser extends Component {
  componentDidMount() {
    this.props.fetchAllUsers();
  }

  handleAdd = (e, habitation, id) => {
    e.preventDefault();
    console.log(id);
    console.log(habitation);

    this.props.addHabitation(habitation, id);
    Swal.fire("Habitação registada com sucesso");
    /*
    setInterval(() => {
      if (this.props.users.length === 0) {
        this.props.fetchAllUsers();
      }
    }, 250);
    */
  };

  render() {
    const columns = [
      {
        dataField: "id",
        text: "ID Cliente",
        sort: true,
        hidden: true,
        align: "center"
      },
      {
        dataField: "name",
        text: "Nome",
        sort: true,
        headerAlign: "center",
        align: "center"
      },
      {
        dataField: "email",
        text: "Email",
        sort: true,
        headerAlign: "center",
        align: "center"
      },
      {
        dataField: "nif",
        text: "NIF",
        sort: true,
        headerAlign: "center",
        align: "center"
      },
      {
        dataField: "addUser",
        isDummyField: true,
        text: "Adicionar",
        headerAlign: "center",
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return (
            <div>
              <BtnAdicionarHabitation
                idUser={row.id}
                handleAddButton={this.handleAdd}
              />
            </div>
          );
        },
        align: "center"
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
        phoneNumber: user.phoneNumber,
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
    fetchAllUsers: bindActionCreators(fetchAllUsers, dispatch),
    addHabitation: bindActionCreators(addHabitation, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableSelectUser);
