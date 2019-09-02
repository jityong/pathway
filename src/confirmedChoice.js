import React, { Component } from "react";
import  FamMedRoute  from "./DischargeRoutes/FamMedRoute.png";
import  GpRoute  from "./DischargeRoutes/GpRoute.png";
import  PCRoute  from "./DischargeRoutes/PolyclinicRoute.png";

export class confirmedChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: this.props.location.state.choice
    };
  }
  render() {
    const { choice } = this.state;
    const result =
      choice.type === "GP" ? (
        <div>
          {choice.properties.HCI_NAME}: <br/>
          Address:{" "}
          {choice.properties.BLK_HSE_NO} {choice.properties.STREET_NAME} #
          {choice.properties.FLOOR_NO}-{choice.properties.UNIT_NO}{" "}
          {choice.properties.BUILDING_NAME} Singapore{" "}
          {choice.properties.PostalCode}
          <br/> Telephone: {choice.properties.Tel} <br />
          Applicable subsidies:{" "}
          {choice.properties.CLINIC_PROGRAMME_CODE.join(", ")}
          <hr/>
          <span> Referral flowchart of your healthcare journey so far:</span>
          <img src={GpRoute} alt="gp route" style={{width:"100%"}}/>
        </div>
      ) : (
        <div>
          {choice.Name}: <br/>
          Address: {choice.Address} Singapore{" "}
          {choice.PostalCode}
          <br /> Telephone: {choice.Tel} <br /> Distance:{" "}
          {parseFloat(choice.distance).toFixed(2)}km away
          <hr/>
          <span>Referral flowchart of your healthcare journey so far:</span>
          <img src={PCRoute} alt="pc route" style={{width:"100%"}}/>
        </div>
      );
    return (
      <div>
        Thank you, the details of your selected clinic for your follow-up
        treatment are below:
        <br /> <hr /> {result}
        <button> Send to my email </button>
      </div>
    );
  }
}

export default confirmedChoice;
