import React from 'react'
import './Singin.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../utils/AuthContext';

function Singin() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useAuth();

    const singin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/projectManagement/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, password })
            });

            if (response.ok) {
                login();                  console.log('Usuario creado exitosamente');
                setName('')
                setPassword('')
            } else {
                console.log('Error al crear usuario');
                setError('Error al crear usuario')
            }
        } catch (error) {
            console.log('error al crear usuario: ' + error);  
        }
    }
  return (
    <div className='Singin'>
        <form className='Form' onSubmit={singin}>
            <h1>Sing Up</h1>

            <div className='fields'>
                <input type='text' required value={name} placeholder='enter your name' onChange={(e) => setName(e.target.value)} />
                <input type='text' required value={password} placeholder='enter your password' onChange={(e) => setPassword(e.target.value)}  />

                {error && <p className="error-message">{error}</p>}
                <button type='submit'>Sing In</button>
            </div>
            
            <Link to="/login">You have a account? </Link>
        </form>
    </div>
  )
}

export default Singin