// workoutRoutes.js
// File to handle workout routes

// ImportsS
const express = require('express');  // import expres

// Initialise router
const router = express.Router();

// GET route
router.get('/', (req, res) => {
    res.status(200).json({msg: 'Get workouts'});
})

// POST route
router.post('/', (req, res) => {
    res.status(200).json({msg: 'Create workouts'});
})

// PUT route
router.put('/', (req, res) => {
    res.status(200).json({msg: 'Update workouts'});
})

// DELETE route
router.delete('/', (req, res) => {
    res.status(200).json({msg: 'Delete workouts'});
})

// Export router
module.exports = router;