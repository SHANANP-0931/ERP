import React, { useEffect, useState } from 'react';
import './attendance.css';
import { Link } from 'react-router-dom';

function Attendance() {
    const [students, setStudents] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // Default to current month
    const [daysInMonth, setDaysInMonth] = useState(31); // Default to 31 days
    const [attendance, setAttendance] = useState({});

    // Fetch student details from db2.json
    const fetchStudents = async () => {
        const response = await fetch('http://localhost:3002/students');
        const data = await response.json();
        setStudents(data);
        initializeAttendance(data); // Initialize attendance after fetching students
    };

    useEffect(() => {
        fetchStudents();
        updateDaysInMonth(currentMonth);
    }, [currentMonth]);

    const updateDaysInMonth = (month) => {
        const year = new Date().getFullYear();
        const days = new Date(year, month, 0).getDate();
        setDaysInMonth(days);
        initializeAttendance(students); // Reinitialize attendance when month changes
    };

    // Initialize attendance state with all checkboxes unchecked by default
    const initializeAttendance = (students) => {
        const initialAttendance = {};
        students.forEach(student => {
            initialAttendance[student.id] = {};
            for (let i = 1; i <= daysInMonth; i++) {
                initialAttendance[student.id][i] = false; // Assume absent (unchecked) by default
            }
        });
        setAttendance(initialAttendance);
    };

    // Handle attendance checkbox change
    const handleAttendanceChange = (studentId, day) => {
        setAttendance(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [day]: !prev[studentId]?.[day],
            },
        }));
    };

    // Calculate total absent days for each student (unchecked checkboxes)
    const calculateAbsentDays = (studentId) => {
        const studentAttendance = attendance[studentId] || {};
        return Object.values(studentAttendance).filter(value => !value).length; // Count unchecked boxes
    };

    // Calculate total balance (attended days) for each student (checked checkboxes)
    const calculateAttendedDays = (studentId) => {
        const studentAttendance = attendance[studentId] || {};
        return Object.values(studentAttendance).filter(value => value).length; // Count checked boxes
    };

    // Convert num to month name
    const getMonthName = (month) => {
        return new Date(0, month - 1).toLocaleString('default', { month: 'long' });
    };

    // Handle month change
    const handleMonthChange = (event) => {
        setCurrentMonth(parseInt(event.target.value));
    };

    // Handle saving attendance to the database (or json server)
    const handleSaveAttendance = async () => {
        try {
            const response = await fetch('http://localhost:3002/attendance', {
                method: 'POST', // Change to PUT if updating existing attendance records
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    month: currentMonth,
                    attendance,
                }),
            });
            if (response.ok) {
                alert('Attendance saved successfully!');
            } else {
                console.error('Failed to save attendance.');
            }
        } catch (error) {
            console.error('Error saving attendance:', error);
        }
    };

    return (
        <div className="attendance-container">
            <button className='button-popup button-home'> <Link style={{ color: "white", fontSize: "14px", textDecoration: "none" }} to="/"><h6> Back To Home</h6></Link></button>

            <h2>Attendance Sheet - {getMonthName(currentMonth)}</h2>

            <div className="month-selector">
                <label htmlFor="month">Select Month:</label>
                <select id="month" value={currentMonth} onChange={handleMonthChange}>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>
            </div>

            <table className="attendance-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Attended</th>
                        {Array.from({ length: daysInMonth }, (_, i) => (
                            <th key={i + 1}>{i + 1}</th>
                        ))}
                        <th>Total Absent</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.department}</td>
                            <td style={{ backgroundColor: "green", color: "white" }}>{calculateAttendedDays(student.id)}</td> {/* Total attended days */}
                            {Array.from({ length: daysInMonth }, (_, i) => (
                                <td key={i + 1}>
                                    <input
                                        type="checkbox"
                                        checked={attendance[student.id]?.[i + 1] || false}
                                        onChange={() => handleAttendanceChange(student.id, i + 1)}
                                    />
                                </td>
                            ))}
                            <td>{calculateAbsentDays(student.id)}</td> {/* Total absent days */}
                        </tr>
                    ))}
                </tbody>
            </table>

            <button style={{ backgroundColor: "black", color: "white", borderRadius: "5px", margin: "20px", height: "30px" }} className="save-button" onClick={handleSaveAttendance}>
                Save Attendance
            </button>
        </div>
    );
}

export default Attendance;
