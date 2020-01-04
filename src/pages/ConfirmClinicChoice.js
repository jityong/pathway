import React, { useEffect, Component } from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Card } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import ArrowNext from "@material-ui/icons/NavigateNext";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import consultationPrices from "../data/consultationPrices";
import drugPrices from "../data/drugPrices";
import testPrices from "../data/testPrices";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 3)
  }
}));

const ConfirmClinicChoice = props => {
  const classes = useStyles();
  const { userNationality, userSubsidyType, userAge } = props;
  function goBack() {
    props.history.goBack();
  }
  const [choice, setChoice] = React.useState(props.location.state.choice);
  function createData(name, gp, pc) {
    return { name, gp, pc };
  }
  const consultationPriceRows = consultationPrices.consultation.map(function (data) {
    return createData(
        data.Description,
        userNationality === "SG"
            ? userSubsidyType === "PG"
            ? data.PCN_Price.PG
            : userSubsidyType === "MG"
                ? data.PCN_Price.MG
                : userSubsidyType === "CHAS Blue" || userSubsidyType === "CHAS Orange"
                    ? data.PCN_Price.BLUE_CHAS
                    : data.PCN_Price.NON_CHAS
            : data.PCN_Price.NON_RESIDENT,
        userNationality === "Singaporean"
            ? userSubsidyType === "PG"
            ? data.Polyclinic_Price.PG
            : userSubsidyType === "MG"
                ? data.Polyclinic_Price.MG
                : userAge < 18 || userAge > 65
                    ? data.Polyclinic_Price.SG_CHILD_ELDERLY
                    : data.Polyclinic_Price.SG_ADULT
            : userNationality === "Permanent Resident"
            ? data.Polyclinic_Price.PR
            : data.Polyclinic_Price.NON_RESIDENT
    )
  })
  const drugPriceRows = drugPrices.drugs.map(function (data) {
    return createData(
        data.Name + ": " + data.Description,
        userNationality === "Singaporean"
            ? userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
            ? data.PCN_Price.ORANGE_CHAS
            : userSubsidyType === "PG"
                ? data.PCN_Price.PG_CHAS
                : data.PCN_Price.NON_CHAS
            : data.PCN_Price.NON_SG,
        userNationality === "Singaporean"
            ? userAge > 65
            ? userSubsidyType === "PG"
                ? data.Polyclinic_Price.PG
                : userSubsidyType === "MG"
                    ? data.Polyclinic_Price.MG_above65
                    : data.Polyclinic_Price.noPG_above65
            : userSubsidyType === "MG"
                ? data.Polyclinic_Price.MG_below65
                : data.Polyclinic_Price.below65
            : data.Polyclinic_Price.nonSG
    )
  });
  const testPriceRows = testPrices.tests.map(function (data) {
        return createData(
            data.Name + ": " + data.Description,
            userNationality === "Singaporean"
                ? userSubsidyType === "PG"
                ? data.PCN_Price.PG
                : userSubsidyType === "MG"
                    ? data.PCN_Price.MG
                    : userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
                        ? data.PCN_Price.ORANGE_CHAS
                        : data.PCN_Price.Non_CHAS
                : userNationality === "Permanent Resident"
                ? data.PCN_Price.PR
                : data.PCN_Price.NON_RESIDENT,
            userNationality === "Singaporean"
                ? userAge < 18 || userAge > 65
                ? data.Polyclinic_Price.SG_CHILD_ELDERLY
                : data.Polyclinic_Price.SG
                : userNationality === "Permanent Resident"
                ? data.Polyclinic_Price.PR
                : data.Polyclinic_Price.NON_RESIDENT
        )
      }
  )
  const priceRows = consultationPriceRows.concat(drugPriceRows.concat(testPriceRows)).flatMap(function (data) {
    return data;
  });
  const result = (
    <Paper sqaure="false" className={classes.root}>
      {choice.type === "GP" ? (
        <Typography variant="body2" align="center" style={{ flexGrow: 1 }}>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            {choice.properties.HCI_NAME}
          </Typography>{" "}
          <br /> {choice.properties.BLK_HSE_NO}{" "}
          {choice.properties.STREET_NAME} #{choice.properties.FLOOR_NO}-
          {choice.properties.UNIT_NO} {choice.properties.BUILDING_NAME}{" "}
          Singapore {choice.properties.PostalCode}
          <br /> Telephone: {choice.properties.Tel} <br />
          <hr />
          <Typography variant="h6" style={{ fontWeight: "bolder" }}>
            Price breakdown:
          </Typography>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <span style={{ fontWeight: "bolder" }}>Description</span>
              </TableCell>
            </TableRow>
            {priceRows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  {choice.type === "GP" ? row.gp : row.pc}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Typography>
      ) : (
        <Typography variant="body1" align="center" style={{ flexGrow: 1 }}>
          {" "}
          Clinic Name: {choice.Name} <br /> Address: {choice.Address} Singapore{" "}
          {choice.PostalCode}
          <br /> Telephone: {choice.Tel} <br /> Distance:{" "}
          {parseFloat(choice.distance).toFixed(2)}km away
          <hr />
          <Typography variant="h6" style={{ fontWeight: "bolder" }}>
            Price breakdown:
          </Typography>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <span style={{ fontWeight: "bolder" }}>Description</span>
              </TableCell>
            </TableRow>
            {priceRows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">
                  {choice.type === "GP" ? row.gp : row.pc}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
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
            CONFIRM YOUR CHOICE
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
              Confirm
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ConfirmClinicChoice;
