/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import FormHabitacao from "../FormHabitacao/FormHabitacao";

class BtnAdicionarHabitation extends React.Component {
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
          <i className="icon-plus" />
          &nbsp;Adicionar
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
            <FormHabitacao
              idUser={this.props.idUser}
              handleAddButton={this.props.handleAddButton}
              handleSubmit={this.toggle}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default BtnAdicionarHabitation;
