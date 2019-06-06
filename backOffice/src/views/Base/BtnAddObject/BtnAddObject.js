/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from "react";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input
} from "reactstrap";
import { PropTypes } from "prop-types";
import FormObject from "../FormObject/FormObject";
ButtonGroup.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  role: PropTypes.string,
  size: PropTypes.string,
  vertical: PropTypes.bool
};
Input.propTypes = {
  children: PropTypes.node,
  // type can be things like text, password, (typical input types) as well as select and textarea, providing children as you normally would to those.
  type: PropTypes.string,
  size: PropTypes.string,
  bsSize: PropTypes.string,

  valid: PropTypes.bool, // applied the is-valid class when true, does nothing when false
  invalid: PropTypes.bool, // applied the is-invalid class when true, does nothing when false
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // ref will only get you a reference to the Input component, use innerRef to get a reference to the DOM input (for things like focus management).
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  plaintext: PropTypes.bool,
  addon: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object
};

Form.propTypes = {
  children: PropTypes.node,
  inline: PropTypes.bool,
  // Pass in a Component to override default element
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]), // default: 'form'
  innerRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.string
  ]),
  className: PropTypes.string,
  cssModule: PropTypes.object
};

FormGroup.propTypes = {
  children: PropTypes.node,
  // Applied the row class when true, does nothing when false
  row: PropTypes.bool,
  // Applied the form-check class when true, form-group when false
  check: PropTypes.bool,
  inline: PropTypes.bool,
  // Applied the disabled class when the check and disabled props are true, does nothing when false
  disabled: PropTypes.bool,
  // Pass in a Component to override default element
  tag: PropTypes.string, // default: 'div'
  className: PropTypes.string,
  cssModule: PropTypes.object
};

class BtnAddObject extends React.Component {
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
        <Button color="primary" onClick={this.toggle}>
          <i className="icon-plus" />
          &nbsp;Adicionar
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} close={closeBtn}>
            <i className="icon-home" />
            &nbsp;Adicionar Objeto
          </ModalHeader>
          <ModalBody>
            <FormObject idHabitation={this.props.idHabitation} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default BtnAddObject;
