import React from "react";
import "./DiseaseCard.css";

const DiseaseCard = ({ disease, expanded, onToggle }) => {
    return (
        <div className={`disease-card ${expanded ? "expanded" : ""}`}>
            {/* Disease Image */}
            <img
                src={`${process.env.PUBLIC_URL}/assets/${disease.imageUrl}`}
                alt={disease.name}
                className="disease-image"
            />

            {/* Disease Content */}
            <div className="disease-content">
                <h3>{disease.name}</h3>

                {/* General Description */}
                <p className="description">
                    {expanded ? disease.description : `${disease.description.slice(0, 100)}...`}
                </p>

                {/* Read More Button */}
                {disease.description.length > 100 && (
                    <button onClick={onToggle} className="read-more-btn">
                        {expanded ? "Read Less" : "Read More"}
                    </button>
                )}

                {/* Affected Plants */}
                {expanded && (
                    <div className="affected-plants">
                        <h4>Affected Plants:</h4>
                        <ul>
                            {disease.affectedPlants.map((plant, index) => (
                                <li key={index}>
                                    <strong>{plant.plantName}</strong>: {plant.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiseaseCard;
