import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/image1.jpeg";
import "./Home.css";

function Home() {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep === 5 ? 1 : prevStep + 1));
    }, 4000); // Change step every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      {/* Google Translate Switcher */}

      {/* Main Content */}
      <div className="main-content-container">
        <div className="text-section">
          <h1 className="title">
            Identify and cure <span>plant diseases</span> with PlantHeal
          </h1>
          <p className="description">
            Is your green buddy dying? Try the Plantheal360 website to identify
            the cause and get extensive disease and care info in a snap.
          </p>
          <button
            className="cta-button"
            onClick={() => (window.location.href = "http://127.0.0.1:5000")}
          >
            Diagnose Now
          </button>
        </div>
      </div>

      {/* How to Identify a Disease Section */}
      <div className="identify-disease-container">
        <h2 className="how-to-heading">
          <span>How PlantHeal360 works</span>
        </h2>
        <div className="steps-container">
          {[1, 2, 3, 4, 5].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`step ${
                activeStep === stepNumber ? "active-step" : ""
              }`}
            >
              <span className="step-number">{stepNumber}</span>
              {stepNumber === 1 && "Open PlantHeal and tap the Diagnose Button"}
              {stepNumber === 2 && "Upload your sick plant image"}
              {stepNumber === 3 && "Answer a couple of questions"}
              {stepNumber === 4 &&
                "That’s it! Now you know the issue and how to cure it"}
              {stepNumber === 5 &&
                "Get to know some infos from our Library page"}
            </div>
          ))}
        </div>
        <button
          className="cta-button"
          onClick={() => (window.location.href = "http://127.0.0.1:5000")}
        >
          Upload image
        </button>
      </div>

      {/* Additional Section */}
      <div className="treatment-section">
        <h3 className="treatment-heading">
          Stop killing – start treating your plants!
        </h3>
        <p className="treatment-description">
          Diagnose issues quickly and get actionable tips to help your plants
          thrive. Use Plantheal360 to become a plant care expert!
        </p>
        <button
          className="cta-button"
          onClick={() => (window.location.href = "http://127.0.0.1:5000")}
        >
          Diagnose Now
        </button>
      </div>

      {/* Footer Section */}
      <footer className="footer-container">
        <div className="footer-content">
          <p>© Makx Controls</p>
          <div className="footer-links">
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy policy</Link>
            <Link to="/cookies">Cookie policy</Link>
            <Link to="/support">Support</Link>
            <Link to="/personal-info">
              Do not sell or share my personal information
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
