import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import Platform from '../components/Platform';
import TabelasAdicionadas from "../components/formulario/TabelasAdicionadas";
import { SuccessAlt } from "../components/Success";
import { ErrorAlt } from "../components/Error";
import { LoadingOval } from "../components/Loading";
import Cabecalho from '../components/formulario/Cabecalho';
import Tabelas from '../components/formulario/Tabelas';
import { getEscritorios } from "../redux/actions/formulario-actions";
import { getCompanhias } from "../redux/actions/formulario-actions";
import { getNumDocs } from "../redux/actions/documents-actions";
import idGenerator from 'react-id-generator';


class FormPage extends Component {
  constructor(props) {
      super(props);
      this.state={
        data: new Date(), nome:'', companhia:'Fidelidade', escritorio:'Cristelo', tabelas:[]
      }
      this.changeData = this.changeData.bind(this);

  }

  updateInf(){
    this.props.getEscritorios();
    this.props.getCompanhias();
    this.props.getNumDocs(this.state.companhia);
  }



  componentDidMount(){
    this.updateInf();
  }
  render(){
    return(
      <div></div>
      );
  }
}
function mapStateToProps(state) {
  return {
    loading: state.formulario.loading,
    escritorios: state.formulario.escritorios,
    error: state.formulario.error,
    companhias: state.formulario.companhias,
    numDocs: state.docs.numDocs,
    loadingNumDocs: state.docs.loadingNumDocs,
    pdfgerado: state.docs.pdfgerado,
    gerandopdf: state.docs.gerandoPDF,
    errorpdf: state.docs.error,
  };
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getEscritorios,
      getCompanhias,
      getNumDocs
    },
    dispatch
  );

export default connect(mapStateToProps,mapDispatchToProps)(FormPage);
