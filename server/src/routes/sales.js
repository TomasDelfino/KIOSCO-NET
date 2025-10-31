import { Router } from 'express'
import Sale from '../models/Sale.js'
import { verifyToken, verifyAdmin } from '../middleware/verifyToken.js'
const r=Router()
r.post('/', verifyToken, async (req,res)=>{ const doc={...req.body}; if(req.user?.id) doc.userId=req.user.id; const sale=await Sale.create(doc); res.status(201).json(sale) })
r.get('/latest', verifyToken, verifyAdmin, async (req,res)=>{ const last=await Sale.findOne().sort({createdAt:-1}); res.json(last||{}) })
r.get('/mine', verifyToken, async (req,res)=>{ const list=await Sale.find({ userId:req.user.id }).sort({createdAt:-1}); res.json(list) })
export default r
