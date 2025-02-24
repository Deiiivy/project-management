import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import './Navbar.css';

function Navbar() {
    const { isAuthenticated, login } = useAuth();
    const { logout } = useAuth();

    return (
        <div className="Navbar">
            <div className="title">
                <h1>PROJECT MANAGEMENT</h1>
            </div>

            <div className="nav-links">

                {isAuthenticated ? (
                    <>
                        <Link to="/CreateTask">Create Task</Link>
                        <Link to="/index">Tasks</Link>
                        <Link to="/Group">Groups</Link>
                        <button onClick={logout} className="logout-btn">Logout</button>
                        
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/Singin">Register</Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;

