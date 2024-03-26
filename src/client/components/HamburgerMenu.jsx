import React from "react";
import { NavLink } from "react-router-dom";

const HamburgerMenu = ({ isOpen, toggleMenu }) => {
  return (
    <div className={`hamburger-menu ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      {isOpen && (
        <div className="dropdown-menu">
          <NavLink to="/" className="dropdown-item">Home</NavLink>
          <NavLink to="/records" className="dropdown-item">Records</NavLink>
          <NavLink to="/register" className="dropdown-item">Register</NavLink>
          <NavLink to="/login" className="dropdown-item">Login</NavLink>
          <NavLink to="/users/account" className="dropdown-item">Account</NavLink>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
