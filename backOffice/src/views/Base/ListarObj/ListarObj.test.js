import React from "react";
import ReactDOM from "react-dom";
import ListarObj from "./ListarObj";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ListarObj />, div);
  ReactDOM.unmountComponentAtNode(div);
});
