const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
  },
name: {
    type: String,
    required: true,
    trim: true
},
total_students: {
    type: Number,
    default: 0
},
total_companies: {
    type: Number,
    default: 0
},
placement_stats: {
    type: Number, // percentage of students placed
    default: 0
},
students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
}],
companies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
}],
jobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
}],
applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
}]

}, {
timestamps: true
});

const College = mongoose.model('College', collegeSchema);

module.exports = College;