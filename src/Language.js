import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

//Choose langauge, but all buttons go to same place anyway. Could use some styling

function Language() {
  return (
    <body className="languagePage">
      <div>
        <p style={{fontSize:"15vw", font:"Merriweather"}}> LANGUAGE </p>
        <div>
          <button style={{ backgroundColor: "#FF6565", borderRadius: "15px" }}>
            <Link to="/DischargeSummary">
              <span style={{ fontSize: "10vw", color: "black" }}>English</span>
            </Link>
          </button>{" "}
        </div>
        <br />
        <div>
          <button style={{ backgroundColor: "#FD9535", borderRadius: "15px" }}>
            <Link to="/DischargeSummary">
              <span style={{ fontSize: "10vw", color: "black" }}>中文</span>
            </Link>
          </button>{" "}
        </div>
        <br />
        <div>
          <button style={{ backgroundColor: "#9CE939", borderRadius: "15px" }}>
            <Link to="/DischargeSummary">
              <span style={{ fontSize: "10vw", color: "black" }}>
                Bahasa Melayu
              </span>
            </Link>
          </button>{" "}
        </div>
        <br />
        <div>
          <button style={{ backgroundColor: "#9CE939", borderRadius: "15px" }}>
            <Link to="/DischargeSummary">
              <span style={{ fontSize: "10vw", color: "black" }}>Tamil</span>
            </Link>
          </button>{" "}
        </div>
      </div>
    </body>
  );
}

export default Language;
