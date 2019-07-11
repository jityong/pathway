import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import { Link } from "react-router-dom";

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
        <button onClick={this.handleToggle}>{clinic.Name}</button>
        <Dialog open={open} onClose={handleToggle}>
          <DialogContent>
            Clinic Name: {clinic.Name} <hr /> Address: {clinic.Address}{" "}
            Singapore {clinic.PostalCode}
            <hr /> Telephone: {clinic.Tel} <hr /> Distance:{" "}
            {parseFloat(clinic.distance).toFixed(2)}km away
            <hr />
            <button onClick={() => handleListItemClick(clinic, clinic.Name)}>
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

export default PcDialog;
