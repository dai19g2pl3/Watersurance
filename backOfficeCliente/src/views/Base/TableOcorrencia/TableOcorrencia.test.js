import React from "react";
import ReactDOM from "react-dom";
import TableOcorrencia from "./TableOcorrencia";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TableOcorrencia />, div);
  ReactDOM.unmountComponentAtNode(div);
});
