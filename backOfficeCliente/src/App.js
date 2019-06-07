import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import Loadable from "react-loadable";
import "./App.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAllHabitations } from "./actions/habitationsAction";
import { fetchObjectSensor } from "./actions/objectSensorAction";
import { fetchHabitationSensor } from "./actions/habitationSensorAction";
import { fetchFirstTime } from "./actions/firstTimeAction";
import { fetchStartDate } from "./actions/startDateAction";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = Loadable({
  loader: () => import("./containers/DefaultLayout"),
  loading
});

const Page404 = Loadable({
  loader: () => import("./views/Pages/Page404"),
  loading
});

const Page500 = Loadable({
  loader: () => import("./views/Pages/Page500"),
  loading
});

class App extends Component {
  componentDidMount() {
    setInterval(() => {
      this.props.fetchAllHabitations();
      this.props.fetchStartDate();
      this.props.fetchFirstTime();

      const fetchHabitationSensor = id => {
        this.props.fetchHabitationSensor(id);
      };
      const fetchObjectSensor = id => {
        this.props.fetchObjectSensor(id);
      };
      var stop = 0;
      var refresh = setInterval(() => {
        var habitations = this.props.habitations;
        if (habitations.length > 0) {
          habitations.forEach(function(habitation) {
            if (stop === 0) {
              fetchObjectSensor(21);
              fetchHabitationSensor(habitation.id);
              stop = 1;
            }
          });
          clearInterval(refresh);
        }
      }, 250);
    }, 5000);
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </HashRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    habitations: state.habitations
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllHabitations: bindActionCreators(fetchAllHabitations, dispatch),
    fetchObjectSensor: bindActionCreators(fetchObjectSensor, dispatch),
    fetchHabitationSensor: bindActionCreators(fetchHabitationSensor, dispatch),
    fetchFirstTime: bindActionCreators(fetchFirstTime, dispatch),
    fetchStartDate: bindActionCreators(fetchStartDate, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
