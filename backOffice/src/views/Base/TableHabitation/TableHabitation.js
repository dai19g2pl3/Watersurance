import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BtnApagar from "../BtnApagar/BtnApagar";
import BtnEditar from "../BtnEditar/BtnEditar";

const { SearchBar } = Search;

const data = [];

class TableHabitation extends Component {
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
        dataField: "edit",
        isDummyField: true,
        text: "Editar",
        headerAlign: "center",
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return (
            <div>
              <BtnEditar user={data} />
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

export default TableHabitation;

/*
    const fetchLastOcurrences = this.props.lastOcurrences;
    let data = [];
    console.log("this.props", this.props);
    /*
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
    */
