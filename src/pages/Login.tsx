import { Link, useHistory } from 'react-router-dom'
import { useContext, useState } from 'react';

import { auth, firebase } from '../services/firebase'
import { AuthContext } from '../App';

import '../styles/login.scss'

// type Login = {
//   email: string;
//   password: string;
// }

export function Login() {
  const history = useHistory();
  const user = useContext(AuthContext);
  // const [login, setLogin] = useState<Login>();

  function handleSubmit(e: any){
    e.preventDefault()
    // console.log(e.target[0].value)
    // console.log(e.target[1].value)
    // console.log('submeteu o forumlário: ', login)

    // setLogin({
    //   email: e.target[0].value,
    //   password: e.target[1].value,
    // })
    
    user.signInWithEmail(e.target[0].value, e.target[1].value)
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
        <button >Ver variaveis</button>
      </div>
    </div>
  )
}