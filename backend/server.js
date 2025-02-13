const express = require("express");
const cors = require("cors");
const connect = require("./connect");
const diseaseRoutes = require("./routes/diseaseRoutes");
const authRoutes = require("./routes/authRoutes"); // Import authentication routes

const app = express();
const PORT = 3005;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Use routes
app.use("/api/diseases", diseaseRoutes);
app.use("/api/auth", authRoutes); // Add authentication routes

// Start the server after connecting to MongoDB
app.listen(PORT, async () => {
  await connect.connectToServer(); // Connect to MongoDB
  console.log(`Server is running on http://localhost:${PORT}`);
});
