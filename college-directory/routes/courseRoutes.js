// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Course routes
router.post('/', courseController.createCourse); // Create a new course
router.get('/', courseController.getAllCourses); // Get all courses
router.put('/:id', courseController.updateCourse); // Update course
router.delete('/:id', courseController.deleteCourse); // Delete course

module.exports = router;
