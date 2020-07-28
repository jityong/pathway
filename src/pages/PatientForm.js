import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import HelpOutline from "@material-ui/icons/HelpOutline";
import cfg from "../etc/config.json";

//this component takes gets postal code & subsidy from user and pass the data over
//to the FilteredResult.js component through the react router
// could also use some styling

class PatientForm extends React.Component {
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
        this.goBack = this.goBack.bind(this);
    }

    uploadInfo = () => {
        // console.log("running uploadinfo");
        fetch(`${cfg.backend_svc}/dbStorage/storeFormInfo`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                postalCode: this.state.postalCode,
                age: this.state.age,
                nationality: this.state.nationality,
                subsidyType: this.state.subsidyType,
            })
        })
            .then(res => res.json())
            .catch(err => console.error(err));
    }

    handleChange(event) {
        const {name, value} = event.target;
        return this.setState({[name]: value});
    }

    goBack() {
        this.props.history.goBack();
    }

    handleSubmitForm = () => {
        this.uploadInfo();
        this.props.history.push({
            pathname: '/FilteredResult',
            state: {
                postalCode: this.state.postalCode,
                age: this.state.age,
                nationality: this.state.nationality,
                subsidyType: this.state.subsidyType
            }
        });
    }

    render() {
        const passCheck =
            this.state.postalCode.length === 6 &&
            this.state.age !== "" &&
            this.state.nationality !== "";
        const help = () => {
            alert(
                "Postal code information is used to help locate and identify clinics near your desired address."
                + "\n\n" +
                "Your age, nationality and eligible subsidy types are used in filtering out relevant prices for your reference!"
                + "\n\n\n\n" +
                "Please complete the following form to submit and continue your journey on Pathway!"
                + "\n\n" +
                "Some of these information are stored to analyse the demographics of our users and are not used for any other purposes."
                + "\n\n" +
                " We are not able to identify any users with these information."
            );
        };
        const alertSubsidy = () => {
            alert(
                "For more information regarding subsidies, please refer to http://tiny.cc/moh-subsidies"
            );
        };
        return (
            <div>
                <AppBar position="static" style={{backgroundColor: "#ff7c01"}}>
                    <Toolbar>
                        <Link
                            to="/GeneralInfo"
                            style={{textDecoration: "none", color: "white"}}
                        >
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <ArrowBack/>
                                <Typography variant="subtitle1">Back</Typography>
                            </IconButton>{" "}
                        </Link>
                        <Typography variant="h5" align="center" style={{flexGrow: 1}}>
                            DETAILS
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={help}
                        >
                            <Typography variant="subtitle1">Help{" "}</Typography> <HelpOutline/>
                        </IconButton>{" "}
                    </Toolbar>
                </AppBar>
                <br/>
                <br/>
                <TextField
                    required={true}
                    name="postalCode"
                    id="postalCode"
                    variant="outlined"
                    label="Please enter your Postal Code"
                    value={this.state.postalCode}
                    onChange={this.handleChange}
                    placeholder="123456"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">S</InputAdornment>
                    }}
                    style={{width: "100%"}}
                />
                <br/>
                <hr/>
                <TextField
                    required={true}
                    id="age"
                    name="age"
                    variant="outlined"
                    label="Please enter your age"
                    value={this.state.age}
                    onChange={this.handleChange}
                    placeholder="ie. 25"
                    // error ={this.state.age="" ? true : false}
                    // InputProps={{
                    //   startAdornment: <InputAdornment position="start" children={}/>
                    // }}
                    style={{width: "100%"}}
                />
                <br/>
                <hr/>
                <FormControl variant="outlined" style={{width: "100%"}}>
                    <InputLabel>Nationality</InputLabel>
                    <Select
                        required
                        name="nationality"
                        value={this.state.nationality}
                        onChange={this.handleChange}
                        input={
                            <OutlinedInput
                                label="Nationality"
                                name="nationality"
                                id="nationality"
                            />
                        }
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Singaporean">Singaporean</MenuItem>
                        <MenuItem value="Permanent Resident">Permanent Resident</MenuItem>
                        <MenuItem value="Non-Resident">Non-Resident</MenuItem>
                    </Select>
                </FormControl>
                <br/>
                <hr/>
                {this.state.nationality === "Singaporean" &&
                <FormControl component="fieldset">
                    <FormLabel component="legend">
                        Are you eligible for any subsidies?
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={alertSubsidy}>
                            <Typography variant="subtitle1"></Typography> <HelpOutline/>
                        </IconButton>
                    </FormLabel>
                    <RadioGroup
                        aria-label="Subsidies eligibility"
                        name="hasSubsidy"
                        value={this.state.hasSubsidy}
                        // checked={this.state.hasSubsidy === "Yes"}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel value="Yes" control={<Radio/>} label="Yes"/>
                        <FormControlLabel value="No" control={<Radio/>} label="No"/>
                    </RadioGroup>
                </FormControl>
                }
                {this.state.hasSubsidy === "Yes" && this.state.nationality === "Singaporean" && (
                    <div>
                        <FormControl variant="outlined" style={{width: "100%"}}>
                            <InputLabel>
                                Please select the subsidy you are eligible for:
                            </InputLabel>
                            <Select
                                name="subsidyType"
                                value={this.state.subsidyType}
                                onChange={this.handleChange}
                                input={
                                    <OutlinedInput
                                        label="Eligible Subsidies"
                                        name="age"
                                        id="outlined-age-simple"
                                    />
                                }
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="">--Please select an option--</MenuItem>
                                <MenuItem value="CHAS Orange">CHAS Orange</MenuItem>
                                <MenuItem value="CHAS Blue">CHAS Blue</MenuItem>
                                <MenuItem value="CHAS Green">CHAS Green</MenuItem>
                                {this.state.age >= 60 &&
                                <MenuItem value="MG">Merdeka Generation</MenuItem>}
                                {this.state.age >= 65 &&
                                <MenuItem value="PG">Pioneer Generation</MenuItem>}
                            </Select>
                        </FormControl>
                    </div>
                )}
                <br/>
                <hr/>
                <div style={{justifyContent: "center", textAlign: "center"}}>
                    {passCheck ? (
                        <Button
                            variant="contained"
                            style={{backgroundColor: "#ff7c01"}}
                            size="large"
                            onClick={this.handleSubmitForm}
                        >
                                <span style={{color: "white"}}>Submit</span>
                        </Button>
                    ) : (
                        <Fragment>
                            <Button variant="contained" disabled={true} size="large">
                                Submit
                            </Button>
                            <br/>
                            <span style={{fontSize: "15px"}}>
                Please complete the form above to submit.
              </span>
                        </Fragment>
                    )}
                </div>
            </div>
        );
    }
}

export default PatientForm;
