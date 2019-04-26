import React from "react";
import ReactDOM from "react-dom";
import FormOcorrencia from "./FormOcorrencia";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FormOcorrencia />, div);
  ReactDOM.unmountComponentAtNode(div);
});
