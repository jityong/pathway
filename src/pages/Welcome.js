import React from "react";
import { Link } from "react-router-dom";
import "../style/App.css";
import { Typography, Button, Card, Grid } from "@material-ui/core";
//import Background from "./PathwayBG.png";
import homepage2 from "../images/homepage2.png";

//Login page, which is the first page user will see. Need to change background
//color to blue (whole page & considering responsive web design) for it to look good

//have to find the best orientation for the image and ensure that the button is centred when portrait
//and bottom half when landscape
function Welcome() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${homepage2})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}>
    <div style={{
      textAlign:"center",
      verticalAlign:"bottom",
      bottom:"0px"
    }}>
      <Link to="/Language">
        <Button variant="contained" color="secondary" size="large"
          style={{position:"absolute",
          top:"50%",
          left:"50%",
          transform: "translate(-50%,-50%)"
        }}>
          CONTINUE
        </Button>
      </Link>
    </div>
    </div>
  );
}

export default Welcome;
