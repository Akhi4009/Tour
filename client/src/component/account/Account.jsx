import React from 'react'
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import UpdateData from "./UpdateData"
import UpdatePassword from './UpdatePassword';



const Account = () => {

  const {user} = useSelector(state=>state.auth);
  

  return (
    <>
    <main className="main">
  <div className="user-view">
    <nav className="user-view__menu">
      <ul className="side-nav">
        <li className="side-nav--active">
          <Link to="/me">
            
            Settings
          </Link>
        </li>
        <li>
          <Link to="/me">
          
            My bookings
          </Link>
        </li>
        <li>
          <Link to="/me">
           
            My reviews
          </Link>
        </li>
        <li>
          <Link to="/me">
          
            Billing
          </Link>
        </li>
      </ul>
      {
        user?.role === "admin" && 
      <div className="admin-nav">
      <h5 className="admin-nav__heading">Admin</h5>
      <ul className="side-nav">
        <li>
          <Link to="/me">
            
            Manage tours
          </Link>
        </li>
        <li>
          <Link to="/me">
           
            Manage users
          </Link>
        </li>
        <li>
          <Link to="/me">
           
            Manage reviews
          </Link>
        </li>
        <li>
          <Link to="/me">
           
          </Link>
        </li>
      </ul>
    </div> 
  }
      
    </nav>
    <div className="user-view__content">
     <UpdateData user={user}/>
      <div className="line">&nbsp;
      </div>
      <UpdatePassword/>
    </div>
  </div>
</main>
    </>
  )
}

export default Account;