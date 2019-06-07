import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import Loadable from "react-loadable";
import "./App.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchHabitation, fetchAllHabitations } from "./actions/habitationsAction";
import { fetchObjectSensor } from "./actions/objectSensorAction";
import { fetchHabitationSensor } from "./actions/habitationSensorAction";
import { fetchAllUsers } from "./actions/usersAction";


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
    this.props.fetchAllUsers();
    this.props.fetchAllHabitations();

    setInterval(() => {
      this.props.fetchHabitation(12);

      const fetchHabitationSensor = id => {
        this.props.fetchHabitationSensor(id);
      };
      const fetchObjectSensor = id => {
        this.props.fetchObjectSensor(id);
      };
      
      var refresh = setInterval(() => {
      var habitation = this.props.habitation;
      if (habitation.length > 0) {
        habitation.forEach(function(habitation) {
              fetchObjectSensor(21);
              fetchHabitationSensor(habitation.id);
          });
          clearInterval(refresh);
        }
      }, 250);
    }, 1000000000);
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
    habitations: state.habitations,
    habitation: state.habitation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchHabitation: bindActionCreators(fetchHabitation, dispatch),
    fetchObjectSensor: bindActionCreators(fetchObjectSensor, dispatch),
    fetchHabitationSensor: bindActionCreators(fetchHabitationSensor, dispatch),
    fetchAllUsers: bindActionCreators(fetchAllUsers, dispatch), 
    fetchAllHabitations: bindActionCreators(fetchAllHabitations, dispatch) 
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
