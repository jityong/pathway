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
import {Link} from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {FormLabel} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

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
            sortByLoc: false, //3km radius
            open: false,
            userNotifDialog: true
            // searchedClinic: {}
        };
        this.goBack = this.goBack.bind(this);
        this.handleUserNotifToggle = this.handleUserNotifToggle.bind(this);
        // this.routeChange = this.routeChange.bind(this);
    }

    componentDidMount() {
        fetch(`http://156.67.217.219:5000/googleMap/getGeoLoc`, {
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

    handleUserNotifToggle() {
        this.setState({userNotifDialog: !this.state.userNotifDialog});
    }

    goBack() {
        this.props.history.goBack();
    }

    // routeChange = () => {
    //   let path = `/FilteredResult/Search`;
    //   this.props.history.push(path);
    // };

    render(props) {
        const {userLat, userLng, formData, sortByLoc} = this.state;
        const userNotification = (
                <Dialog open={this.state.userNotifDialog} onClose={this.handleUserNotifToggle}>
                    <DialogContent style={{font: ""}}>
                        Hello! This app is still in its BETA phase and the prices available for comparison are limited
                        to
                        some of the more common drugs for diabetic patients.
                        <br/><br/>
                        Do checkout our different features such as the comparison feature (select 2 clinics to compare)
                        & map feature!
                        <br/>
                        <hr/>
                        Please help us out by submitting any feedback you have at the end of the app. Thank you for your
                        support!
                    </DialogContent>
                    <Button variant="contained" color="secondary" onClick={this.handleUserNotifToggle} size="large">
                        Continue
                    </Button>
                </Dialog>
        );
        const filteredGP = GP.features.filter(clinic => {
            clinic.name = clinic.properties.HCI_NAME;
            const from = turf.point([userLng, userLat]);
            const to = turf.point([
                clinic.geometry.coordinates[0],
                clinic.geometry.coordinates[1]
            ]);
            const options = {units: "kilometers"};
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
            const options = {units: "kilometers"};
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
            this.setState({sortByLoc: !sortByLoc});
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
                <AppBar position="static" style={{backgroundColor: "#ff7c01"}}>
                    <Toolbar>
                        <Link to="/Form" style={{textDecoration: "none", color: "white"}}>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <ArrowBack/>
                                <Typography variant="subtitle1">Back</Typography>
                            </IconButton>{" "}
                        </Link>
                        <Typography variant="h6" align="center" style={{flexGrow: 1}}>
                            Filtered clinics for{" "}
                            <span style={{textDecoration: "underline", fontWeight: "bold"}}>
                S{formData.postalCode}
              </span>{" "}
                            {formData.subsidyType === ""
                                ? ""
                                : `with ${formData.subsidyType} subsidy`}
                            <br/>
                            <FormLabel style={{color: "white"}}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.sortByLoc}
                                            value={this.state.sort}
                                            onChange={toggleDistSort}
                                            inputProps={{"aria-label": "primary checkbox"}}
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
                            <Typography variant="subtitle1">Help </Typography> <HelpOutline/>
                        </IconButton>{" "}
                    </Toolbar>
                </AppBar>
                {userNotification}
                <div>
                    <hr/>
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
