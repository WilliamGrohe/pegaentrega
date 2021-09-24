// import { Map, GoogleApiWrapper } from 'google-maps-react';

import { Loader } from "@googlemaps/js-api-loader"

export function GoogleMaps() {

  const API_KEY = "AIzaSyC4XTy6v9vkL4EcRrE8SZBURgLoFjrPrcE";

  // let map: google.maps.Map;

  // function initMap(): void {
  //   map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
  //     center: { lat: -34.397, lng: 150.644 },
  //     zoom: 8,
  //   });
  // }


  const loader = new Loader({
    apiKey: API_KEY,
    version: "weekly",
    libraries: ["places"]
  });

  const mapOptions = {
    center: {
      lat: -29.126345456198347,
      lng: -51.16065700003484
    },
    zoom: 16
  };

  loader
    .load()
    .then((google) => {
      new google.maps.Map(document.getElementById("map"), mapOptions);
  })
  .catch(e=> {
    console.log(e)
  })
  return (

    <div id="map" style={{height: 'auto'}}></div>
  )
}