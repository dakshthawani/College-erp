// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check for required fields
        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({ name, email, password: hashedPassword, role });
        
        res.status(201).json({ id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Failed to create a new user', details: err.message });
    }
};


// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Update user details
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;
        await User.update({ name, email, role }, { where: { id } });
        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.destroy({ where: { id } });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};
