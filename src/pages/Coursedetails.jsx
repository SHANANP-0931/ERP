import React, { useState } from 'react';
import './courses.css';
import { Link } from 'react-router-dom';

const coursesData = [
    { id: 1, name: 'Computer Engineering', duration: '4 years', fee: '$4000', hod: 'Dr. A. Smith' },
    { id: 2, name: 'Mechanical Engineering', duration: '4 years', fee: '$4200', hod: 'Dr. B. Johnson' },
    { id: 3, name: 'Civil Engineering', duration: '4 years', fee: '$4300', hod: 'Dr. C. Adams' },
    { id: 4, name: 'Electrical Engineering', duration: '4 years', fee: '$4100', hod: 'Dr. D. Clark' },
    // Add other courses here
];

function Courses() {
    const [courses, setCourses] = useState(coursesData);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);

    const handleAddCourse = () => {
        const newCourse = {
            id: courses.length + 1,
            name: 'New Course',
            duration: '4 years',
            fee: '$0',
            hod: 'New HOD'
        };
        setCourses([...courses, newCourse]);
    };

    const handleEditCourse = (course) => {
        setIsEditing(true);
        setCurrentCourse(course);
    };

    const handleSaveCourse = () => {
        setCourses(courses.map(course => (course.id === currentCourse.id ? currentCourse : course)));
        setIsEditing(false);
    };

    const handleCourseChange = (e) => {
        const { name, value } = e.target;
        setCurrentCourse({ ...currentCourse, [name]: value });
    };

    return (
        <div className="courses-container">
            <button className='button-popup button-home'> <Link style={{ color: "white", fontSize: "14px", textDecoration: "none" }} to="/"><h6> Back To Home</h6></Link></button>

            <h2>Available Engineering Courses</h2>

            <button className="add-button" onClick={handleAddCourse}>Add Course</button>

            {isEditing && (
                <div className="edit-form">
                    <h3>Edit Course</h3>
                    <input
                        type="text"
                        name="name"
                        value={currentCourse.name}
                        onChange={handleCourseChange}
                        placeholder="Course Name"
                    />
                    <input
                        type="text"
                        name="duration"
                        value={currentCourse.duration}
                        onChange={handleCourseChange}
                        placeholder="Duration"
                    />
                    <input
                        type="text"
                        name="fee"
                        value={currentCourse.fee}
                        onChange={handleCourseChange}
                        placeholder="Fee"
                    />
                    <input
                        type="text"
                        name="hod"
                        value={currentCourse.hod}
                        onChange={handleCourseChange}
                        placeholder="HOD"
                    />
                    <button onClick={handleSaveCourse}>Save</button>
                </div>
            )}

            <div className="courses-grid">
                {courses.map(course => (
                    <div key={course.id} className="course-details">
                        <h3>{course.name}</h3>
                        <p><strong>Course ID:</strong> {course.id}</p>
                        <p><strong>Duration:</strong> {course.duration}</p>
                        <p><strong>Fee:</strong> {course.fee}</p>
                        <p><strong>HOD:</strong> {course.hod}</p>
                        <button className="edit-button" onClick={() => handleEditCourse(course)}>Edit</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Courses;
