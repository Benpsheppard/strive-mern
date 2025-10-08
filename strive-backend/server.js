// server.js
// File to run server for Strive

// Imports
const express = require('express');                                     // import express
const dotenv = require('dotenv').config();                              // allow reading of .env file
const colors = require('colors');                                       // import colors for CLI aesthetics
const path = require('path');                                           // import path module
const connectDB = require('./config/db.js');                            // import database configuration file
const { workoutRouter } = require('./routes/workoutRoutes.js');         // import workout routes
const { userRouter } = require('./routes/userRoutes.js');            // import user routes
const { errorHandler } = require('./middleware/errorMiddleware.js');    // import error handler middleware

// Variables
const port = process.env.PORT || 5050;  // port from .env file or default to 5050

// Connect to database
connectDB();

// Initialise app
const app = express();

// Middleware
app.use(express.json());    // middleware to allow server to read json data
app.use(express.urlencoded({ extended: false }));      // middleware to allow server to read urlencoded data

// Workouts routes
app.use('/api/workouts', workoutRouter);

// User routes
app.use('/api/users', userRouter);

// Custom Error Handler initialisation
app.use(errorHandler);

// Deployment configuration
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/strive-frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'strive-frontend', 'dist', 'index.html'));
    })
}

// Port listener
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})