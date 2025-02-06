import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
import "../assets/image1.jpeg";
import "./Home.css";

function Home() {
  const [activeStep, setActiveStep] = useState(null);

  const handleStepClick = (stepNumber) => {
    setActiveStep(stepNumber);
  };

  useEffect(() => {
    // Select all the steps
    const steps = document.querySelectorAll('.step');

    // Set up an IntersectionObserver to detect when the steps come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Apply fade-in effect with a delay
          entry.target.style.transition = 'opacity 1s ease-out, background-color 0.5s ease-out';
          entry.target.style.opacity = 1;

          // Add dark green background with text highlight after fade-in
          setTimeout(() => {
            entry.target.classList.add('highlighted');
          }, index * 2000); // Delay each step by 2 seconds
        }
      });
    }, {
      threshold: 0.5, // Trigger when 50% of the element is in view
    });

    // Observe each step element
    steps.forEach((step) => {
      observer.observe(step);
    });

    // Clean up observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      {/* <Navbar /> */}

      {/* Main Content */}
      <div className="main-content-container">
        <div className="text-section">
          <h1 className="title">
            Identify and cure <span>plant diseases</span> with PlantHeal
          </h1>
          <p className="description">
            Is your green buddy dying? Try the Plantheal360 website to identify the cause and get extensive disease and care info in a snap.
          </p>
          <button className="cta-button">Diagnose Now</button>
        </div>

        <div className="image-section">
          <img
            src={require("../assets/image2.jpeg")}
            alt="plant diagnosis"
            className="plant-image"
          />
          <div className="diagnosis-card">
            <p className="plant-status">🌱 Sick plant</p>
            <h3 className="plant-name">Brinjal</h3>
            <p className="diagnosis">Overwatering and nutrient deficiency detected</p>
            <button className="cure-button">Cure</button>
          </div>
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
              className={`step ${activeStep === stepNumber ? "active-step" : ""}`}
              onClick={() => handleStepClick(stepNumber)}
            >
              <span className="step-number">{stepNumber}</span>
              {stepNumber === 1 && "Open PlantHeal and tap the camera button in the Plant Health tab"}
              {stepNumber === 2 && "Place your sick plant at the center of the frame"}
              {stepNumber === 3 && "Snap photos of the diseased parts of a leaf or multiple leaves"}
              {stepNumber === 4 && "Answer a couple of questions from our bot to get accurate results"}
              {stepNumber === 5 && "That’s it! Now you know the issue and how to cure it"}
            </div>
          ))}
        </div>
        <button className="cta-button">Upload image</button>
      </div>

      {/* Additional Section */}
      <div className="treatment-section">
        <h3 className="treatment-heading">Stop killing – start treating your plants!</h3>
        <p className="treatment-description">
          Diagnose issues quickly and get actionable tips to help your plants thrive. Use Plantheal360 to become a plant care expert!
        </p>
        <button className="cta-button">Diagnose Now</button>
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
            <Link to="/personal-info">Do not sell or share my personal information</Link>
          </div>
          <p className="footer-company-details">
            Copyright © Makx Controls | Via Nino Bonnet 10, 20154, Milan, Italy | VAT, tax code, and number of registration with the Milan Monza Brianza Lodi Company Register
            13328610965 | REA number MI 2781486 | Contributed capital €150,000.00 fully paid-in | Sole shareholder company subject to the management and coordination of Bending Spoons S.p.A.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
