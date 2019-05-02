import React from "react";
import {
  Col,
  Button,
  FormFeedback,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

export default class FormCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      validate: {
        emailState: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(e.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }
    this.setState({ validate });
  }

  handleChange = async event => {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [name]: value
    });
  };

  submitForm(e) {
    e.preventDefault();
    console.log(`Email: ${this.state.email}`);
  }
  render() {
    return (
      <div>
        <Form>
          <FormGroup row>
            <Label for="exampleEmail" sm={2}>
              Email
            </Label>
            <Col sm={10}>
              <Input
                name="email"
                id="exampleEmail"
                placeholder="Insira aqui o e-mail"
                required
                valid={this.state.validate.emailState === "has-success"}
                invalid={this.state.validate.emailState === "has-danger"}
                onChange={e => {
                  this.validateEmail(e);
                  this.handleChange(e);
                }}
              />
              <FormFeedback valid>
                Esse e-mail está disponivel e é valido!
              </FormFeedback>
              <FormFeedback invalid>
                Algo está errado com o e-mail que inseriu.
              </FormFeedback>
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
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleFile" sm={2}>
              Fotografias
            </Label>
            <Col sm={10}>
              <Input type="file" name="file" id="exampleFile" />
              <FormText color="muted">
                Se nos quiser fornecer uma fotografia para o seu perfil, faça-o
                aqui.
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup>
            <Button>Submeter</Button>
            <Button>Cancelar</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
