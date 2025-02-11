import express from 'express'
const router = express.Router();
import { createUser, loginUser, createTask } from '../controllers/controller.js'


// routes user
router.post('/create' , createUser)
router.post('/login', loginUser)
router.post('/createTask', createTask)


// routes task


export default router;
