import React from "react";
import ReactDOM from "react-dom";
import BtnEditarObject from "./BtnEditarObject";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BtnEditarObject />, div);
  ReactDOM.unmountComponentAtNode(div);
});
