import User from '../models/user.js'
import Task from '../models/task.js'
import Group from '../models/group.js'
import TaskGroup from '../models/taskgroup.js'
import jwt from 'jsonwebtoken'
import { authenticateToken } from '../middlewares/AuthMiddleware.js'
import bcrypt from 'bcrypt'


// create user
 
export const createUser = async (req, res) => {
    try {
        const { name, password } = req.body;

        
        const existingUserByName = await User.findOne({ where: { name } });
        if (existingUserByName) {
            return res.status(400).json({ message: "El usuario con este name ya existe" });
        }

      
        const allUsers = await User.findAll(); 
        for (let user of allUsers) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                return res.status(400).json({ message: "La contraseña ya está en uso por otro usuario" });
            }
        }

      
        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = await User.create({ name, password: passwordHash });
        await newUser.save();

        res.status(201).json({ message: "Usuario creado con éxito" });

    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};



// login user
export const loginUser = async(req, res) => {
  try {

    const {name, password} = req.body;
    const user = await User.findOne({
      where: {name}
    })

    if(!user) {
     return res.status(400).json({message: "user no found"})
    }

    const comparePasswords = await bcrypt.compare(password, user.password)

    if(!comparePasswords) {
      return res.status(403).json({ message: "invalid password" })
    }
    const token = jwt.sign({ id: user.id, name: user.name }, "miclave", { expiresIn: "1h" });

    res.json({ message: `Welcome User: ${user.name}`, token });
    console.log(`Usuario autenticado: ${user.name}, Token generado`);
    }catch (error){
      console.log(`error al obtener usuario: ` + error)
    }
}


// create tasks
export const createTask = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      authenticateToken(req, res, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const newTask = await Task.create({
      title,
      description,
      userId: req.user.id,
    });

    res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error(`Error al crear tarea: ${error}`);
    res.status(500).json({ error: "Error al crear tarea" });
  }
};

// getAllTasks

export const getAllTasks = async(req, res) => {
  try {
    const Tasks = await Task.findAll();
    if(!Tasks) {
      res.send("no hay tareas")
    }
    res.send(Tasks) 
  } catch (error) {
    console.log(`error al obtener las tareas: ${error}`);
    
  }
}


// get all task of the user
export const getAllTasksUser = async(req, res) => {
  try {
    authenticateToken(req, res, async() => {
      const tasks = await Task.findAll({where: {
        userId: req.user.id
      }})
      res.status(200).send(tasks)
    })
  } catch (error) {
    console.log(error);
    
  }
}

// delete one task
export const deleteTasks = async (req, res) => {
  try {
    authenticateToken(req, res, async () => {
      console.log("ID recibido:", req.params.id);
      console.log("Usuario autenticado:", req.user.id);

      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "❌ ID requerido" });
      }

      const taskToDelete = await Task.findOne({
        where: {
          id: id,
          userId: req.user.id, 
        },
      });

      if (!taskToDelete) {
        return res.status(404).json({ message: "❌ Task not found" });
      }

      await taskToDelete.destroy();
      res.json({ message: `✅ Task '${taskToDelete.title}' deleted` });
    });
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    res.status(500).json({ message: "❌ Error interno del servidor" });
  }
};


//create group
export const createGroup = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      authenticateToken(req, res, (error) => {
        if(error) reject(error)
          else resolve()
      })
    })

    const {name} = req.body;
    const userId = req.user.id;

    if (!name) {
      return res.status(400).json({ error: "El nombre del grupo es obligatorio" });
    }

    const newGroup = await Group.create({
      name,
      id_creator: userId, 
    });

    res.status(201).json(newGroup);

  }catch (error) {
    console.error(`Error al crear grupo: ${error}`);
    res.status(500).json({ error: "Error al crear grupo" });
  }
}

//create task of the group
export const createTaskGroup = async(req, res) => {
  try {
    await new Promise((resolve, reject) => {
      authenticateToken(req, res, (error) => {
        if(error) reject(error)
          else resolve()
      })
    })

    const {name, description, id_group} = req.body;
    const id_user = req.user.id;

    if (!name || !description) {
      return res.status(400).json({ error: "El name de la tarea y la description  es obligatorio" });
    }

    const newTaskGroup = await TaskGroup.create({
      id_group,
      id_user,
      name,
      description,
    })

    res.status(201).json(newTaskGroup);

  } catch (error) {
    res.send('error, ' + error)
    console.log('error ', + error)
  }
}


//add guees to the group
export const addGuessToGroup = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      authenticateToken(req, res, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    const { groupId, name } = req.body;

    if (!groupId || !name) {
      return res.status(400).json({ error: "Se requiere el ID del grupo y el nombre de usuario" });
    }

    const user = await User.findOne({ where: { name } });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ error: "Grupo no encontrado" });
    }

    
    group.id_guess = user.id;
    await group.save();

    res.status(200).json({ message: "Usuario agregado al grupo exitosamente", group });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ error: "Error al agregar usuario al grupo" });
  }
};


//get all groups of the user

export const getAllGroupsOfUser = async(req, res) => {
  try {
    authenticateToken(req, res, async() => {
      const groups = await Group.findAll({where: {
        id_creator: req.user.id
      }})
      res.status(200).send(groups)
    })
  } catch (error) {
    console.log(error);
    
  }
}