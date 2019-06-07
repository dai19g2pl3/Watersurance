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
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteUser, fetchAllUsers } from "../../../actions/usersAction";

class BtnApagarHabitation extends React.Component {
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
    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );

    return (
      <div>
        <Button
          color="danger"
          onClick={this.toggle}
          className="btn btn-default"
        >
          <i className="icon-trash" />
          &nbsp;Apagar
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} close={closeBtn}>
            <i className="icon-ban" />
            &nbsp;Apagar Habitação
          </ModalHeader>
          <ModalBody>
            <Card body inverse color="danger">
              <h3>
                <CardTitle>Tem a certeza que quer eliminar?</CardTitle>
              </h3>
              <h6>
                <CardText>
                  Esta ação é irreversível. Qualquer contrato existente será
                  terminado de imeadiato.
                </CardText>
              </h6>
              <Button
                color="secondary"
                onClick={e => this.props.handleDeleteButton(e, this.props.id)}
              >
                Eliminar
              </Button>
            </Card>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteUser: bindActionCreators(deleteUser, dispatch),
    fetchAllUsers: bindActionCreators(fetchAllUsers, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BtnApagarHabitation);
