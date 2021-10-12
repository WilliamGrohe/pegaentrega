import { createContext, useEffect, useState, ReactNode } from "react";
import { auth } from "../services/firebase";

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

type AuthContextProviderType = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderType){
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
  
  async function signInWithEmail(email: string, password: string) {

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

  return(
    <AuthContext.Provider value={{ user, signInWithEmail, handleSignOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}