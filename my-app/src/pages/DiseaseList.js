import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DiseaseCard from '../components/DiseaseCard';
import './DiseaseList.css';

const DiseaseList = () => {
    const [diseases, setDiseases] = useState([]);
    const [expandedCard, setExpandedCard] = useState(null); // Track which card is expanded

    // Fetch diseases data from the API
    useEffect(() => {
        const fetchDiseases = async () => {
            try {
                const response = await axios.get('http://localhost:3005/api/diseases');
                setDiseases(response.data);
            } catch (error) {
                console.error('Error fetching diseases:', error);
            }
        };
        fetchDiseases();
    }, []);

    // Handle toggling of expansion
    const handleToggle = (id) => {
        // If the card is already expanded, collapse it; otherwise, expand the clicked card
        setExpandedCard(expandedCard === id ? null : id);
    };

    return (
        <div className="disease-list">
            <h1>Disease List</h1>
            <div className="disease-cards-container">
                {diseases.map((disease) => (
                    <DiseaseCard
                        key={disease._id} // Unique key for each card
                        disease={disease}
                        expanded={expandedCard === disease._id} // Pass expanded state to each card
                        onToggle={() => handleToggle(disease._id)} // Toggle expansion for the specific card
                    />
                ))}
            </div>
        </div>
    );
};

export default DiseaseList;
