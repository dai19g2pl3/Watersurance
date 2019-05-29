import React from "react";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Container
} from "reactstrap";
import { Route, NavLink } from "react-router-dom";
import FormOcorrencia from "../../Base/FormOcorrencia";
import Tables from "../../Base/Tables";
import { PropTypes } from "prop-types";
import CardUser from "./../../Base/CardUser";
import CardCasa from "./../../Base/CardCasa";

Nav.propTypes = {
  tabs: PropTypes.bool,
  pills: PropTypes.bool,
  card: PropTypes.bool,
  justified: PropTypes.bool,
  fill: PropTypes.bool,
  vertical: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  horizontal: PropTypes.string,
  navbar: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  // pass in custom element to use
};
NavItem.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  active: PropTypes.bool
  // pass in custom element to use
};
NavLink.propTypes = {
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  // pass in custom element to use
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // ref will only get you a reference to the NavLink component, use innerRef to get a reference to the DOM element (for things like focus management).
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

class User extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div>
        <Container>
          <div className="user-header">
            <Nav pills>
              <NavItem>
                <NavLink href="/user" active>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/user/sensor">Sensores</NavLink>
              </NavItem>
              <NavItem>
                <Dropdown
                  nav
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggle}
                >
                  <DropdownToggle nav caret>
                    Ocorrências
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem divider />
                    <NavLink href="/form/ocorrencia">
                      {" "}
                      <DropdownItem>Submeter Ocorrência</DropdownItem>
                    </NavLink>
                    <NavLink href="/user/ocorrencia">
                      <DropdownItem>Ver Todas</DropdownItem>
                    </NavLink>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
            </Nav>
            <div className="content">
              <Route path="/user" component={User} />
              <Route path="/user/sensor" component={Tables} />
              <Route path="/form/ocorrencia" component={FormOcorrencia} />
              <Route path="/user/ocorrencia" component={Tables} />
            </div>

            <div className="user-body">
              <CardUser />
              <CardCasa />
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default User;
