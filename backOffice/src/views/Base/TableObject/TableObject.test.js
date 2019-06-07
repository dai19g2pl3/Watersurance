import React from "react";
import ReactDOM from "react-dom";
import TableObject from "./TableObject";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TableObject />, div);
  ReactDOM.unmountComponentAtNode(div);
});
