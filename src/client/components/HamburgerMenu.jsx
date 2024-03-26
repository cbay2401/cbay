import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const HamburgerMenu = ({ isOpen, toggleMenu, token }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    const getUserAccount = async () => {
      try {
        if (!token) {
          setIsLoggedIn(false); 
          return;
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
        if (response.data && response.data.order && response.data.order.id) {
          setOrderId(response.data.order.id);
        }

        setIsLoggedIn(true); 
      } catch (err) {
        console.error("Error fetching user account:", err);
      }
    };

    getUserAccount();
  }, [token]);

  return (
    <div className={`hamburger-menu ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      {isOpen && isLoggedIn && (
        <div className="dropdown-menu">
          <NavLink to="/" className="dropdown-item">Home</NavLink>
          <NavLink to="/records" className="dropdown-item">Records</NavLink>
          <NavLink to="/register" className="dropdown-item">Register</NavLink>
          <NavLink to="/login" className="dropdown-item">Login</NavLink>
          <NavLink to="/users/account" className="dropdown-item">Account</NavLink>
          <NavLink to={`/cart/${orderId}`} className="dropdown-item">Cart</NavLink>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;

