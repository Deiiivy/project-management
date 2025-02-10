import express from 'express'
const router = express.Router();
import { createUser, loginUser } from '../controllers/controller.js'


router.post('/create', createUser)
router.post('/login', loginUser)


export default router;
