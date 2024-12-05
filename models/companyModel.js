const mongoose = require('mongoose');
const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    contactPerson: {
        type: String,
        required: true,
        trim: true
    },
    contactEmail: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    contactPhone: {
        type: String,
        trim: true
    },
    companyWebsite: {
        type: String,
        required: true,
        trim: true
    },
    companyType: {
        type: String,
        required: true,
        trim: true
    },
    industryType: {
        type: String,
        required: true,
        trim: true
    },
    companyAddress: {
        type: String,
        required: true,
        trim: true
    },
    numberOfEmployees: {
        type: Number,
        required: true,
        min: 1
    },
    companyDescription: {
        type: String,
        required: true,
        trim: true
    },
    internshipAvailability: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;