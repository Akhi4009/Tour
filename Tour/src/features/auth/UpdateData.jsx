import {useEffect, useState} from 'react'
import {useUser} from "./useUser";
import { useUpdateUser } from './useUpdateUser';



  const UpdateData = () => {
  const {user:{email:curemail,name:curname,photo} ={} } = useUser();
  const {updateUser, isUpdating } = useUpdateUser();
  const image = `/img/users/${photo}`
  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [avatar, setAvatar] = useState(null);

 
  
 useEffect(()=>{
  setEmail(curemail);
  setName(curname);
 },[curemail,curname]);

  const handleSubmit=(e)=>{
    e.preventDefault();
    updateUser({email,name,photo:avatar});
  }

  
 return (
    <>
    <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
        <form className="form form-user-data" onSubmit={handleSubmit}
        encType='multipart/form-data'>
          <div className="form__group">
            <label className="form__label" htmlFor="name">Name</label>
            <input id="name" className="form__input" type="text"
             value={name} 
             onChange={(e)=>setName(e.target.value)}
             disabled={isUpdating}
             required />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="email">Email address</label>
            <input id="email" className="form__input" type="email" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}
            disabled={isUpdating}
            required />
          </div>
          <div className="form__group form__photo-upload">
          {photo && <img className="form__user-photo" src={image} alt="User" /> }
           
          <input type='file' 
            className='form__upload'
            accept='image/*'
            onChange={(e)=>setAvatar(e.target.files[0])}
            id="photo" name='photo'/>
            <label htmlFor='photo'>Choose new photo</label>
          </div>
          <div className="form__group right">
            <button className="btn btn--small btn--green" 
            type="submit"
            disabled={isUpdating}
            >Save settings</button>
          </div>
        </form>
      </div>
    </>)

}

export default UpdateData;