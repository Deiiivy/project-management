import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CreateTask.css'; // Importamos el archivo de estilos

function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const createTasks = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('No tienes autorización.');
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

      if (response.ok) {
        setMessage('✅ Tasks create success.');
        setTitle('');
        setDescription('');
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('❌ Error en la conexión con el servidor.');
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
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required
          />
        </div>
        <button type="submit" className="submit-btn">Create tasks</button>
      </form>
      <Link to="/index" className="back-link">back to the list of tasks</Link>
    </div>
  );
}

export default CreateTask;


