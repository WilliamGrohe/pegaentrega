import { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import { auth } from './services/firebase';

import { Home } from './pages/Home'
import { Login } from './pages/Login'

type User = {
  id: string;
  name: string | null;
  email: string | null;
}

type AuthContextType = {
  user: User | undefined,
  signInWithEmail: (el: string, p: string) => Promise<void>,
  handleSignOut: () => void
}

export const AuthContext = createContext({} as AuthContextType)

function App() {
  const [user, setUser] = useState<User>();
  
  function handleSignOut() {
    auth.signOut().then(() =>{
      alert('Deslogado com sucesso!');
      console.log(user?.name);
    })
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( user =>{
      if (user) {
        const { displayName, uid, email } = user;
        
        setUser({
          id: uid,
          name: displayName,
          email: email
        })
      }
    })

    return () =>{
      unsubscribe();
    }
  }, [])

  
  async function signInWithEmail(email:string, password: string) {

    const userCredential = await auth.signInWithEmailAndPassword(email, password);

    if (userCredential.user) {
      const { displayName, uid, email } = userCredential.user;
      
      setUser({
        id: uid,
        name: displayName,
        email: email
      })
    }
  }


  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithEmail, handleSignOut }}>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Home} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
