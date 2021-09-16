import { useHistory } from "react-router-dom";

import { useAuth } from '../hooks/useAuth'

import { Header } from "../components/Header"

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
        <div className="teste">
          <img src="https://i.imgur.com/m1RlnWR.jpg" alt="" />
        </div>
        <h1>Hello World!</h1>
        <h1>{user?.name}</h1>
        <h1>{user?.email}</h1>
      </main>
    </>
  );
}