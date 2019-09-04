import React, { useEffect, Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Typography, Button, Card } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import HelpOutline from "@material-ui/icons/HelpOutline";
import ArrowNext from "@material-ui/icons/NavigateNext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 3)
  }
}));
const SelectedChoice = props => {
  const classes = useStyles();
  function goBack() {
    props.history.goBack();
  }
  const [choice, setChoice] = React.useState(props.location.state.choice);

  const result = (
    <Paper sqaure="false" className={classes.root}>
      {choice.type === "GP" ? (
        <Typography variant="body2" align="center" style={{ flexGrow: 1 }}>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            {choice.properties.HCI_NAME}
          </Typography>{" "}
          <br /> Address: {choice.properties.BLK_HSE_NO}{" "}
          {choice.properties.STREET_NAME} #{choice.properties.FLOOR_NO}-
          {choice.properties.UNIT_NO} {choice.properties.BUILDING_NAME}{" "}
          Singapore {choice.properties.PostalCode}
          <br /> Telephone: {choice.properties.Tel} <br />
          Applicable subsidies:{" "}
          {choice.properties.CLINIC_PROGRAMME_CODE.join(", ")}
          <hr />
          <Typography variant="h6">Price breakdown:</Typography>
        </Typography>
      ) : (
        <Typography variant="body1" align="center" style={{ flexGrow: 1 }}>
          {" "}
          Clinic Name: {choice.Name} <br /> Address: {choice.Address} Singapore{" "}
          {choice.PostalCode}
          <br /> Telephone: {choice.Tel} <br /> Distance:{" "}
          {parseFloat(choice.distance).toFixed(2)}km away
          <hr />
          <Typography variant="h6">Price breakdown:</Typography>
        </Typography>
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
            SELECTED CHOICE
          </Typography>
          <Link
            to={{ pathname: "/ConfirmedChoice", state: { choice: choice } }}
            style={{ textDecoration: "none", color: "white" }}
          >
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Typography variant="subtitle1">Confirm</Typography> <ArrowNext />
            </IconButton>{" "}
          </Link>
        </Toolbar>
      </AppBar>
      {result}
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <Link to={{ pathname: "/ConfirmedChoice", state: { choice: choice } }}>
          <Button
            variant="contained"
            size="large"
            style={{ backgroundColor: "#ff7c01" }}
          >
            <span style={{ textDecoration: "none", color: "white" }}>
              Ok, Next
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SelectedChoice;
