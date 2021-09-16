import { useHistory } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

import '../styles/login.scss'

export function Login() {
  const history = useHistory();
  const { user, signInWithEmail } = useAuth();

  if (user){
    history.push('/home')
  }

  function handleSubmit(e: any){
    e.preventDefault()
    signInWithEmail(e.target[0].value, e.target[1].value)
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={(e) => {
          handleSubmit(e)
          }}>
        <input type="text" name="user" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit" className="btn btn-primary btn-block btn-large">Entrar</button>
      </form>
      <div>
      </div>
    </div>
  )
}