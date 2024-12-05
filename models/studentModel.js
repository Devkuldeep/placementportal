const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
       
    },
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    cgpa: {
        type: Number,
        required: true
    },
    resume: {
        type: String // URL to stored resume
    },
    skills: [{
        type: String
    }],
    experience: [{
        title: String,
        company: String,
        duration: String,
        description: String
    }],
    education: {
        tenth: {
            percentage: Number,
            board: String,
            yearOfPassing: Number
        },
        twelfth: {
            percentage: Number,
            board: String,
            yearOfPassing: Number
        },
        ug: {
            isCompleted: {
                type: Boolean,
                default: false
            },
            cgpa: {
                type: Number,
                required: function() {
                    return this.education.ug.isCompleted;
                }
            },
            university: {
                type: String,
                required: function() {
                    return this.education.ug.isCompleted;
                }
            },
            course: {
                type: String,
                required: function() {
                    return this.education.ug.isCompleted;
                }
            },
            yearOfPassing: {
                type: Number,
                required: function() {
                    return this.education.ug.isCompleted;
                }
            }
        },
        pg: {
            isCompleted: {
                type: Boolean,
                default: false
            },
            cgpa: {
                type: Number,
                required: function() {
                    return this.education.pg.isCompleted;
                }
            },
            university: {
                type: String,
                required: function() {
                    return this.education.pg.isCompleted;
                }
            },
            course: {
                type: String,
                required: function() {
                    return this.education.pg.isCompleted;
                }
            },
            yearOfPassing: {
                type: Number,
                required: function() {
                    return this.education.pg.isCompleted;
                }
            }
        }
    },
    placementStatus: {
        isPlaced: {
            type: Boolean,
            default: false
        },
        company: String,
        package: Number,
        jobRole: String
    },
    appliedJobs: [{
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending'
        }
    }],
    phoneNumber: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);