import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BtnApagar from "../BtnApagar/BtnApagar";
import BtnEditarHabitation from "../BtnEditarHabitation/BtnEditarHabitation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAllHabitations } from "../../../actions/habitationsAction";
import BtnAddObject from "./../BtnAddObject/BtnAddObject";
const { SearchBar } = Search;

class TableHabitation extends Component {
  componentDidMount() {
    this.props.fetchAllHabitations();
  }

  render() {
    console.log(this.props.habitations);
    const columns = [
      {
        dataField: "id",
        text: "ID Habitation",
        sort: true,
        hidden: true
      },
      {
        dataField: "userID",
        text: "ID User",
        sort: true,
        hidden: true
      },

      {
        dataField: "address",
        text: "Morada",
        sort: true,
        headerAlign: "center"
      },
      {
        dataField: "zipCode",
        text: "Codigo-Postal",
        sort: true,
        headerAlign: "center"
      },
      {
        dataField: "sensorQtd",
        text: "Qt Sensores",
        sort: true,
        headerAlign: "center"
      },
      {
        dataField: "edit",
        isDummyField: true,
        text: "Editar",
        headerAlign: "center",
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return (
            <div>
              <BtnEditarHabitation row={row} />
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
      },
      {
        dataField: "addObj",
        isDummyField: true,
        text: "Objeto",
        headerAlign: "center",
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return (
            <div>
              <BtnAddObject idHabitation={row.id} />
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

    const fetchHabitation = this.props.habitations;
    let data = [];

    fetchHabitation.forEach(function(habitation) {
      data.push({
        id: habitation.id,
        idUser: habitation.idUser,
        address: habitation.address,
        zipCode: habitation.zipCode,
        sensorQtd: habitation.sensorQtd
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
    habitations: state.habitations
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllHabitations: bindActionCreators(fetchAllHabitations, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableHabitation);
