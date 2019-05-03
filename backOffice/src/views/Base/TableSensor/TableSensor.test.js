import React from "react";
import ReactDOM from "react-dom";
import TableSensor from "./TableSensor";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TableSensor />, div);
  ReactDOM.unmountComponentAtNode(div);
});
