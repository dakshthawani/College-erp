import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('STUDENT'); // Default to Student

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send login credentials
            const response = await axios.post('http://localhost:5001/api/login', {
                username,
                password,
                role,
            });

            const { token } = response.data; // Adjust based on your API response
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            console.log('Token saved:', token); // Log the token to verify

            // Call the onLogin prop with the role to update the UI
            onLogin(role);
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed, please try again.'); // Provide a more user-friendly error message
        }
    };

    return (
        <div className='login'>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
