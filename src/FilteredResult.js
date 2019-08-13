import React from "react";
import GP from "./chas.json";
import * as turf from "@turf/turf";
import ResultTabs from "./ResultTabs.js";
import PC from "./polyclinics.json";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";

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
      userLat: 0,
      sortByLoc: true
    };
    this.goBack = this.goBack.bind(this);
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

  goBack() {
    this.props.history.goBack();
  }

  render(props) {
    const { userLat, userLng, formData } = this.state;

    const filteredGP = GP.features.filter(clinic => {
      const from = turf.point([userLng, userLat]);
      const to = turf.point([
        clinic.geometry.coordinates[0],
        clinic.geometry.coordinates[1]
      ]);
      const options = { units: "kilometers" };
      const dist = turf.distance(from, to, options);
      clinic.distance = dist;
      if (formData.hasSubsidy === "Yes") {
        return (
          dist <= 3 
          // && clinic.properties.CLINIC_PROGRAMME_CODE.includes(formData.subsidyType)
        );
      }
      return dist <= 3;
    });

    const filteredPC = PC.clinics.filter(clinic => {
      const from = turf.point([userLng, userLat]);
      const to = turf.point([clinic.coord[0], clinic.coord[1]]);
      const options = { units: "kilometers" };
      const dist = turf.distance(from, to, options);
      clinic.distance = dist;
      return dist <= 100;
    });

    function sortDist(a, b) {
      if (a.distance < b.distance) {
        return -1;
      } else {
        return 1;
      }
    }
    const handleSwitch = name => event => {
      this.setState({ [name]: event.target.checked });
    };
    const sortedGP = filteredGP.sort(sortDist);
    const sortedPC = filteredPC.sort(sortDist);
    //note: dangerouslySetInnerHTML cos the json is in string, but its actually HTML
    return (
      <div>
        <Grid container justify="center">
          <h2>
            Filtered clinics for{" "}
            <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
              S{formData.postalCode}
            </span> {" "}
            {formData.subsidyType === ""
              ? ""
              : `with ${formData.subsidyType} subsidy`}
          </h2>
        </Grid>
        {/* <Switch
        checked={this.state.sortByLoc}
        onChange={handleSwitch('sortByLoc')}
        value="sortByLoc"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      /> */}
        <div>
          <hr />
          <ResultTabs
            GP={sortedGP}
            PC={sortedPC}
            formData={formData}
            currentLoc={[this.state.userLng, this.state.userLat]}
          />
          <Button onClick={this.goBack}>Go Back</Button>
        </div>
      </div>
    );
  }
}
export default FilteredResult;
