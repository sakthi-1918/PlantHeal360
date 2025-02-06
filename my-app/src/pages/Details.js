import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Details.css";
import tomato from "../assets/tomato.jpg";
import tomato1 from "../assets/tomato1.jpg";

const Details = () => {
  const images = [tomato, tomato1];

  const NextArrow = (props) => {
    const { onClick } = props;
    return <div className="custom-arrow next" onClick={onClick}>❯</div>;
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return <div className="custom-arrow prev" onClick={onClick}>❮</div>;
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />, 
    prevArrow: <PrevArrow />, 
  };

  return (
    <div className="details-page">
      <h1 className="product-name">🍅 Tomato</h1>
      <div className="carousel-container">
        <Slider {...sliderSettings}>
          {images.map((img, index) => (
            <div key={index} className="carousel-slide">
              <img src={img} alt={`Slide ${index}`} className="carousel-image" />
            </div>
          ))}
        </Slider>
      </div>
      
      <div className="content">
        <div className="card symptoms">
          <h2>🚨 Symptoms</h2>
          <p>
            Presence of exit hole on the hull of the fruit, about 1 mm in diameter.
            Fruits are also damaged due to larval feeding, leading to reduced yields.
          </p>
        </div>

        <div className="recommendations">
          <div className="card organic">
            <h3>🌿 Organic Control</h3>
            <p>Removing all fruits after harvest helps prevent larvae from hibernating.</p>
          </div>
          <div className="card chemical">
            <h3>🧪 Chemical Control</h3>
            <p>Consider an integrated approach with preventive measures and biological treatments.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
