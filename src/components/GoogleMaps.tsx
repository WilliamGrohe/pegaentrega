import { Loader } from "@googlemaps/js-api-loader"
import { useContext, useEffect } from "react";
import { LocalsContext } from "../contexts/LocalsContext";

import { useDeliveries } from "../hooks/useDeliveries"

export function GoogleMaps() {
  const { coords } = useContext(LocalsContext)

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

  const pointsDeliveries = useDeliveries()

  async function showMaps() {

    const configMaps = await loader.load()
    const map = new configMaps.maps.Map(document.getElementById("map") as HTMLElement, mapOptions)

    for (var i = 0; i < pointsDeliveries.length; i++) {
      if(!pointsDeliveries[i].finished){
        new configMaps.maps.Marker({
          position: { lat: pointsDeliveries[i].lat, lng: pointsDeliveries[i].lng },
          map: map,
          title: pointsDeliveries[i].name
        });
      }
    }

    if (coords){
      new configMaps.maps.Marker({
        position: { lat: coords.latitude, lng: coords.longitude },
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
      });
    }

  }

  useEffect(() => { showMaps() })

  return (
      <div id="map" style={{ height: 'auto' }}></div>
  )
}