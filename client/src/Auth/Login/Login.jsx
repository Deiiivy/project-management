import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import Navbar from '../../navbar/Navbar.jsx'

function Login({setUser}) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();


    const handleEvent = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/projectManagement/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
               login(data.token);
              console.log(data)
                console.log('Login exitoso');
              setUser(name);
                navigate('/index');
               setName('');
                setPassword('');
            } else {
                setError(data.message || 'El usuario no existe'); 
            }
        } catch (error) {
            setError('Error de conexión con el servidor'); 
            console.error('Error al loguear:', error);
        }
    };

    return (
        <div className="Login">
            <form className="Form" onSubmit={handleEvent}>
                <h1>Login</h1>

                <div className="fields">
                    <input type="text" required value={name} placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
                    <input type="password" required value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />

                  
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Login</button>
                </div>
                
                <Link to="/Singin">Don't have an account?</Link>
            </form>
        </div>
    );
}

export default Login;
