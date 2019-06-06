import React from "react";
import ReactDOM from "react-dom";
import Contract from "./Contract";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Contract />, div);
  ReactDOM.unmountComponentAtNode(div);
});
