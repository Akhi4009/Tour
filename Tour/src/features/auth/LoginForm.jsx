import {useState} from 'react'
import { useLogin } from './useLogin';

function LoginForm() {
  
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const {login ,isLoading} = useLogin();
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    login({email,password},{
      onSuccess:()=>{
        setEmail("");
        setPassword("");
      }
    })
  }
  
  return (
    <>
   
    <div className="login-form">
      <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label className="form__label" htmlFor="email">Email address</label>
          <input id="email" className="form__input" type="email" 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="you@example.com" required/>
        </div>
        <div className="form__group ma-bt-md">
          <label className="form__label" htmlFor="password">Password</label>
          <input id="password" className="form__input"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          type="password" placeholder="••••••••" required />
        </div>
        <div className="form__group">
          <button className="btn btn--green" type="submit">Login</button>
        </div>
      </form>
    </div>
  
    </>
  )
  
}

export default LoginForm