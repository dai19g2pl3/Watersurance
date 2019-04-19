import React from "react";
import { Link } from "react-router-dom";

const HomeAdmin = () => (
  <div className="jumbotron">
    <h1>WaterSurance Administration</h1>
    <p>Contra inundaçoes nao ha preocupaçoes</p>
    <Link to="/errpr" className="btn btn-primary btn-lg">
      Saber menos
    </Link>
  </div>
);

export default HomeAdmin;
