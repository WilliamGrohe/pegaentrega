import { useHistory } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

import '../styles/login.scss'

export function Login() {
  const history = useHistory();
  const { user, signInWithEmail } = useAuth();

  if(user){
    // history.push('/homemotorista')
    if (user?.name === "Motorista") {
      history.push('/motorista')
    }
  
    if (user?.name === "Televendas") {
      history.push('/home')
    }
  }


  async function handleSubmit(e: any) {
    e.preventDefault()
    if(!user){
      await signInWithEmail(e.target[0].value, e.target[1].value)
    }

    // history.push('/motorista')
    if (user?.name === "Motorista") {
      history.push('/motorista')
    }

    if (user?.name === "Televendas") {
      history.push('/home')
    }

  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={(e) => {
        handleSubmit(e)
      }}>
        <input type="text" name="user" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit" className="buttonClass">Entrar</button>
      </form>
      <div>
      </div>
    </div>
  )
}