const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

module.exports = {
    connectToServer: async () => {
        try {
            console.log('Attempting to connect to MongoDB Atlas...');
            await mongoose.connect(process.env.ATLAS_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 30000, // Set timeout for MongoDB server selection
            });
            console.log('Connected to MongoDB Atlas via Mongoose');
        } catch (error) {
            console.error('Error connecting to MongoDB Atlas:', error.message);
            process.exit(1); // Exit the process on connection failure
        }
    },
};
