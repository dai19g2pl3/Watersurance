import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { log } from "util";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchObjectSensor } from "../../../actions/objectSensorAction";
import { alterFirstTime } from "../../../actions/firstTimeAction";
import { alterStartDate } from "../../../actions/startDateAction";
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

    const fetchHabitations = this.props.habitations;
    const fetchObjectSensor = this.props.objectSensor;
    const fetchHabitationSensor = this.props.habitationSensor;
    const firstTime = this.props.firstTime;
    const alterTime = (number) => {this.props.alterFirstTime(number);}
    const startDate = this.props.startDate;
    const alterDate = (date) => {this.props.alterStartDate(date);}
    const sensorOccurrence = (dates, id) => {this.props.addSensorOccurrence(dates, id);} 
    let data = [];
    console.log(fetchHabitations);
    console.log(fetchObjectSensor);
    console.log(fetchHabitationSensor);

    var habitationId;
    var habitationAddress;
    var estadoHabitation;
    var estadoObject;
    
    fetchHabitations.forEach(function(habitation) {
      fetchObjectSensor.forEach(sensorObject => {
        fetchHabitationSensor.forEach(sensorHabitation => {
          console.log(sensorObject.value);
          console.log(sensorHabitation.value);
          habitationId = habitation.id;
          if (sensorHabitation.value > 150) {
            estadoHabitation = "Inundação";
            if(firstTime == 1) {
              alterDate(sensorObject.date);
              alterTime(0);
            }
          } else if (sensorHabitation.value <= 150) {
            estadoHabitation = "Ok";
            if(firstTime == 0) {
              alert("Start: " + startDate[0]);
              alert("End: " + sensorObject.date);
              var dates = {	
                "startDate": startDate[0],
                "endDate": sensorObject.date
              }
              sensorOccurrence(dates, habitationId);
              alterTime(1);             
            } 
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
    
    var habitations = data; 

    return (
      <div>
        <ToolkitProvider
          keyField="id"
          data={habitations}
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
    habitationSensor: state.habitationSensor,
    firstTime: state.firstTime,
    startDate: state.startDate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchObjectSensor: bindActionCreators(fetchObjectSensor, dispatch),
    alterFirstTime: bindActionCreators(alterFirstTime, dispatch),
    alterStartDate: bindActionCreators(alterStartDate, dispatch),
    addSensorOccurrence: bindActionCreators(addSensorOccurrence, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableSensor);
