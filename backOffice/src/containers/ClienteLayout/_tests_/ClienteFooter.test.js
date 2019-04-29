import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import ClienteFooter from "../ClienteFooter";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <ClienteFooter />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
