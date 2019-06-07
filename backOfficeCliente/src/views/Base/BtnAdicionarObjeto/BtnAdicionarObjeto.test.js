import React from "react";
import ReactDOM from "react-dom";
import BtnAdicionarObjeto from "./BtnAdicionarObjeto";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BtnAdicionarObjeto />, div);
  ReactDOM.unmountComponentAtNode(div);
});
