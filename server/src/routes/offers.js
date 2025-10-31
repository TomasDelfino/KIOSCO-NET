import { Router } from 'express'
import Offer from '../models/Offer.js'
const r=Router(); r.get('/',async(req,res)=>{ const list=await Offer.find({active:true}).limit(20); res.json(list) }); export default r
