import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const { SearchBar } = Search;

const data = [];
class TableSensor extends Component {
  render() {
    const columns = [
      {
        dataField: "id",
        text: "ID Cliente",
        sort: true,
        hidden: true
      },

      {
        dataField: "morada",
        text: "Morada",
        sort: true,
        headerAlign: "center"
      },
      {
        dataField: "estado",
        text: "Estado",
        sort: true,
        headerAlign: "center"
      }
    ];
    const defaultSorted = [
      {
        dataField: "morada",
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

export default TableSensor;

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
