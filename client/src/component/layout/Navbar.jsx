import React, { useEffect } from 'react'
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import img1 from "../../img/logo-white.png"
import { logOut } from '../redux/auth/action'


const Navbar = () => {
  
const {user,token} = useSelector(state=>state.auth);
const dispatch = useDispatch();
console.log(user);

const handleClick=()=>{
  dispatch(logOut())
}


return (
    <>
    <header className="header">
    <nav className="nav nav--tours">
   <Link to="/" className="nav__el">All tours</Link>
      
    </nav>
    <div className="header__logo">
      <img src={img1} alt="Natours logo" />
    </div>
   <nav className="nav nav--user">
 
{token && 
  <>
  <Link to="/" className="nav__el">My bookings</Link>
<Link to="/" className="nav__el">
{user?.image && <img src="img/user.jpg" alt="User" className="nav__user-img" />}
  
  <span>{user?.name}</span>
</Link> 
<button  className="nav__el" onClick={handleClick} >Logout</button>
</>
}
      {!token &&
        <>
        <Link to="/login" className="nav__el">Log in</Link>
        <Link to="/signup" className="nav__el nav__el--cta">Sign up</Link> 
        </>
      }

  
  </nav>
  </header>
    </>
  )
}

export default Navbar