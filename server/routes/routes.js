import express from 'express'
const router = express.Router();
import { createUser, loginUser, createTask, getAllTasks, getAllTasksUser, 
deleteTasks, createGroup, createTaskGroup, addGuessToGroup, getAllGroupsOfUser,UpdateTask,getTaskById,
deleteTaskOfGroup } 
from '../controllers/controller.js'


// routes user
router.post('/create' , createUser)
router.post('/login', loginUser)


// routes task
router.post('/createTask', createTask)
router.get('/getAllTasks', getAllTasks)
router.get('/getTasksUser', getAllTasksUser)
router.delete('/deleteTask/:id', deleteTasks)
router.put('/updateTask/:id', UpdateTask);
router.get('/getTask/:id', getTaskById);

// routes group
router.post('/createGroup', createGroup)
router.post('/createTaskGroup', createTaskGroup)
router.post('/addGuessToGroup', addGuessToGroup)
router.get('/getAllGroupsOfUser', getAllGroupsOfUser)
router.delete('/deleteTaskOfGroup/:id/:id_group', deleteTaskOfGroup)

export default router;
