import React from "react";
import {
  Media,
  Card,
  CardBody,
  CardText,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import { PropTypes } from "prop-types";

Button.propTypes = {
  active: PropTypes.bool,
  "aria-label": PropTypes.string,
  block: PropTypes.bool,
  color: PropTypes.string, // default: 'secondary'
  disabled: PropTypes.bool,
  outline: PropTypes.bool,

  // Pass in a Component to override default button element
  // example: react-router Link
  // default: 'button'
  tag: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func }),
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
        PropTypes.shape({ $$typeof: PropTypes.symbol, render: PropTypes.func })
      ])
    )
  ]),

  // ref will only get you a reference to the Button component, use innerRef to get a reference to the DOM element (for things like focus management).
  innerRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.string
  ]),

  onClick: PropTypes.func,
  size: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,

  // use close prop for BS4 close icon utility
  close: PropTypes.bool
};

Button.defaultProps = {
  color: "secondary",
  tag: "button"
};

Media.propTypes = {
  body: PropTypes.bool,
  bottom: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  heading: PropTypes.bool,
  left: PropTypes.bool,
  list: PropTypes.bool,
  middle: PropTypes.bool,
  object: PropTypes.bool,
  right: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  top: PropTypes.bool
};

const CardCasa = () => {
  return (
    <Card>
      <CardBody>
        <CardText>
          <Media>
            <Media left href="#">
              <Media
                object
                data-src="holder.js/64x64"
                alt="Generic placeholder image"
              />
            </Media>
            <Media body>
              <Media heading center>
                Dados da Habitação
              </Media>
              <Form>
                <FormGroup row>
                  <Label for="exampleMorada" sm={2}>
                    Morada
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="Morada"
                      id="exampleMorada"
                      placeholder="Insira aqui a morada"
                      required
                      disabled
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="exampleCodigoPostal" sm={2}>
                    Codigo-Postal
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="zip"
                      name="Codigo-Postal"
                      id="exampleCodigoPostal"
                      placeholder="Insira aqui o Codigo-Postal"
                      required
                      disabled
                    />
                  </Col>
                  <Label for="exampleNIF" sm={2}>
                    Qt Sensores
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="number"
                      name="Sensor"
                      id="exampleSensor"
                      placeholder="Insira aqui o numero de sensores"
                      required
                      disabled
                    />
                  </Col>
                </FormGroup>
              </Form>
            </Media>
          </Media>
        </CardText>
      </CardBody>
    </Card>
  );
};

export default CardCasa;
