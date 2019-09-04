import React, { Component } from "react";
import FamMedRoute from "./DischargeRoutes/FamMedRoute.png";
import GpRoute from "./DischargeRoutes/GpRoute.png";
import PCRoute from "./DischargeRoutes/PolyclinicRoute.png";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import HelpOutline from "@material-ui/icons/HelpOutline";
import ArrowNext from "@material-ui/icons/NavigateNext";
import { Typography, Button, Card } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 3)
  }
}));
export const ConfirmedChoice = props => {
  const classes = useStyles();

  function goBack() {
    props.history.goBack();
  }
  const { choice } = props.location.state;
  const result = (
    <Paper
      sqaure="false"
      className={classes.root}
      style={{ fontWeight: "bold" }}
    >
      {choice.type === "GP" ? (
        <Paper sqaure="false" className={classes.root}>
          {choice.properties.HCI_NAME}: <br />
          Address: {choice.properties.BLK_HSE_NO}{" "}
          {choice.properties.STREET_NAME} #{choice.properties.FLOOR_NO}-
          {choice.properties.UNIT_NO} {choice.properties.BUILDING_NAME}{" "}
          Singapore {choice.properties.PostalCode}
          <br /> Telephone: {choice.properties.Tel} <br />
          <hr />
          <span> Referral flowchart of your healthcare journey so far:</span>
          <img src={GpRoute} alt="gp route" style={{ width: "100%" }} />
        </Paper>
      ) : (
        <div>
          {choice.Name}: <br />
          Address: {choice.Address} Singapore {choice.PostalCode}
          <br /> Telephone: {choice.Tel} <br /> Distance:{" "}
          {parseFloat(choice.distance).toFixed(2)}km away
          <hr />
          <span>Referral flowchart of your healthcare journey so far:</span>
          <img src={PCRoute} alt="pc route" style={{ width: "100%" }} />
        </div>
      )}
    </Paper>
  );

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#ff7c01" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={goBack}
          >
            <ArrowBack />
            <Typography variant="subtitle1">Back</Typography>
          </IconButton>{" "}
          <Typography variant="h5" align="center" style={{ flexGrow: 1 }}>
            Summary
          </Typography>
              <Typography variant="subtitle1"><span style={{color:"#ff7c01"}}>----------------</span></Typography>
        </Toolbar>
      </AppBar>
      <br />
      <br />

      <Typography variant="button" align="center">
        Thank you, the details of your selected clinic for your follow-up
        treatment are as follows:
        <br />
        {result}
        <br />
      </Typography>

      <div style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: "#ff7c01" }}
        >
          {" "}
          <span style={{ textDecoration: "none", color: "white" }}>
            Send to my email{" "}
          </span>
        </Button>
      </div>
      <br />
      <br />
      <br />
      <hr />
      <Typography variant="caption" align="center">
        {" "}
        All information quoted above belongs to MOHT (MOH), NUHS Primary Care
        Department, the Primary Care Network, Data.gov.sg and the Pathway team. Please direct
        any queries to pathway@u.nus.edu. We will like to thank Professor Daphne
        Yee, the NUHS Primary Care Department led by Professor Doris Young, and
        Professor David S. Rosenblum for their unwavering support and insightful
        perspectives.
      </Typography>
    </div>
  );
};

export default ConfirmedChoice;
