import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import infographics from "./infographics.png"
//haven't included any info here, can do styling for RWD(responsive web design)
function GeneralInfo() {
  return (
    <div>
      <h1 style={{ textAlign: "center", fontStyle:"italic" }}>General Info</h1>
      <Fragment>
      <img src={infographics} alt="infographics" style={{width:"100%"}}></img>
      </Fragment>
      <button style={{ float: "right" }}>
        <Link to="/Form">Ok, Next</Link>
      </button>
    </div>
  );
}
export default GeneralInfo;
