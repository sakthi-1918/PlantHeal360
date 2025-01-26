const express = require('express');
const Disease = require('../models/Disease'); // Import Mongoose model
const router = express.Router();

// Fetch all diseases (GET request)
router.get('/', async (req, res) => {
    try {
        const diseases = await Disease.find();
        if (diseases.length === 0) {
            return res.status(404).json({ error: 'No diseases found' });
        }
        res.status(200).json(diseases);
    } catch (error) {
        console.error('Error fetching diseases:', error.message);
        res.status(500).json({ error: 'Failed to fetch diseases' });
    }
});

// Fetch disease by ID (GET request)
router.get('/:id', async (req, res) => {
    try {
        const disease = await Disease.findById(req.params.id);
        if (!disease) {
            return res.status(404).json({ error: 'Disease not found' });
        }
        res.status(200).json(disease);
    } catch (error) {
        console.error('Error fetching disease:', error.message);
        res.status(500).json({ error: 'Failed to fetch disease' });
    }
});

// Insert new disease (POST request)
router.post('/', async (req, res) => {
    try {
        // Log the incoming request body to debug
        console.log('Request Body:', req.body);

        const { name, imageUrl, description, affectedPlants } = req.body;

        // Validation for required fields
        if (!name || !imageUrl || !description || !affectedPlants || affectedPlants.length === 0) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new disease document
        const newDisease = new Disease({
            name,
            imageUrl,
            description,
            affectedPlants
        });

        // Save the disease document to the database
        const savedDisease = await newDisease.save();
        res.status(201).json({ message: 'Disease added successfully', disease: savedDisease });
    } catch (error) {
        console.error('Error inserting disease:', error.message);
        res.status(500).json({ error: 'Failed to insert disease' });
    }
});


module.exports = router;
