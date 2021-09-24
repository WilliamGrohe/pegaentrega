import { useHistory } from "react-router-dom";

import { useAuth } from '../hooks/useAuth'

import { Header } from "../components/Header"
import { GoogleMaps } from "../components/GoogleMaps"

import '../styles/home.scss'

export function Home() {
  const history = useHistory()
  const { user } = useAuth()
  
  if(!user){
    history.push('/')
  }

  return (
    <>
      <Header />
      <main>
        <div id="map" className="teste">
          <GoogleMaps />
        </div>
        <h1>Hello World!</h1>
        <h1>{user?.name}</h1>
        <h1>{user?.email}</h1>
      </main>
    </>
  );
}