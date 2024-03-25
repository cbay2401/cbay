// components/Navbar.jsx

import { NavLink } from "react-router-dom";




function Navbar(){
  
    return(
      <header>
        <div className="header-content">
            
            <div className="logo-container">
                <img id='logo' src='../../../media/cbay.png'></img>
            </div>

            <nav className=" nav-container">
                <NavLink to ="/">Home</NavLink>
                <NavLink to ="/records">Records</NavLink>
                <NavLink to ="/Register"><span>Register</span></NavLink>
                <NavLink to ="/login"><span>Login</span></NavLink>
                <NavLink to ="/users/account"><span>Account</span></NavLink>

            </nav>
        </div>
        </header>

    )
};

export default Navbar;