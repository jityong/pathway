import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import selectedChoice from "./selectedChoice";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";

import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { maxWidth } from "@material-ui/system";

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
        <Button variant="contained" color="primary" onClick={this.handleToggle}>
          Compare!
        </Button>
        <Dialog open={open} onClose={handleToggle} maxWidth="lg">
          <DialogContent>
            <Grid style={{ flexGrow: 1 }} direction="row">
              <Grid container justify="center" spacing={2}>
                <Grid item>
                  Clinic Name: {GP.properties.HCI_NAME} <hr />
                  Distance:
                  {parseFloat(GP.distance).toFixed(2)}km away
                  <hr />
                  Price: $$ 
                  <hr />
                  Rating: 4.5
                  <hr />
                  <Button variant="contained" color="secondary">
                    <Link
                      to={{
                        pathname: "/selectedChoice",
                        state: {
                          choice: GP
                        }
                      }}
                    >
                      <span style={{ color: "white" }}>Select</span>
                    </Link>
                  </Button>
                </Grid>
                <Grid item>
                  Polyclinic Name: {PC.Name} <hr />
                  Distance:
                  {parseFloat(PC.distance).toFixed(2)}km away
                  <hr />
                  Price: $ <hr/>
                  Rating: 4
                  <hr />
                  <Button variant="contained" color="secondary">
                    <Link
                      to={{
                        pathname: "/selectedChoice",
                        state: {
                          choice: PC
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

export default CompareDialog;
