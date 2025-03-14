import express from 'express'
const router = express.Router();
import { createUser, loginUser, createTask, getAllTasks, getAllTasksUser, deleteTasks, createGroup } 
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

export default router;
