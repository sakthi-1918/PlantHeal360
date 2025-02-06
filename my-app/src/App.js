import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import DiseaseList from './pages/DiseaseList';
import Details from './pages/Details';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <div style={{ marginTop: '80px' }}>
          <Routes>
            <Route path="/library" element={<DiseaseList />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Details />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
