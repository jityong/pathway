import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";


import {
    DialogContent
} from "@material-ui/core";

// Displays the PC dialog when clicked in the list of PCs within resultTab.
// FilteredResult --> ResultTabs --> PcDialog

export class PcDialog extends Component {
    state = {
        open: false
    };
    handleToggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    render() {
        const {onClose} = this.props;
        const {open} = this.state;
        const {clinic} = this.props;
        const handleToggle = () => {
            this.setState({
                open: !this.state.open
            });
        };

        function handleListItemClick(clinic, name) {
            onClose(clinic, name);
            handleToggle();
        }

        return (
            <div>
                <Button variant="outlined" fullWidth={true} onClick={this.handleToggle}>
                    {clinic.Name}
                </Button>
                <Dialog open={open} onClose={handleToggle}>
                    <DialogContent>
                        {/* No image to be rendered yet */}
                        <span style={{fontWeight: "bold"}}>{clinic.Name} <br/> {/*Clinic Name*/}</span>
                        {parseFloat(clinic.distance).toFixed(2)}km away {/*Distance*/}
                        <hr/>

                        Telephone: {clinic.Tel}
                        <hr/>

                        <span style={{fontWeight: "bold"}}>Opening Hours:</span>
                        <br/>
                        {clinic.ALL_OPENING_HOURS.map(period => (
                            <p key={clinic.id}>
                                {period.day_string}
                                <br/>
                                {period.opening_hours.join(", ")}
                            </p>
                        ))}

                        <hr/>
                        <span style={{fontWeight: "bold"}}>Address: </span>
                        <br/>
                        {clinic.Address}{" "}
                        Singapore {clinic.PostalCode}
                        <hr/>

                        <span style={{fontWeight: "bold"}}>Directions:</span>
                        <br/>
                        {clinic.ALL_DIRECTIONS.map(path => (
                            <p key={clinic.id}>
                                {path.transport_string}
                                <br/>
                                {path.directions.join(", ")}
                            </p>
                        ))}
                        <hr/>

                        <Grid style={{flexGrow: 1}} container direction="column" justify="space-evenly">
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleListItemClick(clinic, clinic.Name)}
                            >
                                {" "}
                                Add to comparison{" "}
                            </Button>

                            <br/>


                            <Link
                                to={{
                                    pathname: "/ConfirmClinicChoice",
                                    state: {
                                        choice: clinic,
                                        formData: this.props.formData
                                    }
                                }}
                            >
                                <Button
                                    variant="contained"
                                    style={{backgroundColor: "#ff7c01"}}
                                    onClick={this.handleCompare}
                                >
                                    <span style={{color: "white"}}>Select</span>
                                </Button>
                            </Link>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default PcDialog;
