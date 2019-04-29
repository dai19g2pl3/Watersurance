import React from "react";
import ReactDOM from "react-dom";
import FormHabitacao from "./FormHabitacao";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FormHabitacao />, div);
  ReactDOM.unmountComponentAtNode(div);
});
