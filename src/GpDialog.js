import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
export class GpDialog extends Component {
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
        <button onClick={this.handleToggle}>
          {clinic.properties.HCI_NAME}
        </button>
        <Dialog open={open} onClose={this.handleToggle}>
          <DialogContent>
            Clinic Name: {clinic.properties.HCI_NAME} <hr /> Address:{" "}
            {clinic.properties.BLK_HSE_NO} {clinic.properties.STREET_NAME} #
            {clinic.properties.FLOOR_NO}-{clinic.properties.UNIT_NO} {clinic.properties.BUILDING_NAME} Singapore{" "}
            {clinic.properties.PostalCode}
            <hr /> Telephone: {clinic.properties.Tel} <hr /> Distance:
            {parseFloat(clinic.distance).toFixed(2)}km away
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default GpDialog;
