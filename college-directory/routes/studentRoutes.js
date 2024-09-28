// routes/studentRoutes.js
const express = require('express');
const { getStudentProfile, updateStudentProfile } = require('../controllers/studentController');
const authenticate = require('../middleware/authenticate'); // Assuming you have authentication middleware
const router = express.Router();

// Route to get student profile
router.get('/profile', authenticate, getStudentProfile);

// Route to update student profile
router.put('/profile', authenticate, updateStudentProfile);

// Add any other student-related routes here

module.exports = router;
