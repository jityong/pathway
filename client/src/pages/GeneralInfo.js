import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import infographics from "../images/infographics.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import ArrowNext from "@material-ui/icons/NavigateNext";
//haven't included any info here, can do styling for RWD(responsive web design)
function GeneralInfo() {

  return (
    <div >
      <AppBar position="static" style={{ backgroundColor: "#ff7c01" }}>
        <Toolbar>
        <Link to="/Language" style={{ textDecoration: "none", color: "white" }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <ArrowBack />
            <Typography variant="subtitle1">Back</Typography>
          </IconButton>{" "}
          </Link>
          <Typography variant="h5" align="center" style={{ flexGrow: 1 }}>
            GENERAL INFORMATION
          </Typography>
          <Link to="/Form" style={{ textDecoration: "none", color: "white" }}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Typography variant="subtitle1">Next</Typography> <ArrowNext />
            </IconButton>{" "}
          </Link>
        </Toolbar>
      </AppBar>
      <Fragment>
        <img src={infographics} alt="infographics" style={{ width: "100%" }} />
      </Fragment>
      <Link to="/Form">
        <div style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            size="large"
            style={{ backgroundColor: "#ff7c01" }}
          >
            <span style={{ textDecoration: "none", color: "white" }}>
              Ok, Next
            </span>
          </Button>
        </div>
      </Link>{" "}
    </div>
  );
}
export default GeneralInfo;
