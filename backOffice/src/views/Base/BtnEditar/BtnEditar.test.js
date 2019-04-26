import React from "react";
import ReactDOM from "react-dom";
import BtnEditar from "./BtnEditar";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BtnEditar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
