const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Authentication routes
router.post('/register', authController.registerUser); // User registration
router.post('/login', authController.login); // User login

module.exports = router;
