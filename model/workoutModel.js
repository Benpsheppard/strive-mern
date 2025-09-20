// workoutModel.js
// File to create workout schema

// Imports
const mongoose = require('mongoose');   // import mongoose

// Workout Schema
const workoutSchema = mongoose.Schema({
    // User
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true
    },
    // Title
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    // Date
    date: {
        type: Date,
        default: Date.now
    },
    // Duration
    duration: {
        type: Number
    },
    // Exercises
    exercises: [
        {
            exercise: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Exercise",
                required: true
            },
            sets: [
                {
                    weight: { type: Number }, reps: { type: Number }
                }
            ]
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Workout', workoutSchema);