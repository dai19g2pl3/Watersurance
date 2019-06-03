import React from "react";
import ReactDOM from "react-dom";
import CardPerfil from "./CardPerfil";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CardPerfil />, div);
  ReactDOM.unmountComponentAtNode(div);
});
