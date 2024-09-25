import React, { useEffect, useState } from 'react';
import './facultyDetails.css'; // Add your styling here
import { Link } from 'react-router-dom';

function FacultyDetails() {
    const [faculty, setFaculty] = useState([]);
    const [editingFaculty, setEditingFaculty] = useState(null); // For handling the faculty being edited
    const [updatedFaculty, setUpdatedFaculty] = useState({ name: '', email: '', department: '' }); // Edit form data

    // Fetch faculty details from db1.json
    const fetchFaculty = async () => {
        const response = await fetch('http://localhost:3001/users');
        const data = await response.json();
        setFaculty(data);
    };

    useEffect(() => {
        fetchFaculty();
    }, []);

    // Handle delete action
    const handleDelete = async (facultyId) => {
        try {
            // Send DELETE request to server
            await fetch(`http://localhost:3001/users/${facultyId}`, { method: 'DELETE' });
            // Remove the faculty from the state after successful deletion
            setFaculty(faculty.filter(fac => fac.id !== facultyId));
        } catch (error) {
            console.error("Error deleting faculty:", error);
        }
    };

    // Handle edit action
    const handleEdit = (faculty) => {
        setEditingFaculty(faculty.id);
        setUpdatedFaculty({ name: faculty.name, email: faculty.email, department: faculty.department });
    };

    // Handle form change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedFaculty(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send PUT request to update the faculty details
            await fetch(`http://localhost:3001/users/${editingFaculty}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedFaculty),
            });
            // Update the faculty list after editing
            setFaculty(faculty.map(fac => (fac.id === editingFaculty ? { ...fac, ...updatedFaculty } : fac)));
            setEditingFaculty(null); // Reset the editing state
        } catch (error) {
            console.error("Error updating faculty:", error);
        }
    };

    return (
        <div className="faculty-container">
            <button className='button-popup button-home'> <Link style={{ color: "white", fontSize: "14px", textDecoration: "none" }} to="/"><h6> Back To Home</h6></Link></button>

            <h2>Faculty Details</h2>
            <table className="faculty-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {faculty.map(fac => (
                        <tr key={fac.id}>
                            <td>{fac.id}</td>
                            <td>
                                {editingFaculty === fac.id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={updatedFaculty.name}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    fac.name
                                )}
                            </td>
                            <td>
                                {editingFaculty === fac.id ? (
                                    <input
                                        type="text"
                                        name="email"
                                        value={updatedFaculty.email}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    fac.email
                                )}
                            </td>
                            <td>
                                {editingFaculty === fac.id ? (
                                    <input
                                        type="text"
                                        name="department"
                                        value={updatedFaculty.department}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    fac.department
                                )}
                            </td>
                            <td>
                                {editingFaculty === fac.id ? (
                                    <button className="save-btn" onClick={handleSubmit}>
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(fac)}>
                                        Edit
                                    </button>
                                )}
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(fac.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FacultyDetails;
