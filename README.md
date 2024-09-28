# College Directory API

The **College Directory API** is a backend application built using Node.js and Express.js to manage users, students, courses, and grades for a college system. It provides authentication, registration, and other APIs to serve data to the frontend and handle various operations like CRUD for different entities.

**Note: This project is currently in its beta state, and a lot of features are still under development. Many functionalities may not be working as expected, and some endpoints might be incomplete. Contributions and suggestions are welcome to enhance this project further.**

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Database Configuration](#database-configuration)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Why Node.js for Backend?](#why-nodejs-for-backend)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Management**: Registration, login, and role-based access for students, faculty, and administrators.
- **Course and Grade Management**: APIs to manage courses and grades for students.
- **Profile Management**: Update and view profiles of different users.
- **Secure Authentication**: Token-based authentication using JWT.
- **Database Integration**: Uses Sequelize ORM for easy database management.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (using Sequelize ORM)
- **Authentication**: JWT (JSON Web Tokens)
- **Libraries**: bcrypt for password hashing, cors for handling cross-origin requests.

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/college-directory-api.git
   cd college-directory-api

2. Install the dependencies:
   ```bash
   npm install

3. Create a .env file in the root directory with the following variables:
   ```bash
   PORT=5001
   DATABASE_URL=postgres://user:password@localhost:5432/college_directory
   JWT_SECRET=your_jwt_secret

### Database Configuration

1. Ensure you have PostgreSQL installed and create a new database named college_directory.

2. Update the DATABASE_URL in your .env file with your PostgreSQL credentials.

3. Run the following command to sync the database models:
  ```bash
  npm run sync-db
  ```

### Running the Application

1. Start the server:
```bash
npm start
```
2. The server will be running at http://localhost:5001.

### API Endpoints

#### Authentication

* POST /api/auth/register - Register a new user.
* POST /api/auth/login - Login a user.


### User Management
* GET /api/users - Get a list of all users.
* PUT /api/users/:id - Update user details.
* DELETE /api/users/:id - Delete a user.

### Student Management
* POST /api/student - Create a new student.
* GET /api/student - Get a list of all students.
* PUT /api/student/:id - Update a student’s details.
* DELETE /api/student/:id - Delete a student.
### Course Management
* POST /api/courses - Create a new course.
* GET /api/courses - Get a list of all courses.
* PUT /api/courses/:id - Update course details.
* DELETE /api/courses/:id - Delete a course.
### Grade Management
* POST /api/grades - Create a new grade record.
* GET /api/grades - Get a list of all grades.
* PUT /api/grades/:id - Update a grade record.
* DELETE /api/grades/:id - Delete a grade record.
* Profile Management
* GET /api/student/profile - Get student profile details.

### Why Node.js for Backend?

#### Performance and Scalability

Node.js is known for its non-blocking, event-driven architecture, which makes it highly scalable and efficient for handling multiple concurrent requests. This makes it well-suited for applications that require high throughput and real-time data handling, such as a college directory where multiple users (students, faculty) may be interacting with the API simultaneously.

#### Speed of Development

Node.js has a rich ecosystem of libraries and tools, like Express.js, which enable rapid development. For building RESTful APIs, Node.js provides flexibility and a streamlined experience, reducing the amount of boilerplate code required compared to Java.

#### Integration and JSON Support

Node.js natively supports JSON, making it a natural choice for building APIs that need to communicate with frontend frameworks like React. This direct JSON support simplifies data parsing and manipulation, allowing for smoother integration between frontend and backend.

#### Asynchronous Programming

Node.js's asynchronous nature allows for handling I/O operations such as database queries and file handling more efficiently. With Java, managing async operations can be more complex, requiring additional configurations and thread management.

#### Community and Support

Node.js has a large, active community, making it easier to find solutions to problems and implement best practices. Java is also well-supported, but its community is often more focused on enterprise applications and microservices, which might be overkill for smaller-scale projects like this one.

### Project Structure

```bash
.
├── controllers        # Contains the business logic for each entity
├── models             # Sequelize models for User, Student, Course, etc.
├── routes             # API route definitions
├── config             # Database and environment configurations
├── middlewares        # Custom middleware for authentication and error handling
├── server.js          # Entry point of the application
└── .env               # Environment variables
```

### Future Enhancements

* Implement additional user roles and permissions (e.g., department heads).
* Add support for more complex grading systems and course structures.
* Build a frontend interface using React to consume these APIs.
### Contributing

Contributions are welcome! Please create a pull request or open an issue to suggest improvements.
