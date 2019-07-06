import React from "react";
import data from "./data.json";
import * as turf from "@turf/turf";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const API_KEY = "AIzaSyDsbjEhJ1510KaVtIQJVTIU7at6hiA__6U";


// this component aims to display the filtered clinic after they fill in the form
//try not to abuse the API call, im using some kind of free credits from google for this
//api to be able to consistenly make the api call

//api in use here are: google geocode & turf
//everything works except for styling, but the content from the json file abit lacking,
// no opening hrs etc
class FilteredResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: this.props.location.state, //this gets the info from react router from Form.js
      userLng: 0,
      userLat: 0
    };
  }
  componentDidMount() {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${
        this.state.formData.postalCode
      }&region=sg&key=${API_KEY}`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          userLng: json.results[0].geometry.location.lng,
          userLat: json.results[0].geometry.location.lat
        });
      });
  }
  render(props) {
    const { userLat, userLng, formData } = this.state;
    console.log(userLng, userLat);
    // console.log("test");
    //below is to filter clinics that are "<= 1" km away from input postal code
    //using the turf distance api <-- can google for more info
    const filteredClinics = data.features.filter(clinic => {
      const from = turf.point([userLng, userLat]);
      const to = turf.point([
        clinic.geometry.coordinates[0],
        clinic.geometry.coordinates[1]
      ]);
      const options = { units: "kilometers" };
      return turf.distance(from, to, options) <= 1;
    });
    //note: dangerouslySetInnerHTML cos the json is in string, but its actually HTML
    return (
      <div>
        <h1>Filtered clinics for S{formData.postalCode}</h1>
        <h1>Subsidies: {formData.subsidyType}</h1>
        <div className="container">
          <div className="row">
            {filteredClinics.map(clinic => {
              return (
                <div className="col-md-3 border border-secondary"
                  style={{margin: "10px"}}>
                <div 
                  key={clinic.properties.Name}
                  dangerouslySetInnerHTML={{
                    __html: clinic.properties.Description
                  }}
                />
                <button style={{display:"table-cell",verticalAlign:"bottom"}}type="button" class="btn btn-success"> Compare </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default FilteredResult;
