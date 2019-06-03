import React, { Component } from "react";
//eslint-disable-next-line
import { Row, Col } from "reactstrap";

import FormOcorrencia from "../Base/FormOcorrencia";

// Main Chart

class DashboardCliente extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {};
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <h4>Submeta aqui uma ocorrencia</h4>
        </Row>
        <Row>
          <FormOcorrencia />
        </Row>
      </div>
    );
  }
}

export default DashboardCliente;
