const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    salary: {   
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
        required: true
    },
    jobStatus: {
        type: String,
        enum: ['active', 'closed'],
        default: 'active'
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
   
    skills: [{
        type: String,
        required: true
               
    }],
    minimumCGPA: {
        type: String,
        required: true,
        default: '60'
    },
    eligibleBranches: [{
        type: String,
        required: true
    }],
    deadline: {
        type: String,
        required: true
    },
    postedOn: {
        type: String,
        default: Date.now
    },
  
applications: [{
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    applicationStatus: {
        type: String,
        enum: ['applied', 'shortlisted', 'rejected']
    }
}],
  



}, {
    timestamps: true
});



module.exports = mongoose.model('Job', jobSchema);