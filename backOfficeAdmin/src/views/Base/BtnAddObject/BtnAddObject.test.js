import React from "react";
import ReactDOM from "react-dom";
import BtnAddObject from "./BtnAddObject";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BtnAddObject />, div);
  ReactDOM.unmountComponentAtNode(div);
});
