import React from "react";
import ReactDOM from "react-dom";
import TableHabitation from "./TableHabitation";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TableHabitation />, div);
  ReactDOM.unmountComponentAtNode(div);
});
