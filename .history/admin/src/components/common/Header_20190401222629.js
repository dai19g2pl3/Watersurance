import React from "react";
//import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <a href="/" className="navbar-brand">
          <img src="./../../watersurance.png" />
        </a>
        <ul className="nav navbar-nav">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/#about">About</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
