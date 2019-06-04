import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
//eslint-disable-next-line
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAllUsers } from "../../../actions/usersAction";
import { fetchAllHabitations } from "../../../actions/habitationsAction";
import BtnAdicionarUser from "../BtnAdicionarUser/BtnAdicionarUser";

const { SearchBar } = Search;

class TableSelectHabitation extends Component {
  componentDidMount() {
    this.props.fetchAllHabitations();
    this.props.fetchAllUsers();
  }
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
        dataField: "address",
        text: "Morada",
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
        dataField: "AddUser",
        isDummyField: true,
        text: "Escolher",
        headerAlign: "center",
        textAlign: "center",
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
    //console.log(this.props);
    const fetchUser = this.props.users;
    const fetchHabitation = this.props.habitations;
    let data = [];

    fetchUser.forEach(function(user) {
      fetchHabitation.forEach(function(habitation) {
        if (user.id === habitation.userId) {
          data.push({
            idUser: user.id,
            name: user.name,
            nif: user.nif,
            idHab: habitation.id,
            address: habitation.address,
            zipCode: habitation.zipCode
          });
        } else console.log(user, habitation);
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
    users: state.users,
    habitations: state.habitations
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllHabitations: bindActionCreators(fetchAllHabitations, dispatch),
    fetchAllUsers: bindActionCreators(fetchAllUsers, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableSelectHabitation);
