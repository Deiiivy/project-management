import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateTask.css';

function UpdateTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3000/projectManagement/getTask/${id}`);
        if (!response.ok) throw new Error("Error obteniendo la tarea.");
        const data = await response.json();
        setTask({ title: data.title, description: data.description });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:3000/projectManagement/updateTask/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) throw new Error("Error actualizando la tarea");

      navigate("/index");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p className="loading">Cargando...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="update-task-wrapper">
      <div className="update-task-box">
        <h2 className="update-task-title">Editar Tarea</h2>
        <form className="update-task-form" onSubmit={handleSubmit}>
          <label className="update-task-label">Título:</label>
          <input
            type="text"
            name="title"
            className="update-task-input"
            value={task.title}
            onChange={handleChange}
            required
          />
          <label className="update-task-label">Descripción:</label>
          <textarea
            name="description"
            className="update-task-textarea"
            value={task.description}
            onChange={handleChange}
            required
          />
          <button className="update-task-button" type="submit">Actualizar</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateTask;
