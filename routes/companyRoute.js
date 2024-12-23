const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const isCollege = require('../middleware/isCollege.js');

// Route to get all companies
router.get('/getAll', companyController.getAllCompanies);

// Route to get a single company by ID
router.get('/getOne/:id', companyController.getCompanyById);

// Route to create a new company
router.post('/create', companyController.createCompany);

// Route to update a company by ID
router.put('/update/:id', companyController.updateCompany);

// Route to delete a company by ID
router.delete('/delete/:id', companyController.deleteCompany);

module.exports = router;