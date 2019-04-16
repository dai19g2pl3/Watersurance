import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#ffffff" };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>{" "}
      {"  |  "}
      <NavLink to="/about" activeStyle={activeStyle} exact>
        404
      </NavLink>
    </nav>
  );
};

export default Header;
