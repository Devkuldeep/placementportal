
const Student = require('../models/studentModel');


// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findOne({ studentId: req.params.id });
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.status(200).json({ success: true, student });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// // Get a single student Application List 
exports.getApplicationBystudentId = async (req, res) => {
    try {
        const student = await Student.findOne({ studentId: req.params.id },{ new: true })
            .populate({
            path: 'applications.jobId',
            model: 'Job',
            }).exec();

        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        res.status(200).json({ success: true, applications: student.applications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new student
exports.createStudent = async (req, res) => {
    const student = new Student(req.body);
    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all applications of a student
exports.getApplications = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id).populate('applications');
        res.status(200).json({success:true, applications: student.applications});
    } catch (error) {
        res.status(500).json({success:false , message: error.message });
    }
};
