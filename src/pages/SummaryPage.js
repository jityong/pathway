import React from "react";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import {Typography, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 3)
    }
}));
export const SummaryPage = props => {
    const classes = useStyles();
    const [rating, setRating] = React.useState(4);
    const [feedback, setFeedback] = React.useState("");
    const [dialog, setDialog] = React.useState(true);

    function goBack() {
        props.history.goBack();
    }

    const alertClick = () => {
        alert("This service will be available soon!")
    }
    const handleRating = (event) => {
        const {value} = event.target;
        setRating(parseInt(value));
    }
    const handleFeedback = (event) => {
        const {value} = event.target;
        setFeedback(value);
    }
    const handleToggle = () => {
        setDialog(!dialog);
    }
    const submitFeedback = () => {
        fetch('http://156.67.217.219:5000/dbStorage/submitUserFeedback', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rating: rating,
                feedback: feedback
            })
        })
            .then(res => {
                res.json();
                handleToggle();
            })
            .catch(err => console.error(err));
    }
    const feedbackForm = (
        <Dialog open={dialog} onClose={handleToggle} style={{width: "100%"}}>
            <DialogContent>
                <Rating
                    name="Help us out!"
                    value={rating}
                    precision={1}
                    emptyIcon={<StarBorderIcon fontSize="inherit"/>}
                    name="rating"
                    onChange={handleRating}
                />
                <hr/>
                <FormControl variant="outlined">
                    <TextareaAutosize
                        rowsMin={5}
                        name="feedback"
                        label="Submit a feedback"
                        placeholder="How was your experience with the app?"
                        variant="outlined"
                        value={feedback}
                        onChange={handleFeedback}
                    />
                </FormControl>
            </DialogContent>
            <Button variant="contained" color="primary" onClick={submitFeedback} size="large">
                Submit
            </Button>
        </Dialog>
    )
    const {choice} = props.location.state;
    const result = (
        <Paper
            sqaure="false"
            className={classes.root}
            style={{fontWeight: "bold"}}
        >
            {choice.type === "GP" ? (
                <Paper sqaure="false" className={classes.root}>
                    <img src={process.env.PUBLIC_URL + `/ClinicPictures/${choice.properties.FILE_NAME}.png`}
                         alt="pcn" style={{width: "100%"}}/>
                    <br/>
                    <br/>
                    {choice.properties.HCI_NAME} <br/>
                    {choice.properties.DR_NAME} <br/>
                    {choice.properties.BLK_HSE_NO}{" "}
                    {choice.properties.STREET_NAME} #{choice.properties.FLOOR_NO}-
                    {choice.properties.UNIT_NO} {choice.properties.BUILDING_NAME}{" "}
                    S{choice.properties.PostalCode}
                    <br/> Telephone: {choice.properties.Tel} <br/>

                    <hr/>

                    <p>Opening Hours:</p>

                    {choice.properties.ALL_OPENING_HOURS.map(period => (
                        <p>
                            {period.day_string}
                            <br/>
                            {period.opening_hours.join(", ")}
                        </p>
                    ))}
                    <hr/>

                    <p>Directions:</p>
                    {choice.properties.ALL_DIRECTIONS.map(path => (
                        <p>
                            {path.transport_string}
                            <br/>
                            {path.directions.join(", ")}
                        </p>
                    ))}
                    <hr/>


                    {/* Opening hours:
            {choice.properties.ALL_OPENING_HOURS.map(period => (
              period.day_string + ":\n" + period.opening_hours.join(",\n")
            ))
            .join(", \n")} <br />
          
          Directions: { 
            choice.properties.ALL_DIRECTIONS.map(path => (
              path.transport_string + "\n" + path.directions.join(",\n")
            ))
            .join(", \n")} <br /> */}

                    <hr/>

                    {/*<span> Referral flowchart of your healthcare journey so far:</span>*/}
                    {/*<img src={GpRoute} alt="gp route" style={{ width: "100%" }} />*/}
                </Paper>
            ) : (
                <div>
                    {choice.Name}: <br/>
                    Address: {choice.Address} S{choice.PostalCode}
                    <br/> Telephone: {choice.Tel} <br/> Distance:{" "}
                    {parseFloat(choice.distance).toFixed(2)}km away
                    <hr/>

                    <p>Opening Hours:</p>
                    <hr/>
                    {choice.ALL_OPENING_HOURS.map(period => (
                        <p>
                            {period.day_string}
                            <br/>
                            {period.opening_hours.join(", ")}
                        </p>
                    ))}
                    <hr/>
                    <p>Directions:</p>
                    {choice.ALL_DIRECTIONS.map(path => (
                        <p>
                            {path.transport_string}
                            <br/>
                            {path.directions.join(", ")}
                        </p>
                    ))}
                    <hr/>

                    {/*<span>Referral flowchart of your healthcare journey so far:</span>*/}
                    {/*<img src={PCRoute} alt="pc route" style={{ width: "100%" }} />*/}
                </div>
            )}
        </Paper>
    );

    return (
        <body>
            <AppBar position="static" style={{backgroundColor: "#ff7c01"}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={goBack}
                    >
                        <ArrowBack/>
                        <Typography variant="subtitle1">Back</Typography>
                    </IconButton>{" "}
                    <Typography variant="h5" align="center" style={{flexGrow: 1}}>
                        Summary
                    </Typography>
                    <Typography variant="subtitle1"><span
                        style={{color: "#ff7c01"}}>----------------</span></Typography>
                </Toolbar>
            </AppBar>
            <br/>
            <br/>
            <box width={1}> {feedbackForm} </box>
            <Typography variant="button" align="center">
                Thank you, the details of your selected clinic for your follow-up
                treatment are as follows:
                <br/>
                {result}
                <br/>
            </Typography>

            <div style={{textAlign: "center"}}>
                <Button
                    variant="contained"
                    size="large"
                    style={{backgroundColor: "#ff7c01"}}
                    onClick={alertClick}
                >
                    {" "}
                    <span style={{textDecoration: "none", color: "white"}}>
            Send to my email{" "}
          </span>
                </Button>
            </div>
            <br/>
            <br/>
            <br/>
            <hr/>
            <Typography variant="caption" align="center">
                {" "}
                All information quoted above belongs to MOHT (MOH), NUHS Primary Care
                Department, the Primary Care Network, Data.gov.sg and the Pathway team. Please direct
                any queries to pathway@u.nus.edu.
            </Typography>
        </body>
    );
};

export default SummaryPage;
