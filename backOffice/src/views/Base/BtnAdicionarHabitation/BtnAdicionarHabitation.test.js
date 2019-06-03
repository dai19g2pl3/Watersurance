import React from "react";
import ReactDOM from "react-dom";
import BtnAdicionarHabitation from "./BtnAdicionarHabitation";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BtnAdicionarHabitation />, div);
  ReactDOM.unmountComponentAtNode(div);
});
