import React from "react";
import ReactDOM from "react-dom";
import TableSelectUser from "./TableSelectUser";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TableSelectUser />, div);
  ReactDOM.unmountComponentAtNode(div);
});
