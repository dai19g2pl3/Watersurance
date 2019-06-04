import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAllHabitations } from "../../../actions/habitationsAction";
const { SearchBar } = Search;

class TableOcorrencia extends Component {
  componentDidMount() {
    this.props.fetchAllHabitations();
  }

  render() {
    const columns = [
      {
        dataField: "id",
        text: "ID Ocorrencia",
        sort: true,
        hidden: true
      },
      {
        dataField: "userId",
        text: "ID User",
        sort: true,
        hidden: true
      },
      {
        dataField: "price",
        text: "Preço",
        sort: true,
        headerAlign: "center"
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
      }
    ];
    const defaultSorted = [
      {
        dataField: "name",
        order: "desc"
      }
    ];
    const fetchHabitation = this.props.habitations;
    const fetchOccurrence = this.props.habitations;
    let data = [];

    fetchHabitation.forEach(function(habitation) {
      habitation.occurrences.forEach(function(element) {
        //console.log(element);
        data.push({
          idUser: habitation.userId,
          address: habitation.address,
          id: element.id,
          date: element.startDate,
          price: element.price
        });
      });
    });
    console.log(data);
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
)(TableOcorrencia);
