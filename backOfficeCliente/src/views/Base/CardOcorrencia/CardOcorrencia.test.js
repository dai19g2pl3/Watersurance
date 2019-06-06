import React from "react";
import ReactDOM from "react-dom";
import CardOcorrencia from "./CardOcorrencia";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CardOcorrencia />, div);
  ReactDOM.unmountComponentAtNode(div);
});
