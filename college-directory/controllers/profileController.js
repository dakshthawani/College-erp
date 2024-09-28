// controllers/profileController.js
const Student = require('../models/Student'); // Assuming you have a Student model defined

// Controller to get the profile of the authenticated user
exports.getProfile = async (req, res) => {
    try {
        const studentId = req.user.id; // Assuming req.user is populated by the authentication middleware
        const profile = await Student.findByPk(studentId); // Find student by primary key (ID)
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch profile', error });
    }
};

// Controller to update the profile of the authenticated user
exports.updateProfile = async (req, res) => {
    try {
        const studentId = req.user.id; // Assuming req.user is populated by the authentication middleware
        const { name, email, phone } = req.body;

        const [affectedCount] = await Student.update(
            { name, email, phone },
            { where: { id: studentId } }
        );

        if (affectedCount === 0) {
            return res.status(400).json({ message: 'Profile update failed or no changes made' });
        }
        const updatedProfile = await Student.findByPk(studentId); // fetch updated profile
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update profile', error });
    }
};

