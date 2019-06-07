import React from "react";
import ReactDOM from "react-dom";
import BtnListarObj from "./BtnListarObj";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BtnListarObj />, div);
  ReactDOM.unmountComponentAtNode(div);
});
