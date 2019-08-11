import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Fancyline from "./Fancylines";
import lock from "./lock.png";

//Login page, which is the first page user will see. Need to change background
//color to blue (whole page & considering responsive web design) for it to look good


function Login() {
  return ( 

        <div style={{backgroundColor: "#4d92fb",
          height: "100%",
          width: "100%",
          minHeight: "100vh",
          minWidth: "100vw"
         }}>
          <p className="Title"> Pathway</p>
        <Fancyline />
        <p
          style={{
            textAlign: "center",
            fontFamily: "Lobster",
            fontSize: "6vw",
            minWidth: "200px",
            color: "white",
            // backgroundColor: "#4D92FB",
            display:"block"
          }}
        >
          Make informed decision on
          <br />
          your choice of primary-cary provider
        </p>
        <div
          style={{
            // backgroundColor: "#4D92FB",
            textAlign: "center",
            display:"block"
            // margin: "10em"
          }}
        >
          <button className="btn btn-danger">
            <Link to="/Language">
              <label
                style={{
                  textAlign: "center",
                  font: "Roboto Condensed",
                  fontSize: "10vm",
                  color: "white"
                }}
              >
                {/* SINGPASS LOGIN
                <img src={lock} alt="lock" height="50vw" width="50vw" />  */}
                CONTINUE
              </label>
            </Link>
          </button>
        </div>
        </div>
  );
}

export default Login;
