// server.js
// File to run server for Strive

// Imports
const dotenv = require('dotenv').config(); // allow reading of .env file
const express = require('express');  // import express
const router = require('./routes/workoutRoutes.js');

// Variables
const port = process.env.PORT || 5050;  // port from .env file or default to 5050

// Initialise app
const app = express();

// GET route
app.use('/api/workouts', router);

// Port listener
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})