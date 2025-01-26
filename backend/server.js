
const express = require('express');
const cors = require('cors');
const path = require('path'); 
const connect = require('./connect');


const app = express();
const PORT = 3005;

app.use(cors());
app.use(express.json()); // Parse incoming JSON requests



app.listen(PORT, async () => {
    await connect.connectToServer();
    console.log(`Server is running on port ${PORT}`);
});
