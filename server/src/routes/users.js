import { Router } from 'express'
import { me, updateMe, changePassword } from '../controllers/usersController.js'
import { verifyToken } from '../middleware/verifyToken.js'
const r=Router(); r.get('/me',verifyToken,me); r.put('/me',verifyToken,updateMe); r.post('/change-password',verifyToken,changePassword); export default r
