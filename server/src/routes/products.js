import { Router } from 'express'
import Product from '../models/Product.js'
import { verifyToken, verifyAdmin } from '../middleware/verifyToken.js'
const r=Router()
r.get('/', async (req,res)=>{ const list=await Product.find().sort({name:1}).limit(200); res.json(list) })
r.post('/', verifyToken, verifyAdmin, async (req,res)=>{ const p=await Product.create(req.body); res.status(201).json(p) })
r.put('/:id', verifyToken, verifyAdmin, async (req,res)=>{ const p=await Product.findByIdAndUpdate(req.params.id, req.body, { new:true }); res.json(p) })
export default r
