import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DropdownToggle, Nav, NavItem } from "reactstrap";
import PropTypes from "prop-types";

import {
<<<<<<< HEAD
<<<<<<< HEAD
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler
} from "@coreui/react";
import logo from "./../../assets/img/brand/logo.jpg";
import favicon from "./../../assets/img/brand/favicon.png";
//assets/img/brand/favicon.png";
=======
=======
>>>>>>> 73bd5f087d215bedcae666ca4e48772a3dcb0e1f
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
>>>>>>> 73bd5f087d215bedcae666ca4e48772a3dcb0e1f

//eslint-disable-next-line
var bgColors = {
  Default: "#81b71a",
  Blue: "#00B1E1",
  Cyan: "#37BC9B",
  Green: "#8CC152",
  Red: "#E9573F",
  Yellow: "#F6BB42",
  White: "#ffffff"
};
const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};
class ClienteHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 160, height: 50, alt: "Watersurance Logo" }}
          minimized={{
            src: favicon,
            width: 30,
            height: 30,
            alt: "Watersurance Logo"
          }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <Link to="/cliente/dashboard" className="nav-link">
              Home Page
            </Link>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <Link to="/cliente/dashboard">
                <img
                  src={"../../assets/img/avatars/3.jpg"}
                  className="img-avatar"
                  alt="admin@bootstrapmaster.com"
                />
              </Link>
            </DropdownToggle>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

ClienteHeader.propTypes = propTypes;
ClienteHeader.defaultProps = defaultProps;

export default ClienteHeader;
