
// components/Navbar.jsx

import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu' 

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

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
      
        
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <header>
            <div className="header-content">
                <div className="logo-container">
                    <img id='logo' src='../../../media/cbay.png' alt="Logo" />
                </div>
                {isMobile ? (
          <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />
        ) : (
                <nav className="nav-container">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/records">Records</NavLink>
                    <div>
                        <span className="nav-user" onClick={toggleMenu}>&#x1F464; </span>
                        {isMenuOpen && (
                            <div className="nav-dropdown" ref={dropdownRef}>
                                <NavLink to="/register">Register</NavLink>
                                <NavLink to="/login">Login</NavLink>
                                <NavLink to="/users/account">Account</NavLink>
                            </div>
                        )}
                    </div>
                    <NavLink to="/cart/:cartid"><span className="nav-cart">&#x1F6D2;</span></NavLink>
                </nav>)}
            </div>
        </header>
    );
}

export default Navbar;

