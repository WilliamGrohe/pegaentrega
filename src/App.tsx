import { createContext, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import { auth, firebase } from './services/firebase';

import { Home } from './pages/Home'
import { Login } from './pages/Login'

type User = {
  id: string;
  name: string;
}

type LoginType = {
  data: string;
}

type AuthContextType = {
  user: User | undefined,
  signInWithEmail: (el: string, p: string) => void
}

export const AuthContext = createContext({} as AuthContextType)

function App() {
  const [user, setUser] = useState<User>();
  
  function signInWithEmail(email:string, password: string) {
    
    auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
        if (userCredential.user) {
          const { displayName, uid, email, providerId } = userCredential.user;
          
          setUser({
            id: uid,
            name: providerId
          })

          console.log(user?.id, user?.name)
        }

      })
      .catch((error) => {
        alert('Ops, algo está errado! Confira o e-mail e senha e tente novamente.')
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
      });
  }


  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithEmail }}>
        <Route path="/" exact component={Login} />
        <Route path="/home/" component={Home} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
