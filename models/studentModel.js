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
        type: mongoose.Schema.Types.ObjectId,
        required: true,       
        ref: 'User'
    },
    gender: { 
        type: String,
         enum: ['male', 'female', 'other'], 
         required: true },

    dateOfBirth: {
         type: String,
          required: true },

    phoneNumber: {
        type: String,
        required: true,
        minlength: 10,        
    },


    resume: {
        type: String // URL to stored resume
    },
    skills: {
        type: String
    },


    education: {
        tenth: {
            percentage: Number,
            board: String,
            yearOfPassing: String
        },
        twelfth: {
            percentage: Number,
            stream:{
                type:String,
                enum:['science','commerce','arts','math']
            },
            board: String,
            yearOfPassing: String
        },
        ug: {
            isCompleted: {
                type: Boolean,
                default: false
            },
            cgpa: {
                type: Number,
                required() {
                    return this.isCompleted;
                }
            },
            university: {
                type: String,
                required() {
                    return this.isCompleted;
                }
            },
            course: {
                type: String,
                required() {
                    return this.isCompleted;
                }
            },
            yearOfPassing: {
                type: String,
                required() {
                    return this.isCompleted;
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
                required() {
                    return this.isCompleted;
                }
            },
            university: {
                type: String,
                required() {
                    return this.isCompleted;
                }
            },
            course: {
                type: String,
                required() {
                    return this.isCompleted;
                }
            },
            yearOfPassing: {
                type: String,
                required() {
                    return this.isCompleted;
                }
            }
        }
    },
   
    placementStatus: {
        type: Boolean,
        default: false
    },
    applications: [{// Array of job applications 
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        },
        status: {//company should be able to change the status of application
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending'
        }
    }],
 
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);