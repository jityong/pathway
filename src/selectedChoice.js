import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Typography, Button, Card } from "@material-ui/core";

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
        <div>
          {choice.properties.HCI_NAME} <hr /> Address:{" "}
          {choice.properties.BLK_HSE_NO} {choice.properties.STREET_NAME} #
          {choice.properties.FLOOR_NO}-{choice.properties.UNIT_NO}{" "}
          {choice.properties.BUILDING_NAME} Singapore{" "}
          {choice.properties.PostalCode}
          <hr /> Telephone: {choice.properties.Tel} <hr />
          Applicable subsidies:{" "}
          {choice.properties.CLINIC_PROGRAMME_CODE.join(", ")}
        </div>
      ) : (
        <div>
          {" "}
          Clinic Name: {choice.Name} <hr /> Address: {choice.Address} Singapore{" "}
          {choice.PostalCode}
          <hr /> Telephone: {choice.Tel} <hr /> Distance:{" "}
          {parseFloat(choice.distance).toFixed(2)}km away
        </div>
      );
    return (
      <div>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <h1> Clinic chosen: </h1>
          </Grid>
          <br />
          <Grid item>
            {/* <Card style={{ maxWidth: 1000}}>{result}</Card> */}
            {result}
          </Grid>
        </Grid>
        {/* </Grid> */}
        <hr />
        <hr />
        <Grid style={{ flexGrow: 1 }} direction="row">
          <Grid container justify="space-evenly">
            <Grid item>
              <Button variant="contained" onClick={this.goBack}>
                Go Back
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                <Link
                  to={{
                    pathname: "/confirmedChoice",
                    state: {
                      choice: choice
                    }
                  }}
                >
                  <span style={{ color: "white" }}> Confirm </span>
                </Link>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default selectedChoice;
