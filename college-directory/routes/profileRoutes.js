// routes/profileRoutes.js
const express = require('express');
const { updateProfile, getProfile } = require('../controllers/profileController'); // Create a controller to handle logic
const authenticateUser = require('../middleware/authenticate'); // Middleware for authentication
const router = express.Router();

// Route to get user profile
router.get('/', authenticateUser, getProfile);

// Route to update user profile
router.put('/', authenticateUser, updateProfile);

module.exports = router;
