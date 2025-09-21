// exerciseModel.js
// File to create exercise schema

// Imports 
const mongoose = require('mongoose');   // import mongoose

const exercisesSchema = mongooose.Schema({
    // Name
    name: {
        type: String,
        required: [true, 'Please add an exercise name']
    },
    // Muscle Group
    musclegroup: {
        type: String,
        enum: [
            'Chest', 'Back', 'Shoulders',
            'Arms', 'Legs', 'Core', 
            'Full body', 'Other'
        ],
        default: 'Other'
    },
    // Description
    description: {
        type: String
    }
}, {
    timestamps: true
});

modules.exports = mongoose.model('Exercise', exerciseSchema);