// routes/gradeRoutes.js
const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');

// Grade routes
router.post('/', gradeController.assignGrade); // Assign a grade
router.get('/student/:student_id', gradeController.getGradesByStudent); // Get grades for a specific student
router.put('/:id', gradeController.updateGrade); // Update grade
router.delete('/:id', gradeController.deleteGrade); // Delete grade

module.exports = router;
