import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";  // Importing CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">🌿 Plantheal360</div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/library" className="nav-link">Library</Link>
        <Link to="/signin" className="nav-link">Sign In</Link>
        <button className="try-free">Try for Free</button>
      </div>
    </nav>
  );
};

export default Navbar;
