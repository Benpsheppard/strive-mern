// workoutController.js
// File to create, read, update and delete workouts

// Imports
const asyncHandler = require('express-async-handler');

// @desc Get workouts
// @route GET /api/workouts
// @access Private
const getWorkouts = asyncHandler(async (req, res) => {
    res.status(200).json({msg: 'Get workouts'});
})

// @desc Create a workout
// @route POST /api/workouts
// @access Private
const setWorkout = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400);
        throw new Error('Please add a text field');
    }
    res.status(201).json({msg: 'Create workout'});
})

// @desc Update a workout with id
// @route PUT /api/workouts/:id
// @access Private
const updateWorkout = asyncHandler(async (req, res) => {
    res.status(200).json({msg: `Update workout with id: ${req.params.id}`});
})

// @desc Get workouts
// @route DELETE /api/workouts
// @access Private
const deleteWorkout = asyncHandler(async (req, res) => {
    res.status(200).json({msg: `Delete workout with id: ${req.params.id}`});
})


module.exports = { getWorkouts, setWorkout, updateWorkout, deleteWorkout };