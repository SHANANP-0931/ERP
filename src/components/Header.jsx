import React from 'react';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <div className="logo-container">
                <img src="..\src\assets\images\th__1_-removebg-preview.png" alt="Logo" className="logo" />
                <h1>Student ERP</h1>
            </div>
        </header>
    );
}

export default Header;
