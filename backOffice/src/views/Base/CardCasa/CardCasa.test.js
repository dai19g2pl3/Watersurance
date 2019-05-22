import React from "react";
import ReactDOM from "react-dom";
import CardCasa from "./CardCasa";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CardCasa />, div);
  ReactDOM.unmountComponentAtNode(div);
});
