const mongoose = require('mongoose');
const companySchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,       
        ref: 'User',
    },  
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
        trim: true,
        enum: ['STARTUP', 'MNC', 'SME', 'GOVERNMENT', 'NGO', 'OTHERS']
    },
    industryType: {
        type: String,
        required: true,
        trim: true,
        enum: ['IT', 'FINANCE', 'MARKETING', 'EDUCATION', 'HEALTHCARE', 'OTHERS']
    },
    companyAddress: {
        type: String,
        required: true,
        trim: true
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
  
    jobPostings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }]
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;