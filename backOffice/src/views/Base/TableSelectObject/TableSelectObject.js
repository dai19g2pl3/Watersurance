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
import BtnAdicionarObjeto from "./../BtnAdicionarObjeto/BtnAdicionarObjeto";
//import Swal from "sweetalert2";
const { SearchBar } = Search;

class TableSelectObject extends Component {
  componentDidMount() {
    this.props.fetchAllHabitations();
  }
  render() {
    const columns = [
      {
        dataField: "price",
        text: "Preço",
        sort: true,
        headerAlign: "center",
        align: "center"
      },
      {
        dataField: "description",
        text: "Descrição",
        sort: true,
        headerAlign: "center",
        align: "center"
      },
      {
        dataField: "ref",
        text: "Referência",
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
        dataField: "address",
        text: "Morada",
        sort: true,
        headerAlign: "center",
        align: "center"
      },
      {
        dataField: "AddObject",
        isDummyField: true,
        text: "Escolher",
        headerAlign: "center",
        textAlign: "center",
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return (
            <div>
              <BtnAdicionarObjeto row={row} />
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
    //console.log(this.props);
    var habitations = this.props.habitations;
    var users = this.props.users;
    const data = [];
    habitations.forEach(habitation => {
      habitation.insuredObjects.forEach(object => {
        users.forEach(user => {
          if (user.id === habitation.userId) {
            data.push({
              id: object.id,
              price: object.price,
              description: object.description,
              nif: user.nif,
              address: habitation.address,
              ref: object.ref
            });
          }
        });
      });
    });

    var object = data;
    return (
      <div>
        <ToolkitProvider keyField="id" data={object} columns={columns} search>
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
                data={object}
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
)(TableSelectObject);
