//eslint-disable-next-line
import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
//eslint-disable-next-line
import filterFactory, { selectFilter, dateFilter } from 'react-bootstrap-table2-filter';

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
  dataField: 'name',
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
  text:'Morada',
  sort: true,
  headerAlign: 'center'
}, {
  dataField: 'telefone',
  text: 'Telefone',
  sort: true,
  headerAlign: 'center'
}, {
  dataField: 'estado',
  text:'Estado',
  headerStyle: { width: 150 },
  headerAlign: 'center',
  formatter: cell => selectOptions[cell],
  filter: selectFilter({
    options: selectOptions,
    defaultValue: 0
  })  
}, {
  dataField: 'dataInscricao',
  text:'Data de Inscricao ',
  filter: dateFilter({
    comparatorStyle: { width: 70 },
    dateStyle:{ width: 200 },
    style: { display: 'inline-grid' },
    withoutEmptyComparatorOption: true,
  }),
  headerAlign: 'center',
  headerStyle: { width: 400 }
}];

export default () =>
  <BootstrapTable 
  keyField='id' 
  data={ [] } 
  columns={ columns }
  pagination = { paginationFactory() }
  striped
  condensed
  bordered={false}
  selectRow={ { mode: 'checkbox' } }
  defaultSorted={ defaultSorted }
  filter={ filterFactory() }
  />
