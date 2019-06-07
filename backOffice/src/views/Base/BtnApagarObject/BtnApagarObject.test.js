import React from "react";
import ReactDOM from "react-dom";
import BtnApagarObject from "./BtnApagarObject";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BtnApagarObject />, div);
  ReactDOM.unmountComponentAtNode(div);
});
