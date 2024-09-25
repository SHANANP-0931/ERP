import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Studentdetails from './Studentdetail';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <aside className="side-nav">
                <ul>
                    <li><Link to="/"><FontAwesomeIcon icon={faHouse} /> Home</Link></li>
                    <li><Link to="/user"><FontAwesomeIcon icon={faUser} /> User</Link></li>
                    <li><Link to="/logout"><FontAwesomeIcon icon={faRightFromBracket} /> Logout</Link></li>
                </ul>
            </aside>

            <div className="main-content">
                <div className="card-container">
                    <div className="card student-card">
                        <h3><Link style={{ color: "white", textDecoration: "none" }} to="/studentdetails">Student Details</Link>
                        </h3>
                    </div>
                    <div className="card attendance-card">
                        <h3> <Link style={{ color: "white", textDecoration: "none" }} to="/attendance">Attendance</Link> </h3>
                    </div>
                    <div className="card course-card">
                        <h3><Link style={{ color: "white", textDecoration: "none" }} to="/coursedetail">coure details</Link></h3>
                    </div>
                    <div className="card faculty-card">
                        <h3> <Link style={{ color: "white", textDecoration: "none" }} to="/faculty">Faculty Details</Link></h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
