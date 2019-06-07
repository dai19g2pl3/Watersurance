import React from "react";
import ReactDOM from "react-dom";
import FormObject from "./FormObject";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FormObject />, div);
  ReactDOM.unmountComponentAtNode(div);
});
