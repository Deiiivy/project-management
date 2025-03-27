import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Index.css';

function Index() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getAllTask();
  }, []);

  const getAllTask = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/projectManagement/getTasksUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Error en la solicitud");

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ No tienes autorización.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/projectManagement/deleteTask/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("No se pudo eliminar la tarea");

      setTasks(tasks.filter(task => task.id !== id));
      setMessage("✅ Tarea eliminada con éxito.");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ Error de conexión. Intenta nuevamente.");
    }
  };

  return (
    <div className='Index'>
      {message && <p className="message">{message}</p>}
      <div className='Tasks'>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div className='task' key={task.id}>
              <li className='task-title'>{task.title}</li>
              <li className='task-description'>{task.description}</li>
              <div className='btns'>
                <button onClick={() => deleteTask(task.id)} className='btnDelete'>Delete</button>
                <Link to={`/UpdateTask/${task.id}`} className='btnUpdate'>Update</Link>
              </div>
            </div>
          ))
        ) : (
          <p>No hay tareas disponibles</p>
        )}
      </div>
    </div>
  );
}

export default Index;

