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
import { fetchAllUsers, addUser, deleteUser } from "../../../actions/usersAction";

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
    setInterval(() => { if(this.props.users.length === 0){
      this.props.fetchAllUsers();
    }; }, 250);
  };

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
              <BtnEditar id={row} />
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
              <BtnApagar id={row.id} handleDeleteButton={this.handleDelete}/>
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

    var idUser;
    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        idUser = row.id;
      }
    };
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
                rowEvents={rowEvents}
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
    deleteUser: bindActionCreators(deleteUser, dispatch),
    addUser: bindActionCreators(addUser, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableUser);
