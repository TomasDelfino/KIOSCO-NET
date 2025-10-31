import jwt from 'jsonwebtoken'
export const verifyToken=(req,res,next)=>{ const t=req.headers.authorization?.split(' ')[1]; if(!t) return res.status(401).json({msg:'Token faltante'}); try{ req.user=jwt.verify(t,process.env.JWT_SECRET); next(); }catch{ return res.status(403).json({msg:'Token inválido'}) } }
export const verifyAdmin=(req,res,next)=>{ if(req.user?.rol!=='admin') return res.status(403).json({msg:'Acceso restringido'}); next(); }
