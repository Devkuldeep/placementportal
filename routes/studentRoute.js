const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const isCollege = require('../middleware/isCollege.js');

// Route to get all students
router.get('/getAll', studentController.getAllStudents);

// Route to get a single student by ID
router.get('/getOne/:id', studentController.getStudentById);

// Route to get a single student Application List
router.get('/getApplications/:id', studentController.getApplicationBystudentId);

// Route to create a new student
router.post('/create', studentController.createStudent);

// Route to update a student by ID
router.put('/update/:id', studentController.updateStudent);

// Route to delete a student by ID
router.delete('/delete/:id', studentController.deleteStudent);

 
// Route to get all applications of a student
router.get('/applications', studentController.getApplications);

module.exports = router;