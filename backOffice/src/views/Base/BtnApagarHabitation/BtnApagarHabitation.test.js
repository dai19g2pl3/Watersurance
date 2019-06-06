import React from "react";
import ReactDOM from "react-dom";
import BtnApagarHabitation from "./BtnApagarHabitation";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BtnApagarHabitation />, div);
  ReactDOM.unmountComponentAtNode(div);
});
