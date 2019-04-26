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
  Button,
  ButtonGroup
} from "reactstrap";
import { PropTypes } from "prop-types";
import BtnEditar from "./../BtnEditar/BtnEditar";

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

const CardUser = () => {
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
              <Media heading>Meus Dados</Media>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>
                    Email
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      placeholder="Insira aqui o e-mail"
                      required
                      disabled
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleNome" sm={2}>
                    Nome
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="name"
                      id="exampleName"
                      placeholder="Insira aqui o nome"
                      required
                      disabled
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleNome" sm={2}>
                    Telefone
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="number"
                      name="telefone"
                      id="exampleTelefone"
                      placeholder="Insira aqui o telefone"
                      minLength={9}
                      maxLength={9}
                      min={0.00000000001}
                      required
                      disabled
                    />
                  </Col>
                  <Label for="exampleNIF" sm={2}>
                    NIF
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="number"
                      name="nif"
                      id="exampleNIF"
                      placeholder="Insira aqui o nif"
                      minLength={9}
                      maxLength={9}
                      min={0.00000000001}
                      required
                      disabled
                    />
                  </Col>
                </FormGroup>
              </Form>
              <ButtonGroup>
                <Button color="primary" onClick={this.toggle}>
                  Submeter
                </Button>{" "}
                <Button color="secondary" onClick={this.toggle}>
                  Cancelar
                </Button>
                <BtnEditar />
              </ButtonGroup>
            </Media>
          </Media>
        </CardText>
      </CardBody>
    </Card>
  );
};

export default CardUser;
