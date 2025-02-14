import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { authenticateToken } from '../middlewares/AuthMiddleware.js'
import Task from '../models/task.js'
import bcrypt from 'bcrypt'


// create user
 
export const createUser = async(req, res) => {
  try {
    
        const {name, password} = req.body
    const passwordHash = await bcrypt.hash(password, 12)
    const newUser = await User.create({name: name, password: passwordHash})
    await newUser.save();
    res.send("user create success")
    console.log("user create")
   }
    catch (error) {
    console.log('error al crear usuario: ' + error)
  }

}
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


// create task
export const createTask = async(req, res) => {
  try {
   authenticateToken(req, res, async() => {
     const {title, description} = req.body
     const newTask = await Task.create({title: title, description: description, userId: req.user.id })
     await newTask.save();
     res.send("Task created success")
   })
  } catch (error) {
    res.send("error al crear tarea: "+ error)
    console.log(`error al crear tarea: ${error}`)
  }
}

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

export const deleteTasks = async(req, res) => {
  authenticateToken(req, res, async() => {
    const {id} = req.params;

    const taskToDelete = await Task.findOne({
      where: {
        id: id,
        userId: req.user.id, 
      },
    });

    if (!taskToDelete) {
      return res.status(404).json({ message: "Task not found" });
    }

    await taskToDelete.destroy();
    res.send(`task ${taskToDelete.title} deleted`)
  })
}