import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DiseaseList from './pages/DiseaseList';

function App() {
    return (
        <Router>
            <div>
                {/* App Header */}
                <header style={headerStyle}>
                    <h1>Plant Disease Identifier</h1>
                </header>

                {/* App Routes */}
                <Routes>
                    <Route path="/" element={<DiseaseList />} />
                    {/* Add more routes as needed */}
                </Routes>
            </div>
        </Router>
    );
}

// Basic inline styling for the header
const headerStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'center',
    padding: '15px 0',
    marginBottom: '20px',
    fontSize: '1.5em',
};

export default App;
