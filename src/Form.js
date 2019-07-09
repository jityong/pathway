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
      <body>
        <div class="container">
          <div class="card card-body">
            <form>
              <div class="card">
                <div class="card-header">
                  Enter your postal code
                  </div>
                  <div class="form-group">
                  <input
                    class="form-control"
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
              <div class="card">
                <div class="card-header" for="hasSubsidy">
                  Are you eligible for any subsidies?
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    id="hasSubsidy"
                    type="radio"
                    name="hasSubsidy"
                    value="Yes"
                    checked={this.state.hasSubsidy === "Yes"}
                    onChange={this.handleChange}
                    required
                  />
                  <label class="form-check-label" for="hasSubsidy">
                    Yes
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    id="hasSubsidy"
                    type="radio"
                    name="hasSubsidy"
                    value="No"
                    checked={this.state.hasSubsidy === "No"}
                    onChange={this.handleChange}
                    required
                  />
                  <label class="form-check-label" for="hasSubsidy">
                    No
                  </label>
                </div>
              </div>
              <br />

              {/* if user hasSubsidy then show the choose subsidy select form */}
              {this.state.hasSubsidy === "Yes" && (
                <div class="form-group">
                  <label for="subsidyType">
                    Please select the subsidy you are eligible for:
                    <br />
                    <select
                      id="subsidyType"
                      class="form-control"
                      name="subsidyType"
                      value={this.state.subsidyType}
                      onChange={this.handleChange}
                      required
                    >
                      <option value="">--Please select an option--</option>
                      <option value="CHAS">CHAS</option>
                      <option value="ISP">ISP</option>
                      <option value="CDMP">CDMP</option>                    
                    </select>
                  </label>
                </div>
              )}
              <br />
              <br />
              <button class="btn btn-primary" type="submit">
                <Link
                  to={{
                    pathname: "/FilteredResult",
                    state: {
                      postalCode: this.state.postalCode,
                      hasSubsidy: this.state.hasSubsidy,
                      subsidyType: this.state.subsidyType
                    }
                  }}
                >
                  <span style={{color:"white"}}>Submit</span>
                </Link>
              </button>
            </form>
          </div>
        </div>
      </body>
      
    );
  }
}

export default Form;
