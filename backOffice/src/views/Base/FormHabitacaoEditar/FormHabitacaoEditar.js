import React from "react";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

import { PropTypes } from "prop-types";
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

class FormHabitacaoEditar extends React.Component {
  state = {
    id: this.props.row.id,
    address: this.props.row.address,
    zipCode: this.props.row.zipCode
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    //console.log(this.state);
  };
  render() {
    return (
      <div>
        <Row>
          <Col />
        </Row>
        <Form>
          <FormGroup>
            <Label for="exampleAdress">Morada</Label>
            <Input
              type="text"
              name="address"
              id="exampleAdress"
              placeholder="Insira a morada"
              required
              value={this.state.address}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleZip">Codigo-Postal</Label>
            <Input
              type="text"
              name="zip"
              id="exampleZip"
              placeholder="Insira o código-postal"
              required
              value={this.state.zipCode}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleSensor">Sensores de inundação</Label>
            <Input
              type="number"
              name="sensor"
              id="exampleSensor"
              required
              min={0}
              placeholder="Insira a quantidade de sensores instalados para prevenir inundações"
            />
          </FormGroup>

          <Button size="lg" block color="success">
            Submeter
          </Button>
        </Form>
      </div>
    );
  }
}
export default FormHabitacaoEditar;
