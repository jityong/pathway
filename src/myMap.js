import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';

const API_KEY = "AIzaSyDsbjEhJ1510KaVtIQJVTIU7at6hiA__6U";

class MyMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coord: this.props.coord,
            venues: []
        }
    }
    
  
    componentDidMount() {
    //   this.getVenues()
      this.renderMap()
    }
  
    renderMap = () => {
      loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDsbjEhJ1510KaVtIQJVTIU7at6hiA__6U&callback=initMap")
      window.initMap = this.initMap
    }
  
    // getVenues = () => {
    //   const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    //   const parameters = {
    //     client_id: "PMHC2WA1VCBHVYOPPSJ0QSBYTLRF4PNJ04OWVWV0PZJ0QFIR",
    //     client_secret: "CULSZZ44YAEBOWBFGPB4BF5ISRXXSNYR0EE3JV3CNE2ZWHV0",
    //     query: "food",
    //     near: "Sydney",
    //     v: "20182507"
    //   }
  
    // }
  
    initMap = () => {
        console.log(this.state.coord[1],this.state.coord[0])
      // Create A Map
      var map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: this.state.coord[1], lng: this.state.coord[0]},
        zoom: 8
      })
  
    //   // Create An InfoWindow
    //   var infowindow = new window.google.maps.InfoWindow()
  
    //   // Display Dynamic Markers
    //   this.state.venues.map(myVenue => {
  
    //     var contentString = `${myVenue.venue.name}`
  
    //     // Create A Marker
    //     var marker = new window.google.maps.Marker({
    //       position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
    //       map: map,
    //       title: myVenue.venue.name
    //     })
  
    //     // Click on A Marker!
    //     marker.addListener('click', function() {
  
    //       // Change the content
    //       infowindow.setContent(contentString)
  
    //       // Open An InfoWindow
    //       infowindow.open(map, marker)
    //     })
  
    //   })
  
      
  
    }
  
    render() {
      return (
        <main>
          <div id="map"></div>
        </main>
      )
    }
  }
  
  function loadScript(url) {
    var index  = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
  }
  
  export default MyMap;