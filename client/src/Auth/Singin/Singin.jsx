import React from 'react'
import './Singin.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../utils/AuthContext';

function Singin() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('')
    const [message, setMessage] =  useState('')
    const [error, setError] = useState('')
    const { login } = useAuth();
    const navigate = useNavigate()

    const register = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/projectManagement/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, password })
            });

          const data = await response.json();

            if (response.ok) {
                login();
              console.log('Usuario creado exitosamente');
                navigate('/Login') 
                setName('')
                setPassword('')
                setMessage(response.message)
            } else {
                console.log('Error al crear usuario');
                setError('Error al crear usuario')
               setMessage(data.message)
            }
        } catch (error) {
            console.log('error al crear usuario: ' + error);  
        }
    }
  return (
    <div className='Singin'>
        <form className='Form' onSubmit={register}>
            <h1>Register</h1>

            <div className='fields'>
                <input type='text' required value={name} placeholder='enter your name' onChange={(e) => setName(e.target.value)} />
                <input type='password' required value={password} placeholder='enter your password' onChange={(e) => setPassword(e.target.value)}  />

                {error && <p className="error-message">{error}</p>}
                {message && <p className='message-backend'>{message}</p>}
                <button type='submit'>Register</button>
            </div>
            
            <Link to="/login">You have a account? </Link>
        </form>
    </div>
  )
}

export default Singin
