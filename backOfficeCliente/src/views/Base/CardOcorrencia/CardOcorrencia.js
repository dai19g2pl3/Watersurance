/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardTitle,
  CardText
} from "reactstrap";

class CardOcorrencia extends React.Component {
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
    console.log(this.props);
    return (
      /* algo a dar toggle*/
      <div>
        <Modal
          isOpen={this.state.modal}
          modalTransition={{ timeout: 500 }}
          backdropTransition={{ timeout: 1000 }}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} />
          <ModalBody>
            <Card body inverse color="danger">
              <h3>
                <CardTitle>INUNDAÇÃO</CardTitle>
              </h3>
              <h6>
                <CardText>Está a ocorrer uma inundação</CardText>
              </h6>
            </Card>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default CardOcorrencia;
