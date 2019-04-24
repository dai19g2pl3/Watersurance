import React from "react";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input /*, FormText*/
} from "reactstrap";
import PopPop from "react-poppop";

export default class FormUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  toggleShow = show => {
    this.setState({ show });
  };

  render() {
    const { show } = this.state;
    return (
      <div>
        <Button
          className="btn btn-default"
          color="primary"
          onClick={() => this.toggleShow(true)}
        >
          <i className="icon-user-add" />
          &nbsp;Adicionar
        </Button>
        <PopPop
          position="centerCenter"
          open={show}
          closeBtn={true}
          closeOnEsc={true}
          onClose={() => this.toggleShow(false)}
          closeOnOverlay={true}
        >
          <Form>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleName">Nome</Label>
                  <Input
                    type="text"
                    name="name"
                    id="exampleName"
                    placeholder="Insira aqui o seu nome"
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="Insira aqui o seu email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleAddress">Morada</Label>
              <Input
                type="text"
                name="address"
                id="exampleAddress2"
                placeholder="Insira aqui a morada"
              />
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleCity">Cidade</Label>
                  <Input type="text" name="city" id="exampleCity" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleZip">Código-Postal</Label>
                  <Input type="text" name="zip" id="exampleZip" />
                </FormGroup>
              </Col>
            </Row>

            <Button>Confirmar</Button>
          </Form>
        </PopPop>
      </div>
    );
  }
}
