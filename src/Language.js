import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import HelpOutline from "@material-ui/icons/HelpOutline";
import ArrowNext from "@material-ui/icons/NavigateNext";
import { Typography, Button, Card } from "@material-ui/core";
import Background from "./BackgroundFaded.png";

//Choose langauge, but all Buttons go to same place anyway. Could use some styling

function Language() {
  function handleAlert() {
    alert("Only English language is available currently.");
  }
  return (
    <div
      style={{
        minHeight:"100vh",
        backgroundImage: `url(${Background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
       
      }}
    >
      <AppBar position="static" style={{ backgroundColor: "#ff7c01" }}>
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <ArrowBack />
              <Typography variant="subtitle1">Back</Typography>
            </IconButton>{" "}
          </Link>
          <Typography variant="h5" align="center" style={{ flexGrow: 1 }}>
            LANGUAGE
          </Typography>
          <Link to="/Form" style={{ textDecoration: "none", color: "white" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleAlert}
            >
              <Typography variant="subtitle1" /> <HelpOutline />
            </IconButton>{" "}
          </Link>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <div style={{ textAlign: "center"}} >
        <Button
          variant="contained"
          style={{ backgroundColor: "#FF6565", borderRadius: "15px" }}
        >
          <Link to="/GeneralInfo">
            <span style={{ fontSize: "10vw", color: "black" }}>English</span>
          </Link>
        </Button>{" "}
      </div>
      <br />
      <div style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="default"
          style={{ borderRadius: "15px" }}
          onClick={handleAlert}
        >
          <Link to="/GeneralInfo">
            <span style={{ fontSize: "10vw", color: "black" }}>中文</span>
          </Link>
        </Button>{" "}
      </div>
      <br />
      <div style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="default"
          style={{ borderRadius: "15px" }}
          onClick={handleAlert}
        >
          <Link to="/GeneralInfo">
            <span style={{ fontSize: "10vw", color: "black" }}>
              Bahasa Melayu
            </span>
          </Link>
        </Button>{" "}
      </div>
      <br />
      <div style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="default"
          style={{ borderRadius: "15px" }}
          onClick={handleAlert}
        >
          <Link to="/GeneralInfo">
            <span style={{ fontSize: "10vw", color: "black" }}>Tamil</span>
          </Link>
        </Button>{" "}
      </div>
    </div>
  );
}

export default Language;
