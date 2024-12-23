const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const jobController = require('../controllers/jobController.js');
const isCollege = require('../middleware/isCollege.js');
const isCompany = require('../middleware/isCompany.js');

// Route to get all jobs
router.get('/getAll',jobController.getAllJobs);

// Route to get a single job by ID
router.get('/getOne/:id', 
    param('id').isMongoId().withMessage('Invalid job ID'), 
    jobController.getJobById
);

// Route to create a new job
router.post('/create', 
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),
        body('salary').isNumeric().withMessage('Salary must be a number'),
        body('location').notEmpty().withMessage('Location is required'),
        body('jobType').isIn(['Full-time', 'Part-time', 'Contract', 'Internship']).withMessage('Invalid job type'),
        body('status').optional().isIn(['active', 'closed']).withMessage('Invalid status'),
        body('skills').isArray({ min: 1 }).withMessage('Skills are required'),
        body('skills.*').notEmpty().withMessage('Each skill is required'),
        body('eligibility').isArray({ min: 1 }).withMessage('Eligibility criteria are required'),
        body('eligibility.*').notEmpty().withMessage('Each eligibility criterion is required'),
        body('deadline').isISO8601().withMessage('Invalid deadline date')
    ],  
    jobController.createJob
);

// Route to update a job by ID
router.put('/update/:id', 
    [
        param('id').isMongoId().withMessage('Invalid job ID'),
        body('title').optional().notEmpty().withMessage('Title is required'),
        body('description').optional().notEmpty().withMessage('Description is required'),
        body('salary').optional().isNumeric().withMessage('Salary must be a number'),
        body('location').optional().notEmpty().withMessage('Location is required'),
        body('jobType').optional().isIn(['Full-time', 'Part-time', 'Contract', 'Internship']).withMessage('Invalid job type'),
        body('status').optional().isIn(['active', 'closed']).withMessage('Invalid status'),
        body('skills').optional().isArray({ min: 1 }).withMessage('Skills are required'),
        body('skills.*').optional().notEmpty().withMessage('Each skill is required'),
        body('eligibility').optional().isArray({ min: 1 }).withMessage('Eligibility criteria are required'),
        body('eligibility.*').optional().notEmpty().withMessage('Each eligibility criterion is required'),
        body('deadline').optional().isISO8601().withMessage('Invalid deadline date')
    ], 

    jobController.updateJob
);

// Route to delete a job by ID
router.delete('/delete/:id', 
    param('id').isMongoId().withMessage('Invalid job ID'), 
    jobController.deleteJob
);

// route to apply for a job
router.post('/:jobId/apply/:studentId', 
    [
        param('jobId').isMongoId().withMessage('Invalid job ID'),
        param('studentId').isMongoId().withMessage('Invalid student ID')
    ],
    jobController.applyForJob
);


// get all jobs by company ID
router.get('/company/:id', 
    param('id').isMongoId().withMessage('Invalid company ID'), 
    jobController.getJobsByCompany
);
module.exports = router;

// Route to get all applications of a job
router.get('/applications/:id', 
    param('id').isMongoId().withMessage('Invalid job ID'), 
    jobController.getApplicationsByJob
);