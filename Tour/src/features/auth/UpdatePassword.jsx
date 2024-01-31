import React, { useState } from 'react';
import toast from "react-hot-toast"
import { useUpdateUser } from './useUpdateUser';

const UpdatePassword = () => {
  const [password,setPassword] = useState('')
  const [passwordcurrent,setPasswordCurrent] = useState('')
  const [passwordConfirm,setPasswordConfirm] = useState('')

  const {updateUser, isUpdating} = useUpdateUser();
  function handleSubmit(e){
    e.preventDefault();
    if(password !== passwordConfirm){
      toast.error("password do not match");
      return;
    }
  
    updateUser({password,passwordConfirm,passwordcurrent});
  }
  
  return (
    <>
    <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Password change</h2>
        <form className="form form-user-settings" onSubmit={handleSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="password-current">Current password</label>
            <input id="password-current" className="form__input"
            value={passwordcurrent}
            onChange={(e)=>setPasswordCurrent(e.target.value)}
            disabled={isUpdating}
            type="password" placeholder="••••••••" required minLength="8" />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="password">New password</label>
            <input id="password" className="form__input"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            disabled={isUpdating}
            type="password" placeholder="••••••••" required minLength="8" />
          </div>
          <div className="form__group ma-bt-lg">
            <label className="form__label" htmlFor="password-confirm">Confirm password</label>
            <input id="password-confirm" className="form__input"
            value={passwordConfirm}
            onChange={(e)=>setPasswordConfirm(e.target.value)}
            disabled={isUpdating}
            type="password" placeholder="••••••••" required minLength="8" />
          </div>
          <div className="form__group right">
            <button className="btn btn--small btn--green"
             type="submit"
             disabled={isUpdating}
             >Save password</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default UpdatePassword;