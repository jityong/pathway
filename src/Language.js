import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import HelpOutline from "@material-ui/icons/HelpOutline";
import ArrowNext from "@material-ui/icons/NavigateNext";
import { Typography, Button, Card } from "@material-ui/core";



//Choose langauge, but all buttons go to same place anyway. Could use some styling

function Language() {

  function handleAlert(){
    alert("Only English language is available at this stage.")
  }
  return (
    <body className="languagePage">
      <div>
        <p style={{fontSize:"15vw", font:"Merriweather"}}> LANGUAGE </p>
        <div>
          <button style={{ backgroundColor: "#FF6565", borderRadius: "15px" }}>
            <Link to="/GeneralInfo">
              <span style={{ fontSize: "10vw", color: "black" }}>English</span>
            </Link>
          </button>{" "}
        </div>
        <br />
        <div>
          <button style={{ backgroundColor: "#FD9535", borderRadius: "15px" }} onClick={handleAlert}>
            <Link to="/GeneralInfo">
              <span style={{ fontSize: "10vw", color: "black" }}>中文</span>
            </Link>
          </button>{" "}
        </div>
        <br />
        <div>
          <button style={{ backgroundColor: "#9CE939", borderRadius: "15px" }} onClick={handleAlert}>
            <Link to="/GeneralInfo">
              <span style={{ fontSize: "10vw", color: "black" }}>
                Bahasa Melayu
              </span>
            </Link>
          </button>{" "}
        </div>
        <br />
        <div>
          <button style={{ backgroundColor: "#9CE939", borderRadius: "15px" }} onClick={handleAlert}>
            <Link to="/GeneralInfo">
              <span style={{ fontSize: "10vw", color: "black" }}>Tamil</span>
            </Link>
          </button>{" "}
        </div>
      </div>
    </body>
  );
}

export default Language;