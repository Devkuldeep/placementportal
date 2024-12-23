const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // **Validate required fields**
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // **Check if the email already exists**
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Email already exists" });
        }

        // **Hash the password for security**
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // **Create a new user**
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword, // Save the hashed password
        });

        res.status(201).json({ success: true, message: "Registration successful", userId: newUser._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // **Validate email and password**
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // **Check if user exists**
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // **Verify the password**
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // **Generate a token for the user**
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            success: true,
            token,
            user: { id: user._id, username: user.username, email: user.email },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        // **Fetch user profile without the password**
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
