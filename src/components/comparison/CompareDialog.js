import React, { Component, Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
    const { clinicOne, clinicTwo, formData } = this.props;
    function createData(name, gp, pc) {
      return { name, gp, pc };
    }
    const rows = [
      createData(
        <span style={{ fontWeight: "bold" }}>Name</span>,
        <span style={{ fontWeight: "bold" }}>{clinicOne.name}</span>,
        <span style={{ fontWeight: "bold" }}> {clinicTwo.name}</span>
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
    const priceRows = [
      createData(
        "Consultation Fee",
        userSubsidyType === "CHAS Blue" ? (
          <p>$12-15</p>
        ) : userSubsidyType === "CHAS Orange" ? (
          <p style={{ fontSize: "1em" }}>$12-15</p>
        ) : userSubsidyType === "PG" ? (
          <p style={{ fontSize: "1em" }}>$5-8</p>
        ) : (
          <p style={{ fontSize: "1em" }}>$45-55</p>
        ),
        userSubsidyType === "PG" && userAge > 65
          ? "$3.45"
          : userNationality === "Singaporean"
          ? userAge < 18 || userAge > 65
            ? "$6.90"
            : "$13.20"
          : userNationality === "Permanent Resident"
          ? "$32.70"
          : "$51.47"
      ),
      createData(
        <span style={{ color: "grey" }}>"Drugs & Tests Prices"</span>,
        <span style={{ color: "grey" }}>"Drugs & Tests Prices"</span>,
        <span style={{ color: "grey" }}>"Drugs & Tests Prices"</span>
      ),
      createData(
        "Metformin HCL 250MG ",
        userNationality === "Singaporean"
          ? userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
            ? "Capped at $.140/week or $0.025/tablet \n (whichever is cheaper)"
            : userSubsidyType === "PG"
            ? "Capped at $.140/week or $0.0125/tablet \n (whichever is cheaper)"
            : "Capped at $.140/week or $0.075/tablet \n (whichever is cheaper)"
          : "$0.10/tablet",
        userNationality === "Singaporean"
          ? userAge > 65
            ? userSubsidyType === "PG"
              ? "$0.70/week or $0.0125/tablet \n (whichever is cheaper)"
              : "$0.70/week or $0.10/tablet \n (whichever is cheaper)"
            : userSubsidyType === "CHAS Orange" ||
              userSubsidyType === "CHAS Blue"
            ? "Capped at $.140/week or $0.025/tablet \n (whichever is cheaper)"
            : "$0.075/tablet"
          : "$0.10/tablet"
      ),
      createData(
        "METFORMIN 500MG XR (GLUCOPHAGE XR)",
        "$0.25/tablet",
        "$0.25/tablet"
      ),
      createData(
        "Metformin HCL 500MG ",
        userNationality === "Singaporean"
          ? userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
            ? "Capped at $1.40/week or $0.03/tablet \n(whichever is cheaper)"
            : userSubsidyType === "PG"
            ? "Capped at $.140/week or $0.015/tablet \n(whichever is cheaper)"
            : "Capped at $.140/week or $0.09/tablet \n(whichever is cheaper)"
          : "$0.12/tablet",
        "-"
      ),
      createData(
        "Metformin HCL 850MG ",
        userNationality === "Singaporean"
          ? userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
            ? "Capped at $1.40/week or $0.03/tablet \n(whichever is cheaper)"
            : userSubsidyType === "PG"
            ? "Capped at $.140/week or $0.015/tablet \n(whichever is cheaper)"
            : "Capped at $.140/week or $0.09/tablet \n(whichever is cheaper)"
          : "$0.12/tablet",
        userNationality === "Singaporean"
          ? userAge > 65
            ? userSubsidyType === "PG"
              ? "$0.70/week or $0.015/tablet \n(whichever is cheaper)"
              : "$0.70/week or $0.12/tablet \n(whichever is cheaper)"
            : userSubsidyType === "CHAS Orange" ||
              userSubsidyType === "CHAS Blue"
            ? "Capped at $1.40/week or $0.03/tablet \n(whichever is cheaper)"
            : "$0.09/tablet"
          : "$0.12/tablet"
      ),

      createData(
        "Sulfonylureas (Glipizide)",
        "Metformin HCL 250MG ",
        userNationality === "Singaporean"
          ? userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
            ? "Capped at $.140/week or $0.025/tablet \n(whichever is cheaper)"
            : userSubsidyType === "PG"
            ? "Capped at $.140/week or $0.0125/tablet \n(whichever is cheaper)"
            : "Capped at $.140/week or $0.075/tablet \n(whichever is cheaper)"
          : "$0.10/tablet",
        userNationality === "Singaporean"
          ? userAge > 65
            ? userSubsidyType === "PG"
              ? "$0.70/week or $0.0125/tablet \n(whichever is cheaper)"
              : "$0.70/week or $0.10/tablet \n(whichever is cheaper)"
            : userSubsidyType === "CHAS Orange" ||
              userSubsidyType === "CHAS Blue"
            ? "Capped at $1.40/week or $0.025/tablet \n(whichever is cheaper)"
            : "$0.075/tablet"
          : "$0.10/tablet"
      ),
      createData(
        "DAPAGLIFLOZIN 10MG TAB (FORXIGA)",
        "$1.36/tablet",
        "$1.36/tablet"
      ),
      createData(
        "EMPAGLIFLOZIN 10MG TAB (JARDIANCE)",
        "$1.79/tablet",
        "$1.29/tablet"
      ),
      createData(
        "EMPAGLIFLOZIN 25MG TAB (JARDIANCE)",
        "$1.98/tablet",
        "$1.29/tablet"
      ),
      createData(
        "DPP-4(SITAGLIPTIN 100MG TAB (JANUVIA))",
        "$2.79/tablet",
        "$2.28/tablet"
      ),
      createData("DPP-4(SITAGLIPTIN 25MG TAB (JANUVIA))", "$2.76/tablet", "-"),
      createData(
        "DPP-4(SITAGLIPTIN 50MG TAB (JANUVIA))",
        "$2.79/tablet",
        "$2./tablet"
      ),
      createData(
        "DPP-4(LINAGLIPTIN 5MG TAB (TRAJENTA))",
        "$1.88/tablet",
        "$1.36/tablet"
      ),
      createData(
        "NovoMix insulin (Insulin Aspart) - NOVOMIX 30 FLEXPEN 3ML",
        userNationality === "Singaporean"
          ? userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
            ? "$1.08/val"
            : userSubsidyType === "PG"
            ? "$0.540/val"
            : "3.24/val"
          : "$8.63/val",
        "$19.6/pen"
      ),
      createData(
        "HbA1c",
        "$10/test",
        userNationality === "Singaporean" ? (
          <p style={{ fontSize: "1em" }}>
            HbA1c => $14.20/test
            <hr /> DM panel(HbA1c + renal panel, lipids, liver panel etc) <br />{" "}
            => capped at $21.70/test
          </p>
        ) : (
          <p style={{ fontSize: "1em" }}>
            HbA1c => $14.20/test
            <hr /> DM panel(HbA1c + renal panel, lipids, liver panel etc) =>
            $36.40/test
          </p>
        )
      ),
      createData(
        "Diabetic Nurse Consultation",
        userSubsidyType === "PG"
          ? "$5/session"
          : userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
          ? "$9/session"
          : "$16/session",
        "-"
      ),
      createData(
        "DRP - Diabetic Retinal Photography",
        userSubsidyType === "PG"
          ? "$5/session"
          : userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
          ? "$9/session"
          : "$16/session",
        userNationality === "Singaporean"
          ? "$12.80/session"
          : userNationality === "Permanent Resident"
          ? "$23/session"
          : "$49.80/session"
      ),
      createData(
        "DFS - Diabetic Foot Screening",
        userSubsidyType === "PG"
          ? "$5/session"
          : userSubsidyType === "CHAS Orange" || userSubsidyType === "CHAS Blue"
          ? "$9/session"
          : "$16/session",
        userNationality === "Singaporean"
          ? "$12.80/session"
          : userNationality === "Permanent Resident"
          ? "$23/session"
          : "$49.80/session"
      )
    ];
    const handleToggle = () => {
      this.setState({
        open: !this.state.open
      });
    };
    const handlePriceToggle = () => {
      this.setState({
        priceOpen: !this.state.priceOpen
      });
    };
    return clinicOne === null || clinicTwo === null ? (
      "Please select 2 clinics for comparison."
    ) : (
      <div>
        <Button
          variant="contained"
          style={{ backgroundColor: "#ff7c01" }}
          onClick={handleToggle}
        >
          Compare!
        </Button>
        <Dialog
          style={{ fontSize: "1vw" }}
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
                            <ExpandMoreIcon />
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
                                    <TableCell />
                                    <TableCell
                                      style={{ minWidth: 200, maxWidth: 200 }}
                                      align="right"
                                    >
                                      {" "}
                                      {clinicOne.type}
                                    </TableCell>

                                    <TableCell
                                      style={{ minWidth: 200, maxWidth: 200 }}
                                      align="right"
                                    >
                                      {clinicTwo.type}
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  <TableRow>
                                    <TableCell component="th" scope="row">
                                      <span style={{ fontWeight: "bolder" }}>
                                        Name
                                      </span>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                      <span style={{ fontWeight: "bolder" }}>
                                        {clinicOne.name}
                                      </span>
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                      <span style={{ fontWeight: "bolder" }}>
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
                  <Button />
                </TableCell>

                
                <TableCell align="right">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#ff7c01" }}
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
                      <span style={{ color: "white" }}>Select</span>
                    </Link>
                  </Button>
                </TableCell>



                <TableCell align="right">
                  <Button
                    // style={{ fontSize: "1vw" }}
                    variant="contained"
                    style={{ backgroundColor: "#ff7c01" }}
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
                      <span style={{ color: "white" }}>Select</span>
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
