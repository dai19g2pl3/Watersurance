import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getAllOcurrences,
  getLastOcurrences
} from "../../../actions/ocurrencesAction";

const { SearchBar } = Search;

class TableSensor extends Component {
  componentDidMount() {
    this.props.getAllOcurrences();
    this.props.getLastOcurrences();
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
      }
    ];
    const defaultSorted = [
      {
        dataField: "name",
        order: "desc"
      }
    ];
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
    return (
      <div>
        <ToolkitProvider keyField="id" data={{}} columns={columns} search>
          {props => (
            <div>
              <BootstrapTable
                keyField="id"
                {...props.baseProps}
                columns={columns}
                pagination={paginationFactory()}
                data={{}}
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
    ocurrences: state.ocurrences,
    lastOcurrences: state.lastOcurrences
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllOcurrences: bindActionCreators(getAllOcurrences, dispatch),
    getLastOcurrences: bindActionCreators(getLastOcurrences, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableSensor);
