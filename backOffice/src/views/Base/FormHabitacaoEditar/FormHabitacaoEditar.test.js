import React from "react";
import ReactDOM from "react-dom";
import FormHabitacaoEditar from "./FormHabitacaoEditar";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FormHabitacaoEditar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
