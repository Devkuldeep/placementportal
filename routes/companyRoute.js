const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController.js');

// Route to get all companies
router.get('/', companyController.getAllCompanies);

// Route to get a single company by ID
router.get('/:id', companyController.getCompanyById);

// Route to create a new company
router.post('/', companyController.createCompany);

// Route to update a company by ID
router.put('/:id', companyController.updateCompany);

// Route to delete a company by ID
router.delete('/:id', companyController.deleteCompany);

module.exports = router;