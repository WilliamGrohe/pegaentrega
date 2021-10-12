import { Loader } from "@googlemaps/js-api-loader"
import { useContext } from "react";
import { LocalsContext } from "../contexts/LocalsContext";

export function GoogleMaps() {
  const {coords} = useContext(LocalsContext)

  const initialLocal = {  //Caxias do Sul- RS
    lat: -29.160313262419535,
    lng: -51.18102700226938
  };

  const loader = new Loader({
    apiKey: process.env.REACT_APP_MAPS_API_KEY!,
    version: "weekly",
    libraries: ["places"]
  });

  const mapOptions = {
    center: initialLocal,
    zoom: 11.5
  };

  // let latTemp = 0
  let latTemp = 0
  let lngTemp = 0

  if(coords){
    latTemp = coords?.latitude
    lngTemp = coords?.longitude
  }

  // var points = [
  //   { lat: -29.167961687824604, lng: -51.17937243618333 },
  //   { lat: -29.16684216140418, lng: -51.17809570887628 },
  //   { lat: -29.162314, lng: -51.176265 },
  //   { lat: -29.1252000197085, lng: -51.1593995197085 }
  // ]

  var points = [
    {lat: latTemp, lng: lngTemp},
    {lat: -29.1673608, lng: -51.177434}
  ]


  loader
    .load()
    .then((google) => {
      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, mapOptions);

      for (var i = 0; i < points.length; i++) {
        new google.maps.Marker({
          position: points[i],
          map: map
        });
      };
    })
    .catch(e => {
      console.log(e)
    })

  return (

    <div id="map" style={{ height: 'auto' }}></div>
  )
}