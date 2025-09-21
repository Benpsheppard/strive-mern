// workoutController.js
// File to handle workout functionality

// Imports
const asyncHandler = require('express-async-handler');  // Import asyncHandler
const Workout = require('../models/workoutModel.js');    // Import workout schema model
const User = require('../models/userModel.js');  // Import user schema model

// @desc    Get workouts
// @route   GET /api/workouts
// @access  Private
const getWorkouts = asyncHandler(async (req, res) => {
    // Find workouts for specific user
    const workouts = await Workout.find({ user: req.user.id });

    // Output list of workouts
    res.status(200).json(workouts); 
})

// @desc    Create a workout
// @route   POST /api/workouts
// @access  Private
const setWorkout = asyncHandler(async (req, res) => {
    // Check if body includes a title
    if(!req.body.title){
        res.status(400);
        throw new Error('Please add a title field');
    }

    // Create new workout with given req data
    const workout = await Workout.create({
        user: req.user.id,
        title: req.body.title,
        duration: req.body.duration,
        exercises: req.body.exercises
    })

    // Output new workout
    res.status(201).json(workout);
})

// @desc    Update a workout with id
// @route   PUT /api/workouts/:id
// @access  Private
const updateWorkout = asyncHandler(async (req, res) => {
    // Find workout with given id
    const workout = await Workout.findById(req.params.id);

    // Check if workout with given id exists
    if (!workout){
        res.status(400);
        throw new Error(`Workout with the id: ${req.params.id} was not found`);
    }

    // Logged in user
    const user = await User.findById(req.user.id);

    // Check user exists
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Check that logged in user matches workout user/owner 
    if (workout.user.toString() !== user.id){
        res.status(401);
        throw new Error('User not authorised');
    }
    
    // Update workout with given id with new data
    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, {new: true});

    // Output updated workout
    res.status(200).json(updatedWorkout);
})

// @desc    Get workouts
// @route   DELETE /api/workouts
// @access  Private
const deleteWorkout = asyncHandler(async (req, res) => {
    // Find workout with given id
    const workout = await Workout.findById(req.params.id);

    // Check if workout with given id exists
    if (!workout) {
        res.status(400);
        throw new Error(`Workout with the id: ${req.params.id} was not found`)
    }

    // Logged in user
    const user = await User.findById(req.user.id);

    // Check user exists
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Check that logged in user matches workout user/owner 
    if (workout.user.toString() !== user.id){
        res.status(401);
        throw new Error('User not authorised');
    }

    // Delete workout with given id
    await workout.deleteOne();

    res.status(200).json(`The workout with id: ${req.params.id} was deleted`);
})

// Export functions
module.exports = { getWorkouts, setWorkout, updateWorkout, deleteWorkout };