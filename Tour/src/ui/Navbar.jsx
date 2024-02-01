import {Link,} from "react-router-dom"
import Logo from "./Logo"
import { useUser } from "../features/auth/useUser"
import { getCookie } from "../utils/helper";
import { useLogout } from "../features/auth/useLogout";

function Navbar() {
  const {user:{name,photo}={}} = useUser();
  const {logout, isLoading:isLoading1} = useLogout();
  
  const image = `public/img/users/${photo}`;
return (
    <>
    <header className="header">
    <nav className="nav nav--tours">
   <Link to="/" className="nav__el">All tours</Link>
      
    </nav>
   <Logo/>
   <nav className="nav nav--user">
 
{ name && (<>
  <Link to="/" className="nav__el">My bookings</Link>
  <Link to="/account" className="nav__el">
  <img src={image} alt={name} className="nav__user-img" />
    <span>{name}</span>
  </Link> 
  <button  className="nav__el" 
  disabled={isLoading1}
  onClick={()=>logout()} >Logout</button>
  </>)}

    {!name && (
      <>
      <Link to="/login" className="nav__el">Log in</Link>
      <Link to="/signup" className="nav__el nav__el--cta">Sign up</Link> 
      </>
    )}
    </nav>
</header>
</>
)
}

export default Navbar;
     
       
        