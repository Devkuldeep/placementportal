const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const createError = require('http-errors');
const mongoose = require('mongoose');
const path = require('path');

const collegeRoute = require('./routes/collegeRoute');
const companyRoute = require('./routes/companyRoute');
const studentRoute = require('./routes/studentRoute');
const jobRoute = require('./routes/jobRoute');
const connectDB = require('./lib/dbConfig');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware setup
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
connectDB();

// Default route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Campus Recruitment System' });
});
// Routes
app.use('/api/college', collegeRoute);
app.use('/api/company', companyRoute);
app.use('/api/student', studentRoute);
app.use('/api/job', jobRoute);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.json({ error: err.message });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});