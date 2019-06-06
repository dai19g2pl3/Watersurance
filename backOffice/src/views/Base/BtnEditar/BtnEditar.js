/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import FormCliente from "../FormCliente";

class BtnEditar extends React.Component {
  constructor(props, user) {
    super(props, user);
    this.state = {
      modal: false,
      name: user.name,
      email: user.email,
      nif: user.nif,
      id: user.id
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
            <FormCliente
              id={this.props.id}
              row={this.props.row}
              handleUpdateButton={this.props.handleUpdateButton}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default BtnEditar;
