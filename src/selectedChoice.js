import React, { Component } from "react";
import { Link } from "react-router-dom";

export class selectedChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: this.props.location.state.choice
    };
    this.goBack = this.goBack.bind(this);
  }
  goBack() {
    this.props.history.goBack();
  }
  render() {
    const { choice } = this.state;
    const result =
      choice.type === "GP" ? (
        <div>{choice.properties.HCI_NAME}</div>
      ) : (
        <div>{choice.Name}</div>
      );
    return (
      <div>
        Clinic chosen: {result}
        <button onClick={this.goBack}>Go Back</button>
        <button>
          <Link
            to={{
              pathname: "/confirmedChoice",
              state: {
                choice: choice
              }
            }}
          >
            <span> Confirm </span>
          </Link>
        </button>
      </div>
    );
  }
}

export default selectedChoice;
