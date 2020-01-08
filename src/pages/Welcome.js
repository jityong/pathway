import React, {Fragment} from "react";
import { Link } from "react-router-dom";
import "../style/App.css";
import { Typography, Button, Card, Grid } from "@material-ui/core";
//import Background from "./PathwayBG.png";
import homepageLogo from "../images/homepageLogo.png";

//Login page, which is the first page user will see. Need to change background
//color to blue (whole page & considering responsive web design) for it to look good

//have to find the best orientation for the image and ensure that the button is centred when portrait
//and bottom half when landscape
function Welcome() {
  return (
    <body
      style={{
          backgroundColor: "#ff7c01"
      }}>
    <div>
        <img src={homepageLogo} alt="homepageLogo" class="center" />

    </div>
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
    </body>
  );
}

export default Welcome;
