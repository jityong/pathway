import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import selectedChoice from "./selectedChoice"

import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

export class CompareDialog extends Component {
  state = {
    open: false
  };
  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    const { open } = this.state;
    const { GP, PC } = this.props;
    const handleToggle = () => {
      this.setState({
        open: !this.state.open
      });
    };
    return GP === null || PC === null ? (
      "Please select 1 GP and 1 Polyclinic"
    ) : (
      <div>
        <button onClick={this.handleToggle}>Compare!</button>
        <Dialog open={open} onClose={handleToggle}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item>
                <Grid container justify="center" spacing={2}>
                  <Grid item>
                    Clinic Name: {GP.properties.HCI_NAME} <hr />
                    Distance:
                    {parseFloat(GP.distance).toFixed(2)}km away
                    <hr />
                    Price: $$ Rating: 4.5
                    <hr />
                    <button>
                      <Link
                        to={{
                          pathname: "/selectedChoice",
                          state: {
                            choice: GP
                          }
                        }}
                      >
                      <span>Select</span> 
                      </Link>
                    </button>
                  </Grid>
                  <Grid item>
                    Polyclinic Name: {PC.Name} <hr />
                    Distance:
                    {parseFloat(PC.distance).toFixed(2)}km away
                    <hr />
                    Price: $ Rating: 4
                    <hr />
                    <button>
                      <Link
                        to={{
                          pathname: "/selectedChoice",
                          state: {
                            choice: PC
                          }
                        }}
                      >
                      <span>Select</span>
                      </Link>
                    </button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default CompareDialog;
