const Company = require('../models/companyModel');



// Get a single company by ID
exports.getCompanyById = async (req, res) => {
    try {
        const company = await Company.findOne({ companyId: req.params.id });
        if (!company) {
            return res.status(404).json({ success: false, message: 'Company not found' });
        }
        res.status(200).json({ success: true, company });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new company
exports.createCompany = async (req, res) => {
    const company = new Company(req.body);
    try {
        const newCompany = await company.save();
        res.status(201).json({success:true,newCompany});
    } catch (error) {
        res.status(400).json({success:false, message: error.message });
    }
};

// Update a company by ID
exports.updateCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json(company);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a company by ID
exports.deleteCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json({ message: 'Company deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get all companies
exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

