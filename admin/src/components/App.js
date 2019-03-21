import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header.js";
import PageNotFound from "./PageNotFound.js";
import AdminPage from "./admins/AdminPage.js";
function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/admin" component={AdminPage} />
        <Route compnonent={PageNotFound} />
      </Switch>
    </div>
  );
}
export default App;
