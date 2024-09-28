// models/Course.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Course = sequelize.define('Course', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  faculty_assigned: {
    type: DataTypes.STRING, // Faculty ID or name
    allowNull: false,
  },
  students_enrolled: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Array of student IDs or names
    defaultValue: [],
  },
}, {
  tableName: 'courses',
});

module.exports = Course;
