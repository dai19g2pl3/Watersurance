import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col
} from "reactstrap";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addObject } from "../../../actions/objectsAction";

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

FormText.propTypes = {
  children: PropTypes.node,
  inline: PropTypes.bool,
  // Pass in a Component to override default element
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]), // default: 'small'
  color: PropTypes.string, // default: 'muted'
  className: PropTypes.string,
  cssModule: PropTypes.object
};

class FormObject extends React.Component {
  state = {
    price: '',
    ref: '',
    description: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleAddObject = (e, object, idHabitation) => {
    e.preventDefault();
    console.log(object);
    console.log(idHabitation);
    this.props.addObject(object, idHabitation);
    /*
    var refresh = setInterval(() => {
      if (this.props.users.length === 0) {
        this.props.fetchAllUsers();
        clearInterval(refresh);
      }
    }, 250);
    */
  };

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="exampleAdress">Descrição</Label>
          <Input
            type="text"
            name="description"
            id="exampleDescricao"
            placeholder="Insira uma breve descrição"
            required
            onChange={this.handleChange}
            value={this.state.description}
          />
        </FormGroup>
        <Row>
          <Col xs={6}>
            <FormGroup>
              <Label for="examplePrice">Preço</Label>
              <Input
                type="number"
                name="price"
                id="exampleZip"
                placeholder="Insira o preço"
                required
                onChange={this.handleChange}
                value={this.state.price}
              />
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup>
              <Label for="exampleRef">Referência</Label>
              <Input
                type="number"
                name="ref"
                id="exampleRef"
                placeholder="Insira a referência"
                required
                onChange={this.handleChange}
                value={this.state.ref}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button onClick={e => this.handleAddObject(e, this.state, this.props.idHabitation)}>Adicionar</Button>
      </Form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addObject: bindActionCreators(addObject, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(FormObject);