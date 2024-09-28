// controllers/gradeController.js
const Grade = require('../models/Grade');

// Assign grade to a student
exports.assignGrade = async (req, res) => {
    const { student_id, course_id, grade } = req.body;
    if (!student_id || !course_id || !grade) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newGrade = await Grade.create({ student_id, course_id, grade });
        res.status(201).json(newGrade);
    } catch (err) {
        res.status(500).json({ error: `Failed to assign grade: ${err.message}` });
    }
};

// Get grades for a specific student
exports.getGradesByStudent = async (req, res) => {
    const { student_id } = req.params;

    try {
        const grades = await Grade.findAll({ where: { student_id } });
        if (grades.length === 0) {
            return res.status(404).json({ error: 'No grades found for this student' });
        }
        res.status(200).json(grades);
    } catch (err) {
        res.status(500).json({ error: `Failed to fetch grades: ${err.message}` });
    }
};

// Update grade for a specific student in a course
exports.updateGrade = async (req, res) => {
    const { id } = req.params;
    const { grade } = req.body;

    try {
        const [updated] = await Grade.update({ grade }, { where: { id } });
        if (!updated) {
            return res.status(404).json({ error: 'Grade not found' });
        }
        res.status(200).json({ message: 'Grade updated successfully' });
    } catch (err) {
        res.status(500).json({ error: `Failed to update grade: ${err.message}` });
    }
};

// Delete a grade
exports.deleteGrade = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Grade.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Grade not found' });
        }
        res.status(200).json({ message: 'Grade deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: `Failed to delete grade: ${err.message}` });
    }
};
