import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
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
    const { open } = this.state;
    const { clinic } = this.props;
    return (
      <div>
        <button onClick={this.handleToggle}>{clinic.Name}</button>
        <Dialog open={open} onClose={this.handleToggle}>
          <DialogContent>
            Clinic Name: {clinic.Name} <hr /> Address: {clinic.Address}{" "}
            Singapore {clinic.PostalCode}
            <hr /> Telephone: {clinic.Tel} <hr /> Distance:{" "}
            {parseFloat(clinic.distance).toFixed(2)}km away
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default PcDialog;
