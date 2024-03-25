import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize); // Listen for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="header-content">
        <div className="logo-container">
          <img id="logo" src="../../../media/cbay.png" alt="logo" />
        </div>

        {isMobile ? (
          <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />
        ) : (
          <nav className="nav-container-nav">
            <div className="nav-container">
            <NavLink to ="/">Home</NavLink>
                <NavLink to ="/records">Records</NavLink>
                <NavLink to ="/Register"><span>Register</span></NavLink>
                <NavLink to ="/login"><span>Login</span></NavLink>
                <NavLink to ="/users/account"><span>Account</span></NavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
