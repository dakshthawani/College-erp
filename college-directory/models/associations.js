// models/associations.js
const User = require('./User');
const Student = require('./Student');

// Establish associations
User.hasMany(Student, {
    foreignKey: 'userId',
    as: 'students', // Optional: alias for the association
});

Student.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user', // Optional: alias for the association
});
