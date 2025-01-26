const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    plantName: { type: String, required: true },  // Plant name with emoji
    description: { type: String, required: true }  // Brief description of the disease's effect
});

const diseaseSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Disease name
    imageUrl: { type: String, required: true },  // Image of the disease
    description: { type: String, required: true },  // General description of the disease
    affectedPlants: [plantSchema]  // List of affected plants
});

module.exports = mongoose.model('Disease', diseaseSchema);
