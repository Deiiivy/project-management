import express from 'express'
const router = express.Router();
import { createUser, loginUser, createTask, getAllTasks, getAllTasksUser, 
deleteTasks, createGroup, createTaskGroup, addGuessToGroup } 
from '../controllers/controller.js'


// routes user
router.post('/create' , createUser)
router.post('/login', loginUser)


// routes task
router.post('/createTask', createTask)
router.get('/getAllTasks', getAllTasks)
router.get('/getTasksUser', getAllTasksUser)
router.delete('/deleteTask/:id', deleteTasks)


// routes group
router.post('/createGroup', createGroup)
router.post('/createTaskGroup', createTaskGroup)
router.post('/addGuessToGroup', addGuessToGroup)

export default router;
