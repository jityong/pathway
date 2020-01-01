import React, {Component, Fragment} from "react";
import Dialog from "@material-ui/core/Dialog";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import consultationPrices from "../../data/consultationPrices";
import drugPrices from "../../data/drugPrices";
import testPrices from "../../data/testPrices";
import MyButton from "../../util/MyButton";

import {
    DialogContent,
    Typography
} from "@material-ui/core";

//Displays the "Compare!" button when 2 clinics are selected for comparison.
// Displays the table of information for comparison between the 2 clinics.
export class CompareDialog extends Component {
    state = {
        open: false,
        priceOpen: false,
        userNationality: this.props.formData.nationality,
        userAge: this.props.formData.age,
        userSubsidyType: this.props.formData.subsidyType
    };
    handleToggle = () => {
        this.setState({
            open: !this.state.open
        });
    };
    handlePriceToggle = () => {
        this.setState({
            priceOpen: !this.state.priceOpen
        });
    };

    render() {
        const {
            open,
            priceOpen,
            userNationality,
            userAge,
            userSubsidyType
        } = this.state;
        const {clinicOne, clinicTwo, formData} = this.props;

        function createData(name, gp, pc) {
            return {name, gp, pc};
        }

        const rows = [
            createData(
                <span style={{fontWeight: "bold"}}>Name</span>,
                <span style={{fontWeight: "bold"}}>{clinicOne.name}</span>,
                <span style={{fontWeight: "bold"}}> {clinicTwo.name}</span>
            ),
            createData(
                "Distance",
                parseFloat(clinicOne.distance).toFixed(2),
                parseFloat(clinicTwo.distance).toFixed(2)
            ),
            createData("Price", clinicOne.price, clinicTwo.price),
            createData("Ratings", clinicOne.rating, clinicTwo.rating),
            createData("Doctor name", ((clinicOne.type === "GP") ? clinicOne.doctorName : ""),
                ((clinicTwo.type === "GP") ? clinicTwo.doctorName : "")),
            createData("Opening hours", ((clinicOne.type === "GP") ? clinicOne.formattedOpeningHours : ""),
                ((clinicTwo.type === "GP") ? clinicTwo.formattedOpeningHours : "")),
            createData("Directions", ((clinicOne.type === "GP") ? clinicOne.formattedDirections : ""),
                ((clinicTwo.type === "GP") ? clinicTwo.formattedDirections : "")),

        ];
        const consultationPriceRows = consultationPrices.consultation.map(function (data) {
            return createData(
                data.Description,
                userNationality === "SG"
                    ? userSubsidyType === "PG"
                    ? data.PCN_Price.PG
                    : userSubsidyType === "MG"
                        ? data.PCN_Price.MG
                        : userSubsidyType === "CHAS Blue" || userSubsidyType === "CHAS Orange"
                            ? data.PCN_Price.BLUE_CHAS
                            : data.PCN_Price.NON_CHAS
                    : data.PCN_Price.NON_RESIDENT,
                userNationality === "Singaporean"
                    ? userSubsidyType === "PG"
                    ? data.Polyclinic_Price.PG
                    : userSubsidyType === "MG"
                        ? data.Polyclinic_Price.MG
                        : userAge < 18 || userAge > 65
                            ? data.Polyclinic_Price.SG_CHILD_ELDERLY
                            : data.Polyclinic_Price.SG_ADULT
                    : userNationality === "Permanent Resident"
                    ? data.Polyclinic_Price.PR
                    : data.Polyclinic_Price.NON_RESIDENT
            )
        })
        const drugPriceRows = drugPrices.drugs.map(function (data) {
            return createData(
                data.Name + ": " + data.Description,
                userNationality === "Singaporean"
                    ? userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
                    ? data.PCN_Price.ORANGE_CHAS
                    : userSubsidyType === "PG"
                        ? data.PCN_Price.PG_CHAS
                        : data.PCN_Price.NON_CHAS
                    : data.PCN_Price.NON_SG,
                userNationality === "Singaporean"
                    ? userAge > 65
                    ? userSubsidyType === "PG"
                        ? data.Polyclinic_Price.PG
                        : userSubsidyType === "MG"
                            ? data.Polyclinic_Price.MG_above65
                            : data.Polyclinic_Price.noPG_above65
                    : userSubsidyType === "MG"
                        ? data.Polyclinic_Price.MG_below65
                        : data.Polyclinic_Price.below65
                    : data.Polyclinic_Price.nonSG
            )
        });
        const testPriceRows = testPrices.tests.map(function (data) {
                return createData(
                    data.Name + ": " + data.Description,
                    userNationality === "Singaporean"
                        ? userSubsidyType === "PG"
                        ? data.PCN_Price.PG
                        : userSubsidyType === "MG"
                            ? data.PCN_Price.MG
                            : userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
                                ? data.PCN_Price.ORANGE_CHAS
                                : data.PCN_Price.Non_CHAS
                        : userNationality === "Permanent Resident"
                        ? data.PCN_Price.PR
                        : data.PCN_Price.NON_RESIDENT,
                    userNationality === "Singaporean"
                        ? userAge < 18 || userAge > 65
                        ? data.Polyclinic_Price.SG_CHILD_ELDERLY
                        : data.Polyclinic_Price.SG
                        : userNationality === "Permanent Resident"
                        ? data.Polyclinic_Price.PR
                        : data.Polyclinic_Price.NON_RESIDENT
                )
            }
        )
        const priceRows = consultationPriceRows.concat(drugPriceRows.concat(testPriceRows)).flatMap(function (data) {
            return data;
        });
        const handleToggle = () => {
            this.setState({
                open: !this.state.open
            });
        };
        const handlePriceToggle = () => {
            this.setState({
                priceOpen: !this.state.priceOpen
                // open: false
            });
        };
        return clinicOne === null || clinicTwo === null ? (
            "Please select 2 clinics for comparison."
        ) : (
            <div>
                <Button
                    variant="contained"
                    style={{backgroundColor: "#ff7c01"}}
                    onClick={handleToggle}
                >
                    Compare!
                </Button>
                <Dialog
                    style={{fontSize: "1vw"}}
                    open={open}
                    onClose={handleToggle}
                    maxWidth="lg"
                >
                    <DialogContent>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell> </TableCell>
                                    <TableCell align="right">{clinicOne.type} </TableCell>
                                    <TableCell align="right">{clinicTwo.type} </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name === "Price" ? (
                                                <Fragment>
                                                    Price
                                                    <MyButton
                                                        onClick={handlePriceToggle}
                                                        tip="More Details"
                                                    >
                                                        <Typography variant="subtitle1">Expand</Typography>
                                                        <ExpandMoreIcon/>
                                                    </MyButton>
                                                    <Dialog open={priceOpen} onClose={handlePriceToggle}>
                                                        <DialogContent>
                                                            <p
                                                                style={{
                                                                    fontWeight: "bold",
                                                                    textDecoration: "underline"
                                                                }}
                                                            >
                                                                Cost Breakdown
                                                            </p>
                                                            <Table>
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell/>
                                                                        <TableCell
                                                                            style={{minWidth: 200, maxWidth: 200}}
                                                                            align="right"
                                                                        >
                                                                            {" "}
                                                                            {clinicOne.type}
                                                                        </TableCell>

                                                                        <TableCell
                                                                            style={{minWidth: 200, maxWidth: 200}}
                                                                            align="right"
                                                                        >
                                                                            {clinicTwo.type}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell component="th" scope="row">
                                      <span style={{fontWeight: "bolder"}}>
                                        Name
                                      </span>
                                                                        </TableCell>
                                                                        <TableCell component="th" scope="row">
                                      <span style={{fontWeight: "bolder"}}>
                                        {clinicOne.name}
                                      </span>
                                                                        </TableCell>
                                                                        <TableCell component="th" scope="row">
                                      <span style={{fontWeight: "bolder"}}>
                                        {" "}
                                          {clinicTwo.name}
                                      </span>
                                                                        </TableCell>


                                                                    </TableRow>
                                                                    {priceRows.map(row => (
                                                                        <TableRow key={row.name}>
                                                                            <TableCell component="th" scope="row">
                                                                                {row.name}
                                                                            </TableCell>
                                                                            <TableCell align="right">
                                                                                {clinicOne.type === "GP"
                                                                                    ? row.gp
                                                                                    : row.pc}
                                                                            </TableCell>
                                                                            <TableCell align="right">
                                                                                {clinicTwo.type === "GP"
                                                                                    ? row.gp
                                                                                    : row.pc}{" "}
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </DialogContent>
                                                    </Dialog>
                                                </Fragment>
                                            ) : (
                                                <Fragment>{row.name}</Fragment>
                                            )}
                                        </TableCell>
                                        <TableCell align="right">{row.gp}</TableCell>
                                        <TableCell align="right">{row.pc} </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableCell align="right">
                                    <Button/>
                                </TableCell>


                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        style={{backgroundColor: "#ff7c01"}}
                                    >
                                        <Link
                                            to={{
                                                pathname: "/ConfirmClinicChoice",
                                                state: {
                                                    choice: clinicOne,
                                                    formData: this.props.formData
                                                }
                                            }}
                                        >
                                            <span style={{color: "white"}}>Select</span>
                                        </Link>
                                    </Button>
                                </TableCell>


                                <TableCell align="right">
                                    <Button
                                        // style={{ fontSize: "1vw" }}
                                        variant="contained"
                                        style={{backgroundColor: "#ff7c01"}}
                                    >
                                        <Link
                                            to={{
                                                pathname: "/ConfirmClinicChoice",
                                                state: {
                                                    choice: clinicTwo,
                                                    formData: this.props.formData
                                                }
                                            }}
                                        >
                                            <span style={{color: "white"}}>Select</span>
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableFooter>
                        </Table>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default CompareDialog;
