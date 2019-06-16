import React from "react";
import { Link } from "react-router-dom";

//similary no content yet, can use styling 
function DischargeSummary() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Discharge Summary</h1>
      <hr />
      <button style={{ float: "right" }}>
        <Link to="/GeneralInfo">Ok, Next</Link>
      </button>
      <center>
      <table>
        <tr>
          test
        </tr>
      </table>
      </center>
    </div>
  );
}

export default DischargeSummary;
