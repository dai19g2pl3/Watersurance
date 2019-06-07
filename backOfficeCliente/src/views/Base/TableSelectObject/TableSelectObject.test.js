import React from "react";
import ReactDOM from "react-dom";
import TableSelectObject from "./TableSelectObject";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TableSelectObject />, div);
  ReactDOM.unmountComponentAtNode(div);
});
