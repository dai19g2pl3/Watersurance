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

export default class FormOcorrenciaCliente extends React.Component {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="exampleDate">Data</Label>
          <Input
            type="date"
            name="date"
            id="exampleDate"
            placeholder="Insira a data"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Nivel de dano</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>Pouco</option>
            <option>Médio</option>
            <option>Alto</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="exampleDescricao">Descrição</Label>
          <Input type="textarea" name="descricao" id="exampleDescricao" />
        </FormGroup>
        <Row>
          <Col xs={6}>
            <FormGroup>
              <Label for="exampleFile">Ficheiro</Label>
              <Input type="file" name="file" id="exampleFile" />
              <FormText color="muted">
                Se quiser enviar um ficheiro para podermos recolher mais
                informações, faça-o aqui.
              </FormText>
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary">Submeter</Button>
      </Form>
    );
  }
}
