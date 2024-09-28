// controllers/courseController.js
const Course = require('../models/Course');

// Create a new course
exports.createCourse = async (req, res) => {
    const { code, name, faculty_assigned } = req.body;
    if (!code || !name || !faculty_assigned) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newCourse = await Course.create({ code, name, faculty_assigned });
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(500).json({ error: `Failed to create a new course: ${err.message}` });
    }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ error: `Failed to fetch courses: ${err.message}` });
    }
};

// Update course details
exports.updateCourse = async (req, res) => {
    const { id } = req.params;
    const { code, name, faculty_assigned } = req.body;

    try {
        const [updated] = await Course.update({ code, name, faculty_assigned }, { where: { id } });
        if (!updated) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({ message: 'Course updated successfully' });
    } catch (err) {
        res.status(500).json({ error: `Failed to update course: ${err.message}` });
    }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Course.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: `Failed to delete course: ${err.message}` });
    }
};
