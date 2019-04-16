/* eslint-disable react/display-name */
import React from "react";
import { fallDown as Menu } from "react-burger-menu";
export default props => {
  return (
    // Pass on our props
    <Menu width={200} {...props}>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/home">
        Burgers
      </a>
    </Menu>
  );
};
