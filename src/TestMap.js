import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%"
};

export class TestMap extends Component {
    displayCurrent = () => {
        return (
            <Marker position={{
                lat: this.props.coord[1],
                lng: this.props.coord[0],
            }} />
        )
    }
  displayGP = () => {
    return this.props.GP.map(clinic => {
      return (
        <Marker
          key={clinic.id}
          id={clinic.id}
          icon={"http://maps.google.com/mapfiles/ms/icons/green.png"}
          position={{
            lat: clinic.geometry.coordinates[1],
            lng: clinic.geometry.coordinates[0]
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };
  displayPC = () => {
    return this.props.PC.map(clinic => {
      return (
        <Marker
          key={clinic.id}
          id={clinic.id}
          icon={"http://maps.google.com/mapfiles/ms/icons/blue.png"}
          position={{
            lat: clinic.coord[1],
            lng: clinic.coord[0]
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  render() {
    console.log(this.props.coord[1]);
    return (
      <Map
        google={this.props.google}
        zoom={15}
        style={mapStyles}
        initialCenter={{ lat: this.props.coord[1], lng: this.props.coord[0] }}
      >
        {this.displayGP()}
        {this.displayPC()}
        {this.displayCurrent()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDsbjEhJ1510KaVtIQJVTIU7at6hiA__6U"
})(TestMap);
