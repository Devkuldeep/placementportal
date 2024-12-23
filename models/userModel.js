const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,    
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['college', 'student','company'],
        required: true

    },
    is_approved: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
