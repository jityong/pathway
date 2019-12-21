import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";


import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
export class PcDialog extends Component {
  state = {
    open: false
  };
  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };
  render() {
    const { onClose, selectedPC, ...other } = this.props;
    const { open } = this.state;
    const { clinic } = this.props;
    const handleToggle = () => {
      this.setState({
        open: !this.state.open
      });
    };
    function handleClose() {
      onClose(selectedPC);
    }

    function handleListItemClick(clinic, name) {
      onClose(clinic, name);
      handleToggle();
    }
    return (
      <div>
        <Button variant="outlined" fullWidth="true" onClick={this.handleToggle}>
          {clinic.Name}
        </Button>
        <Dialog open={open} onClose={handleToggle}>
          <DialogContent>
            Clinic Name: {clinic.Name} <hr /> 
            Address: {clinic.Address}{" "}
            Singapore {clinic.PostalCode}<hr /> 
            Telephone: {clinic.Tel} <hr /> 
            Distance:{" "}
            {parseFloat(clinic.distance).toFixed(2)}km away<hr />
            <Grid style={{ flexGrow: 1 }} direction="row">
              <Grid container justify="space-between">
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleListItemClick(clinic, clinic.Name)}
                  >
                    {" "}
                    Add to comparison{" "}
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

export default PcDialog;
