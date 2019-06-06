import React from "react";
import ReactDOM from "react-dom";
import BtnAdicionar from "./BtnAdicionar";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BtnAdicionar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
