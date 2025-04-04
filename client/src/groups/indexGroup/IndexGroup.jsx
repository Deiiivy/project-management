import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import './IndexGroup.css'

function IndexGroup() {
  const [groups, setGroups] = useState([]);

  const getAllGroups = async() => {
    
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ No tienes autorización.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/projectManagement/getAllGroupsOfUser", {
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
      setGroups(data); 
  } catch (error) {
      console.error("Error al obtener tareas:", error);
  }
    
  }

  useEffect(() => {
    getAllGroups();
  },[])
  return (
<div className="IndexGroup">
  <h2>Groups</h2>
  <div className="grid-container">
    {groups.map((group, index) => (
      <Link to="/IndexTask" className="container-groups" key={index}>
        <h1>{group.name}</h1>
      </Link>
    ))}
  </div>
</div>

  )
}

export default IndexGroup
