// src/components/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { div } from 'three/webgpu';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('STUDENT'); // Default to Student

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/register', { username, password, role });
            alert('User registered successfully! You can now log in.');
            // Optionally redirect to the login page
        } catch (error) {
            console.error('Registration failed', error);
            alert('Registration failed, please try again.');
        }
    };

    return (
        <div className='register'>
            <form onSubmit={handleRegister}>
                <h2>Register</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="STUDENT">Student</option>
                    <option value="FACULTY_MEMBER">Faculty Member</option>
                    <option value="ADMINISTRATOR">Administrator</option>
                </select>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
