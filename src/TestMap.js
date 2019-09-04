import React, { Fragment, Component } from "react";
import { Map, InfoWindow, GoogleApiWrapper, Marker } from "google-maps-react";
import GpDialog from "./GpDialog";
import PcDialog from "./PcDialog";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import InfoWindowEx from "./InfoWindowEx";

const mapStyles = {
  width: "100%",
  height: "100%"
};

export class TestMap extends Component {
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
              GP: {selectedPlace.clinic.properties.HCI_NAME} <hr /> Address:{" "}
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
              {/* <Button>
                <Link
                  to={{
                    pathname: "/selectedChoice",
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
                    pathname: "/selectedChoice",
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
})(TestMap);
