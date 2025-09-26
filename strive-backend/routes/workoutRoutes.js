// workoutRoutes.js
// File to handle workout routes

// Imports
const express = require('express');  // Import express
const { 
    getWorkouts, setWorkout, updateWorkout, deleteWorkout,
    addExercise, updateExercise, deleteExercise
 } = require('../controllers/workoutController.js');    // Import workout & exercise controllers for CRUD functionality
const { protect } = require ('../middleware/authMiddleware.js');    // Import protect function

// Initialise router
const workoutRouter = express.Router();

// Workout routes
workoutRouter.route('/').get(protect, getWorkouts).post(protect, setWorkout);    // routes for getting and setting workouts
workoutRouter.route('/:id').put(protect, updateWorkout).delete(protect, deleteWorkout);      // routes for updating and deleting workouts

// Exercise routes
workoutRouter.route('/:id/exercises').post(protect, addExercise) // route for adding exercises to workout
workoutRouter.route('/:id/exercises/:exerciseId').put(protect, updateExercise).delete(protect, deleteExercise)  // routes for updating and deleting exercises

// Export router
module.exports = { workoutRouter };