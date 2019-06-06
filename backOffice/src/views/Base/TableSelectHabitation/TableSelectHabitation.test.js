import React from "react";
import ReactDOM from "react-dom";
import TableSelectHabitation from "./TableSelectHabitation";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TableSelectHabitation />, div);
  ReactDOM.unmountComponentAtNode(div);
});
