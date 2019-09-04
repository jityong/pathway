import React, { Component, Fragment } from "react";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import SelectedChoice from "./SelectedChoice";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MyButton from "./MyButton";

import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { maxWidth, fontSize } from "@material-ui/system";
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
      createData("Name", clinicOne.name, clinicTwo.name),
      createData(
        "Distance",
        parseFloat(clinicOne.distance).toFixed(2),
        parseFloat(clinicTwo.distance).toFixed(2)
      ),
      createData("Price", clinicOne.price, clinicTwo.price),
      createData("Ratings", clinicOne.rating, clinicTwo.rating)
    ];
    const priceRows = [
      createData("Name", clinicOne.name, clinicTwo.name),
      createData(
        "Consultation Fee",
        userSubsidyType === "CHAS Blue" ? (
          <p>
            Subsidy of max $80 per visit (both consultation and medicine) for
            simple chronic visit, capped at $320 per year <hr />
            Subsidy of max $120 per visit (both consultation and medicine) for
            complicated (meaning got multiple conditions, or DM with
            complications) chronic visit, capped at $480 per year
          </p>
        ) : userSubsidyType === "CHAS Orange" ? (
          <p style={{ fontSize: "1em" }}>
            Subsidy of max $50 per visit (both consult and medx) for simple
            chronic visit, capped at $200 per year <hr /> Subsidy of max $75 per
            visit (both consult and medx) for complicated chronic visit, capped
            at $300 per year
          </p>
        ) : userSubsidyType === "PG" ? (
          <p style={{ fontSize: "1em" }}>
            Subsidy of max $90 per visit (both consult and medx) for simple
            chronic visit, capped at $360 per year <hr /> Subsidy of max $135
            per visit (both consult and medx) for complicated chronic visit,
            capped at $540 per year
          </p>
        ) : (
          <p style={{ fontSize: "1em" }}>
            ~ $30 (normal and new visit) Lower price for regular visits, at GP’s
            discretion
          </p>
        ),
        userNationality === "Singaporean"
          ? userAge < 18 || userAge > 65
            ? "$6.90"
            : "$13.20"
          : userNationality === "Permanent Resident"
          ? "$32.70"
          : "$51.50"
      ),
      createData("Drugs & Tests Prices", " ", " "),
      createData(
        "Metformin [Drug]",
        "-",
        userAge > 65 ? (
          <p>Capped at $0.70/week</p>
        ) : userNationality === "Singaporean" ||
          userSubsidyType === "CHAS orange" ||
          userSubsidyType === "CHAS blue" ? (
          <p> Capped at $.140/week</p>
        ) : userNationality === "Permanent Resident" ? (
          <p> (PR) Capped at $2.10/week</p>
        ) : (
          <p>
            (Non-Residents) $2.80/week or itemised price, whichever is higher
          </p>
        )
      ),
      createData(
        "Sulfonylureas (Glipizide) [Drug]",
        "-",
        userAge > 65 ? (
          <p>Capped at $0.70/week</p>
        ) : userNationality === "Singaporean" ||
          userSubsidyType === "CHAS orange" ||
          userSubsidyType === "CHAS blue" ? (
          <p> Capped at $.140/week</p>
        ) : userNationality === "Permanent Resident" ? (
          <p> (PR) Capped at $2.10/week</p>
        ) : (
          <p>
            (Non-Residents) $2.80/week or itemised price, whichever is higher
          </p>
        )
      ),
      createData(
        "HbA1c [Drug]",
        "~ $10",
        userNationality === "Singaporean" ? (
          <p style={{ fontSize: "1em" }}>
            HbA1c => $14.20
            <hr /> DM panel(HbA1c + renal panel, lipids, liver panel etc) =>
            capped at $21.70
          </p>
        ) : (
          <p style={{ fontSize: "1em" }}>
            HbA1c => $14.20
            <hr /> DM panel(HbA1c + renal panel, lipids, liver panel etc) =>
            $36.40
          </p>
        )
      ),
      createData("DRP [Test]", "~$16", "$12.80"),
      createData("DFS [Test]", "~$16", "$12.80")
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
                                      GP{" "}
                                    </TableCell>

                                    <TableCell
                                      style={{ minWidth: 200, maxWidth: 200 }}
                                      align="right"
                                    >
                                      Polyclinic{" "}
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {priceRows.map(row => (
                                    <TableRow key={row.name}>
                                      <TableCell component="th" scope="row">
                                        {row.name}
                                      </TableCell>
                                      <TableCell align="right">
                                        {row.gp}
                                      </TableCell>
                                      <TableCell align="right">
                                        {row.pc}
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
                    <TableCell align="right">{row.pc}</TableCell>
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
                        pathname: "/SelectedChoice",
                        state: {
                          choice: clinicOne
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
                        pathname: "/SelectedChoice",
                        state: {
                          choice: clinicTwo
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
