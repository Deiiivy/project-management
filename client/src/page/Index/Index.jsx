import React, { useEffect, useState } from 'react'
import './Index.css'
import { Link } from 'react-router-dom'

function Index() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('')
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

            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }

            const data = await response.json();
            setTasks(data); 
        } catch (error) {
            console.error("Error al obtener tareas:", error);
        }
    };

  useEffect(() => {
    getAllTask();
  },[])


  const deleteTask = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ No tienes autorización.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/projectManagement/deleteTask/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Task deleted successfully.");
        setTasks(tasks.filter(task => task.id !== id)); 
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setMessage("❌ Error de conexión. Intenta nuevamente.");
    }
  };
  
  return (
    <div className='Index'>
     <div className='Tasks'>
    {tasks.map((task, index) => (
      <div className='task'>
      <li className='task-title' key={index}>{task.title}</li>
      <li className='task-description'>{task.description}</li>
      <div className='btns'>
      <button onClick={() => deleteTask(task.id)} className='btnDelete'>Delete</button>
      <Link to="/UpdateTask" className='btnUpdate'>Update</Link>
    </div>
      </div>
    ))}
      </div> 
    </div>
  )
}

export default Index 
