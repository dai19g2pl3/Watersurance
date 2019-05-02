import React from "react";
import {
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import PropTypes from "prop-types";
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
export default class ClienteHeader extends React.Component {
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
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/components/">Perfil</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/">Contrato</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Ocorrências
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem href="/">Listar</DropdownItem>
              <DropdownItem href="/">Submeter</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </div>
    );
  }
}
