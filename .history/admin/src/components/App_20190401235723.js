import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeAdmin from "./home/HomeAdmin";
import Header from "./common/Header.js";
import PageNotFound from "./PageNotFound.js";
import Footer from "./common/Footer.js";
import "./styles.css";
import SideBar from "./common/SideBar.js";

function App() {
  return (
    <div className="container-fluid" id="app">
      <div id="app-header">
        {" "}
        <Header />{" "}
      </div>
      <div id="app-body">
        <div id="app-sidebar">
          <SideBar />
        </div>
        <div id="app-main">
          <Switch>
            <Route exact path="/" component={HomeAdmin} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
      <div id="app-footer">
        <Footer />
      </div>
    </div>
  );
}
export default App;
