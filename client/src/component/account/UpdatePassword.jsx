import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import {updatePassword} from "../redux/auth/action"
const UpdatePassword = () => {
  const [Password,setPassword] = useState('')
  const [passwordcurrent,setPasswordCurrent] = useState('')
  const [passwordConfirm,setPasswordConfirm] = useState('')

  const dispatch = useDispatch();
  const handleSubmit = (e) =>{
    e.preventDefault();
    const data = {
      Password,passwordConfirm,passwordcurrent
    }
    dispatch(updatePassword(data));
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
            type="password" placeholder="••••••••" required minLength="8" />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="password">New password</label>
            <input id="password" className="form__input"
            value={Password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password" placeholder="••••••••" required minLength="8" />
          </div>
          <div className="form__group ma-bt-lg">
            <label className="form__label" htmlFor="password-confirm">Confirm password</label>
            <input id="password-confirm" className="form__input"
            value={passwordConfirm}
            onChange={(e)=>setPasswordConfirm(e.target.value)}
            type="password" placeholder="••••••••" required minLength="8" />
          </div>
          <div className="form__group right">
            <button className="btn btn--small btn--green" type="submit">Save password</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default UpdatePassword;