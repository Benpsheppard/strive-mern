// db.js
// File to configure database

// Import
const mongoose = require('mongoose');   // import mongoose for database handling

// Function to connect to database
const connectDB = async (req, res) => { 
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);     // connect to database using URI
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);   // log successful connection to console with colors styling
    } catch (error) {
        console.log(error);     // output any error to console
        process.exit(1);    // close application
    }
};

module.exports = connectDB;     // export connectDB function