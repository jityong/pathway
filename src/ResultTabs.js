import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
// import MyMap from "./myMap";
import TestMap from "./TestMap";
import PcDialog from "./PcDialog";
import GpDialog from "./GpDialog";
// import { display } from "@material-ui/system";
import CompareDialog from "./CompareDialog";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  }
}));

const ResultTabs = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [state, setState] = React.useState({
    sortByLoc: true
  });

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  const [open, setOpen] = React.useState(false);
  const [selectedGP, setSelectedGP] = React.useState({
    properties: { HCI_NAME: "Please Choose a GP" },
    distance: "x",
    price: "x",
    rating: "x"
  });
  const [selectedPC, setSelectedPC] = React.useState({
    Name: "Please choose a Polyclinic",
    distance: "x",
    price: "x",
    rating: "x"
  });
  const [GPName, setGPName] = React.useState("none");
  const [PCName, setPCName] = React.useState("none");

  function handleClickOpen() {
    setOpen(true);
  }

  const handleGPClose = (clinic, name) => {
    setOpen(false);
    clinic.price = "$$";
    clinic.rating = "4.3";
    setSelectedGP(clinic);
    setGPName(name);
  };
  const handlePCClose = (clinic, name) => {
    setOpen(false);
    clinic.price = "$";
    clinic.rating = "4.0";
    setSelectedPC(clinic);
    setPCName(name);
  };

  return (
    <div className={classes.root}>
      <Grid style={{ flexGrow: 1 }} direction="row">
        <Grid container justify="space-evenly">
          <Grid item>Selected GP: {GPName}</Grid>
          <Grid item>
            <p style={{ fontSize: "1em" }}>Selected PolyClinic: {PCName}</p>
            {/* {console.log(selectedGP)} */}
          </Grid>
        </Grid>
      </Grid>
      <Grid style={{ flexGrow: 1 }} direction="row">
        <Grid container justify="center">
          <CompareDialog
            GP={selectedGP}
            PC={selectedPC}
            formData={props.formData}
          />
        </Grid>
      </Grid>
      <hr />
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="GP" />
          <Tab label="Polyclinic" />
          <Tab label="Map View" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabContainer dir={theme.direction}>
          {props.GP.map(clinic => {
            return (
              <div key={clinic.properties.id}>
                <GpDialog
                  clinic={clinic}
                  selectedGP={selectedGP}
                  open={open}
                  onClose={handleGPClose}
                />
                <hr />
              </div>
            );
          })}
        </TabContainer>
        <TabContainer dir={theme.direction}>
          {props.PC.map(clinic => {
            return (
              <div key={clinic.id}>
                <PcDialog
                  clinic={clinic}
                  selectedPC={selectedGP}
                  open={open}
                  onClose={handlePCClose}
                />

                <hr />
              </div>
            );
          })}
        </TabContainer>
        <TabContainer dir={theme.direction}>
          {props.currentLoc[0] !== 0 && (
            <TestMap coord={props.currentLoc} GP={props.GP} PC={props.PC} />
          )}
        </TabContainer>
      </SwipeableViews>
    </div>
  );
};

export default ResultTabs;
