import React, { useState } from 'react';
import './Sign.css';

function Sign() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false); // State to handle popup visibility

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        const newUser = { name, email, password };

        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                setMessage("Sign-up successful!");
                setShowPopup(true); // Show popup on success
                // Optionally clear the form
                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                setMessage("Sign-up failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Error: Unable to sign up.");
        }
    };



    return (
        <div className="sign-container">
            <div className="sign-card">
                <h2 className="sign-title">Create Your Account</h2>
                <form onSubmit={handleSignUp}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="sign-btn">Sign Up</button>
                </form>
                {message && <p>{message}</p>}
                <div className="sign-footer">
                    <p>Already have an account? <a href="/login">Login here</a></p>
                </div>
            </div>


        </div>
    );
}

export default Sign;
