import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>{" "}
      {"  |  "}
      <NavLink to="/about" activeStyle={activeStyle} exact>
        About
      </NavLink>
      {"  |  "}
      <NavLink to="/admins" activeStyle={activeStyle}>
        Listar Admin
      </NavLink>
    </nav>
  );
};

export default Header;
