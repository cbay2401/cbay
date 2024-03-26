import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import Account from "./Account";
import axios from "axios";
import {Link}  from 'react-router-dom'

function Navbar({token}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [cartId, setCartId] = useState(null);

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
    async function getUserAccount() {
      try {
        if (!token) {
          throw new Error("Sorry, Not Logged In, Bud!");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`/api/users/account`, config);
        if (response.data && response.data.cartId) {
          setCartId(response.data.cartId);
        }
        console.log("CART ID:", cartId)
        if (response.data && response.data.order && response.data.order.id) {
          setOrderId(response.data.order.id); 
        }

        console.log("ORDER ID:", orderId)
      } catch (err) {
        console.error("Error fetching user account:", err);
        
      }
      
    }
    getUserAccount();

    handleResize(); 
    window.addEventListener("resize", handleResize); 

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [token]);

  return (
    <header>
      <div className="header-content">
        <div className="logo-container">
          <img id="logo" src="../../../media/cbay.png" alt="Logo" />
        </div>
        {isMobile ? (
          <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />
        ) : (
          <nav className="nav-container">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/records">Records</NavLink>
            <div>
              <span className="nav-user" onClick={toggleMenu}>
                &#x1F464;{" "}
              </span>
              {isMenuOpen && (
                <div className="nav-dropdown" ref={dropdownRef}>
                  <NavLink to="/register">Register</NavLink>
                  <NavLink to="/login">Login</NavLink>
                  <NavLink to="/users/account">Account</NavLink>
                </div>
              )}
            </div>
            <Link to={`/cart/${orderId}`}>
              <span className="nav-cart">&#x1F6D2;</span>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
