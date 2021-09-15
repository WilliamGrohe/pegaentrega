import { useHistory } from 'react-router-dom'
import { useContext } from 'react';

import { AuthContext } from '../App';

import '../styles/login.scss'

// type Login = {
//   email: string;
//   password: string;
// }

export function Login() {
  const history = useHistory();
  const { user, signInWithEmail } = useContext(AuthContext);

  if (user){
    history.push('/home')
  }

  function handleSubmit(e: any){
    e.preventDefault()
    // console.log(e.target[0].value)
    // console.log(e.target[1].value)
    // console.log('submeteu o forumlário: ', login)

    // setLogin({
    //   email: e.target[0].value,
    //   password: e.target[1].value,
    // })
    signInWithEmail(e.target[0].value, e.target[1].value)
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={(e) => {
          handleSubmit(e)
          }}>
        <input type="text"   name="user" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit"  className="btn btn-primary btn-block btn-large">Entrar</button>
      </form>
      <div>
      </div>
    </div>
  )
}