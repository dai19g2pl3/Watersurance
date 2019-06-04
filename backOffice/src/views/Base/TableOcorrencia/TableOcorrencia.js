import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BtnApagar from "../BtnApagar/BtnApagar";
import BtnEditarHabitation from "../BtnEditarHabitation/BtnEditarHabitation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAllHabitations } from "../../../actions/habitationsAction";
const { SearchBar } = Search;

const data = [];

class TableOcorrencia extends Component {
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
        dataField: "date",
        text: "Data",
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
              <BtnEditarHabitation user={row} />
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

    return (
      <div>
        <ToolkitProvider keyField="id" data={data} columns={columns} search>
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
                data={data}
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
)(TableOcorrencia);
