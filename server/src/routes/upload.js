import { Router } from 'express'; import multer from 'multer'; import path from 'path'
import { verifyToken, verifyAdmin } from '../middleware/verifyToken.js'
const storage=multer.diskStorage({ destination:(req,file,cb)=>cb(null,path.join(process.cwd(),'server','src','uploads')), filename:(req,file,cb)=>{ const ext=(file.originalname||'').includes('.')?'.'+file.originalname.split('.').pop():'.png'; cb(null, Date.now()+'-'+Math.round(Math.random()*1e9)+ext) } })
const upload=multer({storage}); const r=Router()
r.post('/', verifyToken, verifyAdmin, upload.single('image'), (req,res)=> res.json({ url:'/uploads/'+req.file.filename }) )
export default r
