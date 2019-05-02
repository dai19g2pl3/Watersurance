import React from "react";
import ReactDOM from "react-dom";
import FormCliente from "./FormCliente";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FormCliente />, div);
  ReactDOM.unmountComponentAtNode(div);
});
