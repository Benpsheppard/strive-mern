// userController.js
// File to handle user functionality

// Imports
const asyncHandler = require('express-async-handler');    // Import asyncHandler
const User = require('../models/userModel.js');      // Import user schema model 
const jwt = require('jsonwebtoken');    // Import JWT for authentication
const bcrypt = require('bcryptjs');     // Import bcrypt for hashing passwords

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    // Get user info
    const { username, email, password } = req.body;

    // Check if all info exists
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Look if email exists already
    const userExists = await User.findOne({email});

    // Check if user already exists
    if (userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);  // generating a hash string to add to unhashed password
    const hashPassword = await bcrypt.hash(password, salt);     // hash users password using salt

    // Create user
    const user = await User.create({
        username,
        email,
        password: hashPassword
    })
    
    // Verify user creation
    if (user) {
        res.status(200).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: genToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    // Get user details
    const { username, password } = req.body;

    // Check for username
    const user = await User.findOne({username});

    // Check username and password match
    if (user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: genToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid user credentials');
    }
});

// @desc    Register user
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    // Return user info
    res.status(200).json(req.user);
});

// Generate JWT token
const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
};

// Export functions
module.exports = { registerUser, loginUser, getMe };