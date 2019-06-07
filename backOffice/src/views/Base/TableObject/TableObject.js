import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BtnEditarObject from "../BtnEditarObject/BtnEditarObject";
import BtnApagarObject from "../BtnApagarObject/BtnApagarObject";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchAllHabitations,
  resetHabitation
} from "../../../actions/habitationsAction";
import { updateObject, deleteObject } from "../../../actions/objectsAction";

const { SearchBar } = Search;

class TableObject extends Component {
  componentDidMount() {
    this.props.fetchAllHabitations();
  }

  handleUpdate = (e, object, id) => {
    e.preventDefault();

    this.props.updateObject(object, id);
    this.props.resetHabitation();
    setInterval(() => {
      if (this.props.habitations.length === 0) {
        this.props.fetchAllHabitations();
      }
    }, 250);
  };

  handleDelete = (e, id) => {
    e.preventDefault();
    console.log("Aleluia");
    console.log(id);
    /*this.props.deleteUser(id);
    setInterval(() => {
      if (this.props.users.length === 0) {
        this.props.fetchAllUsers();
      }
    }, 250);*/
  };

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
        dataField: "edit",
        isDummyField: true,
        text: "Editar",
        headerAlign: "center",
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return (
            <div>
              <BtnEditarObject
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
              <BtnApagarObject
                id={row.id}
                handleDeleteButton={this.handleDelete}
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
    habitations: state.habitations,
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllHabitations: bindActionCreators(fetchAllHabitations, dispatch),
    updateObject: bindActionCreators(updateObject, dispatch),
    deleteObject: bindActionCreators(deleteObject, dispatch),
    resetHabitation: bindActionCreators(resetHabitation, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableObject);
