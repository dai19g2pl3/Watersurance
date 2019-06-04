/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
//retorna FORM OCORRENCIA

import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import FormOcorrencia from "../FormOcorrencia/FormOcorrencia";

class BtnAdicionarUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
    //console.log(this.props.row);
  }
  render() {
    return (
      <div>
        <Button
          color="primary"
          onClick={this.toggle}
          className="btn btn-default"
        >
          <i className="icon-pencil" />
          &nbsp;Adicionar
        </Button>
        <Modal
          isOpen={this.state.modal}
          modalTransition={{ timeout: 500 }}
          backdropTransition={{ timeout: 700 }}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} />
          <ModalBody>
            <FormOcorrencia row={this.props.row} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default BtnAdicionarUser;
