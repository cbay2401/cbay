/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import { NavLink } from "react-router-dom";



function Navbar(){
    return(
      <header>
        <div>
        <img id='logo' src='../../../media/cbay.png'></img>
        </div>
        <nav>
            
            <NavLink to ="/">Home</NavLink>
            <NavLink to ="/records">Records</NavLink>
            <NavLink to ="/Login">Login</NavLink>
            <NavLink to ="/Register">Register</NavLink>

        </nav>
        </header>

    )
};

export default Navbar;