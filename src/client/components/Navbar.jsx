// components/Navbar.jsx

/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
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