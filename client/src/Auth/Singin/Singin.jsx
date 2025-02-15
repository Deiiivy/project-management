import React from 'react'
import './Singin.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../utils/AuthContext';

function Singin() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('')
    const { login } = useAuth();

    const singin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/projectManagement/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, password })
            });
            setName('')
            setPassword('')

            if (response.ok) {
                login();  
                console.log('Usuario creado exitosamente');
            } else {
                console.log('Error al crear usuario');
            }
        } catch (error) {
            console.log('error al crear usuario: ' + error);  
        }
    }
  return (
    <div className='Singin'>
        <form onSubmit={singin}>
            <h1>Sing In</h1>

            <div className='fields'>
                <input type='text' value={name} placeholder='enter your name' onChange={(e) => setName(e.target.value)} />
                <input type='text' value={password} placeholder='enter your password' onChange={(e) => setPassword(e.target.value)}  />

                <button type='submit'>Sing In</button>
            </div>
            
            <Link to="/login">You have a account? </Link>
        </form>
    </div>
  )
}

export default Singin