import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="jumbotron">
    <h1>WaterSurance Administration</h1>
    <p>Contra inundaçoes nao ha preocupaçoes</p>
    <Link to="about" className="btn btn-primary btn-lg">
      Saber mais
    </Link>
  </div>
);

export default HomePage;
