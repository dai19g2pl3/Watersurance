import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchObjectSensor } from "../../../actions/objectSensorAction";
import { addSensorOccurrence } from "../../../actions/habitationSensorAction";

const { SearchBar } = Search;

class TableSensor extends Component {
  render() {
    const columns = [
      {
        dataField: "id",
        text: "ID Habitation",
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
        dataField: "tipo",
        text: "Tipo",
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

    const fetchHabitation = this.props.habitation;
    const fetchObjectSensor = this.props.objectSensor;
    const fetchHabitationSensor = this.props.habitationSensor;
    
    let data = [];

    var habitationId;
    var habitationAddress;
    var estadoHabitation;
    var estadoObject;
    
    fetchHabitation.forEach(function(habitation) {
      fetchObjectSensor.forEach(sensorObject => {
        fetchHabitationSensor.forEach(sensorHabitation => {
          habitationId = habitation.id;
          if (sensorHabitation.value > 150) {
            estadoHabitation = "Inundação";
          } else if (sensorHabitation.value <= 150) {
            estadoHabitation = "Ok";
          } else if (sensorHabitation.value == null) {
            estadoHabitation = "Falha";
          }

          if (sensorObject.value > 150) {
            estadoObject = "Inundação";
          } else if (sensorObject.value <= 150) {
            estadoObject = "Ok";
          } else if (sensorObject.value == null) {
            estadoObject = "Falha";
          }

          habitationAddress = habitation.address;
        });
      });
    });

    data = [
      {
        id: habitationId,
        morada: habitationAddress,
        estado: estadoHabitation,
        tipo: "Ocorrência"
      },
      {
        id: habitationId,
        morada: habitationAddress,
        estado: estadoObject,
        tipo: "Objeto"
      }
    ];

    return (
      <div>
        <ToolkitProvider
          keyField="id"
          data={data}
          columns={columns}
          search
        >
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
    habitations: state.habitations,
    objectSensor: state.objectSensor,
    habitationSensor: state.habitationSensor,
    firstTime: state.firstTime,
    startDate: state.startDate,
    habitation: state.habitation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchObjectSensor: bindActionCreators(fetchObjectSensor, dispatch),
    addSensorOccurrence: bindActionCreators(addSensorOccurrence, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableSensor);
