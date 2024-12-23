const College = require('../models/collegeModel');

// Get all colleges
exports.getAllColleges = async (req, res) => {
    try {
        const colleges = await College.find();
        res.status(200).json({
            status: 'success',
            results: colleges.length,
            data: {
                colleges
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Get a single college by ID
exports.getCollegeById = async (req, res) => {
    try {
        const college = await College.findById(req.params.id);
        if (!college) {
            return res.status(404).json({
                status: 'fail',
                message: 'College not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                college
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Create a new college
exports.createCollege = async (req, res) => {
    try {
        const newCollege = await College.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                college: newCollege
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Update a college by ID
exports.updateCollege = async (req, res) => {
    try {
        const college = await College.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!college) {
            return res.status(404).json({
                status: 'fail',
                message: 'College not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                college
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Delete a college by ID
exports.deleteCollege = async (req, res) => {
    try {
        const college = await College.findByIdAndDelete(req.params.id);
        if (!college) {
            return res.status(404).json({
                status: 'fail',
                message: 'College not found'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }


};


//get all statistics of college 

exports.getStatistics = async (req, res) => {
    try {
    const totalStudents = await College.aggregate([
        { $unwind: "$students" },
        { $count: "totalStudents" }
    ]);

    const totalCompanies = await College.aggregate([
        { $unwind: "$companies" },
        { $count: "totalCompanies" }
    ]);

    const totalPlacedStudents = await College.aggregate([
        { $unwind: "$students" },
        { $lookup: {
            from: "users",
            localField: "students",
            foreignField: "_id",
            as: "studentDetails"
        }},
        { $unwind: "$studentDetails" },
        { $match: { "studentDetails.placementStatus": true }},
        { $count: "totalPlacedStudents" }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            totalStudents: totalStudents[0]?.totalStudents || 0,
            totalCompanies: totalCompanies[0]?.totalCompanies || 0,
            totalPlacedStudents: totalPlacedStudents[0]?.totalPlacedStudents || 0
        }
    });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}
