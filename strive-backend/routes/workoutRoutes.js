// workoutRoutes.js
// File to handle workout routes

// Imports
const express = require('express');  // import express
const { getWorkouts, setWorkout, updateWorkout, deleteWorkout } = require('../controllers/workoutController.js');    // import workout controllers for CRUD functionality

// Initialise router
const workoutRouter = express.Router();

// Get, Post, Put and Delete routes
workoutRouter.route('/').get(getWorkouts).post(setWorkout);    // routes for getting and setting workouts at '/'
workoutRouter.route('/:id').put(updateWorkout).delete(deleteWorkout);      // routes for updating and deleting workouts at '/:id'

// Export router
module.exports = { workoutRouter };