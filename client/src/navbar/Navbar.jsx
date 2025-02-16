import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import './Navbar.css';

function Navbar() {
    const { login } = useAuth();
    const { logout } = useAuth();

    return (
        <div className="Navbar">
            <div className="title">
                <h1>PROJECT MANAGEMENT</h1>
            </div>

            <div className="nav-links">
                <Link to="/">Home</Link>

                {login ? (
                    <>
                        <Link to="/CreateTask">Create Task</Link>
                        <Link to="/index">Tasks</Link>
                        <button onClick={logout} className="logout-btn">Logout</button>
                        
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;

