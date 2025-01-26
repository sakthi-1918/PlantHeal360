const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({ path: './config.env' });

const client = new MongoClient(process.env.ATLAS_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

let database;

module.exports = {
    connectToServer: async () => {
        try {
            await client.connect();
            database = client.db('PlantHeal360'); // Replace with your database name
            console.log('Connected to MongoDB Atlas');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    },
    getDb: () => {
        return database;
    }
};
