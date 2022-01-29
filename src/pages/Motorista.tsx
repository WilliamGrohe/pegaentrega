import { useHistory } from "react-router-dom";

import { useAuth } from '../hooks/useAuth'

import { Header } from "../components/Header"
import { GoogleMaps } from "../components/GoogleMaps"
import { DeliveryList } from '../components/DeliveryList'
import { useDeliveries } from '../hooks/useDeliveries'

import '../styles/home.scss'

export function Motorista() {
  const history = useHistory()
  const { user } = useAuth()

  if (!user) {
    history.push('/')
  } else if (user.name !== "Motorista") {
    history.push('/home')
  }

  // const entregasDatabase = DatabaseDeliveries()

  const deliveries = useDeliveries()

  return (
    <>
      <Header />
      <main>
        <div id="map" className="map">
          <GoogleMaps />
        </div>
        <div className="delivery-list">
          <h2>MOTORISTA</h2>
          <table className="table-action">

            <thead className="table-header">
              <tr>
                <th>NOME</th>
                <th>VOL</th>
                <th>ENDEREÇO</th>
                <th>TURNO</th>
                <th>STATUS<br />
                </th>
              </tr>
            </thead>
            <tbody className="u-align-center u-table-body">
              {deliveries.map(delivery => {
                return (
                  <DeliveryList
                    name={delivery.name}
                    volumes={delivery.volumes}
                    id={delivery.id}
                    adress={delivery.adress}
                    inRoad={delivery.inRoad}
                    finished={delivery.finished}
                  />
                )
              })}
            </tbody>
          </table>

        </div>

      </main>
    </>
  );
}