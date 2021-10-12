import { useState, useContext, useEffect } from "react"
import { Header } from "../components/Header"
import { GoogleMaps } from "../components/GoogleMaps"
import { NewDeliveryForm } from "../components/NewDeliveryForm"

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { getLatLng, geocodeByAddress } from 'react-google-places-autocomplete';

import { LocalsContext } from '../contexts/LocalsContext'


export function NewDelivery() {
  const { setLatLngOnContext } = useContext(LocalsContext)

  // ------ LOCALIZAÇÂO GEOLOCATION ---------------

  // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
  
  
  const [adress, setAdress] = useState('');
  const resultAdress = Object.values(adress)[0];

  async function getSelectionLatLng() {
    const results = await geocodeByAddress(resultAdress)
    const latLng = await getLatLng(results[0])
    setLatLngOnContext(latLng.lat, latLng.lng)
  }

  useEffect(() => {getSelectionLatLng()}, [resultAdress])

  return (
    <>
      <Header />
      <main>
        <div id="map" style={{ height: "300px", width: "auto" }} className="teste">
          <GoogleMaps />
        </div>
        <GooglePlacesAutocomplete
          apiKey={process.env.REACT_APP_MAPS_API_KEY}
          selectProps={{
            location: 'LatLng',
            adress,
            onChange: setAdress
          }}
        />
        <NewDeliveryForm />
      </main>
    </>
  )
}