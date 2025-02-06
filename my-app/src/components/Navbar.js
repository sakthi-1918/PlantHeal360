import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";  // Importing CSS file for styling

const Navbar = () => {
  // State to handle toggle of menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">🌿 Plantheal360</div>

      {/* Hamburger Icon for small screens */}
      <div className={`hamburger ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>
        <Link to="/library" className="nav-link" onClick={toggleMenu}>Library</Link>
        <Link to="/signin" className="nav-link" onClick={toggleMenu}>Sign In</Link>
        <button className="try-free" onClick={toggleMenu}>Try for Free</button>
      </div>
    </nav>
  );
};

export default Navbar;
