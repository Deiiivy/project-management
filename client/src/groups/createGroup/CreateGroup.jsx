import React from 'react'
import '../createGroup/CreateGroup.css'
import { useState } from 'react'

function CreateGroup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');


    //endpoint crear grupo
  const createGroup = async(e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ No tienes autorización.");
      return;
    }
  
    try {
      const response = await fetch(
        "http://localhost:3000/projectManagement/createGroup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, username }),
        }
      );
  
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
  
      if (response.ok) {
        setMessage("✅ Grupo creado con éxito.");
  
        const groupId = data.id; 
  
        if (!groupId) {
          setMessage("❌ Error: No se recibió el ID del grupo.");
          return;
        }
  
        const response2 = await fetch(
          "http://localhost:3000/projectManagement/addGuessToGroup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ groupId, name: username }) 
          }
        );
  
        const data2 = await response2.json();
        console.log("Respuesta del servidor (addGuessToGroup):", data2);
  
        if (response2.ok) {
          setMessage("✅ Invitado agregado al grupo con éxito.");
        } else {
          setMessage(`❌ Error al agregar invitado: ${data2.message || "Error desconocido."}`);
        }
  
        setName("");
        setUsername("");
  
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(`❌ Error: ${data.message || "Ocurrió un error inesperado."}`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setMessage("❌ Error de conexión. Intenta nuevamente.");
    }
  }



  return (
    <div className='CreateGroup'>
      <h2>Create Group</h2>
      <form onSubmit={createGroup} className="task-form">
        <div className="form-group">
          <label>Name of the group:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </div>
        <div className="form-group">
          <label>username guess:</label>
          <textarea 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </div>
      <button type="submit" className="submit-btn">
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateGroup
