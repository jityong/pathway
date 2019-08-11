import React from "react";
import { Link } from "react-router-dom";

//this component takes gets postal code & subsidy from user and pass the data over
//to the FilteredResult.js component through the react router
// could also use some styling
class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      postalCode: "",
      hasSubsidy: "No",
      subsidyType: "",
      age: "",
      nationality: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    return this.setState({ [name]: value });
  }
  render() {
    return (
      //why is my required attribute not working...
      <div>
        <div className="container">
          <div className="card card-body">
            <form>
              <div className="card">
                <div className="card-header">Enter your postal code</div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="postalCode"
                    value={this.state.postalCode}
                    onChange={this.handleChange}
                    placeholder="Postal Code ie. 123456"
                    minLength="6"
                    maxLength="6"
                    // pattern="[0-9]"
                    required
                    // style={{ textAlign: "center" }}
                  />
                </div>
                <br />
                <br />
              </div>
              <br />
              <br />
              <div className="card">
                <div className="card-header">Enter your age</div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="age"
                    value={this.state.age}
                    onChange={this.handleChange}
                    placeholder="ie. 25"
                    // minLength="1"
                    // maxLength="3"
                    // pattern="[0-9]"
                    // required
                    // style={{ textAlign: "center" }}
                  />
                </div>
                <br />
                <br />
              </div>
              <br />
              <br />
              <div className="form-group">
                <label>
                  Please select your nationality
                  <br />
                  <select
                    id="nationality"
                    className="form-control"
                    name="nationality"
                    value={this.state.nationality}
                    onChange={this.handleChange}
                    // required
                  >
                    <option value="">--Please select an option--</option>
                    <option value="Singaporean">Singaporean</option>
                    <option value="Permanent Resident">
                      Permanent Resident
                    </option>
                    <option value="Non-Resident">Non-Resident</option>
                  </select>
                </label>
              </div>
              <br />
              <div className="card">
                <div className="card-header">
                  Are you eligible for any subsidies?
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    id="hasSubsidy"
                    type="radio"
                    name="hasSubsidy"
                    value="Yes"
                    checked={this.state.hasSubsidy === "Yes"}
                    onChange={this.handleChange}
                    // required
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    id="hasSubsidy"
                    type="radio"
                    name="hasSubsidy"
                    value="No"
                    checked={this.state.hasSubsidy === "No"}
                    onChange={this.handleChange}
                    // required
                  />
                  <label className="form-check-label">No</label>
                </div>
              </div>
              <br />

              {/* if user hasSubsidy then show the choose subsidy select form */}
              {this.state.hasSubsidy === "Yes" && (
                <div className="form-group">
                  <label>
                    Please select the subsidy you are eligible for:
                    <br />
                    <select
                      id="subsidyType"
                      className="form-control"
                      name="subsidyType"
                      value={this.state.subsidyType}
                      onChange={this.handleChange}
                      // required
                    >
                      <option value="">--Please select an option--</option>
                      <option value="CHAS Orange">CHAS Orange</option>
                      <option value="CHAS Blue">CHAS Blue</option>
                      <option value="PG">Pioneer Generation</option>
                    </select>
                  </label>
                </div>
              )}

              <br />
              <br />
              <button className="btn btn-primary" type="submit">
                <Link
                  to={{
                    pathname: "/FilteredResult",
                    state: {
                      postalCode: this.state.postalCode,
                      hasSubsidy: this.state.hasSubsidy,
                      subsidyType: this.state.subsidyType,
                      age: this.state.age,
                      nationality: this.state.nationality
                    }
                  }}
                >
                  <span style={{ color: "white" }}>Submit</span>
                </Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
