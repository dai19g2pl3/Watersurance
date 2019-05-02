import React from "react";
import ReactDOM from "react-dom";
import TablTableUser from "./TableUser";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TableUser />, div);
  ReactDOM.unmountComponentAtNode(div);
});
