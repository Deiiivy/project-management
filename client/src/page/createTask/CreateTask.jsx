import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreateTask.css'; 

function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); 

  const createTasks = async (e) => {
    e.preventDefault();
    setMessage(''); 
    setLoading(true); 

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('❌ No tienes autorización.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/projectManagement/createTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data); 

      if (response.ok) {
        setMessage('✅ Task created successfully.');
        
        setTitle('');
        setDescription('');

        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`❌ Error: ${data.message || 'Ocurrió un error inesperado.'}`);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMessage('❌ Error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-task-container">
      <h2>Create Task</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={createTasks} className="task-form">
        <div className="form-group">
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required
            disabled={loading} 
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required
            disabled={loading} 
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Creating...' : 'Create task'}
        </button>
      </form>
      <Link to="/index" className="back-link">Back to the list of tasks</Link>
    </div>
  );
}

export default CreateTask;
