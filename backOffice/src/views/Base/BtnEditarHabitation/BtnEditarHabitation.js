/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import FormHabitacaoEditar from "../FormHabitacaoEditar/FormHabitacaoEditar";

class BtnEditarHabitation extends React.Component {
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
          &nbsp;Editar
        </Button>
        <Modal
          isOpen={this.state.modal}
          modalTransition={{ timeout: 500 }}
          backdropTransition={{ timeout: 1000 }}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} />
          <ModalBody>
            <FormHabitacaoEditar row={this.props.row} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default BtnEditarHabitation;
