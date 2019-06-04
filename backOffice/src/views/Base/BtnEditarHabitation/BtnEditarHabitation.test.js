import React from "react";
import ReactDOM from "react-dom";
import BtnEditarHabitation from "./BtnEditarHabitation";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BtnEditarHabitation />, div);
  ReactDOM.unmountComponentAtNode(div);
});
