import React, { useEffect, Fragment } from "react";
import { makeStyles
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CompareDialog from "./CompareDialog";

import {
  DialogContent
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  }
}));
// Displays the selected clinics tabs for comparison at the top in the FilteredResult page. Used by ResultsTab.
// Allows for the tabs to be clicked on and display clinic information.
// FilteredResult --> ResultsTab --> CompareBlock
const CompareBlock = props => {
  const classes = useStyles();
  const [clinicOne, setClinicOne] = React.useState();
  const [clinicTwo, setClinicTwo] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [openTwo, setOpenTwo] = React.useState(false);

  useEffect(() => {
    setClinicOne(props.clinicOne);
    setClinicTwo(props.clinicTwo);
  },[props.clinicOne, props.clinicTwo]);

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
              <img
                src={
                  process.env.PUBLIC_URL +
                  `/ClinicPictures/${clinicOne.properties.FILE_NAME}.png`
                }
                alt="clinic"
                style={{ width: "100%" }}
              />
              <hr />
              <span style={{fontWeight:"bold"}}>{clinicOne.properties.HCI_NAME} </span> {/*clinicOne Name*/}
              <br/>
              {parseFloat(clinicOne.distance).toFixed(2)}km away {/*Distance*/}
              <hr />
              <span style={{fontWeight: "bold"}}>{clinicOne.properties.DR_NAME} {/*Doctor Name*/} </span>
              <br/>
              <br />
              <span style={{fontWeight: "bold"}}>Telephone: </span>
              <br/>
              {clinicOne.properties.Tel} <br />
              <hr />
              <span style={{fontWeight:"bold"}}>Opening Hours:</span>
              <br/>
              {clinicOne.properties.ALL_OPENING_HOURS.map(period => (
                  <p>
                    {period.day_string}
                    <br />
                    {period.opening_hours.join(", ")}
                  </p>
              ))}
              <hr />
              <span style={{fontWeight:"bold"}}>Address: </span><br/>
              {clinicOne.properties.BLK_HSE_NO} {clinicOne.properties.STREET_NAME} #
              {clinicOne.properties.FLOOR_NO}-{clinicOne.properties.UNIT_NO}{" "}
              {clinicOne.properties.BUILDING_NAME} Singapore{" "}
              {clinicOne.properties.PostalCode}
              <hr/>
              <p style={{fontWeight: "bold"}}>Directions:</p>
              {clinicOne.properties.ALL_DIRECTIONS.map(path => (
                  <p>
                    {path.transport_string}
                    <br />
                    {path.directions.join(", ")}
                  </p>
              ))}
              <hr />
              <Link
                to={{
                  pathname: "/ConfirmClinicChoice",
                  state: {
                    choice: clinicOne,
                    formData: props.formData
                  }
                }}
              >
                <Button size="large" style={{ backgroundColor: "#ff7c01" }}>
                  <span style={{ textDecoration: "none", color: "white" }}>
                    Select
                  </span>
                </Button>
              </Link>
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
              <span style={{fontWeight:"bold"}}>{clinicOne.Name} <br /> {/*clinicOne Name*/}</span>
              {parseFloat(clinicOne.distance).toFixed(2)}km away {/*Distance*/}
              <hr />

              Telephone: {clinicOne.Tel}
              <hr />

              <span style={{fontWeight:"bold"}}>Opening Hours:</span>
              <br/>
              {clinicOne.ALL_OPENING_HOURS.map(period => (
                  <p>
                    {period.day_string}
                    <br />
                    {period.opening_hours.join(", ")}
                  </p>
              ))}

              <hr/>
              <span style={{fontWeight:"bold"}}>Address: </span>
              <br/>
              {clinicOne.Address}{" "}
              Singapore {clinicOne.PostalCode}
              <hr />

              <span style={{fontWeight:"bold"}}>Directions:</span>
              <br/>
              {clinicOne.ALL_DIRECTIONS.map(path => (
                  <p>
                    {path.transport_string}
                    <br />
                    {path.directions.join(", ")}
                  </p>
              ))}
              <hr />
              <Link
                to={{
                  pathname: "/ConfirmClinicChoice",
                  state: {
                    choice: clinicOne,
                    formData: props.formData
                  }
                }}
              >
                <Button size="large" style={{ backgroundColor: "#ff7c01" }}>
                  <span style={{ textDecoration: "none", color: "white" }}>
                    Select
                  </span>
                </Button>
              </Link>
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
              <span style={{fontWeight:"bold"}}>{clinicTwo.Name} <br /> {/*Clinic Name*/}</span>
              {parseFloat(clinicTwo.distance).toFixed(2)}km away {/*Distance*/}
              <hr />

              Telephone: {clinicTwo.Tel}
              <hr />

              <span style={{fontWeight:"bold"}}>Opening Hours:</span>
              <br/>
              {clinicTwo.ALL_OPENING_HOURS.map(period => (
                  <p>
                    {period.day_string}
                    <br />
                    {period.opening_hours.join(", ")}
                  </p>
              ))}

              <hr/>
              <span style={{fontWeight:"bold"}}>Address: </span>
              <br/>
              {clinicTwo.Address}{" "}
              Singapore {clinicTwo.PostalCode}
              <hr />

              <span style={{fontWeight:"bold"}}>Directions:</span>
              <br/>
              {clinicTwo.ALL_DIRECTIONS.map(path => (
                  <p>
                    {path.transport_string}
                    <br />
                    {path.directions.join(", ")}
                  </p>
              ))}
              <hr />


              
              <Link
                to={{
                  pathname: "/ConfirmClinicChoice",
                  state: {
                    choice: clinicTwo,
                    formData: props.formData
                  }
                }}
              >
                <Button size="large" style={{ backgroundColor: "#ff7c01" }}>
                  <span style={{ textDecoration: "none", color: "white" }}>
                    Select
                  </span>
                </Button>
              </Link>
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
              <img
                src={
                  process.env.PUBLIC_URL +
                  `/ClinicPictures/${clinicTwo.properties.FILE_NAME}.png`
                }
                alt="clinic"
                style={{ width: "100%" }}
              />
              <hr />
              <span style={{fontWeight:"bold"}}>{clinicTwo.properties.HCI_NAME} </span> {/*Clinic Name*/}
              <br/>
              {parseFloat(clinicTwo.distance).toFixed(2)}km away {/*Distance*/}
              <hr />
              <span style={{fontWeight: "bold"}}>{clinicTwo.properties.DR_NAME} {/*Doctor Name*/} </span>
              <br/>
              <br />
              <span style={{fontWeight: "bold"}}>Telephone: </span>
              <br/>
              {clinicTwo.properties.Tel} <br />
              <hr />
              <span style={{fontWeight:"bold"}}>Opening Hours:</span>
              <br/>
              {clinicTwo.properties.ALL_OPENING_HOURS.map(period => (
                  <p>
                    {period.day_string}
                    <br />
                    {period.opening_hours.join(", ")}
                  </p>
              ))}
              <hr />
              <span style={{fontWeight:"bold"}}>Address: </span><br/>
              {clinicTwo.properties.BLK_HSE_NO} {clinicTwo.properties.STREET_NAME} #
              {clinicTwo.properties.FLOOR_NO}-{clinicTwo.properties.UNIT_NO}{" "}
              {clinicTwo.properties.BUILDING_NAME} Singapore{" "}
              {clinicTwo.properties.PostalCode}
              <hr/>
              <p style={{fontWeight: "bold"}}>Directions:</p>
              {clinicTwo.properties.ALL_DIRECTIONS.map(path => (
                  <p>
                    {path.transport_string}
                    <br />
                    {path.directions.join(", ")}
                  </p>
              ))}
              <hr />


              <Link
                to={{
                  pathname: "/ConfirmClinicChoice",
                  state: {
                    choice: clinicTwo,
                    userNationality: props.formData.userNationality,
                    userSubsidyType: props.formData.userSubsidyType,
                    userAge: props.formData.userAge
                  }
                }}
              >
                <Button size="large" style={{ backgroundColor: "#ff7c01" }}>
                  <span style={{ textDecoration: "none", color: "white" }}>
                    Select
                  </span>
                </Button>
              </Link>
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
