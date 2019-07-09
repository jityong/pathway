import React from "react";
import GP from "./chas.json";
import * as turf from "@turf/turf";
import ResultTabs from "./ResultTabs.js";
import PC from "./polyclinics.json"


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
      filterDist: true
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
    // polyclinics.clinics.map(clinic=> {
    //   fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${
    //     clinic.PostalCode
    //   }&region=sg&key=${API_KEY}`)
    //   .then(res => res.json())
    //   .then(json => console.log(clinic.Name,json.results[0].geometry.location))
        
    // })
    // console.log("test");
    //below is to filter clinics that are "<= 1" km away from input postal code
    //using the turf distance api <-- can google for more info
    const filteredGP = GP.features.filter(clinic => {
      const from = turf.point([userLng, userLat]);
      const to = turf.point([
        clinic.geometry.coordinates[0],
        clinic.geometry.coordinates[1]
      ]);
      const options = { units: "kilometers" };
      const dist =  turf.distance(from, to, options);
      clinic.distance = dist;
      if (formData.hasSubsidy === "Yes") {
        return dist <= 3 && clinic.properties.CLINIC_PROGRAMME_CODE.includes(formData.subsidyType);
      }
      return dist <= 3;
    });

    const filteredPC = PC.clinics.filter(clinic => {
      const from = turf.point([userLng, userLat]);
      const to = turf.point([
        clinic.coord[0],
        clinic.coord[1]
      ]);
      const options = { units: "kilometers" };
      const dist =  turf.distance(from, to, options);
      clinic.distance = dist;
      return dist <= 100;
    });

    function sortDist (a,b) {
      if (a.distance < b.distance){
        return -1;
      }else {
        return 1;
      }
    }
    const sortedGP = filteredGP.sort(sortDist);
    const sortedPC = filteredPC.sort(sortDist);
    //note: dangerouslySetInnerHTML cos the json is in string, but its actually HTML
    return (
      <div>
        <h1>Filtered clinics for S{formData.postalCode}</h1>
        <h1>Subsidies: {formData.subsidyType === "" ? "None" : formData.subsidyType}</h1>
        <div>
        <ResultTabs GP={sortedGP} PC={sortedPC} currentLoc={[this.state.userLng,this.state.userLat]}/>
          {/* {sortedClinics.map(clinic=> {
            return (
            <div> 
              {clinic.properties.HCI_NAME}  
              <hr/>
            </div>
          )
          })} */}
        </div>
      </div>
    );
  }
}
export default FilteredResult;
