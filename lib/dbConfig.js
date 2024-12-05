'use strict';

const mongoose = require('mongoose');

function connectDB() {
    return mongoose.connect(process.env.MONGODB_URI)
    .then((conn) => {
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    })
    .catch((error) => {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    });
}

module.exports = connectDB;