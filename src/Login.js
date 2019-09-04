import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Fancyline from "./Fancylines";
import lock from "./lock.png";
import { Typography, Button, Card, Grid } from "@material-ui/core";
import Background from "./PathwayBG.png";
//Login page, which is the first page user will see. Need to change background
//color to blue (whole page & considering responsive web design) for it to look good

function Login() {
  return (
    <div
      style={{
        textAlign:"center",
        minHeight: "100vh",
        backgroundImage: `url(${Background})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >
    <div style={{display:"flex" ,alignItems:"flexEnd"}}>
      <Link to="/Language">
        <Button variant="contained" color="secondary" size="large">
          CONTINUE
        </Button>
      </Link>
    </div>
    </div>
  );
}

export default Login;
