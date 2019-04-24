import React from "react";
import ReactDOM from "react-dom";
import FormAddUser from "./FormAddUser";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FormAddUser />, div);
  ReactDOM.unmountComponentAtNode(div);
});
