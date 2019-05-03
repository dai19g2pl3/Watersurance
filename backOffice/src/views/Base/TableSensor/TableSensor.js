import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllOcurrences, getLastOcurrences} from "../../../actions/ocurrencesAction";

const { SearchBar } = Search;

class TableSensor extends Component {
  componentDidMount() {
    this.props.getAllOcurrences;
    this.props.getLastOcurrences;
  }

  render() {
    const columns = [
      {
        dataField: "name",
        text: "Nome",
        sort: true,
        headerAlign: "center"
      },
      {
        dataField: "habitation",
        text: "Habitacao",
        sort: true,
        headerAlign: "center"
      },
      {
        dataField: "sensor1",
        text: "Sensor 1",
        headerAlign: "center"
      },
      {
        dataField: "sensor2",
        text: "Sensor 2",
        headerAlign: "center"
      }
    ];
    const defaultSorted = [
      {
        dataField: "name",
        order: "desc"
      }
    ];

    const fetchLastOcurrences = this.props.lastOcurrences;
    let data = [];
    console.log('this.props', this.props);
    /*
    fetchLastOcurrences.forEach(function(ocurrence) {
      data.push({
        id: user.id,
        name: user.name,
        email: user.email,
        nif: user.nif,
        isActive: isActive
      });
    });
    console.log(data);
    var user = data;
    */
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
