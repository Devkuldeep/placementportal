const Job = require('../models/jobModel');
const Student = require('../models/studentModel');
const mongoose = require('mongoose');

// Get all jobs
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single job by ID
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new job
exports.createJob = async (req, res) => {
    try {
        const job = new Job(req.body);
        const newJob = await job.save();
        res.status(201).json({ success: true, message: 'Job created successfully', job: newJob });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ success: false, message: error.message });
        } else {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

// Update a job by ID
exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a job by ID
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Apply for a job

exports.applyForJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);      
        const student = await Student.findOne({studentId: req.params.studentId});

        if (!job || !student) {
            return res.status(404).json({success:false, message: 'Data not found' });
        }

       
        // Add application to both documents
        student.applications.push({
            jobId: req.params.jobId,
            status: 'pending',
        });
        
        job.applications.push({
            applicant: req.params.studentId,
            applicationStatus: 'applied',
        });

        // Save both documents
        await Promise.all([
            student.save(),
            job.save()
        ]);
        
        res.status(200).json({success:true, message: 'Application successfully submitted' });
    } catch (error) {
        res.status(500).json({success:false, message: error.message });
    }
}

// Get all jobs by company ID
exports.getJobsByCompany = async (req, res) => {
    try {
        const jobs = await Job.find({ companyId: req.params.id });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all application by job id
exports.getApplicationsByJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('applications.applicant');
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
        res.status(200).json({ success: true, jobWithApplicants: job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
