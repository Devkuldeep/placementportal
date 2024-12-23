const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Cookie configuration
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
};

// Token generation utility
const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Input validation
        if (!username?.trim() || !email?.trim() || !password?.trim() || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });

        // Generate token
        const token = generateToken(newUser);

        // Set cookie and send response
       
        res.cookie('token', token, cookieOptions);

        return res.status(201).json({
            success: true,
            message: "Registration successful",
            userId: newUser._id,
            role: newUser.role
        });

    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            success: false,
            message: "Server error during registration"
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email?.trim() || !password?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user and check password
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate token
        const token = generateToken(user);

        // Set cookie and send response
        res.cookie('token', token, cookieOptions);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            userId: user._id,
            role: user.role
            
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: "Server error during login"
        });
    }
};
exports.logout = async (req, res) => {
    try {
      res.clearCookie('token'); 
      return res.status(200).json({
        success: true,
        message: "Logout successful"
      });
    } catch (error) {
      console.error('Logout error:', error);
      return res.status(500).json({
        success: false,
        message: "Server error during logout"
      });
    }
  };

exports.verifyToken = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({
            success: true,
            message: "Token is valid",
            decoded
        });
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Input validation
        if (!email?.trim() || !newPassword?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Email and new password are required"
            });
        }

        // Find user and update password
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successful"
        });
    } catch (error) {
        console.error('Password reset error:', error);
        return res.status(500).json({
            success: false,
            message: "Server error during password reset"
        });
    }
};

exports.approveUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
         
          user.is_approved = user.is_approved === 'approved' ? 'disapproved' : 'approved';  
        await user.save();
        }

        return res.status(200).json({
            success: true,
            message: "User approval status updated",
            user
        });
    } catch (error) {
        console.error('User approval error:', error);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};