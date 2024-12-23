const express = require('express');

const companyController = require('../controllers/companyController.js');
const studentController = require('../controllers/studentController.js');
const collegeController = require('../controllers/collegeController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const isCollege = require('../middleware/isCollege.js');
const authController = require('../controllers/authController.js');
const router = express.Router(authMiddleware);
// Route to get all companies
router.get('/getAllCompanies',isCollege, companyController.getAllCompanies);

// Route to get a single company by ID
router.get('/getOneCompany/:id',isCollege, companyController.getCompanyById);

// Route to aprove a new company
router.patch('/company/approve/:id',isCollege, authController.approveUser);

// // Route to aprove a new company
// router.patch('/company/reject/:id',isCollege, authController.rejectUser);

// Route to update a company by ID
router.put('/updateCompany/:id',isCollege, companyController.updateCompany);

// Route to delete a company by ID
router.delete('/deleteCompany/:id',isCollege, companyController.deleteCompany);




// Route to get all student
router.get('/getAllStudent', isCollege, studentController.getAllStudents);

// Route to get a single student by ID
router.get('/getOneStudent/:id', isCollege, studentController.getStudentById);

// Route to aprove a new student
router.patch('/student/approve/:id', isCollege,authController.approveUser);

// Route to aprove a new student
// router.patch('/student/reject/:id', isCollege, authController.rejectUser);

// Route to update a student by ID
router.put('/updateStudent/:id', isCollege, studentController.updateStudent);

// Route to delete a student by ID
router.delete('/deleteStudent/:id', isCollege, studentController.deleteStudent);






// Route to create a new College Member

router.post('/create', isCollege, collegeController.createCollege);



// Route to get all College Members
router.get('/getAll', isCollege, collegeController.getAllColleges);

// Route to get a single College member by ID
router.get('/getOne/:id',  isCollege, collegeController.getCollegeById);

// Route to approve a new college
router.patch('/college/approve/:id', isCollege, authController.approveUser);

// Route to reject a new college
// router.patch('/college/reject/:id', isCollege, authController.rejectUser);


// Route to update a College by ID
router.put('/update/:id',  isCollege, collegeController.updateCollege);

// Route to delete a College by ID
router.delete('/delete/:id',  isCollege, collegeController.deleteCollege);



// College Statistics endpoint
router.get('/statistics', isCollege, collegeController.getStatistics);


// // User Approval endpoint
// router.post('/approve/:id',authMiddleware,isCollege, approveUser);

// // User Disapproval endpoint
// router.post('/reject/:id',authMiddleware,isCollege, rejectUser );


module.exports = router;