import React, { useEffect, useState } from 'react'
import './Index.css'
import { Link } from 'react-router-dom'

function Index() {
  const [tasks, setTasks] = useState([]);
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
  return (
    <div className='Index'>
     <div className='Tasks'>
    {tasks.map((task, index) => (
      <li key={index}>{task.title} - {task.description}</li>
    ))}
    </div> 
    </div>
  )
}

export default Index 
