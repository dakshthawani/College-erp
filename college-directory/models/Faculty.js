// models/Faculty.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const User = require('./User');

const Faculty = sequelize.define('Faculty', {
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  courses_taught: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
}, {
  tableName: 'faculty',
});

// Associate Faculty with User
Faculty.belongsTo(User, {
  foreignKey: 'userId', // Optional: specify a foreign key for clarity
});

module.exports = Faculty;
