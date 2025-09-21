// workoutRoutes.js
// File to handle workout routes

// Imports
const express = require('express');  // Import express
const { getWorkouts, setWorkout, updateWorkout, deleteWorkout } = require('../controllers/workoutController.js');    // Import workout controllers for CRUD functionality
const { protect } = require ('../middleware/authMiddleware.js');    // Import protect function

// Initialise router
const workoutRouter = express.Router();

// Get, Post, Put and Delete routes
workoutRouter.route('/').get(protect, getWorkouts).post(protect, setWorkout);    // routes for getting and setting workouts at '/'
workoutRouter.route('/:id').put(protect, updateWorkout).delete(protect, deleteWorkout);      // routes for updating and deleting workouts at '/:id'

// Export router
module.exports = { workoutRouter };