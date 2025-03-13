import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import GoogleTranslate from "./GoogleTranslate";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(""); // Store email
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const sendUsername = async () => {
    const username = localStorage.getItem("username"); // Get username from localStorage

    try {
      const response = await fetch("http://127.0.0.1:5000/receive-username", {
        method: "POST", // ✅ Ensure it sends a POST request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }), // ✅ Send username in JSON format
      });

      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ✅ Now useEffect() can access sendUsername()
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const storedUsername = localStorage.getItem("username");

    if (authToken) {
      setIsAuthenticated(true);
      setUsername(storedUsername);

      // Send username to Flask when user is authenticated
      sendUsername();
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

        <GoogleTranslate />
      </div>
    </nav>
  );
};

export default Navbar;
