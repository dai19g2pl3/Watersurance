/* eslint-disable react/display-name */
import React from "react";
import { fallDown as Menu } from "react-burger-menu";

const SideBar = () => {
  return (
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

export default SideBar;
