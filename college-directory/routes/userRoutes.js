// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.post('/', userController.createUser); // Create a new user
router.get('/', userController.getAllUsers); // Get all users
router.put('/:id', userController.updateUser); // Update user
router.delete('/:id', userController.deleteUser); // Delete user

module.exports = router;
