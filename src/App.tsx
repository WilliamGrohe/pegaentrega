import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { AuthContextProvider } from './contexts/AuthContext'
import { LocalsContextProvider } from './contexts/LocalsContext'

import { Home } from './pages/Home'
import { Motorista } from './pages/Motorista'
import { Login } from './pages/Login'
import { NewDelivery } from './pages/NewDelivery'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <LocalsContextProvider>
          <Route path="/" exact component={Login} />
            <Route path="/motorista" component={Motorista} />
            <Route path="/home" exact component={Home} />
            <Route path="/newdelivery" component={NewDelivery} />
          </LocalsContextProvider>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
