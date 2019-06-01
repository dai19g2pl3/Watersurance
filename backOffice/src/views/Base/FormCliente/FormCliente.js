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

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import { addUser } from "../../../actions/usersAction";

class FormCliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      nif: "",
      id: ""
    };
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
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="Insira aqui o email"
                required
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
                Se nos quiser fornecer uma fotografia para o perfil, faça-o
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

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //addUser: bindActionCreators(addUser, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormCliente);
