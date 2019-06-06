import React from "react";
import ReactDOM from "react-dom";
import BtnAdicionarUser from "./BtnAdicionar";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BtnAdicionarUser />, div);
  ReactDOM.unmountComponentAtNode(div);
});
