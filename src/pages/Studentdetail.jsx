import React, { useEffect, useState } from 'react';
import './student.css';
import { Link } from 'react-router-dom';

function Studentdetails() {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({
        name: '',
        department: '',
        phone: '',
        parentsDetails: ''
    });
    const [editStudent, setEditStudent] = useState(null);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    const fetchStudents = async () => {
        const response = await fetch('http://localhost:3002/students');
        const data = await response.json();
        setStudents(data);
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const addStudent = async () => {
        await fetch('http://localhost:3002/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStudent),
        });
        fetchStudents();
        setNewStudent({ name: '', department: '', phone: '', parentsDetails: '' });
    };

    const updateStudent = async () => {
        await fetch(`http://localhost:3002/students/${editStudent.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editStudent),
        });
        fetchStudents();
        setShowEditPopup(false);
        setEditStudent(null);
    };

    const deleteStudent = async () => {
        await fetch(`http://localhost:3002/students/${studentToDelete}`, { method: 'DELETE' });
        fetchStudents();
        setShowDeleteConfirmation(false);
        setStudentToDelete(null);
    };

    return (
        <div className="student-management-container">
            <h2>Student Management</h2>
            <button className='button-popup button-home'> <Link style={{ color: "white", fontSize: "14px", textDecoration: "none" }} to="/"><h6> Back To Home</h6></Link></button>

            <div className="add-student">
                <input
                    type="text"
                    placeholder="Name"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Department"
                    value={newStudent.department}
                    onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Parents Details"
                    value={newStudent.parentsDetails}
                    onChange={(e) => setNewStudent({ ...newStudent, parentsDetails: e.target.value })}
                />
                <button className='button-popup' onClick={addStudent}>Add Student</button>
            </div>

            <table className="student-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Phone Number</th>
                        <th>Parents Details</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.department}</td>
                            <td>{student.phone}</td>
                            <td>{student.parentsDetails}</td>
                            <td>
                                <button className='button-popup' onClick={() => { setEditStudent(student); setShowEditPopup(true); }}>Edit</button>
                                <button className='button-popup' onClick={() => { setStudentToDelete(student.id); setShowDeleteConfirmation(true); }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showEditPopup && (
                <div className="popup popup-overlay">
                    <div className="popup-content">
                        <h3>Edit Student</h3>
                        <input
                            type="text"
                            placeholder="Name"
                            value={editStudent.name}
                            onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Department"
                            value={editStudent.department}
                            onChange={(e) => setEditStudent({ ...editStudent, department: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={editStudent.phone}
                            onChange={(e) => setEditStudent({ ...editStudent, phone: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Parents Details"
                            value={editStudent.parentsDetails}
                            onChange={(e) => setEditStudent({ ...editStudent, parentsDetails: e.target.value })}
                        />
                        <button className='button-popup' onClick={updateStudent}>Save</button>
                        <button className='button-popup' onClick={() => setShowEditPopup(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {showDeleteConfirmation && (
                <div className="popup popup-overlay">
                    <div className="popup-content">
                        <h3>Are you sure you want to delete this student?</h3>
                        <button className='button-popup' onClick={deleteStudent}>Confirm</button>
                        <button className='button-popup' onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
                    </div>
                </div>
            )}

        </div>

    );
}

export default Studentdetails;
