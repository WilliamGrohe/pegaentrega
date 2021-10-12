import { BrowserRouter, Route } from 'react-router-dom'

import { AuthContextProvider } from './contexts/AuthContext'
import { LocalsContextProvider } from './contexts/LocalsContext'

import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { NewDelivery } from './pages/NewDelivery'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Login} />
        <LocalsContextProvider>
          <Route path="/home" component={Home} />
          <Route path="/newdelivery" component={NewDelivery} />
        </LocalsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
