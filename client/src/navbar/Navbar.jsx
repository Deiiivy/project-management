import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import './Navbar.css';

function Navbar({ name }) {
    const { isAuthenticated, login } = useAuth();
    const { logout } = useAuth();

    return (
        <div className="Navbar">
            <div className="logo">
                <Link to="/" className="navbar-title">PROJECT MANAGEMENT</Link>
            </div>

            <div className="nav-links">
                {isAuthenticated ? (
                    <>
                        <Link to="/CreateTask" className="nav-item">Create Task</Link>
                        <Link to="/CreateGroup" className="nav-item">Create Group</Link>
                        <Link to="/index" className="nav-item">Tasks</Link>
                        <Link to="/Group" className="nav-item">Groups</Link>
                        <button onClick={logout} className="logout-btn">Logout</button>
                        <p className="userName">{name}</p>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-item">Login</Link>
                        <Link to="/Singin" className="nav-item">Register</Link>
                    </>
                )}
            </div>

        </div>
    );
}

export default Navbar;

