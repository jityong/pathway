import React, { Fragment, Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import PcDialog from "../PcDialog";
import Button from "@material-ui/core/Button";
import InfoWindowEx from "./InfoWindowEx";
import { Link, Redirect } from "react-router-dom";

const mapStyles = {
  width: "100%",
  height: "100%"
};

export class ClinicMap extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {
      clinic: {
        type: ""
      }
    },
    showingInfoWindow: false
  };

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });

  render() {
    const { GP, PC, parentCallback } = this.props;
    const { selectedPlace } = this.state;

    const displayCurrent = (
      <Marker
        clinic={{type: "currentloc"}}
        position={{
          lat: this.props.coord[1],
          lng: this.props.coord[0]
        }}
      />
    );

    const displayGP = GP.map(clinic => {
      clinic.type = "GP";
      clinic.name = clinic.properties.HCI_NAME;
      clinic.price = "$$";
      clinic.rating = "4.3";
      clinic.doctorName = clinic.properties.DR_NAME;
 
      clinic.formattedOpeningHours = clinic.properties.ALL_OPENING_HOURS.map(
        period =>
          period.day_string + ":</br>" + period.opening_hours.join(",</br>")
      ).join("</br></br>");

      
      clinic.formattedDirections = clinic.properties.ALL_DIRECTIONS.map(
        path => path.transport_string + "</br>" + path.directions.join(",</br>")
      ).join("</br></br>");
      


      return (
        <Marker
          key={clinic.id}
          clinic={clinic}
          id={clinic.id}
          icon={"http://maps.google.com/mapfiles/ms/icons/green.png"}
          position={{
            lat: clinic.geometry.coordinates[1],
            lng: clinic.geometry.coordinates[0]
          }}
          onClick={this.onMarkerClick}
        />
      );
    });

    const displayPC = PC.map(clinic => {
      clinic.type = "Polyclinic";
      clinic.name = clinic.Name;
      clinic.price = "$";
      clinic.rating = "4.0";
      return (
        <Marker
          key={clinic.id}
          clinic={clinic}
          id={clinic.id}
          icon={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
          position={{
            lat: clinic.coord[1],
            lng: clinic.coord[0]
          }}
          onClick={this.onMarkerClick}
        >
          <PcDialog clinic={clinic} />
        </Marker>
      );
    });
    return (
      <Map
        google={this.props.google}
        zoom={15}
        style={mapStyles}
        initialCenter={{ lat: this.props.coord[1], lng: this.props.coord[0] }}
      >
        {displayGP}
        {displayPC}
        {displayCurrent}
        {console.log(displayCurrent)}
        <InfoWindowEx
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
          selectedPlace={selectedPlace}
        >
          {selectedPlace.clinic.type === "GP" ? (
            <div>
              GP:
              <img
                src={
                  process.env.PUBLIC_URL +
                  `/ClinicPictures/${selectedPlace.clinic.properties.FILE_NAME}.png`
                }
                alt="clinic picture"
                style={{ width: "100%" }}
              />
              <hr />
              {selectedPlace.clinic.properties.HCI_NAME} <hr /> Address:{" "}
              {selectedPlace.clinic.properties.BLK_HSE_NO}{" "}
              {selectedPlace.clinic.properties.STREET_NAME} #
              {selectedPlace.clinic.properties.FLOOR_NO}-
              {selectedPlace.clinic.properties.UNIT_NO}{" "}
              {selectedPlace.clinic.properties.BUILDING_NAME} Singapore{" "}
              {selectedPlace.clinic.properties.PostalCode}
              <hr /> Telephone: {selectedPlace.clinic.properties.Tel} <hr />
              Applicable subsidies:{" "}
              {selectedPlace.clinic.properties.CLINIC_PROGRAMME_CODE.join(", ")}
              <hr />
              Distance:
              {parseFloat(selectedPlace.clinic.distance).toFixed(2)}km away
              <hr />
              Doctor: {selectedPlace.clinic.properties.DR_NAME}
              {/* <hr />
              Opening Hours:
              {selectedPlace.clinic.properties.ALL_OPENING_HOURS.map(period => (
                  period.day_string + ":\n" + period.opening_hours.join(",\n")
              ))
              .join(", \n")}
              <hr />
              Directions:
              {selectedPlace.clinic.properties.ALL_DIRECTIONS.map(path => (
              path.transport_string + "\n" + path.directions.join(",\n")
              ))
              .join(", \n")}
              <hr /> */}
              <hr />
              <p>Opening Hours:</p>
              <hr />
              {selectedPlace.clinic.properties.ALL_OPENING_HOURS.map(period => (
                <p>
                  {period.day_string}
                  <br />
                  {period.opening_hours.join(", ")}
                </p>
              ))}
              <hr />
              <p>Directions:</p>
              {selectedPlace.clinic.properties.ALL_DIRECTIONS.map(path => (
                <p>
                  {path.transport_string}
                  <br />
                  {path.directions.join(", ")}
                </p>
              ))}
              <hr />
              {/* <Button>
                <Link
                  to={{
                    pathname: "/ConfirmClinicChoice",
                    state: {
                      choice: selectedPlace.clinic
                    }
                  }}
                >
                  <span>Select</span>
                </Link>
              </Button> */}
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  this.props.callbackFunction(selectedPlace.clinic)
                }
              >
                {console.log(selectedPlace.clinic)}
                <span style={{ color: "white" }}>Add to comparison</span>
              </Button>
            </div>
          ) : selectedPlace.clinic.type === "Polyclinic" ? (
            <div>
              Polyclinic: {selectedPlace.clinic.Name} <hr /> Address:{" "}
              {selectedPlace.clinic.Address} Singapore{" "}
              {selectedPlace.clinic.PostalCode}
              <hr /> Telephone: {selectedPlace.clinic.Tel} <hr /> Distance:{" "}
              {parseFloat(selectedPlace.clinic.distance).toFixed(2)}km away
              <hr />
              {/* <Button>
                <Link
                  to={{
                      pathname: "/ConfirmClinicChoice",
                    state: {
                      choice: selectedPlace.clinic
                    }
                  }}
                >
                  <span>Select</span>
                </Link>
              </Button> */}
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  this.props.callbackFunction(selectedPlace.clinic)
                }
              >
                <span style={{ color: "white" }}>Add to comparison</span>
              </Button>
            </div>
          ) : (
            <div>Input Location</div>
          )}
        </InfoWindowEx>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDsbjEhJ1510KaVtIQJVTIU7at6hiA__6U"
})(ClinicMap);
