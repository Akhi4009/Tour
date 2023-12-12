import React from 'react'
import {Link} from "react-router-dom"
import img1 from "../../img/logo-white.png"

const Navbar = () => {
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

    {/*  <Link to="#" className="nav__el">My bookings</Link>
      <Link to="#" className="nav__el">
        <img src="img/user.jpg" alt="User photo" className="nav__user-img" />
        <span>Akhilesh</span>
      </Link>

  <button className="nav__el">Log in</button>*/}
      <button className="nav__el nav__el--cta">Sign up</button> 
  </nav>
  </header>
    </>
  )
}

export default Navbar