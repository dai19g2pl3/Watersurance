import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BtnApagarHabitation from "../BtnApagarHabitation/BtnApagarHabitation";
import BtnEditarHabitation from "../BtnEditarHabitation/BtnEditarHabitation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAllHabitations } from "../../../actions/habitationsAction";
import BtnAddObject from "./../BtnAddObject/BtnAddObject";
import BtnListarObj from "../BtnListarObj/BtnListarObj";
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
        hidden: true,
        align: "center"
      },
      {
        dataField: "userID",
        text: "ID User",
        sort: true,
        hidden: true,
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
        dataField: "zipCode",
        text: "Codigo-Postal",
        sort: true,
        headerAlign: "center",
        align: "center"
      },
      {
        dataField: "sensorQtd",
        text: "Qt Sensores",
        sort: true,
        headerAlign: "center",
        align: "center"
      },
      {
        dataField: "edit",
        isDummyField: true,
        text: "Editar",
        align: "center",
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
              <BtnApagarHabitation />
            </div>
          );
        },
        align: "center"
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
        },
        align: "center"
      },
      {
        dataField: "listarObj",
        isDummyField: true,
        text: "Objeto",
        headerAlign: "center",
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return (
            <div>
              <BtnListarObj />
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
