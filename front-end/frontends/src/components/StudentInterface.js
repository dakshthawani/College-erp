// src/components/StudentInterface.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './StudentInterface.css';

const StudentInterface = () => {
    const [profile, setProfile] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [courses, setCourses] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch student profile, courses, and announcements when component mounts
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            console.log('Token retrieved:', token); // Log the token being used for the API call

            if (!token) {
                console.error('No token found. Please log in.');
                setError('No token found. Please log in.');
                setLoading(false);
                return; // Return early if no token is found
            }

            try {
                // Fetch profile
                const profileRes = await axios.get('http://localhost:5001/api/student/profile', { headers: { Authorization: `Bearer ${token}` } });
                setProfile(profileRes.data);

                // Fetch courses and handle potential errors
                let coursesRes = { data: [] };
                try {
                    coursesRes = await axios.get('http://localhost:5001/api/student/courses', { headers: { Authorization: `Bearer ${token}` } });
                } catch (coursesError) {
                    console.error('Error fetching courses:', coursesError);
                    setCourses([]);
                }

                // Fetch announcements and handle potential errors
                let announcementsRes = { data: [] };
                try {
                    announcementsRes = await axios.get('http://localhost:5001/api/announcements', { headers: { Authorization: `Bearer ${token}` } });
                } catch (announcementsError) {
                    console.error('Error fetching announcements:', announcementsError);
                    setAnnouncements([]);
                }

                setCourses(coursesRes.data);
                setAnnouncements(announcementsRes.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load data. Please try again.');
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Handle profile editing
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5001/api/student/profile', profile, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditMode(false);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile');
        }
    };

    // Handle search functionality
    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5001/api/student/search?query=${searchQuery}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Failed to search for students:', error);
            alert('Search failed');
        }
    };

    if (loading) {
        return <div className='loading'>Loading data, please wait...</div>;
    }

    if (error) {
        return <div className='error'>{error}</div>;
    }

    return (
        <div className='student-interface'>
            <h2>Student Dashboard</h2>

            {/* Profile Section */}
            <div className="profile-section">
                <h3>Profile Information</h3>
                {editMode ? (
                    <form onSubmit={handleProfileUpdate}>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            />
                        </label>
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
                    </form>
                ) : (
                    <div>
                        <p><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Student ID:</strong> {profile.studentId}</p>
                        <button onClick={() => setEditMode(true)}>Edit Profile</button>
                    </div>
                )}
            </div>

            {/* Search for Other Students */}
            <div className="search-section">
                <h3>Search for Students</h3>
                <input
                    type="text"
                    placeholder="Enter student name or ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                {searchResults.length > 0 && (
                    <ul>
                        {searchResults.map((student) => (
                            <li key={student.id}>
                                {student.name} - {student.email}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Courses Section */}
            <div className="courses-section">
                <h3>Your Courses</h3>
                {courses.length > 0 ? (
                    <ul>
                        {courses.map((course) => (
                            <li key={course.id}>
                                <strong>{course.name}</strong> - Grade: {course.grade || 'Not yet graded'}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No courses enrolled yet.</p>
                )}
            </div>

            {/* Announcements Section */}
            <div className="announcements-section">
                <h3>Announcements</h3>
                {announcements.length > 0 ? (
                    <ul>
                        {announcements.map((announcement) => (
                            <li key={announcement.id}>
                                {announcement.message}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No announcements yet.</p>
                )}
            </div>
        </div>
    );
};

export default StudentInterface;
