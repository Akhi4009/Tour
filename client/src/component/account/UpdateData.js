import React,{useState} from 'react'
import {useDispatch} from "react-redux";
import { updateUser } from '../redux/auth/action';

const UpdateData = ({user}) => {
    const [email,setEmail] = useState(user? user.email:'');
  const [name,setName] = useState(user? user.name:'');
  const dispatch = useDispatch();
  const handleSubmit=(e)=>{
    e.preventDefault();
    const data ={name,email};
    dispatch(updateUser(data));
  }

 return (
    <>
    <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
        <form className="form form-user-data" onSubmit={handleSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="name">Name</label>
            <input id="name" className="form__input" type="text"
             value={name} 
             onChange={(e)=>setName(e.target.value)}
             required />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="email">Email address</label>
            <input id="email" className="form__input" type="email" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}
            required />
          </div>
          <div className="form__group form__photo-upload">
          {user?.image &&  <img className="form__user-photo" src="img/user.jpg" alt="User" /> }
           
            <a className="btn-text" href="#">Choose new photo</a>
          </div>
          <div className="form__group right">
            <button className="btn btn--small btn--green" type="submit">Save settings</button>
          </div>
        </form>
      </div>
    </>)

}

export default UpdateData;