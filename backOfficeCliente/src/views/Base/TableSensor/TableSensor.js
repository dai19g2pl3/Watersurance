import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { log } from "util";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchObjectSensor,
} from "../../../actions/objectSensorAction";

const { SearchBar } = Search;

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

    const fetchHabitations = this.props.habitations;
    const fetchObjectSensor = this.props.objectSensor;
    let data = [];
    
    fetchHabitations.forEach(function(habitation) {
      fetchObjectSensor.forEach(element => {
        console.log(element.value);
        var estado;
        if(element.value > 200) {
          estado = "Inudação";
        } else if(element.value <= 200) {
          estado = "Ok"
        } else if(element.value == null) {
          estado = "Falha";
        }
        
        data.push({
          id: habitation.id,
          morada: habitation.address,
          estado: estado
        });
      });
    });
    
    var habitations = data;

    return (
      <div>
        <ToolkitProvider keyField="id" data={habitations} columns={columns} search>
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
                data={habitations}
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
    objectSensor: state.objectSensor,
    occurrenceSensor: state.occurrenceSensor
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchObjectSensor: bindActionCreators(fetchObjectSensor, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableSensor);

