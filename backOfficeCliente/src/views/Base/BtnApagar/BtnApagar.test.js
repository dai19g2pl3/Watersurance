import React from "react";
import ReactDOM from "react-dom";
import BtnApagar from "./BtnApagar";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BtnApagar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
