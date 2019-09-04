import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CompareDialog from "./CompareDialog";

import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  }
}));

const CompareBlock = props => {
  const classes = useStyles();
  const theme = useTheme();

  const [clinicOne, setClinicOne] = React.useState();
  const [clinicTwo, setClinicTwo] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [openTwo, setOpenTwo] = React.useState(false);
  
  useEffect(() => {
    setClinicOne(props.clinicOne);
    setClinicTwo(props.clinicTwo);
  });

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
  return (
    <div className={classes.root}>
      {clinicOne && clinicOne.type === "GP" ? (
        <Fragment>
          <Chip
            label={clinicOne.name}
            clinic={clinicOne}
            onClick={handleClickOpen}
            onDelete={props.callbackDeleteOne}
            color="primary"
          />
          <Dialog open={open} onClose={handleClickClose}>
            <DialogContent>
              Clinic Name: {clinicOne.properties.HCI_NAME} <hr /> Address:{" "}
              {clinicOne.properties.BLK_HSE_NO}{" "}
              {clinicOne.properties.STREET_NAME} #
              {clinicOne.properties.FLOOR_NO}-{clinicOne.properties.UNIT_NO}{" "}
              {clinicOne.properties.BUILDING_NAME} Singapore{" "}
              {clinicOne.properties.PostalCode}
              <hr /> Telephone: {clinicOne.properties.Tel} <hr />
              Applicable subsidies:{" "}
              {clinicOne.properties.CLINIC_PROGRAMME_CODE.join(", ")}
              <hr />
              Distance:
              {parseFloat(clinicOne.distance).toFixed(2)}km away
              <hr />
              <Button>
                <Link
                  to={{
                    pathname: "/SelectedChoice",
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
            onDelete={props.callbackDeleteOne}
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
                    pathname: "/SelectedChoice",
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
            onDelete={props.callbackDeleteTwo}
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
                    pathname: "/SelectedChoice",
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
            onDelete={props.callbackDeleteTwo}
            color="primary"
          />
          <Dialog open={openTwo} onClose={handleClickCloseTwo}>
            <DialogContent>
              Clinic Name: {clinicTwo.properties.HCI_NAME} <hr /> Address:{" "}
              {clinicTwo.properties.BLK_HSE_NO}{" "}
              {clinicTwo.properties.STREET_NAME} #
              {clinicTwo.properties.FLOOR_NO}-{clinicTwo.properties.UNIT_NO}{" "}
              {clinicTwo.properties.BUILDING_NAME} Singapore{" "}
              {clinicTwo.properties.PostalCode}
              <hr /> Telephone: {clinicTwo.properties.Tel} <hr />
              Applicable subsidies:{" "}
              {clinicTwo.properties.CLINIC_PROGRAMME_CODE.join(", ")}
              <hr />
              Distance:
              {parseFloat(clinicTwo.distance).toFixed(2)}km away
              <hr />
              <Button>
                <Link
                  to={{
                    pathname: "/SelectedChoice",
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
    </div>
  );
};
export default CompareBlock;