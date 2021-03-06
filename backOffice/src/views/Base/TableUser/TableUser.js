//eslint-disable-next-line
import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
//eslint-disable-next-line
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BtnEditar from "../BtnEditar/BtnEditar";
import BtnApagar from "../BtnApagar/BtnApagar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchAllUsers,
  updateUser,
  addUser,
  deleteUser
} from "../../../actions/usersAction";

import Swal from "sweetalert2";

const { SearchBar } = Search;

const selectOptions = {
  1: "Ativo",
  0: "Inativo"
};

class TableUser extends Component {
  componentDidMount() {
    this.props.fetchAllUsers();
  }

  handleDelete = (e, id) => {
    e.preventDefault();
    console.log("Aleluia");
    console.log(id);
    this.props.deleteUser(id);
    setInterval(() => {
      if (this.props.users.length === 0) {
        this.props.fetchAllUsers();
      }
    }, 250);

    Swal.fire("User Apagado com sucesso!");
  };

  handleUpdate = (e, user) => {
    e.preventDefault();
    console.log("Aleluia");
    console.log(user.id);

    if (user.isActive === 1) {
      user.isActive = "true";
    } else user.isActive = "false";
    console.log(user);

    this.props.updateUser(user);
    setInterval(() => {
      if (this.props.users.length === 0) {
        this.props.fetchAllUsers();
      }
    }, 250);
    Swal.fire("User atualizado com sucesso!");
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
        dataField: "phoneNumber",
        text: "Telefone",
        sort: true,
        headerAlign: "center",
        align: "center"
      },
      {
        dataField: "role",
        text: "Tipo",
        sort: true,
        headerAlign: "center",
        align: "center"
      },
      {
        dataField: "isActive",
        headerStyle: { width: 150 },
        headerAlign: "center",
        formatter: cell => selectOptions[cell],
        filter: selectFilter({
          options: selectOptions,
          defaultValue: 1
        }),
        align: "center"
      },
      {
        dataField: "edit",
        isDummyField: true,
        text: "Editar",
        headerAlign: "center",
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return (
            <div>
              <BtnEditar
                id={row.id}
                row={row}
                handleUpdateButton={this.handleUpdate}
              />
            </div>
          );
        },
        align: "center"
      },
      {
        dataField: "delete",
        isDummyField: true,
        text: "Apagar",
        headerAlign: "center",
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return (
            <div>
              <BtnApagar id={row.id} handleDeleteButton={this.handleDelete} />
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
    console.log(this.props);
    let data = [];
    if (fetchUser.length > 0) {
      fetchUser.forEach(function(user) {
        let isActive;

        var roleArray = user.roles[0];
        var roleName = roleArray.name;

        var roleUser;
        if (roleName === "ROLE_INSURER") {
          roleUser = "Segurador";
        } else roleUser = "Cliente";

        if (user.isActive === false) {
          isActive = 0;
        } else isActive = 1;

        data.push({
          id: user.id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: roleUser,
          nif: user.nif,
          isActive: isActive
        });
      });
    }

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
    updateUser: bindActionCreators(updateUser, dispatch),
    deleteUser: bindActionCreators(deleteUser, dispatch),
    addUser: bindActionCreators(addUser, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableUser);
