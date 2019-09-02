import React, { Fragment } from "react";
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
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";


import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
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
  const [openTwo, setOpenTwo] = React.useState(false);
  const [gpOpen, setGpOpen] = React.useState(false);
  const [pcOpen, setPcOpen] = React.useState(false);
  const [tempClinic, setTempClinic] = React.useState();

  const [clinicOne, setClinicOne] = React.useState();
  const [clinicTwo, setClinicTwo] = React.useState();

  function handleClickOpen() {
    setOpen(true);
  }
  function handleClickOpenTwo() {
    setOpenTwo(true);
  }
  function handleClickClose() {
    setOpen(false);
  }
  function handleClickCloseTwo() {
    setOpenTwo(false);
  }

  const handleGPClose = (clinic, name) => {
    setOpen(false);
    clinic.price = "$$";
    clinic.rating = "4.3";
    clinic.type = "GP";
    clinic.name = name;
    if (!clinicOne) {
      setClinicOne(clinic);
    } else if (!clinicTwo) {
      setClinicTwo(clinic);
    } else {
      alert("Cannot compare more than 2 clinics");
    }
  };
  const handlePCClose = (clinic, name) => {
    setOpen(false);
    clinic.price = "$";
    clinic.rating = "4.0";
    clinic.name = name;
    clinic.type = "Polyclinic";
    setClinicTwo(clinic);
    if (!clinicOne) {
      setClinicOne(clinic);
    } else if (!clinicTwo) {
      setClinicTwo(clinic);
    } else {
      alert("Cannot compare more than 2 clinics");
    }
  };
  const handleClick = clinic => {
    // setTempClinic(clinic);
    console.log("THIS IS THE CLINIC" + clinic.name);
    if (clinic.type === "GP") {
      setGpOpen(true);
    } else {
      setPcOpen(true);
    }
  };
  const handleDeleteChipOne = () => {
    setClinicOne(null);
  };
  const handleDeleteChipTwo = () => {
    setClinicTwo(null);
  };

  return (
    <div className={classes.root}>
      {clinicOne && clinicOne.type === "GP" ? (
        <Fragment>
          <Chip
            label={clinicOne.name}
            clinic={clinicOne}
            onClick={handleClickOpen}
            onDelete={handleDeleteChipOne}
            color="primary"
          />
          <Dialog open={open} onClose={handleClickClose}>
          <DialogContent>
            Clinic Name: {clinicOne.properties.HCI_NAME} <hr /> Address:{" "}
            {clinicOne.properties.BLK_HSE_NO} {clinicOne.properties.STREET_NAME} #
            {clinicOne.properties.FLOOR_NO}-{clinicOne.properties.UNIT_NO}{" "}
            {clinicOne.properties.BUILDING_NAME} Singapore{" "}
            {clinicOne.properties.PostalCode}
            <hr /> Telephone: {clinicOne.properties.Tel} <hr />
            Applicable subsidies:{" "}
            {clinicOne.properties.CLINIC_PROGRAMME_CODE.join(", ")}
            <hr />
            Distance:
            {parseFloat(clinicOne.distance).toFixed(2)}km away
            <hr/>
            <Button>
                    <Link
                      to={{
                        pathname: "/selectedChoice",
                        state: {
                          choice: clinicOne
                        }
                      }}
                    >
                      <span>Select</span>
                    </Link>
                  </Button>
            </DialogContent>
            </Dialog>
        </Fragment>
      ) : clinicOne ? (
        <Fragment>
          <Chip
            label={clinicOne.name}
            clinic={clinicOne}
            onClick={handleClickOpen}
            onDelete={handleDeleteChipOne}
            color="secondary"
          />
          <Dialog open={open} onClose={handleClickClose}>
          <DialogContent>
            Clinic Name: {clinicOne.Name} <hr /> Address: {clinicOne.Address}{" "}
            Singapore {clinicOne.PostalCode}
            <hr /> Telephone: {clinicOne.Tel} <hr /> Distance:{" "}
            {parseFloat(clinicOne.distance).toFixed(2)}km away
            <hr />
            <Button>
                    <Link
                      to={{
                        pathname: "/selectedChoice",
                        state: {
                          choice: clinicOne
                        }
                      }}
                    >
                      <span>Select</span>
                    </Link>
                  </Button>
            </DialogContent>
            </Dialog>
        </Fragment>
      ) : (
        console.log("")
      )}
      {clinicTwo && clinicTwo.type === "Polyclinic" ? (
        <Fragment>
          <Chip
            label={clinicTwo.name}
            clinic={clinicTwo}
            onClick={handleClickOpenTwo}
            onDelete={handleDeleteChipTwo}
            color="secondary"
          />
          <br />
          <br />
          <Dialog open={openTwo} onClose={handleClickCloseTwo}>
          <DialogContent>
            Clinic Name: {clinicTwo.Name} <hr /> Address: {clinicTwo.Address}{" "}
            Singapore {clinicTwo.PostalCode}
            <hr /> Telephone: {clinicTwo.Tel} <hr /> Distance:{" "}
            {parseFloat(clinicTwo.distance).toFixed(2)}km away
            <hr />
            <Button>
                    <Link
                      to={{
                        pathname: "/selectedChoice",
                        state: {
                          choice: clinicTwo
                        }
                      }}
                    >
                      <span>Select</span>
                    </Link>
                  </Button>
            </DialogContent>
            </Dialog>
        </Fragment>
      ) : clinicTwo ? (
        <Fragment>
          <Chip
            label={clinicTwo.name}
            clinic={clinicTwo}
            onClick={handleClickOpenTwo}
            onDelete={handleDeleteChipTwo}
            color="primary"
          />
          <Dialog open={openTwo} onClose={handleClickCloseTwo}>
          <DialogContent>
            Clinic Name: {clinicTwo.properties.HCI_NAME} <hr /> Address:{" "}
            {clinicTwo.properties.BLK_HSE_NO} {clinicTwo.properties.STREET_NAME} #
            {clinicTwo.properties.FLOOR_NO}-{clinicTwo.properties.UNIT_NO}{" "}
            {clinicTwo.properties.BUILDING_NAME} Singapore{" "}
            {clinicTwo.properties.PostalCode}
            <hr /> Telephone: {clinicTwo.properties.Tel} <hr />
            Applicable subsidies:{" "}
            {clinicTwo.properties.CLINIC_PROGRAMME_CODE.join(", ")}
            <hr />
            Distance:
            {parseFloat(clinicTwo.distance).toFixed(2)}km away
            <hr/>
            <Button>
                    <Link
                      to={{
                        pathname: "/selectedChoice",
                        state: {
                          choice: clinicTwo
                        }
                      }}
                    >
                      <span>Select</span>
                    </Link>
                  </Button>
            </DialogContent>
            </Dialog>
          <br />
          <br />
        </Fragment>
      ) : (
        console.log("")
      )}
      {/* {tempClinic && tempClinic.type === "GP" ? (
          <GpDialog
            clinic={tempClinic}
            selectedGP={tempClinic}
            open={gpOpen}
            onClose={handleClick(tempClinic)}
          />
      ) : (tempClinic && tempClinic.type === "Polyclinic") ? (
          <PcDialog
            clinic={tempClinic}
            selectedPC={tempClinic}
            open={pcOpen}
            onClose={handleClick(tempClinic)}
          />
      ) : (
        <div />
      )} */}
      {clinicOne && clinicTwo ? (
        <Fragment>
          <Grid style={{ flexGrow: 1 }} direction="row">
            <Grid container justify="center">
              <CompareDialog
                clinicOne={clinicOne}
                clinicTwo={clinicTwo}
                formData={props.formData}
              />
            </Grid>
          </Grid>
          <hr />
        </Fragment>
      ) : (
        <div />
      )}
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
                  selectedGP={clinic}
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
                  selectedPC={clinic}
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
