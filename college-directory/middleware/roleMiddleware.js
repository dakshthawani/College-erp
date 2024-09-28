// middleware/roleMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import your User model
const roles = require('../roles'); // Import your defined roles

// Middleware to check roles
const authorize = (allowedRoles) => {
    return async (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1]; // Extract token from headers
        if (!token) {
            return res.status(403).json({ error: 'No token provided.' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
            const user = await User.findByPk(decoded.id); // Find the user in the database

            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            // Check if user's role is allowed
            if (allowedRoles.includes(user.role)) {
                req.user = user; // Attach user to the request object
                next(); // Proceed to the next middleware
            } else {
                return res.status(403).json({ error: 'Access denied.' });
            }
        } catch (err) {
            return res.status(401).json({ error: 'Invalid token.' });
        }
    };
};

module.exports = authorize;
