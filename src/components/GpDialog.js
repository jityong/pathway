import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import { Link, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";


import {
  DialogContent,
} from "@material-ui/core";

//Displays the GP dialog when clicked in the list of GPs within resultTab.
// // FilteredResult --> ResultTabs --> GpDialog
export class GpDialog extends Component {
  state = {
    open: false,
    redirectTo: null
  };
  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };



  render() {

    const { onClose, selectedGP, ...other } = this.props;
    const { open } = this.state;
    const { clinic } = this.props;
    const handleToggle = () => {
      this.setState({
        open: !this.state.open
      });
    };

    function handleClose() {
      onClose(selectedGP);
    }

    function handleListItemClick(clinic, name) {
      onClose(clinic, name);
      handleToggle();
    }



    if (this.state.redirectTo) {
      return (
        <Redirect to={this.state.redirectTo} />
      );
    }

    return (
      <div>
        <Button variant="outlined" fullWidth="true" onClick={this.handleToggle}>
          {clinic.properties.HCI_NAME}
        </Button>
        <Dialog open={open} onClose={handleToggle}>
          <DialogContent>
            <img
              src={
                process.env.PUBLIC_URL +
                `/ClinicPictures/${clinic.properties.FILE_NAME}.png`
              }
              alt="clinic picture"
              style={{ width: "100%" }}
            />
            <hr />
            <span style={{fontWeight:"bold"}}>{clinic.properties.HCI_NAME} </span> {/*Clinic Name*/}
            <br/>
            {parseFloat(clinic.distance).toFixed(2)}km away {/*Distance*/}
            <hr />
            <span style={{fontWeight: "bold"}}>{clinic.properties.DR_NAME} {/*Doctor Name*/} </span>
            <br/>
            <br />
            <span style={{fontWeight: "bold"}}>Telephone: </span>
            <br/>
            {clinic.properties.Tel} <br />
            <hr />
            <span style={{fontWeight:"bold"}}>Opening Hours:</span>
            <br/>
            {clinic.properties.ALL_OPENING_HOURS.map(period => (
              <p>
                {period.day_string}
                <br />
                {period.opening_hours.join(", ")}
              </p>
            ))}
            <hr />
            <span style={{fontWeight:"bold"}}>Address: </span><br/>
            {clinic.properties.BLK_HSE_NO} {clinic.properties.STREET_NAME} #
            {clinic.properties.FLOOR_NO}-{clinic.properties.UNIT_NO}{" "}
            {clinic.properties.BUILDING_NAME} Singapore{" "}
            {clinic.properties.PostalCode}
            <hr/>
            <p style={{fontWeight: "bold"}}>Directions:</p>
            {clinic.properties.ALL_DIRECTIONS.map(path => (
              <p>
                {path.transport_string}
                <br />
                {path.directions.join(", ")}
              </p>
            ))}
            <hr />
            <Grid style={{ flexGrow: 1 }} direction="column">
              <Grid container justify="space-evenly">
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleListItemClick(clinic, clinic.properties.HCI_NAME)
                    }
                  >
                    <span style={{ color: "white" }}>Add to comparison</span>
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#ff7c01" }}
                    onClick={this.handleCompare}
                  >
                    <Link
                      to={{
                        pathname: "/ConfirmClinicChoice",
                        state: {
                          choice: clinic,
                          formData: this.props.formData
                        }
                      }}
                    >
                      <span style={{ color: "white" }}>Select</span>
                    </Link>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default GpDialog;