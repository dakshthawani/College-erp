// src/components/MainPage.js
import React, { useState } from 'react';
import LoginPage from './Login';
import RegisterPage from './Register';
import StudentInterface from './StudentInterface';
import FacultyInterface from './FacultyInterface';
import AdminInterface from './AdminInterface';

const MainPage = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [userRole, setUserRole] = useState(null);

    const togglePage = () => {
        setIsRegistering(!isRegistering);
    };

    const handleLogin = (role) => {
        setUserRole(role);
    };

    const renderInterface = () => {
        switch (userRole) {
            case 'STUDENT':
                return <StudentInterface />;
            case 'FACULTY_MEMBER':
                return <FacultyInterface />;
            case 'ADMINISTRATOR':
                return <AdminInterface />;
            default:
                return null;
        }
    };

    return (
        <div className='main-page'>
            {!userRole ? (
                isRegistering ? (
                    <RegisterPage />
                ) : (
                    <LoginPage onLogin={handleLogin} />
                )
            ) : (
                renderInterface()
            )}
            <button onClick={togglePage}>
                {isRegistering ? 'Already have an account? Login' : 'Don’t have an account? Register'}
            </button>
        </div>
    );
};

export default MainPage;
