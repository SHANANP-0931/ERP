import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();  // To redirect after successful login

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        try {
            const response = await fetch(`http://localhost:3001/users?email=${email}`);
            const users = await response.json();

            if (users.length > 0 && users[0].password === password) {
                // Login successful, redirect to home page
                navigate('/');
            } else {
                // Show error message if credentials do not match
                setErrorMessage("Invalid email or password.");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            setErrorMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Student ERP Login</h2>
                <form onSubmit={handleLogin}>
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
                    <button type="submit" className="login-btn">Login</button>
                </form>

                {/* Error message popup */}
                {errorMessage && (
                    <div className="error-message">
                        <p>{errorMessage}</p>
                    </div>
                )}

                <div className="login-footer">
                    <p>Forgot your password? <a href="/reset">Reset Password</a></p>
                    <p>Don't have an account? <Link to="/sign">Create New Account</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
