//eslint-disable-next-line
import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
//eslint-disable-next-line
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const { SearchBar } = Search;

const selectOptions = {
  0: 'Ativo',
  1: 'Inativo',
};

const defaultSorted = [{
  dataField: 'name',
  order: 'desc'
}];

const columns = [{
  dataField: 'id',
  text: 'ID',
  sort: true,
  hidden: true
}, {
  dataField: 'nome',
  text: 'Nome',
  sort: true,
  headerAlign: 'center'
}, {
  dataField: 'email',
  text: 'E-mail',
  sort: true,
  headerAlign: 'center'
}, {
  dataField: 'morada',
  text: 'Morada',
  sort: true,
  headerAlign: 'center'
}, {
  dataField: 'telefone',
  text: 'Telefone',
  sort: true,
  headerAlign: 'center'
}, {
  dataField: 'estado',
  text: 'Estado',
  headerStyle: { width: 150 },
  headerAlign: 'center',
  editable: false,
  formatter: cell => selectOptions[cell],
  filter: selectFilter({
    options: selectOptions,
    defaultValue: 0
  })
}];

export default () =>
  <ToolkitProvider
    keyField="id"
    data={[]}
    columns={columns}
    search
  >
    {
      props => (
        <div>
          <SearchBar
          { ...props.searchProps }
          className="custome-search-field"
          style={ { color: 'pink' } }
          delay={ 800 }
          placeholder="Pesquisar" />
          <BootstrapTable
            keyField='id'
            { ...props.baseProps }
            data={[]}
            columns={columns}
            pagination={paginationFactory()}
            striped
            condensed
            bordered={false}
            selectRow={{ mode: 'checkbox' }}
            defaultSorted={defaultSorted}
            filter={filterFactory()}
            cellEdit={cellEditFactory({
              mode: 'dbclick',
              blurToSave: true
            })}
          />
        </div>
      )
    }
  </ToolkitProvider>
