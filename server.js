// server.js
// File to run server for Strive

// Imports
const dotenv = require('dotenv').config(); // allow reading of .env file
const express = require('express');  // import express
const { router } = require('./routes/workoutRoutes.js'); // import workout routes
const { errorHandler } = require('./middleware/errorMiddleware.js');    // import error handler middleware

// Variables
const port = process.env.PORT || 5050;  // port from .env file or default to 5050

// Initialise app
const app = express();

// Middleware
app.use(express.json());    // middleware to allow server to read json data
app.use(express.urlencoded({ extended: false }));      // middleware to allow server to read urlencoded data

// GET route
app.use('/api/workouts', router);

// Custom Error Handler initialisation
app.use(errorHandler);

// Port listener
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})