import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import { Link } from "react-router-dom";

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
    return (
      <div>
        <button onClick={this.handleToggle}>
          {clinic.properties.HCI_NAME}
        </button>
        <Dialog open={open} onClose={handleToggle}>
          <DialogContent>
            Clinic Name: {clinic.properties.HCI_NAME} <hr /> Address:{" "}
            {clinic.properties.BLK_HSE_NO} {clinic.properties.STREET_NAME} #
            {clinic.properties.FLOOR_NO}-{clinic.properties.UNIT_NO}{" "}
            {clinic.properties.BUILDING_NAME} Singapore{" "}
            {clinic.properties.PostalCode}
            <hr /> Telephone: {clinic.properties.Tel} <hr />
            Applicable subsidies:{" "}
            {clinic.properties.CLINIC_PROGRAMME_CODE.join(", ")}
            <hr />
            Distance:
            {parseFloat(clinic.distance).toFixed(2)}km away
            <hr />
            <button
              onClick={() =>
                handleListItemClick(clinic, clinic.properties.HCI_NAME)
              }
            >
              {" "}
              Add to comparison{" "}
            </button>
            <button onClick={this.handleCompare}>
              <Link
                to={{
                  pathname: "/selectedChoice",
                  state: {
                    choice: clinic
                  }
                }}
              >
                <span>Select</span>
              </Link>
            </button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default GpDialog;
