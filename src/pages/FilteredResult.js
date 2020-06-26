import React from "react";
import GP from "../data/pcn.json";
import * as turf from "@turf/turf";
import ResultTabs from "../components/ResultTabs.js";
import PC from "../data/newPolyclinics.json";
import Switch from "@material-ui/core/Switch";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import HelpOutline from "@material-ui/icons/HelpOutline";
import { Link } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FormLabel } from "@material-ui/core";

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
      formData: this.props.location.state, //this gets the info from react router from PatientForm.js
      userLng: 0,
      userLat: 0,
      sortByLoc: true,
      open: false,
      // searchedClinic: {}
    };
    this.goBack = this.goBack.bind(this);
    // this.routeChange = this.routeChange.bind(this);
  }
  componentDidMount() {
    fetch(`backend/googleMap/getGeoLoc`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postalCode: this.state.formData.postalCode,
      })
    })
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
  // routeChange = () => {
  //   let path = `/FilteredResult/Search`;
  //   this.props.history.push(path);
  // };

  render(props) {
    const { userLat, userLng, formData, sortByLoc } = this.state;
    const filteredGP = GP.features.filter(clinic => {
      clinic.name = clinic.properties.HCI_NAME;
      const from = turf.point([userLng, userLat]);
      const to = turf.point([
        clinic.geometry.coordinates[0],
        clinic.geometry.coordinates[1]
      ]);
      const options = { units: "kilometers" };
      const dist = turf.distance(from, to, options);
      clinic.distance = dist;
      if (sortByLoc) {
        return dist <= 3;
      } else {
        return true;
      }
    });

    const filteredPC = PC.clinics.filter(clinic => {
      clinic.name = clinic.Name;
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
    const toggleDistSort = () => {
      this.setState({ sortByLoc: !sortByLoc });
    };
    const sortedGP = filteredGP.sort(sortDist);
    const sortedPC = filteredPC.sort(sortDist);
    const help = () => {
      alert(
        "Clinics are sorted by distance; nearest at the top." +
          "\n\n" +
          "Map view is available at the rightmost tab." +
          "\n\n" +
          "Toggle the 'Filter by 3km radius' switch to choose between displaying all clinics or just clinics within your 3km radius." +
          "\n\n" +
          "Add two clinics to comparison to activate the compare feature!" +
          "\n\n" +
          "Select a clinic to move on!" +
          "\n\n\n\n\n" +
          "For any further enquiries please contact pathway@u.nus.edu"
      );
    };
    return (
      <div>
        <AppBar position="static" style={{ backgroundColor: "#ff7c01" }}>
          <Toolbar>
            <Link to="/Form" style={{ textDecoration: "none", color: "white" }}>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <ArrowBack />
                <Typography variant="subtitle1">Back</Typography>
              </IconButton>{" "}
            </Link>
            <Typography variant="h6" align="center" style={{ flexGrow: 1 }}>
              Filtered clinics for{" "}
              <span style={{ textDecoration: "underline", fontWeight: "bold" }}>
                S{formData.postalCode}
              </span>{" "}
              {formData.subsidyType === ""
                ? ""
                : `with ${formData.subsidyType} subsidy`}
              <br />
              <FormLabel style={{ color: "white" }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.sortByLoc}
                      value={this.state.sort}
                      onChange={toggleDistSort}
                      inputProps={{ "aria-label": "primary checkbox" }}
                      color="primary"
                    />
                  }
                  label="Filter by 3km radius"
                  labelPlacement="start"
                />
              </FormLabel>
            </Typography>
            {/* <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={this.routeChange}
            >
              <SearchIcon callbackFunc={callbackFunc} />
              {console.log(GP)}
            </IconButton>{" "} */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={help}
            >
              <Typography variant="subtitle1">Help </Typography> <HelpOutline />
            </IconButton>{" "}
          </Toolbar>
        </AppBar>
        <div>
          <hr />
          <ResultTabs
            GP={sortedGP}
            PC={sortedPC}
            formData={formData}
            // searchedClinic={this.searchedClinic}
            currentLoc={[this.state.userLng, this.state.userLat]}
          />
        </div>
      </div>
    );
  }
}
export default FilteredResult;
