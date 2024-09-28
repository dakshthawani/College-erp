// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function to hash a password
async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

// User Registration
exports.registerUser = async (req, res) => {
    const { email, phone, password, name, username, role } = req.body;

    // Validate required fields
    if (!email || !phone || !password || !name || !username || !role) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            email,
            phone,
            password: hashedPassword,
            name,
            username,
            role,
        });

        res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role } });
    } catch (err) {
        res.status(500).json({ error: `Failed to register user: ${err.message}` });
    }
};


// User login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Logging in user: ${email}`); // Log the email being used for login

        const user = await User.findOne({ where: { email } });

        // If user doesn't exist, assume it might be an admin needing a password reset
        if (!user) {
            if (email === 'admin@example.com') { // Replace with your admin email
                const newPassword = 'newAdminPassword'; // Set your new admin password here
                const hashedPassword = await hashPassword(newPassword);

                // Update the admin user's password in the database
                await User.update({ password: hashedPassword }, { where: { email } });
                console.log('Admin password has been reset. New password:', newPassword); // Log the new password for testing
                return res.status(400).json({ error: 'Admin password has been reset. Please try logging in again with the new password.' });
            } else {
                console.error('User not found'); // Log if the user is not found
                return res.status(400).json({ error: 'Invalid email or password' });
            }
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.error('Password is invalid'); // Log if the password is incorrect
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.status(200).json({ token, userId: user.id });
    } catch (err) {
        console.error('Login error:', err); // Improved error logging
        res.status(500).json({ error: 'Failed to log in', details: err.message });
    }
};

// Middleware to authenticate user
exports.authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.userId = decoded.id;
        req.userRole = decoded.role; // Store user role in request
        next();
    });
};
