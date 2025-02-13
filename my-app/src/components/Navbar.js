import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(""); // Store email
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Check authentication when component loads
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const storedUsername = localStorage.getItem("username");

    if (authToken) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    } else {
      setIsAuthenticated(false);
      setUsername("");
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUsername("");
    navigate("/home");
  };

  return (
    <nav className="navbar">
      <div className="logo">🌿 Plantheal360</div>

      {/* Hamburger Icon for small screens */}
      <div
        className={`hamburger ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <Link to="/home" className="nav-link" onClick={toggleMenu}>
          Home
        </Link>
        <Link to="/library" className="nav-link" onClick={toggleMenu}>
          Library
        </Link>

        {!isAuthenticated ? (
          <Link to="/login" className="nav-link" onClick={toggleMenu}>
            Sign In
          </Link>
        ) : (
          <div className="profile-dropdown">
            <button className="nav-link profile-btn" onClick={toggleProfile}>
              👤Profile
            </button>
            {isProfileOpen && (
              <div className="dropdown-menu">
                <p className="dropdown-item">{username}</p>
                <button
                  className="dropdown-item logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        <button className="try-free" onClick={toggleMenu}>
          Try for Free
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
