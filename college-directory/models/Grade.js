// models/Grade.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Student = require('./Student');
const Course = require('./Course');

const Grade = sequelize.define('Grade', {
  student_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: 'id',
    },
  },
  course_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: 'id',
    },
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'grades',
});

module.exports = Grade;
