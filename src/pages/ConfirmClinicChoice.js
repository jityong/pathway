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
  const priceRows = [
    createData(
      "Consultation Fee",
      userSubsidyType === "CHAS Blue" ? (
        <p>$12-15</p>
      ) : userSubsidyType === "CHAS Orange" ? (
        <p style={{ fontSize: "1em" }}>$12-15</p>

      ) : userSubsidyType === "PG" ? (
        <p style={{ fontSize: "1em" }}>$5-12</p>
      ) : userSubsidyType === "MG" ? (
        <p style={{ fontSize: "1em" }}>$5-12</p>


      ) : userSubsidyType === "CHAS Green" ? (
        <p style={{ fontSize: "1em" }}>$35-55</p>
      ) : (
        <p style={{ fontSize: "1em" }}>$35-55</p>
      ),
      userSubsidyType === "PG" && userAge > 65
        ? "$3.45"
        : userNationality === "Singaporean"
        ? userAge < 18 || userAge > 65
          ? "$6.90"
          : "$13.20"
        : userNationality === "Permanent Resident"
        ? "$32.70"
        : "$51.47"
    ),
    createData(
      <span style={{ color: "grey" }}>"Drugs & Tests Prices"</span>,
      <span style={{ color: "grey" }}>"Drugs & Tests Prices"</span>,
      <span style={{ color: "grey" }}>"Drugs & Tests Prices"</span>
    ),
    createData(
      "Metformin HCL 250MG ",
      userNationality === "Singaporean"
        ? userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
          ? "Capped at $.140/week or $0.025/tablet \n (whichever is cheaper)"
          : userSubsidyType === "PG"
          ? "Capped at $.140/week or $0.0125/tablet \n (whichever is cheaper)"
          : "Capped at $.140/week or $0.075/tablet \n (whichever is cheaper)"
        : "$0.10/tablet",
      userNationality === "Singaporean"
        ? userAge > 65
          ? userSubsidyType === "PG"
            ? "$0.70/week or $0.0125/tablet \n (whichever is cheaper)"
            : "$0.70/week or $0.10/tablet \n (whichever is cheaper)"
          : userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
          ? "Capped at $.140/week or $0.025/tablet \n (whichever is cheaper)"
          : "$0.075/tablet"
        : "$0.10/tablet"
    ),
    createData(
      "METFORMIN 500MG XR (GLUCOPHAGE XR)",
      "$0.25/tablet",
      "$0.25/tablet"
    ),
    createData(
      "Metformin HCL 500MG ",
      userNationality === "Singaporean"
        ? userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
          ? "Capped at $1.40/week or $0.03/tablet \n(whichever is cheaper)"
          : userSubsidyType === "PG"
          ? "Capped at $.140/week or $0.015/tablet \n(whichever is cheaper)"
          : "Capped at $.140/week or $0.09/tablet \n(whichever is cheaper)"
        : "$0.12/tablet",
      "-"
    ),
    createData(
      "Metformin HCL 850MG ",
      userNationality === "Singaporean"
        ? userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
          ? "Capped at $1.40/week or $0.03/tablet \n(whichever is cheaper)"
          : userSubsidyType === "PG"
          ? "Capped at $.140/week or $0.015/tablet \n(whichever is cheaper)"
          : "Capped at $.140/week or $0.09/tablet \n(whichever is cheaper)"
        : "$0.12/tablet",
      userNationality === "Singaporean"
        ? userAge > 65
          ? userSubsidyType === "PG"
            ? "$0.70/week or $0.015/tablet \n(whichever is cheaper)"
            : "$0.70/week or $0.12/tablet \n(whichever is cheaper)"
          : userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
          ? "Capped at $1.40/week or $0.03/tablet \n(whichever is cheaper)"
          : "$0.09/tablet"
        : "$0.12/tablet"
    ),

    createData(
      "Sulfonylureas (Glipizide)",
      "Metformin HCL 250MG ",
      userNationality === "Singaporean"
        ? userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
          ? "Capped at $.140/week or $0.025/tablet \n(whichever is cheaper)"
          : userSubsidyType === "PG"
          ? "Capped at $.140/week or $0.0125/tablet \n(whichever is cheaper)"
          : "Capped at $.140/week or $0.075/tablet \n(whichever is cheaper)"
        : "$0.10/tablet",
      userNationality === "Singaporean"
        ? userAge > 65
          ? userSubsidyType === "PG"
            ? "$0.70/week or $0.0125/tablet \n(whichever is cheaper)"
            : "$0.70/week or $0.10/tablet \n(whichever is cheaper)"
          : userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
          ? "Capped at $1.40/week or $0.025/tablet \n(whichever is cheaper)"
          : "$0.075/tablet"
        : "$0.10/tablet"
    ),
    createData(
      "DAPAGLIFLOZIN 10MG TAB (FORXIGA)",
      "$1.36/tablet",
      "$1.36/tablet"
    ),
    createData(
      "EMPAGLIFLOZIN 10MG TAB (JARDIANCE)",
      "$1.79/tablet",
      "$1.29/tablet"
    ),
    createData(
      "EMPAGLIFLOZIN 25MG TAB (JARDIANCE)",
      "$1.98/tablet",
      "$1.29/tablet"
    ),
    createData(
      "DPP-4(SITAGLIPTIN 100MG TAB (JANUVIA))",
      "$2.79/tablet",
      "$2.28/tablet"
    ),
    createData("DPP-4(SITAGLIPTIN 25MG TAB (JANUVIA))", "$2.76/tablet", "-"),
    createData(
      "DPP-4(SITAGLIPTIN 50MG TAB (JANUVIA))",
      "$2.79/tablet",
      "$2./tablet"
    ),
    createData(
      "DPP-4(LINAGLIPTIN 5MG TAB (TRAJENTA))",
      "$1.88/tablet",
      "$1.36/tablet"
    ),
    createData(
      "NovoMix insulin (Insulin Aspart) - NOVOMIX 30 FLEXPEN 3ML",
      userNationality === "Singaporean"
        ? userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
          ? "$1.08/val"
          : userSubsidyType === "PG"
          ? "$0.540/val"
          : "3.24/val"
        : "$8.63/val",
      "$19.6/pen"
    ),
    createData(
      "HbA1c",
      "$10/test",
      userNationality === "Singaporean" ? (
        <p style={{ fontSize: "1em" }}>
          HbA1c => $14.20/test
          <hr /> DM panel(HbA1c + renal panel, lipids, liver panel etc) <br />{" "}
          => capped at $21.70/test
        </p>
      ) : (
        <p style={{ fontSize: "1em" }}>
          HbA1c => $14.20/test
          <hr /> DM panel(HbA1c + renal panel, lipids, liver panel etc) =>
          $36.40/test
        </p>
      )
    ),
    createData(
      "Diabetic Nurse Consultation",
      userSubsidyType === "PG"
        ? "$5/session"
        : userSubsidyType === "MG"
        ? "$7/session"
        : userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
        ? "$9/session"
        : userSubsidyType === "CHAS Green"
        ? "$10/session"
        : "$10/session",
        //Newly added column for nationality, PR and Non-resident charges are for ....
      userNationality === "Permanent Resident"
        ? "$23/session"
        //lack of information
        : userNationality === "Singaporean"
        ? "$10/session"
        : "$40/session",
      "-"
    ),
    createData(
      "DRP - Diabetic Retinal Photography",
      userSubsidyType === "PG"
        ? "$5/session"
        : userSubsidyType === "MG"
        ? "$7/session"
        : userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
        ? "$9/session"
        : userSubsidyType === "CHAS Green"
        ? "$16/session"
        : "$16/session",

      userNationality === "Singaporean"//is subsidised SG-rean same as just indicating nationality?
        ? "$12.80/session"//still uses old data
        //using data from new column from NUHS
        : userNationality === "Permanent Resident"
        ? "$23/session"
        : "$40/session"
    ),
    createData(
      "DFS - Diabetic Foot Screening",
      userSubsidyType === "PG"
        ? "$5/session"
        : userSubsidyType === "MG"
        ? "$7/session"
        : userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
        ? "$9/session"
        : userSubsidyType === "CHAS Green"
        ? "$16/session"
        : "$16/session",

      userNationality === "Singaporean"//is subsidised SG-rean same as just indicating nationality?
        ? "$12.80/session"//still uses old data
        //using data from new column from NUHS
        : userNationality === "Permanent Resident"
        ? "$23/session"
        : "$40/session"
    ),

    createData(
      "DRP + DFS + 1 Nurse Visit",
      userSubsidyType === "PG"
        ? "$12/session"
        : userSubsidyType === "MG"
        ? "$18/session"
        : userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
        ? "$24/session"
        : userSubsidyType === "CHAS Green"
        ? "$40/session"
        : "$40/session"
    ),

    createData(
      "DRP + DFS + 2 Nurse Visit",
      userSubsidyType === "PG"
        ? "$14/session"
        : userSubsidyType === "MG"
        ? "$24/session"
        : userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
        ? "$30/session"
        : userSubsidyType === "CHAS Green"
        ? "$45/session"
        : "$45/session"
    ),

    createData(
      "DRP(or DFS) + 1 Nurse Visit",
      userSubsidyType === "PG"
        ? "$6/session"
        : userSubsidyType === "MG"
        ? "$10/session"
        : userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
        ? "$12/session"
        : userSubsidyType === "CHAS Green"
        ? "$20/session"
        : "$20/session"
    ),

    



  ];

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
