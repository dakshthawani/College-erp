// controllers/studentController.js
const bcrypt = require('bcryptjs'); // Make sure to install bcrypt
const User = require('../models/User'); // Adjust path as needed
const Student = require('../models/Student'); // Adjust path as needed

// Function to register a new student
const registerStudent = async (req, res) => {
    const { name, email, password, enrollmentNumber, coursesEnrolled } = req.body;
    if (!name || !email || !password || !enrollmentNumber || !coursesEnrolled) {
        return res.status(400).json({ error: 'All fields are required' });
    }    

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword, // Make sure to hash the password
            role: 'student'
        });

        // Create a corresponding student record
        const student = await Student.create({
            enrollment_number: enrollmentNumber,
            courses_enrolled: coursesEnrolled, // This can be an array or JSON based on your schema
            UserId: user.id // Foreign key linking to users table
        });

        return res.status(201).json({ user, student });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Registration failed", error });
    }
};

// Function to get student profile
const getStudentProfile = async (req, res) => {
    try {
        const studentId = req.user.id; // Assuming you're using a middleware to add user info
        const student = await Student.findOne({ where: { id: studentId } });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        console.error('Failed to fetch student profile:', error);
        res.status(500).json({ message: 'Failed to fetch profile', error });
    }
};

// Function to update student profile
const updateStudentProfile = async (req, res) => {
    try {
        const studentId = req.user.id; // Get student ID from authenticated user
        const updatedData = req.body; // Assuming the updated data is sent in the request body

        const [updated] = await Student.update(updatedData, { where: { id: studentId } });
        if (updated) {
            const updatedStudent = await Student.findOne({ where: { id: studentId } });
            return res.status(200).json(updatedStudent);
        }
        throw new Error('Student not found');
    } catch (error) {
        console.error('Failed to update student profile:', error);
        res.status(500).json({ message: 'Failed to update profile', error });
    }
};

module.exports = {
    registerStudent,
    getStudentProfile,
    updateStudentProfile,
};
