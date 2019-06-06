import React from "react";
import ReactDOM from "react-dom";
import FormOcorrenciaCliente from "./FormOcorrenciaCliente";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FormOcorrenciaCliente />, div);
  ReactDOM.unmountComponentAtNode(div);
});
