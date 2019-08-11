import React from "react";
import { Link } from "react-router-dom";

//haven't included any info here, can do styling for RWD(responsive web design)
function GeneralInfo() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>General Info</h1>

      <p style={{textAlign: "center"}}>INFO on GP vs Polyclinic</p>
      <button style={{ float: "right" }}>
        <Link to="/Form">Ok, Next</Link>
      </button>
    </div>
  );
}
export default GeneralInfo;
