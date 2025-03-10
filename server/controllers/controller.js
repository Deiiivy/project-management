import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { authenticateToken } from '../middlewares/AuthMiddleware.js'
import Task from '../models/task.js'
import bcrypt from 'bcrypt'


// create user
 
export const createUser = async (req, res) => {
    try {
        const { name, password } = req.body;

        const existingUser = await User.findOne({ where: { name } });

        if (existingUser) {
            const match = await bcrypt.compare(password, existingUser.password);
            if (match) {
                return res.status(400).json({ message: "El usuario con esta contraseña ya existe" });
            }
        }

        const passwordHash = await bcrypt.hash(password, 12);


        const newUser = await User.create({ name, password: passwordHash });
      await newUser.save()
        res.status(201).json({ message: "Usuario creado con éxito" });

    } catch (error) {
        console.log("Error al crear usuario:", error);
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
      res.status(500).send("User no found")
      console.log("user no found")
    }

    const comparePasswords = await bcrypt.compare(password, user.password)

    if(!comparePasswords) {
      return res.status(403).send("invalid password")
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
 
export const createGroup = async (req, res) => {
  try {
   authenticateToken(req, res, async() => {

   }) 
  } catch (error) {
    
  }
}
