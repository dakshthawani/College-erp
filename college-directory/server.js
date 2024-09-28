// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/config'); // Assuming you have a Sequelize configuration
const Student = require('./models/Student');
const User = require('./models/User');
require('./models/associations'); // Import the associations here



// Import routes
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const authRoutes = require('./routes/authRoutes'); // Authentication routes
const profileRoutes = require('./routes/profileRoutes'); // Profile routes
const studentRoutes = require('./routes/studentRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Parse JSON bodies
app.use('/api/student', studentRoutes);

// Health check endpoints
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the College Directory API!' });
});

// User registration endpoint
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    // Handle registration logic (e.g., save user to database)
    res.status(201).json({ message: 'Registration successful!' });
});

// User login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    // Handle login logic (e.g., authenticate user)
    res.status(200).json({ message: 'Login successful!' });
});

// Check Database Connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1); // Exit the process if the database connection fails
    });

// Sync all models
sequelize.sync({ force: false }) // Change to true to drop tables on every run
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => console.log(err));

// Define API routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/users', userRoutes); // User management routes
app.use('/api/courses', courseRoutes); // Course management routes
app.use('/api/grades', gradeRoutes); // Grade management routes
app.use('/api/student/profile', profileRoutes); // Profile management routes

// Sync database and start the server
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error syncing database:', err);
        process.exit(1); // Exit the process if syncing fails
    });
